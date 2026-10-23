// Thế giới của tôi: trang đọc riêng — bài đọc (chữ) chia theo thư mục chủ đề, có nút 🎲 chọn chủ đề ngẫu nhiên.
// Bài đọc và câu hỏi nằm chung một trang: đọc xong kéo xuống làm các câu hỏi, bấm “Hoàn thành bài đọc” để chấm điểm.
// Bài lưu trong “articles”, thư mục chủ đề trong “wfolders” (tự đồng bộ như các dữ liệu khác). Nhập nhiều bài một lúc bằng cú pháp:
//   === Tiêu đề        @chủ đề: …   @biểu tượng: 🏮   @nguồn: …      rồi nội dung bài, các đoạn cách nhau một dòng trống
//   --- hỏi           rồi các dòng câu hỏi (cùng cú pháp với “Bài tập của tôi”: TN, DS, S, G, Đ, K, N, NG)
import { $, $$, esc, toast, uid, pickFile, getLang, langInfo, bus } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import { rngOf } from './quiz.js';
import { zhText } from './prefs.js';
import { parseSet, build, countKinds, flat, buildTest } from './exparse.js';
import { runSheet, timeHtml, wireTime, readTime } from './exsheet.js';
import { setPrompt, newsPrompt, promptPanel, NEWS_SYNTAX } from './exprompts.js';
import { pix } from './pixicons.js';
import * as wvocab from './wvocab.js';
import * as social from './social.js';

