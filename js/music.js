// Nhạc nền: hai danh sách riêng, mỗi danh sách tự trộn ngẫu nhiên và phát liên tục.
//   bg    = nhạc nền ở mọi mục NGOÀI Thế giới (Học, Thư viện, Ôn tập, Soạn, Nhiệm vụ)
//   world = nhạc riêng khi đang ở Thế giới (đọc Article, Social)
// File lưu trong máy (IndexedDB, như video), không đồng bộ, không tốn dung lượng đám mây. Danh sách + cài đặt lưu riêng từng máy.
import { $, esc, toast, bus, uid, pickFile, fmtMB } from './util.js';
import * as store from './store.js';
import { M } from './media.js';
import { muted, setMuted } from './sfx.js';

const LKEY = 'musicLists', CKEY = 'musicCfg', PRE = 'mus_';
const LISTS = ['bg', 'world'];
const jget = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k) || 'null'); return v ?? d; } catch { return d; } };
let lists = (() => {
  const l = jget(LKEY, null);
  if (l) return { bg: l.bg || [], world: l.world || [] };
  const old = jget('musicList', []); // bản cũ chỉ có một danh sách: chuyển sang nhạc nền
  return { bg: Array.isArray(old) ? old : [], world: [] };
})();
let cfg = { bgOn: true, worldOn: true, vol: 0.4, ...jget(CKEY, {}) };
const saveL = () => { try { localStorage.setItem(LKEY, JSON.stringify(lists)); } catch {} };
const saveC = () => { try { localStorage.setItem(CKEY, JSON.stringify(cfg)); } catch {} };

let aud = null, cur = null, curL = null, bags = { bg: [], world: [] }, forced = false, userPause = false, videoOn = false, hinted = false;

const ctx = () => (document.body.dataset.view === 'world' ? 'world' : 'bg');
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
async function play(id) {
  const l = ctx();
  if (!lists[l].length) return;
  if (curL !== l || !lists[l].some(t => t.id === cur)) { cur = null; }
  id = id && lists[l].some(t => t.id === id) ? id : cur || pick(l);
  if (!id) return;
  aud.volume = cfg.vol;
  if (cur !== id || curL !== l || !aud.src) {
    const url = await store.assetURL(id);
    if (!url) { drop(l, id); return play(); }
    cur = id; curL = l; aud.src = url; aud.loop = lists[l].length === 1;
  }
  try { await aud.play(); } catch {
    if (!hinted) { hinted = true; toast('Bấm 🎵 rồi “Phát” một lần để trình duyệt cho phép phát nhạc', 4000); }
  }
  draw();
}
function stop() { aud?.pause(); draw(); }
function next() { if (want()) play(pick(ctx())); else { aud?.pause(); draw(); } }
function sync() {
  const l = ctx();
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
  const playing = !!aud && !aud.paused;
  $('#muPlay').textContent = playing ? '⏸ Dừng' : '▶ Phát';
  const t = playing && curL ? lists[curL].find(x => x.id === cur) : null;
  $('#muNow').innerHTML = t ? `${curL === 'world' ? '🌍' : '🎧'} Đang phát: <b class="gt mu-name">${esc(t.name)}</b>` : 'Đang dừng.';
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
  $('#muVol').oninput = e => { cfg.vol = (+e.target.value || 0) / 100; aud.volume = cfg.vol; };
  $('#muVol').onchange = saveC;
  bus.on('mute', () => { sync(); draw(); }); // nút âm thanh chung ở đầu trang
  bus.on('settingsOpen', draw);
  // đổi mục: vào Thế giới thì chuyển sang nhạc Thế giới, ra ngoài thì về nhạc nền
  bus.on('show', () => { userPause = false; forced = false; sync(); });
  // video / âm thanh bài học đang phát thì nhạc tạm nghỉ để không lẫn tiếng
  M.addEventListener('play', () => { videoOn = true; if (!aud.paused) aud.pause(); });
  M.addEventListener('pause', () => { videoOn = false; sync(); });
  M.addEventListener('ended', () => { videoOn = false; sync(); });
  draw();
}
