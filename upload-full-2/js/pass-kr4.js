import { add, SC, setCC } from './pass-kit.js';
setCC('kr');
// Hàn Quốc · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội và ngày lễ', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Nghệ thuật truyền thống khác', F = 'Văn hóa hiện đại';

// ----- Lễ hội và ngày lễ -----
add(G, A, 'kr-seollal', 'Seollal (Tết âm lịch)', 'Seollal (Lunar New Year)', 'Tết âm lịch kéo dài ba ngày: mặc hanbok, cúi lạy sebae chúc tuổi người lớn và nhận tiền mừng tuổi, ăn canh bánh gạo tteokguk.',
  d => { d.bg('B'); d.e(8, 9, 5, 5.4, 'r'); d.r(3, 9, 10, 1, 'R'); d.r(7, 2, 2, 3, 'y'); d.r(5, 12, 6, 3, 'o'); d.r(6, 5, 4, 1, 'y'); d.r(5, 8, 6, 3, 'y'); d.p('R', 6, 9, 9, 9); d.p('y', 1, 1, 14, 2, 2, 14, 13, 14); d.p('w', 3, 4, 12, 6); }, SC);
add(G, A, 'kr-chuseok', 'Chuseok (Trung thu)', 'Chuseok (harvest festival)', 'Rằm tháng Tám, lễ tạ ơn mùa gặt: mọi người về quê cúng tổ tiên và ăn bánh songpyeon. Đây là kỳ nghỉ lớn nhất trong năm.',
  d => { d.bg('B'); d.e(8, 6, 5, 5, 'y'); d.e(8, 6, 4, 4, 'u'); d.p('Y', 6, 5, 9, 7, 7, 8); d.r(0, 12, 16, 4, 'n'); d.e(4, 13, 2.6, 1.6, 'w'); d.e(8.5, 13.5, 2.6, 1.6, 'p'); d.e(13, 13, 2.6, 1.6, 'h'); d.l(1, 12, 2, 9, 'h'); d.l(15, 12, 14, 9, 'h'); d.p('w', 2, 2, 13, 3); }, SC);
