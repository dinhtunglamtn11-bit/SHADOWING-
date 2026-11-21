// Passport: sưu tầm thẻ văn hóa các nước bằng xu kiếm được từ việc học. Chưa mua = hình đen trắng; mua rồi hiện màu và đọc được nguồn gốc;
// mua đủ một mục nhỏ / mục lớn thì mở câu chuyện của mục đó. Xu = tổng xu kiếm được từ số liệu học (tài liệu "days", nên tự đồng bộ) trừ giá các thẻ đã mua.
// Văn bản giao diện ở đây chọn theo ngôn ngữ app bằng t(việt, anh); tiếng Trung hiện bản tiếng Anh. Thẻ chỉ có tiếng Việt / tiếng Anh, không kèm tiếng của nước đó.
import { $, $$, esc, toast, bus, vnDate, addDays } from './util.js';
import * as store from './store.js';
import * as tracker from './tracker.js';
import * as A from './achieve.js';
import { prefs } from './prefs.js';
import * as sfx from './sfx.js';
import { uiLang } from './i18n.js';

let K = null, ST = null; // K: kho thẻ (nạp khi mở lần đầu), ST: câu chuyện
const KEY = 'passport:v1', WELCOME = 100;
const TEST_COINS = 3000; // XU THỬ NGHIỆM: cộng thẳng vào số xu để thử mua. Khi thử xong, đổi thành 0 (xu đã mua vẫn giữ, chỉ không cộng thêm nữa).
let P = load(), root = null, active = false, pushT = 0;
const S = { group: 1, show: 'all' };
const t = (vi, en) => (uiLang === 'vi' ? vi : en);
const SUBEN = { 'Địa danh': 'Landmarks', 'Mùa và thiên nhiên': 'Seasons and nature', 'Vùng miền': 'Regions', 'Hiện tượng đặc biệt': 'Natural phenomena', 'Trang phục': 'Clothing', 'Phụ kiện': 'Accessories', 'Nhà ở và đồ dùng': 'Home and household', 'Thói quen và phép tắc': 'Habits and etiquette', 'Món ăn': 'Dishes', 'Đồ uống và trà đạo': 'Drinks and tea ceremony', 'Món theo mùa và dịp lễ': 'Seasonal and festive food', 'Quy tắc bàn ăn': 'Table manners', 'Lễ hội và ngày lễ': 'Festivals and holidays', 'Nhạc cụ': 'Instruments', 'Nghệ thuật biểu diễn': 'Performing arts', 'Nghệ thuật truyền thống khác': 'Other traditional arts', 'Văn hóa hiện đại': 'Modern culture', 'Động vật': 'Animals', 'Linh vật': 'Mascots and spirits', 'Tín ngưỡng': 'Beliefs', 'Nhân vật và lịch sử': 'History and figures', 'Người nổi tiếng': 'Famous people' };
const subName = s => t(s, SUBEN[s] || s);
const EARN = { 'Thời gian học': 'Study time', 'Ôn thẻ': 'Card reviews', 'Trả lời đúng': 'Correct answers', 'Đọc, viết, nghe, nói': 'Reading, writing, listening, speaking', 'Nhiệm vụ ngày': 'Daily quests', 'Đạt mục tiêu ngày': 'Daily goal reached' };

// ---------- lưu / đồng bộ ----------
function load() {
  try { const o = JSON.parse(localStorage.getItem(KEY) || 'null'); if (o) return { own: o.own || [], since: o.since || '', hw: o.hw || 0, seen: o.seen || [], last: o.last || 0 }; } catch { /* bỏ qua */ }
  return { own: [], since: '', hw: 0, seen: [], last: 0 };
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* bỏ qua */ } clearTimeout(pushT); pushT = setTimeout(() => store.put('prefs', 'passport', { ...P }), 2000); }
function pull() { // gộp với bản từ máy khác: thẻ đã mua lấy hợp, xu cao nhất lấy số lớn hơn
  const r = store.get('prefs', 'passport'); if (!r) return;
  const own = new Set([...P.own, ...(r.own || [])]), seen = new Set([...P.seen, ...(r.seen || [])]);
  const since = [P.since, r.since].filter(Boolean).sort()[0] || '';
  const ch = own.size !== P.own.length || seen.size !== P.seen.length || since !== P.since || (r.hw || 0) > P.hw;
  P = { own: [...own], seen: [...seen], since, hw: Math.max(P.hw, r.hw || 0), last: Math.max(P.last, r.last || 0) };
  if (ch) { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch { /* bỏ qua */ } if (active && K) draw(); }
}

