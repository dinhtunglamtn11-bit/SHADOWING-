// Lịch cá nhân (mục Nhiệm vụ → 📆 Lịch): lịch trình theo tháng / ngày, thông tin cá nhân, nhắc việc.
// Dữ liệu: bộ sưu tập 'events' (đồng bộ như thẻ, ghi chú; xóa vào Thùng rác) và prefs/myinfo. Giờ luôn là giờ Việt Nam (UTC+7).
// Nhắc việc: KHÔNG có máy chủ nên chỉ báo được khi app còn đang chạy; mở lại app thì báo bù. Muốn nhắc khi đã đóng app: xuất sang lịch điện thoại (.ics).
import { $, esc, bus, toast, uid, vnDate, addDays } from './util.js';
import * as store from './store.js';
import * as sfx from './sfx.js';
import { tr } from './i18n.js';

const VN = 7 * 3600e3;
const CATS = { study: ['📚', 'Học tập'], work: ['💼', 'Công việc'], me: ['🙂', 'Cá nhân'], meet: ['🤝', 'Hẹn gặp'], birthday: ['🎂', 'Sinh nhật'], other: ['📌', 'Khác'] };
const REPEATS = { none: 'Không lặp', daily: 'Hằng ngày', weekly: 'Hằng tuần', monthly: 'Hằng tháng', yearly: 'Hằng năm' };
const REMINDS = [[0, 'Đúng giờ'], [10, 'Trước 10 phút'], [30, 'Trước 30 phút'], [60, 'Trước 1 giờ'], [180, 'Trước 3 giờ'], [1440, 'Trước 1 ngày'], [10080, 'Trước 1 tuần']];
const DOWS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const DOW_FULL = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
const ALLDAY_MIN = 8 * 60; // việc cả ngày: mốc nhắc là 08:00 sáng hôm đó

let sel = vnDate(), month = sel.slice(0, 7), view = 'month';
let helpOpen = false; // khung giải thích thông báo đang mở: mục Nhiệm vụ tự vẽ lại định kỳ, không được đóng nó
const redraw = () => bus.emit('calendar');

// ---------- ngày giờ ----------
const utc = d => new Date(d + 'T00:00:00Z');
const dowOf = d => utc(d).getUTCDay();
const lastDay = ym => new Date(Date.UTC(+ym.slice(0, 4), +ym.slice(5, 7), 0)).getUTCDate();
const dm = d => d.slice(8) + '/' + d.slice(5, 7);
const dmy = d => dm(d) + '/' + d.slice(0, 4);
const addMonth = (ym, n) => { const t = new Date(Date.UTC(+ym.slice(0, 4), +ym.slice(5, 7) - 1 + n, 1)); return t.toISOString().slice(0, 7); };
const startMs = (e, d) => Date.parse(`${d}T${e.time || '08:00'}:00+07:00`);

export function occursOn(e, d) {
  if (!e.date || d < e.date || (e.until && d > e.until) || e.skip?.[d]) return false;
  const r = e.repeat || 'none';
  if (r === 'daily') return true;
  if (r === 'weekly') return dowOf(d) === dowOf(e.date);
  if (r === 'monthly') return +d.slice(8) === Math.min(+e.date.slice(8), lastDay(d.slice(0, 7)));
  if (r === 'yearly') return d.slice(5, 7) === e.date.slice(5, 7) && +d.slice(8) === Math.min(+e.date.slice(8), lastDay(d.slice(0, 7)));
  return d === e.date;
}

export const myInfo = () => store.get('prefs', 'myinfo') || {};
function birthdayEvent() { // ngày sinh trong "Thông tin của tôi" tự thành lịch hằng năm
  const b = myInfo().birthday;
  return b ? { id: '_bday', title: 'Sinh nhật của bạn', date: b, time: '', repeat: 'yearly', cat: 'birthday', remind: [0, 1440], fixed: true, rem0: 0 } : null;
}
const allEvents = () => { const b = birthdayEvent(); return b ? [...store.list('events'), b] : store.list('events'); };
export function eventsOn(d, list = allEvents()) {
  return list.filter(e => occursOn(e, d)).sort((a, b) => (a.time || '').localeCompare(b.time || '') || String(a.title).localeCompare(String(b.title)));
}