add(G, A, 'kr-dano', 'Lễ hội Dano (Gangneung)', 'Gangneung Dano Festival', 'Lễ hội mồng 5 tháng 5 âm lịch ở Gangneung, có cúng thần núi, múa mặt nạ và các trò chơi dân gian. UNESCO công nhận năm 2005.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(8, 6.5, 4.4, 4, 'n'); d.e(8, 6.5, 3.4, 3, 'c'); d.r(4, 6, 8, 1, 'r'); d.p('k', 6, 5, 9, 5); d.p('r', 7, 8, 8, 8); d.l(3, 12, 2, 8, 'h'); d.l(13, 12, 14, 8, 'h'); d.l(4, 14, 12, 14, 'G'); d.p('y', 1, 2, 14, 1); }, SC);
add(G, A, 'kr-lantern', 'Lễ hội đèn hoa sen', 'Lotus Lantern Festival', 'Lễ hội mừng Phật đản, với đoàn diễu hành hàng nghìn lồng đèn hoa sen thắp sáng trung tâm Seoul.',
  d => { d.bg('B'); d.e(8, 9, 6, 5, 'p'); d.e(8, 9.5, 4.6, 3.8, 'x'); d.tri(1, 4, 5, 8, 'p'); d.tri(10, 4, 5, 8, 'p'); d.e(8, 9, 2, 2, 'y'); d.r(7, 3, 2, 2, 'd'); d.l(8, 0, 8, 3, 'y'); d.r(6, 14, 4, 2, 'o'); d.p('y', 1, 1, 14, 2, 2, 14, 13, 14); }, SC);
add(G, A, 'kr-mud', 'Lễ hội bùn Boryeong', 'Boryeong Mud Festival', 'Lễ hội mùa hè ở bãi biển Daecheon, nơi du khách lăn lộn, nghịch bùn khoáng chất cùng nhau.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'N'); d.r(0, 11, 16, 1, 'n'); d.e(5, 8, 2, 2, 's'); d.r(3, 9, 4, 3, 'n'); d.e(11, 7.5, 2, 2, 's'); d.r(9, 8.5, 4, 3, 'N'); d.p('N', 4, 7, 5, 8, 10, 7, 11, 8); d.p('d', 4, 8, 6, 8, 10, 7, 12, 7); d.e(13, 2.5, 1.6, 1.6, 'y'); d.p('n', 3, 14, 8, 13, 12, 15); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'kr-gayageum', 'Gayageum', 'Gayageum', 'Đàn 12 dây gảy bằng ngón tay, có từ vương quốc Gaya khoảng thế kỷ 6. Tiếng đàn trong và mềm.',
  d => { d.r(0, 6, 16, 5, 'n'); d.r(0, 6, 16, 1, 't'); d.r(0, 10, 16, 1, 'N'); for (let y = 7; y < 10; y++) d.r(1, y, 14, 1, y % 2 ? 'w' : 'e'); for (let x = 3; x < 14; x += 2) d.p('r', x, 8); d.r(0, 11, 3, 3, 'N'); d.r(13, 11, 3, 3, 'N'); d.p('y', 1, 6, 14, 6); }, { use: 'hold' });
add(G, B, 'kr-geomungo', 'Geomungo', 'Geomungo', 'Đàn dài sáu dây, gảy bằng que tre, tiếng trầm và sâu. Từ xưa được các học giả ưa chuộng.',
  d => { d.r(0, 7, 16, 4, 'N'); d.r(0, 7, 16, 1, 'n'); for (let i = 0; i < 6; i++) d.r(1, 8 + (i % 3), 14, 1, 'y'); d.r(4, 7, 1, 4, 'e'); d.r(8, 7, 1, 4, 'e'); d.r(12, 7, 1, 4, 'e'); d.l(2, 3, 9, 6, 't'); d.r(0, 11, 2, 3, 'N'); d.r(14, 11, 2, 3, 'N'); }, { use: 'hold' });
add(G, B, 'kr-haegeum', 'Haegeum', 'Haegeum', 'Nhị hai dây kéo bằng cung, âm thanh cao, mỏng và da diết, thường đóng vai chính trong dàn nhạc cung đình.',
  d => { d.l(8, 0, 8, 11, 'N'); d.l(9, 0, 9, 11, 'n'); d.e(8.5, 12.5, 3, 2.4, 'N'); d.e(8.5, 12.5, 2, 1.4, 'e'); d.l(7, 3, 7, 10, 'w'); d.l(10, 3, 10, 10, 'w'); d.l(2, 4, 14, 10, 'n'); d.l(2, 5, 14, 11, 'N'); d.p('r', 8, 1); }, { use: 'hold' });
add(G, B, 'kr-janggu', 'Janggu', 'Janggu', 'Trống hình đồng hồ cát hai mặt: một tay cầm dùi gõ, một tay vỗ. Tạo nhịp nền cho nhạc dân gian.',
  d => { d.e(3.5, 8, 3.4, 5.4, 'N'); d.e(12.5, 8, 3.4, 5.4, 'N'); d.r(4, 6, 8, 4, 'r'); d.r(4, 6, 8, 1, 'R'); d.e(3.5, 8, 2.4, 4.2, 'e'); d.e(12.5, 8, 2.4, 4.2, 'e'); for (let x = 4; x < 12; x += 2) d.l(x, 4, x + 1, 12, 'y'); d.l(1, 13, 5, 15, 'n'); d.l(11, 13, 15, 15, 'n'); }, { use: 'hold' });

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'kr-pansori', 'Pansori', 'Pansori', 'Một người hát kể chuyện dài kèm một người đánh trống buk. UNESCO công nhận năm 2003.',
  d => { d.bg('t'); d.e(5, 4.5, 2.4, 2.6, 's'); d.r(2, 2, 6, 2, 'd'); d.r(2, 7, 6, 7, 'p'); d.r(2, 7, 6, 1, 'w'); d.l(7, 8, 11, 6, 's'); d.r(10, 5, 4, 2, 'w'); d.p('r', 3, 5); d.e(12, 11, 3, 2.6, 'n'); d.e(12, 11, 2, 1.8, 'e'); d.l(11, 8, 12, 9, 'n'); d.p('k', 4, 4, 6, 4); }, SC);
