// Chấm viết từng nét cho kana và chữ Latin (dữ liệu nét lấy từ KanjiVG, giấy phép CC BY-SA 3.0, https://kanjivg.tagaini.net).
// Khác với kiểu so hình ảnh, cách này biết chữ có bao nhiêu nét, nét nào trước nét nào sau, nét đi hướng nào,
// và tự căn lại vị trí/kích cỡ chữ bạn viết nên không bắt phải viết đúng chỗ.

const KVG = ch => `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg@master/kanji/${ch.codePointAt(0).toString(16).padStart(5, '0')}.svg`;
const cache = new Map();

// ---------- đọc dữ liệu nét ----------
export async function loadKvg(ch) {
  if (cache.has(ch)) return cache.get(ch);
  const r = await fetch(KVG(ch));
  if (!r.ok) throw new Error('chưa có dữ liệu nét cho chữ này');
  const doc = new DOMParser().parseFromString(await r.text(), 'image/svg+xml');
  const paths = [...doc.querySelectorAll('path')]
    .map(p => ({ d: p.getAttribute('d'), n: +((p.getAttribute('id') || '').match(/-s(\d+)$/) || [])[1] }))
    .filter(p => p.d && p.n).sort((a, b) => a.n - b.n);
  if (!paths.length) throw new Error('dữ liệu nét trống');
  const NS = 'http://www.w3.org/2000/svg';
  const holder = document.createElementNS(NS, 'svg');
  holder.setAttribute('width', 0); holder.setAttribute('height', 0); holder.style.cssText = 'position:absolute;visibility:hidden';
  document.body.appendChild(holder);
  const strokes = paths.map(p => {
    const el = document.createElementNS(NS, 'path'); el.setAttribute('d', p.d); holder.appendChild(el);
    const L = el.getTotalLength(), n = Math.max(10, Math.ceil(L / 2));
    const pts = []; for (let i = 0; i <= n; i++) { const q = el.getPointAtLength(L * i / n); pts.push({ x: q.x, y: q.y }); }
    return pts;
  });
  holder.remove();
  const out = { strokes };
  cache.set(ch, out);
  return out;
}

// ---------- hình học ----------
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const pathLen = pts => { let s = 0; for (let i = 1; i < pts.length; i++) s += dist(pts[i - 1], pts[i]); return s; };
export function resample(pts, n = 32) {
  if (pts.length === 1) return Array.from({ length: n }, () => ({ ...pts[0] }));
  const L = [0]; for (let i = 1; i < pts.length; i++) L.push(L[i - 1] + dist(pts[i - 1], pts[i]));
  const total = L[L.length - 1];
  if (total < 1e-6) return Array.from({ length: n }, () => ({ ...pts[0] }));
  const out = []; let j = 0;
  for (let k = 0; k < n; k++) {
    const t = total * k / (n - 1);
    while (j < L.length - 2 && L[j + 1] < t) j++;
    const seg = L[j + 1] - L[j] || 1, f = Math.min(1, Math.max(0, (t - L[j]) / seg));
    out.push({ x: pts[j].x + (pts[j + 1].x - pts[j].x) * f, y: pts[j].y + (pts[j + 1].y - pts[j].y) * f });
  }
  return out;
}
const centroid = pts => ({ x: pts.reduce((s, p) => s + p.x, 0) / pts.length, y: pts.reduce((s, p) => s + p.y, 0) / pts.length });
const meanDist = (a, b) => a.reduce((s, p, i) => s + dist(p, b[i]), 0) / a.length;

// Phép biến đổi (phóng to/thu nhỏ + dời) đưa nét người viết về khung chữ mẫu, ước lượng từ các nét đã đúng
function estimate(pairs, lo = 0.55, hi = 1.7) {
  const U = pairs.flatMap(p => p.u), E = pairs.flatMap(p => p.e);
  const uc = centroid(U), ec = centroid(E);
  const su = U.reduce((s, p) => s + (p.x - uc.x) ** 2 + (p.y - uc.y) ** 2, 0), se = E.reduce((s, p) => s + (p.x - ec.x) ** 2 + (p.y - ec.y) ** 2, 0);
  const s = su > 1e-6 ? Math.min(hi, Math.max(lo, Math.sqrt(se / su))) : 1;
  return { uc, ec, s };
}
const apply = (tf, pts) => pts.map(p => ({ x: (p.x - tf.uc.x) * tf.s + tf.ec.x, y: (p.y - tf.uc.y) * tf.s + tf.ec.y }));

