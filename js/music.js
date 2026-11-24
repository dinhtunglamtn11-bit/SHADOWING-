// Nhạc nền: hai danh sách riêng, mỗi danh sách tự trộn ngẫu nhiên và phát liên tục.
//   bg    = nhạc nền ở mọi mục NGOÀI Thế giới (Học, Thư viện, Ôn tập, Soạn, Nhiệm vụ)
//   world = nhạc riêng khi ĐỌC TOÀN MÀN HÌNH ở Thế giới (Article, Flash, Focus, Keyword); không bấm 📺 thì vẫn là nhạc nền, không bị ngắt (đổi được trong Cài đặt)
//   story = nhạc riêng khi đọc toàn màn hình ở Story (sách)
// File lưu trong máy (IndexedDB, như video), không đồng bộ, không tốn dung lượng đám mây. Danh sách + cài đặt lưu riêng từng máy.
import { $, $$, esc, toast, bus, uid, pickFile, fmtMB } from './util.js';
import * as store from './store.js';
import { M } from './media.js';
import { muted, setMuted } from './sfx.js';

const LKEY = 'musicLists', CKEY = 'musicCfg', PRE = 'mus_';
const LISTS = ['bg', 'world', 'story', 'game'];
const jget = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v ?? d; } catch { return d; } };
let lists = (() => {
  const l = jget(LKEY, null);
  if (l) return { bg: l.bg || [], world: l.world || [], story: l.story || [], game: l.game || [] };
  const old = jget('musicList', []); // bản cũ chỉ có một danh sách: chuyển sang nhạc nền
  return { bg: Array.isArray(old) ? old : [], world: [], story: [], game: [] };
})();
let cfg = { bgOn: true, worldOn: true, storyOn: true, gameOn: true, vol: 0.4, worldMode: 'full', fallback: 'bg', resume: true, fade: 0.6, ...jget(CKEY, {}) };
const saveL = () => { try { localStorage.setItem(LKEY, JSON.stringify(lists)); } catch {} };
const saveC = () => { try { localStorage.setItem(CKEY, JSON.stringify(cfg)); } catch {} };

let aud = null, cur = null, curL = null, bags = { bg: [], world: [], story: [], game: [] }, forced = false, userPause = false, videoOn = false, hinted = false;
const pos = { bg: null, world: null, story: null, game: null }; // bài và vị trí đang nghe của từng danh sách, để quay lại đúng chỗ sau khi chuyển danh sách
let lastCtx = 'bg', rampT = 0, rampG = 0;

// Danh sách nhạc theo chỗ bạn đang đứng. Mặc định chỉ khi ĐỌC TOÀN MÀN HÌNH (body.sp-reading, dùng chung cho Article / Flash / Focus / Keyword / Story)
// mới đổi sang nhạc Thế giới / Story; còn lại là nhạc nền, không bị ngắt. worldMode = 'enter' trả về cách cũ (vào Thế giới là đổi).
const reading = () => document.body.classList.contains('sp-reading');
const where = () => {
  if (document.body.dataset.view === 'tealab') return 'game'; // đang chơi TeaLab: nhạc riêng của game (trống thì dùng nhạc nền)
  if (document.body.dataset.view !== 'world') return 'bg';
  if (cfg.worldMode !== 'enter' && !reading()) return 'bg';
  return document.body.dataset.wsec === 'story' ? 'story' : 'world';
};
const ctx = () => { // danh sách đọc trống hoặc đang tắt: giữ nhạc nền (hoặc im lặng nếu bạn chọn Tắt nhạc)
  const l = where();
  return l !== 'bg' && cfg.fallback !== 'off' && (!lists[l].length || !cfg[l + 'On']) ? 'bg' : l;
};
const want = () => {
  const l = ctx();
  return !muted() && !videoOn && lists[l].length && (forced || (!userPause && cfg[l + 'On']));
};

