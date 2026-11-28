// Dữ liệu Luyện âm tiếng Hàn: bảng chữ Hangul, công cụ tách / ghép chữ, kho từ – câu và các nhóm âm gần giống.
// Nội dung bám theo giáo trình “Nền tảng đọc và phát âm tiếng Hàn Quốc” (Phiên bản 1.0, 10/2026).

// ---------- tách / ghép âm tiết ----------
export const CHO = [...'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'];
export const JUNG = [...'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'];
export const JONG = ['', ...'ㄱㄲㄳㄴㄵㄶㄷㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅄㅅㅆㅇㅈㅊㅋㅌㅍㅎ'];
export const isSyl = c => !!c && c >= '가' && c <= '힣';
export const split = c => {
  if (!isSyl(c)) return null;
  const n = c.charCodeAt(0) - 0xAC00;
  return [CHO[Math.floor(n / 588)], JUNG[Math.floor(n / 28) % 21], JONG[n % 28]];
};
export const join = (c, v, t = '') => String.fromCharCode(0xAC00 + CHO.indexOf(c) * 588 + JUNG.indexOf(v) * 28 + JONG.indexOf(t));
const VV = { 'ㅗㅏ': 'ㅘ', 'ㅗㅐ': 'ㅙ', 'ㅗㅣ': 'ㅚ', 'ㅜㅓ': 'ㅝ', 'ㅜㅔ': 'ㅞ', 'ㅜㅣ': 'ㅟ', 'ㅡㅣ': 'ㅢ' };
const TT = { 'ㄱㅅ': 'ㄳ', 'ㄴㅈ': 'ㄵ', 'ㄴㅎ': 'ㄶ', 'ㄹㄱ': 'ㄺ', 'ㄹㅁ': 'ㄻ', 'ㄹㅂ': 'ㄼ', 'ㄹㅅ': 'ㄽ', 'ㄹㅌ': 'ㄾ', 'ㄹㅍ': 'ㄿ', 'ㄹㅎ': 'ㅀ', 'ㅂㅅ': 'ㅄ' };
const unpair = (map, x) => { const k = Object.keys(map).find(p => map[p] === x); return k ? [...k] : null; };

// gõ thêm một chữ cái vào chuỗi, tự ghép khối như bàn phím tiếng Hàn
export function addJamo(str, j) {
  const head = str.slice(0, -1), last = str.slice(-1), s = split(last);
  if (JUNG.includes(j)) {
    if (s) {
      const [c, v, t] = s;
      if (t) { const two = unpair(TT, t); const [keep, move] = two || ['', t]; if (CHO.includes(move)) return head + join(c, v, keep) + join(move, j); }
      else if (VV[v + j]) return head + join(c, VV[v + j]);
    } else if (CHO.includes(last)) return head + join(last, j);
    else if (VV[last + j]) return head + VV[last + j];
    return str + j;
  }
  if (s) {
    const [c, v, t] = s;
    if (!t && JONG.includes(j)) return head + join(c, v, j);
    if (t && TT[t + j]) return head + join(c, v, TT[t + j]);
  }
  return str + j;
}
export function backJamo(str) {
  const head = str.slice(0, -1), s = split(str.slice(-1));
  if (!s) return head;
  const [c, v, t] = s;
  if (t) return head + join(c, v, unpair(TT, t)?.[0] || '');
  const two = unpair(VV, v);
  return head + (two ? join(c, two[0]) : c);
}
// bàn phím 두벌식: phím Latinh -> chữ Hàn
export const KEYMAP = Object.fromEntries([...'qwertyuiopasdfghjklzxcvbnmQWERTOP'].map((k, i) => [k, 'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡㅃㅉㄸㄲㅆㅒㅖ'[i]]));
export const KEYROWS = [[...'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔ'], [...'ㅁㄴㅇㄹㅎㅗㅓㅏㅣ'], [...'ㅋㅌㅊㅍㅠㅜㅡ']];
export const SHIFT = { 'ㅂ': 'ㅃ', 'ㅈ': 'ㅉ', 'ㄷ': 'ㄸ', 'ㄱ': 'ㄲ', 'ㅅ': 'ㅆ', 'ㅐ': 'ㅒ', 'ㅔ': 'ㅖ' };

