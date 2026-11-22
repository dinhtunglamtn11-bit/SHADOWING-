import { add, SC, setCC } from './pass-kit.js';
setCC('cn');
// Trung Quốc · Nhóm 3: Ẩm thực
const G = 3, A = 'Món nổi tiếng theo vùng', B = 'Mì, bánh và há cảo', C = 'Đồ uống và trà đạo', E = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const bowl = (d, c = 'w', rim = 'a') => { d.e(8, 9, 7, 5.5, c); d.r(0, 0, 16, 7, '_'); d.r(1, 6, 14, 1, rim); d.e(8, 6.5, 7, 1.4, rim); d.r(5, 14, 6, 1, rim); };

// ----- Món nổi tiếng theo vùng -----
add(G, A, 'cn-pekingduck', 'Vịt quay Bắc Kinh', 'Peking duck', 'Vịt quay da giòn, thái mỏng cuốn bánh tráng mỏng với hành, dưa leo và tương ngọt. Hiệu Toàn Tụ Đức (Quanjude) lập năm 1864 là cái tên nổi tiếng nhất.',
  d => { d.bg('t'); d.e(8, 9, 6.4, 4.6, 'O'); d.e(8, 9, 5.4, 3.8, 'o'); d.e(13.5, 6, 2, 1.8, 'O'); d.p('y', 14, 5); d.p('k', 14, 6); d.p('N', 4, 8, 7, 7, 10, 9, 6, 11, 9, 11); d.l(12, 7, 15, 8, 'y'); d.r(2, 14, 12, 1, 'w'); }, SC);
add(G, A, 'cn-dimsum', 'Dimsum (điểm tâm Quảng Đông)', 'Dim sum', 'Các món hấp, chiên nhỏ ăn kèm trà, nổi tiếng là há cảo tôm, xíu mại và bánh cuốn. Nét văn hóa đi kèm là "ẩm trà" (yum cha): ngồi quán uống trà và gọi từng xửng bánh.',
  d => { d.bg('W'); d.e(8, 10, 7, 5, 'n'); d.e(8, 9.5, 6.4, 4.4, 't'); d.e(8, 9, 5.6, 3.8, 'u'); d.e(6, 8, 1.8, 1.6, 'p'); d.e(10, 8, 1.8, 1.6, 'o'); d.e(8, 11, 1.8, 1.6, 'w'); d.l(0, 3, 15, 4, 'N'); d.l(0, 5, 15, 5, 'n'); }, SC);
add(G, A, 'cn-mapo', 'Ma bà đậu phụ', 'Mapo tofu', 'Đậu phụ mềm nấu trong nước sốt cay tê của tương đậu và hạt tiêu Tứ Xuyên. Tên món nghĩa là đậu phụ của bà già mặt rỗ ở Thành Đô.',
  d => { bowl(d, 'w'); d.e(8, 9, 6, 4, 'R'); d.r(0, 0, 16, 6, '_'); d.r(4, 7, 3, 3, 'w'); d.r(8, 8, 3, 3, 'e'); d.p('r', 3, 8, 12, 7, 8, 12); d.p('g', 6, 11, 11, 11, 5, 9); }, SC);
add(G, A, 'cn-kungpao', 'Gà Cung Bảo', 'Kung Pao chicken', 'Gà xào với đậu phộng và ớt khô, vị cay ngọt chua. Tên món nhắc đến một chức quan của Đinh Bảo Trinh, tổng đốc Tứ Xuyên thời Thanh.',
  d => { d.bg('W'); d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 6, 4, 'o'); for (const [x, y] of [[5, 8], [8, 7], [10, 9], [7, 11], [11, 11]]) d.r(x, y, 2, 2, 'u'); d.p('r', 4, 10, 9, 10, 12, 8); d.p('n', 6, 9, 10, 11, 6, 7); }, SC);