add(G, C, 'kr-samulnori', 'Samulnori', 'Samulnori', 'Biểu diễn bằng bốn nhạc cụ janggu, buk, kkwaenggwari và jing, gợi tiếng sấm, mưa, mây, gió. Ra đời năm 1978.',
  d => { d.bg('B'); d.e(4, 10, 3.2, 3.2, 'r'); d.e(4, 10, 2.2, 2.2, 'e'); d.e(12, 10, 3.2, 3.2, 'y'); d.e(12, 10, 2.2, 2.2, 'Y'); d.e(8, 4, 3, 3, 'a'); d.e(8, 4, 1.4, 1.4, 'w'); d.l(1, 14, 4, 13, 'n'); d.l(15, 14, 12, 13, 'n'); d.p('c', 1, 2, 14, 3, 4, 3, 12, 1); d.p('w', 6, 7, 10, 7); }, SC);
add(G, C, 'kr-talchum', 'Talchum (múa mặt nạ)', 'Talchum (mask dance)', 'Điệu múa đeo mặt nạ, vừa hài hước vừa châm biếm giới quý tộc và nhà sư. Làng Hahoe nổi tiếng nhất với các mặt nạ này.',
  d => { d.e(8, 8, 5.6, 6.6, 'c'); d.e(8, 8.5, 5, 6, 'n'); d.r(4, 3, 8, 2, 'N'); d.p('k', 5, 6, 6, 6, 10, 6, 11, 6); d.r(5, 6, 2, 1, 'k'); d.r(9, 6, 2, 1, 'k'); d.l(8, 7, 8, 9, 'N'); d.r(5, 11, 6, 2, 'k'); d.r(6, 11, 4, 1, 'r'); d.p('w', 6, 12, 9, 12); d.p('r', 4, 9, 11, 9); }, { use: 'wear' });
add(G, C, 'kr-buchaechum', 'Buchaechum (múa quạt)', 'Buchaechum (fan dance)', 'Điệu múa quạt với những chiếc quạt sặc sỡ, khi xòe ra như hoa, khi gập lại như sóng.',
  d => { d.bg('P'); d.fan(5, 12, 6, 'p'); d.fan(11, 12, 6, 'x'); for (let a = 0; a <= 4; a++) { const t = Math.PI * (0.1 + a * 0.2); d.l(5, 12, 5 - Math.round(Math.cos(t) * 6), 12 - Math.round(Math.sin(t) * 6), 'P'); d.l(11, 12, 11 - Math.round(Math.cos(t) * 6), 12 - Math.round(Math.sin(t) * 6), 'r'); } d.fan(5, 12, 2, 'w'); d.fan(11, 12, 2, 'w'); d.r(4, 12, 2, 3, 'N'); d.r(10, 12, 2, 3, 'N'); }, SC);
add(G, C, 'kr-taekwondo', 'Taekwondo', 'Taekwondo', 'Võ thuật đá chân của Hàn Quốc, trở thành môn thi đấu chính thức của Olympic từ năm 2000. "Tae" là đá, "kwon" là đấm, "do" là đạo.',
  d => { d.bg('l'); d.e(7, 4, 2.2, 2.2, 's'); d.r(4, 1, 6, 2, 'd'); d.r(5, 6, 4, 5, 'w'); d.r(5, 9, 4, 1, 'k'); d.l(9, 7, 14, 6, 'w'); d.l(9, 8, 14, 7, 'w'); d.p('s', 15, 6); d.l(6, 11, 4, 15, 'w'); d.l(8, 11, 14, 11, 'w'); d.l(8, 12, 14, 12, 'w'); d.p('s', 15, 11, 15, 12); d.p('k', 6, 4); }, SC);