const DAY = 864e5;
const WD = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const COLORS = ['#ff8f3a', '#5fd068', '#ff8fc0', '#7ec3ff', '#a98bff', '#ffd84d', '#ff7b88', '#4fd1c5'];
const CJK = /[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/gu;
const SHORT = { mc: 'Trắc nghiệm', tf: 'Đúng/Sai', type: 'Tự luận', fill: 'Điền từ', order: 'Sắp xếp câu', listen: 'Nghe-chọn', listentype: 'Nghe-gõ', cloze: 'Kéo thả', vocab: 'Từ vựng' };

let root = null, mode = 'feed', curId = null, editId = null;
const filter = { folder: '', unread: false }; // folder: '' = tất cả, '_none' = chưa phân loại, hoặc id thư mục
const pkQ = { kinds: ['TN', 'DS', 'S', 'K'], count: 5 }, pkN = { kinds: ['TN', 'DS'], count: 4 };

const hash = s => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const artsOf = lang => store.list('articles').filter(a => (a.lang || 'zh') === lang);
const foldersOf = lang => store.list('wfolders').filter(f => (f.lang || 'zh') === lang).sort((a, b) => a.name.localeCompare(b.name));
const folderOf = a => { const f = a.folder && store.get('wfolders', a.folder); return f && !f.deleted ? f : null; };
const colorOf = a => COLORS[hash(folderOf(a)?.name || a.title || '') % COLORS.length];
const colorOfName = n => COLORS[hash(n || '') % COLORS.length];
const minutes = a => { const b = a.body || ''; return Math.max(1, Math.round((b.match(CJK) || []).length / 320 + b.replace(CJK, ' ').split(/\s+/).filter(Boolean).length / 180)); };
const leadOf = a => (a.body || '').replace(/\s+/g, ' ').trim().slice(0, 110);
const qCount = a => { const p = parseSet(a.qtext || ''); return p.qs.length + (p.vocab.length >= 2 ? p.vocab.length * 2 : 0); };
const paras = b => String(b || '').split(/\n{2,}/).map(x => x.trim()).filter(Boolean);
const bodyHtml = a => paras(a.body).map(p => `<p>${esc(p)}</p>`).join('');

function ensureFolder(name, lang) {
  name = (name || '').trim();
  if (!name) return '';
  const have = foldersOf(lang).find(f => f.name.toLowerCase() === name.toLowerCase());
  if (have) return have.id;
  const id = uid();
  store.put('wfolders', id, { name, lang, created: Date.now() });
  return id;
}

// ---------- phân tích cú pháp nhập nhiều bài ----------
export function parseNews(text) {
  const arts = [], errors = [];
  let cur = null;
  const flush = () => {
    if (!cur) return;
    const body = cur.body.join('\n').replace(/\n{3,}/g, '\n\n').trim(), qtext = cur.q.join('\n').trim();
    if (!cur.title) errors.push({ msg: `dòng ${cur.line}: bài thiếu tiêu đề sau “===”` });
    else if (!body) errors.push({ msg: `bài “${cur.title}”: chưa có nội dung` });
    else {
      const p = parseSet(qtext);
      p.errors.forEach(e => errors.push({ msg: `bài “${cur.title}”, câu hỏi dòng ${e.line}: ${e.msg}` }));
      arts.push({ title: cur.title, tag: cur.meta.tag || '', emoji: cur.meta.emoji || '', source: cur.meta.source || '', body, qtext, nq: p.qs.length + p.vocab.length });
    }
    cur = null;
  };
  text.replace(/\r/g, '').split('\n').forEach((raw, li) => {
    const h = raw.match(/^\s*={3,}\s*(.*?)\s*(?:={3,})?\s*$/);
    if (h) { flush(); cur = { title: h[1], meta: {}, body: [], q: [], inQ: false, line: li + 1 }; return; }
    if (!cur) { if (raw.trim()) errors.push({ msg: `dòng ${li + 1}: nằm ngoài bài nào (mỗi bài bắt đầu bằng “=== Tiêu đề”)` }); return; }
    if (!cur.inQ && /^-{3,}\s*(hoi|cau hoi|q|question|questions|bai tap)?\s*$/.test(flat(raw))) { cur.inQ = true; return; }
    if (cur.inQ) { cur.q.push(raw); return; }
    const m = raw.match(/^\s*@\s*([^:：]+?)\s*[:：]\s*(.*)$/);
    if (m) {
      const k = flat(m[1]);
      if (['chu de', 'chude', 'tag', 'topic', 'thu muc', 'folder'].includes(k)) cur.meta.tag = m[2].trim();
      else if (['bieu tuong', 'bieutuong', 'icon', 'emoji'].includes(k)) cur.meta.emoji = m[2].trim();
      else if (['nguon', 'source'].includes(k)) cur.meta.source = m[2].trim();
      else cur.body.push(raw);
      return;
    }
    cur.body.push(raw);
  });
  flush();
  return { arts, errors };
}

const SAMPLES = {
  zh: `=== 茶：中国人的日常
@chủ đề: Văn hóa
@biểu tượng: 🍵
@nguồn: Bài mẫu
中国人喜欢喝茶。很多人早上起床以后，先泡一杯茶，再吃早饭。

茶有很多种，比如绿茶、红茶和花茶。南方人常常喝绿茶，北方人更喜欢喝花茶。

朋友来家里做客，主人会先给客人倒茶。喝茶不只是一种习惯，也是表达欢迎的方式。
--- hỏi
TN: 很多人早上起床以后先做什么？ | *泡一杯茶 | 吃早饭 | 去上班 | 看报纸 ~ 文中说：先泡一杯茶，再吃早饭。
DS: 北方人更喜欢喝绿茶。 | sai ~ 北方人更喜欢喝花茶。
TN: 朋友来做客时，主人会先做什么？ | *给客人倒茶 | 给客人做饭 | 带客人出门 | 请客人唱歌
S: 喝茶 / 是 / 表达 / 欢迎 / 的 / 方式 | Uống trà là cách thể hiện sự chào đón
K: 茶有很多种，比如[绿茶]、[红茶]和花茶。 | 咖啡 / 牛奶 | Điền tên các loại trà

=== 地铁：城市里的“快车”
@chủ đề: Đời sống
@biểu tượng: 🚇
@nguồn: Bài mẫu
在大城市里，很多人坐地铁上班。地铁很快，也不会堵车。

我家离地铁站只有五分钟。每天早上七点，我走到地铁站，坐二十分钟就到公司了。

地铁里人很多，所以大家常常站着看手机。有时候我也在地铁上听中文。
--- hỏi
TN: 为什么很多人坐地铁上班？ | *又快又不会堵车 | 比较便宜 | 可以睡觉 | 有座位 | 不用走路
DS: 我家离地铁站很远。 | sai ~ 只有五分钟。
G: Từ “地铁” nghĩa là gì? | tàu điện ngầm / metro
N: 地铁站 | *Ga tàu điện ngầm | Sân bay | Bệnh viện | Trường học`,
  en: `=== A Morning at the Library
@chủ đề: Daily life
@biểu tượng: 📚
@nguồn: Sample
Every Saturday morning, Anna walks to the city library. It opens at nine o'clock, and she likes to arrive a few minutes early.

She usually sits near the window with a cup of coffee and reads a book for two hours. Sometimes she meets her neighbour, Tom, who comes to borrow comics for his son.

Before she goes home, Anna chooses two new books for the week.
--- hỏi
TN: When does the library open? | *At nine o'clock | At eight o'clock | At ten o'clock | At noon
DS: Anna reads for four hours. | sai ~ She reads for two hours.
S: Anna / walks / to / the / library | Anna đi bộ đến thư viện
G: Who does Anna sometimes meet? | Tom
K: Anna sits near the [window] with a cup of [coffee]. | door / tea / park | Điền từ còn thiếu

=== Why Do We Dream?
@chủ đề: Science
@biểu tượng: 🌙
@nguồn: Sample
Scientists say that most people dream several times every night, even if they do not remember it in the morning.

Dreams happen mostly during a stage of sleep called REM. During this stage the brain is very active, but the body stays still.

Some researchers believe dreams help us remember important things and forget the rest.
--- hỏi
TN: When do most dreams happen? | *During REM sleep | Before bed | In the afternoon | During breakfast
DS: The body moves a lot during REM sleep. | sai ~ The body stays still.
TN: What do some researchers think dreams help us do? | *Remember important things | Sleep longer | Feel hungry | Wake up early`,
  ko: `=== 김치 이야기
@chủ đề: Văn hóa
@biểu tượng: 🥬
@nguồn: Bài mẫu
김치는 한국 사람들이 매일 먹는 음식입니다. 배추에 고춧가루와 마늘을 넣어서 만듭니다.

가을에는 가족들이 모여서 함께 김치를 만듭니다. 이것을 김장이라고 합니다.
--- hỏi
TN: 김치는 무엇으로 만듭니까? | *배추 | 쌀 | 고기 | 우유
DS: 김장은 봄에 합니다. | sai ~ 가을에 합니다.
S: 가족들이 / 모여서 / 김치를 / 만듭니다 | Cả nhà quây quần làm kim chi`,
  ja: `=== 日本の朝ごはん
@chủ đề: Văn hóa
@biểu tượng: 🍙
@nguồn: Bài mẫu
日本の朝ごはんは、ごはんとみそ汁と魚がよくあります。

忙しい朝は、おにぎりとお茶だけにする人もいます。
--- hỏi
TN: 日本の朝ごはんによくあるものは何ですか。 | *ごはんとみそ汁と魚 | パンとコーヒー | ラーメン | ケーキ
DS: 忙しい朝は、おにぎりだけにする人もいます。 | sai ~ おにぎりとお茶です。
S: ごはんと / みそ汁と / 魚が / あります | Có cơm, súp miso và cá`,
};

// ---------- khung chung ----------
// lookupOnly: chỉ giữ nút Tra từ (Social không có “Đọc” cả trang)
const tools = (on, lookupOnly = false) => {
  const t = $('#nwTools');
  if (!t) return;
  t.hidden = !on;
  $$('[data-readall],[data-tapread]', t).forEach(b => { b.hidden = lookupOnly; });
};
const dateLine = () => { const d = new Date(); return `${WD[d.getDay()]}, ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`; };

// Thế giới có 2 mục: Article (bài đọc + câu hỏi) và Social (lướt bài đăng ngắn, không câu hỏi)
const store0 = k => { try { return localStorage.getItem(k); } catch { return null; } };
const save0 = (k, v) => { try { localStorage.setItem(k, v); } catch { /* bỏ qua */ } };
let sec = store0('worldSec') === 'social' ? 'social' : 'article';
const secBar = () => `<div class="seg" id="wSec"><button data-s="article" class="${sec === 'article' ? 'on' : ''}">📰 Article</button><button data-s="social" class="${sec === 'social' ? 'on' : ''}">📱 Social</button></div>`;
function bindSec() {
  $$('#wSec button', root).forEach(b => {
    b.onclick = () => { if (b.dataset.s === sec) return; sec = b.dataset.s; save0('worldSec', sec); mode = 'feed'; render(); scrollTo(0, 0); };
  });
}

// Bố cục khi đọc bài: cùng một trang (câu hỏi nằm dưới bài) hoặc chia đôi (bài bên trái, câu hỏi bên phải); giới hạn thời gian làm bài
const getLay = () => (store0('worldLay') === 'split' ? 'split' : 'stack');
const getTime = () => Math.max(0, Math.min(300, Math.round(+store0('worldTime')) || 0));

export function render() {
  root = $('#worldRoot');
  if (!root) return;
  if (mode === 'read' && curId && store.get('articles', curId)) return; // đang đọc / làm câu hỏi: giữ nguyên
  if (mode === 'vocab') return wvocab.render(root, { back: () => { mode = 'feed'; drawFeed(); scrollTo(0, 0); } });
  if (mode === 'testrun' && root.querySelector('.sheet')) return;
  if (mode === 'test') return drawTestBuilder();
  if (mode === 'edit') return drawEditor();
  if (mode === 'import') return drawImport();
  mode = 'feed';
  if (sec === 'social') { tools(true, true); social.render(root, { bar: secBar, bindBar: bindSec }); return; }
  drawFeed();
}

// ---------- trang chủ ----------
function card(a, big) {
  const nq = qCount(a), f = folderOf(a);
  return `<article class="nw-card ${big ? 'big' : ''}" data-open="${a.id}" tabindex="0" style="--cc:${colorOf(a)}">
    <div class="nw-cover"><span class="nw-emoji">${esc(a.emoji || '📰')}</span>${a.done ? '<em class="nw-new ok">✓</em>' : a.lastRead ? '' : '<em class="nw-new">MỚI</em>'}</div>
    <div class="nw-bd">${f ? `<span class="nw-tag">${esc(f.name)}</span>` : ''}<h3 class="nw-h">${esc(a.title)}</h3><p class="nw-lead">${esc(leadOf(a))}…</p>
      <div class="nw-meta"><span>⏱ ${minutes(a)} phút</span>${nq ? `<span>❓ ${nq} câu hỏi</span>` : ''}${a.best != null ? `<span class="${a.best >= 80 ? 'ok' : a.best >= 50 ? 'miss' : 'bad'}">⭐ ${a.best}%</span>` : ''}</div></div></article>`;
}

function folderTiles(all, folders) {
  const none = all.filter(a => !folderOf(a)).length;
  const tile = (id, name, n, art, col, user) => `<button class="wf ${filter.folder === id ? 'on' : ''}" data-wf="${esc(id)}" style="--cc:${col}"><span class="wfa">${pix(art)}</span><b class="${user ? 'gt' : ''}">${esc(name)}</b><small>${n}</small></button>`;
  return `<div class="wfs">${tile('', 'Tất cả', all.length, 'a_world', '#7ec3ff')}${folders.map(f => tile(f.id, f.name, all.filter(a => a.folder === f.id).length, 'a_folder', colorOfName(f.name), true)).join('')}${none && folders.length ? tile('_none', 'Chưa phân loại', none, 'a_folder', '#c9c3e6') : ''}<button class="wf add" id="wfNew"><span class="wfa">${pix('a_plus')}</span><b>Thư mục mới</b></button></div>`;
}

function drawFeed() {
  tools(false);
  const lang = getLang(), all = artsOf(lang), folders = foldersOf(lang);
  if (filter.folder && filter.folder !== '_none' && !folders.some(f => f.id === filter.folder)) filter.folder = '';
  const inF = a => (!filter.folder || (filter.folder === '_none' ? !folderOf(a) : a.folder === filter.folder));
  const list = all.filter(a => inF(a) && (!filter.unread || !a.done)).sort((a, b) => (b.created || 0) - (a.created || 0));
  const done = all.filter(a => a.done).length, sc = all.filter(a => a.best != null);
  const avg = sc.length ? Math.round(sc.reduce((n, a) => n + a.best, 0) / sc.length) : null;
  const head = `${secBar()}<div class="nw-mast"><div class="nw-art">${pix('a_world')}</div><div class="nw-name">THẾ GIỚI CỦA TÔI</div><div class="nw-date">${dateLine()}</div>${all.length ? `<div class="nw-stats"><span>${all.length} bài</span><span>Đã đọc ${done}/${all.length}</span>${avg != null ? `<span>⭐ Điểm TB ${avg}%</span>` : ''}</div>` : ''}</div>`;
  if (!all.length) {
    root.innerHTML = `${head}<div class="empty"><div class="emptyart">${pix('a_world')}</div>Chưa có bài ${esc(langInfo().name)} nào.<br>Viết bài, nhập nhiều bài một lúc bằng cú pháp (kèm prompt nhờ AI), hoặc thêm vài bài mẫu để xem thử.
      <div class="row c" style="margin-top:12px"><button class="btn primary" id="nwAdd">＋ Viết bài</button><button class="btn" id="nwImport">📥 Nhập nhiều bài</button><button class="btn" id="nwSample">✨ Thêm bài mẫu</button></div></div>`;
    bindFeed(); return;
  }
  const hero = !filter.folder && !filter.unread && list.length >= 3 ? list[Math.floor(Date.now() / DAY) % list.length] : null;
  const fsel = filter.folder && filter.folder !== '_none' ? folders.find(f => f.id === filter.folder) : null;
  root.innerHTML = `${head}
    <div class="row"><button class="btn primary big" id="nwRandom" title="Chọn ngẫu nhiên một chủ đề (thư mục) rồi mở một bài trong đó; chủ đề được phép lặp lại">🎲 Chủ đề ngẫu nhiên</button><button class="btn" id="nwAdd">＋ Viết bài</button><button class="btn" id="nwImport">📥 Nhập nhiều bài</button><button class="btn" id="nwVocab" title="Từ đã lưu khi đọc bài, kèm câu chứa từ; ôn và làm bài kiểm tra từ vựng">📖 Từ vựng (${wvocab.wordsOf(lang).length})</button><button class="btn" id="nwTest" title="Gom câu hỏi của các bài đọc thành một bài kiểm tra, theo nhóm hoặc ngẫu nhiên">📋 Tạo bài kiểm tra</button><button class="chip ${filter.unread ? 'on' : ''}" id="nwUnread">● Chưa đọc xong <small>${all.length - done}</small></button></div>
    ${folderTiles(all, folders)}
    ${fsel ? `<div class="row"><b class="gt">${esc(fsel.name)}</b><button class="btn" id="wfRen">✎ Đổi tên</button><button class="btn" id="wfDel">🗑 Xóa thư mục</button></div>` : ''}
    ${hero ? `<div class="nw-sec">⭐ Bài nổi bật hôm nay</div>${card(hero, true)}` : ''}
    ${list.length ? `<div class="nw-sec">${filter.folder || filter.unread ? 'Kết quả' : 'Mới nhất'}</div><div class="nw-grid">${list.filter(a => a !== hero).map(a => card(a)).join('')}</div>` : '<div class="empty">Không có bài nào khớp bộ lọc.</div>'}`;
  bindFeed();
}

function bindFeed() {
  bindSec();
  $('#nwAdd')?.addEventListener('click', () => { editId = null; mode = 'edit'; drawEditor(); });
  $('#nwImport')?.addEventListener('click', () => { mode = 'import'; drawImport(); });
  $('#nwSample')?.addEventListener('click', () => { const n = importArts(parseNews(SAMPLES[getLang()] || SAMPLES.zh).arts); toast(`Đã thêm ${n} bài mẫu`); drawFeed(); });
  $('#nwRandom')?.addEventListener('click', () => randomTopic(null));
  $('#nwVocab')?.addEventListener('click', () => { mode = 'vocab'; render(); });
  $('#nwTest')?.addEventListener('click', () => { mode = 'test'; drawTestBuilder(); });
  $('#nwUnread')?.addEventListener('click', () => { filter.unread = !filter.unread; drawFeed(); });
  $$('[data-wf]', root).forEach(b => b.onclick = () => { filter.folder = b.dataset.wf; drawFeed(); });
  $('#wfNew')?.addEventListener('click', () => {
    const name = (prompt('Tên thư mục chủ đề mới (ví dụ: Văn hóa, Du lịch, Khoa học):') || '').trim();
    if (name) { filter.folder = ensureFolder(name, getLang()); drawFeed(); }
  });
  $('#wfRen')?.addEventListener('click', () => {
    const f = store.get('wfolders', filter.folder), name = (prompt('Tên mới:', f?.name) || '').trim();
    if (name) { store.put('wfolders', filter.folder, { name }); drawFeed(); }
  });
  $('#wfDel')?.addEventListener('click', () => {
    const f = store.get('wfolders', filter.folder);
    if (!confirm(`Xóa thư mục “${f?.name}”? Các bài bên trong chuyển về “Chưa phân loại”.`)) return;
    store.list('articles').filter(a => a.folder === filter.folder).forEach(a => store.put('articles', a.id, { folder: '' }));
    store.del('wfolders', filter.folder); filter.folder = ''; drawFeed();
  });
  $$('[data-open]', root).forEach(c => {
    c.onclick = () => openArticle(c.dataset.open);
    c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openArticle(c.dataset.open); } };
  });
}