// ---------- vẽ ----------
const catOf = e => CATS[e.cat] || CATS.other;
const timeText = e => (e.time ? e.time + (e.end ? '–' + e.end : '') : '<span>Cả ngày</span>');
const titleHtml = e => (e.fixed ? `<b>${esc(e.title)}</b>` : `<b class="cal-u">${esc(e.title)}</b>`);

function evRow(e, d, { showDate = false } = {}) {
  const done = !!e.done?.[d];
  return `<div class="cal-ev ${done ? 'done' : ''} c-${esc(e.cat || 'other')}">
    <button class="cal-chk" data-cal="done" data-id="${e.id}" data-d="${d}" ${e.fixed ? 'disabled' : ''} aria-label="Đánh dấu đã xong" title="Đánh dấu đã xong">${done ? '☑' : '☐'}</button>
    <div class="cal-body" ${e.fixed ? 'data-cal="info"' : `data-cal="edit" data-id="${e.id}" data-d="${d}" role="button" tabindex="0"`}>
      <div class="cal-line"><span class="cal-time">${showDate ? `${dm(d)} ` : ''}${timeText(e)}</span><span>${catOf(e)[0]}</span> ${titleHtml(e)}</div>
      ${e.place ? `<div class="dim">📍 <span class="cal-u">${esc(e.place)}</span></div>` : ''}
      ${e.note ? `<div class="dim cal-u cal-note">${esc(e.note)}</div>` : ''}
      <div class="cal-tags dim">${e.repeat && e.repeat !== 'none' ? `<span>🔁 ${REPEATS[e.repeat]}</span>` : ''}${e.remind?.length ? '<span>🔔 Có nhắc</span>' : ''}</div>
    </div></div>`;
}

function monthGrid(today, list) {
  const first = month + '-01', lead = (dowOf(first) + 6) % 7, n = lastDay(month), cells = Math.ceil((lead + n) / 7) * 7;
  let out = DOWS.map(d => `<span class="cal-dow">${d}</span>`).join('');
  for (let i = 0; i < cells; i++) {
    const d = addDays(first, i - lead), evs = eventsOn(d, list);
    out += `<button class="cal-cell ${d.slice(0, 7) !== month ? 'out' : ''} ${d === today ? 'today' : ''} ${d === sel ? 'sel' : ''}" data-cal="pick" data-d="${d}" aria-label="${dmy(d)}${evs.length ? ` (${evs.length})` : ''}">
      <b>${+d.slice(8)}</b>${evs.slice(0, 2).map(e => `<i class="c-${esc(e.cat || 'other')} ${e.done?.[d] ? 'done' : ''}">${e.fixed ? '🎂' : `<span class="cal-u">${esc(e.title)}</span>`}</i>`).join('')}${evs.length > 2 ? `<small>+${evs.length - 2}</small>` : ''}</button>`;
  }
  return `<div class="cal-grid">${out}</div>`;
}

function notifBar() {
  if (!('Notification' in window)) return '<div class="cal-note-bar">⚠ Trình duyệt này không có thông báo hệ thống. App vẫn hiện khung nhắc khi đang mở. (iPhone: hãy “Thêm vào màn hình chính” rồi mở từ biểu tượng đó.)</div>';
  if (Notification.permission === 'granted') return '<div class="cal-note-bar ok"><span>🔔 Thông báo trên máy này đang bật.</span> <button class="btn" data-cal="test">Gửi thử</button></div>';
  if (Notification.permission === 'denied') return '<div class="cal-note-bar">🔕 Máy này đang chặn thông báo. Mở cài đặt trang web của trình duyệt để cho phép lại.</div>';
  return '<div class="cal-note-bar"><span>🔔 Bật thông báo để được nhắc khi app đang chạy nền.</span> <button class="btn primary" data-cal="perm">Bật thông báo</button></div>';
}

