import { add, SC, setCC } from './pass-kit.js';
import { SLOT_OF, O } from './pass-lame.js';
setCC('vn');
// Việt Nam · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Nghệ thuật truyền thống', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
SLOT_OF['vn-tuong'] = 'face'; SLOT_OF['vn-mualan'] = 'head';
O['vn-tuong'] = { y0: 5, pal: { r: '#e8452c', w: '#ffffff', k: '#2b1d3a', y: '#ffd84d' }, rows: ['....rrrrrrrr....', '....rkrrrrkr....', '....rrwwwwrr....', '....rrrkkrrr....', '....rrrrrrrr....'] };
O['vn-mualan'] = { y0: -2, pal: { o: '#ff9f43', y: '#ffd84d', w: '#ffffff', k: '#2b1d3a', r: '#e8452c' }, rows: ['....oooooooo....', '...oooyyyyooo...', '..oowwooooowwoo.', '..oowkooooookwo.', '..ooyyooooyyoo..', '..oo........oo..'] };

// ----- Lễ hội -----
add(G, A, 'vn-tet', 'Tết Nguyên Đán', 'Tet (Lunar New Year)', 'Lễ hội lớn nhất năm của người Việt, với bữa tất niên, pháo hoa, hoa đào và hoa mai, lì xì đầu năm và việc viếng thăm họ hàng.',
  d => { d.bg('r'); d.l(8, 15, 8, 5, 'N'); d.l(8, 11, 4, 8, 'N'); d.l(8, 9, 12, 6, 'N'); for (const [x, y, c] of [[4, 7, 'p'], [8, 4, 'y'], [12, 5, 'p'], [6, 10, 'y'], [10, 8, 'p']]) { d.e(x, y, 1.6, 1.6, c); } d.r(5, 12, 6, 4, 'y'); d.r(5, 12, 6, 1, 'Y'); d.p('r', 8, 14); }, SC);
add(G, A, 'vn-gioto', 'Giỗ Tổ Hùng Vương (đền Hùng)', 'Hung Kings Commemoration (Hung Temple)', 'Ngày mồng 10 tháng 3 âm lịch, cả nước hướng về các vua Hùng dựng nước; tín ngưỡng thờ cúng Hùng Vương được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) ghi nhận năm 2012.',
  d => { d.bg('c'); d.tri(0, 6, 16, 9, 'G'); d.r(5, 8, 6, 4, 'r'); d.tri(3, 4, 10, 4, 'y'); d.r(7, 9, 2, 3, 'k'); d.r(0, 13, 16, 3, 'g'); for (let i = 0; i < 4; i++) d.r(6 - i, 12 + (i > 2 ? 0 : 0), 4 + i * 2, 1, 'W'); d.p('y', 8, 3); d.l(1, 4, 1, 12, 'N'); d.p('r', 2, 4, 2, 5); }, SC);