add(G, A, 'cn-hotpot', 'Lẩu Trùng Khánh', 'Chongqing hotpot', 'Nồi nước dùng cay đỏ rực, nhúng thịt, nội tạng và rau. Với dân bản địa, lẩu là món để cả nhóm ngồi quanh nồi và trò chuyện.',
  d => { d.bg('A'); d.e(8, 9, 7, 5, 'k'); d.e(8, 8, 6, 4, 'r'); d.l(8, 4, 8, 12, 'y'); d.l(3, 8, 13, 8, 'y'); d.p('R', 5, 6, 11, 10, 5, 10, 11, 6); d.p('g', 6, 6, 10, 10); d.p('w', 4, 2, 8, 0, 12, 2); d.p('p', 6, 9, 10, 7); }, SC);
add(G, A, 'cn-dongpo', 'Thịt kho Đông Pha', 'Dongpo pork', 'Thịt ba chỉ kho đến khi mềm tan, gắn với danh sĩ Tô Đông Pha, từng làm quan ở Hàng Châu. Người ta kể ông là người sáng tạo ra món này.',
  d => { d.bg('W'); d.r(3, 5, 10, 8, 'N'); d.r(3, 5, 10, 3, 'o'); d.r(3, 8, 10, 2, 'e'); d.r(3, 10, 10, 3, 'n'); d.r(3, 5, 10, 1, 'O'); d.p('g', 4, 3, 8, 2, 12, 3); d.r(2, 13, 12, 1, 'a'); }, SC);
add(G, A, 'cn-yangzhou', 'Cơm chiên Dương Châu', 'Yangzhou fried rice', 'Cơm chiên với trứng, tôm, thịt xá xíu và đậu Hà Lan, hạt cơm rời và vàng ươm.',
  d => { bowl(d, 'W'); d.e(8, 8, 6, 3.8, 'u'); d.r(0, 0, 16, 5, '_'); d.p('y', 4, 8, 8, 7, 11, 9, 6, 10); d.p('g', 5, 9, 9, 10, 11, 7); d.p('r', 7, 9, 10, 8, 4, 10); d.p('o', 8, 10, 12, 10); }, SC);
add(G, A, 'cn-riverfish', 'Cá hấp kiểu Giang Nam', 'Jiangnan steamed fish', 'Cá tươi hấp hoặc chiên sốt, tiêu biểu cho lối ăn nhẹ, giữ vị gốc của vùng sông nước.',
  d => { d.bg('W'); d.e(7, 8, 6, 3.6, 'l'); d.tri(11, 5, 5, 6, 'l'); d.dtri(11, 5, 5, 6, 'a'); d.e(7, 8, 6, 3.6, 'l'); d.p('k', 3, 7); d.p('a', 5, 9, 7, 9, 9, 9); d.p('g', 6, 7, 8, 6, 9, 7); d.p('r', 7, 8); d.r(1, 12, 14, 1, 'a'); }, SC);

// ----- Mì, bánh và há cảo -----
add(G, B, 'cn-lamian', 'Mì kéo Lan Châu', 'Lanzhou lamian', 'Sợi mì kéo bằng tay trong nước dùng bò trong, ăn kèm ớt, củ cải trắng và rau mùi. Thợ giỏi kéo được cả sợi mảnh như tóc.',
  d => { bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 2) d.l(x, 8, x + 2, 11, 't'); d.p('r', 5, 7, 10, 7); d.p('g', 7, 6, 9, 6, 11, 8); d.p('w', 6, 9, 9, 9); d.l(11, 0, 13, 6, 'N'); d.l(13, 0, 12, 6, 'n'); }, SC);
add(G, B, 'cn-dandan', 'Mì Đản Đản (Dandan)', 'Dandan noodles', 'Mì Tứ Xuyên trộn sốt cay và mè, tên gọi gắn với những gánh hàng rong gánh bằng đòn gánh (dan) ngày xưa.',
  d => { bowl(d, 'W'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 2) d.l(x, 7, x + 2, 11, 't'); d.e(8, 8, 3.2, 2, 'R'); d.p('r', 8, 7, 6, 8, 10, 8); d.p('w', 7, 8, 9, 9); d.p('g', 5, 7, 11, 10); }, SC);
