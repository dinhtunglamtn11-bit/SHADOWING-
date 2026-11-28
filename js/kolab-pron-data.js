// Lộ trình “Phát âm” tiếng Hàn, bám theo giáo trình “Nền tảng đọc và phát âm tiếng Hàn Quốc” (13 phần + phụ lục).
// Mỗi bài: tip (**in đậm**, xuống dòng), tables (mỗi bảng: dòng đầu là tiêu đề, ô ngăn bằng ^, dòng ngăn bằng xuống dòng),
// g = các nhóm từ (mỗi dòng một nhóm; mỗi từ: chữ viết | [cách đọc nếu khác] | nghĩa, ngăn bằng ;).
// pair: true = từ trong cùng một dòng đọc khác nhau, dùng để nghe – phân biệt. rule: true = bài có luyện “Cách đọc”.
import { parse } from './kolab-data.js';

export const STAGES = [
  { id: 'han', t: '🔤 1. Chữ Hangeul và âm tiết', d: 'Nguồn gốc, nguyên lý thiết kế chữ, cách ghép một khối âm tiết (Phần 1–2).' },
  { id: 'vow', t: '👄 2. Nguyên âm', d: '10 nguyên âm cơ bản, 11 nguyên âm ghép, các cặp người Việt hay nhầm (Phần 3–4).' },
  { id: 'con', t: '🗣 3. Phụ âm và bảng ghép âm', d: '19 phụ âm, ba mức hơi, những phụ âm cần chú ý (Phần 5–6).' },
  { id: 'bat', t: '🧱 4. Batchim (phụ âm cuối)', d: '27 cách viết nhưng chỉ 7 âm đọc; batchim kép (Phần 7).' },
  { id: 'chg', t: '🔁 5. Quy tắc biến âm', d: 'Vì sao viết một đằng, đọc một nẻo (Phần 8).' },
  { id: 'tone', t: '🎵 6. Ngữ điệu, Latinh, lỗi hay gặp', d: 'Ngữ điệu và nhịp, phiên âm Latinh, lợi thế Hán-Việt, 10 lỗi điển hình (Phần 9–11).' },
  { id: 'ex', t: '✍️ 7. Bài tập có đáp án', d: 'Chín bài tập của Phần 12, chấm theo đáp án Phần 13.' },
  { id: 'app', t: '📎 8. Phụ lục', d: 'Thứ tự từ điển, tên chữ cái, bàn phím, tài nguyên, lộ trình 4 tuần.' },
];

export const UNITS = [];
const add = (id, st, t, tip, o = {}) => UNITS.push({ id, st, t, tip, tables: o.tables || [], pair: !!o.pair, rule: !!o.rule, kinds: o.kinds || null,
  groups: o.g ? o.g.trim().split('\n').map(parse) : [] });

// ===== 1. Hangeul và âm tiết =====
add('h-intro', 'han', 'Cách dùng và nguồn gốc chữ Hangeul',
  '**Đừng học phát âm qua chữ Latinh** hay kiểu “an-nhông-ha-xê-dô”. Hãy học thẳng chữ Hangeul: chỉ mất khoảng 1–2 tuần để đọc được.\nHangeul (한글) do vua Sejong (세종대왕) cùng các học giả sáng tạo năm 1443, ban bố năm 1446 với tên Huấn dân chính âm (훈민정음), nghĩa là “âm chuẩn để dạy dân”. Trước đó người Hàn ghi chép bằng chữ Hán.\nTiếng Hàn hiện đại dùng **24 chữ cơ bản** (14 phụ âm + 10 nguyên âm), ghép thêm 5 phụ âm đôi và 11 nguyên âm ghép: tổng cộng **40 ký tự**.\n**Quy ước:** [ ] là cách đọc thực tế. Ví dụ 한국어 [한구거]: viết 한국어 nhưng đọc 한구거. Ngày Hangeul (한글날) ở Hàn Quốc là 9/10.',
  { tables: [`Nhóm^Số lượng^Các chữ
Nguyên âm cơ bản^10^ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ
Nguyên âm ghép^11^ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ
Phụ âm cơ bản^14^ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅅ ㅇ ㅈ ㅊ ㅋ ㅌ ㅍ ㅎ
Phụ âm đôi (căng)^5^ㄲ ㄸ ㅃ ㅆ ㅉ`], g: '한글|chữ Hangeul;한국|Hàn Quốc;한국어|한구거|tiếng Hàn;훈민정음|Huấn dân chính âm;세종대왕|vua Sejong;한글날|한글랄|ngày Hangeul' });

add('h-design', 'han', 'Nguyên lý thiết kế: miệng, Trời – Đất – Người',
  '**Phụ âm vẽ lại cơ quan phát âm.** Năm chữ gốc được tạo trước, thêm nét nghĩa là âm mạnh hơn, nhiều hơi hơn. Các phụ âm cùng hàng có cùng vị trí phát âm.\n**Nguyên âm** tạo từ chấm · (Trời, nay là nét ngắn), ㅡ (Đất) và ㅣ (Người). Nét ngắn bên phải ㅣ → ㅏ, bên trái → ㅓ, phía trên ㅡ → ㅗ, phía dưới → ㅜ. Thêm một nét ngắn nữa là thêm “y”: ㅏ→ㅑ, ㅓ→ㅕ, ㅗ→ㅛ, ㅜ→ㅠ.\n**Nguyên âm dương (sáng):** ㅏ, ㅗ. **Nguyên âm âm (tối):** ㅓ, ㅜ, ㅡ và còn lại. Rất cần cho ngữ pháp: 가다 → 가요, 보다 → 봐요 (đuôi -아요) nhưng 먹다 → 먹어요 (đuôi -어요).',
  { tables: [`Chữ gốc^Mô phỏng^Thêm nét → mạnh hơn^Nhóm âm
ㄱ^Gốc lưỡi nâng lên chạm vòm mềm^ㄱ → ㅋ (ㄲ)^Vòm mềm
ㄴ^Đầu lưỡi chạm lợi trên^ㄴ → ㄷ → ㅌ (ㄸ), ㄹ^Đầu lưỡi
ㅁ^Đôi môi khép^ㅁ → ㅂ → ㅍ (ㅃ)^Môi
ㅅ^Chiếc răng^ㅅ → ㅈ → ㅊ (ㅆ, ㅉ)^Răng
ㅇ^Cổ họng tròn^ㅇ → ㅎ^Họng`], g: '가다|가다|đi;가요|đi (lịch sự);보다|xem;봐요|xem (lịch sự);먹다|먹따|ăn;먹어요|머거요|ăn (lịch sự)' });