function infoCard() {
  const p = myInfo(), rows = [['Họ tên', p.name], ['Ngày sinh', p.birthday && dmy(p.birthday)], ['Điện thoại', p.phone], ['Email', p.email], ['Địa chỉ', p.address], ['Nhóm máu / sức khỏe', p.health], ['Liên hệ khẩn cấp', p.sos]]
    .filter(r => r[1]).map(([k, v]) => `<div class="cal-kv"><span class="dim">${k}</span><b class="cal-u">${esc(v)}</b></div>`);
  for (const x of p.extra || []) rows.push(`<div class="cal-kv"><span class="dim cal-u">${esc(x.k)}</span><b class="cal-u">${esc(x.v)}</b></div>`);
  return `<div class="row between"><h3>👤 Thông tin của tôi</h3><button class="btn" data-cal="me">✏️ Sửa thông tin</button></div>
    <div class="cal-card">${rows.join('') || '<div class="dim">Chưa có thông tin nào.</div>'}</div>`;
}

export function html() {
  const today = vnDate(), list = allEvents();
  const dayList = eventsOn(sel, list);
  const dayTitle = `${DOW_FULL[dowOf(sel)]} ${dmy(sel)}`;
  const upcoming = [];
  for (let i = 1; i <= 30 && upcoming.length < 8; i++) { const d = addDays(today, i); for (const e of eventsOn(d, list)) if (upcoming.length < 8 && !(e.repeat === 'daily') && !e.done?.[d]) upcoming.push(evRow(e, d, { showDate: true })); }
  const navTitle = view === 'month' ? `Tháng ${+month.slice(5)}/${month.slice(0, 4)}` : dayTitle;
  return `<div class="cal">
    <div class="cal-top">
      <div class="cal-nav"><button class="btn" data-cal="prev" aria-label="Trước">‹</button><h2>${navTitle}</h2><button class="btn" data-cal="next" aria-label="Sau">›</button></div>
      <div class="cal-acts"><button class="btn" data-cal="today">Hôm nay</button>
        <button class="btn ${view === 'month' ? 'primary' : ''}" data-cal="vmonth">Xem tháng</button><button class="btn ${view === 'day' ? 'primary' : ''}" data-cal="vday">Xem ngày</button>
        <button class="btn primary" data-cal="add">＋ Thêm lịch</button></div>
    </div>
    ${notifBar()}
    ${view === 'month' ? monthGrid(today, list) : ''}
    ${view === 'month' ? `<h3>${dayTitle}</h3>` : ''}
    <div class="cal-list">${dayList.map(e => evRow(e, sel)).join('') || '<div class="dim">Ngày này chưa có lịch.</div>'}</div>
    <div class="row"><button class="btn" data-cal="add">＋ Thêm lịch cho ngày này</button></div>
    <h3>Sắp tới</h3>
    <div class="cal-list">${upcoming.join('') || '<div class="dim">30 ngày tới chưa có lịch nào.</div>'}</div>
    ${infoCard()}
    <details class="cal-help" ${helpOpen ? 'open' : ''}><summary>ℹ️ Thông báo hoạt động thế nào? (giới hạn thật)</summary>
      <ul>
        <li>App không có máy chủ, nên chỉ tự nhắc được khi app còn đang chạy (đang mở, hoặc vừa chuyển sang nền).</li>
        <li>Điện thoại có thể đóng băng app chạy nền sau vài phút: lúc đó thông báo đến trễ hoặc không đến.</li>
        <li>Đã đóng hẳn app hay tắt trình duyệt thì KHÔNG có thông báo nào. Mở lại app, lời nhắc đã lỡ trong 48 giờ sẽ hiện bù.</li>
        <li>Việc quan trọng: bấm nút dưới đây để đưa vào ứng dụng Lịch của điện thoại, lịch đó sẽ nhắc kể cả khi app đã đóng. Sửa hay xóa lịch trong app không tự cập nhật sang đó.</li>
        <li>Một số ứng dụng lịch (nhất là Google Calendar) bỏ qua giờ nhắc trong file và dùng giờ nhắc mặc định của nó: hãy kiểm tra lại sau khi nhập.</li>
      </ul>
      <button class="btn" data-cal="icsall">📲 Xuất toàn bộ lịch (.ics)</button>
    </details></div>`;
}

