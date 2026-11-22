import { add, SC, setCC } from './pass-kit.js';
setCC('nz');
// New Zealand · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' };
const person = (d, bg, hair, body, skin = 's') => { d.bg(bg); d.e(8, 6, 3, 3.4, skin); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'nz-kiwi', 'Kiwi', 'Kiwi', 'Chim không biết bay, mỏ dài, sống về đêm, là biểu tượng quốc gia đến mức người dân tự gọi mình là Kiwi.',
  d => { d.bg('h'); d.e(8, 9, 5, 4, 'n'); d.p('N', 5, 8, 7, 7, 9, 8, 6, 11, 10, 11); d.l(12, 7, 15, 9, 't'); d.p('k', 11, 7); d.r(6, 13, 1, 2, 'y'); d.r(9, 13, 1, 2, 'y'); }, PET);
add(G, A, 'nz-kakapo', 'Kākāpō', 'Kākāpō', 'Vẹt đêm không biết bay, béo tròn, thuộc nhóm loài cực kỳ nguy cấp và được bảo tồn rất sát sao.',
  d => { d.bg('G'); d.e(8, 9, 5, 5, 'g'); d.e(8, 5, 3.2, 3, 'h'); d.p('k', 7, 5, 9, 5); d.p('t', 8, 6); d.p('y', 5, 9, 11, 10, 7, 12, 9, 8); d.r(6, 14, 1, 1, 'n'); d.r(9, 14, 1, 1, 'n'); }, PET);
add(G, A, 'nz-kea', 'Kea', 'Kea', 'Loài vẹt núi thông minh, nghịch ngợm ở Đảo Nam, nổi tiếng với thói quen mổ đồ của du khách.',
  d => { d.bg('c'); d.e(8, 9, 4, 5, 'G'); d.e(8, 5, 2.6, 2.6, 'G'); d.p('k', 7, 4, 9, 4); d.p('N', 10, 5, 10, 6); d.p('r', 5, 9, 11, 9, 5, 11, 11, 11); d.l(11, 12, 14, 15, 'g'); d.r(6, 14, 1, 1, 'n'); d.r(9, 14, 1, 1, 'n'); }, PET);
add(G, A, 'nz-tui', 'Tūī', 'Tūī', 'Chim hót có cục lông trắng ở cổ, giọng hót phức tạp như nhiều nhạc cụ cùng lúc.',
  d => { d.bg('c'); d.e(8, 9, 4, 3.4, 'K'); d.e(11, 6, 2.4, 2.2, 'K'); d.p('w', 10, 8, 11, 8); d.p('y', 13, 6, 14, 6); d.p('g', 7, 8, 9, 10); d.l(4, 10, 1, 13, 'k'); d.p('w', 11, 5); d.r(7, 12, 1, 2, 'N'); d.p('p', 14, 3, 15, 2); }, PET);
add(G, A, 'nz-takahe', 'Takahē', 'Takahē', 'Chim xanh to, tưởng đã tuyệt chủng rồi được tìm thấy lại năm 1948 ở vùng Fiordland.',
  d => { d.bg('h'); d.e(8, 9, 4.4, 3.6, 'b'); d.e(11, 6, 2, 2.2, 'B'); d.e(5, 9, 2, 2.4, 'g'); d.p('r', 13, 6, 12, 5); d.p('k', 11, 6); d.r(6, 12, 1, 3, 'r'); d.r(9, 12, 1, 3, 'r'); }, PET);
add(G, A, 'nz-tuatara', 'Tuatara', 'Tuatara', 'Loài bò sát cổ đại, thường được gọi là hóa thạch sống, là dòng dõi còn lại của một nhóm động vật từ thời khủng long.',
  d => { d.bg('u'); d.e(8, 10, 5, 2.4, 'G'); d.e(12, 8, 2.2, 1.8, 'g'); d.p('k', 12, 7); d.l(3, 10, 1, 12, 'G'); d.p('h', 6, 8, 8, 8, 10, 8); d.r(5, 12, 1, 2, 'G'); d.r(10, 12, 1, 2, 'G'); d.p('y', 13, 9); }, PET);
