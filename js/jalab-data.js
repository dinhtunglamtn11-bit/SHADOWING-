// Dữ liệu Luyện âm tiếng Nhật: bảng kana, công cụ đổi Latinh -> kana, đếm mora, kho từ – câu và các nhóm âm gần giống.
// Nội dung bám theo giáo trình “Nền tảng đọc và phát âm tiếng Nhật” (Phiên bản 1.0, 10/2026).

// ---------- công cụ kana ----------
export const toKata = s => s.replace(/[ぁ-ゖ]/g, c => String.fromCharCode(c.charCodeAt(0) + 96));
export const toHira = s => s.replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 96));
export const isKata = s => /[ァ-ヺ]/.test(s);
const SMALL = 'ぁぃぅぇぉゃゅょゎァィゥェォャュョヮ'; // chữ nhỏ đi cùng chữ trước, không tính mora riêng (っ ー thì có)
// tách một từ thành các mora
export const moras = s => {
  const out = [];
  for (const c of s.replace(/[^ぁ-ゖァ-ヺー]/g, '')) {
    if (SMALL.includes(c) && out.length) out[out.length - 1] += c; else out.push(c);
  }
  return out;
};

// hàng nguyên âm của từng kana (để hiểu ー và các cách viết trường âm)
const VROW = {
  a: 'あかがさざただなはばぱまやらわぁゃ', i: 'いきぎしじちぢにひびぴみりぃ', u: 'うくぐすずつづぬふぶぷむゆるぅゅゔ',
  e: 'えけげせぜてでねへべぺめれぇ', o: 'おこごそぞとどのほぼぽもよろをぉょ',
};
const vowelOf = c => Object.keys(VROW).find(v => VROW[v].includes(c)) || '';
// chuẩn hóa để so “cùng cách đọc”: katakana -> hiragana, ー và おう -> nguyên âm lặp, ぢ=じ, づ=ず, を=お
export function soundKey(s) {
  const out = [];
  for (let c of toHira(String(s || ''))) {
    const pv = vowelOf(out[out.length - 1] || '');
    if (c === 'ー' && pv) c = 'あいうえお'['aiueo'.indexOf(pv)];
    else if (c === 'う' && pv === 'o') c = 'お';
    c = { 'ぢ': 'じ', 'づ': 'ず', 'を': 'お' }[c] || c;
    out.push(c);
  }
  return out.join('');
}