function pick(l) { // túi trộn: mỗi bài phát một lượt rồi mới xáo lại
  const b = bags[l];
  if (!b.length) {
    bags[l] = lists[l].map(t => t.id).sort(() => Math.random() - 0.5);
    if (bags[l].length > 1 && bags[l][0] === cur) bags[l].push(bags[l].shift());
  }
  return bags[l].shift();
}
// Âm lượng tăng dần (chỉ khi bắt đầu nhạc mới / đổi danh sách). Dùng setInterval + một lần chốt cuối để tab chạy nền không bị kẹt ở âm lượng nhỏ.
function ramp(to, secs) {
  clearInterval(rampT); clearTimeout(rampG);
  if (!aud) return; if (!(secs > 0)) { aud.volume = to; return; }
  const from = aud.volume, t0 = performance.now();
  rampT = setInterval(() => { const k = Math.min(1, (performance.now() - t0) / (secs * 1000)); aud.volume = from + (to - from) * k; if (k >= 1) clearInterval(rampT); }, 50);
  rampG = setTimeout(() => { clearInterval(rampT); aud.volume = to; }, secs * 1000 + 400);
}
async function play(id) {
  const l = ctx();
  if (!lists[l].length) return;
  if (curL !== l || !lists[l].some(t => t.id === cur)) { cur = null; }
  const explicit = !!(id && lists[l].some(t => t.id === id)), rp = cfg.resume && pos[l] && lists[l].some(t => t.id === pos[l].id) ? pos[l] : null;
  id = explicit ? id : cur || (rp ? rp.id : pick(l));
  if (!id) return;
  let fadeIn = false;
  if (cur !== id || curL !== l || !aud.src) {
    const url = await store.assetURL(id);
    if (!url) { drop(l, id); return play(); }
    cur = id; curL = l; aud.src = url; aud.loop = lists[l].length === 1;
    if (rp && rp.id === id && !explicit && rp.t > 1) aud.addEventListener('loadedmetadata', () => { try { aud.currentTime = Math.min(rp.t, Math.max(0, (aud.duration || rp.t + 1) - 1)); } catch { /* bỏ qua */ } }, { once: true }); // quay lại đúng chỗ đang nghe
    fadeIn = cfg.fade > 0;
  }
  clearInterval(rampT); clearTimeout(rampG); aud.volume = fadeIn ? 0 : cfg.vol;
  try { await aud.play(); if (fadeIn) ramp(cfg.vol, cfg.fade); } catch {
    aud.volume = cfg.vol;
    if (!hinted) { hinted = true; toast('Bấm 🎵 rồi “Phát” một lần để trình duyệt cho phép phát nhạc', 4000); }
  }
  draw();
}
function stop() { aud?.pause(); draw(); }
// danh sách nhạc cần dùng đã đổi (vào / thoát đọc toàn màn hình, đổi cài đặt): chuyển nhạc; không đổi thì không làm gì nên nhạc không bị ngắt
function recheck() {
  if (!aud) return; const c = ctx(); if (c === lastCtx) return;
  lastCtx = c; sync(); // giữ nguyên việc bạn đã chủ động dừng nhạc: bấm đọc toàn màn hình không tự bật nhạc lại
}
function next() { if (want()) play(pick(ctx())); else { aud?.pause(); draw(); } }
function sync() {
  const l = ctx(); lastCtx = l;
  if (want()) { if (aud.paused || curL !== l) { if (curL !== l) { aud.pause(); cur = null; } play(); } }
  else if (!aud.paused) stop(); else draw();
}
function drop(l, id) {
  lists[l] = lists[l].filter(t => t.id !== id); bags[l] = bags[l].filter(x => x !== id);
  if (cur === id) { cur = null; aud?.pause(); }
  saveL(); store.delAsset(id);
}

async function add(l) {
  const files = (await pickFile('audio/*,.mp3,.m4a,.ogg,.wav,.aac,.flac', true)).filter(f => f.type.startsWith('audio/') || /\.(mp3|m4a|ogg|wav|aac|flac|opus)$/i.test(f.name));
  if (!files.length) return;
  let n = 0;
  for (const f of files) {
    const id = PRE + uid();
    try { await store.putAsset(id, f, f.name); lists[l].push({ id, name: f.name.replace(/\.[^.]+$/, ''), size: f.size }); n++; }
    catch (e) { toast('Không lưu được ' + f.name + ': ' + (e.message || e), 4000); }
  }
  saveL();
  if (n) { bags[l] = []; toast(`Đã thêm ${n} bài nhạc`, 1800); sync(); }
  draw();
}

function draw() {
  const dlg = $('#musicBox'); if (!dlg) return;
  $('#muVol').value = Math.round(cfg.vol * 100);
  for (const [sel, key] of [['#muMode', 'worldMode'], ['#muFb', 'fallback']]) $$(`${sel} button[data-v]`, dlg).forEach(b => b.classList.toggle('on', b.dataset.v === cfg[key]));
  const rb = $('#muResume', dlg); if (rb) { rb.classList.toggle('on', !!cfg.resume); rb.textContent = cfg.resume ? '☑ Bật' : '☐ Tắt'; }
  const fd = $('#muFade', dlg); if (fd) fd.value = String(cfg.fade);
  const playing = !!aud && !aud.paused;
  $('#muPlay').textContent = playing ? '⏸ Dừng' : '▶ Phát';
  const t = playing && curL ? lists[curL].find(x => x.id === cur) : null;
  $('#muNow').innerHTML = t ? `${curL === 'world' ? '🌍' : curL === 'story' ? '📖' : curL === 'game' ? '🍵' : '🎧'} Đang phát: <b class="gt mu-name">${esc(t.name)}</b>` : 'Đang dừng.';
  for (const l of LISTS) {
    const sec = $(`.mu-sec[data-l="${l}"]`, dlg), on = cfg[l + 'On'];
    const tg = $('[data-on]', sec); tg.classList.toggle('on', on); tg.textContent = on ? '☑ Bật' : '☐ Tắt';
    $('.mu-list', sec).innerHTML = lists[l].length
      ? lists[l].map(x => `<div class="mu-row ${playing && x.id === cur ? 'on' : ''}"><span class="mu-name grow">${esc(x.name)}</span><small class="dim">${fmtMB(x.size || 0)}</small><button class="btn" data-del="${x.id}" title="Xóa bài này">✕</button></div>`).join('')
      : '<div class="dim">Chưa có bài nào.</div>';
  }
}

