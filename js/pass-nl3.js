import { add, SC, setCC } from './pass-kit.js';
setCC('nl');
// Hà Lan · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và trà/rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };

// ----- Món ăn -----
add(G, A, 'nl-stamppot', 'Stamppot', 'Stamppot', 'Khoai tây nghiền trộn với cải xoong, cải bóng hoặc rau cải, ăn kèm xúc xích rookworst. Đây là món ấm bụng quen thuộc trong mùa đông.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'w'); d.e(8, 9, 6, 3.6, 'g'); d.p('G', 4, 8, 8, 7, 11, 9, 6, 11); d.p('h', 5, 9, 10, 8, 7, 10); d.l(3, 6, 12, 5, 'N'); d.l(3, 7, 12, 6, 'n'); d.p('w', 5, 3, 9, 2, 12, 3); }, H);
add(G, A, 'nl-haring', 'Haring (cá trích muối)', 'Haring (salted herring)', 'Cá trích non muối, thường ăn sống với hành sống hoặc dưa chuột. Nhiều người cầm đuôi cá, ngửa đầu rồi thả vào miệng để ăn.',
  d => { d.bg('e'); d.e(8, 9, 6, 2.4, 'a'); d.tri(12, 6, 4, 6, 'A'); d.p('l', 4, 8, 7, 8, 10, 8); d.p('k', 3, 9); d.p('w', 5, 10, 9, 10); d.p('r', 4, 8); d.e(8, 13, 4, 1.4, 'w'); d.p('y', 6, 13, 10, 13); d.p('g', 7, 5, 9, 5); }, H);
add(G, A, 'nl-bitterballen', 'Bitterballen', 'Bitterballen', 'Viên chiên giòn nhỏ nhân thịt hầm sệt, ăn kèm mù tạt. Đây là món nhâm nhi phổ biến ở quán bar.',
  d => { d.bg('e'); for (const [x, y] of [[5, 7], [10, 7], [8, 11]]) { d.e(x, y, 2.8, 2.8, 'O'); d.e(x - 0.4, y - 0.4, 1.6, 1.6, 'o'); } d.r(11, 12, 4, 3, 'y'); d.r(11, 12, 4, 1, 'Y'); d.p('N', 5, 8, 10, 8, 8, 12); d.p('w', 4, 3, 9, 2); }, H);
add(G, A, 'nl-pannenkoek', 'Pannenkoeken', 'Pannenkoeken', 'Bánh kếp mỏng và to, ăn với thịt xông khói, phô mai hoặc si-rô. Đây là món ăn quen thuộc của bữa trưa và trẻ em yêu thích.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'w'); d.e(8, 9, 6.2, 4.2, 'o'); d.e(8, 8, 5, 3.4, 'y'); d.p('O', 4, 8, 7, 6, 10, 9, 6, 11, 11, 7); d.p('r', 6, 8, 9, 8); d.p('R', 6, 9, 9, 9); d.p('w', 8, 7); d.p('N', 12, 10); }, H);
add(G, A, 'nl-patat', 'Patat (khoai tây chiên)', 'Patat (Dutch fries)', 'Khoai chiên dày, ăn với sốt mayonnaise hoặc kiểu patatje oorlog. Khoai chiên là món ăn đường phố yêu thích nhất.',
  d => { d.bg('e'); d.r(3, 8, 10, 7, 'r'); d.r(3, 8, 10, 1, 'R'); for (let x = 4; x < 13; x += 2) d.r(x, 2 + (x % 3), 1, 7 - (x % 3), 'y'); d.p('Y', 5, 5, 9, 4, 11, 6); d.r(4, 11, 8, 1, 'w'); d.p('r', 6, 10, 9, 10); d.p('w', 12, 2); }, H);
add(G, A, 'nl-hutspot', 'Hutspot', 'Hutspot', 'Món khoai tây, cà rốt và hành tây nấu nhừ, ăn với thịt hầm. Tương truyền, món này gắn với việc kỷ niệm cuộc giải vây Leiden năm 1574.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'N'); d.e(8, 9, 6, 3.6, 'o'); d.p('y', 5, 8, 8, 7, 10, 9, 7, 10); d.p('w', 6, 9, 10, 8); d.p('O', 4, 9, 11, 10, 8, 9); d.p('N', 5, 7, 11, 7); d.p('w', 5, 3, 9, 2, 12, 4); }, H);
add(G, A, 'nl-kibbeling', 'Kibbeling', 'Kibbeling', 'Những miếng cá tuyết tẩm bột chiên, ăn với sốt tỏi. Món này thường bán ở các chợ cá và quầy ven biển.',
  d => { d.bg('e'); d.r(3, 9, 10, 6, 'W'); d.r(3, 9, 10, 1, 'w'); for (const [x, y] of [[4, 4], [8, 3], [6, 7], [10, 6], [9, 8]]) { d.r(x, y, 3, 3, 'O'); d.r(x, y, 3, 1, 'o'); } d.r(11, 10, 3, 3, 'w'); d.p('y', 12, 11); d.p('N', 5, 5, 9, 4); }, H);
add(G, A, 'nl-kaas', 'Phô mai Gouda và Edam', 'Gouda and Edam cheese', 'Phô mai bánh tròn nổi tiếng thế giới, được bán ở chợ phô mai Alkmaar. Phô mai để lâu có vị đậm và có những tinh thể nhỏ.',
  d => { d.bg('e'); d.e(5, 11, 4.4, 3, 'y'); d.r(1, 11, 9, 1, 'Y'); d.e(5, 9, 4.4, 2.4, 'o'); d.e(11, 7, 3.4, 3.4, 'r'); d.e(11, 7, 2.2, 2.2, 'R'); d.r(9, 11, 4, 1, 'w'); d.p('w', 4, 9, 6, 12, 10, 6); d.p('Y', 3, 11, 7, 11); }, H);

// ----- Đồ uống và trà/rượu -----
add(G, B, 'nl-beer', 'Bia Heineken và bia Trappist', 'Heineken and Trappist beer', 'Heineken là thương hiệu bia nhạt nổi tiếng được thành lập năm 1864 ở Amsterdam. Bia Trappist do các tu viện ở Hà Lan và Bỉ nấu và có vị đậm hơn.',
  d => { d.bg('e'); d.r(2, 5, 4, 9, 'G'); d.r(3, 2, 2, 3, 'G'); d.r(2, 8, 4, 3, 'w'); d.p('r', 3, 9); d.r(8, 4, 5, 10, 'o'); d.r(8, 2, 5, 2, 'w'); d.r(13, 6, 2, 5, 'a'); d.p('N', 9, 6, 11, 9, 10, 12); d.p('y', 3, 3); }, H);
add(G, B, 'nl-jenever', 'Jenever', 'Jenever', 'Loại rượu mạnh ướp quả bách xù, tiền thân của gin. Người Hà Lan thường uống trong ly nhỏ rót đầy đến miệng, và cúi xuống nhấp đầu tiên.',
  d => { d.bg('e'); d.r(6, 5, 4, 3, 'W'); d.r(5, 8, 6, 7, 'W'); d.r(6, 2, 4, 3, 'N'); d.r(7, 1, 2, 1, 'k'); d.p('b', 7, 9, 8, 11); d.p('c', 6, 8, 9, 13); d.r(11, 11, 3, 3, 'w'); d.r(11, 11, 3, 1, 'c'); d.p('b', 5, 13, 8, 14); }, H);
add(G, B, 'nl-koffie', 'Cà phê (koffie)', 'Coffee (koffie)', 'Người Hà Lan uống cà phê nhiều và thường kèm một chiếc bánh quy nhỏ. Họ có khái niệm gezellig, đó là không khí ấm cúng bên nhau.',
  d => { d.bg('e'); d.r(3, 6, 8, 7, 'w'); d.r(3, 6, 8, 1, 'W'); d.r(4, 7, 6, 2, 'N'); d.r(11, 7, 3, 4, 'W'); d.r(12, 8, 1, 2, 'e'); d.r(2, 13, 10, 1, 'W'); d.p('w', 5, 3, 7, 2, 9, 4, 6, 1); d.r(12, 13, 3, 2, 'o'); d.p('O', 13, 14); }, H);
add(G, B, 'nl-muntthee', 'Trà bạc hà (munt thee)', 'Mint tea (munt thee)', 'Lá bạc hà tươi pha nóng, được nhiều người ưa vì cảm giác dễ chịu. Một số quán cà phê phục vụ trà này trong ly thủy tinh.',
  d => { d.bg('e'); d.r(4, 4, 8, 10, 'h'); d.r(4, 4, 8, 1, 'l'); d.r(5, 13, 6, 1, 'g'); d.r(5, 5, 6, 8, 'c'); d.p('g', 6, 4, 9, 3, 7, 2, 10, 2, 8, 0); d.p('G', 7, 3, 9, 4); d.p('w', 6, 7, 6, 9); d.p('y', 8, 10); }, H);
add(G, B, 'nl-melk', 'Sữa (melk)', 'Milk (melk)', 'Người Hà Lan uống sữa khá nhiều, kể cả trong bữa trưa. Đây là thói quen khác thường thấy với nhiều nước.',
  d => { d.bg('e'); d.r(5, 3, 6, 11, 'w'); d.tri(5, 0, 6, 3, 'w'); d.r(5, 3, 6, 1, 'W'); d.r(5, 7, 6, 4, 'b'); d.p('w', 7, 8, 8, 9); d.p('W', 10, 4, 10, 13); d.p('c', 6, 12, 9, 12); d.r(11, 10, 3, 4, 'w'); d.r(11, 10, 3, 1, 'W'); }, H);
add(G, B, 'nl-advocaat', 'Advocaat', 'Advocaat', 'Rượu trứng ngọt đặc quánh màu vàng, ăn bằng muỗng hoặc pha vào đồ uống. Nhiều gia đình dùng món này vào dịp lễ.',
  d => { d.bg('e'); d.r(3, 5, 10, 8, 'y'); d.r(3, 5, 10, 1, 'u'); d.r(3, 12, 10, 1, 'Y'); d.r(5, 2, 6, 3, 'w'); d.e(8, 2, 3, 1.4, 'w'); d.p('r', 7, 1); d.p('W', 4, 7, 4, 11); d.p('o', 8, 9, 10, 8); d.l(13, 4, 15, 12, 'a'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'nl-stroopwafel', 'Stroopwafel', 'Stroopwafel', 'Hai lớp bánh quế mỏng kẹp si-rô caramen, thường đặt trên miệng cốc cà phê nóng cho mềm. Món này có nguồn gốc từ thành phố Gouda.',
  d => { d.bg('e'); d.e(8, 8, 7, 5.6, 'O'); d.e(8, 8, 6, 4.6, 'o'); for (let i = 2; i < 15; i += 2) { d.l(i, 3, i, 13, 'O'); d.l(2, i - 1 > 3 ? i - 1 : 4, 14, i - 1 > 3 ? i - 1 : 4, 'O'); } d.e(8, 8, 1.4, 1.4, 'N'); d.p('y', 5, 6, 11, 10); }, H);
add(G, C, 'nl-oliebol', 'Oliebollen', 'Oliebollen', 'Bánh rán tròn phủ đường bột, ăn vào đêm giao thừa. Các xe bán bánh xuất hiện trên phố vào tháng Mười Một và tháng Mười Hai.',
  d => { d.bg('e'); for (const [x, y] of [[5, 7], [11, 7], [8, 11]]) { d.e(x, y, 3.2, 3, 'O'); d.e(x, y, 2.6, 2.4, 'w'); d.e(x - 0.6, y - 0.6, 1.2, 1.2, 'e'); } d.p('o', 4, 8, 12, 8, 7, 12); d.p('w', 3, 3, 8, 2, 12, 3); }, H);
add(G, C, 'nl-pepernoten', 'Pepernoten và kruidnoten', 'Pepernoten and kruidnoten', 'Bánh quy nhỏ vị gia vị, rắc khắp nơi trong lễ Sinterklaas ngày 5 tháng Mười Hai. Trẻ em hát bài hát và đặt giày cạnh lò sưởi để nhận quà.',
  d => { d.bg('e'); for (const [x, y] of [[4, 5], [8, 4], [12, 6], [6, 9], [10, 10], [4, 12], [13, 13], [8, 13]]) { d.e(x, y, 1.8, 1.8, 'O'); d.put(x, y, 'N'); } d.r(1, 14, 14, 1, 'o'); d.p('r', 2, 2, 14, 3); }, H);
add(G, C, 'nl-tompouce', 'Tompouce', 'Tompouce', 'Bánh hình chữ nhật có kem và lớp phủ hồng, được nhắc tới vào Ngày của Vua với lớp phủ màu cam. Đây là bánh đặc trưng của các tiệm bánh.',
  d => { d.bg('e'); d.r(2, 5, 12, 2, 'p'); d.r(2, 5, 12, 1, 'x'); d.r(2, 7, 12, 3, 'u'); d.r(2, 7, 12, 1, 'w'); d.r(2, 10, 12, 2, 'O'); d.r(2, 12, 12, 1, 'o'); d.p('P', 4, 6, 8, 6, 12, 6); d.p('o', 6, 4, 10, 4); }, H);
add(G, C, 'nl-hagelslag', 'Hagelslag', 'Hagelslag', 'Những hạt sô-cô-la rắc lên bánh mì bơ trong bữa sáng. Đây là món quen thuộc với cả trẻ em và người lớn.',
  d => { d.bg('e'); d.r(2, 6, 12, 7, 't'); d.r(2, 6, 12, 1, 'e'); d.r(2, 7, 12, 1, 'u'); for (let i = 0; i < 24; i++) d.put(3 + (i * 7) % 10, 8 + (i * 3) % 4, i % 3 ? 'N' : 'm'); d.p('y', 3, 3, 12, 3); }, H);
add(G, C, 'nl-appeltaart', 'Appeltaart', 'Appeltaart', 'Bánh táo với vỏ phủ lưới, ăn cùng kem tươi trong quán cà phê. Món này thường đi kèm cà phê chiều.',
  d => { d.bg('e'); d.e(8, 10, 7, 4, 'O'); d.e(8, 9, 6, 3.2, 'o'); for (let x = 3; x < 14; x += 2) d.l(x, 6, x + 2, 12, 'O'); for (let x = 13; x > 2; x -= 2) d.l(x, 6, x - 2, 12, 'O'); d.e(12, 5, 2.4, 2, 'w'); d.p('W', 11, 4, 13, 5); d.p('r', 5, 9); }, H);
