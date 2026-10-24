/* =============================================================================
   Home-screen icon — shared by the app (index.html) and the Trip Builder
   (setup.html).

   Why a separate file. The app draws the icon, and the Builder has to show
   exactly what the app will draw, or picking one is guesswork. That was
   duplicated code, kept honest only by a byte-comparison test I had to remember
   to run. Neither page has a build step, but both can load a plain script, so
   this is the one copy.

   Why drawn rather than a file. v1 of this app embedded a hand-drawn PNG of an
   Angkor temple. It looked good — better than a letter — but it was one image
   for one trip, and every later trip inherited a Cambodian temple. Drawing the
   motif in the trip's own accent colour keeps the look and lets a Texas trip
   have a different scene, with no artwork to commission and nothing to ship.

   Everything here works in a 0..1 space multiplied by `size`, so one definition
   serves the favicon at 32px and the iOS icon at 180px.
============================================================================= */

/* Darken a hex colour towards black. Shaded faces need to read as the same
   material as the lit ones, which a second config colour wouldn't guarantee. */
function shade(hex, amount){
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex||"").trim());
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  const f = 1 - amount;
  const r = Math.round(((n >> 16) & 255) * f);
  const g = Math.round(((n >> 8) & 255) * f);
  const b = Math.round((n & 255) * f);
  return `rgb(${r},${g},${b})`;
}

/* Each motif fills a square of `s` pixels. `c` is the trip's accent colour, and
   the two-tone shading is what stops these reading as flat clip-art. */