add(G, B, 'cn-jiaozi', 'Há cảo (Jiaozi)', 'Jiaozi dumplings', 'Bánh bột nhân thịt hoặc rau, luộc, hấp hoặc chiên. Ở miền Bắc, đây là món nhất định phải có vào đêm giao thừa.',
  d => { d.bg('W'); for (const [x, y] of [[3, 9], [8, 6], [10, 11]]) { d.e(x + 1.5, y + 1.5, 4.2, 2.6, 'w'); d.r(x - 2, y + 2, 8, 2, '_'); d.e(x + 1.5, y + 2, 4.2, 2.2, 'w'); for (let i = 0; i < 4; i++) d.p('e', x - 1 + i * 2, y); } d.p('a', 2, 13, 6, 14, 12, 14); d.r(0, 15, 16, 1, 'n'); }, SC);
add(G, B, 'cn-xlb', 'Tiểu long bao', 'Xiaolongbao', 'Bánh bao nhỏ hấp trong xửng tre, bên trong có nước súp nóng. Món này nổi tiếng ở Thượng Hải và vùng Giang Nam.',
  d => { d.e(8, 10, 7, 4.4, 'u'); d.r(1, 10, 14, 3, 'Y'); d.e(8, 11, 7, 3, 'y'); d.r(0, 0, 16, 8, '_'); d.e(8, 8, 3.6, 3.2, 'w'); d.e(8, 6.5, 2, 1.4, 'w'); d.p('e', 7, 5, 9, 5, 8, 4); d.p('W', 6, 8, 10, 8, 8, 9); d.r(1, 12, 14, 1, 'n'); d.r(1, 14, 14, 1, 'n'); }, SC);
add(G, B, 'cn-baozi', 'Bánh bao (Baozi)', 'Baozi buns', 'Bánh bột men hấp, nhân thịt, rau hoặc đậu, là bữa sáng quen thuộc của nhiều gia đình.',
  d => { d.e(8, 9, 6.4, 5, 'w'); d.e(8, 6, 5, 3.2, 'e'); d.p('W', 8, 3, 6, 4, 10, 4, 7, 5, 9, 5, 8, 6); d.p('W', 4, 10, 12, 10); d.e(8, 6, 5, 3.2, 'w'); d.p('W', 8, 3, 6, 4, 10, 4, 7, 5, 9, 5, 8, 6); d.r(2, 13, 12, 2, 'N'); d.r(2, 13, 12, 1, 'n'); }, SC);
add(G, B, 'cn-congee', 'Cháo (Zhou)', 'Congee (zhou)', 'Cháo gạo loãng ăn kèm trứng bắc thảo, thịt hoặc dưa muối, đặc biệt phổ biến ở miền Nam.',
  d => { bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'W'); d.r(0, 0, 16, 5, '_'); d.p('w', 4, 8, 6, 9, 9, 8, 11, 9, 7, 10, 10, 10); d.r(7, 8, 3, 2, 'k'); d.p('g', 5, 7, 11, 7); d.p('x', 9, 9); }, SC);

// ----- Đồ uống và trà đạo -----
add(G, C, 'cn-longjing', 'Trà xanh Long Tỉnh', 'Longjing green tea', 'Trà xanh nổi tiếng nhất ở Hàng Châu, lá dẹt, vị thanh và thơm hạt dẻ.',
  d => { d.bg('h'); d.e(8, 11, 6, 3.4, 'w'); d.r(0, 0, 16, 9, '_'); d.r(2, 9, 12, 1, 'a'); d.e(8, 9.5, 6, 1.4, 'g'); d.l(5, 6, 8, 3, 'G'); d.l(8, 3, 11, 6, 'g'); d.l(8, 3, 8, 8, 'G'); d.p('y', 4, 3, 12, 3); d.r(5, 13, 6, 1, 'a'); }, H);
add(G, C, 'cn-tieguanyin', 'Thiết Quan Âm', 'Tieguanyin', 'Loại trà ô long Phúc Kiến có hương hoa, thường được pha nhiều nước.',
  d => { d.bg('u'); d.e(8, 11, 6, 3.4, 'w'); d.r(0, 0, 16, 9, '_'); d.r(2, 9, 12, 1, 'a'); d.e(8, 9.5, 6, 1.4, 'o'); d.e(8, 5, 2.4, 2.4, 'p'); d.p('y', 8, 5); d.p('P', 5, 5, 11, 5, 8, 2); d.r(5, 13, 6, 1, 'a'); }, H);