// ---------- bảng chữ cái: chữ | Latinh | IPA | gần âm Việt, cách đọc | tên gọi / cấu tạo | ví dụ ----------
const L = (g, rows) => rows.trim().split('\n').map(r => {
  const [ch, rom, ipa, vi, name, ex] = r.split('|').map(x => x.trim());
  const cons = g === 'cb' || g === 'cd';
  return { id: 'L' + ch, g, ch, rom, ipa, vi, name, ex, cons, say: cons ? join(ch, 'ㅏ') : join('ㅇ', ch) };
});
export const LGROUPS = { all: 'Cả 40 chữ', vb: '10 nguyên âm cơ bản', vg: '11 nguyên âm ghép', cb: '14 phụ âm cơ bản', cd: '5 phụ âm căng' };
export const LETTERS = [
  ...L('vb', `
ㅏ|a|[a]|a. Mở miệng tự nhiên, lưỡi hạ thấp|nguyên âm dương|아이 (trẻ em), 가다 (đi)
ㅑ|ya|[ja]|“ya”: i lướt nhanh sang a|ㅏ thêm nét → thêm “y”|야구 (bóng chày), 야채 (rau)
ㅓ|eo|[ʌ]|giữa ơ và o. Miệng mở khá rộng, môi KHÔNG tròn|nguyên âm âm|어머니 (mẹ), 거기 (ở đó)
ㅕ|yeo|[jʌ]|“yơ”: ㅣ lướt nhanh sang ㅓ|ㅓ thêm nét → thêm “y”|여자 (phụ nữ), 여기 (ở đây)
ㅗ|o|[o]|ô. Môi tròn, chụm lại, hơi đưa ra trước|nguyên âm dương|오이 (dưa chuột), 오다 (đến)
ㅛ|yo|[jo]|“yô”: ㅣ lướt nhanh sang ㅗ|ㅗ thêm nét → thêm “y”|요리 (món ăn), 학교 (trường học)
ㅜ|u|[u]|u. Môi tròn, chu ra nhiều hơn ㅗ, miệng hẹp hơn|nguyên âm âm|우유 (sữa), 구두 (giày da)
ㅠ|yu|[ju]|“yu”: ㅣ lướt nhanh sang ㅜ|ㅜ thêm nét → thêm “y”|유리 (kính), 휴지 (giấy ăn)
ㅡ|eu|[ɯ]|ư. Môi dẹt kéo ngang, hai hàm răng gần khép|Đất (nét ngang)|그림 (bức tranh), 크다 (to lớn)
ㅣ|i|[i]|i. Môi kéo ngang như cười, lưỡi nâng cao|Người (nét dọc)|이 (răng; số 2), 기차 (tàu hỏa)`),
  ...L('vg', `
ㅐ|ae|[ɛ]|e. Người Seoul trẻ đọc gần như ㅔ|ㅏ + ㅣ|개 (con chó), 새 (chim; mới)
ㅒ|yae|[jɛ]|“ye”|ㅑ + ㅣ|얘기 (câu chuyện), 걔 (cậu ấy)
ㅔ|e|[e]|ê|ㅓ + ㅣ|네 (vâng), 게 (con cua)
ㅖ|ye|[je]|“yê”. Sau phụ âm (trừ 예, 례) có thể đọc như ㅔ|ㅕ + ㅣ|예 (vâng), 시계 (đồng hồ)
ㅘ|wa|[wa]|oa|ㅗ + ㅏ|과자 (bánh kẹo), 사과 (quả táo)
ㅙ|wae|[wɛ]|oe / uê|ㅗ + ㅐ|왜 (tại sao), 돼지 (con lợn)
ㅚ|oe|[we]|uê|ㅗ + ㅣ|회사 (công ty), 외국 (nước ngoài)
ㅝ|wo|[wʌ]|uơ|ㅜ + ㅓ|뭐 (cái gì), 원 (đồng won)
ㅞ|we|[we]|uê|ㅜ + ㅔ|웨이터 (bồi bàn), 궤도 (quỹ đạo)
ㅟ|wi|[wi]|uy|ㅜ + ㅣ|귀 (tai), 위 (phía trên)
ㅢ|ui|[ɰi]|“ưi”: lướt nhanh từ ư sang i|ㅡ + ㅣ|의사 (bác sĩ), 의자 (ghế)`),
  ...L('cb', `
ㄱ|g, k|[k/g]|Đầu từ: giữa “c” và “g”, có chút hơi. Giữa hai nguyên âm: “g”|기역|가방 (cặp sách), 고기 (thịt)
ㄴ|n|[n]|n|니은|나무 (cây), 누나 (chị gái)
ㄷ|d, t|[t/d]|Đầu từ: giữa “t” và “đ”. Giữa hai nguyên âm: “đ”|디귿|다리 (chân; cầu), 도시 (thành phố)
ㄹ|r, l|[ɾ/l]|Đầu âm tiết: “r” nhẹ, lưỡi búng một lần. Cuối âm tiết: “l”|리을|라면 (mì), 물 (nước)
ㅁ|m|[m]|m|미음|머리 (đầu), 엄마 (mẹ)
ㅂ|b, p|[p/b]|Đầu từ: giữa “p” và “b”. Giữa hai nguyên âm: “b”|비읍|바다 (biển), 부모 (bố mẹ)
ㅅ|s, t|[s/ɕ]|“x” có hơi nhẹ. Trước ㅣ ㅑ ㅕ ㅛ ㅠ ㅟ: gần “sh”|시옷|사람 (người), 시간 (thời gian)
ㅇ|ng|[–/ŋ]|Đầu âm tiết: câm. Cuối âm tiết: “ng”|이응|아이 (trẻ em), 강 (sông)
ㅈ|j, t|[tɕ]|Gần “ch” nhẹ hơi; giữa hai nguyên âm gần “j”|지읒|자다 (ngủ), 바지 (quần)
ㅊ|ch, t|[tɕʰ]|“ch” bật hơi mạnh|치읓|차 (xe; trà), 친구 (bạn)
ㅋ|k|[kʰ]|“k” bật hơi mạnh, KHÔNG phải “kh” tiếng Việt|키읔|코 (mũi), 카드 (thẻ)
ㅌ|t|[tʰ]|“th” tiếng Việt (bật hơi)|티읕|토끼 (thỏ), 타다 (lên xe)
ㅍ|p|[pʰ]|“p” bật hơi mạnh, KHÔNG phải “ph” tiếng Việt|피읖|파 (hành), 포도 (nho)
ㅎ|h|[h]|h|히읗|하나 (một), 하늘 (bầu trời)`),
  ...L('cd', `
ㄲ|kk|[k͈]|“c/k” tiếng Việt, căng, không có hơi|쌍기역|까치 (chim ác là), 꼬리 (đuôi)
ㄸ|tt|[t͈]|“t” tiếng Việt, căng, không hơi|쌍디귿|딸 (con gái), 떡 (bánh gạo)
ㅃ|pp|[p͈]|“p” căng, không hơi (như “p” trong “pin”)|쌍비읍|빵 (bánh mì), 아빠 (bố)
ㅆ|ss|[s͈]|“x” căng, rít mạnh, không hơi|쌍시옷|쌀 (gạo), 비싸다 (đắt)
ㅉ|jj|[t͈ɕ]|“ch” tiếng Việt, căng, không hơi|쌍지읒|짜다 (mặn), 찌개 (canh hầm)`),
];

