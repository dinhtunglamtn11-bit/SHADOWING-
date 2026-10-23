// Social (trong Thế giới): lướt các bài đăng ngắn theo chiều dọc như TikTok, không có câu hỏi.
// Mỗi bài: lĩnh vực, người đăng, nội dung, hashtag; có thể lưu ⭐, bình luận 💬, nghe 🔊 hoặc xóa 🗑.
// Dữ liệu ở bộ “posts” (đồng bộ như các dữ liệu khác). Nhập nhiều bài một lúc bằng cú pháp:
//   # Lĩnh vực          dòng bắt đầu bằng “# ” = lĩnh vực mới
//   @tên: …  @biểu tượng: 🐼  @tag: #a #b     (không bắt buộc, nằm đầu bài)
//   nội dung bài đăng …
//   ---                  ngăn cách các bài trong cùng lĩnh vực
import { $, $$, esc, toast, uid, pickFile, getLang, langInfo, bus } from './util.js';
import * as store from './store.js';
import { say } from './tts.js';
import { zhText } from './prefs.js';
import { flat } from './exparse.js';
import { socialPrompt, SOCIAL_SYNTAX } from './exprompts.js';
import { pix } from './pixicons.js';

const COLORS = ['#ff8f3a', '#5fd068', '#ff8fc0', '#7ec3ff', '#a98bff', '#ffd84d', '#ff7b88', '#4fd1c5'];
const hash = s => [...String(s || '')].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
const colorOf = p => COLORS[hash(p.field || p.name) % COLORS.length];
const postsOf = lang => store.list('posts').filter(p => (p.lang || 'zh') === lang);

let root = null, ctx = null, view = 'feed', fld = '';
const openC = new Set(); // các bài đang mở khung bình luận

