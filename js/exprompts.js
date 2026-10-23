// Tạo “prompt” để dán vào ChatGPT / Claude: AI đọc tài liệu rồi trả về nhiều câu hỏi đúng cú pháp của phần mềm.
// Dùng cho “Bài tập của tôi” (từng video / tài liệu) và “Tin tức”.
import { $, $$, esc, toast, LANGS } from './util.js';

export const KIND_ORDER = ['TN', 'DS', 'S', 'G', 'Đ', 'K', 'N', 'NG', 'T'];
export const KIND_INFO = {
  TN: { name: 'Trắc nghiệm (4 đáp án)', syntax: 'TN: câu hỏi | *đáp án đúng | đáp án sai | đáp án sai | đáp án sai', rule: 'đúng 4 đáp án, chỉ MỘT đáp án có dấu * ở đầu; đáp án sai phải hợp lý, dễ nhầm; đổi vị trí đáp án đúng ngẫu nhiên' },
  DS: { name: 'Đúng / Sai', syntax: 'DS: nhận định | đúng (hoặc sai)', rule: 'sau dấu | chỉ ghi “đúng” hoặc “sai”; khoảng một nửa số câu là “sai”' },
  S: { name: 'Sắp xếp câu', syntax: 'S: từ / từ / từ / từ | gợi ý bằng tiếng Việt', rule: 'cắt một câu hoàn chỉnh thành các từ/cụm từ cách nhau bằng dấu /, viết đúng thứ tự (phần mềm tự xáo trộn); phần gợi ý là nghĩa tiếng Việt của câu; có thể thêm từ gây nhiễu bằng cách đặt dấu + trước từ, ví dụ +的' },
  G: { name: 'Tự luận ngắn (gõ đáp án)', syntax: 'G: câu hỏi hoặc từ tiếng Việt | đáp án / đáp án chấp nhận khác', rule: 'đáp án ngắn (một từ hoặc một câu ngắn); các cách viết đúng khác nhau cách nhau bằng dấu /' },
  'Đ': { name: 'Điền từ (gõ vào chỗ trống)', syntax: 'Đ: câu có [đáp án] nằm trong ngoặc vuông | nghĩa tiếng Việt làm gợi ý', rule: 'đáp án để trong [ ], có thể nhiều chỗ trống; nhiều đáp án chấp nhận cách nhau bằng /' },
  K: { name: 'Đoạn văn khuyết, kéo thả từ vào chỗ trống', syntax: 'K: đoạn văn có [từ đúng] nằm trong ngoặc vuông | từ gây nhiễu / từ gây nhiễu | gợi ý', rule: 'dùng đoạn văn 2–4 câu, khuyết 3–6 chỗ; từ đúng để trong [ ]; phần sau dấu | thứ nhất là các từ gây nhiễu (cách nhau bằng /); phần thứ hai là gợi ý (không bắt buộc)' },
  N: { name: 'Nghe và chọn đáp án đúng', syntax: 'N: từ hoặc câu để máy đọc | *đáp án đúng | đáp án sai | đáp án sai | đáp án sai', rule: 'phần đầu là từ/câu tiếng đang học (máy sẽ đọc thành tiếng, người học không nhìn thấy chữ); các đáp án là nghĩa tiếng Việt, đúng một đáp án có dấu *' },
  NG: { name: 'Nghe và gõ đáp án', syntax: 'NG: từ hoặc câu để máy đọc | đáp án / đáp án khác', rule: 'người học nghe rồi gõ lại; nếu bỏ phần sau dấu | thì đáp án chính là câu được đọc (chép chính tả)' },
  T: { name: 'Từ vựng', syntax: 'T: từ | phiên âm | nghĩa tiếng Việt', rule: 'phần mềm tự sinh câu hỏi từ→nghĩa, nghĩa→từ, nghe→nghĩa; có thể bỏ phiên âm: T: từ | nghĩa; chỉ lấy những từ quan trọng, không trùng lặp' },
};

