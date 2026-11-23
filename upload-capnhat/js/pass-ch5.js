import { add, SC, setCC } from './pass-kit.js';
setCC('ch');
// Thụy Sĩ · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử, người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng và phong tục', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const person = (d, bg, hair, body, skin = 's') => { d.bg(bg); d.e(8, 6, 3, 3.4, skin); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'ch-bernard', 'Chó Saint Bernard', 'Saint Bernard dog', 'Giống chó to lớn từng được nuôi ở tự viện trên đèo Great St Bernard để tìm người bị kẹt trong tuyết. Hình ảnh chú chó mang thùng rượu nhỏ quanh cổ phần lớn là do tranh vẽ và truyện kể, không có bằng chứng rõ ràng.',
  d => { d.bg('l'); d.e(8, 9, 5.6, 5, 'n'); d.e(8, 11, 3.4, 3, 'w'); d.e(3.5, 6, 1.8, 2.6, 'N'); d.e(12.5, 6, 1.8, 2.6, 'N'); d.r(6, 4, 4, 3, 'w'); d.p('k', 6, 8, 10, 8, 8, 10); d.p('r', 8, 12); d.r(6, 13, 4, 1, 'r'); }, PET);
add(G, A, 'ch-simmental', 'Bò núi Simmental và bò nâu Thụy Sĩ', 'Simmental and Brown Swiss cattle', 'Những giống bò sữa nổi tiếng, cho sữa dồi dào dùng làm phô mai và sô cô la. Chúng là hình ảnh quen thuộc trên bãi cỏ núi.',
  d => { d.bg('h'); d.e(8, 9, 5, 4, 'o'); d.e(8, 11, 3, 2.6, 'w'); d.e(8, 5, 3, 2.6, 'w'); d.p('w', 5, 4, 11, 4); d.p('y', 4, 3, 12, 3); d.p('k', 7, 5, 9, 5, 7, 12, 9, 12); d.r(4, 13, 2, 2, 'w'); d.r(10, 13, 2, 2, 'w'); d.p('n', 4, 8, 12, 8); }, PET);
add(G, A, 'ch-steinbock', 'Dê đá (Steinbock)', 'Alpine ibex (Steinbock)', 'Loài dê núi có sừng cong dài, từng gần bị diệt chủng rồi được tái thả vào núi vào thế kỷ 20. Nó là biểu tượng của bang Graubünden.',
  d => { d.bg('a'); d.e(8, 9, 4.6, 4, 'n'); d.e(11, 6, 2.4, 2.4, 'n'); d.l(10, 4, 8, 1, 'W'); d.l(11, 4, 9, 2, 'W'); d.l(8, 1, 6, 3, 'W'); d.p('W', 10, 3, 9, 3); d.p('k', 12, 6, 4, 8); d.r(5, 12, 1, 3, 'N'); d.r(10, 12, 1, 3, 'N'); d.p('t', 12, 8, 7, 11); }, PET);
add(G, A, 'ch-bernbear', 'Gấu Bern (Berner Bär)', 'Bern bear', 'Gấu là biểu tượng của thủ đô Bern, có mặt trên cờ và huy hiệu thành phố. Hiện nay có khu nuôi gấu ở Bärenpark bên bờ sông Aare.',
  d => { d.bg('h'); d.e(8, 9, 5.6, 5.2, 'n'); d.e(3.5, 4, 2, 2, 'n'); d.e(12.5, 4, 2, 2, 'n'); d.e(8, 11, 3, 2.6, 't'); d.p('k', 6, 7, 10, 7, 8, 10); d.r(7, 11, 2, 1, 'k'); d.p('r', 8, 12, 8, 13); d.r(4, 13, 2, 2, 'N'); d.r(10, 13, 2, 2, 'N'); }, PET);
add(G, A, 'ch-marmot', 'Marmot và chamois', 'Marmots and chamois', 'Những loài vật đặc trưng của vùng núi cao, thường được du khách nhìn thấy khi đi bộ. Chamois nhanh nhẹn trên sườn đá dốc.',
  d => { d.bg('h'); d.e(7, 10, 4.4, 3.4, 'n'); d.e(11, 7, 2.2, 2.2, 'n'); d.p('w', 12, 6); d.p('k', 12, 7, 13, 8); d.l(12, 8, 14, 8, 'N'); d.r(4, 12, 2, 3, 'N'); d.r(8, 12, 2, 3, 'N'); d.l(3, 10, 0, 12, 'n'); d.p('t', 6, 9, 9, 9, 11, 9); }, PET);
