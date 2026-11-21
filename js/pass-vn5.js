import { add, SC, setCC } from './pass-kit.js';
setCC('vn');
// Việt Nam · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Động vật', B = 'Linh vật', C = 'Tín ngưỡng', E = 'Lịch sử', F = 'Tác phẩm tiêu biểu', J = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const person = (d, bg, hat, body, hair = 'k') => { d.bg(bg); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); if (hat) d.r(4, 1, 8, 1, hat); };

// ----- Động vật -----
add(G, A, 'vn-trau', 'Trâu', 'Water buffalo', 'Người bạn của nhà nông, kéo cày, kéo xe, gắn với câu "con trâu là đầu cơ nghiệp". Hội chọi trâu Đồ Sơn mỗi năm là một dịp lễ lớn.',
  d => { d.bg('g'); d.e(8, 9, 5.6, 4, 'd'); d.e(12, 6, 2.6, 2.4, 'd'); d.l(10, 3, 5, 2, 'w'); d.l(13, 3, 15, 1, 'w'); d.p('w', 14, 8); d.p('k', 12, 5); d.r(4, 12, 1, 3, 'd'); d.r(10, 12, 1, 3, 'd'); d.p('K', 6, 8, 9, 10); d.l(3, 8, 1, 10, 'd'); d.r(0, 14, 16, 2, 'G'); }, PET);
add(G, A, 'vn-saola', 'Sao la', 'Saola', 'Loài thú sừng dài, phát hiện năm 1992 ở rừng Vũ Quang, được gọi là "kỳ lân châu Á" vì quá hiếm.',
  d => { d.bg('G'); d.e(8, 10, 5, 3, 'n'); d.e(12, 6, 2.2, 2.4, 'n'); d.l(11, 4, 5, 0, 'w'); d.l(12, 4, 7, 0, 'e'); d.p('w', 13, 7, 12, 8); d.p('k', 12, 6); d.r(4, 12, 1, 3, 'N'); d.r(11, 12, 1, 3, 'N'); d.p('w', 5, 9, 9, 9, 7, 11); }, PET);
