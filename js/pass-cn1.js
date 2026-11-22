import { add, SC, setCC } from './pass-kit.js';
setCC('cn');
// Trung Quốc · Nhóm 1: Nơi chốn và thiên nhiên
const G = 1, A = 'Địa danh', B = 'Mùa và thiên nhiên', C = 'Vùng miền', E = 'Hiện tượng đặc biệt';

// ----- Địa danh -----
add(G, A, 'cn-greatwall', 'Vạn Lý Trường Thành', 'Great Wall of China', 'Hệ thống tường thành do nhiều triều đại xây nối, tổng chiều dài các đoạn được tính hơn 21.000 km. Phần quen thuộc với du khách phần lớn xây thời Minh.',
  d => { d.bg('c'); d.tri(0, 5, 10, 9, 'G'); d.tri(7, 3, 9, 11, 'g'); d.l(0, 14, 5, 11, 'a'); d.l(5, 11, 10, 8, 'a'); d.l(10, 8, 15, 4, 'a'); d.l(0, 15, 5, 12, 'A'); d.l(5, 12, 10, 9, 'A'); d.l(10, 9, 15, 5, 'A'); d.r(5, 8, 3, 3, 'A'); d.r(5, 8, 3, 1, 'a'); d.p('k', 6, 9); d.r(11, 3, 2, 3, 'A'); d.e(13, 2.5, 1.3, 1.3, 'y'); }, SC);