add(G, A, 'ch-bartgeier', 'Kền kền râu (Bartgeier)', 'Bearded vulture (Bartgeier)', 'Loài chim ăn xác lớn từng bị diệt ở dãy Alps và được tái thả lại từ cuối thế kỷ 20. Sự trở lại của chúng là kết quả của các chương trình bảo tồn.',
  d => { d.bg('c'); d.e(8, 8, 3, 3, 'n'); d.l(5, 8, 0, 5, 'N'); d.l(11, 8, 15, 5, 'N'); d.l(5, 9, 1, 8, 'N'); d.l(11, 9, 15, 8, 'N'); d.e(8, 5, 1.8, 1.8, 'w'); d.p('y', 9, 5, 10, 6); d.p('k', 8, 5, 8, 7, 7, 8); d.p('o', 8, 10); d.r(7, 11, 2, 2, 'N'); }, PET);
add(G, A, 'ch-heidi', 'Heidi và chú dê', 'Heidi and the goat', 'Nhân vật cô bé miền núi và đàn dê đến từ tiểu thuyết của Johanna Spyri năm 1880. Cô bé đã trở thành biểu tượng của vùng núi Thụy Sĩ với du khách.',
  d => { d.bg('c'); d.tri(5, 1, 10, 7, 'a'); d.r(0, 9, 16, 7, 'g'); d.e(5, 7, 1.6, 1.6, 's'); d.r(3, 5, 4, 1, 'n'); d.r(4, 9, 3, 4, 'r'); d.r(4, 12, 1, 2, 's'); d.r(6, 12, 1, 2, 's'); d.e(11, 11, 2.4, 1.6, 'w'); d.p('k', 13, 10); d.r(10, 12, 1, 2, 'w'); d.r(12, 12, 1, 2, 'w'); d.l(13, 9, 14, 8, 'W'); }, SC);
add(G, A, 'ch-helvetia', 'Helvetia', 'Helvetia', 'Hình ảnh người phụ nữ đại diện cho nước Thụy Sĩ, xuất hiện trên tiền xu và tượng đài. Tên Latin "Confoederatio Helvetica" cũng là lý do nước này có mã CH.',
  d => { d.bg('r'); d.e(8, 5, 2.4, 2.8, 's'); d.r(5, 2, 6, 2, 'Y'); d.p('y', 6, 1, 8, 0, 10, 1); d.r(5, 8, 6, 7, 'w'); d.r(4, 9, 1, 5, 'b'); d.l(12, 7, 12, 14, 'Y'); d.p('Y', 12, 6); d.e(4, 11, 2, 2, 'r'); d.p('w', 4, 10, 3, 11, 5, 11, 4, 12); d.p('k', 7, 5, 9, 5); }, SC);

