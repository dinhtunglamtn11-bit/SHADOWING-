// Lộ trình “Phát âm” tiếng Nhật, bám theo giáo trình “Nền tảng đọc và phát âm tiếng Nhật” (15 phần + phụ lục).
// Mỗi bài: tip (**in đậm**, xuống dòng), tables (mỗi bảng: dòng đầu là tiêu đề, ô ngăn bằng ^, dòng ngăn bằng xuống dòng;
// ô bắt đầu bằng ~ là sơ đồ cao độ: ~さ:L く:H), g = các nhóm từ (mỗi dòng một nhóm; mỗi từ: chữ viết | [cách đọc nếu khác] | nghĩa, ngăn bằng ;).
// pair: true = từ trong cùng một dòng đọc khác nhau, dùng để nghe – phân biệt. rule: true = bài có luyện “Cách đọc”.
// ans: true = cột giữa là đáp án riêng của bài (Latinh, âm của ん…), không phải cách đọc.
import { parse } from './jalab-data.js';

export const STAGES = [
  { id: 'wri', t: '🔤 1. Chữ viết và mora', d: 'Ba loại chữ, nguồn gốc kana, khác tiếng Việt ở đâu, đếm nhịp (Phần 1–2).' },
  { id: 'vow', t: '👄 2. Năm nguyên âm', d: 'a – i – u – e – o và nguyên âm đứng liền nhau (Phần 3).' },
  { id: 'hir', t: '🇯🇵 3. Bảng hiragana cơ bản', d: '46 chữ, cách đọc từng hàng, chữ dễ nhầm (Phần 4).' },
  { id: 'dak', t: '🧱 4. Âm đục và âm ghép', d: 'Dấu ゛ ゜ và chữ nhỏ ゃ ゅ ょ (Phần 5–6).' },
  { id: 'len', t: '⏱ 5. Trường âm, っ và ん', d: 'Ba điểm người Việt hay sai nhất (Phần 7–8).' },
  { id: 'kat', t: '🔠 6. Katakana', d: 'Bảng chữ, âm mở rộng, chữ dễ nhầm, quy luật từ mượn (Phần 9).' },
  { id: 'tone', t: '🎵 7. Cao độ, ngữ điệu, biến âm', d: 'Trọng âm cao độ, vô thanh hóa, trợ từ, đục hóa, đếm số (Phần 10–11).' },
  { id: 'rom', t: '⌨ 8. Romaji, gõ máy, lỗi hay gặp', d: 'Hepburn và Kunrei, cách gõ, lợi thế Hán-Việt, 12 lỗi điển hình (Phần 12–13).' },
  { id: 'ex', t: '✍️ 9. Bài tập có đáp án', d: 'Bảy bài tập của Phần 14, chấm theo đáp án Phần 15.' },
  { id: 'app', t: '📎 10. Phụ lục', d: 'Thứ tự từ điển, viết kana, tóm tắt, tài nguyên, lộ trình 4 tuần.' },
];

export const UNITS = [];
const add = (id, st, t, tip, o = {}) => UNITS.push({ id, st, t, tip, tables: o.tables || [], pair: !!o.pair, rule: !!o.rule, ans: !!o.ans, kinds: o.kinds || null,
  groups: o.g ? o.g.trim().split('\n').map(parse) : [] });

// ===== 1. Chữ viết và mora =====
add('w-intro', 'wri', 'Cách dùng và ba loại chữ',
  '**Đừng học tiếng Nhật qua Romaji.** Đọc thẳng hiragana từ ngày đầu; 46 chữ cơ bản có thể thuộc trong 1 tuần. Romaji chỉ để tra cứu và gõ máy.\nTiếng Nhật có hệ âm khá đơn giản (5 nguyên âm, hầu hết là “phụ âm + nguyên âm”), nhưng đọc trường âm thành âm ngắn, bỏ っ hay đọc sai nhịp sẽ **làm đổi nghĩa của từ**.\nMột câu thường dùng cả ba loại chữ: 私はベトナムから来ました。(Tôi đến từ Việt Nam): 私 (Kanji) · は (trợ từ) · ベトナム (Katakana) · から · 来 (Kanji) · ました (đuôi động từ).\n**Quy ước:** [ ] là cách đọc thực tế; H = cao, L = thấp.',
  { tables: [`Loại chữ^Số lượng^Chức năng chính^Ví dụ
Hiragana (ひらがな)^46 chữ cơ bản^Từ thuần Nhật, trợ từ, đuôi từ, furigana^わたし、です、を、たべます
Katakana (カタカナ)^46 chữ cơ bản^Từ mượn, tên nước ngoài, tượng thanh, nhấn mạnh^コーヒー、ベトナム、ハノイ
Kanji (漢字)^2.136 chữ thường dùng^Gốc từ: danh từ, thân động từ, tính từ^私、日本、学生、食
Romaji (ローマ字)^26 chữ Latinh^Biển hiệu, tên viết tắt, gõ máy^JR、Tokyo、NHK`], g: 'ひらがな|chữ hiragana;カタカナ|chữ katakana;かんじ|chữ Hán;にほんご|tiếng Nhật;わたし|tôi;ベトナム|Việt Nam;たべます|ăn (lịch sự)' });

add('w-origin', 'wri', 'Nguồn gốc của kana',
  'Cả hai bảng kana đều giản lược từ chữ Hán, khoảng thế kỷ 9.\n**Hiragana** viết thảo từ cả một chữ Hán nên nét mềm, cong. **Katakana** lấy một phần của chữ Hán nên nét thẳng, góc cạnh.\nあ và ア đều đọc là “a”: học hiragana trước, khi vững rồi thì katakana chỉ là “đổi hình chữ” cho cùng một hệ âm.',
  { tables: [`Hiragana^Từ chữ Hán^Katakana^Từ chữ Hán
あ^安^ア^阿
い^以^イ^伊
う^宇^ウ^宇
え^衣^エ^江
お^於^オ^於`], g: 'あ;い;う;え;お' });

add('w-vi', 'wri', 'Tiếng Nhật khác tiếng Việt ở đâu',
  'Nắm sáu điểm này trước để biết mình cần để ý chỗ nào. おばさん (cô) khác おばあさん (bà) chỉ ở độ dài nguyên âm.',
  { tables: [`Đặc điểm^Tiếng Việt^Tiếng Nhật
Thanh điệu^6 thanh trên từng âm tiết^Không có thanh, có trọng âm cao – thấp trên cả từ
Đơn vị nhịp^Âm tiết^Mora (拍): mỗi mora dài bằng nhau
Cấu trúc âm^Phụ âm đầu + vần phức tạp + phụ âm cuối^Phụ âm + nguyên âm; chỉ ん và っ đứng sau nguyên âm
Nguyên âm^11 đơn + nhiều đôi^5: a, i, u, e, o
Độ dài nguyên âm^Không phân biệt nghĩa^Phân biệt nghĩa
Hữu thanh / vô thanh^Có (b–p, đ–t)^Có (g–k, d–t, z–s, b–h/p)`], pair: true, g: 'おばさん|cô, dì;おばあさん|bà' });

