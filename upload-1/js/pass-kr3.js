import { add, SC, setCC } from './pass-kit.js';
setCC('kr');
// Hàn Quốc · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống và trà đạo', C = 'Món theo mùa và dịp lễ', E = 'Quy tắc bàn ăn';
const FOOD = { use: 'hold' };
const bowlTop = (d, cx, w, c, rim) => { d.e(cx, 9, w / 2, 6.5, c); d.r(0, 0, 16, 9, '_'); d.r(Math.round(cx - w / 2), 9, w, 1, rim); };

// ----- Món ăn -----
add(G, A, 'kr-kimchi', 'Kimchi', 'Kimchi', 'Rau (thường là cải thảo) muối, ướp ớt, tỏi, gừng rồi ủ lên men, có hàng trăm loại. Văn hóa làm kimchi kimjang được UNESCO công nhận năm 2013.',
  d => { d.r(2, 9, 12, 5, 'w'); d.r(2, 9, 12, 1, 'W'); d.e(8, 8, 6, 3.4, 'r'); d.e(8, 8, 5, 2.6, 'x'); d.l(3, 8, 12, 7, 'R'); d.l(4, 10, 13, 9, 'R'); d.p('w', 5, 7, 9, 8, 11, 6, 7, 9); d.p('g', 6, 6, 10, 9); d.p('R', 4, 8, 12, 8); }, FOOD);
add(G, A, 'kr-bibimbap', 'Bibimbap', 'Bibimbap', 'Cơm trộn rau, thịt, trứng và tương ớt gochujang; "bibim" nghĩa là trộn. Món nổi tiếng nhất của thành phố Jeonju.',
  d => { d.e(8, 10, 7, 4, 'a'); d.e(8, 9.5, 6.2, 3.4, 'A'); d.e(8, 9, 5.4, 2.8, 'w'); for (const [x, y, c] of [[5, 8, 'g'], [11, 8, 'o'], [6, 11, 'p'], [10, 11, 'd'], [4, 10, 'y'], [12, 10, 'h']]) d.e(x, y, 1.5, 1.2, c); d.e(8, 9.5, 2, 1.8, 'w'); d.e(8, 9.5, 1, 1, 'y'); d.p('r', 8, 7); }, FOOD);
add(G, A, 'kr-bulgogi', 'Bulgogi', 'Bulgogi', 'Thịt bò thái mỏng ướp nước tương, đường, lê và tỏi rồi nướng; tên có nghĩa "thịt lửa".',
  d => { d.e(8, 11, 7, 3.4, 'a'); d.e(8, 10.4, 6, 2.8, 'n'); d.e(8, 9, 5.4, 2.8, 'N'); for (const [x, y] of [[5, 8], [8, 9], [11, 8], [6, 11], [10, 11]]) d.p('n', x, y, x + 1, y); d.p('G', 4, 10, 12, 10, 8, 7); d.p('o', 7, 6, 9, 6); d.l(0, 3, 5, 6, 'd'); d.l(1, 2, 6, 5, 'a'); }, FOOD);
add(G, A, 'kr-samgyeopsal', 'Samgyeopsal', 'Samgyeopsal (grilled pork belly)', 'Thịt ba chỉ nướng ngay tại bàn, cuốn với lá xà lách, tỏi và tương ssamjang. "Samgyeop" nghĩa là "ba lớp".',
  d => { d.r(1, 9, 14, 5, 'd'); d.r(1, 9, 14, 1, 'A'); for (let i = 0; i < 3; i++) { d.r(2 + i * 4, 5, 3, 4, 'x'); d.r(2 + i * 4, 6, 3, 1, 'w'); d.r(2 + i * 4, 7, 3, 1, 'x'); d.p('n', 2 + i * 4, 5, 4 + i * 4, 8); } d.e(8, 12, 6, 1.6, 'g'); d.p('h', 4, 12, 10, 12); d.l(7, 0, 8, 4, 'a'); d.p('w', 3, 2, 12, 2); }, FOOD);