add('h-block', 'han', 'Một âm tiết = một khối vuông',
  'Thứ tự luôn là: **phụ âm đầu → nguyên âm → (phụ âm cuối)**. Âm tiết bắt đầu bằng nguyên âm thì đặt chữ **ㅇ câm** ở vị trí phụ âm đầu.\nChữ ㅇ có hai vai trò: ở đầu thì câm (아 = “a”), ở cuối đọc “ng” (강 = “kang”).\n**Thứ tự nét:** từ trên xuống, từ trái sang. Chữ ㅇ viết một nét, bắt đầu từ đỉnh, ngược chiều kim đồng hồ. Tuần đầu viết tay mỗi chữ ít nhất 5 lần.\n**Đọc liền:** các âm tiết của một từ được đọc liền một hơi, âm trước ảnh hưởng âm sau.',
  { tables: [`Kiểu^Cấu trúc^Bố cục^Ví dụ
1^Phụ âm + nguyên âm dọc (ㅏ ㅓ ㅣ ㅐ ㅔ…)^Trái – phải^가 너 미 해
2^Phụ âm + nguyên âm ngang (ㅗ ㅜ ㅡ…)^Trên – dưới^고 무 드 요
3^Phụ âm + nguyên âm ghép (ㅘ ㅝ ㅚ ㅢ…)^Bao quanh góc^과 뭐 외 의
4^Thêm 1 batchim^Batchim ở đáy^각 곡 광 원
5^Thêm 2 batchim^Hai phụ âm ở đáy^닭 앉 없 읽`], g: '가;너;미;해\n고;무;드;요\n과;뭐;외;의\n각;곡;광;원\n앙|âm tiết “ang”;아|âm tiết;강|sông' });

add('h-vi', 'han', 'Tiếng Hàn khác tiếng Việt ở đâu',
  'Nắm sáu điểm khác nhau này trước để biết mình cần để ý chỗ nào.',
  { tables: [`Đặc điểm^Tiếng Việt^Tiếng Hàn
Thanh điệu^6 thanh, đổi nghĩa từ^Không có thanh, chỉ có ngữ điệu câu
Chữ viết^Viết hàng ngang^Ghép thành khối vuông, 1 khối = 1 âm tiết
Âm tiết^Thường 1 âm tiết = 1 từ^Từ nhiều âm tiết, đọc liền
Phụ âm tắc đầu^Hữu thanh / vô thanh^3 mức hơi: thường – bật hơi – căng
Phụ âm cuối^c, ch, t, p, m, n, ng, nh^Chỉ 7 âm: k, n, t, l, m, p, ng
Chữ – cách đọc^Đọc gần đúng như viết^Thường khác do biến âm`] });

// ===== 2. Nguyên âm =====
add('v-basic', 'vow', '10 nguyên âm cơ bản',
  'Nguyên âm là “xương sống” của âm tiết. Đứng trước gương khi luyện: **hình dạng môi quyết định phần lớn độ chính xác**.\nㅑ ㅕ ㅛ ㅠ là ㅣ lướt nhanh sang ㅏ ㅓ ㅗ ㅜ.\n**Bài kiểm tra gương:** đọc 아 – 어 – 오 – 우 – 으 – 이. Miệng phải đổi rõ: mở to → mở vừa, môi thả lỏng → môi tròn → môi chu nhỏ → kéo ngang, răng gần khép → kéo ngang như cười.',
  { tables: [`Chữ^Latinh^IPA^Gần âm Việt
ㅏ^a^[a]^a
ㅑ^ya^[ja]^ya
ㅓ^eo^[ʌ]^giữa ơ và o
ㅕ^yeo^[jʌ]^yơ
ㅗ^o^[o]^ô
ㅛ^yo^[jo]^yô
ㅜ^u^[u]^u
ㅠ^yu^[ju]^yu
ㅡ^eu^[ɯ]^ư
ㅣ^i^[i]^i`], g: '아이|trẻ em;가다|đi\n야구|bóng chày;야채|rau\n어머니|mẹ;거기|ở đó\n여자|phụ nữ;여기|ở đây\n오이|dưa chuột;오다|đến\n요리|món ăn;학교|학꾜|trường học\n우유|sữa;구두|giày da\n유리|kính;휴지|giấy ăn\n그림|bức tranh;크다|to lớn\n이|răng, số hai;기차|tàu hỏa' });

add('v-eo-o', 'vow', 'ㅓ và ㅗ: khác nhau ở môi (quan trọng nhất)',
  '**ㅗ** giống “ô”: môi tròn. **ㅓ** môi KHÔNG tròn, miệng mở to hơn, âm nằm giữa “ơ” và “o”.\nĐọc ㅓ thành “ô” thì 거기 (ở đó) nghe thành 고기 (thịt)!',
  { pair: true, g: '거기|ở đó;고기|thịt\n서다|đứng;소다|soda\n어서|mau lên;오서|không có nghĩa\n어|âm tiết;오|số năm\n거|cái;고|âm tiết\n서|âm tiết;소|con bò\n너|bạn;노|mái chèo\n벌|con ong;볼|má' });

add('v-eu-u', 'vow', 'ㅡ và ㅜ, ㅗ và ㅜ',
  '**ㅡ** giống “ư”, môi kéo ngang. **ㅜ** giống “u”, môi chu tròn. Người Việt hay đọc ㅡ quá yếu hoặc nuốt mất ở cuối từ vay mượn: 커피, 버스, 테스트.\n**ㅗ và ㅜ** đều tròn môi, nhưng ㅜ chu ra trước nhiều hơn và miệng hẹp hơn.',
  { pair: true, g: '으|âm tiết;우|âm tiết\n그|người đó;구|số chín\n들|các, cánh đồng;둘|số hai\n글|bài viết;굴|con hàu\n고|âm tiết;구|số chín\n소|con bò;수|số\n노|mái chèo;누|âm tiết\n커피|cà phê;버스|xe buýt;테스트|bài kiểm tra' });

add('v-ae-e', 'vow', 'Nguyên âm ghép: nhóm ㅐ / ㅔ',
  'ㅐ (ㅏ+ㅣ) trên lý thuyết mở miệng hơn ㅔ (ㅓ+ㅣ). Ở Seoul hiện đại, nhất là người trẻ, **ㅐ và ㅔ đọc gần như giống nhau** (gần “e / ê”). Vẫn phải nhớ cách viết vì nghĩa khác: 개 (chó) – 게 (cua), 내 (của tôi) – 네 (của bạn).\nVì đọc giống nhau nên bài này không có nghe – chọn.',
  { tables: [`Chữ^Latinh^Gần âm Việt^Cấu tạo
ㅐ^ae^e^ㅏ + ㅣ
ㅒ^yae^ye^ㅑ + ㅣ
ㅔ^e^ê^ㅓ + ㅣ
ㅖ^ye^yê^ㅕ + ㅣ`], kinds: ['type', 'speak'], g: '개|con chó;게|con cua\n내|của tôi;네|vâng, của bạn\n새|chim, mới;얘기|câu chuyện\n걔|cậu ấy;예|vâng\n시계|시계/시게|đồng hồ' });