add(G, A, 'nz-moa', 'Moa (đã tuyệt chủng)', 'Moa (extinct)', 'Loài chim khổng lồ không biết bay, bị săn đến tuyệt chủng sau khi con người đến.',
  d => { d.bg('e'); d.e(7, 10, 4, 3.6, 'n'); d.l(11, 8, 12, 3, 'N'); d.e(12, 2, 1.4, 1.4, 'N'); d.p('y', 14, 2); d.p('k', 12, 2); d.r(5, 13, 1, 3, 'N'); d.r(8, 13, 1, 3, 'N'); d.p('t', 5, 9, 8, 11); }, PET);
add(G, A, 'nz-hoiho', 'Hoiho (chim cánh cụt mắt vàng)', 'Hoiho (yellow-eyed penguin)', 'Một trong những loài chim cánh cụt hiếm nhất thế giới, sống ven biển phía nam.',
  d => { d.bg('c'); d.e(8, 9, 4, 5.4, 'k'); d.e(8, 10, 2.6, 3.6, 'w'); d.e(8, 4, 2.4, 2.4, 'k'); d.p('y', 6, 3, 10, 3, 7, 4, 9, 4); d.p('o', 8, 5); d.r(6, 14, 2, 1, 'o'); d.r(9, 14, 2, 1, 'o'); }, PET);
add(G, A, 'nz-hector', 'Cá heo Hector và Māui', 'Hector\'s and Māui dolphins', 'Những loài cá heo nhỏ chỉ có ở New Zealand, loài Māui thuộc nhóm hiếm nhất thế giới.',
  d => { d.bg('C'); d.e(8, 9, 5.6, 3, 'a'); d.e(8, 10, 4.4, 1.6, 'l'); d.e(13, 8, 2, 1.4, 'a'); d.p('k', 12, 8); d.tri(6, 4, 4, 3, 'A'); d.l(2, 8, 1, 5, 'A'); d.l(2, 9, 1, 12, 'A'); d.p('w', 3, 14, 12, 14); }, PET);
add(G, A, 'nz-sheep', 'Cừu', 'Sheep', 'Số cừu từng nhiều hơn người rất nhiều, là biểu tượng của ngành nông nghiệp.',
  d => { d.bg('h'); d.e(8, 9, 5, 4, 'w'); d.e(8, 6, 2, 2, 'w'); d.e(13, 8, 2, 2, 'k'); d.p('w', 12, 7); d.r(5, 13, 1, 2, 'k'); d.r(10, 13, 1, 2, 'k'); d.p('l', 5, 8, 10, 10, 7, 6); }, PET);

// ----- Tín ngưỡng -----
add(G, B, 'nz-ranginui', 'Ranginui và Papatūānuku', 'Ranginui and Papatūānuku', 'Theo thần thoại Māori, Cha Trời và Mẹ Đất ôm chặt nhau, các con của họ tách hai người ra để có ánh sáng và không gian.',
  d => { d.bg('B'); d.r(0, 11, 16, 5, 'G'); d.e(8, 11, 8, 3, 'g'); d.p('y', 2, 2, 5, 4, 9, 1, 12, 3, 14, 5); d.e(8, 3, 6, 2, 'K'); d.p('w', 5, 3, 8, 2, 11, 4); d.l(8, 5, 8, 10, 'c'); }, SC);
add(G, B, 'nz-tane', 'Tāne Mahuta', 'Tāne Mahuta', 'Thần của rừng và các loài chim, con trai của Ranginui và Papatūānuku, gắn với cây kauri khổng lồ ở Northland.',
  d => { d.bg('G'); d.r(5, 3, 6, 13, 'n'); d.r(5, 3, 2, 13, 'N'); d.e(8, 3, 7, 3, 'g'); d.p('h', 3, 2, 12, 3, 8, 1); d.r(4, 13, 8, 3, 'N'); d.p('y', 8, 7); }, SC);