// ---------- ngẫu nhiên theo chủ đề: chọn một thư mục bất kỳ (được phép lặp lại), rồi một bài trong đó ----------
function randomTopic(excl) {
  const all = artsOf(getLang());
  if (!all.length) { toast('Chưa có bài nào để chọn ngẫu nhiên'); return; }
  const groups = new Map();
  for (const a of all) { const k = folderOf(a) ? a.folder : ''; if (!groups.has(k)) groups.set(k, []); groups.get(k).push(a); }
  const keys = [...groups.keys()], k = keys[Math.floor(Math.random() * keys.length)];
  let pool = groups.get(k);
  if (pool.length > 1 && excl) pool = pool.filter(a => a.id !== excl);
  const w = a => (a.done ? 1 : 3);
  let r = Math.random() * pool.reduce((n, a) => n + w(a), 0), pick = pool[pool.length - 1];
  for (const a of pool) { r -= w(a); if (r <= 0) { pick = a; break; } }
  toast(k ? `🎲 Chủ đề: ${store.get('wfolders', k).name}` : '🎲 Chủ đề: Chưa phân loại', 2200);
  openArticle(pick.id);
}

// ---------- đọc bài + câu hỏi trên cùng một trang ----------
function openArticle(id) {
  const a = store.get('articles', id);
  if (!a || a.deleted) { mode = 'feed'; drawFeed(); return; }
  mode = 'read'; curId = id; tools(true);
  if (!a.lastRead || Date.now() - a.lastRead > 36e5) store.put('articles', id, { lastRead: Date.now() });
  const L = a.lang || 'zh', bcp = langInfo(L).bcp, f = folderOf(a);
  const qs = build(parseSet(a.qtext || ''), { shuffle: false, listen: true, count: 0 }, rngOf('wd' + id + Date.now()));
  const lay = getLay(), limit = getTime();
  root.innerHTML = `<div class="row nw-bar"><button class="btn" id="nwBack">← Thế giới của tôi</button>
      <div class="seg" id="nwLay"><button data-l="stack" class="${lay === 'stack' ? 'on' : ''}" title="Bài đọc và câu hỏi nằm cùng một trang: đọc xong kéo xuống làm bài">☰ Cùng trang</button><button data-l="split" class="${lay === 'split' ? 'on' : ''}" title="Bài đọc ở bên trái, câu hỏi ở bên phải (màn hình rộng)">◫ Chia đôi</button></div>
      ${timeHtml('nwTime', limit)}<span class="grow"></span><button class="btn" id="nwRand" title="Chọn ngẫu nhiên một chủ đề rồi mở một bài trong đó">🎲 Chủ đề ngẫu nhiên</button></div>
    <div class="nw-lay ${lay}" id="nwLayBox"><div class="nw-left"><article class="nw-read">
      <div class="nw-hero" style="--cc:${colorOf(a)}"><span class="nw-emoji big">${esc(a.emoji || '📰')}</span>${f ? `<span class="nw-tag">${esc(f.name)}</span>` : ''}</div>
      <h1 class="nw-ttl" lang="${bcp}">${esc(a.title)}</h1>
      <div class="nw-by dim">${a.source ? `<span class="nw-src">${esc(a.source)}</span> · ` : ''}⏱ ${minutes(a)} phút đọc${a.best != null ? ` · ⭐ điểm cao nhất ${a.best}%` : ''}</div>
      <div class="nw-text" id="newsBody" data-aid="${id}" lang="${bcp}">${bodyHtml(a)}</div>
    </article></div>
    <div class="nw-right"><div class="nw-qsec"><div class="nw-sec">✍️ Câu hỏi về bài đọc</div>${qs.length ? '<div id="nwSheet"></div>'
      : `<div class="qcard nw-cta"><div class="dim">Bài này chưa có câu hỏi. Bấm “Sửa bài” để thêm (hoặc dùng prompt nhờ AI tạo câu hỏi).</div><div class="row"><button class="btn primary" id="nwMark">✔ Đánh dấu đã đọc xong</button></div></div>`}</div></div></div>
    <div class="row"><button class="btn" id="nwEdit">✎ Sửa bài</button><button class="btn" id="nwDel">🗑 Xóa bài</button></div>`;
  $('#nwBack').onclick = () => { mode = 'feed'; drawFeed(); scrollTo(0, 0); };
  $('#nwRand').onclick = () => randomTopic(id);
  $$('#nwLay button', root).forEach(b => b.onclick = () => { // đổi bố cục tại chỗ, không làm mất câu đã trả lời
    save0('worldLay', b.dataset.l);
    $$('#nwLay button', root).forEach(x => x.classList.toggle('on', x === b));
    $('#nwLayBox', root).className = 'nw-lay ' + b.dataset.l;
  });
  wireTime(root, 'nwTime');
  const setTime = () => { const m = readTime(root, 'nwTime'); save0('worldTime', m); toast(m ? `Giới hạn ${m} phút: bài được làm lại từ đầu` : 'Đã bỏ giới hạn thời gian'); openArticle(id); };
  $('#nwTime').addEventListener('change', () => { if ($('#nwTime').value !== 'custom') setTime(); });
  $('#nwTimeMin').addEventListener('change', setTime);
  $('#nwEdit').onclick = () => { editId = id; mode = 'edit'; drawEditor(); };
  $('#nwDel').onclick = () => { if (confirm('Xóa bài này? (vào Thùng rác, giữ 30 ngày)')) { store.del('articles', id); mode = 'feed'; drawFeed(); } };
  $('#nwMark')?.addEventListener('click', () => { finishRead(id, null); toast('Đã đánh dấu đã đọc xong ✓'); $('#nwMark').disabled = true; });
  if (qs.length) {
    const run = () => runSheet($('#nwSheet'), {
      qs, lang: L, title: '', src: a.title, submitLabel: 'Hoàn thành bài đọc', timeLimit: limit,
      onDone: r => finishRead(id, r.pct),
      onAgain: () => openArticle(id),
      extra: [{ label: '🎲 Chủ đề ngẫu nhiên', fn: () => randomTopic(id) }],
      onExit: () => { mode = 'feed'; drawFeed(); scrollTo(0, 0); }, exitLabel: '🌍 Thế giới của tôi',
    });
    run();
  }
  scrollTo(0, 0);
}