add('v-w', 'vow', 'Nhóm ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ (âm “w”)',
  '**Quy luật kết hợp:** ㅗ chỉ đi với ㅏ, ㅐ, ㅣ; ㅜ chỉ đi với ㅓ, ㅔ, ㅣ. Không bao giờ có ㅗ+ㅓ hay ㅜ+ㅏ.\n**ㅙ, ㅚ, ㅞ** ngày nay đọc gần như giống nhau (≈ “uê”): 왜 (tại sao), 외 (ngoài), 웨 (trong 웨딩 – đám cưới).',
  { tables: [`Chữ^Latinh^Gần âm Việt^Cấu tạo
ㅘ^wa^oa^ㅗ + ㅏ
ㅙ^wae^oe / uê^ㅗ + ㅐ
ㅚ^oe^uê^ㅗ + ㅣ
ㅝ^wo^uơ^ㅜ + ㅓ
ㅞ^we^uê^ㅜ + ㅔ
ㅟ^wi^uy^ㅜ + ㅣ`], g: '과자|bánh kẹo;사과|quả táo\n왜|tại sao;돼지|con lợn\n회사|công ty;외국|nước ngoài\n뭐|cái gì;원|đồng won\n웨이터|bồi bàn;궤도|quỹ đạo\n귀|tai;위|phía trên\n웨딩|đám cưới' });

add('v-ui', 'vow', 'ㅢ: nguyên âm có nhiều cách đọc',
  'ㅢ = ㅡ + ㅣ, lướt nhanh từ “ư” sang “i”. Cách đọc đổi theo vị trí.',
  { rule: true, tables: [`Vị trí^Cách đọc^Ví dụ
Đầu từ, không phụ âm đầu (의)^[의]^의사, 의자
Có phụ âm đầu (희, 늬, 씌…)^[이]^희망 [히망], 무늬 [무니]
Âm tiết thứ 2 trở đi^[의] hoặc [이]^회의 [회의/회이]
Trợ từ sở hữu 의^[의] hoặc [에]^우리의 [우리의/우리에]`], g: '의사|의사|bác sĩ;의자|의자|ghế\n희망|히망|hy vọng;무늬|무니|hoa văn\n회의|회의/회이|cuộc họp;주의|주의/주이|chú ý\n우리의|우리의/우리에|của chúng ta' });

add('v-short', 'vow', 'Hai quy tắc đọc rút gọn nguyên âm',
  '1) **ㅖ sau phụ âm** (trừ 예, 례) có thể đọc thành ㅔ: 시계 [시계/시게], 계세요 [게세요]. Còn 예절, 차례 luôn đọc [예], [례].\n2) **져, 쪄, 쳐** đọc thành [저], [쩌], [처] (ㅕ mất âm “y” sau ㅈ ㅉ ㅊ).',
  { rule: true, g: '시계|시계/시게|đồng hồ;지혜|지혜/지헤|trí tuệ;계세요|게세요/계세요|ở lại nhé\n예절|예절|lễ nghĩa;차례|차례|thứ tự\n가져|가저|mang đi;다쳐|다처|bị thương;쪄|쩌|hấp' });

// ===== 3. Phụ âm =====
add('c-basic', 'con', '14 phụ âm cơ bản',
  'Tên chữ và cách đọc từng phụ âm. Phụ âm thường ㄱ ㄷ ㅂ ㅈ ở đầu từ gần như vô thanh (giống p/t/c nhẹ), giữa hai nguyên âm thì thành hữu thanh (g/đ/b/j): 고기 gần “kô-gi”, 두부 gần “tu-bu”. Không cần cố tạo khác biệt, đọc liền là tự có.',
  { tables: [`Chữ^Tên^Latinh^Gần âm Việt và cách đọc
ㄱ^기역^g / k^giữa “c” và “g”; giữa hai nguyên âm: “g”
ㄴ^니은^n^n
ㄷ^디귿^d / t^giữa “t” và “đ”; giữa hai nguyên âm: “đ”
ㄹ^리을^r / l^đầu và giữa từ: “r” nhẹ; cuối âm tiết: “l”
ㅁ^미음^m^m
ㅂ^비읍^b / p^giữa “p” và “b”; giữa hai nguyên âm: “b”
ㅅ^시옷^s / t^“x” có hơi nhẹ
ㅇ^이응^– / ng^đầu: câm; cuối: “ng”
ㅈ^지읒^j / t^gần “ch” nhẹ hơi
ㅊ^치읓^ch / t^“ch” bật hơi mạnh
ㅋ^키읔^k^“k” bật hơi mạnh (không phải “kh”)
ㅌ^티읕^t^“th” (bật hơi)
ㅍ^피읖^p^“p” bật hơi mạnh (không phải “ph”)
ㅎ^히읗^h^h`], g: '가방|cặp sách;고기|thịt;나무|cây;누나|chị gái\n다리|chân, cầu;도시|thành phố;라면|mì;나라|đất nước;물|nước\n머리|đầu;엄마|mẹ;바다|biển;부모|bố mẹ\n사람|người;시간|thời gian;아이|trẻ em;강|sông\n자다|ngủ;바지|quần;차|xe, trà;친구|bạn\n코|mũi;카드|thẻ;토끼|thỏ;타다|lên xe\n파|hành;포도|nho;하나|một;하늘|bầu trời\n두부|đậu phụ;바보|đồ ngốc' });

add('c-tense', 'con', '5 phụ âm căng ㄲ ㄸ ㅃ ㅆ ㅉ',
  'Phụ âm căng: siết cổ họng, **gần như không có hơi**, bật ra như bị nén, giống c / t / p tiếng Việt.',
  { tables: [`Chữ^Tên^Latinh^Cách đọc
ㄲ^쌍기역^kk^“c/k” căng, không hơi
ㄸ^쌍디귿^tt^“t” căng, không hơi
ㅃ^쌍비읍^pp^“p” căng, không hơi
ㅆ^쌍시옷^ss^“x” căng, rít mạnh
ㅉ^쌍지읒^jj^“ch” căng, không hơi`], g: '까치|chim ác là;꼬리|đuôi\n딸|con gái;떡|bánh gạo\n빵|bánh mì;아빠|bố\n쌀|gạo;비싸다|đắt\n짜다|mặn;찌개|canh hầm' });

add('c-three', 'con', 'Ba mức hơi: thường – bật hơi – căng',
  '**Trái tim của phụ âm tiếng Hàn.** Tiếng Hàn không phân biệt theo rung dây thanh mà theo **lượng hơi và độ căng**.\n**Bài kiểm tra tờ giấy** (cầm tờ giấy mỏng cách miệng 5 cm): đọc 카 giấy bay mạnh; 가 rung nhẹ; 까 gần như đứng yên. Làm tương tự 다–타–따, 바–파–빠, 자–차–짜, 사–싸.\nBắt đầu bằng phụ âm bật hơi / căng giọng thường cao hơn; phụ âm thường thì thấp.',
  { pair: true, tables: [`Vị trí^Thường (평음)^Bật hơi (격음)^Căng (경음)
Vòm mềm^ㄱ^ㅋ^ㄲ
Đầu lưỡi^ㄷ^ㅌ^ㄸ
Môi^ㅂ^ㅍ^ㅃ
Răng – tắc xát^ㅈ^ㅊ^ㅉ
Răng – xát^ㅅ^—^ㅆ`, `Loại^Hơi thở^Cổ họng^Cao độ
Thường ㄱㄷㅂㅈㅅ^Một ít^Thả lỏng^Thấp
Bật hơi ㅋㅌㅍㅊ^Rất nhiều^Thả lỏng^Cao
Căng ㄲㄸㅃㅉㅆ^Gần như không^Căng, siết^Cao`], g: '달|mặt trăng;탈|mặt nạ;딸|con gái\n불|lửa;풀|cỏ, hồ dán;뿔|sừng\n자다|ngủ;차다|đá, lạnh;짜다|mặn\n기|khí;키|chiều cao, chìa khóa;끼|bữa ăn\n사다|mua;싸다|rẻ\n가|âm tiết;카|âm tiết;까|âm tiết\n다|âm tiết;타|âm tiết;따|âm tiết\n바|âm tiết;파|âm tiết;빠|âm tiết\n자|âm tiết;차|âm tiết;짜|âm tiết' });

