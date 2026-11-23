import { add, SC, setCC } from './pass-kit.js';
setCC('au');
// Úc · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử, người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng và phong tục', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' };
const person = (d, bg, hair, body, skin = 's') => { d.bg(bg); d.e(8, 6, 3, 3.4, skin); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'au-kangaroo', 'Kangaroo (chuột túi)', 'Kangaroo', 'Loài vật biểu tượng nhất, nhảy được rất xa và mang con trong túi trước bụng. Nó xuất hiện trên huy hiệu quốc gia cùng chim emu.',
  d => { d.bg('u'); d.e(7, 10, 3.4, 4, 'o'); d.e(10, 5, 1.6, 2, 'o'); d.tri(9, 1, 2, 3, 'o'); d.tri(11, 1, 2, 3, 'o'); d.p('k', 11, 5); d.l(10, 7, 13, 9, 'o'); d.l(3, 11, 0, 15, 'O'); d.r(6, 13, 3, 2, 'O'); d.p('O', 6, 9, 8, 9); d.p('x', 12, 6); }, PET);
add(G, A, 'au-koala', 'Koala', 'Koala', 'Loài thú có túi ngủ gần như suốt ngày trên cây bạch đàn, ăn lá bạch đàn. Nó không phải gấu mà là thú có túi, và đang bị đe dọa bởi mất rừng và cháy rừng.',
  d => { d.bg('h'); d.e(8, 9, 5, 5, 'a'); d.e(3.4, 4, 2.6, 2.6, 'a'); d.e(12.6, 4, 2.6, 2.6, 'a'); d.e(3.4, 4, 1.4, 1.4, 'l'); d.e(12.6, 4, 1.4, 1.4, 'l'); d.e(8, 11, 3, 3, 'l'); d.e(8, 8, 1.6, 2, 'k'); d.p('k', 5, 7, 11, 7); d.p('w', 5, 6, 11, 6); d.r(6, 13, 4, 2, 'A'); }, PET);
add(G, A, 'au-emu', 'Emu', 'Emu', 'Chim lớn không bay được, chạy rất nhanh, cùng kangaroo nằm trên huy hiệu. Theo một giải thích phổ biến, cả hai không dễ lùi nên trông như biểu tượng của tiến lên.',
  d => { d.bg('u'); d.e(7, 10, 4.6, 3.6, 'n'); d.e(7, 10, 4, 3, 'N'); d.l(11, 8, 13, 3, 'n'); d.e(13, 2, 1.6, 1.4, 'n'); d.p('y', 14, 2, 15, 2); d.p('k', 13, 2); d.r(5, 13, 1, 3, 'O'); d.r(9, 13, 1, 3, 'O'); d.p('n', 4, 8, 10, 7); }, PET);
