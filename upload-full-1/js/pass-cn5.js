import { add, SC, setCC } from './pass-kit.js';
setCC('cn');
// Trung Quốc · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Động vật', B = 'Linh vật', C = 'Tín ngưỡng', E = 'Lịch sử', F = 'Tứ đại danh tác', J = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const face = (d, c = 's') => { d.e(8, 7, 4, 4.4, c); d.r(0, 0, 16, 1, '_'); };

// ----- Động vật -----
add(G, A, 'cn-panda', 'Gấu trúc khổng lồ', 'Giant panda', 'Biểu tượng quốc gia, sống ở vùng núi Tứ Xuyên, Thiểm Tây và Cam Túc, ăn gần như chỉ trúc.',
  d => { d.bg('h'); d.e(8, 9, 6, 5.6, 'w'); d.e(3.5, 4.5, 2, 2, 'd'); d.e(12.5, 4.5, 2, 2, 'd'); d.e(5.5, 8, 1.8, 2.2, 'd'); d.e(10.5, 8, 1.8, 2.2, 'd'); d.p('w', 5, 8, 11, 8); d.e(8, 11, 1.2, 0.9, 'd'); d.p('d', 7, 12, 9, 12); d.l(14, 15, 14, 9, 'G'); }, PET);
add(G, A, 'cn-crane', 'Hạc', 'Crane', 'Chim biểu tượng cho tuổi thọ và sự thanh cao, hay xuất hiện trong tranh thủy mặc và cùng cây thông.',
  d => { d.bg('l'); d.e(7, 9, 4.6, 3.4, 'w'); d.l(10, 7, 12, 3, 'w'); d.e(12.5, 2.6, 1.4, 1.4, 'w'); d.p('r', 12, 1); d.l(13, 3, 15, 4, 'o'); d.l(5, 12, 4, 15, 'd'); d.l(8, 12, 8, 15, 'd'); d.p('k', 2, 9, 3, 8, 4, 9); d.p('d', 12, 3); }, PET);
add(G, A, 'cn-carp', 'Cá chép', 'Carp', 'Theo truyền thuyết, cá chép vượt được Vũ Môn sẽ hóa rồng, nên hình ảnh này dành cho những ai thi đỗ thành đạt.',
  d => { d.bg('C'); d.e(7, 8, 5.6, 3.6, 'o'); d.tri(11, 4, 5, 8, 'r'); d.dtri(11, 4, 5, 8, 'r'); d.e(7, 8, 5.6, 3.6, 'o'); d.e(4.5, 8, 2.4, 2.8, 'y'); d.p('k', 3, 7); d.p('y', 6, 7, 7, 9, 9, 7, 9, 9); d.p('w', 1, 3, 14, 13, 3, 14); }, PET);
add(G, A, 'cn-goldfish', 'Cá vàng', 'Goldfish', 'Loài cá cảnh được nuôi từ nhiều thế kỷ, tiếng gọi "kim ngư" đồng âm với "vàng ngọc đầy nhà".',
  d => { d.bg('c'); d.e(6, 8, 4, 3.4, 'o'); d.e(11, 8, 3, 3, 'r'); d.e(11, 8, 3, 3, 'o'); d.tri(9, 5, 6, 7, 'r'); d.e(6, 8, 4, 3.4, 'o'); d.p('w', 5, 7); d.p('k', 5, 7); d.p('y', 7, 9, 8, 8); d.p('w', 2, 3, 13, 13, 3, 14); }, PET);
add(G, A, 'cn-monkey', 'Khỉ vàng mũi hếch', 'Golden snub-nosed monkey', 'Loài khỉ lông vàng, mũi hếch, sống ở rừng núi cao miền tây.',
  d => { d.bg('G'); d.e(8, 8, 6, 5.8, 'o'); d.e(8, 9, 4, 4, 'c'); d.e(8, 9, 3.6, 3.6, 's'); d.p('k', 6, 8, 10, 8); d.p('b', 5, 6, 11, 6); d.p('d', 8, 10, 7, 11, 9, 11); d.p('y', 2, 4, 13, 4, 8, 2); d.e(8, 2.5, 3, 1.6, 'y'); }, PET);
add(G, A, 'cn-magpie', 'Chim hỷ thước', 'Magpie', 'Loài chim được cho là báo tin vui; trong truyền thuyết Thất Tịch, chúng bắc cầu cho Ngưu Lang và Chức Nữ gặp nhau.',
  d => { d.bg('l'); d.e(7, 9, 4.4, 3, 'k'); d.e(7, 10, 2.4, 1.6, 'w'); d.e(11.5, 6, 2.2, 2.2, 'k'); d.p('y', 13, 6, 14, 6); d.tri(0, 9, 6, 6, 'B'); d.dtri(0, 9, 6, 6, 'B'); d.e(7, 9, 4.4, 3, 'k'); d.e(7, 10, 2.4, 1.6, 'w'); d.p('w', 11, 5); d.l(6, 12, 5, 15, 'd'); d.l(8, 12, 9, 15, 'd'); d.p('b', 4, 9, 5, 10); }, PET);
add(G, A, 'cn-pekingese', 'Chó Cố Cung (Pekingese)', 'Pekingese dog', 'Giống chó nhỏ lông dài từng được nuôi trong cung đình, người xưa coi nó như tiểu sư tử.',
  d => { d.bg('t'); d.e(8, 9, 6, 5, 'o'); d.e(3, 8, 2.6, 4, 'O'); d.e(13, 8, 2.6, 4, 'O'); d.e(8, 10, 3.2, 3, 'd'); d.e(8, 10, 2.8, 2.6, 'n'); d.p('w', 5, 6, 11, 6); d.p('k', 5, 7, 11, 7, 8, 9); d.p('x', 7, 12, 9, 12); d.r(7, 11, 2, 1, 'r'); }, PET);
