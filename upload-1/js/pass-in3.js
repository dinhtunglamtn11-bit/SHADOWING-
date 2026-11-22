import { add, SC, setCC } from './pass-kit.js';
setCC('in');
// Ấn Độ · Nhóm 3: Ẩm thực
const G = 3, A = 'Món ăn', B = 'Đồ uống, trà và rượu', C = 'Món theo mùa và dịp lễ';
const H = { use: 'hold' };
const plate = d => { d.bg('e'); d.e(8, 9, 7, 5.6, 'a'); d.e(8, 9, 6, 4.8, 'l'); };

// ----- Món ăn -----
add(G, A, 'in-biryani', 'Biryani', 'Biryani', 'Cơm nấu tầng với thịt hoặc rau, ướp gia vị và hấp kín, mỗi thành phố như Hyderabad hay Lucknow có kiểu riêng.',
  d => { plate(d); d.e(8, 9, 5, 3.4, 'y'); d.p('o', 5, 8, 9, 7, 11, 9, 7, 10); d.p('n', 6, 9, 10, 10); d.p('g', 8, 6, 5, 11); d.p('r', 11, 11, 4, 9); d.p('w', 9, 8); }, SC);
add(G, A, 'in-butterchicken', 'Butter chicken (gà sốt bơ)', 'Butter chicken', 'Gà nướng tandoor sốt cà chua và bơ béo ngậy, món nổi tiếng nhất với du khách.',
  d => { d.bg('e'); d.e(8, 10, 7, 4.6, 'N'); d.e(8, 9, 6, 3.6, 'o'); d.e(8, 9, 4.6, 2.6, 'r'); d.p('N', 5, 8, 8, 7, 10, 9, 7, 10); d.p('w', 8, 8, 4, 10); d.p('g', 11, 8, 12, 9); }, SC);
add(G, A, 'in-dal', 'Dal', 'Dal', 'Món đậu hầm sền sệt, xuất hiện trong gần như mọi bữa ăn hằng ngày.',
  d => { d.bg('e'); d.e(8, 9, 6, 5, 'a'); d.e(8, 9, 5, 4, 'y'); d.e(8, 9, 3.6, 2.8, 'Y'); d.p('o', 6, 8, 9, 10, 10, 8); d.p('r', 8, 7); d.p('g', 7, 10); d.p('w', 6, 2, 9, 1); }, SC);
add(G, A, 'in-paneer', 'Paneer', 'Paneer', 'Phô mai tươi không lên men, nấu với rau chân vịt (palak paneer) hoặc cà chua sốt kem.',
  d => { plate(d); d.e(8, 9, 4.6, 3.4, 'G'); for (const [x, y] of [[6, 8], [9, 7], [10, 10], [7, 11]]) d.r(x, y, 2, 2, 'e'); d.p('w', 8, 9); d.p('g', 5, 10, 11, 8); }, SC);
add(G, A, 'in-naan', 'Naan, chapati và roti', 'Naan, chapati and roti', 'Các loại bánh mì dẹt ăn thay cơm, naan nướng lò đất, chapati áp chảo.',
  d => { d.bg('e'); d.e(6, 7, 4.4, 5, 'u'); d.e(11, 11, 4, 3, 't'); d.p('n', 5, 5, 6, 8, 4, 8, 7, 10); d.p('N', 10, 10, 12, 12); d.p('o', 6, 6, 5, 9, 11, 11); d.p('w', 7, 3); d.p('G', 8, 2); }, SC);
add(G, A, 'in-dosa', 'Dosa và idli', 'Dosa and idli', 'Bánh crepe mỏng giòn và bánh gạo hấp từ bột gạo lên men, món sáng của miền nam, ăn kèm sambar và chutney dừa.',
  d => { d.bg('e'); d.tri(1, 4, 11, 8, 'u'); d.r(1, 11, 11, 1, 't'); d.p('n', 3, 9, 6, 8, 9, 10); d.e(13, 6, 2, 1.4, 'w'); d.e(13, 9, 2, 1.4, 'w'); d.e(4, 14, 2, 1.4, 'o'); d.e(10, 14, 2, 1.4, 'w'); d.p('r', 3, 13, 11, 14); }, SC);