add(G, A, 'au-platypus', 'Thú mỏ vịt (platypus)', 'Platypus', 'Loài thú đẻ trứng, có mỏ giống vịt và chân có màng, sống ở sông suối. Khi các nhà khoa học châu Âu lần đầu thấy mẫu vật, nhiều người nghĩ đó là trò lừa.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.e(7, 10, 4.6, 2.6, 'n'); d.e(12, 9, 2.4, 1.4, 'O'); d.p('k', 11, 8); d.l(3, 10, 0, 12, 'N'); d.p('N', 5, 12, 9, 12); d.p('w', 2, 14, 10, 15); d.p('O', 14, 9); }, PET);
add(G, A, 'au-wombat', 'Wombat', 'Wombat', 'Loài thú có túi chắc nịch, đào hố và đẻ phân hình khối vuông, một đặc điểm được các nhà khoa học nghiên cứu. Nó hiền nhưng có sức mạnh đáng ngạc nhiên.',
  d => { d.bg('h'); d.e(8, 10, 6, 4, 'n'); d.e(11, 7, 2.6, 2.4, 'n'); d.p('N', 10, 5, 12, 5); d.e(13, 8, 1, 1, 'k'); d.p('k', 11, 7); d.r(4, 13, 2, 2, 'N'); d.r(10, 13, 2, 2, 'N'); d.p('t', 5, 9, 8, 8); d.r(1, 14, 2, 2, 'k'); }, PET);
add(G, A, 'au-devil', 'Quỷ Tasmania (Tasmanian devil)', 'Tasmanian devil', 'Thú ăn thịt có túi lớn nhất còn sống, chỉ ở Tasmania, nổi tiếng với tiếng gầm rít. Một bệnh ung thư lây lan từng làm số lượng giảm mạnh.',
  d => { d.bg('c'); d.e(8, 10, 5, 4, 'k'); d.e(11, 6, 3, 2.6, 'k'); d.tri(10, 2, 2, 3, 'k'); d.p('x', 11, 4); d.e(8, 11, 2, 1.4, 'w'); d.p('w', 12, 6, 13, 6); d.p('r', 13, 7); d.p('k', 12, 5); d.r(4, 13, 2, 2, 'K'); d.r(10, 13, 2, 2, 'K'); }, PET);
add(G, A, 'au-croc', 'Cá sấu nước mặn', 'Saltwater crocodile', 'Loài bò sát lớn nhất thế giới, sống ở vùng Bắc. Biển báo nguy hiểm được dựng ở nhiều sông và đầm lầy.',
  d => { d.bg('C'); d.r(0, 9, 16, 7, 'b'); d.e(8, 9, 6, 2, 'G'); d.r(10, 8, 5, 2, 'G'); d.p('k', 11, 7, 13, 7); d.p('y', 12, 7); d.p('w', 11, 9, 12, 9, 13, 9, 14, 9); d.p('g', 3, 7, 5, 7, 7, 7); d.l(1, 9, 0, 11, 'G'); d.p('w', 2, 13, 9, 14); }, PET);
add(G, A, 'au-kooka', 'Kookaburra', 'Kookaburra', 'Chim có tiếng kêu giống tiếng cười, thường kêu vào buổi sáng và hoàng hôn. Bài hát thiếu nhi về kookaburra trên cây keo rất quen thuộc.',
  d => { d.bg('c'); d.l(1, 13, 14, 13, 'N'); d.e(8, 9, 3.6, 3.6, 'w'); d.e(8, 4, 2.4, 2.4, 'w'); d.r(5, 3, 6, 1, 'n'); d.p('k', 8, 4); d.r(9, 5, 5, 2, 'k'); d.p('t', 12, 5); d.r(6, 8, 4, 3, 'n'); d.r(7, 11, 2, 2, 'o'); d.p('b', 6, 9, 10, 9); }, PET);

// ----- Tín ngưỡng và phong tục -----
add(G, B, 'au-dreaming', 'Dreaming (Dreamtime)', 'The Dreaming (Dreamtime)', 'Hệ thống niềm tin của người thổ dân về thời kỳ tổ tiên tạo ra đất, núi, sông và luật lệ sống. Đây không chỉ là quá khứ mà là thực tại tiếp diễn. Mỗi nhóm người có những câu chuyện riêng.',
  d => { d.bg('B'); d.e(8, 6, 4, 4, 'o'); d.e(8, 6, 2.4, 2.4, 'y'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.p('y', 8 + Math.cos(a) * 5.4, 6 + Math.sin(a) * 5.4); } d.r(0, 12, 16, 4, 'R'); d.p('w', 2, 13, 5, 14, 9, 13, 12, 14); d.p('l', 2, 2, 13, 3, 14, 9, 1, 8); }, SC);
add(G, B, 'au-serpent', 'Rắn cầu vồng (Rainbow Serpent)', 'The Rainbow Serpent', 'Sinh vật tổ tiên xuất hiện trong nhiều câu chuyện ở khắp lục địa, gắn với nước và sự sáng tạo. Tên gọi và chi tiết thay đổi giữa các nhóm.',
  d => { d.bg('c'); for (let i = 0; i < 6; i++) d.e(8, 14, 7 - i * 0.9, 9 - i * 1.3, ['r', 'o', 'y', 'g', 'b', 'v'][i]); d.e(8, 14, 2.6, 4, 'c'); d.r(0, 14, 16, 2, 'C'); d.e(3, 12, 1.4, 1.4, 'r'); d.p('k', 3, 12); }, SC);
add(G, B, 'au-country', 'Quan hệ với đất (Country)', 'Connection to Country', 'Người thổ dân coi đất đai là một thực thể sống có quan hệ họ hàng, không chỉ là tài sản. Nhiều cuộc họp ngày nay bắt đầu bằng lời chào đất (Welcome to Country).',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'O'); d.e(8, 10, 8, 3, 'o'); d.e(8, 4, 2, 2, 'y'); d.r(4, 6, 8, 1, 'k'); d.r(5, 7, 1, 5, 'k'); d.r(10, 7, 1, 5, 'k'); d.e(5, 6, 1.2, 1.2, 's'); d.e(11, 6, 1.2, 1.2, 's'); d.l(6, 8, 10, 8, 'r'); d.p('R', 2, 14, 13, 14); }, SC);
add(G, B, 'au-christian', 'Đạo Thiên Chúa và Tin Lành', 'Christianity', 'Ki-tô giáo từng là tôn giáo chính, nay là một trong số nhiều nhóm. Nhà thờ và trường học của các giáo hội đã có vai trò lớn trong lịch sử.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(4, 6, 8, 7, 't'); d.tri(3, 3, 10, 4, 'a'); d.r(7, 0, 2, 4, 't'); d.l(8, 0, 8, 2, 'w'); d.r(7, 10, 2, 3, 'N'); d.p('b', 5, 8, 10, 8); d.p('y', 8, 4); }, SC);
add(G, B, 'au-nonreligious', 'Người không theo tôn giáo', 'No religion', 'Một phần lớn dân số hiện nói mình không theo tôn giáo nào. Tỉ lệ này tăng qua các kỳ điều tra dân số.',
  d => { d.bg('c'); d.e(8, 7, 4, 4, 'u'); d.p('w', 6, 6, 10, 6); d.e(8, 7, 2.6, 2.6, 'w'); d.r(2, 12, 12, 4, 'g'); d.l(2, 12, 14, 12, 'G'); d.p('y', 8, 7); d.p('h', 4, 14, 11, 14); }, SC);
add(G, B, 'au-faiths', 'Đạo Hồi, Đạo Hindu và Phật giáo', 'Islam, Hinduism and Buddhism', 'Tăng theo làn sóng nhập cư từ châu Á và Trung Đông. Nhiều chùa, nhà thờ Hồi giáo và đền Hindu đã được xây ở các thành phố lớn.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.e(3, 9, 3, 3, 'w'); d.r(0, 9, 6, 4, 'w'); d.l(3, 4, 3, 6, 'y'); d.tri(6, 6, 5, 7, 'o'); d.tri(7, 4, 3, 3, 'y'); d.r(12, 6, 3, 7, 'r'); d.tri(11, 3, 5, 3, 'R'); d.p('y', 8, 9, 13, 8); }, SC);
add(G, B, 'au-mateship', 'Tinh thần "mateship" (tình bạn đồng chí)', 'Mateship', 'Giá trị đề cao sự giúp đỡ và bình đẳng giữa bạn bè. Người ta thường nhắc đến nó trong các câu chuyện của lính Anzac và người chăn nuôi.',
  d => { d.bg('u'); d.r(0, 13, 16, 3, 'O'); d.e(4, 5, 1.6, 1.6, 's'); d.r(2, 7, 5, 6, 'b'); d.e(12, 5, 1.6, 1.6, 's'); d.r(9, 7, 5, 6, 'o'); d.r(5, 6, 6, 2, 'b'); d.l(6, 8, 10, 8, 's'); d.p('n', 3, 4, 3, 3, 11, 3, 12, 3); d.p('y', 8, 2); }, SC);

// ----- Lịch sử -----
add(G, C, 'au-60k', 'Người bản địa hơn 60.000 năm', 'First Peoples for over 60,000 years', 'Bằng chứng khảo cổ cho thấy con người đã sống ở Úc từ rất lâu, đây là một trong những nền văn hóa liên tục lâu đời nhất thế giới. Họ có hàng trăm nhóm ngôn ngữ khác nhau.',
  d => { d.bg('O'); d.r(0, 11, 16, 5, 'R'); d.e(13, 4, 2.4, 2.4, 'y'); d.e(5, 8, 1.4, 1.4, 's'); d.r(4, 9, 3, 4, 'n'); d.l(7, 9, 11, 6, 'N'); d.p('y', 11, 5); d.p('k', 3, 9, 7, 8); d.p('w', 2, 13, 13, 14); d.p('r', 9, 12); }, SC);
add(G, C, 'au-cook', 'James Cook (1770)', 'James Cook (1770)', 'Nhà hàng hải người Anh dừng ở Botany Bay và tuyên bố bờ biển đông thuộc Anh. Quan điểm thời đó coi đất này là "vô chủ", điều mà sau này bị phủ nhận.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 9, 10, 2, 'N'); d.l(5, 9, 5, 2, 'n'); d.l(8, 9, 8, 3, 'n'); d.l(11, 9, 11, 4, 'n'); d.tri(3, 3, 4, 5, 'w'); d.tri(7, 4, 4, 4, 'w'); d.tri(10, 5, 4, 3, 'w'); d.p('r', 5, 2, 8, 2); d.p('w', 2, 13, 8, 14, 13, 13); }, SC);
add(G, C, 'au-firstfleet', 'Đoàn tàu đầu tiên (First Fleet, 1788)', 'The First Fleet (1788)', 'Khoảng 11 tàu chở tù nhân và lính đến Sydney Cove để lập thuộc địa tù nhân. Đây là khởi đầu cho sự định cư của người châu Âu.',
  d => { d.bg('c'); d.r(0, 10, 16, 6, 'C'); for (const [x, y] of [[1, 8], [6, 6], [11, 8]]) { d.r(x, y + 3, 4, 1, 'N'); d.l(x + 2, y + 3, x + 2, y - 1, 'n'); d.tri(x, y - 1, 4, 4, 'w'); } d.p('w', 2, 13, 7, 14, 12, 13); }, SC);
add(G, C, 'au-goldrush', 'Cơn sốt vàng (1851)', 'The Gold Rush (1851)', 'Việc phát hiện vàng ở Victoria và New South Wales thu hút hàng trăm nghìn người nhập cư từ nhiều nơi, trong đó có Trung Quốc. Dân số và đô thị tăng nhanh.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'n'); d.e(8, 11, 6, 2, 'a'); d.e(8, 11, 5, 1.2, 'c'); d.p('y', 6, 10, 9, 11, 11, 10, 7, 12); d.l(2, 6, 5, 10, 'N'); d.r(1, 5, 3, 1, 'a'); d.p('Y', 12, 7, 13, 8, 14, 7); d.p('w', 3, 14, 12, 14); }, SC);
add(G, C, 'au-federation', 'Liên bang (1901)', 'Federation (1901)', 'Sáu thuộc địa hợp nhất thành Liên bang Úc và ra đời một quốc gia mới. Canberra được chọn làm thủ đô sau này.',
  d => { d.bg('B'); d.r(1, 1, 14, 14, 'b'); d.r(1, 1, 7, 6, 'B'); d.l(1, 1, 7, 6, 'w'); d.l(7, 1, 1, 6, 'w'); d.r(4, 1, 1, 6, 'r'); d.r(1, 3, 7, 1, 'r'); d.p('w', 11, 5, 13, 8, 10, 11, 14, 11, 12, 13, 4, 11); }, SC);
add(G, C, 'au-anzac1915', 'Gallipoli và truyền thống Anzac (1915)', 'Gallipoli and the Anzac tradition (1915)', 'Cuộc đổ bộ thất bại trong Thế chiến thứ nhất trở thành biểu tượng của sự hy sinh dân tộc. Nhiều người coi đây là dấu mốc hình thành bản sắc.',
  d => { d.bg('R'); d.r(0, 12, 16, 4, 'n'); d.tri(1, 4, 8, 8, 'N'); d.r(9, 6, 5, 6, 'N'); d.e(12, 4, 1.4, 1.4, 's'); d.r(10, 5, 4, 1, 'g'); d.l(10, 7, 14, 7, 'a'); d.p('y', 3, 2, 8, 1, 13, 2); d.p('k', 2, 13, 13, 14); }, SC);
add(G, C, 'au-whiteaus', 'Chính sách Úc trắng và việc dỡ bỏ (1901–những năm 1970)', 'White Australia policy and its dismantling (1901–1970s)', 'Chính sách hạn chế nhập cư theo chủng tộc được dỡ bỏ dần sau Thế chiến thứ hai. Sau đó Úc mở cửa cho nhiều nhóm nhập cư, trong đó có người Việt đến sau 1975.',
  d => { d.bg('e'); d.r(1, 3, 14, 10, 'w'); d.r(1, 3, 14, 10, 'W'); d.r(2, 4, 12, 8, 'w'); d.l(3, 6, 12, 11, 'r'); d.l(12, 6, 3, 11, 'r'); d.p('b', 3, 5, 5, 5, 10, 5, 12, 5); d.r(0, 14, 16, 1, 'k'); }, SC);
add(G, C, 'au-stolen', 'Thế hệ bị lấy đi (Stolen Generations) và lời xin lỗi 2008', 'The Stolen Generations and the 2008 apology', 'Nhiều trẻ thổ dân bị chính quyền tách khỏi gia đình trong hơn một thế kỷ. Năm 2008, thủ tướng khi đó đã chính thức xin lỗi tại Quốc hội.',
  d => { d.bg('P'); d.e(5, 6, 1.4, 1.4, 's'); d.r(4, 8, 3, 5, 'o'); d.e(11, 6, 1.4, 1.4, 's'); d.r(10, 8, 3, 5, 'b'); d.l(7, 9, 9, 9, 'x'); d.e(8, 3, 2, 2, 'r'); d.p('R', 8, 3); d.r(0, 14, 16, 2, 'V'); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'au-mabo', 'Eddie Koiki Mabo', 'Eddie Koiki Mabo', 'Người đảo dân Meriam ở Torres Strait, đứng đầu vụ kiện đã thay đổi luật đất đai của Úc. Câu chuyện của ông được kể chi tiết ở cuối nhóm này.',
  d => { person(d, 'c', 'k', 'o', 'S'); d.r(4, 2, 8, 2, 'k'); d.p('k', 7, 7, 9, 7); d.p('w', 7, 9, 8, 9); d.r(1, 13, 3, 3, 'N'); d.r(12, 10, 3, 5, 'Y'); d.p('y', 13, 11); }, SC);
add(G, E, 'au-bradman', 'Don Bradman', 'Don Bradman', 'Cầu thủ cricket được nhiều người coi là vua của môn này, với trung bình điểm gần 100. Tên ông đã trở thành biểu tượng của sự xuất sắc.',
  d => { person(d, 'g', 'n', 'w'); d.r(4, 2, 8, 2, 'G'); d.r(3, 3, 10, 1, 'G'); d.l(13, 6, 13, 14, 'n'); d.r(12, 3, 3, 4, 'n'); d.p('r', 8, 12, 8, 13); d.p('G', 5, 8, 10, 8); }, SC);
add(G, E, 'au-kelly', 'Ned Kelly', 'Ned Kelly', 'Tên cướp bush thế kỷ 19 ở Victoria, mặc bộ giáp sắt tự chế khi giao tranh và bị xử tử năm 1880. Người Úc có ý kiến rất khác nhau về ông, nhiều người xem là biểu tượng chống đối quyền lực.',
  d => { d.bg('u'); d.r(4, 3, 8, 11, 'a'); d.r(5, 1, 6, 3, 'A'); d.r(4, 3, 8, 1, 'l'); d.r(5, 5, 6, 1, 'k'); d.p('k', 6, 5, 9, 5); d.r(7, 3, 2, 3, 'A'); d.r(5, 7, 6, 5, 'A'); d.p('l', 6, 8, 9, 8); d.r(3, 14, 10, 1, 'K'); }, SC);
add(G, E, 'au-melba', 'Nellie Melba', 'Nellie Melba', 'Nữ ca sĩ opera nổi tiếng thế giới đầu thế kỷ 20, sinh ở Melbourne. Món tráng miệng Peach Melba và bánh mì nướng Melba toast mang tên bà.',
  d => { person(d, 'P', 'N', 'v'); d.r(3, 2, 10, 3, 'N'); d.p('N', 3, 5, 12, 5); d.p('y', 8, 1, 6, 1, 10, 1); d.r(6, 9, 4, 2, 'x'); d.e(13, 11, 1.8, 1.8, 'o'); d.p('r', 13, 11); }, SC);
add(G, E, 'au-freeman', 'Cathy Freeman', 'Cathy Freeman', 'Vận động viên chạy 400 m, người thổ dân đạt huy chương vàng Olympic Sydney 2000. Cô thắp ngọn đuốc tại lễ khai mạc.',
  d => { person(d, 'B', 'k', 'g', 'S'); d.r(4, 2, 8, 2, 'k'); d.p('k', 4, 4, 11, 4); d.r(4, 9, 8, 3, 'y'); d.l(12, 7, 14, 2, 'a'); d.tri(13, 0, 3, 3, 'o'); d.p('y', 14, 1); }, SC);
add(G, E, 'au-irwin', 'Steve Irwin', 'Steve Irwin', 'Nhà bảo tồn động vật hoang dã, người dẫn chương trình "The Crocodile Hunter", mất năm 2006. Ông được nhiều người nhớ đến với tình yêu động vật.',
  d => { person(d, 'h', 'n', 'o'); d.r(4, 1, 8, 3, 'n'); d.r(2, 3, 12, 1, 'n'); d.r(4, 9, 8, 3, 'n'); d.p('k', 4, 14); d.e(13, 12, 2, 1.2, 'G'); d.p('w', 12, 11, 14, 11); }, SC);
add(G, E, 'au-namatjira', 'Albert Namatjira', 'Albert Namatjira', 'Họa sĩ thổ dân nổi tiếng với tranh màu nước phong cảnh Trung Úc. Ông là một trong những nghệ sĩ thổ dân được biết đến rộng rãi sớm nhất.',
  d => { person(d, 'u', 'k', 'w', 'S'); d.r(4, 2, 8, 2, 'k'); d.r(10, 9, 5, 6, 'c'); d.r(10, 12, 5, 3, 'O'); d.tri(11, 10, 3, 3, 'R'); d.l(2, 15, 6, 11, 'n'); d.p('r', 2, 15); }, SC);