add('w-mora', 'wri', 'Mora: đơn vị nhịp (quan trọng nhất)',
  '**Người Việt đếm theo âm tiết, người Nhật đếm theo mora (拍).** Mỗi mora dài bằng nhau như nốt nhạc đều nhịp.\nとうきょう không đọc 2 nhịp “Tô-kyô” mà đọc 4 nhịp đều: to-o-kyo-o. Hãy **vỗ tay theo mora**: にほん = 3 tiếng vỗ, とうきょう = 4 tiếng vỗ.\nNắm chắc mora là tự nhiên đọc đúng trường âm, っ và ん.',
  { tables: [`Thành phần^Ví dụ^Số mora
Một chữ kana thường^か、し、ア^1
Âm ghép (chữ to + ゃゅょ nhỏ)^きゃ、しゅ、チョ^1 (chữ nhỏ không tính riêng)
Trường âm^おかあさん: phần あ; コーヒー: dấu ー^1
Âm ngắt っ / ッ^きって: chữ っ^1
Âm mũi ん / ン^にほん: chữ ん^1`, `Từ^Tách mora^Người Việt cảm thấy^Số mora
にほん (Nhật Bản)^に · ほ · ん^2 (ni-hon)^3
とうきょう (Tokyo)^と · う · きょ · う^2 (tô-kyô)^4
がっこう (trường học)^が · っ · こ · う^2 (gát-kô)^4
しんぶん (báo)^し · ん · ぶ · ん^2 (shin-bun)^4
コーヒー (cà phê)^コ · ー · ヒ · ー^2 (kô-hi)^4`], kinds: ['mora', 'type', 'speak'], g: 'にほん|Nhật Bản;とうきょう|とおきょお|Tokyo;がっこう|がっこお|trường học;しんぶん|tờ báo;コーヒー|cà phê;か|âm tiết;きゃく|khách' });

// ===== 2. Nguyên âm =====
add('v-five', 'vow', 'Năm nguyên âm a – i – u – e – o',
  'Đọc **ngắn, gọn**, không lướt và không đổi khẩu hình giữa chừng. Thứ tự chuẩn: あいうえお.\n**う là âm người Việt hay sai nhất:** đừng tròn môi như “u”. Thả lỏng môi, nghe gần “ư” hơn: すし không phải “xu-shi” mà gần “xư-shi”.\n**え không phải “i”** (lỗi do đọc Romaji kiểu tiếng Anh): sake đọc “xa-kê”, không phải “xây-ki”.',
  { tables: [`Chữ^IPA^Gần âm Việt^Khẩu hình
あ / ア^[a]^a^Miệng mở vừa, thả lỏng
い / イ^[i]^i^Môi kéo ngang nhẹ
う / ウ^[ɯ]^giữa ư và u^Môi gần như không tròn, hơi khép
え / エ^[e̞]^giữa ê và e^Miệng mở vừa, môi kéo ngang nhẹ
お / オ^[o̞]^giữa ô và o^Môi tròn nhẹ, không chu nhiều`], g: 'あさ|buổi sáng;あめ|mưa, kẹo\nいえ|nhà;いぬ|con chó\nうみ|biển;うえ|phía trên;すし|sushi\nえき|nhà ga;え|bức tranh;さけ|rượu sake\nおと|âm thanh;あお|màu xanh' });

add('v-seq', 'vow', 'Nguyên âm đứng liền nhau',
  'Hai nguyên âm khác nhau đứng cạnh nhau: **mỗi nguyên âm vẫn là một mora riêng**, đọc rõ từng âm, không gộp thành nguyên âm đôi như tiếng Việt.\nあい = a·i (2 mora), không phải “ai” một nhịp. あおい = a·o·i (3 mora).',
  { kinds: ['mora', 'listen', 'type', 'speak'], g: 'あい|tình yêu;あおい|màu xanh lam;いえ|nhà;うえ|phía trên;あう|gặp;かお|khuôn mặt;こえ|giọng nói' });

// ===== 3. Hiragana =====
add('h-table', 'hir', 'Bảng 46 chữ (清音) và thứ tự 五十音',
  'Bảng xếp theo “năm mươi âm” (五十音図): hàng ngang theo phụ âm, cột dọc theo 5 nguyên âm. Đọc to theo hàng ngang (あいうえお, かきくけこ…); đây cũng là thứ tự từ điển.\n**Năm chữ không theo quy luật:** し (shi), ち (chi), つ (tsu), ふ (fu), を (đọc “o”, chỉ làm trợ từ).\nXem và bấm nghe từng chữ trong mục **🔤 Bảng chữ**.',
  { tables: [`Hàng^a^i^u^e^o
–^あ^い^う^え^お
k^か^き^く^け^こ
s^さ^し^す^せ^そ
t^た^ち^つ^て^と
n^な^に^ぬ^ね^の
h^は^ひ^ふ^へ^ほ
m^ま^み^む^め^も
y^や^^ゆ^^よ
r^ら^り^る^れ^ろ
w^わ^^^^を
n^ん^^^^`], g: 'あいうえお;かきくけこ;さしすせそ;たちつてと\nし;ち;つ;ふ' });

add('h-rows', 'hir', 'Cách phát âm từng hàng',
  'Chú ý nhất: **つ** (tiếng Việt không có), **ふ** (thổi qua hai môi, không chạm răng), **ら行** (búng đầu lưỡi một lần, không rung).',
  { tables: [`Hàng^Cách đọc và gần âm Việt
か (k)^“c/k”. Đầu từ có thể hơi bật hơi nhẹ. Không đọc thành “kh”.
さ (s)^“x”. し [ɕi]: mặt lưỡi áp rộng lên vòm, gần “shi”.
た (t)^た て と: “t” (không phải “th”). ち ≈ “chi”. つ: đặt lưỡi như “t” rồi xì hơi như “x”.
な (n)^“n”. に gần “nhi” nhẹ.
は (h)^“h”. ひ: “h” xát mạnh. ふ: thổi nhẹ qua hai môi như thổi nến.
ま (m)^“m”.
や (y)^“i” lướt sang nguyên âm. Gần “da” giọng miền Nam.
ら (r)^Âm vỗ [ɾ]: búng đầu lưỡi một lần vào lợi trên.
わ (w)^わ ≈ “oa” môi tròn rất nhẹ. を đọc “o”.
ん^Âm mũi, tự đứng thành 1 mora (xem bài ん).`], g: 'かさ|cái ô;こえ|giọng nói\nさかな|con cá;すし|sushi\nちず|bản đồ;つくえ|cái bàn\nなつ|mùa hè;ねこ|con mèo\nはな|hoa, mũi;ふね|con thuyền\nまど|cửa sổ;もも|quả đào\nやま|núi;ゆき|tuyết\nさくら|hoa anh đào;りんご|quả táo\nわたし|tôi;みずを|nước (kèm trợ từ)\nほん|quyển sách;みかん|quả quýt' });