add(G, A, 'kr-tteokbokki', 'Tteokbokki', 'Tteokbokki', 'Bánh gạo dài xào cay với tương gochujang, món ăn vặt đường phố được yêu thích. Bản cung đình xưa lại dùng nước tương, không cay.',
  d => { d.e(8, 11, 7, 3.6, 'a'); d.e(8, 10.4, 6.2, 3, 'r'); for (const [x, y, a] of [[4, 9, 0], [7, 8, 1], [10, 9, 0], [6, 11, 1], [10, 11, 1], [8, 10, 0]]) d.r(x, y, a ? 1 : 3, a ? 3 : 1, 'e'); d.p('y', 12, 9); d.p('w', 5, 12, 9, 12); d.l(12, 1, 8, 7, 'n'); d.p('G', 2, 10); }, FOOD);
add(G, A, 'kr-japchae', 'Japchae', 'Japchae', 'Miến khoai lang xào với rau và thịt, từng là món cung đình, ngày nay hay xuất hiện trong tiệc và ngày lễ.',
  d => { d.e(8, 10, 7, 4, 'w'); d.e(8, 9, 6, 3.2, 'W'); for (let i = 0; i < 7; i++) d.l(3 + i, 7 + (i % 2), 6 + i, 11 - (i % 2), 'a'); d.p('o', 5, 8, 10, 9); d.p('g', 7, 7, 11, 11, 4, 10); d.p('r', 9, 8, 6, 11); d.p('N', 8, 9, 12, 8); }, FOOD);
add(G, A, 'kr-kimbap', 'Kimbap', 'Kimbap', 'Cơm cuộn rong biển với rau, trứng, giăm bông, món mang đi dã ngoại và bữa ăn nhanh. Khác sushi ở chỗ cơm được trộn dầu mè chứ không dùng giấm.',
  d => { for (let i = 0; i < 3; i++) { const x = 2 + i * 4.5; d.e(x + 2, 10, 2.8, 3.2, 'd'); d.e(x + 2, 10, 2, 2.4, 'w'); d.p('r', x + 1, 9); d.p('y', x + 2, 10); d.p('g', x + 2, 8, x + 3, 11); } d.r(0, 14, 16, 2, 't'); }, FOOD);
add(G, A, 'kr-samgyetang', 'Samgyetang', 'Samgyetang', 'Gà non hầm sâm nhồi gạo nếp, ăn vào những ngày nóng nhất để lấy sức, theo quan niệm "lấy nóng trị nóng".',
  d => { d.e(8, 11, 7, 3.6, 'N'); d.e(8, 9.4, 6.4, 3, 'e'); d.e(8, 8.5, 4.4, 2.4, 'o'); d.p('O', 6, 8, 10, 9); d.p('t', 7, 7, 9, 10); d.l(4, 8, 2, 6, 'o'); d.l(12, 8, 14, 6, 'o'); d.p('R', 9, 7); d.l(5, 4, 5, 1, 'w'); d.l(8, 3, 9, 0, 'w'); d.l(11, 4, 11, 1, 'w'); }, FOOD);

// ----- Đồ uống và trà đạo -----
add(G, B, 'kr-soju', 'Soju', 'Soju', 'Rượu chưng cất trong suốt, nhẹ, uống cùng bữa ăn. Theo lễ nghĩa, người ta rót cho nhau chứ không tự rót cho mình.',
  d => { d.r(5, 1, 4, 3, 'g'); d.r(4, 4, 6, 9, 'G'); d.r(4, 4, 1, 9, 'g'); d.r(5, 7, 4, 3, 'w'); d.p('G', 6, 8, 7, 8); d.r(4, 13, 6, 1, 'G'); d.r(11, 9, 4, 5, 'l'); d.r(11, 9, 4, 1, 'w'); d.r(12, 10, 2, 3, 'c'); }, FOOD);
add(G, B, 'kr-makgeolli', 'Makgeolli', 'Makgeolli', 'Rượu gạo đục lên men, hơi ngọt và hơi chua, truyền thống của nông dân. Hay uống vào ngày mưa cùng bánh chiên jeon.',
  d => { d.e(8, 10, 7, 3, 'e'); d.r(0, 0, 16, 10, '_'); d.r(1, 10, 14, 1, 'w'); d.e(8, 10.4, 6.4, 3.4, 'W'); d.r(1, 10, 14, 1, 'w'); d.e(8, 10, 5.6, 1.2, 'u'); d.r(10, 3, 4, 4, 'W'); d.r(10, 3, 4, 1, 'w'); d.r(11, 4, 2, 2, 'e'); d.p('a', 3, 13, 12, 13); }, FOOD);
