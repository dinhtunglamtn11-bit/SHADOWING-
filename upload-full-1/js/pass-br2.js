import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('br');
// Brasil · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.bikini = { map: M_TOP, pal: { ...base, t: '#ffd5b5', T: '#eab08f', u: '#ffd5b5', b: '#ff4f8b', p: '#ffd5b5', l: '#ffd5b5', x: '#ffd5b5' }, patch: [[12, 5, 'b'], [12, 6, 'b'], [12, 9, 'b'], [12, 10, 'b'], [11, 7, 'b'], [11, 8, 'b'], [16, 6, 'b'], [16, 7, 'b'], [16, 8, 'b'], [16, 9, 'b']] };
OUTM.selecao = { map: M_TOP, pal: { ...base, t: '#ffd84d', T: '#f0b020', u: '#ffd84d', b: '#1f4fb8', p: '#1f4fb8', l: '#ffffff', x: '#ffffff' }, patch: [[11, 5, 'G'], [11, 6, 'G'], [11, 9, 'G'], [11, 10, 'G'], [13, 7, 'G'], [13, 8, 'G'], [14, 7, 'G']] };
OUTM.baiana = { map: M_DRESS, pal: { ...base, t: '#ffffff', T: '#dfe6f8', u: '#ffffff', b: '#ffffff', x: '#ffffff' }, patch: [[11, 6, 'y'], [11, 7, 'b'], [11, 8, 'y'], [11, 9, 'b'], [12, 6, 'r'], [12, 7, 'y'], [12, 8, 'r'], [12, 9, 'y'], [16, 3, 'T'], [17, 12, 'T'], [18, 7, 'T'], [18, 8, 'T']] };
OUTM.gaucho = { map: M_TOP, pal: { ...base, t: '#c4153a', T: '#8a0f28', u: '#c4153a', b: '#5a3a1a', p: '#8a7a5a', l: '#6b5a3a', x: '#2b1d3a' }, patch: [[11, 6, 'y'], [11, 7, 'y'], [11, 8, 'y'], [11, 9, 'y'], [14, 4, 'T'], [14, 11, 'T'], [15, 7, 'Y'], [15, 8, 'Y']] };
OUTM.carnaval = { map: M_DRESS, pal: { ...base, t: '#b84fd6', T: '#ffd84d', u: '#ffd84d', b: '#ffd84d', x: '#ff4f8b' }, patch: [[11, 5, 'y'], [11, 6, 'g'], [11, 7, 'y'], [11, 8, 'y'], [11, 9, 'g'], [11, 10, 'y'], [13, 7, 'c'], [13, 8, 'c'], [16, 4, 'o'], [16, 11, 'o'], [17, 3, 'g'], [17, 12, 'g'], [18, 6, 'p'], [18, 9, 'p']] };
OUTM.indigena = { map: M_TOP, pal: { ...base, t: '#eab08f', T: '#c98a66', u: '#eab08f', b: '#2f9a4a', p: '#a8281a', l: '#eab08f', x: '#eab08f' }, patch: [[12, 5, 'r'], [12, 10, 'r'], [13, 5, 'k'], [13, 10, 'k'], [14, 6, 'r'], [14, 9, 'r'], [11, 4, 'y'], [11, 11, 'y'], [11, 7, 'R'], [11, 8, 'R']] };
OUTM.paulista = { map: M_TOP, pal: { ...base, t: '#4a6fa5', T: '#2f4f7a', u: '#4a6fa5', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'w'], [12, 8, 'w'], [13, 7, 'r'], [13, 8, 'r']] };
Object.assign(OUT_KEY, { 'br-bikini': 'bikini', 'br-selecao': 'selecao', 'br-baiana': 'baiana', 'br-gaucho': 'gaucho', 'br-carnaval': 'carnaval', 'br-indigena': 'indigena', 'br-paulista': 'paulista' });
Object.assign(SLOT_OF, { 'br-bikini': 'outfit', 'br-selecao': 'outfit', 'br-baiana': 'outfit', 'br-gaucho': 'outfit', 'br-carnaval': 'outfit', 'br-indigena': 'outfit', 'br-paulista': 'outfit', 'br-palha': 'head', 'br-havaianas': 'feet' });
O['br-palha'] = { y0: -2, pal: { y: '#e0c070', Y: '#a8883a', r: '#e8452c' }, rows: ['.......yy.......', '....yyyyyyyyy...', '..yyyyyyyyyyyy..', '.yyYYYYYYYYYyy..', 'YYyyyyyyyyyyyyYY'] };
O['br-havaianas'] = { y0: 18, pal: { g: '#2f9a4a', y: '#ffd84d', b: '#2b6fd6', w: '#ffffff' }, rows: ['...yy......yy...', '...gg......gg...', '..bbbb....bbbb..'] };

