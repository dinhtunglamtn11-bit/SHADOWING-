import { add, SC, setCC } from './pass-kit.js';
setCC('gh');
// Ghana · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử, người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' };

// ----- Con vật và linh vật -----
add(G, A, 'gh-elephant', 'Voi rừng', 'Forest elephant', 'Loài voi sống ở Vườn quốc gia Mole và một số khu rừng, là động vật dễ thấy nhất khi đi safari. Voi tượng trưng cho sức mạnh và địa vị.',
  d => { d.bg('u'); d.e(8, 8, 6, 4.4, 'a'); d.e(4, 6, 2.6, 3, 'a'); d.e(4, 6, 1.6, 2, 'x'); d.l(3, 8, 2, 13, 'A'); d.r(5, 11, 2, 4, 'A'); d.r(10, 11, 2, 4, 'A'); d.p('k', 5, 5); d.p('w', 3, 9, 2, 12); d.p('A', 12, 8, 13, 9); d.l(14, 7, 15, 6, 'a'); }, PET);
add(G, A, 'gh-monkey', 'Khỉ Mona và khỉ đuôi dài ở Boabeng-Fiema', 'Mona and colobus monkeys of Boabeng-Fiema', 'Người dân hai làng này coi khỉ là linh vật thiêng liêng, không được làm hại. Khi một con khỉ chết, dân làng tổ chức lễ chôn cất.',
  d => { d.bg('g'); d.e(8, 9, 3.4, 4, 'k'); d.e(8, 5, 2.6, 2.6, 'k'); d.e(8, 6, 1.8, 1.6, 'W'); d.p('w', 6, 3, 10, 3, 5, 9, 11, 9); d.p('k', 7, 5, 9, 5); d.l(11, 11, 15, 8, 'k'); d.l(11, 12, 14, 14, 'k'); d.p('W', 7, 7, 8, 7); d.r(6, 13, 4, 2, 'k'); }, PET);
add(G, A, 'gh-crocodile', 'Cá sấu thiêng liêng ở Paga', 'The sacred crocodiles of Paga', 'Cá sấu ở đầm Paga được người dân coi là hồn tổ tiên và được chăm nuôi lâu đời. Du khách có thể đứng gần cá sấu dưới sự hướng dẫn của dân làng.',
  d => { d.bg('C'); d.e(8, 9, 7, 2.6, 'G'); d.e(13, 8, 2.6, 1.6, 'G'); d.p('w', 14, 8, 12, 8); d.p('k', 13, 7); d.p('g', 4, 8, 7, 7, 9, 7, 6, 10, 10, 10); d.p('h', 2, 9, 3, 10); d.l(2, 9, 0, 11, 'G'); d.r(0, 12, 16, 4, 'c'); d.p('w', 3, 13, 9, 14); d.r(4, 11, 1, 2, 'G'); d.r(9, 11, 1, 2, 'G'); }, PET);
add(G, A, 'gh-blackstar', 'Ngôi sao đen (Black Star)', 'The Black Star', 'Ngôi sao đen trên cờ và áo đội tuyển là biểu tượng của tự do châu Phi. Đây không phải một loài vật mà là hình ảnh biểu tượng.',
  d => { d.bg('y'); d.r(0, 0, 16, 4, 'r'); d.r(0, 12, 16, 4, 'g'); d.tri(5, 3, 6, 5, 'k'); d.dtri(3, 7, 10, 4, 'k'); d.tri(3, 7, 4, 3, 'k'); d.tri(9, 7, 4, 3, 'k'); d.r(6, 5, 4, 5, 'k'); d.p('k', 8, 2, 8, 11, 4, 7, 12, 7); }, SC);
add(G, A, 'gh-ananse-spider', 'Nhện Ananse', 'Ananse the spider', 'Nhân vật trung tâm của truyền thuyết dân gian Akan, thường là kẻ mưu mẹo nhỏ bé nhưng khôn ngoan. Đây là nhân vật trong truyền thuyết, không phải sự thật.',
  d => { d.bg('Y'); d.e(8, 8, 2.8, 2.6, 'k'); d.e(8, 4, 1.8, 1.6, 'k'); d.l(6, 6, 2, 4, 'k'); d.l(6, 8, 1, 8, 'k'); d.l(6, 9, 2, 13, 'k'); d.l(10, 6, 14, 4, 'k'); d.l(10, 8, 15, 8, 'k'); d.l(10, 9, 14, 13, 'k'); d.p('r', 7, 4, 9, 4); d.p('y', 8, 8); d.r(6, 11, 4, 2, 'k'); }, PET);