// Ví dụ cho từng ngôn ngữ (dùng làm mẫu trong prompt)
export const EX = {
  zh: {
    TN: 'TN: “Cảm ơn” nói thế nào? | *谢谢 | 你好 | 再见 | 对不起',
    DS: 'DS: 再见 nghĩa là “Xin chào” | sai ~ 再见 (zàijiàn) là tạm biệt',
    S: 'S: 我 / 喜欢 / 学 / 中文 | Tôi thích học tiếng Trung',
    G: 'G: Xin chào | 你好 / nǐ hǎo',
    'Đ': 'Đ: 我[每天]去学校 | Tôi đi học mỗi ngày',
    K: 'K: 我每天[早上]喝[咖啡]，不喝茶。 | 晚上 / 牛奶 | Tôi uống cà phê mỗi sáng',
    N: 'N: 谢谢 | *Cảm ơn | Xin chào | Tạm biệt | Xin lỗi',
    NG: 'NG: 你好吗？ | 你好吗',
    T: 'T: 你好 | nǐ hǎo | Xin chào',
  },
  en: {
    TN: 'TN: What do you eat in the morning? | *breakfast | library | weather | neighbour',
    DS: 'DS: A library is a place to buy food | sai ~ Library là thư viện',
    S: 'S: I / like / to / read / books | Tôi thích đọc sách',
    G: 'G: bữa sáng | breakfast',
    'Đ': 'Đ: She [goes/went] to the [library] | Cô ấy đến thư viện',
    K: 'K: Every [morning] I drink [coffee] before [work]. | evening / tea / school | Mỗi sáng tôi uống cà phê trước giờ làm',
    N: 'N: breakfast | *Bữa sáng | Thư viện | Thời tiết | Hàng xóm',
    NG: 'NG: How are you today?',
    T: 'T: breakfast | bữa sáng',
  },
  ko: {
    TN: 'TN: “Cảm ơn” nói thế nào? | *감사합니다 | 안녕하세요 | 죄송합니다 | 안녕히 가세요',
    DS: 'DS: 안녕하세요 nghĩa là “Tạm biệt” | sai',
    S: 'S: 저는 / 학생 / 입니다 | Tôi là học sinh',
    G: 'G: Xin lỗi | 죄송합니다',
    'Đ': 'Đ: 저는 [학생]입니다 | Tôi là học sinh',
    K: 'K: 저는 [매일] [학교]에 갑니다. | 집 / 가끔 | Tôi đi học mỗi ngày',
    N: 'N: 감사합니다 | *Cảm ơn | Xin chào | Xin lỗi | Tạm biệt',
    NG: 'NG: 안녕하세요',
    T: 'T: 안녕하세요 | annyeonghaseyo | Xin chào',
  },
  ja: {
    TN: 'TN: “Cảm ơn” nói thế nào? | *ありがとう | こんにちは | すみません | さようなら',
    DS: 'DS: こんにちは nghĩa là “Tạm biệt” | sai',
    S: 'S: 私は / 学生 / です | Tôi là học sinh',
    G: 'G: Xin lỗi | すみません',
    'Đ': 'Đ: 私は[学生]です | Tôi là học sinh',
    K: 'K: 私は[毎日]、[学校]に行きます。 | 家 / 時々 | Tôi đi học mỗi ngày',
    N: 'N: ありがとう | *Cảm ơn | Xin chào | Xin lỗi | Tạm biệt',
    NG: 'NG: こんにちは',
    T: 'T: こんにちは | konnichiwa | Xin chào',
  },
};

const nameOf = lang => (LANGS.find(l => l.id === lang) || { name: 'Tiếng Trung' }).name;
const lname = lang => nameOf(lang).replace(/^Tiếng /, 'tiếng ');

