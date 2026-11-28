import { $, $$, bus, LANGS, getLang, setLang, toast, loadSimplifier } from './util.js';
import * as store from './store.js';
import { loadPrefs, prefs, savePrefs } from './prefs.js';
import * as player from './player.js';
import * as library from './library.js';
import * as notes from './notes.js';
import * as quests from './quests.js';
import * as calendar from './calendar.js';
import * as scenes from './scenes.js';
import * as side from './side.js';
import * as alignui from './alignui.js';
import * as dictation from './dictation.js';
import * as speak from './speak.js';
import * as shadowrec from './shadowrec.js';
import * as review from './review.js';
import * as backup from './backup.js';
import * as prompts from './prompts.js';
import * as subedit from './subedit.js';
import * as subpaste from './subpaste.js';
import * as segments from './segments.js';
import { mountIcons, emojify } from './pixicons.js';
import { initI18n } from './i18n.js';
import * as settings from './settings.js';
import * as sfx from './sfx.js';
import * as fx from './fx.js';
import * as music from './music.js';
import * as lbl from './lbl.js';
import * as focusmode from './focusmode.js';
import * as videx from './videx.js';
import * as passport from './passport.js';
import * as lame from './lame.js';
import * as skin from './skin.js';
import * as trash from './trash.js';
import * as lookup from './lookup.js';
import * as vocab from './vocab.js';
import * as find from './find.js';
import * as shortcuts from './shortcuts.js';
import * as offline from './offline.js';
import * as readaloud from './readaloud.js';
import * as cueedit from './cueedit.js';

const firebaseConfig = {
  apiKey: "AIzaSyDP5ijko_nBpuqxVKxxviBA91kHYNhvrdo",
  authDomain: "shadowing-f1924.firebaseapp.com",
  projectId: "shadowing-f1924",
  storageBucket: "shadowing-f1924.firebasestorage.app",
  messagingSenderId: "762378914402",
  appId: "1:762378914402:web:77f6506ca4f5f5c5635f3b"
};

// ---------- điều hướng ----------
const cap = s => s[0].toUpperCase() + s.slice(1);
// Nút Back chỉ lùi BÊN TRONG mục lớn đang mở, không bao giờ nhảy sang mục lớn khác.
// trail chỉ giữ đường đi vào trang con (video, tài liệu, ghi chú) và đường ra khỏi TeaLab (trong game thanh mục bị ẩn).
const trail = [];
const CHILD = new Set(['player', 'doc', 'notes', 'tealab']);
let backing = false;
function show(view) {
  const prev = document.body.dataset.view;
  if (!backing && prev && prev !== view) {
    if (view === trail[trail.length - 1]) trail.pop();                      // trang con tự quay về trang mẹ
    else if (CHILD.has(view)) { trail.push(prev); if (trail.length > 40) trail.shift(); }
    else trail.length = 0;                                                  // sang mục lớn khác: không lùi ngược qua mục cũ
  }
  document.body.dataset.view = view;
  $$('.view').forEach(s => s.classList.toggle('active', s.id === 'v' + cap(view)));
  const hl = view === 'doc' || view === 'notes' ? 'library' : view === 'player' ? (prev === 'passport' ? 'passport' : 'library') : view; // Học tiếp từ Passport thì giữ sáng Passport, còn lại coi video mở từ Thư viện
  $$('#nav button').forEach(b => b.classList.toggle('on', b.dataset.view === hl));
  bus.emit('show', view);
  scrollTo(0, 0);
  refreshBack();
}
bus.on('nav', show);
$('#nav').addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.view); });

// ---------- nút Back chung (cả nút Back của Android / trình duyệt) ----------
// Mỗi lần bấm Back lùi MỘT bước, theo thứ tự: hộp thoại đang mở → khung tra từ → khung video bên cạnh →
// nút “←” của trang con đang hiện (ví dụ bài đọc về danh sách) → trang đã xem trước đó.
const btnBack = $('#btnBack');
const topDialog = () => [...document.querySelectorAll('dialog[open]')].pop();
const lookupOpen = () => { const p = $('#lkPop'); return !!p && !p.hidden; };
const sideOpen = () => document.body.classList.contains('side-open');
const pageBack = () => [...document.querySelectorAll('.view.active button')].find(b => /^\s*←/.test(b.textContent) && b.getClientRects().length); // getClientRects: đúng cả với nút nằm trong khung cố định (toàn màn hình)