add(G, A, 'cn-mastiff', 'Chó ngao Tây Tạng', 'Tibetan mastiff', 'Giống chó lớn, lông dày, người Tạng dùng để canh đàn gia súc trên cao nguyên.',
  d => { d.bg('c'); d.e(8, 9, 6.6, 5.8, 'N'); d.e(3, 5, 2, 3, 'k'); d.e(13, 5, 2, 3, 'k'); d.e(8, 11, 3.6, 3, 'o'); d.e(8, 11, 3, 2.4, 'O'); d.p('w', 5, 7, 11, 7); d.p('k', 5, 8, 11, 8, 8, 10, 7, 12, 9, 12); d.p('o', 4, 5, 12, 5); d.r(0, 14, 16, 2, 'w'); }, PET);

// ----- Linh vật -----
add(G, B, 'cn-dragon', 'Rồng (Long)', 'Dragon (long)', 'Linh vật quyền lực nhất, gắn với hoàng đế, mưa gió và may mắn. Rồng Trung Hoa khác rồng phương Tây ở chỗ nó thường là biểu tượng tốt lành.',
  d => { d.bg('r'); d.l(1, 12, 4, 6, 'y'); d.l(4, 6, 8, 11, 'y'); d.l(8, 11, 11, 5, 'y'); d.l(2, 12, 5, 6, 'o'); d.l(5, 6, 8, 12, 'o'); d.l(8, 12, 11, 6, 'o'); d.e(12.5, 4, 2.6, 2.2, 'y'); d.p('k', 13, 3); d.p('w', 14, 5, 15, 4); d.l(11, 2, 10, 0, 'y'); d.l(14, 2, 15, 0, 'y'); d.p('R', 4, 8, 8, 9, 3, 13); }, PET);
add(G, B, 'cn-fenghuang', 'Phượng hoàng (Fenghuang)', 'Fenghuang (Chinese phoenix)', 'Chim linh vật đứng đầu các loài chim, thường đi cùng rồng để chỉ đôi vợ chồng hòa hợp.',
  d => { d.bg('u'); d.e(8, 8, 3.4, 4, 'r'); d.e(8, 3.5, 2, 2, 'r'); d.p('y', 8, 1, 7, 1, 9, 1); d.p('k', 8, 3); d.l(9, 4, 11, 4, 'o'); d.l(6, 7, 1, 4, 'o'); d.l(10, 7, 15, 4, 'o'); d.l(6, 9, 2, 8, 'y'); d.l(10, 9, 14, 8, 'y'); d.l(8, 12, 5, 15, 'g'); d.l(8, 12, 8, 15, 'y'); d.l(8, 12, 11, 15, 'c'); }, PET);
add(G, B, 'cn-qilin', 'Kỳ lân (Qilin)', 'Qilin', 'Linh thú có sừng, thân nai, đuôi bò, xuất hiện khi có bậc thánh nhân ra đời.',
  d => { d.bg('c'); d.e(8, 9, 5, 3, 'y'); d.e(12.5, 5, 2.4, 2.4, 'g'); d.l(13, 3, 13, 0, 'y'); d.p('k', 13, 5); d.r(4, 11, 1, 4, 'Y'); d.r(11, 11, 1, 4, 'Y'); d.l(3, 8, 0, 6, 'g'); d.p('r', 8, 7, 6, 9, 10, 9, 11, 3); d.p('w', 14, 6); }, PET);
add(G, B, 'cn-xuanwu', 'Rùa thần (Huyền Vũ)', 'Black Tortoise (Xuanwu)', 'Rùa quấn rắn, biểu tượng cho phương Bắc và sự bền bỉ.',
  d => { d.bg('B'); d.e(8, 10, 6, 4, 'G'); d.e(8, 9.5, 5, 3, 'g'); d.p('G', 6, 8, 10, 8, 8, 10, 6, 11, 10, 11); d.e(13.5, 9, 1.8, 1.6, 'g'); d.p('k', 14, 8); d.r(3, 13, 2, 2, 'g'); d.r(11, 13, 2, 2, 'g'); d.l(2, 3, 5, 6, 'V'); d.l(5, 6, 8, 3, 'V'); d.l(8, 3, 11, 6, 'v'); d.p('r', 11, 6); }, PET);
add(G, B, 'cn-sixiang', 'Tứ tượng', 'Four Symbols', 'Bốn linh thú canh bốn phương là Thanh Long (Đông), Chu Tước (Nam), Bạch Hổ (Tây) và Huyền Vũ (Bắc).',
  d => { d.bg('k'); d.r(1, 1, 6, 6, 'g'); d.r(9, 1, 6, 6, 'r'); d.r(1, 9, 6, 6, 'w'); d.r(9, 9, 6, 6, 'b'); d.p('G', 2, 2, 5, 5, 3, 4); d.p('y', 10, 2, 13, 5, 11, 4); d.p('k', 2, 10, 4, 12, 5, 14); d.p('c', 10, 10, 13, 13, 12, 11); }, SC);
add(G, B, 'cn-pixiu', 'Tỳ hưu (Pixiu)', 'Pixiu', 'Linh thú như sư tử có cánh, được tin là hút tài lộc, thường làm thành vòng tay hoặc tượng nhỏ.',
  d => { d.bg('u'); d.e(8, 9, 5.4, 4, 'Y'); d.e(11.5, 5.5, 2.8, 2.6, 'y'); d.e(8, 9, 4, 2.8, 'y'); d.l(5, 6, 1, 3, 'Y'); d.l(6, 7, 2, 6, 'y'); d.p('k', 12, 5); d.p('r', 13, 7); d.l(12, 3, 14, 1, 'Y'); d.r(4, 12, 1, 3, 'Y'); d.r(11, 12, 1, 3, 'Y'); d.p('w', 8, 8); }, PET);