// ---------- Latinh -> hiragana (như bộ gõ tiếng Nhật; nhận cả Hepburn lẫn Kunrei) ----------
const RM = {};
const row = (heads, kana) => { const v = 'aiueo'; [...kana].forEach((k, i) => { if (k !== '　') for (const h of heads.split(' ')) RM[h + v[i]] = k; }); };
RM.a = 'あ'; RM.i = 'い'; RM.u = 'う'; RM.e = 'え'; RM.o = 'お';
row('k', 'かきくけこ'); row('s', 'さしすせそ'); row('t', 'たちつてと'); row('n', 'なにぬねの'); row('h', 'はひふへほ'); row('m', 'まみむめも');
row('r', 'らりるれろ'); row('g', 'がぎぐげご'); row('z', 'ざじずぜぞ'); row('d', 'だぢづでど'); row('b', 'ばびぶべぼ'); row('p', 'ぱぴぷぺぽ');
Object.assign(RM, { ya: 'や', yu: 'ゆ', yo: 'よ', wa: 'わ', wo: 'を', shi: 'し', chi: 'ち', tsu: 'つ', fu: 'ふ', ji: 'じ' });
const yoon = (heads, base) => { for (const h of heads.split(' ')) Object.assign(RM, { [h + 'a']: base + 'ゃ', [h + 'u']: base + 'ゅ', [h + 'o']: base + 'ょ' }); };
yoon('ky', 'き'); yoon('sh sy', 'し'); yoon('ch ty cy', 'ち'); yoon('ny', 'に'); yoon('hy', 'ひ'); yoon('my', 'み'); yoon('ry', 'り'); yoon('gy', 'ぎ'); yoon('j jy zy', 'じ'); yoon('by', 'び'); yoon('py', 'ぴ'); yoon('dy', 'ぢ');
Object.assign(RM, {
  fa: 'ふぁ', fi: 'ふぃ', fe: 'ふぇ', fo: 'ふぉ', thi: 'てぃ', dhi: 'でぃ', twu: 'とぅ', dwu: 'どぅ', wi: 'うぃ', we: 'うぇ', who: 'うぉ',
  va: 'ゔぁ', vi: 'ゔぃ', vu: 'ゔ', ve: 'ゔぇ', vo: 'ゔぉ', she: 'しぇ', je: 'じぇ', che: 'ちぇ', tsa: 'つぁ', tsi: 'つぃ', tse: 'つぇ', tso: 'つぉ', dyu: 'ぢゅ',
});
for (const p of ['x', 'l']) Object.assign(RM, { [p + 'a']: 'ぁ', [p + 'i']: 'ぃ', [p + 'u']: 'ぅ', [p + 'e']: 'ぇ', [p + 'o']: 'ぉ', [p + 'ya']: 'ゃ', [p + 'yu']: 'ゅ', [p + 'yo']: 'ょ', [p + 'tu']: 'っ', [p + 'tsu']: 'っ' });
// final = true: chốt cả chữ n còn treo ở cuối
export function romaji(str, kata = false, final = false) {
  const s = String(str).replace(/’/g, "'"); // điện thoại hay tự đổi ' thành ’
  let out = '', i = 0;
  const conv = k => (kata ? toKata(k) : k);
  while (i < s.length) {
    const c = s[i].toLowerCase();
    if (c === '-') { out += 'ー'; i++; continue; }
    if (!/[a-z]/.test(c)) { out += s[i]; i++; continue; }
    const next = (s[i + 1] || '').toLowerCase();
    if (c === 'n') {
      if (next === 'n' || next === "'") { out += conv('ん'); i += 2; continue; }
      if (next ? !/[aiueoy]/.test(next) : final) { out += conv('ん'); i++; continue; }
    }
    const len = [4, 3, 2, 1].find(n => i + n <= s.length && Object.hasOwn(RM, s.slice(i, i + n).toLowerCase()));
    if (len) { out += conv(RM[s.slice(i, i + len).toLowerCase()]); i += len; continue; }
    if (c !== 'n' && /[bcdfghjkmpqrstvwz]/.test(c) && (next === c || (c === 't' && next === 'c'))) { out += conv('っ'); i++; continue; }
    out += s[i]; i++;
  }
  return out;
}

// bàn phím kana trên màn hình
export const KEYROWS = ['あいうえおはひふへほ', 'かきくけこまみむめも', 'さしすせそやゆよらり', 'たちつてとるれろわを', 'なにぬねのん'].map(r => [...r]);
const CYCLE = ['あぁ', 'いぃ', 'うぅゔ', 'えぇ', 'おぉ', 'かが', 'きぎ', 'くぐ', 'けげ', 'こご', 'さざ', 'しじ', 'すず', 'せぜ', 'そぞ', 'ただ', 'ちぢ', 'つっづ', 'てで', 'とど', 'はばぱ', 'ひびぴ', 'ふぶぷ', 'へべぺ', 'ほぼぽ', 'やゃ', 'ゆゅ', 'よょ', 'わゎ'];
// đổi chữ cuối: thêm ゛ ゜ hoặc thu nhỏ (か→が, は→ば→ぱ, つ→っ→づ)
export function modifyLast(str) {
  const last = str.slice(-1), h = toHira(last), set = CYCLE.find(c => c.includes(h));
  if (!set) return str;
  const nx = set[(set.indexOf(h) + 1) % set.length];
  return str.slice(0, -1) + (isKata(last) ? toKata(nx) : nx);
}