// dòng tóm tắt trong tab "Hôm nay"
export function todayHtml() {
  const d = vnDate(), evs = eventsOn(d).filter(e => !e.done?.[d]);
  if (!evs.length) return '';
  return `<div class="cal-today"><div class="row between"><b>📆 Lịch hôm nay</b><button class="btn" data-qt="cal">Mở lịch</button></div>
    ${evs.slice(0, 4).map(e => `<div class="cal-line"><span class="cal-time">${timeText(e)}</span><span>${catOf(e)[0]}</span> ${titleHtml(e)}</div>`).join('')}${evs.length > 4 ? `<div class="dim">+${evs.length - 4}</div>` : ''}</div>`;
}

// ---------- hộp thoại ----------
function dialog(id) {
  let d = $('#' + id);
  if (!d) { d = document.createElement('dialog'); d.id = id; d.className = 'cal-dlg'; document.body.appendChild(d); }
  return d;
}
const field = (label, inner) => `<label><span>${label}</span>${inner}</label>`;

function editEvent(id, day) {
  const old = id ? store.get('events', id) : null;
  const e = old || { title: '', date: sel, time: '', end: '', cat: 'me', repeat: 'none', until: '', remind: [10], place: '', note: '' };
  const d = dialog('calDlg'), repeating = old && old.repeat && old.repeat !== 'none';
  d.innerHTML = `<div class="hd"><span class="grow">${old ? 'Sửa lịch' : 'Thêm lịch'}</span><button class="btn" type="button" data-x="close" aria-label="Đóng">✕</button></div>
    <div class="bd"><form class="form" novalidate>
      ${field('Tiêu đề', `<input name="title" type="text" maxlength="120" value="${esc(e.title)}" placeholder="Ví dụ: Nộp bài, đi khám, học nhóm">`)}
      <div class="cal-2">${field('Ngày', `<input name="date" type="date" value="${e.date}">`)}${field('Loại', `<select name="cat">${Object.entries(CATS).map(([k, v]) => `<option value="${k}" ${e.cat === k ? 'selected' : ''}>${v[1]}</option>`).join('')}</select>`)}</div>
      <div class="cal-2">${field('Giờ bắt đầu (trống = cả ngày)', `<input name="time" type="time" value="${e.time || ''}">`)}${field('Giờ kết thúc', `<input name="end" type="time" value="${e.end || ''}">`)}</div>
      <div class="cal-2">${field('Lặp lại', `<select name="repeat">${Object.entries(REPEATS).map(([k, v]) => `<option value="${k}" ${(e.repeat || 'none') === k ? 'selected' : ''}>${v}</option>`).join('')}</select>`)}${field('Lặp đến ngày (trống = mãi)', `<input name="until" type="date" value="${e.until || ''}">`)}</div>
      <fieldset class="cal-rem"><legend>🔔 Nhắc tôi</legend>${REMINDS.map(([m, n]) => `<label><input type="checkbox" name="rem" value="${m}" ${e.remind?.includes(m) ? 'checked' : ''}> <span>${n}</span></label>`).join('')}
        <small class="dim">Việc cả ngày tính mốc từ 08:00 sáng.</small></fieldset>
      ${field('Địa điểm', `<input name="place" type="text" maxlength="200" value="${esc(e.place || '')}">`)}
      ${field('Ghi chú', `<textarea name="note" rows="3" maxlength="2000">${esc(e.note || '')}</textarea>`)}
      <div class="cal-err" role="alert" hidden></div>
      <div class="row"><button class="btn primary" type="submit">💾 Lưu</button>${old ? `${repeating ? '<button class="btn danger" type="button" data-x="delone">Xóa riêng ngày này</button>' : ''}<button class="btn danger" type="button" data-x="del">${repeating ? 'Xóa cả chuỗi' : '🗑 Xóa'}</button>` : ''}</div>
      ${old ? '<div class="row"><button class="btn" type="button" data-x="ics">📲 Đưa vào lịch điện thoại (.ics)</button><button class="btn" type="button" data-x="gcal">Mở trong Google Calendar</button></div>' : ''}
    </form></div>`;
  const form = d.querySelector('form');
  form.onsubmit = ev => {
    ev.preventDefault();
    const f = new FormData(form), g = k => String(f.get(k) || '').trim(), err = d.querySelector('.cal-err');
    const fail = m => { err.textContent = m; err.hidden = false; };
    const x = { title: g('title'), date: g('date'), time: g('time'), end: g('end'), cat: g('cat'), repeat: g('repeat'), until: g('until'), place: g('place'), note: g('note'), remind: f.getAll('rem').map(Number) };
    if (!x.title) return fail('Hãy nhập tiêu đề.');
    if (!x.date) return fail('Hãy chọn ngày.');
    if (!x.time) x.end = '';
    if (x.end && x.end <= x.time) return fail('Giờ kết thúc phải sau giờ bắt đầu.');
    if (x.repeat === 'none') x.until = '';
    if (x.until && x.until < x.date) return fail('Ngày kết thúc lặp phải sau ngày bắt đầu.');
    // đổi giờ giấc / mức nhắc thì tính mốc nhắc lại từ bây giờ (không báo bù cho mốc đã qua)
    const moved = !old || ['date', 'time', 'repeat', 'until'].some(k => (old[k] || '') !== (x[k] || '')) || String(old.remind || []) !== String(x.remind);
    if (moved) x.rem0 = Date.now();
    const key = id || uid();
    store.put('events', key, old ? x : { ...x, created: Date.now() });
    if (!old || old.date !== x.date) { sel = x.date; month = sel.slice(0, 7); }
    d.close(); redraw(); checkReminders();
    toast(x.remind.length && (!('Notification' in window) || Notification.permission !== 'granted') ? 'Đã lưu. Bật thông báo để được nhắc cả khi app chạy nền.' : 'Đã lưu lịch', 3000);
  };
  d.onclick = ev => {
    const b = ev.target.closest('[data-x]');
    if (!b) return;
    const act = b.dataset.x;
    if (act === 'close') d.close();
    else if (act === 'del') { if (confirm('Xóa lịch này? Có thể khôi phục trong Thùng rác 30 ngày.')) { store.del('events', id); d.close(); redraw(); toast('Đã chuyển vào Thùng rác'); } }
    else if (act === 'delone') { if (confirm('Bỏ riêng ngày này khỏi chuỗi lặp?')) { store.put('events', id, { skip: { ...(old.skip || {}), [day || sel]: true } }); d.close(); redraw(); } }
    else if (act === 'ics') saveIcs([{ id, ...store.get('events', id) }]);
    else if (act === 'gcal') window.open(gcalUrl(store.get('events', id)), '_blank', 'noopener');
  };
  d.showModal();
}