add('h-confuse', 'hir', 'Các chữ hiragana dễ nhầm',
  'Nhìn kỹ nét cuối. Trong **🔤 Bảng chữ → Thẻ học / Chọn âm**, chọn nhóm “Chữ dễ nhầm” để luyện riêng.',
  { tables: [`Nhóm chữ^Cách phân biệt
あ (a) – お (o)^お có nét chấm nhỏ trên bên phải, nét ngang chỉ chạm bên trái
ぬ (nu) – め (me)^ぬ có vòng xoắn nhỏ ở cuối nét; め không
ね (ne) – れ (re) – わ (wa)^ね xoắn vòng, れ hất lên, わ cong tròn vào trong
る (ru) – ろ (ro)^る có vòng xoắn ở cuối; ろ không
は (ha) – ほ (ho)^ほ thêm một nét ngang trên bên phải
さ (sa) – ち (chi)^Đối xứng: さ cong mở sang trái, ち mở sang phải
い (i) – こ (ko) – り (ri)^い hai nét dọc; こ hai nét ngang; り nét phải dài hơn
き (ki) – さ (sa)^き hai nét ngang; さ một nét ngang`], kinds: ['type', 'listen', 'speak'], pair: true, g: 'あ;お\nぬ;め\nね;れ;わ\nる;ろ\nは;ほ\nさ;ち\nい;こ;り\nき;さ' });

// ===== 4. Âm đục và âm ghép =====
add('d-daku', 'dak', 'Âm đục và bán đục (濁音・半濁音)',
  'Thêm **゛** (dakuten) biến phụ âm vô thanh thành hữu thanh. Thêm **゜** (handakuten) vào hàng は thành âm “p”.\nじ = ぢ (ji) và ず = づ (zu) đọc giống hệt nhau; hầu hết từ dùng じ, ず. ぢ, づ chỉ có trong vài từ: はなぢ, つづく, ちぢむ (gõ: di, du).\n**Lợi thế người Việt:** tiếng Việt cũng phân biệt hữu thanh / vô thanh nên nghe k/g, t/d, s/z dễ hơn người Hàn, người Trung.',
  { tables: [`Biến đổi^Quy luật^Ví dụ
か → が^k → g^かき (quả hồng) → かぎ (chìa khóa)
さ → ざ^s → z^さる (con khỉ) → ざる (rổ)
た → だ^t → d^てんき (thời tiết) → でんき (điện)
は → ば^h → b^はか (ngôi mộ) → ばか (ngốc)
は → ぱ^h → p^はん → パン (bánh mì)`], pair: true, g: 'かき|quả hồng;かぎ|chìa khóa\nさる|con khỉ;ざる|cái rổ\nてんき|thời tiết;でんき|điện, đèn\nはか|ngôi mộ;ばか|ngốc\nはん|con dấu;パン|bánh mì\nはなぢ|chảy máu cam;つづく|tiếp tục;ちぢむ|co lại' });

add('d-sound', 'dak', 'Cách đọc âm đục',
  '**が行:** “g”. Giọng chuẩn truyền thống đôi khi đọc が giữa từ thành mũi [ŋa] (鼻濁音); người trẻ ít dùng, bạn đọc “g” là đúng.\n**ざ行:** gần “d/gi” Hà Nội. **じ/ぢ** gần “gi” nhưng lưỡi áp rộng hơn. **ず/づ** gần “dư”.\n**だ行:** “đ” nhẹ hơn tiếng Việt. **ば行:** “b”. **ぱ行:** “p” như “pin”, đầu từ có chút hơi.',
  { g: 'がっこう|がっこお|trường học;かぎ|chìa khóa\nざっし|tạp chí;かぜ|gió, cảm cúm;ぞう|ぞお|con voi\nでんわ|điện thoại;まど|cửa sổ\nべんり|tiện lợi;ぶた|con lợn\nえんぴつ|bút chì;さんぽ|đi dạo' });

add('d-yoon', 'dak', 'Âm ghép (拗音): một mora',
  'Chữ cột i (き, し, ち, に…) + **ゃ ゅ ょ viết nhỏ**, đọc lướt thành **một mora**: きゃ = “kya” (1 nhịp), không phải “ki-ya”.\n**Chữ nhỏ khác chữ to hoàn toàn:** びょういん (4 mora, bệnh viện) ≠ びよういん (5 mora, thẩm mỹ viện); きょう (2, hôm nay) ≠ きよう (3, khéo tay).\nViết tay, chữ nhỏ bằng khoảng nửa chữ thường, nằm góc dưới bên trái ô.',
  { tables: [`Hàng^ゃ^ゅ^ょ
き^きゃ^きゅ^きょ
し^しゃ^しゅ^しょ
ち^ちゃ^ちゅ^ちょ
に^にゃ^にゅ^にょ
ひ^ひゃ^ひゅ^ひょ
み^みゃ^みゅ^みょ
り^りゃ^りゅ^りょ
ぎ^ぎゃ^ぎゅ^ぎょ
じ^じゃ^じゅ^じょ
び^びゃ^びゅ^びょ
ぴ^ぴゃ^ぴゅ^ぴょ`], pair: true, kinds: ['listen', 'mora', 'type', 'speak'], g: 'びょういん|bệnh viện;びよういん|thẩm mỹ viện\nきょう|hôm nay;きよう|khéo tay\nじゅう|số mười;じゆう|tự do\nりゃく|viết tắt;りやく|lợi ích' });