add(G, C, 'cn-puer', 'Phổ Nhĩ (Pu\'er)', 'Pu\'er tea', 'Trà lên men của Vân Nam, ép thành bánh và càng để lâu càng được ưa chuộng.',
  d => { d.e(8, 8, 7, 6.4, 'N'); d.e(8, 8, 6, 5.4, 'n'); for (let i = 0; i < 12; i++) { const a = i * 0.9; d.put(8 + Math.cos(a) * i * 0.42, 8 + Math.sin(a) * i * 0.42, i % 2 ? 'N' : 't'); } d.p('w', 4, 5, 12, 11); d.e(8, 8, 1, 1, 'k'); }, H);
add(G, C, 'cn-dahongpao', 'Đại Hồng Bào', 'Da Hong Pao', 'Trà đá Vũ Di Sơn nổi tiếng bởi hương khói nhẹ và hậu vị bền.',
  d => { d.tri(0, 4, 16, 12, 'N'); d.tri(3, 7, 10, 9, 'n'); d.r(2, 12, 12, 4, 'N'); d.e(8, 5, 4, 2, 'r'); d.e(8, 5, 2, 1.2, 'R'); d.p('r', 3, 3, 12, 4); d.l(8, 7, 8, 10, 'N'); d.p('w', 12, 12, 4, 14); }, SC);
add(G, C, 'cn-flowertea', 'Trà hoa cúc và trà hoa nhài', 'Chrysanthemum and jasmine tea', 'Những loại trà ướp hoa phổ biến ở cả miền Bắc lẫn miền Nam.',
  d => { d.bg('u'); d.r(3, 6, 10, 8, 'c'); d.r(3, 6, 10, 1, 'w'); d.l(13, 8, 15, 9, 'a'); d.l(15, 9, 13, 12, 'a'); d.e(8, 9, 3.6, 2.2, 'Y'); for (const [x, y] of [[6, 8], [8, 7], [10, 8], [7, 10], [10, 10]]) d.e(x, y, 1.2, 1.2, 'w'); d.p('y', 8, 9); d.r(4, 14, 8, 1, 'a'); }, H);
add(G, C, 'cn-gongfu', 'Trà đạo Công phu', 'Gongfu tea ceremony', 'Lối pha trà nhỏ, dùng ấm nhỏ và chén nhỏ, nhấn mạnh sự tỉ mỉ ở từng bước, phổ biến ở Phúc Kiến, Quảng Đông và Triều Châu. Chữ "công phu" nghĩa là tốn thời gian và công sức.',
  d => { d.r(0, 12, 16, 4, 'n'); d.r(0, 12, 16, 1, 'N'); d.e(6, 8, 3.4, 3, 'V'); d.r(4, 4, 4, 2, 'V'); d.p('v', 6, 3); d.l(9, 7, 12, 6, 'V'); d.e(13, 10, 2.2, 1.6, 'w'); d.e(4, 12, 1.6, 1, 'w'); d.p('c', 13, 9, 11, 9); d.p('w', 9, 1, 11, 0, 5, 0); }, H);
add(G, C, 'cn-bubbletea', 'Trà sữa trân châu', 'Bubble tea', 'Ra đời ở Đài Loan vào thập niên 1980 và lan sang đại lục, nay có mặt trong hầu hết các thành phố lớn.',
  d => { d.r(4, 3, 8, 11, 'u'); d.r(4, 3, 8, 2, 'w'); d.r(5, 12, 6, 2, 'N'); for (const [x, y] of [[5, 13], [7, 12], [9, 13], [10, 12], [6, 11]]) d.p('k', x, y); d.p('N', 8, 13); d.l(9, 0, 8, 7, 'p'); d.l(10, 0, 9, 7, 'P'); d.p('w', 5, 7, 6, 8); d.r(4, 14, 8, 1, 'u'); }, H);
