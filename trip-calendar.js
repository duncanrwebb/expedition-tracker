/* The trip as calendar events — shared by the app and the server.

   One list of everything with a time or a date: flights, bookings, stays, the
   car, key moments, quiet periods. The app (index.html) uses it for "Next up"
   and for the calendar download on Android and computers; the server
   (scripts/make-calendar.js, run by publish-trip.sh) writes the same events to
   the file an iPhone subscribes to. One file, so the two cannot drift.

     TripCalendar(TRIP, { tok, includeRefs }) -> { events(), ics(events, opts) }

   `tok` fills {name}-style tokens (the app passes its own, which knows a
   viewer's chosen name; the server's default uses the config's). Booking
   references go in only when `includeRefs` — the app's download on a private
   trip — never in the file the server publishes.

   Who is reading decides what is included: families following a school trip
   from home (`trip.audience: "at-home"`) get flights, key moments and quiet
   periods, without reminders; the people travelling get everything, with a
   reminder before each timed thing.

   Works as a browser <script> (defines window.TripCalendar) and a Node module. */
(function (root) {
  const PRONOUNS = {
    he:   { subj:"he",   Subj:"He",   obj:"him",  poss:"his",   Poss:"His",   be:"he's",    Be:"He's",    will:"he'll",   was:"was"  },
    she:  { subj:"she",  Subj:"She",  obj:"her",  poss:"her",   Poss:"Her",   be:"she's",   Be:"She's",   will:"she'll",  was:"was"  },
    they: { subj:"they", Subj:"They", obj:"them", poss:"their", Poss:"Their", be:"they're", Be:"They're", will:"they'll", was:"were" },
  };
  const ENTITIES = { amp:"&", lt:"<", gt:">", quot:'"', apos:"'", nbsp:" ", ndash:"–", mdash:"—", hellip:"…", rsquo:"’", lsquo:"‘", rdquo:"”", ldquo:"“" };

  function TripCalendar(T, opts) {
    opts = opts || {};
    const trip = T.trip || {};
    const DAYS = T.days || [], FLIGHTS = T.flights || [];
    const TZ = trip.destinationTimeZone || "UTC";
    const AT_HOME = trip.audience === "at-home";
    const P = PRONOUNS[trip.pronoun] || PRONOUNS.they;
    const tok = opts.tok || (s => String(s == null ? "" : s)
      .replace(/\{name\}/g, trip.traveller || "the team")
      .replace(/\{trekArea\}/g, (T.trek && T.trek.areaLabel) || "")
      .replace(/\{(subj|Subj|obj|poss|Poss|be|Be|will|was)\}/g, (m, k) => P[k] != null ? P[k] : m));

    // Config text can carry tokens and a little markup; a calendar wants plain words.
    const plain = s => tok(s || "").replace(/<[^>]*>/g, "")
      .replace(/&(#\d+|#x[0-9a-f]+|\w+);/gi, (m, e) =>
        e[0] === "#" ? String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : +e.slice(1)) : (ENTITIES[e.toLowerCase()] || m))
      .replace(/\s+/g, " ").trim();

    const zoneOn = date => { const d = DAYS.find(x => x.date === date); return (d && d.tz) || TZ; };
    const addDay = (date, n) => { const d = new Date(date + "T12:00:00Z"); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

    // The instant that is hh:mm on `date` in zone `tz`. Iterates because a Date
    // cannot be made directly in a named zone; three passes settle across DST.
    function zonedTime(date, hh, mm, tz) {
      const want = Date.UTC(+date.slice(0, 4), +date.slice(5, 7) - 1, +date.slice(8, 10), hh, mm);
      let guess = want;
      const f = new Intl.DateTimeFormat("en-GB", { timeZone: tz, year:"numeric", month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit", hourCycle:"h23" });
      for (let i = 0; i < 3; i++) {
        const p = {}; f.formatToParts(new Date(guess)).forEach(x => { p[x.type] = x.value; });
        guess += want - Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
      }
      return new Date(guess);
    }

    /* A booking's `time` is written for people: "7:30pm", "6:00–7:00pm",
       "10:30–11:30am", "19:30", "morning". Read a start (and an end) out of it
       where there is one; anything else stays an all-day event rather than a
       guessed time. A start with no am/pm of its own takes the end's ("6–7pm"),
       unless that would put it after the end ("11–1pm" is 11am). */
    function parseTimes(text) {
      const s = String(text || "").toLowerCase().replace(/\s+/g, "");
      const m = /^(\d{1,2})(?:[:.](\d{2}))?(am|pm)?(?:(?:-|–|—|to)(\d{1,2})(?:[:.](\d{2}))?(am|pm)?)?(?![\d:])/.exec(s);
      if (!m) return null;
      const to24 = (h, sfx) => sfx === "pm" ? (h % 12) + 12 : sfx === "am" ? h % 12 : h;
      const h1 = +m[1], m1 = +(m[2] || 0), h2 = m[4] != null ? +m[4] : null, m2 = +(m[5] || 0);
      const s1 = m[3], s2 = m[6];
      if (h1 > 23 || m1 > 59 || (h2 != null && (h2 > 23 || m2 > 59))) return null;
      if (!s1 && !s2 && !m[2] && h2 == null) return null;          // a bare "7" is not a time
      const end = h2 != null ? [to24(h2, s2 || s1), m2] : null;
      let start = [to24(h1, s1 || s2), m1];
      if (!s1 && s2 && end && start[0] * 60 + start[1] > end[0] * 60 + end[1]) start = [to24(h1, s2 === "pm" ? "am" : "pm"), m1];
      return { start, end };
    }

    /* Each event's id comes from what it is, not where it sits in the list, so
       inserting a booking does not shift every id after it — a calendar uses
       the id to update an event it already has. */
    const slug = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "x";

    function events() {
      const out = [], seen = {};
      const keyed = (base, ev) => { const n = (seen[base] = (seen[base] || 0) + 1); ev.key = n > 1 ? `${base}-${n}` : base; return ev; };
      const ref = r => opts.includeRefs && T.private && r ? `Ref: ${r}` : "";

      FLIGHTS.forEach(f => {
        if (!f.dep || !f.arr) return;
        out.push(keyed(`flight-${slug(f.no)}-${f.dep.slice(0, 10)}`, { kind:"flight", src:f,
          title:`✈ ${f.no} ${f.from} → ${f.to}`, start:new Date(f.dep), end:new Date(f.arr),
          location: f.from || "", desc: `${f.no}: ${f.from} → ${f.to}. Times as scheduled — check the airline or the app for changes.`,
          alarm: AT_HOME ? null : 180 }));
      });
      (T.bookings || []).forEach(b => {
        if (!b.when) return;
        const t = parseTimes(b.time), tz = zoneOn(b.when);
        const ev = { kind:"booking", src:b, title: plain(b.what) || "Booking", tz,
          location: b.address || b.provider || "",
          desc: [b.time && `Time: ${b.time}`, b.beThereBy && `Be there: ${b.beThereBy}`, plain(b.note), ref(b.ref), b.link].filter(Boolean).join("\n") };
        if (t) {
          ev.start = zonedTime(b.when, t.start[0], t.start[1], tz);
          ev.end = t.end ? zonedTime(b.when, t.end[0], t.end[1], tz) : new Date(ev.start.getTime() + 2 * 36e5);
          if (ev.end <= ev.start) ev.end = new Date(ev.start.getTime() + 36e5);
          ev.alarm = AT_HOME ? null : 60;
        } else { ev.date = b.when; ev.endDate = addDay(b.when, 1); }
        out.push(keyed(`booking-${slug(b.what)}`, ev));
      });
      if (!AT_HOME) (T.accommodation || []).forEach(s => {
        if (!s.from || !s.to) return;
        out.push(keyed(`stay-${slug(s.name)}`, { kind:"stay", src:s, title:`🛏 ${plain(s.name)}`,
          date: s.from, endDate: s.to > s.from ? s.to : addDay(s.from, 1),
          location: s.address || s.area || "", desc: plain(s.note) }));
      });
      const car = T.carHire;
      if (car && !AT_HOME) [["pickUp", "Pick up the car"], ["dropOff", "Drop off the car"]].forEach(([k, label]) => {
        const c = car[k];
        if (!c || !c.when) return;
        const start = new Date(c.when);
        out.push(keyed(`car-${k}`, { kind:"car", src:c, title:`🚗 ${label}${c.at ? " — " + c.at : ""}`,
          start, end: new Date(start.getTime() + 36e5), location: c.address || c.at || "",
          desc: [car.vehicle, ref(car.ref)].filter(Boolean).join("\n"), alarm: 60 }));
      });
      (T.keyDates || []).forEach(k => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(k.date || "")) return;
        out.push(keyed(`key-${slug(plain(k.label))}`, { kind:"key", src:k, title:`⭐ ${plain(k.label)}`,
          date:k.date, endDate:addDay(k.date, 1), location:"", desc:"" }));
      });
      (T.noContact || []).forEach((w, i) => {
        if (!w.from || !w.to) return;
        out.push(keyed(`quiet-${i + 1}`, { kind:"quiet", src:w, title:"📵 Quiet period — no contact expected",
          date:w.from, endDate:addDay(w.to, 1), location:"",
          desc: [plain(w.reason), w.nextNews && `Next news expected: ${plain(w.nextNews)}`].filter(Boolean).join("\n") }));
      });
      const at = e => e.start ? e.start.getTime() : new Date(e.date + "T00:00:00Z").getTime();
      return out.sort((a, b) => at(a) - at(b));
    }

    /* The .ics text. `subscription` adds how often a subscribed calendar should
       look again, so a change published mid-trip reaches everyone's phone. */
    function ics(evs, icsOpts) {
      icsOpts = icsOpts || {};
      const e = s => String(s || "").replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\r?\n/g, "\\n");
      const utc = d => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
      const day = s => s.replace(/-/g, "");
      // Long lines are folded; split on characters, never inside one.
      const fold = line => { const c = Array.from(line), out = []; for (let i = 0; i < c.length; i += 60) out.push((i ? " " : "") + c.slice(i, i + 60).join("")); return out.join("\r\n"); };
      const uid = T.storagePrefix || "trip-";
      const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//duncanrwebb.com//Expedition Tracker//EN",
        "CALSCALE:GREGORIAN", "METHOD:PUBLISH", "X-WR-CALNAME:" + e(plain(trip.title))];
      if (icsOpts.subscription) lines.push("REFRESH-INTERVAL;VALUE=DURATION:PT3H", "X-PUBLISHED-TTL:PT3H");
      const stamp = utc(new Date());
      evs.forEach(ev => {
        lines.push("BEGIN:VEVENT", `UID:${uid}${ev.key}@duncanrwebb.com`, `DTSTAMP:${stamp}`);
        if (ev.start) lines.push(`DTSTART:${utc(ev.start)}`, `DTEND:${utc(ev.end)}`);
        else lines.push(`DTSTART;VALUE=DATE:${day(ev.date)}`, `DTEND;VALUE=DATE:${day(ev.endDate)}`, "TRANSP:TRANSPARENT");
        lines.push("SUMMARY:" + e(ev.title));
        if (ev.location) lines.push("LOCATION:" + e(ev.location));
        if (ev.desc) lines.push("DESCRIPTION:" + e(ev.desc));
        if (ev.start && ev.alarm) lines.push("BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:" + e(ev.title), `TRIGGER:-PT${ev.alarm}M`, "END:VALARM");
        lines.push("END:VEVENT");
      });
      lines.push("END:VCALENDAR");
      return lines.map(fold).join("\r\n") + "\r\n";
    }

    return { events, ics, plain, atHome: AT_HOME };
  }

  if (typeof module !== "undefined" && module.exports) module.exports = { TripCalendar };
  else root.TripCalendar = TripCalendar;
})(typeof window !== "undefined" ? window : this);
