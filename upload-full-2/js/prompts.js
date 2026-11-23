// Prompt tổng (⚙ Cài đặt → Prompt tổng): một chỗ chứa mọi prompt để nhờ ChatGPT / Claude soạn nội dung đúng cú pháp của app
// (bài tập, bài đọc + câu hỏi, bài đăng Flash / Focus, thuật ngữ Keyword, phụ đề, kho từ vựng, từ vựng cho bài tập,
// và hai prompt dành cho Claude Code: thêm bộ case SCM, thêm nước vào Passport).
// Mỗi loại có bản mặc định; bạn sửa thoải mái, tự lưu (đồng bộ giữa các máy khi đã đăng nhập, có trong file sao lưu). "Mặc định" trả lại bản gốc.
// Bản mặc định tự đổi theo ngôn ngữ đang chọn chừng nào bạn chưa sửa.
import { $, toast, bus, LANGS } from './util.js';
import * as store from './store.js';
import { setPrompt, newsPrompt, socialPrompt, vocabBankPrompt, KIND_ORDER, KIND_INFO, EX } from './exprompts.js';

// Biến dùng được trong mọi prompt (viết trong dấu { }): sẽ được thay bằng giá trị bạn nhập ở các ô phía trên
const VARS = ['chung', 'ngôn_ngữ', 'trình_độ', 'chủ_đề', 'số_lượng', 'số_bài', 'nguồn', 'tên_nước', 'châu'];
const lname = lang => ((LANGS.find(l => l.id === lang) || { name: 'Tiếng Trung' }).name).replace(/^Tiếng /, 'tiếng ');
const head = '{chung}\n\n';

const SUB_SYNTAX = lang => {
  const ex = { zh: '你好，今天天气很好 | nǐ hǎo jīn tiān tiān qì hěn hǎo | Xin chào, hôm nay thời tiết rất đẹp', ja: 'こんにちは、今日はいい天気ですね | konnichiwa kyō wa ii tenki desu ne | Xin chào, hôm nay trời đẹp nhỉ', ko: '안녕하세요, 오늘 날씨가 좋네요 | annyeonghaseyo oneul nalssiga joneyo | Xin chào, hôm nay thời tiết đẹp', en: 'Good morning, how are you? | gud mor-ning hau ar yu | Chào buổi sáng, bạn khỏe không?' }[lang] || '你好 | nǐ hǎo | Xin chào';
  return `Bạn là biên tập viên phụ đề ${lname(lang)}. {chung}

Hãy chia phần NGUỒN ở cuối thành từng câu ngắn (mỗi câu vừa một lần nói, khoảng 5–20 chữ/từ) rồi viết theo ĐÚNG cú pháp, MỖI CÂU MỘT DÒNG, 3 phần cách nhau bằng dấu | :
chữ gốc | phiên âm | nghĩa tiếng Việt

Ví dụ:
${ex}

QUY TẮC:
- Chỉ trả về các dòng phụ đề, đặt trong MỘT khối code, không giải thích thêm, không đánh số.
- Có giờ bắt đầu thì thêm ở đầu dòng: [mm:ss] chữ gốc | phiên âm | nghĩa  (không bắt buộc).
- Phiên âm: ${lang === 'zh' ? 'pinyin có dấu thanh, các chữ cách nhau bằng dấu cách' : lang === 'ja' ? 'romaji' : lang === 'ko' ? 'romaja' : 'phiên âm dễ đọc'}; nghĩa viết tự nhiên bằng tiếng Việt, không dịch từng chữ.
${lang === 'zh' ? '- Chữ Hán dùng GIẢN THỂ.\n' : ''}- Không bịa thêm nội dung ngoài NGUỒN. Trình độ: {trình_độ}.

NGUỒN:
{nguồn}`;
};
const VOCAB = lang => `Bạn là giáo viên ${lname(lang)}. {chung}

Từ NGUỒN ở cuối (hoặc chủ đề: {chủ_đề}), hãy lập danh sách khoảng {số_lượng} từ vựng quan trọng, trình độ {trình_độ}, theo ĐÚNG cú pháp, MỖI TỪ MỘT DÒNG:
T: từ | phiên âm | nghĩa tiếng Việt

Ví dụ: ${EX[lang]?.T || EX.zh.T}

QUY TẮC:
- Chỉ trả về các dòng T:, trong MỘT khối code; dòng đầu có thể là tiêu đề bộ: # Tên bộ từ.
- Không trùng lặp, chỉ lấy từ hữu ích; có thể bỏ phiên âm: T: từ | nghĩa.
${lang === 'zh' ? '- Chữ Hán dùng GIẢN THỂ.\n' : ''}
NGUỒN:
{nguồn}`;
const PASSPORT = `Làm thêm nước {tên_nước} (châu {châu}) cho tab Passport của app SHADOWING, đúng khuôn các nước đã làm. Đọc trước memory/passport-project.md và xem js/pass-au1..5.js, js/pass-au6.js, js/pass-story-au.js, js/pass-au2.js (trang phục) làm mẫu; làm theo tools/passport/PROMPT-them-nuoc.md.
{chung}

Nội dung: theo tài liệu "Sổ tay 5 nhóm" dán bên dưới. Mỗi nước có 5 nhóm lớn, mỗi nhóm có mục nhỏ rồi thẻ; mỗi thẻ có tên Việt, tên Anh, ghi chú 1–2 câu (rút gọn từ tài liệu, sửa lỗi chính tả). Mỗi mục lớn một câu chuyện dài lấy từ tài liệu, mỗi mục nhỏ một câu chuyện ngắn tự viết. Thẻ chỉ có tiếng Việt/Anh.

Việc cần làm (mã nước xx): js/pass-xx1..5.js (thẻ pixel 16×16, mã thẻ ASCII có tiền tố xx-, d.l chỉ nhận số nguyên); trang phục và đồ cho Lame (OUTM, OUT_KEY, SLOT_OF, O); js/pass-story-xx.js (BIG và SUB, khóa phải khớp tên mục nhỏ); js/pass-xx6.js; pass-world.js (|xx); drawFlag trong passport.js; pass-count.js (COUNT); pass-iso.js (CC2ISO: mã ISO 3 chữ cái của nước); sw.js (tăng phiên bản, thêm file); chép sang upload rồi chia lại TOÀN BỘ upload thành upload-full-1, -2, -3… (mỗi gói dưới 100 file, các gói hợp lại phải giống hệt upload; người dùng tải đủ mọi gói, thứ tự nào cũng được). KHÔNG làm gói cập nhật lẻ vì dễ lẫn bản cũ và mới gây lỗi khởi động.
Kiểm tra trước khi báo xong: số thẻ, không trùng mã, mọi mục nhỏ có truyện, mọi thẻ vẽ được, đồ ghép lên Lame không lỗi, mở thử trên trình duyệt, console không lỗi. Báo cáo ngắn bằng tiếng Việt.

TÀI LIỆU:
{nguồn}`;

