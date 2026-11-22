import { add, SC, setCC } from './pass-kit.js';
setCC('vn');
// Việt Nam · Nhóm 3: Ẩm thực
const G = 3, A = 'Món miền Bắc', B = 'Món miền Trung', C = 'Món miền Nam', E = 'Đồ uống và trà', F = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const bowl = (d, c = 'w', rim = 'a') => { d.e(8, 9, 7, 5.5, c); d.r(0, 0, 16, 7, '_'); d.r(1, 6, 14, 1, rim); d.e(8, 6.5, 7, 1.4, rim); d.r(5, 14, 6, 1, rim); };

// ----- Miền Bắc -----
add(G, A, 'vn-pho', 'Phở', 'Pho', 'Bánh phở mềm trong nước dùng hầm xương bò nhiều giờ, thơm hồi, quế và gừng nướng. Phở ra đời ở miền Bắc vào đầu thế kỷ 20 và trở thành biểu tượng ẩm thực Việt.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 2) d.l(x, 7, x + 2, 9, 'w'); d.p('r', 5, 7, 9, 8, 11, 7); d.p('g', 4, 8, 7, 7, 10, 9, 12, 8); d.p('n', 6, 8, 8, 9); d.l(12, 0, 13, 5, 'N'); d.l(13, 0, 14, 5, 'n'); }, SC);
add(G, A, 'vn-buncha', 'Bún chả', 'Bun cha', 'Thịt nướng than hoa ăn cùng bún và nước chấm chua ngọt, món trưa quen thuộc của Hà Nội.',
  d => { d.bg('e'); d.e(5, 10, 5, 3.4, 'w'); d.r(0, 0, 16, 8, '_'); d.e(11, 10, 4, 3, 'a'); d.e(11, 10, 3, 2, 'o'); d.p('N', 9, 9, 11, 9, 13, 10, 10, 11, 12, 11); d.e(5, 10, 4, 2.4, 'w'); d.r(2, 10, 6, 2, 'w'); d.p('W', 3, 10, 5, 11, 7, 10); d.p('g', 10, 12, 12, 12, 4, 9); d.r(1, 14, 14, 1, 'a'); d.p('w', 4, 6, 6, 5); }, SC);
add(G, A, 'vn-chaca', 'Chả cá Lã Vọng', 'Cha ca La Vong', 'Cá lăng ướp nghệ, nướng và chiên trên chảo cùng thì là và hành, ăn kèm bún và mắm tôm.',
  d => { d.bg('e'); d.e(8, 10, 7, 4, 'a'); d.e(8, 9.5, 6, 3.2, 'y'); for (const [x, y] of [[4, 9], [7, 8], [10, 9], [6, 11], [10, 11]]) d.r(x, y, 2, 2, 'o'); d.p('G', 4, 8, 8, 10, 11, 8, 6, 10); d.p('g', 5, 11, 9, 7, 12, 10); d.l(0, 13, 4, 12, 'N'); }, SC);
add(G, A, 'vn-banhcuon', 'Bánh cuốn Thanh Trì', 'Banh cuon (rolled rice crepes)', 'Lớp bột gạo tráng mỏng, cuốn nhân thịt và nấm mèo, ăn với chả và nước mắm.',
  d => { d.bg('e'); d.e(8, 11, 7, 3, 'a'); d.e(8, 10.5, 6.4, 2.6, 'w'); for (const x of [3, 6, 9]) { d.r(x, 7, 3, 4, 'w'); d.r(x, 7, 3, 1, 'l'); d.p('W', x + 1, 9); } d.p('o', 4, 6, 8, 5, 11, 6); d.p('k', 12, 9, 13, 10); d.p('g', 5, 5); }, SC);
add(G, A, 'vn-bundau', 'Bún đậu mắm tôm', 'Bun dau mam tom', 'Đĩa bún, đậu rán, chả cốm và mắm tôm, món ăn nhanh của phố cổ Hà Nội.',
  d => { d.bg('Y'); d.r(1, 4, 14, 10, 'N'); d.r(1, 4, 14, 1, 'n'); d.r(2, 5, 5, 4, 'W'); d.p('e', 3, 6, 5, 7); d.r(8, 5, 3, 3, 'o'); d.r(11, 5, 3, 3, 'o'); d.r(9, 9, 5, 4, 'g'); d.e(4, 11, 2.6, 1.8, 'v'); d.p('G', 3, 10, 12, 11); d.p('O', 9, 6, 12, 6); }, SC);
add(G, A, 'vn-bunrieu', 'Bún riêu cua', 'Bun rieu cua', 'Nước dùng cua đồng có riêu nổi lên trên mặt, vị chua thanh từ cà chua và giấm bỗng.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'o'); d.r(0, 0, 16, 5, '_'); d.e(6, 8, 2.4, 1.6, 'u'); d.e(10, 8, 2, 1.4, 'u'); d.p('r', 5, 7, 11, 9, 8, 7); d.p('g', 4, 9, 9, 9, 7, 8); d.p('w', 12, 8); }, SC);

// ----- Miền Trung -----
add(G, B, 'vn-bunbo', 'Bún bò Huế', 'Bun bo Hue', 'Nước dùng cay thơm sả, mắm ruốc và ớt, sợi bún to, thêm giò heo, chả cua.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'r'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 2) d.l(x, 7, x + 2, 9, 'w'); d.r(4, 7, 3, 2, 'R'); d.r(9, 8, 3, 2, 'n'); d.p('g', 7, 7, 12, 7, 5, 9); d.p('y', 8, 9); }, SC);
add(G, B, 'vn-miquang', 'Mì Quảng', 'Mi Quang', 'Sợi mì bản rộng với ít nước dùng đậm đà, chả đầu bánh tráng nướng và đậu phộng, của vùng Quảng Nam.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'y'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 3) d.r(x, 7, 2, 3, 'u'); d.p('o', 4, 8, 8, 7, 10, 8); d.p('g', 5, 7, 11, 9, 7, 9); d.r(10, 3, 4, 3, 'e'); d.p('W', 11, 4, 13, 5); d.p('n', 6, 8, 11, 7); }, SC);
add(G, B, 'vn-caulau', 'Cao lầu Hội An', 'Cao lau (Hoi An)', 'Sợi mì dai thái dày, xá xíu, rau sống; người ta kể sợi phải dùng nước giếng cổ ở Hội An mới đúng vị.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'n'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 2) d.l(x, 7, x + 2, 9, 't'); d.r(4, 7, 3, 2, 'R'); d.r(8, 8, 3, 2, 'R'); d.p('g', 7, 7, 11, 7, 5, 9, 12, 9); d.p('y', 10, 10); }, SC);
add(G, B, 'vn-banhhue', 'Bánh bèo, bánh nậm, bánh lọc (Huế)', 'Banh beo, banh nam, banh loc (Hue)', 'Bánh hấp nhỏ xíu, nhân tôm thịt, ăn với nước mắm ngọt cay, xuất thân từ ẩm thực cung đình.',
  d => { d.bg('e'); d.e(8, 11, 7, 3.4, 'a'); for (const [x, y] of [[4, 9], [8, 8], [12, 9], [6, 12], [10, 12]]) { d.e(x, y, 2, 1.4, 'w'); d.p('o', x, y); } d.p('g', 4, 8, 12, 8); d.p('r', 8, 7, 6, 11); }, SC);

// ----- Miền Nam -----
add(G, C, 'vn-comtam', 'Cơm tấm Sài Gòn', 'Com tam (Saigon broken rice)', 'Cơm tấm gạo vỡ ăn kèm sườn nướng, bì, chả trứng, nước mắm pha ngọt.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 6.4, 4.4, 'w'); d.r(3, 6, 5, 3, 'n'); d.r(3, 6, 5, 1, 'N'); d.r(9, 6, 4, 2, 'u'); d.p('g', 9, 10, 12, 10, 5, 11); d.p('r', 11, 8); d.p('o', 4, 10, 6, 10); d.p('N', 5, 7, 6, 8); }, SC);
add(G, C, 'vn-banhmi', 'Bánh mì', 'Banh mi', 'Ổ bánh mì giòn nhồi pa tê, thịt nguội, đồ chua và rau thơm, kết hợp giữa bánh mì Pháp và hương vị Việt.',
  d => { d.bg('e'); d.e(8, 9, 7, 4, 'o'); d.e(8, 8, 6.4, 3, 'u'); d.r(1, 9, 14, 2, 'o'); d.p('G', 3, 8, 6, 8, 9, 8, 12, 8); d.p('r', 4, 9, 8, 9, 11, 9); d.p('w', 5, 9, 10, 9); d.p('O', 4, 6, 8, 5, 12, 6); d.p('n', 7, 11, 11, 11); }, SC);
add(G, C, 'vn-goicuon', 'Gỏi cuốn', 'Goi cuon (summer rolls)', 'Bánh tráng cuốn tôm, thịt, bún và rau thơm, chấm nước mắm hoặc tương đậu phộng.',
  d => { d.bg('e'); d.r(1, 5, 7, 5, 'w'); d.r(8, 8, 7, 5, 'w'); for (const [x, y] of [[2, 6], [4, 6], [9, 9], [11, 9]]) { d.p('o', x, y); d.p('g', x + 1, y + 2); } d.p('l', 1, 5, 8, 8); d.e(5, 14, 2.4, 1.4, 'N'); d.r(0, 0, 16, 4, '_'); d.p('G', 6, 7, 13, 11); }, SC);
add(G, C, 'vn-banhxeo', 'Bánh xèo', 'Banh xeo', 'Vỏ bánh giòn vàng nghệ, nhân tôm thịt giá đỗ, cuốn rau sống ăn kèm nước chấm.',
  d => { d.bg('e'); d.e(8, 9, 7, 4.6, 'o'); d.e(8, 9, 6, 3.8, 'y'); d.r(0, 0, 16, 9, '_'); d.fan(8, 11, 7, 'y'); d.l(8, 11, 8, 5, 'O'); d.p('O', 3, 9, 13, 9, 5, 7, 11, 7); d.p('g', 4, 6, 9, 5, 12, 6); d.p('r', 6, 8, 10, 8); d.r(1, 11, 14, 1, 'O'); d.r(1, 12, 14, 1, 'a'); }, SC);
add(G, C, 'vn-hutieu', 'Hủ tiếu Nam Vang', 'Hu tieu Nam Vang', 'Sợi hủ tiếu với nước dùng ngọt thanh, có thịt băm, tôm, trứng cút, ảnh hưởng từ ẩm thực người Hoa và Campuchia.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); for (let x = 3; x < 13; x += 2) d.l(x, 7, x + 2, 9, 'w'); d.e(5, 8, 1.2, 1.2, 'e'); d.e(10, 8, 1.2, 1.2, 'e'); d.p('o', 7, 7, 12, 9); d.p('g', 4, 9, 8, 9, 11, 7); d.p('n', 6, 8); }, SC);
add(G, C, 'vn-cakho', 'Cá kho tộ và canh chua', 'Caramelised clay-pot fish and sour soup', 'Cá kho trong nồi đất với nước màu, còn canh chua cá có độ chua thanh từ me, thơm và ngò om, bữa cơm gia đình phổ biến.',
  d => { d.bg('e'); d.e(4, 10, 4, 3.6, 'N'); d.r(1, 7, 6, 1, 'k'); d.e(4, 9, 3, 1.6, 'k'); d.e(4, 9, 2, 1, 'n'); d.p('w', 3, 9); d.e(12, 10, 4, 3.6, 'a'); d.e(12, 9, 3.4, 1.8, 'o'); d.p('g', 10, 9, 13, 8); d.p('r', 12, 10); d.p('y', 14, 9); d.r(1, 14, 14, 1, 'a'); }, SC);
add(G, C, 'vn-nuocmam', 'Nước mắm (Phú Quốc, Phan Thiết)', 'Fish sauce (Phu Quoc, Phan Thiet)', 'Nước từ cá cơm ủ muối trong thùng gỗ hàng năm, gia vị cốt lõi của bữa cơm Việt, từ chấm đến nấu.',
  d => { d.r(5, 1, 6, 3, 'n'); d.r(4, 4, 8, 11, 'o'); d.r(4, 4, 8, 1, 'O'); d.r(5, 8, 6, 4, 'u'); d.l(6, 9, 10, 9, 'N'); d.l(6, 11, 10, 11, 'N'); d.p('r', 8, 10); d.p('w', 5, 5, 5, 6); d.r(4, 14, 8, 1, 'O'); }, H);

// ----- Đồ uống và trà -----
add(G, E, 'vn-caphesua', 'Cà phê sữa đá', 'Iced milk coffee', 'Cà phê pha phin, sữa đặc, nhiều đá, Việt Nam là một trong những nước xuất khẩu cà phê lớn nhất thế giới.',
  d => { d.r(4, 3, 8, 11, 'l'); d.r(4, 3, 8, 1, 'w'); d.r(5, 4, 6, 3, 'e'); d.r(5, 7, 6, 6, 'N'); d.r(5, 7, 6, 1, 'n'); d.p('w', 6, 9, 9, 11, 6, 12); d.r(3, 1, 10, 2, 'a'); d.l(10, 1, 11, 0, 'a'); d.r(5, 13, 6, 1, 'a'); d.p('l', 5, 5); }, H);
add(G, E, 'vn-caphetrung', 'Cà phê trứng', 'Egg coffee', 'Lòng đỏ trứng đánh bông với đường, rót lên cà phê nóng, ra đời ở Hà Nội đầu những năm 1940 khi sữa khó kiếm.',
  d => { d.bg('u'); d.r(4, 5, 8, 7, 'w'); d.r(4, 5, 8, 1, 'e'); d.r(5, 5, 6, 3, 'y'); d.e(8, 5, 3.4, 1.2, 'u'); d.r(5, 8, 6, 3, 'N'); d.l(12, 7, 14, 8, 'a'); d.l(14, 8, 12, 10, 'a'); d.r(3, 12, 10, 2, 'a'); d.p('w', 6, 2, 9, 1); }, H);
add(G, E, 'vn-trada', 'Trà đá', 'Tra da (iced tea)', 'Ly trà xanh nhẹ, nhiều đá, đặt trước cửa quán và gánh hàng rong, thứ nước thân quen của mọi tầng lớp.',
  d => { d.r(4, 3, 8, 11, 'l'); d.r(4, 3, 8, 1, 'w'); d.r(5, 5, 6, 8, 'g'); d.r(5, 5, 6, 1, 'h'); d.r(5, 6, 2, 2, 'w'); d.r(8, 8, 2, 2, 'w'); d.r(6, 11, 2, 1, 'w'); d.r(4, 13, 8, 1, 'a'); d.l(11, 0, 9, 4, 'y'); }, H);
add(G, E, 'vn-thainguyen', 'Trà Thái Nguyên', 'Thai Nguyen tea', 'Trà xanh nổi tiếng vùng Thái Nguyên với cánh xoăn nhỏ, nước xanh và hậu ngọt.',
  d => { d.bg('h'); d.e(8, 11, 6, 3.4, 'w'); d.r(0, 0, 16, 9, '_'); d.r(2, 9, 12, 1, 'a'); d.e(8, 9.5, 6, 1.4, 'g'); d.l(5, 6, 8, 3, 'G'); d.l(8, 3, 11, 6, 'g'); d.l(8, 3, 8, 8, 'G'); d.p('G', 3, 4, 13, 5); d.r(5, 13, 6, 1, 'a'); }, H);
add(G, E, 'vn-trasen', 'Trà sen Tây Hồ', 'West Lake lotus tea', 'Trà ướp hương hoa sen Hà Nội, công phu và đắt tiền, gắn với văn hóa thưởng trà của người Thăng Long.',
  d => { d.bg('u'); d.e(8, 12, 6, 3, 'w'); d.r(0, 0, 16, 10, '_'); d.r(2, 10, 12, 1, 'a'); d.e(8, 10.5, 6, 1.4, 'o'); d.e(8, 6, 3, 3, 'p'); d.e(8, 6, 1.6, 2.6, 'x'); d.p('P', 5, 6, 11, 6); d.p('y', 8, 7); d.r(5, 14, 6, 1, 'a'); }, H);
add(G, E, 'vn-ruoucan', 'Rượu cần', 'Ruou can (jar wine)', 'Rượu ngâm trong chóe, uống bằng cần tre, của các dân tộc Tây Nguyên và Tây Bắc.',
  d => { d.e(7, 11, 5, 4.4, 'n'); d.r(4, 5, 6, 2, 'N'); d.r(3, 6, 8, 1, 'N'); d.p('t', 4, 10, 10, 11); d.p('r', 5, 9, 9, 13); d.l(9, 5, 14, 1, 'Y'); d.l(10, 5, 15, 1, 'y'); d.l(14, 1, 15, 2, 'Y'); d.r(2, 14, 11, 1, 'N'); }, H);
add(G, E, 'vn-biahoi', 'Bia hơi', 'Bia hoi (fresh draught beer)', 'Bia tươi bán trong ngày, rẻ và đông người, văn hóa họp bạn trên vỉa hè Hà Nội.',
  d => { d.r(3, 3, 8, 11, 'y'); d.r(3, 1, 8, 3, 'w'); d.r(3, 3, 8, 1, 'e'); d.r(11, 5, 3, 6, 'a'); d.r(12, 6, 1, 4, '_'); d.p('Y', 5, 6, 8, 8, 5, 11, 9, 12); d.p('u', 4, 5, 4, 10); d.r(3, 14, 8, 1, 'Y'); d.p('w', 5, 1, 9, 0); }, H);
add(G, E, 'vn-che', 'Chè và sinh tố', 'Che and smoothies', 'Món ngọt giải nhiệt, chè bưởi, chè ba màu, sinh tố bơ và nước mía.',
  d => { d.bg('e'); d.r(3, 5, 10, 9, 'l'); d.r(3, 5, 10, 1, 'w'); d.r(4, 6, 8, 2, 'w'); d.r(4, 8, 8, 2, 'g'); d.r(4, 10, 8, 2, 'R'); d.r(4, 12, 8, 1, 'o'); d.p('p', 6, 6, 9, 7); d.l(10, 0, 9, 6, 'p'); d.r(3, 14, 10, 1, 'a'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, F, 'vn-banhchung', 'Bánh chưng và bánh tét', 'Banh chung and banh tet', 'Gạo nếp, đậu xanh, thịt ba chỉ gói lá; bánh chưng vuông ở miền Bắc, bánh tét tròn dài ở miền Nam, không thể thiếu trong Tết.',
  d => { d.bg('r'); d.r(1, 2, 8, 8, 'G'); d.r(1, 2, 8, 1, 'g'); d.l(5, 2, 5, 9, 'y'); d.l(1, 6, 8, 6, 'y'); d.p('g', 2, 3, 7, 8); d.r(8, 10, 7, 4, 'G'); d.e(14, 12, 1.6, 2, 'G'); d.e(8, 12, 1, 2, 'G'); d.l(11, 10, 11, 13, 'y'); d.p('g', 9, 11, 13, 12); }, SC);
add(G, F, 'vn-thitdong', 'Thịt đông, dưa hành và giò lụa', 'Jellied pork, pickled onions and sausage', 'Mâm cỗ Tết miền Bắc thường có thịt đông chấm nước mắm, dưa hành muối chua cho bớt ngấy.',
  d => { d.bg('e'); d.r(1, 3, 6, 5, 'u'); d.r(1, 3, 6, 1, 'y'); d.p('o', 2, 5, 4, 6, 5, 4); d.e(11, 5, 3, 2.4, 'w'); d.p('p', 10, 4, 12, 6); d.e(8, 12, 7, 2.4, 'w'); d.r(1, 11, 14, 3, 'W'); d.p('e', 4, 12, 8, 12, 11, 12); d.p('g', 13, 3); }, SC);
add(G, F, 'vn-mut', 'Mứt Tết', 'Tet candied fruit', 'Mứt hạt sen, mứt dừa, mứt gừng, mứt bí, tiếp khách ngày đầu năm.',
  d => { d.bg('r'); d.e(8, 8, 7, 7, 'y'); d.e(8, 8, 6, 6, 'R'); for (let i = 0; i < 6; i++) { const a = i * 1.05; d.e(8 + Math.cos(a) * 3.2, 8 + Math.sin(a) * 3.2, 1.4, 1.4, ['w', 'o', 'p', 'u', 'g', 'y'][i]); } d.e(8, 8, 1.4, 1.4, 'w'); }, SC);
add(G, F, 'vn-com', 'Cốm', 'Com (young green rice)', 'Hạt gạo nếp non rang xào, ăn mùa thu ở Hà Nội, gói lá sen, thơm mùi lúa mới.',
  d => { d.bg('h'); d.e(8, 10, 6, 4, 'g'); d.tri(1, 6, 14, 3, 'G'); d.dtri(1, 8, 14, 6, 'G'); d.r(4, 6, 8, 6, 'g'); d.p('h', 5, 8, 7, 10, 9, 8, 10, 11); d.l(8, 4, 8, 14, 'G'); d.l(8, 8, 3, 6, 'G'); d.l(8, 8, 13, 6, 'G'); d.l(8, 11, 4, 11, 'G'); d.l(8, 11, 12, 11, 'G'); }, SC);
add(G, F, 'vn-banhtrungthu', 'Bánh trung thu', 'Mid-Autumn mooncake', 'Bánh nướng và bánh dẻo nhân đậu xanh, hạt sen, thập cẩm, dùng trong Tết Trung Thu.',
  d => { d.bg('B'); d.r(2, 5, 8, 8, 'n'); d.r(2, 5, 8, 1, 'o'); d.r(3, 6, 6, 6, 'o'); d.p('N', 4, 7, 7, 7, 4, 10, 7, 10); d.e(12, 10, 3, 3, 'w'); d.e(12, 10, 2.2, 2.2, 'e'); d.p('y', 12, 10); d.p('w', 1, 2, 14, 3, 9, 1); d.e(13, 3, 1, 1, 'u'); }, SC);
add(G, F, 'vn-banhtroi', 'Bánh trôi, bánh chay (Tết Hàn thực)', 'Banh troi, banh chay (Cold Food Festival)', 'Mùng 3 tháng 3 âm lịch, ăn bánh làm từ gạo nếp này để nhớ đến tổ tiên.',
  d => { d.bg('e'); d.e(8, 11, 7, 3.4, 'w'); d.r(0, 0, 16, 9, '_'); d.r(1, 9, 14, 1, 'a'); d.e(8, 10, 6.4, 2, 'u'); for (const [x, y, c] of [[5, 9, 'p'], [8, 8, 'w'], [11, 9, 'p'], [7, 10, 'w'], [10, 10, 'w']]) { d.e(x, y, 1.9, 1.9, c); d.p('l', x - 1, y - 1); } d.p('y', 8, 6); }, SC);
add(G, F, 'vn-comruou', 'Rượu nếp và trái cây (Tết Đoan Ngọ)', 'Sticky-rice wine and fruit (Doan Ngo)', 'Mồng 5 tháng 5 âm lịch, người ta ăn cơm rượu nếp và trái cây mùa hè để "diệt sâu bọ" trong người.',
  d => { d.bg('e'); d.e(5, 11, 4, 3.4, 'w'); d.r(0, 0, 16, 8, '_'); d.e(5, 9, 3.4, 1.6, 'u'); d.p('W', 4, 9, 6, 9); d.e(12, 8, 2.6, 2.6, 'r'); d.p('G', 12, 5); d.e(11, 12, 2, 2, 'y'); d.e(14, 12, 1.6, 1.6, 'p'); d.r(1, 14, 14, 1, 'a'); }, SC);
add(G, F, 'vn-chetroinuoc', 'Chè trôi nước', 'Che troi nuoc', 'Viên nếp nhân đậu, nấu với nước đường gừng, ăn vào tiết trời lạnh.',
  d => { d.e(8, 9, 7, 5.5, 'w'); d.r(0, 0, 16, 6, '_'); d.e(8, 6.5, 7, 1.6, 'a'); d.e(8, 7, 6, 1.4, 'o'); for (const [x, y] of [[5, 9], [8, 8], [11, 9], [7, 11], [10, 11]]) { d.e(x, y, 1.9, 1.9, 'w'); d.p('l', x - 1, y - 1); } d.p('y', 8, 8, 5, 9, 11, 9); d.r(5, 14, 6, 1, 'a'); d.p('w', 6, 3, 9, 2, 11, 4); }, SC);