add(G, C, 'cn-baijiu', 'Rượu trắng (Baijiu)', 'Baijiu', 'Rượu chưng cất từ ngũ cốc, nồng độ cao; Mao Đài (Moutai) của Quý Châu là nhãn hiệu nổi tiếng nhất.',
  d => { d.r(6, 0, 4, 3, 'r'); d.r(5, 3, 6, 11, 'w'); d.r(5, 3, 6, 1, 'l'); d.r(5, 6, 6, 5, 'r'); d.r(5, 6, 6, 1, 'y'); d.r(5, 10, 6, 1, 'y'); d.p('y', 8, 8); d.r(5, 14, 6, 1, 'a'); }, H);
add(G, C, 'cn-shaoxing', 'Rượu Thiệu Hưng', 'Shaoxing rice wine', 'Rượu gạo vàng lên men ở Chiết Giang, vừa uống vừa dùng nấu ăn.',
  d => { d.e(8, 9, 5.4, 5.6, 'n'); d.r(5, 2, 6, 3, 'N'); d.r(4, 3, 8, 1, 'N'); d.r(5, 7, 6, 4, 'r'); d.r(5, 7, 6, 1, 'y'); d.p('y', 7, 9, 9, 9, 8, 10); d.r(5, 14, 6, 1, 'N'); d.p('t', 4, 8, 4, 11); }, SC);
add(G, C, 'cn-soymilk', 'Sữa đậu nành (Doujiang)', 'Soy milk (doujiang)', 'Món uống sáng quen thuộc, thường ăn kèm bánh quẩy.',
  d => { d.r(3, 6, 8, 8, 'w'); d.r(3, 6, 8, 1, 'l'); d.e(7, 6, 4, 1.2, 'e'); d.l(11, 8, 14, 8, 'a'); d.l(14, 8, 14, 11, 'a'); d.l(14, 11, 11, 12, 'a'); d.e(12, 3, 3, 1.4, 'o'); d.e(12, 3, 2, 0.8, 'O'); d.p('y', 11, 3, 13, 3); d.r(3, 14, 8, 1, 'a'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, E, 'cn-mooncake', 'Bánh trung thu', 'Mooncake', 'Bánh nướng nhân hạt sen, đậu đỏ hoặc trứng muối, dùng vào Tết Trung Thu để tượng trưng cho trăng tròn và sum họp.',
  d => { d.bg('B'); d.e(8, 9, 6.6, 5.6, 'n'); d.e(8, 9, 5.6, 4.6, 'o'); d.e(8, 9, 3.4, 2.8, 'O'); d.p('N', 8, 8, 7, 9, 9, 9, 8, 10); d.p('y', 8, 9); d.p('w', 1, 1, 14, 2, 12, 0); d.e(13, 3, 1, 1, 'y'); }, SC);
add(G, E, 'cn-tangyuan', 'Bánh trôi tangyuan', 'Tangyuan', 'Viên bột nếp nhân mè hay đậu phộng, ăn vào Tết Nguyên Tiêu rằm tháng Giêng; hình tròn tượng trưng cho đoàn viên.',
  d => { bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); for (const [x, y] of [[5, 7], [8, 6], [11, 7], [7, 9], [10, 9]]) { d.e(x, y, 1.9, 1.9, 'w'); d.p('l', x - 1, y); } }, SC);
add(G, E, 'cn-zongzi', 'Bánh tông (Zongzi)', 'Zongzi', 'Gạo nếp gói lá tre hoặc lá sậy, ăn vào Tết Đoan Ngọ để tưởng nhớ nhà thơ Khuất Nguyên.',
  d => { d.tri(2, 3, 12, 11, 'G'); d.dtri(2, 8, 12, 6, 'g'); d.r(7, 3, 2, 11, 'g'); d.l(5, 8, 11, 8, 'y'); d.l(5, 9, 11, 9, 'Y'); d.p('G', 6, 12, 9, 12); d.p('h', 6, 6, 10, 10); d.r(7, 13, 2, 3, 'r'); }, SC);
add(G, E, 'cn-niangao', 'Bánh niên cao', 'Niangao', 'Bánh gạo nếp ăn dịp năm mới; tên gọi đồng âm với "năm sau cao hơn năm trước".',
  d => { d.r(2, 9, 12, 4, 'n'); d.r(3, 5, 10, 4, 'N'); d.r(4, 2, 8, 3, 'n'); d.r(2, 9, 12, 1, 't'); d.r(3, 5, 10, 1, 't'); d.r(4, 2, 8, 1, 't'); d.p('r', 8, 3, 7, 7, 8, 11); d.r(2, 13, 12, 1, 'N'); }, SC);
add(G, E, 'cn-fishdish', 'Cá trong bữa tất niên', 'Fish at the New Year dinner', 'Món không thể thiếu trong bữa tất niên, vì chữ "cá" đồng âm với "dư dả".',
  d => { d.bg('r'); d.e(7, 8, 6, 3.8, 'o'); d.tri(11, 4, 5, 8, 'o'); d.e(7, 8, 6, 3.8, 'o'); d.e(5, 8, 3, 3, 'y'); d.p('k', 3, 7); d.p('R', 7, 6, 8, 8, 9, 10); d.p('y', 13, 6, 13, 10); d.p('w', 1, 13, 14, 13); }, SC);
add(G, E, 'cn-longevity', 'Mì trường thọ', 'Longevity noodles', 'Sợi mì dài ăn vào ngày sinh nhật, kiêng cắt đứt sợi để cầu thọ.',
  d => { bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); d.l(3, 7, 7, 11, 't'); d.l(5, 7, 10, 11, 't'); d.l(8, 6, 12, 10, 't'); d.l(10, 7, 6, 10, 'e'); d.p('r', 8, 7, 5, 9); d.p('y', 11, 8); d.p('g', 6, 6); d.l(12, 0, 13, 5, 'N'); d.l(13, 0, 14, 5, 'n'); }, SC);