// ---------- xu ----------
export const priceOf = it => (it.scene ? 40 : it.use === 'wear' ? 60 : it.use === 'pet' ? 50 : it.use === 'hold' ? 40 : 35) + (it.gr === 5 ? 5 : 0);
function dayParts(date, d) {
  const m = Math.floor((d.sec || 0) / 60), act = (d.r || 0) + (d.w || 0) + (d.d || 0) + (d.k || 0) + (d.x || 0) + (d.n || 0);
  const ds = A.dailyFor(date), done = ds.filter(q => A.isDone(q, d)).length, goal = (prefs.goalMin || 15) * 60;
  return [
    ['Thời gian học', Math.min(60, m * 2)], ['Ôn thẻ', Math.min(25, Math.floor((d.c || 0) / 2))], ['Trả lời đúng', Math.min(25, d.qc || 0)],
    ['Đọc, viết, nghe, nói', Math.min(20, act * 2)], ['Nhiệm vụ ngày', done * 8 + (ds.length && done === ds.length ? 20 : 0)], ['Đạt mục tiêu ngày', (d.sec || 0) >= goal ? 15 : 0],
  ];
}
function earned() {
  if (!P.since) return 0;
  const m = tracker.byDate(), today = vnDate();
  let sum = WELCOME + TEST_COINS;
  for (const [d, x] of m) if (d >= P.since && d <= today) for (const [, v] of dayParts(d, x)) sum += v;
  for (let s = A.weekStart(P.since); s <= today; s = addDays(s, 7)) { const e = addDays(s, 6); sum += A.weeklyFor(s).filter(q => A.isDone(q, A.aggregate(m, s, e < today ? e : today))).length * 30; }
  for (let s = A.monthStart(P.since); s <= today; s = addDays(A.monthEnd(s), 1)) { const e = A.monthEnd(s); sum += A.monthlyFor(s).filter(q => A.isDone(q, A.aggregate(m, s, e < today ? e : today))).length * 100; }
  return sum;
}
const spent = () => P.own.reduce((n, id) => n + (K?.byId[id] ? priceOf(K.byId[id]) : 0), 0);
function balance() { const e = Math.max(P.hw, earned()); if (e > P.hw) { P.hw = e; save(); } return Math.max(0, e - spent()); } // xu kiếm được không bao giờ giảm lại (đổi mục tiêu ngày không làm mất xu)
function todayParts() { const d = tracker.byDate().get(vnDate()) || A.blankDay(vnDate()); return dayParts(vnDate(), d); }

// ---------- vẽ ----------
const gray = g => g.map(row => row.map(c => { if (!c) return null; const n = parseInt(c.slice(1), 16), r = n >> 16, gg = (n >> 8) & 255, b = n & 255, y = Math.round(0.3 * r + 0.59 * gg + 0.11 * b), v = Math.max(28, Math.round(y * 0.62)); return '#' + [v, v, v].map(x => x.toString(16).padStart(2, '0')).join(''); }));
const cache = new Map();
function sprite(it, colored) { // canvas mới mỗi lần; lưới được nhớ lại
  let g = cache.get(it.id); if (!g) { g = K.render(it); cache.set(it.id, g); }
  const cv = document.createElement('canvas'); K.paint(cv, colored ? g : gray(g), g.length > 20 ? 4 : 5); return cv;
}
const GROUP = {
  1: ['Nơi chốn và thiên nhiên', 'Places and nature', '🏯'], 2: ['Con người và đời sống', 'People and daily life', '👘'], 3: ['Ẩm thực', 'Food and drink', '🍣'],
  4: ['Văn hóa và nghệ thuật', 'Culture and arts', '🎎'], 5: ['Con vật, linh vật, tín ngưỡng, lịch sử', 'Animals, mascots, beliefs, history', '⛩'],
};
const gName = g => t(GROUP[g][0], GROUP[g][1]);
const own = id => P.own.includes(id), name = it => t(it.vi, it.en);
const subsOf = g => [...new Set(K.items.filter(i => i.gr === g).map(i => i.sub))];
const stat = list => ({ n: list.filter(i => own(i.id)).length, t: list.length });
const lastVideo = () => store.list('items').filter(i => i.type !== 'note' && (+i.position || 0) > 0 && i.study !== false).sort((a, b) => (b.u || 0) - (a.u || 0))[0] || null;

