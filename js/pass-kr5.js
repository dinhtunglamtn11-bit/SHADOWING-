import { add, SC, setCC } from './pass-kit.js';
setCC('kr');
// Hàn Quốc · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử
const G = 5, A = 'Động vật', B = 'Linh vật', C = 'Tín ngưỡng', E = 'Nhân vật và lịch sử', F = 'Người nổi tiếng';
const PET = { use: 'pet' };

// ----- Động vật -----
add(G, A, 'kr-tiger', 'Hổ', 'Tiger', 'Hổ là biểu tượng của dân tộc Hàn: xuất hiện trong vô số truyền thuyết, tranh dân gian và là linh vật Olympic Seoul 1988 (Hodori). Ngoài tự nhiên, hổ đã không còn ở Hàn Quốc.',
  d => { d.e(8, 9, 6.6, 6, 'o'); d.tri(1, 1, 4, 4, 'o'); d.tri(11, 1, 4, 4, 'o'); d.p('d', 3, 3, 12, 3); d.r(3, 5, 1, 3, 'd'); d.r(12, 5, 1, 3, 'd'); d.r(7, 3, 2, 1, 'd'); d.r(6, 5, 1, 2, 'd'); d.r(9, 5, 1, 2, 'd'); d.e(8, 11.5, 3.6, 2.6, 'w'); d.e(5.6, 8, 1, 1, 'w'); d.e(10.4, 8, 1, 1, 'w'); d.p('k', 5, 8, 10, 8, 8, 10); d.p('r', 8, 12); d.p('k', 6, 12, 10, 12); }, PET);
add(G, A, 'kr-magpie', 'Chim khách (kkachi)', 'Magpie (kkachi)', 'Chim khách được tin là loài báo tin vui. Hình ảnh chim khách xuất hiện thân thiện trong tranh dân gian và truyện cổ.',
  d => { d.e(8, 9, 4.6, 3.4, 'w'); d.e(11, 6, 2.6, 2.4, 'd'); d.p('y', 13, 6, 14, 6); d.p('w', 11, 5); d.e(5, 9, 3.4, 2.4, 'd'); d.l(2, 11, 0, 14, 'd'); d.l(3, 12, 1, 15, 'B'); d.l(7, 12, 7, 15, 'd'); d.l(9, 12, 10, 15, 'd'); d.p('b', 4, 8, 6, 8); }, PET);
add(G, A, 'kr-jindodog', 'Chó Jindo', 'Jindo dog', 'Giống chó trung thành từ đảo Jindo, được công nhận là bảo vật quốc gia. Nổi tiếng nhất là chú chó Baekgu đã tự quay về nhà từ cách xa khoảng 300 km.',
  d => { d.e(7, 10, 4.6, 3.2, 'w'); d.e(11, 6.5, 3, 3, 'w'); d.tri(10, 2, 2, 3, 'o'); d.tri(12.6, 2, 2, 3, 'o'); d.e(11, 7, 2.2, 1.8, 'o'); d.p('d', 11, 6, 13, 7); d.p('k', 14, 8); d.e(3.5, 7, 2.2, 2.6, 'w'); d.e(3.5, 7, 1.2, 1.6, 'e'); d.l(5, 12, 5, 15, 'w'); d.l(9, 12, 9, 15, 'w'); d.p('o', 8, 9, 6, 8); }, PET);
add(G, A, 'kr-crane', 'Hạc ở vùng DMZ', 'Cranes of the DMZ', 'Hạc đầu đỏ và hạc cổ trắng nghỉ đông ở khu phi quân sự vì nơi đây hầu như không có người. Hạc tượng trưng cho sống lâu và thanh cao.',
  d => { d.e(8, 9, 4.6, 3.4, 'w'); d.l(11, 7, 12, 3, 'w'); d.l(12, 7, 13, 3, 'w'); d.e(13, 2.5, 1.4, 1.2, 'w'); d.p('r', 13, 1); d.p('y', 14, 3, 15, 3); d.p('d', 3, 10, 4, 11, 4, 9, 5, 12); d.l(7, 12, 7, 15, 'd'); d.l(9, 12, 10, 15, 'd'); d.l(3, 8, 7, 5, 'w'); d.p('d', 13, 2); }, PET);