// bảng ghép âm (반절표)
export const GRID_V = [...'ㅏㅑㅓㅕㅗㅛㅜㅠㅡㅣ'];
export const GRID_C = [...'ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ'];
export const GRID_CC = [...'ㄲㄸㅃㅆㅉ'];
export const ROM_V = { 'ㅏ': 'a', 'ㅑ': 'ya', 'ㅓ': 'eo', 'ㅕ': 'yeo', 'ㅗ': 'o', 'ㅛ': 'yo', 'ㅜ': 'u', 'ㅠ': 'yu', 'ㅡ': 'eu', 'ㅣ': 'i' };
export const ROM_C = { 'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt', 'ㄹ': 'r', 'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's', 'ㅆ': 'ss', 'ㅇ': '', 'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h' };

// ---------- kho từ và câu ----------
// Mỗi mục: chữ viết | nghĩa  hoặc  chữ viết | cách đọc thực tế | nghĩa (nhiều cách đọc được chấp nhận: ngăn bằng /)
export const parse = s => s.split(/[;\n]/).map(x => x.trim()).filter(Boolean).map(x => {
  const a = x.split('|').map(y => y.trim());
  return a.length > 2 ? { w: a[0], p: a[1], vi: a[2] } : { w: a[0], p: '', vi: a[1] || '' };
});

export const NGROUPS = { all: 'Tất cả', va: 'Nguyên âm', pa: 'Phụ âm & 3 mức hơi', bc: 'Batchim', ba: 'Biến âm', gt: 'Giao tiếp' };

// từ (mức Trung bình)
export const WORDS = {
  va: parse(`아이|trẻ em;가다|đi;야구|bóng chày;야채|rau;어머니|mẹ;거기|ở đó;여자|phụ nữ;여기|ở đây;오이|dưa chuột;오다|đến;요리|món ăn;우유|sữa;구두|giày da;유리|kính;휴지|giấy ăn;그림|bức tranh;크다|to lớn;기차|tàu hỏa;고기|thịt;서다|đứng;소다|soda;어서|mau lên;커피|cà phê;버스|xe buýt;테스트|bài kiểm tra
개|con chó;새|chim, mới;얘기|câu chuyện;네|vâng;게|con cua;예|vâng;과자|bánh kẹo;사과|quả táo;왜|tại sao;돼지|con lợn;회사|công ty;외국|nước ngoài;뭐|cái gì;원|đồng won;웨이터|bồi bàn;궤도|quỹ đạo;귀|tai;위|phía trên
의사|bác sĩ;의자|ghế;희망|히망|hy vọng;무늬|무니|hoa văn;시계|시계/시게|đồng hồ;계세요|게세요/계세요|ở lại nhé (kính ngữ);가져|가저|mang đi;다쳐|다처|bị thương`),
  pa: parse(`가방|cặp sách;나무|cây;누나|chị gái;다리|chân, cầu;도시|thành phố;라면|mì;나라|đất nước;머리|đầu;엄마|mẹ;바다|biển;부모|bố mẹ;사람|người;시간|thời gian;자다|ngủ;바지|quần;친구|bạn;카드|thẻ;토끼|thỏ;타다|lên xe;포도|nho;하나|một;하늘|bầu trời
까치|chim ác là;꼬리|đuôi;아빠|bố;비싸다|đắt;짜다|mặn;찌개|canh hầm;차다|lạnh, đá;사다|mua;싸다|rẻ
우리|chúng ta;빨리|nhanh;몰라요|không biết;응원|cổ vũ;전화|điện thoại;은행|ngân hàng;바보|đồ ngốc;두부|đậu phụ;커피|cà phê;서울|Seoul`),
  bc: parse(`국|국|canh;부엌|부억|bếp;밖|박|bên ngoài;산|núi;눈|mắt, tuyết;밭|받|ruộng;옷|옫|áo;낮|낟|ban ngày;꽃|꼳|hoa;말|lời nói, con ngựa;길|con đường;밤|đêm;김치|kim chi;밥|cơm;앞|압|phía trước;방|phòng;공|quả bóng;서울|Seoul;물|nước;강|sông
넋|넉|linh hồn;몫|목|phần;앉다|안따|ngồi;많다|만타|nhiều;여덟|여덜|số tám;넓다|널따|rộng;밟다|밥따|giẫm;외곬|외골|một hướng;핥다|할따|liếm;잃다|일타|mất;싫다|실타|ghét;없다|업따|không có;값|갑|giá
닭|닥|con gà;읽다|익따|đọc;흙|흑|đất;읽고|일꼬|đọc rồi;맑게|말께|một cách trong trẻo;삶|삼|cuộc sống;젊다|점따|trẻ;읊다|읍따|ngâm thơ
앉아요|안자요|ngồi;읽어요|일거요|đọc;닭이|달기|con gà (chủ ngữ);젊은|절믄|trẻ (định ngữ);없어요|업써요|không có;많아요|마나요|nhiều;싫어요|시러요|không thích`),
  ba: parse(`음악|으막|âm nhạc;한국어|한구거|tiếng Hàn;발음|바름|phát âm;옷이|오시|áo (chủ ngữ);꽃을|꼬츨|hoa (tân ngữ);있어요|이써요|có;강아지|cún con;영어|tiếng Anh;좋아요|조아요|thích, tốt;놓아|노아|đặt xuống;많이|마니|nhiều;옷 안|오단|trong áo;맛없다|마덥따|dở;겉옷|거돋|áo khoác;맛있다|마싣따/마딛따|ngon
학교|학꾜|trường học;식당|식땅|nhà hàng;잡지|잡찌|tạp chí;책상|책쌍|bàn học;국밥|국빱|canh cơm;꽃다발|꼳따발|bó hoa;옆집|엽찝|nhà bên cạnh;신고|신꼬|mang (giày) rồi;감다|감따|gội;앉고|안꼬|ngồi rồi;갈 곳|갈꼳|nơi sẽ đi;발달|발딸|phát triển;일시|일씨|nhất thời;갈등|갈뜽|mâu thuẫn;길가|길까|lề đường;눈동자|눈똥자|con ngươi;문법|문뻡|ngữ pháp
놓고|노코|đặt rồi;좋다|조타|tốt;많지|만치|nhiều mà;축하|추카|chúc mừng;입학|이팍|nhập học;맏형|마텽|anh cả;앉히다|안치다|cho ngồi;몇 해|며태|mấy năm;못 하다|모타다|không làm được;좋습니다|조씀니다|tốt (trang trọng);놓는|논는|đang đặt;않네|안네|không phải nhỉ
합니다|함니다|làm (trang trọng);국물|궁물|nước canh;작년|장년|năm ngoái;거짓말|거진말|lời nói dối;있는|인는|đang có;앞마당|암마당|sân trước;한국말|한궁말|tiếng Hàn (khẩu ngữ);심리|심니|tâm lý;종로|종노|Jongno (địa danh);대통령|대통녕|tổng thống;정류장|정뉴장|bến xe buýt;독립|동닙|độc lập;협력|혐녁|hợp tác;국립|궁닙|quốc lập;법률|범뉼|pháp luật
신라|실라|nước Tân La;연락|열락|liên lạc;편리|펼리|tiện lợi;난로|날로|lò sưởi;설날|설랄|Tết Nguyên đán;일년|일련|một năm;앓는|알른|đang ốm;의견란|의견난|mục ý kiến;생산량|생산냥|sản lượng
같이|가치|cùng nhau;굳이|구지|nhất thiết;해돋이|해도지|bình minh;밭이|바치|ruộng (chủ ngữ);닫히다|다치다|bị đóng
한여름|한녀름|giữa mùa hè;담요|담뇨|chăn mỏng;솜이불|솜니불|chăn bông;색연필|생년필|bút chì màu;식용유|시굥뉴|dầu ăn;꽃잎|꼰닙|cánh hoa;서울역|서울력|ga Seoul;할 일|할릴|việc phải làm`),
  gt: parse(`안녕|chào;감사|cảm ơn (gốc từ);사랑해요|yêu bạn;대학생|대학쌩|sinh viên;국민|궁민|quốc dân;문화|văn hóa;경제|kinh tế;물류|logistics;무역|thương mại;항구|bến cảng;운송|vận chuyển;여자|nữ;남녀|nam nữ;노동|lao động;이유|lý do;능력|능녁|năng lực
오늘|hôm nay;내일|ngày mai;어제|hôm qua;학생|학쌩|học sinh;선생님|giáo viên;가족|gia đình;음식|thức ăn;날씨|thời tiết;지하철|tàu điện ngầm;병원|bệnh viện;시장|chợ;공부|việc học;일|việc, ngày, số một;집|nhà`),
};

// câu (mức Khó)
export const SENTS = {
  gt: parse(`안녕하세요|xin chào
감사합니다|감사함니다|cảm ơn
정말 감사합니다|정말 감사함니다|thật sự cảm ơn
저는 베트남 사람입니다|저는 베트남 사라밈니다|tôi là người Việt Nam
만나서 반갑습니다|만나서 반갑씀니다|rất vui được gặp bạn
한국어를 공부하고 있어요|한구거를 공부하고 이써요|tôi đang học tiếng Hàn
같이 식당에 갈까요|가치 식땅에 갈까요|cùng đi nhà hàng nhé
밥 먹었어요|밥 머거써요|đã ăn cơm rồi
같이 가요|가치 가요|cùng đi nhé
사랑해요|tôi yêu bạn
안녕히 가세요|안녕히 가세요|tạm biệt (người đi)
안녕히 계세요|안녕히 게세요/안녕히 계세요|tạm biệt (người ở lại)
죄송합니다|죄송함니다|tôi xin lỗi
괜찮아요|괜차나요|không sao
반갑습니다|반갑씀니다|rất vui
이름이 뭐예요|이르미 뭐예요|tên bạn là gì
어디에 있어요|어디에 이써요|ở đâu vậy
얼마예요|bao nhiêu tiền
이거 주세요|cho tôi cái này
물 좀 주세요|물 쫌 주세요/물 좀 주세요|cho tôi xin nước
맛있어요|마시써요|ngon quá
잘 먹겠습니다|잘 먹껟씀니다|tôi ăn đây
잘 모르겠어요|잘 모르게써요|tôi không rõ
다시 말해 주세요|다시 말해 주세요|xin nói lại
천천히 말해 주세요|xin nói chậm lại
한국말을 조금 해요|한궁마를 조금 해요|tôi nói được một chút tiếng Hàn
학교에 가요|학꾜에 가요|tôi đến trường
오늘 날씨가 좋아요|오늘 날씨가 조아요|hôm nay thời tiết đẹp
음악을 좋아해요|으마글 조아해요|tôi thích âm nhạc
책을 읽어요|채글 일거요|tôi đọc sách
시간이 없어요|시가니 업써요|tôi không có thời gian
친구를 만나요|tôi gặp bạn
커피를 마셔요|커피를 마셔요|tôi uống cà phê
버스를 타고 가요|tôi đi bằng xe buýt
서울역이 어디예요|서울려기 어디예요|ga Seoul ở đâu
옷이 비싸요|오시 비싸요|áo đắt quá
꽃이 예뻐요|꼬치 예뻐요|hoa đẹp quá
날씨가 추워요|trời lạnh
내일 봐요|hẹn mai gặp
축하합니다|추카함니다|xin chúc mừng`),
};

// ---------- nhóm gần giống (dùng cho Phân biệt): mỗi dòng một nhóm, các từ phải đọc KHÁC nhau ----------
const sets = (g, s) => s.trim().split('\n').map(line => ({ g, ws: parse(line) }));
export const DISC = [
  ...sets('pa', `
달|mặt trăng;탈|mặt nạ;딸|con gái
불|lửa;풀|cỏ, hồ dán;뿔|sừng
자다|ngủ;차다|đá, lạnh;짜다|mặn
기|khí;키|chiều cao, chìa khóa;끼|bữa ăn
사다|mua;싸다|rẻ
가|âm tiết;카|âm tiết;까|âm tiết
다|âm tiết;타|âm tiết;따|âm tiết
바|âm tiết;파|âm tiết;빠|âm tiết
자|âm tiết;차|âm tiết;짜|âm tiết
사|âm tiết;싸|âm tiết
방|phòng;팡|âm tiết;빵|bánh mì
굴|hàng, con hàu;쿨|âm tiết;꿀|mật ong
방|phòng;밤|đêm;반|một nửa
나|tôi;라|âm tiết;다|tất cả`),
  ...sets('va', `
거기|ở đó;고기|thịt
서다|đứng;소다|soda
어|âm tiết;오|số năm;우|âm tiết;으|âm tiết
고|âm tiết;구|số chín
소|con bò;수|số
그|người đó;구|số chín;거|cái
아|âm tiết;야|âm tiết;어|âm tiết;여|âm tiết
오|âm tiết;요|âm tiết;우|âm tiết;유|âm tiết
이|răng, số hai;의|của;으|âm tiết
와|âm tiết;워|âm tiết;위|phía trên;왜|tại sao
개|con chó;귀|tai;과|khoa
눈|mắt;논|ruộng lúa;난|hoa lan
설|Tết;솔|bàn chải;술|rượu;슬|âm tiết`),
  ...sets('bc', `
국|canh;굿|lễ lên đồng;굽|móng
밤|đêm;밥|cơm;밭|ruộng;박|họ Park
산|núi;상|giải thưởng;삼|số ba;살|tuổi
간|gan;강|sông;감|quả hồng;갈|đi (định ngữ)
말|lời nói;만|mười nghìn;맘|tấm lòng;망|lưới
공|quả bóng;곰|con gấu;곤|âm tiết;골|bàn thắng
입|miệng;익|âm tiết;일|việc;인|người`),
];
