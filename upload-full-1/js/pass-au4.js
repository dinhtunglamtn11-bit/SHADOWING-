import { add, SC, setCC } from './pass-kit.js';
setCC('au');
// Úc · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ và nghệ thuật biểu diễn', C = 'Hội họa và kiến trúc', E = 'Văn hóa hiện đại';
const H = { use: 'hold' };

// ----- Lễ hội -----
add(G, A, 'au-anzacday', 'Ngày Anzac (25/4)', 'Anzac Day (April 25)', 'Ngày tưởng nhớ những người lính Úc và New Zealand đổ bộ ở Gallipoli năm 1915. Lễ bắt đầu từ lúc bình minh với nghi thức mặc niệm, và hoa poppy đỏ là biểu tượng.',
  d => { d.bg('B'); d.e(8, 14, 8, 4, 'o'); d.r(0, 14, 16, 2, 'k'); d.l(8, 15, 8, 8, 'g'); for (let i = 0; i < 5; i++) { const a = i * 1.2566; d.e(8 + Math.cos(a) * 1.8, 6 + Math.sin(a) * 1.8, 1.4, 1.4, 'r'); } d.e(8, 6, 0.9, 0.9, 'k'); d.p('w', 2, 2, 13, 3); }, SC);
add(G, A, 'au-ausday2', 'Ngày Australia (26/1)', 'Australia Day (January 26)', 'Ngày quốc khánh kỷ niệm ngày đoàn tàu đầu tiên cập bến Sydney năm 1788. Nhiều người thổ dân gọi đây là "Ngày xâm lăng" (Invasion Day) và tổ chức biểu tình để tưởng nhớ.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 9, 8, 2, 'N'); d.l(5, 9, 5, 3, 'n'); d.l(9, 9, 9, 4, 'n'); d.tri(3, 3, 4, 5, 'w'); d.tri(8, 4, 4, 4, 'w'); d.p('b', 2, 14, 12, 13); d.r(12, 2, 3, 2, 'b'); d.p('w', 13, 2); d.p('r', 14, 3); }, SC);
add(G, A, 'au-melbcup', 'Giải Melbourne Cup (thứ Ba đầu tháng 11)', 'Melbourne Cup (first Tuesday in November)', 'Cuộc đua ngựa nổi tiếng nhất nước, gọi là "cuộc đua dừng cả đất nước". Người xem mặc đồ đẹp và đội mũ trang trí.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'h'); d.e(6, 9, 4, 2.6, 'n'); d.e(10, 6, 1.8, 1.8, 'n'); d.l(9, 8, 10, 5, 'n'); d.r(4, 10, 1, 4, 'N'); d.r(8, 10, 1, 4, 'N'); d.e(11, 4, 2.6, 0.8, 'p'); d.p('p', 11, 3); d.p('y', 2, 3, 14, 2, 13, 8); }, SC);
add(G, A, 'au-vivid', 'Vivid Sydney', 'Vivid Sydney', 'Lễ hội ánh sáng, âm nhạc và ý tưởng diễn ra mỗi năm vào mùa đông, chiếu ánh sáng lên Nhà hát Con ốc và các tòa nhà. Đây là một trong những sự kiện đông khách nhất thành phố.',
  d => { d.bg('k'); d.r(0, 12, 16, 4, 'B'); d.tri(1, 4, 6, 8, 'v'); d.tri(5, 3, 6, 9, 'p'); d.tri(9, 5, 6, 7, 'c'); d.p('y', 3, 8, 8, 6, 12, 8); d.p('g', 6, 9, 10, 10); d.p('w', 2, 2, 13, 2); d.p('p', 3, 14, 8, 14, 12, 14); }, SC);
add(G, A, 'au-mardigras', 'Mardi Gras Sydney', 'Sydney Mardi Gras', 'Cuộc diễu hành rực rỡ do cộng đồng LGBTQ+ (các nhóm người đồng tính, song tính và chuyển giới) tổ chức từ năm 1978. Đây là một trong những cuộc diễu hành lớn nhất thế giới.',
  d => { d.bg('k'); ['r', 'o', 'y', 'g', 'b', 'v'].forEach((c, i) => d.r(1, 2 + i * 2, 14, 2, c)); d.p('w', 3, 1, 12, 14); }, SC);
add(G, A, 'au-garma', 'Lễ hội Garma', 'Garma Festival', 'Lễ hội văn hóa Yolngu ở Arnhem Land với âm nhạc, nhảy múa và thảo luận. Đây là dịp để chia sẻ văn hóa thổ dân với người ngoài.',
  d => { d.bg('O'); d.r(0, 12, 16, 4, 'R'); d.e(4, 6, 1.4, 1.4, 's'); d.r(3, 8, 3, 4, 'e'); d.p('k', 3, 9, 5, 9); d.e(11, 6, 1.4, 1.4, 's'); d.r(10, 8, 3, 4, 'e'); d.p('k', 10, 10, 12, 10); d.tri(6, 3, 4, 8, 'o'); d.tri(7, 6, 2, 5, 'y'); d.p('y', 2, 2, 14, 3); }, SC);
add(G, A, 'au-naidoc', 'Tuần lễ NAIDOC', 'NAIDOC Week', 'Tuần lễ tháng 7 tôn vinh lịch sử và thành tựu của người Aboriginal và Torres Strait Islander. NAIDOC là viết tắt của National Aborigines and Islanders Day Observance Committee (Ủy ban Kỷ niệm Ngày Thổ dân và Đảo dân Quốc gia).',
  d => { d.bg('k'); d.r(1, 2, 14, 4, 'K'); d.r(1, 6, 14, 4, 'r'); d.r(1, 10, 14, 4, 'k'); d.e(8, 8, 3, 3, 'y'); d.r(1, 2, 14, 4, 'k'); d.r(1, 6, 14, 4, 'r'); d.r(1, 10, 14, 4, 'k'); d.e(8, 8, 3, 3, 'y'); d.p('K', 1, 1, 14, 1); }, SC);
add(G, A, 'au-afl2', 'Chung kết AFL (tháng 9)', 'AFL Grand Final (September)', 'Trận chung kết bóng bầu dục Úc ở sân MCG, Melbourne, thu hút hơn 90.000 người. AFL là viết tắt của Australian Football League (Giải Bóng bầu dục Úc).',
  d => { d.bg('g'); d.e(8, 8, 7, 5, 'h'); d.e(8, 8, 5.6, 3.6, 'g'); d.e(8, 8, 2.4, 3.4, 'n'); d.p('w', 8, 6, 8, 8, 7, 7, 9, 7, 7, 9, 9, 9); d.r(0, 1, 16, 2, 'a'); d.r(0, 13, 16, 3, 'a'); d.p('y', 2, 2, 5, 2, 8, 2, 11, 2, 14, 2); }, SC);

// ----- Nhạc cụ và nghệ thuật biểu diễn -----
add(G, B, 'au-yidaki', 'Didgeridoo (yidaki)', 'Didgeridoo (yidaki)', 'Ống kèn dài của người Yolngu ở Bắc Úc, tạo tiếng vọng trầm bằng thở vòng. Theo truyền thống, phụ nữ ít khi chơi trong các nghi lễ.',
  d => { d.bg('e'); d.l(2, 3, 13, 14, 'n'); d.l(3, 3, 14, 14, 'N'); d.l(1, 2, 3, 2, 'N'); d.p('r', 5, 6, 8, 8, 11, 11); d.p('y', 6, 6, 9, 9, 12, 12); d.p('w', 4, 5, 7, 7, 10, 10); d.e(14, 14, 1.6, 1.6, 'N'); }, H);
add(G, B, 'au-clapsticks', 'Clapsticks', 'Clapsticks', 'Hai que gỗ gõ vào nhau để giữ nhịp cho bài hát và điệu nhảy thổ dân. Người hát thường kể chuyện qua lời ca.',
  d => { d.bg('e'); d.l(2, 13, 11, 4, 'n'); d.l(3, 13, 12, 4, 'N'); d.l(5, 14, 14, 6, 'n'); d.l(6, 14, 15, 6, 'N'); d.p('r', 5, 10, 9, 8, 9, 11, 12, 9); d.p('y', 6, 9, 10, 9, 8, 12); d.p('w', 4, 12, 11, 7); }, H);
add(G, B, 'au-songline', 'Songlines (đường ca)', 'Songlines', 'Những bài ca kể đường đi của các tổ tiên khi tạo ra đất đai, đồng thời giúp người đi đường ghi nhớ nước và địa hình. Đây là một dạng bản đồ truyền miệng.',
  d => { d.bg('O'); d.r(0, 0, 16, 16, 'o'); d.l(1, 13, 5, 8, 'k'); d.l(5, 8, 9, 10, 'k'); d.l(9, 10, 14, 3, 'k'); d.e(5, 8, 1.6, 1.6, 'y'); d.e(9, 10, 1.6, 1.6, 'w'); d.e(14, 3, 1.6, 1.6, 'r'); d.p('y', 2, 3, 12, 13, 3, 6, 11, 7); d.p('w', 7, 4, 4, 13, 13, 9); }, SC);
add(G, B, 'au-corroboree', 'Corroboree', 'Corroboree', 'Buổi họp mặt cộng đồng với nhảy, hát và vẽ cơ thể. Mỗi nhóm có phong cách biểu diễn riêng.',
  d => { d.bg('k'); d.tri(4, 6, 8, 8, 'o'); d.tri(6, 8, 4, 6, 'y'); for (const [x, c] of [[2, 'r'], [13, 'b']]) { d.e(x, 5, 1.2, 1.2, 's'); d.r(x - 1, 6, 2, 5, 'n'); d.p('w', x - 1, 7, x, 9, x - 1, 10, x, 11); d.p('w', x - 1, 7); } d.p('y', 3, 1, 12, 2); d.r(0, 14, 16, 2, 'N'); }, SC);
add(G, B, 'au-bush', 'Violin và accordion trong nhạc bush', 'Fiddle and accordion in bush music', 'Nhạc dân gian nông thôn kết hợp đàn violin, guitar và accordion, kể chuyện người chăn nuôi. Bài "Waltzing Matilda" là ví dụ nổi tiếng.',
  d => { d.bg('e'); d.e(5, 9, 3.4, 4, 'n'); d.e(5, 9, 1.6, 1.8, 'k'); d.l(5, 5, 5, 1, 'N'); d.l(2, 14, 11, 4, 'k'); d.r(10, 7, 3, 7, 'r'); d.r(13, 7, 2, 7, 'R'); for (let y = 8; y < 14; y += 2) d.r(10, y, 3, 1, 'w'); }, H);
add(G, B, 'au-rock', 'Nhạc rock và pop Úc', 'Australian rock and pop', 'Các nhóm như AC/DC, INXS và Midnight Oil là biểu tượng của nhạc rock Úc. Nhiều nhóm nổi lên từ các quán rượu ở Sydney và Melbourne.',
  d => { d.bg('k'); d.l(3, 14, 10, 4, 'n'); d.l(4, 14, 11, 4, 'N'); d.r(9, 2, 4, 3, 'N'); d.r(2, 12, 5, 3, 'r'); d.p('w', 3, 13, 5, 13); d.p('y', 12, 8, 14, 5, 2, 3, 6, 6); d.tri(11, 9, 4, 5, 'y'); d.p('k', 13, 11); }, SC);
add(G, B, 'au-poetry', 'Ngôn ngữ và thơ ca', 'Language and poetry', 'Những nhà thơ bush như Banjo Paterson và Henry Lawson kể về đời sống ngoại ô. Chúng là nền tảng cho một bản sắc dân gian.',
  d => { d.bg('u'); d.r(2, 3, 5, 10, 'N'); d.r(7, 3, 7, 10, 'o'); d.r(3, 4, 3, 1, 'y'); d.r(8, 5, 5, 1, 'w'); d.r(8, 7, 4, 1, 'w'); d.r(8, 9, 5, 1, 'w'); d.r(2, 13, 12, 1, 'k'); d.l(12, 1, 10, 3, 'a'); d.p('R', 12, 1); }, SC);
add(G, B, 'au-operaballet', 'Nhà hát Opera và ba lê Úc', 'Australian opera and ballet', 'Opera Australia và The Australian Ballet biểu diễn ở Nhà hát Con ốc và nhiều nơi khác. Nhiều giọng ca sĩ Úc nổi tiếng thế giới, như Joan Sutherland.',
  d => { d.bg('P'); d.r(0, 13, 16, 3, 'V'); d.e(8, 5, 1.4, 1.4, 's'); d.r(7, 7, 2, 3, 'w'); d.tri(4, 9, 8, 4, 'w'); d.l(7, 7, 3, 5, 'w'); d.l(9, 7, 13, 4, 'w'); d.r(7, 13, 2, 1, 'x'); d.p('y', 2, 2, 14, 2, 8, 1); d.p('p', 6, 6, 10, 6); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, C, 'au-dotart', 'Tranh chấm (dot painting) của người Western Desert', 'Western Desert dot painting', 'Lối vẽ bằng những chấm màu, bắt đầu nổi tiếng từ Papunya năm 1971. Nhiều hình vẽ kể chuyện Dreaming mà không tiết lộ những chi tiết thiêng liêng.',
  d => { d.bg('O'); for (let y = 1; y < 16; y += 2) for (let x = 1; x < 16; x += 2) d.p(((x + y) / 2) % 3 === 0 ? 'y' : ((x + y) / 2) % 3 === 1 ? 'w' : 'r', x, y); d.e(8, 8, 3, 3, 'k'); d.e(8, 8, 1.6, 1.6, 'y'); d.p('w', 8, 8); }, SC);
add(G, C, 'au-barkart', 'Tranh vỏ cây và tranh đá', 'Bark and rock paintings', 'Tranh vẽ trên vỏ cây bạch đàn ở Arnhem Land và trên vách đá ở Kakadu. Một số bức tranh đá được cho là có tuổi rất cao.',
  d => { d.bg('n'); d.r(1, 1, 14, 14, 'N'); d.e(8, 8, 4, 3, 'w'); d.p('k', 5, 8, 11, 8); d.l(5, 8, 3, 11, 'w'); d.l(11, 8, 13, 11, 'w'); d.p('r', 8, 7, 8, 9); d.p('y', 3, 3, 13, 3, 2, 13, 14, 13); d.p('w', 4, 5, 12, 12); }, SC);
add(G, C, 'au-heidelberg', 'Trường phái Heidelberg', 'Heidelberg School', 'Nhóm họa sĩ cuối thế kỷ 19 như Tom Roberts và Arthur Streeton vẽ ánh sáng và cảnh bush ngoài trời. Họ góp phần tạo nên một phong cách Úc riêng.',
  d => { d.bg('c'); d.r(0, 3, 16, 5, 'u'); d.e(12, 4, 1.6, 1.6, 'y'); d.r(0, 8, 16, 8, 'y'); d.e(4, 11, 4, 2, 'O'); d.l(10, 15, 10, 8, 'N'); d.p('G', 8, 7, 12, 7, 9, 6, 11, 6); d.p('g', 1, 14, 14, 13); d.r(0, 0, 16, 1, 'n'); d.r(0, 15, 16, 1, 'n'); }, SC);
add(G, C, 'au-nolan', 'Sidney Nolan và Albert Namatjira', 'Sidney Nolan and Albert Namatjira', 'Nolan nổi tiếng với chuỗi tranh về tên cướp Ned Kelly, còn Namatjira, người Western Arrernte, vẽ tranh màu nước phong cảnh Trung Úc. Hai người đại diện cho hai dòng nghệ thuật khác nhau.',
  d => { d.bg('u'); d.r(1, 1, 7, 14, 'k'); d.r(3, 4, 3, 5, 'a'); d.r(3, 3, 3, 1, 'k'); d.p('k', 4, 5, 5, 5); d.r(9, 1, 6, 14, 'c'); d.r(9, 8, 6, 7, 'O'); d.tri(10, 4, 4, 4, 'R'); d.p('y', 13, 3); d.p('w', 3, 12, 11, 2); }, SC);
add(G, C, 'au-rocks', 'Kiến trúc thuộc địa tại Sydney', 'Colonial architecture in Sydney', 'Khu The Rocks và Hyde Park Barracks giữ di tích thời tù nhân. Nhiều công trình được UNESCO công nhận.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 4, 12, 9, 't'); d.tri(1, 1, 14, 3, 'N'); for (const x of [3, 6, 9, 12]) { d.r(x, 6, 1, 2, 'k'); d.r(x, 9, 1, 2, 'k'); } d.r(7, 11, 2, 2, 'N'); d.r(7, 0, 2, 1, 'r'); }, SC);
add(G, C, 'au-utzon', 'Nhà hát Con ốc và kiến trúc hiện đại', 'The Opera House and modern architecture', 'Thiết kế của Utzon được nhiều người coi là dấu ấn của kiến trúc thế kỷ 20. Phần mái dùng gạch men trắng ghép từ nhiều mảnh.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.tri(1, 3, 7, 9, 'w'); d.tri(7, 2, 8, 10, 'l'); d.tri(11, 6, 4, 6, 'w'); for (const [x, y] of [[3, 7], [4, 9], [9, 6], [10, 8], [11, 10]]) d.p('W', x, y); d.r(0, 12, 16, 1, 'W'); }, SC);
add(G, C, 'au-graffiti', 'Nghệ thuật đường phố ở Melbourne', 'Melbourne street art', 'Ngõ hẻm tràn ngập tranh graffiti và nghệ thuật phố, thành điểm tham quan. Chính quyền cho phép nhiều bức tường được vẽ công khai.',
  d => { d.bg('a'); d.r(1, 1, 14, 14, 'A'); for (let y = 1; y < 15; y += 2) d.r(1, y, 14, 1, 'K'); d.e(5, 6, 3, 3, 'p'); d.e(10, 9, 3.4, 3, 'c'); d.p('y', 4, 5, 6, 5, 9, 8, 11, 8); d.p('k', 5, 7, 10, 10); d.l(2, 13, 13, 12, 'r'); d.p('w', 3, 2, 13, 3); }, SC);

// ----- Văn hóa hiện đại -----
add(G, E, 'au-film', 'Phim Úc', 'Australian film', 'Những bộ phim như "Mad Max" và "Crocodile Dundee" mang hình ảnh Úc ra thế giới. Nhiều diễn viên như Cate Blanchett và Nicole Kidman đã nổi tiếng quốc tế.',
  d => { d.bg('k'); d.r(1, 3, 14, 10, 'O'); d.r(2, 4, 12, 8, 'o'); for (let x = 1; x < 15; x += 2) { d.p('k', x, 3); d.p('k', x, 12); } d.r(3, 9, 10, 3, 'R'); d.e(8, 8, 2, 2, 'y'); d.p('k', 4, 7, 12, 7); d.r(1, 13, 14, 1, 'a'); }, SC);
add(G, E, 'au-bluey', 'Phim hoạt hình Bluey', 'Bluey animated series', 'Bộ phim hoạt hình về gia đình chó heeler xanh, ra mắt năm 2018 và được nhiều nước yêu thích. Phim dùng giọng Úc, các trò chơi quen thuộc và cảnh gia đình gần gũi.',
  d => { d.bg('c'); d.e(8, 9, 5, 5, 'b'); d.e(8, 11, 3, 2.8, 'u'); d.tri(2, 1, 4, 6, 'B'); d.tri(10, 1, 4, 6, 'B'); d.tri(3, 2, 2, 4, 'o'); d.p('k', 6, 8, 10, 8, 8, 10); d.p('r', 8, 12); d.r(7, 11, 2, 1, 'k'); d.p('w', 6, 7, 10, 7); }, PETX());
add(G, E, 'au-sport', 'Thể thao', 'Sport', 'Cricket, bóng bầu dục AFL, rugby league và bơi lội đều được yêu thích. Giải Australian Open (quần vợt) tổ chức ở Melbourne mỗi tháng 1.',
  d => { d.bg('g'); d.r(0, 0, 16, 16, 'g'); d.r(0, 5, 16, 1, 'w'); d.r(0, 10, 16, 1, 'w'); d.l(8, 5, 8, 10, 'w'); d.e(5, 8, 1.4, 1.4, 'y'); d.e(11, 4, 1.4, 1.4, 'w'); d.r(7, 2, 2, 3, 'n'); d.r(7, 12, 2, 3, 'n'); }, SC);
add(G, E, 'au-slang', 'Lối nói dân gian (Aussie slang)', 'Aussie slang', 'Những từ như "arvo" (buổi chiều), "brekkie" (bữa sáng) và "no worries" thể hiện thái độ thân mật. Người Úc có thói quen rút gọn từ.',
  d => { d.bg('y'); d.e(8, 7, 6, 4.4, 'w'); d.tri(4, 10, 4, 4, 'w'); d.p('k', 4, 6, 6, 6, 8, 6, 10, 6, 5, 8, 7, 8, 9, 8, 11, 8); d.p('r', 6, 5, 10, 5); d.r(1, 14, 14, 1, 'O'); }, SC);
add(G, E, 'au-surf', 'Văn hóa lướt sóng và bãi biển', 'Surf and beach culture', 'Nhiều người lướt sóng trước khi đi làm, và biển là nơi gặp gỡ của cả gia đình. Lối sống này ảnh hưởng đến thời trang và âm nhạc.',
  d => { d.bg('c'); d.e(12, 3, 2, 2, 'y'); d.r(0, 8, 16, 8, 'C'); d.e(4, 8, 5, 2, 'b'); d.e(11, 9, 5, 2, 'c'); d.p('w', 2, 8, 6, 9, 10, 8, 14, 9); d.e(7, 6, 1, 1.2, 's'); d.r(6, 7, 2, 3, 'r'); d.l(4, 12, 11, 11, 'y'); d.p('Y', 6, 12, 9, 11); }, SC);
add(G, E, 'au-wiggles', 'Chương trình thiếu nhi', 'Children\'s shows', 'Nhiều chương trình dành cho trẻ em được làm trong nước. Nhóm nhạc thiếu nhi The Wiggles là ví dụ nổi tiếng.',
  d => { d.bg('P'); for (const [x, c] of [[3, 'r'], [6, 'b'], [10, 'y'], [13, 'p']]) { d.e(x, 6, 1.4, 1.4, 's'); d.r(x - 1, 8, 3, 5, c); d.r(x - 1, 13, 1, 2, 'k'); d.r(x + 1, 13, 1, 2, 'k'); } d.p('y', 2, 2, 8, 1, 14, 2); d.p('w', 3, 5, 6, 5, 10, 5, 13, 5); }, SC);
function PETX() { return SC; }