function finishRead(id, pct) {
  const a = store.get('articles', id); if (!a) return;
  const first = !a.done;
  store.put('articles', id, { done: a.done || Date.now(), lastRead: Date.now(), ...(pct != null ? { best: Math.max(a.best ?? 0, pct), tries: (a.tries || 0) + 1, lastScore: pct } : {}) });
  if (first) { tracker.world(); tracker.read(); }
}

// ---------- viết / sửa một bài ----------
function drawEditor() {
  tools(false);
  const a = editId ? store.get('articles', editId) : null, lang = a?.lang || getLang(), folders = foldersOf(lang);
  root.innerHTML = `<div class="row"><button class="btn" id="edBack">← Quay lại</button><b>${a ? '✎ Sửa bài' : '＋ Viết bài mới'}</b></div>
    <div class="qcard">
      <label class="dim">Tiêu đề<input id="edTitle" type="text" value="${esc(a?.title || '')}" placeholder="Tiêu đề bài đọc"></label>
      <div class="row"><label class="dim grow">Thư mục chủ đề<select id="edFolder"><option value="">Chưa phân loại</option>${folders.map(f => `<option value="${f.id}" ${a?.folder === f.id ? 'selected' : ''}>${esc(f.name)}</option>`).join('')}<option value="_new">＋ Thư mục mới…</option></select></label><label class="dim">Biểu tượng bài<input id="edEmoji" type="text" value="${esc(a?.emoji || '')}" maxlength="4" style="width:72px" placeholder="📰"></label>
        <label class="dim grow">Nguồn<input id="edSrc" type="text" value="${esc(a?.source || '')}" placeholder="(không bắt buộc)"></label></div>
      <label class="dim">Nội dung bài (các đoạn cách nhau một dòng trống)<textarea id="edBody" rows="12" spellcheck="false" placeholder="Dán hoặc gõ bài đọc ở đây…">${esc(a?.body || '')}</textarea></label>
      <details class="help"><summary>🤖 Nhờ AI tạo câu hỏi cho bài này (prompt)</summary><div id="edAiHost"></div></details>
      <label class="dim">Câu hỏi (mỗi dòng một câu: TN, DS, S, G, Đ, K, N, NG — cú pháp giống “Bài tập của tôi”)<textarea id="edQ" class="mono" rows="9" spellcheck="false" placeholder="TN: Câu hỏi? | *đáp án đúng | sai | sai | sai ~ giải thích">${esc(a?.qtext || '')}</textarea></label>
      <div id="edCheck" class="dim"></div>
      <div class="row"><button class="btn primary" id="edSave">💾 Lưu</button><button class="btn" id="edRead">💾 Lưu và đọc</button><button class="btn" id="edCancel">Hủy</button></div>
    </div>`;
  const q = $('#edQ'), body = $('#edBody'), fsel = $('#edFolder');
  fsel.onchange = () => {
    if (fsel.value !== '_new') return;
    const name = (prompt('Tên thư mục chủ đề mới:') || '').trim();
    const id = name ? ensureFolder(name, lang) : '';
    fsel.innerHTML = `<option value="">Chưa phân loại</option>${foldersOf(lang).map(f => `<option value="${f.id}">${esc(f.name)}</option>`).join('')}<option value="_new">＋ Thư mục mới…</option>`;
    fsel.value = id;
  };
  const check = () => {
    const p = parseSet(q.value), kc = countKinds(p);
    $('#edCheck').innerHTML = (p.qs.length + p.vocab.length ? `<span class="ok">✓ ${p.qs.length + p.vocab.length} câu hỏi hợp lệ</span> <span class="kbs">${Object.keys(kc).map(k => `<span class="kb">${esc(SHORT[k])} ${kc[k]}</span>`).join('')}</span>` : 'Chưa có câu hỏi.') +
      (p.errors.length ? `<div class="bad">${p.errors.length} dòng có lỗi:</div>` + p.errors.slice(0, 6).map(e => `<div class="bad">dòng ${e.line}: ${esc(e.msg)}</div>`).join('') : '');
  };
  q.addEventListener('input', check); check();
  let panel = null;
  $('#edAiHost').closest('details').addEventListener('toggle', e => {
    if (!e.target.open || panel) return;
    panel = promptPanel($('#edAiHost'), {
      state: pkQ, source: async () => body.value.trim(),
      build: o => setPrompt({ lang, kinds: o.kinds, count: o.count, title: $('#edTitle').value.trim(), source: o.source }),
      onPaste: text => { q.value = q.value.trim() ? q.value.replace(/\s+$/, '') + '\n' + text : text; check(); toast('Đã dán vào ô câu hỏi ✓'); },
    });
  });
  body.addEventListener('change', () => panel?.reload());
  const save = () => {
    const z = s => (lang === 'zh' ? zhText(s, 'zh') : s);
    const title = z($('#edTitle').value.trim()), text = z(body.value.trim());
    if (!title || !text) { toast('Cần có tiêu đề và nội dung bài'); return null; }
    const id = editId || uid(); editId = id;
    store.put('articles', id, { lang, title, folder: fsel.value === '_new' ? '' : fsel.value, emoji: $('#edEmoji').value.trim(), source: z($('#edSrc').value.trim()), body: text, qtext: z(q.value.trim()), created: a?.created || Date.now(), deleted: false });
    toast('Đã lưu ✓');
    return id;
  };
  $('#edSave').onclick = save;
  $('#edRead').onclick = () => { const id = save(); if (id) openArticle(id); };
  $('#edCancel').onclick = $('#edBack').onclick = () => { if (a) openArticle(editId); else { mode = 'feed'; drawFeed(); } };
}