// ---------- bảng chữ ----------
// mỗi hàng của bảng năm mươi âm: [tên hàng, 5 ô a i u e o]; ô trống = ''
export const COLS = ['a', 'i', 'u', 'e', 'o'];
const grid = s => s.trim().split('\n').map(r => { const [name, ...c] = r.split(' '); return { name, cells: c.map(x => (x === '_' ? '' : x.split(':'))) }; });
export const BASIC = grid(`
– あ:a い:i う:u え:e お:o
k か:ka き:ki く:ku け:ke こ:ko
s さ:sa し:shi す:su せ:se そ:so
t た:ta ち:chi つ:tsu て:te と:to
n な:na に:ni ぬ:nu ね:ne の:no
h は:ha ひ:hi ふ:fu へ:he ほ:ho
m ま:ma み:mi む:mu め:me も:mo
y や:ya _ ゆ:yu _ よ:yo
r ら:ra り:ri る:ru れ:re ろ:ro
w わ:wa _ _ _ を:o
n ん:n _ _ _ _`);
export const DAKU = grid(`
g が:ga ぎ:gi ぐ:gu げ:ge ご:go
z ざ:za じ:ji ず:zu ぜ:ze ぞ:zo
d だ:da ぢ:ji づ:zu で:de ど:do
b ば:ba び:bi ぶ:bu べ:be ぼ:bo
p ぱ:pa ぴ:pi ぷ:pu ぺ:pe ぽ:po`);
export const YOON = grid(`
k きゃ:kya きゅ:kyu きょ:kyo
sh しゃ:sha しゅ:shu しょ:sho
ch ちゃ:cha ちゅ:chu ちょ:cho
n にゃ:nya にゅ:nyu にょ:nyo
h ひゃ:hya ひゅ:hyu ひょ:hyo
m みゃ:mya みゅ:myu みょ:myo
r りゃ:rya りゅ:ryu りょ:ryo
g ぎゃ:gya ぎゅ:gyu ぎょ:gyo
j じゃ:ja じゅ:ju じょ:jo
b びゃ:bya びゅ:byu びょ:byo
p ぴゃ:pya ぴゅ:pyu ぴょ:pyo`);
export const YCOLS = ['ya', 'yu', 'yo'];
export const EXT = [['ファ', 'fa', 'ファイル (file)'], ['フィ', 'fi', 'フィリピン (Philippines)'], ['フェ', 'fe', 'カフェ (quán cà phê)'], ['フォ', 'fo', 'フォー (phở)'],
  ['ティ', 'ti', 'パーティー (tiệc)'], ['ディ', 'di', 'ディズニー (Disney)'], ['トゥ', 'tu', 'タトゥー (hình xăm)'], ['ドゥ', 'du', 'ヒンドゥー (Hindu)'],
  ['ウィ', 'wi', 'ウィンドウ (cửa sổ)'], ['ウェ', 'we', 'ウェブ (web)'], ['ウォ', 'wo', 'ウォーター (water)'], ['ヴァ', 'va', 'ヴァイオリン (vĩ cầm)'],
  ['シェ', 'she', 'シェフ (đầu bếp)'], ['ジェ', 'je', 'ジェット (máy bay phản lực)'], ['チェ', 'che', 'チェック (kiểm tra)'], ['ツァ', 'tsa', 'モッツァレラ (phô mai mozzarella)']];