export const LEVELS = { easy: { mul: 1.45, backwards: true, hintAfter: 2 }, mid: { mul: 1.0, backwards: false, hintAfter: 3 }, hard: { mul: 0.75, backwards: false, hintAfter: 99 } };

// So một nét người viết với nét mẫu. user, exp: danh sách điểm trong khung 109×109. pairs: các cặp nét đã đúng trước đó.
// Trả về { ok, reason: 'shape'|'reversed'|'size'|'place', d }
export function matchStroke(user, exp, pairs, level = 'mid') {
  const lv = LEVELS[level] || LEVELS.mid;
  const T = 9.5 * lv.mul, TE = 17 * lv.mul;
  const u = resample(user, 32), e = resample(exp, 32);
  let tf;
  if (pairs.length) tf = estimate(pairs);
  else { // nét đầu tiên: chưa biết người viết đặt chữ ở đâu, căn theo chính nét này (nhưng không cho lệch quá xa)
    const lu = pathLen(user), le = pathLen(exp);
    const s = lu > 1 ? Math.min(1.8, Math.max(0.5, le / lu)) : 1;
    tf = { uc: centroid(u), ec: centroid(e), s };
    if (dist(tf.uc, tf.ec) > 38) return { ok: false, reason: 'place', d: 99 };
  }
  const ua = apply(tf, u);
  const dF = meanDist(ua, e), dR = meanDist(ua.slice().reverse(), e);
  // độ dài so trên đường đã thưa bớt (12 điểm) để tay run không làm nét “dài ra” một cách giả tạo
  const coarse = p => pathLen(resample(p, 12));
  const le = coarse(e), lr = coarse(ua) / Math.max(1, le);
  const short = le < 14; // chấm nhỏ, nét ngắn: tay run làm tỉ lệ độ dài sai lệch nhiều
  if (lr < (short ? 0.15 : 0.45) || lr > (short ? 5 : 2.2)) return { ok: false, reason: 'size', d: dF };
  const okF = dF <= T && dist(ua[0], e[0]) <= TE && dist(ua[ua.length - 1], e[e.length - 1]) <= TE;
  if (okF) return { ok: true, d: dF };
  if (dR <= T) return lv.backwards ? { ok: true, d: dR, reversed: true } : { ok: false, reason: 'reversed', d: dR };
  return { ok: false, reason: 'shape', d: dF };
}

// ---------- dữ liệu nét chữ Hán (Make Me a Hanzi): dùng đường tâm của từng nét ----------
const ZH_DATA = c => `https://cdn.jsdelivr.net/npm/hanzi-writer-data@2.0.1/${encodeURIComponent(c)}.json`;
const JP_DATA = c => `https://cdn.jsdelivr.net/gh/chanind/hanzi-writer-data-jp@master/data/${encodeURIComponent(c)}.json`;
const hanCache = new Map();
export async function loadHan(ch, lang) {
  const key = lang + ':' + ch;
  if (hanCache.has(key)) return hanCache.get(key);
  for (const u of lang === 'ja' ? [JP_DATA(ch), ZH_DATA(ch)] : [ZH_DATA(ch)]) { // kanji ưu tiên dữ liệu tiếng Nhật
    try {
      const r = await fetch(u); if (!r.ok) continue;
      const d = await r.json(); if (!d.medians?.length) continue;
      // toạ độ gốc: x 0..1024, y 900..-124 (y hướng lên) -> khung 109×109, y hướng xuống
      const out = { strokes: d.medians.map(m => m.map(([x, y]) => ({ x: x / 1024 * 109, y: (900 - y) / 1024 * 109 }))) };
      hanCache.set(key, out); return out;
    } catch { /* thử nguồn khác */ }
  }
  throw new Error('chưa có dữ liệu nét cho chữ này');
}
// Dữ liệu nét của một ký tự (chữ Hán, kana, chữ cái/số), hoặc null nếu không có (Hangul…)
export async function loadStrokesFor(ch, lang) {
  const c = ch.codePointAt(0);
  if (/\p{Script=Han}/u.test(ch)) return (await loadHan(ch, lang)).strokes;
  if ((c >= 0x3041 && c <= 0x30FF) || /^[A-Za-z0-9]$/.test(ch)) return (await loadKvg(ch)).strokes;
  return null;
}