// ---------- cú pháp nhập nhiều bài ----------
const META = { ten: 'name', name: 'name', 'nguoi dang': 'name', 'bieu tuong': 'emoji', bieutuong: 'emoji', icon: 'emoji', emoji: 'emoji', tag: 'tags', hashtag: 'tags', the: 'tags' };
export function parseSocial(text) {
  const posts = [], errors = [];
  let field = '', cur = null;
  const fresh = () => ({ name: '', emoji: '', tags: [], body: [] });
  const flush = () => {
    if (!cur) return;
    const body = cur.body.join('\n').replace(/\n{3,}/g, '\n\n').trim();
    if (body) posts.push({ field, name: cur.name, emoji: cur.emoji, tags: cur.tags, body });
    else if (cur.name || cur.emoji || cur.tags.length) errors.push({ msg: `lĩnh vực “${field || 'Chung'}”: có bài chưa có nội dung` });
    cur = null;
  };
  text.replace(/\r/g, '').split('\n').forEach(raw => {
    const h = raw.match(/^\s*#{1,2}\s+(.+?)\s*$/);
    if (h) { flush(); field = h[1].trim(); return; }
    if (/^\s*-{3,}\s*$/.test(raw)) { flush(); return; }
    cur ||= fresh();
    const m = !cur.body.some(l => l.trim()) && raw.match(/^\s*@\s*([^:：]+?)\s*[:：]\s*(.*)$/);
    const k = m && META[flat(m[1])];
    if (!k) { cur.body.push(raw); return; }
    const v = m[2].trim();
    if (k === 'tags') cur.tags = v.split(/[\s,，]+/).filter(Boolean).map(t => (t.startsWith('#') ? t : '#' + t));
    else cur[k] = v;
  });
  flush();
  return { posts, errors };
}

function importPosts(list) {
  const lang = getLang(), z = s => (lang === 'zh' ? zhText(s, 'zh') : s);
  const have = new Set(postsOf(lang).map(p => (p.field || '') + '\n' + p.body));
  let n = 0;
  const base = Date.now(); // cùng một mốc cho cả lượt nhập: bài viết trước nằm trên bài viết sau
  list.forEach((p, i) => {
    const body = z(p.body), field = z(p.field), key = field + '\n' + body;
    if (have.has(key)) return;
    have.add(key);
    store.put('posts', uid(), { lang, field, name: z(p.name), emoji: p.emoji, tags: p.tags, body, created: base - i, saved: 0, comments: [], deleted: false });
    n++;
  });
  return n;
}

const SAMPLES = {
  zh: `# 美食
@tên: 小美
@biểu tượng: 🍜
@tag: #美食 #今天吃什么
今天中午我在学校旁边吃了一碗牛肉面，汤很鲜，面也很筋道。老板还多给了我一勺辣椒，真开心！😋
---
@tên: 阿杰
@biểu tượng: 🧋
周末和朋友去喝奶茶。我点了一杯珍珠奶茶，不太甜，刚刚好。你们喜欢几分糖？

# 旅行
@tên: 小林
@biểu tượng: ✈️
@tag: #旅行 #北京
终于来到北京了！今天去了故宫，人很多，但是特别漂亮。明天打算去长城，希望天气好。
---
@tên: 大卫
@biểu tượng: 🚄
坐高铁去上海只要四个小时，又快又舒服。窗外的风景真不错，我拍了很多照片。`,
  en: `# Food
@tên: Mia
@biểu tượng: 🍕
@tag: #foodie #weekend
Tried a new pizza place near my school today. The crust was thin and crispy, and the cheese was amazing. Totally worth the wait! 🍕
---
@tên: Ben
@biểu tượng: ☕
Coffee first, then work. That's my morning rule. What's your favourite way to start the day?

# Travel
@tên: Lily
@biểu tượng: ✈️
@tag: #travel #london
Finally in London! It rained all afternoon, but the museums were free and so much fun. Tomorrow I'm taking the train to Oxford.
---
@tên: Sam
@biểu tượng: 🚆
Took the night train to the coast. Slept for six hours and woke up to the sea. I could get used to this!`,
  ko: `# 음식
@tên: 지민
@biểu tượng: 🍜
@tag: #맛집 #점심
오늘 점심에 학교 앞에서 비빔밥을 먹었어요. 야채가 신선하고 정말 맛있었어요! 여러분은 뭘 먹었어요?
---
@tên: 민수
@biểu tượng: 🧋
주말에 친구랑 카페에 갔어요. 커피는 조금 썼지만 케이크는 달고 맛있었어요.

# 여행
@tên: 하나
@biểu tượng: ✈️
@tag: #여행 #제주도
드디어 제주도에 왔어요! 날씨가 좋아서 바다를 오래 걸었어요. 내일은 한라산에 갈 거예요.
---
@tên: 도현
@biểu tượng: 🚄
KTX를 타고 부산에 갔어요. 두 시간 반밖에 안 걸려서 정말 편했어요.`,
  ja: `# グルメ
@tên: さくら
@biểu tượng: 🍣
@tag: #グルメ #ランチ
今日のお昼に友達と回転寿司に行きました。サーモンがとても美味しかったです！みなさんは何が好きですか？
---
@tên: けん
@biểu tượng: ☕
朝は必ずコーヒーを飲みます。静かな時間が好きです。

# 旅行
@tên: ゆい
@biểu tượng: ✈️
@tag: #旅行 #京都
やっと京都に着きました！お寺がきれいで、写真をたくさん撮りました。明日は奈良に行く予定です。
---
@tên: だいき
@biểu tượng: 🚄
新幹線で大阪まで行きました。窓からの景色が最高でした。`,
};

// ---------- trang lướt ----------
const ago = t => {
  const m = Math.floor((Date.now() - (t || 0)) / 6e4);
  return m < 1 ? 'vừa xong' : m < 60 ? `${m} phút trước` : m < 1440 ? `${Math.floor(m / 60)} giờ trước` : `${Math.floor(m / 1440)} ngày trước`;
};
const textHtml = s => esc(s).replace(/\n/g, '<br>');

function commentsHtml(p) {
  const list = p.comments || [];
  return `<div class="sp-cm"><div class="sp-cl">${list.length ? list.map(c => `<div class="sp-c"><span class="sp-ct">${textHtml(c.text)}</span><small class="dim">${ago(c.t)}</small><button class="btn" data-a="cdel" data-c="${c.id}" title="Xóa bình luận này">✕</button></div>`).join('') : '<div class="dim">Chưa có bình luận.</div>'}</div>
    <div class="row"><input class="sp-ci" type="text" maxlength="500" placeholder="Viết bình luận…"><button class="btn primary" data-a="send">Gửi</button></div></div>`;
}

function postHtml(p) {
  const bcp = langInfo(p.lang || 'zh').bcp, n = (p.comments || []).length;
  return `<article class="sp" data-id="${p.id}" style="--cc:${colorOf(p)}"><div class="sp-in">
    <header class="sp-h"><span class="sp-av">${esc(p.emoji || '🙂')}</span><div class="sp-who"><b class="gt">${esc(p.name || '·')}</b>${p.field ? `<span class="nw-tag gt">${esc(p.field)}</span>` : ''}</div></header>
    <div class="sp-text" lang="${bcp}">${textHtml(p.body)}</div>
    ${p.tags?.length ? `<div class="sp-tags gt">${p.tags.map(esc).join(' ')}</div>` : ''}
    <div class="sp-act"><button class="btn ${p.saved ? 'primary' : ''}" data-a="save" title="Lưu bài này để xem lại ở mục Đã lưu">⭐ ${p.saved ? 'Đã lưu' : 'Lưu'}</button><button class="btn ${openC.has(p.id) ? 'primary' : ''}" data-a="cmt" title="Bình luận">💬 ${n}</button><button class="btn" data-a="say" title="Nghe đọc bài">🔊</button><button class="btn" data-a="del" title="Xóa bài này">🗑</button></div>
    ${openC.has(p.id) ? commentsHtml(p) : ''}
  </div></article>`;
}

function shown() {
  const all = postsOf(getLang()).sort((a, b) => (b.created || 0) - (a.created || 0));
  return fld === '_saved' ? all.filter(p => p.saved) : fld ? all.filter(p => (p.field || '') === fld) : all;
}

function drawFeed(keepScroll) {
  const lang = getLang(), all = postsOf(lang), fields = [...new Set(all.map(p => p.field || '').filter(Boolean))].sort((a, b) => a.localeCompare(b));
  if (fld && fld !== '_saved' && !fields.includes(fld)) fld = '';
  const saved = all.filter(p => p.saved).length;
  const old = keepScroll ? $('#spFeed', root)?.scrollTop : 0;
  const bar = ctx.bar();
  if (!all.length) {
    root.innerHTML = `${bar}<div class="empty"><div class="emptyart">${pix('a_world')}</div>Chưa có bài Social ${esc(langInfo().name)} nào.<br>Nhập nhiều bài một lúc bằng cú pháp (kèm prompt nhờ AI), tự đăng một bài, hoặc thêm vài bài mẫu để xem thử.
      <div class="row c" style="margin-top:12px"><button class="btn primary" id="spImport">📥 Nhập nhiều bài</button><button class="btn" id="spNew">＋ Đăng bài</button><button class="btn" id="spSample">✨ Thêm bài mẫu</button></div></div>`;
    bind(); return;
  }
  const chip = (id, name, n, user) => `<button class="chip ${fld === id ? 'on' : ''}" data-f="${esc(id)}"><span class="${user ? 'gt' : ''}">${esc(name)}</span> <small>${n}</small></button>`;
  const list = shown();
  root.innerHTML = `${bar}
    <div class="row"><button class="btn primary" id="spImport">📥 Nhập nhiều bài</button><button class="btn" id="spNew">＋ Đăng bài</button></div>
    <div class="chips sp-fl">${chip('', 'Tất cả', all.length)}${fields.map(f => chip(f, f, all.filter(p => p.field === f).length, true)).join('')}${chip('_saved', '⭐ Đã lưu', saved)}</div>
    ${list.length ? `<div class="sp-wrap"><div id="spFeed" class="sp-feed" tabindex="0" data-sig="${list.map(p => p.id).join(',')}">${list.map(postHtml).join('')}</div>
      <div class="sp-nav"><button class="btn" id="spUp">▲ Trước</button><span id="spPos" class="dim"></span><button class="btn" id="spDown">▼ Tiếp</button></div></div>` : '<div class="empty">Chưa có bài nào ở mục này.</div>'}`;
  bind();
  const feed = $('#spFeed', root);
  if (feed) { if (old) { feed.style.scrollBehavior = 'auto'; feed.scrollTop = old; feed.style.scrollBehavior = ''; } pos(); }
}

function pos() {
  const feed = $('#spFeed', root), el = $('#spPos', root);
  if (!feed || !el) return;
  const n = feed.children.length, i = Math.min(n - 1, Math.round(feed.scrollTop / Math.max(1, feed.clientHeight)));
  el.textContent = `${i + 1} / ${n}`;
}
function step(d) {
  const feed = $('#spFeed', root);
  if (feed) feed.scrollBy({ top: d * feed.clientHeight, behavior: 'smooth' });
}

function redraw(id) {
  const el = $(`.sp[data-id="${id}"]`, root), p = store.get('posts', id);
  if (!el || !p) return;
  el.outerHTML = postHtml({ ...p, id });
  const cm = $(`.sp[data-id="${id}"] .sp-cl`, root);
  if (cm) cm.scrollTop = cm.scrollHeight;
}

function act(e) {
  const b = e.target.closest('[data-a]');
  if (!b) return;
  const card = b.closest('.sp'), id = card.dataset.id, p = store.get('posts', id);
  if (!p) return;
  const a = b.dataset.a, was = p.saved;
  if (a === 'save') { store.put('posts', id, { saved: was ? 0 : Date.now() }); toast(was ? 'Đã bỏ lưu' : 'Đã lưu ⭐', 1500); redraw(id); }
  else if (a === 'cmt') { openC.has(id) ? openC.delete(id) : openC.add(id); redraw(id); $(`.sp[data-id="${id}"] .sp-ci`, root)?.focus(); }
  else if (a === 'say') say(p.body.replace(/#\S+/g, ' '), langInfo(p.lang || 'zh').bcp);
  else if (a === 'send') sendComment(card, id, p);
  else if (a === 'cdel') {
    store.put('posts', id, { comments: (p.comments || []).filter(c => c.id !== b.dataset.c) });
    redraw(id);
  } else if (a === 'del') {
    if (!confirm('Xóa bài này? (vào Thùng rác, giữ 30 ngày)')) return;
    store.del('posts', id); openC.delete(id);
    drawFeed(true);
  }
}
function sendComment(card, id, p) {
  const inp = $('.sp-ci', card), text = (inp?.value || '').trim();
  if (!text) { inp?.focus(); return; }
  store.put('posts', id, { comments: [...(p.comments || []), { id: uid(), text, t: Date.now() }] });
  redraw(id);
  $(`.sp[data-id="${id}"] .sp-ci`, root)?.focus();
}

function bind() {
  ctx.bindBar();
  $('#spImport')?.addEventListener('click', () => { view = 'import'; drawImport(); scrollTo(0, 0); });
  $('#spNew')?.addEventListener('click', () => { view = 'compose'; drawCompose(); scrollTo(0, 0); });
  $('#spSample')?.addEventListener('click', () => { const n = importPosts(parseSocial(SAMPLES[getLang()] || SAMPLES.zh).posts); toast(`Đã thêm ${n} bài mẫu`); drawFeed(); });
  $$('.sp-fl [data-f]', root).forEach(c => { c.onclick = () => { fld = c.dataset.f; drawFeed(); }; });
  $('#spUp', root)?.addEventListener('click', () => step(-1));
  $('#spDown', root)?.addEventListener('click', () => step(1));
  const feed = $('#spFeed', root);
  if (!feed) return;
  feed.addEventListener('click', act);
  feed.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target.classList.contains('sp-ci')) { e.preventDefault(); const card = e.target.closest('.sp'); sendComment(card, card.dataset.id, store.get('posts', card.dataset.id)); } });
  let raf = 0;
  feed.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(pos); }, { passive: true });
}