add('d-yoon-say', 'dak', 'Ghi chú phát âm âm ghép',
  '**しゃ しゅ しょ:** giống “sh” tiếng Anh. **ちゃ ちゅ ちょ:** gần “ch”. **じゃ じゅ じょ:** gần “gia / giu / giô” Hà Nội.\n**にゃ にゅ にょ:** gần “nh”, lợi thế của người Việt. **りゃ りゅ りょ:** khó nhất, luyện chậm り → りゃ.',
  { g: 'しゃしん|ảnh;じしょ|từ điển;しゅみ|sở thích\nおちゃ|trà;ちゅうい|chú ý;ちょっと|một chút\nじんじゃ|đền thờ;じょうず|じょおず|giỏi\nこんにゃく|khoai nưa;ぎゅうにゅう|sữa bò\nりゃく|viết tắt;りゅう|con rồng;りょこう|du lịch' });

// ===== 5. Trường âm, っ, ん =====
add('l-choon', 'len', 'Trường âm: cách viết và cách đọc',
  '**Trường âm = nguyên âm kéo dài gấp đôi, thêm 1 mora**, và phân biệt nghĩa.\n**えい đọc là “ê” kéo dài** (せんせい [せんせえ] = sen-se-e) và **おう đọc là “ô” kéo dài** (とうきょう = to-o-kyo-o, không phải “tô-u-kyô-u”).\nNgoại lệ: khi う là đuôi động từ (おもう, いう) hoặc い thuộc từ khác thì vẫn đọc rõ.',
  { tables: [`Âm thuộc cột^Thêm chữ^Đọc^Ví dụ
a (あ段)^あ^aa (ā)^おかあさん, おばあさん
i (い段)^い^ii (ī)^おにいさん, おいしい
u (う段)^う^uu (ū)^くうき, すうがく
e (え段)^い (phổ biến) hoặc え^ee (ē)^せんせい, えいが; おねえさん
o (お段)^う (phổ biến) hoặc お^oo (ō)^とうきょう, おとうさん; おおきい, とおい`], rule: true, g: 'おかあさん|mẹ;おにいさん|anh trai;おいしい|ngon;くうき|không khí;すうがく|toán học\nせんせい|せんせえ|giáo viên;えいが|ええが|phim;おねえさん|chị gái\nとうきょう|とおきょお|Tokyo;おとうさん|おとおさん|bố;おおきい|to lớn;とおい|xa' });

add('l-kata', 'len', 'Trường âm trong katakana: dấu ー',
  'Katakana dùng **ー** cho mọi trường âm: コーヒー (kōhī), ビール (bīru), ケーキ (kēki), スーパー (sūpā). Khi viết dọc, ー chuyển thành nét dọc.\nGõ máy: phím dấu trừ (-).',
  { kinds: ['listen', 'type', 'mora', 'speak'], g: 'コーヒー|cà phê;ビール|bia;ケーキ|bánh ngọt;スーパー|siêu thị;ノート|vở;メール|thư điện tử' });

add('l-pairs', 'len', 'Cặp tối thiểu: ngắn và dài',
  'Luyện bằng cách **vỗ tay**: おばさん = 4 tiếng vỗ, おばあさん = 5 tiếng vỗ. Trường âm phải chiếm trọn một tiếng vỗ, không được nuốt đi.',
  { pair: true, kinds: ['listen', 'mora', 'type', 'speak'], g: 'おばさん|cô, dì;おばあさん|bà\nおじさん|chú, bác;おじいさん|ông\nゆき|tuyết;ゆうき|dũng khí\nここ|ở đây;こうこう|trường cấp 3\nえ|bức tranh;ええ|vâng\nビル|tòa nhà;ビール|bia' });

add('l-sokuon', 'len', 'Âm ngắt っ / ッ',
  '**っ viết nhỏ không có âm riêng:** là một khoảng lặng dài 1 mora, miệng giữ ở vị trí phụ âm phía sau rồi mới bật. Romaji viết gấp đôi phụ âm (kitte).\n**Trước k, t, p:** khép lại, im 1 nhịp rồi bật: がっこう ≈ “gác-kô-ô”, きって ≈ “kít-tê”.\n**Trước s, sh:** kéo tiếng xì 1 nhịp: ざっし, けっせき.\nCuối câu cảm thán (あっ!): ngắt ở cổ họng. Từ mượn: っ đứng được trước âm đục: ベッド, バッグ.\n**Lợi thế người Việt:** phụ âm cuối c, t, p cũng đóng, không bật hơi: đọc “kít” + “tê”, bỏ thanh sắc, giữ nhịp đều.',
  { pair: true, kinds: ['listen', 'type', 'mora', 'speak'], g: 'きて|hãy đến;きって|con tem\nさか|con dốc;さっか|nhà văn\nおと|âm thanh;おっと|chồng\nいた|đã ở;いった|đã đi, đã nói\nざっし|tạp chí;けっせき|vắng mặt;いっぱい|đầy, một cốc\nベッド|giường;バッグ|túi xách' });

add('l-n', 'len', 'Âm mũi ん đổi theo âm phía sau',
  '**ん đứng một mình, trọn 1 mora**, và đổi cách đọc theo âm đứng sau. Người Nhật không để ý, nhưng biết quy luật giúp nói tự nhiên.\nLuyện kiểu **Âm của ん** để nhận ra quy luật.',
  { tables: [`Âm phía sau^ん đọc thành^Gần âm Việt^Ví dụ
m, b, p (ま ば ぱ)^[m] mím môi^“m” trong “am”^さんぽ, しんぶん, てんぷら
t, d, n, r, ts, ch^[n] lưỡi chạm lợi^“n” trong “an”^はんたい, おんな, べんり
k, g (か が)^[ŋ] gốc lưỡi chạm vòm mềm^“ng” trong “ang”^げんき, おんがく, ぎんこう
cuối từ; nguyên âm; s, h, y, w^âm mũi, lưỡi không chạm đâu^gần “ng” rất nhẹ^ほん, でんわ, きんえん`], kinds: ['nsound', 'listen', 'type', 'speak'], g: 'さんぽ|đi dạo;しんぶん|tờ báo;てんぷら|tempura\nはんたい|phản đối;おんな|phụ nữ;べんり|tiện lợi\nげんき|khỏe;おんがく|âm nhạc;ぎんこう|ぎんこお|ngân hàng\nほん|quyển sách;でんわ|điện thoại;きんえん|cấm hút thuốc' });

add('l-n-vow', 'len', 'Đừng nối ん với nguyên âm sau',
  'きんえん (kin·e·n, cấm hút thuốc, 4 mora) mà đọc “ki-nen” sẽ thành きねん (kỷ niệm, 3 mora). ん trước nguyên âm phải là **một nhịp mũi riêng**.\nTương tự: こな (bột) ≠ こんな; たに (thung lũng) ≠ たんに.\nRomaji viết dấu nháy để phân biệt: kin’en khác kinen.',
  { pair: true, kinds: ['listen', 'mora', 'type', 'speak'], g: 'きねん|kỷ niệm;きんえん|cấm hút thuốc\nこな|bột;こんな|như thế này\nたに|thung lũng;たんに|đơn giản là' });