// ---------- chấm cả bản vẽ sau khi viết xong ----------
// Một nét người viết (đã căn) có khớp nét mẫu không. ua, e: đã lấy mẫu 32 điểm.
function pairInfo(ua, e, lv, T, TE) {
  const dF = meanDist(ua, e), dR = meanDist(ua.slice().reverse(), e);
  const coarse = p => pathLen(resample(p, 12)), le = coarse(e), lr = coarse(ua) / Math.max(1, le), short = le < 14;
  if (lr < (short ? 0.15 : 0.4) || lr > (short ? 5 : 2.5)) return { ok: false, d: dF };
  if (dF <= T && dist(ua[0], e[0]) <= TE && dist(ua[ua.length - 1], e[e.length - 1]) <= TE) return { ok: true, d: dF };
  if (dR <= T) return { ok: lv.backwards, rev: true, d: dR };
  return { ok: false, d: dF };
}
const bboxOf = pts => { const xs = pts.map(p => p.x), ys = pts.map(p => p.y); return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) }; };

// user, exp: danh sách nét (mỗi nét là danh sách điểm) trong khung 109×109.
// Trả về { score 0..100, ordered, matched, expected, written, status[] ('ok'|'order'|'missing'|'rev'), msg, aligned }
export function gradeDrawing(user, exp, level = 'mid') {
  const lv = LEVELS[level] || LEVELS.mid, T = 11 * lv.mul, TE = 20 * lv.mul;
  const m = user.length, n = exp.length;
  if (!m) return { score: 0, ordered: 0, matched: 0, expected: n, written: 0, status: exp.map(() => 'missing'), msg: 'Chưa viết nét nào.', aligned: [] };
  const U = user.map(s => resample(s, 32)), E = exp.map(s => resample(s, 32));
  const uAll = U.flat(), eAll = E.flat();
  // hai cách căn ban đầu (theo tâm và độ lớn; theo khung bao quanh), chọn cách ghép được nhiều nét nhất
  const ub = bboxOf(uAll), eb = bboxOf(eAll);
  const bbTf = { uc: { x: (ub.x0 + ub.x1) / 2, y: (ub.y0 + ub.y1) / 2 }, ec: { x: (eb.x0 + eb.x1) / 2, y: (eb.y0 + eb.y1) / 2 },
    s: Math.min(3.5, Math.max(0.3, Math.min((eb.x1 - eb.x0 + 1) / (ub.x1 - ub.x0 + 1), (eb.y1 - eb.y0 + 1) / (ub.y1 - ub.y0 + 1)))) };
  let best = null;
  for (const init of [estimate([{ u: uAll, e: eAll }], 0.3, 3.5), bbTf]) {
    let tf = init, res = null;
    for (let it = 0; it < 4; it++) {
      const ok = U.map(u => { const ua = apply(tf, u); return E.map(e => pairInfo(ua, e, lv, T, TE)); });
      // ghép theo thứ tự (dãy con chung dài nhất)
      const L = Array.from({ length: m + 1 }, () => new Int16Array(n + 1));
      for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = Math.max(L[i + 1][j], L[i][j + 1], ok[i][j].ok ? L[i + 1][j + 1] + 1 : -1);
      const ord = []; let i = 0, j = 0;
      while (i < m && j < n) {
        if (ok[i][j].ok && L[i][j] === L[i + 1][j + 1] + 1) { ord.push({ i, j, rev: !!ok[i][j].rev }); i++; j++; }
        else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++;
      }
      res = { tf, ok, ord };
      if (ord.length >= 2) tf = estimate(ord.map(p => ({ u: U[p.i], e: E[p.j] })), 0.3, 3.5); else break;
    }
    if (!best || res.ord.length > best.ord.length) best = res;
  }
  const { tf, ok, ord } = best;
  // ghép không cần thứ tự (để biết nét nào đúng hình nhưng sai thứ tự)
  const cand = []; for (let i = 0; i < m; i++) for (let j = 0; j < n; j++) if (ok[i][j].ok) cand.push({ i, j, d: ok[i][j].d, rev: !!ok[i][j].rev });
  cand.sort((a, b) => a.d - b.d);
  const usedU = new Set(), usedE = new Set(), any = new Map();
  for (const c of cand) if (!usedU.has(c.i) && !usedE.has(c.j)) { usedU.add(c.i); usedE.add(c.j); any.set(c.j, c); }
  const ordJ = new Map(ord.map(p => [p.j, p]));
  const status = exp.map((_, j) => (ordJ.has(j) ? (ordJ.get(j).rev ? 'rev' : 'ok') : any.has(j) ? 'order' : 'missing'));
  const Lc = ord.length, Uc = any.size;
  const score = Math.min(100, Math.round(100 * (Lc + 0.6 * (Uc - Lc)) / Math.max(m, n)));
  const parts = [`${Lc}/${n} nét đúng`];
  const miss = status.map((s, j) => (s === 'missing' ? j + 1 : 0)).filter(Boolean);
  if (miss.length) parts.push(`thiếu hoặc sai nét ${miss.join(', ')}`);
  if (Uc > Lc) parts.push(`${Uc - Lc} nét đúng hình nhưng sai thứ tự`);
  if (m > Uc) parts.push(`${m - Uc} nét thừa`);
  const rev = status.filter(s => s === 'rev').length; if (rev) parts.push(`${rev} nét ngược hướng`);
  return { score, ordered: Lc, matched: Uc, expected: n, written: m, status, msg: parts.join(' · '), aligned: user.map(s => apply(tf, s)) };
}