add(G, B, 'nz-maui', 'Māui', 'Māui', 'Nhân vật anh hùng tinh nghịch trong truyền thuyết, được kể là đã câu lên Đảo Bắc từ đáy biển và bắt mặt trời chậm lại.',
  d => { d.bg('C'); d.r(0, 13, 16, 3, 'c'); d.e(8, 5, 2.4, 2.4, 's'); d.r(6, 7, 4, 4, 'N'); d.l(10, 7, 14, 3, 'W'); d.l(14, 3, 14, 9, 'W'); d.e(12, 10, 2.4, 2.4, 'W'); d.e(12, 10, 1.2, 1.2, '_'); d.p('k', 7, 5, 9, 5); d.e(3, 3, 2, 2, 'y'); }, SC);
add(G, B, 'nz-tapu', 'Tapu và noa', 'Tapu and noa', 'Khái niệm về điều thiêng liêng cần giữ gìn (tapu) và điều bình thường (noa), chi phối nhiều quy tắc ứng xử.',
  d => { d.bg('e'); d.r(0, 0, 8, 16, 'k'); d.e(4, 8, 2.4, 2.4, 'y'); d.p('r', 4, 8); d.p('w', 12, 6, 12, 7, 12, 8); d.e(12, 11, 2, 2, 'g'); d.l(8, 0, 8, 15, 'a'); }, SC);
add(G, B, 'nz-mana', 'Mana', 'Mana', 'Uy tín, quyền lực tinh thần của một người, một gia đình hay một bộ tộc.',
  d => { d.bg('v'); d.e(8, 8, 5, 5, 'y'); d.e(8, 8, 3.4, 3.4, 'v'); d.e(8, 8, 1.6, 1.6, 'y'); d.p('y', 8, 1, 8, 15, 1, 8, 15, 8); d.p('w', 6, 6); }, SC);
add(G, B, 'nz-whakapapa', 'Whakapapa', 'Whakapapa', 'Gia phả, mối liên hệ giữa con người với tổ tiên, đất đai và thiên nhiên.',
  d => { d.bg('e'); d.e(8, 3, 1.8, 1.6, 'g'); d.e(4, 8, 1.8, 1.6, 'n'); d.e(12, 8, 1.8, 1.6, 'n'); d.e(2, 13, 1.4, 1.4, 'y'); d.e(6, 13, 1.4, 1.4, 'y'); d.e(10, 13, 1.4, 1.4, 'y'); d.e(14, 13, 1.4, 1.4, 'y'); d.l(8, 5, 4, 6, 'N'); d.l(8, 5, 12, 6, 'N'); d.l(4, 10, 2, 12, 'N'); d.l(4, 10, 6, 12, 'N'); d.l(12, 10, 10, 12, 'N'); d.l(12, 10, 14, 12, 'N'); }, SC);