function editInfo() {
  const p = myInfo(), d = dialog('calMeDlg');
  const exRow = (x = {}) => `<div class="cal-ex"><input type="text" class="k" maxlength="60" placeholder="Tên mục" value="${esc(x.k || '')}"><input type="text" class="v grow" maxlength="200" placeholder="Nội dung" value="${esc(x.v || '')}"><button class="btn" type="button" data-x="exdel" aria-label="Xóa dòng">✕</button></div>`;
  const inp = (label, name, type = 'text') => field(label, `<input name="${name}" type="${type}" maxlength="200" value="${esc(p[name] || '')}">`);
  d.innerHTML = `<div class="hd"><span class="grow">👤 Thông tin của tôi</span><button class="btn" type="button" data-x="close" aria-label="Đóng">✕</button></div>
    <div class="bd"><form class="form" novalidate>
      ${inp('Họ tên', 'name')}${inp('Ngày sinh', 'birthday', 'date')}${inp('Điện thoại', 'phone', 'tel')}${inp('Email', 'email', 'email')}${inp('Địa chỉ', 'address')}${inp('Nhóm máu / sức khỏe', 'health')}${inp('Liên hệ khẩn cấp', 'sos')}
      <div class="cal-exs">${(p.extra || []).map(exRow).join('')}</div>
      <button class="btn" type="button" data-x="exadd">＋ Thêm mục khác</button>
      <small>Dữ liệu này được lưu và đồng bộ như ghi chú. Đừng ghi mật khẩu, số thẻ ngân hàng hay số giấy tờ vào đây.</small>
      <div class="row"><button class="btn primary" type="submit">💾 Lưu</button></div>
    </form></div>`;
  d.onclick = ev => {
    const b = ev.target.closest('[data-x]');
    if (!b) return;
    if (b.dataset.x === 'close') d.close();
    else if (b.dataset.x === 'exadd') { d.querySelector('.cal-exs').insertAdjacentHTML('beforeend', exRow()); d.querySelector('.cal-ex:last-child .k').focus(); }
    else if (b.dataset.x === 'exdel') b.closest('.cal-ex').remove();
  };
  const form = d.querySelector('form');
  form.onsubmit = ev => {
    ev.preventDefault();
    const f = new FormData(form), o = {};
    for (const k of ['name', 'birthday', 'phone', 'email', 'address', 'health', 'sos']) o[k] = String(f.get(k) || '').trim();
    o.extra = [...d.querySelectorAll('.cal-ex')].map(r => ({ k: r.querySelector('.k').value.trim(), v: r.querySelector('.v').value.trim() })).filter(x => x.k || x.v);
    store.put('prefs', 'myinfo', o);
    d.close(); redraw(); toast('Đã lưu thông tin');
  };
  d.showModal();
}

