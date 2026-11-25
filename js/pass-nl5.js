import { add, SC, setCC } from './pass-kit.js';
setCC('nl');
// Hà Lan · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử, người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' };

// ----- Con vật và linh vật -----
add(G, A, 'nl-lion', 'Sư tử Hà Lan', 'The Dutch lion', 'Hình ảnh con sư tử xuất hiện trên quốc huy và biểu tượng của nhiều cơ quan. Sư tử đại diện cho lòng dũng cảm và được dùng trên áo đội tuyển cam.',
  d => { d.bg('o'); d.e(8, 8, 6, 6, 'O'); d.e(8, 8, 4, 4, 'y'); d.p('k', 6, 7, 10, 7, 8, 9, 7, 10, 9, 10); d.p('r', 8, 11); d.p('N', 3, 5, 13, 5, 2, 9, 14, 9, 4, 12, 12, 12); d.p('w', 6, 6, 10, 6); d.tri(7, 8, 2, 2, 'o'); d.p('Y', 5, 3, 11, 3, 8, 2); }, PET);
add(G, A, 'nl-cow', 'Bò sữa Holstein-Friesian', 'Holstein-Friesian dairy cow', 'Giống bò đốm đen trắng, gắn với đồng cỏ polder và ngành sữa. Bò sữa là một phần hình ảnh điển hình của nông thôn.',
  d => { d.bg('g'); d.e(7, 9, 5, 3.2, 'w'); d.p('k', 5, 8, 6, 8, 8, 10, 9, 10, 10, 8); d.r(3, 11, 1, 3, 'W'); d.r(9, 11, 1, 3, 'W'); d.e(12, 6, 2.2, 2.4, 'w'); d.p('k', 11, 5, 12, 5, 13, 7); d.p('x', 12, 8, 13, 8); d.p('W', 10, 3, 14, 3); d.p('p', 7, 12, 8, 12); d.l(2, 8, 1, 11, 'k'); }, PET);