const ROWVI = {
  '–': '', k: '“c/k” tiếng Việt, không đọc thành “kh”', s: '“x” tiếng Việt', t: '“t” tiếng Việt, không phải “th”', n: '“n” tiếng Việt', h: '“h”', m: '“m” tiếng Việt',
  y: '“i” lướt nhanh sang nguyên âm, gần “da” giọng miền Nam', r: 'âm vỗ: đầu lưỡi búng nhẹ một lần, giữa “r”, “l” và “đ”', w: '',
  g: '“g” tiếng Việt', z: 'gần “d/gi” giọng Hà Nội', d: '“đ” tiếng Việt, nhẹ hơn', b: '“b” tiếng Việt', p: '“p” như trong “pin”',
};
const VOWVI = { a: 'a, miệng mở vừa, thả lỏng', i: 'i, môi kéo ngang nhẹ', u: 'giữa “ư” và “u”: môi gần như không tròn, KHÔNG chu môi', e: 'giữa “ê” và “e”', o: 'giữa “ô” và “o”, môi tròn nhẹ' };
const VIPA = { a: 'a', i: 'i', u: 'ɯ', e: 'e̞', o: 'o̞' };
// ghi chú riêng: [IPA, gần âm Việt]
const SPEC = {
  'し': ['ɕi', 'gần “shi” / “xi” miền Nam: mặt lưỡi áp rộng lên vòm. Là shi, không phải si'], 'ち': ['tɕi', 'gần “chi”. Là chi, không phải ti'],
  'つ': ['tsɯ', 'đặt lưỡi như “t” rồi xì hơi ra như “x”; tiếng Việt không có âm này. Là tsu'], 'ふ': ['ɸɯ', 'thổi nhẹ qua hai môi khép gần như thổi nến, răng không chạm môi. Là fu'],
  'ひ': ['çi', '“h” xát mạnh, gần “hi” kèm tiếng gió'], 'に': ['ɲi', 'gần “nhi” nhẹ'], 'わ': ['wa', 'gần “oa” với môi tròn rất nhẹ'],
  'を': ['o', 'đọc “o”; chỉ dùng làm trợ từ tân ngữ (gõ máy: wo)'], 'ん': ['m / n / ŋ / ɴ', 'âm mũi đứng một mình, trọn 1 mora; cách đọc đổi theo âm phía sau'],
  'は': ['ha', '“ha”; khi làm trợ từ chủ đề thì đọc “wa”'], 'へ': ['he̞', '“hê”; khi làm trợ từ chỉ hướng thì đọc “e”'],
  'じ': ['dʑi', 'gần “gi” Hà Nội, lưỡi áp rộng hơn, như “ji” tiếng Anh'], 'ぢ': ['dʑi', 'đọc giống hệt じ; chỉ gặp trong vài từ (はなぢ, ちぢむ). Gõ: di'],
  'ず': ['dzɯ', 'gần “dư” Hà Nội'], 'づ': ['dzɯ', 'đọc giống hệt ず; chỉ gặp trong vài từ (つづく). Gõ: du'],
};
const IPAC = { '–': '', k: 'k', s: 's', t: 't', n: 'n', h: 'h', m: 'm', y: 'j', r: 'ɾ', w: 'w', g: 'g', z: 'z', d: 'd', b: 'b', p: 'p' };
const EXH = {
  'あ': 'あさ (buổi sáng), あめ (mưa; kẹo)', 'い': 'いえ (nhà), いぬ (con chó)', 'う': 'うみ (biển), うえ (phía trên)', 'え': 'えき (nhà ga), え (bức tranh)', 'お': 'おと (âm thanh), あお (màu xanh)',
  'か': 'かさ (cái ô)', 'こ': 'こえ (giọng)', 'さ': 'さかな (cá)', 'す': 'すし (sushi)', 'ち': 'ちず (bản đồ)', 'つ': 'つくえ (cái bàn)', 'な': 'なつ (mùa hè)', 'ね': 'ねこ (mèo)',
  'は': 'はな (hoa; mũi)', 'ふ': 'ふね (thuyền)', 'ま': 'まど (cửa sổ)', 'も': 'もも (quả đào)', 'や': 'やま (núi)', 'ゆ': 'ゆき (tuyết)', 'ら': 'さくら (hoa anh đào)', 'り': 'りんご (quả táo)',
  'わ': 'わたし (tôi)', 'を': 'みずを (nước + trợ từ)', 'ん': 'ほん (sách), みかん (quýt)',
  'き': 'きって (con tem)', 'く': 'くち (miệng)', 'け': 'けさ (sáng nay)', 'し': 'しお (muối)', 'せ': 'せかい (thế giới)', 'そ': 'そら (bầu trời)', 'た': 'たまご (trứng)', 'て': 'て (tay)', 'と': 'とり (chim)',
  'に': 'にく (thịt)', 'ぬ': 'ぬの (vải)', 'の': 'のり (rong biển)', 'ひ': 'ひと (người)', 'へ': 'へや (căn phòng)', 'ほ': 'ほし (ngôi sao)', 'み': 'みず (nước)', 'む': 'むし (côn trùng)', 'め': 'め (mắt)',
  'よ': 'よる (buổi tối)', 'る': 'くるま (xe ô tô)', 'れ': 'これ (cái này)', 'ろ': 'しろ (màu trắng)',
  'が': 'がっこう (trường học)', 'ぎ': 'かぎ (chìa khóa)', 'ぐ': 'かぐ (đồ gỗ)', 'げ': 'げんき (khỏe)', 'ご': 'ごはん (cơm)', 'ざ': 'ざる (rổ)', 'じ': 'じかん (thời gian)', 'ず': 'ちず (bản đồ)', 'ぜ': 'かぜ (gió; cảm)', 'ぞ': 'ぞう (con voi)',
  'だ': 'だいがく (đại học)', 'ぢ': 'はなぢ (chảy máu cam)', 'づ': 'つづく (tiếp tục)', 'で': 'でんき (điện; đèn)', 'ど': 'まど (cửa sổ)', 'ば': 'ばか (ngốc)', 'び': 'えび (tôm)', 'ぶ': 'ぶた (con lợn)', 'べ': 'べんり (tiện lợi)', 'ぼ': 'ぼうし (cái mũ)',
  'ぱ': 'ぱくぱく (ăn ngấu nghiến)', 'ぴ': 'えんぴつ (bút chì)', 'ぷ': 'てんぷら (tempura)', 'ぺ': 'ぺこぺこ (đói meo)', 'ぽ': 'さんぽ (đi dạo)',
  'きゃ': 'きゃく (khách)', 'きゅ': 'きゅう (số chín)', 'きょ': 'きょう (hôm nay)', 'しゃ': 'しゃしん (ảnh)', 'しゅ': 'しゅみ (sở thích)', 'しょ': 'じしょ (từ điển)', 'ちゃ': 'おちゃ (trà)', 'ちゅ': 'ちゅうい (chú ý)', 'ちょ': 'ちょっと (một chút)',
  'にゃ': 'こんにゃく (khoai nưa)', 'にゅ': 'ぎゅうにゅう (sữa bò)', 'にょ': 'にょうぼう (vợ)', 'ひゃ': 'ひゃく (một trăm)', 'ひゅ': 'ひゅうひゅう (tiếng gió rít)', 'ひょ': 'ひょう (bảng biểu)',
  'みゃ': 'みゃく (mạch đập)', 'みゅ': 'ミュージック (âm nhạc)', 'みょ': 'みょうじ (họ)', 'りゃ': 'りゃく (viết tắt)', 'りゅ': 'りゅう (con rồng)', 'りょ': 'りょこう (du lịch)',
  'ぎゃ': 'ぎゃく (ngược lại)', 'ぎゅ': 'ぎゅうにく (thịt bò)', 'ぎょ': 'きんぎょ (cá vàng)', 'じゃ': 'じんじゃ (đền thờ)', 'じゅ': 'じゅう (số mười)', 'じょ': 'じょうず (giỏi)',
  'びゃ': 'さんびゃく (ba trăm)', 'びゅ': 'びゅうびゅう (tiếng gió mạnh)', 'びょ': 'びょういん (bệnh viện)', 'ぴゃ': 'ろっぴゃく (sáu trăm)', 'ぴゅ': 'コンピュータ (máy tính)', 'ぴょ': 'ぴょんぴょん (nhảy tưng tưng)',
};
const EXK = {
  'ア': 'アイス (kem)', 'イ': 'インク (mực)', 'ウ': 'ウール (len)', 'エ': 'エアコン (máy lạnh)', 'オ': 'オレンジ (cam)', 'カ': 'カメラ (máy ảnh)', 'キ': 'キロ (ki-lô)', 'ク': 'クリスマス (Giáng sinh)', 'ケ': 'ケーキ (bánh ngọt)', 'コ': 'コーヒー (cà phê)',
  'サ': 'サラダ (xà lách trộn)', 'シ': 'タクシー (taxi)', 'ス': 'スーパー (siêu thị)', 'セ': 'セーター (áo len)', 'ソ': 'ソファ (ghế sofa)', 'タ': 'タクシー (taxi)', 'チ': 'チーズ (phô mai)', 'ツ': 'ツアー (tour)', 'テ': 'テレビ (tivi)', 'ト': 'トマト (cà chua)',
  'ナ': 'ナイフ (con dao)', 'ニ': 'テニス (quần vợt)', 'ヌ': 'カヌー (ca nô)', 'ネ': 'ネクタイ (cà vạt)', 'ノ': 'ノート (vở)', 'ハ': 'ハノイ (Hà Nội)', 'ヒ': 'コーヒー (cà phê)', 'フ': 'ナイフ (con dao)', 'ヘ': 'ヘリ (trực thăng)', 'ホ': 'ホテル (khách sạn)',
  'マ': 'マスク (khẩu trang)', 'ミ': 'ミルク (sữa)', 'ム': 'ゲーム (trò chơi)', 'メ': 'メール (thư điện tử)', 'モ': 'メモ (ghi chú)', 'ヤ': 'タイヤ (lốp xe)', 'ユ': 'ユーモア (hài hước)', 'ヨ': 'ヨガ (yoga)',
  'ラ': 'ラブ (love)', 'リ': 'アメリカ (Mỹ)', 'ル': 'ビル (tòa nhà)', 'レ': 'トイレ (nhà vệ sinh)', 'ロ': 'ロボット (người máy)', 'ワ': 'ワイン (rượu vang)', 'ヲ': 'ít dùng', 'ン': 'パン (bánh mì)',
};
// các chữ dễ nhầm (Phần 4.3 và 9.4): [các chữ, cách phân biệt]
export const CONFUSE = {
  h: [['あ お', 'お có nét chấm nhỏ phía trên bên phải, nét ngang chỉ chạm vào bên trái'], ['ぬ め', 'ぬ có vòng xoắn nhỏ ở cuối nét; め không có'],
    ['ね れ わ', 'Nét cuối: ね xoắn vòng, れ hất lên, わ cong tròn vào trong'], ['る ろ', 'る có vòng xoắn ở cuối; ろ không có'], ['は ほ', 'ほ có thêm một nét ngang phía trên bên phải'],
    ['さ ち', 'Hai chữ đối xứng: さ nét cong mở sang trái, ち nét cong mở sang phải'], ['い こ り', 'い hai nét dọc; こ hai nét ngang; り hai nét dọc, nét phải dài hơn'], ['き さ', 'き có hai nét ngang; さ có một nét ngang']],
  k: [['シ ツ', 'シ: hai chấm xếp ngang bên trái, nét dài viết từ dưới hất lên. ツ: hai chấm xếp phía trên, nét dài viết từ trên xuống'],
    ['ソ ン', 'ソ: nét chấm ở trên, nét dài từ trên xuống. ン: nét chấm ở bên trái, nét dài từ dưới hất lên'], ['ク ケ タ', 'ケ có nét ngang kéo dài sang phải; タ có thêm nét chấm bên trong ク'],
    ['ウ ワ フ', 'ウ có nét chấm và hai nét dọc; ワ có một nét dọc bên trái; フ không có nét dọc'], ['ス ヌ', 'ヌ có thêm một nét chéo cắt qua'], ['チ テ', 'チ có nét phẩy ở trên và nét dọc cong; テ có hai nét ngang và nét dọc cong'],
    ['コ ユ ロ', 'コ mở bên trái; ユ nét ngang dưới kéo dài; ロ là hình vuông khép kín']],
};
const confusedWith = ch => [...CONFUSE.h, ...CONFUSE.k].filter(([s]) => s.split(' ').includes(ch));