add(G, B, 'cn-guardlions', 'Sư tử đá (Shishi)', 'Guardian lions', 'Cặp tượng sư tử đặt trước cổng cung điện, đền chùa và nha môn, canh giữ và xua tà.',
  d => { d.bg('r'); d.r(2, 12, 5, 4, 'a'); d.r(9, 12, 5, 4, 'a'); d.e(4.5, 9, 2.8, 2.8, 'l'); d.e(11.5, 9, 2.8, 2.8, 'l'); d.r(3, 10, 3, 3, 'l'); d.r(10, 10, 3, 3, 'l'); d.p('k', 4, 8, 12, 8); d.p('A', 3, 12, 12, 12, 5, 13); d.e(4.5, 6.4, 1.2, 1.2, 'l'); d.p('y', 8, 3); }, SC);
add(G, B, 'cn-zodiac', '12 con giáp', 'Chinese zodiac', 'Chuột, trâu, hổ, mèo (thỏ), rồng, rắn, ngựa, dê, khỉ, gà, chó, lợn, gắn với từng năm âm lịch và tuổi của mỗi người.',
  d => { d.bg('r'); d.e(8, 8, 7, 7, 'y'); d.e(8, 8, 5.6, 5.6, 'r'); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; d.p(i % 2 ? 'w' : 'y', 8 + Math.cos(a) * 6.4, 8 + Math.sin(a) * 6.4); } d.e(8, 8, 2.6, 2.6, 'y'); d.p('R', 8, 8); }, SC);
add(G, B, 'cn-fulushou', 'Phúc Lộc Thọ', 'Fu Lu Shou', 'Ba vị thần biểu tượng cho hạnh phúc, quan lộc và tuổi thọ, thường được đặt thành bộ ba tượng trong nhà.',
  d => { d.bg('u'); for (const [x, c] of [[3, 'r'], [8, 'b'], [13, 'g']]) { d.e(x, 4, 1.6, 1.8, 's'); d.r(x - 2, 6, 5, 8, c); d.r(x - 2, 6, 5, 1, 'y'); d.p('w', x - 1, 7, x + 1, 7); } d.e(8, 1.8, 2.2, 1.2, 'e'); d.p('y', 3, 10, 13, 10); }, SC);
add(G, B, 'cn-mascots', 'Linh vật đại hội thể thao', 'Olympic mascots', 'Nhóm Phúc Oa (Fuwa) của Thế vận hội Bắc Kinh 2008 và gấu trúc Băng Đốn Đốn (Bing Dwen Dwen) của đại hội mùa đông 2022 đều lấy hình ảnh văn hóa truyền thống.',
  d => { d.bg('l'); d.e(8, 9, 6, 6, 'w'); d.e(8, 9, 5, 5, 'l'); d.e(8, 9, 3.6, 3.8, 'k'); d.e(8, 9, 3, 3.2, 'c'); d.e(5.5, 8.5, 1, 1.4, 'k'); d.e(10.5, 8.5, 1, 1.4, 'k'); d.e(3.5, 4, 2, 2, 'w'); d.e(12.5, 4, 2, 2, 'w'); d.p('r', 7, 11, 8, 11); d.p('y', 2, 14, 13, 14); }, PET);

// ----- Tín ngưỡng -----
add(G, C, 'cn-confucian', 'Nho giáo', 'Confucianism', 'Hệ tư tưởng dựa trên đạo đức, hiếu đễ và trật tự xã hội, ảnh hưởng sâu sắc đến giáo dục và gia đình ở Trung Quốc và cả đông Á.',
  d => { d.bg('t'); d.r(2, 2, 12, 12, 'e'); d.r(2, 2, 12, 1, 'N'); d.r(2, 13, 12, 1, 'N'); for (const y of [4, 6, 8, 10]) d.r(3, y, 10, 1, y % 4 ? 'k' : 'a'); d.p('r', 12, 11); d.r(2, 2, 1, 12, 'n'); }, H);
add(G, C, 'cn-taoism', 'Đạo giáo', 'Taoism', 'Triết lý sống thuận theo tự nhiên của Lão Tử, sau phát triển thành tôn giáo với nhiều thần tiên và thuật luyện đan.',
  d => { d.bg('c'); d.e(8, 8, 7, 7, 'w'); d.e(8, 8, 7, 7, 'k'); d.fan(8, 8, 7, 'w'); d.r(0, 0, 16, 1, '_'); for (let y = 1; y < 15; y++) for (let x = 1; x < 15; x++) { const dx = x + .5 - 8, dy = y + .5 - 8; if (dx * dx + dy * dy <= 49) d.put(x, y, dx > 0 ? 'k' : 'w'); } d.e(8, 5, 3, 3, 'w'); d.e(8, 11, 3, 3, 'k'); d.e(8, 5, 1, 1, 'k'); d.e(8, 11, 1, 1, 'w'); }, SC);
add(G, C, 'cn-buddhism', 'Phật giáo', 'Buddhism', 'Du nhập từ Ấn Độ khoảng đầu thế kỷ 1, nay có bốn núi thiêng là Ngũ Đài, Nga Mi, Cửu Hoa và Phổ Đà, và có cả Phật giáo Tạng truyền ở Tây Tạng.',
  d => { d.bg('o'); d.e(8, 4, 2.8, 3, 's'); d.p('k', 8, 1, 7, 2, 9, 2); d.r(5, 7, 6, 4, 'r'); d.e(8, 12, 6, 2.6, 'y'); d.e(8, 12, 4.4, 1.8, 'Y'); d.p('y', 8, 0); d.p('k', 7, 4, 9, 4); d.e(8, 8, 1.2, 1.2, 'u'); }, SC);