add(G, A, 'kr-blackpig', 'Heo đen Jeju', 'Jeju black pig', 'Giống heo đen đặc sản của đảo Jeju, thịt dai và thơm. Ngày xưa chuồng heo ở Jeju còn nối liền nhà vệ sinh của gia đình.',
  d => { d.e(8, 9.5, 6.6, 4.4, 'd'); d.e(12.6, 9, 2.8, 2.4, 'd'); d.e(13.8, 10, 1.6, 1.2, 'K'); d.p('w', 14, 9); d.tri(10, 4, 3, 3, 'd'); d.p('k', 12, 8); d.l(4, 13, 4, 15, 'd'); d.l(7, 13, 7, 15, 'd'); d.l(10, 13, 10, 15, 'd'); d.l(2, 8, 0, 6, 'd'); d.p('K', 5, 8, 8, 7); }, PET);

// ----- Linh vật -----
add(G, B, 'kr-haetae', 'Haetae', 'Haetae', 'Thần thú giống sư tử, đứng trước cung Gwanghwamun. Người xưa tin nó giữ thành phố khỏi lửa và tai họa.',
  d => { d.bg('l'); d.r(0, 14, 16, 2, 'a'); d.e(8, 9, 5, 5, 'a'); d.e(8, 5.5, 4.6, 3.6, 'a'); d.p('y', 4, 3, 12, 3, 5, 2, 11, 2); d.p('d', 6, 5, 10, 5); d.r(5, 7, 6, 2, 'd'); d.p('w', 6, 7, 8, 7, 10, 7, 6, 8, 10, 8); d.p('r', 8, 8); d.p('A', 3, 9, 13, 9, 4, 12, 12, 12); d.tri(7, 0, 2, 2, 'A'); }, PET);
add(G, B, 'kr-dokkaebi', 'Dokkaebi', 'Dokkaebi', 'Yêu quái dân gian cầm chiếc chùy thần, hay chơi khăm nhưng cũng giúp người thật thà. Nổi tiếng thế giới qua một bộ phim truyền hình.',
  d => { d.e(8, 9, 5.6, 5.4, 'b'); d.tri(3, 0, 2, 4, 'y'); d.tri(11, 0, 2, 4, 'y'); d.l(3, 6, 6, 7, 'd'); d.l(13, 6, 10, 7, 'd'); d.p('w', 5, 8, 10, 8); d.p('d', 5, 9, 10, 9); d.r(5, 11, 6, 2, 'd'); d.p('w', 6, 11, 9, 11); d.p('y', 7, 13, 8, 13); d.p('r', 2, 9, 13, 9); }, PET);
add(G, B, 'kr-gumiho', 'Gumiho (cáo chín đuôi)', 'Gumiho (nine-tailed fox)', 'Cáo chín đuôi hóa thành người đẹp trong truyện dân gian: khi là kẻ phản diện, khi lại là người bạn thân thiết.',
  d => { d.tri(2, 1, 4, 5, 'o'); d.tri(10, 1, 4, 5, 'o'); d.tri(3, 3, 2, 3, 'd'); d.tri(11, 3, 2, 3, 'd'); d.e(8, 8, 5.4, 4.2, 'o'); d.e(8, 11, 3, 2, 'w'); d.p('d', 5, 7, 6, 7, 10, 7, 11, 7, 8, 12); d.p('r', 8, 10); for (let i = 0; i < 4; i++) { d.l(1 + i, 14, 0 + i * 2, 11, 'o'); d.l(14 - i, 14, 15 - i * 2, 11, 'o'); } d.p('w', 0, 11, 15, 11); }, PET);
add(G, B, 'kr-bonghwang', 'Bonghwang (phượng hoàng)', 'Bonghwang (phoenix)', 'Chim phượng hoàng là biểu tượng quyền uy, xuất hiện trong huy hiệu của tổng thống Hàn Quốc và nhiều hoa văn cung điện.',
  d => { d.e(8, 8, 4, 3.6, 'r'); d.e(12, 4.5, 2.2, 2.2, 'y'); d.p('d', 12, 4); d.p('o', 14, 5, 15, 5); d.l(11, 2, 12, 0, 'r'); d.l(12, 2, 14, 0, 'y'); d.l(4, 9, 0, 13, 'y'); d.l(5, 10, 1, 15, 'r'); d.l(4, 8, 0, 8, 'p'); d.l(6, 11, 5, 15, 'y'); d.l(9, 11, 9, 15, 'r'); d.p('y', 6, 7, 8, 8); d.e(7, 7, 2.4, 2, 'o'); }, PET);
