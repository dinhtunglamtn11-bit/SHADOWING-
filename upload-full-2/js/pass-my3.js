import { add, SC, setCC } from './pass-kit.js';
setCC('my');
// Malaysia · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống, trà và rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = d => { d.bg('e'); d.e(8, 9, 7, 5.6, 'w'); d.e(8, 9, 6, 4.8, 'l'); };

// ----- Món ăn -----
add(G, A, 'my-nasilemak', 'Nasi lemak', 'Nasi lemak', 'Cơm nấu nước cốt dừa thơm lá dứa, ăn kèm sambal, cá cơm chiên, đậu phộng, dưa leo và trứng. Thường được gói trong lá chuối bán buổi sáng, và nhiều người gọi đây là món quốc dân.',
  d => { d.bg('G'); d.e(8, 9, 6, 5, 'g'); d.e(8, 9, 4.6, 3.6, 'w'); d.p('r', 6, 8, 7, 9, 5, 10); d.p('y', 10, 8); d.e(10, 10, 1.6, 1.4, 'e'); d.p('o', 10, 10); d.p('n', 6, 11, 7, 12, 9, 12); d.p('h', 4, 7, 11, 7); }, SC);
add(G, A, 'my-satay', 'Satay', 'Satay', 'Thịt gà, bò hoặc cừu ướp nghệ và sả, xâu que nướng than hoa rồi chấm sốt đậu phộng. Món ăn kèm bánh cơm nén (ketupat), hành tây và dưa leo.',
  d => { d.bg('e'); for (const y of [4, 7, 10]) { d.l(1, y + 2, 12, y, 'N'); for (const x of [3, 6, 9]) d.r(x, y, 2, 2, 'n'); d.p('o', 4, y + 1, 7, y + 1, 10, y + 1); } d.e(13, 13, 2, 1.6, 'u'); d.p('N', 12, 13, 14, 13); d.p('g', 14, 4, 14, 6); }, SC);
add(G, A, 'my-rotica', 'Roti canai', 'Roti canai', 'Bánh mì dẹt kiểu Ấn, vừa giòn vừa xốp, ăn với cà ri đậu hoặc cà ri gà. Đây là bữa sáng phổ biến ở quán mamak.',
  d => { d.bg('e'); d.e(6, 7, 5, 4.4, 'u'); d.e(6, 7, 3.4, 3, 'o'); d.e(6, 7, 1.6, 1.4, 'u'); d.p('n', 3, 6, 8, 5, 7, 10); d.e(12, 11, 3, 2.6, 'N'); d.e(12, 11, 2.2, 1.8, 'o'); d.p('r', 12, 10, 11, 12); }, SC);
add(G, A, 'my-ckt', 'Char kway teow', 'Char kway teow', 'Bánh phở xào lửa lớn với tôm, lòng đỏ trứng, giá và xúc xích Trung Hoa. Món nổi tiếng nhất ở Penang, có mùi cháy thơm đặc trưng.',
  d => { plate(d); d.e(8, 9, 4.6, 3.4, 'u'); d.p('n', 5, 8, 9, 7, 11, 9, 7, 10); d.p('r', 6, 9, 10, 10, 8, 8); d.p('g', 5, 11, 10, 6); d.p('y', 11, 8); d.p('N', 7, 9, 9, 11); }, SC);
add(G, A, 'my-laksa', 'Laksa', 'Laksa', 'Món bún hoặc mì nước có nhiều biến thể. Penang asam laksa chua cay với cá và me, curry laksa béo bởi cốt dừa, còn laksa Sarawak có nước dùng đậm đà từ nhiều gia vị.',
  d => { d.bg('e'); d.e(8, 10, 7, 5, 'a'); d.e(8, 9, 6, 4, 'o'); d.e(8, 9, 4.6, 3, 'r'); d.p('w', 5, 8, 9, 7, 11, 9, 7, 10, 10, 11); d.p('g', 6, 6, 10, 6); d.p('y', 8, 9); d.l(13, 2, 9, 8, 'n'); d.l(14, 2, 10, 8, 'N'); }, SC);