// ---------- xuất sang lịch điện thoại ----------
const icsText = s => String(s || '').replace(/\\/g, '\\\\').replace(/[;,]/g, '\\$&').replace(/\r?\n/g, '\\n');
const stamp = ms => new Date(ms).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
const day8 = d => d.replace(/-/g, '');
const trig = min => `${min < 0 ? '-' : ''}PT${Math.abs(min)}M`; // âm = trước giờ bắt đầu
function rrule(e) {
  if (!e.repeat || e.repeat === 'none') return '';
  let r = 'FREQ=' + e.repeat.toUpperCase();
  const dd = +e.date.slice(8);
  if (e.repeat === 'monthly' && dd > 28) r += `;BYMONTHDAY=${Array.from({ length: dd - 27 }, (_, i) => 28 + i).join(',')};BYSETPOS=-1`; // ngày 29-31: lấy ngày cuối tháng nếu thiếu
  if (e.until) r += ';UNTIL=' + (e.time ? stamp(Date.parse(e.until + 'T23:59:59+07:00')) : day8(e.until));
  return r;
}
function times(e) { // [bắt đầu, kết thúc] theo định dạng iCalendar
  if (!e.time) return [day8(e.date), day8(addDays(e.date, 1))];
  const a = startMs(e, e.date), b = e.end ? Date.parse(`${e.date}T${e.end}:00+07:00`) : a + 3600e3;
  return [stamp(a), stamp(b)];
}
export function buildIcs(list) {
  const out = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SHADOWING//Lich//VI', 'CALSCALE:GREGORIAN'];
  for (const e of list) {
    const [a, b] = times(e), val = e.time ? '' : ';VALUE=DATE', r = rrule(e);
    out.push('BEGIN:VEVENT', `UID:${e.id}@shadowing`, 'DTSTAMP:' + stamp(Date.now()), `DTSTART${val}:${a}`, `DTEND${val}:${b}`, 'SUMMARY:' + icsText(e.title));
    if (r) out.push('RRULE:' + r);
    const skip = Object.keys(e.skip || {}).filter(d => e.skip[d]);
    if (skip.length) out.push(`EXDATE${val}:` + skip.map(d => (e.time ? stamp(startMs(e, d)) : day8(d))).join(','));
    if (e.place) out.push('LOCATION:' + icsText(e.place));
    if (e.note) out.push('DESCRIPTION:' + icsText(e.note));
    for (const m of e.remind || []) out.push('BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:' + icsText(e.title), 'TRIGGER:' + trig((e.time ? 0 : ALLDAY_MIN) - m), 'END:VALARM');
    out.push('END:VEVENT');
  }
  out.push('END:VCALENDAR');
  // gập dòng dài theo chuẩn (dòng tiếp theo bắt đầu bằng dấu cách)
  return out.map(foldLine).join('\r\n') + '\r\n';
}
function foldLine(l) { // mỗi dòng tối đa 75 byte (tính theo UTF-8, chữ tiếng Việt dài 2-3 byte), không cắt giữa một ký tự
  const enc = new TextEncoder();
  let out = '', used = 0;
  for (const ch of l) {
    const n = enc.encode(ch).length;
    if (used + n > 74) { out += '\r\n '; used = 1; }
    out += ch; used += n;
  }
  return out;
}
function saveIcs(list) {
  if (!list.length) { toast('Chưa có lịch nào để xuất'); return; }
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([buildIcs(list)], { type: 'text/calendar;charset=utf-8' }));
  a.download = list.length === 1 ? 'lich.ics' : 'lich-shadowing.ics';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  toast('Đã tạo file .ics: mở file đó để thêm vào lịch điện thoại', 4500);
}
function gcalUrl(e) {
  const q = new URLSearchParams({ action: 'TEMPLATE', text: e.title, dates: times(e).join('/'), details: e.note || '', location: e.place || '' });
  if (rrule(e)) q.set('recur', 'RRULE:' + rrule(e));
  return 'https://calendar.google.com/calendar/render?' + q;
}