add('c-rl', 'con', 'ㄹ: một chữ, hai âm',
  '**Đầu âm tiết hoặc giữa hai nguyên âm:** âm vỗ [ɾ], đầu lưỡi chạm nhẹ lợi trên một lần rồi rời. Không rung lưỡi, cũng không phải “l” Việt.\n**Cuối âm tiết:** [l], đầu lưỡi áp lợi trên và giữ nguyên.\n**ㄹㄹ:** đọc [l] kéo dài.',
  { g: '나라|đất nước;우리|chúng ta;라면|mì\n물|nước;서울|Seoul;말|lời nói\n빨리|nhanh;몰라요|không biết' });

add('c-s-ng-h', 'con', 'ㅅ, ㅇ và ㅎ',
  '**ㅅ** thường như “x” nhẹ. Trước ㅣ ㅑ ㅕ ㅛ ㅠ ㅟ thành [ɕ], gần “sh”: 시 ≈ “shi”. Tương tự ㅆ: 씨.\n**ㅇ** ở trên thì câm, ở đáy đọc “ng”: 응원 → [eung-won].\n**ㅎ** đầu từ đọc rõ. Giữa các âm hữu thanh trong lời nói tự nhiên thường rất yếu hoặc mất: 전화 nghe như [저놔], 은행 như [으냉]. Mới học vẫn nên đọc rõ.',
  { g: '사람|người;소|con bò;시간|thời gian;씨|hạt, anh / chị\n아이|trẻ em;강|sông;응원|cổ vũ\n하나|một;전화|điện thoại;은행|ngân hàng' });

add('c-grid', 'con', 'Bảng ghép âm (반절표) và cách luyện',
  'Bảng đầy đủ để bấm nghe nằm ở **🔤 Bảng chữ → Ghép âm**.\nĐọc to theo hàng ngang (cùng phụ âm, đổi nguyên âm) rồi theo cột dọc.\n**Ngày 1–2:** đọc từng hàng có nhìn Latinh, mỗi hàng 3 lần. **Ngày 3–4:** che Latinh, đọc ngẫu nhiên, đánh dấu ô còn chần chừ. **Ngày 5–6:** đọc bộ ba theo cột: 가–카–까, 다–타–따… **Ngày 7:** nghe đọc ngẫu nhiên rồi viết ra chữ Hangeul.\n**Ô đặc biệt:** 시 샤 서 셔… với ㅅ trước i/y đọc “sh”; 져 쪄 쳐 đọc như 저 쩌 처; hàng ㄹ đọc “r” nhẹ.',
  { g: '가;나;다;라;마;바;사\n아;자;차;카;타;파;하\n고;노;도;로;모;보;소\n구;누;두;루;무;부;수' });

// ===== 4. Batchim =====
add('b-seven', 'bat', '7 âm đại diện',
  'Batchim (받침, “cái đỡ phía dưới”) có 27 cách viết nhưng **chỉ đọc thành 7 âm**. Đây là quy tắc quan trọng nhất.\n**Mẹo nhớ:** ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ. Chữ cùng vị trí phát âm về cùng một âm.\n**Lợi thế người Việt:** âm đóng c, t, p tiếng Việt cũng không bật hơi: 밥 như “báp”, 옷 như “ốt”, 국 như “cúc” (không có thanh sắc).',
  { rule: true, tables: [`Âm đọc^Các chữ đọc thành âm này^Cách phát âm
ㄱ [k̚]^ㄱ ㅋ ㄲ (ㄳ ㄺ)^Gốc lưỡi chặn vòm mềm, không bật
ㄴ [n]^ㄴ (ㄵ ㄶ)^Đầu lưỡi chạm lợi
ㄷ [t̚]^ㄷ ㅌ ㅅ ㅆ ㅈ ㅊ ㅎ^Đầu lưỡi chặn lợi, không bật
ㄹ [l]^ㄹ (ㄼ ㄽ ㄾ ㅀ)^Đầu lưỡi áp lợi và giữ
ㅁ [m]^ㅁ (ㄻ)^Mím môi
ㅂ [p̚]^ㅂ ㅍ (ㄼ ㄿ ㅄ)^Mím môi chặn hơi, không bật
ㅇ [ŋ]^ㅇ^Gốc lưỡi chạm vòm mềm, hơi ra mũi`], g: '국|국|canh;부엌|부억|bếp;밖|박|bên ngoài\n산|산|núi;눈|눈|mắt, tuyết\n밭|받|ruộng;옷|옫|áo;낮|낟|ban ngày;꽃|꼳|hoa\n말|말|lời nói;길|길|con đường\n밤|밤|đêm;김치|김치|kim chi\n밥|밥|cơm;앞|압|phía trước\n방|방|phòng;공|공|quả bóng' });

add('b-listen', 'bat', 'Phân biệt các âm cuối và lỗi hay gặp',
  '**Đừng mím môi** sau ㅗ / ㅜ: tiếng Việt đọc “ông”, “úc” thì môi khép; tiếng Hàn 공, 국, 송 phải giữ môi tròn và mở, chỉ dùng gốc lưỡi chặn.\n**Âm cuối ㄹ** đừng đọc thành “n” hay bỏ mất: 서울 phải kết thúc bằng lưỡi chạm lợi trên.',
  { pair: true, g: '국|canh;굿|lễ lên đồng;굽|móng\n밤|đêm;밥|cơm;박|họ Park\n산|núi;상|giải thưởng;삼|số ba;살|tuổi\n간|gan;강|sông;감|quả hồng;갈|đi (định ngữ)\n공|quả bóng;곰|con gấu;골|bàn thắng\n말|lời nói;만|mười nghìn;망|lưới\n서울|Seoul;서운|buồn tủi' });

