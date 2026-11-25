import { add, SC, setCC } from './pass-kit.js';
setCC('ar');
// Argentina · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', D = 'Hội họa và kiến trúc', E = 'Văn hóa hiện đại';
const H = { use: 'hold' };

// ----- Lễ hội -----
add(G, A, 'ar-carnaval', 'Carnaval ở Gualeguaychú', 'Carnival in Gualeguaychú', 'Lễ hội lớn ở tỉnh Entre Ríos vào các cuối tuần tháng Hai. Đoàn diễu hành có trang phục lông vũ và xe hoa như phiên bản nhỏ hơn của Brasil.',
  d => { d.bg('v'); d.p('y', 1, 1, 14, 2, 8, 0, 4, 3, 11, 1); d.e(8, 8, 3, 3, 's'); d.r(6, 11, 4, 4, 'p'); for (const [x, y, c] of [[5, 3, 'r'], [7, 1, 'y'], [9, 1, 'g'], [11, 3, 'b'], [6, 2, 'o'], [10, 2, 'p']]) d.r(x, y, 2, 5, c); d.p('k', 7, 8, 9, 8); d.p('r', 8, 10); d.p('y', 2, 12, 13, 12, 3, 14, 12, 14); }, SC);
add(G, A, 'ar-vendimia', 'Fiesta Nacional de la Vendimia', 'National Grape Harvest Festival', 'Lễ hội thu hoạch nho ở Mendoza vào đầu tháng Ba. Lễ có cuộc diễu hành, buổi biểu diễn ngoài trời và cuộc thi chọn nữ hoàng thu hoạch.',
  d => { d.bg('c'); d.tri(0, 4, 8, 7, 'a'); d.tri(8, 5, 8, 6, 'A'); d.r(0, 11, 16, 5, 'g'); d.e(8, 9, 3.4, 3.4, 'v'); d.e(6, 8, 1.4, 1.4, 'V'); d.e(10, 8, 1.4, 1.4, 'V'); d.e(8, 11, 1.4, 1.4, 'v'); d.l(8, 6, 8, 4, 'N'); d.p('G', 9, 5, 10, 4, 7, 4); d.p('y', 3, 13, 13, 14, 8, 15); }, SC);
add(G, A, 'ar-cosquin', 'Festival Nacional de Folklore Cosquín', 'Cosquín National Folklore Festival', 'Lễ hội nhạc dân gian lớn nhất đất nước, tổ chức ở Córdoba vào tháng Mười Hai hoặc tháng Giêng. Các nghệ sĩ dân gian biểu diễn trên một sân khấu lớn ngoài trời.',
  d => { d.bg('B'); d.p('y', 2, 1, 6, 3, 10, 1, 13, 3, 4, 5, 12, 6); d.r(2, 9, 12, 4, 'n'); d.r(1, 8, 14, 1, 'N'); d.r(3, 10, 2, 3, 'w'); d.r(7, 10, 2, 3, 'r'); d.r(11, 10, 2, 3, 'y'); d.p('s', 3, 9, 7, 9, 11, 9); d.p('y', 1, 14, 14, 14); d.r(0, 14, 16, 2, 'k'); d.p('w', 5, 12, 10, 12); }, SC);