function draw() {
  if (!K || !root) return;
  const bal = balance(), today = todayParts(), todayTot = today.reduce((n, p) => n + p[1], 0), fresh = bal - (P.last || 0);
  const all = stat(K.items), v = lastVideo(), openHow = $('#ppHowBox', root) && !$('#ppHowBox', root).hidden;
  const h = [];
  h.push(`<div class="pp-top"><div class="pp-coins">🪙 <b>${bal}</b></div>${fresh > 0 && P.last ? `<span class="pp-new">+${fresh} ${t('xu mới', 'new coins')}</span>` : ''}
    <span class="grow"></span><button class="btn" id="ppHow">❓ ${t('Cách kiếm xu', 'How to earn coins')}</button></div>`);
  h.push(`<div class="pp-how" id="ppHowBox" ${openHow ? '' : 'hidden'}><b>${t(`Hôm nay đã kiếm được ${todayTot} xu`, `Earned today: ${todayTot} coins`)}</b>${today.map(([k, n]) => `<div class="ppr"><span>${esc(t(k, EARN[k] || k))}</span><b>+${n}</b></div>`).join('')}
    <div class="dim">${t('Xu tính từ việc học thật: phút học, thẻ ôn, câu trả lời đúng, nhiệm vụ ngày (+8 mỗi nhiệm vụ, +20 khi xong hết), đạt mục tiêu ngày (+15), nhiệm vụ tuần (+30) và nhiệm vụ tháng (+100). Mỗi loại có mức tối đa mỗi ngày.', 'Coins come from real study: study minutes, card reviews, correct answers, daily quests (+8 each, +20 when all are done), reaching the daily goal (+15), weekly quests (+30) and monthly quests (+100). Each kind has a daily limit.')}</div></div>`);
  h.push(v ? `<div class="pp-cont"><div class="grow"><div class="dim">${t('Học tiếp', 'Continue')}</div><b class="gt">${esc(v.title || v.name || '')}</b></div><button class="btn primary" id="ppCont">▶ ${t('Học tiếp', 'Continue')}</button></div>`
    : `<div class="pp-cont"><div class="grow"><b>${t('Học để kiếm xu', 'Study to earn coins')}</b><div class="dim">${t('Mở một video trong Thư viện để bắt đầu học.', 'Open a video in the Library to start studying.')}</div></div><button class="btn primary" id="ppLib">📚 ${t('Thư viện', 'Library')}</button></div>`);
  h.push(`<div class="pp-cont2"><span class="dim">${t('Châu Á', 'Asia')}</span><div class="pp-ctry"><canvas id="ppFlag" width="64" height="48"></canvas><div><b>${t('Nhật Bản', 'Japan')}</b><div class="dim">${all.n}/${all.t}${all.n === all.t ? ' ⭐' : ''}</div></div></div>
    <span class="dim pp-soon">${t('Các châu và nước khác: sắp có', 'More continents and countries: coming soon')}</span></div>`);
  h.push(`<div class="pp-tabs">${Object.keys(GROUP).map(g => { const s = stat(K.items.filter(i => i.gr === +g)); return `<button class="pp-tab${+g === S.group ? ' on' : ''}" data-g="${g}"><span class="ic">${GROUP[g][2]}</span><span class="tn">${esc(gName(+g))}</span><small>${s.n}/${s.t}</small></button>`; }).join('')}</div>`);
  h.push(`<div class="pp-filter"><div class="seg" id="ppShow"><button data-s="all" class="${S.show === 'all' ? 'on' : ''}">${t('Tất cả', 'All')}</button><button data-s="no" class="${S.show === 'no' ? 'on' : ''}">${t('Chưa mua', 'Not bought')}</button><button data-s="yes" class="${S.show === 'yes' ? 'on' : ''}">${t('Đã mua', 'Bought')}</button></div></div>`);
  const items = K.items.filter(i => i.gr === S.group), gs = stat(items), gDone = gs.n === gs.t;
  h.push(`<div class="pp-grp"><b>${esc(gName(S.group))}</b><small>${gs.n}/${gs.t}</small><span class="grow"></span>
    <button class="btn${gDone ? ' primary' : ''}" data-story="g${S.group}" ${gDone ? '' : 'disabled'}>${gDone ? '📜 ' + t('Câu chuyện của mục này', 'Story of this section') : '🔒 ' + t(`Mua đủ ${gs.t} thẻ để mở câu chuyện`, `Buy all ${gs.t} cards to unlock the story`)}</button></div>`);
  for (const sub of subsOf(S.group)) {
    const list = items.filter(i => i.sub === sub), s = stat(list), done = s.n === s.t, shown = list.filter(i => S.show === 'all' || (S.show === 'yes') === own(i.id));
    h.push(`<div class="pp-sub"><b>${esc(subName(sub))}</b><small>${s.n}/${s.t}</small><span class="grow"></span><button class="btn${done ? ' primary' : ''}" data-story="s:${esc(sub)}" ${done ? '' : 'disabled'}>${done ? '📜 ' + t('Câu chuyện', 'Story') : `🔒 ${s.n}/${s.t}`}</button></div>`);
    h.push(`<div class="pp-grid">${shown.map(i => `<button class="pp-card${own(i.id) ? ' own' : ''}" data-id="${i.id}"><span class="cv"></span><span class="nm gt">${esc(name(i))}</span><span class="pr">${own(i.id) ? '✓' : '🪙 ' + priceOf(i)}</span></button>`).join('') || `<div class="dim">${t('Không có thẻ nào.', 'No cards.')}</div>`}</div>`);
  }
  root.innerHTML = h.join('');
  const fl = $('#ppFlag', root); if (fl) { const c = fl.getContext('2d'); c.fillStyle = '#fff'; c.fillRect(0, 0, 64, 48); c.fillStyle = '#e8452c'; c.beginPath(); c.arc(32, 24, 14, 0, 7); c.fill(); }
  $$('.pp-card', root).forEach(b => { const it = K.byId[b.dataset.id]; $('.cv', b).replaceWith(Object.assign(sprite(it, own(it.id)), { className: 'cv' })); });
  if (!P.last || fresh > 0) { P.last = bal; save(); }
}