const SCMCASE = `Thêm bộ case mới vào mục SCM của app SHADOWING. Đọc trước memory/passport-project.md (các dòng ghi về SCM), js/scm.js, js/scm-keys2.js, js/scm-engines2.js, js/scm-events.js và tools/scm/extract-cases.ps1.
{chung}

TÀI LIỆU case là file .docx theo khuôn "SC Case Bank". Phần "Part I – The cases": mỗi case là "Case X# · Tên" (Heading 1, X = chữ lĩnh vực, # = 1 Dễ / 2 Trung bình / 3 Khó) gồm bảng thông tin (Field | Difficulty | Time allowance | Form steps), đoạn "Brief.", "Time plan" (bảng Milestone | Deadline "+N days" hoặc ngày giờ cụ thể | What is locked "Steps a–b"; mốc có cập nhật ghi "Update released at Mk" hoặc "Exhibit n released"), "Case file" (các Exhibit, hình), "Your tasks (form)" gồm các "Step n – tên (N points…)": bảng tick (# | Statement | Tick), bảng điền (Field | Your entry | Unit, ô trống là "__________"), ma trận ("____"), cuối cùng là bảng luật sao. Phần "Part II – Solutions and answer keys": mỗi case có "Solution X# · Tên", đáp án từng bước và "Marking guide".

VIỆC CẦN LÀM
1. Trích: powershell -File tools\\scm\\extract-cases.ps1 -Docx "<đường dẫn file>" -JsonName scm-casesN.json -ImgPrefix bN-  (ảnh vào js/scm-img/ có tiền tố để không trùng).
2. js/scm.js: thêm lĩnh vực vào FIELDS (vi, en, ic, blurb), ORDER, FIELD_IDS; nạp thêm file JSON trong data(). js/scm-art.js: icon lĩnh vực (f-xxx) và icon từng case (pixel 16×16).
3. Đáp án trong js/scm-keysN.js (gộp vào KEYS bằng Object.assign). Khóa ô: "bước.bảng.dòng[.cột]", bảng tính theo thứ tự (kể cả bảng tick và bảng luật). Mỗi ô: ticks[bước] = các dòng đúng; f[khóa] = { v | s | set | nums, tol | rel, w, ft (tính tiếp), eng (tính lại từ lựa chọn của người chơi), pf (điểm từng phần 0..1) }; dq(g) trả { dq, valid, why }.
4. Bài có tối ưu hóa phải viết ENGINE trong js/scm-engines*.js: tính lại chi phí / điều kiện hợp lệ từ lựa chọn của người chơi, duyệt mọi phương án để ra tối ưu; ĐỐI CHIẾU engine với MỌI con số trong lời giải của tài liệu trước khi dùng. Số liệu nằm trong hình thì đọc từ hình rồi đối chiếu với bảng lời giải.
5. Sao: ★ ≥ 60 điểm và hợp lệ; ★★ ≥ 75 và chất lượng quyết định ≥ 80%; ★★★ ≥ 90 và chọn đúng tối ưu. Mốc khóa bước, cập nhật giữa chừng, hộp thư ngẫu nhiên, thưởng xu theo độ khó (mã case: chữ cái là lĩnh vực, chữ số là độ khó) đã có sẵn trong code.
6. sw.js: tăng phiên bản shadowing-vNN, thêm mọi file mới (js, json, ảnh). Chép file đổi sang upload rồi chia lại TOÀN BỘ upload thành upload-full-1, -2, -3… (mỗi gói dưới 100 file, hợp lại giống hệt upload, người dùng tải đủ mọi gói). Không làm gói cập nhật lẻ vì dễ lẫn bản cũ và mới.

KIỂM TRA TRƯỚC KHI BÁO XONG (trình duyệt http://localhost:8080, preview_start "shadowing"): mọi case điền đáp án chuẩn đạt 100/100; thử phương án sai và không hợp lệ cho đúng kết quả như lời giải; kiểm tra mốc khóa và cập nhật; mọi hình tải được; không lỗi console; các case cũ vẫn 100/100; dọn localStorage scm:v1 sau cùng. Báo cáo bằng tiếng Việt, ngắn gọn: phần nào do engine tính, phần nào dựng sẵn theo lời giải, cách đẩy bản mới.

TÀI LIỆU / GHI CHÚ:
{nguồn}`;