add(G, A, 'ar-tradicion', 'Ngày Tradición (Ngày Truyền thống)', 'Day of Tradition', 'Ngày 10 tháng Mười Một tôn vinh văn hóa gaucho. Tại San Antonio de Areco, người ta diễu hành bằng ngựa và biểu diễn múa folklore.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(7, 10, 5, 2.6, 'n'); d.r(3, 11, 1, 4, 'N'); d.r(10, 11, 1, 4, 'N'); d.p('N', 11, 7, 12, 6, 12, 8); d.r(6, 5, 3, 4, 'e'); d.e(7, 4, 2, 1.4, 'N'); d.r(5, 4, 5, 1, 'N'); d.p('r', 6, 8, 8, 8); d.p('y', 13, 1, 2, 2); d.p('w', 2, 14, 12, 14); }, SC);
add(G, A, 'ar-9julio', 'Ngày Quốc khánh 9 tháng Bảy', 'Independence Day, 9 July', 'Kỷ niệm tuyên bố độc lập năm 1816 tại Tucumán. Nhiều gia đình dự lễ duyệt binh, ăn empanada và cờ trắng xanh dương treo khắp phố.',
  d => { d.bg('c'); d.r(0, 0, 16, 5, 'c'); d.r(0, 5, 16, 6, 'w'); d.r(0, 11, 16, 5, 'c'); d.e(8, 8, 2.2, 2.2, 'y'); for (let a = 0; a < 8; a++) { const t = a / 8 * 6.28; d.put(8 + Math.cos(t) * 3.4, 8 + Math.sin(t) * 3.4, 'o'); } d.r(1, 1, 1, 14, 'N'); d.p('Y', 1, 0); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'ar-bandoneonm', 'Bandoneón (linh hồn của tango)', 'Bandoneón (the soul of tango)', 'Đàn xếp giống accordion, âm thanh có chất buồn man và đa cảm. Nhạc cụ này ban đầu có nguồn gốc từ Đức trước khi đến Argentina.',
  d => { d.bg('e'); d.r(1, 3, 4, 10, 'k'); d.r(11, 3, 4, 10, 'k'); d.r(5, 4, 6, 8, 'W'); for (const x of [6, 7, 8, 9, 10]) d.r(x, 4, 1, 8, x % 2 ? 'w' : 'a'); d.p('w', 2, 4, 3, 6, 2, 8, 13, 4, 12, 6, 13, 8); d.p('y', 2, 5, 3, 7, 12, 5, 13, 7); d.r(5, 3, 6, 1, 'K'); d.r(5, 12, 6, 1, 'K'); }, H);
add(G, B, 'ar-guitarra', 'Guitar tây ban cầm (guitarra criolla)', 'Criolla guitar', 'Đàn guitar dây nylon của cao bồi, đệm cho nhạc folklore và đệm cho người hát kể chuyện. Nhiều người chơi đàn mỗi tối bên bếp lửa.',
  d => { d.bg('e'); d.e(5, 11, 4, 3.6, 'O'); d.e(7, 8, 3, 2.6, 'O'); d.e(5, 11, 1.4, 1.4, 'k'); d.l(8, 7, 13, 2, 'N'); d.l(9, 7, 14, 2, 'n'); d.r(12, 1, 3, 2, 'N'); d.p('y', 4, 9, 6, 12); d.p('k', 13, 1, 14, 3); d.p('w', 6, 9, 7, 8, 8, 9); }, H);
add(G, B, 'ar-bombo', 'Bombo legüero', 'Bombo legüero', 'Trống lớn làm từ thân cây rỗng và da, đánh bằng gậy có đầu chấm và gõ vào vành. Đây là nhịp tim của nhạc folklore Argentina.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'N'); d.e(8, 8, 5, 5, 'W'); d.e(8, 8, 3.6, 3.6, 'e'); d.p('n', 3, 5, 12, 6, 4, 11, 11, 11); d.l(2, 2, 7, 7, 'n'); d.e(2, 2, 1.2, 1.2, 'w'); d.l(14, 2, 9, 7, 'n'); d.e(14, 2, 1.2, 1.2, 'w'); d.p('r', 8, 8); }, H);
add(G, B, 'ar-charango', 'Charango', 'Charango', 'Đàn nhỏ mười dây làm từ một mảnh vỏ con armadillo hoặc gỗ, của vùng Andes. Âm thanh trong trẻo và thường chơi ở miền tây bắc.',
  d => { d.bg('e'); d.e(6, 11, 4, 3.8, 'n'); d.p('N', 4, 10, 6, 9, 8, 11, 5, 13, 7, 13, 9, 12); d.p('k', 6, 11); d.l(8, 9, 12, 2, 'N'); d.l(9, 9, 13, 2, 'n'); d.r(12, 0, 3, 2, 'N'); d.p('y', 5, 12, 8, 12); d.p('w', 12, 2); }, H);
add(G, B, 'ar-quena', 'Quena và zampoña', 'Quena and zampoña', 'Sáo và ống sáo pan của nhạc Andes, âm thanh như gió trên núi. Các đội nhạc đường phố thường biểu diễn chúng.',
  d => { d.bg('e'); for (let i = 0; i < 5; i++) { d.r(2 + i * 2, 8 - i, 2, 5 + i, i % 2 ? 'y' : 'Y'); } d.r(2, 12, 10, 1, 'N'); d.l(3, 3, 14, 5, 'n'); d.l(3, 4, 14, 6, 'N'); d.p('k', 6, 4, 8, 4, 10, 5); }, H);
add(G, B, 'ar-tangoband', 'Tango hiện đại', 'Modern tango', 'Ban nhạc tango kết hợp đàn dây, piano và bandoneón. Astor Piazzolla đã thêm yếu tố jazz và nhạc cổ điển vào thể loại này.',
  d => { d.bg('e'); d.r(1, 9, 8, 5, 'k'); d.r(1, 9, 8, 1, 'w'); for (let x = 2; x < 9; x += 2) d.r(x, 9, 1, 1, 'k'); d.r(10, 3, 5, 10, 'N'); d.r(11, 4, 3, 5, 'n'); d.e(12, 11, 1.4, 1.4, 'k'); d.l(10, 6, 14, 6, 'k'); d.r(2, 4, 4, 4, 'W'); d.p('k', 3, 5, 4, 6); d.p('y', 7, 3, 9, 2, 8, 5); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'ar-tangodance', 'Tango (điệu nhảy và thể loại nhạc)', 'Tango (dance and music)', 'Điệu nhảy và thể loại nhạc ra đời cuối thế kỷ XIX ở các khu cảng của Buenos Aires và Montevideo. UNESCO ghi nhận tango là di sản văn hóa phi vật thể năm 2009.',
  d => { d.bg('k'); d.e(5, 4, 1.6, 1.6, 's'); d.r(4, 6, 3, 6, 'd'); d.r(5, 12, 1, 3, 'd'); d.e(10, 4, 1.6, 1.6, 's'); d.r(8, 6, 4, 6, 'r'); d.tri(8, 10, 5, 5, 'r'); d.l(7, 7, 9, 7, 's'); d.p('y', 2, 2, 14, 2); d.p('w', 6, 7, 6, 8); d.r(0, 15, 16, 1, 'n'); }, SC);
add(G, C, 'ar-milonga', 'Milonga (vũ trường tango)', 'Milonga (the tango dance hall)', 'Vũ trường hoặc buổi nhảy tango, đồng thời là một điệu nhảy nhanh hơn. Nhiều vũ trường họp mỗi tối đến khuya.',
  d => { d.bg('K'); d.r(0, 12, 16, 4, 'N'); d.p('y', 3, 2, 8, 1, 12, 2); d.l(3, 0, 3, 2, 'k'); d.l(8, 0, 8, 1, 'k'); d.l(12, 0, 12, 2, 'k'); d.e(4, 8, 1.4, 1.4, 's'); d.r(3, 9, 3, 4, 'p'); d.e(11, 8, 1.4, 1.4, 's'); d.r(10, 9, 3, 4, 'B'); d.p('w', 5, 6, 12, 6); d.p('y', 1, 14, 14, 14); }, SC);
add(G, C, 'ar-chacarera', 'Chacarera và zamba', 'Chacarera and zamba', 'Điệu nhảy folklore của vùng miền bắc, cùng đôi nhảy với khăn tay phe phẩy. Nhịp chacarera nhanh và vui, zamba chậm và duyên dáng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 't'); d.e(4, 6, 1.6, 1.6, 's'); d.r(3, 8, 3, 5, 'e'); d.r(3, 13, 1, 2, 'N'); d.r(5, 13, 1, 2, 'N'); d.e(11, 6, 1.6, 1.6, 's'); d.tri(9, 8, 5, 6, 'r'); d.l(6, 8, 9, 5, 'w'); d.p('w', 9, 4, 10, 3, 8, 4); d.p('y', 1, 2, 14, 2); }, SC);
add(G, C, 'ar-rock', 'Rock nacional', 'Rock nacional', 'Nhạc rock hát tiếng Tây Ban Nha bùng nổ từ những năm 1960 và 1970 với các ban nhạc như Soda Stereo và Charly García. Dòng nhạc này có ảnh hưởng lớn đến cả Nam Mỹ.',
  d => { d.bg('k'); d.p('y', 1, 1, 14, 2, 8, 0); d.l(2, 14, 11, 5, 'r'); d.l(3, 14, 12, 5, 'R'); d.e(5, 11, 2.4, 2, 'r'); d.e(5, 11, 1, 1, 'k'); d.r(11, 3, 3, 3, 'a'); d.r(12, 2, 1, 1, 'a'); d.p('w', 3, 9, 7, 8, 13, 9); d.p('o', 14, 12, 1, 12, 12, 14); }, SC);
add(G, C, 'ar-colon', 'Sân khấu Teatro Colón', 'Teatro Colón', 'Một trong những nhà hát opera đẹp nhất thế giới, ở trung tâm Buenos Aires và khai trương năm 1908. Nhà hát có âm hưởng được nhiều nghệ sĩ ca ngợi.',
  d => { d.bg('R'); d.r(0, 0, 16, 3, 'y'); d.r(1, 4, 14, 1, 'Y'); for (const x of [2, 5, 8, 11]) { d.r(x, 6, 2, 3, 'y'); d.r(x, 6, 2, 1, 'Y'); } d.r(0, 10, 16, 6, 'm'); d.fan(8, 15, 6, 'k'); d.r(6, 11, 4, 4, 'y'); d.p('r', 7, 12, 8, 13); d.p('w', 3, 12, 12, 12); }, SC);
add(G, C, 'ar-cine', 'Điện ảnh Argentina', 'Argentine cinema', 'Phim Argentina như "El secreto de sus ojos" đã thắng Oscar phim nước ngoài hay nhất năm 2010. Đất nước có ngành điện ảnh mạnh để so với quy mô.',
  d => { d.bg('k'); d.r(1, 2, 14, 12, 'd'); for (let y = 3; y < 13; y += 3) { d.r(1, y, 1, 2, 'w'); d.r(14, y, 1, 2, 'w'); } d.r(3, 3, 10, 10, 'a'); d.tri(6, 5, 5, 6, 'y'); d.e(8, 8, 1.2, 1.2, 'k'); d.p('Y', 6, 12, 10, 12); d.p('w', 4, 4, 11, 4); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, D, 'ar-colonarch', 'Teatro Colón và kiến trúc Buenos Aires', 'Teatro Colón and Buenos Aires architecture', 'Nhà hát lớn được xây theo phong cách châu Âu. Nhiều công trình trong thành phố mang dấu ấn Pháp, Ý và Tây Ban Nha.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 6, 12, 8, 'e'); d.tri(1, 3, 14, 3, 'A'); for (const x of [3, 6, 9, 12]) { d.r(x, 7, 1, 7, 'W'); } d.r(7, 11, 2, 3, 'N'); d.e(8, 3, 2, 2, 'a'); d.p('k', 4, 9, 10, 9, 13, 9); d.p('y', 8, 1); }, SC);
add(G, D, 'ar-ateneo', 'Hiệu sách El Ateneo Grand Splendid', 'El Ateneo Grand Splendid bookshop', 'Nhà hát cũ được cải tạo thành hiệu sách với trần vẽ tranh và ban công nhìn ra gian hàng chính. Đây thường được nhắc tới như một trong những hiệu sách đẹp nhất thế giới.',
  d => { d.bg('m'); d.fan(8, 4, 7, 'y'); d.fan(8, 4, 5.4, 'c'); d.p('w', 6, 2, 9, 1, 11, 3); d.r(1, 5, 14, 1, 'Y'); d.r(1, 6, 3, 8, 'N'); d.r(12, 6, 3, 8, 'N'); for (const y of [7, 9, 11, 13]) { d.r(1, y, 3, 1, 'y'); d.r(12, y, 3, 1, 'y'); } d.p('r', 2, 8, 13, 10); d.p('b', 3, 10, 12, 8); d.r(5, 12, 6, 3, 'n'); d.p('e', 6, 11, 9, 11); }, SC);
add(G, D, 'ar-casarosada', 'Casa Rosada', 'Casa Rosada', 'Tòa nhà màu hồng của chính quyền ở Plaza de Mayo. Nhiều cuộc mít tinh lớn trong lịch sử đã diễn ra trước tòa nhà này.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'w'); d.r(1, 6, 14, 8, 'p'); d.r(1, 5, 14, 1, 'P'); d.tri(5, 2, 6, 4, 'p'); d.r(7, 3, 2, 3, 'w'); for (const x of [2, 4, 10, 12]) { d.r(x, 8, 1, 3, 'w'); } d.r(6, 9, 4, 5, 'W'); d.r(7, 10, 2, 4, 'N'); d.p('c', 7, 1, 8, 1); d.l(13, 0, 13, 5, 'N'); d.p('w', 14, 1, 14, 2); }, SC);
add(G, D, 'ar-murals', 'Tranh tường và nghệ thuật đường phố', 'Murals and street art', 'Nhiều khu như Palermo và Colegiales phủ kín tranh tường màu sắc. Người dân coi đây là một phần của bản sắc thành phố.',
  d => { d.bg('a'); d.r(0, 14, 16, 2, 'K'); d.e(5, 7, 4, 4, 'y'); d.e(11, 8, 3.6, 3.6, 'p'); d.tri(2, 6, 4, 6, 'b'); d.tri(9, 4, 6, 7, 'g'); d.e(5, 6, 1, 1, 'k'); d.p('k', 4, 8, 6, 8); d.e(11, 7, 1, 1, 'w'); d.p('r', 2, 3, 13, 12, 8, 13); d.l(0, 13, 6, 12, 'o'); }, SC);
add(G, D, 'ar-pucara', 'Quilmes và Tilcara (Pucará)', 'Quilmes and Tilcara (the Pucará)', 'Những tàn tích của người bản địa trên cao nguyên miền bắc. Những bức tường đá cổ cho thấy lối xây dựng thời tiền Columbus.',
  d => { d.bg('c'); d.tri(0, 4, 16, 8, 'O'); d.r(0, 11, 16, 5, 't'); for (const [x, y, w] of [[2, 9, 4], [7, 8, 5], [3, 12, 5], [10, 11, 4]]) { d.r(x, y, w, 2, 'a'); d.r(x, y, w, 1, 'l'); d.p('A', x + 1, y + 1, x + 3, y + 1); } d.r(1, 7, 1, 5, 'G'); d.r(14, 6, 1, 6, 'G'); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);

// ----- Văn hóa hiện đại -----
add(G, E, 'ar-futbol', 'Bóng đá', 'Football', 'Môn thể thao đam mê nhất, đội tuyển vô địch World Cup năm 1978, 1986 và 2022. Nhiều gia đình chia thành phe Boca Juniors hoặc River Plate, hai đội thù truyền kiếp.',
  d => { d.bg('e'); d.e(8, 8, 6.4, 6.4, 'w'); d.e(8, 8, 2, 2, 'k'); d.p('k', 8, 3, 8, 13, 3, 6, 13, 6, 4, 11, 12, 11); d.l(8, 6, 8, 3, 'k'); d.l(6, 8, 3, 6, 'k'); d.l(10, 8, 13, 6, 'k'); d.p('c', 2, 8, 14, 8, 5, 13, 11, 13); d.p('W', 3, 12, 12, 12); }, H);
add(G, E, 'ar-supercasico', 'Supercásico', 'The Superclásico', 'Trận đấu giữa Boca Juniors và River Plate, được nhiều người coi là một trong những derby nóng nhất thế giới. Sân La Bombonera rực lửa với tiếng hát của cổ động viên.',
  d => { d.bg('B'); d.r(0, 0, 16, 3, 'y'); d.r(0, 3, 16, 3, 'b'); d.r(0, 6, 16, 3, 'y'); d.r(0, 11, 16, 5, 'g'); d.r(0, 9, 16, 2, 'W'); for (let x = 1; x < 16; x += 3) { d.e(x, 9, 1, 1, x % 2 ? 'r' : 'w'); } d.p('r', 2, 5, 8, 4, 13, 5); d.p('w', 4, 12, 11, 13); d.e(8, 13, 1.4, 1.4, 'w'); }, SC);
add(G, E, 'ar-pato', 'Pato (môn thể thao trên lưng ngựa)', 'Pato (the horseback sport)', 'Môn thể thao truyền thống trên lưng ngựa, kết hợp bóng rổ và polo, được công nhận là môn thể thao quốc gia chính thức. Ban đầu người gaucho chơi với một con vịt thật.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(6, 10, 5, 2.6, 'n'); d.r(2, 11, 1, 4, 'N'); d.r(9, 11, 1, 4, 'N'); d.p('N', 10, 7, 11, 6, 11, 8); d.r(5, 5, 3, 4, 'r'); d.e(6, 4, 1.4, 1.4, 's'); d.l(8, 6, 13, 3, 'w'); d.e(14, 3, 1.6, 1.6, 'y'); d.p('k', 14, 3); d.p('w', 2, 14, 12, 14); }, SC);
add(G, E, 'ar-polo', 'Polo', 'Polo', 'Argentina là cường quốc polo, với nhiều cầu thủ hàng đầu thế giới. Giải Abierto Argentino de Polo diễn ra ở Palermo.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(7, 9, 4.6, 2.6, 'N'); d.r(3, 10, 1, 4, 'k'); d.r(9, 10, 1, 4, 'k'); d.p('k', 10, 6, 11, 5, 10, 8); d.r(5, 4, 3, 4, 'b'); d.e(6, 3, 1.4, 1.4, 's'); d.l(8, 5, 14, 12, 'n'); d.e(14, 13, 1.2, 1.2, 'w'); d.p('w', 6, 2); d.p('b', 5, 1, 7, 1); }, SC);
add(G, E, 'ar-tech', 'Ngành công nghệ và phát triển game', 'Tech and game development', 'Buenos Aires có nhiều công ty phần mềm và khởi nghiệp. Người trẻ Argentina hào hứng với công nghệ và đổi mới.',
  d => { d.bg('B'); d.r(2, 3, 12, 8, 'k'); d.r(3, 4, 10, 6, 'c'); d.p('w', 4, 5, 6, 5, 4, 7, 5, 8); d.l(7, 9, 9, 6, 'g'); d.r(1, 12, 14, 2, 'a'); d.r(3, 14, 10, 1, 'A'); d.r(10, 4, 2, 2, 'y'); d.p('r', 11, 8); d.p('w', 5, 9, 10, 9); }, SC);
add(G, E, 'ar-cafetortoni', 'Ăn tối muộn và quán cà phê cổ', 'Late dinners and historic cafés', 'Bữa tối thường sau 9 giờ và bàn tiệc kéo dài. Các quán cà phê cổ như Café Tortoni là nơi gặp gỡ của văn nghệ sĩ.',
  d => { d.bg('N'); d.r(0, 0, 16, 3, 'n'); d.r(1, 1, 14, 1, 'y'); d.e(8, 6, 4, 2, 'y'); d.l(8, 4, 8, 2, 'k'); d.r(2, 11, 12, 1, 'W'); d.r(7, 12, 2, 3, 'k'); d.r(2, 9, 2, 2, 'w'); d.r(12, 9, 2, 2, 'w'); d.p('r', 3, 12, 12, 12); d.p('y', 3, 8, 12, 8); d.p('w', 8, 9); }, SC);
