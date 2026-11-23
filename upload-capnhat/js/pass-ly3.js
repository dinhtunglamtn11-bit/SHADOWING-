import { add, SC, setCC } from './pass-kit.js';
setCC('ly');
// Libya · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và trà', C = 'Món ngọt và món theo mùa';
const H = { use: 'hold' };
const plate = (d, bg = 'e') => { d.bg(bg); d.e(8, 9, 7, 5, 'w'); d.e(8, 9, 5.8, 4, 'W'); };
const glass = (d, x, c) => { d.r(x, 6, 3, 6, 'c'); d.r(x, 6, 3, 1, 'l'); d.r(x, 8 + (c ? 0 : 1), 3, 4, c || 'o'); d.r(x, 12, 3, 1, 'a'); };

// ----- Món ăn -----
add(G, A, 'ly-bazin', 'Bazin', 'Bazin', 'Món bánh làm từ bột lúa mạch nấu với nước cho đặc rồi nhào thành khối tròn, ăn cùng nước sốt cà chua có thịt, trứng và khoai. Món này thường được coi là quốc thức và người ta ăn chung từ một đĩa lớn.',
  d => { plate(d); d.e(8, 8, 3.6, 3, 'u'); d.e(8, 7.4, 2.8, 2, 'y'); d.e(8, 11, 6, 2, 'r'); d.p('R', 4, 11, 12, 11, 8, 12); d.p('w', 3, 9, 13, 9); d.e(5, 10, 1.2, 1, 'e'); d.p('n', 11, 10); }, SC);
add(G, A, 'ly-couscous', 'Couscous với thịt cừu hoặc cá', 'Couscous with lamb or fish', 'Hạt couscous hấp mềm, rưới sốt ớt, cà chua và thịt cừu hoặc cá. Người Libya thường nấu thành món chính vào thứ Sáu hoặc làm vào dịp đông người.',
  d => { plate(d); d.e(8, 8, 5, 3.4, 'u'); d.e(8, 7, 3.4, 2, 'y'); for (const [x, y] of [[6, 7], [8, 6], [10, 7], [7, 9], [9, 9]]) d.p('Y', x, y); d.r(5, 9, 3, 2, 'n'); d.p('r', 10, 9, 11, 10); d.p('g', 8, 8); }, SC);