add('b-double', 'bat', '11 batchim kép',
  'Cuối từ hoặc trước phụ âm, **chỉ đọc một trong hai**.\n**Mẹo:** chỉ **ㄺ, ㄻ, ㄿ** đọc chữ bên PHẢI; tất cả còn lại đọc chữ bên TRÁI.\nNgoại lệ: 밟다 [밥따]. Trước ㄱ trong động từ, ㄺ đọc [ㄹ]: 읽고 [일꼬], 맑게 [말께]. ㅎ trong ㄶ, ㅀ kết hợp với phụ âm sau.',
  { rule: true, tables: [`Nhóm A (trái)^Đọc^Nhóm B (phải)^Đọc
ㄳ^[ㄱ]^ㄺ^[ㄱ]
ㄵ ㄶ^[ㄴ]^ㄻ^[ㅁ]
ㄼ ㄽ ㄾ ㅀ^[ㄹ]^ㄿ^[ㅂ]
ㅄ^[ㅂ]^^`], g: '넋|넉|linh hồn;몫|목|phần\n앉다|안따|ngồi;많다|만타|nhiều\n여덟|여덜|số tám;넓다|널따|rộng;밟다|밥따|giẫm\n외곬|외골|một hướng;핥다|할따|liếm\n잃다|일타|mất;싫다|실타|ghét\n없다|업따|không có;값|갑|giá\n닭|닥|con gà;읽다|익따|đọc;흙|흑|đất\n읽고|일꼬|đọc rồi;맑게|말께|trong trẻo\n삶|삼|cuộc sống;젊다|점따|trẻ;읊다|읍따|ngâm thơ' });

add('b-double-v', 'bat', 'Batchim kép gặp nguyên âm',
  'Âm tiết sau bắt đầu bằng ㅇ câm thì **đọc cả hai**: chữ trái ở lại làm âm cuối, chữ phải sang làm âm đầu của âm tiết sau.\nㅅ chuyển sang thì căng thành ㅆ (없어요); ㅎ biến mất (많아요, 싫어요).',
  { rule: true, g: '앉아요|안자요|ngồi;읽어요|일거요|đọc\n닭이|달기|con gà (chủ ngữ);젊은|절믄|trẻ\n없어요|업써요|không có\n많아요|마나요|nhiều;싫어요|시러요|không thích' });

// ===== 5. Biến âm =====
add('r-order', 'chg', 'Tổng quan và thứ tự áp dụng',
  'Đọc liền thì âm cuối trước và âm đầu sau tác động lẫn nhau.\n**Thứ tự khi có nhiều quy tắc:** (1) quy về 7 âm đại diện → (2) nối âm / chèn ㄴ → (3) đồng hóa (mũi hóa, lưu âm hóa, căng hóa, bật hơi hóa).\nVí dụ 색연필: chèn ㄴ → 색년필 → mũi hóa → [생년필].',
  { rule: true, tables: [`Quy tắc^Điều kiện^Kết quả^Ví dụ
Nối âm^Batchim + ㅇ^Chuyển sang âm tiết sau^음악 [으막]
Căng hóa^[ㄱㄷㅂ] + ㄱㄷㅂㅅㅈ^ㄲㄸㅃㅆㅉ^학교 [학꾜]
Bật hơi hóa^ㅎ cạnh ㄱㄷㅂㅈ^ㅋㅌㅍㅊ^축하 [추카]
Mũi hóa 1^[ㄱㄷㅂ] + ㄴㅁ^[ㅇㄴㅁ]^합니다 [함니다]
Mũi hóa 2^ㅁㅇ + ㄹ^ㄹ → [ㄴ]^종로 [종노]
Mũi hóa 3^[ㄱㅂ] + ㄹ^[ㅇㄴ] [ㅁㄴ]^독립 [동닙]
Lưu âm hóa^ㄴ + ㄹ / ㄹ + ㄴ^[ㄹㄹ]^신라 [실라]
Vòm hóa^ㄷㅌ + 이^[지] [치]^같이 [가치]
Chèn ㄴ^Từ ghép: phụ âm + 이야여요유^thêm [ㄴ]^담요 [담뇨]
ㅎ biến mất^ㅎ + nguyên âm^ㅎ câm^좋아요 [조아요]`], g: '색연필|생년필|bút chì màu;음악|으막|âm nhạc;학교|학꾜|trường học;축하|추카|chúc mừng\n합니다|함니다|làm;종로|종노|Jongno;독립|동닙|độc lập;신라|실라|Tân La\n같이|가치|cùng nhau;담요|담뇨|chăn mỏng;좋아요|조아요|thích' });

add('r-link', 'chg', '8.1 Nối âm (연음)',
  'Batchim + âm tiết bắt đầu bằng nguyên âm → **batchim chuyển sang làm âm đầu** của âm tiết sau.\n**Ngoại lệ ㅇ:** không chuyển (강아지, 영어). **Ngoại lệ ㅎ:** biến mất (좋아요 [조아요]).\n**Qua ranh giới từ thực:** quy về âm đại diện trước rồi mới nối: 옷 안 [오단], 맛없다 [마덥따]. Riêng 맛있다 chấp nhận [마싣따] và [마딛따].',
  { rule: true, g: '음악|으막|âm nhạc;한국어|한구거|tiếng Hàn;발음|바름|phát âm\n옷이|오시|áo;꽃을|꼬츨|hoa;있어요|이써요|có\n강아지|강아지|cún con;영어|영어|tiếng Anh\n좋아요|조아요|thích;놓아|노아|đặt;많이|마니|nhiều\n옷 안|오단|trong áo;맛없다|마덥따|dở;겉옷|거돋|áo khoác;맛있다|마싣따/마딛따|ngon' });

add('r-tense', 'chg', '8.2 Căng hóa (경음화)',
  'Sau batchim đọc là [ㄱ], [ㄷ], [ㅂ], các phụ âm đầu ㄱ ㄷ ㅂ ㅅ ㅈ thành **ㄲ ㄸ ㅃ ㅆ ㅉ**.\nCòn gặp ở: thân từ tận cùng ㄴ ㅁ + đuôi ㄱㄷㅅㅈ (신고 [신꼬]); đuôi -(으)ㄹ + danh từ (갈 곳 [갈꼳]); từ Hán-Hàn batchim ㄹ + ㄷㅅㅈ (발달 [발딸]); từ ghép (문법 [문뻡]).\nHai trường hợp cuối phải học theo từng từ.',
  { rule: true, g: '학교|학꾜|trường học;식당|식땅|nhà hàng;잡지|잡찌|tạp chí\n책상|책쌍|bàn học;국밥|국빱|canh cơm;꽃다발|꼳따발|bó hoa;옆집|엽찝|nhà bên cạnh\n신고|신꼬|mang giày rồi;감다|감따|gội;앉고|안꼬|ngồi rồi;젊지|점찌|trẻ mà\n갈 곳|갈꼳|nơi sẽ đi;할 수 있다|할쑤읻따|có thể làm;먹을 거|머글꺼|đồ để ăn\n발달|발딸|phát triển;일시|일씨|nhất thời;갈등|갈뜽|mâu thuẫn\n길가|길까|lề đường;눈동자|눈똥자|con ngươi;문법|문뻡|ngữ pháp' });

