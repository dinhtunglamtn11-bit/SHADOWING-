import { add, SC, setCC } from './pass-kit.js';
setCC('in');
// Ấn Độ · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const dancer = (d, bg, top, bot) => { d.bg(bg); d.e(8, 3, 1.8, 1.8, 's'); d.p('k', 7, 3, 9, 3); d.r(6, 5, 4, 4, top); d.l(6, 6, 3, 4, 's'); d.l(10, 6, 13, 3, 's'); d.tri(4, 9, 8, 6, bot); d.r(6, 15, 1, 1, 's'); d.r(9, 15, 1, 1, 's'); };

// ----- Lễ hội -----
add(G, A, 'in-diwali', 'Diwali', 'Diwali', 'Lễ hội ánh sáng cuối mùa thu, thắp đèn diya, bắn pháo hoa và tặng kẹo, biểu tượng ánh sáng chiến thắng bóng tối.',
  d => { d.bg('B'); for (const x of [2, 6, 10, 14]) { d.e(x, 13, 1.8, 1, 'o'); d.p('y', x, 12); d.p('r', x, 11); } d.p('y', 3, 3, 8, 2, 12, 4, 6, 6, 11, 8); d.p('w', 3, 2, 3, 4, 2, 3, 4, 3); d.p('o', 8, 1, 8, 3, 7, 2, 9, 2); d.p('p', 12, 3, 12, 5, 11, 4, 13, 4); }, SC);
add(G, A, 'in-holi', 'Holi', 'Holi', 'Lễ hội màu sắc đầu xuân, mọi người tung bột màu lên nhau và gác lại mâu thuẫn.',
  d => { d.bg('w'); d.e(4, 4, 3, 3, 'p'); d.e(11, 3, 3, 3, 'c'); d.e(8, 9, 4, 4, 'y'); d.e(3, 11, 3, 3, 'g'); d.e(13, 11, 3, 3, 'v'); d.e(8, 9, 2, 2, 'o'); d.p('r', 6, 6, 10, 5, 2, 8, 14, 8, 8, 14); d.p('b', 5, 13, 11, 12, 12, 6); }, SC);
add(G, A, 'in-navratri', 'Navratri và Durga Puja', 'Navratri and Durga Puja', 'Chín đêm tôn vinh nữ thần, ở Gujarat có múa garba, ở Kolkata có những pandal lộng lẫy.',
  d => { d.bg('R'); d.r(0, 13, 16, 3, 'N'); d.tri(3, 1, 10, 5, 'y'); d.r(3, 6, 10, 7, 'o'); d.e(8, 8, 2, 2, 's'); d.l(6, 8, 3, 6, 'r'); d.l(10, 8, 13, 6, 'r'); d.l(6, 9, 3, 11, 'r'); d.l(10, 9, 13, 11, 'r'); d.p('y', 8, 5, 5, 5, 11, 5); d.r(5, 10, 6, 3, 'p'); }, SC);