add(G, A, 'in-samosa', 'Samosa', 'Samosa', 'Bánh chiên hình tam giác nhân khoai và đậu, ăn vặt khắp cả nước.',
  d => { d.bg('e'); d.tri(1, 4, 8, 8, 'o'); d.tri(7, 6, 8, 8, 'Y'); d.p('O', 4, 9, 5, 10, 10, 11, 11, 12); d.p('y', 3, 11, 12, 10, 8, 8); d.p('g', 13, 4, 14, 5); d.r(1, 12, 6, 1, 'O'); }, SC);
add(G, A, 'in-chaat', 'Chaat và pani puri', 'Chaat and pani puri', 'Món ăn vặt đường phố chua cay ngọt, pani puri là viên bột giòn chứa nước me cay.',
  d => { d.bg('e'); d.e(5, 8, 3, 3, 'o'); d.e(11, 8, 3, 3, 'o'); d.e(8, 12, 3, 3, 'o'); d.p('O', 4, 7, 10, 7, 7, 11); d.p('g', 5, 8, 11, 8, 8, 12); d.p('Y', 5, 5, 11, 5); d.r(6, 2, 4, 2, 'n'); d.p('w', 8, 1); }, SC);
add(G, A, 'in-vadapav', 'Vada pav', 'Vada pav', 'Bánh mì kẹp khoai chiên, "burger của Mumbai".',
  d => { d.bg('e'); d.e(8, 10, 6, 3, 'u'); d.e(8, 6, 6, 3, 'u'); d.e(8, 8, 4.6, 2, 'o'); d.p('g', 4, 8, 12, 8); d.p('r', 6, 9, 10, 9); d.p('n', 5, 5, 8, 4, 11, 5); d.p('t', 5, 11, 10, 11); }, SC);
