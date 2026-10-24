/* Service worker — offline support.

   Bump CACHE when this file's own logic changes, so old caches are cleared.
   Changes to the page, the config or the trip's files need no bump: they are
   all fetched network-first.

   Strategy, and why:
   - Everything from this site — the page, the trip data, the trip's own files
     — is NETWORK-FIRST, with a time limit (see networkFirst below). It asks
     with `cache: "no-store"`, so no HTTP cache header can hand back a stale
     copy after a fix has been published. If the network is slow or absent we
     fall back to the saved copy, which is what makes the app work in the
     jungle / on a plane.
   - Everything else (map tiles, fonts, photos, Leaflet) is CACHE-FIRST — it
     never changes, and re-fetching it is wasted signal in exactly the places
     where signal is scarce.
   - Live data (weather, flight status) is never cached. Stale weather shown as
     current is worse than no weather.
*/
const CACHE = "expedition-v2-22";
// The trip's own map, saved by the "Save map for offline" button. Kept apart
// from CACHE so an app update does not throw away tens of MB someone chose to
// download on wifi.
const MAP_CACHE = "trip-map-v1";

const SHELL = ["./", "./index.html", "./trip-config.js", "./icon-art.js", "./trip-calendar.js", "./sw.js",
  // What the trip's own map and calendar are. Kept from install, because a
  // file only cached as it was used went when the app updated — that is how a
  // saved map went unused in airplane mode.
  "./offline-map.json", "./calendar.json",
  // Draws the trip's own map offline (see "The map, offline" in index.html).
  "https://cdn.jsdelivr.net/npm/protomaps-leaflet@5.1.0/dist/protomaps-leaflet.js"];

self.addEventListener("install", e => {
  // Individual failures shouldn't abort the whole install. A published site
  // has trip-config.js beside index.html; working from the repo it lives in
  // trips/<name>/ instead, so here it simply isn't part of the base shell and
  // is cached the first time it's fetched.
  e.waitUntil(
    caches.open(CACHE).then(c => Promise.allSettled(SHELL.map(u => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== MAP_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

const NEVER_CACHE = [
  "api.open-meteo.com",      // live weather
  "aerodatabox.p.rapidapi.com", // live flight status
  "nominatim.openstreetmap.org", // setup-tool lookups
];

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (NEVER_CACHE.some(h => url.hostname.includes(h))) return;

  /* Everything this site serves itself is NETWORK-FIRST: the page, the trip
     config, and every file in the trip folder — a ticket PDF, icon-art.js.
     Only the page and config used to be; the rest were cache-first, so a
     re-issued ticket with the same name never reached a phone that already had
     the old one. Cross-origin assets (tiles, fonts, photos, Leaflet) stay
     cache-first below: they never change, and signal is scarce. */
  // The trip's own map is read in pieces (Range requests). Saved, the pieces
  // come from the copy on the phone; not saved, straight from the network.
  if (url.origin === self.location.origin && url.pathname.endsWith(".pmtiles")) {
    e.respondWith(mapPiece(req));
    return;
  }

  if (url.origin === self.location.origin) {
    e.respondWith(networkFirst(e, req));
    return;
  }

  e.respondWith(
    caches.match(req).then(hit => hit || (networkLooksDown() ? Response.error() : fetch(req).then(res => {
      // Opaque cross-origin responses (tiles, fonts) are still worth caching —
      // they're what makes the map usable offline.
      if (res && (res.ok || res.type === "opaque")) {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{});
      }
      return res;
    }).catch(() => { noNetworkUntil = Date.now() + NO_NETWORK_MS; return Response.error(); })))
  );
});

/* How long to wait for the network before showing the saved copy. Without a
   limit, one bar of signal meant a blank screen until the request gave up —
   and the app reloads itself after five minutes in the background, so that
   happened on almost every reopen in the places this app is for. The network
   answer still lands in the cache behind it, for next time. */
const NETWORK_WAIT_MS = 4000;

/* No signal, known quickly. In airplane mode an iPhone does not fail a
   request at once — it waits — so every file waited out NETWORK_WAIT_MS in
   turn and the app took 10-15 seconds to open. Now: if the phone says it is
   offline, or a request has just failed or timed out, go straight to the saved
   copy for the next 30 seconds, and try the network again after that. */
let noNetworkUntil = 0;
const NO_NETWORK_MS = 30000;
const networkLooksDown = () => (self.navigator && self.navigator.onLine === false) || Date.now() < noNetworkUntil;

function networkFirst(e, req){
  if (networkLooksDown()) {
    return caches.match(req)
      .then(hit => hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined))
      .then(hit => hit || fetch(req, { cache: "no-store" }))
      .catch(() => Response.error());
  }
  // Only a good answer is saved. An error page — a 404 mid-publish, a 502, a
  // 401 after the login cookie lapsed — used to be cached like any other, and
  // then became the offline copy: out of signal, the app said no trip loaded.
  const fromNet = fetch(req, { cache: "no-store" }).then(res => {
    if (!res.ok) return res;
    const copy = res.clone();
    return caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {}).then(() => res);
  });
  e.waitUntil(fromNet.catch(() => {}));

  const fromCache = () => caches.match(req).then(hit =>
    hit || (req.mode === "navigate" ? caches.match("./index.html") : undefined));

  return new Promise(resolve => {
    let settled = false;
    const give = r => { if (!settled && r) { settled = true; resolve(r); } };
    const timer = setTimeout(() => {
      noNetworkUntil = Date.now() + NO_NETWORK_MS;       // slow: treat as down for now
      fromCache().then(give);
    }, NETWORK_WAIT_MS);
    const done = r => { clearTimeout(timer); give(r); };
    fromNet.then(res => {
      noNetworkUntil = 0;                                // it answered: the network is back
      // A 401 on the page itself goes through, so the password prompt appears.
      if (res.ok || (req.mode === "navigate" && res.status === 401)) return done(res);
      return fromCache().then(hit => done(hit || res));
    }, () => {
      noNetworkUntil = Date.now() + NO_NETWORK_MS;
      return fromCache().then(hit => done(hit || Response.error()));
    });
  });
}

/* A piece of the saved map. The map library asks for byte ranges of one large
   file; the Cache API holds the whole file, so the piece is sliced from it.
   The file's Blob is kept between requests — reading it out of the cache for
   every one of the hundreds of pieces a map view needs would be slow. */
// One per file: a trip's map is two (street-level squares, and the overview).
const mapBlobs = new Map();
async function mapPiece(req){
  let blob = mapBlobs.get(req.url);
  if (!blob) {
    const hit = await caches.open(MAP_CACHE).then(c => c.match(req.url));
    if (!hit) return fetch(req);
    blob = await hit.blob();
    mapBlobs.set(req.url, blob);
  }
  const m = /bytes=(\d+)-(\d*)/.exec(req.headers.get("range") || "");
  if (!m) return new Response(blob, { headers: { "Content-Type": "application/octet-stream", "Content-Length": String(blob.size) } });
  const start = +m[1], end = m[2] ? Math.min(+m[2], blob.size - 1) : blob.size - 1;
  return new Response(blob.slice(start, end + 1), { status: 206, headers: {
    "Content-Type": "application/octet-stream",
    "Content-Range": `bytes ${start}-${end}/${blob.size}`,
    "Content-Length": String(end - start + 1),
  } });
}

// The page tells the worker when the saved map changes, so a stale Blob is dropped.
self.addEventListener("message", e => { if (e.data === "map-changed") mapBlobs.clear(); });