function kindBlock(kinds, lang) {
  const ex = EX[lang] || EX.zh;
  return kinds.map((k, n) => `${n + 1}) ${KIND_INFO[k].name}\n   Cú pháp: ${KIND_INFO[k].syntax}\n   Quy tắc: ${KIND_INFO[k].rule}.\n   Ví dụ: ${ex[k]}`).join('\n');
}
const common = lang => [
  '- Mỗi dòng là MỘT câu hỏi, bắt đầu bằng ký hiệu loại rồi dấu hai chấm; các phần trong dòng cách nhau bằng dấu | .',
  '- Nếu trong chữ cần viết dấu | thì viết \\| ; muốn xuống dòng trong một câu thì viết \\n .',
  '- Lời giải thích (không bắt buộc, nên có ở câu khó) đặt ở cuối dòng sau dấu ~ , ví dụ: ~ vì … .',
  '- Chỉ dùng nội dung có trong NGUỒN, không bịa thêm. Câu hỏi, gợi ý, nghĩa và lời giải thích viết bằng tiếng Việt; nội dung đang học giữ nguyên ' + lname(lang) + '.',
  lang === 'zh' ? '- Chữ Hán dùng GIẢN THỂ.' : '',
].filter(Boolean).join('\n');

// Prompt tạo bài tập. opts: { lang, kinds, count, title, source }
export function setPrompt({ lang, kinds, count = 5, title = '', source = '' }) {
  const ks = KIND_ORDER.filter(k => kinds.includes(k));
  return `Bạn là giáo viên ${lname(lang)}. Hãy đọc phần NGUỒN ở cuối rồi tạo bài tập${title ? ` cho bài “${title}”` : ''} theo ĐÚNG cú pháp dưới đây để tôi dán vào phần mềm học.

QUY TẮC ĐỊNH DẠNG (rất quan trọng):
- Chỉ trả về các dòng bài tập, đặt trong MỘT khối code, không giải thích thêm, không đánh số thứ tự.
- Dòng đầu tiên là tiêu đề bộ bài tập: # ${title || 'Tên bài'}
${common(lang)}

CÁC DẠNG CẦN TẠO (mỗi dạng khoảng ${count} câu; nguồn ngắn thì tạo ít hơn, đừng lặp ý):
${kindBlock(ks, lang)}

NGUỒN:
${source || '(dán nội dung bài học / phụ đề / đoạn văn vào đây)'}`;
}

// Prompt tạo bài đọc + câu hỏi cho Tin tức. opts: { lang, kinds, count, topic, level, articles, source }
export function newsPrompt({ lang, kinds, count = 4, topic = '', level = '', articles = 1, source = '' }) {
  const ks = KIND_ORDER.filter(k => kinds.includes(k) && k !== 'T');
  const ex = EX[lang] || EX.zh;
  const intro = source
    ? `Hãy đọc phần NGUỒN ở cuối, chia thành ${articles > 1 ? articles + ' bài đọc ngắn' : 'một bài đọc'} (mỗi bài khoảng 150–400 từ/chữ, có thể cắt gọn và viết lại cho dễ đọc) rồi tạo câu hỏi cho từng bài.`
    : `Hãy viết ${articles} bài đọc ngắn bằng ${lname(lang)} (mỗi bài khoảng 150–400 từ/chữ${topic ? `, chủ đề: ${topic}` : ', chủ đề đa dạng: văn hóa, đời sống, khoa học, du lịch…'}${level ? `, trình độ: ${level}` : ''}) rồi tạo câu hỏi cho từng bài.`;
  return `Bạn là biên tập viên và giáo viên ${lname(lang)}. ${intro}

ĐỊNH DẠNG ĐẦU RA (rất quan trọng): chỉ trả về nội dung trong MỘT khối code, không giải thích thêm. Mỗi bài có dạng:

=== Tiêu đề bài đọc
@chủ đề: Văn hóa
@biểu tượng: 🏮
@nguồn: (tên nguồn, không bắt buộc)
Đoạn văn thứ nhất của bài đọc.

Đoạn văn thứ hai (các đoạn cách nhau bằng một dòng trống).
--- hỏi
TN: câu hỏi về nội dung bài | *đáp án đúng | đáp án sai | đáp án sai | đáp án sai ~ lời giải thích
DS: nhận định về bài | đúng
(thêm các câu hỏi khác, mỗi dòng một câu)

Các bài nối tiếp nhau, mỗi bài bắt đầu bằng một dòng “=== Tiêu đề”.

QUY TẮC:
${common(lang)}
- Dòng @chủ đề và @biểu tượng (một emoji hợp nội dung) nên có; @nguồn có thể bỏ.
- Câu hỏi phải kiểm tra việc HIỂU bài đọc (ý chính, chi tiết, từ vựng trong ngữ cảnh), không hỏi kiến thức ngoài bài.

CÁC DẠNG CÂU HỎI (mỗi bài khoảng ${count} câu, ưu tiên trắc nghiệm và đúng/sai):
${kindBlock(ks, lang)}
${source ? `\nNGUỒN:\n${source}` : ''}`;
}