// ---------- khung viết ----------
// opts: { strokes, size, mode: 'trace'|'free', level, onMessage(text), onDone({mistakes, strokes}) }
export function createCoach(host, opts) {
  const { strokes, size } = opts;
  const n = strokes.length, dpr = Math.min(2, devicePixelRatio || 1), k = size / 109;
  const c = document.createElement('canvas');
  c.width = size * dpr; c.height = size * dpr; c.style.width = size + 'px'; c.style.height = size + 'px'; c.className = 'hwpad';
  host.innerHTML = ''; host.appendChild(c);
  const ctx = c.getContext('2d');
  ctx.scale(dpr, dpr);
  const lw = Math.max(5, size * 0.045);
  let idx = 0, misses = 0, mistakes = 0, pairs = [], accepted = [], drawing = null, flash = null, anim = null, done = false, hintOn = false;
  const level = () => opts.level || 'mid';
  const say = t => opts.onMessage?.(t);

  const stroke = (pts, color, width = lw, upto = 1) => {
    if (!pts.length) return;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const m = Math.max(1, Math.round((pts.length - 1) * upto));
    if (pts.length === 1) { ctx.beginPath(); ctx.arc(pts[0].x * k, pts[0].y * k, width / 2, 0, 7); ctx.fill(); return; }
    ctx.beginPath(); ctx.moveTo(pts[0].x * k, pts[0].y * k);
    for (let i = 1; i <= m; i++) ctx.lineTo(pts[i].x * k, pts[i].y * k);
    ctx.stroke();
  };
  const raw = pts => pts.map(p => ({ x: p.x / k, y: p.y / k }));

  function redraw() {
    ctx.clearRect(0, 0, size, size);
    ctx.strokeStyle = '#2c313a'; ctx.lineWidth = 1; ctx.setLineDash([4, 4]);
    ctx.beginPath(); ctx.moveTo(size / 2, 0); ctx.lineTo(size / 2, size); ctx.moveTo(0, size / 2); ctx.lineTo(size, size / 2); ctx.stroke(); ctx.setLineDash([]);
    if (opts.mode !== 'free' || anim) strokes.forEach((s, i) => { if (i >= idx || done) stroke(s, 'rgba(255,255,255,.13)', lw); });
    if (anim) { // đang chạy nét mẫu
      strokes.forEach((s, i) => { if (i < anim.i) stroke(s, '#e8eaed'); else if (i === anim.i) stroke(s, '#7cc4ff', lw, anim.f); });
      return;
    }
    accepted.forEach(s => stroke(s, done ? '#6fcf7f' : '#e8eaed'));
    if (hintOn && !done && strokes[idx]) stroke(strokes[idx], '#7cc4ff', lw + 1);
    if (flash) stroke(flash.pts, '#ff7b72', lw);
    if (drawing) stroke(drawing.map(p => ({ x: p.x / k, y: p.y / k })), '#ffb84d');
  }

  function evaluate(user) {
    const uPts = user.map(p => ({ x: p.x / k, y: p.y / k }));
    if (pathLen(uPts) < 3 && uPts.length < 3) { drawing = null; redraw(); return; } // chạm nhẹ: bỏ qua
    const exp = strokes[idx], r = matchStroke(uPts, exp, pairs, level());
    drawing = null;
    if (r.ok) {
      const u = resample(uPts, 32), e = resample(exp, 32);
      pairs.push({ u, e }); accepted.push(exp); idx++; misses = 0; hintOn = false;
      say(r.reversed ? 'Nét đúng (viết ngược hướng, lần sau nên viết đúng hướng).' : '');
      if (idx >= n) { done = true; redraw(); opts.onDone?.({ mistakes, strokes: n }); return; }
    } else {
      mistakes++; misses++;
      flash = { pts: uPts }; setTimeout(() => { flash = null; redraw(); }, 380);
      let msg = { shape: 'Nét chưa giống, thử lại.', reversed: 'Sai hướng nét: viết ngược rồi.', size: 'Nét quá ngắn hoặc quá dài so với chữ.', place: 'Nét nằm quá xa chỗ của chữ.' }[r.reason];
      // nét này có phải là một nét khác (sai thứ tự)?
      if (r.reason === 'shape' || r.reason === 'size') {
        for (let j = idx + 1; j < n; j++) { if (matchStroke(uPts, strokes[j], pairs, level()).ok) { msg = `Sai thứ tự: đây là nét số ${j + 1}, bây giờ cần nét số ${idx + 1}.`; break; }
        }
      }
      say(msg);
      if (misses >= (LEVELS[level()] || LEVELS.mid).hintAfter) hintOn = true;
    }
    redraw();
  }

  const pos = e => { const r = c.getBoundingClientRect(); return { x: (e.clientX - r.left) * (size / r.width), y: (e.clientY - r.top) * (size / r.height) }; };
  c.addEventListener('pointerdown', e => {
    if (done || anim) return;
    try { c.setPointerCapture(e.pointerId); } catch { /* bỏ qua */ }
    drawing = [pos(e)]; redraw(); e.preventDefault();
  });
  c.addEventListener('pointermove', e => { if (drawing) { drawing.push(pos(e)); redraw(); } });
  const up = () => { if (drawing) { const u = drawing; evaluate(u); } };
  c.addEventListener('pointerup', up); c.addEventListener('pointercancel', up);

  let raf = 0;
  function animate(loop = true) {
    cancelAnimationFrame(raf);
    const per = 650, gap = 350, t0 = performance.now();
    const total = n * (per + gap) + 900;
    const tick = now => {
      const t = (now - t0) % total, i = Math.min(n - 1, Math.floor(t / (per + gap))), within = t - i * (per + gap);
      anim = { i: t >= n * (per + gap) ? n : i, f: Math.min(1, within / per) };
      redraw();
      if (loop || now - t0 < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
  }
  function stopAnim() { cancelAnimationFrame(raf); anim = null; redraw(); }

  redraw();
  return {
    animate, stopAnim,
    restart() { stopAnim(); idx = 0; misses = 0; mistakes = 0; pairs = []; accepted = []; done = false; hintOn = false; drawing = null; redraw(); },
    hint() { hintOn = true; mistakes += 1; redraw(); },
    destroy() { cancelAnimationFrame(raf); },
    get strokeCount() { return n; },
  };
}