export const LGROUPS = { all: 'Tất cả', hb: 'Hiragana cơ bản', hd: 'Hiragana đục / bán đục', hy: 'Hiragana âm ghép', kb: 'Katakana cơ bản', kd: 'Katakana đục / bán đục', ky: 'Katakana âm ghép', ke: 'Katakana mở rộng', cf: 'Chữ dễ nhầm' };
export const LETTERS = [];
const addL = (g, ch, rom, ipa, vi, other, ex) => LETTERS.push({ id: 'L' + ch, g, ch, rom, ipa, vi, other, ex, note: confusedWith(ch).map(([s, t]) => `${s.replace(/ /g, ' / ')}: ${t}`).join('. '), say: ch });
for (const [suf, rows] of [['b', BASIC], ['d', DAKU], ['y', YOON]]) {
  for (const r of rows) r.cells.forEach((cell, i) => {
    if (!cell) return;
    const [ch, rom] = cell, vow = suf === 'y' ? ['a', 'u', 'o'][i] : rom === 'n' ? '' : COLS[i];
    const rk = r.name;
    let ipa, vi;
    if (SPEC[ch]) [ipa, vi] = SPEC[ch];
    else if (suf === 'y') {
      ipa = rom.replace('sh', 'ɕ').replace('ch', 'tɕ').replace(/^j/, 'dʑ').replace('y', 'j').replace(/u$/, 'ɯ');
      vi = { sh: 'giống “sh” tiếng Anh', ch: 'gần “ch” tiếng Việt', j: 'gần “gia / giu / giô” Hà Nội', n: 'gần “nh” tiếng Việt', r: 'âm vỗ + “y” lướt: khó nhất nhóm này, luyện り → りゃ' }[rk] || `phụ âm “${rom[0]}” lướt qua “y” rồi sang ${vow}`;
      vi = `${vi}. Đọc lướt thành 1 mora`;
    } else {
      ipa = (IPAC[rk] ?? '') + VIPA[vow];
      vi = rk === '–' ? VOWVI[vow] : `${rom}: ${ROWVI[rk]}${vow === 'u' ? '; う đọc thả lỏng môi' : ''}`;
    }
    addL('h' + suf, ch, rom, ipa, vi, toKata(ch), EXH[ch] || '');
    addL('k' + suf, toKata(ch), rom, ipa, vi, ch, EXK[toKata(ch)] || '');
  });
}
for (const [ch, rom, ex] of EXT) addL('ke', ch, rom, rom, `âm vay mượn “${rom}”: chữ nhỏ ghép vào chữ trước, 1 mora`, '', ex);