// Ghi chú ngắn về cú pháp bài đọc (hiện trong màn nhập của Tin tức)
export const NEWS_SYNTAX = `=== Tiêu đề bài đọc
@chủ đề: Văn hóa
@biểu tượng: 🏮
@nguồn: Tên nguồn (không bắt buộc)
Đoạn văn thứ nhất.

Đoạn văn thứ hai.
--- hỏi
TN: Câu hỏi? | *đáp án đúng | sai | sai | sai ~ giải thích
DS: Nhận định | đúng`;

// Prompt tạo nhiều bài đăng ngắn kiểu mạng xã hội (mục Social của Thế giới, không có câu hỏi).
// opts: { lang, fields (tên các lĩnh vực, cách nhau dấu phẩy), posts (số bài mỗi lĩnh vực), level, source }
export function socialPrompt({ lang, fields = '', posts = 3, level = '', source = '' }) {
  const list = fields ? fields.split(/\s*[,;，、]\s*/).filter(Boolean) : [];
  const intro = source
    ? `Hãy đọc phần NGUỒN ở cuối rồi viết lại thành các bài đăng ngắn bằng ${lname(lang)} như trên mạng xã hội, chia theo lĩnh vực.`
    : `Hãy viết các bài đăng ngắn bằng ${lname(lang)} như trên mạng xã hội (TikTok, Facebook, Instagram), chia theo lĩnh vực${list.length ? `: ${list.join(', ')}` : ' (tự chọn 3–5 lĩnh vực đa dạng: đời sống, công nghệ, du lịch, ẩm thực, thể thao…)'}. Mỗi lĩnh vực ${posts} bài.`;
  return `Bạn là người viết nội dung mạng xã hội bằng ${lname(lang)}. ${intro}
Mỗi bài dài khoảng 2–6 câu, giọng tự nhiên, gần gũi${level ? `, độ khó từ vựng phù hợp trình độ ${level}` : ''}, có thể kèm emoji và hashtag.

ĐỊNH DẠNG ĐẦU RA (rất quan trọng): chỉ trả về nội dung trong MỘT khối code, không giải thích thêm.

# Tên lĩnh vực
@tên: Tên người đăng (bịa cho tự nhiên)
@biểu tượng: 🐼
@tag: #hashtag1 #hashtag2
Nội dung bài đăng thứ nhất (có thể nhiều dòng).
---
@tên: Một người khác
Nội dung bài đăng thứ hai.

# Tên lĩnh vực khác
Nội dung bài đăng…

QUY TẮC:
- Dòng bắt đầu bằng “# ” (có dấu cách) là tên một lĩnh vực mới; các bài trong cùng lĩnh vực cách nhau bằng một dòng chỉ có ba dấu gạch ngang ---.
- Các dòng @tên, @biểu tượng (một emoji), @tag đều không bắt buộc và phải nằm ngay đầu bài, trước nội dung.
- KHÔNG tạo câu hỏi, KHÔNG dịch sang tiếng Việt; chỉ viết nội dung bằng ${lname(lang)}.
${lang === 'zh' ? '- Chữ Hán dùng GIẢN THỂ.\n' : ''}${source ? `\nNGUỒN:\n${source}` : ''}`;
}