add(G, A, 'nl-wadden-birds', 'Chim nước ven bờ ở vùng Wadden', 'Shorebirds of the Wadden Sea', 'Nhiều loài chim di cư nghỉ chân trên bãi bùn Wadden. Đây là một điểm dừng quan trọng trên tuyến bay di cư.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 't'); d.e(5, 9, 2.6, 2.2, 'w'); d.e(8, 6, 1.4, 1.4, 'w'); d.l(5, 11, 4, 14, 'o'); d.l(6, 11, 7, 14, 'o'); d.p('k', 9, 6, 4, 8); d.l(9, 6, 12, 6, 'O'); d.e(12, 10, 2, 1.6, 'a'); d.e(14, 9, 1.2, 1.2, 'a'); d.l(12, 11, 12, 14, 'O'); d.p('w', 2, 3, 8, 2, 13, 4); }, PET);
add(G, A, 'nl-friesian', 'Ngựa Friesian', 'The Friesian horse', 'Ngựa đen to khỏe của vùng Friesland, dáng đẹp và bờm dài. Giống ngựa này thường xuất hiện trong lễ rước và phim lịch sử.',
  d => { d.bg('h'); d.e(7, 9, 5, 3, 'k'); d.r(3, 10, 1, 5, 'k'); d.r(6, 10, 1, 5, 'k'); d.r(9, 10, 1, 5, 'k'); d.e(12, 5, 2.2, 2.6, 'k'); d.l(10, 7, 12, 4, 'k'); d.p('K', 10, 2, 11, 2, 9, 3, 10, 4, 10, 5); d.p('w', 13, 6, 13, 4); d.l(2, 8, 0, 12, 'K'); d.p('K', 1, 9, 1, 11); }, PET);
add(G, A, 'nl-sheep', 'Cừu và dê đồng cỏ', 'Dyke sheep and grassland goats', 'Các đàn cừu thường gặm cỏ trên đê để giữ đê chắc chắn. Đây là một cách quen thuộc để chăm sóc bờ đê.',
  d => { d.bg('g'); d.e(7, 8, 5, 4, 'w'); d.e(5, 6, 2.4, 2, 'w'); d.e(10, 6, 2.4, 2, 'w'); d.e(13, 8, 2, 2.2, 'k'); d.p('w', 12, 6, 14, 6); d.p('x', 14, 9); d.r(4, 11, 1, 3, 'k'); d.r(9, 11, 1, 3, 'k'); d.p('W', 4, 8, 8, 9, 10, 8, 6, 5); d.p('G', 2, 14, 12, 15); }, PET);
add(G, A, 'nl-sinterklaas-figure', 'Sinterklaas và Zwarte Piet (nhân vật lễ hội)', 'Sinterklaas and Zwarte Piet (festival figures)', 'Sinterklaas là nhân vật cổ tích được cho là dựa trên Thánh Nicholas. Hình tượng người phụ tá Zwarte Piet gây nhiều tranh cãi, và nhiều thành phố nay thay bằng "Roetveegpiet" (Piet lem muội).',
  d => { d.bg('R'); d.e(8, 6, 3, 3, 's'); d.tri(4, 0, 8, 5, 'r'); d.r(4, 4, 8, 1, 'y'); d.r(5, 7, 6, 4, 'w'); d.p('k', 7, 6, 9, 6); d.r(4, 10, 8, 6, 'r'); d.p('y', 8, 11, 8, 13); d.l(13, 5, 13, 14, 'N'); d.p('Y', 13, 4, 12, 4, 14, 4); d.p('w', 2, 2, 14, 12); }, SC);

// ----- Tín ngưỡng -----
add(G, B, 'nl-calvinism', 'Tin Lành Calvin', 'Calvinist Protestantism', 'Giáo phái có ảnh hưởng lớn trong lịch sử, đặc biệt ở phía bắc và trung tâm. Truyền thống này đề cao sự giản dị và kỷ luật.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 7, 10, 7, 'W'); d.r(3, 7, 10, 1, 'w'); d.tri(2, 3, 12, 4, 'a'); d.r(7, 0, 2, 4, 'a'); d.r(6, 1, 4, 1, 'a'); d.r(7, 10, 2, 4, 'N'); for (const x of [4, 10]) d.r(x, 9, 2, 3, 'b'); d.p('k', 8, 3); }, SC);
add(G, B, 'nl-catholic', 'Công giáo La Mã', 'Roman Catholicism', 'Tập trung nhiều ở các tỉnh phía nam như Limburg và Bắc Brabant. Lễ hội Carnaval và các cuộc rước là dấu ấn của vùng này.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.r(4, 5, 8, 9, 'e'); d.tri(3, 1, 10, 4, 'R'); d.r(7, 0, 2, 2, 'y'); d.r(6, 1, 4, 1, 'y'); d.fan(8, 14, 2, 'N'); d.r(7, 11, 2, 3, 'N'); d.p('b', 5, 8, 10, 8); d.p('y', 6, 7, 9, 7); }, SC);
add(G, B, 'nl-secular', 'Không tôn giáo', 'No religion', 'Ngày nay nhiều người Hà Lan không theo tôn giáo nào, một trong những tỷ lệ cao nhất châu Âu. Nhiều nhà thờ cũ được chuyển thành nhà hàng, thư viện hoặc căn hộ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 6, 10, 8, 'W'); d.tri(2, 2, 12, 4, 'a'); d.r(7, 0, 2, 3, 'W'); d.r(4, 8, 8, 3, 'y'); d.p('k', 5, 9, 7, 9, 9, 9, 11, 9); d.r(6, 11, 4, 3, 'N'); d.p('w', 5, 7, 10, 7); d.p('r', 13, 12, 2, 12); }, SC);
add(G, B, 'nl-islam', 'Hồi giáo', 'Islam', 'Cộng đồng nhập cư từ Thổ Nhĩ Kỳ và Maroc mang theo các nhà thờ Hồi giáo và lễ hội Eid. Đây là một phần của đời sống đa văn hóa ở các thành phố lớn.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'k'); d.fan(8, 11, 5, 'W'); d.r(3, 11, 10, 3, 'W'); d.r(2, 5, 2, 9, 'w'); d.r(12, 5, 2, 9, 'w'); d.tri(2, 3, 2, 2, 'c'); d.tri(12, 3, 2, 2, 'c'); d.p('y', 8, 5, 8, 4, 7, 4, 9, 4); d.p('k', 7, 12, 8, 12, 7, 13); d.p('y', 12, 2, 3, 1); }, SC);
add(G, B, 'nl-tolerance-faith', 'Khoan dung và tự do tôn giáo', 'Religious tolerance and freedom', 'Từ thế kỷ XVII, Hà Lan đón người Do Thái Sephardi, người Huguenot và nhiều nhóm bị đàn áp. Truyền thống này góp phần hình thành hình ảnh một đất nước cởi mở.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'n'); d.r(2, 8, 12, 5, 'W'); d.fan(8, 8, 5, 'e'); d.r(7, 2, 2, 4, 'N'); d.r(6, 3, 4, 1, 'N'); d.p('b', 3, 9, 12, 9); d.p('r', 6, 10, 9, 10); d.p('y', 8, 7, 4, 11, 12, 11); d.p('k', 7, 11, 8, 12); }, SC);

// ----- Lịch sử -----
add(G, C, 'nl-revolt', 'Cuộc nổi dậy chống Tây Ban Nha (1568–1648)', 'The Dutch Revolt (1568–1648)', 'Các tỉnh miền Bắc nổi dậy chống sự cai trị của Tây Ban Nha, do Willem van Oranje dẫn đầu. Cuộc chiến kéo dài gần tám mươi năm nên được gọi là Chiến tranh Tám mươi năm.',
  d => { d.bg('o'); d.r(0, 12, 16, 4, 'N'); d.l(2, 2, 2, 13, 'N'); d.r(3, 2, 5, 1, 'o'); d.r(3, 3, 5, 1, 'w'); d.r(3, 4, 5, 1, 'b'); d.l(12, 3, 12, 13, 'a'); d.tri(10, 1, 4, 3, 'a'); d.p('k', 6, 10, 8, 11, 9, 10); d.p('y', 7, 8, 5, 12, 11, 12); d.p('r', 1, 1, 14, 1); }, SC);
add(G, C, 'nl-goldenage', 'Thời kỳ Hoàng kim (thế kỷ XVII)', 'The Golden Age (17th century)', 'Cộng hòa Hà Lan giàu có nhờ thương mại, ngân hàng và hải quân. Nghệ thuật, khoa học và in ấn phát triển mạnh.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(0, 11, 16, 1, 'c'); d.tri(3, 3, 8, 7, 'w'); d.tri(8, 4, 5, 6, 'W'); d.r(7, 2, 1, 9, 'N'); d.r(3, 10, 9, 2, 'N'); d.p('r', 8, 1, 9, 1); d.p('y', 13, 8, 14, 9, 12, 9); d.r(12, 7, 3, 2, 'y'); d.p('w', 2, 14, 7, 15, 13, 14); }, SC);
add(G, C, 'nl-voc', 'Công ty Đông Ấn Hà Lan (VOC)', 'The Dutch East India Company (VOC)', 'VOC (Vereenigde Oostindische Compagnie) thành lập năm 1602, được xem là một trong những công ty cổ phần đầu tiên trên thế giới. Công ty buôn bán gia vị và cũng gắn với chế độ thuộc địa và nô lệ.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'R'); d.e(8, 8, 4.6, 4.6, 'e'); d.p('R', 5, 6, 11, 6, 5, 10, 11, 10); d.r(7, 5, 2, 7, 'R'); d.r(5, 7, 6, 2, 'R'); d.p('N', 2, 3, 13, 12, 3, 13, 12, 2); d.p('y', 8, 8); }, SC);
add(G, C, 'nl-colonial', 'Thời kỳ thuộc địa', 'The colonial era', 'Hà Lan cai trị Indonesia, Suriname và vùng Caribe qua nhiều thế kỷ. Di sản này vẫn gây tranh luận về trách nhiệm lịch sử.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(2, 9, 12, 3, 'N'); d.r(4, 5, 1, 4, 'N'); d.r(8, 3, 1, 6, 'N'); d.r(12, 5, 1, 4, 'N'); d.tri(4, 5, 4, 3, 'w'); d.tri(8, 3, 5, 4, 'W'); d.p('r', 8, 2, 12, 4); d.r(0, 11, 16, 1, 'c'); d.p('w', 3, 14, 10, 14); }, SC);
add(G, C, 'nl-ww2', 'Chiến tranh thế giới thứ hai (1940–1945)', 'The Second World War (1940–1945)', 'Đức chiếm đóng Hà Lan, và phần lớn người Do Thái Hà Lan bị giết trong thời gian này. Cuộc đói mùa đông 1944–1945 gây nhiều đau khổ cho dân thường.',
  d => { d.bg('K'); d.r(0, 12, 16, 4, 'k'); d.r(3, 5, 10, 7, 'a'); d.tri(2, 2, 12, 3, 'A'); d.r(5, 7, 2, 5, 'k'); d.r(9, 7, 2, 5, 'k'); d.p('y', 3, 1, 12, 1); d.p('w', 2, 14, 13, 14); d.r(7, 8, 2, 4, 'k'); d.p('l', 6, 6, 9, 6); }, SC);
add(G, C, 'nl-postwar', 'Sau chiến tranh: EU và NATO', 'After the war: the EU and NATO', 'Hà Lan là thành viên sáng lập của Liên minh châu Âu tiền thân và NATO (Tổ chức Hiệp ước Bắc Đại Tây Dương). Đất nước được xây dựng lại và trở thành một xã hội phúc lợi.',
  d => { d.bg('B'); for (let a = 0; a < 12; a++) { const t = a / 12 * 6.28; d.put(8 + Math.cos(t) * 5, 8 + Math.sin(t) * 5, 'y'); } d.e(8, 8, 2, 2, 'y'); d.p('w', 3, 1, 13, 14); d.p('c', 1, 8, 14, 8); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'nl-willem', 'Willem van Oranje (Willem im lặng)', 'Willem of Orange (William the Silent)', 'Lãnh đạo cuộc nổi dậy chống Tây Ban Nha, được xem là người cha của đất nước. Ông bị ám sát năm 1584.',
  d => { d.bg('o'); d.e(8, 7, 3, 3.4, 's'); d.r(4, 3, 8, 2, 'k'); d.r(3, 4, 10, 1, 'k'); d.p('k', 7, 7, 9, 7); d.p('N', 6, 9, 7, 10, 8, 10, 9, 10, 10, 9); d.r(4, 11, 8, 5, 'k'); d.r(6, 10, 4, 1, 'w'); d.p('y', 7, 12, 8, 13); d.p('w', 2, 2, 13, 2); }, SC);
add(G, E, 'nl-rembrandt-person', 'Rembrandt van Rijn', 'Rembrandt van Rijn', 'Họa sĩ lớn của Thời kỳ Hoàng kim, tác giả của "Canh đêm". Ông sống ở Amsterdam và để lại hàng trăm bức tranh, tranh khắc.',
  d => { d.bg('N'); d.e(8, 7, 3, 3.4, 's'); d.e(8, 3, 4, 1.8, 'k'); d.r(4, 3, 8, 1, 'k'); d.p('k', 7, 7, 9, 7); d.p('S', 5, 8, 11, 8); d.r(4, 11, 8, 5, 'k'); d.r(6, 10, 4, 1, 'e'); d.p('Y', 3, 14, 12, 14); d.r(12, 9, 3, 5, 'n'); d.r(13, 8, 1, 2, 'a'); }, SC);
add(G, E, 'nl-vangogh-person', 'Vincent van Gogh (người)', 'Vincent van Gogh (the man)', 'Họa sĩ hậu ấn tượng nổi tiếng với "Đêm đầy sao" và "Hoa hướng dương". Ông chỉ bán được rất ít tranh khi còn sống.',
  d => { d.bg('B'); d.p('y', 2, 2, 13, 3, 8, 1, 5, 4, 11, 5); d.e(8, 7, 3, 3.4, 's'); d.r(5, 3, 6, 2, 'O'); d.p('O', 4, 4, 11, 4, 5, 8, 11, 8, 6, 10, 7, 10, 8, 10, 9, 10, 10, 10); d.p('k', 7, 6, 9, 6); d.r(4, 11, 8, 5, 'b'); d.p('y', 7, 12, 8, 13); d.p('w', 6, 6, 10, 6); }, SC);
add(G, E, 'nl-annefrank', 'Anne Frank', 'Anne Frank', 'Cô bé người Do Thái viết nhật ký khi trốn ở Amsterdam trong chiến tranh. Cuốn nhật ký trở thành một trong những tài liệu nổi tiếng nhất về thời kỳ này.',
  d => { d.bg('W'); d.r(3, 6, 10, 9, 'r'); d.r(3, 6, 10, 1, 'R'); d.r(4, 7, 8, 7, 'w'); d.p('k', 5, 8, 9, 8, 6, 10, 10, 10, 5, 12, 9, 12); d.p('r', 3, 8, 3, 13); d.e(8, 3, 2, 2, 's'); d.p('N', 6, 2, 10, 2, 6, 3, 10, 3, 6, 1, 9, 1); d.p('k', 7, 3, 9, 3); d.l(11, 12, 14, 10, 'a'); }, SC);
add(G, E, 'nl-erasmus', 'Erasmus', 'Erasmus', 'Học giả nhân văn thời Phục hưng sinh ở Rotterdam. Ông được nhắc đến với tinh thần khoan dung và lập luận bằng lý trí.',
  d => { d.bg('R'); d.e(8, 7, 3, 3.4, 's'); d.r(4, 2, 8, 3, 'k'); d.r(3, 4, 10, 1, 'k'); d.p('k', 7, 7, 9, 7); d.p('S', 6, 9, 10, 9); d.r(4, 11, 8, 5, 'k'); d.r(6, 10, 4, 1, 'w'); d.r(10, 11, 4, 4, 'w'); d.r(10, 11, 4, 1, 'a'); d.p('k', 11, 12, 12, 13); d.p('Y', 3, 14, 6, 14); }, SC);
add(G, E, 'nl-cruyff', 'Johan Cruyff', 'Johan Cruyff', 'Cầu thủ và huấn luyện viên huyền thoại, biểu tượng của "bóng đá toàn diện". Số 14 của ông gắn liền với Ajax và đội tuyển cam.',
  d => { d.bg('g'); d.e(8, 6, 3, 3.2, 's'); d.r(5, 2, 6, 2, 'N'); d.p('N', 5, 4, 10, 4, 7, 6, 9, 6); d.p('k', 7, 6, 9, 6); d.r(4, 9, 8, 7, 'o'); d.r(4, 9, 8, 1, 'w'); d.p('w', 6, 11, 7, 11, 9, 11, 6, 12, 9, 12, 6, 13, 9, 13); d.r(5, 12, 1, 3, 'w'); d.r(13, 13, 2, 2, 'w'); d.p('k', 14, 14); }, SC);
add(G, E, 'nl-grotius', 'Hugo Grotius', 'Hugo Grotius', 'Luật gia được xem là một trong những người đặt nền móng cho luật quốc tế. Ông viết về luật biển và luật chiến tranh.',
  d => { d.bg('K'); d.e(8, 7, 3, 3.4, 's'); d.r(4, 3, 8, 2, 'k'); d.r(3, 4, 10, 1, 'k'); d.p('k', 7, 7, 9, 7); d.p('N', 7, 9, 9, 9); d.r(4, 11, 8, 5, 'k'); d.r(6, 10, 4, 1, 'w'); d.r(11, 11, 3, 4, 'e'); d.r(11, 11, 1, 4, 'R'); d.p('Y', 2, 14, 12, 3); d.p('w', 2, 2); }, SC);