// ===== 6. Katakana =====
add('k-table', 'kat', 'Bảng 46 chữ katakana',
  'Cùng hệ âm với hiragana, chỉ khác hình chữ. Mọi quy tắc âm đục, âm ghép, っ, ん áp dụng y hệt; riêng **trường âm dùng ー**.\nXem bảng đầy đủ (kèm âm đục, âm ghép) trong **🔤 Bảng chữ** với nút カタカナ.',
  { tables: [`Hàng^a^i^u^e^o
–^ア^イ^ウ^エ^オ
k^カ^キ^ク^ケ^コ
s^サ^シ^ス^セ^ソ
t^タ^チ^ツ^テ^ト
n^ナ^ニ^ヌ^ネ^ノ
h^ハ^ヒ^フ^ヘ^ホ
m^マ^ミ^ム^メ^モ
y^ヤ^^ユ^^ヨ
r^ラ^リ^ル^レ^ロ
w^ワ^^^^ヲ
n^ン^^^^`], kinds: ['type', 'speak'], g: 'アイス|kem;カメラ|máy ảnh;サラダ|xà lách trộn;トマト|cà chua;ナイフ|con dao;ホテル|khách sạn;マスク|khẩu trang;タイヤ|lốp xe;トイレ|nhà vệ sinh;ワイン|rượu vang' });

add('k-ext', 'kat', 'Katakana mở rộng cho âm nước ngoài',
  'Để ghi âm tiếng Nhật vốn không có, ghép katakana với nguyên âm viết nhỏ **ァ ィ ゥ ェ ォ**.',
  { tables: [`ファ fa^フィ fi^フェ fe^フォ fo
ティ ti^ディ di^トゥ tu^ドゥ du
ウィ wi^ウェ we^ウォ wo^ヴァ va
シェ she^ジェ je^チェ che^ツァ tsa`], g: 'ファイル|file;パーティー|bữa tiệc;ディズニー|Disney;ウェブ|web;チェック|kiểm tra;ヴァイオリン|vĩ cầm;バイオリン|vĩ cầm (cách viết khác)' });

add('k-confuse', 'kat', 'Các chữ katakana dễ nhầm nhất',
  'Đặc biệt **シ / ツ** và **ソ / ン**: nhìn hướng nét dài (hất lên hay viết xuống).',
  { tables: [`Cặp chữ^Cách phân biệt
シ (shi) – ツ (tsu)^シ: chấm xếp ngang bên trái, nét dài hất từ dưới lên. ツ: chấm xếp phía trên, nét dài viết xuống
ソ (so) – ン (n)^ソ: chấm ở trên, nét dài viết xuống. ン: chấm bên trái, nét dài hất lên
ク – ケ – タ^ケ có nét ngang kéo sang phải; タ có thêm chấm bên trong ク
ウ – ワ – フ^ウ có chấm và hai nét dọc; ワ một nét dọc bên trái; フ không có nét dọc
ス – ヌ^ヌ thêm một nét chéo cắt qua
チ – テ^チ có phẩy ở trên và nét dọc cong; テ hai nét ngang và nét dọc cong
コ – ユ – ロ^コ mở bên trái; ユ nét ngang dưới kéo dài; ロ khép kín`], kinds: ['type', 'listen', 'speak'], pair: true, g: 'シ;ツ\nソ;ン\nク;ケ;タ\nウ;ワ;フ\nス;ヌ\nチ;テ\nコ;ユ;ロ' });

add('k-loan', 'kat', 'Quy luật chuyển từ mượn',
  'Tiếng Nhật hầu như không có phụ âm đứng một mình nên chèn nguyên âm sau phụ âm.\nSau **t, d thêm o**: test → テスト, bed → ベッド.\nSau hầu hết phụ âm khác **thêm u**: Christmas → クリスマス, golf → ゴルフ.\nĐuôi **-er, -or, -ar** thành ー: computer → コンピューター.\n**l, r** đều thành hàng ラ; **v** thường thành hàng バ: love → ラブ, video → ビデオ.\nNhiều từ rút gọn: パソコン, コンビニ, スマホ.',
  { tables: [`Tiếng Việt^Katakana^Romaji
Việt Nam^ベトナム^Betonamu
Hà Nội^ハノイ^Hanoi
Thành phố Hồ Chí Minh^ホーチミン^Hōchimin
phở^フォー^fō
bánh mì^バインミー^bainmī`], g: 'テスト|test;ベッド|giường;クリスマス|Giáng sinh;ゴルフ|golf;コンピューター|máy tính;エレベーター|thang máy;ラブ|love;ビデオ|video;パソコン|máy tính cá nhân;コンビニ|cửa hàng tiện lợi;スマホ|điện thoại thông minh\nベトナム|Việt Nam;ハノイ|Hà Nội;ホーチミン|TP. Hồ Chí Minh;フォー|phở;バインミー|bánh mì' });

// ===== 7. Cao độ, ngữ điệu, biến âm =====
add('t-pitch', 'tone', 'Trọng âm cao độ: ba quy luật',
  'Mỗi mora được đọc **cao (H)** hoặc **thấp (L)**, cố định theo từ (giọng chuẩn Tokyo).\n**1.** Mora 1 và mora 2 luôn khác cao độ.\n**2.** Trong một từ, cao độ chỉ **rơi tối đa một lần**; xuống rồi không lên lại.\n**3.** Vị trí rơi quyết định kiểu trọng âm, ảnh hưởng cả trợ từ sau (が, は, を).\nSố trong ngoặc: **[0]** = kiểu bằng; **[n]** = rơi sau mora thứ n.\nGiọng đọc của máy có thể không đúng trọng âm; hãy tra lại bằng OJAD hoặc từ điển NHK.',
  { tables: [`Từ^Cao độ (ô đậm = cao; が = trợ từ)^Kiểu
さくら [0] hoa anh đào^~さ:L く:H ら:H が:H^平板型 bằng: không rơi, trợ từ vẫn cao
ねこ [1] con mèo^~ね:H こ:L が:L^頭高型: rơi sau mora đầu
おかし [2] bánh kẹo^~お:L か:H し:L が:L^中高型: rơi giữa từ
いもうと [4] em gái^~い:L も:H う:H と:H が:L^尾高型: cao đến hết từ, rơi ở trợ từ`], g: 'さくら|hoa anh đào [0];ねこ|con mèo [1];おかし|bánh kẹo [2];いもうと|いもおと|em gái [4]', kinds: ['speak'] });

