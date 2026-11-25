import { add, SC, setCC } from './pass-kit.js';
setCC('gh');
// Ghana · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và trà/rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };

// ----- Món ăn -----
add(G, A, 'gh-fufu', 'Fufu với súp', 'Fufu with soup', 'Khoai mì và chuối xanh luộc rồi giã thành khối dẻo mịn, ăn bằng tay cùng súp cọ, súp đậu phộng hoặc súp nhẹ. Món này là biểu tượng của bữa ăn gia đình và thường ăn vào cuối tuần.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'N'); d.e(8, 9, 6, 3.6, 'o'); d.e(8, 8, 3.4, 3, 'w'); d.e(7, 7, 1.4, 1.2, 'W'); d.p('r', 3, 9, 12, 10, 5, 11, 10, 8); d.p('O', 4, 10, 11, 9, 8, 11); d.p('w', 6, 3, 9, 2, 11, 4); }, H);
add(G, A, 'gh-jollof', 'Jollof rice', 'Jollof rice', 'Cơm nấu trong nước sốt cà chua, hành và ớt, có màu cam đỏ và vị cay nhẹ. Ghana, Nigeria và Senegal thường tranh nhau xem ai nấu ngon hơn, một cuộc "chiến tranh jollof" nhiều tiếng cười.',
  d => { d.bg('e'); d.e(8, 10, 7, 4, 'w'); d.e(8, 9, 6, 3.4, 'o'); d.p('r', 4, 8, 7, 7, 10, 8, 12, 9, 6, 10, 9, 10, 5, 11); d.p('R', 5, 9, 9, 8, 11, 10, 7, 11); d.p('g', 6, 8, 10, 9); d.p('y', 8, 9, 3, 9); d.p('w', 5, 3, 9, 2, 12, 4); }, H);
add(G, A, 'gh-banku', 'Banku và kenkey', 'Banku and kenkey', 'Bột ngô lên men nấu thành khối chua nhẹ; banku ăn với cá nướng và sốt ớt, còn kenkey gói trong lá ngô hoặc lá chuối. Món này đặc trưng của người Ga và người Ewe.',
  d => { d.bg('e'); d.e(5, 8, 3.6, 3, 'w'); d.e(4, 7, 1.4, 1, 'W'); d.tri(8, 6, 6, 8, 'h'); d.tri(9, 7, 4, 6, 'g'); d.r(10, 9, 1, 4, 'G'); d.e(5, 13, 4, 1.4, 'a'); d.p('r', 3, 13, 8, 13); d.p('k', 4, 12); d.p('o', 6, 11); }, H);
add(G, A, 'gh-waakye', 'Waakye', 'Waakye', 'Cơm nấu chung với đậu đũa và lá cao lương nên có màu nâu đỏ, ăn kèm trứng luộc, cá chiên, mì và sốt. Quán waakye ở Accra thường bán từ sáng sớm.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'w'); d.e(8, 9, 6, 3.8, 'N'); d.p('m', 5, 8, 8, 7, 10, 9, 7, 10, 11, 8); d.p('w', 6, 8, 9, 9, 4, 10); d.e(11, 7, 1.8, 1.4, 'w'); d.p('y', 11, 7); d.r(4, 11, 4, 1, 'o'); d.p('g', 3, 7, 12, 11); }, H);
add(G, A, 'gh-kelewele', 'Kelewele', 'Kelewele', 'Chuối chín cắt miếng, tẩm gừng, ớt và gia vị rồi chiên giòn. Đây là món ăn vặt buổi tối bán ở các góc phố.',
  d => { d.bg('e'); for (const [x, y] of [[3, 4], [8, 3], [10, 8], [4, 9], [8, 11]]) { d.r(x, y, 4, 3, 'o'); d.r(x, y, 4, 1, 'y'); d.put(x + 1, y + 1, 'O'); d.put(x + 3, y + 2, 'R'); } d.p('r', 12, 5, 2, 13, 13, 12); d.p('G', 6, 14); }, H);
add(G, A, 'gh-redred', 'Red red', 'Red red', 'Món đậu đũa nấu với dầu cọ và cà chua, ăn cùng chuối chiên. Tên gọi xuất phát từ màu đỏ của dầu cọ và chuối chín.',
  d => { d.bg('e'); d.e(6, 8, 5, 3.6, 'r'); d.e(6, 8, 4, 2.8, 'R'); d.p('w', 4, 8, 6, 7, 8, 9, 5, 10); d.p('y', 3, 9, 7, 8); d.r(10, 5, 4, 3, 'y'); d.r(10, 9, 4, 3, 'y'); d.p('O', 11, 6, 12, 10, 13, 7); d.p('N', 10, 7, 13, 11); d.p('g', 3, 12, 8, 13); }, H);
add(G, A, 'gh-tuozaafi', 'Tuo zaafi', 'Tuo zaafi (TZ)', 'Món bột ngô hoặc kê nấu dẻo ăn cùng súp lá. Đây là món phổ biến ở miền bắc và thường ăn bằng tay.',
  d => { d.bg('e'); d.e(8, 11, 7, 3.4, 'N'); d.e(8, 10, 6, 2.6, 'G'); d.e(8, 7, 4, 3.4, 'W'); d.e(7, 6, 1.6, 1.4, 'w'); d.p('g', 4, 10, 6, 11, 10, 10, 12, 11); d.p('h', 5, 11, 11, 10); d.p('w', 6, 2, 9, 1, 11, 3); }, H);
add(G, A, 'gh-soups', 'Súp đậu bắp (nkruma) và súp dầu cọ (abenkwan)', 'Okra soup (nkruma) and palm nut soup (abenkwan)', 'Các loại súp đậm vị nấu cùng cá, thịt hoặc gà và rau. Món này thường dọn cùng fufu.',
  d => { d.bg('e'); d.e(8, 10, 7, 5, 'a'); d.e(8, 9, 6, 4, 'g'); d.p('G', 4, 8, 8, 7, 11, 9, 6, 11); d.p('o', 6, 9, 9, 10, 11, 8); d.p('r', 5, 10, 10, 8, 7, 7); d.p('w', 5, 2, 8, 1, 11, 3); d.r(1, 9, 2, 1, 'A'); d.r(13, 9, 2, 1, 'A'); }, H);

// ----- Đồ uống và trà/rượu -----
add(G, B, 'gh-sobolo', 'Sobolo (nước dâm bụt)', 'Sobolo (hibiscus drink)', 'Nước làm từ hoa dâm bụt đỏ, gừng và đường, uống lạnh có màu đỏ thẫm. Đây là thức uống giải khát phổ biến trong mùa nóng.',
  d => { d.bg('e'); d.r(4, 4, 8, 10, 'm'); d.r(4, 4, 8, 1, 'R'); d.r(5, 13, 6, 1, 'R'); d.p('r', 5, 6, 9, 8, 6, 11); d.p('w', 5, 5, 6, 12); d.e(12, 3, 2, 2, 'r'); d.p('p', 12, 3); d.p('G', 10, 2, 13, 4); d.l(9, 4, 12, 0, 'W'); }, H);
add(G, B, 'gh-palmwine', 'Rượu cọ (palm wine)', 'Palm wine', 'Nhựa cây cọ lên men, vị ngọt chua nhẹ và hơi sủi. Rượu thường xuất hiện trong lễ cưới, lễ tang và các nghi thức truyền thống.',
  d => { d.bg('e'); d.e(8, 9, 5, 5.4, 'o'); d.r(6, 2, 4, 3, 'O'); d.r(5, 4, 6, 1, 'n'); d.e(8, 9, 4, 4.4, 'u'); d.p('w', 6, 8, 9, 10, 7, 12); d.p('l', 10, 7, 5, 11); d.p('w', 7, 0, 9, 1, 6, 2); }, H);
add(G, B, 'gh-akpeteshie', 'Akpeteshie', 'Akpeteshie', 'Rượu mạnh cất từ nhựa cọ hoặc mía, còn gọi là "rượu địa phương". Đồ uống này rẻ và gắn với đời sống nông thôn.',
  d => { d.bg('e'); d.r(6, 1, 4, 4, 'a'); d.r(5, 5, 6, 9, 'a'); d.r(6, 2, 4, 1, 'N'); d.r(5, 7, 6, 4, 'w'); d.r(6, 8, 4, 2, 'k'); d.p('r', 7, 9, 8, 9); d.p('l', 6, 12, 6, 13); d.r(5, 13, 6, 1, 'A'); }, H);
add(G, B, 'gh-beer', 'Bia Star và Club', 'Star and Club beer', 'Các thương hiệu bia nhạt phổ biến ở quán bar và tiệc. Nhiều người uống bia khi xem bóng đá.',
  d => { d.bg('e'); d.r(5, 1, 3, 3, 'G'); d.r(4, 4, 5, 10, 'G'); d.r(5, 7, 3, 4, 'y'); d.p('r', 6, 8); d.p('l', 4, 6, 4, 12); d.r(10, 3, 3, 10, 'y'); d.r(10, 1, 3, 2, 'w'); d.r(13, 5, 2, 5, 'a'); d.p('Y', 10, 5, 12, 8, 11, 11); }, H);
add(G, B, 'gh-cocoa', 'Ca cao nóng và Milo', 'Hot cocoa and Milo', 'Ghana là nước trồng ca cao lớn, nên đồ uống ca cao nóng rất quen thuộc trong bữa sáng. Milo cũng rất phổ biến trong gia đình.',
  d => { d.bg('e'); d.r(3, 6, 8, 7, 'w'); d.r(3, 6, 8, 1, 'W'); d.r(4, 7, 6, 2, 'N'); d.r(11, 7, 3, 4, 'W'); d.r(12, 8, 1, 2, 'e'); d.r(3, 13, 8, 1, 'W'); d.p('w', 5, 3, 7, 2, 9, 4, 6, 1); d.r(2, 14, 12, 1, 'a'); d.p('g', 5, 10, 8, 11); }, H);
add(G, B, 'gh-coconut', 'Nước dừa tươi', 'Fresh coconut water', 'Bán ngay trên bãi biển và ở chợ, dừa được chặt miệng cho khách uống ngay. Nhiều người dùng muỗng cạo cùi ăn sau khi uống.',
  d => { d.bg('e'); d.e(8, 9, 6, 5.6, 'g'); d.e(8, 9, 5, 4.6, 'G'); d.e(8, 5, 3, 1.6, 'w'); d.r(6, 4, 4, 2, 'e'); d.p('h', 4, 8, 11, 9, 7, 12); d.l(10, 6, 13, 1, 'r'); d.p('W', 7, 5, 9, 5); d.p('N', 8, 14); }, H);
add(G, B, 'gh-koko', 'Koko (cháo ngô)', 'Koko (millet porridge)', 'Cháo loãng làm từ bột ngô lên men, ăn sáng cùng bánh chiên koose. Món ăn này phổ biến với học sinh và người đi làm.',
  d => { d.bg('e'); d.e(6, 10, 5.6, 4, 'w'); d.e(6, 9, 4.8, 3, 'u'); d.p('y', 4, 9, 7, 8, 8, 10); d.p('w', 4, 4, 7, 3, 9, 5, 6, 1); d.e(12, 8, 2.4, 2.2, 'O'); d.e(12, 8, 1.4, 1.2, 'o'); d.p('y', 11, 7); d.p('N', 13, 9); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'gh-kpokpoi', 'Kpokpoi của lễ hội Homowo', 'Kpokpoi of the Homowo festival', 'Người Ga ăn món kpokpoi, một loại bột ngô hấp chấm với súp cọ, để kỷ niệm ngày vượt qua nạn đói. Tên Homowo nghĩa là "nhạo báng nạn đói".',
  d => { d.bg('e'); d.e(8, 10, 7, 4.4, 'n'); d.e(8, 9, 6, 3.4, 'r'); d.e(6, 8, 2, 1.6, 'y'); d.e(10, 8, 2, 1.6, 'y'); d.e(8, 10, 2, 1.4, 'u'); d.p('w', 4, 9, 11, 10, 7, 7); d.p('o', 5, 10, 12, 8); d.p('y', 5, 3, 9, 2, 12, 4); }, H);
add(G, C, 'gh-yam', 'Lễ hội khoai mỡ (Yam Festival)', 'The Yam Festival', 'Các cộng đồng mừng vụ khoai mỡ đầu mùa, nhiều nơi cúng tổ tiên trước khi ăn mới. Khoai được luộc, giã hoặc nấu cùng sốt.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'N'); d.e(5, 10, 4, 2.2, 'n'); d.e(11, 9, 3.6, 2.2, 'n'); d.p('N', 3, 9, 7, 11, 9, 8, 13, 10, 11, 11); d.e(5, 10, 3, 1.4, 't'); d.e(11, 9, 2.6, 1.4, 't'); d.r(4, 4, 8, 3, 'u'); d.p('y', 6, 5, 9, 5); d.p('g', 2, 13, 13, 14); d.p('r', 8, 13); }, SC);
add(G, C, 'gh-xmas', 'Món ngày lễ Giáng sinh', 'The Christmas meal', 'Nhiều gia đình nấu jollof, gà nướng và cơm nấu cùng thịt. Bữa tiệc thường kéo dài cả ngày với bạn bè và họ hàng.',
  d => { d.bg('e'); d.e(8, 11, 7, 3, 'w'); d.e(5, 9, 3, 2, 'o'); d.e(11, 9, 3, 2.2, 'n'); d.e(8, 8, 2.4, 2, 'O'); d.p('r', 4, 9, 11, 8, 9, 8); d.p('y', 6, 9, 12, 10); d.l(3, 7, 4, 6, 'N'); d.p('G', 7, 4, 8, 3, 9, 4, 8, 5); d.p('r', 8, 4); d.p('w', 3, 11, 12, 12); }, H);
add(G, C, 'gh-wedding', 'Bữa cưới truyền thống', 'The traditional wedding feast', 'Tiệc cưới có jollof, gà, cá nướng và nhiều loại súp cho khách. Khách mang quà và nhảy múa trong suốt buổi tiệc.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'N'); d.r(2, 9, 12, 3, 'w'); d.e(5, 8, 2.4, 1.4, 'o'); d.e(8, 8, 2.4, 1.4, 'r'); d.e(11, 8, 2.4, 1.4, 'y'); d.r(3, 3, 2, 5, 'r'); d.e(4, 2, 1.4, 1.4, 's'); d.r(10, 3, 2, 5, 'y'); d.e(11, 2, 1.4, 1.4, 's'); d.p('g', 7, 3, 8, 4); d.p('y', 6, 1, 9, 2); }, SC);
add(G, C, 'gh-koose', 'Bánh koose và bofrot', 'Koose and bofrot', 'Koose là bánh đậu chiên, bofrot là bánh rán ngọt tròn, ăn vặt vào buổi sáng. Cả hai món thường bán trên các xe đẩy ven đường.',
  d => { d.bg('e'); for (const [x, y, c] of [[4, 5, 'O'], [8, 4, 'N'], [11, 7, 'O'], [6, 9, 'N'], [10, 11, 'O']]) { d.e(x, y, 2.6, 2.4, c); d.e(x - 0.4, y - 0.4, 1.4, 1.2, 'o'); } d.p('y', 3, 12, 13, 4, 7, 7); d.p('w', 5, 13, 11, 13); }, H);
