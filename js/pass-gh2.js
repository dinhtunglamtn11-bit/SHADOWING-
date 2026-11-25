import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('gh');
// Ghana · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#c98a5a', s: '#e0a070', x: '#2b2b3a' };
const col = (c, r0, r1, ch) => { const a = []; for (let r = r0; r <= r1; r++) a.push([r, c, ch]); return a; };

// ----- Trang phục: mặc được lên Lame -----
OUTM.gh_kente = { map: M_DRESS, pal: { ...base, t: '#f0b020', T: '#c8860e', u: '#f0b020', b: '#2f9a4a', x: '#f0b020' }, patch: [...col(4, 11, 18, 'r'), ...col(7, 11, 18, 'k'), ...col(10, 11, 18, 'g'), [12, 5, 'y'], [14, 8, 'y'], [16, 11, 'y'], [13, 6, 'r'], [15, 9, 'r'], [17, 5, 'k']] };
OUTM.gh_batakari = { map: M_TOP, pal: { ...base, t: '#fff3d6', T: '#e4d6b0', u: '#fff3d6', b: '#fff3d6', p: '#fff3d6', l: '#fff3d6', x: '#fff3d6' }, patch: [...col(4, 11, 16, 'b'), ...col(7, 11, 16, 'b'), ...col(10, 11, 16, 'b'), ...col(12, 11, 16, 'b'), [12, 6, 'T'], [12, 8, 'T']] };
OUTM.gh_ankara = { map: M_DRESS, pal: { ...base, t: '#e8452c', T: '#a8281a', u: '#e8452c', b: '#e8452c', x: '#ffd84d' }, patch: [[11, 5, 'y'], [11, 7, 'b'], [11, 9, 'y'], [12, 6, 'b'], [12, 8, 'g'], [12, 10, 'b'], [13, 5, 'g'], [13, 7, 'y'], [13, 9, 'g'], [14, 6, 'y'], [14, 8, 'b'], [14, 10, 'y'], [15, 5, 'b'], [15, 7, 'g'], [16, 6, 'y'], [16, 9, 'b'], [17, 4, 'y'], [17, 11, 'g'], [18, 7, 'b']] };
OUTM.gh_adinkra = { map: M_TOP, pal: { ...base, t: '#5a3a1a', T: '#3a2410', u: '#5a3a1a', b: '#2b1d3a', p: '#2b1d3a', l: '#5a3a1a', x: '#2b1d3a' }, patch: [[11, 5, 'y'], [11, 6, 'y'], [11, 9, 'y'], [11, 10, 'y'], [12, 7, 'y'], [12, 8, 'y'], [13, 6, 'y'], [13, 9, 'y'], [14, 7, 'y'], [14, 8, 'y'], [15, 5, 'y'], [15, 10, 'y'], [16, 7, 'y'], [16, 8, 'y']] };
OUTM.gh_kaba = { map: M_DRESS, pal: { ...base, t: '#1f8f86', T: '#0f5f58', u: '#1f8f86', b: '#1f8f86', x: '#ffd84d' }, patch: [[11, 7, 'y'], [11, 8, 'y'], [12, 5, 'y'], [12, 10, 'y'], [13, 7, 'T'], [13, 8, 'T'], [15, 8, 'k'], [16, 8, 'k'], [17, 8, 'k'], [18, 8, 'k'], [16, 5, 'y'], [17, 11, 'y']] };
OUTM.gh_blackstars = { map: M_TOP, pal: { ...base, t: '#ffd84d', T: '#c9a227', u: '#ffd84d', b: '#2f9a4a', p: '#2f9a4a', l: '#ffd84d', x: '#ffffff' }, patch: [[11, 6, 'r'], [11, 9, 'r'], [11, 7, 'g'], [11, 8, 'g'], [13, 7, 'k'], [13, 8, 'k'], [12, 7, 'k'], [12, 8, 'k'], [14, 6, 'k'], [14, 9, 'k'], [15, 7, 'k'], [15, 8, 'k']] };
Object.assign(OUT_KEY, { 'gh-kente': 'gh_kente', 'gh-batakari': 'gh_batakari', 'gh-ankara': 'gh_ankara', 'gh-adinkra': 'gh_adinkra', 'gh-kaba': 'gh_kaba', 'gh-blackstars': 'gh_blackstars' });
Object.assign(SLOT_OF, { 'gh-kente': 'outfit', 'gh-batakari': 'outfit', 'gh-ankara': 'outfit', 'gh-adinkra': 'outfit', 'gh-kaba': 'outfit', 'gh-blackstars': 'outfit', 'gh-ahenema': 'feet', 'gh-duku': 'head' });
O['gh-ahenema'] = { y0: 18, pal: { y: '#ffd84d', n: '#a8784a', N: '#6a4a2a' }, rows: ['...yy......yy...', '..nnnn....nnnn..', '..NNNN....NNNN..'] };
O['gh-duku'] = { y0: -1, pal: { r: '#e8452c', g: '#2f9a4a', y: '#ffd84d' }, rows: ['....rrrrrrrr....', '..rrrrggggrrrr..', '.rrrryyyyrrrrr..', '..rrr......rrr..'] };

