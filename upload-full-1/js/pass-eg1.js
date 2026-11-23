import { add, SC, setCC } from './pass-kit.js';
setCC('eg');
// Ai Cập · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'eg-giza', 'Kim tự tháp Giza', 'Pyramids of Giza', 'Ba kim tự tháp lớn nhất của nhóm Giza do các vua Khufu, Khafre và Menkaure xây khoảng bốn thiên niên kỷ rưỡi trước; Đại Kim tự tháp của Khufu là công trình duy nhất còn lại trong Bảy kỳ quan thế giới cổ đại.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.tri(1, 5, 10, 8, 't'); d.tri(1, 5, 5, 8, 'u'); d.tri(8, 8, 8, 5, 'Y'); d.tri(8, 8, 4, 5, 't'); d.tri(0, 10, 4, 3, 'Y'); d.e(13, 2.5, 1.6, 1.6, 'y'); d.r(0, 13, 16, 3, 'o'); d.p('O', 4, 14, 11, 15); }, SC);
add(G, A, 'eg-sphinx', 'Nhân sư Giza', 'Great Sphinx of Giza', 'Tượng sư tử mình người đầu pharaoh khắc ngay từ khối đá vôi tại chỗ, canh gác lối vào khu kim tự tháp.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.e(11, 6, 2.6, 3, 't'); d.r(9, 4, 5, 2, 'b'); d.r(8, 6, 1, 3, 'b'); d.r(14, 6, 1, 3, 'b'); d.r(3, 9, 10, 4, 't'); d.r(1, 11, 5, 2, 'Y'); d.r(12, 9, 2, 4, 't'); d.p('k', 12, 6); d.p('r', 13, 8); d.tri(0, 8, 6, 3, 'u'); d.r(0, 13, 16, 3, 'o'); }, SC);
add(G, A, 'eg-karnak', 'Đền Karnak', 'Karnak Temple', 'Quần thể đền lớn nhất thế giới cổ đại ở Luxor, xây dựng và mở rộng trong hơn một nghìn năm, nổi tiếng với đại sảnh trụ cột khổng lồ.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'o'); d.r(0, 3, 16, 2, 't'); for (const x of [1, 4, 7, 10, 13]) { d.r(x, 5, 2, 8, 'e'); d.r(x, 5, 2, 1, 'W'); d.p('r', x, 8); d.p('b', x + 1, 10); } d.r(0, 3, 16, 1, 'Y'); d.p('w', 3, 1, 12, 1); }, SC);
add(G, A, 'eg-luxor', 'Đền Luxor', 'Luxor Temple', 'Ngôi đền sát bờ sông, đẹp nhất về đêm khi lên đèn, nối với Karnak bằng một đại lộ tượng nhân sư dài khoảng ba cây số.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'C'); d.r(2, 5, 4, 8, 'o'); d.r(10, 5, 4, 8, 'o'); d.r(6, 3, 4, 10, 't'); d.r(2, 5, 4, 1, 'u'); d.r(10, 5, 4, 1, 'u'); d.r(7, 8, 2, 5, 'k'); d.l(8, 3, 8, 0, 'N'); d.p('r', 8, 0, 9, 1); d.p('y', 3, 7, 12, 7, 7, 5, 9, 5); d.p('w', 1, 1, 14, 2); }, SC);
add(G, A, 'eg-valleykings', 'Thung lũng các vị vua', 'Valley of the Kings', 'Nơi chôn các pharaoh của Tân Vương quốc trong những hầm mộ khoét vào núi đá, trong đó có lăng mộ Tutankhamun.',
  d => { d.bg('c'); d.tri(0, 3, 16, 10, 'o'); d.tri(3, 3, 8, 6, 'O'); d.r(0, 13, 16, 3, 'u'); d.r(5, 10, 3, 3, 'k'); d.r(10, 11, 3, 2, 'k'); d.p('y', 6, 11, 11, 12); d.p('Y', 2, 14, 13, 15); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, A, 'eg-abusimbel', 'Abu Simbel', 'Abu Simbel', 'Hai ngôi đền đá của Ramesses II khoét vào vách núi ở phía nam gần biên giới Sudan, với bốn pho tượng ngồi cao hơn hai mươi mét ở mặt tiền.',
  d => { d.bg('c'); d.r(0, 0, 16, 16, 'c'); d.r(0, 13, 16, 3, 'C'); d.r(1, 2, 14, 11, 'o'); d.r(1, 2, 14, 1, 'O'); for (const x of [2, 5, 8, 11]) { d.e(x + 1, 5, 1.2, 1.4, 't'); d.r(x, 7, 3, 6, 't'); d.p('k', x + 1, 5); } d.r(6, 9, 4, 4, 'k'); d.p('r', 8, 3); d.p('Y', 1, 12, 14, 12); }, SC);
add(G, A, 'eg-philae', 'Đền Philae', 'Philae Temple', 'Đền thờ nữ thần Isis nằm trên một hòn đảo nhỏ ở Aswan, từng bị nước lũ nhấn chìm rồi được dời đi.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 10, 16, 1, 'b'); d.e(8, 11, 7, 2, 'u'); d.r(3, 5, 4, 6, 'e'); d.r(9, 6, 4, 5, 'e'); d.r(3, 5, 4, 1, 'W'); d.r(9, 6, 4, 1, 'W'); d.p('k', 4, 8, 10, 8); d.p('g', 7, 9, 13, 10); d.p('w', 2, 14, 12, 15); }, SC);
add(G, A, 'eg-hatshepsut', 'Đền Hatshepsut (Deir el-Bahari)', 'Hatshepsut\'s Temple (Deir el-Bahari)', 'Đền nhiều tầng bậc thang dựa vào vách đá ở bờ tây Luxor, dành cho nữ pharaoh Hatshepsut.',
  d => { d.bg('c'); d.tri(0, 0, 16, 7, 'o'); d.r(0, 6, 16, 10, 'o'); for (let i = 0; i < 3; i++) { d.r(1 + i * 0, 7 + i * 3, 14, 3, 'e'); d.r(1, 7 + i * 3, 14, 1, 'W'); for (let x = 2; x < 14; x += 2) d.p('t', x, 8 + i * 3, x, 9 + i * 3); } d.p('r', 7, 15, 9, 15); d.r(0, 15, 16, 1, 'u'); }, SC);
add(G, A, 'eg-edfu', 'Đền Edfu và Kom Ombo', 'Edfu and Kom Ombo temples', 'Hai ngôi đền thời Hy Lạp–La Mã dọc sông Nile, giữ được mái và tường khá nguyên vẹn.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.tri(1, 4, 5, 9, 't'); d.tri(10, 4, 5, 9, 't'); d.r(5, 8, 6, 5, 'e'); d.r(5, 8, 6, 1, 'W'); d.p('k', 7, 10, 8, 10, 3, 9, 12, 9); d.p('r', 3, 6, 12, 6); d.p('y', 8, 7); }, SC);
add(G, A, 'eg-gem', 'Bảo tàng Ai Cập Lớn', 'Grand Egyptian Museum', 'Bảo tàng khảo cổ khổng lồ cạnh khu Giza, trưng bày toàn bộ bộ sưu tập của Tutankhamun.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(1, 6, 14, 7, 'w'); d.r(1, 6, 14, 1, 'l'); for (let x = 2; x < 15; x += 2) d.r(x, 7, 1, 6, 'W'); d.tri(10, 1, 6, 5, 't'); d.tri(11, 3, 4, 3, 'u'); d.r(6, 10, 4, 3, 'k'); d.p('y', 3, 3, 4, 2); }, SC);
add(G, A, 'eg-cairomuseum', 'Bảo tàng Ai Cập ở Cairo (Tahrir)', 'Egyptian Museum, Cairo (Tahrir)', 'Bảo tàng cổ từ đầu thế kỷ hai mươi, giữ hàng trăm nghìn hiện vật.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 5, 14, 8, 'r'); d.r(1, 5, 14, 1, 'R'); d.r(1, 4, 14, 1, 'y'); for (const x of [3, 7, 11]) d.r(x, 7, 2, 4, 'u'); d.r(6, 10, 4, 3, 'N'); d.p('y', 8, 2, 7, 3, 9, 3); }, SC);
add(G, A, 'eg-citadel', 'Thành cổ Saladin (Cairo)', 'Citadel of Saladin (Cairo)', 'Pháo đài thế kỷ mười hai trên đồi Mokattam, ngày nay có nhà thờ Hồi giáo Muhammad Ali với mái vòm và hai tháp mảnh.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.e(8, 8, 4, 4, 'a'); d.e(8, 7.4, 3.4, 3, 'l'); d.p('A', 8, 3); d.l(8, 3, 8, 1, 'y'); d.r(3, 3, 1, 10, 'W'); d.r(12, 3, 1, 10, 'W'); d.p('y', 3, 2, 12, 2); d.r(4, 9, 8, 4, 'e'); d.p('k', 6, 11, 9, 11); d.p('A', 5, 6, 10, 6); }, SC);
add(G, A, 'eg-khan', 'Chợ Khan el-Khalili', 'Khan el-Khalili bazaar', 'Khu chợ có từ thế kỷ mười bốn ở Cairo Cổ, bán đèn đồng, nước hoa, gia vị và đồ lưu niệm.',
  d => { d.bg('o'); d.r(0, 13, 16, 3, 'N'); d.r(0, 0, 16, 3, 'R'); for (let x = 0; x < 16; x += 4) d.r(x, 0, 2, 3, 'y'); for (const [x, c] of [[1, 'r'], [6, 'g'], [11, 'v']]) { d.r(x, 8, 4, 5, c); d.r(x, 8, 4, 1, 'w'); } d.p('y', 3, 5, 8, 5, 13, 5); d.l(3, 3, 3, 5, 'Y'); d.l(8, 3, 8, 5, 'Y'); d.l(13, 3, 13, 5, 'Y'); d.e(3, 5, 1.4, 1.6, 'y'); d.e(8, 5, 1.4, 1.6, 'o'); }, SC);
add(G, A, 'eg-bibalex', 'Thư viện Alexandria', 'Bibliotheca Alexandrina', 'Thư viện hiện đại ở Alexandria, dựng để nhớ về thư viện cổ lừng danh của thời Hy Lạp.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.e(8, 12, 7, 6, 'a'); d.e(8, 12, 7, 6, 'A'); d.r(0, 12, 16, 4, 'C'); d.fan(8, 12, 7, 'a'); d.fan(8, 12, 6, 'l'); d.p('A', 4, 8, 8, 6, 12, 8, 7, 9, 10, 9, 5, 10, 11, 10); d.p('w', 3, 14, 10, 15); d.r(7, 0, 2, 3, 'a'); }, SC);
add(G, A, 'eg-stcatherine', 'Tu viện Thánh Catherine', 'Saint Catherine\'s Monastery', 'Tu viện Chính thống giáo dưới chân núi Sinai, một trong những tu viện còn hoạt động lâu đời nhất thế giới.',
  d => { d.bg('c'); d.tri(0, 2, 16, 11, 'N'); d.tri(3, 4, 10, 9, 'n'); d.r(0, 13, 16, 3, 'u'); d.r(4, 9, 8, 4, 'W'); d.r(4, 9, 8, 1, 'e'); d.r(7, 6, 2, 3, 'W'); d.p('y', 8, 4); d.p('r', 8, 5); d.p('k', 6, 11, 9, 11); d.r(8, 4, 1, 3, 'y'); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'eg-seasons', 'Ba mùa của người Ai Cập cổ', 'The three seasons of ancient Egypt', 'Akhet là mùa lũ, Peret là mùa gieo trồng và Shemu là mùa gặt; cả cuộc sống nông dân xoay quanh nhịp của dòng sông.',
  d => { d.bg('u'); d.r(0, 0, 16, 5, 'C'); d.r(0, 5, 16, 5, 'g'); d.r(0, 10, 16, 6, 'y'); d.p('w', 2, 2, 7, 3, 12, 2); for (const x of [2, 6, 10, 13]) { d.l(x, 9, x, 6, 'G'); } for (const x of [2, 5, 9, 13]) { d.l(x, 15, x, 12, 'Y'); d.p('o', x, 11); } d.r(0, 5, 16, 1, 'G'); d.r(0, 10, 16, 1, 'O'); }, SC);
add(G, B, 'eg-climate', 'Mùa hè nóng và mùa đông dễ chịu', 'Hot summers and mild winters', 'Mùa hè nhiều nơi trên 35 độ C, mùa đông từ tháng mười một đến tháng hai là lúc đông khách du lịch nhất.',
  d => { d.bg('c'); d.e(5, 5, 3.4, 3.4, 'y'); d.e(5, 5, 2.4, 2.4, 'o'); d.l(5, 0, 5, 1, 'y'); d.l(10, 5, 11, 5, 'y'); d.r(0, 11, 16, 5, 'u'); d.r(9, 4, 2, 9, 'r'); d.r(9, 11, 2, 1, 'R'); d.e(10, 12, 2, 2, 'r'); d.p('w', 9, 6, 10, 8, 9, 10); d.p('o', 2, 13, 13, 14); }, SC);
add(G, B, 'eg-khamsin', 'Gió khamsin', 'Khamsin wind', 'Gió nóng khô thổi từ sa mạc vào cuối mùa xuân, mang theo cát bụi và làm trời đục vàng.',
  d => { d.bg('Y'); d.r(0, 0, 16, 6, 'u'); d.r(0, 11, 16, 5, 'O'); for (const y of [3, 6, 9]) { d.l(0, y, 8, y, 'e'); d.p('e', 9, y - 1, 10, y - 2); } d.e(12, 3, 2, 2, 'o'); d.tri(1, 8, 6, 4, 'o'); d.p('N', 2, 12, 9, 13, 13, 12); }, SC);
add(G, B, 'eg-lotus', 'Hoa sen xanh và cói papyrus', 'Blue lotus and papyrus', 'Hai loài cây mọc ven sông gắn với tranh tường cổ, cói được dùng làm giấy từ rất sớm.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.l(4, 15, 4, 5, 'G'); d.l(3, 5, 5, 5, 'g'); d.p('g', 2, 4, 4, 3, 6, 4, 3, 3, 5, 3); d.l(11, 15, 11, 8, 'G'); d.e(11, 7, 2.6, 2.4, 'b'); d.e(11, 7, 1.2, 1.8, 'l'); d.p('y', 11, 8); d.p('B', 9, 7, 13, 7); d.e(8, 12, 2, 0.8, 'g'); }, SC);
add(G, B, 'eg-date', 'Chà là và vườn cọ', 'Date palms', 'Cây chà là phủ xanh những ốc đảo và bờ sông, cho trái ngọt ăn quanh năm.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.l(8, 14, 8, 5, 'N'); d.l(9, 14, 9, 5, 'n'); d.l(8, 5, 3, 3, 'G'); d.l(8, 5, 13, 3, 'G'); d.l(8, 5, 4, 7, 'g'); d.l(8, 5, 12, 7, 'g'); d.l(8, 5, 8, 1, 'G'); d.p('n', 7, 6, 9, 6, 8, 7); d.e(2, 12, 1.6, 1.4, 'G'); d.p('o', 3, 13, 13, 13); }, SC);
add(G, B, 'eg-cotton', 'Bông Ai Cập', 'Egyptian cotton', 'Bông sợi dài nổi tiếng thế giới, trồng nhiều ở châu thổ sông Nile.',
  d => { d.bg('h'); d.r(0, 13, 16, 3, 'G'); for (const x of [3, 8, 13]) { d.l(x, 15, x, 8, 'G'); d.e(x, 6, 2.4, 2.4, 'w'); d.e(x - 1, 7, 1.6, 1.6, 'w'); d.e(x + 1, 7, 1.6, 1.6, 'w'); d.p('l', x, 6); d.p('g', x - 1, 9, x + 1, 9); } d.p('w', 1, 2, 14, 3); }, SC);
add(G, B, 'eg-redsea', 'Biển Đỏ', 'Red Sea', 'Vùng biển với rạn san hô sặc sỡ ở Hurghada, Marsa Alam và Sharm el-Sheikh, nổi tiếng với lặn biển.',
  d => { d.bg('C'); d.r(0, 0, 16, 4, 'c'); d.r(0, 4, 16, 1, 'w'); d.e(4, 12, 3, 3, 'p'); d.e(10, 12, 3.4, 3, 'o'); d.e(7, 14, 3, 2, 'r'); d.e(8, 9, 2.4, 1.2, 'y'); d.tri(10, 8, 3, 2, 'y'); d.p('k', 6, 9); d.p('w', 1, 8, 14, 7, 12, 6); d.p('g', 2, 15, 13, 15); }, SC);
add(G, B, 'eg-nasser', 'Hồ Nasser', 'Lake Nasser', 'Hồ nhân tạo khổng lồ phía sau đập Aswan, một trong những hồ chứa lớn nhất thế giới.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'b'); d.r(0, 5, 16, 3, 'u'); d.tri(0, 4, 6, 4, 'o'); d.tri(10, 5, 6, 3, 'o'); d.r(5, 6, 6, 2, 'a'); d.p('w', 3, 12, 10, 14, 13, 11); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);

// ----- Vùng miền -----
add(G, C, 'eg-cairogiza', 'Cairo và Giza', 'Cairo and Giza', 'Thủ đô đông đúc nhất khu vực, ôm lấy cả khu kim tự tháp ở rìa phía tây.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'o'); d.r(0, 8, 4, 5, 'e'); d.r(4, 6, 3, 7, 'W'); d.r(7, 9, 3, 4, 'e'); d.tri(9, 4, 7, 9, 't'); d.l(5, 6, 5, 3, 'a'); d.p('y', 1, 9, 5, 8, 8, 10, 12, 10); d.p('w', 2, 3, 13, 2); }, SC);
add(G, C, 'eg-alexandria', 'Alexandria và bờ Địa Trung Hải', 'Alexandria and the Mediterranean coast', 'Thành phố cảng do Alexander Đại đế lập nên, mang phong vị châu Âu hơn Cairo.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'b'); d.r(1, 5, 5, 4, 'e'); d.r(8, 4, 4, 5, 'W'); d.r(12, 7, 3, 2, 'e'); d.l(10, 4, 10, 1, 'a'); d.p('y', 10, 0); d.p('k', 2, 6, 9, 6); d.p('w', 3, 13, 11, 14); d.p('r', 13, 12); }, SC);
add(G, C, 'eg-delta', 'Châu thổ sông Nile (Hạ Ai Cập)', 'Nile Delta (Lower Egypt)', 'Vùng đồng bằng phì nhiêu ở phía bắc, nơi sông tỏa ra thành nhiều nhánh trước khi đổ ra biển.',
  d => { d.bg('g'); d.r(0, 13, 16, 3, 'C'); d.l(8, 0, 8, 6, 'C'); d.l(8, 6, 3, 12, 'C'); d.l(8, 6, 8, 12, 'C'); d.l(8, 6, 13, 12, 'C'); d.l(8, 3, 11, 5, 'c'); for (let y = 2; y < 13; y += 3) for (let x = 0; x < 16; x += 4) d.p('h', x + (y % 2), y); d.r(0, 13, 16, 1, 'c'); }, SC);
add(G, C, 'eg-upper', 'Thượng Ai Cập (Luxor, Aswan)', 'Upper Egypt (Luxor, Aswan)', 'Vùng phía nam dọc sông, tập trung các đền và lăng mộ cổ; đặt tên là "thượng" vì nằm ở thượng nguồn.',
  d => { d.bg('c'); d.r(0, 0, 16, 3, 'u'); d.r(0, 10, 16, 6, 'o'); d.l(8, 0, 8, 15, 'C'); d.l(7, 0, 7, 15, 'b'); d.r(1, 5, 4, 5, 'e'); d.r(11, 6, 4, 4, 'e'); d.r(1, 5, 4, 1, 'W'); d.r(11, 6, 4, 1, 'W'); d.p('G', 5, 12, 12, 13, 3, 14); d.p('y', 14, 2); }, SC);
add(G, C, 'eg-nubia', 'Nubia', 'Nubia', 'Vùng quanh Aswan với người Nubia có văn hóa và tiếng nói riêng, nhà sơn màu rực rỡ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(0, 10, 16, 3, 'u'); d.e(3, 9, 3, 3, 'b'); d.r(0, 9, 6, 4, 'b'); d.e(10, 9, 3.4, 3.4, 'y'); d.r(7, 9, 7, 4, 'y'); d.e(6, 6, 2, 2, 'o'); d.r(4, 6, 4, 3, 'o'); d.p('k', 2, 11, 10, 11); d.p('r', 3, 10, 11, 10, 12, 12); d.p('w', 1, 14, 11, 14); }, SC);
add(G, C, 'eg-sinai', 'Bán đảo Sinai', 'Sinai Peninsula', 'Nơi có núi Sinai, những khu nghỉ dưỡng ven biển và các tu viện cổ.',
  d => { d.bg('c'); d.tri(0, 3, 12, 10, 'N'); d.tri(4, 1, 8, 9, 'n'); d.tri(5, 3, 4, 4, 'o'); d.r(0, 13, 16, 3, 'C'); d.r(0, 12, 16, 1, 'u'); d.p('w', 2, 14, 10, 15); d.p('y', 14, 2); d.e(14, 2, 1.2, 1.2, 'y'); }, SC);
add(G, C, 'eg-westdesert', 'Sa mạc Tây (Western Desert)', 'Western Desert', 'Chiếm phần lớn diện tích đất nước, với các ốc đảo như Siwa, Bahariya và Farafra.',
  d => { d.bg('c'); d.e(4, 14, 9, 5, 'u'); d.e(12, 15, 9, 5, 'o'); d.l(0, 13, 6, 9, 'O'); d.l(7, 12, 12, 9, 'O'); d.e(13, 3, 1.6, 1.6, 'y'); d.l(8, 14, 8, 10, 'N'); d.e(8, 9, 2.2, 1.6, 'G'); d.e(8, 11, 3, 1, 'C'); d.p('w', 3, 3, 9, 2); }, SC);
add(G, C, 'eg-fayoum', 'Fayoum', 'Fayoum', 'Vùng ốc đảo màu mỡ có hồ Qarun, cách Cairo không xa, nổi tiếng với những bánh xe nước cổ.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'g'); d.r(0, 8, 16, 3, 'C'); d.e(5, 7, 4, 4, 'N'); d.e(5, 7, 3, 3, 'n'); d.e(5, 7, 1, 1, 'N'); for (let a = 0; a < 8; a++) { const t = a * 0.785; d.p('N', 5 + Math.cos(t) * 3.6, 7 + Math.sin(t) * 3.6); } d.p('G', 11, 5, 13, 6, 12, 8); d.p('h', 2, 13, 9, 14, 14, 12); }, SC);
add(G, C, 'eg-redseacoast', 'Bờ Biển Đỏ', 'Red Sea coast', 'Dải ven biển nghỉ dưỡng từ Hurghada xuống Marsa Alam.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'c'); d.r(0, 5, 16, 3, 'u'); d.tri(0, 3, 5, 3, 'o'); d.tri(10, 4, 6, 2, 'o'); d.fan(8, 11, 3, 'r'); d.l(8, 11, 8, 14, 'N'); d.e(13, 2, 1.4, 1.4, 'y'); d.p('w', 3, 12, 12, 13, 6, 14); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'eg-nileflow', 'Sông Nile chảy ngược lên phía bắc', 'The Nile flows north', 'Khác với phần lớn các dòng sông khác, Nile chảy từ nam lên bắc rồi đổ vào Địa Trung Hải.',
  d => { d.bg('u'); d.r(0, 0, 16, 16, 'u'); d.r(6, 0, 4, 16, 'C'); d.r(6, 0, 1, 16, 'b'); d.l(8, 14, 8, 3, 'w'); d.l(8, 3, 6, 5, 'w'); d.l(8, 3, 10, 5, 'w'); d.p('G', 3, 4, 12, 9, 3, 12, 13, 13); d.p('r', 8, 1); }, SC);
add(G, E, 'eg-flood', 'Lũ sông Nile', 'The Nile flood', 'Hàng năm nước dâng bồi phù sa cho ruộng đồng, cho đến khi đập cao Aswan hoàn thành năm 1970 thì không còn lũ tự nhiên.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'b'); d.r(1, 5, 4, 3, 'n'); d.r(11, 4, 4, 4, 'N'); d.tri(0, 3, 6, 2, 'N'); d.l(2, 11, 6, 10, 'c'); d.l(8, 12, 13, 11, 'c'); d.p('n', 7, 13, 3, 14, 12, 14); d.e(8, 3, 1.4, 1.4, 'y'); }, SC);
add(G, E, 'eg-abusimbelsun', 'Ánh mặt trời ở Abu Simbel', 'Sunrise at Abu Simbel', 'Hai ngày mỗi năm, vào cuối tháng hai và cuối tháng mười, ánh bình minh xuyên suốt hành lang dài và chiếu vào các tượng trong gian trong cùng của đền.',
  d => { d.bg('k'); d.r(0, 0, 16, 16, 'k'); d.r(2, 3, 12, 10, 'N'); d.r(5, 5, 6, 7, 'k'); d.l(15, 8, 8, 8, 'y'); d.l(15, 7, 8, 8, 'u'); d.l(15, 9, 8, 8, 'u'); d.e(8, 8, 1.6, 2, 'y'); d.p('Y', 6, 7, 10, 7); d.e(14, 8, 2, 2, 'o'); }, SC);
add(G, E, 'eg-whitedesert', 'Sa mạc Trắng (White Desert)', 'White Desert', 'Cảnh quan những khối đá phấn trắng bị gió mài thành hình nấm, hình thú, đẹp nhất lúc hoàng hôn.',
  d => { d.bg('p'); d.r(0, 0, 16, 5, 'o'); d.r(0, 12, 16, 4, 'e'); d.e(4, 10, 2.4, 3, 'w'); d.r(3, 12, 2, 2, 'w'); d.e(10, 9, 3, 2.4, 'w'); d.r(9, 11, 2, 3, 'w'); d.e(14, 11, 1.6, 2, 'l'); d.p('l', 3, 8, 9, 7); d.e(13, 3, 1.6, 1.6, 'y'); }, SC);
add(G, E, 'eg-whales', 'Thung lũng Cá voi (Wadi Al-Hitan)', 'Whale Valley (Wadi Al-Hitan)', 'Nơi tìm thấy hóa thạch cá voi cổ chưa có chân sau, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) công nhận là di sản.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'o'); d.e(8, 10, 6, 2, 'e'); for (let x = 3; x < 13; x += 2) d.l(x, 9, x, 11, 'w'); d.e(3, 10, 2.4, 1.6, 'e'); d.p('k', 2, 9); d.l(12, 10, 15, 8, 'e'); d.l(12, 11, 15, 12, 'e'); d.p('W', 6, 9, 9, 9); d.p('w', 2, 3, 12, 4); }, SC);
add(G, E, 'eg-suez', 'Kênh đào Suez', 'Suez Canal', 'Tuyến đường thủy khánh thành năm 1869, nối Địa Trung Hải với Biển Đỏ và rút ngắn đường biển giữa châu Âu và châu Á.',
  d => { d.bg('u'); d.r(0, 0, 16, 16, 'u'); d.r(0, 7, 16, 3, 'C'); d.r(0, 7, 16, 1, 'b'); d.r(4, 3, 8, 4, 'a'); d.r(6, 2, 4, 2, 'r'); d.r(3, 6, 10, 2, 'k'); d.p('w', 5, 4, 9, 4); d.p('o', 2, 13, 12, 14); d.p('Y', 0, 11, 15, 12); }, SC);
add(G, E, 'eg-siwa', 'Ốc đảo Siwa', 'Siwa Oasis', 'Ốc đảo xa xôi với suối nước, rừng chà là và ruộng muối, nơi người dân giữ phong tục và tiếng nói riêng.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.e(8, 12, 4, 2, 'C'); d.e(8, 12, 3, 1.2, 'c'); d.l(3, 11, 3, 5, 'N'); d.p('G', 1, 4, 5, 4, 2, 3, 4, 3, 3, 2); d.l(13, 11, 13, 6, 'N'); d.p('G', 11, 5, 15, 5, 12, 4, 14, 4, 13, 3); d.r(6, 7, 4, 3, 'e'); d.p('k', 8, 9); }, SC);