// ----- Tín ngưỡng và phong tục -----
add(G, B, 'ch-reform', 'Cải cách Tin Lành ở Zurich và Geneva', 'The Reformation in Zurich and Geneva', 'Huldrych Zwingli ở Zurich và John Calvin ở Geneva đã dẫn dắt những phong trào tách khỏi Giáo hội Công giáo vào thế kỷ 16. Những tư tưởng này ảnh hưởng mạnh đến nếp sống và lối làm việc cần mẫn của người dân.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(4, 6, 8, 7, 'e'); d.tri(3, 2, 10, 5, 'a'); d.r(7, 0, 2, 3, 'e'); d.r(7, 0, 2, 1, 'k'); d.r(7, 9, 2, 4, 'N'); d.e(8, 5, 1.2, 1.2, 'y'); d.r(5, 7, 1, 2, 'b'); d.r(10, 7, 1, 2, 'b'); }, SC);
add(G, B, 'ch-churches', 'Giáo hội Công giáo và Tin Lành', 'Catholic and Protestant communities', 'Thụy Sĩ có cả hai cộng đồng lớn, phân bố khác nhau theo từng bang. Sự chia rẽ từng dẫn đến một cuộc nội chiến ngắn vào thế kỷ 19.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(1, 6, 6, 7, 'W'); d.tri(1, 2, 6, 4, 'a'); d.l(4, 2, 4, 0, 'k'); d.l(3, 1, 5, 1, 'k'); d.r(9, 4, 6, 9, 'e'); d.tri(9, 1, 6, 4, 'R'); d.l(12, 1, 12, 0, 'k'); d.r(3, 9, 2, 4, 'N'); d.r(11, 9, 2, 4, 'N'); }, SC);
add(G, B, 'ch-einsiedeln', 'Tu viện Einsiedeln', 'Einsiedeln Abbey', 'Nơi hành hương lâu đời của người Công giáo, xuất hiện từ thế kỷ 10. Tượng Đức Mẹ đen trong đại thánh đường thu hút nhiều khách hành hương.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 6, 12, 7, 'w'); d.r(5, 3, 6, 4, 'W'); d.e(5, 2, 1.8, 2.4, 'a'); d.e(11, 2, 1.8, 2.4, 'a'); d.r(7, 9, 2, 4, 'k'); d.p('y', 3, 8, 12, 8, 8, 5); d.p('k', 4, 10, 11, 10); }, SC);
add(G, B, 'ch-stgallen', 'Tu viện St. Gallen', 'St. Gallen Abbey', 'Khu tu viện có thư viện bản thảo cổ, được UNESCO công nhận. Nó là trung tâm học thuật quan trọng từ thời Trung cổ.',
  d => { d.bg('P'); d.r(1, 2, 14, 12, 'n'); d.r(2, 3, 12, 10, 'N'); for (const x of [3, 7, 11]) for (let y = 4; y < 12; y += 3) { d.r(x, y, 2, 2, ['r', 'y', 'b', 'g'][(x + y) % 4]); } d.p('Y', 2, 3, 13, 3); d.r(0, 14, 16, 2, 'N'); }, SC);
add(G, B, 'ch-samichlaus', 'Lễ Giáng sinh và Samichlaus', 'Christmas and Samichlaus', 'Ngày 6 tháng 12, ông già Samichlaus (gần như Thánh Nicholas) đi cùng Schmutzli phát quà cho trẻ. Trẻ em thường đọc thơ hoặc hát để được nhận quà.',
  d => { d.bg('B'); d.e(8, 7, 3, 3.4, 's'); d.tri(4, 1, 8, 5, 'r'); d.e(8, 10, 4, 3, 'w'); d.p('k', 7, 6, 9, 6); d.r(5, 12, 6, 3, 'r'); d.p('y', 8, 0); d.e(13, 13, 2, 2, 'n'); d.p('y', 13, 13); d.p('w', 1, 2, 14, 3); }, SC);
add(G, B, 'ch-winterghost', 'Phong tục đuổi mùa đông', 'Winter-chasing customs', 'Nhiều làng đốt lửa, rung chuông để "đuổi mùa đông" theo truyền thống. Đây là những phong tục dân gian lâu đời.',
  d => { d.bg('k'); d.r(0, 13, 16, 3, 'w'); d.tri(3, 4, 10, 9, 'o'); d.tri(5, 6, 6, 7, 'y'); d.p('r', 8, 12, 7, 13); d.p('y', 2, 2, 14, 3, 11, 1); d.e(3, 10, 1.2, 1.4, 'Y'); d.e(13, 10, 1.2, 1.4, 'Y'); d.p('w', 1, 14, 14, 14); }, SC);

// ----- Lịch sử -----
add(G, C, 'ch-rutli', 'Liên minh 1291 và đồng cỏ Rütli', 'The 1291 Pact and the Rütli meadow', 'Theo truyền thống, ba bang Uri, Schwyz và Unterwalden thề giúp nhau trên đồng cỏ Rütli. Một bản liên minh được viết năm 1291 là cơ sở của Quốc khánh.',
  d => { d.bg('c'); d.tri(1, 3, 6, 6, 'a'); d.tri(9, 3, 6, 6, 'A'); d.r(0, 9, 16, 7, 'g'); for (const x of [3, 7, 11]) { d.e(x, 10, 1, 1, 's'); d.r(x - 1, 11, 3, 3, 'n'); d.l(x, 9, x, 5, 's'); } d.p('w', 3, 5, 7, 5, 11, 5); }, SC);
add(G, C, 'ch-morgarten', 'Chiến thắng ở Morgarten và Sempach', 'Victories at Morgarten and Sempach', 'Những trận đánh nơi bộ binh nông dân đánh bại kỵ binh Habsburg vào thế kỷ 14. Những chiến thắng này đã củng cố niềm tự hào của liên minh.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'g'); d.tri(0, 3, 6, 8, 'a'); d.l(4, 13, 5, 3, 'n'); d.tri(4, 3, 3, 2, 'r'); d.l(9, 13, 10, 4, 'n'); d.p('a', 9, 3, 10, 3, 11, 4); d.e(13, 11, 2, 2, 'A'); d.r(12, 12, 4, 3, 'a'); d.l(2, 11, 4, 9, 'w'); }, SC);
add(G, C, 'ch-neutral', 'Tuyên bố trung lập', 'Declaration of neutrality', 'Sau Chiến tranh Ba mươi năm và Hòa ước Westphalia, Thụy Sĩ dần rút khỏi các cuộc chiến lớn. Năm 1815, Quốc hội Vienna chính thức công nhận trung lập vĩnh viễn.',
  d => { d.bg('r'); d.r(2, 2, 12, 12, 'w'); d.r(6, 4, 4, 8, 'r'); d.r(4, 6, 8, 4, 'r'); d.e(8, 8, 1.2, 1.2, 'w'); d.p('k', 1, 1, 14, 14); }, SC);
add(G, C, 'ch-1848', 'Liên bang 1848', 'The 1848 Federation', 'Sau cuộc nội chiến ngắn Sonderbund năm 1847, hiến pháp mới biến Thụy Sĩ thành quốc gia liên bang hiện đại. Bern trở thành thủ đô liên bang.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 5, 12, 8, 'e'); d.r(6, 2, 4, 3, 'e'); d.e(8, 2, 2.4, 1.4, 'g'); d.r(1, 4, 14, 1, 'W'); for (const x of [3, 6, 9, 12]) d.r(x, 6, 1, 7, 'w'); d.r(7, 10, 2, 3, 'k'); d.l(8, 1, 8, 0, 'r'); }, SC);
add(G, C, 'ch-redcross', 'Hội Chữ thập đỏ', 'The Red Cross', 'Ra đời ở Geneva năm 1863 sau ý tưởng của Henri Dunant. Biểu tượng là đảo ngược màu cờ Thụy Sĩ.',
  d => { d.bg('r'); d.r(2, 2, 12, 12, 'w'); d.r(6, 4, 4, 8, 'r'); d.r(4, 6, 8, 4, 'r'); d.p('k', 1, 1, 14, 1); }, SC);
add(G, C, 'ch-vote', 'Phụ nữ được bỏ phiếu muộn', 'Women\'s suffrage came late', 'Phụ nữ Thụy Sĩ có quyền bỏ phiếu liên bang năm 1971, muộn hơn nhiều nước châu Âu. Bang Appenzell Innerrhoden còn chậm hơn nữa.',
  d => { d.bg('P'); d.r(4, 7, 8, 7, 'w'); d.r(4, 7, 8, 1, 'a'); d.r(6, 4, 4, 3, 'e'); d.r(7, 5, 2, 1, 'k'); d.p('r', 8, 9, 7, 10, 9, 10); d.p('r', 8, 11); d.p('x', 2, 2, 13, 3, 3, 12); }, SC);
add(G, C, 'ch-un', 'Liên Hợp Quốc và các tổ chức quốc tế', 'The UN and international organizations', 'Geneva đặt nhiều cơ quan của Liên Hợp Quốc, WHO (Tổ chức Y tế Thế giới) và WTO (Tổ chức Thương mại Thế giới). Thụy Sĩ chỉ gia nhập Liên Hợp Quốc năm 2002.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'a'); d.r(2, 5, 12, 7, 'w'); d.r(6, 2, 4, 3, 'l'); d.p('b', 3, 6, 6, 6, 9, 6, 12, 6, 3, 9, 6, 9, 9, 9, 12, 9); d.l(1, 1, 1, 4, 'k'); d.p('b', 2, 1, 3, 1); d.p('w', 13, 1, 14, 2); }, SC);
add(G, C, 'ch-bank', 'Hệ thống ngân hàng và sự giữ kín', 'Banking and secrecy', 'Zurich và Geneva trở thành trung tâm tài chính nhờ ổn định chính trị và luật bảo mật ngân hàng. Những năm gần đây, sự bí mật này đã phải nới lỏng theo áp lực quốc tế.',
  d => { d.bg('e'); d.r(2, 5, 12, 9, 'a'); d.r(2, 5, 12, 2, 'A'); d.tri(1, 2, 14, 3, 'K'); d.r(7, 9, 2, 5, 'y'); d.e(8, 10, 1.4, 1.4, 'Y'); d.p('k', 8, 10); d.p('l', 4, 8, 11, 8); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'ch-einstein', 'Albert Einstein', 'Albert Einstein', 'Nhà vật lý sống ở Bern khi làm nhân viên sở bằng sáng chế và công bố nhiều ý tưởng lớn năm 1905. Ông tốt nghiệp đại học ở Zurich và nhập quốc tịch Thụy Sĩ năm 1901.',
  d => { person(d, 'B', 'w', 'a'); d.r(4, 2, 8, 2, 'w'); d.p('w', 3, 3, 12, 3); d.p('k', 7, 7, 9, 7); d.p('N', 6, 9, 9, 9); d.p('y', 13, 2, 2, 12, 12, 13); }, SC);
add(G, E, 'ch-dunant', 'Henri Dunant', 'Henri Dunant', 'Doanh nhân Geneva chứng kiến trận Solferino năm 1859 và đề xuất lập tổ chức cứu thương. Ông được trao giải Nobel Hòa bình đầu tiên năm 1901.',
  d => { person(d, 'w', 'n', 'k'); d.r(6, 10, 4, 1, 'w'); d.r(12, 3, 3, 3, 'r'); d.r(13, 2, 1, 5, 'r'); d.r(12, 4, 3, 1, 'r'); d.p('w', 8, 9); }, SC);
add(G, E, 'ch-rousseau', 'Jean-Jacques Rousseau', 'Jean-Jacques Rousseau', 'Nhà triết học sinh ở Geneva, tác giả "Khế ước xã hội". Ý tưởng của ông ảnh hưởng lớn đến Cách mạng Pháp.',
  d => { person(d, 'u', 'a', 'b'); d.p('l', 4, 4, 11, 4, 4, 6, 11, 6); d.r(12, 9, 3, 4, 'e'); d.r(12, 9, 3, 1, 'k'); d.p('k', 13, 11); }, SC);
add(G, E, 'ch-jung', 'Carl Gustav Jung', 'Carl Gustav Jung', 'Nhà tâm lý học sinh ở Thụy Sĩ, người đề xuất khái niệm hình mẫu và vô thức tập thể. Ông sống và làm việc nhiều năm ở Zurich.',
  d => { person(d, 'V', 'w', 'n'); d.p('K', 6, 6, 9, 6); d.e(13, 3, 2, 2, 'y'); d.p('Y', 13, 3); d.p('v', 2, 13, 12, 12); }, SC);
add(G, E, 'ch-piaget', 'Jean Piaget', 'Jean Piaget', 'Nhà tâm lý học phát triển trẻ em, sinh ở Neuchâtel. Lý thuyết các giai đoạn nhận thức của ông được giảng dạy rộng rãi.',
  d => { person(d, 'h', 'N', 'g'); d.r(11, 10, 2, 2, 'r'); d.r(13, 12, 2, 2, 'y'); d.r(11, 12, 2, 2, 'b'); d.p('w', 1, 2, 4, 12); }, SC);
add(G, E, 'ch-federer', 'Roger Federer', 'Roger Federer', 'Tay vợt Thụy Sĩ thắng 20 giải Grand Slam đơn nam và được nhiều người coi là một trong những tay vợt vĩ đại nhất. Ông còn nổi tiếng với phong thái lịch lãm.',
  d => { person(d, 'g', 'N', 'w'); d.r(4, 2, 8, 1, 'w'); d.e(13, 9, 1.8, 2.4, 'l'); d.l(12, 11, 10, 13, 'k'); d.p('y', 14, 8); d.p('r', 8, 15); }, SC);
add(G, E, 'ch-klee2', 'Paul Klee và Alberto Giacometti', 'Paul Klee and Alberto Giacometti', 'Hai nghệ sĩ đã được nhắc ở Nhóm 4, cùng góp phần đưa nghệ thuật Thụy Sĩ ra thế giới. Tác phẩm của họ có trong nhiều bảo tàng lớn.',
  d => { d.bg('u'); d.r(1, 3, 7, 8, 'w'); d.r(2, 4, 2, 2, 'r'); d.r(5, 4, 2, 3, 'b'); d.r(2, 7, 4, 3, 'y'); d.r(10, 2, 1, 11, 'A'); d.e(10, 2, 1, 1.2, 'A'); d.l(10, 5, 8, 9, 'A'); d.l(10, 5, 12, 9, 'A'); d.r(8, 13, 6, 2, 'a'); }, SC);
add(G, E, 'ch-spyri', 'Johanna Spyri', 'Johanna Spyri', 'Nhà văn viết Heidi, câu chuyện được dịch ra nhiều thứ tiếng. Người đọc trên thế giới biết đến Thụy Sĩ phần lớn qua câu chuyện này.',
  d => { person(d, 'p', 'N', 'v'); d.r(4, 2, 8, 3, 'N'); d.p('N', 3, 5, 12, 5); d.r(11, 11, 4, 3, 'R'); d.r(11, 11, 4, 1, 'y'); d.l(2, 13, 3, 10, 'w'); d.p('k', 5, 9, 10, 9); }, SC);