add(G, B, 'kr-jangseung', 'Jangseung', 'Jangseung', 'Cột gỗ khắc mặt người đặt ở đầu làng, vừa giữ làng khỏi tà ma vừa đánh dấu ranh giới.',
  d => { d.bg('G'); d.r(5, 1, 6, 14, 'n'); d.r(5, 1, 1, 14, 'N'); d.r(4, 0, 8, 2, 'N'); d.r(6, 4, 2, 2, 'w'); d.r(9, 4, 2, 2, 'w'); d.p('d', 7, 5, 10, 5); d.r(6, 8, 4, 1, 'd'); d.r(7, 8, 2, 2, 'r'); d.p('w', 6, 8, 9, 8); d.r(3, 14, 10, 2, 'a'); d.p('h', 1, 12, 14, 12); }, { scene: true });

// ----- Tín ngưỡng -----
add(G, C, 'kr-buddhism', 'Phật giáo', 'Buddhism', 'Truyền vào Hàn Quốc khoảng thế kỷ 4. Ngày nay nhiều ngôi chùa trên núi mở chương trình templestay để du khách trải nghiệm đời sống chùa.',
  d => { d.bg('G'); d.tri(1, 4, 14, 3, 'A'); d.r(2, 7, 12, 6, 'r'); d.r(2, 7, 12, 1, 'y'); d.r(4, 8, 2, 5, 'N'); d.r(10, 8, 2, 5, 'N'); d.r(7, 8, 2, 5, 'y'); d.tri(5, 0, 6, 4, 'A'); d.r(0, 13, 16, 3, 'a'); d.p('y', 8, 0); }, { scene: true });