add(G, A, 'gh-kente', 'Vải kente', 'Kente cloth', 'Vải dệt thủ công từng dải hẹp rồi khâu lại, có họa tiết hình học rực rỡ. Người Ashanti và Ewe mặc vải này trong lễ lớn và lễ tốt nghiệp.', null, { char: ['gh_kente'], use: 'wear' });
add(G, A, 'gh-batakari', 'Batakari (fugu)', 'Batakari (fugu smock)', 'Áo dài tay rộng của nam giới miền bắc, dệt từ những dải vải bông sọc. Ngày nay áo được nhiều người mặc như quốc phục trong dịp tự hào.', null, { char: ['gh_batakari'], use: 'wear' });
add(G, A, 'gh-ankara', 'Vải in Ankara và vải wax', 'Ankara and wax print cloth', 'Vải có họa tiết màu sắc mạnh, phổ biến ở cả Tây Phi. Thợ may ở chợ may áo theo đơn rất nhanh và khéo.', null, { char: ['gh_ankara'], use: 'wear' });
add(G, A, 'gh-adinkra', 'Vải adinkra', 'Adinkra cloth', 'Vải in biểu tượng ý nghĩa bằng mực làm từ vỏ cây, thường mặc khi đi đám cưới hoặc lễ tang. Mỗi biểu tượng mang một ý nghĩa, như khôn ngoan hay kiên nhẫn.', null, { char: ['gh_adinkra'], use: 'wear' });
add(G, A, 'gh-kaba', 'Kaba và slit', 'Kaba and slit', 'Bộ đồ phụ nữ gồm áo ôm sát và váy dài xẻ tà hai phần. Đây là trang phục hàng ngày và lễ hội ở Accra và các thành phố.', null, { char: ['gh_kaba'], use: 'wear' });
add(G, A, 'gh-blackstars', 'Áo bóng đá Black Stars', 'Black Stars football shirt', 'Áo đội tuyển quốc gia màu đỏ, vàng và xanh với ngôi sao đen. Nhiều người mặc áo khi xem trận hoặc đi chợ.', null, { char: ['gh_blackstars'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'gh-beads', 'Chuỗi hạt và vòng cổ hạt Krobo', 'Krobo beads and necklaces', 'Hạt thủy tinh tái chế làm ra ở vùng Krobo, mỗi viên một màu. Phụ nữ đeo trong lễ trưởng thành và lễ cưới.',
  d => { d.bg('e'); for (let a = 0; a < 14; a++) { const t = a / 14 * 6.28; d.put(8 + Math.cos(t) * 5.6, 7 + Math.sin(t) * 5.2, ['r', 'y', 'b', 'g', 'o', 'p', 'w'][a % 7]); } d.e(8, 13, 1.6, 1.6, 'y'); d.p('r', 7, 12, 9, 14); d.p('b', 8, 12); }, H);
add(G, B, 'gh-gold', 'Trang sức vàng Ashanti', 'Ashanti gold jewellery', 'Vàng là biểu tượng của quyền lực và địa vị của người Ashanti. Các trưởng làng và vua đeo vòng cổ, vòng tay vàng nặng trong nghi lễ.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'Y'); d.e(8, 8, 4.8, 4.8, 'e'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4, 4, 'e'); for (let a = 0; a < 12; a++) { const t = a / 12 * 6.28; d.put(8 + Math.cos(t) * 5.2, 8 + Math.sin(t) * 5.2, a % 2 ? 'o' : 'Y'); } d.e(8, 8, 1.6, 1.6, 'y'); d.p('w', 4, 4, 12, 12); }, H);
add(G, B, 'gh-ahenema', 'Dép nghệ nhân (ahenema)', 'Ahenema sandals', 'Dép truyền thống của vua và quý tộc Ashanti, trang trí bằng biểu tượng. Ngày nay dép xuất hiện nhiều kiểu hiện đại.',
  d => { d.bg('c'); d.e(5, 9, 3, 6, 'n'); d.e(11, 9, 3, 6, 'n'); d.e(5, 9, 2, 5, 'N'); d.e(11, 9, 2, 5, 'N'); d.l(5, 4, 3, 9, 'y'); d.l(5, 4, 7, 9, 'y'); d.l(11, 4, 9, 9, 'y'); d.l(11, 4, 13, 9, 'y'); d.p('r', 5, 9, 11, 9); d.p('g', 5, 11, 11, 11); }, { use: 'wear' });
add(G, B, 'gh-duku', 'Mũ và khăn đội đầu (duku)', 'Duku headwraps', 'Phụ nữ quấn khăn nhiều cách cầu kỳ khi đi nhà thờ hoặc dự tiệc. Cách quấn khác nhau thể hiện phong cách và dịp.',
  d => { d.bg('c'); d.e(8, 8, 6, 5, 'r'); d.r(2, 9, 12, 3, 'r'); d.p('g', 4, 6, 6, 5, 9, 5, 11, 6); d.p('y', 5, 8, 8, 7, 11, 8, 7, 10); d.l(4, 9, 12, 9, 'R'); d.tri(10, 2, 4, 4, 'r'); d.p('y', 12, 3); }, { use: 'wear' });
add(G, B, 'gh-staff', 'Ghế ngồi và gậy của trưởng làng (okyeame)', 'The chief\'s staff of the okyeame', 'Gậy trưởng làng có đầu khắc người nói (okyeame) dành cho người phát ngôn của vua. Vật này đại diện cho quyền lực của người nói thay mặt vua.',
  d => { d.bg('e'); d.r(7, 4, 2, 11, 'N'); d.r(7, 4, 2, 11, 'n'); d.r(7, 11, 1, 4, 'N'); d.e(8, 3, 2.6, 2.4, 'y'); d.r(6, 2, 4, 1, 'Y'); d.p('k', 7, 3, 9, 3); d.r(6, 6, 4, 1, 'y'); d.p('Y', 7, 6, 8, 6); d.p('o', 6, 9, 9, 9); d.p('y', 3, 13, 12, 13); }, H);

// ----- Nhà ở -----
add(G, C, 'gh-compound', 'Nhà sân trong khu phố (compound house)', 'Compound house', 'Nhiều phòng quanh một sân chung, nơi nhiều gia đình trong cùng dòng họ sinh sống. Sân là nơi nấu ăn, giặt giũ và trò chuyện.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 't'); d.r(1, 5, 14, 7, 'e'); d.r(1, 4, 14, 1, 'a'); d.r(5, 7, 6, 5, 't'); d.r(2, 7, 2, 3, 'b'); d.r(12, 7, 2, 3, 'b'); d.r(6, 8, 4, 4, 'N'); d.e(8, 10, 1.4, 1.4, 'r'); d.p('o', 7, 9, 9, 10); d.p('g', 2, 14, 13, 14); }, SC);
add(G, C, 'gh-mudhouse', 'Nhà đất phía bắc', 'Northern mud house', 'Nhà bằng đất sét, mái cỏ tròn, tường có họa tiết vẽ tay. Phụ nữ vùng Sirigu nổi tiếng với nghệ thuật trang trí tường.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 't'); d.r(3, 7, 10, 5, 'o'); d.tri(2, 3, 12, 4, 'Y'); d.r(7, 9, 2, 3, 'N'); d.p('w', 4, 8, 6, 10, 10, 8, 12, 10); d.p('k', 5, 9, 11, 9, 4, 11, 12, 11); d.p('r', 5, 8, 11, 10); d.l(3, 11, 12, 11, 'O'); }, SC);
add(G, C, 'gh-colonial', 'Nhà phố thời thuộc địa ở Accra', 'Colonial-era townhouses of Accra', 'Những ngôi nhà hai tầng kiểu cổ ở Jamestown có ban công gỗ. Một số nhà đã xuống cấp nhưng vẫn giữ vẻ đẹp lịch sử.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 4, 14, 10, 'p'); d.r(1, 3, 14, 1, 'P'); d.r(1, 8, 14, 1, 'N'); d.r(1, 7, 14, 1, 'n'); for (const x of [2, 6, 10, 13]) d.r(x, 5, 2, 2, 'B'); for (const x of [3, 7, 11]) d.r(x, 10, 2, 3, 'B'); d.r(1, 9, 14, 1, 'k'); d.p('w', 5, 11); d.p('Y', 14, 12); }, SC);
add(G, C, 'gh-highrise', 'Nhà cao tầng và khu đô thị mới', 'High-rises and new urban districts', 'Accra và Kumasi có nhiều khu nhà mới, căn hộ và biệt thự có cổng. Đô thị phát triển nhanh nhưng còn nhiều khu thiếu hạ tầng.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 2, 5, 12, 'a'); d.r(8, 5, 6, 9, 'A'); d.r(3, 1, 3, 1, 'K'); for (let y = 3; y < 13; y += 3) { d.r(3, y, 1, 2, 'c'); d.r(5, y, 1, 2, 'c'); } for (let y = 6; y < 13; y += 3) { d.r(9, y, 1, 2, 'y'); d.r(12, y, 1, 2, 'c'); } d.r(0, 12, 2, 2, 'g'); d.p('w', 13, 2); }, SC);
add(G, C, 'gh-stilt', 'Nhà sàn ở làng ven nước', 'Stilt houses in waterside villages', 'Nhà dựng trên cọc ở một số làng như Nzulezo, nơi người dân đi lại bằng xuồng. Đây là ngôi làng trên nước nổi tiếng ở miền tây nam.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 5, 10, 4, 'n'); d.tri(2, 2, 12, 3, 'Y'); d.r(7, 6, 2, 3, 'N'); d.r(4, 6, 2, 2, 'y'); d.r(10, 6, 2, 2, 'y'); for (const x of [4, 8, 11]) d.r(x, 9, 1, 4, 'N'); d.r(2, 9, 12, 1, 'N'); d.p('w', 2, 14, 7, 15, 12, 14); d.tri(11, 12, 4, 2, 'N'); d.e(14, 2, 1.4, 1.4, 'y'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'gh-mortar', 'Cối và chày gỗ (mortar và pestle)', 'Wooden mortar and pestle', 'Dùng giã khoai mì và chuối xanh để làm món fufu. Nhịp giã nhịp nhàng là âm thanh quen thuộc trong làng.',
  d => { d.bg('e'); d.r(4, 9, 8, 6, 'N'); d.r(5, 7, 6, 3, 'n'); d.e(8, 8, 4, 1.4, 'k'); d.e(8, 8, 3, 1, 'W'); d.r(3, 14, 10, 1, 'N'); d.r(10, 1, 2, 9, 'n'); d.r(9, 1, 4, 2, 'N'); d.p('w', 6, 3, 8, 2, 5, 5); }, H);
add(G, E, 'gh-stool', 'Ghế stool Ashanti', 'Ashanti stool', 'Ghế gỗ nhỏ khắc từ một khối, là biểu tượng linh thiêng của người Ashanti. Mỗi người có ghế riêng và không cho người khác ngồi.',
  d => { d.bg('e'); d.e(8, 6, 6, 2.4, 'n'); d.r(2, 6, 12, 1, 'N'); d.e(8, 6, 5, 1.6, 'o'); d.r(5, 8, 6, 4, 'n'); d.p('N', 6, 9, 9, 10, 7, 11); d.r(3, 12, 10, 2, 'N'); d.r(3, 12, 10, 1, 'n'); d.p('y', 4, 5, 11, 5); }, H);
add(G, E, 'gh-basket', 'Giỏ và thúng đan', 'Woven baskets', 'Phụ nữ đội giỏ hoặc chậu trên đầu để mang hàng ra chợ. Kỹ năng giữ thăng bằng được luyện từ nhỏ.',
  d => { d.bg('e'); d.e(8, 10, 6, 4.4, 'o'); d.r(2, 6, 12, 2, '_'); d.e(8, 7, 5.4, 1.6, 'O'); d.p('Y', 4, 9, 8, 10, 12, 9, 6, 12, 10, 12); d.p('r', 5, 6, 8, 5, 11, 6); d.p('y', 7, 4, 9, 4); d.p('g', 6, 5, 10, 5); d.l(3, 10, 13, 10, 'O'); }, H);
add(G, E, 'gh-talkingdrum', 'Trống nói (talking drum)', 'The talking drum', 'Trống hình đồng hồ cát, đổi cao độ bằng cách bóp dây. Trống này có thể bắt chước giọng nói của người.',
  d => { d.bg('e'); d.r(3, 2, 10, 2, 'W'); d.r(3, 12, 10, 2, 'W'); d.r(5, 4, 6, 8, 'n'); d.r(6, 5, 4, 6, 'N'); d.l(3, 3, 6, 12, 'r'); d.l(13, 3, 10, 12, 'r'); d.l(3, 12, 6, 4, 'y'); d.l(13, 12, 10, 4, 'y'); d.r(12, 8, 3, 3, 'n'); d.e(14, 6, 1.4, 1.4, 'N'); }, H);
add(G, E, 'gh-momo', 'Mobile money và điện thoại', 'Mobile money and the phone', 'Người dân trả tiền qua điện thoại bằng dịch vụ ví điện tử. Đây là cách thanh toán phổ biến ở chợ và quán nhỏ.',
  d => { d.r(4, 1, 8, 14, 'k'); d.r(5, 2, 6, 11, 'y'); d.r(6, 3, 4, 3, 'k'); d.p('y', 7, 4, 8, 4); d.r(6, 7, 4, 4, 'g'); d.p('w', 7, 8, 8, 9); d.r(6, 12, 4, 1, 'r'); d.p('K', 8, 14); }, H);
add(G, E, 'gh-trotro', 'Xe tro-tro', 'The tro-tro minibus', 'Xe tải nhỏ cải tạo thành xe khách, chạy theo tuyến không cố định. Phụ xe hô điểm đến và nhiều xe dán khẩu hiệu độc đáo sau xe.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'a'); d.r(1, 5, 14, 7, 'y'); d.r(1, 5, 14, 1, 'Y'); d.r(11, 6, 4, 4, 'c'); for (const x of [2, 5, 8]) d.r(x, 6, 2, 3, 'c'); d.r(1, 9, 14, 1, 'r'); d.r(1, 10, 14, 1, 'g'); d.e(4, 12, 2, 2, 'k'); d.e(12, 12, 2, 2, 'k'); d.p('w', 4, 12, 12, 12); d.p('k', 3, 4, 8, 3, 12, 4); }, SC);