add('r-aspir', 'chg', '8.3 Bật hơi hóa (격음화)',
  'ㅎ đứng cạnh ㄱ ㄷ ㅂ ㅈ (trước hoặc sau) **hợp lại thành ㅋ ㅌ ㅍ ㅊ**.\nㅎ + ㅅ → ㅆ (좋습니다 [조씀니다]); ㅎ + ㄴ → ㄴㄴ (놓는 [논는]); ㅎ + nguyên âm → ㅎ mất.',
  { rule: true, g: '놓고|노코|đặt rồi;좋다|조타|tốt;많지|만치|nhiều mà\n축하|추카|chúc mừng;입학|이팍|nhập học;맏형|마텽|anh cả;앉히다|안치다|cho ngồi\n몇 해|며태|mấy năm;못 하다|모타다|không làm được\n좋습니다|조씀니다|tốt;많소|만쏘|nhiều\n놓는|논는|đang đặt;않네|안네|không nhỉ\n좋아|조아|thích;싫어|시러|ghét' });

add('r-nasal', 'chg', '8.4 Mũi âm hóa (비음화)',
  '**Quy tắc 1:** [ㄱ ㄷ ㅂ] trước ㄴ, ㅁ → [ㅇ ㄴ ㅁ] (감사합니다 [감사함니다]).\n**Quy tắc 2:** ㄹ sau batchim ㅁ, ㅇ → [ㄴ].\n**Quy tắc 3:** ㄹ sau [ㄱ], [ㅂ] → ㄹ thành [ㄴ], rồi [ㄱ]→[ㅇ], [ㅂ]→[ㅁ].',
  { rule: true, g: '합니다|함니다|làm;국물|궁물|nước canh;작년|장년|năm ngoái;거짓말|거진말|lời nói dối\n있는|인는|đang có;앞마당|암마당|sân trước;한국말|한궁말|tiếng Hàn;감사합니다|감사함니다|cảm ơn\n심리|심니|tâm lý;종로|종노|Jongno;대통령|대통녕|tổng thống;정류장|정뉴장|bến xe buýt\n독립|동닙|độc lập;협력|혐녁|hợp tác;국립|궁닙|quốc lập;법률|범뉼|pháp luật' });

add('r-liquid', 'chg', '8.5 Lưu âm hóa / ㄹ hóa (유음화)',
  'ㄴ đứng cạnh ㄹ (ㄴ+ㄹ hoặc ㄹ+ㄴ) → cả hai đọc **[ㄹㄹ]**.\n**Ngoại lệ:** với hậu tố Hán-Hàn -란, -량, -력, -료, ㄹ lại đổi thành [ㄴ].',
  { rule: true, g: '신라|실라|Tân La;연락|열락|liên lạc;편리|펼리|tiện lợi;난로|날로|lò sưởi\n설날|설랄|Tết;일년|일련|một năm;앓는|알른|đang ốm\n의견란|의견난|mục ý kiến;생산량|생산냥|sản lượng;입원료|이붠뇨|viện phí;결단력|결딴녁|tính quyết đoán' });

add('r-palatal', 'chg', '8.6 Vòm hóa (구개음화)',
  'Batchim ㄷ, ㅌ gặp 이 của trợ từ / hậu tố → **[지], [치]**; ㄷ + 히 → [치].\nChỉ xảy ra giữa ranh giới hình vị: trong từ đơn như 잔디 (cỏ), 느티나무, vẫn đọc bình thường.',
  { rule: true, g: '같이|가치|cùng nhau;굳이|구지|nhất thiết;해돋이|해도지|bình minh\n밭이|바치|ruộng;닫히다|다치다|bị đóng\n잔디|잔디|cỏ;느티나무|느티나무|cây zelkova' });

add('r-nins', 'chg', '8.7 Chèn ㄴ (ㄴ 첨가)',
  'Từ ghép hoặc đọc liền hai từ: phần trước kết thúc bằng phụ âm, phần sau bắt đầu bằng 이 야 여 요 유 → **chèn [ㄴ]**, rồi có thể mũi hóa / lưu âm hóa.\nKhông áp dụng đều cho mọi từ: 금융 chấp nhận [금늉] và [그뮹].',
  { rule: true, g: '한여름|한녀름|giữa hè;담요|담뇨|chăn mỏng;솜이불|솜니불|chăn bông\n색연필|생년필|bút chì màu;식용유|시굥뉴|dầu ăn;꽃잎|꼰닙|cánh hoa\n서울역|서울력|ga Seoul;할 일|할릴|việc phải làm;금융|금늉/그뮹|tài chính' });

add('r-initial', 'chg', '8.8 Quy tắc âm đầu (두음법칙)',
  'Tiếng Hàn Quốc: từ Hán-Hàn không bắt đầu bằng ㄹ, và không bắt đầu bằng ㄴ trước ㅣ ㅑ ㅕ ㅛ ㅠ. Âm đầu **đổi ngay trong chữ viết**. Biết quy tắc này giúp nhận ra từ Hán-Hàn. Họ 李 viết 이 (Lee) dù gốc là 리.',
  { tables: [`Âm gốc^Ở đầu từ^Giữa từ → đầu từ^Hán Việt
녀 (女)^여^남녀 → 여자^nữ
력 (力)^역^능력 → 역도^lực
로 (勞)^노^근로 → 노동^lao
리 (理)^이^논리 → 이유^lý
락 (樂)^낙^쾌락 → 낙원^lạc`], g: '남녀|nam nữ;여자|nữ\n능력|능녁|năng lực;역도|역또|cử tạ\n근로|글로|cần lao;노동|lao động\n논리|놀리|luận lý;이유|lý do\n쾌락|khoái lạc;낙원|나권|lạc viên' });

// ===== 6. Ngữ điệu, Latinh, lỗi =====
add('t-tone', 'tone', 'Không có thanh điệu: đọc “ngang”',
  'Thói quen phổ biến nhất của người Việt là vô thức **gắn dấu** vào âm tiết Hàn (사랑해요 → “xa-ráng-hê-dồ”). Mới học hãy đọc mọi âm tiết gần thanh ngang, đều đặn, rồi mới thêm ngữ điệu câu.\n**Nhịp theo cụm:** người Hàn nói theo cụm (어절 = từ + trợ từ / đuôi), mỗi cụm thường “thấp → cao”.',
  { kinds: ['type', 'speak'], g: '사랑해요|tôi yêu bạn;안녕하세요|xin chào\n저는 베트남 사람입니다|저는 베트남 사라밈니다|tôi là người Việt Nam\n한국어를 공부하고 있어요|한구거를 공부하고 이써요|tôi đang học tiếng Hàn' });