add(G, B, 'kr-sikhye', 'Sikhye', 'Sikhye', 'Nước gạo ngọt lên men nhẹ với vài hạt cơm nổi, uống sau bữa ăn lớn hoặc khi nghỉ ngơi ở phòng xông hơi jjimjilbang.',
  d => { d.r(3, 3, 10, 11, 'l'); d.r(3, 3, 10, 1, 'w'); d.r(4, 6, 8, 7, 'u'); d.r(4, 6, 8, 1, 'e'); d.p('w', 5, 8, 7, 10, 9, 7, 10, 11, 6, 12); d.p('o', 6, 9, 10, 9); d.r(3, 14, 10, 1, 'a'); }, FOOD);
add(G, B, 'kr-boricha', 'Trà lúa mạch (bori-cha)', 'Barley tea (bori-cha)', 'Trà lúa mạch rang, uống nóng hoặc lạnh, thay cho nước lọc ở nhiều gia đình. Không chứa caffeine.',
  d => { d.r(2, 3, 7, 11, 'l'); d.r(3, 6, 5, 8, 'n'); d.r(3, 6, 5, 1, 't'); d.r(2, 2, 7, 1, 'a'); d.p('h', 4, 8, 6, 10, 5, 12); d.r(10, 8, 5, 6, 'l'); d.r(11, 9, 3, 5, 'n'); d.r(11, 10, 1, 1, 'c'); d.l(9, 5, 12, 6, 'l'); d.p('t', 12, 12); }, FOOD);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'kr-tteokguk', 'Tteokguk (canh bánh gạo)', 'Tteokguk (rice cake soup)', 'Canh bánh gạo cắt lát ăn vào ngày Tết Seollal. Người ta nói ăn xong là "thêm một tuổi".',
  d => { d.e(8, 9, 6.6, 6, 'a'); d.r(0, 0, 16, 7, '_'); d.r(1, 7, 14, 1, 'w'); d.r(2, 8, 12, 5, 'A'); d.e(8, 7.6, 6, 1.4, 'e'); for (const [x, y] of [[4, 7], [6, 7], [8, 7], [10, 7], [12, 7]]) d.p('w', x, y, x + 1, y); d.p('G', 5, 6, 9, 6, 11, 7); d.p('y', 7, 6, 10, 7); d.p('d', 3, 7, 8, 7); }, FOOD);
add(G, C, 'kr-songpyeon', 'Songpyeon', 'Songpyeon', 'Bánh gạo hình bán nguyệt hấp trên lá thông, nhân vừng hoặc đậu, ăn vào dịp Trung thu Chuseok.',
  d => { d.e(4, 9, 3.4, 2.6, 'w'); d.e(10.5, 7.5, 3.6, 2.8, 'p'); d.e(10, 12, 3.4, 2.4, 'h'); d.p('W', 3, 8, 9, 6, 9, 11); for (const x of [1, 6, 13]) d.l(x, 14, x + 2, 12, 'G'); d.r(0, 14, 16, 1, 'G'); d.p('G', 3, 12, 8, 14); d.p('x', 11, 7); }, FOOD);
add(G, C, 'kr-miyeokguk', 'Miyeokguk (canh rong biển)', 'Miyeokguk (seaweed soup)', 'Canh rong biển mà người mẹ ăn sau khi sinh và cả nhà ăn vào ngày sinh nhật để nhớ công ơn mẹ.',
  d => { d.e(8, 9, 6.6, 6, 'B'); d.r(0, 0, 16, 7, '_'); d.r(1, 7, 14, 1, 'b'); d.r(2, 8, 12, 5, 'B'); d.e(8, 7.6, 6, 1.4, 'G'); d.p('d', 4, 7, 6, 7, 9, 7, 11, 7, 7, 6, 10, 6); d.p('e', 5, 7, 8, 7); d.l(3, 6, 5, 6, 'G'); }, FOOD);
add(G, C, 'kr-patbingsu', 'Patbingsu', 'Patbingsu', 'Đá bào phủ đậu đỏ ngọt, mochi và trái cây, món giải nhiệt mùa hè.',
  d => { d.e(8, 6.5, 6, 4.4, 'w'); d.e(8, 4, 4, 2.4, 'l'); d.e(6, 5, 2.4, 1.8, 'R'); d.e(10.5, 5.5, 2.2, 1.6, 'm'); d.p('p', 8, 3, 5, 7, 11, 8); d.p('y', 7, 5); d.r(3, 10, 10, 4, 'l'); d.r(4, 11, 8, 2, 'w'); d.r(3, 14, 10, 1, 'a'); d.l(13, 0, 11, 5, 'a'); }, FOOD);