// Danh sách loại nội dung: mã, tên, hàm dựng bản mặc định theo ngôn ngữ
const TYPES = [
  { id: 'sets', name: '📝 Bài tập (Bài tập của tôi, bài tập gắn video)', build: lang => head + setPrompt({ lang, kinds: KIND_ORDER, count: '{số_lượng}', title: '{chủ_đề}', source: '{nguồn}' }) },
  { id: 'news', name: '📰 Bài đọc + câu hỏi (Thế giới → Tin tức)', build: lang => head + newsPrompt({ lang, kinds: KIND_ORDER, count: '{số_lượng}', topic: '{chủ_đề}', level: '{trình_độ}', articles: '{số_bài}', source: '' }) + '\n\nNGUỒN (nếu có):\n{nguồn}' },
  { id: 'flash', name: '⚡ Bài đăng ngắn (Social: Fact)', build: lang => head + socialPrompt({ lang, kind: 'flash', fields: '{chủ_đề}', posts: '{số_bài}', level: '{trình_độ}', source: '{nguồn}' }) },
  { id: 'focus', name: '🔭 Bài đọc dài (Social: Focus)', build: lang => head + socialPrompt({ lang, kind: 'focus', fields: '{chủ_đề}', posts: '{số_bài}', level: '{trình_độ}', source: '{nguồn}' }) },
  { id: 'keyword', name: '🔑 Thuật ngữ + tác giả (Thế giới → Keyword)', build: lang => head + socialPrompt({ lang, kind: 'keyword', fields: '{chủ_đề}', posts: '{số_bài}', level: '{trình_độ}', source: '{nguồn}' }) },
  { id: 'subs', name: '💬 Phụ đề / câu 3 phần (chữ gốc | phiên âm | nghĩa)', build: SUB_SYNTAX },
  { id: 'vocabbank', name: '🔠 Kho từ vựng (Ôn tập → Từ vựng → Nhập từ)', build: lang => head + vocabBankPrompt({ lang, topic: '{chủ_đề}', n: '{số_lượng}', level: '{trình_độ}' }) + '\n\nNGUỒN (nếu có, chỉ lấy từ trong đây):\n{nguồn}' },
  { id: 'vocab', name: '🔤 Từ vựng cho bài tập (dòng T: từ | phiên âm | nghĩa)', build: VOCAB },
  { id: 'scmcase', name: '📦 Thêm bộ case mới vào SCM', build: () => SCMCASE },
  { id: 'passport', name: '🛂 Thêm nước mới vào Passport', build: () => PASSPORT },
];
const DEF = { lang: 'zh', level: 'trung cấp', topic: '', n: 5, posts: 3, src: '', type: 'sets' };

