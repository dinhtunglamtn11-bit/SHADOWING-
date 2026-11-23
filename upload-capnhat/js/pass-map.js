// Bản đồ thế giới của Passport: biên giới thật của các nước (dữ liệu world-110m.json, Natural Earth, phạm vi công cộng) vẽ bằng canvas.
// Nước đã có thẻ được tô màu theo hạng dấu; có thu phóng (lăn chuột, hai ngón tay, nút +/−) và kéo để di chuyển;
// phóng to đủ thì hiện mã nước 3 chữ cái (ISO 3166-1 alpha-3). Chạm vào một nước để xem thông tin, nước đã có thẻ thì mở vào luôn.
import { ISO3 } from './pass-iso.js';
const LON0 = -180, LON1 = 180, LAT0 = 84, LAT1 = -58; // vùng hiển thị (bỏ Nam Cực)
let DATA = null;

function decode(topo) {
  const [sx, sy] = topo.transform.scale, [tx, ty] = topo.transform.translate;
  const arcs = topo.arcs.map(a => { let x = 0, y = 0; return a.map(([dx, dy]) => { x += dx; y += dy; return [x * sx + tx, y * sy + ty]; }); });
  const ring = idxs => { let pts = []; for (const i of idxs) { const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i]; pts.push(...(pts.length ? a.slice(1) : a)); } let jump = false; for (let n = 1; n < pts.length; n++) if (Math.abs(pts[n][0] - pts[n - 1][0]) > 180) { jump = true; break; } if (jump) { pts = pts.map(([x, y]) => [x < 0 ? x + 360 : x, y]); pts.wrap = true; } return pts; }; // vòng vắt qua kinh tuyến 180: nối liền (kinh độ 0..360) rồi vẽ thêm một bản dịch -360
  const area = r => { let s = 0; for (let i = 0, n = r.length; i < n; i++) { const [x1, y1] = r[i], [x2, y2] = r[(i + 1) % n]; s += x1 * y2 - x2 * y1; } return Math.abs(s) / 2; };
  return topo.objects.countries.geometries.map(g => {
    const polys = (g.type === 'Polygon' ? [g.arcs] : g.arcs).map(p => p.map(ring)), wrap = polys.some(p => p[0].wrap);
    const name = g.properties.name; let big = polys[0], ba = -1, x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
    for (const p of polys) { const a = area(p[0]); if (a > ba) { ba = a; big = p; } for (const [x, y] of p[0]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    let bx0 = 1e9, by0 = 1e9, bx1 = -1e9, by1 = -1e9; for (const [x, y] of big[0]) { if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y; }
    let lx = (bx0 + bx1) / 2; if (lx > 180) lx -= 360;
    return { name, iso: ISO3[name] ?? '', polys, wrap, bbox: [x0, y0, x1, y1], lab: [lx, (by0 + by1) / 2], lw: bx1 - bx0, lh: by1 - by0, big, bb: [bx0, by0, bx1, by1], placed: false };
  }).filter(c => c.name !== 'Antarctica');
}
// đặt mã nước vào điểm nằm TRONG lãnh thổ và xa biên nhất (tâm hộp bao có thể rơi ra ngoài với nước hình dài như Việt Nam, Chile)
function distSeg(px, py, ax, ay, bx, by) { const dx = bx - ax, dy = by - ay, l = dx * dx + dy * dy; let t = l ? ((px - ax) * dx + (py - ay) * dy) / l : 0; t = t < 0 ? 0 : t > 1 ? 1 : t; return Math.hypot(px - (ax + t * dx), py - (ay + t * dy)); }
export function placeLabel(c) {
  if (c.placed) return; c.placed = true; const [x0, y0, x1, y1] = c.bb, rings = c.big;
  const inside = (x, y) => inRing(rings[0], x, y) && !rings.slice(1).some(h => inRing(h, x, y));
  const dist = (x, y) => { if (!inside(x, y)) return -1; let d = Infinity; for (const r of rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) d = Math.min(d, distSeg(x, y, r[j][0], r[j][1], r[i][0], r[i][1])); return d; };
  let best = null, bd = -1, cx0 = x0, cy0 = y0, cw = x1 - x0, ch = y1 - y0, N = 12;
  for (let pass = 0; pass < 3; pass++) {
    for (let i = 0; i <= N; i++) for (let j = 0; j <= N; j++) { const x = cx0 + cw * i / N, y = cy0 + ch * j / N, d = dist(x, y); if (d > bd) { bd = d; best = [x, y]; } }
    if (!best) break; cw /= 4; ch /= 4; cx0 = best[0] - cw / 2; cy0 = best[1] - ch / 2;
  }
  if (best && bd > 0) { let lx = best[0]; if (lx > 180) lx -= 360; c.lab = [lx, best[1]]; }
}
export async function loadWorld() {
  if (!DATA) { const r = await fetch(new URL('./world-110m.json', import.meta.url)); if (!r.ok) throw new Error('world-110m.json'); DATA = decode(await r.json()); }
  return DATA;
}
const inRing = (r, x, y) => { let c = false; for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const inCountry = (c, x, y) => { if (c.wrap && x < 0) x += 360; const b = c.bbox; if (x < b[0] || x > b[2] || y < b[1] || y > b[3]) return false; return c.polys.some(p => inRing(p[0], x, y) && !p.slice(1).some(h => inRing(h, x, y))); };

// opts: { tiers: { ISO3: 0..4 }, colors: { land, tier: [5 màu], border, glow }, onPick(iso, country), onInfo(country|null), zoomLabel }
export async function createMap(box, opts) {
  const world = await loadWorld();
  box.innerHTML = '';
  const cv = document.createElement('canvas'); cv.className = 'pp-mapcv'; cv.setAttribute('aria-label', 'Bản đồ thế giới'); cv.style.touchAction = 'none';
  const ctl = document.createElement('div'); ctl.className = 'pp-mapctl';
  ctl.innerHTML = '<button type="button" data-z="in" aria-label="Phóng to">＋</button><button type="button" data-z="out" aria-label="Thu nhỏ">－</button><button type="button" data-z="reset" aria-label="Về toàn cảnh">⟲</button>';
  box.append(cv, ctl);
  const ctx = cv.getContext('2d'), dpr = Math.min(2, window.devicePixelRatio || 1);
  let W = 0, H = 0, s0 = 1, k = 1, ox = 0, oy = 0, sel = null, hov = null, raf = 0;
  const scale = () => s0 * k, X = lon => (lon - LON0) * scale() + ox, Y = lat => (LAT0 - lat) * scale() + oy;
  const inv = (px, py) => [(px - ox) / scale() + LON0, LAT0 - (py - oy) / scale()];
  function clamp() { const mw = 360 * scale(), mh = (LAT0 - LAT1) * scale(); ox = Math.min(0, Math.max(W - mw, ox)); oy = Math.min(0, Math.max(H - mh, oy)); }
  function size() { const r = box.getBoundingClientRect(); W = Math.max(200, Math.round(r.width)); s0 = W / 360; H = Math.round((LAT0 - LAT1) * s0); box.style.height = H + 'px'; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); cv.style.width = W + 'px'; cv.style.height = H + 'px'; clamp(); }
  const trace = c => { ctx.beginPath(); for (const p of c.polys) for (const r of p) for (const sh of r.wrap ? [0, -360] : [0]) { r.forEach(([lo, la], i) => (i ? ctx.lineTo(X(lo + sh), Y(la)) : ctx.moveTo(X(lo + sh), Y(la)))); ctx.closePath(); } };
  function draw() {
    raf = 0; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    const col = opts.colors, glowers = [];
    ctx.lineJoin = 'round'; ctx.lineWidth = Math.min(1.1, 0.6 + k * 0.08); ctx.strokeStyle = col.border;
    for (const c of world) {
      const t = c.iso in opts.tiers ? opts.tiers[c.iso] : -1;
      trace(c); ctx.fillStyle = t >= 0 ? col.tier[t] : col.land; ctx.fill(); ctx.stroke();
      if (t === 4) glowers.push(c);
    }
    if (glowers.length) { ctx.save(); ctx.shadowColor = col.glow; ctx.shadowBlur = 14; ctx.fillStyle = col.tier[4]; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.2; for (const c of glowers) { trace(c); ctx.fill(); ctx.stroke(); } ctx.restore(); }
    for (const c of [sel, hov]) if (c) { trace(c); ctx.strokeStyle = '#fff'; ctx.lineWidth = 2; ctx.stroke(); }
    // mã nước: chỉ hiện khi nước đủ rộng trên màn hình
    ctx.font = 'bold 11px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineWidth = 3; ctx.lineJoin = 'round';
    if (k >= 2) for (const c of world) {
      if (!c.iso) continue; const w = c.lw * scale(), h = c.lh * scale(); if (w < 30 || h < 14) continue;
      placeLabel(c); const x = X(c.lab[0]), y = Y(c.lab[1]); if (x < 10 || x > W - 10 || y < 8 || y > H - 8) continue;
      ctx.strokeStyle = 'rgba(15,12,40,.85)'; ctx.strokeText(c.iso, x, y); ctx.fillStyle = '#fff'; ctx.fillText(c.iso, x, y);
    }
  }
  const redraw = () => { if (!raf) raf = requestAnimationFrame(draw); };
  function zoomAt(px, py, nk) { nk = Math.max(1, Math.min(14, nk)); const [lo, la] = inv(px, py); k = nk; ox = px - (lo - LON0) * scale(); oy = py - (LAT0 - la) * scale(); clamp(); redraw(); }
  const rel = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const hit = (px, py) => { const [lo, la] = inv(px, py); return world.find(c => inCountry(c, lo, la)) || null; };
  // thao tác: kéo, pinch, lăn chuột, chạm
  const ptrs = new Map(); let drag = null, pinch = null, moved = 0, t0 = 0;
  cv.addEventListener('pointerdown', e => { cv.setPointerCapture(e.pointerId); ptrs.set(e.pointerId, rel(e)); moved = 0; t0 = Date.now(); if (ptrs.size === 1) drag = { x: rel(e)[0], y: rel(e)[1] }; if (ptrs.size === 2) { const [a, b] = [...ptrs.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), k }; drag = null; } });
  cv.addEventListener('pointermove', e => {
    const p = rel(e);
    if (ptrs.has(e.pointerId)) ptrs.set(e.pointerId, p);
    if (pinch && ptrs.size >= 2) { const [a, b] = [...ptrs.values()], d = Math.hypot(a[0] - b[0], a[1] - b[1]); zoomAt((a[0] + b[0]) / 2, (a[1] + b[1]) / 2, pinch.k * d / (pinch.d || 1)); moved = 99; return; }
    if (drag && ptrs.size === 1) { const dx = p[0] - drag.x, dy = p[1] - drag.y; moved += Math.abs(dx) + Math.abs(dy); if (moved > 6) { ox += dx; oy += dy; clamp(); redraw(); } drag = { x: p[0], y: p[1] }; }
    else if (e.pointerType === 'mouse' && !ptrs.size) { const c = hit(p[0], p[1]); if (c !== hov) { hov = c; opts.onInfo?.(c, true); redraw(); } }
  });
  const up = e => {
    const p = rel(e); const wasTap = ptrs.size === 1 && moved <= 6 && Date.now() - t0 < 500; ptrs.delete(e.pointerId);
    if (ptrs.size < 2) pinch = null; if (!ptrs.size) drag = null;
    if (wasTap && e.type === 'pointerup') { const c = hit(p[0], p[1]); sel = c; opts.onInfo?.(c, false); if (c && c.iso in opts.tiers) opts.onPick?.(c.iso, c); redraw(); }
  };
  cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
  cv.addEventListener('pointerleave', () => { if (hov) { hov = null; redraw(); } });
  cv.addEventListener('wheel', e => { e.preventDefault(); const [px, py] = rel(e); zoomAt(px, py, k * (e.deltaY < 0 ? 1.25 : 0.8)); }, { passive: false });
  cv.addEventListener('dblclick', e => { const [px, py] = rel(e); zoomAt(px, py, k * 2); });
  ctl.addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; e.stopPropagation(); if (b.dataset.z === 'reset') { k = 1; ox = oy = 0; clamp(); redraw(); } else zoomAt(W / 2, H / 2, k * (b.dataset.z === 'in' ? 1.6 : 0.625)); });
  size(); draw();
  const ro = new ResizeObserver(() => { const w = Math.round(box.getBoundingClientRect().width); if (w && w !== W) { size(); redraw(); } }); ro.observe(box);
  return { destroy() { ro.disconnect(); cancelAnimationFrame(raf); }, world };
}