add(G, A, 'vn-voi', 'Voi Tây Nguyên', 'Central Highlands elephants', 'Voi nhà ở Bản Đôn (Đắk Lắk), ngày xưa có nghề bắt và thuần voi nổi tiếng.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.e(8, 9, 6, 4.4, 'a'); d.e(3, 8, 3, 3.4, 'A'); d.r(1, 9, 3, 5, 'a'); d.l(2, 12, 2, 14, 'A'); d.p('k', 4, 7); d.r(5, 12, 2, 3, 'A'); d.r(11, 12, 2, 3, 'A'); d.p('w', 3, 11, 4, 11); d.r(7, 3, 4, 2, 'r'); }, PET);
add(G, A, 'vn-voocmuihech', 'Voọc mũi hếch', 'Tonkin snub-nosed monkey', 'Loài khỉ quý hiếm ở Hà Giang, mũi hếch lên trời, sống trên những tán rừng cao.',
  d => { d.bg('G'); d.e(8, 8, 5, 5.4, 'k'); d.e(8, 9, 3, 3.4, 'w'); d.p('s', 7, 9, 9, 9); d.p('k', 7, 8, 9, 8); d.p('w', 7, 6, 9, 6); d.e(4, 6, 1.6, 1.6, 'w'); d.e(12, 6, 1.6, 1.6, 'w'); d.r(7, 3, 2, 2, 'w'); d.p('r', 8, 11); }, PET);
add(G, A, 'vn-gadongtao', 'Gà Đông Tảo', 'Dong Tao chicken', 'Giống gà chân to, xưa dùng cống vua, hiếm và giá trị ở Hưng Yên.',
  d => { d.bg('u'); d.e(7, 9, 4.6, 3.8, 'o'); d.e(12, 5, 2.4, 2.4, 'O'); d.p('r', 12, 2, 13, 2, 11, 3); d.p('y', 14, 5, 15, 5); d.p('k', 12, 5); d.r(5, 12, 3, 3, 'y'); d.r(9, 12, 3, 3, 'y'); d.r(4, 14, 5, 1, 'Y'); d.r(8, 14, 5, 1, 'Y'); d.tri(1, 5, 4, 5, 'N'); d.p('O', 6, 8, 8, 10); }, PET);
add(G, A, 'vn-cachep', 'Cá chép tiễn Ông Công Ông Táo', 'Carp sent with the Kitchen Gods', 'Ngày 23 tháng Chạp, người ta thả cá chép để Ông Táo cưỡi lên trời báo cáo chuyện nhà.',
  d => { d.bg('C'); d.e(7, 8, 5.6, 3.6, 'o'); for (let x = 10; x <= 14; x++) { const h = Math.min(x - 9, 4); d.r(x, 8 - h, 1, h * 2 + 1, 'r'); } d.e(7, 8, 5.6, 3.6, 'o'); d.e(4.5, 8, 2.4, 2.8, 'y'); d.p('k', 3, 7); d.p('y', 6, 7, 7, 9, 9, 7); d.p('w', 1, 3, 3, 14); }, PET);
add(G, A, 'vn-catra', 'Cá tra, cá basa', 'Tra and basa catfish', 'Những loài cá nuôi ở đồng bằng sông Cửu Long, xuất khẩu đi nhiều nước.',
  d => { d.bg('C'); d.e(7, 8, 6, 3, 'a'); d.e(7, 9, 5, 1.8, 'l'); d.tri(11, 5, 5, 6, 'A'); d.e(7, 8, 6, 3, 'a'); d.e(7, 9, 5, 1.6, 'l'); d.p('k', 3, 7); d.l(1, 8, 0, 6, 'k'); d.l(1, 9, 0, 11, 'k'); d.p('A', 6, 5, 8, 5); d.p('w', 2, 2, 13, 14); }, PET);
add(G, A, 'vn-chimlac', 'Chim Lạc', 'Lac bird', 'Chim linh vật khắc trên trống đồng Đông Sơn, gắn với tên gọi Lạc Việt của tổ tiên.',
  d => { d.bg('Y'); d.e(8, 8, 6.4, 6.4, 'y'); d.e(8, 8, 5, 5, 'Y'); d.e(8, 8, 3.4, 3.4, 'y'); d.e(8, 8, 1.6, 1.6, 'Y'); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; d.p('N', 8 + Math.cos(a) * 4.2, 8 + Math.sin(a) * 4.2); } d.l(5, 5, 11, 5, 'N'); d.p('N', 4, 4, 12, 4); }, PET);

// ----- Linh vật -----
add(G, B, 'vn-rong', 'Rồng', 'Dragon', 'Linh vật gắn với nước và quyền lực, như tên "Thăng Long" nghĩa là rồng bay lên, đặt cho kinh đô năm 1010.',
  d => { d.bg('r'); d.l(1, 12, 4, 6, 'y'); d.l(4, 6, 8, 11, 'y'); d.l(8, 11, 11, 5, 'y'); d.l(2, 12, 5, 6, 'o'); d.l(5, 6, 8, 12, 'o'); d.l(8, 12, 11, 6, 'o'); d.e(12, 4, 2.6, 2.2, 'y'); d.p('k', 13, 3); d.p('w', 14, 5, 15, 4); d.l(11, 2, 10, 0, 'y'); d.l(14, 2, 15, 0, 'y'); d.p('R', 4, 8, 8, 9, 3, 13); }, PET);
add(G, B, 'vn-tulinh', 'Tứ linh (Long, Lân, Quy, Phụng)', 'The Four Sacred Animals', 'Bốn linh vật hàng đầu, hiện diện ở đình, chùa, lăng tẩm.',
  d => { d.bg('k'); d.r(1, 1, 6, 6, 'r'); d.r(9, 1, 6, 6, 'y'); d.r(1, 9, 6, 6, 'g'); d.r(9, 9, 6, 6, 'b'); d.p('y', 2, 2, 5, 5, 3, 4); d.p('r', 10, 2, 13, 5, 11, 4); d.p('G', 2, 10, 5, 13, 4, 11); d.p('c', 10, 10, 13, 13, 12, 11); }, SC);
add(G, B, 'vn-kimquy', 'Rùa thần Kim Quy', 'Golden Turtle God (Kim Quy)', 'Theo truyền thuyết, rùa vàng giúp An Dương Vương xây thành Cổ Loa và cho mượn móng làm nỏ thần.',
  d => { d.bg('B'); d.e(8, 10, 6, 4, 'Y'); d.e(8, 9.5, 5, 3, 'y'); d.p('Y', 6, 8, 10, 8, 8, 10, 6, 11, 10, 11); d.e(13.5, 9, 1.8, 1.6, 'y'); d.p('k', 14, 8); d.r(3, 13, 2, 2, 'y'); d.r(11, 13, 2, 2, 'y'); d.p('w', 2, 2, 13, 3, 8, 1); }, PET);