// ---------- đăng một bài ----------
function drawCompose() {
  const lang = getLang(), fields = [...new Set(postsOf(lang).map(p => p.field || '').filter(Boolean))];
  root.innerHTML = `<div class="row"><button class="btn" id="cpBack">← Quay lại</button><b>＋ Đăng một bài</b></div>
    <div class="qcard">
      <div class="row"><label class="dim grow">Lĩnh vực<input id="cpField" type="text" list="cpFields" placeholder="Đời sống, Công nghệ, Du lịch…"></label><datalist id="cpFields">${fields.map(f => `<option value="${esc(f)}">`).join('')}</datalist>
        <label class="dim grow">Tên người đăng<input id="cpName" type="text" placeholder="(không bắt buộc)"></label><label class="dim">Biểu tượng<input id="cpEmoji" type="text" maxlength="4" value="🙂" style="width:64px"></label></div>
      <label class="dim">Nội dung<textarea id="cpBody" rows="7" lang="${langInfo(lang).bcp}" placeholder="Viết bài đăng bằng ${esc(langInfo(lang).name)}…"></textarea></label>
      <label class="dim">Hashtag<input id="cpTags" type="text" placeholder="#a #b (không bắt buộc)"></label>
      <div class="row"><button class="btn primary" id="cpGo">📤 Đăng</button></div>
    </div>`;
  $('#cpBack').onclick = () => { view = 'feed'; drawFeed(); };
  $('#cpGo').onclick = () => {
    const body = $('#cpBody').value.trim();
    if (!body) { toast('Hãy viết nội dung bài đăng'); return; }
    const tags = $('#cpTags').value.split(/[\s,，]+/).filter(Boolean).map(t => (t.startsWith('#') ? t : '#' + t));
    const n = importPosts([{ field: $('#cpField').value.trim(), name: $('#cpName').value.trim(), emoji: $('#cpEmoji').value.trim(), tags, body }]);
    toast(n ? 'Đã đăng bài ✓' : 'Bài này đã có rồi');
    view = 'feed'; fld = ''; drawFeed();
  };
}