add(G, A, 'in-roganjosh', 'Rogan josh và các món Kashmir', 'Rogan josh and Kashmiri dishes', 'Thịt cừu hầm gia vị với ớt Kashmir đỏ rực.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 5.6, 4, 'R'); d.e(8, 9, 4.4, 3, 'r'); for (const [x, y] of [[6, 8], [9, 7], [10, 10], [7, 11]]) d.r(x, y, 2, 2, 'N'); d.p('y', 8, 9); d.p('w', 5, 6); }, SC);
add(G, A, 'in-chole', 'Chole bhature', 'Chole bhature', 'Đậu gà sốt cay ăn kèm bánh chiên phồng, món sáng nổi tiếng của Delhi và Punjab.',
  d => { d.bg('e'); d.e(5, 8, 4.6, 4.6, 'o'); d.e(5, 8, 3.4, 3.4, 'Y'); d.e(11, 7, 4, 3.4, 'u'); d.e(11, 7, 3, 2.4, 'y'); d.e(5, 8, 2.4, 2.4, 'n'); d.p('t', 4, 7, 6, 9); d.p('r', 5, 8); d.p('g', 12, 12, 8, 13, 4, 13); }, SC);
add(G, A, 'in-fishcurry', 'Cà ri cá Kerala', 'Kerala fish curry', 'Cá nấu nước cốt dừa và me, thường ăn với cơm hoặc appam.',
  d => { d.bg('e'); d.e(8, 9, 7, 5, 'a'); d.e(8, 9, 5.6, 4, 'o'); d.e(8, 9, 4.4, 3, 'O'); d.e(7, 9, 2.6, 1.4, 'W'); d.p('k', 5, 9); d.p('W', 10, 8, 10, 10); d.p('r', 8, 7, 9, 11); d.p('g', 11, 6, 5, 12); }, SC);
add(G, A, 'in-dhokla', 'Dhokla', 'Dhokla', 'Bánh hấp bột đậu vàng mềm xốp của Gujarat.',
  d => { plate(d); for (const [x, y] of [[4, 6], [8, 6], [6, 9], [10, 9], [5, 12]]) { d.r(x, y, 3, 3, 'y'); d.r(x, y, 3, 1, 'u'); } d.p('g', 5, 5, 9, 5, 7, 8, 11, 8); d.p('r', 5, 10); }, SC);

// ----- Đồ uống, trà và rượu -----
add(G, B, 'in-masalachai', 'Masala chai', 'Masala chai', 'Trà đen nấu với sữa, đường và gia vị như gừng, bạch đậu khấu, là đồ uống quốc dân.',
  d => { d.bg('e'); d.r(3, 6, 8, 7, 'n'); d.r(3, 6, 8, 2, 'u'); d.r(4, 13, 6, 1, 'N'); d.l(11, 7, 13, 8, 'a'); d.l(13, 8, 11, 11, 'a'); d.p('w', 5, 3, 8, 2, 7, 4, 9, 1); d.p('r', 13, 3); d.p('y', 1, 13); }, H);
add(G, B, 'in-filtercoffee', 'Cà phê lọc miền Nam (filter coffee)', 'South Indian filter coffee', 'Cà phê pha bằng phin kim loại, trộn nhiều sữa, phục vụ trong ly kim loại nhỏ.',
  d => { d.bg('e'); d.r(2, 7, 6, 6, 'a'); d.r(2, 6, 6, 1, 'l'); d.r(9, 5, 6, 8, 'A'); d.r(9, 4, 6, 1, 'a'); d.r(10, 6, 4, 2, 'n'); d.r(10, 8, 4, 4, 'u'); d.p('w', 4, 3, 12, 2, 5, 2); d.p('N', 3, 8, 6, 10); }, H);
add(G, B, 'in-lassi', 'Lassi', 'Lassi', 'Sữa chua uống mát, vị ngọt hoặc mặn, có thể thêm xoài.',
  d => { d.bg('e'); d.r(4, 3, 8, 11, 'w'); d.r(4, 3, 8, 3, 'o'); d.r(4, 6, 8, 1, 'y'); d.p('l', 5, 8, 6, 11); d.p('y', 8, 2); d.l(10, 3, 12, 0, 'r'); d.r(4, 13, 8, 1, 'a'); d.p('o', 9, 9, 7, 12); }, H);
add(G, B, 'in-nimbupani', 'Nimbu pani', 'Nimbu pani', 'Nước chanh pha muối hoặc đường, giải khát mùa nóng.',
  d => { d.bg('e'); d.r(4, 4, 8, 10, 'c'); d.r(4, 4, 8, 2, 'w'); d.e(8, 8, 2.6, 2.6, 'y'); d.e(8, 8, 1.6, 1.6, 'u'); d.p('g', 6, 11, 10, 7); d.l(11, 4, 13, 1, 'g'); d.p('h', 5, 6); d.r(4, 13, 8, 1, 'C'); }, H);
add(G, B, 'in-sugarcane', 'Nước mía và nước dừa', 'Sugarcane juice and coconut water', 'Đồ uống bán dọc đường khi trời oi bức.',
  d => { d.bg('c'); d.e(5, 9, 3.6, 4, 'n'); d.e(5, 9, 2.4, 3, 'e'); d.p('N', 3, 7, 7, 11); d.l(5, 6, 8, 2, 'g'); d.l(10, 14, 13, 3, 'g'); d.l(11, 14, 14, 4, 'G'); d.p('G', 10, 5, 12, 8, 13, 10); d.p('h', 13, 3, 14, 3); }, SC);
add(G, B, 'in-thandai', 'Thandai', 'Thandai', 'Sữa nóng hoặc lạnh pha hạnh nhân, hạt tiêu và hoa hồng, thường uống dịp Holi.',
  d => { d.bg('p'); d.r(4, 5, 8, 8, 'w'); d.r(4, 5, 8, 2, 'x'); d.r(4, 13, 8, 1, 'a'); d.p('P', 5, 8, 7, 10, 9, 8, 10, 11); d.p('t', 6, 3, 9, 3); d.p('r', 8, 2, 7, 2); d.p('g', 10, 3); }, H);
add(G, B, 'in-darjeeling', 'Chè Darjeeling và Assam', 'Darjeeling and Assam tea', 'Hai vùng trà nổi tiếng thế giới, Darjeeling hương nhẹ, Assam đậm.',
  d => { d.bg('e'); d.r(2, 8, 5, 5, 'y'); d.r(9, 8, 5, 5, 'N'); d.r(2, 7, 5, 1, 'u'); d.r(9, 7, 5, 1, 'n'); d.p('w', 3, 4, 5, 3, 10, 4, 12, 3); d.p('g', 3, 14, 11, 14); d.p('G', 4, 15, 12, 15); d.l(7, 9, 8, 12, 'w'); }, SC);
add(G, B, 'in-feni', 'Feni và toddy', 'Feni and toddy', 'Rượu làm từ trái điều ở Goa và rượu cọ ở miền nam.',
  d => { d.bg('e'); d.r(3, 5, 4, 9, 'u'); d.r(4, 3, 2, 2, 'u'); d.r(4, 2, 2, 1, 'N'); d.p('y', 4, 8, 4, 11); d.e(11, 9, 3, 4.4, 'w'); d.r(8, 5, 6, 2, '_'); d.e(11, 9, 2.4, 3.6, 'W'); d.r(10, 3, 2, 3, 'W'); d.p('r', 5, 14); }, H);

add(G, B, 'in-beer', 'Bia và rượu mạnh nội địa', 'Domestic beer and spirits', 'Bia lager và rum bản địa phổ biến ở thành thị.',
  d => { d.bg('e'); d.r(2, 4, 6, 10, 'y'); d.r(2, 3, 6, 2, 'w'); d.r(8, 6, 3, 1, 'Y'); d.r(10, 2, 4, 3, 'n'); d.r(10, 5, 4, 9, 'N'); d.r(11, 1, 2, 1, 'N'); d.r(10, 8, 4, 3, 'u'); d.p('Y', 4, 7, 4, 10); d.p('l', 3, 5); }, H);

// ----- Món theo mùa và dịp lễ -----
add(G, C, 'in-mithai', 'Mithai (kẹo ngọt)', 'Mithai (sweets)', 'Ladoo, barfi, gulab jamun, tặng nhau trong hầu hết các dịp vui như Diwali.',
  d => { plate(d); d.e(5, 8, 2.4, 2.4, 'o'); d.e(11, 8, 2.4, 2.4, 'N'); d.r(5, 11, 3, 3, 'w'); d.r(9, 11, 3, 3, 'p'); d.p('y', 5, 8, 11, 7, 6, 12, 10, 12); d.p('g', 8, 8); d.p('r', 3, 4, 13, 4); }, SC);
add(G, C, 'in-jalebi', 'Jalebi', 'Jalebi', 'Vòng bột chiên giòn tẩm siro, ăn nóng vào buổi sáng.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'o'); d.spiral(8, 8, 2, 'Y'); d.spiral(8, 8, 1.4, 'y'); d.e(8, 8, 1.4, 1.4, 'O'); d.p('w', 5, 3, 11, 3); d.p('y', 4, 12, 12, 12); }, SC);
add(G, C, 'in-kheer', 'Kheer', 'Kheer', 'Cháo gạo sữa ngọt thơm cardamom, món tráng miệng trong lễ cúng.',
  d => { d.bg('e'); d.e(8, 10, 6, 4, 'R'); d.e(8, 9, 5, 3, 'w'); d.p('t', 6, 8, 10, 9, 8, 10); d.p('g', 7, 7, 9, 8); d.p('y', 5, 9, 11, 10); d.p('r', 8, 6); d.r(4, 14, 8, 1, 'R'); }, SC);
add(G, C, 'in-gujiya', 'Gujiya', 'Gujiya', 'Bánh chiên nhân sữa và hạt, làm vào dịp Holi.',
  d => { d.bg('e'); d.e(8, 9, 6, 4.4, 'o'); d.r(2, 9, 12, 5, '_'); d.e(8, 9, 6, 4.4, 'o'); d.r(2, 9, 12, 1, 'Y'); for (let x = 2; x < 14; x += 2) d.p('O', x, 12); d.p('Y', 5, 7, 8, 6, 11, 7); d.p('p', 3, 3, 12, 2); d.p('c', 6, 2); }, SC);
add(G, C, 'in-modak', 'Modak', 'Modak', 'Bánh bột nhân dừa và đường thốt nốt, món yêu thích của thần Ganesha.',
  d => { d.bg('o'); d.tri(4, 4, 8, 10, 'w'); d.e(8, 3, 1.4, 1.4, 'W'); d.p('W', 6, 7, 10, 7, 5, 10, 8, 10, 11, 10); d.l(5, 13, 8, 5, 'l'); d.p('y', 8, 2); d.r(3, 14, 10, 1, 'O'); }, SC);
add(G, C, 'in-sadya', 'Sadya của Onam', 'Onam sadya feast', 'Bữa tiệc chay trên lá chuối với hàng chục món trong lễ hội mùa gặt Kerala.',
  d => { d.bg('G'); d.r(1, 4, 14, 9, 'g'); d.r(1, 4, 14, 1, 'h'); d.e(8, 9, 3, 2.4, 'w'); for (const [x, y, c] of [[3, 6, 'r'], [6, 6, 'y'], [10, 6, 'o'], [13, 6, 'n'], [3, 11, 'y'], [6, 12, 'r'], [10, 12, 'p'], [13, 11, 'Y']]) d.e(x, y, 1.4, 1.2, c); }, SC);
add(G, C, 'in-eid', 'Sheer khurma và biryani dịp Eid', 'Sheer khurma and biryani at Eid', 'Món của cộng đồng Hồi giáo trong ngày lễ kết thúc tháng Ramadan.',
  d => { d.bg('B'); d.e(12, 4, 2.4, 2.4, 'y'); d.e(13, 4, 2, 2, 'B'); d.p('y', 5, 2, 3, 5); d.e(7, 11, 5, 3, 'w'); d.e(7, 10, 4, 2, 'u'); d.p('r', 5, 10, 9, 9); d.p('g', 7, 9); d.p('o', 4, 11, 10, 11); }, SC);
add(G, C, 'in-sarson', 'Sarson da saag và makki di roti', 'Sarson da saag and makki di roti', 'Rau cải xào và bánh ngô, món mùa đông của Punjab.',
  d => { d.bg('e'); d.e(5, 8, 4, 3.6, 'G'); d.e(5, 8, 3, 2.6, 'g'); d.e(11, 10, 4, 3.4, 'y'); d.e(11, 10, 3, 2.4, 'u'); d.r(9, 4, 5, 2, 'w'); d.p('Y', 10, 10, 12, 9); d.p('w', 4, 7); d.p('h', 6, 9); }, SC);
add(G, C, 'in-gajarhalwa', 'Gajar halwa', 'Gajar halwa', 'Món ngọt cà rốt nấu sữa, đặc trưng mùa đông.',
  d => { d.bg('e'); d.e(8, 10, 6, 4, 'a'); d.e(8, 9, 5, 3.4, 'o'); d.e(8, 9, 3.6, 2.4, 'r'); d.p('O', 5, 8, 9, 10, 10, 8); d.p('w', 6, 6, 10, 6); d.p('y', 7, 8, 8, 11); d.p('g', 11, 10); }, SC);
add(G, C, 'in-mango', 'Xoài', 'Mango', 'Trái cây của mùa hè, hàng trăm giống, ăn tươi hoặc làm lassi, chutney.',
  d => { d.bg('h'); d.e(8, 9, 5, 5, 'o'); d.e(10, 8, 3, 4, 'y'); d.e(6, 10, 3, 3, 'r'); d.l(8, 4, 10, 1, 'N'); d.p('G', 10, 2, 12, 3, 11, 1); d.p('g', 12, 2); d.p('w', 8, 7, 7, 8); }, SC);
add(G, C, 'in-langar', 'Langar (bữa ăn cộng đồng)', 'Langar (community meal)', 'Bữa ăn chay miễn phí phục vụ tất cả mọi người tại đền Sikh.',
  d => { d.bg('y'); d.r(0, 12, 16, 4, 'u'); for (const x of [1, 6, 11]) { d.e(x + 2, 6, 1.6, 1.6, 's'); d.r(x, 4, 4, 1, 'o'); d.r(x, 8, 4, 4, 'b'); d.e(x + 2, 13, 2, 1.2, 'a'); d.p('y', x + 1, 13, x + 3, 13); } d.p('k', 3, 6, 8, 6, 13, 6); }, SC);
