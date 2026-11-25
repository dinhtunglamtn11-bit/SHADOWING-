import { add, SC, setCC } from './pass-kit.js';
setCC('nl');
// Hà Lan · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', D = 'Hội họa và kiến trúc', E = 'Văn hóa hiện đại';
const H = { use: 'hold' };

// ----- Lễ hội -----
add(G, A, 'nl-koningsdag', 'Koningsdag (Ngày của Vua)', 'Koningsdag (King\'s Day)', 'Ngày 27 tháng Tư, cả nước mặc màu cam và bán đồ cũ trên vỉa hè trong chợ trời vrijmarkt. Ngày lễ kỷ niệm sinh nhật của Vua Willem-Alexander, và không khí rất tưng bừng trên các kênh.',
  d => { d.bg('o'); d.r(0, 11, 16, 5, 'C'); d.r(0, 10, 16, 1, 'a'); for (const [x, c] of [[2, 'O'], [6, 'w'], [10, 'O'], [13, 'y']]) { d.e(x, 6, 1.2, 1.2, 's'); d.r(x - 1, 7, 3, 3, c); } d.p('w', 1, 1, 5, 2, 9, 1, 13, 3); d.l(0, 3, 15, 4, 'w'); d.p('r', 3, 3, 8, 3, 12, 4); d.p('b', 5, 3, 10, 3); }, SC);
add(G, A, 'nl-sinterklaas', 'Sinterklaas', 'Sinterklaas', 'Lễ hội mùa đông khởi đầu khi ông già Sinterklaas đến bằng tàu từ Tây Ban Nha vào giữa tháng Mười Một. Trẻ em nhận quà vào đêm 5 tháng Mười Hai.',
  d => { d.bg('r'); d.r(0, 13, 16, 3, 'R'); d.e(8, 6, 3, 3, 's'); d.tri(4, 0, 8, 5, 'r'); d.r(4, 4, 8, 1, 'y'); d.r(5, 7, 6, 4, 'w'); d.p('k', 7, 6, 9, 6); d.r(4, 10, 8, 6, 'r'); d.r(7, 10, 2, 6, 'y'); d.p('y', 6, 2, 8, 1, 10, 2); d.l(12, 5, 12, 13, 'N'); d.p('Y', 12, 4); }, SC);
add(G, A, 'nl-carnaval', 'Carnaval ở Maastricht và Limburg', 'Carnival in Maastricht and Limburg', 'Lễ hội hóa trang trước Mùa Chay, đặc biệt nổi tiếng ở miền nam. Người dân nhảy múa, đi diễu hành và uống bia nhiều ngày.',
  d => { d.bg('v'); d.e(5, 6, 2.4, 2.4, 's'); d.tri(3, 1, 5, 4, 'y'); d.r(3, 4, 5, 1, 'r'); d.p('k', 4, 6, 6, 6); d.r(3, 8, 5, 6, 'g'); d.e(11, 6, 2.4, 2.4, 's'); d.tri(9, 1, 5, 4, 'r'); d.r(9, 4, 5, 1, 'y'); d.p('k', 10, 6, 12, 6); d.r(9, 8, 5, 6, 'p'); d.p('y', 1, 2, 14, 2, 8, 0); d.p('o', 2, 12, 14, 11); }, SC);