add(G, A, 'br-bikini', 'Đồ biển và bikini (biquíni, sunga)', 'Beachwear and bikinis (biquíni, sunga)', 'Bikini và quần bơi sát người là trang phục phổ biến ở Rio và các thành phố biển; mỗi bãi biển có phong cách thời trang riêng.', null, { char: ['bikini'], use: 'wear' });
add(G, A, 'br-selecao', 'Áo bóng đá đội tuyển vàng-xanh', 'Yellow-and-green national team shirt', 'Áo vàng cổ xanh lá của đội tuyển quốc gia được mặc rộng rãi trong mùa giải lớn, là biểu tượng của niềm tự hào.', null, { char: ['selecao'], use: 'wear' });
add(G, A, 'br-baiana', 'Trang phục Baiana', 'Baiana dress', 'Váy trắng xòe rộng, khăn quấn đầu và nhiều vòng cổ, gắn với phụ nữ Bahia và truyền thống gốc Phi; những người bán acarajé ở Salvador thường mặc bộ này.', null, { char: ['baiana'], use: 'wear' });
add(G, A, 'br-gaucho', 'Trang phục gaucho', 'Gaucho outfit', 'Quần bồng, khăn cổ và mũ rộng vành của người chăn bò ở Rio Grande do Sul, mặc trong lễ hội truyền thống và cuộc thi cưỡi ngựa.', null, { char: ['gaucho'], use: 'wear' });
add(G, A, 'br-carnaval', 'Trang phục Carnaval', 'Carnaval costume', 'Bộ đồ lấp lánh với lông vũ, hạt đính và vải rực rỡ dùng cho các trường samba; mỗi trường có chủ đề riêng mỗi năm.', null, { char: ['carnaval'], use: 'wear' });
add(G, A, 'br-indigena', 'Trang phục bản địa (Yanomami, Kayapó)', 'Indigenous attire (Yanomami, Kayapó)', 'Sơn cơ thể và đồ trang trí lông chim trong nghi lễ; màu sắc và họa tiết thể hiện địa vị và nghi lễ.', null, { char: ['indigena'], use: 'wear' });
add(G, A, 'br-paulista', 'Thời trang công sở ở São Paulo', 'São Paulo office style', 'Người làm việc văn phòng thường mặc đồ đơn giản, lịch sự nhưng không quá cứng nhắc; São Paulo có tuần lễ thời trang riêng.', null, { char: ['paulista'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'br-havaianas', 'Dép Havaianas', 'Havaianas flip-flops', 'Dép xỏ ngón bằng cao su ra đời năm 1962, được nhiều người đi quanh năm; là thương hiệu Brasil nổi tiếng nhất trên thế giới.',
  d => { d.bg('c'); d.e(5, 8, 3, 6, 'g'); d.e(11, 8, 3, 6, 'y'); d.e(5, 8, 2, 5, 'w'); d.e(11, 8, 2, 5, 'w'); d.l(5, 4, 3, 10, 'b'); d.l(5, 4, 7, 10, 'b'); d.l(11, 4, 9, 10, 'b'); d.l(11, 4, 13, 10, 'b'); d.p('b', 5, 3, 11, 3); }, { use: 'wear' });
add(G, B, 'br-fita', 'Vòng tay Fita do Bonfim', 'Fita do Bonfim wish ribbon', 'Dải vải màu buộc vào cổ tay với ba điều ước, để cho đứt tự nhiên thì điều ước thành; gắn với nhà thờ Senhor do Bonfim ở Salvador.',
  d => { d.bg('e'); d.r(2, 4, 12, 3, 'b'); d.r(2, 7, 12, 2, 'y'); d.r(2, 9, 12, 3, 'g'); d.p('w', 4, 5, 8, 5, 11, 10, 6, 10); d.r(12, 4, 2, 8, 'r'); d.p('R', 12, 6, 13, 9); d.p('k', 6, 13, 8, 14); }, H);
add(G, B, 'br-figa', 'Bùa Figa', 'Figa charm', 'Bùa nhỏ hình nắm tay với ngón cái kẹp giữa, dùng để cầu may và xua đuổi điều xấu; nhiều người đeo làm vòng cổ hoặc treo trong xe.',
  d => { d.bg('e'); d.r(5, 5, 6, 8, 'n'); d.r(6, 3, 1, 3, 'n'); d.r(8, 2, 1, 4, 'n'); d.r(10, 3, 1, 3, 'n'); d.r(7, 6, 2, 3, 'N'); d.p('N', 6, 8, 9, 7); d.r(6, 13, 4, 2, 'Y'); d.p('y', 8, 0, 7, 1, 9, 1); }, H);
add(G, B, 'br-gems', 'Trang sức đá quý Brasil', 'Brazilian gemstone jewellery', 'Đất nước nổi tiếng với đá topaz, thạch anh và ngọc lục bảo; vùng Minas Gerais là nơi khai thác lâu đời.',
  d => { d.bg('e'); d.tri(1, 2, 6, 6, 'o'); d.tri(1, 2, 6, 3, 'y'); d.tri(9, 3, 6, 5, 'g'); d.tri(9, 3, 6, 2, 'h'); d.tri(4, 9, 8, 6, 'v'); d.tri(4, 9, 8, 3, 'p'); d.p('w', 3, 3, 11, 4, 7, 11); }, H);
add(G, B, 'br-leather', 'Túi và đồ da ở miền Nam', 'Leather bags and goods (South)', 'Ngành da và giày phát triển ở Rio Grande do Sul; nhiều giày và túi da được xuất khẩu.',
  d => { d.bg('e'); d.r(2, 6, 12, 8, 'n'); d.r(2, 6, 12, 2, 'N'); d.l(5, 6, 6, 3, 'N'); d.l(10, 6, 9, 3, 'N'); d.l(6, 3, 9, 3, 'N'); d.r(7, 9, 2, 2, 'y'); d.p('O', 3, 12, 12, 12); d.p('y', 3, 7, 12, 7); }, H);
add(G, B, 'br-capim', 'Trang sức cỏ vàng (capim dourado)', 'Golden grass jewellery (capim dourado)', 'Vòng cổ và túi đan từ cỏ vàng ở bang Tocantins; màu vàng ánh làm nó rất dễ nhận ra.',
  d => { d.bg('e'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4.4, 4.4, 'e'); d.e(8, 8, 6, 6, 'y'); d.e(8, 8, 4, 4, 'e'); for (let a = 0; a < 12; a++) { const t = a / 12 * 6.28; d.put(8 + Math.cos(t) * 5.2, 8 + Math.sin(t) * 5.2, a % 2 ? 'o' : 'Y'); } d.p('u', 3, 3, 13, 12); }, H);
add(G, B, 'br-palha', 'Mũ palha (mũ rơm)', 'Palha straw hat', 'Mũ đan từ rơm hoặc lá cọ, che nắng cho nông dân và người đi biển; xuất hiện nhiều ở vùng đông bắc.',
  d => { d.bg('c'); d.e(8, 9, 7, 3, 'y'); d.e(8, 7, 3.6, 3, 'y'); d.r(5, 8, 6, 1, 'r'); d.p('Y', 3, 10, 6, 11, 10, 11, 13, 10, 7, 5, 9, 6); d.r(1, 10, 14, 1, 'Y'); }, { use: 'wear' });

// ----- Nhà ở -----
add(G, C, 'br-colonial', 'Nhà trệt màu sắc ở Salvador và Olinda', 'Colourful colonial houses (Salvador, Olinda)', 'Những dãy nhà thời thuộc địa sơn màu rực rỡ dọc phố đá cuội; di sản của thời Bồ Đào Nha.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(0, 6, 5, 8, 'y'); d.r(5, 7, 5, 7, 'p'); d.r(10, 5, 6, 9, 'c'); d.tri(0, 4, 5, 2, 'R'); d.tri(5, 5, 5, 2, 'R'); d.tri(10, 3, 6, 2, 'R'); d.r(1, 9, 1, 2, 'B'); d.r(3, 9, 1, 2, 'B'); d.r(6, 10, 1, 2, 'B'); d.r(11, 8, 1, 2, 'B'); d.r(13, 8, 1, 2, 'B'); d.r(7, 12, 2, 2, 'N'); }, SC);
add(G, C, 'br-favela', 'Favela (khu nhà trên sườn đồi)', 'Favela (hillside community)', 'Khu nhà dựng tự phát trên sườn đồi quanh các thành phố lớn, nhiều nơi thiếu dịch vụ cơ bản; nhiều favela có cộng đồng gắn kết và văn hóa âm nhạc riêng.',
  d => { d.bg('c'); d.tri(0, 4, 16, 12, 'G'); for (const [x, y, c] of [[6, 5, 'o'], [8, 5, 'b'], [4, 7, 'y'], [7, 7, 'r'], [10, 7, 'o'], [3, 9, 'b'], [6, 9, 'p'], [9, 9, 'y'], [12, 9, 'r'], [5, 11, 'r'], [8, 11, 'o'], [11, 11, 'b'], [2, 12, 'y'], [14, 12, 'o']]) { d.r(x, y, 2, 2, c); d.put(x, y, 'k'); } d.p('w', 12, 2); }, SC);
add(G, C, 'br-apartment', 'Nhà chung cư cao tầng có cổng rào', 'High-rise apartments with gated entrances', 'Ở São Paulo và Rio, nhiều người sống trong căn hộ có bảo vệ; nhiều tòa nhà có cổng rào và bảo vệ 24 giờ.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 1, 10, 13, 'W'); d.r(3, 1, 10, 1, 'a'); for (let y = 3; y < 12; y += 3) for (let x = 4; x < 12; x += 3) d.r(x, y, 2, 2, 'C'); d.r(7, 12, 2, 2, 'k'); d.r(0, 12, 3, 2, 'A'); d.r(13, 12, 3, 2, 'A'); }, SC);
add(G, C, 'br-palafitas', 'Nhà sàn trên sông (palafitas)', 'Stilt houses on the river (palafitas)', 'Nhà gỗ dựng trên cột hoặc nổi để tránh nước lũ ở Amazon; người dân đi lại bằng thuyền.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'C'); d.r(3, 5, 10, 4, 'n'); d.tri(2, 2, 12, 3, 'O'); d.r(7, 6, 2, 3, 'N'); d.r(4, 6, 2, 2, 'y'); for (const x of [4, 8, 11]) d.r(x, 9, 1, 4, 'N'); d.r(2, 9, 12, 1, 'N'); d.p('b', 2, 14, 7, 15, 12, 14); d.e(14, 2, 1.4, 1.4, 'y'); }, SC);
add(G, C, 'br-maloca', 'Maloca của người bản địa', 'Indigenous maloca', 'Ngôi nhà chung lớn mái lá để nhiều gia đình cùng sống; người Yanomami gọi loại nhà này là yano.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(8, 13, 7, 8, 'Y'); d.e(8, 13, 7, 8, 'u'); d.e(8, 13, 6, 7, 'Y'); d.r(0, 13, 16, 3, 'g'); d.r(7, 10, 2, 3, 'k'); d.p('O', 4, 9, 11, 9, 6, 6, 9, 6, 8, 4); d.p('w', 13, 2); }, SC);
add(G, C, 'br-fazenda', 'Nhà trang trại (fazenda)', 'Farmhouse (fazenda)', 'Ngôi nhà lớn bên trang trại cà phê hoặc chăn nuôi, thường có hiên rộng và sân rộng; nhiều căn nay là nơi nghỉ dưỡng.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 6, 12, 6, 'e'); d.tri(1, 3, 14, 3, 'R'); d.r(2, 9, 12, 1, 'W'); for (const x of [3, 6, 9, 12]) d.r(x, 9, 1, 3, 'N'); d.r(4, 7, 2, 2, 'b'); d.r(10, 7, 2, 2, 'b'); d.r(7, 7, 2, 2, 'N'); d.p('G', 0, 11, 15, 11); }, SC);
add(G, C, 'br-niemeyer', 'Nhà hiện đại của Niemeyer', 'Niemeyer modernist houses', 'Những công trình cong mềm mại bằng bê tông ảnh hưởng lớn đến kiến trúc; một số biệt thự theo phong cách này.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(8, 14, 9, 5, 'w'); d.r(0, 14, 16, 2, 'g'); d.r(2, 9, 12, 4, 'C'); d.e(8, 8, 8, 1.6, 'W'); d.r(1, 8, 14, 1, 'W'); d.p('b', 4, 10, 7, 11, 11, 10); d.l(2, 12, 2, 13, 'W'); d.l(14, 12, 14, 13, 'W'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'br-rede', 'Võng (rede)', 'Hammock (rede)', 'Vật dụng để ngủ và nghỉ trưa, gắn với người bản địa và vùng đông bắc; nhiều gia đình treo võng ngoài hiên.',
  d => { d.bg('c'); d.l(1, 3, 1, 14, 'N'); d.l(14, 3, 14, 14, 'N'); for (let x = 2; x < 14; x++) { const y = 6 + Math.round(4 * Math.sin((x - 1) / 13 * Math.PI)); d.r(x, y, 1, 2, x % 3 ? 'r' : 'y'); } d.p('k', 2, 5, 13, 5); d.r(0, 14, 16, 2, 'g'); }, SC);
add(G, E, 'br-cuia', 'Bình cuia và ống hút bomba', 'Cuia gourd and bomba straw', 'Ở miền Nam, người ta uống trà mate bằng bình quả bí và ống hút kim loại; cả nhóm cùng chuyền tay một bình.',
  d => { d.e(7, 10, 5, 5, 'n'); d.r(2, 5, 10, 2, '_'); d.e(7, 7, 4, 1.2, 'g'); d.l(9, 7, 13, 1, 'a'); d.p('A', 13, 0, 12, 1); d.p('N', 4, 12, 10, 13, 7, 14); d.p('y', 12, 11, 12, 12); d.r(3, 6, 8, 1, 'N'); }, H);
add(G, E, 'br-panela', 'Nồi đất feijoada (panela de barro)', 'Clay feijoada pot (panela de barro)', 'Nồi đất nấu món hầm đậu đen, giữ nhiệt lâu; món này thường nấu vào cuối tuần.',
  d => { d.e(8, 10, 6, 4.6, 'N'); d.r(2, 6, 12, 2, 'n'); d.r(3, 6, 10, 1, 'k'); d.r(1, 9, 2, 2, 'N'); d.r(13, 9, 2, 2, 'N'); d.p('w', 5, 3, 8, 2, 11, 3); d.p('l', 6, 4, 10, 4); d.p('O', 5, 11, 10, 12); }, H);
add(G, E, 'br-berimbau', 'Berimbau (cung gỗ một dây)', 'Berimbau', 'Cung gỗ một dây có quả bí rỗng làm hộp cộng hưởng, dùng trong capoeira; người chơi đánh bằng que và dùng một đồng xu để đổi âm.',
  d => { d.l(12, 1, 6, 14, 'N'); d.l(13, 1, 7, 14, 'n'); d.l(12, 1, 7, 14, 'k'); d.e(5, 11, 3.4, 3.4, 'y'); d.e(5, 11, 2, 2, 'Y'); d.r(4, 9, 2, 1, 'N'); d.p('a', 10, 6, 9, 8); }, H);
add(G, E, 'br-coador', 'Túi lọc cà phê bằng vải (coador)', 'Cloth coffee filter (coador)', 'Túi vải lọc cà phê treo trên giá, vẫn được nhiều gia đình dùng; cà phê (cafezinho) được rót vào cốc nhỏ.',
  d => { d.r(2, 1, 8, 1, 'N'); d.l(2, 1, 2, 3, 'N'); d.dtri(3, 3, 7, 6, 'e'); d.r(3, 3, 7, 1, 'W'); d.p('n', 6, 9, 6, 10); d.r(4, 11, 6, 3, 'w'); d.r(10, 12, 2, 1, 'w'); d.r(5, 11, 4, 1, 'N'); d.p('w', 13, 4); }, H);
add(G, E, 'br-pix', 'Ứng dụng thanh toán Pix', 'Pix payment app', 'Hệ thống thanh toán tức thì do ngân hàng trung ương ra mắt năm 2020, dùng mã QR hoặc số điện thoại; được nhiều người dùng để trả tiền cả cho quán nhỏ.',
  d => { d.r(4, 1, 8, 14, 'k'); d.r(5, 2, 6, 11, 'l'); d.r(6, 4, 4, 4, 'w'); d.p('k', 6, 4, 7, 4, 9, 4, 6, 5, 9, 6, 7, 7, 9, 7); d.r(6, 9, 4, 2, 'g'); d.p('w', 7, 10, 8, 10); d.p('K', 8, 14); }, H);
add(G, E, 'br-beachgear', 'Đồ dùng bãi biển (ghế, ô che)', 'Beach gear (chairs, umbrellas)', 'Ghế xếp và ô che dưới nắng được thuê ngay trên bãi; người bán hàng rong mang đồ uống và đồ ăn đến tận nơi.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.r(0, 8, 16, 2, 'C'); d.fan(5, 9, 5, 'r'); d.fan(5, 9, 3, 'w'); d.l(5, 9, 5, 14, 'N'); d.r(9, 11, 5, 1, 'b'); d.l(9, 12, 8, 14, 'B'); d.l(13, 12, 14, 14, 'B'); d.p('y', 13, 3); }, SC);