add(G, C, 'cn-threeteachings', 'Tam giáo hợp nhất', 'The Three Teachings', 'Nhiều người dân cùng lúc thờ Nho, Đạo và Phật, mỗi bên đảm nhận một vai trò khác nhau trong đời sống tinh thần.',
  d => { d.bg('e'); d.e(8, 5, 2, 2, 'r'); d.e(4, 11, 2, 2, 'b'); d.e(12, 11, 2, 2, 'o'); d.l(8, 7, 4, 10, 'k'); d.l(8, 7, 12, 10, 'k'); d.l(5, 11, 11, 11, 'k'); d.p('y', 8, 5, 4, 11, 12, 11); }, SC);
add(G, C, 'cn-ancestors', 'Thờ cúng tổ tiên', 'Ancestor worship', 'Nghi lễ dâng hương, đốt giấy vàng mã và viếng mộ vào dịp Thanh Minh, thể hiện lòng hiếu thảo.',
  d => { d.bg('R'); d.r(5, 7, 6, 7, 'N'); d.r(3, 12, 10, 3, 'n'); d.r(6, 4, 4, 3, 'e'); d.l(5, 7, 5, 3, 'a'); d.l(8, 7, 8, 2, 'a'); d.l(11, 7, 11, 3, 'a'); d.p('r', 5, 2, 8, 1, 11, 2); d.p('w', 6, 0, 9, 0); d.p('y', 6, 9, 9, 9); }, SC);
add(G, C, 'cn-caishen', 'Thần Tài (Caishen)', 'God of Wealth (Caishen)', 'Vị thần ban tài lộc, được rước đón vào ngày mồng 5 Tết.',
  d => { d.bg('r'); d.e(8, 5, 2.6, 2.8, 's'); d.r(5, 1, 6, 2, 'k'); d.r(3, 3, 2, 1, 'k'); d.r(11, 3, 2, 1, 'k'); d.r(4, 8, 8, 7, 'y'); d.r(4, 8, 8, 1, 'Y'); d.p('k', 7, 5, 9, 5); d.p('r', 8, 7); d.e(8, 11, 2, 1.8, 'o'); d.p('Y', 8, 10, 7, 11, 9, 11); }, SC);
add(G, C, 'cn-guanyu', 'Quan Công (Guan Yu)', 'Guan Yu', 'Danh tướng thời Tam Quốc, được thờ như biểu tượng của trung nghĩa và cả ở nhiều tiệm buôn bán.',
  d => { d.bg('G'); d.e(8, 6, 3, 3.4, 'R'); d.l(5, 9, 6, 14, 'k'); d.l(11, 9, 10, 14, 'k'); d.p('k', 7, 5, 9, 5); d.l(6, 4, 6, 6, 'k'); d.r(4, 10, 8, 5, 'g'); d.r(4, 10, 8, 1, 'y'); d.p('k', 5, 2, 10, 2); d.r(5, 1, 6, 2, 'G'); d.l(14, 2, 14, 15, 'a'); d.p('y', 14, 1); }, SC);
add(G, C, 'cn-mazu', 'Ma Tổ (Thiên Hậu)', 'Mazu (Tianhou)', 'Nữ thần biển được ngư dân và thương nhân ven biển thờ phụng, có nhiều miếu ở Phúc Kiến, Quảng Đông và Đài Loan.',
  d => { d.bg('C'); d.e(8, 5, 2.6, 2.8, 's'); d.r(5, 1, 6, 2, 'y'); d.p('r', 6, 2, 10, 2); d.r(4, 8, 8, 7, 'r'); d.p('k', 7, 5, 9, 5); d.p('x', 8, 6); d.r(0, 12, 16, 4, 'b'); d.p('c', 1, 13, 5, 14, 10, 13, 14, 14); d.p('y', 8, 9); }, SC);
add(G, C, 'cn-fengshui', 'Phong thủy (Fengshui)', 'Feng shui', 'Quan niệm về cách sắp đặt nhà cửa, mộ phần theo hướng gió, hướng nước để được hài hòa và may mắn.',
  d => { d.bg('Y'); d.e(8, 8, 7, 7, 'n'); d.e(8, 8, 6, 6, 'u'); d.e(8, 8, 2.4, 2.4, 'N'); d.l(8, 1, 8, 4, 'r'); d.p('r', 8, 0); d.p('k', 8, 8, 3, 8, 13, 8, 8, 3, 8, 13); d.p('N', 4, 4, 12, 4, 4, 12, 12, 12); d.p('w', 8, 8); }, H);
add(G, C, 'cn-eightimmortals', 'Bát Tiên', 'Eight Immortals', 'Tám vị tiên trong dân gian, mỗi vị đại diện cho một tầng lớp người: già, trẻ, nam, nữ, sang, nghèo.',
  d => { d.bg('l'); for (let i = 0; i < 8; i++) { const x = 1 + (i % 4) * 4, y = i < 4 ? 2 : 9; d.e(x + 1, y + 1, 1.2, 1.2, 's'); d.r(x, y + 2, 3, 4, ['r', 'b', 'g', 'p', 'y', 'v', 'o', 'c'][i]); } }, SC);

