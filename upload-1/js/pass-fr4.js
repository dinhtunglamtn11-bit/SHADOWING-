import { add, SC, setCC } from './pass-kit.js';
setCC('fr');
// Pháp · Nhóm 4: Văn hóa và nghệ thuật
const G = 4, A = 'Lễ hội', B = 'Nhạc cụ', C = 'Nghệ thuật biểu diễn', E = 'Hội họa và kiến trúc', F = 'Văn hóa hiện đại';
const H = { use: 'hold' };
const person = (d, bg, hair, body) => { d.bg(bg); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Lễ hội -----
add(G, A, 'fr-bastille', 'Quốc khánh 14 tháng 7 (Fête nationale)', 'Bastille Day (14 July)', 'Kỷ niệm ngày chiếm ngục Bastille năm 1789, có duyệt binh trên đại lộ Champs-Élysées buổi sáng và pháo hoa bên tháp Eiffel buổi tối.',
  d => { d.bg('B'); d.l(8, 15, 5, 7, 'k'); d.l(8, 15, 11, 7, 'k'); d.r(6, 7, 4, 1, 'k'); for (const [x, y, c] of [[3, 3, 'r'], [8, 2, 'w'], [13, 3, 'b'], [5, 6, 'y'], [11, 6, 'p']]) { d.p(c, x, y, x + 1, y, x - 1, y, x, y + 1, x, y - 1); } d.p('y', 8, 7); }, SC);
add(G, A, 'fr-fetemusique', 'Fête de la Musique (21 tháng 6)', 'Fête de la Musique (21 June)', 'Ngày hội âm nhạc ra đời ở Pháp năm 1982, ai cũng được chơi nhạc ngoài đường miễn phí, sau đó lan ra hơn một trăm nước.',
  d => { d.bg('v'); d.e(5, 11, 2.2, 1.8, 'w'); d.l(7, 11, 7, 3, 'w'); d.l(7, 3, 11, 5, 'w'); d.l(7, 4, 11, 6, 'w'); d.e(11, 11, 2.2, 1.8, 'w'); d.l(13, 11, 13, 5, 'w'); d.p('y', 2, 3, 14, 2, 1, 8, 15, 9); d.p('p', 4, 5, 12, 12); }, SC);
add(G, A, 'fr-cannes', 'Liên hoan phim Cannes', 'Cannes Film Festival', 'Sự kiện điện ảnh lớn nhất thế giới, tổ chức mỗi tháng năm, giải cao nhất là Cành cọ vàng (Palme d\'Or).',
  d => { d.bg('R'); d.r(0, 12, 16, 4, 'r'); d.r(0, 12, 16, 1, 'y'); d.l(8, 11, 8, 4, 'Y'); d.l(8, 7, 4, 3, 'y'); d.l(8, 7, 12, 3, 'y'); d.l(8, 9, 3, 6, 'y'); d.l(8, 9, 13, 6, 'y'); d.p('u', 8, 2, 8, 3); d.r(6, 13, 4, 1, 'y'); }, SC);
add(G, A, 'fr-nicecarnival', 'Carnaval de Nice', 'Nice Carnival', 'Lễ hội hóa trang và diễu hành xe hoa với hoa tươi ở thành phố Nice vào cuối mùa đông.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 8, 14, 5, 'p'); for (let x = 2; x < 14; x += 2) d.p(x % 4 ? 'y' : 'r', x, 8, x, 9); d.e(8, 5, 3.4, 3.4, 'o'); d.e(8, 5, 2, 2, 'y'); d.p('k', 7, 4, 9, 4, 8, 6); d.e(3, 14, 1.8, 1.8, 'k'); d.e(13, 14, 1.8, 1.8, 'k'); d.p('p', 3, 3, 13, 2); }, SC);
add(G, A, 'fr-lumieres', 'Fête des Lumières (Lyon)', 'Festival of Lights (Lyon)', 'Lễ hội ánh sáng đầu tháng mười hai, người dân đặt nến ở cửa sổ và thành phố được chiếu sáng bằng các tác phẩm nghệ thuật.',
  d => { d.bg('B'); d.r(1, 5, 5, 9, 'K'); d.r(8, 3, 4, 11, 'A'); d.r(13, 7, 3, 7, 'K'); for (const [x, y] of [[2, 7], [4, 7], [2, 10], [4, 10], [9, 5], [10, 5], [9, 8], [10, 8], [14, 9]]) d.p('y', x, y); d.p('u', 9, 11, 10, 11); d.p('o', 3, 2, 12, 1); d.p('w', 6, 2); }, SC);
add(G, A, 'fr-tourdefrance', 'Tour de France', 'Tour de France', 'Cuộc đua xe đạp nhiều chặng diễn ra mỗi tháng bảy, kết thúc trên đại lộ Champs-Élysées.',
  d => { d.bg('u'); d.e(4, 11, 3, 3, 'k'); d.e(4, 11, 2, 2, 'u'); d.e(12, 11, 3, 3, 'k'); d.e(12, 11, 2, 2, 'u'); d.l(4, 11, 8, 8, 'y'); d.l(8, 8, 12, 11, 'y'); d.l(8, 8, 6, 5, 'y'); d.l(5, 5, 8, 5, 'k'); d.e(9, 4, 1.4, 1.4, 's'); d.r(8, 5, 3, 3, 'y'); d.r(9, 2, 2, 1, 'r'); d.p('y', 12, 8); }, SC);
add(G, A, 'fr-avignon', 'Festival d\'Avignon', 'Avignon Festival', 'Liên hoan sân khấu mùa hè trong thành phố cổ ở miền nam, mở ra từ năm 1947.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 5, 12, 8, 'u'); d.r(2, 4, 12, 1, 'o'); for (let x = 2; x < 14; x += 2) d.p('o', x, 3); d.r(6, 8, 4, 5, 'k'); d.e(8, 8, 2, 1.6, 'k'); d.p('k', 4, 7, 11, 7); d.p('r', 3, 10, 12, 10); d.p('y', 8, 2); }, SC);
add(G, A, 'fr-catholicfeasts', 'Lễ Phục sinh, Toussaint và Giáng sinh', 'Easter, All Saints\' and Christmas', 'Các ngày lễ Công giáo vẫn được nghỉ chính thức, gắn với chợ Giáng sinh nổi tiếng ở Strasbourg.',
  d => { d.bg('B'); d.tri(3, 3, 10, 11, 'G'); d.tri(4, 7, 8, 7, 'g'); d.r(7, 13, 2, 2, 'N'); d.p('y', 8, 2); d.p('r', 6, 6, 10, 9, 5, 12, 11, 12); d.p('w', 2, 2, 13, 4, 1, 10, 14, 13); d.p('u', 8, 8); }, SC);
add(G, A, 'fr-heritagedays', 'Les Journées du Patrimoine', 'European Heritage Days', 'Cuối tuần tháng chín khi nhiều tòa nhà lịch sử, dinh thự và cơ quan nhà nước mở cửa miễn phí cho dân vào xem.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 6, 12, 7, 'e'); d.tri(1, 3, 14, 3, 'A'); d.r(6, 8, 4, 5, 'N'); d.r(7, 8, 2, 5, 'k'); d.p('b', 2, 7, 4, 7, 11, 7, 13, 7); d.l(1, 13, 14, 13, 'w'); d.p('r', 8, 2); d.r(7, 1, 2, 1, 'b'); }, SC);

// ----- Nhạc cụ -----
add(G, B, 'fr-accordion', 'Accordéon (đàn accordion)', 'Accordion', 'Gắn với nhạc dân gian bình dân của Paris, tiếng đàn là âm thanh quen thuộc của các quán nhạc đầu thế kỷ hai mươi.',
  d => { d.r(1, 4, 3, 8, 'R'); d.r(12, 4, 3, 8, 'R'); for (let x = 4; x < 12; x += 2) { d.r(x, 5, 1, 6, 'w'); d.r(x + 1, 5, 1, 6, 'a'); } d.r(1, 4, 3, 1, 'y'); d.r(12, 4, 3, 1, 'y'); d.p('w', 2, 6, 2, 8, 13, 6, 13, 8); d.p('k', 2, 10, 13, 10); }, H);
add(G, B, 'fr-vielle', 'Vielle à roue', 'Hurdy-gurdy (vielle à roue)', 'Đàn quay tay có dây, một nhạc cụ cổ của vùng trung tâm nước Pháp, âm thanh vo vo như kèn túi.',
  d => { d.e(7, 10, 5, 4, 'n'); d.e(7, 10, 3.6, 2.8, 'u'); d.l(10, 7, 15, 3, 'N'); d.l(10, 8, 15, 4, 'n'); d.p('k', 5, 10, 7, 10, 9, 10); d.l(2, 12, 0, 14, 'N'); d.p('y', 7, 10, 14, 3); d.r(5, 5, 5, 1, 'k'); }, H);
add(G, B, 'fr-cornemuse', 'Cornemuse (kèn túi)', 'Bagpipes (cornemuse)', 'Nhạc cụ của vùng Brittany, thường chơi cùng bombarde (kèn đôi) trong các buổi khiêu vũ làng.',
  d => { d.e(7, 10, 4.6, 3.6, 'n'); d.e(7, 10, 3.4, 2.6, 'g'); d.l(9, 7, 13, 1, 'N'); d.l(10, 8, 14, 2, 'n'); d.l(5, 7, 1, 2, 'N'); d.l(8, 7, 8, 2, 'N'); d.p('y', 13, 1, 1, 2, 8, 2); d.p('w', 6, 10, 8, 11); d.l(12, 11, 14, 14, 'N'); }, H);
add(G, B, 'fr-harp', 'Harpe celtique (đàn hạc Celtic)', 'Celtic harp', 'Đàn hạc của vùng Brittany, được nghệ sĩ Alan Stivell làm sống lại từ thập niên 1970.',
  d => { d.l(3, 14, 3, 2, 'N'); d.l(4, 14, 4, 2, 'n'); d.l(4, 2, 13, 8, 'N'); d.l(5, 2, 13, 9, 'n'); d.l(3, 14, 13, 14, 'N'); for (let i = 0; i < 6; i++) { const x = 5 + i * 1.5; d.l(Math.round(x), 4 + Math.round(i * 0.8), Math.round(x), 13, i % 2 ? 'y' : 'w'); } d.l(13, 9, 13, 14, 'N'); }, H);
add(G, B, 'fr-musette', 'Musette', 'Musette', 'Loại kèn túi nhỏ của nông thôn, đồng thời là tên của thể loại nhạc khiêu vũ chơi với accordéon.',
  d => { d.e(6, 11, 4, 3, 'r'); d.e(6, 11, 3, 2, 'R'); d.p('y', 4, 10, 8, 10, 6, 13); d.l(8, 9, 12, 3, 'N'); d.l(9, 9, 13, 4, 'n'); d.r(12, 2, 3, 2, 'y'); d.l(4, 9, 2, 3, 'N'); d.p('k', 6, 11); }, H);
add(G, B, 'fr-organ', 'Piano và đàn organ', 'Piano and organ', 'Nhạc cụ gắn với truyền thống cổ điển, Pháp có những nghệ sĩ organ nổi tiếng chơi trong các nhà thờ lớn như Notre-Dame.',
  d => { d.bg('e'); for (let i = 0; i < 7; i++) d.r(1 + i * 2, 1 + Math.abs(3 - i), 1, 8 - Math.abs(3 - i), i % 2 ? 'a' : 'l'); d.r(0, 9, 16, 3, 'N'); for (let x = 1; x < 15; x += 2) { d.r(x, 10, 1, 2, 'w'); } d.p('k', 2, 10, 5, 10, 9, 10, 12, 10); d.r(0, 12, 16, 3, 'n'); }, SC);
add(G, B, 'fr-saxophone', 'Saxophone', 'Saxophone', 'Được nhà chế tạo nhạc cụ người Bỉ Adolphe Sax đăng ký bằng sáng chế ở Paris năm 1846.',
  d => { d.l(4, 1, 6, 3, 'y'); d.l(6, 3, 6, 11, 'y'); d.l(7, 3, 7, 11, 'Y'); d.e(9, 13, 3, 2, 'y'); d.e(9, 13, 2, 1, 'Y'); d.l(11, 13, 14, 10, 'y'); d.p('k', 6, 5, 6, 7, 6, 9); d.p('w', 8, 5, 8, 7, 8, 9); d.r(3, 0, 3, 2, 'Y'); }, H);

// ----- Nghệ thuật biểu diễn -----
add(G, C, 'fr-garnier', 'Opéra Garnier', 'Opéra Garnier', 'Nhà hát opera và ba lê hoa lệ ở Paris, mở cửa năm 1875, nổi tiếng với cầu thang lớn và trần do Chagall vẽ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(2, 6, 12, 7, 'u'); d.e(8, 5, 4, 3, 'G'); d.r(4, 7, 8, 1, 'y'); for (const x of [4, 7, 10]) d.r(x, 8, 2, 5, 'e'); d.e(8, 3, 1.2, 1.2, 'y'); d.r(1, 12, 14, 1, 'w'); d.p('y', 3, 6, 13, 6, 5, 3, 11, 3); }, SC);
add(G, C, 'fr-comedie', 'Comédie-Française', 'Comédie-Française', 'Đoàn kịch quốc gia thành lập năm 1680, nơi giữ truyền thống diễn các vở của Molière.',
  d => { d.bg('R'); d.r(1, 1, 3, 14, 'y'); d.r(12, 1, 3, 14, 'y'); d.r(4, 0, 8, 2, 'Y'); d.e(8, 8, 3, 3.6, 'w'); d.e(8, 8, 3, 3.6, 'W'); d.p('k', 7, 7, 9, 7, 8, 10, 7, 9, 9, 9); d.p('r', 5, 5, 11, 5); d.r(3, 14, 10, 1, 'Y'); }, SC);
add(G, C, 'fr-moliere', 'Molière, Racine và Corneille', 'Molière, Racine and Corneille', 'Ba tác giả sân khấu kinh điển của thế kỷ mười bảy, ngôn ngữ của họ vẫn được học trong trường.',
  d => { d.r(2, 1, 12, 14, 'e'); d.r(2, 1, 1, 14, 'N'); d.e(5, 6, 2, 2, 's'); d.r(3, 9, 4, 5, 'v'); d.e(11, 6, 2, 2, 's'); d.r(9, 9, 4, 5, 'b'); d.p('k', 4, 5, 6, 5, 10, 5, 12, 5); d.r(3, 3, 4, 2, 'N'); d.r(9, 3, 4, 2, 'n'); d.p('r', 5, 7, 11, 7); }, H);
add(G, C, 'fr-ballet', 'Ba lê Pháp', 'French ballet', 'Hình thức ba lê hiện đại có gốc ở triều đình Louis XIV, và các thuật ngữ ba lê đến nay vẫn là tiếng Pháp.',
  d => { d.bg('v'); d.e(8, 3, 1.6, 1.6, 's'); d.r(7, 4, 2, 4, 'w'); d.tri(3, 7, 10, 3, 'w'); d.l(8, 10, 8, 13, 'x'); d.l(8, 10, 5, 13, 'x'); d.l(5, 13, 5, 14, 'p'); d.l(8, 13, 8, 15, 'p'); d.l(7, 5, 3, 2, 'x'); d.l(9, 5, 13, 3, 'x'); d.p('y', 2, 2, 14, 3); d.r(2, 14, 12, 1, 'V'); }, SC);
add(G, C, 'fr-moulinrouge', 'Cabaret và Moulin Rouge', 'Cabaret and Moulin Rouge', 'Các hộp đêm ở Montmartre khai sinh điệu cancan, mở năm 1889.',
  d => { d.bg('k'); d.r(2, 6, 12, 8, 'R'); d.r(2, 6, 12, 1, 'r'); d.r(7, 2, 2, 4, 'N'); d.l(8, 3, 4, 5, 'w'); d.l(8, 3, 12, 5, 'w'); d.l(8, 5, 4, 3, 'w'); d.l(8, 5, 12, 3, 'w'); d.r(6, 9, 4, 5, 'k'); d.p('y', 3, 8, 12, 8, 4, 11, 11, 11); d.p('w', 2, 1, 14, 2); }, SC);
add(G, C, 'fr-chanson', 'Chanson française', 'Chanson française', 'Dòng nhạc lời ca trữ tình của những nghệ sĩ như Édith Piaf, Charles Aznavour, Jacques Brel và Serge Gainsbourg.',
  d => { d.bg('k'); d.r(7, 2, 2, 7, 'a'); d.e(8, 2.5, 2.4, 2.4, 'l'); d.l(8, 9, 8, 13, 'a'); d.r(5, 13, 6, 2, 'a'); d.p('K', 7, 2, 7, 4); d.p('w', 3, 5, 12, 6, 2, 10, 13, 11); d.p('r', 14, 2, 1, 3); d.p('y', 5, 8, 11, 8); }, SC);
add(G, C, 'fr-classical', 'Nhạc cổ điển Pháp', 'French classical music', 'Debussy, Ravel, Fauré, Berlioz và Bizet là những nhà soạn nhạc đại diện, với màu sắc âm thanh rất riêng.',
  d => { d.bg('e'); for (const y of [4, 6, 8, 10, 12]) d.l(0, y, 15, y, 'k'); d.e(4, 11, 1.6, 1.2, 'k'); d.l(5, 11, 5, 4, 'k'); d.e(10, 7, 1.6, 1.2, 'k'); d.l(11, 7, 11, 1, 'k'); d.p('k', 5, 4, 6, 4, 7, 5, 11, 1, 12, 1, 13, 2); }, SC);
add(G, C, 'fr-nouveaucirque', 'Nghệ thuật xiếc mới (nouveau cirque)', 'Nouveau cirque', 'Xiếc không thú, kết hợp múa và sân khấu, Pháp là một trong những nơi khai sinh xu hướng này.',
  d => { d.bg('v'); d.tri(1, 1, 14, 5, 'r'); d.r(1, 6, 14, 1, 'y'); d.l(5, 6, 5, 9, 'w'); d.l(11, 6, 11, 9, 'w'); d.e(8, 11, 1.4, 1.4, 's'); d.l(5, 9, 11, 9, 'a'); d.l(8, 12, 6, 14, 'p'); d.l(8, 12, 10, 14, 'p'); d.p('y', 2, 10, 14, 11, 8, 14); d.r(7, 12, 2, 2, 'p'); }, SC);

// ----- Hội họa và kiến trúc -----
add(G, E, 'fr-impression', 'Phái Ấn tượng (Impressionnisme)', 'Impressionism', 'Trường phái mở đầu bằng bức "Ấn tượng, mặt trời mọc" của Monet năm 1872; Renoir, Degas, Pissarro cũng thuộc nhóm này.',
  d => { d.bg('p'); d.r(0, 8, 16, 8, 'C'); d.r(0, 0, 16, 8, 'x'); d.e(10, 5, 2.4, 2.4, 'o'); d.e(10, 5, 1.6, 1.6, 'y'); d.p('c', 3, 10, 6, 11, 9, 10, 12, 12, 4, 13); d.p('o', 10, 9, 10, 11, 9, 13); d.p('b', 2, 12, 11, 14, 7, 15); d.r(2, 7, 5, 2, 'A'); d.p('k', 3, 5, 4, 6); }, SC);
add(G, E, 'fr-fauvism', 'Hậu Ấn tượng và Dã thú', 'Post-Impressionism and Fauvism', 'Cézanne, Gauguin, Van Gogh sống ở Pháp, rồi Matisse dẫn đầu phái Fauvisme dùng màu sắc rực rỡ.',
  d => { d.bg('b'); d.r(0, 8, 16, 8, 'g'); d.e(5, 6, 4, 3, 'r'); d.e(11, 8, 4, 3, 'y'); d.e(8, 12, 5, 2.4, 'p'); d.e(13, 3, 2, 2, 'o'); d.p('v', 3, 11, 12, 13, 7, 3); d.p('o', 4, 5, 11, 7); d.p('c', 2, 2, 8, 2); }, SC);
add(G, E, 'fr-cubism', 'Lập thể (Cubisme)', 'Cubism', 'Do Picasso và Braque khai sinh ở Paris đầu thế kỷ hai mươi, phá vỡ phối cảnh truyền thống.',
  d => { d.bg('t'); d.r(2, 2, 6, 7, 'o'); d.tri(7, 2, 7, 8, 'b'); d.r(5, 7, 6, 7, 'n'); d.tri(3, 9, 5, 5, 'y'); d.r(9, 9, 5, 5, 'g'); d.p('k', 4, 4, 5, 4, 11, 5, 8, 8, 8, 11); d.l(2, 2, 14, 14, 'k'); d.p('r', 6, 6, 12, 12); }, SC);
add(G, E, 'fr-orsay', 'Musée d\'Orsay', 'Musée d\'Orsay', 'Bảo tàng trong một nhà ga cũ bên bờ sông Seine, nơi giữ bộ sưu tập Ấn tượng lớn nhất thế giới.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.r(1, 6, 14, 7, 'u'); d.e(8, 6, 7, 3.4, 'u'); d.e(8, 6, 6, 2.6, 'c'); d.p('A', 2, 6, 5, 4, 8, 3, 11, 4, 14, 6); d.r(7, 8, 2, 1, 'k'); d.e(8, 11, 1.2, 1.2, 'k'); d.p('y', 3, 10, 12, 10); d.r(1, 12, 14, 1, 'o'); }, SC);
add(G, E, 'fr-pompidou', 'Centre Pompidou', 'Centre Pompidou', 'Trung tâm nghệ thuật hiện đại mở năm 1977, nổi tiếng vì phơi ống dẫn và khung thép ra bên ngoài tòa nhà.',
  d => { d.bg('c'); d.r(1, 4, 14, 9, 'w'); d.r(1, 4, 14, 1, 'a'); for (let x = 2; x < 15; x += 2) d.l(x, 5, x - 1, 12, 'a'); d.r(1, 8, 14, 1, 'a'); d.r(2, 6, 12, 1, 'r'); d.r(3, 10, 11, 1, 'b'); d.r(4, 7, 9, 1, 'y'); d.r(1, 13, 14, 2, 'A'); d.r(0, 3, 16, 1, 'k'); }, SC);
add(G, E, 'fr-gothic', 'Kiến trúc Gothic', 'Gothic architecture', 'Các nhà thờ lớn ở Chartres, Reims, Amiens và Notre-Dame là đỉnh cao của phong cách này, với vòm nhọn và kính màu.',
  d => { d.bg('A'); d.tri(3, 0, 10, 8, 'a'); d.r(3, 8, 10, 8, 'a'); d.tri(5, 5, 6, 9, 'k'); d.r(5, 10, 6, 6, 'k'); d.tri(6, 7, 4, 5, 'b'); d.p('r', 8, 8, 7, 10); d.p('y', 8, 9, 9, 10); d.p('g', 8, 11); d.p('l', 4, 2, 12, 2); }, SC);
add(G, E, 'fr-baroque', 'Kiến trúc Baroque và Cổ điển', 'Baroque and Classical architecture', 'Versailles và Les Invalides thể hiện quyền lực của vương triều Louis XIV.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(3, 8, 10, 5, 'e'); d.e(8, 6, 4, 4, 'y'); d.e(8, 6, 3, 3, 'Y'); d.r(7, 1, 2, 3, 'y'); d.p('y', 8, 0); for (const x of [4, 7, 10]) d.r(x, 9, 2, 4, 'W'); d.r(3, 8, 10, 1, 'w'); }, SC);
add(G, E, 'fr-artnouveau', 'Art Nouveau và Art Déco', 'Art Nouveau and Art Déco', 'Các lối vào ga tàu điện ngầm Paris do Hector Guimard thiết kế là ví dụ đẹp nhất của Art Nouveau.',
  d => { d.bg('G'); d.l(1, 15, 1, 6, 'g'); d.l(15, 15, 15, 6, 'g'); d.l(1, 6, 8, 2, 'g'); d.l(15, 6, 8, 2, 'g'); d.l(2, 6, 8, 3, 'h'); d.l(14, 6, 8, 3, 'h'); d.e(8, 3, 2.2, 1.6, 'y'); d.e(8, 3, 1, 0.8, 'o'); d.p('g', 4, 9, 12, 9, 3, 12, 13, 12); d.r(4, 13, 8, 2, 'k'); d.p('y', 7, 14, 9, 14); }, SC);
add(G, E, 'fr-lecorbusier', 'Le Corbusier', 'Le Corbusier', 'Kiến trúc sư người Pháp gốc Thụy Sĩ, có nhiều công trình được UNESCO công nhận, tiêu biểu là Villa Savoye.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 5, 10, 4, 'w'); d.r(3, 5, 10, 1, 'l'); d.r(4, 6, 8, 1, 'c'); d.r(4, 7, 8, 1, 'c'); for (const x of [4, 7, 10, 12]) d.r(x, 9, 1, 4, 'a'); d.r(2, 9, 12, 1, 'W'); d.p('r', 13, 4, 14, 4); d.p('G', 1, 12, 15, 12); }, SC);
add(G, E, 'fr-louvrepyramid', 'Kim tự tháp kính Louvre', 'Louvre glass pyramid', 'Kiến trúc sư I. M. Pei thiết kế, hoàn thành năm 1989, tạo ra lối vào hiện đại bên một cung điện cổ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(0, 8, 3, 5, 'W'); d.r(13, 8, 3, 5, 'W'); d.tri(2, 3, 12, 10, 'c'); d.tri(4, 5, 8, 8, 'l'); d.l(8, 3, 3, 12, 'a'); d.l(8, 3, 13, 12, 'a'); d.l(8, 3, 8, 12, 'a'); d.l(5, 8, 11, 8, 'a'); d.p('w', 6, 6, 9, 5); }, SC);

// ----- Văn hóa hiện đại -----
add(G, F, 'fr-cinema', 'Điện ảnh và Nouvelle Vague', 'Cinema and the Nouvelle Vague', 'Pháp là nơi ra đời điện ảnh, về sau có làn sóng Nouvelle Vague của Truffaut và Godard vào thập niên 1960.',
  d => { d.bg('k'); d.r(2, 4, 12, 9, 'd'); d.r(2, 4, 12, 1, 'w'); d.r(2, 12, 12, 1, 'w'); for (let x = 3; x < 13; x += 3) { d.p('w', x, 2); d.p('w', x, 14); } d.r(5, 6, 6, 4, 'w'); d.p('k', 6, 7, 9, 7, 7, 9, 8, 9); d.p('r', 8, 8); }, SC);
add(G, F, 'fr-bd', 'Truyện tranh (bande dessinée)', 'Comics (bande dessinée)', 'Người Pháp và Bỉ đọc truyện tranh rất nhiều, nổi tiếng nhất là Tintin, Astérix và Lucky Luke; Astérix ra mắt năm 1959.',
  d => { d.bg('u'); d.r(1, 1, 14, 14, 'w'); d.r(1, 1, 14, 1, 'k'); d.r(1, 14, 14, 1, 'k'); d.r(2, 3, 6, 5, 'c'); d.r(9, 3, 5, 5, 'o'); d.e(5, 5, 1.6, 1.6, 's'); d.p('o', 4, 4, 5, 3, 6, 4); d.e(11, 5, 1.6, 1.6, 's'); d.p('y', 10, 3, 12, 3); d.e(8, 12, 4, 1.6, 'w'); d.r(4, 10, 8, 3, 'w'); d.p('k', 5, 11, 7, 11, 9, 11); }, SC);
add(G, F, 'fr-literature', 'Văn học (Hugo, Balzac, Proust, Camus…)', 'Literature (Hugo, Balzac, Proust, Camus…)', 'Victor Hugo, Balzac, Flaubert, Proust, Camus, Sartre và Simone de Beauvoir là những tên tuổi lớn, giải Goncourt là giải văn học danh giá nhất mỗi năm.',
  d => { d.r(1, 3, 5, 11, 'r'); d.r(5, 2, 5, 12, 'b'); d.r(9, 4, 6, 10, 'g'); for (const x of [2, 6, 10]) d.p('y', x, 5, x + 1, 5, x, 8, x + 1, 8); d.r(0, 14, 16, 1, 'N'); d.p('w', 12, 6, 12, 8); }, H);
add(G, F, 'fr-philosophy', 'Triết học và tư tưởng', 'Philosophy and ideas', 'Truyền thống từ Descartes, Voltaire, Rousseau đến các nhà tư tưởng thế kỷ hai mươi, và môn triết học là môn bắt buộc ở năm cuối trung học.',
  d => { d.bg('e'); d.e(8, 8, 3.6, 3.6, 's'); d.r(5, 3, 6, 2, 'w'); d.p('w', 4, 5, 12, 5, 4, 7, 12, 7); d.p('k', 7, 7, 9, 7); d.r(7, 10, 2, 1, 'k'); d.r(4, 11, 8, 4, 'v'); d.p('y', 8, 1, 7, 0, 9, 0); d.p('k', 6, 6, 10, 6); }, SC);
add(G, F, 'fr-photo', 'Nhiếp ảnh đường phố', 'Street photography', 'Paris là nơi sinh ra nhiều trường phái nhiếp ảnh, như Henri Cartier-Bresson và Robert Doisneau.',
  d => { d.bg('a'); d.r(2, 5, 12, 8, 'd'); d.r(2, 5, 12, 2, 'k'); d.r(9, 3, 4, 2, 'd'); d.e(8, 9, 3.4, 3.4, 'k'); d.e(8, 9, 2.4, 2.4, 'a'); d.e(8, 9, 1.2, 1.2, 'c'); d.p('w', 7, 8); d.p('r', 3, 6); d.p('l', 12, 7); }, H);
add(G, F, 'fr-frenchtouch', 'Nhạc điện tử (French touch)', 'Electronic music (French touch)', 'Daft Punk, Air và David Guetta là những cái tên mang âm nhạc điện tử Pháp ra thế giới từ thập niên 1990.',
  d => { d.bg('V'); d.e(8, 8, 4, 4.6, 'a'); d.r(4, 6, 8, 2, 'k'); d.r(4, 6, 8, 1, 'c'); d.r(5, 10, 6, 3, 'l'); d.p('p', 1, 2, 14, 2, 2, 13, 13, 14); d.p('c', 3, 5, 12, 5); d.p('y', 8, 14, 7, 2); }, SC);
add(G, F, 'fr-rap', 'Rap Pháp', 'French rap', 'Một trong những thị trường hip hop lớn nhất châu Âu, với nhiều nghệ sĩ có gốc nhập cư từ Bắc Phi và châu Phi.',
  d => { d.bg('k'); d.e(8, 5, 2.6, 2.8, 's'); d.r(5, 2, 6, 2, 'd'); d.r(4, 8, 8, 7, 'o'); d.r(4, 8, 8, 1, 'O'); d.l(11, 9, 14, 12, 's'); d.r(13, 3, 2, 3, 'a'); d.e(14, 3, 1.4, 1.4, 'l'); d.p('k', 7, 5, 9, 5); d.p('y', 7, 9, 9, 9); }, SC);
add(G, F, 'fr-football', 'Bóng đá', 'Football', 'Đội tuyển Pháp vô địch World Cup (Giải vô địch bóng đá thế giới) năm 1998 và 2018, là niềm tự hào chung của cả nước.',
  d => { d.bg('g'); d.r(0, 12, 16, 4, 'G'); d.e(8, 8, 5.6, 5.6, 'w'); d.e(8, 8, 1.8, 1.8, 'k'); for (const [x, y] of [[8, 3], [3, 7], [13, 7], [5, 13], [11, 13]]) d.p('k', x, y, x + 1, y); d.p('b', 1, 1, 2, 1); d.p('w', 4, 1, 5, 1); d.p('r', 7, 1, 8, 1); }, H);
add(G, F, 'fr-cafeculture', 'Quán cà phê và văn hóa tranh luận', 'Café culture', 'Café de Flore và Les Deux Magots là nơi các nhà văn, triết gia và nghệ sĩ thường tụ họp.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'a'); d.tri(0, 1, 16, 4, 'g'); d.p('w', 2, 3, 6, 3, 10, 3, 14, 3); d.e(8, 9, 4.6, 1.2, 'N'); d.l(8, 10, 8, 13, 'N'); d.l(5, 14, 11, 14, 'N'); d.e(6, 8, 1.2, 1, 'w'); d.p('N', 6, 8); d.e(10, 8, 1.2, 1, 'w'); d.p('n', 10, 8); d.p('w', 6, 6, 10, 6); }, SC);