// ----- Nghệ thuật truyền thống khác -----
add(G, E, 'kr-hangeul', 'Hangeul (chữ Hàn)', 'Hangeul (Korean alphabet)', 'Chữ viết do vua Sejong cùng các học giả tạo ra, công bố năm 1446. Có 14 phụ âm và 10 nguyên âm cơ bản, hình dạng phụ âm mô phỏng vị trí lưỡi và miệng khi phát âm.',
  d => { d.bg('e'); d.r(1, 1, 14, 14, 'u'); d.r(2, 2, 12, 12, 'e'); d.r(3, 3, 4, 1, 'd'); d.r(3, 3, 1, 5, 'd'); d.r(9, 3, 1, 5, 'd'); d.r(9, 5, 4, 1, 'd'); d.r(4, 10, 8, 1, 'd'); d.e(8, 12.5, 2.4, 1.4, 'd'); d.e(8, 12.5, 1.2, 0.6, 'e'); d.p('r', 13, 13); }, SC);
add(G, E, 'kr-celadon', 'Gốm men ngọc Goryeo', 'Goryeo celadon', 'Gốm men ngọc xanh nhạt thời Goryeo, nổi tiếng thế giới với kỹ thuật khảm sanggam, đưa hoa văn trắng đen vào lòng men.',
  d => { d.e(8, 9, 5.6, 6, 'h'); d.r(0, 0, 16, 3, '_'); d.r(6, 2, 4, 3, 'h'); d.r(5, 2, 6, 1, 'g'); d.e(8, 10, 4.6, 4.8, 'h'); d.r(6, 14, 4, 1, 'g'); d.p('d', 6, 8, 8, 10, 10, 8, 7, 11, 9, 11); d.p('w', 7, 8, 9, 10, 8, 9, 6, 10); d.p('g', 3, 9, 12, 9, 5, 12); }, { use: 'hold' });
add(G, E, 'kr-minhwa', 'Tranh dân gian Minhwa', 'Minhwa folk painting', 'Tranh dân gian hay vẽ hổ và chim khách (kkachi-horangi): hổ xua đuổi tà ma, chim khách báo tin vui.',
  d => { d.bg('t'); d.r(1, 1, 14, 14, 'u'); d.e(8, 10, 4.6, 3.2, 'o'); d.e(12, 6.5, 2.4, 2.2, 'o'); d.p('d', 6, 9, 8, 11, 10, 9, 5, 11, 7, 12, 11, 7, 13, 6); d.p('w', 12, 8, 11, 6); d.p('d', 11, 6, 13, 6, 12, 8); d.l(2, 14, 14, 14, 'G'); d.e(4, 4, 2, 1.4, 'd'); d.e(5, 4, 1, 0.8, 'w'); d.l(3, 6, 6, 8, 'N'); d.p('k', 2, 4); }, { scene: true });
add(G, E, 'kr-najeon', 'Najeon chilgi (sơn mài khảm xà cừ)', 'Najeon chilgi (mother-of-pearl lacquerware)', 'Nghệ thuật khảm vỏ xà cừ lên sơn mài đen, tạo ra những chiếc hộp và bàn lấp lánh tinh xảo.',
  d => { d.r(2, 5, 12, 8, 'd'); d.r(2, 5, 12, 1, 'K'); d.r(2, 12, 12, 1, 'K'); for (const [x, y, c] of [[4, 7, 'c'], [7, 8, 'p'], [10, 7, 'c'], [5, 10, 'p'], [9, 10, 'u'], [12, 9, 'c'], [3, 9, 'u']]) d.p(c, x, y, x + 1, y + 1); d.l(3, 6, 13, 6, 'w'); d.p('y', 7, 5, 8, 5); d.r(3, 13, 2, 2, 'd'); d.r(11, 13, 2, 2, 'd'); }, { use: 'hold' });