export function init() {
  const dlg = $('#musicBox'); if (!dlg) return;
  aud = Object.assign(new Audio(), { preload: 'auto' });
  aud.addEventListener('ended', next);
  aud.addEventListener('timeupdate', () => { if (cur && curL) pos[curL] = { id: cur, t: aud.currentTime }; });
  aud.addEventListener('error', () => { if (cur && curL) { const id = cur, l = curL; toast('Không phát được một bài nhạc, đã bỏ qua', 2500); drop(l, id); next(); } });
  aud.addEventListener('pause', draw); aud.addEventListener('play', draw);
  dlg.addEventListener('click', e => {
    const sec = e.target.closest('.mu-sec'); if (!sec) return;
    const l = sec.dataset.l, b = e.target.closest('button'); if (!b) return;
    if (b.matches('[data-on]')) { cfg[l + 'On'] = !cfg[l + 'On']; saveC(); userPause = false; forced = false; sync(); draw(); }
    else if (b.matches('[data-add]')) add(l);
    else if (b.matches('[data-clr]')) { if (lists[l].length && confirm('Xóa hết nhạc trong danh sách này?')) { [...lists[l]].forEach(t => drop(l, t.id)); forced = false; sync(); draw(); } }
    else if (b.dataset.del) { const was = cur === b.dataset.del; drop(l, b.dataset.del); if (was) next(); draw(); }
  });
  $('#muPlay').onclick = () => {
    if (!lists[ctx()].length) { toast('Danh sách này chưa có bài nào: bấm “＋ Thêm nhạc” bên dưới', 3000); return; }
    if (!aud.paused) { forced = false; userPause = true; stop(); } else { if (muted()) setMuted(false); forced = true; userPause = false; videoOn = false; play(); }
  };
  $('#muNext').onclick = () => { if (!lists[ctx()].length) return; forced = forced || !userPause; userPause = false; play(pick(ctx())); };
  $('#muPrev').onclick = () => { aud.currentTime = 0; };
  $('#muVol').oninput = e => { cfg.vol = (+e.target.value || 0) / 100; clearInterval(rampT); clearTimeout(rampG); aud.volume = cfg.vol; };
  $('#muVol').onchange = saveC;
  // tùy chỉnh chuyển nhạc: lúc nào đổi sang nhạc Thế giới, danh sách trống thì sao, quay lại đúng bài, mờ dần
  const segs = { '#muMode': ['worldMode', ['full', 'enter']], '#muFb': ['fallback', ['bg', 'off']] };
  for (const [sel, [key]] of Object.entries(segs)) $(sel)?.addEventListener('click', e => { const b = e.target.closest('button[data-v]'); if (!b) return; cfg[key] = b.dataset.v; saveC(); recheck(); draw(); });
  $('#muResume')?.addEventListener('click', () => { cfg.resume = !cfg.resume; saveC(); draw(); });
  $('#muFade')?.addEventListener('change', e => { cfg.fade = +e.target.value || 0; saveC(); });
  // vào / thoát chế độ đọc toàn màn hình (class sp-reading trên body) hoặc đổi mục: đổi danh sách nhạc nếu cần
  new MutationObserver(() => recheck()).observe(document.body, { attributes: true, attributeFilter: ['class', 'data-view', 'data-wsec'] });
  bus.on('mute', () => { sync(); draw(); }); // nút âm thanh chung ở đầu trang
  bus.on('settingsOpen', draw);
  bus.on('wsec', () => { userPause = false; forced = false; sync(); }); // đổi giữa Article / Flash / Focus / Story trong Thế giới
  // đổi mục: vào Thế giới thì chuyển sang nhạc Thế giới, ra ngoài thì về nhạc nền
  bus.on('show', () => { userPause = false; forced = false; sync(); });
  // video / âm thanh bài học đang phát thì nhạc tạm nghỉ để không lẫn tiếng
  M.addEventListener('play', () => { videoOn = true; if (!aud.paused) aud.pause(); });
  M.addEventListener('pause', () => { videoOn = false; sync(); });
  M.addEventListener('ended', () => { videoOn = false; sync(); });
  draw();
}