let doc = { tpl: {}, common: '', vars: { ...DEF } }, built = false;
const load = () => { const r = store.get('prefs', 'prompts'); if (r) doc = { tpl: r.tpl || {}, common: r.common || '', vars: { ...DEF, ...(r.vars || {}) } }; };
let saveT = 0;
const save = () => { clearTimeout(saveT); saveT = setTimeout(() => store.put('prefs', 'prompts', { tpl: doc.tpl, common: doc.common, vars: doc.vars }), 600); };
const typeOf = id => TYPES.find(x => x.id === id) || TYPES[0];
const defaultText = () => typeOf(doc.vars.type).build(doc.vars.lang);
const textNow = () => doc.tpl[doc.vars.type] ?? defaultText(); // chưa sửa thì luôn là bản mặc định theo ngôn ngữ đang chọn

export function fill(text, v = doc.vars, common = doc.common) {
  const map = { chung: common, 'ngôn_ngữ': lname(v.lang), 'trình_độ': v.level, 'chủ_đề': v.topic, 'số_lượng': v.n, 'số_bài': v.posts, 'nguồn': v.src, 'tên_nước': v.country || '', 'châu': v.continent || '' };
  let out = text;
  for (const k of VARS) out = out.split(`{${k}}`).join(String(map[k] ?? '').trim() || (k === 'nguồn' ? '(dán nội dung vào đây)' : ''));
  return out.replace(/\n{3,}/g, '\n\n').trim();
}

function render() {
  if (!$('#pgType')) return;
  load();
  const v = doc.vars, set = (id, val) => { const e = $('#' + id); if (e && e.value !== String(val)) e.value = val; };
  if (!built) {
    $('#pgType').innerHTML = TYPES.map(x => `<option value="${x.id}">${x.name}</option>`).join('');
    $('#pgLang').innerHTML = LANGS.map(l => `<option value="${l.id}">${l.name}</option>`).join('');
    $('#pgVars').textContent = VARS.map(k => `{${k}}`).join(' ');
    built = true;
  }
  set('pgType', v.type); set('pgLang', v.lang); set('pgLevel', v.level); set('pgTopic', v.topic); set('pgN', v.n); set('pgPosts', v.posts); set('pgSrc', v.src); set('pgCommon', doc.common); set('pgCountry', v.country || ''); set('pgCont', v.continent || '');
  $('#pgTpl').value = textNow(); note();
}
function note() { const custom = doc.tpl[doc.vars.type] != null; $('#pgNote').textContent = custom ? '✏️ Bạn đã sửa prompt này (bấm “Mặc định” để trả lại bản gốc).' : 'Đang dùng bản mặc định (tự đổi theo ngôn ngữ). Sửa bất kỳ chỗ nào là được lưu lại.'; $('#pgPassOnly').hidden = doc.vars.type !== 'passport'; }
function read() {
  const v = doc.vars; v.type = $('#pgType').value; v.lang = $('#pgLang').value; v.level = $('#pgLevel').value; v.topic = $('#pgTopic').value; v.n = Math.max(1, Math.min(60, +$('#pgN').value || 5)); v.posts = Math.max(1, Math.min(30, +$('#pgPosts').value || 3)); v.src = $('#pgSrc').value; v.country = $('#pgCountry').value; v.continent = $('#pgCont').value;
  doc.common = $('#pgCommon').value;
}
export function init() {
  bus.on('settingsOpen', render);
  const dlg = $('#uiDlg'); if (!dlg) return;
  dlg.addEventListener('change', e => {
    if (!e.target.id?.startsWith('pg') || e.target.id === 'pgTpl') return;
    const before = doc.vars.type; read(); save();
    if (e.target.id === 'pgType' || e.target.id === 'pgLang') { $('#pgTpl').value = textNow(); note(); } else if (before !== doc.vars.type) note();
  });
  dlg.addEventListener('input', e => {
    if (e.target.id === 'pgTpl') { doc.tpl[doc.vars.type] = e.target.value; save(); note(); }
    else if (e.target.id?.startsWith('pg') && e.target.id !== 'pgType' && e.target.id !== 'pgLang') { read(); save(); }
  });
  $('#pgReset')?.addEventListener('click', () => { delete doc.tpl[doc.vars.type]; save(); $('#pgTpl').value = textNow(); note(); toast('Đã trả lại prompt mặc định'); });
  $('#pgCopy')?.addEventListener('click', async () => {
    read(); const out = fill($('#pgTpl').value);
    try { await navigator.clipboard.writeText(out); toast('Đã chép prompt ✓'); }
    catch { const t = $('#pgOut'); t.hidden = false; t.value = out; t.select(); document.execCommand?.('copy'); toast('Đã chọn sẵn prompt: nhấn Ctrl+C để chép'); }
  });
  $('#pgShow')?.addEventListener('click', () => { read(); const t = $('#pgOut'); t.hidden = !t.hidden; if (!t.hidden) t.value = fill($('#pgTpl').value); });
}
export { TYPES, KIND_INFO };