// ---------- nhập nhiều bài ----------
function importArts(arts) {
  const lang = getLang(), have = new Set(artsOf(lang).map(a => a.title)), z = s => (lang === 'zh' ? zhText(s, 'zh') : s);
  let n = 0;
  arts.forEach((a, i) => {
    const title = z(a.title);
    if (have.has(title)) return;
    have.add(title);
    store.put('articles', uid(), { lang, title, folder: ensureFolder(z(a.tag), lang), emoji: a.emoji, source: z(a.source), body: z(a.body), qtext: z(a.qtext), created: Date.now() - i, deleted: false });
    n++;
  });
  return n;
}

function drawImport() {
  tools(false);
  const lang = getLang();
  root.innerHTML = `<div class="row"><button class="btn" id="imBack">← Quay lại</button><b>📥 Nhập nhiều bài một lúc</b></div>
    <div class="qcard">
      <details class="help"><summary>📖 Cú pháp bài đọc + câu hỏi</summary>
        <pre class="mono nw-syn">${esc(NEWS_SYNTAX)}</pre>
        <p>Mỗi bài bắt đầu bằng dòng <code>=== Tiêu đề</code>. Dòng <code>@chủ đề:</code> là tên thư mục chủ đề (chưa có thì tự tạo); <code>@biểu tượng:</code> và <code>@nguồn:</code> không bắt buộc. Các đoạn văn cách nhau một dòng trống. Dòng <code>--- hỏi</code> mở phần câu hỏi, dùng đúng cú pháp của “Bài tập của tôi” (TN, DS, S, G, Đ, K, N, NG). Nhiều bài thì viết nối tiếp nhau.</p></details>
      <details class="help"><summary>🤖 Nhờ AI chia văn bản / viết bài kèm câu hỏi (prompt)</summary>
        <label class="dim">Văn bản gốc để AI chia thành bài (không bắt buộc)<textarea id="imRaw" rows="5" spellcheck="false" placeholder="Dán một văn bản dài: AI sẽ chia thành nhiều bài đọc ngắn và tự tạo câu hỏi. Để trống thì AI tự viết bài mới."></textarea></label>
        <div id="imAiHost"></div></details>
      <label class="dim">Nội dung nhập<textarea id="imText" class="mono" rows="14" spellcheck="false" placeholder="Dán kết quả của AI (hoặc tự viết theo cú pháp) vào đây…"></textarea></label>
      <div id="imCheck" class="dim"></div>
      <div class="row"><button class="btn primary" id="imGo">📥 Nhập vào Thế giới của tôi</button><button class="btn" id="imFile">📂 Mở file .txt</button><button class="btn" id="imEx">Chèn ví dụ</button></div>
    </div>`;
  const ta = $('#imText');
  const check = () => {
    const p = parseNews(ta.value);
    $('#imCheck').innerHTML = (p.arts.length ? `<span class="ok">✓ ${p.arts.length} bài, ${p.arts.reduce((n, a) => n + a.nq, 0)} câu hỏi hợp lệ</span>` : 'Chưa có bài nào.') +
      (p.errors.length ? `<div class="bad">${p.errors.length} lỗi:</div>` + p.errors.slice(0, 8).map(e => `<div class="bad">${esc(e.msg)}</div>`).join('') : '');
  };
  ta.addEventListener('input', check); check();
  const panel = promptPanel($('#imAiHost'), {
    state: pkN, kinds: ['TN', 'DS', 'S', 'G', 'Đ', 'K', 'N', 'NG'],
    fields: [{ id: 'n', label: 'Số bài', type: 'number', value: 3, min: 1, max: 10 }, { id: 'topic', label: 'Chủ đề', placeholder: '(nếu để AI tự viết)' }, { id: 'level', label: 'Trình độ', placeholder: 'HSK2, N4, A2…' }],
    source: async () => $('#imRaw').value.trim(),
    build: o => newsPrompt({ lang, kinds: o.kinds, count: o.count, topic: o.f.topic, level: o.f.level, articles: Math.max(1, +o.f.n || 1), source: o.source }),
    onPaste: text => { ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n\n' + text : text; check(); toast('Đã dán vào ô nội dung ✓'); },
  });
  $('#imRaw').addEventListener('input', () => panel.reload());
  $('#imBack').onclick = () => { mode = 'feed'; drawFeed(); };
  $('#imEx').onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = SAMPLES[lang] || SAMPLES.zh; check(); } };
  $('#imFile').onclick = () => pickFile('.txt,text/plain').then(async ([f]) => { if (f) { ta.value = await f.text(); check(); } });
  $('#imGo').onclick = () => {
    const p = parseNews(ta.value);
    if (!p.arts.length) { toast('Chưa có bài hợp lệ nào để nhập'); return; }
    const n = importArts(p.arts), skip = p.arts.length - n;
    toast(`Đã nhập ${n} bài${skip ? ` (bỏ qua ${skip} bài trùng tiêu đề)` : ''}${p.errors.length ? ` · ${p.errors.length} lỗi bị bỏ qua` : ''}`, 4000);
    mode = 'feed'; drawFeed();
  };
}

