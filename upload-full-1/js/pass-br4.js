import { add, SC, setCC } from './pass-kit.js';
setCC('br');
// Brasil · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };

// ----- Lễ hội -----
add(G, A, 'br-carnaval-fest', 'Carnaval', 'Carnaval', 'Lễ hội lớn nhất cả nước, diễn ra vài ngày trước Mùa Chay vào tháng Hai hoặc tháng Ba; Rio có cuộc diễu hành các trường samba ở Sambódromo, Salvador và Olinda nổi tiếng với lễ hội đường phố.',
  d => { d.bg('v'); d.e(8, 9, 4, 4.4, 'y'); d.r(5, 8, 6, 2, 'k'); d.p('w', 6, 8, 9, 8); d.p('k', 7, 12, 8, 12); d.p('g', 2, 2, 3, 5, 13, 3, 12, 6); d.p('r', 4, 1, 12, 1, 1, 8, 14, 9); d.p('c', 3, 11, 13, 12); d.l(8, 5, 5, 1, 'g'); d.l(8, 5, 11, 1, 'p'); d.l(8, 5, 8, 0, 'y'); }, SC);
add(G, A, 'br-junina', 'Festa Junina (lễ hội tháng Sáu)', 'Festa Junina (June festival)', 'Lễ hội nông thôn với lửa trại, múa quadrilha và đồ ăn từ ngô; vùng đông bắc như Caruaru và Campina Grande tổ chức những lễ hội lớn nhất.',
  d => { d.bg('k'); d.r(0, 13, 16, 3, 'N'); d.tri(4, 7, 8, 7, 'r'); d.tri(5, 9, 6, 5, 'o'); d.tri(6, 11, 4, 3, 'y'); d.l(2, 14, 14, 12, 'n'); for (let i = 0; i < 5; i++) d.r(i * 3 + 1, 2 + (i % 2), 2, 2, ['r', 'y', 'g', 'b', 'p'][i]); d.l(0, 2, 15, 3, 'a'); }, SC);
add(G, A, 'br-iemanja', 'Lễ Yemanjá', 'Festival of Yemanjá', 'Đêm giao thừa và đầu tháng Hai, tín đồ mặc đồ trắng mang hoa ra biển dâng nữ thần biển trong đạo Candomblé; lễ hội ở Salvador và Rio rất đông người.',
  d => { d.bg('A'); d.r(0, 9, 16, 7, 'C'); d.r(0, 10, 16, 3, 'b'); d.e(13, 3, 2, 2, 'l'); d.e(8, 11, 3, 1.4, 'w'); d.p('w', 6, 10, 10, 10); d.p('p', 7, 11, 9, 11, 8, 10); d.p('w', 2, 12, 12, 14, 4, 14); d.tri(6, 3, 4, 5, 'w'); d.e(8, 3, 1.4, 1.4, 's'); }, SC);