// ----- Lịch sử -----
add(G, E, 'cn-xiashangzhou', 'Thời Hạ, Thương, Chu', 'Xia, Shang and Zhou', 'Những triều đại đầu tiên. Chữ giáp cốt khắc trên xương và mai rùa thời Thương là dạng chữ Hán cổ nhất người ta tìm thấy.',
  d => { d.bg('t'); d.e(8, 8, 6, 5.6, 'e'); d.e(8, 8, 5, 4.6, 'W'); d.l(8, 3, 8, 13, 'N'); d.l(5, 6, 11, 6, 'N'); d.l(5, 9, 11, 9, 'N'); d.l(8, 6, 5, 4, 'n'); d.p('N', 4, 12, 12, 12, 6, 11); }, H);
add(G, E, 'cn-warring', 'Xuân Thu – Chiến Quốc', 'Spring and Autumn / Warring States', 'Thời kỳ loạn lạc nhưng có hoàng kim của tư tưởng, với Khổng Tử, Lão Tử, Tôn Tử và nhiều nhà tư tưởng khác.',
  d => { d.bg('A'); d.l(3, 14, 3, 2, 'n'); d.l(8, 14, 8, 2, 'n'); d.l(13, 14, 13, 2, 'n'); d.tri(3, 1, 5, 4, 'r'); d.tri(8, 2, 5, 4, 'y'); d.tri(13, 1, 3, 4, 'b'); d.r(0, 14, 16, 2, 'N'); d.p('w', 1, 8, 6, 10, 11, 7); }, SC);
add(G, E, 'cn-qin', 'Triều Tần (221 trước Công nguyên)', 'Qin dynasty (221 BCE)', 'Tần Thủy Hoàng thống nhất Trung Quốc, thống nhất chữ viết, tiền tệ và đo lường.',
  d => { d.bg('k'); d.e(8, 8, 6, 6, 'Y'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 5.2, 5.2, 'Y'); d.e(8, 8, 4.6, 4.6, 'y'); d.r(6, 6, 4, 4, 'k'); d.r(6, 6, 4, 4, '_'); d.r(6, 6, 4, 4, 'k'); d.p('Y', 8, 1, 8, 15, 1, 8, 15, 8); }, SC);