// ----- lịch sử các tab con của từng mục (Ôn tập: Ôn thẻ → Viết chữ → Từ mới…), mỗi mục giữ riêng -----
// Mỗi dòng: [mã, nút đang chọn, nút để bấm lại, thuộc tính phân biệt]. Thêm một dải tab mới ở đâu thì thêm một dòng.
const TABS = [
  ['lib', '#libTabs button.on', '#libTabs button', 'data-t'],
  ['rv', '#rvTabs button.on', '#rvTabs button', 'data-t'],
  ['hw', '#hwView button.on', '#hwView button', 'data-v'],
  ['vc', '.vc-nav button.on', '.vc-nav button', 'data-v'],
  ['quest', '#qTabs button.on', '#qTabs button', 'data-qt'],
  ['cal', '.cal-acts button[data-cal^="v"].primary', '.cal-acts button', 'data-cal'],
  ['world', '#wSec button.on', '#wSec button', 'data-s'],
  ['scm', '.scm-tabs button.on', '.scm-tabs button', 'data-tab'],
  ['pl', '#plMode button.on', '#plMode button', 'data-m'],
  ['plr', '#plRs button.on', '#plRs button', 'data-r'],
  ['abc', '.seg button.on[data-abc]', '.seg button', 'data-abc'],
  ['kmode', '#vLibrary .seg:not([id]) button.on[data-m]', '#vLibrary .seg:not([id]) button', 'data-m'],
];
const steps = {};   // view -> [{ was: {mã: giá trị trước đó}, page }]
let undoing = false;
const curView = () => document.body.dataset.view;
const viewEl = () => $('#v' + cap(curView() || 'library'));
function snapshot() {
  const root = viewEl(), s = {};
  if (!root) return s;
  for (const [k, on, , attr] of TABS) { const b = root.querySelector(on); if (b) s[k] = b.getAttribute(attr); }
  if (curView() === 'passport') { const p = passport.navState(); if (p) s.pass = p; }
  return s;
}
const pageId = () => { const b = pageBack(); return b ? b.id || b.textContent.trim() : ''; }; // đang đứng ở trang con nào (nhận ra qua nút “←” của nó)
document.addEventListener('click', e => {
  if (undoing || !e.target.closest('.view.active')) return;
  const btn = e.target.closest('button');
  if (btn && /^\s*←/.test(btn.textContent)) return; // chính nó là nút quay lại: không ghi thành bước mới
  const view = curView(), before = snapshot();
  setTimeout(() => { // đợi mục vẽ xong rồi so: tab nào đổi thì nhớ giá trị cũ
    if (curView() !== view) return;
    const after = snapshot(), was = {};
    for (const k in before) if (k in after && after[k] !== before[k]) was[k] = before[k];
    if (!Object.keys(was).length) return;
    const st = (steps[view] ||= []);
    st.push({ was, page: pageId() });
    if (st.length > 30) st.shift();
    refreshBack();
  }, 250);
}, true);
function undoStep() { // lùi một bước tab trong mục đang mở; bỏ qua những bước không còn gì để đổi
  const st = steps[curView()];
  while (st?.length) {
    const { was } = st.pop(), now = snapshot(), root = viewEl();
    if (was.pass !== undefined) {
      if (was.pass !== now.pass) { passport.navRestore(was.pass); return true; }
      continue;
    }
    const todo = TABS.filter(([k]) => was[k] !== undefined && was[k] !== now[k]);
    if (!todo.length || !root) continue;
    let done = false;
    undoing = true;
    try {
      for (const [k, , all, attr] of todo) { // ngoài trước, trong sau
        const b = viewEl().querySelector(`${all}[${attr}="${CSS.escape(was[k])}"]`);
        if (b) { b.click(); done = true; }
      }
    } finally { undoing = false; }
    if (done) return true;
  }
  return false;
}
const hasStep = () => !!steps[curView()]?.length;
const canBack = () => !!(topDialog() || focusmode.on() || lookupOpen() || sideOpen() || pageBack() || hasStep() || trail.length);
function goBack() {
  const d = topDialog();
  if (d) { d.close(); return true; }
  if (focusmode.on()) { focusmode.exit(); return true; }
  if (lookupOpen()) { $('#lkClose').click(); return true; }
  if (sideOpen()) { $('#sClose').click(); return true; }
  const b = pageBack(), top = steps[curView()]?.at(-1);
  // vừa đổi tab ngay trên trang này thì lùi tab trước; còn nếu đã đi sâu hơn (có nút “←” mới) thì thoát trang đó trước
  if (top && (!b || top.page === pageId()) && undoStep()) return true;
  if (b) { b.click(); return true; }
  if (trail.length) { backing = true; try { show(trail.pop()); } finally { backing = false; } return true; }
  return false;
}
// Android / trình duyệt: khi có gì để lùi thì giữ sẵn một mục trong lịch sử; bấm Back của máy sẽ rơi vào đó và ta lùi một bước trong app.
// Hết chỗ để lùi thì bỏ mục đó, nên Back của máy lại thoát app như bình thường.
let armed = false, silent = false;
function refreshBack() {
  const can = canBack();
  btnBack.disabled = !can;
  if (can && !armed) { history.pushState({ shadow: 1 }, ''); armed = true; }
  else if (!can && armed) { armed = false; silent = true; history.back(); }
}
addEventListener('popstate', () => {
  if (silent) { silent = false; return; }
  if (!armed) return;
  armed = false;
  goBack();
  refreshBack();
});
let backT = 0;
const soon = () => { clearTimeout(backT); backT = setTimeout(() => { refreshBack(); backT = setTimeout(refreshBack, 450); }, 80); }; // sau khi trang tự vẽ xong (kể cả phần tải chậm)
for (const ev of ['click', 'keyup', 'close']) document.addEventListener(ev, soon, true);
btnBack.onclick = () => goBack();