// ---------- kho từ và câu ----------
// Mỗi mục: chữ viết | nghĩa  hoặc  chữ viết | cách đọc thực tế | nghĩa (nhiều cách đọc được chấp nhận: ngăn bằng /)
export const parse = s => s.split(/[;\n]/).map(x => x.trim()).filter(Boolean).map(x => {
  const a = x.split('|').map(y => y.trim());
  return a.length > 2 ? { w: a[0], p: a[1], vi: a[2] } : { w: a[0], p: '', vi: a[1] || '' };
});

export const NGROUPS = { all: 'Tất cả', va: 'Nguyên âm & âm cơ bản', dg: 'Âm đục / bán đục', yo: 'Âm ghép', ch: 'Trường âm', so: 'Âm ngắt っ', nn: 'Âm mũi ん', kt: 'Katakana', gt: 'Giao tiếp' };

// từ
export const WORDS = {
  va: parse(`あさ|buổi sáng;あめ|mưa, kẹo;いえ|nhà;いぬ|con chó;うみ|biển;うえ|phía trên;えき|nhà ga;おと|âm thanh;あお|màu xanh;あい|tình yêu;あおい|màu xanh lam;すし|sushi
かさ|cái ô;こえ|giọng nói;さかな|con cá;ちず|bản đồ;つくえ|cái bàn;なつ|mùa hè;ねこ|con mèo;はな|hoa, mũi;ふね|con thuyền;まど|cửa sổ;もも|quả đào;やま|núi;ゆき|tuyết;さくら|hoa anh đào;わたし|tôi;ひと|người;ひとり|một người;みず|nước`),
  dg: parse(`かぎ|chìa khóa;ざる|cái rổ;でんき|điện, đèn;ばか|ngốc;りんご|quả táo;ともだち|bạn bè;はなぢ|chảy máu cam;つづく|tiếp tục;ちぢむ|co lại;てがみ|lá thư;はなび|pháo hoa;おりがみ|nghệ thuật gấp giấy;ひとびと|mọi người;かぜ|gió, cảm cúm;ごはん|cơm;えんぴつ|bút chì`),
  yo: parse(`びょういん|bệnh viện;きょう|hôm nay;しゃしん|ảnh;おちゃ|trà;じしょ|từ điển;りょこう|du lịch;ぎゅうにゅう|sữa bò;ひゃく|một trăm;きゃく|khách;しゅみ|sở thích;じゅう|số mười;しゅっぱつ|xuất phát`),
  ch: parse(`おかあさん|mẹ;おばあさん|bà;おにいさん|anh trai;おいしい|ngon;くうき|không khí;すうがく|toán học;せんせい|せんせえ|giáo viên;えいが|ええが|phim;おねえさん|chị gái;とうきょう|とおきょお|Tokyo;おとうさん|おとおさん|bố;おおきい|to lớn;とおい|xa;ゆうき|dũng khí;こうこう|こおこお|trường cấp 3;おじいさん|ông;ありがとう|ありがとお|cảm ơn`),
  so: parse(`きって|con tem;さっか|nhà văn;おっと|người chồng;いった|đã đi, đã nói;がっこう|がっこお|trường học;ざっし|tạp chí;けっせき|vắng mặt;いっぱい|đầy, một cốc`),
  nn: parse(`にほん|Nhật Bản;さんぽ|đi dạo;しんぶん|tờ báo;はんたい|phản đối;おんな|phụ nữ;べんり|tiện lợi;げんき|khỏe mạnh;おんがく|âm nhạc;ぎんこう|ぎんこお|ngân hàng;ほん|quyển sách;でんわ|điện thoại;きんえん|cấm hút thuốc;みかん|quả quýt;こんな|như thế này;たんに|đơn giản là`),
  kt: parse(`コーヒー|cà phê;テレビ|tivi;パソコン|máy tính cá nhân;ホテル|khách sạn;コンビニ|cửa hàng tiện lợi;タクシー|taxi;アイスクリーム|kem;ベトナム|Việt Nam;ハノイ|Hà Nội;ホーチミン|Thành phố Hồ Chí Minh;フォー|phở;バインミー|bánh mì Việt;ビール|bia;ケーキ|bánh ngọt;スーパー|siêu thị;テスト|bài kiểm tra;ベッド|giường;バッグ|túi xách;クリスマス|Giáng sinh;ゴルフ|golf;コンピューター|máy tính;エレベーター|thang máy;ビデオ|video;スマホ|điện thoại thông minh;ファイル|tập tin;パーティー|bữa tiệc;ウェブ|web;チェック|kiểm tra`),
};
export const SENTS = {
  gt: parse(`こんにちは|こんにちわ|xin chào
こんばんは|こんばんわ|chào buổi tối
おはよう|おはよお|chào buổi sáng
ありがとうございます|ありがとおございます|xin cảm ơn
はじめまして。|rất hân hạnh được gặp bạn
わたしはベトナムじんです。|わたしわベトナムじんです|tôi là người Việt Nam
よろしくおねがいします。|rất mong được giúp đỡ
がっこうへいきます。|がっこおえいきます|tôi đi đến trường
これはなんですか。|これわなんですか|cái này là cái gì?
わたしはがくせいです。|わたしわがくせえです|tôi là sinh viên
みずをのみます。|みずおのみます|tôi uống nước
そうですか。|そおですか|ra vậy
いきましょう。|いきましょお|đi thôi`),
};