add('t-pairs', 'tone', 'Cặp từ phân biệt bằng trọng âm',
  '**Thứ tự ưu tiên khi luyện:** (1) nhịp mora đều → (2) trường âm, っ, ん → (3) trọng âm cao độ. Vẫn nên tập tra trọng âm ngay khi học từ mới.\n**Đừng “dịch” cao – thấp thành thanh tiếng Việt** (sắc, nặng): cao gần thanh ngang, thấp chỉ trầm xuống một chút, không gãy, không nhấn.',
  { tables: [`Từ^Cao độ^Đặc điểm
箸 はし [1] đôi đũa^~は:H し:L が:L^Đầu cao
橋 はし [2] cây cầu^~は:L し:H が:L^Đuôi cao, trợ từ thấp
端 はし [0] mép, rìa^~は:L し:H が:H^Bằng, trợ từ vẫn cao
雨 あめ [1] mưa^~あ:H め:L が:L^Đầu cao
飴 あめ [0] kẹo^~あ:L め:H が:H^Bằng
花 はな [2] hoa^~は:L な:H が:L^Trợ từ thấp
鼻 はな [0] mũi^~は:L な:H が:H^Trợ từ cao`], g: 'はし|đũa / cầu / mép;あめ|mưa / kẹo;はな|hoa / mũi', kinds: ['speak'] });

add('t-inton', 'tone', 'Ngữ điệu câu',
  'Câu hỏi có か cuối câu thường **lên giọng ở か**. Câu trần thuật, rủ rê **xuống giọng ở cuối**.',
  { tables: [`Câu^Ngữ điệu cuối^Nghĩa
そうですか。^Đi xuống ↘^Ra vậy (đã hiểu)
そうですか？^Đi lên ↗^Vậy à? (hỏi lại)
いきますか？^Đi lên ↗ ở か^Bạn có đi không?
いきましょう。^Đi xuống ↘^Đi thôi`], kinds: ['speak', 'type'], g: 'そうですか。|そおですか|Ra vậy ↘;そうですか？|そおですか|Vậy à? ↗;いきますか？|Bạn có đi không? ↗;いきましょう。|いきましょお|Đi thôi ↘' });

add('t-devoice', 'tone', 'Nguyên âm vô thanh hóa',
  '**i và u** giữa hai phụ âm vô thanh (k, s, sh, t, ch, ts, h, f, p) hoặc cuối câu sau phụ âm vô thanh thường bị “thì thầm”, gần như không nghe thấy.\nĐừng đọc です thành “đê-xu” rõ ràng; đọc gần “đéx” với u gần câm, nhớ không thêm thanh sắc. Vẫn tính 1 mora.',
  { tables: [`Từ^Romaji^Nghe gần như^Nghĩa
です^desu^des’^là (lịch sự)
ます^masu^mas’^đuôi động từ lịch sự
すき^suki^s’ki^thích
した^shita^sh’ta^phía dưới
ひと^hito^h’to^người
きく^kiku^k’ku^nghe`], g: 'です|là (lịch sự);ます|đuôi lịch sự;すき|thích;した|phía dưới;ひと|người;きく|nghe', kinds: ['speak', 'listen', 'type'] });

add('t-particle', 'tone', 'Trợ từ は へ を đọc khác chữ viết',
  'Ba trợ từ phải nhớ ngay từ bài đầu: **は đọc “wa”, へ đọc “e”, を đọc “o”**.\nCâu chào cố định cũng viết は: こんにちは, こんばんは. Khi gõ máy vẫn gõ theo chữ viết (ha, he, wo).',
  { tables: [`Chữ viết^Khi là chữ thường^Khi là trợ từ^Ví dụ
は^ha^wa (chủ đề)^わたしはがくせいです。
へ^he^e (hướng)^がっこうへいきます。
を^–^o (tân ngữ)^みずをのみます。`], rule: true, kinds: ['type', 'speak'], g: 'わたしはがくせいです。|わたしわがくせえです|Tôi là sinh viên\nがっこうへいきます。|がっこおえいきます|Tôi đi đến trường\nみずをのみます。|みずおのみます|Tôi uống nước\nこんにちは|こんにちわ|xin chào;こんばんは|こんばんわ|chào buổi tối' });

add('t-rendaku', 'tone', 'Đục hóa khi ghép từ (連濁)',
  'Khi ghép hai từ, phụ âm đầu của từ thứ hai thường chuyển sang âm đục.',
  { tables: [`Từ 1^Từ 2^Từ ghép^Nghĩa
て (tay)^かみ (giấy)^てがみ^lá thư
はな (hoa)^ひ (lửa)^はなび^pháo hoa
おり (gấp)^かみ (giấy)^おりがみ^nghệ thuật gấp giấy
ひと (người)^ひと (người)^ひとびと^mọi người`], g: 'てがみ|lá thư;はなび|pháo hoa;おりがみ|gấp giấy;ひとびと|mọi người' });

add('t-count', 'tone', 'Biến âm khi đếm số',
  'Số ghép với lượng từ hay đổi âm: thêm っ, chuyển âm đục hoặc âm “p”. 本 (đếm vật dài như bút, chai) đọc ぽん, ほん hoặc ぼん tùy số đứng trước.',
  { tables: [`1^2^3^4^6
いっぽん^にほん^さんぼん^よんほん^ろっぽん
ippon^nihon^sanbon^yonhon^roppon`], g: 'いっぽん|một (vật dài);にほん|hai (vật dài);さんぼん|ba;よんほん|bốn;ろっぽん|sáu', kinds: ['type', 'listen', 'speak'] });

// ===== 8. Romaji, gõ máy, lỗi hay gặp =====
add('r-systems', 'rom', 'Hai hệ Romaji: Hepburn và Kunrei',
  '**Hepburn** gần cách đọc thực tế hơn: dùng trong hộ chiếu, biển báo, sách cho người nước ngoài. Trường âm ghi gạch trên (Tōkyō, kōhī) nhưng hay bị lược (Tokyo, Osaka): thêm một lý do không học phát âm qua Romaji.',
  { tables: [`Kana^Hepburn^Kunrei
し^shi^si
ち^chi^ti
つ^tsu^tu
ふ^fu^hu
じ^ji^zi
しゃ^sha^sya
ちゃ^cha^tya
じゃ^ja^zya
ちゅ^chu^tyu
しょ^sho^syo`], kinds: ['rom', 'speak'], g: 'し;ち;つ;ふ;じ;しゃ;ちゃ;じゃ;ちゅ;しょ' });