add(G, B, 'vn-ruahogu', 'Rùa Hồ Gươm', 'Hoan Kiem Turtle', 'Hình ảnh gắn với truyền thuyết Lê Lợi trả gươm, người dân coi là biểu tượng của thủ đô.',
  d => { d.bg('C'); d.e(8, 9, 6.4, 4, 'G'); d.e(8, 8.5, 5.4, 3, 'g'); d.p('G', 6, 7, 10, 7, 8, 9, 6, 10, 10, 10); d.e(14, 9, 1.6, 1.4, 'G'); d.p('k', 14, 8); d.l(2, 2, 6, 6, 'w'); d.p('l', 1, 1, 3, 1); d.p('c', 2, 14, 12, 14); }, PET);
add(G, B, 'vn-lan', 'Lân (sư tử múa)', 'Lan (lion-unicorn)', 'Xuất hiện trong Tết Trung Thu, đình làng, mang ý nghĩa xua đuổi điều xấu.',
  d => { d.bg('r'); d.e(8, 8, 6, 5.4, 'y'); d.e(8, 8, 5, 4.4, 'o'); d.e(5.5, 6.5, 1.8, 1.8, 'w'); d.e(10.5, 6.5, 1.8, 1.8, 'w'); d.p('k', 5, 7, 11, 7); d.r(6, 10, 4, 2, 'R'); d.p('w', 6, 11, 9, 11); d.p('y', 2, 3, 13, 3, 8, 2); d.l(8, 2, 8, 5, 'r'); }, SC);