// ---------- hộp thoại ----------
function openCard(id) {
  const it = K.byId[id], o = own(id), bal = balance(), dlg = $('#passDlg'), price = priceOf(it);
  $('#pdTitle').textContent = name(it); $('#pdSub').textContent = `${gName(it.gr)} · ${subName(it.sub)}`;
  const holder = $('#pdArt'); holder.innerHTML = ''; const cv = sprite(it, o); cv.style.width = cv.width * 2 + 'px'; cv.style.height = cv.height * 2 + 'px'; holder.append(cv);
  $('#pdNote').className = 'gt' + (o ? '' : ' lock'); $('#pdNote').textContent = o ? it.note : t('🔒 Mua thẻ này để đọc nguồn gốc của nó.', '🔒 Buy this card to read its origin.');
  $('#pdEn').textContent = o && uiLang !== 'vi' ? 'English text: coming soon' : '';
  $('#pdTag').textContent = it.use ? { wear: t('👕 Mặc được', '👕 Wearable'), hold: t('✋ Cầm được', '✋ Holdable'), pet: t('🐾 Đi cùng', '🐾 Companion') }[it.use] : '';
  const b = $('#pdBuy'); b.hidden = o; b.disabled = bal < price; b.textContent = t(`Mua · 🪙 ${price}`, `Buy · 🪙 ${price}`);
  $('#pdBal').textContent = o ? t('✓ Bạn đã có thẻ này', '✓ You own this card') : t(`Bạn có 🪙 ${bal}${bal < price ? ` · còn thiếu ${price - bal} xu` : ''}`, `You have 🪙 ${bal}${bal < price ? ` · ${price - bal} more coins needed` : ''}`);
  b.onclick = () => buy(id); dlg.showModal();
}
function buy(id) {
  const it = K.byId[id]; if (own(id) || balance() < priceOf(it)) return;
  P.own.push(id); save(); sfx.play('ok'); $('#passDlg').close(); toast(t(`Đã mua: ${name(it)} ✓`, `Bought: ${name(it)} ✓`), 2200);
  const sub = K.items.filter(i => i.sub === it.sub), grp = K.items.filter(i => i.gr === it.gr);
  const done = [sub.every(i => own(i.id)) && 's:' + it.sub, grp.every(i => own(i.id)) && 'g' + it.gr].filter(Boolean).filter(k => !P.seen.includes(k));
  draw();
  if (done.length) { P.seen.push(...done); save(); const key = done[done.length - 1]; setTimeout(() => { toast(t('📜 Mở khóa câu chuyện mới!', '📜 New story unlocked!'), 2600); openStory(key); }, 500); }
}
function openStory(key) {
  const g = key.startsWith('g'), data = g ? ST.BIG[+key.slice(1)] : ST.SUB[key.slice(2)]; if (!data) return;
  $('#psTitle').textContent = data.title; $('#psKind').textContent = g ? t(`Câu chuyện của mục: ${gName(+key.slice(1))}`, `Story of section: ${gName(+key.slice(1))}`) : t(`Câu chuyện: ${key.slice(2)}`, `Story: ${subName(key.slice(2))}`);
  $('#psBody').innerHTML = data.text.map(p => `<p class="gt">${esc(p)}</p>`).join('') + (uiLang !== 'vi' ? '<div class="dim">English text: coming soon</div>' : '');
  $('#passStory').showModal();
}