add(G, A, 'my-rendang', 'Rendang', 'Rendang', 'Thịt bò hoặc gà hầm chậm trong cốt dừa và gia vị cho đến khi khô sệt, đậm đà. Đây là món quen thuộc dịp lễ và tiệc cưới.',
  d => { plate(d); d.e(8, 9, 4.6, 3.4, 'N'); for (const [x, y] of [[6, 8], [9, 7], [10, 10], [7, 11]]) d.r(x, y, 3, 2, 'n'); d.p('R', 5, 9, 9, 9, 8, 6); d.p('g', 11, 7); d.p('r', 5, 12); }, SC);
add(G, A, 'my-hainan', 'Cơm gà Hai Nam (Hainanese chicken rice)', 'Hainanese chicken rice', 'Gà luộc mềm ngọt phục vụ cùng cơm nấu bằng nước luộc gà, kèm nước chấm gừng và ớt. Món do người Hoa gốc Hai Nam mang đến rồi trở thành món của cả đất nước.',
  d => { d.bg('e'); d.e(5, 9, 4, 3.4, 'u'); d.p('Y', 3, 8, 7, 9, 5, 11); d.e(12, 10, 3.2, 3, 'w'); d.p('l', 11, 9, 13, 11); d.p('g', 2, 4, 6, 3, 12, 4); d.p('r', 8, 13, 10, 14); d.p('y', 8, 3); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, A, 'my-bakkutteh', 'Bak kut teh', 'Bak kut teh', 'Sườn heo hầm với tỏi và thảo dược trong nồi nước màu nâu đậm, có cả kiểu khô. Món này phổ biến ở Klang và được ăn sáng hoặc tối.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'K'); d.e(8, 9, 6, 3.6, 'N'); d.e(8, 9, 4.6, 2.6, 'n'); d.p('w', 5, 8, 8, 7, 11, 9, 7, 10); d.p('t', 6, 9, 10, 8); d.p('y', 9, 10); d.p('w', 6, 3, 9, 2, 11, 4); }, SC);
add(G, A, 'my-nasikandar', 'Nasi kandar', 'Nasi kandar', 'Cơm trắng ăn kèm nhiều món cà ri, mỗi nhà hàng tự chọn và trộn nước sốt theo ý thích. Penang là quê hương của món này.',
  d => { d.bg('e'); d.e(8, 9, 7, 5.4, 'a'); d.e(8, 9, 6, 4.6, 'l'); d.e(5, 9, 3, 3.2, 'w'); d.p('r', 9, 7, 11, 8, 10, 10); d.p('o', 8, 6, 12, 9); d.p('y', 10, 12, 5, 12); d.p('g', 12, 11); d.p('R', 7, 8); }, SC);
add(G, A, 'my-nasikerabu', 'Nasi kerabu', 'Nasi kerabu', 'Cơm xanh lam nhuộm bằng hoa đậu biếc, ăn kèm rau thơm và cá nướng, đặc sản của Kelantan. Màu sắc bắt mắt khiến món này dễ nhớ.',
  d => { plate(d); d.e(7, 9, 3.4, 3, 'b'); d.e(7, 9, 2.4, 2, 'v'); d.p('h', 10, 6, 12, 8, 11, 11, 5, 5); d.p('g', 9, 7, 10, 9); d.e(11, 10, 2, 1.4, 'o'); d.p('w', 6, 8); }, SC);
add(G, A, 'my-hinava', 'Hinava và ambuyat (Sabah)', 'Hinava and ambuyat (Sabah)', 'Hinava là gỏi cá sống ướp chanh và gừng của người Kadazan-Dusun, còn ambuyat là bột cọ sánh dẻo quấn bằng đũa. Đây là những món riêng của vùng Borneo.',
  d => { d.bg('e'); d.e(5, 9, 3.4, 3, 'w'); d.p('x', 4, 8, 6, 9, 5, 10); d.p('y', 3, 10, 7, 8); d.p('g', 5, 7); d.e(11, 10, 3.4, 2.8, 'u'); d.l(10, 3, 12, 8, 'N'); d.l(12, 3, 11, 8, 'n'); d.p('W', 11, 9, 10, 11); }, SC);
add(G, A, 'my-pansoh', 'Manok pansoh (Sarawak)', 'Manok pansoh (Sarawak)', 'Gà nấu trong ống tre với sả và lá táp, món của người Iban. Mùi tre nướng thơm đặc trưng.',
  d => { d.bg('e'); d.r(3, 3, 3, 11, 'y'); d.r(9, 4, 3, 10, 'Y'); d.r(3, 3, 3, 1, 'n'); d.r(9, 4, 3, 1, 'n'); d.p('Y', 3, 7, 9, 8); d.p('r', 4, 2, 10, 3); d.e(14, 12, 1.6, 1.6, 'o'); d.p('w', 5, 1, 11, 2); }, SC);

// ----- Đồ uống, trà và rượu -----
add(G, B, 'my-tehtarik', 'Teh tarik (trà kéo)', 'Teh tarik (pulled tea)', 'Trà sữa được rót qua lại giữa hai ly cao để tạo lớp bọt mịn. Đây là đồ uống được yêu thích nhất ở quán mamak và thường đi kèm roti canai.',
  d => { d.bg('e'); d.r(2, 10, 5, 5, 'u'); d.r(9, 1, 5, 5, 'u'); d.p('n', 2, 12, 6, 13); d.l(5, 9, 10, 6, 'n'); d.l(6, 9, 11, 6, 'N'); d.p('w', 9, 1, 13, 1); d.p('w', 3, 9, 5, 9); d.p('n', 10, 3, 12, 4); }, H);
add(G, B, 'my-kopi', 'Kopi O và cà phê trắng Ipoh', 'Kopi O and Ipoh white coffee', 'Kopi O là cà phê đen pha đường, còn cà phê trắng Ipoh được rang với margarine, đậm nhưng êm. Đây là nét đặc trưng của văn hóa quán cà phê người Hoa.',
  d => { d.bg('e'); d.r(2, 6, 6, 7, 'w'); d.r(3, 7, 4, 2, 'N'); d.r(9, 6, 6, 7, 'w'); d.r(10, 7, 4, 2, 'u'); d.l(8, 8, 8, 10, 'a'); d.p('w', 4, 3, 6, 2, 11, 3, 13, 2); d.r(1, 13, 14, 1, 'l'); }, H);
add(G, B, 'my-bandung', 'Sirap bandung', 'Sirap bandung', 'Sữa pha siro hoa hồng màu hồng, ngọt và mát, được yêu thích trong ngày nóng. Nhiều người uống cùng món cơm hoặc bánh.',
  d => { d.bg('e'); d.r(4, 3, 8, 11, 'p'); d.r(4, 3, 8, 2, 'x'); d.p('P', 5, 7, 6, 10, 9, 8, 10, 12); d.l(11, 3, 13, 0, 'r'); d.r(4, 13, 8, 1, 'P'); d.p('w', 5, 5); d.p('r', 6, 4); }, H);
add(G, B, 'my-airtebu', 'Air tebu (nước mía)', 'Air tebu (sugarcane juice)', 'Nước mía ép tươi, thường pha chút chanh, bán ven đường. Ngọt mát và giải khát tốt.',
  d => { d.bg('e'); d.r(4, 4, 8, 10, 'h'); d.r(4, 4, 8, 2, 'w'); d.e(8, 9, 2.4, 2.4, 'y'); d.p('g', 6, 7, 10, 12); d.l(11, 4, 13, 1, 'g'); d.l(2, 14, 5, 6, 'G'); d.r(4, 13, 8, 1, 'g'); }, H);
add(G, B, 'my-milodino', 'Milo dinosaur', 'Milo dinosaur', 'Ly Milo lạnh rồi rắc thêm một lớp bột Milo lên trên, món khá đặc trưng ở quán mamak. Trẻ em và người lớn đều thích.',
  d => { d.bg('e'); d.r(4, 4, 8, 10, 'N'); d.r(4, 4, 8, 3, 'n'); d.r(5, 3, 6, 1, 'W'); d.p('t', 5, 3, 7, 3, 9, 3); d.p('w', 6, 8, 9, 10); d.l(11, 4, 13, 1, 'g'); d.r(4, 13, 8, 1, 'K'); }, H);
add(G, B, 'my-cendol', 'Cendol', 'Cendol', 'Chè lạnh với thạch xanh lá dứa, nước cốt dừa và đường cọ. Món giải nhiệt nổi tiếng, thường ăn kèm đậu đỏ và đá bào.',
  d => { d.bg('e'); d.tri(3, 2, 10, 4, 'w'); d.r(3, 6, 10, 2, 'N'); d.r(3, 8, 10, 3, 'g'); d.r(3, 11, 10, 2, 'R'); d.p('h', 5, 9, 9, 10, 11, 9); d.p('w', 6, 4, 9, 3); d.p('l', 4, 7, 11, 7); d.r(2, 13, 12, 1, 'a'); }, SC);
add(G, B, 'my-tuak', 'Tuak và tapai', 'Tuak and tapai', 'Rượu gạo lên men của người Iban và Kadazan-Dusun, dùng trong lễ hội như Gawai và Kaamatan. Đây là thức uống gắn với nghi lễ và sự hiếu khách.',
  d => { d.bg('e'); d.e(5, 10, 3, 4, 'u'); d.r(4, 3, 2, 3, 'u'); d.r(4, 2, 2, 1, 'N'); d.p('y', 4, 9, 6, 11); d.e(12, 9, 2.4, 3.4, 'w'); d.r(10, 2, 4, 2, 'n'); d.e(12, 10, 1.6, 2.4, 'W'); d.p('r', 3, 14, 13, 14); }, H);
add(G, B, 'my-coconut', 'Nước dừa tươi và nước sầu riêng', 'Fresh coconut water and durian drinks', 'Uống trực tiếp từ quả dừa, hoặc làm kem, sinh tố từ sầu riêng. Hương vị mạnh và rất đặc trưng.',
  d => { d.bg('c'); d.e(5, 9, 4, 4.4, 'g'); d.e(5, 9, 2.6, 3, 'e'); d.l(7, 7, 9, 2, 'r'); d.e(12, 9, 3.2, 3.6, 'y'); d.p('Y', 11, 7, 13, 9, 12, 11, 10, 9); d.p('G', 4, 5, 6, 6, 11, 6); }, SC);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'my-ketupat', 'Ketupat và lemang dịp Hari Raya', 'Ketupat and lemang at Hari Raya', 'Ketupat là bánh cơm gói trong lá dừa đan, lemang là gạo nếp nấu trong ống tre. Thường ăn kèm rendang và cà ri sau tháng chạy Ramadan.',
  d => { d.bg('e'); d.tri(2, 2, 6, 6, 'g'); d.tri(2, 6, 6, 6, 'G'); d.l(3, 8, 7, 8, 'h'); d.p('h', 5, 4, 5, 10); d.r(9, 4, 3, 10, 'y'); d.r(9, 4, 3, 1, 'n'); d.p('Y', 10, 8, 10, 11); d.p('l', 12, 12); }, SC);
add(G, C, 'my-kuihraya', 'Kuih raya', 'Kuih raya', 'Những chiếc bánh quy nhỏ như bánh nhân dứa và kuih bangkit xếp trên đĩa để tiếp khách. Mỗi nhà đều có công thức riêng.',
  d => { plate(d); for (const [x, y, c] of [[5, 7, 'u'], [8, 6, 'o'], [11, 8, 'w'], [6, 10, 'y'], [10, 11, 'u'], [8, 9, 'p']]) { d.e(x, y, 1.8, 1.8, c); d.p('Y', x, y); } d.p('r', 8, 9); }, SC);
add(G, C, 'my-bubur', 'Bubur lambuk dịp Ramadan', 'Bubur lambuk at Ramadan', 'Cháo gạo nấu thịt và gia vị, phát miễn phí cho người dân khi kết thúc ngày nhịn ăn. Chợ Ramadan còn bán hàng trăm món khác.',
  d => { d.bg('B'); d.e(13, 3, 2, 2, 'y'); d.e(14, 3, 1.6, 1.6, 'B'); d.e(8, 11, 6, 3.6, 'a'); d.e(8, 10, 5, 2.6, 'u'); d.p('o', 6, 10, 9, 9, 10, 11); d.p('g', 7, 11); d.p('w', 6, 6, 9, 5, 8, 7); d.p('y', 2, 2, 5, 4); }, SC);
add(G, C, 'my-yeesang', 'Yee sang (gỏi cá chia may mắn) dịp Tết', 'Yee sang (prosperity toss)', 'Người Hoa cùng trộn nâng lên cá sống, rau củ xắt sợi và sốt chua ngọt, hô lớn những lời chúc. Càng nâng cao càng may mắn.',
  d => { plate(d); for (const [x, y, c] of [[5, 6, 'r'], [8, 5, 'o'], [11, 6, 'y'], [6, 9, 'g'], [10, 9, 'p'], [8, 8, 'x'], [4, 11, 'w'], [12, 11, 'r']]) d.r(x - 1, y, 2, 3, c); d.l(2, 3, 5, 2, 'N'); d.l(14, 3, 11, 2, 'N'); }, SC);
add(G, C, 'my-pineapple', 'Bánh dứa (pineapple tart)', 'Pineapple tart', 'Bánh nhân mứt dứa, biểu tượng cho vận may vì tên gọi gần giống "may mắn đến" trong tiếng Phúc Kiến. Phổ biến trong Tết của người Hoa.',
  d => { d.bg('r'); d.r(3, 5, 10, 8, 'u'); d.r(3, 5, 10, 1, 't'); for (const x of [4, 7, 10]) { d.e(x + 1, 8, 1.4, 1.4, 'o'); d.p('O', x + 1, 8); } d.p('Y', 4, 11, 11, 11); d.p('y', 8, 3, 6, 4, 10, 4); d.p('R', 1, 14, 14, 14); }, SC);
add(G, C, 'my-mooncake', 'Bánh trung thu và tangyuan', 'Mooncakes and tangyuan', 'Bánh trung thu dịp rằm tháng Tám, viên bột nếp nhỏ trong nước đường dịp Đông chí. Cả hai đều mang ý nghĩa đoàn viên.',
  d => { d.bg('B'); d.e(12, 3, 2, 2, 'y'); d.e(5, 9, 4, 4, 'n'); d.e(5, 9, 2.6, 2.6, 'o'); d.p('y', 5, 9); d.e(12, 12, 3.2, 2, 'W'); d.e(10, 11, 1.2, 1.2, 'w'); d.e(13, 11, 1.2, 1.2, 'p'); d.e(12, 13, 1.2, 1.2, 'g'); }, SC);
add(G, C, 'my-murukku', 'Murukku và bánh ngọt dịp Deepavali', 'Murukku and Deepavali sweets', 'Bánh giòn xoắn bằng bột gạo, kẹo sữa và bánh mật đường. Người Ấn thường tặng nhau trong lễ ánh sáng.',
  d => { d.bg('e'); d.e(5, 6, 3.6, 3.6, 'o'); d.spiral(5, 6, 1.4, 'Y'); d.e(11, 7, 3.2, 3, 'y'); d.spiral(11, 7, 1.2, 'O'); d.r(4, 11, 3, 3, 'w'); d.r(8, 11, 3, 3, 'p'); d.r(12, 11, 3, 3, 'o'); d.p('r', 2, 3, 14, 3); }, SC);
add(G, C, 'my-durianfest', 'Mùa sầu riêng', 'Durian season feast', 'Mỗi năm có hai vụ chính, dân đổ về các quầy bán ven đường để thưởng thức. Đây là mùa náo nhiệt của những người đam mê.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'n'); d.e(5, 8, 3.6, 3.6, 'G'); d.e(5, 8, 2.4, 2.4, 'y'); d.e(11, 9, 3, 3, 'G'); d.e(11, 9, 1.8, 1.8, 'y'); d.p('Y', 4, 4, 6, 4, 10, 5, 12, 5); d.p('r', 8, 14); d.p('y', 3, 13, 12, 13); }, SC);
add(G, C, 'my-gawaifeast', 'Món Gawai và Kaamatan', 'Gawai and Kaamatan dishes', 'Lễ hội mùa gặt của người bản địa có các món như gà ống tre, rượu gạo và bánh nếp. Tiệc thường kéo dài cả đêm với ca hát.',
  d => { d.bg('G'); d.r(0, 11, 16, 5, 'N'); d.r(2, 6, 4, 6, 'y'); d.r(2, 6, 4, 1, 'n'); d.e(10, 10, 3.4, 2.4, 'w'); d.e(10, 9, 2.4, 1.6, 'u'); d.p('y', 8, 3, 13, 3, 4, 3); d.p('r', 8, 13, 12, 13); }, SC);