// ---------- nhập nhiều bài ----------
function promptBox(host, onPaste) {
  const lang = getLang();
  host.innerHTML = `<label class="dim">Văn bản gốc để AI viết lại thành bài đăng (không bắt buộc)<textarea id="sgRaw" rows="4" spellcheck="false" placeholder="Dán một đoạn văn: AI sẽ viết lại thành các bài đăng ngắn. Để trống thì AI tự viết bài mới."></textarea></label>
    <div class="row"><label class="dim grow">Lĩnh vực<input id="sgF" type="text" placeholder="đời sống, công nghệ, du lịch (để trống: AI tự chọn)"></label><label class="dim">Số bài mỗi lĩnh vực <input id="sgN" type="number" min="1" max="10" value="3" style="width:72px"></label><label class="dim">Trình độ <input id="sgL" type="text" placeholder="HSK2, N4, A2…" style="width:120px"></label></div>
    <div class="row"><button class="btn primary" id="sgCopy">📋 Chép prompt</button><button class="btn" id="sgPaste">📥 Dán kết quả của AI</button></div>
    <textarea id="sgOut" class="mono" rows="9" readonly spellcheck="false"></textarea>
    <div class="dim">Cách dùng: bấm “Chép prompt” → dán vào ChatGPT hoặc Claude → chép toàn bộ kết quả AI trả về → quay lại bấm “Dán kết quả của AI”.</div>`;
  const out = $('#sgOut', host);
  const refresh = () => { out.value = socialPrompt({ lang, fields: $('#sgF', host).value.trim(), posts: Math.max(1, Math.min(10, +$('#sgN', host).value || 3)), level: $('#sgL', host).value.trim(), source: $('#sgRaw', host).value.trim() }); };
  host.addEventListener('input', refresh); refresh();
  $('#sgCopy', host).onclick = async () => {
    refresh();
    try { await navigator.clipboard.writeText(out.value); toast('Đã chép prompt ✓'); }
    catch { out.select(); document.execCommand?.('copy'); toast('Đã chọn sẵn prompt: nhấn Ctrl+C để chép'); }
  };
  $('#sgPaste', host).onclick = async () => {
    let t = '';
    try { t = (await navigator.clipboard.readText()).trim(); } catch { /* bị chặn */ }
    if (!t) { toast('Chưa đọc được bộ nhớ tạm: hãy dán (Ctrl+V) kết quả vào ô nội dung'); return; }
    onPaste(t.replace(/^```\w*\n?|\n?```$/g, '').trim());
  };
}