// ---------- khởi tạo ----------
async function ensure() {
  if (K) return;
  const kit = await import('./pass-kit.js');
  await Promise.all([1, 2, 3, 4, 5].map(i => import(`./pass-jp${i}.js`)));
  ST = await import('./pass-story.js');
  K = { items: kit.ITEMS, byId: Object.fromEntries(kit.ITEMS.map(i => [i.id, i])), render: kit.render, paint: kit.paint };
}
async function open() {
  root = $('#passRoot'); if (!root) return;
  if (!P.since) { P.since = vnDate(); save(); }
  await ensure(); pull(); if (active) draw();
}
export function init() {
  bus.on('show', v => { active = v === 'passport'; if (active) open(); });
  bus.on('store', c => { if ((c === 'prefs' || c === '*') && K) pull(); if (active && K && (c === 'days' || c === '*')) draw(); });
  document.addEventListener('click', e => {
    if (!active || !root || !root.contains(e.target)) return;
    const b = e.target.closest('button'); if (!b) return;
    if (b.id === 'ppHow') { $('#ppHowBox').hidden = !$('#ppHowBox').hidden; return; }
    if (b.id === 'ppCont') { const v = lastVideo(); if (v) import('./player.js').then(m => m.openItem(v.id)); return; }
    if (b.id === 'ppLib') { bus.emit('nav', 'library'); return; }
    if (b.dataset.g) { S.group = +b.dataset.g; draw(); return; }
    if (b.closest('#ppShow')) { S.show = b.dataset.s; draw(); return; }
    if (b.dataset.story) { openStory(b.dataset.story); return; }
    if (b.classList.contains('pp-card')) openCard(b.dataset.id);
  });
  $('#pdClose')?.addEventListener('click', () => $('#passDlg').close());
  $('#psClose')?.addEventListener('click', () => $('#passStory').close());
  for (const id of ['passDlg', 'passStory']) $('#' + id)?.addEventListener('click', e => { if (e.target.id === id) e.target.close(); });
}