add(G, A, 'cn-forbidden', 'Tử Cấm Thành', 'Forbidden City', 'Cung điện của hai triều Minh và Thanh ở Bắc Kinh, hoàn thành đầu thế kỷ 15 với hàng nghìn gian phòng màu đỏ và vàng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'W'); d.r(1, 7, 14, 5, 'r'); d.tri(0, 2, 16, 5, 'y'); d.r(0, 6, 16, 1, 'Y'); d.r(7, 8, 2, 4, 'R'); d.r(3, 8, 2, 2, 'u'); d.r(11, 8, 2, 2, 'u'); d.r(1, 12, 14, 1, 'w'); d.p('y', 8, 1); }, SC);
add(G, A, 'cn-temple-heaven', 'Thiên Đàn', 'Temple of Heaven', 'Nơi các hoàng đế làm lễ tế trời cầu mùa màng, với điện Khấu Cầu Mùa tròn mái ngói xanh.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'W'); d.r(1, 11, 14, 2, 'w'); d.r(3, 9, 10, 2, 'W'); d.tri(4, 5, 8, 4, 'b'); d.tri(5, 2, 6, 3, 'b'); d.p('y', 8, 1); d.r(4, 9, 8, 1, 'r'); d.r(7, 9, 2, 2, 'R'); d.l(5, 8, 10, 8, 'B'); }, SC);
add(G, A, 'cn-summerpalace', 'Di Hòa Viên', 'Summer Palace', 'Khu vườn của hoàng gia ven hồ Côn Minh ở Bắc Kinh, có hành lang dài sơn vẽ tranh.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'b'); d.r(1, 7, 14, 2, 'r'); d.r(1, 7, 14, 1, 'R'); for (let x = 2; x < 15; x += 3) d.r(x, 8, 1, 1, 'y'); d.tri(9, 1, 6, 6, 'y'); d.r(10, 5, 4, 2, 'r'); d.p('w', 3, 12, 8, 14, 12, 12); d.p('p', 4, 11, 11, 13); }, SC);
add(G, A, 'cn-terracotta', 'Binh mã dũng (Tây An)', 'Terracotta Army (Xi\'an)', 'Đội quân đất nung hàng ngàn tượng chôn cùng Tần Thủy Hoàng, được nông dân tình cờ đào giếng phát hiện năm 1974.',
  d => { d.bg('n'); d.r(0, 13, 16, 3, 'N'); for (const x of [1, 6, 11]) { d.e(x + 2, 4, 1.6, 1.8, 'o'); d.r(x, 6, 4, 7, 'O'); d.r(x, 6, 4, 1, 'o'); d.r(x + 1, 13, 2, 2, 'N'); d.p('N', x + 1, 3, x + 2, 3); } d.p('k', 2, 4, 4, 4, 7, 4, 9, 4, 12, 4, 14, 4); }, SC);
add(G, A, 'cn-bund', 'Ngoại Than (Thượng Hải)', 'The Bund (Shanghai)', 'Dải bờ sông Hoàng Phố với những tòa nhà kiến trúc châu Âu, đối diện là những nhà cao hiện đại như tháp Minh Châu Phương Đông.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'C'); d.r(0, 12, 16, 1, 'c'); d.r(0, 9, 7, 3, 'W'); d.r(1, 7, 5, 2, 'e'); d.r(7, 9, 1, 3, 'A'); d.l(11, 12, 11, 3, 'a'); d.e(11, 7, 2.2, 2.2, 'p'); d.e(11, 3, 1.4, 1.4, 'p'); d.r(14, 6, 2, 6, 'A'); d.p('y', 1, 10, 3, 10, 5, 10, 15, 8, 15, 10, 4, 14, 10, 14); }, SC);
add(G, A, 'cn-westlake', 'Tây Hồ (Hàng Châu)', 'West Lake (Hangzhou)', 'Hồ nước được thơ ca ca ngợi hàng nghìn năm, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) công nhận là cảnh quan văn hóa.',
  d => { d.bg('c'); d.tri(0, 4, 8, 5, 'G'); d.tri(7, 6, 9, 4, 'g'); d.r(0, 9, 16, 7, 'C'); d.r(0, 9, 16, 1, 'b'); d.r(4, 10, 8, 1, 'a'); d.r(8, 8, 1, 2, 'a'); d.e(11, 13, 2.5, 1, 'N'); d.l(11, 12, 11, 10, 'n'); d.p('w', 3, 12, 6, 14, 13, 14); d.p('g', 2, 8, 14, 8); }, SC);
add(G, A, 'cn-suzhou', 'Vườn cổ Tô Châu', 'Classical Gardens of Suzhou', 'Những khu vườn của quan lại và văn nhân, thu nhỏ cả núi non, ao hồ trong một khoảng sân nhỏ, được UNESCO công nhận năm 1997.',
  d => { d.bg('W'); d.r(0, 0, 16, 2, 'e'); d.e(8, 12, 7, 3, 'C'); d.tri(1, 2, 5, 6, 'a'); d.tri(4, 4, 5, 6, 'A'); d.tri(9, 3, 5, 3, 'K'); d.r(10, 6, 5, 4, 'w'); d.r(10, 6, 5, 1, 'k'); d.r(12, 7, 1, 3, 'k'); d.e(13, 12, 1.5, 1, 'w'); d.p('g', 7, 9, 2, 12); }, SC);
add(G, A, 'cn-leshan', 'Đại Phật Lạc Sơn', 'Leshan Giant Buddha', 'Tượng Phật Di Lặc khắc vào vách núi ở Tứ Xuyên, cao khoảng 71 m, nhìn ra chỗ ba dòng sông hội lại.',
  d => { d.bg('c'); d.r(0, 0, 4, 16, 'n'); d.r(12, 0, 4, 16, 'n'); d.r(4, 0, 8, 16, 'O'); d.e(8, 3.5, 2.2, 2.6, 'o'); d.r(5, 6, 6, 8, 'o'); d.r(4, 6, 1, 5, 'O'); d.r(11, 6, 1, 5, 'O'); d.p('k', 7, 3, 9, 3); d.r(0, 14, 16, 2, 'C'); d.p('G', 1, 1, 14, 2, 2, 8); }, SC);
add(G, A, 'cn-lijiang', 'Lệ Giang cổ trấn (Vân Nam)', 'Lijiang Old Town (Yunnan)', 'Thị trấn cổ có hệ thống mương nước chảy giữa các con phố lát đá, nơi dân tộc Naxi sống lâu đời.',
  d => { d.bg('c'); d.tri(0, 0, 16, 5, 'w'); d.tri(1, 1, 14, 4, 'a'); d.tri(1, 6, 6, 3, 'k'); d.r(1, 9, 6, 4, 'e'); d.tri(9, 6, 6, 3, 'k'); d.r(9, 9, 6, 4, 'e'); d.r(7, 8, 2, 8, 'C'); d.p('w', 8, 10, 8, 14); d.r(3, 10, 2, 3, 'N'); d.r(11, 10, 2, 3, 'N'); d.p('r', 2, 9, 13, 9); }, SC);

// ----- Mùa và thiên nhiên -----
add(G, B, 'cn-plum', 'Hoa mai mùa đông', 'Plum blossoms in winter', 'Hoa mai nở giữa mùa đông giá lạnh, được coi là biểu tượng của sức chịu đựng và phẩm chất của người quân tử.',
  d => { d.bg('l'); d.r(0, 14, 16, 2, 'w'); d.l(0, 13, 6, 8, 'N'); d.l(6, 8, 11, 9, 'N'); d.l(6, 8, 8, 3, 'N'); d.l(11, 9, 14, 5, 'N'); for (const [x, y] of [[4, 10], [8, 3], [6, 7], [11, 8], [14, 5], [10, 5], [2, 12]]) { d.p('p', x, y); d.p('P', x + 1, y); d.p('x', x, y - 1); } d.p('y', 8, 4); }, SC);
add(G, B, 'cn-peony', 'Mẫu đơn', 'Peony', 'Hoa to, nhiều lớp cánh, được gọi là "vua của các loài hoa"; Lạc Dương nổi tiếng với lễ hội mẫu đơn vào tháng 4.',
  d => { d.bg('h'); d.e(8, 7, 6, 5.4, 'P'); d.e(8, 7, 5, 4.4, 'p'); d.e(8, 7, 3.4, 3, 'x'); d.e(8, 7, 1.6, 1.5, 'y'); d.p('P', 5, 7, 11, 7, 8, 4, 8, 10); d.l(8, 12, 8, 15, 'G'); d.p('g', 4, 13, 5, 14, 11, 13, 12, 14); }, SC);
add(G, B, 'cn-wuyuan', 'Hoa cải vàng Vụ Nguyên', 'Wuyuan rapeseed fields', 'Mùa xuân, những cánh đồng hoa cải vàng phủ kín làng cổ ở Giang Tây, nổi tiếng với những ngôi nhà tường trắng mái xám.',
  d => { d.bg('c'); d.tri(0, 3, 16, 4, 'A'); d.r(0, 8, 16, 8, 'y'); for (let y = 9; y < 16; y++) for (let x = y % 2; x < 16; x += 2) d.put(x, y, 'Y'); d.r(3, 6, 4, 3, 'w'); d.tri(2, 4, 6, 2, 'k'); d.r(9, 7, 4, 2, 'w'); d.tri(8, 5, 6, 2, 'k'); d.r(0, 8, 16, 1, 'g'); }, SC);
add(G, B, 'cn-lotus', 'Hoa sen mùa hè', 'Summer lotus', 'Sen được yêu quý vì "mọc từ bùn mà không nhiễm bùn", gắn với hình ảnh thanh cao.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(3, 13, 3, 1.2, 'G'); d.e(13, 14, 3, 1.2, 'g'); d.l(8, 15, 8, 8, 'G'); d.e(8, 6, 3, 3, 'p'); d.e(8, 6, 1.6, 2.6, 'x'); d.p('P', 5, 6, 11, 6); d.p('y', 8, 7); d.e(8, 11, 2, 0.8, 'g'); }, SC);
add(G, B, 'cn-meiyu', 'Mùa mưa mận (meiyu)', 'Plum rain season (meiyu)', 'Mùa mưa dầm ẩm ướt ở vùng hạ du Trường Giang vào đầu hè, đúng lúc mận chín.',
  d => { d.bg('A'); d.e(5, 3, 4.4, 2.4, 'a'); d.e(11, 3, 4.4, 2.4, 'l'); for (const x of [2, 5, 8, 11, 14]) d.l(x, 7, x - 1, 10, 'c'); d.e(5, 13, 2.2, 2.2, 'v'); d.e(11, 13, 2.2, 2.2, 'v'); d.p('V', 4, 12, 10, 12); d.p('g', 5, 10, 11, 10); }, SC);
add(G, B, 'cn-maple-xs', 'Lá phong Hương Sơn', 'Fragrant Hills maples', 'Mùa thu, đồi núi phía tây Bắc Kinh nhuộm đỏ, kéo theo những chuyến đi ngắm lá đông người.',
  d => { d.bg('Y'); d.l(8, 15, 8, 8, 'N'); d.l(8, 11, 4, 8, 'N'); d.l(8, 11, 12, 8, 'N'); d.e(8, 5, 5, 3.4, 'r'); d.e(4, 8, 3, 2.4, 'R'); d.e(12, 8, 3, 2.4, 'o'); d.p('y', 7, 4, 10, 6, 3, 8, 13, 9); d.p('r', 2, 14, 13, 13); d.p('o', 5, 15, 11, 15); }, SC);
add(G, B, 'cn-harbin', 'Băng tuyết Cáp Nhĩ Tân', 'Harbin Ice Festival', 'Mùa đông đông bắc lạnh giá, nơi tổ chức lễ hội điêu khắc băng với những tòa thành băng cỡ lớn sáng đèn về đêm.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'w'); d.r(2, 7, 4, 6, 'c'); d.r(6, 4, 4, 9, 'l'); d.r(10, 6, 4, 7, 'c'); d.tri(2, 5, 4, 2, 'w'); d.tri(6, 2, 4, 2, 'w'); d.tri(10, 4, 4, 2, 'w'); d.p('p', 3, 9, 7, 7, 11, 9); d.p('y', 8, 9, 12, 8, 4, 11); d.p('w', 1, 2, 14, 3, 9, 1); }, SC);
add(G, B, 'cn-terrace', 'Ruộng bậc thang Long Tích', 'Longji rice terraces', 'Những sườn núi khắc thành từng bậc lúa, đẹp nhất vào mùa nước đổ hoặc lúa chín. Long Tích nghĩa là "xương sống rồng" ở Quảng Tây.',
  d => { d.bg('c'); d.tri(0, 2, 16, 14, 'G'); for (let i = 0; i < 6; i++) { d.r(3 - i % 2 + i, 6 + i * 2 - (i > 4 ? 0 : 0), 10 - i, 1, i % 2 ? 'h' : 'c'); } d.r(0, 15, 16, 1, 'g'); d.p('y', 12, 3); d.e(13, 2, 1.2, 1.2, 'y'); }, SC);

// ----- Vùng miền -----
add(G, C, 'cn-beijing', 'Bắc Kinh', 'Beijing', 'Thủ đô và cố đô nhiều triều, nơi có những con hẻm cổ hutong và những tòa nhà hiện đại.',
  d => { d.bg('r'); d.r(0, 13, 16, 3, 'R'); d.r(2, 6, 12, 7, 'y'); d.tri(0, 2, 16, 4, 'Y'); d.r(3, 8, 10, 1, 'R'); d.r(7, 9, 2, 4, 'R'); d.p('r', 3, 10, 12, 10); d.p('y', 8, 1); }, SC);
add(G, C, 'cn-shanghai', 'Thượng Hải', 'Shanghai', 'Thành phố lớn nhất về kinh tế, giao thoa giữa phong cách phương Đông và phương Tây.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'C'); d.r(1, 8, 3, 5, 'A'); d.r(4, 5, 3, 8, 'a'); d.r(11, 6, 4, 7, 'A'); d.l(9, 13, 9, 3, 'a'); d.e(9, 7, 2, 2, 'p'); d.e(9, 3, 1.2, 1.2, 'p'); d.p('y', 2, 9, 5, 7, 5, 10, 12, 8, 13, 10, 3, 11); }, SC);
add(G, C, 'cn-jiangnan', 'Giang Nam', 'Jiangnan (south of the Yangtze)', 'Vùng sông nước ở hạ du Trường Giang, nổi tiếng với vườn cổ, lụa tơ và trà Long Tỉnh. Có câu: "trên trời có thiên đường, dưới đất có Tô Hàng".',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(0, 6, 16, 3, 'e'); d.tri(1, 3, 6, 3, 'A'); d.tri(9, 3, 6, 3, 'A'); d.r(2, 6, 4, 3, 'w'); d.r(10, 6, 4, 3, 'w'); d.r(1, 9, 14, 1, 'a'); d.e(8, 13, 3, 1, 'N'); d.l(7, 12, 8, 10, 'n'); d.p('w', 3, 12, 13, 14); }, SC);
add(G, C, 'cn-sichuan', 'Tứ Xuyên (Thành Đô)', 'Sichuan (Chengdu)', 'Vùng có gấu trúc, món ăn cay tê và văn hóa quán trà lâu đời.',
  d => { d.bg('h'); d.e(8, 9, 6, 5.6, 'w'); d.e(3.5, 4.5, 2, 2, 'd'); d.e(12.5, 4.5, 2, 2, 'd'); d.e(5.5, 8, 1.8, 2.2, 'd'); d.e(10.5, 8, 1.8, 2.2, 'd'); d.p('w', 5, 8, 11, 8); d.e(8, 11, 1.2, 0.9, 'd'); }, SC);
add(G, C, 'cn-guangdong', 'Quảng Đông', 'Guangdong', 'Cái nôi của ẩm thực dimsum, tiếng Quảng Đông và nhiều cộng đồng người Hoa hải ngoại.',
  d => { d.bg('t'); d.e(8, 12, 7, 3, 'n'); d.r(1, 11, 14, 1, 'N'); d.e(8, 9, 5, 3.2, 'w'); d.e(8, 9, 4, 2.3, 'e'); d.p('r', 6, 8, 10, 8, 8, 10); d.p('g', 7, 9, 9, 9); d.l(2, 3, 14, 2, 'N'); d.l(3, 2, 4, 6, 'n'); }, SC);
add(G, C, 'cn-yunnan', 'Vân Nam', 'Yunnan', 'Vùng có nhiều dân tộc thiểu số nhất nước, nổi tiếng với trà Phổ Nhĩ, Lệ Giang và Đại Lý.',
  d => { d.bg('c'); d.tri(0, 4, 8, 8, 'G'); d.tri(7, 2, 9, 10, 'g'); d.tri(10, 2, 3, 3, 'w'); d.r(0, 12, 16, 4, 'v'); d.p('p', 2, 13, 5, 14, 8, 13, 12, 14); d.p('y', 3, 13, 9, 14, 13, 13); d.e(13, 2.5, 1.3, 1.3, 'y'); }, SC);
add(G, C, 'cn-guilin', 'Quế Lâm (Quảng Tây)', 'Guilin (Guangxi)', 'Núi đá vôi mọc lên từ mặt đất như những chiếc mũ, sông Lễ chảy quanh, thường xuất hiện trong tranh sơn thủy.',
  d => { d.bg('l'); d.tri(0, 3, 6, 9, 'G'); d.tri(5, 1, 6, 11, 'g'); d.tri(11, 4, 5, 8, 'G'); d.r(0, 12, 16, 4, 'C'); d.r(0, 12, 16, 1, 'c'); d.p('l', 3, 6, 8, 5, 13, 7); d.e(10, 14, 2, 0.8, 'N'); d.p('w', 3, 14, 6, 15); }, SC);
add(G, C, 'cn-neimeng', 'Nội Mông', 'Inner Mongolia', 'Thảo nguyên mênh mông phía bắc, đời sống du mục, lều gệ yurt và ngựa.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'g'); d.r(0, 10, 16, 1, 'h'); d.e(5, 10, 4, 3, 'w'); d.r(1, 10, 8, 3, 'w'); d.tri(2, 7, 6, 3, 'e'); d.p('r', 4, 11, 5, 11); d.r(4, 11, 2, 2, 'R'); d.e(13, 11, 2, 1.2, 'n'); d.r(12, 12, 1, 2, 'N'); d.r(14, 12, 1, 2, 'N'); d.e(12, 2.5, 3, 1.2, 'w'); }, SC);
add(G, C, 'cn-xian', 'Tây An (Thiểm Tây)', 'Xi\'an (Shaanxi)', 'Cố đô nhiều triều đại và điểm khởi đầu của "Con đường Tơ Lụa" nối với phương Tây.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 't'); d.r(1, 9, 14, 4, 'A'); for (let x = 1; x < 15; x += 2) d.r(x, 8, 1, 1, 'A'); d.r(5, 5, 6, 4, 'r'); d.tri(3, 2, 10, 3, 'a'); d.r(7, 10, 2, 3, 'k'); d.e(14, 2.5, 1.4, 1.4, 'y'); }, SC);

// ----- Hiện tượng đặc biệt -----
add(G, E, 'cn-yellowriver', 'Hoàng Hà', 'Yellow River', 'Dòng sông "mẹ" của dân tộc, màu vàng đục vì mang hàng tỷ tấn phù sa hoàng thổ mỗi năm. Nhiều đoạn lòng sông cao hơn ruộng đồng hai bên, gọi là "sông treo".',
  d => { d.bg('Y'); d.r(0, 0, 16, 5, 'u'); d.r(0, 5, 16, 2, 'O'); d.l(0, 9, 5, 7, 'y'); d.l(5, 7, 9, 11, 'y'); d.l(9, 11, 15, 8, 'y'); d.l(0, 11, 5, 9, 'o'); d.l(5, 9, 9, 13, 'o'); d.l(9, 13, 15, 10, 'o'); d.l(0, 13, 5, 11, 'n'); d.l(5, 11, 9, 15, 'n'); d.l(9, 15, 15, 12, 'n'); }, SC);
add(G, E, 'cn-yangtze', 'Trường Giang', 'Yangtze River', 'Sông dài nhất châu Á (khoảng 6.300 km), chảy từ cao nguyên ra biển Hoa Đông, nuôi sống một phần lớn dân số Trung Quốc.',
  d => { d.bg('c'); d.tri(0, 2, 8, 6, 'a'); d.tri(8, 4, 8, 5, 'A'); d.r(0, 8, 16, 8, 'g'); d.l(2, 8, 5, 11, 'C'); d.l(5, 11, 10, 13, 'C'); d.l(10, 13, 14, 15, 'C'); d.l(3, 8, 6, 11, 'b'); d.l(6, 11, 11, 13, 'b'); d.l(11, 13, 15, 15, 'b'); d.p('w', 12, 3); }, SC);
add(G, E, 'cn-huangshan', 'Hoàng Sơn', 'Huangshan (Yellow Mountains)', 'Ngọn núi với biển mây, thông cổ mọc trên đá dựng đứng, hay xuất hiện trong tranh thủy mặc; được UNESCO công nhận năm 1990.',
  d => { d.bg('l'); d.r(0, 9, 16, 7, 'w'); d.tri(1, 3, 6, 10, 'A'); d.tri(8, 1, 7, 12, 'K'); d.r(0, 10, 16, 2, 'w'); d.e(3, 11, 3, 1, 'e'); d.e(12, 11.5, 3, 1, 'e'); d.l(4, 7, 4, 4, 'N'); d.e(4, 4, 2, 1, 'G'); d.p('G', 3, 3, 5, 3, 13, 5); }, SC);
add(G, E, 'cn-zhangjiajie', 'Trương Gia Giới', 'Zhangjiajie', 'Những cột đá cát cao vút giữa mây mù, gợi liên tưởng đến cảnh giới thiên nhiên kỳ ảo.',
  d => { d.bg('l'); d.r(1, 3, 3, 12, 'a'); d.r(6, 1, 3, 14, 'A'); d.r(11, 4, 3, 11, 'a'); d.r(1, 3, 3, 1, 'G'); d.r(6, 1, 3, 1, 'G'); d.r(11, 4, 3, 1, 'G'); d.r(0, 11, 16, 3, 'w'); d.r(0, 12, 6, 1, 'e'); d.p('g', 7, 0, 2, 2, 12, 3); }, SC);
add(G, E, 'cn-jiuzhaigou', 'Cửu Trại Câu', 'Jiuzhaigou', 'Những hồ nước trong vắt màu xanh ngọc, vàng, lục ở Tứ Xuyên, đẹp như tranh sơn dầu.',
  d => { d.bg('c'); d.tri(0, 1, 8, 6, 'G'); d.tri(8, 2, 8, 5, 'g'); d.e(5, 11, 5, 3, 'C'); d.e(11, 13, 5, 2.4, 'g'); d.e(5, 11, 3, 1.8, 'c'); d.e(11, 13, 3, 1.2, 'h'); d.p('y', 8, 9, 14, 10); d.p('w', 12, 2); }, SC);
add(G, E, 'cn-qiantang', 'Thủy triều sông Tiền Đường', 'Qiantang tidal bore', 'Vào dịp rằm tháng tám âm lịch, sóng thủy triều cuộn từ cửa biển ngược dòng sông ở Hàng Châu, thu hút đông người đến xem.',
  d => { d.bg('l'); d.r(0, 8, 16, 8, 'C'); d.e(6, 9, 6, 5, 'b'); d.e(6, 9, 4.4, 3.6, 'c'); d.r(0, 10, 9, 6, 'C'); d.p('w', 2, 7, 4, 5, 6, 4, 8, 5, 9, 7, 3, 9, 7, 8); d.r(11, 6, 5, 2, 'g'); d.p('r', 14, 4); d.p('w', 1, 14, 5, 15, 10, 14, 14, 15); }, SC);
add(G, E, 'cn-everest', 'Everest (Chômôlôngma)', 'Mount Everest (Qomolangma)', 'Đỉnh núi cao nhất thế giới nằm trên biên giới Trung Quốc và Nepal, cao khoảng 8.849 m.',
  d => { d.bg('c'); d.tri(0, 6, 8, 8, 'A'); d.tri(4, 1, 9, 13, 'K'); d.tri(6, 1, 5, 5, 'w'); d.tri(11, 6, 5, 8, 'a'); d.r(0, 13, 16, 3, 'w'); d.p('l', 8, 6, 9, 8); d.p('r', 8, 0); }, SC);