add(G, B, 'vn-thanhgiong', 'Thánh Gióng', 'Saint Giong', 'Vị anh hùng cưỡi ngựa sắt, nhổ tre đánh giặc rồi bay về trời, biểu tượng lòng yêu nước.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(6, 10, 5, 3, 'a'); d.r(3, 12, 1, 3, 'A'); d.r(8, 12, 1, 3, 'A'); d.e(11, 7, 2.2, 2, 'a'); d.p('k', 11, 6); d.e(8, 5, 1.6, 1.6, 's'); d.r(6, 6, 4, 4, 'y'); d.r(6, 3, 4, 1, 'a'); d.l(10, 7, 15, 1, 'G'); d.p('g', 14, 0, 15, 1); d.p('r', 2, 9); }, SC);
add(G, B, 'vn-12congiap', '12 con giáp Việt', 'Vietnamese zodiac', 'Giống lịch Trung Hoa nhưng người Việt có mèo thay thỏ, nên đặc biệt có năm Quý Mão là năm con mèo.',
  d => { d.bg('r'); d.e(8, 8, 7, 7, 'y'); d.e(8, 8, 5.6, 5.6, 'r'); for (let i = 0; i < 12; i++) { const a = i / 12 * 6.28; d.p(i % 2 ? 'w' : 'y', 8 + Math.cos(a) * 6.4, 8 + Math.sin(a) * 6.4); } d.e(8, 8, 2.6, 2.6, 'y'); d.p('R', 7, 7, 9, 7); d.p('r', 8, 9); }, SC);

// ----- Tín ngưỡng -----
add(G, C, 'vn-thotoitien', 'Thờ cúng tổ tiên', 'Ancestor worship', 'Nhà nào cũng có bàn thờ, thắp hương ngày rằm, mùng một và dịp giỗ, Tết.',
  d => { d.bg('R'); d.r(5, 7, 6, 7, 'N'); d.r(3, 12, 10, 3, 'n'); d.r(6, 4, 4, 3, 'e'); d.l(5, 7, 5, 3, 'a'); d.l(8, 7, 8, 2, 'a'); d.l(11, 7, 11, 3, 'a'); d.p('r', 5, 2, 8, 1, 11, 2); d.p('w', 6, 0, 9, 0); d.p('y', 6, 9, 9, 9); }, SC);
add(G, C, 'vn-thomau', 'Thờ Mẫu Tam phủ', 'Mother Goddess worship (Tam phu)', 'Tín ngưỡng thờ các vị Mẫu cai quản trời, đất, nước, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) ghi nhận năm 2016, với nghi lễ hầu đồng.',
  d => { d.bg('r'); d.e(8, 5, 2.4, 2.6, 's'); d.r(5, 1, 6, 2, 'y'); d.p('k', 7, 5, 9, 5); d.r(4, 8, 8, 7, 'o'); d.r(4, 8, 8, 1, 'y'); d.r(1, 9, 3, 4, 'g'); d.r(12, 9, 3, 4, 'c'); d.p('y', 8, 10, 7, 12, 9, 12); d.p('w', 3, 1, 12, 1); }, SC);
add(G, C, 'vn-thohungvuong', 'Thờ Hùng Vương', 'Hung Kings worship', 'Tín ngưỡng tôn vinh tổ tiên chung của dân tộc, trung tâm là đền Hùng ở Phú Thọ.',
  d => { d.bg('c'); d.tri(0, 7, 16, 8, 'G'); d.r(5, 8, 6, 4, 'r'); d.tri(3, 5, 10, 3, 'y'); d.r(7, 9, 2, 3, 'k'); d.r(0, 13, 16, 3, 'g'); d.p('y', 8, 4); d.p('r', 2, 3, 13, 3); }, SC);
add(G, C, 'vn-tubatu', 'Tứ bất tử', 'The Four Immortals', 'Bốn vị thánh bất tử gồm Tản Viên Sơn Thánh, Thánh Gióng, Chử Đồng Tử và Liễu Hạnh, đại diện cho sức mạnh, đất nước, tình yêu và gia đình.',
  d => { d.bg('l'); for (const [x, c] of [[2, 'g'], [6, 'r'], [10, 'b'], [14, 'p']]) { d.e(x, 4, 1.4, 1.6, 's'); d.r(x - 1, 6, 3, 8, c); d.p('y', x, 9); } d.r(0, 14, 16, 2, 'a'); }, SC);
add(G, C, 'vn-phatgiao', 'Phật giáo', 'Buddhism', 'Du nhập từ rất sớm, giữ vai trò lớn trong đời sống tinh thần, với những ngôi chùa như chùa Một Cột, chùa Hương.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(7, 8, 2, 5, 'e'); d.r(4, 6, 8, 2, 'r'); d.tri(3, 3, 10, 3, 'y'); d.p('y', 8, 2); d.r(2, 9, 12, 1, 'e'); d.e(3, 13, 2, 1, 'p'); d.e(13, 13, 2, 1, 'p'); d.r(7, 13, 2, 2, 'N'); }, SC);
add(G, C, 'vn-nhogiao', 'Nho giáo và Đạo giáo', 'Confucianism and Taoism', 'Nho giáo để lại Văn Miếu – Quốc Tử Giám và truyền thống hiếu học, còn Đạo giáo hòa vào những tín ngưỡng dân gian.',
  d => { d.bg('t'); d.r(2, 5, 12, 9, 'r'); d.tri(0, 1, 16, 4, 'k'); d.r(2, 5, 12, 1, 'y'); d.r(3, 6, 2, 8, 'R'); d.r(11, 6, 2, 8, 'R'); d.r(6, 8, 4, 6, 'k'); d.p('y', 8, 0, 4, 9, 12, 9); }, SC);
add(G, C, 'vn-tongiaokhac', 'Công giáo, Cao Đài, Hòa Hảo, Hồi giáo', 'Catholic, Cao Dai, Hoa Hao and Islam', 'Những tôn giáo khác cùng tồn tại, ví dụ Nhà thờ Đức Bà ở Thành phố Hồ Chí Minh, Tòa Thánh Cao Đài ở Tây Ninh.',
  d => { d.bg('c'); d.r(1, 6, 5, 9, 'R'); d.r(2, 2, 1, 4, 'R'); d.r(4, 2, 1, 4, 'R'); d.tri(1, 0, 4, 2, 'r'); d.r(8, 8, 7, 7, 'w'); d.tri(7, 4, 9, 4, 'y'); d.e(11, 6, 1.6, 1.6, 'b'); d.p('b', 11, 7); d.r(2, 9, 2, 6, 'k'); d.r(10, 11, 3, 4, 'k'); }, SC);
add(G, C, 'vn-ongtao', 'Thành hoàng làng và Ông Công Ông Táo', 'Village guardian and the Kitchen Gods', 'Thần bảo hộ làng và vị thần bếp, ngày 23 tháng Chạp âm lịch đưa Ông Táo lên trời.',
  d => { d.bg('R'); d.r(3, 9, 10, 6, 'N'); d.e(5, 7, 1.6, 1.6, 's'); d.r(4, 9, 3, 2, 'r'); d.e(8, 7, 1.6, 1.6, 's'); d.r(7, 9, 3, 2, 'b'); d.e(11, 7, 1.6, 1.6, 's'); d.r(10, 9, 3, 2, 'g'); d.p('y', 4, 11, 8, 11, 12, 11); d.p('o', 7, 2, 8, 1, 9, 2); d.p('r', 8, 4); }, SC);

// ----- Lịch sử -----
add(G, E, 'vn-vanlang', 'Văn Lang – Âu Lạc', 'Van Lang – Au Lac', 'Nhà nước đầu tiên theo truyền thuyết, với Hùng Vương và An Dương Vương, kinh đô Cổ Loa.',
  d => { d.bg('Y'); d.e(8, 8, 7, 7, 'y'); d.e(8, 8, 5.6, 5.6, 'Y'); d.e(8, 8, 3.6, 3.6, 'y'); d.e(8, 8, 1.6, 1.6, 'Y'); for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28; d.p('N', 8 + Math.cos(a) * 4.8, 8 + Math.sin(a) * 4.8); } d.p('r', 8, 8); }, SC);
add(G, E, 'vn-bacthuoc', 'Bắc thuộc (111 trước Công nguyên – 938)', 'Northern rule (111 BCE – 938)', 'Thời kỳ bị phương Bắc cai trị, nổi lên các cuộc khởi nghĩa của Hai Bà Trưng, Bà Triệu, Lý Bí, Khúc Thừa Dụ.',
  d => { d.bg('A'); d.r(0, 13, 16, 3, 'K'); d.e(4, 8, 1.6, 1.6, 's'); d.r(3, 10, 3, 5, 'r'); d.e(10, 8, 1.6, 1.6, 's'); d.r(9, 10, 3, 5, 'y'); d.l(7, 3, 7, 13, 'N'); d.r(7, 3, 4, 3, 'r'); d.p('y', 8, 4, 9, 4); d.p('k', 3, 7, 5, 7, 9, 7, 11, 7); }, SC);
add(G, E, 'vn-bachdang', 'Chiến thắng Bạch Đằng (938)', 'Bach Dang victory (938)', 'Ngô Quyền đóng cọc ngầm trên sông, chấm dứt thời Bắc thuộc.',
  d => { d.bg('c'); d.r(0, 8, 16, 8, 'C'); d.r(0, 8, 16, 1, 'b'); for (const x of [3, 6, 9, 12]) { d.r(x, 9, 1, 5, 'N'); d.p('n', x, 9); } d.r(2, 5, 6, 3, 'N'); d.l(5, 5, 5, 1, 'k'); d.r(5, 1, 3, 2, 'r'); d.p('w', 1, 15, 10, 15, 14, 14); }, SC);
add(G, E, 'vn-ly', 'Triều Lý (1009–1225)', 'Ly dynasty (1009–1225)', 'Lý Thái Tổ dời đô về Thăng Long năm 1010, xây Văn Miếu, mở trường học.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 8, 12, 5, 'r'); d.tri(0, 3, 16, 5, 'y'); d.r(7, 9, 2, 4, 'R'); d.p('y', 8, 2); d.e(3, 5, 1.2, 1.2, 'o'); d.e(13, 5, 1.2, 1.2, 'o'); d.l(5, 3, 11, 3, 'Y'); }, SC);
add(G, E, 'vn-tran', 'Triều Trần (1225–1400)', 'Tran dynasty (1225–1400)', 'Ba lần đánh thắng quân Mông – Nguyên, với Trần Hưng Đạo là vị tướng nổi tiếng nhất.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(2, 9, 12, 3, 'N'); d.l(8, 9, 8, 1, 'k'); d.r(8, 1, 5, 4, 'r'); d.p('y', 10, 2); d.r(3, 6, 4, 3, 'e'); d.p('k', 4, 7); d.p('w', 1, 14, 6, 15, 12, 14); d.l(14, 3, 14, 11, 'a'); }, SC);
add(G, E, 'vn-lamson', 'Khởi nghĩa Lam Sơn và triều Lê sơ (1428)', 'Lam Son uprising and early Le dynasty (1428)', 'Lê Lợi và Nguyễn Trãi đánh đuổi quân Minh, viết Bình Ngô đại cáo.',
  d => { d.bg('G'); d.l(8, 15, 8, 2, 'a'); d.l(9, 15, 9, 3, 'l'); d.r(5, 9, 6, 2, 'y'); d.r(6, 11, 4, 2, 'N'); d.p('w', 8, 1); d.p('r', 2, 4, 13, 4); d.l(1, 14, 4, 10, 'n'); d.l(15, 14, 12, 10, 'n'); d.r(0, 14, 16, 2, 'g'); }, SC);
add(G, E, 'vn-taysonh', 'Nhà Tây Sơn (1778–1802)', 'Tay Son dynasty (1778–1802)', 'Nguyễn Huệ (Quang Trung) đánh thắng quân Thanh tại Đống Đa năm 1789.',
  d => { d.bg('r'); d.l(2, 15, 2, 2, 'N'); d.r(2, 2, 8, 6, 'y'); d.p('r', 5, 4, 6, 5, 4, 5, 5, 6); d.e(12, 10, 3, 2.4, 'd'); d.r(10, 11, 1, 3, 'd'); d.r(14, 11, 1, 3, 'd'); d.e(14, 8, 1.4, 1.4, 'd'); d.p('w', 14, 7); d.r(0, 14, 16, 2, 'R'); }, SC);
add(G, E, 'vn-nguyen', 'Triều Nguyễn (1802–1945)', 'Nguyen dynasty (1802–1945)', 'Triều đại phong kiến cuối cùng, kinh đô ở Huế, đổi tên nước thành Việt Nam năm 1804 dưới thời Gia Long.',
  d => { d.bg('y'); d.e(8, 6, 3, 3, 's'); d.r(5, 1, 6, 3, 'k'); d.r(11, 6, 1, 8, 'k'); d.r(3, 8, 10, 7, 'r'); d.r(3, 8, 10, 1, 'Y'); d.p('k', 7, 6, 9, 6); d.p('y', 8, 11, 6, 13, 10, 13); }, SC);
add(G, E, 'vn-doclap', 'Cách mạng Tháng Tám (1945) và Quốc khánh 2/9', 'August Revolution (1945)', 'Nước Việt Nam Dân chủ Cộng hòa tuyên bố độc lập ngày 2 tháng 9 năm 1945.',
  d => { d.bg('r'); d.l(7, 3, 7, 6, 'y'); d.p('y', 6, 6, 8, 6, 5, 7, 9, 7, 6, 9, 8, 9, 7, 10, 7, 7); d.tri(2, 3, 12, 11, 'y'); d.tri(2, 3, 12, 11, 'r'); d.r(0, 0, 16, 16, 'r'); d.tri(3, 2, 10, 12, 'y'); d.tri(4, 3, 8, 10, 'r'); d.tri(5, 5, 6, 8, 'y'); }, SC);
add(G, E, 'vn-dienbien', 'Chiến thắng Điện Biên Phủ (1954)', 'Dien Bien Phu victory (1954)', 'Kết thúc cuộc kháng chiến chống Pháp.',
  d => { d.bg('G'); d.tri(0, 6, 8, 9, 'g'); d.tri(8, 5, 8, 10, 'g'); d.r(0, 13, 16, 3, 'n'); d.l(8, 13, 8, 4, 'N'); d.r(8, 4, 5, 3, 'r'); d.p('y', 10, 5); d.p('k', 1, 13, 14, 12); d.p('w', 3, 2, 12, 2); }, SC);
add(G, E, 'vn-doimoi', 'Thống nhất (1975) và Đổi Mới (1986)', 'Reunification (1975) and Doi Moi (1986)', 'Ngày 30 tháng 4 năm 1975 chấm dứt chiến tranh, năm 1986 mở ra cải cách kinh tế.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 5, 4, 8, 'A'); d.r(6, 2, 4, 11, 'a'); d.r(11, 7, 4, 6, 'A'); d.p('y', 2, 6, 7, 4, 7, 7, 12, 9); d.l(0, 15, 15, 14, 'N'); d.p('r', 8, 0); }, SC);
add(G, E, 'vn-wto', 'Gia nhập WTO (2007)', 'Joining the WTO (2007)', 'Tổ chức Thương mại Thế giới (WTO) năm 2007 đánh dấu bước hội nhập sâu vào thương mại quốc tế.',
  d => { d.bg('B'); d.e(8, 8, 6.4, 6.4, 'b'); d.e(8, 8, 5.4, 5.4, 'c'); d.l(2, 8, 14, 8, 'b'); d.l(8, 2, 8, 14, 'b'); d.l(4, 4, 12, 12, 'g'); d.l(12, 4, 4, 12, 'g'); d.p('G', 5, 6, 10, 5, 11, 10, 6, 11); }, SC);

// ----- Tác phẩm tiêu biểu -----
add(G, F, 'vn-kieu', 'Truyện Kiều (Nguyễn Du)', 'The Tale of Kieu (Nguyen Du)', 'Truyện thơ lục bát gồm 3.254 câu, kể số phận người con gái tài sắc, được xem là đỉnh cao của văn học chữ Nôm.',
  d => { d.r(2, 1, 12, 14, 'v'); d.r(2, 1, 2, 14, 'V'); d.e(8, 6, 2.4, 2.4, 's'); d.r(6, 3, 4, 1, 'k'); d.r(6, 9, 4, 4, 'p'); d.p('k', 7, 6, 9, 6); d.r(2, 14, 12, 1, 'y'); }, H);
add(G, F, 'vn-chinhphu', 'Chinh phụ ngâm', 'Chinh phu ngam (Lament of a Warrior\'s Wife)', 'Khúc ngâm nói về nỗi lòng người vợ có chồng ra chiến trận.',
  d => { d.r(2, 1, 12, 14, 'A'); d.r(2, 1, 2, 14, 'K'); d.l(12, 3, 12, 12, 'w'); d.r(10, 3, 3, 3, 'r'); d.e(7, 8, 2, 2, 's'); d.r(5, 10, 4, 4, 'l'); d.r(2, 14, 12, 1, 'y'); }, H);
add(G, F, 'vn-codich', 'Truyện dân gian: Sọ Dừa, Tấm Cám, Thạch Sanh', 'Folk tales: So Dua, Tam Cam, Thach Sanh', 'Những truyện cổ tích nuôi lớn cả thế hệ trẻ thơ.',
  d => { d.r(2, 1, 12, 14, 'o'); d.r(2, 1, 2, 14, 'O'); d.e(8, 7, 3, 3, 'g'); d.p('G', 6, 6, 10, 6, 8, 5); d.l(8, 10, 8, 13, 'G'); d.p('y', 8, 7); d.r(2, 14, 12, 1, 'y'); }, H);
add(G, F, 'vn-vanhochiendai', 'Văn học hiện đại', 'Modern literature', 'Tắt đèn (Ngô Tất Tố), Số đỏ (Vũ Trọng Phụng), Dế Mèn phiêu lưu ký (Tô Hoài), những tác phẩm được học trong nhà trường.',
  d => { d.r(1, 3, 6, 11, 'r'); d.r(5, 2, 6, 12, 'b'); d.r(9, 4, 6, 10, 'g'); for (const x of [2, 6, 10]) d.p('y', x, 6, x + 1, 6, x, 9, x + 1, 9); d.r(0, 14, 16, 1, 'N'); }, H);

// ----- Người nổi tiếng -----
add(G, J, 'vn-tranhungdao', 'Trần Hưng Đạo', 'Tran Hung Dao', 'Đại tướng nhà Trần, chỉ huy ba lần kháng chiến chống quân Mông – Nguyên.', d => { person(d, 'r', 'y', 'b'); d.r(3, 12, 10, 1, 'y'); d.p('y', 4, 0, 11, 0); }, SC);
add(G, J, 'vn-nguyentrai', 'Nguyễn Trãi', 'Nguyen Trai', 'Nhà văn, nhà chiến lược của Lam Sơn, tác giả Bình Ngô đại cáo, được UNESCO vinh danh là danh nhân văn hóa thế giới.', d => { person(d, 'e', 'k', 'g'); d.r(11, 10, 3, 5, 'w'); d.r(11, 10, 3, 1, 'k'); }, SC);
add(G, J, 'vn-quangtrung', 'Nguyễn Huệ (Quang Trung)', 'Nguyen Hue (Quang Trung)', 'Vị vua Tây Sơn, nổi tiếng với những chiến dịch hành quân thần tốc.', d => { person(d, 'r', 'y', 'y'); d.p('R', 5, 10, 10, 10, 8, 12); }, SC);
add(G, J, 'vn-nguyendu', 'Nguyễn Du', 'Nguyen Du', 'Đại thi hào, tác giả Truyện Kiều, được UNESCO vinh danh năm 2013.', d => { person(d, 'v', 'k', 'n'); d.r(3, 11, 2, 5, 'e'); d.l(13, 4, 13, 15, 'N'); d.p('y', 13, 3); }, SC);
add(G, J, 'vn-hxh', 'Hồ Xuân Hương', 'Ho Xuan Huong', 'Nữ thi sĩ thế kỷ 18–19, thơ Nôm sắc sảo, hàm ý và dí dỏm.', d => { person(d, 'p', null, 'v'); d.r(4, 2, 8, 3, 'k'); d.p('r', 3, 4, 12, 4); d.p('y', 8, 12); }, SC);
add(G, J, 'vn-hochiminh', 'Hồ Chí Minh', 'Ho Chi Minh', 'Nhà lãnh đạo, người đọc Tuyên ngôn Độc lập ngày 2 tháng 9 năm 1945, được UNESCO vinh danh năm 1987.', d => { person(d, 'r', null, 'W', 'w'); d.p('w', 7, 8, 8, 9, 9, 8); d.p('W', 7, 10, 8, 11); d.p('y', 8, 1); }, SC);
add(G, J, 'vn-vonguyengiap', 'Võ Nguyên Giáp', 'Vo Nguyen Giap', 'Đại tướng, người chỉ huy chiến dịch Điện Biên Phủ năm 1954.', d => { person(d, 'G', 'G', 'G', 'w'); d.p('y', 6, 12, 10, 12, 6, 10); }, SC);
add(G, J, 'vn-vancao', 'Văn Cao', 'Van Cao', 'Nhạc sĩ sáng tác Tiến quân ca, bài quốc ca của Việt Nam.', d => { person(d, 'u', null, 'n'); d.p('k', 6, 1, 7, 0); d.r(11, 10, 3, 4, 'y'); d.p('k', 12, 11, 13, 12); d.p('r', 3, 13); }, SC);
add(G, J, 'vn-tcs', 'Trịnh Công Sơn', 'Trinh Cong Son', 'Nhạc sĩ của những ca khúc trữ tình, như "Diễm xưa" và "Một cõi đi về".', d => { person(d, 'B', null, 'a'); d.l(2, 14, 9, 10, 'N'); d.e(11, 13, 2.2, 1.8, 'n'); d.p('c', 3, 2, 12, 3, 14, 9); }, SC);
add(G, J, 'vn-ngobaochau', 'Ngô Bảo Châu', 'Ngo Bao Chau', 'Nhà toán học, đạt Huy chương Fields năm 2010.', d => { person(d, 'l', null, 'b'); d.p('k', 6, 5, 7, 5, 9, 5, 10, 5); d.r(11, 11, 4, 3, 'w'); d.p('k', 12, 12, 13, 12, 12, 13); d.p('y', 2, 3); }, SC);
add(G, J, 'vn-phamtuan', 'Phạm Tuân', 'Pham Tuan', 'Phi công, người Việt Nam đầu tiên bay vào vũ trụ năm 1980.', d => { person(d, 'B', null, 'w', 'w'); d.e(8, 6, 4.4, 4.6, 'l'); d.e(8, 6, 3, 3.4, 's'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); d.p('w', 1, 2, 14, 3, 12, 12); d.p('y', 14, 1); }, SC);
add(G, J, 'vn-hoangxuanvinh', 'Hoàng Xuân Vinh', 'Hoang Xuan Vinh', 'Vận động viên bắn súng, đạt huy chương vàng Olympic đầu tiên của Việt Nam năm 2016.', d => { person(d, 'y', null, 'r'); d.e(8, 14, 3, 1.8, 'y'); d.e(8, 14, 3, 1.8, 'Y'); d.e(8, 14, 1.8, 1, 'y'); d.l(12, 9, 15, 7, 'a'); d.p('y', 14, 4); }, SC);