add('t-inton', 'tone', 'Ngữ điệu câu và nguyên âm dài / ngắn',
  'Đuôi -아요 / -어요 dùng chung cho câu kể, hỏi, đề nghị: **ngữ điệu cuối câu quyết định nghĩa**. Câu kể đi xuống ↘, câu hỏi đi lên ↗.\n**Dài / ngắn:** từ điển ký hiệu “:” (눈 mắt – 눈: tuyết, 말 ngựa – 말: lời nói, 밤 đêm – 밤: hạt dẻ). Phần lớn người trẻ không còn phân biệt, không cần luyện.',
  { kinds: ['speak'], g: '밥 먹었어요.|밥 머거써요|Tôi ăn cơm rồi ↘;밥 먹었어요?|밥 머거써요|Bạn ăn cơm chưa? ↗\n같이 가요.|가치 가요|Cùng đi nhé ↘;같이 가요?|가치 가요|Đi cùng à? ↗' });

add('t-rom', 'tone', 'Phiên âm Latinh (Romanization)',
  'Hệ chuẩn năm 2000 dùng cho biển báo, địa danh, tên riêng. Cần biết để đọc biển hiệu nhưng **đừng dùng để học phát âm** (không thể hiện được ㅓ/ㅗ, ba mức hơi, căng hóa).\nㄹ: trước nguyên âm viết “r”, cuối âm tiết “l”, ㄹㄹ viết “ll”. Phản ánh mũi hóa, lưu âm hóa, vòm hóa, nối âm (신라 Silla, 종로 Jongno, 같이 gachi) nhưng **không phản ánh căng hóa** (압구정 Apgujeong).\nTên họ giữ cách cũ: 김 Kim, 이 Lee, 박 Park, 최 Choi, 정 Jung.',
  { tables: [`Nguyên âm^Latinh^Nguyên âm^Latinh
ㅏ ㅓ ㅗ^a, eo, o^ㅑ ㅕ ㅛ^ya, yeo, yo
ㅜ ㅡ ㅣ^u, eu, i^ㅠ ㅒ ㅖ^yu, yae, ye
ㅐ ㅔ^ae, e^ㅘ ㅙ^wa, wae
ㅚ ㅟ ㅢ^oe, wi, ui^ㅝ ㅞ^wo, we`, `Phụ âm^Đầu^Cuối
ㄱ ㄲ ㅋ^g, kk, k^k
ㄷ ㄸ ㅌ^d, tt, t^t, –, t
ㅂ ㅃ ㅍ^b, pp, p^p, –, p
ㅈ ㅉ ㅊ^j, jj, ch^t, –, t
ㅅ ㅆ ㅎ^s, ss, h^t
ㄴ ㅁ ㅇ ㄹ^n, m, –, r^n, m, ng, l`], g: '서울|Seoul;신라|실라|Silla;종로|종노|Jongno\n압구정|압꾸정|Apgujeong;한국어|한구거|hangugeo' });

add('t-hanviet', 'tone', 'Lợi thế: Hán-Hàn và Hán-Việt',
  'Khoảng 60% từ vựng Hàn gốc chữ Hán. Phụ âm cuối tương ứng khá đều: **ㄱ → -c/-ch, ㅂ → -p, ㄹ → -t, ㄴ → -n, ㅁ → -m, ㅇ → -ng/-nh**.\nMỗi từ Hán-Hàn nên viết kèm chữ Hán và âm Hán-Việt để nhớ lâu.',
  { tables: [`Batchim^Âm cuối Hán-Việt^Ví dụ
ㄱ^-c / -ch^학 học · 국 quốc · 력 lực · 석 thạch
ㅂ^-p^법 pháp · 십 thập · 입 nhập · 합 hợp
ㄹ^-t^일 nhất · 월 nguyệt · 발 phát · 실 thất · 결 kết
ㄴ^-n^인 nhân · 문 văn · 신 tân · 안 an
ㅁ^-m^삼 tam · 심 tâm · 남 nam · 금 kim
ㅇ^-ng / -nh^동 đông · 생 sinh · 경 kinh · 성 thành`], g: '대학생|대학쌩|đại học sinh (sinh viên);국민|궁민|quốc dân;문화|văn hóa\n경제|kinh tế;물류|vật lưu (logistics);무역|mậu dịch\n항구|bến cảng;운송|vận tống (vận chuyển)' });

add('t-errors', 'tone', '10 lỗi phát âm điển hình của người Việt',
  'Đọc bảng, tự kiểm tra từng lỗi rồi bấm nghe các từ bên dưới và đọc theo.',
  { tables: [`#^Lỗi^Cách sửa
1^Gắn thanh điệu Việt^Đọc thanh ngang đều, chỉ đổi ngữ điệu cuối câu
2^Đọc ㅓ thành “ô”^Gương: môi không tròn, miệng mở to
3^ㅋ thành “kh”, ㅍ thành “ph”^Âm tắc + bật hơi, chặn kín rồi mới bật
4^Không phân biệt 3 mức hơi^Bài tờ giấy mỗi ngày 5 phút
5^Mím môi sau ㅗ/ㅜ (공, 국)^Giữ môi tròn và mở
6^Bỏ / sai ㄹ cuối (서울)^Kết thúc bằng đầu lưỡi áp lợi
7^ㄹ đầu thành “l” hoặc “r” rung^Búng nhẹ đầu lưỡi một lần
8^Ngắt từng âm tiết^Đọc liền: 한국어 [한구거]
9^Đọc theo chữ Latinh^Học từ Hangeul, bỏ Latinh
10^Bỏ qua biến âm^Luôn tra mục [phát âm] trong từ điển`], g: '사랑해요|tôi yêu bạn;거기|ở đó;커피|cà phê\n불|lửa;풀|cỏ;뿔|sừng\n공|quả bóng;국|canh;서울|Seoul\n라면|mì;한국어|한구거|tiếng Hàn;감사합니다|감사함니다|cảm ơn' });

// ===== 7. Bài tập =====
add('x1', 'ex', 'Bài 1. Đọc nguyên âm',
  'Nghe / nhìn rồi viết phiên âm Latinh trong đầu, đọc to, đối chiếu đáp án: 어 eo · 오 o · 으 eu · 우 u · 여 yeo · 요 yo · 애 ae · 워 wo · 외 oe · 의 ui.',
  { kinds: ['type', 'speak'], g: '어|eo;오|o;으|eu;우|u;여|yeo\n요|yo;애|ae;워|wo;외|oe;의|ui' });
add('x2', 'ex', 'Bài 2. Nối âm', 'Viết cách đọc của từng từ.', { rule: true,
  g: '직업|지겁|nghề nghiệp;일요일|이료일|chủ nhật;단어|다너|từ vựng;꽃이|꼬치|hoa (chủ ngữ)\n읽어요|일거요|đọc;앉으세요|안즈세요|mời ngồi;좋아요|조아요|tốt, thích' });
add('x3', 'ex', 'Bài 3. Căng hóa', 'Viết cách đọc của từng từ.', { rule: true,
  g: '숙제|숙쩨|bài tập về nhà;젓가락|저까락/젇까락|đũa;입구|입꾸|lối vào\n듣기|듣끼|kỹ năng nghe;약속|약쏙|cuộc hẹn;덥다|덥따|nóng' });