// ---------- bài kiểm tra từ câu hỏi của các bài đọc: theo nhóm (mỗi bài một phần) hoặc ngẫu nhiên, tất cả trên một trang ----------
function drawTestBuilder() {
  tools(false);
  const lang = getLang(), folders = foldersOf(lang), all = artsOf(lang).filter(a => qCount(a) > 0);
  const total = f => all.filter(a => (f ? a.folder === f : true)).reduce((n, a) => n + qCount(a), 0);
  root.innerHTML = `<div class="row"><button class="btn" id="wtBack">← Quay lại</button><b>📋 Tạo bài kiểm tra từ câu hỏi bài đọc</b></div>
    <div class="qcard">
      <label class="dim">Lấy câu hỏi từ<select id="wtFolder"><option value="">Tất cả bài đọc</option>${folders.map(f => `<option value="${f.id}">${esc(f.name)}</option>`).join('')}</select></label>
      <div class="dim">Cách ra đề</div>
      <div class="seg" id="wtMode"><button data-m="group">🧱 Theo nhóm</button><button data-m="random" class="on">🎲 Ngẫu nhiên</button></div>
      <div class="dim" id="wtHint"></div>
      <label class="dim"><span id="wtCountLbl">Số câu của bài</span> <select id="wtCount"><option value="0">Tất cả</option>${[5, 10, 15, 20, 30, 50].map(n => `<option value="${n}">${n}</option>`).join('')}</select></label>
      <label class="dim"><input type="checkbox" id="wtListen" checked> Có câu nghe (máy đọc)</label>
      ${timeHtml('wtTime', 0)}
      <div class="row"><button class="btn primary big" id="wtGo">▶ Bắt đầu làm bài</button></div>
    </div>`;
  $('#wtCount').value = '10';
  let m = 'random';
  const hint = () => {
    $('#wtHint').textContent = m === 'group' ? 'Giữ các câu theo từng bài đọc: mỗi bài là một phần riêng trên trang. Số câu bên dưới là số câu lấy ngẫu nhiên từ MỖI bài (“Tất cả” = lấy hết).' : 'Trộn câu hỏi của mọi bài đã chọn rồi lấy ngẫu nhiên. Mỗi lần làm là một đề khác nhau.';
    $('#wtCountLbl').textContent = m === 'group' ? 'Số câu mỗi bài' : 'Số câu của bài';
  };
  hint(); wireTime(root, 'wtTime');
  $$('#wtMode button').forEach(b => b.onclick = () => { m = b.dataset.m; $$('#wtMode button').forEach(x => x.classList.toggle('on', x === b)); hint(); });
  $('#wtBack').onclick = () => { mode = 'feed'; drawFeed(); };
  const cfg = {};
  const start = () => {
    const f = cfg.f ?? $('#wtFolder').value, src = all.filter(a => (f ? a.folder === f : true)).map(a => ({ title: a.title, text: a.qtext }));
    Object.assign(cfg, { f, count: cfg.count ?? +$('#wtCount').value, listen: cfg.listen ?? $('#wtListen').checked, time: cfg.time ?? readTime(root, 'wtTime') });
    const qs = buildTest(src, { mode: m, count: cfg.count, listen: cfg.listen }, rngOf('wt' + Date.now()));
    if (!qs.length) { toast('Chưa có câu hỏi nào để ra bài kiểm tra'); return; }
    mode = 'testrun';
    root.innerHTML = '<div class="row"><button class="btn" id="wtBack2">← Thế giới của tôi</button></div><div id="wtSheet"></div>';
    const back = () => { mode = 'feed'; drawFeed(); scrollTo(0, 0); };
    $('#wtBack2').onclick = back;
    runSheet($('#wtSheet'), {
      qs, lang, title: '', src: 'Bài đọc', submitLabel: 'Hoàn thành & nộp bài', timeLimit: cfg.time,
      intro: `<div class="dim">${qs.length} câu hỏi · ${m === 'group' ? 'theo nhóm' : 'ngẫu nhiên'}</div>${cfg.time ? '<div class="dim">Có giới hạn thời gian: hết giờ bài tự nộp.</div>' : ''}<div class="dim">Làm hết rồi bấm nút nộp bài ở cuối trang để chấm điểm.</div>`,
      onDone: r => tracker.test(r.pct), onAgain: start, onExit: back, exitLabel: '← Thế giới của tôi',
    });
    scrollTo(0, 0);
  };
  $('#wtGo').onclick = start;
}
export function init() {
  root = $('#worldRoot');
  bus.on('show', v => { if (v === 'world') render(); });
  social.init();
  bus.on('lang', () => { wvocab.reset(); social.reset(); mode = 'feed'; curId = null; filter.folder = ''; filter.unread = false; if (document.body.dataset.view === 'world') render(); });
  bus.on('store', c => { if ((c === 'articles' || c === 'wfolders' || c === '*') && document.body.dataset.view === 'world' && mode === 'feed' && sec === 'article') drawFeed(); });
}