// ----- Văn hóa hiện đại -----
add(G, F, 'kr-kpop', 'K-pop', 'K-pop', 'Nhạc pop Hàn kết hợp âm nhạc, vũ đạo và hình ảnh. Các công ty giải trí thường đào tạo thực tập sinh nhiều năm trước khi họ ra mắt.',
  d => { d.bg('P'); d.e(8, 9, 5, 5, 'p'); d.r(7, 1, 2, 4, 'a'); d.e(8, 6, 3, 3, 'l'); d.r(7, 9, 2, 6, 'a'); for (const [x, y] of [[2, 3], [13, 2], [14, 8], [1, 9]]) d.p('y', x, y, x + 1, y, x - 1, y, x, y - 1, x, y + 1); d.p('A', 6, 5, 8, 7, 10, 5); d.p('w', 5, 4); }, { use: 'hold' });
add(G, F, 'kr-kdrama', 'K-drama', 'K-drama', 'Phim truyền hình Hàn Quốc, lan ra toàn cầu nhờ các nền tảng chiếu trực tuyến. Một mùa thường chỉ khoảng 16 tập.',
  d => { d.r(1, 2, 14, 10, 'd'); d.r(2, 3, 12, 8, 'B'); d.r(2, 3, 12, 3, 'c'); d.e(8, 8, 2, 2, 'p'); d.e(5, 8.5, 1.8, 1.8, 'x'); d.r(3, 10, 10, 1, 'b'); d.r(5, 12, 6, 1, 'a'); d.r(4, 13, 8, 1, 'A'); d.p('r', 13, 4); d.p('w', 3, 4); }, SC);
add(G, F, 'kr-parasite', 'Parasite (Ký sinh trùng)', 'Parasite', 'Bộ phim của đạo diễn Bong Joon-ho, năm 2020 thắng giải Oscar Phim hay nhất, là phim không nói tiếng Anh đầu tiên đạt giải này.',
  d => { d.bg('d'); d.r(2, 2, 12, 12, 'K'); d.r(3, 3, 10, 5, 'a'); d.r(3, 8, 10, 5, 'A'); d.r(5, 8, 3, 5, 'e'); d.r(9, 8, 4, 3, 'e'); d.p('k', 6, 10, 10, 9); d.e(8, 5, 2, 2, 'y'); d.r(12, 0, 3, 2, 'y'); d.p('Y', 13, 1); d.p('w', 1, 1, 14, 14); }, { scene: true });
add(G, F, 'kr-webtoon', 'Webtoon', 'Webtoon', 'Truyện tranh đọc cuộn dọc trên điện thoại, đặc sản của Hàn Quốc. Nhiều bộ được chuyển thể thành phim và phim truyền hình.',
  d => { d.r(4, 0, 8, 16, 'd'); d.r(5, 1, 6, 14, 'w'); d.r(5, 1, 6, 4, 'c'); d.r(5, 6, 6, 3, 'l'); d.r(5, 10, 6, 5, 'x'); d.e(8, 3, 1.4, 1.4, 'p'); d.r(6, 7, 4, 1, 'd'); d.p('r', 7, 12, 9, 13); d.r(7, 15, 2, 1, 'a'); d.l(13, 4, 13, 10, 'a'); d.p('a', 12, 5, 14, 5, 12, 9, 14, 9); }, { use: 'hold' });
add(G, F, 'kr-noraebang', 'Noraebang', 'Noraebang', '"Phòng hát": phòng karaoke riêng, nơi bạn bè và đồng nghiệp cùng hát sau buổi ăn hoặc buổi làm việc.',
  d => { d.bg('v'); d.r(2, 10, 12, 4, 'V'); d.e(8, 5, 2.6, 3, 'a'); d.e(8, 5, 1.8, 2.2, 'l'); d.r(7, 7, 2, 4, 'A'); d.r(7, 11, 2, 4, 'd'); d.p('y', 2, 2, 13, 3, 14, 8, 1, 7); d.p('p', 3, 4, 12, 6, 4, 12, 13, 12); d.r(1, 14, 14, 1, 'K'); d.p('c', 11, 2, 2, 12); }, { use: 'hold' });