// ---------- nhắc việc ----------
const FKEY = 'cal:fired', LATE_MS = 48 * 3600e3;
const readFired = () => { try { return JSON.parse(localStorage.getItem(FKEY)) || {}; } catch { return {}; } };

// các lời nhắc đến hạn mà máy này chưa báo (xuất ra để thử)
export function dueReminders(list, now, fired) {
  const out = [], today = vnDate(now);
  for (const e of list) {
    if (!e.remind?.length) continue;
    for (let i = -2; i <= 8; i++) {
      const d = addDays(today, i);
      if (!occursOn(e, d) || e.done?.[d]) continue;
      let best = null;
      for (const m of e.remind) {
        const st = startMs(e, d), set = e.rem0 || 0, key = `${e.id}|${d}|${e.time || ''}|${m}`;
        let at = st - m * 60000;
        if (st >= set) at = Math.max(at, set); // vừa tạo việc sát giờ (mốc nhắc đã trôi qua nhưng việc chưa tới): nhắc ngay
        else if (at < set - 60000) continue; // việc đã qua từ trước khi đặt nhắc: không báo bù
        if (at > now || at < now - LATE_MS || fired[key]) continue;
        fired[key] = at;
        if (!best || at > best.at) best = { e, d, at, key };
      }
      if (best) out.push(best);
    }
  }
  return out.sort((a, b) => a.at - b.at);
}

export function checkReminders() {
  const now = Date.now(), fired = readFired(), due = dueReminders(allEvents(), now, fired);
  if (!due.length) return;
  for (const k in fired) if (fired[k] < now - 10 * 864e5) delete fired[k];
  try { localStorage.setItem(FKEY, JSON.stringify(fired)); } catch { /* hết chỗ */ }
  showAlert(due, now);
  due.slice(-4).forEach(x => notify(x.e.fixed ? tr(x.e.title) : x.e.title, `${x.d === vnDate() ? tr('Hôm nay') : dm(x.d)} ${x.e.time || ''}${x.e.place ? ' · ' + x.e.place : ''}`.trim(), x.key)); // thông báo hệ thống nằm ngoài trang nên phải tự dịch
  try { sfx.play('ok'); } catch { /* âm thanh tắt */ }
}