// ---------- nút bật / tắt âm thanh nhanh ----------
// Một nút chung: tắt / bật cả nhạc nền lẫn tiếng nút bấm. Chi tiết (âm lượng, kiểu âm, danh sách nhạc) nằm trong ⚙ Cài đặt.
const btnSound = $('#btnSound');
const syncSfx = () => { btnSound.classList.toggle('off', sfx.muted()); btnSound.title = sfx.muted() ? 'Bật lại toàn bộ âm thanh' : 'Tắt toàn bộ âm thanh (nhạc nền và tiếng nút bấm)'; };
btnSound.onclick = () => {
  sfx.setMuted(!sfx.muted()); syncSfx();
  if (!sfx.muted()) sfx.play('ok');
  toast(sfx.muted() ? 'Đã tắt toàn bộ âm thanh' : 'Đã bật lại âm thanh', 1400);
};
bus.on('mute', syncSfx);

// ---------- chọn ngôn ngữ ----------
// Thu gọn: chỉ một nút hiện ngôn ngữ đang học; bấm vào mới xổ ra menu 4 ngôn ngữ để chọn
function renderLangs() {
  const cur = LANGS.find(l => l.id === getLang()) || LANGS[0], nm = l => l.name.replace('Tiếng ', '');
  $('#langs').innerHTML = `<button class="chip on" id="langCur" aria-haspopup="true" title="Đổi ngôn ngữ đang học">${cur.short}<small class="lname"> ${nm(cur)}</small> ▾</button>` +
    `<div id="langMenu" hidden>${LANGS.map(l => `<button class="chip ${l.id === cur.id ? 'on' : ''}" data-l="${l.id}">${l.short}<small class="lname"> ${nm(l)}</small></button>`).join('')}</div>`;
}
const closeLangMenu = () => { const m = $('#langMenu'); if (m) m.hidden = true; };
$('#langs').addEventListener('click', e => {
  const pick = e.target.closest('#langMenu [data-l]'), cur = e.target.closest('#langCur'), menu = $('#langMenu');
  if (pick) { closeLangMenu(); setLang(pick.dataset.l); return; }
  if (!cur || !menu) return;
  menu.hidden = !menu.hidden;
  if (!menu.hidden) { const r = cur.getBoundingClientRect(); menu.style.top = (r.bottom + 6) + 'px'; menu.style.left = Math.max(6, Math.min(r.left, innerWidth - 190)) + 'px'; }
});
document.addEventListener('click', e => { if (!e.target.closest('#langs')) closeLangMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLangMenu(); });
addEventListener('scroll', closeLangMenu, { passive: true });
bus.on('lang', renderLangs);

// ---------- đăng nhập + đồng bộ ----------
let fb = null;
store.onStatus(t => { $('#sync').textContent = t; });
$('#btnUser').onclick = async () => {
  if (!fb) { toast('Chưa kết nối được Firebase (đang offline?)'); return; }
  if (fb.auth.currentUser) { if (confirm('Đăng xuất? Dữ liệu vẫn còn trong máy này.')) fb.A.signOut(fb.auth); return; }
  try { await fb.A.signInWithPopup(fb.auth, new fb.A.GoogleAuthProvider()); }
  catch (err) { toast('Đăng nhập lỗi: ' + (err.code || err.message), 5000); }
};
function onUser(u) {
  $('#btnUser').textContent = u ? '👤 ' + (u.displayName || u.email || 'OK').split(' ').pop() : 'Đăng nhập';
  $('#btnUser').classList.toggle('in', !!u);
  store.setUser(u, fb);
}
async function initFirebase() {
  try {
    const B = 'https://www.gstatic.com/firebasejs/10.14.1/';
    const [{ initializeApp }, A, F] = await Promise.all([import(B + 'firebase-app.js'), import(B + 'firebase-auth.js'), import(B + 'firebase-firestore.js')]);
    const app = initializeApp(firebaseConfig);
    let db;
    try { db = F.initializeFirestore(app, { localCache: F.persistentLocalCache({ tabManager: F.persistentMultipleTabManager() }) }); }
    catch { db = F.getFirestore(app); }
    const auth = A.getAuth(app);
    fb = { A, F, db, auth };
    A.onAuthStateChanged(auth, onUser);
  } catch (e) {
    console.warn('Firebase không tải được:', e);
    $('#sync').textContent = 'offline: chưa đồng bộ';
  }
}