// nhóm âm gần giống: mỗi dòng một bộ, các từ trong bộ đọc KHÁC nhau
const sets = (g, text) => text.trim().split('\n').map(l => ({ g, ws: parse(l) }));
export const DISC = [
  ...sets('ch', `
おばさん|cô, dì;おばあさん|bà
おじさん|chú, bác;おじいさん|ông
ゆき|tuyết;ゆうき|dũng khí
ここ|ở đây;こうこう|trường cấp 3
え|bức tranh;ええ|vâng
ビル|tòa nhà;ビール|bia
とり|con chim;とおり|con đường
くき|thân cây;くうき|không khí`),
  ...sets('so', `
きて|hãy đến;きって|con tem
さか|con dốc;さっか|nhà văn
おと|âm thanh;おっと|chồng
いた|đã ở;いった|đã đi
まち|thị trấn;マッチ|que diêm
かこ|quá khứ;かっこ|dấu ngoặc`),
  ...sets('nn', `
きねん|kỷ niệm;きんえん|cấm hút thuốc
こな|bột;こんな|như thế này
たに|thung lũng;たんに|đơn giản là
かね|tiền;かんねん|quan niệm`),
  ...sets('dg', `
かき|quả hồng;かぎ|chìa khóa
さる|con khỉ;ざる|cái rổ
てんき|thời tiết;でんき|điện, đèn
はか|ngôi mộ;ばか|ngốc
パン|bánh mì;ばん|buổi tối
たいがく|nghỉ học;だいがく|đại học`),
  ...sets('yo', `
びょういん|bệnh viện;びよういん|thẩm mỹ viện
きょう|hôm nay;きよう|khéo tay
じゅう|số mười;じゆう|tự do
りゃく|viết tắt;りやく|lợi ích`),
  ...sets('va', `
すき|thích;すし|sushi
つき|mặt trăng;すき|thích
いえ|nhà;いい|tốt
うえ|phía trên;うお|con cá
ふね|con thuyền;ほね|xương`),
];