function showAlert(due, now) { // khung nhắc trong app: ở lại đến khi bạn bấm (thông báo nổi dễ bị lỡ)
  let box = $('#calAlert');
  if (!box) {
    box = document.createElement('div'); box.id = 'calAlert'; box.setAttribute('role', 'alert'); document.body.appendChild(box);
    box.onclick = ev => {
      if (ev.target.closest('[data-x="open"]')) { openCalendar(box.dataset.d); box.remove(); }
      else if (ev.target.closest('[data-x="ok"]')) box.remove();
    };
    box.innerHTML = '<b>🔔 Lời nhắc</b><div class="cal-al"></div><div class="row"><button class="btn primary" data-x="ok">Đã biết</button><button class="btn" data-x="open">Mở lịch</button></div>';
  }
  box.dataset.d = due[due.length - 1].d;
  box.querySelector('.cal-al').insertAdjacentHTML('beforeend', due.map(x => `<div>${now - x.at > 5 * 60000 ? '<span class="cal-miss">Đã lỡ</span> ' : ''}<span class="cal-time">${x.d === vnDate() ? '' : dm(x.d) + ' '}${timeText(x.e)}</span> ${titleHtml(x.e)}</div>`).join(''));
}

async function notify(title, body, tag) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const opt = { body, tag, icon: 'icon-192.png', badge: 'icon-192.png' };
  try {
    const reg = await navigator.serviceWorker?.getRegistration();
    if (reg?.active) await reg.showNotification(title, opt); // Android chỉ cho thông báo qua service worker
    else new Notification(title, opt);
  } catch (e) { console.warn('Không hiện được thông báo:', e); }
}

function openCalendar(day) {
  if (day) { sel = day; month = day.slice(0, 7); }
  bus.emit('nav', 'quest');
  bus.emit('quest-tab', 'cal');
}

function onClick(ev) {
  const b = ev.target.closest('[data-cal]');
  if (!b) return;
  const a = b.dataset.cal, id = b.dataset.id, d = b.dataset.d;
  if (a === 'pick') { if (sel === d) view = 'day'; sel = d; month = d.slice(0, 7); }
  else if (a === 'prev' || a === 'next') {
    const k = a === 'prev' ? -1 : 1;
    if (view === 'month') { month = addMonth(month, k); sel = month === vnDate().slice(0, 7) ? vnDate() : month + '-01'; }
    else { sel = addDays(sel, k); month = sel.slice(0, 7); }
  } else if (a === 'today') { sel = vnDate(); month = sel.slice(0, 7); }
  else if (a === 'vmonth') view = 'month';
  else if (a === 'vday') view = 'day';
  else if (a === 'add') { editEvent(); return; }
  else if (a === 'edit') { editEvent(id, d); return; }
  else if (a === 'info' || a === 'me') { editInfo(); return; }
  else if (a === 'done') { const e = store.get('events', id); if (e) store.put('events', id, { done: { ...(e.done || {}), [d]: !e.done?.[d] } }); }
  else if (a === 'perm') { Notification.requestPermission().then(p => { redraw(); if (p === 'granted') notify('SHADOWING', tr('Đã bật thông báo nhắc lịch.'), 'cal-test'); }); return; }
  else if (a === 'test') { notify('SHADOWING', tr('Đây là thông báo thử.'), 'cal-test'); toast('Đã gửi thông báo thử'); return; }
  else if (a === 'icsall') { saveIcs(allEvents()); return; }
  redraw();
}

export function init() {
  $('#questBody').addEventListener('click', onClick);
  $('#questBody').addEventListener('toggle', ev => { if (ev.target.matches?.('.cal-help')) helpOpen = ev.target.open; }, true);
  $('#questBody').addEventListener('keydown', ev => { if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.matches('.cal-body[role=button]')) { ev.preventDefault(); onClick(ev); } });
  bus.on('store', c => { if (c === 'events' || c === 'prefs' || c === '*') setTimeout(checkReminders, 0); }); // mục Nhiệm vụ tự vẽ lại khi dữ liệu đổi
  setInterval(checkReminders, 20000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) checkReminders(); });
  navigator.serviceWorker?.addEventListener('message', ev => { if (ev.data?.type === 'open-calendar') openCalendar(); });
  setTimeout(() => {
    if (new URLSearchParams(location.search).has('cal')) openCalendar();
    checkReminders();
  }, 1500);
}