const ICON_ART = {

  /* The v1 Cambodia icon, redrawn. A first attempt used plain triangles and read
     as three hills with a sunrise behind them — the shape that says "temple" is
     the stepped prasat tower, so the tiers are the whole point. */
  temple(ctx, s, c){
    const base = 0.76;
    const tower = (x, w, h, tiers, fill) => {
      ctx.fillStyle = fill;
      for (let i = 0; i < tiers; i++){
        const wb = w * (1 - 0.17*i), wt = w * (1 - 0.17*(i+1));
        const y1 = base - h*i/tiers, y0 = base - h*(i+1)/tiers;
        ctx.beginPath();
        ctx.moveTo(s*(x-wb), s*y1); ctx.lineTo(s*(x+wb), s*y1);
        ctx.lineTo(s*(x+wt), s*y0); ctx.lineTo(s*(x-wt), s*y0);
        ctx.closePath(); ctx.fill();
      }
      // The finial — without a point on top the stack reads as a ziggurat.
      const wt = w * (1 - 0.17*tiers);
      ctx.beginPath();
      ctx.moveTo(s*x, s*(base - h - 0.055));
      ctx.lineTo(s*(x+wt), s*(base - h)); ctx.lineTo(s*(x-wt), s*(base - h));
      ctx.closePath(); ctx.fill();
    };
    tower(0.22, 0.085, 0.26, 3, shade(c, 0.28));
    tower(0.78, 0.085, 0.26, 3, shade(c, 0.28));
    tower(0.50, 0.115, 0.40, 4, c);
    ctx.fillStyle = shade(c, 0.12);
    ctx.fillRect(s*0.11, s*base, s*0.78, s*0.05);
  },

  /* Snow-capped peaks. The cap is the background colour showing through rather
     than white, so it stays right on any palette. */
  mountain(ctx, s, c, bg){
    const tri = (x, w, h, fill) => {
      ctx.fillStyle = fill;
      ctx.beginPath();
      ctx.moveTo(s*x, s*(0.78 - h));
      ctx.lineTo(s*(x + w), s*0.78);
      ctx.lineTo(s*(x - w), s*0.78);
      ctx.closePath(); ctx.fill();
    };
    tri(0.68, 0.24, 0.30, shade(c, 0.28));
    tri(0.40, 0.30, 0.42, c);
    ctx.fillStyle = bg || shade(c, 0.7);
    ctx.beginPath();
    ctx.moveTo(s*0.40, s*0.36); ctx.lineTo(s*0.475, s*0.475);
    ctx.lineTo(s*0.44, s*0.45); ctx.lineTo(s*0.40, s*0.50);
    ctx.lineTo(s*0.36, s*0.45); ctx.lineTo(s*0.325, s*0.475);
    ctx.closePath(); ctx.fill();
  },

  /* Rainforest canopy. This took three goes. Stacked triangles were conifers.
     Domes on thin trunks were mushrooms. Domes with a flat bar under them were
     garden tables. What finally reads as forest is overlapping crowns with no
     bar and short, thick trunks, drawn back to front so the canopy closes. */
  forest(ctx, s, c){
    const tree = (x, cy, r, fill) => {
      ctx.fillStyle = fill;
      ctx.fillRect(s*(x - r*0.14), s*(cy - r*0.2), s*r*0.28, s*(0.80 - cy + r*0.2));
      ctx.beginPath(); ctx.arc(s*x, s*cy, s*r, 0, Math.PI*2); ctx.fill();
    };
    tree(0.20, 0.52, 0.16, shade(c, 0.34));
    tree(0.80, 0.54, 0.15, shade(c, 0.34));
    tree(0.50, 0.42, 0.215, c);
    ctx.fillStyle = shade(c, 0.12);
    ctx.fillRect(s*0.10, s*0.80, s*0.80, s*0.045);
  },

  /* Palm and horizon — a coast or island trip. */
  coast(ctx, s, c){
    ctx.fillStyle = shade(c, 0.20);
    ctx.beginPath(); ctx.arc(s*0.68, s*0.32, s*0.11, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(s*0.40, s*0.78); ctx.quadraticCurveTo(s*0.42, s*0.55, s*0.36, s*0.40);
    ctx.lineTo(s*0.42, s*0.40); ctx.quadraticCurveTo(s*0.47, s*0.56, s*0.46, s*0.78);
    ctx.closePath(); ctx.fill();
    const frond = (dx, dy) => {
      ctx.beginPath();
      ctx.moveTo(s*0.39, s*0.40);
      ctx.quadraticCurveTo(s*(0.39 + dx*0.55), s*(0.40 + dy - 0.09), s*(0.39 + dx), s*(0.40 + dy));
      ctx.quadraticCurveTo(s*(0.39 + dx*0.55), s*(0.40 + dy - 0.02), s*0.39, s*0.42);
      ctx.closePath(); ctx.fill();
    };
    frond(-0.22, 0.06); frond(0.22, 0.06); frond(-0.14, -0.12); frond(0.16, -0.10);
    ctx.fillStyle = shade(c, 0.30);
    ctx.fillRect(s*0.14, s*0.78, s*0.72, s*0.045);
  },

  /* Cactus and sun. Two attempts at a butte both failed, and the second failed
     for a reason worth keeping: a rock formation at 32 pixels is ambiguous with
     the mountain motif sitting next to it in the picker, so even a well-drawn
     one would have been the wrong shape to choose. A saguaro is unmistakable. */
  desert(ctx, s, c){
    ctx.fillStyle = shade(c, 0.18);
    ctx.beginPath(); ctx.arc(s*0.76, s*0.30, s*0.115, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle = c;
    const w = 0.085, x = 0.44, ground = 0.79;
    // Trunk, capped with a half-circle so the top is domed rather than sawn off.
    ctx.beginPath(); ctx.arc(s*x, s*0.26, s*w/2, Math.PI, 0); ctx.fill();
    ctx.fillRect(s*(x - w/2), s*0.26, s*w, s*(ground - 0.26));
    // Arms: up the side, then a right-angle turn skyward. Drawn as a stroked
    // path with a round cap, which is what gives the elbow its curve.
    ctx.strokeStyle = c; ctx.lineWidth = s*w*0.8; ctx.lineCap = "round";
    const arm = (dir, yIn, yUp) => {
      ctx.beginPath();
      ctx.moveTo(s*x, s*yIn);
      ctx.lineTo(s*(x + dir*0.155), s*yIn);
      ctx.lineTo(s*(x + dir*0.155), s*yUp);
      ctx.stroke();
    };
    arm(-1, 0.52, 0.36);
    arm( 1, 0.60, 0.46);
    ctx.fillStyle = shade(c, 0.12);
    ctx.fillRect(s*0.10, s*ground, s*0.80, s*0.045);
  },

  /* City skyline — a trip built around a place rather than a landscape. */
  city(ctx, s, c){
    const block = (x, w, h, fill) => {
      ctx.fillStyle = fill;
      ctx.fillRect(s*x, s*(0.78 - h), s*w, s*h);
    };
    block(0.18, 0.16, 0.26, shade(c, 0.30));
    block(0.60, 0.20, 0.32, shade(c, 0.30));
    block(0.37, 0.22, 0.46, c);
    ctx.fillStyle = shade(c, 0.55);
    for (let r = 0; r < 3; r++) for (let k = 0; k < 3; k++){
      ctx.fillRect(s*(0.40 + k*0.07), s*(0.40 + r*0.09), s*0.035, s*0.045);
    }
  },

  /* A plane over the meridian — the generic one, when no motif fits. */
  flight(ctx, s, c){
    ctx.strokeStyle = shade(c, 0.35);
    ctx.lineWidth = s*0.035;
    ctx.beginPath(); ctx.arc(s*0.5, s*0.52, s*0.30, Math.PI*0.15, Math.PI*0.85); ctx.stroke();
    ctx.fillStyle = c;
    ctx.save();
    ctx.translate(s*0.5, s*0.44); ctx.rotate(-Math.PI/8);
    ctx.beginPath();
    ctx.moveTo(0, -s*0.20); ctx.lineTo(s*0.075, s*0.06); ctx.lineTo(s*0.20, s*0.15);
    ctx.lineTo(s*0.20, s*0.20); ctx.lineTo(s*0.045, s*0.17); ctx.lineTo(s*0.045, s*0.26);
    ctx.lineTo(s*0.11, s*0.31); ctx.lineTo(s*0.11, s*0.35); ctx.lineTo(0, s*0.31);
    ctx.lineTo(-s*0.11, s*0.35); ctx.lineTo(-s*0.11, s*0.31); ctx.lineTo(-s*0.045, s*0.26);
    ctx.lineTo(-s*0.045, s*0.17); ctx.lineTo(-s*0.20, s*0.20); ctx.lineTo(-s*0.20, s*0.15);
    ctx.lineTo(-s*0.075, s*0.06);
    ctx.closePath(); ctx.fill();
    ctx.restore();
  },
};

/* The one drawing routine both pages call.

   `art` names a motif; anything else falls back to `glyph`, which may be a
   letter or an emoji. Colour emoji carry their own palette and ignore
   fillStyle — that's fine, they sit on the gradient rather than being tinted.
   A monochrome glyph does take the accent colour. */
function drawTripIcon(o){
  const size = o.size;
  const primary = o.primary || "#1B4332";
  const primaryDeep = o.primaryDeep || primary;
  const accent = o.accent || "#C9A66B";

  const cv = document.createElement("canvas");
  cv.width = cv.height = size;
  const ctx = cv.getContext("2d");

  const bg = ctx.createLinearGradient(0, 0, size, size);
  bg.addColorStop(0, primary); bg.addColorStop(1, primaryDeep);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, size, size);

  // A soft highlight rather than a flat fill — cheap depth with no artwork.
  const glow = ctx.createRadialGradient(size*0.3, size*0.28, 0, size*0.3, size*0.28, size*0.8);
  glow.addColorStop(0, "rgba(255,255,255,.18)"); glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, size, size);

  if (o.art && ICON_ART[o.art]){
    ICON_ART[o.art](ctx, size, accent, primary);
  } else {
    const glyph = String(o.glyph || "?");
    // Emoji carry far more internal padding than a capital, so the same point
    // size renders visibly smaller. Nudge them up and sit them a little higher.
    const plain = /^[A-Za-z0-9]$/.test(glyph);
    ctx.fillStyle = accent;
    ctx.font = `700 ${Math.round(size*(plain?0.56:0.64))}px Fraunces, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", Georgia, serif`;
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillText(glyph, size/2, size*(plain?0.57:0.53));
  }
  return cv.toDataURL("image/png");
}