add(G, A, 'gh-wildlife', 'Linh dương và chim hoang dã', 'Antelopes and wild birds', 'Những loài chim và động vật nhỏ quen thuộc trong rừng và đồng cỏ. Chúng được nhắc tới trong tục ngữ và truyện dân gian.',
  d => { d.bg('h'); d.e(6, 9, 4, 2.8, 'o'); d.r(3, 11, 1, 4, 'O'); d.r(8, 11, 1, 4, 'O'); d.e(10, 6, 1.6, 1.8, 'o'); d.l(9, 4, 8, 1, 'N'); d.l(11, 4, 12, 1, 'N'); d.p('k', 10, 6); d.p('w', 5, 10, 7, 10); d.e(13, 11, 1.8, 1.4, 'r'); d.e(14, 9, 1, 1, 'r'); d.p('y', 15, 9); }, PET);

// ----- Tín ngưỡng -----
add(G, B, 'gh-christianity', 'Ki-tô giáo', 'Christianity', 'Là tôn giáo của đa số dân số, gồm Công giáo, Tin Lành và các giáo phái Phục Lâm. Nhà thờ đông đúc vào ngày Chủ nhật và âm nhạc gospel rất phát triển.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 7, 10, 7, 'w'); d.tri(2, 4, 12, 3, 'R'); d.r(7, 0, 2, 5, 'w'); d.r(5, 1, 6, 1, 'w'); d.r(7, 10, 2, 4, 'N'); d.p('b', 4, 9, 11, 9, 4, 11, 11, 11); d.p('y', 7, 8); d.p('g', 1, 13, 14, 13); }, SC);
add(G, B, 'gh-islam', 'Hồi giáo', 'Islam', 'Chiếm một phần đáng kể dân số, đặc biệt ở miền bắc và các thành phố lớn. Các đại lễ như Eid được cả nước nghỉ lễ.',
  d => { d.bg('B'); d.r(0, 13, 16, 3, 'k'); d.fan(8, 11, 5, 'W'); d.r(3, 11, 10, 3, 'W'); d.r(2, 5, 2, 9, 'w'); d.r(12, 5, 2, 9, 'w'); d.tri(2, 3, 2, 2, 'g'); d.tri(12, 3, 2, 2, 'g'); d.p('y', 8, 5, 8, 4); d.p('y', 7, 4, 9, 4); d.p('k', 7, 12, 8, 12, 7, 13); d.p('y', 12, 2, 3, 1); }, SC);
add(G, B, 'gh-traditional', 'Tín ngưỡng truyền thống', 'Traditional beliefs', 'Nhiều người vẫn tôn trọng tổ tiên, các vị thần và thầy cúng. Những nghi lễ này thường hòa cùng niềm tin Ki-tô giáo hoặc Hồi giáo.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'N'); d.e(8, 11, 4, 2, 'n'); d.r(6, 8, 4, 3, 'n'); d.e(8, 7, 2, 1.6, 'n'); d.p('k', 7, 7, 9, 7, 8, 8); d.p('y', 4, 10, 12, 10, 8, 5); d.p('r', 3, 6, 13, 6); d.p('w', 2, 3, 6, 2, 11, 3, 13, 2); d.p('o', 5, 13, 10, 14); }, SC);
add(G, B, 'gh-nyame', 'Nyame và thần linh Akan', 'Nyame and the Akan spirits', 'Nyame là vị thần tối cao trong quan niệm của người Akan, được nhắc tới trong biểu tượng Gye Nyame. Nhiều người tin tổ tiên vẫn che chở gia đình.',
  d => { d.bg('c'); d.fan(8, 8, 7, 'u'); d.e(8, 8, 3, 3, 'y'); for (let a = 0; a < 12; a++) { const t = a / 12 * 6.28; d.put(8 + Math.cos(t) * 5.4, 8 + Math.sin(t) * 5.4, 'o'); } d.r(0, 12, 16, 4, 'G'); d.p('k', 7, 7, 9, 7, 8, 9); d.p('w', 3, 3, 13, 2); }, SC);
add(G, B, 'gh-vodun', 'Đạo Vodun của người Ewe', 'Vodun of the Ewe people', 'Tín ngưỡng có nhiều thần và đền thờ nhỏ ở miền đông. Đây là một phần di sản chung của vùng Tây Phi.',
  d => { d.bg('v'); d.r(0, 12, 16, 4, 'V'); d.r(4, 7, 8, 5, 'W'); d.tri(3, 4, 10, 3, 'o'); d.r(7, 9, 2, 3, 'N'); d.p('r', 5, 8, 10, 8); d.e(8, 3, 1.6, 1.6, 'y'); d.p('w', 2, 2, 14, 3, 5, 14, 11, 14); d.p('y', 4, 12, 12, 12); d.p('g', 1, 10, 14, 10); }, SC);

// ----- Lịch sử -----
add(G, C, 'gh-ashantikingdom', 'Vương quốc Ashanti (thế kỷ XVII đến XIX)', 'The Ashanti Kingdom (17th–19th centuries)', 'Một liên minh quyền lực do Osei Tutu lập nên, với biểu tượng là Ghế Vàng. Vương quốc giàu nhờ vàng và buôn bán, chống lại người Anh qua nhiều cuộc chiến.',
  d => { d.bg('G'); d.e(8, 10, 6, 2.4, 'y'); d.r(3, 5, 10, 5, 'y'); d.r(2, 4, 12, 2, 'Y'); d.p('o', 5, 7, 8, 8, 11, 7); d.p('k', 3, 4, 12, 4); d.e(8, 11, 4, 1.4, 'Y'); d.r(0, 13, 16, 3, 'N'); d.p('y', 2, 14, 13, 14); d.p('r', 1, 1, 14, 1); }, SC);
add(G, C, 'gh-europeans', 'Người châu Âu đến bờ biển (từ 1471)', 'Europeans arrive on the coast (from 1471)', 'Người Bồ Đào Nha tới trước, rồi đến người Hà Lan và người Anh. Vùng này được gọi là Bờ Biển Vàng (Gold Coast) vì nguồn vàng.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); d.r(0, 10, 16, 1, 'c'); d.tri(4, 3, 8, 6, 'w'); d.r(7, 2, 1, 8, 'N'); d.r(3, 9, 10, 2, 'N'); d.r(6, 0, 4, 1, 'r'); d.p('w', 2, 13, 8, 14, 13, 13); d.r(13, 8, 3, 4, 'y'); d.p('Y', 14, 9); }, SC);
add(G, C, 'gh-slavetrade', 'Buôn nô lệ xuyên Đại Tây Dương', 'The transatlantic slave trade', 'Pháo đài ven biển trở thành nơi giam giữ người bị đưa đi châu Mỹ. Di sản này vẫn được nhớ đến ở Cape Coast và Elmina.',
  d => { d.bg('K'); d.r(0, 12, 16, 4, 'k'); d.r(2, 3, 12, 9, 'a'); d.r(2, 3, 12, 1, 'l'); d.r(5, 6, 6, 6, 'k'); d.fan(8, 8, 3, 'k'); d.r(6, 8, 4, 4, 'i'); d.p('w', 8, 2, 2, 1, 13, 1); d.p('y', 8, 7); d.p('A', 3, 5, 12, 5, 3, 9, 12, 9); }, SC);
add(G, C, 'gh-british', 'Thời thuộc Anh (thế kỷ XIX đến XX)', 'British rule (19th–20th centuries)', 'Anh lập thuộc địa Bờ Biển Vàng và dần mở rộng vào nội địa, gồm cả đất Ashanti. Quá trình này kéo dài qua nhiều cuộc xung đột.',
  d => { d.bg('B'); d.r(0, 0, 16, 16, 'B'); d.l(0, 0, 15, 15, 'w'); d.l(15, 0, 0, 15, 'w'); d.l(0, 1, 14, 15, 'r'); d.l(15, 1, 1, 15, 'r'); d.r(7, 0, 2, 16, 'w'); d.r(0, 7, 16, 2, 'w'); d.r(7, 0, 2, 16, 'r'); d.r(0, 7, 16, 2, 'r'); d.r(7, 6, 2, 1, 'w'); d.r(7, 9, 2, 1, 'w'); }, SC);
add(G, C, 'gh-1957', 'Năm 1957: Độc lập', '1957: Independence', 'Ngày 6 tháng 3 năm 1957, Ghana là nước đầu tiên ở hạ Sahara giành độc lập khỏi châu Âu. Kwame Nkrumah trở thành thủ tướng và sau đó là tổng thống đầu tiên.',
  d => { d.bg('r'); d.r(0, 5, 16, 6, 'y'); d.r(0, 11, 16, 5, 'g'); d.tri(5, 5, 6, 5, 'k'); d.dtri(3, 8, 10, 3, 'k'); d.r(7, 6, 2, 4, 'k'); d.p('k', 8, 4, 3, 7, 13, 7, 8, 11); d.p('w', 2, 13, 4, 13, 6, 13, 9, 13, 11, 13); d.r(0, 0, 16, 1, 'R'); }, SC);
add(G, C, 'gh-1966', 'Năm 1966 và các cuộc đảo chính', '1966 and the military coups', 'Nkrumah bị lật đổ khi ông đang đi nước ngoài, rồi đất nước trải qua nhiều cuộc đảo chính quân sự. Jerry Rawlings nắm quyền năm 1979 và lại năm 1981.',
  d => { d.bg('a'); d.r(0, 12, 16, 4, 'K'); d.r(3, 5, 4, 7, 'G'); d.e(5, 4, 1.8, 1.8, 'n'); d.r(3, 2, 4, 2, 'G'); d.r(9, 5, 4, 7, 'G'); d.e(11, 4, 1.8, 1.8, 'n'); d.r(9, 2, 4, 2, 'G'); d.l(7, 6, 9, 9, 'k'); d.p('y', 4, 7, 11, 7, 5, 2, 11, 2); d.p('r', 1, 1, 14, 1); }, SC);
add(G, C, 'gh-1992', 'Năm 1992: Quay lại dân chủ', '1992: The return to democracy', 'Hiến pháp mới đưa Ghana vào thời kỳ bầu cử đa đảng. Ghana thường được nhắc tới như một trong những nền dân chủ ổn định ở Tây Phi.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 7, 10, 6, 'W'); d.r(3, 7, 10, 1, 'w'); d.r(7, 7, 2, 1, 'k'); d.l(8, 1, 8, 6, 'w'); d.r(5, 2, 6, 3, 'w'); d.p('k', 8, 3); d.r(2, 14, 12, 1, 'y'); d.p('r', 5, 10, 8, 10, 10, 10); d.p('y', 6, 9, 9, 9); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'gh-nkrumah', 'Kwame Nkrumah', 'Kwame Nkrumah', 'Nhà lãnh đạo độc lập và người ủng hộ mạnh mẽ tinh thần đoàn kết châu Phi. Nhiều người Ghana xem ông là người sáng lập quốc gia.',
  d => { d.bg('y'); d.e(8, 7, 3, 3.4, 'n'); d.r(5, 3, 6, 2, 'k'); d.p('k', 5, 5, 10, 5); d.p('k', 7, 7, 9, 7); d.p('w', 6, 6, 10, 6); d.r(4, 11, 8, 5, 'W'); d.r(6, 10, 4, 1, 'n'); d.p('g', 7, 12, 8, 13); d.p('r', 8, 12); d.p('k', 2, 2, 13, 2); }, SC);
add(G, E, 'gh-annan', 'Kofi Annan', 'Kofi Annan', 'Người Ghana đầu tiên làm Tổng thư ký Liên Hợp Quốc (1997–2006) và đạt giải Nobel Hòa bình năm 2001. Ông mất năm 2018.',
  d => { d.bg('c'); d.e(8, 7, 3, 3.4, 'n'); d.e(8, 4, 3.2, 1.6, 'a'); d.p('a', 5, 5, 10, 5); d.p('k', 7, 7, 9, 7); d.r(4, 11, 8, 5, 'B'); d.r(6, 10, 4, 1, 'n'); d.r(7, 11, 2, 4, 'w'); d.p('c', 8, 12, 8, 13); d.p('y', 13, 3, 2, 3); d.e(13, 3, 1.4, 1.4, 'w'); }, SC);
add(G, E, 'gh-yaa', 'Yaa Asantewaa', 'Yaa Asantewaa', 'Nữ hoàng mẹ Ashanti lãnh đạo cuộc nổi dậy chống Anh năm 1900 khi người Anh đòi Ghế Vàng. Bà được nhớ đến như biểu tượng của lòng dũng cảm.',
  d => { d.bg('r'); d.e(8, 7, 3, 3.4, 'n'); d.r(4, 3, 8, 2, 'y'); d.r(5, 2, 6, 1, 'Y'); d.p('k', 7, 7, 9, 7); d.p('r', 8, 9); d.r(4, 11, 8, 5, 'y'); d.r(6, 10, 4, 1, 'n'); d.p('g', 5, 12, 10, 12, 7, 14); d.p('k', 6, 13, 9, 15); d.p('y', 2, 6, 13, 6); }, SC);
add(G, E, 'gh-abedi', 'Abedi Pele', 'Abedi Pele', 'Huyền thoại bóng đá Ghana, ba lần giành giải Cầu thủ xuất sắc nhất châu Phi và vô địch Champions League với Marseille năm 1993. Các con trai của ông cũng là cầu thủ chuyên nghiệp.',
  d => { d.bg('g'); d.e(8, 6, 3, 3.2, 'n'); d.r(5, 2, 6, 2, 'k'); d.p('k', 5, 4, 10, 4, 7, 6, 9, 6); d.r(4, 10, 8, 6, 'w'); d.r(4, 10, 8, 1, 'c'); d.p('c', 5, 12, 10, 12); d.p('k', 7, 8); d.r(12, 12, 3, 3, 'w'); d.p('k', 13, 13); d.p('y', 2, 2, 13, 2); }, SC);
add(G, E, 'gh-nelson', 'Azumah Nelson', 'Azumah Nelson', 'Võ sĩ quyền anh từ Accra, vô địch thế giới nhiều hạng cân và được vào Đền danh tiếng. Ông là biểu tượng quyền anh của Ghana.',
  d => { d.bg('R'); d.e(8, 5, 2.6, 2.8, 'n'); d.p('k', 7, 5, 9, 5, 8, 6); d.r(5, 8, 6, 5, 'n'); d.r(2, 8, 4, 4, 'r'); d.r(10, 8, 4, 4, 'r'); d.r(2, 8, 4, 1, 'w'); d.r(10, 8, 4, 1, 'w'); d.r(5, 12, 6, 3, 'y'); d.p('g', 6, 13, 9, 13); d.p('y', 1, 14, 14, 14); }, SC);
add(G, E, 'gh-mensah', 'E.T. Mensah', 'E.T. Mensah', 'Nhạc sĩ tiên phong của highlife, chơi kèn trumpet và dẫn nhiều ban nhạc. Ông được xem là "vua highlife".',
  d => { d.bg('B'); d.e(7, 6, 2.6, 3, 'n'); d.r(4, 2, 7, 2, 'k'); d.p('k', 6, 6, 8, 6); d.r(4, 10, 7, 6, 'w'); d.r(6, 10, 3, 5, 'k'); d.p('r', 7, 10); d.l(9, 9, 14, 6, 'y'); d.r(13, 4, 3, 4, 'y'); d.p('Y', 14, 5, 15, 6); d.p('y', 2, 2, 12, 1); }, SC);
add(G, E, 'gh-aidoo', 'Ama Ata Aidoo', 'Ama Ata Aidoo', 'Nhà văn, nhà viết kịch Ghana với "Our Sister Killjoy". Tác phẩm của bà được đọc rộng rãi ở châu Phi.',
  d => { d.bg('p'); d.e(8, 7, 3, 3.4, 'n'); d.e(8, 4, 3.6, 2.2, 'k'); d.p('k', 7, 7, 9, 7); d.p('r', 8, 9); d.r(4, 11, 8, 5, 'g'); d.r(6, 10, 4, 1, 'n'); d.r(11, 11, 4, 4, 'w'); d.r(11, 11, 1, 4, 'R'); d.p('k', 12, 12, 13, 13); d.p('y', 3, 11, 12, 3); }, SC);
