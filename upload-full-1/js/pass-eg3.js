import { add, SC, setCC } from './pass-kit.js';
setCC('eg');
// Ai Cập · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Bánh mì và đồ ngọt', C = 'Đồ uống và trà', E = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = (d, c = 'w') => { d.e(8, 10, 7, 4.6, 'a'); d.e(8, 9.6, 6.4, 4, c); };
const bowl = (d, c = 'w', rim = 'a') => { d.e(8, 9, 7, 5.5, c); d.r(0, 0, 16, 7, '_'); d.r(1, 6, 14, 1, rim); d.e(8, 6.5, 7, 1.4, rim); d.r(5, 14, 6, 1, rim); };
const glass = (d, c) => { d.r(4, 3, 8, 11, 'l'); d.r(4, 3, 8, 1, 'w'); d.r(5, 5, 6, 8, c); d.r(4, 13, 8, 1, 'a'); };

// ----- Món ăn -----
add(G, A, 'eg-koshari', 'Koshari', 'Koshari', 'Món quốc dân trộn gạo, mì ống, đậu lăng, đậu gà và hành chiên giòn, rưới nước sốt cà chua cay và giấm tỏi, bán khắp các quán bình dân.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); d.p('w', 4, 8, 7, 7, 10, 8, 12, 9); d.p('n', 5, 9, 9, 9, 11, 7); d.p('o', 6, 7, 10, 10, 8, 8); d.e(8, 7, 2, 1.2, 'r'); d.p('N', 3, 9, 12, 8); }, SC);
add(G, A, 'eg-ful', 'Ful medames', 'Ful medames', 'Đậu tằm (fava) hầm nhừ, trộn dầu ô liễu, chanh và thì là, món bữa sáng phổ biến nhất với bánh mì.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'N'); d.r(0, 0, 16, 5, '_'); d.p('n', 4, 8, 7, 9, 10, 8, 12, 9, 6, 7); d.p('y', 8, 8, 5, 9); d.p('r', 10, 7, 7, 10); d.p('g', 9, 9, 11, 10); }, SC);
add(G, A, 'eg-taameya', 'Ta\'ameya', 'Ta\'ameya (Egyptian falafel)', 'Viên đậu tằm xay chiên ngập rất nhiều rau thơm, phiên bản Ai Cập của falafel, ăn kẹp bánh mì.',
  d => { d.bg('e'); plate(d); for (const [x, y] of [[5, 8], [8, 7], [11, 8], [7, 11], [10, 11]]) { d.e(x, y, 1.9, 1.9, 'g'); d.e(x, y, 1.5, 1.5, 'G'); d.p('h', x - 1, y - 1); } d.p('y', 4, 12, 12, 12); }, SC);
add(G, A, 'eg-molokhia', 'Molokhia', 'Molokhia', 'Súp lá đay nhớt nấu với tỏi và rau mùi, ăn với cơm và gà hoặc thỏ.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'G'); d.r(0, 0, 16, 5, '_'); d.p('g', 5, 8, 8, 7, 11, 9, 7, 10, 10, 8); d.p('h', 6, 9, 9, 9); d.p('w', 12, 8); d.p('y', 4, 9); }, SC);
add(G, A, 'eg-mahshi', 'Mahshi', 'Mahshi', 'Lá nho, cà tím, ớt chuông, khổ qua hoặc bí ngòi nhồi gạo trộn thảo mộc rồi hấp trong nước sốt cà chua.',
  d => { d.bg('e'); plate(d); d.e(5, 9, 2.6, 2, 'g'); d.e(9, 8, 2.4, 3, 'v'); d.e(11, 11, 2.4, 2, 'r'); d.e(6, 12, 2, 1.4, 'G'); d.p('w', 5, 9, 9, 8, 11, 11); d.p('h', 4, 8, 6, 12); d.p('R', 10, 10); }, SC);
add(G, A, 'eg-hamam', 'Hamam mahshi', 'Hamam mahshi (stuffed pigeon)', 'Bồ câu nhồi gạo hay lúa mì xanh rồi nướng, món của những bữa cỗ và dịp lễ.',
  d => { d.bg('e'); plate(d); d.e(8, 9, 4.6, 3, 'o'); d.e(12, 7, 1.6, 1.6, 'o'); d.p('y', 14, 7); d.p('O', 5, 8, 8, 10, 10, 8, 7, 7); d.l(4, 11, 2, 13, 'o'); d.l(6, 12, 4, 14, 'o'); d.p('u', 7, 9, 9, 9); d.p('g', 3, 13, 13, 12); }, SC);
add(G, A, 'eg-fattah', 'Fattah', 'Fattah', 'Lớp bánh mì giòn, cơm và thịt được rưới nước sốt cà chua và giấm tỏi, thường làm trong ngày lễ.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'r'); d.r(0, 0, 16, 5, '_'); d.r(4, 7, 3, 2, 'u'); d.r(9, 7, 3, 2, 'u'); d.p('w', 7, 8, 8, 9, 6, 9); d.r(6, 9, 4, 1, 'n'); d.p('g', 5, 8, 11, 9); d.p('y', 8, 7); }, SC);
add(G, A, 'eg-kofta', 'Kofta và kebab', 'Kofta and kebab', 'Thịt viên hoặc thịt nướng ướp gia vị, nướng trên than, ăn với bánh mì dẹt và salad.',
  d => { d.bg('e'); d.l(1, 5, 14, 5, 'a'); d.l(1, 9, 14, 9, 'a'); for (let x = 2; x < 14; x += 3) { d.r(x, 4, 2, 3, 'N'); d.r(x, 8, 2, 3, 'n'); d.p('O', x, 4, x, 8); } d.e(4, 13, 2.4, 1.2, 'r'); d.e(11, 13, 2.4, 1.2, 'g'); d.r(0, 15, 16, 1, 'k'); }, SC);
add(G, A, 'eg-shawarma', 'Shawarma', 'Shawarma', 'Thịt nướng xiên quay cắt mỏng, cuốn bánh mì mỏng cùng rau và nước sốt, món ăn nhanh đường phố.',
  d => { d.bg('e'); d.l(8, 1, 8, 15, 'a'); d.e(8, 8, 3.4, 6, 'n'); d.e(8, 8, 2.4, 5, 'N'); d.p('o', 6, 4, 10, 6, 6, 9, 10, 11); d.p('O', 7, 7, 9, 12); d.p('r', 8, 2); d.l(2, 12, 5, 6, 'w'); d.r(1, 11, 4, 3, 'u'); d.p('g', 2, 12); }, SC);
add(G, A, 'eg-feteer', 'Feteer meshaltet', 'Feteer meshaltet', 'Bánh nghìn lớp nhào với bơ, có phiên bản mặn nhồi thịt và phiên bản ngọt rắc đường.',
  d => { d.bg('e'); d.e(8, 10, 6.6, 3, 'O'); for (let i = 0; i < 4; i++) d.e(8, 9 - i * 0.8, 6.6 - i * 0.4, 3 - i * 0.3, i % 2 ? 'u' : 'o'); d.p('w', 5, 6, 9, 7, 11, 6); d.r(2, 12, 12, 1, 'N'); }, SC);
add(G, A, 'eg-hummus', 'Hummus và baba ghanoush', 'Hummus and baba ghanoush', 'Hai món sốt nghiền từ đậu gà và cà tím nướng, ăn kèm bánh mì ở bữa khách.',
  d => { d.bg('e'); d.e(4, 10, 4, 3.6, 'a'); d.e(4, 9.6, 3.4, 3, 'u'); d.e(12, 10, 4, 3.6, 'a'); d.e(12, 9.6, 3.4, 3, 'v'); d.p('o', 3, 9, 5, 10); d.p('g', 4, 8, 11, 9, 13, 10); d.p('r', 12, 11); d.r(1, 14, 14, 1, 'n'); }, SC);
add(G, A, 'eg-grilledfish', 'Cá nướng Alexandria', 'Alexandria grilled fish', 'Cá ướp rồi nướng trên than ở các nhà hàng vùng biển, phục vụ cùng cơm.',
  d => { d.bg('e'); plate(d); d.e(8, 9, 5, 2.6, 'l'); d.tri(12, 7, 3, 5, 'l'); d.e(8, 9, 5, 2.6, 'l'); d.p('k', 4, 8); d.p('N', 6, 8, 8, 9, 10, 8, 7, 10, 9, 10); d.p('y', 6, 12, 9, 12); d.p('g', 11, 11); }, SC);

// ----- Bánh mì và đồ ngọt -----
add(G, B, 'eg-aish', 'Aish baladi', 'Aish baladi', 'Bánh mì dẹt tròn làm từ bột mì nguyên cám, được nhà nước trợ giá; trong tiếng Ai Cập "aish" vừa là bánh mì vừa là "sự sống".',
  d => { d.bg('e'); d.e(8, 9, 6.4, 5, 'o'); d.e(8, 8.6, 5.6, 4.2, 'u'); d.e(8, 7.6, 3, 2, 'y'); d.p('O', 4, 9, 7, 11, 11, 10, 12, 8, 9, 5); d.p('n', 5, 6, 10, 12); d.p('t', 3, 8); }, SC);
add(G, B, 'eg-basbousa', 'Basbousa', 'Basbousa', 'Bánh semolina ngấm xi-rô với dừa nạo hoặc hạnh nhân, cắt hình thoi.',
  d => { d.bg('e'); d.r(2, 6, 12, 7, 'o'); d.r(2, 6, 12, 2, 'u'); d.r(2, 12, 12, 1, 'O'); for (const x of [4, 7, 10]) { d.l(x, 6, x + 2, 12, 'O'); d.p('w', x, 8, x + 1, 10); } d.r(2, 13, 12, 1, 'a'); }, SC);
add(G, B, 'eg-kunafa', 'Kunafa', 'Kunafa', 'Bánh sợi mỏng giòn, nhân phô mai hoặc kem, ngấm xi-rô ngọt.',
  d => { d.bg('e'); d.e(8, 9, 6.6, 4.6, 'o'); d.e(8, 9, 5.6, 3.8, 'O'); for (let y = 6; y < 12; y++) for (let x = 3 + (y % 2); x < 13; x += 2) d.put(x, y, 'u'); d.e(8, 9, 1.8, 1.4, 'y'); d.p('g', 5, 8, 11, 10); d.r(1, 13, 14, 2, 'a'); }, SC);
add(G, B, 'eg-omali', 'Om Ali', 'Om Ali', 'Bánh pudding đổ sữa nóng, hạt khô và dừa, nướng cho bề mặt vàng; theo truyền thuyết do một hoàng hậu của thế kỷ mười ba tên Shajar al-Durr đặt ứng với chuyện bánh trở nên nổi tiếng.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'o'); d.r(0, 0, 16, 5, '_'); d.p('O', 4, 8, 7, 9, 10, 8, 12, 9); d.p('w', 5, 7, 9, 7, 11, 7); d.p('n', 6, 8, 10, 9); d.p('g', 8, 8); }, SC);
add(G, B, 'eg-rozbelaban', 'Roz bel laban', 'Roz bel laban', 'Cơm sữa ngọt nấu sệt, rắc quế hoặc hạt khô.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'w'); d.r(0, 0, 16, 5, '_'); d.p('n', 5, 8, 8, 7, 11, 9); d.p('N', 6, 9, 10, 8); d.p('g', 8, 9); d.p('l', 4, 8, 12, 8, 7, 10); }, SC);
add(G, B, 'eg-baklava', 'Konafa và baklava', 'Konafa and baklava', 'Các loại bánh ngàn lớp nhân hạt, thường mua mang đi biếu bạn bè.',
  d => { d.bg('e'); d.tri(1, 7, 7, 6, 'o'); d.r(2, 10, 5, 1, 'u'); d.r(2, 11, 5, 1, 'O'); d.r(9, 6, 5, 7, 'o'); d.r(9, 6, 5, 1, 'u'); d.r(9, 8, 5, 1, 'g'); d.r(9, 10, 5, 1, 'u'); d.p('g', 4, 8, 11, 7); d.p('w', 3, 5, 11, 4); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, B, 'eg-icecream', 'Kem và đồ ngọt đường phố', 'Ice cream and street sweets', 'Ăn kèm xi-rô và các loại hạt, bán nhiều vào buổi tối mùa hè.',
  d => { d.bg('c'); d.e(5, 6, 3, 3, 'p'); d.e(11, 6, 3, 3, 'e'); d.tri(2, 8, 6, 7, 'u'); d.tri(8, 8, 6, 7, 'u'); d.p('O', 4, 10, 6, 12, 10, 10, 12, 12); d.p('r', 5, 4, 11, 4); d.p('N', 11, 6); d.p('w', 2, 2, 14, 2); }, SC);

// ----- Đồ uống và trà -----
add(G, C, 'eg-shai', 'Trà đen (shai)', 'Black tea (shai)', 'Uống đậm trong ly nhỏ, thêm nhiều đường hoặc lá bạc hà, biểu tượng của việc tiếp khách.',
  d => { d.bg('u'); d.r(4, 5, 8, 8, 'l'); d.r(4, 5, 8, 1, 'w'); d.r(5, 6, 6, 6, 'R'); d.r(5, 6, 6, 1, 'N'); d.p('g', 10, 4, 11, 3); d.l(12, 7, 14, 8, 'a'); d.l(14, 8, 12, 11, 'a'); d.r(3, 13, 10, 1, 'a'); d.p('w', 6, 3, 8, 2); }, H);
add(G, C, 'eg-karkade', 'Karkade', 'Karkade (hibiscus tea)', 'Trà hoa hibiscus đỏ, uống nóng vào mùa đông và uống lạnh vào mùa hè, thông dụng trong đám cưới.',
  d => { d.bg('e'); glass(d, 'R'); d.r(5, 5, 6, 1, 'r'); d.e(8, 3, 2.4, 1.6, 'r'); d.p('R', 8, 3); d.p('p', 6, 7, 9, 9); d.p('w', 6, 11); }, H);
add(G, C, 'eg-ahwa', 'Cà phê kiểu Thổ (ahwa)', 'Turkish-style coffee (ahwa)', 'Nấu bằng ibrik, uống ở quán cà phê ahwa kèm shisha.',
  d => { d.bg('e'); d.e(5, 11, 3, 2, 'w'); d.r(2, 8, 6, 3, 'w'); d.e(5, 8.4, 3, 1, 'N'); d.l(8, 9, 10, 9, 'w'); d.tri(9, 5, 5, 9, 'y'); d.r(9, 5, 5, 1, 'Y'); d.l(14, 7, 15, 11, 'N'); d.r(9, 13, 5, 1, 'Y'); d.p('w', 4, 5, 12, 3); }, H);
add(G, C, 'eg-sugarcane', 'Nước mía (asab)', 'Sugarcane juice (asab)', 'Nước ép từ thân mía tươi, bán ở các quầy ven đường.',
  d => { d.bg('e'); glass(d, 'g'); d.r(5, 5, 6, 2, 'h'); d.l(12, 0, 10, 14, 'G'); d.l(13, 0, 11, 14, 'g'); d.p('Y', 11, 4, 11, 8, 11, 11); d.p('w', 6, 8); }, H);
add(G, C, 'eg-sahlab', 'Sahlab', 'Sahlab', 'Thức uống nóng sánh mịn từ sữa và bột rễ lan, rắc quế và hạt, thường uống vào mùa đông.',
  d => { d.bg('e'); d.e(8, 10, 5.4, 4, 'w'); d.r(2, 6, 12, 3, 'w'); d.e(8, 6.6, 5.4, 1.6, 'w'); d.e(8, 6.6, 4.6, 1.2, 'l'); d.p('n', 6, 6, 9, 7, 8, 6); d.p('g', 7, 7); d.p('w', 5, 3, 8, 2, 11, 3); d.r(5, 14, 6, 1, 'a'); }, H);
add(G, C, 'eg-tamr', 'Tamr hindi', 'Tamr hindi (tamarind drink)', 'Nước me chua ngọt, thức uống quen thuộc trong tháng Ramadan.',
  d => { d.bg('e'); glass(d, 'N'); d.r(5, 5, 6, 1, 'n'); d.p('n', 6, 8, 9, 10); d.l(4, 2, 6, 5, 'N'); d.p('N', 3, 1); d.p('l', 5, 6); }, H);
add(G, C, 'eg-sobia', 'Sobia', 'Sobia', 'Thức uống sữa dừa, đường và quế, giải nhiệt mùa nóng.',
  d => { d.bg('e'); glass(d, 'w'); d.r(5, 5, 6, 1, 'e'); d.p('n', 6, 4, 9, 4); d.p('W', 6, 8, 9, 10); d.e(13, 3, 2, 2, 'N'); d.e(13, 3, 1, 1, 'w'); d.p('l', 5, 7); }, H);
add(G, C, 'eg-juice', 'Nước ép xoài và hồng', 'Mango and pomegranate juice', 'Nước ép theo mùa, tươi và rẻ.',
  d => { d.bg('e'); glass(d, 'o'); d.r(5, 5, 6, 3, 'y'); d.e(13, 4, 2.4, 2.4, 'r'); d.p('R', 13, 4); d.p('g', 13, 1); d.p('l', 5, 8, 6, 9); d.p('y', 3, 12); }, H);
add(G, C, 'eg-stella', 'Bia Stella', 'Stella beer', 'Nhãn bia nổi tiếng từ thế kỷ mười chín, chủ yếu bán ở khách sạn và quán dành cho khách nước ngoài và người không theo Hồi giáo.',
  d => { d.r(7, 0, 2, 4, 'G'); d.r(7, 0, 2, 1, 'y'); d.r(5, 4, 6, 10, 'G'); d.tri(5, 3, 6, 2, 'G'); d.r(5, 8, 6, 4, 'y'); d.r(5, 8, 6, 1, 'u'); d.p('r', 8, 10); d.r(5, 14, 6, 1, 'k'); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, E, 'eg-iftar', 'Bữa iftar trong Ramadan', 'Iftar in Ramadan', 'Bữa ăn khi mặt trời lặn, thường bắt đầu bằng nước, chà là và súp, nhiều nơi dựng bàn ăn miễn phí ngoài phố.',
  d => { d.bg('B'); d.e(13, 3, 2.2, 2.2, 'y'); d.e(14, 3, 1.8, 1.8, 'B'); d.r(1, 10, 14, 5, 'r'); d.r(1, 10, 14, 1, 'R'); d.e(5, 8, 2.4, 1.4, 'w'); d.e(11, 8, 2, 1.4, 'N'); d.p('n', 10, 7, 12, 7); d.p('y', 3, 12, 8, 13, 12, 12); d.p('w', 2, 2, 7, 4); }, SC);
add(G, E, 'eg-qatayef', 'Qatayef', 'Qatayef', 'Bánh xếp bằng bột nhồi nhân hạt hoặc kem, chỉ bán nhiều trong Ramadan.',
  d => { d.bg('e'); plate(d); for (const [x, y] of [[5, 8], [8, 7], [11, 8], [7, 11], [10, 11]]) { d.fan(x, y + 1, 2.6, 'u'); d.r(x - 2, y + 1, 5, 1, 'o'); d.p('w', x, y); } d.p('g', 5, 7, 11, 7); }, SC);
add(G, E, 'eg-kahk', 'Kahk đón lễ Eid', 'Kahk for Eid', 'Bánh quy rắc đường bột, nhồi hạt, làm hàng loạt trước lễ Eid al-Fitr; người Copt cũng làm kahk dịp Giáng sinh và Phục sinh.',
  d => { d.bg('e'); for (const [x, y] of [[4, 6], [8, 9], [12, 6], [5, 12], [11, 12]]) { d.e(x, y, 2.4, 2.4, 'w'); d.e(x, y, 1.4, 1.4, 'l'); d.p('o', x, y); } d.p('w', 2, 2, 14, 3, 8, 3); }, SC);
add(G, E, 'eg-fesikh', 'Fesikh và Sham el-Nessim', 'Fesikh and Sham el-Nessim', 'Vào ngày lễ mùa xuân Sham el-Nessim, người Ai Cập ăn cá muối lên men fesikh cùng hành tây và trứng luộc nhuộm màu.',
  d => { d.bg('h'); d.e(5, 10, 4, 2.4, 'a'); d.tri(8, 8, 3, 4, 'a'); d.p('k', 3, 9); for (const [x, y, c] of [[11, 9, 'r'], [13, 11, 'b'], [10, 12, 'y']]) { d.e(x, y, 1.6, 2, c); } d.e(8, 4, 2, 2, 'v'); d.p('w', 8, 3); d.r(1, 14, 14, 1, 'g'); }, SC);
add(G, E, 'eg-eidmeat', 'Thịt trong lễ Eid al-Adha', 'Meat for Eid al-Adha', 'Thịt cừu hoặc bò được chia cho gia đình, hàng xóm và người nghèo.',
  d => { d.bg('e'); plate(d); d.e(8, 9, 4.6, 3, 'N'); d.l(4, 8, 12, 10, 'R'); d.e(5, 9, 1.6, 1.4, 'w'); d.e(11, 9, 1.6, 1.4, 'w'); d.p('n', 7, 8, 9, 10); d.p('g', 3, 12, 13, 12); d.p('r', 8, 9); }, SC);
add(G, E, 'eg-fatta', 'Fatta ngày lễ', 'Festival fatta', 'Cơm, bánh mì và thịt được làm trong các dịp ăn mừng như Eid, cưới hỏi hoặc sinh con.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'u'); d.r(0, 0, 16, 5, '_'); d.r(4, 7, 3, 2, 'o'); d.r(9, 7, 3, 2, 'o'); d.p('w', 7, 8, 8, 9, 6, 9, 10, 9); d.p('r', 5, 8, 11, 8); d.p('g', 8, 7); }, SC);
add(G, E, 'eg-copticxmas', 'Giáng sinh Copt (7 tháng 1)', 'Coptic Christmas (7 January)', 'Sau thời gian chay dài, người Copt ăn mừng bằng các món thịt và kahk.',
  d => { d.bg('B'); d.tri(3, 3, 10, 11, 'G'); d.tri(4, 7, 8, 7, 'g'); d.r(7, 13, 2, 2, 'N'); d.p('y', 8, 2); d.r(7, 1, 2, 2, 'y'); d.l(8, 0, 8, 1, 'y'); d.p('r', 6, 6, 10, 9, 5, 12, 11, 12); d.p('w', 2, 2, 13, 4, 1, 10); }, SC);
add(G, E, 'eg-winter', 'Món đậu giữ ấm mùa đông', 'Winter lentil soup and sweet potatoes', 'Súp đậu lăng vàng, khoai lang nướng bán trên xe ven đường.',
  d => { d.bg('e'); bowl(d, 'w'); d.e(8, 8, 6, 3.6, 'y'); d.r(0, 0, 16, 5, '_'); d.p('o', 5, 8, 9, 9, 11, 8); d.p('g', 7, 8); d.p('w', 5, 3, 8, 2, 11, 4); d.e(13, 12, 2, 1.4, 'O'); d.p('o', 13, 12); }, SC);