// ---------- khởi động ----------
mountIcons();
initI18n(); // dịch chữ giao diện nếu chọn tiếng Anh (phải chạy trước emojify)
emojify(); // emoji trong giao diện -> biểu tượng pixel (nội dung của người dùng giữ nguyên)
settings.init();
sfx.init();
fx.init();
await store.initStore(); performance.mark('store-ready');
loadPrefs();
syncSfx();
bus.on('store', c => { if (c === 'prefs' || c === '*') { loadPrefs(); bus.emit('prefs'); } });
renderLangs();
// Mỗi mục tự khởi động trong khối try riêng: một mục lỗi (ví dụ thiếu file sau khi tải bản mới lên) không làm các mục còn lại ngừng chạy; lỗi được ghi lại để thanh báo lỗi hiển thị
for (const [name, mod] of Object.entries({ player, side, library, notes, quests, calendar, scenes, alignui, dictation, speak, shadowrec, review, backup, subedit, subpaste, segments, trash, lookup, vocab, find, shortcuts, offline, readaloud, cueedit, music, focusmode, videx, passport, lame, skin, lbl, prompts })) {
  try { mod.init(); } catch (e) { console.error('Lỗi khởi động mục ' + name, e); (window.__bootErrors ||= []).push('init ' + name + ': ' + (e && e.message || e)); }
}
// ---------- nạp muộn các mục lớn không cần ngay lúc mở app (SCM, Thế giới): app mở nhanh hơn, vào mục đó lần đầu vẫn tức thì vì được nạp ngầm sau vài giây ----------
const lazyMod = (name, path, view) => {
  const st = { p: null, ok: false };
  const load = () => (st.p ||= import(path).then(m => { try { m.init(); } catch (e) { console.error('Lỗi khởi động mục ' + name, e); (window.__bootErrors ||= []).push('init ' + name + ': ' + (e && e.message || e)); } st.ok = true; return m; })
    .catch(e => { st.p = null; console.error('Không nạp được mục ' + name, e); (window.__bootErrors ||= []).push('nạp ' + name + ': ' + (e && e.message || e)); toast('Không tải được mục ' + name + ': kiểm tra mạng rồi thử lại', 5000); }));
  bus.on('show', v => { if (v === view && !st.ok) load().then(m => { if (m && document.body.dataset.view === view) bus.emit('show', view); }); }); // vào mục khi chưa nạp xong: nạp rồi báo “show” lại để mục tự vẽ
  return load;
};
const loadWorld = lazyMod('Thế giới', './world.js', 'world'), loadScm = lazyMod('SCM', './scm.js', 'scm');
lazyMod('TeaLab', './tealab.js', 'tealab'); // game: chỉ nạp khi bấm vào 🍵 TeaLab (không nằm trong gói tải đầu)
$('#btnTeaLab').onclick = () => show('tealab');
const idle = f => ('requestIdleCallback' in window ? requestIdleCallback(f, { timeout: 6000 }) : setTimeout(f, 3000));
idle(() => { loadWorld(); idle(loadScm); });
show('library');
initFirebase();
import('./contentstats.js').then(m => m.init()).catch(e => console.warn('Thống kê nội dung không tải được:', e)); // nạp riêng: thiếu file này thì chỉ mất bảng thống kê, app vẫn chạy
performance.mark('booted'); document.documentElement.dataset.booted = '1'; // đã khởi động xong: tắt thanh báo lỗi khởi động trong index.html
loadSimplifier(); // sẵn sàng đổi phồn thể → giản thể (chỉ ~100 KB)
if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
  const hadSW = !!navigator.serviceWorker.controller;
  navigator.serviceWorker.register('sw.js').catch(() => {});
  navigator.serviceWorker.addEventListener('controllerchange', () => { if (hadSW) toast('Đã cập nhật app: mở lại app để dùng bản mới', 7000); });
  setTimeout(async () => { // máy chủ đã có bản mới mà chưa cài được (thường do chưa tải lên đủ file): báo để bạn biết, app vẫn chạy bản cũ nhất quán
    try { const v = ((await (await fetch('sw.js', { cache: 'no-store' })).text()).match(/CACHE = '([^']+)'/) || [])[1]; if (v && !((await caches.has(v)) && await (await caches.open(v)).match('__installed'))) toast('Có bản cập nhật nhưng chưa cài xong (máy chủ có thể còn thiếu file). Hãy thử mở lại sau vài phút.', 9000); } catch { /* offline */ }
  }, 30000);
}