add(G, C, 'kr-confucianism', 'Nho giáo', 'Confucianism', 'Triều Joseon lấy Nho giáo làm nền tảng, ảnh hưởng sâu đến việc coi trọng giáo dục và kính trọng người lớn tuổi.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'n'); d.r(3, 3, 10, 10, 'e'); for (let y = 4; y < 12; y += 2) d.r(4, y, 8, 1, 'd'); d.r(2, 2, 12, 1, 'N'); d.r(2, 13, 12, 1, 'N'); d.p('r', 12, 11, 12, 12); d.l(0, 1, 3, 3, 'n'); d.l(15, 1, 13, 3, 'n'); }, { scene: true });
add(G, C, 'kr-muism', 'Muism (tín ngưỡng thầy cúng)', 'Muism (shamanism)', 'Tín ngưỡng dân gian rất xưa: thầy cúng mudang làm lễ gut để cầu may, chữa bệnh và xua tà.',
  d => { d.bg('P'); d.e(8, 5.5, 2.4, 2.6, 's'); d.r(5, 2, 6, 2, 'd'); d.r(4, 8, 8, 6, 'r'); d.r(4, 8, 8, 1, 'y'); d.l(4, 9, 1, 6, 'b'); d.l(12, 9, 15, 6, 'y'); d.r(0, 5, 3, 3, 'w'); d.r(13, 5, 3, 3, 'r'); d.p('k', 7, 5, 9, 5); d.p('y', 8, 0, 3, 1, 12, 1); }, { scene: true });
add(G, C, 'kr-jesa-rite', 'Jesa (cúng tổ tiên)', 'Jesa (ancestral rite)', 'Nghi lễ cúng tổ tiên vào ngày giỗ và dịp lễ lớn: bày mâm cúng, thắp hương và cúi lạy.',
  d => { d.bg('t'); d.r(2, 9, 12, 5, 'N'); d.r(2, 9, 12, 1, 'n'); d.r(3, 6, 2, 3, 'w'); d.r(7, 5, 2, 4, 'y'); d.r(11, 6, 2, 3, 'r'); d.r(3, 5, 2, 1, 'w'); d.l(8, 4, 8, 1, 'a'); d.p('a', 7, 0, 9, 1); d.r(5, 7, 1, 2, 'o'); d.r(10, 7, 1, 2, 'o'); d.p('R', 2, 13, 13, 13); }, { scene: true });

// ----- Nhân vật và lịch sử -----
add(G, E, 'kr-threekingdoms', 'Ba Vương quốc', 'Three Kingdoms', 'Goguryeo, Baekje và Silla chia nhau bán đảo từ khoảng thế kỷ 1 trước Công nguyên. Đến năm 668 Silla thống nhất phần lớn bán đảo.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); for (const [x, c] of [[1, 'r'], [6, 'b'], [11, 'y']]) { d.r(x, 3, 1, 10, 'N'); d.r(x + 1, 3, 3, 4, c); d.r(x + 1, 3, 3, 1, 'w'); } d.p('y', 3, 1, 8, 1, 13, 1); }, SC);
add(G, E, 'kr-goryeo', 'Goryeo và sách in kim loại', 'Goryeo and metal movable type', 'Vương triều Goryeo (918–1392) là nguồn gốc của tên gọi "Korea". Sách Jikji in bằng chữ kim loại di động năm 1377 là cuốn sách như vậy cổ nhất còn lại.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'u'); for (let y = 4; y < 12; y += 2) for (let x = 3; x < 13; x += 2) d.p('d', x, y); d.r(1, 1, 14, 1, 'N'); d.r(1, 14, 14, 1, 'N'); d.r(1, 1, 1, 14, 'N'); d.r(14, 1, 1, 14, 'N'); d.p('r', 12, 12); }, { scene: true });
add(G, E, 'kr-joseon', 'Triều Joseon', 'Joseon dynasty', 'Vương triều kéo dài hơn 500 năm (1392–1910) với kinh đô Hanyang (nay là Seoul), để lại cung điện, nghi lễ và nhiều nét văn hóa còn sống đến nay.',
  d => { d.bg('B'); d.r(3, 1, 10, 7, 'r'); d.r(3, 1, 10, 1, 'R'); d.r(3, 7, 10, 1, 'R'); d.r(5, 3, 6, 3, 'y'); d.e(8, 4.5, 1.4, 1.4, 'r'); d.r(2, 8, 12, 2, 'Y'); d.r(2, 10, 12, 4, 'p'); d.r(7, 10, 2, 5, 'y'); d.r(1, 14, 14, 2, 'N'); }, { scene: true });
add(G, E, 'kr-sejong', 'Vua Sejong', 'King Sejong the Great', 'Vua thứ tư của Joseon (1418–1450), người cùng các học giả tạo ra Hangeul và khuyến khích khoa học như đồng hồ nước, dụng cụ đo mưa.',
  d => { d.e(8, 8, 5.4, 6, 's'); d.r(4, 0, 8, 3, 'd'); d.r(2, 3, 12, 1, 'd'); d.r(6, 1, 4, 2, 'y'); d.r(3, 4, 10, 2, 'd'); d.p('k', 5, 8, 10, 8); d.r(6, 11, 4, 1, 'R'); d.r(4, 13, 8, 3, 'r'); d.r(4, 13, 8, 1, 'y'); d.l(7, 9, 7, 10, 'S'); d.p('S', 8, 10); });
add(G, E, 'kr-yisunsin', 'Đô đốc Yi Sun-sin', 'Admiral Yi Sun-sin', 'Danh tướng thời Joseon đánh thắng quân Nhật trong chiến tranh Imjin (1592–1598) bằng chiến thuật tài tình và "thuyền rùa" geobukseon. Nổi tiếng với trận Myeongnyang chỉ với 13 chiến thuyền.',
  d => { d.bg('C'); d.r(0, 10, 16, 6, 'B'); d.e(8, 9, 6, 3.6, 'G'); d.r(0, 0, 16, 7, '_'); d.r(2, 7, 12, 3, 'G'); for (const x of [3, 6, 9, 12]) d.tri(x, 5, 2, 3, 'g'); d.r(7, 3, 2, 2, 'a'); d.r(4, 11, 8, 3, 'N'); d.p('r', 8, 4, 8, 3); d.p('w', 2, 12, 13, 13); }, SC);
add(G, E, 'kr-hanmiracle', 'Chiến tranh Triều Tiên và kỳ tích sông Hàn', 'Korean War and the Miracle on the Han River', 'Chiến tranh Triều Tiên (1950–1953) chia đôi bán đảo. Từ một nền kinh tế nghèo, Hàn Quốc trở thành nước phát triển chỉ sau vài thập kỷ, gọi là "Kỳ tích sông Hàn".',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 12, 16, 1, 'c'); d.r(1, 6, 3, 6, 'A'); d.r(5, 3, 3, 9, 'K'); d.r(9, 5, 3, 7, 'A'); d.r(13, 2, 3, 10, 'K'); d.p('y', 2, 7, 6, 5, 10, 7, 14, 4, 6, 8, 14, 7); d.l(0, 15, 15, 13, 'b'); d.p('w', 3, 14, 11, 15); }, SC);

// ----- Người nổi tiếng -----
add(G, F, 'kr-bongjoonho', 'Bong Joon-ho', 'Bong Joon-ho', 'Đạo diễn phim "Parasite", người giành giải Oscar Đạo diễn xuất sắc năm 2020.',
  d => { d.e(8, 9, 5.4, 5.4, 's'); d.r(3, 2, 10, 3, 'd'); d.r(2, 4, 3, 5, 'd'); d.r(11, 4, 3, 5, 'd'); d.r(4, 7, 3, 3, 'l'); d.r(9, 7, 3, 3, 'l'); d.r(4, 7, 3, 1, 'a'); d.r(9, 7, 3, 1, 'a'); d.p('d', 5, 8, 10, 8); d.r(7, 8, 2, 1, 'a'); d.r(6, 12, 4, 1, 'R'); d.r(3, 14, 10, 2, 'k'); });
add(G, F, 'kr-bts', 'BTS', 'BTS', 'Nhóm nhạc bảy thành viên ra mắt năm 2013. Bài "Dynamite" năm 2020 đứng đầu bảng xếp hạng Billboard Hot 100 của Mỹ.',
  d => { d.bg('v'); for (let i = 0; i < 7; i++) { const x = 1 + i * 2; d.e(x + 0.5, 6, 1.2, 1.2, 's'); d.r(x, 3, 2, 1, i % 2 ? 'd' : 'n'); d.r(x - 0.5, 7, 2, 5, i % 3 === 0 ? 'p' : i % 3 === 1 ? 'c' : 'y'); } d.p('y', 2, 1, 13, 1, 8, 0); d.r(0, 13, 16, 3, 'V'); }, { scene: true });
add(G, F, 'kr-kimyuna', 'Kim Yu-na', 'Kim Yu-na', 'Vận động viên trượt băng nghệ thuật, giành huy chương vàng Olympic Vancouver 2010.',
  d => { d.bg('l'); d.r(0, 13, 16, 3, 'c'); d.e(8, 4, 2, 2, 's'); d.r(6, 1, 4, 2, 'd'); d.r(6, 6, 4, 3, 'p'); d.l(6, 7, 2, 4, 's'); d.l(10, 7, 14, 4, 's'); d.l(7, 9, 7, 13, 's'); d.l(9, 9, 12, 12, 's'); d.l(3, 14, 13, 14, 'a'); d.p('w', 1, 12, 14, 11); d.e(8, 4, 0.8, 0.8, 'k'); }, SC);
add(G, F, 'kr-sonny', 'Son Heung-min', 'Son Heung-min', 'Cầu thủ bóng đá, đội trưởng đội tuyển quốc gia, thi đấu ở giải Ngoại hạng Anh và từng cùng giành Chiếc giày vàng mùa 2021–22.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'g'); d.e(8, 5, 2.4, 2.4, 's'); d.r(5, 2, 6, 2, 'd'); d.r(5, 8, 6, 4, 'w'); d.r(5, 8, 6, 1, 'b'); d.l(6, 12, 4, 15, 's'); d.l(10, 12, 12, 14, 's'); d.e(13, 13.5, 1.8, 1.8, 'w'); d.p('d', 12, 13, 14, 14, 13, 12); d.p('k', 7, 5, 9, 5); d.r(4, 12, 3, 1, 'w'); }, SC);
add(G, F, 'kr-hankang', 'Han Kang', 'Han Kang', 'Nhà văn Hàn Quốc đầu tiên đoạt giải Nobel Văn học (năm 2024), tác giả của "Người ăn chay".',
  d => { d.r(2, 2, 12, 12, 'w'); d.r(2, 2, 12, 1, 'a'); d.e(8, 6, 3, 3, 'e'); d.p('d', 7, 5, 9, 5, 8, 7); d.r(4, 8, 8, 1, 'a'); d.r(4, 10, 8, 1, 'a'); d.r(4, 12, 5, 1, 'a'); d.e(12, 3, 1.4, 1.4, 'y'); d.p('r', 3, 13); d.l(3, 5, 5, 4, 'n'); d.r(5, 0, 6, 2, 'N'); }, { use: 'hold' });