add(G, A, 'br-cirio', 'Círio de Nazaré', 'Círio de Nazaré', 'Đám rước tôn giáo lớn ở Belém vào tháng Mười, hàng trăm nghìn người đi theo tượng Đức Mẹ; một trong những đám rước Công giáo đông nhất thế giới.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(6, 3, 4, 3, 'y'); d.tri(7, 1, 2, 2, 'y'); d.r(7, 6, 2, 4, 'p'); d.r(4, 10, 8, 1, 'N'); for (const x of [1, 3, 5, 7, 9, 11, 13]) { d.e(x + 1, 12, 1, 1, 's'); d.r(x, 13, 2, 2, x % 4 ? 'w' : 'b'); } }, SC);
add(G, A, 'br-parintins', 'Parintins (Boi-Bumbá)', 'Parintins (Boi-Bumbá)', 'Lễ hội ở bang Amazonas, nơi hai đội Garantido và Caprichoso cạnh tranh bằng vũ kịch về con bò, kết hợp truyền thuyết bản địa với sân khấu lớn.',
  d => { d.bg('v'); d.e(5, 9, 3, 3, 'r'); d.e(11, 9, 3, 3, 'b'); d.p('w', 3, 6, 7, 6, 9, 6, 13, 6); d.p('k', 4, 9, 10, 9); d.p('y', 2, 12, 5, 13, 11, 12, 14, 13); d.r(0, 14, 16, 2, 'V'); d.p('y', 8, 2, 8, 3); }, SC);
add(G, A, 'br-bonfim', 'Lễ rửa nhà thờ Senhor do Bonfim', 'Washing of the Bonfim church steps', 'Người dân Salvador rửa bậc thềm nhà thờ bằng nước hoa vào tháng Giêng; lễ hội thể hiện sự pha trộn giữa Công giáo và Candomblé.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'w'); d.r(3, 2, 10, 7, 'w'); d.r(3, 2, 10, 1, 'b'); d.tri(3, 0, 10, 2, 'a'); d.r(6, 5, 4, 4, 'c'); for (let i = 0; i < 4; i++) d.r(2 + i, 9 + i, 12 - 2 * i, 1, i % 2 ? 'W' : 'l'); d.p('b', 1, 14, 5, 15, 10, 14, 14, 15); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'br-pandeiro', 'Pandeiro (trống lục lạc)', 'Pandeiro (tambourine drum)', 'Trống lục lạc cầm tay tròn, chủ chốt của samba và choro; người chơi dùng ngón tay, lòng bàn tay và ngón cái để tạo nhiều âm khác nhau.',
  d => { d.e(8, 8, 6.4, 6.4, 'N'); d.e(8, 8, 5.2, 5.2, 'w'); d.p('a', 2, 8, 14, 8, 8, 2, 8, 14); d.p('A', 3, 4, 13, 12, 12, 4, 4, 12); d.e(8, 8, 1, 1, 'W'); }, H);
add(G, B, 'br-surdo', 'Surdo (trống bass)', 'Surdo (bass drum)', 'Trống bass lớn giữ nhịp cho cả đoàn diễu hành samba; tiếng trầm của nó là trái tim của bateria (đội trống).',
  d => { d.r(3, 3, 10, 10, 'r'); d.e(8, 3, 5, 1.6, 'w'); d.e(8, 13, 5, 1.6, 'R'); d.r(3, 4, 10, 1, 'a'); d.r(3, 11, 10, 1, 'a'); d.l(4, 4, 6, 11, 'a'); d.l(8, 4, 10, 11, 'a'); d.l(12, 4, 12, 11, 'y'); d.p('y', 4, 7, 11, 7); }, H);
add(G, B, 'br-cuica', 'Cuíca (trống ma sát)', 'Cuíca (friction drum)', 'Trống ma sát có một thanh nhỏ bên trong, phát ra tiếng kêu như tiếng cười hoặc tiếng thú; âm thanh độc đáo là dấu hiệu của samba.',
  d => { d.r(4, 3, 8, 10, 'a'); d.r(4, 3, 8, 1, 'w'); d.e(8, 3, 4, 1.4, 'W'); d.r(4, 12, 8, 1, 'A'); d.l(8, 4, 8, 15, 'N'); d.p('y', 6, 7, 10, 7, 6, 10, 10, 10); d.p('w', 8, 1); }, H);
add(G, B, 'br-berimbau-nc', 'Berimbau (nhạc cụ của capoeira)', 'Berimbau (capoeira instrument)', 'Nhạc cụ một dây hình cung dùng dẫn nhịp trong capoeira; mỗi nhịp điệu cho người chơi biết tốc độ và kiểu trò chơi.',
  d => { d.bg('e'); d.l(13, 1, 5, 14, 'N'); d.l(14, 1, 6, 14, 'n'); d.l(13, 1, 6, 14, 'k'); d.e(4, 11, 3.4, 3.4, 'y'); d.e(4, 11, 2, 2, 'Y'); d.l(1, 3, 6, 6, 'a'); d.p('o', 6, 2); }, H);
add(G, B, 'br-cavaquinho', 'Cavaquinho (đàn bốn dây)', 'Cavaquinho (small four-string guitar)', 'Đàn nhỏ bốn dây giống ukulele, đệm cho samba và choro; tiếng đàn sáng và nhanh tạo không khí vui tươi.',
  d => { d.e(8, 11, 4, 4, 'o'); d.e(8, 9, 2.6, 2.4, 'O'); d.e(8, 9, 1, 1, 'k'); d.r(7, 1, 2, 8, 'N'); d.r(6, 0, 4, 2, 'n'); d.p('w', 7, 12, 9, 12); d.p('y', 6, 0, 9, 1); d.p('k', 7, 3, 8, 5, 7, 6); }, H);
add(G, B, 'br-violao', 'Violão (guitar dây nylon)', 'Violão (nylon-string guitar)', 'Guitar dây nylon là nhạc cụ cốt lõi của bossa nova; João Gilberto đã tạo ra cách đệm nhịp mới trên chiếc đàn này.',
  d => { d.e(7, 12, 4, 3.4, 'o'); d.e(7, 8, 3, 2.6, 'o'); d.e(7, 10, 1.4, 1.4, 'k'); d.l(10, 6, 14, 1, 'N'); d.l(11, 6, 15, 1, 'n'); d.r(13, 0, 3, 2, 'N'); d.p('y', 6, 13, 8, 13); d.p('O', 5, 8, 9, 8); }, H);
add(G, B, 'br-forro-inst', 'Zabumba và sanfona (trống và accordion)', 'Zabumba and sanfona (drum and accordion)', 'Trống bass và đàn accordion trong forró của vùng đông bắc; cặp nhạc cụ này cùng với triangle (kẻng tam giác) tạo nên hợp âm đặc trưng.',
  d => { d.e(4, 11, 3, 3, 'N'); d.e(4, 11, 2.2, 2.2, 'w'); d.r(8, 3, 3, 10, 'r'); d.r(11, 3, 3, 10, 'R'); for (let y = 4; y < 12; y += 2) d.r(10, y, 1, 1, 'y'); d.r(8, 2, 6, 1, 'k'); d.r(8, 13, 6, 1, 'k'); d.p('w', 9, 6, 12, 8); d.tri(2, 2, 4, 4, 'a'); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'br-samba', 'Samba', 'Samba', 'Điệu nhảy và thể loại nhạc có gốc từ cộng đồng người gốc Phi ở Bahia và Rio; được xem như biểu tượng quốc gia.',
  d => { d.bg('y'); d.e(8, 4, 2, 2, 's'); d.r(6, 6, 4, 5, 'r'); d.l(6, 11, 4, 15, 'k'); d.l(10, 11, 12, 15, 'k'); d.l(6, 7, 2, 4, 's'); d.l(10, 7, 14, 10, 's'); d.p('g', 7, 1, 8, 0, 9, 1); d.p('b', 3, 2, 13, 2); d.p('o', 1, 12, 14, 13); }, SC);
add(G, C, 'br-bossa', 'Bossa nova', 'Bossa nova', 'Phong cách nhạc jazz nhẹ nhàng, ra đời cuối thập niên 1950 ở Rio với Tom Jobim và João Gilberto; "Garota de Ipanema" khiến thể loại này nổi tiếng toàn cầu.',
  d => { d.bg('A'); d.r(0, 12, 16, 4, 'C'); d.e(12, 4, 2.6, 2.6, 'u'); d.l(3, 14, 5, 6, 'N'); d.e(4, 11, 2.4, 2, 'o'); d.p('k', 4, 11); d.p('w', 2, 4, 8, 3, 6, 2); d.p('y', 7, 8, 9, 9, 10, 8); d.p('l', 1, 1, 14, 9); }, SC);
add(G, C, 'br-capoeira', 'Capoeira', 'Capoeira', 'Môn võ kết hợp vũ đạo, nhạc và nhào lộn, có nguồn gốc từ người gốc Phi; người chơi tạo vòng tròn (roda) và thi đấu theo nhịp berimbau, UNESCO công nhận là di sản phi vật thể.',
  d => { d.bg('e'); d.e(6, 8, 1.6, 1.6, 's'); d.l(6, 10, 3, 15, 'w'); d.l(6, 10, 9, 12, 'w'); d.l(5, 8, 0, 12, 'S'); d.l(5, 9, 11, 5, 'S'); d.e(11, 4, 1.4, 1.4, 's'); d.l(12, 6, 14, 10, 'w'); d.r(0, 14, 16, 2, 'n'); d.p('y', 8, 12); }, SC);
add(G, C, 'br-forro', 'Forró', 'Forró', 'Nhạc khiêu vũ của vùng đông bắc, chơi với accordion, trống và kẻng; các lễ hội tháng Sáu tràn ngập điệu nhảy này.',
  d => { d.bg('o'); d.e(5, 5, 1.6, 1.6, 's'); d.e(10, 5, 1.6, 1.6, 's'); d.r(4, 7, 3, 5, 'b'); d.r(9, 7, 3, 5, 'r'); d.l(6, 8, 9, 8, 's'); d.p('N', 4, 12, 6, 12, 9, 12, 11, 12); d.p('y', 3, 3, 12, 3, 8, 14); d.p('w', 1, 14, 14, 14); d.r(0, 13, 16, 3, 'O'); }, SC);
add(G, C, 'br-choro', 'Choro', 'Choro', 'Thể loại nhạc không lời có từ cuối thế kỷ XIX, chơi với sáo, cavaquinho và guitar; nhiều nhà nghiên cứu xem đây là thể loại nhạc đô thị đầu tiên của Brasil.',
  d => { d.bg('e'); d.l(2, 4, 14, 8, 'a'); d.l(2, 5, 14, 9, 'A'); d.p('k', 5, 5, 7, 6, 9, 7, 11, 8); d.e(5, 12, 2.6, 2, 'o'); d.l(5, 10, 5, 8, 'N'); d.p('r', 13, 12, 14, 11); d.p('y', 2, 2, 10, 13); }, SC);
add(G, C, 'br-telenovela', 'Điện ảnh và telenovela', 'Cinema and telenovela', 'Phim truyền hình dài tập là món ăn tinh thần của người Brasil và được xuất khẩu đi nhiều nước; đài Globo là nhà sản xuất nổi tiếng nhất.',
  d => { d.bg('k'); d.r(1, 3, 14, 9, 'a'); d.r(2, 4, 12, 7, 'b'); d.e(6, 7, 1.6, 1.6, 's'); d.e(10, 7, 1.6, 1.6, 'S'); d.r(5, 9, 2, 2, 'r'); d.r(9, 9, 2, 2, 'y'); d.r(6, 12, 4, 1, 'A'); d.r(4, 13, 8, 1, 'a'); d.p('p', 8, 5, 8, 6); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, E, 'br-niemeyer-arch', 'Oscar Niemeyer và Bảo tàng Niterói', 'Oscar Niemeyer and the Niterói museum', 'Kiến trúc sư người Rio nổi tiếng với những đường cong bê tông ở Brasília; ông cũng thiết kế Bảo tàng Nghệ thuật đương đại ở Niterói hình đĩa bay.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.e(8, 8, 7, 2, 'w'); d.e(8, 7, 3, 1.6, 'W'); d.l(8, 10, 8, 13, 'w'); d.e(8, 13, 4, 1.2, 'a'); d.p('c', 5, 8, 8, 8, 11, 8); d.p('l', 2, 2, 13, 1); }, SC);
add(G, E, 'br-tarsila', 'Tarsila do Amaral và bức "Abaporu"', 'Tarsila do Amaral and "Abaporu"', 'Họa sĩ hiện đại chủ nghĩa nổi tiếng với bức "Abaporu" năm 1928, mở đầu phong trào Antropofagia (ăn thịt văn hóa), đề cao việc hấp thụ ảnh hưởng nước ngoài theo cách riêng.',
  d => { d.bg('y'); d.r(0, 12, 16, 4, 'g'); d.e(4, 6, 1.4, 1.4, 's'); d.e(9, 10, 4, 3.4, 'o'); d.l(9, 10, 4, 14, 'O'); d.e(11, 2, 1.6, 1.6, 'o'); d.l(4, 12, 12, 13, 'S'); d.e(14, 6, 1.6, 1.6, 'G'); d.p('G', 13, 7, 13, 8, 14, 8); }, SC);
add(G, E, 'br-portinari', 'Candido Portinari và tranh tường "Guerra e Paz"', 'Candido Portinari and "Guerra e Paz"', 'Họa sĩ ghi lại đời sống công nhân và nông dân Brasil bằng những bức tranh tường lớn; "Guerra e Paz" được đặt ở Liên Hợp Quốc.',
  d => { d.bg('n'); d.r(1, 2, 14, 12, 'u'); d.r(2, 3, 12, 10, 'o'); d.e(5, 6, 1.4, 1.4, 's'); d.r(4, 8, 3, 4, 'b'); d.e(11, 6, 1.4, 1.4, 'S'); d.r(10, 8, 3, 4, 'g'); d.p('r', 8, 4, 8, 5, 8, 6); d.p('k', 1, 1, 14, 1); }, SC);
add(G, E, 'br-baroque', 'Kiến trúc baroque thuộc địa (Ouro Preto, Aleijadinho)', 'Colonial baroque architecture (Ouro Preto, Aleijadinho)', 'Những nhà thờ dát vàng ở Ouro Preto, Salvador và Olinda; Aleijadinho là nhà điêu khắc nổi tiếng của thời kỳ này.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.r(3, 6, 10, 8, 'w'); d.tri(2, 3, 12, 3, 'R'); d.r(1, 7, 2, 7, 'W'); d.r(13, 7, 2, 7, 'W'); d.tri(0, 4, 3, 3, 'y'); d.tri(13, 4, 3, 3, 'y'); d.r(7, 10, 2, 4, 'y'); d.e(8, 8, 1.4, 1.4, 'y'); d.p('y', 5, 9, 10, 9); }, SC);
add(G, E, 'br-selaron', 'Nghệ thuật đường phố và hẻm Selarón', 'Street art and the Selarón steps', 'Những bức tranh tường ở São Paulo và cầu thang gạch gốm nhiều màu ở Rio, do nghệ sĩ Jorge Selarón xây dựng.',
  d => { d.bg('c'); for (let i = 0; i < 6; i++) for (let x = 0; x < 16; x++) d.put(x, 4 + i * 2, [ 'g', 'y', 'b', 'r', 'y', 'g'][(x + i) % 6]); for (let i = 0; i < 6; i++) for (let x = 0; x < 16; x++) d.put(x, 5 + i * 2, ['b', 'r', 'y', 'g', 'b', 'p'][(x + i * 2) % 6]); d.r(0, 0, 16, 4, 'c'); d.e(13, 2, 1.4, 1.4, 'y'); }, SC);
add(G, E, 'br-cristo-deco', 'Tượng Chúa Cứu Thế và kiến trúc Art Deco', 'Christ the Redeemer and Art Deco', 'Tượng cao 30 mét trên đỉnh Corcovado, khánh thành năm 1931, mang phong cách Art Deco; một trong bảy kỳ quan thế giới mới.',
  d => { d.bg('A'); d.e(8, 17, 9, 5, 'G'); d.r(7, 6, 2, 8, 'w'); d.r(2, 7, 12, 2, 'w'); d.r(7, 3, 2, 3, 'w'); d.p('y', 2, 2, 13, 3, 8, 1); d.p('W', 6, 12, 9, 12); d.r(0, 0, 16, 1, 'K'); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'br-futebol', 'Bóng đá và 5 chiếc cúp World Cup', 'Football and five World Cups', 'Môn thể thao quốc dân; Brasil đã vô địch World Cup năm lần, nhiều nhất thế giới, với kỹ thuật "jogo bonito" (trận đấu đẹp).',
  d => { d.bg('g'); d.e(8, 8, 5, 5, 'w'); d.p('k', 8, 6, 6, 8, 10, 8, 7, 10, 9, 10, 8, 4); d.p('K', 5, 6, 11, 6, 5, 10, 11, 10); d.p('y', 1, 1, 14, 1, 1, 14, 14, 14); d.r(0, 13, 16, 3, 'G'); d.p('w', 0, 13, 15, 13); }, H);
add(G, F, 'br-maracana', 'Sân Maracanã', 'Maracanã stadium', 'Sân vận động huyền thoại ở Rio, từng đón gần 200.000 khán giả trong trận chung kết World Cup 1950; đã cải tạo cho World Cup 2014 và Thế vận hội 2016.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.e(8, 9, 8, 4, 'a'); d.e(8, 9, 6.4, 3, 'g'); d.e(8, 8, 8, 2.4, 'w'); d.e(8, 9, 5, 2, 'h'); d.p('w', 8, 7, 8, 11); d.p('y', 2, 5, 13, 5); d.p('k', 4, 12, 12, 12); }, SC);
add(G, F, 'br-funk', 'Funk carioca và sertanejo', 'Funk carioca and sertanejo', 'Funk carioca bắt nguồn từ các favela Rio, còn sertanejo là nhạc đồng quê rất phổ biến; cả hai thể loại đều lên bảng xếp hạng nhiều năm.',
  d => { d.bg('v'); d.r(2, 5, 12, 7, 'k'); d.e(5, 8, 2.4, 2.4, 'a'); d.e(11, 8, 2.4, 2.4, 'a'); d.e(5, 8, 1, 1, 'K'); d.e(11, 8, 1, 1, 'K'); d.r(7, 6, 2, 1, 'y'); d.r(7, 8, 2, 2, 'g'); d.p('p', 3, 3, 12, 2, 8, 1); d.p('c', 1, 13, 14, 14); }, SC);
add(G, F, 'br-novela-globo', 'Telenovela và đài Globo', 'Telenovela and Globo', 'Những bộ phim truyền hình kể chuyện tình yêu và gia đình, người xem mỗi tối; chúng định hình ngôn ngữ và thời trang của nhiều thế hệ.',
  d => { d.bg('A'); d.e(8, 8, 5.6, 5.6, 'b'); d.e(8, 8, 4, 4, 'c'); d.e(8, 8, 2.4, 2.4, 'b'); d.p('w', 6, 6, 8, 5, 10, 6, 7, 8); d.p('y', 8, 1, 8, 14, 1, 8, 14, 8); d.p('r', 3, 13, 12, 13); }, SC);
add(G, F, 'br-beach-sport', 'Bóng chuyền bãi biển và futevôlei', 'Beach volleyball and futevôlei', 'Người Brasil dành nhiều thời gian tập thể dục ngoài trời, chơi bóng chuyền bãi biển và futevôlei (bóng đá chuyền); văn hóa này gắn với bờ biển Rio.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.r(0, 8, 16, 3, 'C'); d.l(2, 4, 2, 11, 'N'); d.l(13, 4, 13, 11, 'N'); d.r(2, 5, 12, 3, '_'); for (let x = 2; x < 14; x += 2) d.p('w', x, 5, x, 7); d.l(2, 5, 13, 5, 'w'); d.e(8, 3, 1.6, 1.6, 'w'); d.p('k', 7, 3, 9, 3); d.p('y', 14, 1); }, SC);
add(G, F, 'br-startup', 'Công nghệ và startup ở São Paulo', 'Tech and startups in São Paulo', 'Thành phố là trung tâm tài chính và công nghệ, nhiều công ty khởi nghiệp thành công; hệ thống thanh toán Pix là ví dụ nổi bật.',
  d => { d.bg('k'); d.r(1, 3, 14, 9, 'a'); d.r(2, 4, 12, 7, 'k'); d.l(3, 9, 6, 7, 'g'); d.l(6, 7, 9, 8, 'g'); d.l(9, 8, 13, 5, 'g'); d.p('y', 13, 5, 3, 9); d.r(5, 12, 6, 1, 'A'); d.r(3, 13, 10, 1, 'a'); }, SC);