add(G, A, 'ly-shorba', 'Shorba libiya', 'Shorba libiya', 'Món súp đỏ nấu từ cà chua, thịt cừu, ớt và gia vị, có thêm mì nhỏ hoặc lúa mạch. Món này gần như xuất hiện hằng ngày trong tháng Ramadan.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'n'); d.e(8, 9, 6, 3.4, 'r'); d.e(8, 9, 4.6, 2.4, 'R'); d.p('y', 5, 9, 9, 8, 11, 10, 7, 10); d.p('g', 8, 7, 6, 9); d.r(1, 9, 1, 3, 'N'); d.r(14, 9, 1, 3, 'N'); d.p('w', 10, 3, 6, 2); }, SC);
add(G, A, 'ly-usban', 'Usban', 'Usban', 'Ruột cừu được nhồi gạo, thịt và gia vị rồi luộc hoặc nướng. Đây là món truyền thống đặc trưng, nhiều người đánh giá cao hương vị đậm đà.',
  d => { plate(d); d.e(5, 8, 2.2, 1.6, 'O'); d.e(9, 7, 3, 1.6, 'o'); d.e(8, 10, 4, 1.6, 'O'); d.p('y', 4, 8, 8, 7, 10, 7, 6, 10, 10, 10); d.p('g', 12, 8, 11, 11); d.p('R', 7, 8); }, SC);
add(G, A, 'ly-mbakbaka', 'Mbakbaka', 'Mbakbaka', 'Mì ống ngắn nấu với sốt cà chua cay, thịt và đỗ. Đây là ví dụ cho ảnh hưởng của Ý lên bếp Libya.',
  d => { plate(d); d.e(8, 9, 5, 3.4, 'r'); for (const [x, y] of [[5, 8], [8, 7], [11, 8], [6, 10], [10, 10], [8, 9]]) d.r(x, y, 2, 1, 'o'); d.p('n', 7, 8, 9, 10, 11, 9); d.p('g', 4, 9, 12, 7); }, SC);
add(G, A, 'ly-harissa', 'Harissa', 'Harissa', 'Sốt ớt cay làm từ ớt khô xay, tỏi và dầu ô liu, dùng để thêm vào hầu hết món ăn. Nhiều gia đình tự làm và dùng quanh năm.',
  d => { d.bg('e'); d.r(3, 6, 10, 8, 'n'); d.r(2, 5, 12, 2, 'N'); d.r(4, 7, 8, 2, 'R'); d.e(8, 8, 3.6, 1.4, 'r'); d.e(5, 4, 1, 2, 'r'); d.e(11, 4, 1, 2, 'r'); d.p('G', 5, 2, 11, 2); d.p('y', 7, 11, 9, 11); }, SC);
add(G, A, 'ly-tajine', 'Tajine và món hầm', 'Tajine and stews', 'Thịt hoặc cá hầm với rau, trứng và gia vị trong nồi đất. Món này có bản riêng ở Libya, thường dùng với bánh mì.',
  d => { d.bg('e'); d.e(8, 12, 7, 2.4, 'O'); d.tri(4, 2, 8, 10, 'o'); d.r(7, 1, 2, 2, 'O'); d.p('y', 6, 6, 9, 8, 7, 10); d.p('R', 5, 11, 11, 11); d.p('w', 3, 14, 12, 14); }, SC);
add(G, A, 'ly-grill', 'Thịt nướng và bánh mì ngoài trời', 'Grilled meat and bread outdoors', 'Thịt cừu hoặc bò nướng trên than, ăn kèm bánh mì và salad. Các bữa tiệc lớn thường có cừu nướng nguyên con.',
  d => { d.bg('k'); d.r(0, 12, 16, 4, 'N'); d.p('r', 3, 13, 6, 14, 9, 13, 12, 14); d.p('o', 4, 12, 8, 12, 11, 12); d.l(2, 5, 14, 5, 'a'); for (const x of [4, 8, 12]) { d.r(x, 6, 2, 5, 'n'); d.p('t', x, 7); } d.p('y', 6, 3, 10, 2); }, SC);

// ----- Đồ uống và trà -----
add(G, B, 'ly-tea3', 'Trà Libya ba lần (shai)', 'Three-round Libyan tea (shai)', 'Trà đen nấu đậm và chia thành ba lượt: lượt đầu đắng, lượt hai ngọt hơn, lượt ba nhẹ và rất ngọt. Câu ngạn ngữ quen thuộc ở Bắc Phi nói lần thứ nhất đắng như cuộc sống, lần hai ngọt như tình yêu, lần ba nhẹ như cái chết; đây là cách nói dân gian chứ không phải quy tắc cố định.',
  d => { d.bg('e'); glass(d, 2, 'N'); glass(d, 6, 'O'); glass(d, 10, 'y'); d.p('w', 3, 3, 7, 4, 11, 3); d.p('w', 4, 2, 8, 3, 12, 2); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, B, 'ly-mintpeanut', 'Trà bạc hà và trà đậu phộng', 'Mint tea and peanut tea', 'Trà pha lá bạc hà hoặc rắc đậu phộng giã nhỏ lên mặt. Đây là cách thêm hương vị được nhiều gia đình ưa chuộng.',
  d => { d.bg('e'); glass(d, 3, 'o'); d.p('g', 3, 5, 5, 4, 4, 6); d.p('G', 4, 5); glass(d, 10, 'O'); d.p('t', 10, 7, 12, 7, 11, 8); d.p('n', 11, 6); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, B, 'ly-coffee', 'Cà phê Ả Rập', 'Arabic coffee', 'Cà phê nấu đậm, thường có thêm bạch đậu khấu hoặc nước hoa hồng. Người ta uống khi tiếp khách và sau bữa ăn.',
  d => { d.bg('e'); d.e(6, 8, 3, 3.6, 'Y'); d.r(5, 3, 2, 2, 'y'); d.l(9, 6, 13, 3, 'Y'); d.l(3, 6, 2, 10, 'Y'); d.r(10, 11, 4, 3, 'w'); d.r(10, 11, 4, 1, 'N'); d.p('y', 5, 7, 7, 9); d.p('w', 12, 8, 11, 6); }, SC);
add(G, B, 'ly-asida', 'Asida', 'Asida', 'Không phải đồ uống mà là bánh bột nấu chín phủ mật ong và bơ hoặc dầu ô liu, thường ăn khi uống trà. Nó xuất hiện trong bữa sáng và dịp lễ.',
  d => { plate(d); d.e(8, 8, 4.4, 3, 'u'); d.e(8, 8, 2.4, 1.6, 'O'); d.p('o', 5, 9, 11, 8, 8, 11, 6, 7, 10, 7); d.p('y', 8, 8); }, SC);
add(G, B, 'ly-juice', 'Nước ép trái cây', 'Fresh fruit juices', 'Nước ép cam, chanh, lựu và ô liu được bán khắp nơi. Mùa hè nóng, nước lạnh rất được ưa chuộng.',
  d => { d.bg('e'); glass(d, 2, 'o'); glass(d, 6, 'r'); glass(d, 10, 'h'); d.e(4, 4, 1.4, 1.4, 'o'); d.e(8, 4, 1.4, 1.4, 'R'); d.e(12, 4, 1.4, 1.4, 'y'); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, B, 'ly-liban', 'Sữa lạc đà và sữa chua lỏng (liban)', 'Camel milk and liban', 'Sữa lên men chua, uống lạnh trong ngày nóng. Nhiều người du mục dùng sữa dê và sữa lạc đà làm thức uống chính.',
  d => { d.bg('e'); d.r(4, 3, 8, 11, 'w'); d.r(4, 3, 8, 2, 'l'); d.p('W', 5, 7, 10, 9, 6, 11); d.r(6, 1, 4, 2, 'a'); d.p('a', 5, 13, 10, 13); d.e(8, 7, 1.4, 1.4, 'u'); }, SC);
add(G, B, 'ly-lagmi', 'Lagmi (nước cọ)', 'Lagmi (palm sap)', 'Nước nhựa cọ, tươi thì ngọt, để lâu sẽ lên men. Người dân ở ốc đảo thường uống tươi, còn loại lên men bị cấm theo luật Hồi giáo.',
  d => { d.bg('c'); d.l(8, 15, 8, 6, 'N'); d.p('G', 4, 4, 5, 3, 11, 3, 12, 4, 5, 5, 11, 5, 7, 4, 9, 4); d.e(8, 11, 2, 1.4, 'u'); d.r(6, 10, 4, 4, 'o'); d.r(6, 10, 4, 1, 'y'); d.p('y', 10, 8); }, SC);

// ----- Món ngọt và món theo mùa -----
add(G, C, 'ly-maasoub', 'Ma\'asoub', 'Ma\'asoub', 'Món tráng miệng làm từ chuối nghiền với bánh mì, mật ong, hạt và bơ. Món này có trong bữa sáng và bữa ăn tháng Ramadan.',
  d => { plate(d); d.e(8, 8, 4.6, 3, 'y'); d.e(8, 8, 3, 1.8, 'u'); d.p('o', 6, 7, 10, 9, 8, 6); d.p('n', 5, 9, 11, 7, 8, 10); }, SC);
add(G, C, 'ly-ghribia', 'Ghribia và bánh quy hạnh nhân', 'Ghribia and almond cookies', 'Bánh quy bột mịn có hạnh nhân hoặc lạc, tan trong miệng. Chuẩn bị nhiều trong dịp Eid.',
  d => { d.bg('e'); for (const [x, y] of [[3, 4], [9, 3], [5, 9], [11, 9]]) { d.e(x + 1.5, y + 1.5, 2.4, 2, 'u'); d.p('n', x + 1, y + 1); } d.e(8, 13, 2.4, 1.6, 'u'); d.p('t', 8, 13); d.p('w', 2, 8, 14, 6); }, SC);
add(G, C, 'ly-baklava', 'Baklava và bánh ngọt kiểu Ả Rập', 'Baklava and Arab pastries', 'Bánh nhiều lớp bột mỏng phủ hạt và si rô đường, quen thuộc ở các tiệm bánh lớn. Món này thường được tặng làm quà.',
  d => { d.bg('e'); d.tri(2, 5, 12, 9, 'y'); for (let y = 8; y < 14; y += 2) d.r(3 + (y - 8) / 2, y, 10 - (y - 8), 1, 'O'); d.r(2, 13, 12, 1, 'Y'); d.p('g', 8, 6, 7, 7, 9, 7); d.p('o', 6, 9, 10, 9); }, SC);
add(G, C, 'ly-qatayef', 'Qatayef và bánh Ramadan', 'Qatayef and Ramadan sweets', 'Bánh xếp nhỏ chiên giòn rồi nhúng si rô. Chiếc bánh được yêu thích vào các buổi tối mùa chay.',
  d => { d.bg('P'); d.e(5, 9, 3.6, 3, 'o'); d.e(11, 9, 3.6, 3, 'o'); d.r(2, 9, 7, 1, 'O'); d.r(8, 9, 7, 1, 'O'); d.p('w', 5, 7, 11, 7); d.p('g', 4, 8, 12, 8); d.p('y', 7, 12, 9, 12); d.p('y', 3, 3, 13, 3); }, SC);
add(G, C, 'ly-zlabia', 'Zlabia', 'Zlabia', 'Bánh chiên xoắn nhúng mật ong, ăn nhiều trong Ramadan. Nó xuất hiện ở cả nhiều nước Bắc Phi.',
  d => { plate(d); d.spiral(8, 8, 2, 'o'); d.spiral(8, 8, 2.4, 'O'); d.p('y', 8, 8, 6, 6, 10, 10, 6, 10, 10, 6); }, SC);
add(G, C, 'ly-dates', 'Chà là (tamr)', 'Dates (tamr)', 'Chà là là quả cọ ngọt, ăn tươi hoặc sấy, dùng để nhồi bánh. Quả cọ chín vào mùa thu và là món thức ăn quan trọng ở ốc đảo.',
  d => { d.bg('e'); for (const [x, y] of [[3, 4], [8, 5], [5, 9], [10, 10], [3, 12], [12, 6]]) { d.e(x + 1.5, y + 1.5, 2.2, 1.4, 'N'); d.p('n', x + 1, y + 1); } d.r(2, 14, 12, 1, 'G'); d.p('G', 8, 2); }, SC);
add(G, C, 'ly-iftar', 'Bữa Iftar trong tháng Ramadan', 'Iftar meal during Ramadan', 'Người ta phá chay bằng chà là và sữa, sau đó ăn shorba và các món chính. Đây là lúc gia đình và hàng xóm cùng ngồi ăn.',
  d => { d.bg('B'); d.e(13, 3, 2, 2, 'y'); d.e(14, 3, 2, 2, 'B'); d.r(1, 11, 14, 5, 'N'); d.e(4, 10, 2.4, 1.2, 'w'); d.e(8, 10, 2.4, 1.2, 'r'); d.e(12, 10, 2, 1.2, 'N'); d.r(7, 7, 2, 3, 'w'); d.p('y', 5, 4, 8, 2, 3, 7); }, SC);
add(G, C, 'ly-eidadha', 'Eid al-Adha và bữa tiệc cừu', 'Eid al-Adha and the lamb feast', 'Sau lễ hiến tế, nhiều gia đình nướng hoặc nấu thịt cừu và chia cho hàng xóm. Người nghèo cũng được chia phần.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.e(8, 9, 4.4, 3.2, 'w'); d.e(12, 7, 2, 2, 'w'); d.p('k', 13, 7); d.r(5, 12, 1, 3, 'a'); d.r(10, 12, 1, 3, 'a'); d.p('l', 6, 8, 9, 10); d.p('n', 2, 12, 14, 13); d.p('y', 3, 3, 14, 2); }, SC);
