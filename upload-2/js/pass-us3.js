import { add, SC, setCC } from './pass-kit.js';
setCC('us');
// Hoa Kỳ · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Bánh và đồ ngọt', C = 'Đồ uống', E = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = (d, c = 'w') => { d.e(8, 10, 7, 4.6, 'a'); d.e(8, 9.6, 6.4, 4, c); };
const bowl = (d, c = 'w', rim = 'a') => { d.e(8, 9, 7, 5.5, c); d.r(0, 0, 16, 7, '_'); d.r(1, 6, 14, 1, rim); d.e(8, 6.5, 7, 1.4, rim); d.r(5, 14, 6, 1, rim); };
const glass = (d, c) => { d.r(4, 3, 8, 11, 'l'); d.r(4, 3, 8, 1, 'w'); d.r(5, 5, 6, 8, c); d.r(4, 13, 8, 1, 'a'); };

// ----- Món ăn -----
add(G, A, 'us-hamburger', 'Hamburger', 'Hamburger', 'Miếng thịt bò xay kẹp trong bánh mì tròn cùng rau, phô mai và sốt, món biểu tượng của ẩm thực Mỹ.',
  d => { d.bg('e'); d.e(8, 5, 6, 3.4, 'o'); d.r(1, 5, 14, 3, '_'); d.e(8, 5, 6, 3.4, 'o'); d.p('w', 5, 3, 8, 2, 11, 3); d.r(2, 8, 12, 1, 'g'); d.r(2, 9, 12, 1, 'r'); d.r(2, 10, 12, 2, 'N'); d.r(2, 9, 12, 1, 'y'); d.e(8, 13, 6, 1.6, 'o'); d.r(1, 12, 14, 1, 'n'); }, SC);
add(G, A, 'us-hotdog', 'Hot dog', 'Hot dog', 'Xúc xích kẹp bánh mì dài, ăn kèm mù tạt, tương cà, bán nhiều ở sân vận động và xe đẩy ven đường.',
  d => { d.bg('e'); d.e(8, 9, 7, 3.2, 'o'); d.e(8, 8, 7, 2.4, 'u'); d.r(1, 8, 14, 2, 'r'); d.l(2, 8, 5, 7, 'y'); d.l(5, 7, 8, 8, 'y'); d.l(8, 8, 11, 7, 'y'); d.l(11, 7, 14, 8, 'y'); d.l(3, 9, 12, 9, 'R'); d.r(1, 11, 14, 1, 'n'); }, SC);
add(G, A, 'us-pizza', 'Pizza kiểu Mỹ', 'American pizza', 'Pizza New York lớn, bánh mỏng, cầm để gấp đôi, còn pizza Chicago deep dish là loại bánh dày như chiếc bánh.',
  d => { d.bg('e'); d.tri(1, 2, 14, 13, 'o'); d.tri(2, 4, 12, 10, 'r'); d.tri(3, 5, 10, 8, 'y'); d.e(8, 9, 1.4, 1.4, 'R'); d.e(6, 7, 1.2, 1.2, 'R'); d.e(10, 8, 1.2, 1.2, 'R'); d.p('g', 7, 11, 9, 6, 5, 9); d.r(1, 2, 14, 1, 'O'); }, SC);
add(G, A, 'us-friedchicken', 'Gà rán (fried chicken)', 'Fried chicken', 'Món kinh điển của miền Nam, lớp vỏ giòn, thường ăn với bánh quy và nước sốt.',
  d => { d.bg('e'); plate(d); d.e(7, 8, 3.6, 3, 'o'); d.e(10, 11, 2.2, 1.8, 'o'); d.l(10, 10, 13, 12, 'w'); d.p('w', 13, 13, 12, 13); d.p('O', 5, 7, 8, 9, 6, 9, 9, 8); d.p('u', 6, 6, 7, 7); d.r(2, 13, 12, 1, 'a'); }, SC);