function drawImport() {
  const lang = getLang();
  root.innerHTML = `<div class="row"><button class="btn" id="imBack">← Quay lại</button><b>📥 Nhập nhiều bài Social</b></div>
    <div class="qcard">
      <details class="help"><summary>📖 Cú pháp bài Social</summary>
        <pre class="mono nw-syn">${esc(SOCIAL_SYNTAX)}</pre>
        <p>Dòng bắt đầu bằng “# ” là tên một lĩnh vực mới. Các bài trong cùng lĩnh vực cách nhau bằng một dòng chỉ có “---”. Ba dòng “@tên:”, “@biểu tượng:”, “@tag:” không bắt buộc và nằm ngay đầu bài. Không có câu hỏi.</p></details>
      <details class="help"><summary>🤖 Nhờ AI viết bài Social (prompt)</summary><div id="sgHost"></div></details>
      <label class="dim">Nội dung nhập<textarea id="imText" class="mono" rows="14" spellcheck="false" placeholder="Dán kết quả của AI (hoặc tự viết theo cú pháp) vào đây…"></textarea></label>
      <div id="imCheck" class="dim"></div>
      <div class="row"><button class="btn primary" id="imGo">📥 Nhập vào Social</button><button class="btn" id="imFile">📂 Mở file .txt</button><button class="btn" id="imEx">Chèn ví dụ</button></div>
    </div>`;
  const ta = $('#imText');
  const check = () => {
    const p = parseSocial(ta.value), fields = new Set(p.posts.map(x => x.field));
    $('#imCheck').innerHTML = (p.posts.length ? `<span class="ok">✓ ${p.posts.length} bài, ${fields.size} lĩnh vực</span>` : 'Chưa có bài nào.') +
      (p.errors.length ? `<div class="bad">${p.errors.length} lỗi:</div>` + p.errors.slice(0, 8).map(e => `<div class="bad">${esc(e.msg)}</div>`).join('') : '');
  };
  ta.addEventListener('input', check); check();
  promptBox($('#sgHost'), text => { ta.value = ta.value.trim() ? ta.value.replace(/\s+$/, '') + '\n\n' + text : text; check(); toast('Đã dán vào ô nội dung ✓'); });
  $('#imBack').onclick = () => { view = 'feed'; drawFeed(); };
  $('#imEx').onclick = () => { if (!ta.value.trim() || confirm('Thay nội dung đang có bằng ví dụ?')) { ta.value = SAMPLES[lang] || SAMPLES.zh; check(); } };
  $('#imFile').onclick = () => pickFile('.txt,text/plain').then(async ([f]) => { if (f) { ta.value = await f.text(); check(); } });
  $('#imGo').onclick = () => {
    const p = parseSocial(ta.value);
    if (!p.posts.length) { toast('Chưa có bài hợp lệ nào để nhập'); return; }
    const n = importPosts(p.posts), skip = p.posts.length - n;
    toast(`Đã nhập ${n} bài vào Social${skip ? ` (bỏ qua ${skip} bài trùng)` : ''}${p.errors.length ? ` · ${p.errors.length} lỗi bị bỏ qua` : ''}`, 4000);
    view = 'feed'; fld = ''; drawFeed();
  };
}

// ---------- vào / ra ----------
// c: { bar(): html thanh chuyển Article / Social, bindBar(): gắn sự kiện cho thanh đó }
export function render(rt, c) {
  root = rt; ctx = c;
  if (view === 'import') return drawImport();
  if (view === 'compose') return drawCompose();
  drawFeed();
}
export function reset() { view = 'feed'; fld = ''; openC.clear(); }

export function init() {
  // phím ↑ ↓ để lướt khi đang xem Social (không chặn khi đang gõ chữ)
  document.addEventListener('keydown', e => {
    if (document.body.dataset.view !== 'world' || !$('#spFeed') || e.target.closest('input,textarea,select,dialog')) return;
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); step(1); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); step(-1); }
  });
  // bài thêm / bớt từ máy khác: vẽ lại, giữ vị trí đang xem
  bus.on('store', c => {
    if ((c !== 'posts' && c !== '*') || document.body.dataset.view !== 'world') return;
    const feed = $('#spFeed');
    if (feed && feed.dataset.sig !== shown().map(p => p.id).join(',')) drawFeed(true);
  });
}