add(G, A, 'vn-giong', 'Hội Gióng (Phù Đổng, Sóc Sơn)', 'Giong Festival (Phu Dong, Soc Son)', 'Lễ hội tưởng nhớ Thánh Gióng, vị anh hùng cưỡi ngựa sắt đánh giặc Ôn, được UNESCO ghi nhận năm 2010.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(6, 10, 5, 3, 'd'); d.r(3, 12, 1, 3, 'd'); d.r(8, 12, 1, 3, 'd'); d.e(11, 7, 2.2, 2, 'd'); d.p('k', 11, 6); d.e(8, 5, 1.6, 1.6, 's'); d.r(6, 6, 4, 4, 'y'); d.r(7, 3, 2, 1, 'a'); d.l(10, 7, 15, 1, 'G'); d.p('g', 14, 0, 15, 1); d.p('r', 2, 9); }, SC);
add(G, A, 'vn-hoilim', 'Hội Lim (Bắc Ninh)', 'Lim Festival (Bac Ninh)', 'Mùa xuân, người dân hát quan họ trên đồi, trên thuyền, đón khách xa gần.',
  d => { d.bg('g'); d.r(0, 11, 16, 5, 'C'); d.e(8, 12, 6, 2, 'n'); d.r(2, 12, 12, 1, 'N'); d.e(5, 5, 1.8, 1.8, 's'); d.r(3, 7, 4, 5, 'r'); d.e(11, 5, 1.8, 1.8, 's'); d.r(9, 7, 4, 5, 'b'); d.p('k', 4, 4, 5, 3, 10, 4, 11, 3); d.p('y', 8, 2, 14, 2); d.r(3, 2, 4, 1, 'k'); }, SC);
add(G, A, 'vn-chuahuong', 'Lễ hội chùa Hương', 'Perfume Pagoda Festival', 'Hành hương lớn nhất miền Bắc, người hành hương ngồi đò qua suối Yến để vào chùa trong núi.',
  d => { d.bg('c'); d.tri(0, 1, 7, 9, 'G'); d.tri(9, 2, 7, 8, 'G'); d.r(0, 10, 16, 6, 'C'); d.e(8, 12, 4, 1.4, 'n'); d.r(6, 9, 4, 2, 'r'); d.p('s', 7, 8, 9, 8); d.l(4, 13, 12, 14, 'N'); d.p('w', 2, 15, 13, 15); d.p('y', 3, 4, 12, 5); }, SC);
add(G, A, 'vn-kate', 'Lễ hội Katê (người Chăm)', 'Kate Festival (Cham)', 'Lễ tạ ơn thần linh, vua và tổ tiên của người Chăm, tổ chức quanh các tháp Chăm ở Ninh Thuận.',
  d => { d.bg('o'); d.r(0, 13, 16, 3, 'u'); d.r(5, 4, 6, 9, 'R'); d.tri(4, 1, 8, 4, 'r'); d.r(7, 8, 2, 4, 'k'); d.p('y', 6, 6, 9, 6); d.p('v', 1, 12, 14, 12); d.e(1, 11, 1.4, 1.4, 'v'); d.e(14, 11, 1.4, 1.4, 'v'); d.p('w', 12, 2); }, SC);
add(G, A, 'vn-okombok', 'Ok Om Bok và đua ghe ngo (người Khmer)', 'Ok Om Bok and ngo boat racing (Khmer)', 'Lễ cúng trăng ở đồng bằng sông Cửu Long, kèm cuộc đua ghe ngo trên sông.',
  d => { d.bg('B'); d.r(0, 10, 16, 6, 'C'); d.e(4, 4, 3, 3, 'u'); d.e(4, 4, 2.4, 2.4, 'y'); d.e(8, 11, 7, 1.6, 'r'); d.r(1, 10, 14, 1, 'r'); d.e(1.5, 8, 1.6, 2, 'y'); for (const x of [4, 7, 10, 13]) { d.p('s', x, 8); d.r(x, 9, 1, 1, 'y'); } d.p('w', 3, 14, 11, 15); }, SC);
add(G, A, 'vn-nghinhong', 'Lễ hội Nghinh Ông', 'Nghinh Ong (Whale Worship) Festival', 'Lễ của ngư dân miền biển để tạ ơn cá Ông (cá voi) cứu giúp người đi biển gặp nạn.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.e(8, 11, 6, 3, 'A'); d.e(8, 12, 5, 1.6, 'l'); d.tri(12, 6, 4, 4, 'A'); d.e(5, 10.5, 1, 1, 'w'); d.p('k', 4, 10); d.p('w', 7, 4, 8, 2, 9, 4, 2, 14, 12, 15); d.l(8, 4, 8, 7, 'c'); }, SC);
add(G, A, 'vn-damtrau', 'Lễ hội đâm trâu (Tây Nguyên)', 'Buffalo-sacrifice festival (Central Highlands)', 'Nghi lễ hiến tế thần linh sau mùa thu hoạch, với cồng chiêng và điệu múa xoang.',
  d => { d.bg('o'); d.r(0, 13, 16, 3, 'N'); d.l(3, 14, 3, 3, 'N'); d.l(4, 14, 4, 3, 'n'); d.r(3, 2, 2, 2, 'r'); d.e(10, 10, 4, 2.6, 'd'); d.p('d', 7, 7, 14, 7); d.p('w', 7, 9, 14, 9); d.r(8, 12, 1, 3, 'd'); d.r(12, 12, 1, 3, 'd'); d.p('w', 14, 8); d.p('y', 7, 2, 1, 6); }, SC);
add(G, A, 'vn-khauvai', 'Chợ tình Khâu Vai (Hà Giang)', 'Khau Vai Love Market (Ha Giang)', 'Phiên chợ mỗi năm một lần, nơi những người từng yêu nhau tìm gặp lại, theo truyền thuyết về đôi tình nhân không được ở bên nhau.',
  d => { d.bg('A'); d.tri(0, 6, 16, 9, 'K'); d.e(5.5, 6.5, 3, 2.6, 'r'); d.e(10.5, 6.5, 3, 2.6, 'r'); d.dtri(2.4, 7, 11.2, 7, 'r'); d.p('x', 4, 5, 5, 4); d.p('w', 1, 2, 14, 1, 8, 3); d.p('y', 12, 14, 3, 13); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'vn-danbau', 'Đàn bầu', 'Dan bau (monochord)', 'Đàn một dây, cần đàn uốn được, tiếng đàn trầm ấm như giọng người hát, biểu tượng của âm nhạc dân tộc Việt.',
  d => { d.r(0, 7, 16, 3, 'n'); d.r(0, 7, 16, 1, 'N'); d.l(1, 8, 14, 8, 'w'); d.l(11, 8, 14, 2, 'Y'); d.l(12, 8, 15, 2, 'y'); d.e(14, 2, 1.4, 1.4, 'y'); d.r(1, 10, 2, 4, 'N'); d.r(13, 10, 2, 4, 'N'); d.p('r', 3, 8); }, H);
add(G, B, 'vn-dantranh', 'Đàn tranh', 'Dan tranh (zither)', 'Đàn dây dài với nhiều dây, tiếng trong trẻo, thường dùng đệm cho hát và độc tấu.',
  d => { d.r(0, 6, 16, 5, 'n'); d.r(0, 6, 16, 1, 'N'); for (let x = 2; x < 15; x += 2) { d.r(x, 7, 1, 3, 'w'); d.p('r', x, 8); } d.r(0, 11, 2, 3, 'N'); d.r(14, 11, 2, 3, 'N'); }, H);
add(G, B, 'vn-dannguyet', 'Đàn nguyệt và đàn nhị', 'Dan nguyet and dan nhi', 'Nguyệt là đàn thùng tròn như mặt trăng, nhị là đàn hai dây kéo cung, hai nhạc cụ quen thuộc của nhạc truyền thống.',
  d => { d.e(5, 11, 3.6, 3.6, 'n'); d.e(5, 11, 2.4, 2.4, 'u'); d.l(5, 8, 5, 0, 'N'); d.l(6, 8, 6, 0, 'n'); d.p('w', 5, 11); d.r(11, 9, 3, 4, 'N'); d.r(12, 1, 1, 8, 'n'); d.p('w', 11, 3, 14, 5); d.l(8, 6, 15, 12, 'a'); }, H);
add(G, B, 'vn-saotruc', 'Sáo trúc', 'Bamboo flute', 'Sáo thổi ngang làm từ trúc, tiếng sáo gắn với cảnh đồng quê và người chăn trâu.',
  d => { d.l(0, 12, 15, 4, 'G'); d.l(0, 13, 15, 5, 'g'); for (const x of [6, 8, 10, 12]) d.p('k', x, 14 - Math.round(x * 0.55)); d.p('y', 1, 12, 14, 4); d.p('w', 3, 8, 7, 5, 12, 2); }, H);
add(G, B, 'vn-congchieng', 'Cồng chiêng Tây Nguyên', 'Central Highlands gongs', 'Nhạc cụ bằng đồng, dùng trong lễ hội, cúng thần, đã được UNESCO ghi nhận là kiệt tác di sản phi vật thể năm 2005.',
  d => { d.bg('o'); d.e(5, 8, 4.4, 4.4, 'Y'); d.e(5, 8, 3.4, 3.4, 'y'); d.e(5, 8, 1.4, 1.4, 'Y'); d.e(12, 9, 3.4, 3.4, 'Y'); d.e(12, 9, 2.4, 2.4, 'y'); d.e(12, 9, 1, 1, 'Y'); d.l(5, 0, 5, 3, 'r'); d.l(12, 2, 12, 5, 'r'); d.l(2, 14, 7, 14, 'N'); }, SC);
add(G, B, 'vn-trung', 'Đàn T\'rưng', 'T\'rung bamboo xylophone', 'Nhạc cụ gõ bằng ống nứa của người Ba Na và Xơ Đăng, tiếng vọng như suối chảy.',
  d => { for (let i = 0; i < 7; i++) { d.r(1 + i * 2, 3 + i, 1, 9 - i, 'Y'); d.r(1 + i * 2, 3 + i, 1, 1, 'y'); } d.l(0, 13, 15, 13, 'N'); d.l(0, 14, 15, 14, 'n'); d.r(0, 12, 1, 3, 'N'); d.r(14, 12, 2, 3, 'N'); }, H);
add(G, B, 'vn-dando', 'Đàn đá (Khánh Sơn)', 'Stone lithophone (Khanh Son)', 'Bộ nhạc cụ bằng những thanh đá có tuổi cổ hơn ngàn năm, được phát hiện năm 1979 ở Khánh Hòa.',
  d => { for (let i = 0; i < 6; i++) { d.r(1 + i * 2, 4 + i, 2, 8 - i, i % 2 ? 'a' : 'A'); d.r(1 + i * 2, 4 + i, 2, 1, 'l'); } d.r(0, 13, 16, 2, 'N'); d.p('w', 8, 2, 12, 3); }, H);
add(G, B, 'vn-dantinh', 'Đàn tính (người Tày, Thái)', 'Dan tinh (Tay, Thai lute)', 'Đàn hai hoặc ba dây, thùng bầu dục bằng quả bí, đệm cho hát then.',
  d => { d.e(5, 11, 4, 3.6, 'Y'); d.e(5, 11, 3, 2.6, 'y'); d.p('k', 5, 11); d.l(8, 9, 15, 2, 'N'); d.l(8, 10, 15, 3, 'n'); d.l(5, 8, 14, 2, 'w'); d.p('r', 15, 1, 14, 2); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'vn-roinuoc', 'Múa rối nước', 'Water puppetry', 'Nghệ thuật điều khiển con rối gỗ trên mặt nước, ra đời ở đồng bằng Bắc Bộ, nay là điểm nhấn văn hóa nổi tiếng đối với du khách.',
  d => { d.bg('R'); d.r(0, 10, 16, 6, 'C'); d.r(0, 10, 16, 1, 'c'); d.r(0, 0, 16, 2, 'r'); d.e(5, 7, 1.6, 1.6, 's'); d.r(4, 8, 3, 3, 'y'); d.l(5, 11, 5, 14, 'N'); d.e(11, 8, 2.4, 1.4, 'n'); d.l(10, 6, 10, 3, 'y'); d.p('r', 13, 7); d.p('w', 3, 14, 9, 15, 13, 13); }, SC);
add(G, C, 'vn-quanho', 'Quan họ Bắc Ninh', 'Quan ho folk singing (Bac Ninh)', 'Lối hát đối đáp nam nữ, người hát mặc áo tứ thân, đội nón quai thao, được UNESCO ghi nhận năm 2009.',
  d => { d.bg('e'); d.e(8, 5, 2.4, 2.6, 's'); d.e(8, 3, 6, 2.6, 'k'); d.r(2, 3, 12, 1, 'k'); d.l(3, 4, 3, 11, 'r'); d.l(13, 4, 13, 11, 'r'); d.r(5, 7, 6, 8, 'n'); d.r(7, 8, 2, 3, 'r'); d.p('k', 7, 5, 9, 5); d.p('r', 8, 6); }, SC);
add(G, C, 'vn-catru', 'Ca trù', 'Ca tru', 'Nghệ thuật hát và đệm đàn đáy, người hát gõ phách, người đánh trống chầu chấm câu, từng là thú vui của giới văn nhân.',
  d => { d.bg('v'); d.e(5, 4, 2, 2.2, 's'); d.r(3, 6, 4, 6, 'p'); d.l(10, 14, 14, 4, 'N'); d.l(11, 14, 15, 4, 'n'); d.e(10, 12, 2.6, 2, 'N'); d.p('w', 10, 12); d.r(1, 12, 6, 1, 'N'); d.p('Y', 2, 11, 4, 11); d.e(14, 3, 1.2, 1.2, 'y'); }, SC);
add(G, C, 'vn-cheo', 'Chèo', 'Cheo (folk opera)', 'Loại kịch hát ở đồng bằng Bắc Bộ, hay làm sân khấu ở sân đình làng.',
  d => { d.bg('Y'); d.r(0, 13, 16, 3, 'N'); d.r(0, 0, 16, 2, 'r'); d.r(2, 2, 1, 11, 'R'); d.r(13, 2, 1, 11, 'R'); d.e(6, 7, 1.8, 1.8, 's'); d.r(4, 9, 4, 4, 'g'); d.e(11, 7, 1.8, 1.8, 's'); d.r(9, 9, 4, 4, 'o'); d.p('k', 5, 6, 10, 6, 6, 7, 11, 7); d.p('r', 6, 8, 11, 8); }, SC);
add(G, C, 'vn-tuong', 'Tuồng (hát bội)', 'Tuong (classical opera)', 'Kịch hát cách điệu, dùng mặt nạ và trang phục rực rỡ, thường kể chuyện anh hùng, trung nghĩa.',
  d => { d.e(8, 9, 6, 6.4, 'r'); d.r(3, 3, 10, 2, 'y'); d.e(5.5, 8, 2, 2.4, 'w'); d.e(10.5, 8, 2, 2.4, 'w'); d.p('k', 5, 8, 11, 8, 4, 6, 12, 6); d.l(8, 5, 8, 11, 'k'); d.r(6, 12, 4, 1, 'k'); d.p('y', 3, 3, 12, 3, 8, 1); d.p('k', 2, 9, 13, 9); }, { use: 'wear' });
add(G, C, 'vn-cailuong', 'Cải lương', 'Cai luong (reformed opera)', 'Sân khấu ca kịch phổ biến ở Nam Bộ, có nguồn gốc từ đờn ca tài tử vào đầu thế kỷ 20.',
  d => { d.bg('v'); d.r(0, 0, 4, 16, 'r'); d.r(12, 0, 4, 16, 'r'); d.e(8, 5, 2.4, 2.6, 's'); d.r(5, 8, 6, 7, 'p'); d.r(5, 8, 6, 1, 'y'); d.p('k', 7, 5, 9, 5); d.p('r', 8, 6); d.p('y', 6, 2, 10, 2, 8, 1); d.r(0, 15, 16, 1, 'V'); }, SC);
add(G, C, 'vn-dctutai', 'Đờn ca tài tử (Nam Bộ)', 'Don ca tai tu (Southern amateur music)', 'Lối chơi nhạc của người dân miền Nam, ngồi quanh chiếu, ngẫu hứng đàn hát, được UNESCO ghi nhận năm 2013.',
  d => { d.bg('u'); d.r(0, 11, 16, 5, 'e'); d.p('o', 1, 12, 5, 14, 9, 12, 13, 14); d.e(4, 7, 1.6, 1.6, 's'); d.r(3, 9, 3, 3, 'g'); d.e(12, 7, 1.6, 1.6, 's'); d.r(11, 9, 3, 3, 'b'); d.l(6, 8, 9, 6, 'N'); d.e(8, 11, 2, 1.4, 'n'); d.p('k', 4, 6, 12, 6); }, SC);
add(G, C, 'vn-baichoi', 'Bài chòi (Trung Bộ)', 'Bai choi (Central Vietnam)', 'Trò chơi dân gian kết hợp hát, đố và bốc thẻ, người hô cái hát dẫn dắt người chơi.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 4, 5, 3, 'Y'); d.tri(0, 2, 7, 2, 'N'); d.l(2, 7, 2, 13, 'N'); d.l(5, 7, 5, 13, 'N'); d.r(10, 6, 5, 3, 'Y'); d.tri(9, 4, 7, 2, 'N'); d.l(11, 9, 11, 13, 'N'); d.l(14, 9, 14, 13, 'N'); d.r(7, 10, 2, 3, 'r'); d.p('w', 8, 9); d.p('y', 3, 5, 12, 7); }, SC);
add(G, C, 'vn-hatxoan', 'Hát xoan (Phú Thọ)', 'Xoan singing (Phu Tho)', 'Hát thờ thần của những cô đào kép hát tại đình làng, có tuổi hàng nghìn năm.',
  d => { d.bg('R'); d.r(0, 13, 16, 3, 'N'); for (const [x, c] of [[3, 'y'], [8, 'p'], [13, 'g']]) { d.e(x, 4, 1.6, 1.8, 's'); d.r(x - 2, 6, 5, 8, c); d.r(x - 2, 6, 5, 1, 'w'); d.p('k', x - 1, 3, x + 1, 3); } d.p('y', 0, 1, 15, 2); }, SC);
add(G, C, 'vn-mualan', 'Múa lân', 'Lion dance', 'Tiết mục không thể thiếu trong Tết Trung Thu, khai trương và hội làng, tập hợp trẻ em và âm thanh trống.',
  d => { d.bg('r'); d.e(8, 8, 6, 5.4, 'y'); d.e(8, 8, 5, 4.4, 'o'); d.e(5.5, 6.5, 1.8, 1.8, 'w'); d.e(10.5, 6.5, 1.8, 1.8, 'w'); d.p('k', 5, 7, 11, 7); d.r(6, 10, 4, 2, 'R'); d.p('w', 6, 11, 9, 11); d.p('y', 2, 3, 13, 3, 8, 2); d.l(8, 2, 8, 5, 'r'); }, { use: 'wear' });

// ----- Nghệ thuật truyền thống -----
add(G, E, 'vn-dongho', 'Tranh Đông Hồ', 'Dong Ho woodblock prints', 'Tranh dân gian khắc gỗ in trên giấy điệp, màu lấy từ thiên nhiên, có đề tài như đám cưới chuột, vịt đàn, gà đại cát.',
  d => { d.r(1, 1, 14, 14, 'u'); d.r(1, 1, 14, 1, 'R'); d.r(1, 14, 14, 1, 'R'); d.e(8, 7, 3.4, 3, 'd'); d.p('d', 6, 4, 10, 4); d.p('w', 7, 6, 9, 6); d.p('r', 8, 8); d.r(5, 10, 6, 3, 'r'); d.p('g', 2, 3, 13, 3, 3, 12, 12, 12); d.p('k', 7, 6, 9, 6); }, SC);
add(G, E, 'vn-hangtrong', 'Tranh Hàng Trống', 'Hang Trong paintings', 'Tranh thờ và tranh Tết bán ở phố Hàng Trống, Hà Nội, tô màu bằng tay.',
  d => { d.r(2, 1, 12, 14, 'e'); d.r(2, 1, 12, 1, 'N'); d.r(2, 14, 12, 1, 'N'); d.e(8, 5, 2.4, 2.6, 's'); d.r(5, 8, 6, 6, 'r'); d.r(5, 8, 6, 1, 'y'); d.p('k', 7, 5, 9, 5); d.p('y', 6, 2, 10, 2); d.p('g', 3, 4, 12, 4, 3, 12, 12, 12); d.p('b', 4, 10, 11, 10); }, SC);
add(G, E, 'vn-sonmai', 'Sơn mài', 'Lacquer painting', 'Nghệ thuật sơn nhiều lớp trên gỗ, mài bóng, rất được yêu chuộng trong hội họa Việt Nam hiện đại.',
  d => { d.r(1, 2, 14, 12, 'd'); d.r(1, 2, 14, 1, 'K'); d.r(1, 13, 14, 1, 'K'); d.e(5, 8, 2.4, 2.4, 'r'); d.e(10, 7, 2, 2, 'y'); d.tri(7, 9, 8, 4, 'Y'); d.p('y', 3, 4, 8, 4, 12, 4, 4, 11); d.p('w', 12, 11, 9, 5); d.p('K', 2, 3, 13, 3); }, SC);
add(G, E, 'vn-luavanphuc', 'Lụa Vạn Phúc (Hà Đông)', 'Van Phuc silk (Ha Dong)', 'Lụa tơ tằm dệt ở làng Vạn Phúc, mềm mại, dùng may áo dài và khăn lụa.',
  d => { d.bg('p'); for (let y = 2; y < 14; y++) { const o = Math.round(Math.sin(y / 2) * 2); d.r(2 + o, y, 12, 1, y % 3 ? 'x' : 'p'); } d.r(0, 0, 16, 2, 'P'); d.p('w', 5, 5, 9, 8, 11, 11); d.r(0, 14, 16, 2, 'P'); d.p('y', 3, 2, 12, 14); }, SC);
add(G, E, 'vn-ongdo', 'Thư pháp ông đồ ngày Tết', 'Calligraphy at Tet', 'Người viết chữ bằng bút lông trên giấy đỏ, câu đối và chữ xin đầu năm, nhất là ở Văn Miếu – Quốc Tử Giám.',
  d => { d.r(2, 1, 8, 14, 'r'); d.r(2, 1, 8, 1, 'R'); d.l(4, 4, 8, 4, 'y'); d.l(6, 3, 6, 12, 'y'); d.l(4, 8, 8, 9, 'y'); d.l(4, 12, 8, 11, 'y'); d.r(11, 3, 1, 8, 'N'); d.l(14, 2, 12, 8, 'N'); d.p('k', 12, 9, 12, 10, 13, 9); }, H);
add(G, E, 'vn-dieukhacgo', 'Điêu khắc gỗ đình làng', 'Village-hall wood carving', 'Những tấm bảy chạm cảnh sinh hoạt dân gian, rồng, phượng, công chúa, và tấm bằng trong đình.',
  d => { d.r(1, 2, 14, 12, 'N'); d.r(1, 2, 14, 1, 'n'); d.r(1, 13, 14, 1, 'n'); d.r(2, 3, 12, 10, 'n'); d.l(3, 11, 6, 5, 'N'); d.l(6, 5, 9, 11, 'N'); d.l(9, 11, 13, 5, 'N'); d.e(12, 5, 1.6, 1.6, 'N'); d.p('t', 4, 4, 8, 6, 11, 11, 5, 12); d.p('N', 13, 4); }, SC);
add(G, E, 'vn-theu', 'Thêu tay', 'Hand embroidery', 'Nghề thêu trên lụa, vải với hình phong cảnh, hoa lá, thể hiện sự tỉ mỉ của người thợ thêu.',
  d => { d.r(1, 1, 14, 14, 'N'); d.r(2, 2, 12, 12, 'e'); d.e(6, 8, 3, 3, 'p'); d.e(6, 8, 1.6, 1.6, 'x'); d.p('y', 6, 8); d.l(10, 5, 10, 12, 'G'); d.p('g', 9, 6, 11, 8, 9, 10, 11, 12); d.l(12, 11, 15, 15, 'y'); d.p('a', 15, 15); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'vn-xemay', 'Văn hóa xe máy', 'Motorbike culture', 'Những dòng xe máy dày đặc trên phố, trở thành hình ảnh đặc trưng của các đô thị Việt Nam.',
  d => { d.bg('A'); d.r(0, 13, 16, 3, 'a'); d.e(4, 12, 2.6, 2.6, 'k'); d.e(12, 12, 2.6, 2.6, 'k'); d.e(4, 12, 1, 1, 'a'); d.e(12, 12, 1, 1, 'a'); d.r(4, 8, 8, 3, 'r'); d.r(10, 6, 2, 3, 'r'); d.l(11, 6, 13, 5, 'd'); d.r(5, 6, 4, 2, 'd'); d.e(7, 4, 1.6, 1.6, 's'); d.p('y', 14, 9); }, SC);
add(G, F, 'vn-cafe', 'Quán cà phê và phố đi bộ', 'Cafes and pedestrian streets', 'Người trẻ hẹn bạn ở quán cà phê và dạo quanh phố đi bộ Hồ Gươm, phố Nguyễn Huệ.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'a'); d.r(3, 8, 10, 1, 'N'); d.l(4, 9, 4, 13, 'N'); d.l(11, 9, 11, 13, 'N'); d.e(5, 7, 1.2, 1.2, 'w'); d.p('N', 5, 7); d.r(8, 6, 3, 2, 'w'); d.p('o', 9, 7); d.tri(0, 1, 16, 4, 'r'); d.p('w', 2, 3, 6, 3, 10, 3, 14, 3); }, SC);
add(G, F, 'vn-duongpho', 'Ẩm thực đường phố', 'Street food', 'Những gánh hàng, quán vỉa hè với ghế nhựa nhỏ, bộ mặt rất đặc trưng của đời sống đô thị.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'a'); d.r(5, 4, 7, 5, 'w'); d.r(5, 4, 7, 1, 'r'); d.r(6, 9, 5, 3, 'a'); d.p('y', 7, 6, 10, 6); d.r(1, 10, 3, 3, 'b'); d.r(1, 12, 1, 2, 'b'); d.r(13, 10, 3, 3, 'r'); d.r(14, 12, 1, 2, 'r'); d.p('w', 8, 2, 10, 1); }, SC);
add(G, F, 'vn-bongda', 'Bóng đá', 'Football', 'Môn thể thao được yêu thích nhất; kỳ tích của đội U23 tại giải châu Á năm 2018 khiến cả nước đổ ra đường ăn mừng.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); d.e(8, 8, 5.6, 5.6, 'w'); d.e(8, 8, 1.8, 1.8, 'k'); for (const [x, y] of [[8, 3], [3, 7], [13, 7], [5, 13], [11, 13]]) d.p('k', x, y, x + 1, y); d.p('r', 14, 2, 2, 2); d.p('y', 13, 1); }, H);
add(G, F, 'vn-vpop', 'V-pop và Rap Việt', 'V-pop and Rap Viet', 'Nhạc pop và rap tiếng Việt phát triển mạnh qua mạng xã hội, với các chương trình truyền hình thực tế thu hút đông đảo khán giả trẻ.',
  d => { d.bg('V'); d.r(6, 2, 4, 6, 'a'); d.e(8, 3, 2.6, 2.6, 'l'); d.r(7, 8, 2, 5, 'k'); d.r(5, 13, 6, 2, 'k'); d.p('p', 1, 4, 14, 3, 2, 9, 13, 10); d.p('y', 3, 6, 12, 6, 4, 11); d.p('c', 13, 14, 2, 13); d.p('K', 7, 4, 9, 4); }, SC);
add(G, F, 'vn-dienanh', 'Điện ảnh Việt', 'Vietnamese cinema', 'Phim chiếu rạp ngày Tết, những bộ phim gia đình đạt doanh thu cao, cùng các đạo diễn trẻ được giới thiệu ở liên hoan phim quốc tế.',
  d => { d.bg('k'); d.r(2, 4, 12, 9, 'd'); d.r(2, 4, 12, 1, 'w'); d.r(2, 12, 12, 1, 'w'); for (let x = 3; x < 13; x += 3) { d.p('w', x, 2); d.p('w', x, 14); } d.p('r', 7, 7, 8, 8, 7, 9, 9, 8); d.r(6, 6, 4, 4, 'y'); d.p('d', 8, 8); }, SC);
add(G, F, 'vn-qr', 'Thanh toán mã QR', 'QR code payments', 'Trả tiền bằng điện thoại ở gánh hàng, quán cà phê, chợ, phổ biến rất nhanh trong những năm gần đây.',
  d => { d.bg('b'); d.r(3, 1, 10, 14, 'w'); d.r(4, 3, 8, 8, 'k'); for (const [x, y] of [[4, 3], [9, 3], [4, 8]]) { d.r(x, y, 3, 3, 'w'); d.r(x + 1, y + 1, 1, 1, 'k'); } d.p('w', 8, 7, 10, 8, 7, 9, 9, 10, 11, 9); d.p('b', 8, 13); }, H);