add(G, A, 'in-ganesh', 'Ganesh Chaturthi', 'Ganesh Chaturthi', 'Lễ rước tượng thần đầu voi Ganesha, đặc biệt lớn ở Mumbai, kết thúc bằng việc thả tượng xuống biển.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(8, 7, 4, 3.4, 'a'); d.e(4, 6, 2, 2.4, 'a'); d.e(12, 6, 2, 2.4, 'a'); d.l(8, 8, 8, 13, 'a'); d.p('k', 6, 6, 10, 6); d.p('y', 5, 2, 8, 3, 11, 2); d.r(5, 4, 6, 1, 'y'); d.p('w', 3, 14, 12, 14); d.p('r', 8, 10); }, SC);
add(G, A, 'in-pongal', 'Pongal và Onam', 'Pongal and Onam', 'Lễ hội mùa gặt ở Tamil Nadu và Kerala.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.e(8, 10, 4, 3, 'R'); d.r(4, 7, 8, 1, 'R'); d.p('w', 6, 6, 8, 5, 10, 6, 7, 3, 9, 3); d.l(1, 12, 1, 6, 'g'); d.l(15, 12, 15, 6, 'g'); d.p('y', 1, 5, 15, 5); d.e(8, 2, 1.8, 1.8, 'y'); d.p('r', 5, 13, 11, 13); }, SC);
add(G, A, 'in-eidfest', 'Eid', 'Eid', 'Lễ mừng kết thúc tháng Ramadan, có nhiều người Hồi giáo ở Ấn Độ.',
  d => { d.bg('B'); d.e(8, 4, 3, 3, 'y'); d.e(9, 4, 2.4, 2.4, 'B'); d.p('y', 12, 3, 13, 4, 12, 5); d.r(3, 9, 10, 7, 'w'); d.e(8, 8, 3, 2.6, 'w'); d.p('y', 8, 5); d.r(7, 12, 2, 4, 'g'); d.r(1, 8, 2, 8, 'W'); d.r(13, 8, 2, 8, 'W'); }, SC);
add(G, A, 'in-baisakhi', 'Baisakhi', 'Baisakhi', 'Lễ hội mùa gặt đầu năm của Punjab, có ý nghĩa lớn với người Sikh.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'y'); for (const x of [2, 5, 8, 11, 14]) { d.l(x, 15, x, 8, 'Y'); d.e(x, 7, 1, 1.8, 'y'); } d.e(12, 2, 2, 2, 'o'); d.r(0, 14, 16, 2, 'n'); d.p('o', 3, 4, 8, 3); }, SC);
add(G, A, 'in-kumbhfest', 'Kumbh Mela', 'Kumbh Mela', 'Lễ tắm thánh quy mô cực lớn luân phiên tại bốn địa điểm bên sông.',
  d => { d.bg('o'); d.e(8, 5, 2.4, 3, 'y'); d.r(7, 2, 2, 1, 'Y'); d.r(0, 10, 16, 6, 'C'); d.e(8, 11, 2, 1.2, 'n'); d.p('y', 1, 12, 5, 13, 11, 13, 14, 12); for (const x of [2, 5, 9, 12]) d.p('r', x, 9); d.p('w', 3, 15, 10, 15); }, SC);
add(G, A, 'in-republicday', 'Ngày Cộng hòa 26/1', 'Republic Day (26 January)', 'Lễ duyệt binh và đoàn xe diễu hành ở Delhi.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(0, 2, 16, 3, '#ff9933'); d.r(0, 5, 16, 3, 'w'); d.r(0, 8, 16, 3, '#138808'); d.e(8, 6, 1.6, 1.6, 'B'); d.p('B', 8, 4, 8, 8, 6, 6, 10, 6); for (const x of [1, 5, 9, 13]) { d.r(x, 12, 2, 1, 'G'); d.p('s', x, 11); } }, SC);
add(G, A, 'in-pushkar', 'Pushkar Camel Fair', 'Pushkar Camel Fair', 'Hội chợ lạc đà ở Rajasthan với buổi biểu diễn, đua và mua bán.',
  d => { d.bg('c'); d.e(12, 2, 2, 2, 'y'); d.r(0, 11, 16, 5, 'u'); d.e(5, 8, 3.4, 2.4, 'n'); d.l(8, 7, 10, 3, 'n'); d.e(10, 3, 1.4, 1, 'n'); d.r(3, 10, 1, 4, 'n'); d.r(6, 10, 1, 4, 'n'); d.p('r', 4, 6, 6, 6); d.p('v', 5, 5); d.p('w', 12, 8); d.p('o', 13, 10, 14, 12); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'in-sitar', 'Sitar', 'Sitar', 'Đàn dây dài có cần và dây cộng hưởng, biểu tượng của nhạc cổ điển Bắc Ấn, ra thế giới nhờ Ravi Shankar.',
  d => { d.bg('e'); d.e(5, 11, 4.4, 4, 'o'); d.e(5, 11, 3, 2.8, 'O'); d.l(7, 9, 13, 3, 'n'); d.l(8, 9, 14, 3, 'N'); d.e(13, 2, 1.8, 1.8, 'n'); d.p('y', 4, 10, 6, 12, 9, 8, 11, 6); d.p('w', 4, 11); d.p('r', 14, 3); }, H);
add(G, B, 'in-tabla', 'Tabla', 'Tabla', 'Cặp trống nhỏ đệm nhịp, chơi bằng đầu ngón và bàn tay.',
  d => { d.bg('e'); d.e(5, 8, 4, 5, 'n'); d.e(11, 10, 4, 4, 'N'); d.e(5, 4, 3.4, 1.4, 'w'); d.e(11, 6, 3.2, 1.4, 'w'); d.e(5, 4, 1.8, 0.8, 'k'); d.e(11, 6, 1.6, 0.8, 'k'); d.p('t', 3, 8, 7, 9, 9, 10, 13, 11); d.p('r', 5, 13, 11, 14); }, H);
add(G, B, 'in-tanpura', 'Tanpura', 'Tanpura', 'Đàn dây tạo nền âm liên tục, giúp người biểu diễn giữ cao độ.',
  d => { d.bg('e'); d.e(8, 11, 5, 4.4, 'R'); d.e(8, 11, 3.6, 3, 'r'); d.r(7, 1, 2, 7, 'n'); d.r(6, 1, 4, 1, 'N'); for (const x of [7, 8]) d.l(x, 2, x, 13, 'w'); d.e(8, 11, 1.2, 1.2, 'k'); d.p('y', 6, 3, 9, 4); }, H);
add(G, B, 'in-bansuri', 'Bansuri', 'Bansuri', 'Sáo tre ngang, gắn với thần Krishna.',
  d => { d.bg('e'); d.l(1, 12, 14, 4, 'y'); d.l(1, 13, 14, 5, 'Y'); d.p('k', 5, 10, 7, 9, 9, 8, 11, 6); d.p('r', 1, 12, 14, 4); d.p('b', 3, 3, 5, 2); d.p('w', 12, 2, 14, 1); }, H);
add(G, B, 'in-veena', 'Veena', 'Veena', 'Đàn dây cổ truyền thống, gắn với nữ thần Saraswati.',
  d => { d.bg('e'); d.e(4, 12, 3.4, 3, 'n'); d.e(12, 4, 2.4, 2, 'n'); d.l(5, 11, 11, 5, 'N'); d.l(6, 11, 12, 5, 'N'); d.p('y', 3, 12, 4, 11, 13, 3); d.p('w', 7, 9, 9, 7); d.e(12, 4, 1, 1, 'r'); }, H);
add(G, B, 'in-sarod', 'Sarod', 'Sarod', 'Đàn dây không phím có âm sâu và đặc trưng.',
  d => { d.bg('e'); d.e(6, 11, 4.4, 4, 'n'); d.e(6, 11, 3, 2.8, 'a'); d.r(9, 3, 3, 6, 'a'); d.l(10, 2, 10, 9, 'A'); d.r(8, 1, 5, 2, 'N'); d.p('w', 5, 11, 7, 11); d.p('y', 9, 1, 11, 1); d.p('k', 6, 12); }, H);
add(G, B, 'in-harmonium', 'Harmonium', 'Harmonium', 'Đàn ông xếp du nhập từ phương Tây, nay rất phổ biến trong nhạc sùng đạo và nhạc phim.',
  d => { d.bg('e'); d.r(1, 6, 14, 8, 'n'); d.r(1, 6, 14, 1, 'N'); d.r(2, 9, 12, 4, 'w'); for (let x = 3; x < 14; x += 2) d.r(x, 9, 1, 4, 'k'); d.r(0, 3, 4, 3, 'N'); d.p('y', 8, 7, 12, 7); d.p('r', 14, 4); }, H);
add(G, B, 'in-shehnai', 'Shehnai', 'Shehnai', 'Kèn hơi đôi, thường vang lên trong lễ cưới.',
  d => { d.bg('e'); d.l(2, 3, 12, 13, 'n'); d.l(3, 3, 13, 13, 'N'); d.tri(10, 11, 5, 5, 'y'); d.p('k', 4, 5, 6, 7, 8, 9); d.p('r', 2, 3, 3, 2); d.p('o', 13, 15); d.p('y', 6, 2, 9, 1); }, H);
add(G, B, 'in-dhol', 'Dhol', 'Dhol', 'Trống lớn đánh bằng gậy, nhịp điệu của bhangra Punjab.',
  d => { d.bg('e'); d.e(8, 9, 6, 5, 'n'); d.e(8, 9, 6, 5, 'o'); d.r(2, 6, 12, 7, 'n'); d.e(8, 6, 6, 1.6, 't'); d.e(8, 13, 6, 1.6, 'N'); for (let x = 3; x < 14; x += 2) d.l(x, 7, x + 1, 12, 'N'); d.l(1, 2, 5, 6, 'w'); d.l(15, 2, 11, 6, 'w'); }, H);
add(G, B, 'in-mridangam', 'Mridangam', 'Mridangam', 'Trống hai đầu của âm nhạc cổ điển miền Nam.',
  d => { d.bg('e'); d.e(8, 8, 7, 3.4, 'n'); d.e(3, 8, 2, 3, 'w'); d.e(13, 8, 2.4, 3.4, 'w'); d.e(3, 8, 1, 1.8, 'k'); d.e(13, 8, 1.4, 2, 'k'); for (let x = 5; x < 12; x += 2) d.l(x, 6, x, 10, 't'); d.p('N', 8, 4, 8, 12); d.p('r', 2, 13, 14, 13); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'in-raga', 'Raga và tala', 'Raga and tala', 'Hệ thống giai điệu và nhịp điệu làm nền cho nhạc cổ điển Ấn Độ, mỗi raga được gắn với một tâm trạng và thời điểm trong ngày.',
  d => { d.bg('o'); d.e(4, 4, 2.4, 2.4, 'y'); d.r(0, 9, 16, 7, 'B'); for (let i = 0; i < 6; i++) d.p('w', 1 + i * 2, 10 + (i % 3)); d.p('y', 12, 3, 14, 5, 11, 6); d.l(1, 8, 14, 8, 'y'); d.p('r', 3, 14, 8, 13, 12, 14); }, SC);
add(G, C, 'in-bharatanatyam', 'Bharatanatyam', 'Bharatanatyam', 'Điệu múa cổ điển Tamil Nadu với cử chỉ tay (mudra) và biểu cảm khuôn mặt tinh xảo.',
  d => { dancer(d, 'P', 'y', 'r'); d.p('y', 8, 1, 7, 2); d.p('r', 3, 4, 13, 2); d.p('w', 12, 12, 3, 13); }, SC);
add(G, C, 'in-kathak', 'Kathak', 'Kathak', 'Điệu múa kể chuyện của miền bắc, nổi bật với những vòng xoay và tiếng chân đập nhịp.',
  d => { dancer(d, 'v', 'p', 'p'); d.e(8, 12, 6, 1.6, 'P'); d.p('w', 2, 5, 14, 6); d.p('y', 2, 13, 13, 13); }, SC);
add(G, C, 'in-kathakali', 'Kathakali', 'Kathakali', 'Kịch múa Kerala với trang điểm mặt rực rỡ và trang phục công phu.',
  d => { d.bg('R'); d.e(8, 8, 4, 5, 'g'); d.r(4, 1, 8, 3, 'y'); d.tri(3, 0, 10, 3, 'r'); d.p('w', 6, 7, 10, 7); d.p('k', 6, 7, 10, 7); d.r(5, 10, 6, 1, 'r'); d.p('w', 3, 8, 13, 8, 4, 10, 12, 10); d.r(3, 14, 10, 2, 'o'); }, SC);
add(G, C, 'in-odissi', 'Odissi và Manipuri', 'Odissi and Manipuri', 'Hai lối múa cổ điển khác của Odisha và đông bắc.',
  d => { dancer(d, 'c', 'g', 'y'); d.p('w', 2, 4, 12, 2); d.p('r', 6, 6, 9, 6); d.p('b', 8, 11, 6, 13); }, SC);
add(G, C, 'in-bhangra', 'Bhangra và Garba', 'Bhangra and Garba', 'Điệu múa dân gian nhịp nhanh của Punjab và Gujarat, thường múa trong lễ hội và đám cưới.',
  d => { d.bg('y'); for (const x of [2, 7, 12]) { d.e(x + 1, 4, 1.4, 1.4, 's'); d.r(x, 6, 3, 4, x === 7 ? 'r' : 'b'); d.l(x, 7, x - 1, 3, 's'); d.l(x + 2, 7, x + 3, 3, 's'); d.r(x, 10, 1, 4, 'w'); d.r(x + 2, 10, 1, 4, 'w'); } d.p('o', 2, 1, 7, 1, 13, 1); }, SC);
add(G, C, 'in-qawwali', 'Qawwali', 'Qawwali', 'Nhạc sùng đạo Sufi của người Hồi giáo, hát tập thể theo nhịp vỗ tay.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'N'); for (const x of [1, 6, 11]) { d.e(x + 2, 7, 1.6, 1.6, 's'); d.r(x, 9, 4, 4, 'w'); d.p('k', x + 2, 4, x + 1, 5); d.l(x, 9, x - 1, 6, 'w'); } d.p('y', 3, 2, 8, 1, 13, 2); }, SC);
add(G, C, 'in-ramlila', 'Ramlila', 'Ramlila', 'Vở diễn kể sử thi Ramayana ngoài trời trong dịp lễ, được hiểu là di sản phi vật thể.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'N'); d.e(5, 6, 2, 2, 'b'); d.r(3, 8, 4, 5, 'o'); d.tri(3, 1, 4, 3, 'y'); d.l(10, 12, 14, 4, 'N'); d.l(14, 4, 14, 8, 'n'); d.p('r', 12, 5); d.e(12, 8, 2, 2, 'g'); d.p('y', 9, 2, 13, 1); }, SC);
add(G, C, 'in-kalaripayattu', 'Kalaripayattu', 'Kalaripayattu', 'Võ thuật cổ truyền của Kerala, có cả đòn tay không và vũ khí.',
  d => { d.bg('n'); d.r(0, 13, 16, 3, 'N'); d.e(6, 4, 1.8, 1.8, 's'); d.r(4, 6, 5, 4, 'r'); d.l(4, 7, 1, 10, 's'); d.l(9, 7, 13, 5, 'a'); d.l(13, 5, 15, 3, 'l'); d.l(4, 10, 3, 14, 'w'); d.l(8, 10, 10, 14, 'w'); d.p('k', 6, 4); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, E, 'in-miniature', 'Tranh tiểu họa Mughal', 'Mughal miniature painting', 'Tranh nhỏ tỉ mỉ về cung đình, săn bắn và hoa lá.',
  d => { d.bg('N'); d.r(1, 1, 14, 14, 'y'); d.r(2, 2, 12, 12, 'g'); d.e(8, 7, 3, 3, 'w'); d.r(6, 9, 4, 5, 'r'); d.e(8, 6, 1.4, 1.4, 's'); d.p('b', 4, 4, 12, 4); d.p('p', 3, 12, 13, 12); d.p('y', 3, 3, 12, 3); d.r(4, 12, 8, 1, 'G'); }, SC);
add(G, E, 'in-madhubani', 'Tranh Madhubani', 'Madhubani painting', 'Tranh dân gian vùng Bihar vẽ tay với họa tiết kín dày màu rực rỡ.',
  d => { d.bg('e'); d.r(1, 1, 14, 14, 'y'); d.e(8, 8, 5, 5, 'r'); d.e(8, 8, 3.4, 3.4, 'g'); d.e(8, 8, 1.8, 1.8, 'p'); d.p('k', 8, 8); for (const [x, y] of [[3, 3], [13, 3], [3, 13], [13, 13]]) d.e(x, y, 1.4, 1.4, 'b'); d.p('k', 1, 1, 14, 14); d.l(2, 8, 4, 8, 'k'); d.l(12, 8, 14, 8, 'k'); }, SC);
add(G, E, 'in-warli', 'Tranh Warli', 'Warli painting', 'Tranh vùng Maharashtra vẽ người que trắng trên nền đất nâu đỏ, kể về đời sống nông thôn.',
  d => { d.bg('R'); d.r(0, 0, 16, 16, 'n'); for (const x of [3, 7, 11]) { d.e(x, 4, 1, 1, 'w'); d.l(x, 5, x - 1, 8, 'w'); d.l(x, 5, x + 1, 8, 'w'); d.l(x - 1, 6, x + 1, 6, 'w'); } d.l(4, 11, 8, 14, 'w'); d.l(8, 14, 12, 11, 'w'); d.l(4, 11, 12, 11, 'w'); d.p('w', 3, 13, 13, 13); }, SC);
add(G, E, 'in-mughalarch', 'Kiến trúc Mughal', 'Mughal architecture', 'Mái vòm hành và vườn kiểu chahar bagh, đỉnh cao là Taj Mahal và lăng Humayun.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); d.r(3, 7, 10, 6, 'R'); d.e(8, 6, 4, 3.6, 'W'); d.r(7, 1, 2, 3, 'W'); d.p('y', 8, 0); d.r(6, 9, 4, 4, 'k'); d.e(8, 9, 2, 2, 'k'); d.r(2, 5, 1, 8, 'W'); d.r(13, 5, 1, 8, 'W'); d.p('c', 7, 15, 8, 15); }, SC);
add(G, E, 'in-gopuram', 'Đền tháp Dravidian', 'Dravidian temple towers', 'Cổng tháp nhiều tầng phủ tượng thần ở các đền miền nam như Madurai.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'u'); for (let i = 0; i < 6; i++) d.r(4 + i / 2 | 0, 3 + i * 2, 8 - (i / 2 | 0) * 2 + (i % 2 ? 0 : 0), 2, i % 2 ? 'p' : 'o'); d.r(6, 11, 4, 3, 'k'); d.p('y', 7, 1, 8, 1); d.p('r', 5, 5, 10, 5, 6, 7, 9, 7); d.p('w', 6, 9, 9, 9); }, SC);
add(G, E, 'in-konark', 'Đền Mặt Trời Konark', 'Konark Sun Temple', 'Đền xây hình chiếc xe của thần Mặt Trời với những bánh xe đá khổng lồ.',
  d => { d.bg('c'); d.e(13, 2, 2, 2, 'y'); d.r(0, 13, 16, 3, 'u'); d.r(3, 5, 10, 7, 'n'); d.tri(4, 2, 8, 4, 'N'); d.e(5, 12, 3, 3, 'N'); d.e(5, 12, 2, 2, 'n'); d.e(5, 12, 0.8, 0.8, 'N'); d.e(11, 12, 3, 3, 'N'); d.e(11, 12, 2, 2, 'n'); d.e(11, 12, 0.8, 0.8, 'N'); d.p('k', 7, 8, 9, 8); }, SC);
add(G, E, 'in-jantarmantar', 'Jantar Mantar', 'Jantar Mantar', 'Đài quan sát thiên văn bằng đá ở Jaipur và Delhi, có đồng hồ mặt trời cực lớn.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.tri(3, 2, 6, 11, 'R'); d.l(4, 13, 8, 3, 'r'); d.r(8, 8, 6, 5, 'o'); d.r(10, 7, 4, 1, 'O'); d.e(2, 3, 1.4, 1.4, 'y'); d.p('w', 5, 6, 6, 9); d.p('n', 9, 10, 12, 10); }, SC);
add(G, E, 'in-rangolimehndi', 'Nghệ thuật Rangoli và mehndi', 'Rangoli and mehndi art', 'Họa tiết trang trí có ý nghĩa chào đón may mắn.',
  d => { d.bg('e'); d.e(5, 8, 4.6, 4.6, 'r'); d.e(5, 8, 3, 3, 'y'); d.e(5, 8, 1.4, 1.4, 'b'); d.r(10, 3, 5, 11, 's'); for (const [x, y] of [[11, 5], [13, 6], [11, 8], [13, 9], [12, 11]]) d.p('N', x, y); d.l(11, 12, 14, 12, 'n'); d.p('g', 2, 3, 8, 14); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'in-bollywood', 'Bollywood', 'Bollywood', 'Nền điện ảnh tiếng Hindi ở Mumbai, nổi tiếng với phim ca nhạc và màn múa tập thể.',
  d => { d.bg('k'); d.r(1, 3, 14, 10, 'd'); d.r(1, 3, 14, 3, 'w'); for (let x = 1; x < 14; x += 3) d.dtri(x, 3, 2, 3, 'k'); d.p('y', 4, 8, 7, 9, 10, 8, 12, 10); d.e(8, 10, 2, 2, 'p'); d.p('w', 8, 10); d.r(1, 14, 14, 1, 'a'); }, SC);
add(G, F, 'in-regionalcinema', 'Điện ảnh khu vực', 'Regional cinema', 'Các nền phim tiếng Tamil, Telugu và Bengal có lượng khán giả rất lớn.',
  d => { d.bg('B'); d.r(1, 2, 4, 12, 'r'); d.r(6, 2, 4, 12, 'y'); d.r(11, 2, 4, 12, 'g'); d.e(3, 7, 1.4, 1.4, 'w'); d.e(8, 7, 1.4, 1.4, 'k'); d.e(13, 7, 1.4, 1.4, 'w'); d.p('w', 2, 11, 7, 11, 12, 11); d.p('k', 3, 4, 8, 4, 13, 4); }, SC);
add(G, F, 'in-ray', 'Satyajit Ray', 'Satyajit Ray', 'Đạo diễn Bengal đưa điện ảnh Ấn Độ ra các liên hoan phim quốc tế.',
  d => { d.bg('e'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, 'k'); d.r(5, 5, 1, 2, 'k'); d.r(10, 5, 1, 2, 'k'); d.r(4, 10, 8, 6, 'a'); d.r(4, 6, 8, 1, '_'); d.p('k', 6, 6, 10, 6); d.p('N', 5, 6, 10, 6, 7, 9); d.p('y', 13, 3, 14, 2); }, SC);
add(G, F, 'in-cricket', 'Cricket', 'Cricket', 'Môn thể thao được yêu thích nhất, với giải Indian Premier League (Giải đấu Ngoại hạng Ấn Độ) thu hút hàng triệu người xem.',
  d => { d.bg('g'); d.r(0, 11, 16, 5, 'G'); d.r(3, 5, 3, 9, 'u'); d.r(3, 4, 3, 1, 'Y'); d.l(10, 14, 13, 5, 'n'); d.l(11, 14, 14, 5, 'N'); d.e(8, 10, 1.6, 1.6, 'r'); d.p('w', 7, 9); d.p('b', 2, 2, 13, 3); }, H);
add(G, F, 'in-yoga', 'Yoga và thiền', 'Yoga and meditation', 'Truyền thống rèn luyện thân tâm cổ xưa, nay là phong trào toàn cầu.',
  d => { d.bg('v'); d.e(8, 4, 1.8, 1.8, 's'); d.p('k', 7, 4, 9, 4); d.e(8, 9, 3, 3, 'p'); d.r(5, 12, 6, 2, 'p'); d.l(5, 9, 3, 12, 's'); d.l(11, 9, 13, 12, 's'); d.r(2, 14, 12, 2, 'P'); d.p('y', 8, 1, 6, 2, 10, 2); }, SC);
add(G, F, 'in-bengaluru', 'Công nghệ thông tin ở Bengaluru', 'IT in Bengaluru', 'Thành phố được gọi là "Thung lũng Silicon của Ấn Độ".',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'k'); d.r(1, 4, 6, 9, 'A'); d.r(8, 2, 7, 11, 'a'); for (let y = 5; y < 13; y += 2) for (const x of [2, 4, 9, 11, 13]) d.p('y', x, y); d.r(3, 14, 1, 1, 'c'); d.p('w', 1, 1, 14, 1); }, SC);
add(G, F, 'in-literature', 'Văn học', 'Literature', 'Rabindranath Tagore đoạt giải Nobel Văn học năm 1913, người châu Á đầu tiên nhận giải này.',
  d => { d.bg('e'); d.r(3, 3, 10, 11, 'R'); d.r(3, 3, 1, 11, 'm'); d.r(5, 4, 7, 9, 'u'); d.p('k', 6, 6, 10, 6, 6, 8, 11, 8, 6, 10, 9, 10); d.l(13, 2, 13, 0, 'y'); d.p('y', 8, 12); }, H);
add(G, F, 'in-jugaad', 'Jugaad', 'Jugaad', 'Tinh thần sáng tạo "chế" giải pháp nhanh và rẻ từ những gì sẵn có.',
  d => { d.bg('y'); d.r(1, 10, 14, 3, 'a'); d.e(4, 13, 2, 2, 'k'); d.e(12, 13, 2, 2, 'k'); d.r(3, 6, 5, 4, 'r'); d.r(8, 7, 5, 3, 'b'); d.l(6, 6, 6, 3, 'n'); d.l(2, 9, 14, 9, 'N'); d.p('w', 6, 2, 7, 1); d.p('G', 10, 5, 12, 5); }, SC);