/* Ordered for the Builder's picker: the ones most likely to fit a school
   expedition first. The label is what the person choosing reads. */
const ICON_ART_LIST = [
  ["temple",   "temple"],
  ["forest",   "rainforest"],
  ["mountain", "mountains"],
  ["coast",    "coast"],
  ["desert",   "desert"],
  ["city",     "city"],
  ["flight",   "travel"],
];

/* Which motif suits where the trip actually goes. The Builder puts the match
   first and says so, because the point of these is that the icon looks like the
   place — a temple for Angkor, canopy for Borneo — and hunting for that in a row
   of seven is the sort of small friction that ends with everyone taking the
   default. Matched against the destination, title and subtitle together, so
   "Sabah, Borneo" is found even when the destination label is a city. */
const ICON_ART_HINTS = [
  ["temple",   /cambodia|angkor|siem reap|phnom penh|thai|bangkok|laos|vietnam|myanmar|burma|bali|nepal|kathmandu|japan|kyoto|india|sri lanka/i],
  ["forest",   /borneo|sabah|sarawak|amazon|jungle|rainforest|congo|costa rica|malaysia|indonesia|sumatra|uganda|rwanda/i],
  ["mountain", /himalaya|everest|annapurna|andes|alps|kilimanjaro|atlas|patagonia|peru|cusco|machu|switzerland|norway|iceland/i],
  ["coast",    /island|beach|coast|caribbean|maldives|fiji|zanzibar|greece|croatia|philippines|barrier reef/i],
  ["desert",   /texas|arizona|nevada|utah|new mexico|sahara|namib|morocco|jordan|petra|outback|dubai|oman/i],
  ["city",     /london|paris|rome|new york|tokyo|berlin|madrid|barcelona|amsterdam|city break/i],
];

function suggestIconArt(text){
  const t = String(text || "");
  const hit = ICON_ART_HINTS.find(([, re]) => re.test(t));
  return hit ? hit[0] : "";
}