add(G, E, 'cn-han', 'Triều Hán', 'Han dynasty', 'Triều đại kéo dài hơn bốn thế kỷ. Dân tộc chính của Trung Quốc ngày nay tự gọi là người Hán từ đây; Trương Khiên được cử ra Tây Vực, mở đường cho Con đường Tơ lụa.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.e(8, 10, 3, 2, 'n'); d.r(5, 7, 6, 3, 'n'); d.e(4, 7, 1.6, 2, 'N'); d.p('k', 4, 7); d.r(7, 3, 1, 4, 'N'); d.r(8, 3, 5, 3, 'r'); d.p('y', 9, 4, 11, 4); d.l(0, 14, 15, 12, 'Y'); }, SC);
add(G, E, 'cn-threekingdoms', 'Tam Quốc', 'Three Kingdoms', 'Ba nước Ngụy, Thục, Ngô tranh hùng, trở thành nguồn cảm hứng cho tiểu thuyết "Tam Quốc diễn nghĩa".',
  d => { d.bg('A'); d.l(8, 2, 8, 15, 'N'); d.r(8, 2, 5, 3, 'r'); d.r(2, 4, 5, 3, 'b'); d.r(8, 8, 5, 3, 'g'); d.p('y', 10, 3, 4, 5, 10, 9); d.r(0, 14, 16, 2, 'N'); }, SC);
add(G, E, 'cn-tang', 'Triều Đường', 'Tang dynasty', 'Thời kỳ thịnh trị, thơ ca phát triển rực rỡ, kinh đô Trường An là một trong những thành phố lớn nhất thế giới lúc bấy giờ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 8, 12, 5, 'r'); d.tri(0, 3, 16, 5, 'k'); d.r(7, 9, 2, 4, 'R'); d.r(3, 9, 2, 2, 'u'); d.r(11, 9, 2, 2, 'u'); d.p('y', 8, 2, 2, 8, 13, 8); d.r(1, 13, 14, 1, 'w'); }, SC);
add(G, E, 'cn-song', 'Triều Tống', 'Song dynasty', 'Thời kỳ kinh tế và thương mại sầm uất, in ấn và la bàn được dùng rộng rãi.',
  d => { d.bg('e'); d.r(1, 11, 14, 3, 'N'); d.r(0, 8, 16, 3, 'n'); d.r(3, 5, 10, 3, 'W'); d.tri(2, 2, 12, 3, 'k'); d.l(4, 14, 4, 15, 'k'); d.p('w', 5, 9, 9, 9, 13, 9); d.p('y', 8, 6); d.r(2, 14, 12, 1, 'a'); }, SC);
add(G, E, 'cn-yuan', 'Triều Nguyên', 'Yuan dynasty', 'Do người Mông Cổ lập nên, đây là lần đầu toàn bộ Trung Quốc nằm dưới sự cai trị của một dân tộc phương Bắc.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.e(8, 9, 5, 3.4, 'N'); d.e(12.5, 5, 2.6, 2.6, 'N'); d.p('k', 13, 4); d.r(4, 11, 1, 4, 'n'); d.r(11, 11, 1, 4, 'n'); d.l(2, 8, 0, 10, 'N'); d.l(8, 0, 8, 6, 'a'); d.r(8, 0, 4, 2, 'r'); }, SC);
add(G, E, 'cn-ming', 'Triều Minh', 'Ming dynasty', 'Xây Tử Cấm Thành, hoàn chỉnh Vạn Lý Trường Thành và có các chuyến đi biển lớn của Trịnh Hòa.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(8, 12, 6, 2, 'N'); d.r(7, 3, 1, 9, 'N'); d.r(8, 3, 5, 5, 'r'); d.r(8, 3, 5, 1, 'y'); d.r(2, 6, 4, 4, 'R'); d.r(5, 2, 1, 9, 'N'); d.p('y', 10, 5); d.p('w', 1, 14, 6, 15, 12, 14); }, SC);
add(G, E, 'cn-qing', 'Triều Thanh (1644–1912)', 'Qing dynasty (1644–1912)', 'Triều đại phong kiến cuối cùng, do người Mãn lập nên.',
  d => { d.bg('y'); d.e(8, 6, 3, 3, 's'); d.r(5, 1, 6, 3, 'k'); d.l(8, 6, 8, 3, 'k'); d.r(11, 6, 1, 8, 'k'); d.r(3, 8, 10, 7, 'b'); d.r(3, 8, 10, 1, 'y'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 4, 8, 0); d.p('y', 8, 11); }, SC);
add(G, E, 'cn-xinhai', 'Cách mạng Tân Hợi (1911)', 'Xinhai Revolution (1911)', 'Lật đổ triều Thanh và chấm dứt hơn hai nghìn năm chế độ quân chủ.',
  d => { d.bg('b'); d.r(0, 0, 16, 5, 'b'); d.r(0, 5, 16, 11, 'r'); d.r(0, 0, 8, 6, 'b'); d.e(4, 3, 2.4, 2.4, 'w'); d.e(4, 3, 1.6, 1.6, 'b'); d.p('w', 4, 0, 4, 6, 1, 3, 7, 3); d.e(4, 3, 1, 1, 'w'); d.r(8, 0, 8, 6, 'r'); d.r(0, 6, 16, 3, 'w'); d.r(0, 9, 16, 7, 'r'); d.p('b', 4, 12); }, SC);
add(G, E, 'cn-prc', 'Nước Cộng hòa Nhân dân Trung Hoa (1949)', 'People\'s Republic of China (1949)', 'Thành lập ngày 1 tháng 10 năm 1949, và từ cuối thập niên 1970 đến nay đã trải qua cải cách mở cửa về kinh tế.',
  d => { d.bg('r'); d.l(4, 4, 4, 9, 'y'); d.p('y', 3, 6, 5, 6, 4, 5, 4, 7); d.p('y', 8, 3, 10, 5, 10, 8, 8, 10); d.e(4, 6, 2.2, 2.2, 'y'); d.e(4, 6, 1.2, 1.2, 'y'); for (const [x, y] of [[9, 2], [11, 4], [11, 7], [9, 9]]) d.e(x, y, 0.9, 0.9, 'y'); }, SC);
add(G, E, 'cn-fourinventions', 'Tứ đại phát minh', 'Four Great Inventions', 'Giấy, in ấn, thuốc súng và la bàn, những phát minh được Trung Quốc truyền đến các nền văn minh khác.',
  d => { d.bg('e'); d.r(1, 1, 6, 6, 'w'); d.r(1, 1, 6, 1, 'W'); d.l(2, 3, 5, 3, 'k'); d.l(2, 5, 5, 5, 'k'); d.r(9, 1, 6, 6, 'n'); d.p('w', 10, 3, 13, 3, 11, 5); d.e(4, 11.5, 3, 3, 'a'); d.l(4, 9, 4, 14, 'r'); d.l(4, 14, 4, 14, 'b'); d.r(10, 9, 4, 5, 'r'); d.r(11, 7, 1, 2, 'y'); d.p('o', 11, 6); }, SC);
add(G, E, 'cn-vietnam', 'Quan hệ lịch sử với Việt Nam', 'Historical ties with Vietnam', 'Việt Nam trải qua thời kỳ Bắc thuộc kéo dài từ khoảng năm 111 trước Công nguyên đến năm 938, khi Ngô Quyền thắng trận Bạch Đằng. Hai nền văn hóa vì thế có nhiều nét giao thoa, như chữ Hán, Tết và các món ăn.',
  d => { d.bg('e'); d.r(0, 0, 8, 16, 'r'); d.r(8, 0, 8, 16, 'r'); d.p('y', 3, 5, 3, 7, 2, 6, 4, 6); d.e(12, 8, 3.2, 3.2, 'y'); d.l(12, 5, 12, 11, 'r'); d.l(9, 8, 15, 8, 'r'); d.l(10, 6, 14, 10, 'r'); d.l(14, 6, 10, 10, 'r'); }, SC);

// ----- Tứ đại danh tác -----
add(G, F, 'cn-sanguo', 'Tam Quốc diễn nghĩa', 'Romance of the Three Kingdoms', 'Tiểu thuyết lịch sử của La Quán Trung về cuộc tranh hùng Ngụy, Thục, Ngô.',
  d => { d.r(2, 1, 12, 14, 'r'); d.r(2, 1, 2, 14, 'R'); d.r(5, 3, 7, 3, 'y'); d.p('y', 6, 8, 9, 8, 6, 10, 10, 10, 7, 12, 9, 12); d.r(2, 14, 12, 1, 'y'); d.l(11, 7, 11, 12, 'y'); }, H);
add(G, F, 'cn-shuihu', 'Thủy hử', 'Water Margin', 'Truyện của Thi Nại Am về 108 anh hùng lên núi Lương Sơn.',
  d => { d.r(2, 1, 12, 14, 'G'); d.r(2, 1, 2, 14, 'g'); d.r(5, 3, 7, 3, 'y'); d.l(6, 9, 11, 13, 'w'); d.l(11, 9, 6, 13, 'w'); d.p('y', 8, 9, 8, 13); d.r(2, 14, 12, 1, 'y'); }, H);
add(G, F, 'cn-xiyouji', 'Tây du ký', 'Journey to the West', 'Hành trình thỉnh kinh của Đường Tam Tạng cùng Tôn Ngộ Không và các đệ tử, do Ngô Thừa Ân biên soạn.',
  d => { d.r(2, 1, 12, 14, 'o'); d.r(2, 1, 2, 14, 'O'); d.e(8, 6, 2.8, 2.8, 'y'); d.e(8, 6.5, 2, 2, 's'); d.p('k', 7, 6, 9, 6); d.l(12, 5, 13, 12, 'y'); d.r(5, 9, 6, 4, 'r'); d.r(2, 14, 12, 1, 'y'); }, H);
add(G, F, 'cn-hongloumeng', 'Hồng lâu mộng', 'Dream of the Red Chamber', 'Tiểu thuyết của Tào Tuyết Cần về sự thịnh suy của một gia tộc lớn thời Thanh, thường được xem là đỉnh cao của tiểu thuyết cổ điển Trung Quốc.',
  d => { d.r(2, 1, 12, 14, 'v'); d.r(2, 1, 2, 14, 'V'); d.e(8, 7, 3, 3, 'p'); d.e(8, 7, 1.6, 1.6, 'x'); d.p('y', 8, 7); d.l(8, 10, 8, 13, 'G'); d.p('g', 6, 11, 10, 12); d.r(2, 14, 12, 1, 'y'); }, H);

// ----- Người nổi tiếng -----
add(G, J, 'cn-confucius', 'Khổng Tử', 'Confucius', 'Nhà tư tưởng, nhà giáo dục (551–479 trước Công nguyên), người sáng lập Nho giáo.',
  d => { d.bg('t'); d.e(8, 5, 3, 3.2, 's'); d.r(5, 1, 6, 2, 'k'); d.r(5, 7, 6, 8, 'n'); d.r(5, 7, 6, 1, 'N'); d.p('w', 6, 6, 8, 8, 10, 6, 7, 9, 9, 9); d.l(6, 6, 6, 9, 'w'); d.p('k', 7, 5, 9, 5); d.r(7, 10, 2, 5, 'e'); }, SC);
add(G, J, 'cn-laozi', 'Lão Tử', 'Laozi', 'Nhà tư tưởng được coi là tác giả "Đạo đức kinh", nền tảng của Đạo giáo.',
  d => { d.bg('l'); d.e(8, 5, 3, 3.2, 's'); d.r(5, 7, 6, 8, 'w'); d.p('w', 5, 3, 11, 3, 6, 9, 10, 9); d.l(6, 7, 6, 12, 'W'); d.l(10, 7, 10, 12, 'W'); d.p('k', 7, 5, 9, 5); d.e(8, 10, 1.4, 2.4, 'w'); d.l(13, 4, 13, 15, 'n'); d.e(13, 3.4, 1.6, 1.4, 'n'); }, SC);
add(G, J, 'cn-sunzi', 'Tôn Tử', 'Sun Tzu', 'Tác giả "Binh pháp Tôn Tử", cuốn sách binh pháp cổ được nghiên cứu ở khắp nơi, kể cả trong kinh doanh.',
  d => { d.bg('A'); d.r(2, 1, 12, 14, 'W'); d.r(2, 1, 12, 1, 'N'); d.r(2, 14, 12, 1, 'N'); d.r(2, 1, 1, 14, 'n'); d.r(13, 1, 1, 14, 'n'); for (let y = 3; y < 13; y += 2) d.r(4, y, 8, 1, 'k'); d.p('r', 10, 12); }, H);
add(G, J, 'cn-qinshihuang', 'Tần Thủy Hoàng', 'Qin Shi Huang', 'Hoàng đế đầu tiên của Trung Quốc thống nhất, người để lại lăng mộ cùng binh mã dũng.',
  d => { d.bg('k'); d.e(8, 7, 3.4, 3.6, 's'); d.r(4, 1, 8, 2, 'k'); d.l(4, 3, 4, 6, 'y'); d.l(12, 3, 12, 6, 'y'); d.r(5, 1, 6, 1, 'y'); d.r(4, 10, 8, 6, 'y'); d.r(4, 10, 8, 1, 'Y'); d.p('k', 7, 7, 9, 7); d.p('r', 8, 9); }, SC);
add(G, J, 'cn-wuzetian', 'Võ Tắc Thiên', 'Wu Zetian', 'Người phụ nữ duy nhất trong lịch sử Trung Quốc trực tiếp làm hoàng đế, lập ra triều Chu ngắn ngủi giữa thời Đường.',
  d => { d.bg('r'); d.e(8, 7, 3, 3.4, 's'); d.r(4, 1, 8, 3, 'k'); d.r(5, 0, 6, 1, 'y'); d.p('y', 4, 3, 11, 3); d.r(4, 10, 8, 6, 'y'); d.p('k', 7, 7, 9, 7); d.p('r', 8, 9); d.p('o', 3, 2, 12, 2); }, SC);
add(G, J, 'cn-libaidufu', 'Lý Bạch và Đỗ Phủ', 'Li Bai and Du Fu', 'Hai nhà thơ lớn nhất thời Đường, một người phiêu dật, một người trĩu nặng niềm đời.',
  d => { d.bg('B'); d.e(8, 6, 4, 4, 'u'); d.e(8, 6, 4, 4, 'y'); d.e(11, 5, 3.6, 3.6, 'B'); d.r(1, 9, 14, 1, 'a'); d.r(2, 10, 3, 5, 'e'); d.r(11, 10, 3, 5, 'e'); d.p('k', 3, 12, 12, 12); d.l(6, 13, 9, 13, 'n'); d.p('w', 2, 2, 13, 1); }, H);
add(G, J, 'cn-sushi', 'Tô Đông Pha', 'Su Dongpo', 'Nhà thơ, nhà văn, nhà thư pháp thời Tống, cũng nổi tiếng vì món thịt kho mang tên ông.',
  d => { d.bg('e'); d.e(8, 6, 3, 3.2, 's'); d.r(4, 1, 8, 3, 'k'); d.r(3, 2, 10, 1, 'k'); d.r(5, 9, 6, 6, 'n'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); d.r(7, 7, 2, 1, 'k'); d.l(12, 10, 15, 15, 'N'); }, SC);
add(G, J, 'cn-zhenghe', 'Trịnh Hòa', 'Zheng He', 'Đô đốc thời Minh (khoảng 1371–1433), dẫn các đội tàu lớn đi khắp Đông Nam Á, Ấn Độ Dương và đến tận bờ đông Phi.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(2, 9, 12, 3, 'N'); d.r(7, 2, 1, 7, 'k'); d.r(8, 2, 5, 3, 'r'); d.r(8, 5, 5, 3, 'y'); d.r(3, 4, 4, 4, 'r'); d.r(6, 2, 1, 7, 'k'); d.p('w', 3, 13, 9, 14, 13, 13); }, SC);
add(G, J, 'cn-sunyatsen', 'Tôn Trung Sơn', 'Sun Yat-sen', 'Nhà cách mạng, người đứng đầu Cuộc cách mạng Tân Hợi 1911, được nhiều người gọi là "quốc phụ".',
  d => { d.bg('b'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, 'k'); d.r(4, 9, 8, 7, 'G'); d.r(4, 9, 8, 1, 'g'); d.p('k', 7, 6, 9, 6); d.p('y', 6, 11, 10, 11, 6, 13, 10, 13); d.r(7, 8, 2, 1, 'k'); d.e(13, 3, 1.4, 1.4, 'w'); }, SC);
add(G, J, 'cn-luxun', 'Lỗ Tấn', 'Lu Xun', 'Nhà văn hiện đại nổi tiếng với truyện ngắn "Nhật ký người điên" và "A Q chánh truyện".',
  d => { d.bg('A'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, 'k'); d.r(4, 9, 8, 7, 'd'); d.p('k', 7, 6, 9, 6); d.r(6, 8, 4, 1, 'k'); d.p('w', 8, 10, 8, 13); d.r(1, 12, 3, 4, 'e'); d.r(1, 12, 3, 1, 'k'); }, SC);
add(G, J, 'cn-mouyan', 'Mạc Ngôn', 'Mo Yan', 'Nhà văn đạt giải Nobel Văn chương năm 2012.',
  d => { d.bg('u'); d.e(8, 8, 6, 6, 'Y'); d.e(8, 8, 5, 5, 'y'); d.e(8, 8, 3, 3, 'Y'); d.p('k', 8, 6, 7, 7, 9, 7, 8, 10, 7, 9, 9, 9); d.r(3, 14, 10, 1, 'Y'); d.p('w', 5, 5); }, H);
add(G, J, 'cn-tuyouyou', 'Đồ Du Du', 'Tu Youyou', 'Dược sĩ tìm ra artemisinin để điều trị sốt rét, đạt giải Nobel Y học năm 2015.',
  d => { d.bg('l'); d.l(8, 15, 8, 6, 'G'); d.p('g', 6, 5, 10, 5, 5, 7, 11, 7, 6, 9, 10, 9, 7, 3, 9, 3); d.r(7, 1, 2, 3, 'g'); d.r(5, 12, 6, 3, 'w'); d.r(7, 11, 2, 5, 'r'); d.r(5, 13, 6, 1, 'r'); }, SC);
add(G, J, 'cn-yuanlongping', 'Viên Long Bình', 'Yuan Longping', 'Nhà khoa học được biết đến với lúa lai, giúp tăng sản lượng lương thực.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); for (const x of [3, 7, 11]) { d.l(x, 14, x, 6, 'G'); d.p('y', x, 5, x - 1, 6, x + 1, 6, x - 1, 8, x + 1, 8); } d.l(1, 4, 14, 1, 'y'); d.e(13, 3, 1.4, 1.4, 'o'); }, SC);
add(G, J, 'cn-brucelee', 'Lý Tiểu Long (Bruce Lee)', 'Bruce Lee', 'Diễn viên võ thuật sinh ra ở Mỹ, lớn lên ở Hồng Kông, mang võ thuật Trung Hoa đến điện ảnh thế giới.',
  d => { d.bg('y'); d.e(8, 5, 2.8, 3, 's'); d.r(5, 2, 6, 2, 'k'); d.r(5, 8, 6, 4, 's'); d.l(5, 9, 2, 6, 's'); d.l(11, 9, 14, 11, 's'); d.l(6, 12, 4, 15, 'k'); d.l(10, 12, 12, 15, 'k'); d.r(6, 12, 4, 1, 'k'); d.p('k', 7, 5, 9, 5, 8, 7); }, SC);
add(G, J, 'cn-dengxiaoping', 'Đặng Tiểu Bình', 'Deng Xiaoping', 'Lãnh đạo khởi xướng công cuộc cải cách mở cửa kinh tế từ cuối năm 1978.',
  d => { d.bg('r'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, 'W'); d.r(4, 9, 8, 7, 'd'); d.p('k', 7, 6, 9, 6); d.p('w', 8, 9, 8, 15); d.r(7, 8, 2, 1, 'W'); d.p('y', 13, 3, 2, 3); }, SC);