add(G, B, 'nz-kaitiaki', 'Kaitiakitanga', 'Kaitiakitanga', 'Tinh thần bảo vệ đất, nước và rừng như bổn phận đối với các thế hệ sau.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 9, 16, 3, 'g'); d.l(8, 9, 8, 4, 'N'); d.e(8, 3, 3, 2.6, 'G'); d.p('s', 5, 9, 11, 9); d.r(4, 7, 2, 2, 's'); d.r(10, 7, 2, 2, 's'); d.p('w', 2, 14, 12, 15); }, SC);
add(G, B, 'nz-taniwha', 'Taniwha', 'Taniwha', 'Sinh vật thần thoại bảo vệ hoặc đe dọa một vùng sông, hồ hay biển, thường gắn với địa danh cụ thể.',
  d => { d.bg('C'); d.r(0, 12, 16, 4, 'B'); d.e(4, 9, 2.4, 2.4, 'G'); d.e(8, 10, 2.4, 2.4, 'G'); d.e(12, 9, 2.4, 2.4, 'G'); d.e(13, 5, 2.4, 2, 'g'); d.p('y', 13, 4); d.p('r', 15, 5); d.l(13, 6, 12, 8, 'g'); d.p('w', 2, 14, 10, 14); }, SC);
add(G, B, 'nz-church', 'Cơ Đốc giáo', 'Christianity', 'Truyền giáo đến từ đầu thế kỷ mười chín, nay là tôn giáo lớn cùng với một bộ phận dân số không theo tôn giáo.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(4, 7, 8, 6, 'W'); d.tri(3, 4, 10, 3, 'N'); d.r(7, 9, 2, 4, 'n'); d.l(8, 0, 8, 4, 'w'); d.l(6, 2, 10, 2, 'w'); d.p('c', 5, 9, 10, 9); }, SC);

// ----- Lịch sử -----
add(G, C, 'nz-polynesians', 'Người Polynesia đến định cư (khoảng thế kỷ 13)', 'Polynesian settlement (c. 13th century)', 'Các nhóm đi thuyền vượt Thái Bình Dương, truyền thống kể rằng họ đến trên những chiếc waka lớn, nay thường gọi là hàng thuyền tổ tiên.',
  d => { d.bg('B'); d.r(0, 9, 16, 7, 'C'); d.r(2, 10, 12, 2, 'N'); d.l(8, 10, 8, 2, 'n'); d.tri(5, 2, 8, 8, 'W'); d.p('y', 2, 2, 13, 3, 14, 1); d.p('w', 1, 13, 10, 14); }, SC);
add(G, C, 'nz-kupe', 'Kupe', 'Kupe', 'Nhà hàng hải trong truyền thuyết Māori, được kể là người đầu tiên khám phá vùng đất mà sau này gọi là Aotearoa.',
  d => { d.bg('c'); d.r(0, 9, 16, 7, 'C'); d.r(2, 10, 12, 2, 'N'); d.e(8, 7, 1.4, 1.4, 's'); d.r(7, 8, 2, 2, 'r'); d.l(5, 7, 11, 7, 'W'); d.p('g', 14, 8, 13, 9); d.p('w', 1, 13, 10, 14); }, SC);
add(G, C, 'nz-tasman', 'Abel Tasman (1642)', 'Abel Tasman (1642)', 'Nhà hàng hải người Hà Lan đầu tiên của châu Âu nhìn thấy bờ biển New Zealand và đặt tên vùng này theo tỉnh Zeeland.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(3, 9, 10, 3, 'N'); d.l(5, 9, 5, 2, 'n'); d.l(9, 9, 9, 1, 'n'); d.r(3, 2, 4, 5, 'w'); d.r(7, 1, 5, 6, 'W'); d.p('r', 5, 1, 9, 0); d.p('w', 1, 14, 12, 15); }, SC);
add(G, C, 'nz-cook', 'James Cook (1769)', 'James Cook (1769)', 'Thuyền trưởng người Anh vẽ bản đồ bờ biển New Zealand trong chuyến đi đầu tiên của ông.',
  d => { d.bg('e'); d.r(1, 2, 14, 12, 'u'); d.p('G', 4, 5, 6, 4, 5, 8, 9, 9, 10, 6, 11, 10, 7, 11); d.p('C', 2, 13, 13, 13); d.l(12, 3, 12, 4, 'r'); d.l(11, 4, 13, 4, 'r'); d.p('n', 2, 2, 14, 14); }, SC);
add(G, C, 'nz-treaty', 'Hiệp ước Waitangi (1840)', 'Treaty of Waitangi (1840)', 'Văn kiện ký giữa nhiều tù trưởng Māori và Hoàng gia Anh, vẫn là nền tảng của các cuộc thảo luận về quyền và đất đai.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'u'); d.r(2, 2, 12, 1, 'Y'); d.p('k', 4, 4, 11, 4, 4, 6, 11, 6, 4, 8, 9, 8); d.p('r', 11, 11); d.l(4, 12, 7, 11, 'k'); d.l(8, 12, 10, 11, 'k'); }, SC);
add(G, C, 'nz-landwars', 'Các cuộc chiến về đất đai (thập niên 1860)', 'The New Zealand Wars (1860s)', 'Xung đột giữa quân đội, người định cư và các bộ tộc Māori, để lại nhiều mất mát về đất.',
  d => { d.bg('G'); d.r(0, 11, 16, 5, 'N'); d.r(1, 4, 1, 8, 'N'); d.r(4, 4, 1, 8, 'N'); d.r(7, 4, 1, 8, 'N'); d.r(10, 4, 1, 8, 'N'); d.r(13, 4, 1, 8, 'N'); d.p('n', 1, 3, 4, 3, 7, 3, 10, 3, 13, 3); d.l(0, 8, 15, 8, 'n'); d.p('r', 8, 14); }, SC);
add(G, C, 'nz-suffrage', 'Quyền bầu cử của phụ nữ (1893)', 'Women\'s suffrage (1893)', 'New Zealand là nước tự trị đầu tiên cho phụ nữ quyền bỏ phiếu trong bầu cử quốc gia.',
  d => { d.bg('e'); d.r(2, 7, 12, 8, 'W'); d.r(5, 5, 6, 2, 'W'); d.r(6, 9, 4, 3, 'k'); d.p('w', 7, 4); d.e(8, 3, 2, 1.6, 'w'); d.p('y', 8, 3); d.p('G', 8, 1, 7, 2); d.p('w', 3, 14, 12, 14); }, SC);
add(G, C, 'nz-gallipoli', 'Gallipoli (1915)', 'Gallipoli (1915)', 'Chiến dịch thời Thế chiến thứ nhất, nơi nhiều lính New Zealand hy sinh và là gốc của ngày Anzac.',
  d => { d.bg('A'); d.r(0, 11, 16, 5, 'C'); d.tri(0, 4, 10, 7, 'u'); d.tri(8, 6, 8, 5, 'n'); d.r(0, 11, 16, 1, 'Y'); d.p('k', 10, 14, 13, 15); d.p('r', 3, 3, 12, 2); d.p('w', 6, 13); }, SC);
add(G, C, 'nz-nuclearfree', 'Phi hạt nhân (1987)', 'Nuclear-free (1987)', 'Đạo luật tuyên bố New Zealand là vùng phi hạt nhân, trở thành một phần bản sắc đối ngoại.',
  d => { d.bg('w'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4.6, 4.6, 'w'); d.e(8, 8, 1.2, 1.2, 'k'); d.tri(6, 2, 4, 5, 'k'); d.l(3, 11, 6, 8, 'k'); d.l(13, 11, 10, 8, 'k'); d.l(2, 2, 14, 14, 'r'); d.l(3, 2, 15, 14, 'r'); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'nz-hillary', 'Edmund Hillary', 'Edmund Hillary', 'Nhà leo núi từng cùng Tenzing Norgay lên đỉnh Everest năm 1953, sau đó dành nhiều công sức giúp người Sherpa.',
  d => { person(d, 'l', 'n', 'r'); d.r(4, 1, 8, 1, 'w'); d.tri(0, 11, 6, 5, 'a'); d.l(13, 4, 13, 15, 'N'); d.p('w', 13, 3); d.p('c', 5, 7, 10, 7); }, SC);
add(G, E, 'nz-rutherford', 'Ernest Rutherford', 'Ernest Rutherford', 'Nhà vật lý đoạt giải Nobel Hóa học 1908, được xem là cha đẻ của vật lý hạt nhân.',
  d => { person(d, 'K', 'W', 'a'); d.e(13, 3, 2, 2, 'c'); d.e(13, 3, 0.8, 0.8, 'w'); d.p('y', 12, 1, 14, 5, 11, 4, 15, 2); d.p('l', 2, 4, 3, 13); }, SC);
add(G, E, 'nz-sheppard', 'Kate Sheppard', 'Kate Sheppard', 'Lãnh đạo phong trào đòi quyền bầu cử cho phụ nữ, chân dung có trên tờ tiền mười đô la.',
  d => { person(d, 'u', 'N', 'v'); d.p('w', 11, 5, 12, 4, 12, 5); d.p('g', 12, 6); d.r(3, 1, 10, 1, 'N'); d.p('w', 3, 12, 12, 12); }, SC);
add(G, E, 'nz-mansfield', 'Katherine Mansfield', 'Katherine Mansfield', 'Nhà văn truyện ngắn có ảnh hưởng, sinh ở Wellington và sống phần lớn đời ở châu Âu.',
  d => { person(d, 'e', 'k', 'P'); d.r(4, 3, 1, 5, 'k'); d.r(11, 3, 1, 5, 'k'); d.r(11, 11, 4, 4, 'n'); d.p('w', 12, 12, 13, 13); d.p('k', 1, 14); }, SC);
add(G, E, 'nz-batten', 'Jean Batten', 'Jean Batten', 'Nữ phi công bay một mình từ Anh về New Zealand năm 1936, lập kỷ lục thời đó.',
  d => { person(d, 'c', 'n', 'N'); d.r(4, 1, 8, 2, 'n'); d.e(5, 6, 1.4, 1.4, 'a'); d.e(11, 6, 1.4, 1.4, 'a'); d.l(0, 14, 5, 12, 'w'); d.l(15, 14, 11, 12, 'w'); d.p('w', 12, 2, 14, 3); }, SC);
add(G, E, 'nz-terauparaha', 'Te Rauparaha', 'Te Rauparaha', 'Tù trưởng Ngāti Toa, gắn với bài haka Ka Mate.',
  d => { person(d, 'R', 'k', 'n', 'S'); d.p('w', 5, 4, 11, 4); d.p('k', 6, 8, 10, 8); d.l(2, 4, 2, 15, 'W'); d.p('r', 7, 9, 9, 9); }, SC);
add(G, E, 'nz-ngata', 'Apirana Ngata', 'Apirana Ngata', 'Chính trị gia và học giả Māori đầu thế kỷ hai mươi, ủng hộ hồi sinh ngôn ngữ và nghệ thuật Māori.',
  d => { person(d, 'u', 'a', 'B', 'S'); d.r(7, 10, 2, 5, 'w'); d.r(11, 10, 3, 5, 'n'); d.p('y', 12, 12); }, SC);
add(G, E, 'nz-jackson', 'Peter Jackson', 'Peter Jackson', 'Đạo diễn của bộ phim Chúa tể những chiếc nhẫn, đưa ngành điện ảnh New Zealand ra thế giới.',
  d => { person(d, 'k', 'N', 'G'); d.p('N', 5, 7, 10, 8, 6, 9, 9, 9); d.r(11, 11, 4, 3, 'a'); d.e(13, 12, 1, 1, 'c'); d.p('y', 3, 3, 12, 2); }, SC);
add(G, E, 'nz-waititi', 'Taika Waititi', 'Taika Waititi', 'Đạo diễn, diễn viên có gốc Māori, nổi tiếng với phong cách hài hước độc đáo.',
  d => { person(d, 'y', 'k', 'o', 'S'); d.p('w', 6, 8, 10, 8); d.p('r', 8, 9); d.p('k', 4, 1, 11, 1); d.p('m', 7, 9, 9, 9); }, SC);
add(G, E, 'nz-lorde', 'Lorde', 'Lorde', 'Ca sĩ, nhạc sĩ trẻ có ảnh hưởng toàn cầu.',
  d => { person(d, 'v', 'N', 'k'); d.r(3, 3, 2, 8, 'N'); d.r(11, 3, 2, 8, 'N'); d.p('m', 8, 8); d.p('y', 2, 2, 13, 3, 4, 13); }, SC);
add(G, E, 'nz-sports', 'Richard Hadlee, Dan Carter, Sean Fitzpatrick', 'Richard Hadlee, Dan Carter, Sean Fitzpatrick', 'Những tên tuổi lớn của cricket và bóng bầu dục.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); for (const x of [2, 6, 10]) { d.e(x + 2, 5, 1.6, 1.6, 's'); d.r(x, 7, 4, 6, x === 6 ? 'w' : 'k'); d.p('w', x + 1, 9, x + 2, 9); } d.e(8, 14, 2, 1.2, 'n'); }, SC);