add(G, E, 'cn-laba', 'Cháo Lạp bát', 'Laba congee', 'Cháo tám loại ngũ cốc và quả khô, nấu vào ngày mùng 8 tháng Chạp.',
  d => { bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'n'); d.r(0, 0, 16, 5, '_'); for (const [x, y, c] of [[4, 8, 'r'], [6, 9, 'y'], [8, 7, 'g'], [10, 9, 'p'], [12, 8, 'u'], [5, 10, 'o'], [9, 10, 'w'], [11, 7, 'r']]) d.p(c, x, y); }, SC);
add(G, E, 'cn-crab', 'Cua lông Dương Trừng Hồ', 'Yangcheng Lake hairy crab', 'Cua nổi tiếng mùa thu quanh Tô Châu, ăn kèm giấm gừng và rượu vàng.',
  d => { d.bg('g'); d.e(8, 9, 5.4, 3.8, 'r'); d.e(8, 9, 4.6, 3, 'o'); d.e(3, 6, 2, 2, 'r'); d.e(13, 6, 2, 2, 'r'); d.p('R', 2, 4, 3, 4, 13, 4, 14, 4); for (const y of [9, 11, 13]) { d.l(3, y, 1, y + 2, 'R'); d.l(13, y, 15, y + 2, 'R'); } d.p('k', 6, 7, 10, 7); d.p('w', 6, 6, 10, 6); }, SC);
add(G, E, 'cn-hotpot-winter', 'Lẩu mùa đông', 'Winter hotpot', 'Những nồi lẩu nóng quanh bàn, nhất là ở Trùng Khánh, Thành Đô và miền Bắc lạnh.',
  d => { d.bg('B'); d.r(1, 11, 14, 3, 'N'); d.e(8, 8, 6, 3.4, 'a'); d.r(2, 8, 12, 3, 'a'); d.e(8, 8, 5, 2.4, 'o'); d.p('r', 5, 8, 9, 8, 11, 9); d.p('w', 6, 3, 8, 1, 10, 4, 7, 5); d.p('y', 7, 8); d.p('g', 10, 7); d.r(1, 14, 14, 1, 'k'); }, SC);