add('x4', 'ex', 'Bài 4. Mũi âm hóa', 'Viết cách đọc của từng từ.', { rule: true,
  g: '박물관|방물관|bảo tàng;십만|심만|một trăm nghìn;입니다|임니다|là\n콧물|콘물|nước mũi;음료수|음뇨수|đồ uống;능력|능녁|năng lực' });
add('x5', 'ex', 'Bài 5. Bật hơi hóa', 'Viết cách đọc của từng từ.', { rule: true,
  g: '생각하다|생가카다|suy nghĩ;따뜻하다|따뜨타다|ấm áp;급히|그피|vội vàng\n어떻게|어떠케|như thế nào;넣다|너타|cho vào;못하다|모타다|kém' });
add('x6', 'ex', 'Bài 6. Lưu âm hóa và vòm hóa', 'Viết cách đọc của từng từ.', { rule: true,
  g: '관리|괄리|quản lý;물난리|물랄리|lũ lụt;한라산|할라산|núi Halla\n끝이|끄치|cuối cùng (chủ ngữ);붙이다|부치다|dán;미닫이|미다지|cửa trượt' });
add('x7', 'ex', 'Bài 7. Tổng hợp nhiều quy tắc', 'Mỗi từ áp dụng một hoặc nhiều quy tắc.', { rule: true,
  g: '학년|항년|năm học;첫눈|천눈|tuyết đầu mùa;맞춤법|맏춤뻡|chính tả;옛날|옌날|ngày xưa\n십육|심뉵|mười sáu;없는|엄는|không có;밟는|밤는|đang giẫm;값어치|가버치|giá trị' });
add('x8', 'ex', 'Bài 8. Đọc câu hoàn chỉnh', 'Viết cách đọc thực tế của cả câu và nhận ra các quy tắc đã áp dụng (nối âm, mũi hóa, căng hóa, vòm hóa).', { rule: true,
  g: '안녕하세요. 저는 베트남 사람입니다.|안녕하세요 저는 베트남 사라밈니다|Xin chào. Tôi là người Việt Nam\n만나서 반갑습니다.|만나서 반갑씀니다|Rất vui được gặp bạn\n한국어를 공부하고 있어요.|한구거를 공부하고 이써요|Tôi đang học tiếng Hàn\n같이 식당에 갈까요?|가치 식땅에 갈까요|Cùng đi nhà hàng nhé?\n정말 감사합니다.|정말 감사함니다|Thật sự cảm ơn' });
add('x9', 'ex', 'Bài 9. Luyện nghe: ba mức hơi và cặp dễ nhầm', 'Mục tiêu: đúng 9/10 trở lên trước khi sang bài từ vựng.', { pair: true, kinds: ['listen', 'speak'],
  g: '달|mặt trăng;탈|mặt nạ;딸|con gái\n불|lửa;풀|cỏ;뿔|sừng\n자다|ngủ;차다|đá, lạnh;짜다|mặn\n거기|ở đó;고기|thịt\n사다|mua;싸다|rẻ' });

// ===== 8. Phụ lục =====
add('a-order', 'app', 'A. Thứ tự chữ cái trong từ điển',
  '**Phụ âm (19):** ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ\n**Nguyên âm (21):** ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ\nTừ điển xếp theo phụ âm đầu → nguyên âm → phụ âm cuối.');
add('a-names', 'app', 'B. Tên chữ cái khi đi với trợ từ',
  'Tên phụ âm theo mẫu “phụ âm + ㅣ + ㅡ + phụ âm” (니은, 리을). Ba ngoại lệ: 기역, 디귿, 시옷. Khi đi với 이, batchim đọc theo quy tắc riêng.',
  { rule: true, g: '디귿이|디그시|chữ ㄷ;키읔이|키으기|chữ ㅋ;지읒이|지으시|chữ ㅈ;티읕이|티으시|chữ ㅌ\n치읓이|치으시|chữ ㅊ;피읖이|피으비|chữ ㅍ;히읗이|히으시|chữ ㅎ;시옷이|시오시|chữ ㅅ' });
add('a-keyboard', 'app', 'C. Bàn phím tiếng Hàn (두벌식)',
  'Phụ âm bên tay trái, nguyên âm bên tay phải; hệ thống tự ghép khối: 한 = G + K + S. Bật bộ gõ Korean (Microsoft IME / Gboard).\nTrong các bài gõ ở đây có sẵn **bàn phím Hàn trên màn hình**; trên máy tính có thể gõ thẳng bằng phím Latinh theo bố cục này.',
  { tables: [`Hàng^Phím → chữ
Trên^Q ㅂ · W ㅈ · E ㄷ · R ㄱ · T ㅅ · Y ㅛ · U ㅕ · I ㅑ · O ㅐ · P ㅔ
+ Shift^ㅃ ㅉ ㄸ ㄲ ㅆ (Q W E R T) · ㅒ ㅖ (O P)
Giữa^A ㅁ · S ㄴ · D ㅇ · F ㄹ · G ㅎ · H ㅗ · J ㅓ · K ㅏ · L ㅣ
Dưới^Z ㅋ · X ㅌ · C ㅊ · V ㅍ · B ㅠ · N ㅜ · M ㅡ`], kinds: ['type'], g: '한;글;한국;가방;우리;서울;친구;학교' });
add('a-res', 'app', 'D. Tài nguyên tra cứu phát âm',
  '**표준국어대사전** (stdict.korean.go.kr): từ điển chuẩn, có mục [발음] và âm thanh.\n**Naver 사전** (dict.naver.com): có Hàn – Việt, phát âm bản xứ, ví dụ có âm thanh.\n**Forvo** (forvo.com): người bản xứ ghi âm từng từ.\n**표준 발음법:** văn bản gốc các quy tắc ở Phần 8.\nGiọng đọc trong app là giọng của máy, chỉ để tham khảo; hãy đối chiếu với giọng bản xứ.');
add('a-plan', 'app', 'E. Lộ trình 4 tuần và cách luyện hằng ngày',
  'Mỗi ngày 20–30 phút hơn 3 tiếng một lần mỗi tuần. **Ghi âm** giọng mình và so với bản xứ. **Shadowing:** nghe câu ngắn rồi nhại ngay, bắt chước cả ngữ điệu. Mỗi từ mới ghi: chữ Hangeul · [cách đọc] · nghĩa · (chữ Hán + âm Hán-Việt).',
  { tables: [`Tuần^Nội dung^Mục tiêu cuối tuần
1^Giai đoạn 1–2, 14 phụ âm, bảng ghép âm cơ bản^Đọc mọi ô không cần Latinh; viết tay 24 chữ
2^Nguyên âm ghép, phụ âm căng, 3 mức hơi, bảng phụ âm căng^Qua bài tờ giấy; nghe đúng 9/10 ở Bài 9
3^Batchim, batchim kép, nối âm, căng hóa^Đúng Bài 2–3; đọc trơn từ 2–3 âm tiết
4^Các quy tắc còn lại, ngữ điệu; Bài 4–8^Đọc đúng 5 câu Bài 8; gõ được tiếng Hàn`] });

export const UNIT = Object.fromEntries(UNITS.map(u => [u.id, u]));