add(G, A, 'nl-bloemencorso', 'Lễ hội hoa Bloemencorso Bollenstreek', 'The Bloemencorso Bollenstreek flower parade', 'Cuộc diễu hành xe hoa tulip và thủy tiên vào giữa mùa xuân. Những chiếc xe được trang trí bằng hàng triệu bông hoa.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 6, 12, 6, 'r'); for (let x = 3; x < 14; x += 2) for (let y = 6; y < 12; y += 2) d.put(x, y, ['y', 'p', 'v', 'o', 'w'][(x + y) % 5]); d.r(4, 3, 8, 3, 'y'); d.p('r', 6, 4, 9, 4); d.e(4, 13, 1.8, 1.8, 'k'); d.e(12, 13, 1.8, 1.8, 'k'); d.p('g', 3, 11, 12, 12); }, SC);
add(G, A, 'nl-ade', 'Amsterdam Dance Event', 'Amsterdam Dance Event', 'ADE (Amsterdam Dance Event) là hội nghị và lễ hội nhạc điện tử lớn nhất thế giới được tổ chức mỗi tháng Mười. Hàng ngàn nghệ sĩ và DJ chơi ở nhiều địa điểm trong thành phố.',
  d => { d.bg('k'); d.r(0, 12, 16, 4, 'K'); d.p('p', 1, 2, 14, 3, 8, 1); d.l(3, 0, 6, 11, 'c'); d.l(10, 0, 8, 11, 'y'); d.l(13, 0, 12, 11, 'p'); d.r(5, 7, 6, 4, 'a'); d.e(6, 9, 1.4, 1.4, 'k'); d.e(10, 9, 1.4, 1.4, 'k'); d.p('r', 8, 8); for (const x of [1, 4, 8, 12]) d.r(x, 12, 1, 3, 's'); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'nl-carillon', 'Carillon (chuông gõ nhạc)', 'Carillon', 'Nhạc cụ gồm nhiều chuông đồng treo trên tháp, đánh bằng bàn phím. Nhiều tháp chuông chơi nhạc vào ngày chợ ở trung tâm thành phố.',
  d => { d.bg('e'); d.r(2, 1, 12, 1, 'N'); for (const [x, h] of [[3, 3], [5, 4], [7, 5], [9, 4], [11, 3]]) { d.tri(x - 1, 2, 3, h, 'y'); d.r(x - 1, 2 + h, 3, 1, 'Y'); d.put(x, 3 + h, 'k'); } d.r(2, 11, 12, 3, 'N'); for (let x = 3; x < 14; x += 2) d.r(x, 12, 1, 2, 'w'); }, H);
add(G, B, 'nl-draaiorgel', 'Draaiorgel (đàn organ quay tay)', 'Draaiorgel (barrel organ)', 'Organ đường phố có trang trí sặc sỡ, chạy bằng bìa đục lỗ hoặc băng giấy. Tiếng nhạc vui nhộn thường vang lên ở Amsterdam.',
  d => { d.bg('e'); d.r(2, 4, 12, 9, 'r'); d.r(2, 4, 12, 1, 'R'); for (const x of [4, 7, 10]) d.r(x, 6, 2, 4, 'y'); d.r(5, 7, 1, 2, 'k'); d.r(8, 7, 1, 2, 'k'); d.e(4, 14, 2, 2, 'N'); d.e(12, 14, 2, 2, 'N'); d.p('Y', 3, 5, 12, 5); d.l(14, 8, 15, 6, 'k'); d.p('b', 5, 12, 10, 12); }, H);
add(G, B, 'nl-violin', 'Violin và đàn dây cổ điển', 'Violin and classical strings', 'Nhạc cụ dây trong nhạc sảnh và nhạc thất. Nhạc sĩ Jan Pieterszoon Sweelinck là người có ảnh hưởng lớn ở thời kỳ này.',
  d => { d.bg('e'); d.e(6, 10, 4, 4, 'O'); d.e(7, 6, 3, 2.6, 'O'); d.e(6, 8, 1.6, 1.6, 'k'); d.l(8, 4, 12, 0, 'N'); d.r(11, 0, 3, 2, 'N'); d.l(4, 10, 8, 13, 'w'); d.l(13, 6, 3, 14, 'N'); d.p('y', 6, 9, 7, 11); d.p('k', 5, 7, 8, 7); }, H);
add(G, B, 'nl-accordion', 'Accordion và nhạc dân gian', 'Accordion and folk music', 'Nhạc cụ phổ biến trong các quán bar nông thôn và trên thuyền. Bài hát dân gian được hát tập thể trong nhiều lễ hội.',
  d => { d.bg('e'); d.r(1, 3, 4, 10, 'R'); d.r(11, 3, 4, 10, 'R'); d.r(5, 4, 6, 8, 'W'); for (const x of [6, 8, 10]) d.r(x, 4, 1, 8, 'w'); d.p('y', 2, 5, 3, 7, 2, 9, 12, 5, 13, 7, 12, 9); d.p('w', 2, 4, 13, 4); d.r(5, 3, 6, 1, 'k'); d.r(5, 12, 6, 1, 'k'); }, H);
add(G, B, 'nl-synth', 'Âm nhạc điện tử (synth và bộ trộn)', 'Electronic music (synth and mixer)', 'Amsterdam là trung tâm nhạc điện tử với những DJ nổi tiếng thế giới. Nhiều câu lạc bộ đêm và lễ hội phát triển quanh thể loại này.',
  d => { d.bg('e'); d.r(1, 6, 14, 8, 'k'); d.r(1, 6, 14, 1, 'K'); for (let x = 2; x < 14; x += 2) d.r(x, 8, 1, 5, x % 4 ? 'w' : 'a'); d.r(3, 9, 1, 2, 'r'); d.r(7, 10, 1, 2, 'c'); d.r(11, 9, 1, 2, 'y'); d.p('g', 3, 7, 7, 7, 11, 7); d.p('p', 13, 7); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'nl-churchmusic', 'Nhạc hát nhà thờ và organ', 'Church singing and organ music', 'Truyền thống âm nhạc trong nhà thờ Tin Lành và Công giáo. Nhiều nhà thờ đã chuyển thành nơi biểu diễn.',
  d => { d.bg('k'); d.r(0, 13, 16, 3, 'N'); for (let x = 2; x < 14; x += 2) d.r(x, 2 + (x % 5), 1, 9 - (x % 5), 'a'); d.r(1, 11, 14, 2, 'n'); d.r(2, 12, 12, 1, 'w'); d.p('w', 3, 12, 5, 12); d.p('y', 2, 1, 14, 1, 8, 0); d.p('l', 4, 3, 10, 4); }, SC);
add(G, C, 'nl-concertgebouw', 'Concertgebouw', 'The Concertgebouw', 'Nhà hát giao hưởng ở Amsterdam nổi tiếng với âm hưởng tuyệt vời. Dàn nhạc Royal Concertgebouw là một trong những dàn nhạc hàng đầu thế giới.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 5, 12, 9, 'r'); d.tri(1, 2, 14, 3, 'w'); for (const x of [3, 6, 9, 12]) d.r(x, 6, 1, 7, 'w'); d.r(7, 10, 2, 4, 'N'); d.p('y', 4, 8, 11, 8); d.p('k', 5, 3, 10, 3); d.r(2, 5, 12, 1, 'R'); }, SC);
add(G, C, 'nl-ndt', 'Nederlands Dans Theater', 'Nederlands Dans Theater', 'Nhóm múa đương đại nổi tiếng, có trụ sở ở The Hague. Các buổi diễn nghệ thuật, ánh sáng và âm nhạc kết hợp tạo ấn tượng mạnh.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'k'); d.e(6, 3, 1.4, 1.4, 's'); d.l(6, 4, 6, 9, 'w'); d.l(6, 5, 2, 3, 'w'); d.l(6, 5, 10, 2, 'w'); d.l(6, 9, 3, 13, 'w'); d.l(6, 9, 9, 12, 'w'); d.e(12, 6, 1.4, 1.4, 's'); d.l(12, 7, 12, 11, 'p'); d.l(12, 8, 15, 6, 'p'); d.l(12, 8, 9, 6, 'p'); d.l(12, 11, 10, 14, 'p'); d.p('y', 1, 1, 14, 1); }, SC);
add(G, C, 'nl-cabaret', 'Sân khấu cabaret và hài kịch', 'Cabaret and comedy theatre', 'Truyền thống châm biếm và hài độc thoại, hay châm chích chính trị và xã hội. Nhiều nghệ sĩ bắt đầu sự nghiệp ở các quán cà phê nhỏ.',
  d => { d.bg('R'); d.r(0, 12, 16, 4, 'N'); d.r(2, 2, 12, 2, 'y'); d.fan(8, 5, 4, 'y'); d.e(8, 8, 1.8, 1.8, 's'); d.r(7, 10, 2, 3, 'k'); d.r(6, 9, 4, 1, 'k'); d.l(11, 7, 13, 5, 'W'); d.r(12, 3, 1, 3, 'a'); d.p('w', 3, 6, 12, 10); d.p('y', 1, 14, 14, 14); }, SC);
add(G, C, 'nl-cinema', 'Phim và điện ảnh Hà Lan', 'Dutch film and cinema', 'Đạo diễn Paul Verhoeven nổi tiếng với những phim gây tranh cãi. Phim tài liệu được quan tâm ở lễ hội IDFA ở Amsterdam.',
  d => { d.bg('k'); d.r(1, 2, 14, 12, 'd'); for (let y = 3; y < 13; y += 3) { d.r(1, y, 1, 2, 'w'); d.r(14, y, 1, 2, 'w'); } d.r(3, 3, 10, 10, 'a'); d.tri(6, 5, 5, 6, 'o'); d.e(8, 8, 1.2, 1.2, 'k'); d.p('Y', 6, 12, 10, 12); d.p('w', 4, 4, 11, 4); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, D, 'nl-rembrandt', 'Rembrandt', 'Rembrandt', 'Họa sĩ của Thời kỳ Hoàng kim Hà Lan thế kỷ XVII, nổi tiếng với ánh sáng và chân dung. Bức "Canh đêm" được trưng bày ở Rijksmuseum.',
  d => { d.bg('N'); d.r(0, 0, 16, 16, 'N'); d.e(8, 9, 6, 6, 'm'); d.e(8, 7, 2.6, 3, 's'); d.r(5, 3, 6, 2, 'k'); d.r(4, 4, 8, 1, 'k'); d.p('k', 7, 7, 9, 7); d.p('w', 6, 6, 10, 6); d.r(5, 11, 6, 5, 'k'); d.p('y', 8, 12, 7, 13); d.p('Y', 3, 14, 12, 14); }, SC);
add(G, D, 'nl-vermeer', 'Johannes Vermeer', 'Johannes Vermeer', 'Họa sĩ của những cảnh sinh hoạt trong nhà với ánh sáng dịu. "Cô gái đeo khuyên tai ngọc trai" là một trong những bức tranh được yêu thích nhất.',
  d => { d.bg('k'); d.e(8, 8, 3, 3.6, 's'); d.r(4, 3, 8, 3, 'b'); d.r(4, 5, 2, 5, 'b'); d.r(10, 5, 2, 7, 'y'); d.p('k', 7, 8, 9, 8); d.p('r', 8, 10); d.e(10, 11, 1, 1, 'w'); d.r(5, 12, 6, 4, 'W'); d.p('Y', 6, 3, 9, 4); }, SC);
add(G, D, 'nl-vangogh', 'Vincent van Gogh', 'Vincent van Gogh', 'Họa sĩ hậu ấn tượng sinh năm 1853 ở Hà Lan, với những nét cọ dày và màu rực. Bảo tàng Van Gogh ở Amsterdam lưu giữ bộ sưu tập lớn nhất của ông.',
  d => { d.bg('B'); d.e(12, 3, 2, 2, 'y'); d.p('y', 3, 2, 6, 4, 8, 1, 2, 6); d.p('c', 4, 5, 9, 3, 13, 7, 1, 4); d.r(0, 11, 16, 5, 'G'); for (let x = 1; x < 16; x += 3) { d.r(x, 8, 1, 6, 'y'); d.e(x, 7, 1.6, 1.6, 'o'); d.put(x, 7, 'N'); } d.p('g', 2, 13, 8, 14, 13, 13); }, SC);
add(G, D, 'nl-mondrian', 'Piet Mondrian và phong trào De Stijl', 'Piet Mondrian and De Stijl', 'Nghệ thuật trừu tượng với đường kẻ đen và ô màu đỏ, vàng, xanh. Phong cách này ảnh hưởng đến thiết kế và kiến trúc hiện đại.',
  d => { d.bg('w'); d.r(0, 0, 6, 9, 'r'); d.r(10, 12, 6, 4, 'b'); d.r(0, 12, 4, 4, 'y'); d.r(6, 0, 1, 16, 'k'); d.r(0, 9, 16, 1, 'k'); d.r(0, 11, 16, 1, 'k'); d.r(10, 0, 1, 16, 'k'); d.r(3, 12, 1, 4, 'k'); }, SC);
add(G, D, 'nl-escher', 'M. C. Escher', 'M. C. Escher', 'Nghệ sĩ đồ họa nổi tiếng với những cầu thang vô tận và hình lát gạch. Tác phẩm của ông gắn với toán học và ảo giác.',
  d => { d.bg('W'); for (let i = 0; i < 6; i++) { d.r(2 + i * 2, 11 - i, 2, 1 + i, 'a'); d.r(2 + i * 2, 11 - i, 2, 1, 'k'); } d.r(12, 3, 2, 9, 'a'); d.r(4, 2, 8, 1, 'a'); d.r(4, 2, 1, 4, 'a'); d.p('k', 4, 3, 12, 3, 5, 2, 11, 2); d.p('w', 3, 13, 9, 14, 13, 13); d.e(8, 6, 1.2, 1.2, 'k'); }, SC);
add(G, D, 'nl-modernarch', 'Kiến trúc hiện đại (Rotterdam và Amsterdam)', 'Modern architecture (Rotterdam and Amsterdam)', 'Nhà ga, cầu Erasmus và Markthal với trần tranh đồ sộ ở Rotterdam. Kiến trúc sư như Rem Koolhaas, MVRDV tạo dấu ấn.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.l(2, 11, 8, 2, 'w'); d.l(8, 2, 8, 11, 'w'); d.l(8, 2, 14, 11, 'w'); for (const x of [4, 6, 10, 12]) d.l(x, 11, 8, 3 + Math.abs(x - 8), 'W'); d.r(0, 11, 16, 1, 'a'); d.p('w', 3, 14, 11, 13); d.p('y', 8, 1); }, SC);

// ----- Văn hóa hiện đại -----
add(G, E, 'nl-football', 'Bóng đá và đội tuyển cam', 'Football and the orange team', 'Đội tuyển đã 3 lần vào chung kết World Cup (1974, 1978 và 2010) nhưng chưa vô địch. Johan Cruyff và "bóng đá toàn diện" là di sản nổi tiếng.',
  d => { d.bg('e'); d.e(8, 8, 6.4, 6.4, 'w'); d.e(8, 8, 2, 2, 'k'); d.p('k', 8, 3, 8, 13, 3, 6, 13, 6, 4, 11, 12, 11); d.l(8, 6, 8, 3, 'k'); d.l(6, 8, 3, 6, 'k'); d.l(10, 8, 13, 6, 'k'); d.p('o', 2, 8, 14, 8, 5, 13, 11, 13); d.p('O', 3, 12, 12, 12); }, H);
add(G, E, 'nl-skating', 'Trượt băng tốc độ', 'Speed skating', 'Môn thể thao mùa đông của đất nước với nhiều huân chương Olympic mùa đông. Người dân theo dõi giải châu lục như một lễ hội quốc gia.',
  d => { d.bg('l'); d.r(0, 11, 16, 5, 'c'); d.r(0, 11, 16, 1, 'w'); d.e(6, 3, 1.6, 1.6, 's'); d.r(4, 3, 5, 1, 'o'); d.l(6, 5, 8, 8, 'o'); d.l(8, 8, 5, 11, 'o'); d.l(8, 8, 12, 10, 'o'); d.l(6, 5, 3, 7, 'o'); d.l(4, 11, 13, 11, 'a'); d.l(2, 13, 9, 13, 'w'); d.p('w', 11, 3, 14, 6); }, SC);
add(G, E, 'nl-cycling', 'Văn hóa đạp xe và đạp xe thể thao', 'Cycling culture and road racing', 'Giải đua xe đạp và các đội đạp xe nổi tiếng với người hâm mộ. Nhiều người đạp xe để tập thể dục ngoài trời.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.l(0, 14, 15, 14, 'w'); d.e(4, 11, 2.6, 2.6, 'k'); d.e(12, 11, 2.6, 2.6, 'k'); d.e(4, 11, 1.6, 1.6, 'c'); d.e(12, 11, 1.6, 1.6, 'c'); d.l(4, 11, 7, 7, 'o'); d.l(7, 7, 12, 11, 'o'); d.l(4, 11, 9, 11, 'o'); d.e(8, 4, 1.6, 1.6, 's'); d.l(8, 5, 8, 8, 'o'); d.l(8, 8, 11, 9, 'o'); d.l(8, 6, 11, 7, 'o'); d.p('w', 1, 4, 14, 3); }, SC);
add(G, E, 'nl-design', 'Thiết kế Hà Lan và Dutch Design Week', 'Dutch design and Dutch Design Week', 'Tuần lễ thiết kế ở Eindhoven thu hút nhiều nhà sáng tạo. Thiết kế Hà Lan nổi tiếng với tính đơn giản và ý tưởng sáng tạo.',
  d => { d.bg('W'); d.r(2, 8, 5, 5, 'r'); d.e(11, 6, 3, 3, 'y'); d.tri(3, 2, 5, 5, 'b'); d.r(9, 10, 5, 3, 'k'); d.l(1, 14, 15, 14, 'k'); d.p('w', 4, 9, 11, 6, 5, 4); d.p('k', 7, 3, 12, 11); }, SC);
add(G, E, 'nl-tolerance', 'Văn hóa cởi mở và quyền bình đẳng', 'Openness and equal rights', 'Hà Lan là nước đầu tiên hợp pháp hóa hôn nhân đồng giới năm 2001. Đất nước được biết đến với sự khoan dung và tinh thần thẳng thắn.',
  d => { d.bg('c'); d.r(0, 3, 16, 2, 'r'); d.r(0, 5, 16, 2, 'o'); d.r(0, 7, 16, 2, 'y'); d.r(0, 9, 16, 2, 'g'); d.r(0, 11, 16, 2, 'b'); d.r(0, 13, 16, 2, 'v'); d.e(6, 8, 2, 2, 'w'); d.e(10, 8, 2, 2, 'w'); d.p('r', 5, 8, 11, 8); d.l(0, 3, 0, 15, 'N'); d.p('y', 14, 1); }, SC);