add('r-typing', 'rom', 'Gõ tiếng Nhật trên máy',
  'Bật bộ gõ Japanese (Microsoft IME / Google / Gboard), gõ Romaji, máy tự đổi sang hiragana; Space để chọn Kanji hoặc Katakana, Enter để xác nhận.\nTrong các bài gõ ở đây **gõ thẳng Latinh là ra kana**, không cần cài bộ gõ.',
  { tables: [`Muốn gõ^Phím gõ^Ghi chú
ん^nn^konnnichiha → こんにちは
っ^gấp đôi phụ âm sau^kitte → きって; ltu / xtu để gõ riêng
を^wo^
は (trợ từ)^ha^Gõ theo chữ viết
ぢ / づ^di / du^
ゃ ゅ ょ nhỏ^kya, sho…^lya, xyu… để gõ riêng chữ nhỏ
ー^phím dấu trừ (-)^Trường âm katakana`], kinds: ['type'], g: 'こんにちは|こんにちわ|xin chào;きって|con tem;みずを|nước (kèm trợ từ);はなぢ|chảy máu cam;つづく|tiếp tục;コーヒー|cà phê;きょう|hôm nay;しんぶん|tờ báo' });

add('r-hanviet', 'rom', 'Lợi thế: âm On và âm Hán-Việt',
  'Hơn nửa từ vựng là từ Hán, đọc âm On gần với âm Hán-Việt; âm cuối tương ứng khá đều.\nVí dụ: 経済 keizai (kinh tế), 物流 butsuryū (logistics), 貿易 bōeki (mậu dịch), 運送 unsō (vận tống), 大学生 daigakusei (sinh viên), 文化 bunka (văn hóa).\nMỗi khi học một từ Hán, ghi kèm âm Hán-Việt.',
  { tables: [`Âm cuối Hán-Việt^Âm On^Ví dụ
-c / -ch^kết thúc く / き^学 gaku · 国 koku · 力 ryoku · 石 seki
-t^kết thúc つ / ち^日 nichi · 一 ichi · 発 hatsu · 物 butsu · 実 jitsu
-p^trường âm (う)^法 hō · 合 gō · 十 jū · 入 nyū
-n / -m^kết thúc ん^人 jin · 文 bun · 三 san · 心 shin
-ng / -nh^trường âm (う / い)^東 tō · 中 chū · 生 sei · 経 kei · 京 kyō`], g: 'けいざい|けえざい|kinh tế (経済);ぶつりゅう|logistics (物流);ぼうえき|ぼおえき|mậu dịch (貿易);うんそう|うんそお|vận tải (運送);だいがくせい|だいがくせえ|sinh viên (大学生);ぶんか|văn hóa (文化)' });

add('r-errors', 'rom', '12 lỗi phát âm điển hình và cách sửa',
  'Đọc bảng, rồi bấm nghe và đọc theo các từ ví dụ bên dưới.',
  { tables: [`Lỗi^Ví dụ^Cách sửa
Gắn thanh điệu tiếng Việt^ありがとう → “a-ri-ga-tố”^Đọc phẳng, chỉ cao – thấp nhẹ
Trường âm đọc ngắn^おばあさん → おばさん^Vỗ tay đếm mora
Bỏ qua っ^きって → きて^Im 1 nhịp trước phụ âm sau
Nối ん với nguyên âm^きんえん → きねん^ん là một nhịp riêng
つ thành “chư” / “tư”^つくえ → “chư-cư-ê”^Lưỡi như “t”, xì như “x”: ts
ふ thành “phư” [f]^ふね → “phư-nê”^Thổi qua hai môi, răng không chạm
ら行 thành “l” / “r” rung^さくら → “xa-cư-la”^Búng đầu lưỡi một lần
う tròn môi^すし → “xu-shi”^Môi thả lỏng, gần “ư”
Đọc theo Romaji^desu → “đê-xu”^Học từ kana; です ≈ “đéx”
Sai trợ từ は へ を^わたしは → “…ha”^は=wa, へ=e, を=o
えい, おう tách rời^せんせい → “sen-sei”^えい=ee, おう=oo
ゃゅょ thành 2 nhịp^きょう → “ki-yô”^Chữ nhỏ lướt vào chữ trước`], g: 'ありがとう|ありがとお|cảm ơn;おばあさん|bà;きって|con tem;きんえん|cấm hút thuốc;つくえ|cái bàn;ふね|con thuyền;さくら|hoa anh đào;すし|sushi;です|là;わたしは|わたしわ|tôi thì…;せんせい|せんせえ|giáo viên;きょう|hôm nay' });

// ===== 9. Bài tập =====
add('x1', 'ex', 'Bài 1. Đọc hiragana, viết Romaji', 'Gõ Romaji của từng từ.', { ans: true, kinds: ['rom', 'speak'],
  g: 'さくら|sakura|hoa anh đào;ねこ|neko|con mèo;すし|sushi|sushi;ともだち|tomodachi|bạn bè;つくえ|tsukue|cái bàn\nふね|fune|con thuyền;ひとり|hitori|một người;りんご|ringo|quả táo;わたし|watashi|tôi;みず|mizu|nước' });
add('x2', 'ex', 'Bài 2. Đọc katakana, viết Romaji', 'Gõ Romaji của từng từ. Trường âm: gõ lặp nguyên âm hoặc dấu - (koohii, ko-hi-).', { ans: true, kinds: ['rom', 'speak'],
  g: 'コーヒー|kōhī|cà phê;テレビ|terebi|tivi;パソコン|pasokon|máy tính;ホテル|hoteru|khách sạn\nコンビニ|konbini|cửa hàng tiện lợi;タクシー|takushī|taxi;アイスクリーム|aisukurīmu|kem;ベトナム|Betonamu|Việt Nam' });
add('x3', 'ex', 'Bài 3. Đếm số mora', 'Chọn số mora của từng từ.', { kinds: ['mora'],
  g: 'にほん|Nhật Bản;とうきょう|Tokyo;がっこう|trường học;きって|con tem;せんせい|giáo viên\nびょういん|bệnh viện;おかあさん|mẹ;しゅっぱつ|xuất phát;ありがとう|cảm ơn;コンピューター|máy tính' });
add('x4', 'ex', 'Bài 4. Cặp từ dễ nhầm', 'Đếm mora và đọc to từng cặp; thử cả kiểu nghe & chọn.', { pair: true, kinds: ['mora', 'listen', 'speak'],
  g: 'おばさん|cô;おばあさん|bà\nきて|hãy đến;きって|tem\nさか|dốc;さっか|nhà văn\nびよういん|thẩm mỹ viện;びょういん|bệnh viện\nきよう|khéo tay;きょう|hôm nay\nきねん|kỷ niệm;きんえん|cấm hút thuốc' });