add(G, C, 'kr-gimjang', 'Gimjang (làm kimchi mùa đông)', 'Gimjang (winter kimchi making)', 'Mùa đông, cả gia đình và hàng xóm tụ lại làm thật nhiều kimchi để dùng qua mùa lạnh. UNESCO công nhận năm 2013.',
  d => { d.e(8, 11, 7, 4, 'r'); d.e(8, 10, 6, 3, 'R'); d.r(0, 0, 16, 8, '_'); d.r(1, 8, 14, 1, 'w'); d.r(2, 9, 12, 5, 'r'); d.e(8, 9, 6, 1.2, 'x'); for (let i = 0; i < 3; i++) d.r(3 + i * 4, 3, 3, 5, 'h'); d.p('w', 4, 4, 8, 5, 12, 4); d.p('r', 4, 6, 8, 6, 12, 6); }, FOOD);

// ----- Quy tắc bàn ăn -----
add(G, E, 'kr-elder', 'Chờ người lớn cầm đũa trước', 'Waiting for elders to start', 'Trong bữa ăn, người ta chờ người lớn tuổi nhất cầm muỗng hoặc đũa trước rồi mới bắt đầu ăn.',
  d => { d.bg('t'); d.e(8, 11, 6, 3, 'w'); d.r(0, 0, 16, 10, '_'); d.r(2, 10, 12, 1, 'w'); d.r(3, 11, 10, 3, 'a'); d.e(8, 5, 3, 3, 's'); d.r(5, 1, 6, 2, 'a'); d.r(5, 8, 6, 3, 'B'); d.p('k', 7, 5, 9, 5); d.l(13, 7, 15, 12, 'n'); d.p('a', 14, 6); }, SC);
add(G, E, 'kr-sutgarak', 'Muỗng và đũa kim loại', 'Spoon and metal chopsticks', 'Người Hàn dùng muỗng (sutgarak) cho cơm và canh, đũa kim loại dẹt cho món ăn kèm. Đũa kim loại là nét riêng so với các nước dùng đũa gỗ.',
  d => { d.l(2, 14, 6, 6, 'a'); d.e(6.5, 4.5, 2.4, 3, 'l'); d.l(3, 14, 7, 7, 'w'); d.l(9, 14, 13, 1, 'a'); d.l(11, 14, 15, 1, 'a'); d.p('l', 10, 12, 12, 8); d.r(0, 15, 16, 1, 'a'); }, { use: 'hold' });
add(G, E, 'kr-jesa', 'Không cắm đũa vào cơm', 'No chopsticks upright in rice', 'Không cắm đũa hoặc muỗng thẳng đứng vào bát cơm vì giống hình ảnh nén hương cúng người mất trong nghi lễ jesa.',
  d => { d.e(8, 11.5, 6, 3.6, 'w'); d.r(0, 0, 16, 10, '_'); d.r(2, 10, 12, 1, 'W'); d.r(3, 11, 10, 3, 'w'); d.r(4, 13, 8, 1, 'a'); d.e(8, 9.8, 5.4, 1.6, 'e'); d.r(7, 0, 1, 10, 'a'); d.r(9, 0, 1, 10, 'A'); d.l(1, 1, 4, 4, 'r'); d.l(4, 1, 1, 4, 'r'); }, { use: 'hold' });
add(G, E, 'kr-pouring', 'Rót rượu bằng hai tay', 'Pouring drinks with two hands', 'Khi rót rượu cho người lớn tuổi, người trẻ dùng hai tay cầm chai, và khi uống thường quay đầu sang một bên.',
  d => { d.r(5, 1, 3, 3, 'g'); d.r(4, 4, 5, 8, 'G'); d.r(4, 4, 1, 8, 'g'); d.r(5, 7, 3, 3, 'w'); d.e(11, 13, 3, 1.6, 's'); d.e(3, 13, 3, 1.6, 's'); d.l(6, 3, 12, 11, 'c'); d.r(10, 11, 5, 4, 'l'); d.r(10, 11, 5, 1, 'w'); d.r(11, 12, 3, 2, 'c'); d.p('c', 11, 10); }, FOOD);