add(G, A, 'us-macandcheese', 'Mac and cheese', 'Mac and cheese', 'Mì ống nấu với sốt phô mai, món ăn ấm áp của trẻ em và bữa tiệc.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'o'); d.r(0, 0, 16, 5, '_'); for (const [x, y] of [[4, 8], [6, 7], [8, 8], [10, 7], [12, 8], [5, 10], [9, 10]]) d.r(x, y, 2, 1, 'y'); d.p('O', 6, 8, 10, 9); }, SC);
add(G, A, 'us-bbq', 'BBQ của Texas, Carolina và Kansas City', 'Texas, Carolina and Kansas City barbecue', 'Thịt nướng chậm bằng khói gỗ, mỗi vùng có cách ướp và sốt riêng, Texas nổi tiếng với brisket, Carolina với thịt heo xé.',
  d => { d.bg('e'); d.r(1, 5, 14, 7, 'n'); d.r(1, 5, 14, 2, 'N'); d.r(1, 11, 14, 1, 'n'); d.p('R', 3, 8, 6, 9, 9, 8, 12, 9); d.p('r', 4, 6, 10, 7); d.p('w', 4, 2, 8, 1, 12, 3); d.r(0, 12, 16, 3, 'k'); d.p('O', 2, 13, 13, 14); }, SC);
add(G, A, 'us-cheesesteak', 'Philly cheesesteak', 'Philly cheesesteak', 'Bánh mì kẹp thịt bò thái mỏng và phô mai chảy, đặc sản Philadelphia.',
  d => { d.bg('e'); d.e(8, 11, 7, 3, 'o'); d.e(8, 8, 7, 3, 'u'); d.r(1, 8, 14, 3, 'N'); for (let x = 2; x < 14; x += 2) d.p('n', x, 8, x + 1, 9); d.r(2, 8, 12, 1, 'y'); d.p('g', 4, 9, 9, 9); d.r(1, 12, 14, 1, 'n'); }, SC);
add(G, A, 'us-chowder', 'Súp nghêu New England (clam chowder)', 'New England clam chowder', 'Súp kem đặc với nghêu, khoai tây và thịt xông khói, thường đựng trong bánh mì rỗng.',
  d => { d.bg('e'); d.e(8, 10, 6.6, 4.6, 'o'); d.r(0, 0, 16, 6, '_'); d.r(1, 6, 14, 1, 'O'); d.e(8, 6.5, 6.6, 1.6, 'O'); d.e(8, 7, 5.4, 1.2, 'w'); d.p('e', 5, 7, 10, 7); d.p('a', 7, 7, 9, 7); d.p('g', 8, 6); d.p('w', 5, 3, 8, 2, 11, 4); }, SC);
add(G, A, 'us-lobsterroll', 'Lobster roll', 'Lobster roll', 'Thịt tôm hùm trộn bơ hoặc sốt mayonnaise kẹp bánh mì nướng bơ, món của biển Maine.',
  d => { d.bg('e'); d.e(8, 10, 7, 3, 'o'); d.r(1, 7, 14, 3, 'u'); d.e(8, 7, 6, 1.6, 'r'); for (let x = 3; x < 13; x += 2) d.p('R', x, 7); d.p('w', 4, 6, 8, 6, 11, 6); d.p('g', 6, 5, 10, 5); d.r(1, 11, 14, 1, 'n'); }, SC);
add(G, A, 'us-gumbo', 'Gumbo và jambalaya (Louisiana)', 'Gumbo and jambalaya (Louisiana)', 'Hai món hầm cay kết hợp ẩm thực Pháp, Tây Ban Nha và châu Phi, với tôm, xúc xích và gạo.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'N'); d.r(0, 0, 16, 5, '_'); d.p('o', 5, 8, 8, 7, 11, 9); d.p('r', 6, 9, 10, 8, 8, 9); d.p('w', 4, 8, 12, 8); d.p('g', 7, 8, 9, 7); }, SC);
add(G, A, 'us-buffalowings', 'Cánh gà Buffalo (buffalo wings)', 'Buffalo wings', 'Cánh gà chiên sao sốt cay, sinh ra ở Buffalo, bang New York và gắn với buổi xem thể thao.',
  d => { d.bg('e'); plate(d); for (const [x, y] of [[5, 8], [8, 7], [11, 8], [7, 11]]) { d.e(x, y, 2, 1.6, 'O'); d.p('r', x, y); d.p('w', x - 2, y + 1); } d.p('g', 12, 11, 13, 12); d.r(11, 12, 3, 1, 'w'); }, SC);
add(G, A, 'us-texmex', 'Tex-Mex', 'Tex-Mex', 'Món kết hợp ẩm thực Mexico và Texas, như taco, nachos và bánh cuốn burrito.',
  d => { d.bg('e'); d.fan(8, 12, 6, 'y'); d.r(2, 11, 12, 1, 'O'); d.p('r', 5, 9, 9, 8, 11, 10); d.p('g', 4, 10, 8, 10, 12, 9); d.p('w', 7, 9); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, A, 'us-soulfood', 'Bếp miền Nam (soul food)', 'Soul food', 'Cải xanh nấu, bánh ngô, cơm đậu, đặc trưng của cộng đồng người Mỹ gốc Phi.',
  d => { d.bg('e'); plate(d); d.e(4, 9, 2.4, 2, 'G'); d.r(7, 7, 4, 3, 'y'); d.r(7, 7, 4, 1, 'u'); d.e(12, 10, 2, 1.6, 'N'); d.p('n', 11, 10, 13, 10); d.p('g', 3, 8, 5, 10); d.p('Y', 8, 9, 10, 8); }, SC);
add(G, A, 'us-pbj', 'Bánh mì kẹp bơ đậu phộng và mứt (PB&J)', 'Peanut butter and jelly sandwich', 'Bữa trưa quen thuộc của học sinh.',
  d => { d.bg('e'); d.r(2, 4, 12, 3, 'u'); d.r(2, 7, 12, 2, 't'); d.r(2, 9, 12, 2, 'm'); d.r(2, 11, 12, 3, 'u'); d.r(2, 4, 12, 1, 'o'); d.r(2, 13, 12, 1, 'o'); d.p('R', 4, 10, 10, 9); d.p('O', 5, 7, 11, 8); d.p('w', 2, 2, 13, 2); }, SC);
add(G, A, 'us-fries', 'Khoai tây chiên (french fries)', 'French fries', 'Món ăn kèm phổ biến nhất, đi cùng gần như mọi loại bánh mì kẹp.',
  d => { d.bg('e'); for (let i = 0; i < 7; i++) d.r(4 + i, 2 + (i % 3), 1, 7, i % 2 ? 'y' : 'u'); d.r(3, 8, 10, 7, 'r'); d.r(3, 8, 10, 1, 'R'); d.r(3, 14, 10, 1, 'R'); d.p('y', 7, 10, 8, 11, 9, 10); d.p('w', 5, 12); }, SC);

// ----- Bánh và đồ ngọt -----
add(G, B, 'us-applepie', 'Bánh táo (apple pie)', 'Apple pie', 'Biểu tượng của sự giản dị và óc yêu nước, ăn nóng với kem và đặc biệt là dịp lễ.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.4, 'o'); d.e(8, 9, 6.2, 3.6, 'u'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.l(8, 9, Math.round(8 + Math.cos(a) * 5), Math.round(9 + Math.sin(a) * 3.4), 'O'); } d.e(8, 9, 1.4, 1, 'O'); d.p('w', 4, 6, 8, 5, 12, 6); d.r(1, 13, 14, 1, 'n'); }, SC);
add(G, B, 'us-cookie', 'Bánh quy sô cô la chip', 'Chocolate chip cookie', 'Sinh ra năm 1938 ở bang Massachusetts, nay là món bánh quy phổ biến nhất nước Mỹ.',
  d => { d.bg('e'); d.e(8, 9, 6.6, 6, 'o'); d.e(8, 9, 5.6, 5, 'u'); for (const [x, y] of [[5, 6], [9, 5], [11, 9], [6, 10], [9, 12], [4, 9], [8, 8]]) d.p('N', x, y, x + 1, y); d.p('O', 3, 11, 13, 7); }, H);
add(G, B, 'us-brownie', 'Brownie', 'Brownie', 'Bánh sô cô la đặc, dẻo, cắt thành ô vuông.',
  d => { d.bg('e'); d.r(2, 5, 12, 8, 'N'); d.r(2, 5, 12, 2, 'n'); d.r(2, 12, 12, 1, 'k'); for (const [x, y] of [[4, 8], [7, 9], [10, 8], [5, 11], [11, 11]]) d.p('o', x, y); d.p('w', 3, 6, 8, 6); d.p('K', 7, 7, 11, 10); }, SC);
add(G, B, 'us-pancake', 'Bánh pancake và waffle với xi-rô phong', 'Pancakes and waffles with maple syrup', 'Bữa sáng cuối tuần, rưới xi-rô phong lấy từ Vermont và Canada.',
  d => { d.bg('e'); d.e(8, 12, 6.6, 2, 'o'); d.e(8, 10, 6.4, 2, 'u'); d.e(8, 8, 6.2, 2, 'o'); d.e(8, 8, 4, 1.2, 'O'); d.p('y', 8, 6, 7, 6, 9, 6); d.r(7, 4, 2, 3, 'y'); d.p('O', 4, 9, 11, 11); d.p('n', 3, 8, 13, 8); }, SC);
add(G, B, 'us-bagel', 'Bagel và kem phô mai', 'Bagel and cream cheese', 'Bánh vòng đặc ruột dai, được cộng đồng Do Thái mang đến New York.',
  d => { d.bg('e'); d.e(8, 9, 6.4, 5.4, 'o'); d.e(8, 9, 2.4, 2, 'e'); d.e(8, 9, 6.4, 5.4, 'o'); d.e(8, 9, 2.4, 2, 'e'); d.p('u', 4, 6, 6, 5, 10, 5, 12, 7); d.p('w', 5, 12, 9, 13, 11, 11, 3, 9); d.p('O', 4, 11, 12, 10); }, SC);
add(G, B, 'us-donut', 'Donut', 'Donut', 'Bánh rán hình vòng phủ đường, ăn sáng cùng cà phê.',
  d => { d.bg('e'); d.e(8, 9, 6.4, 5.4, 'o'); d.e(8, 8.5, 5.6, 4.6, 'p'); d.e(8, 9, 2.2, 1.8, 'e'); d.p('w', 4, 7, 6, 5, 11, 6); d.p('y', 11, 9, 5, 11, 9, 12); d.p('c', 5, 8, 10, 11); d.p('r', 12, 8); }, SC);
add(G, B, 'us-cheesecake', 'Cheesecake New York', 'New York cheesecake', 'Bánh phô mai kem đặc, mịn, đế bánh quy.',
  d => { d.bg('e'); d.tri(1, 4, 14, 10, 'u'); d.r(1, 11, 14, 3, 'e'); d.r(1, 13, 14, 2, 'n'); d.p('r', 8, 3, 7, 4, 9, 4); d.e(8, 3, 1.2, 1.2, 'r'); d.p('w', 5, 8, 10, 9); d.p('y', 3, 11, 12, 11); }, SC);
add(G, B, 'us-keylime', 'Key lime pie', 'Key lime pie', 'Bánh chanh xanh đặc sản Florida, vị chua ngọt.',
  d => { d.bg('e'); d.tri(1, 4, 14, 10, 'h'); d.r(1, 11, 14, 3, 'g'); d.r(1, 13, 14, 2, 'n'); d.p('w', 5, 5, 8, 4, 11, 5); d.e(8, 3, 1.6, 1.4, 'g'); d.p('G', 8, 3); d.p('l', 4, 9, 11, 9); }, SC);
add(G, B, 'us-icecream', 'Kem và milkshake', 'Ice cream and milkshakes', 'Hàng kem đường phố và quán soda cổ điển.',
  d => { d.bg('c'); d.e(5, 6, 3, 3, 'p'); d.tri(2, 8, 6, 7, 'u'); d.p('O', 4, 10, 6, 12); d.r(10, 4, 4, 9, 'l'); d.r(10, 4, 4, 1, 'w'); d.r(10, 5, 4, 7, 'p'); d.l(12, 0, 11, 4, 'r'); d.e(12, 4, 2.4, 1, 'w'); d.p('r', 5, 4); }, H);
add(G, B, 'us-cupcake', 'Bánh cupcake', 'Cupcake', 'Bánh nhỏ phủ kem, biến thành xu hướng ở các tiệm bánh thập niên 2000.',
  d => { d.bg('e'); d.tri(3, 9, 10, 6, 'p'); d.dtri(3, 9, 10, 6, 'P'); d.e(8, 6, 4.4, 3, 'x'); d.e(8, 4, 3, 2, 'p'); d.e(8, 2.5, 1.6, 1.4, 'x'); d.p('r', 8, 1); d.p('w', 5, 6, 10, 6, 7, 4); d.p('y', 6, 7, 9, 4); }, H);

// ----- Đồ uống -----
add(G, C, 'us-cola', 'Coca-Cola', 'Coca-Cola', 'Nước ngọt được dược sĩ John Pemberton giới thiệu ở Atlanta năm 1886, nay là thương hiệu bán khắp thế giới.',
  d => { d.r(7, 0, 2, 2, 'a'); d.r(6, 2, 4, 2, 'r'); d.r(4, 4, 8, 10, 'r'); d.r(4, 4, 8, 1, 'R'); d.r(5, 8, 6, 2, 'w'); d.p('r', 6, 9, 9, 9); d.r(4, 13, 8, 1, 'R'); d.p('w', 5, 6); }, H);
add(G, C, 'us-sweettea', 'Trà đá ngọt (sweet tea)', 'Sweet tea', 'Thức uống của miền Nam, trà pha nhiều đường và uống lạnh.',
  d => { d.bg('e'); glass(d, 'n'); d.r(5, 5, 6, 1, 'o'); d.r(5, 6, 3, 2, 'w'); d.p('w', 8, 9, 6, 11); d.e(12, 3, 2, 2, 'y'); d.p('Y', 12, 3); d.l(9, 1, 10, 6, 'g'); }, H);
add(G, C, 'us-coffee', 'Cà phê lọc (drip coffee)', 'Drip coffee', 'Cà phê pha loãng, uống nhiều cốc trong ngày, và Starbucks ra đời ở Seattle năm 1971.',
  d => { d.bg('e'); d.r(3, 5, 9, 9, 'w'); d.r(3, 5, 9, 1, 'l'); d.r(4, 6, 7, 2, 'N'); d.e(7, 6, 3.4, 1, 'N'); d.l(12, 7, 14, 8, 'w'); d.l(14, 8, 12, 11, 'w'); d.p('w', 5, 3, 8, 2, 10, 3); d.r(2, 14, 11, 1, 'a'); }, H);
add(G, C, 'us-craftbeer', 'Bia thủ công (craft beer)', 'Craft beer', 'Hàng nghìn nhà máy bia nhỏ mọc lên khắp nơi từ những năm 1980.',
  d => { d.r(3, 3, 8, 11, 'y'); d.r(3, 1, 8, 3, 'w'); d.r(3, 3, 8, 1, 'e'); d.r(11, 5, 3, 6, 'a'); d.r(12, 6, 1, 4, '_'); d.p('o', 5, 6, 8, 8, 5, 11, 9, 12); d.p('u', 4, 5, 4, 10); d.r(3, 14, 8, 1, 'Y'); d.p('w', 5, 1, 9, 0); }, H);
add(G, C, 'us-bourbon', 'Whiskey bourbon (Kentucky)', 'Bourbon whiskey (Kentucky)', 'Rượu mạnh làm từ ngô, ủ trong thùng gỗ sồi đốt cháy, phần lớn sản xuất ở Kentucky.',
  d => { d.r(6, 0, 4, 3, 'N'); d.r(5, 3, 6, 11, 'o'); d.r(5, 3, 6, 1, 'O'); d.r(5, 7, 6, 4, 'e'); d.r(5, 7, 6, 1, 'N'); d.p('N', 7, 9, 9, 9); d.p('w', 6, 5); d.r(5, 14, 6, 1, 'O'); }, H);
add(G, C, 'us-napa', 'Rượu vang Napa Valley', 'Napa Valley wine', 'Vùng sản xuất vang nổi tiếng của California, gây chú ý từ cuộc thi nếm rượu ở Paris năm 1976.',
  d => { d.r(7, 0, 2, 5, 'G'); d.r(7, 0, 2, 1, 'r'); d.r(5, 5, 6, 9, 'G'); d.tri(5, 4, 6, 2, 'G'); d.r(5, 8, 6, 4, 'e'); d.r(5, 8, 6, 1, 'r'); d.p('v', 8, 10); d.r(5, 14, 6, 1, 'k'); }, H);
add(G, C, 'us-cocktail', 'Cocktail Old Fashioned và Manhattan', 'Old Fashioned and Manhattan cocktails', 'Hai loại cốc-tai kinh điển làm từ whiskey, được cho là ra đời ở Mỹ.',
  d => { d.r(2, 7, 7, 7, 'l'); d.r(2, 7, 7, 1, 'w'); d.r(3, 8, 5, 5, 'o'); d.r(4, 9, 2, 2, 'w'); d.p('r', 7, 6); d.tri(9, 2, 6, 4, 'l'); d.r(11, 6, 2, 6, 'l'); d.r(10, 12, 4, 1, 'l'); d.tri(10, 3, 4, 2, 'R'); d.p('r', 12, 1); }, H);
add(G, C, 'us-rootbeer', 'Root beer', 'Root beer', 'Nước ngọt vị thảo mộc ngọt, có hương hơi giống dầu gió đối với người lạ.',
  d => { d.bg('e'); glass(d, 'N'); d.r(5, 5, 6, 2, 'w'); d.r(5, 4, 6, 1, 'w'); d.p('n', 6, 9, 9, 11); d.l(11, 2, 10, 8, 'r'); d.p('w', 3, 3); }, H);
add(G, C, 'us-milk', 'Sữa lạnh và bánh quy', 'Cold milk and cookies', 'Bữa phụ đơn giản của trẻ em.',
  d => { d.bg('e'); glass(d, 'w'); d.r(5, 5, 6, 1, 'e'); d.p('l', 5, 7, 5, 11); d.e(4, 14, 2.4, 1.4, 'o'); d.e(12, 14, 2.4, 1.4, 'o'); d.p('N', 4, 14, 12, 14); }, H);
add(G, C, 'us-mintjulep', 'Mint julep', 'Mint julep', 'Thức uống bạc hà và bourbon, gắn liền với cuộc đua ngựa Kentucky Derby.',
  d => { d.r(4, 4, 8, 10, 'a'); d.r(4, 4, 8, 1, 'l'); d.r(5, 5, 6, 8, 'w'); d.p('l', 6, 8, 9, 10); d.p('g', 5, 2, 7, 1, 9, 2, 11, 1, 8, 3, 10, 3); d.p('G', 8, 2); d.l(11, 0, 9, 7, 'r'); d.r(4, 13, 8, 1, 'A'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, E, 'us-turkey', 'Gà tây nướng dịp Lễ Tạ ơn (Thanksgiving)', 'Thanksgiving roast turkey', 'Bữa tiệc vào thứ Năm thứ tư của tháng mười một, có gà tây nhồi, nước sốt nam việt quất và bánh bí ngô.',
  d => { d.bg('e'); plate(d); d.e(8, 8, 5, 3.4, 'o'); d.e(8, 7.5, 4, 2.6, 'O'); d.l(3, 10, 1, 12, 'e'); d.p('w', 1, 13); d.l(13, 10, 15, 12, 'e'); d.p('w', 15, 13); d.p('u', 6, 6, 9, 7, 7, 9); d.p('r', 12, 13, 13, 13); d.p('g', 3, 13); }, SC);
add(G, E, 'us-pumpkinpie', 'Bánh bí ngô (pumpkin pie)', 'Pumpkin pie', 'Món tráng miệng của mùa thu, nhất là dịp Lễ Tạ ơn.',
  d => { d.bg('e'); d.tri(1, 6, 14, 8, 'o'); d.r(1, 11, 14, 3, 'O'); d.r(1, 6, 14, 5, 'o'); d.r(1, 6, 14, 1, 'u'); d.r(1, 13, 14, 1, 'n'); d.p('w', 4, 4, 7, 3, 10, 4); d.e(8, 4, 2, 1.2, 'w'); d.p('n', 5, 8, 10, 9); }, SC);
add(G, E, 'us-july4', 'BBQ ngày Quốc khánh 4 tháng 7', 'Fourth of July barbecue', 'Gia đình nướng hamburger, hot dog và xem pháo hoa.',
  d => { d.bg('B'); d.r(0, 12, 16, 4, 'k'); d.r(2, 9, 12, 3, 'a'); d.r(2, 8, 12, 1, 'k'); d.p('r', 4, 7, 8, 6, 11, 7); d.p('w', 3, 3, 12, 2); for (const [x, y, c] of [[3, 2, 'r'], [8, 1, 'w'], [13, 2, 'b']]) d.p(c, x, y, x - 1, y, x + 1, y, x, y - 1, x, y + 1); }, SC);
add(G, E, 'us-superbowl', 'Buổi tiệc Super Bowl', 'Super Bowl party', 'Ngày giữa mùa đông khi cánh gà, khoai chiên và bia được tiêu thụ rất nhiều.',
  d => { d.bg('G'); d.e(8, 8, 6, 3.4, 'n'); d.l(3, 8, 13, 8, 'w'); d.l(6, 7, 6, 9, 'w'); d.l(8, 7, 8, 9, 'w'); d.l(10, 7, 10, 9, 'w'); d.r(0, 13, 16, 3, 'g'); d.p('w', 1, 12, 14, 12); d.p('y', 8, 2, 7, 3, 9, 3); }, SC);
add(G, E, 'us-halloween', 'Kẹo và bánh trong lễ Halloween', 'Halloween candy and treats', 'Trẻ em gõ cửa đòi kẹo vào ngày 31 tháng mười, nhiều nhà khắc đèn bí ngô.',
  d => { d.bg('v'); d.e(8, 9, 5.4, 5, 'o'); d.r(7, 3, 2, 2, 'G'); d.p('k', 5, 8, 6, 8, 5, 7, 10, 8, 11, 8, 10, 7, 8, 10, 6, 11, 7, 11, 9, 11, 10, 11); d.p('y', 6, 9, 9, 9); d.p('p', 1, 2, 14, 3); d.p('w', 13, 13, 2, 13); }, SC);
add(G, E, 'us-xmascookies', 'Bánh quy và sữa dịp Giáng sinh', 'Christmas cookies and milk', 'Nhiều nhà nướng bánh quy trang trí và để lại cho ông già Noel.',
  d => { d.bg('R'); d.r(0, 12, 16, 4, 'N'); d.tri(2, 5, 6, 7, 'G'); d.r(4, 12, 2, 1, 'n'); d.r(9, 6, 4, 6, 'w'); d.r(9, 6, 4, 1, 'l'); d.r(9, 8, 4, 4, 'e'); d.p('y', 5, 7, 3, 9, 6, 10); d.p('r', 4, 8, 6, 8); d.p('w', 2, 2, 13, 3, 8, 3); }, SC);
add(G, E, 'us-clambake', 'Clambake (New England)', 'New England clambake', 'Mùa hè người dân ven biển hấp nghêu, tôm hùm và ngô ngay trên bãi biển.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'u'); d.r(0, 8, 16, 2, 'C'); d.e(4, 12, 3, 1.8, 'r'); d.p('R', 3, 11, 5, 12); d.e(10, 12, 2.4, 1.6, 'a'); d.e(14, 12, 1.4, 1.4, 'a'); d.r(6, 13, 4, 1, 'y'); d.p('Y', 6, 13, 8, 13); d.p('w', 2, 3, 12, 2); }, SC);
add(G, E, 'us-crawfish', 'Crawfish boil (Louisiana)', 'Louisiana crawfish boil', 'Mùa xuân, cả nhà ngồi quanh bàn trải báo và ăn tôm hùm đất luộc cay.',
  d => { d.bg('e'); d.r(0, 8, 16, 8, 'w'); for (let y = 9; y < 16; y += 2) d.r(0, y, 16, 1, 'a'); for (const [x, y] of [[4, 11], [9, 10], [12, 13]]) { d.e(x, y, 2.4, 1.4, 'r'); d.l(x - 2, y, x - 3, y - 2, 'R'); d.l(x + 2, y, x + 3, y - 2, 'R'); d.p('k', x - 1, y - 1); d.p('R', x, y + 1); } d.p('y', 13, 9); d.p('g', 2, 14); }, SC);
add(G, E, 'us-eastham', 'Giăm bông dịp Phục sinh', 'Easter ham', 'Thịt heo muối nướng là món chính của nhiều gia đình.',
  d => { d.bg('h'); plate(d); d.e(7, 9, 4.4, 3.2, 'p'); d.e(7, 8.6, 3.6, 2.4, 'x'); d.r(11, 8, 3, 2, 'w'); d.e(14, 9, 1.2, 1.2, 'w'); d.p('P', 4, 9, 7, 10, 9, 8); d.p('o', 5, 7, 9, 7); d.p('y', 3, 3, 12, 2); d.e(13, 12, 1.4, 1.8, 'y'); }, SC);