add('x5', 'ex', 'Bài 5. ん đọc thành âm gì?', 'Chọn m / n / ng / mũi. Với しんぶん: xét chữ ん **đầu tiên** (chữ ん thứ hai ở cuối từ nên là âm mũi).', { ans: true, kinds: ['nsound'],
  g: 'さんぽ|m|đi dạo (ん trước p);げんき|ng|khỏe mạnh (ん trước k);はんたい|n|phản đối (ん trước t);しんぶん|m|tờ báo (ん thứ nhất trước b)\nおんがく|ng|âm nhạc (ん trước g);ほん|mũi|quyển sách (ん cuối từ);てんぷら|m|tempura (ん trước p);でんわ|mũi|điện thoại (ん trước w)' });
add('x6', 'ex', 'Bài 6. Chuyển Romaji sang hiragana', 'Nhìn Romaji, viết bằng hiragana (gõ Latinh là tự ra kana). Chú ý: gõ theo **chữ viết**, nên こんにちは gõ là konnnichiha (nn → ん, rồi ni; trợ từ は gõ ha).', { ans: true, kinds: ['kana'],
  g: 'こんにちは|konnichiwa|xin chào;ありがとう|arigatou|cảm ơn;おはよう|ohayou|chào buổi sáng;がくせい|gakusei|học sinh\nきょう|kyou|hôm nay;ざっし|zasshi|tạp chí;おいしい|oishii|ngon;りょこう|ryokou|du lịch' });
add('x7', 'ex', 'Bài 7. Đọc câu hoàn chỉnh', 'Đọc to từng câu; để ý trợ từ, trường âm, っ và nguyên âm vô thanh. [ ] là cách viết theo âm đọc.', { rule: true, kinds: ['speak', 'type'],
  tables: [`Câu^Romaji^Điểm cần chú ý
はじめまして。^hajimemashite^し trong まして vô thanh: “ma-sh’-te”
わたしはベトナムじんです。^watashi wa Betonamujin desu^は → wa; です → “đéx”
よろしくおねがいします。^yoroshiku onegai shimasu^し trong ろしく vô thanh; ます → “mas’”
がっこうへいきます。^gakkō e ikimasu^っ; trường âm こう; へ → e; ます → “mas’”
これはなんですか。^kore wa nan desu ka^は → wa; す vô thanh; lên giọng ở か ↗`],
  g: 'はじめまして。|rất hân hạnh được gặp bạn\nわたしはベトナムじんです。|わたしわベトナムじんです|tôi là người Việt Nam\nよろしくおねがいします。|rất mong được giúp đỡ\nがっこうへいきます。|がっこおえいきます|tôi đi đến trường\nこれはなんですか。|これわなんですか|cái này là cái gì?' });

// ===== 10. Phụ lục =====
add('a-order', 'app', 'A. Thứ tự từ điển (五十音順)',
  'あいうえお かきくけこ さしすせそ たちつてと なにぬねの はひふへほ まみむめも やゆよ らりるれろ わをん.\nÂm đục đứng ngay sau âm trong tương ứng (か → が); chữ nhỏ っ ゃ xếp như chữ thường.');
add('a-write', 'app', 'B. Nguyên tắc viết kana',
  'Viết từ trên xuống, từ trái sang; nét ngang trước nét dọc khi cắt nhau (như chữ Hán).\nMỗi chữ nằm vừa một ô vuông đều; chữ nhỏ chiếm khoảng nửa ô ở góc dưới trái. Dấu ゛ ゜ viết sau cùng, góc trên phải.\nHiragana nét mềm, có độ hất; katakana nét thẳng, dứt khoát. Tuần đầu viết tay mỗi chữ ít nhất 10 lần, vừa viết vừa đọc to.');
add('a-sum', 'app', 'C. Bảng tóm tắt điểm then chốt', 'Xem nhanh trước khi luyện.',
  { tables: [`Hiện tượng^Ký hiệu^Số mora^Ví dụ
Âm ghép^ゃ ゅ ょ nhỏ^1 (cả cụm)^きょう = kyo·u
Trường âm^あ い う え(い) お(う) / ー^+1^おばあさん, コーヒー
Âm ngắt^っ / ッ nhỏ^+1^きって, ざっし
Âm mũi^ん / ン^+1^にほん, さんぽ
Trợ từ^は へ を^1^wa, e, o
Vô thanh hóa^i, u giữa phụ âm vô thanh^vẫn 1^です, すき`] });
add('a-res', 'app', 'D. Tài nguyên tra cứu phát âm',
  '**OJAD** (Đại học Tokyo): tra trọng âm cao độ, nhập cả câu để xem đường cao độ và nghe máy đọc.\n**NHK 日本語発音アクセント新辞典:** từ điển trọng âm chuẩn giọng Tokyo.\n**Mazii:** Nhật – Việt, có phát âm, Hán-Việt, ví dụ.\n**Jisho.org:** Nhật – Anh, tra Kanji, âm On/Kun.\n**Forvo:** người bản xứ ghi âm từng từ.\nGiọng đọc trong app là giọng của máy, chỉ để tham khảo.');
add('a-plan', 'app', 'E. Lộ trình 4 tuần và cách luyện hằng ngày',
  'Mỗi ngày 20–30 phút hơn học dồn một buổi. **Vỗ tay theo mora** khi đọc từ mới trong 2 tháng đầu. **Shadowing:** nghe câu ngắn rồi nhại ngay, bắt chước nhịp và cao độ.\nMỗi từ mới ghi: Kanji · hiragana · trọng âm [số] · nghĩa · (âm Hán-Việt).',
  { tables: [`Tuần^Nội dung^Mục tiêu cuối tuần
1^Phần 1–4: chữ viết, mora, 5 nguyên âm, 46 hiragana^Đọc và viết thuộc 46 chữ; đúng Bài 1
2^Phần 5–8: âm đục, âm ghép, trường âm, っ, ん^Đọc trơn từ hiragana; đúng Bài 3, 4, 5, 6
3^Phần 9: katakana, âm mở rộng, từ mượn^Đọc thuộc katakana; đúng Bài 2; phân biệt シ/ツ, ソ/ン
4^Phần 10–13: trọng âm, ngữ điệu, biến âm, Romaji, gõ máy^Đúng 5 câu Bài 7 nhịp đều; gõ được tiếng Nhật`] });

export const UNIT = Object.fromEntries(UNITS.map(u => [u.id, u]));