export const SOCIAL_SYNTAX = `# Công nghệ
@tên: Minh Anh
@biểu tượng: 🤖
@tag: #AI #học_tập
Nội dung bài đăng thứ nhất.
---
@tên: Bảo
Nội dung bài đăng thứ hai.

# Du lịch
Nội dung bài đăng thứ ba.`;

// Vẽ bảng chọn dạng bài + khung prompt vào host.
// ctx: { state:{kinds,count}, kinds?:[các dạng được chọn], fields?:[{id,label,type,placeholder,value,min,max}], source?():Promise<string>,
//        build({kinds,count,f,source}):string, onPaste(text), pasteLabel? }
export function promptPanel(host, ctx) {
  const allow = ctx.kinds || KIND_ORDER, st = ctx.state;
  host.innerHTML = `<div class="pkinds">${KIND_ORDER.filter(k => allow.includes(k)).map(k => `<label class="pk"><input type="checkbox" data-k="${k}" ${st.kinds.includes(k) ? 'checked' : ''}> <b>${k}</b> ${KIND_INFO[k].name}</label>`).join('')}</div>
    <div class="row">${(ctx.fields || []).map(f => `<label class="dim">${f.label} <input id="pkf_${f.id}" type="${f.type || 'text'}" value="${esc(f.value ?? '')}" placeholder="${esc(f.placeholder || '')}" ${f.min != null ? `min="${f.min}" max="${f.max}" style="width:72px"` : ''}></label>`).join('')}
      <label class="dim">Số câu mỗi dạng <input type="number" id="pkN" min="1" max="30" value="${st.count}" style="width:64px"></label></div>
    <div class="row"><button class="btn primary" id="pkCopy">📋 Chép prompt</button><button class="btn" id="pkPaste">📥 Dán kết quả của AI</button></div>
    <textarea id="pkOut" class="mono" rows="9" readonly spellcheck="false"></textarea>
    <div class="dim">Cách dùng: bấm “Chép prompt” → dán vào ChatGPT hoặc Claude (nếu prompt chưa có nội dung thì dán thêm văn bản / phụ đề vào cuối) → chép toàn bộ kết quả AI trả về → quay lại bấm “Dán kết quả của AI”.</div>`;
  const out = $('#pkOut', host);
  let src = '';
  const refresh = () => {
    st.kinds = $$('[data-k]', host).filter(c => c.checked).map(c => c.dataset.k);
    st.count = Math.max(1, Math.min(30, +$('#pkN', host).value || 5));
    const f = {}; (ctx.fields || []).forEach(x => { f[x.id] = $('#pkf_' + x.id, host).value.trim(); });
    out.value = st.kinds.length ? ctx.build({ kinds: st.kinds, count: st.count, f, source: src }) : 'Hãy chọn ít nhất một dạng bài.';
  };
  host.addEventListener('input', refresh);
  host.addEventListener('change', refresh);
  const reload = async () => { src = ctx.source ? await ctx.source() : ''; refresh(); };
  refresh(); reload();
  $('#pkCopy', host).onclick = async () => {
    refresh();
    try { await navigator.clipboard.writeText(out.value); toast('Đã chép prompt ✓'); }
    catch { out.select(); document.execCommand?.('copy'); toast('Đã chọn sẵn prompt: nhấn Ctrl+C để chép'); }
  };
  $('#pkPaste', host).onclick = async () => {
    let t = '';
    try { t = (await navigator.clipboard.readText()).trim(); } catch { /* bị chặn */ }
    if (!t) { toast('Chưa đọc được bộ nhớ tạm: hãy dán (Ctrl+V) kết quả vào ô nội dung'); return; }
    ctx.onPaste(t.replace(/^```\w*\n?|\n?```$/g, '').trim());
  };
  return { reload };
}