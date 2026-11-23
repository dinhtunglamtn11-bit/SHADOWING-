import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('ch');
// Thụy Sĩ · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.chtracht = { map: M_DRESS, pal: { ...base, t: '#2a3f8a', T: '#e8452c', u: '#f5f5f5', b: '#e8452c', x: '#2a3f8a' }, patch: [[11, 4, 'y'], [11, 8, 'y'], [11, 11, 'y'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'y'], [15, 11, 'y']] };
OUTM.chedel = { map: M_TOP, pal: { ...base, t: '#1f3a8a', T: '#ffffff', u: '#1f3a8a', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a', x: '#3a2a1a' }, patch: [[10, 6, 'T'], [10, 9, 'T'], [11, 7, 'T'], [11, 8, 'T'], [12, 7, 'T'], [12, 8, 'T']] };
OUTM.chsenn = { map: M_KIM, pal: { ...base, t: '#f2c230', T: '#e8452c', u: '#f2c230', b: '#6a4a24', x: '#5a3a1a' }, patch: [[11, 4, 'T'], [11, 6, 'w'], [11, 9, 'w'], [11, 11, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'w'], [15, 11, 'w']] };
OUTM.chappen = { map: M_DRESS, pal: { ...base, t: '#1b1b2a', T: '#c94a4a', u: '#ffffff', b: '#ffffff', x: '#1b1b2a' }, patch: [[11, 5, 'T'], [11, 6, 'T'], [11, 9, 'T'], [11, 10, 'T'], [13, 6, 'y'], [13, 9, 'y'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.chhike = { map: M_TOP, pal: { ...base, t: '#d6402a', T: '#ffd84d', u: '#d6402a', b: '#4a4a5a', p: '#4a4a5a', l: '#5a3a1a', x: '#5a3a1a' }, patch: [[11, 4, 'T'], [11, 11, 'T'], [13, 5, 'T'], [13, 10, 'T']] };
OUTM.choffice = { map: M_TOP, pal: { ...base, t: '#3a4252', T: '#ffffff', u: '#3a4252', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a', x: '#1b1b2a' }, patch: [[10, 7, 'T'], [10, 8, 'T'], [11, 7, 'r'], [12, 7, 'r'], [13, 7, 'r']] };
OUTM.chfas = { map: M_KIM, pal: { ...base, t: '#7a3fc0', T: '#ffd84d', u: '#e8452c', b: '#2fa58f', x: '#e8452c' }, patch: [[11, 4, 'T'], [11, 6, 'b'], [11, 9, 'b'], [11, 11, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'u'], [15, 11, 'u'], [17, 3, 'T'], [17, 12, 'T']] };
Object.assign(OUT_KEY, { 'ch-tracht': 'chtracht', 'ch-edelhemd': 'chedel', 'ch-senn': 'chsenn', 'ch-appenzell': 'chappen', 'ch-hike': 'chhike', 'ch-office': 'choffice', 'ch-fasnachtcos': 'chfas' });
Object.assign(SLOT_OF, { 'ch-tracht': 'outfit', 'ch-edelhemd': 'outfit', 'ch-senn': 'outfit', 'ch-appenzell': 'outfit', 'ch-hike': 'outfit', 'ch-office': 'outfit', 'ch-fasnachtcos': 'outfit', 'ch-edelpin': 'head', 'ch-hat': 'head' });
O['ch-edelpin'] = { y0: 0, pal: { w: '#ffffff', y: '#ffd84d', g: '#2f7d3a' }, rows: ['.......w.w......', '......wwywwg.....'] };
O['ch-hat'] = { y0: -1, pal: { n: '#8a5a2a', N: '#5a3a1a', t: '#e6c892', r: '#c9302a' }, rows: ['......nnnn......', '.....nnnnnn.....', '..tttttttttttt..', '...NNNNNNNNNN...'] };

add(G, A, 'ch-tracht', 'Tracht (trang phục truyền thống)', 'Tracht (traditional costume)', 'Mỗi bang có bộ trang phục riêng, gồm váy dài có tạp dề, áo ngực thêu và mũ hoặc khăn. Chúng thường được mặc trong lễ hội, đám cưới và các cuộc diễu hành, và nhiều bộ được truyền lại trong gia đình.', null, { char: ['chtracht'], use: 'wear' });
add(G, A, 'ch-edelhemd', 'Áo sơ mi Edelweiss (Edelweisshemd)', 'Edelweiss shirt (Edelweisshemd)', 'Áo xanh đậm thêu hoa edelweiss trắng ở cổ và ngực, gắn với người chăn nuôi và các võ sĩ đấu vật kiểu Thụy Sĩ. Ngày nay nhiều người mặc trong lễ hội và cả như một món thời trang truyền thống.', null, { char: ['chedel'], use: 'wear' });
add(G, A, 'ch-senn', 'Sennentracht của người chăn bò', 'Sennentracht (herdsman costume)', 'Áo khoác màu vàng hoặc đỏ, quần da và mũ nhỏ, kèm đai thêu và khuyên bạc, mặc trong dịp đưa bò lên và xuống núi. Trang phục khiến người mặc nổi bật giữa đàn bò đeo chuông.', null, { char: ['chsenn'], use: 'wear' });
add(G, A, 'ch-appenzell', 'Trang phục Appenzell', 'Appenzell costume', 'Bộ váy đen với áo trắng ống tay phồng và chiếc mũ trắng rộng vành rất đặc trưng. Phụ nữ thường mặc cùng trang sức bạc nhiều lớp.', null, { char: ['chappen'], use: 'wear' });
add(G, A, 'ch-hike', 'Áo khoác và đồ đi núi hiện đại', 'Modern mountain wear', 'Ngày thường, người dân ưa dùng áo khoác chống thấm, giày leo núi và áo len ấm vì khí hậu thay đổi nhanh. Đi bộ đường dài là hoạt động quen thuộc nên đồ đi núi rất phổ biến, ngay cả ở thành phố.', null, { char: ['chhike'], use: 'wear' });
add(G, A, 'ch-office', 'Trang phục công sở', 'Business attire', 'Ở Zurich và Geneva, người làm trong ngân hàng và công ty lớn thường mặc đơn giản, gọn gàng và ít phô trương. Nhiều người coi sự kín đáo là một dấu hiệu của sự tinh tế.', null, { char: ['choffice'], use: 'wear' });
add(G, A, 'ch-fasnachtcos', 'Mặt nạ và hóa trang lễ hội Fasnacht', 'Fasnacht masks and costumes', 'Người tham gia mặc những bộ đồ sặc sỡ, đeo mặt nạ lớn, đầu to và đi diễu hành trong những ngày hội mùa đông. Mỗi vùng có kiểu hóa trang riêng.', null, { char: ['chfas'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'ch-watch', 'Đồng hồ Thụy Sĩ', 'Swiss watch', 'Biểu tượng toàn cầu của sự chính xác và tay nghề, với những thương hiệu như Rolex, Omega, Patek Philippe hay Swatch. Ngành này tập trung ở Geneva và dãy núi Jura, nơi nhiều xưởng nhỏ vẫn làm việc thủ công.',
  d => { d.bg('e'); d.r(6, 0, 4, 3, 'n'); d.r(6, 13, 4, 3, 'n'); d.e(8, 8, 5, 5, 'Y'); d.e(8, 8, 4, 4, 'w'); d.l(8, 8, 8, 5, 'k'); d.l(8, 8, 10, 9, 'k'); d.p('r', 8, 11); d.p('k', 8, 4, 8, 12, 4, 8, 12, 8); }, H);
add(G, B, 'ch-knife', 'Dao đa năng Thụy Sĩ (Swiss Army Knife)', 'Swiss Army Knife', 'Con dao đỏ có nhiều công cụ nhỏ gấp gọn, gắn với lính và người đi dã ngoại. Câu chuyện của nó được kể ở cuối Nhóm 2.',
  d => { d.bg('e'); d.r(2, 6, 12, 5, 'r'); d.r(2, 6, 12, 1, 'R'); d.r(2, 10, 12, 1, 'R'); d.r(7, 7, 3, 3, 'w'); d.p('r', 8, 8); d.p('l', 3, 4, 4, 5, 5, 5, 12, 12, 13, 13); d.l(3, 6, 5, 3, 'a'); d.l(12, 11, 14, 14, 'a'); d.p('k', 2, 8); }, H);
add(G, B, 'ch-edelpin', 'Hoa edelweiss cài áo', 'Edelweiss pin', 'Huy hiệu nhỏ hình hoa edelweiss thường được cài trên mũ hoặc áo khoác. Nó tượng trưng cho tình yêu núi và lòng can đảm của những người leo núi.',
  d => { d.bg('c'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.e(8 + Math.cos(a) * 3.4, 8 + Math.sin(a) * 3.4, 1.5, 1.5, 'w'); } d.e(8, 8, 1.6, 1.6, 'y'); d.p('l', 5, 5, 11, 11); d.p('G', 8, 13, 8, 14); }, { use: 'wear' });
add(G, B, 'ch-silver', 'Trang sức bạc và vàng truyền thống', 'Traditional silver and gold jewelry', 'Dây chuyền bạc, kim cài và xích gắn với trang phục Tracht, đặc biệt ở Bern và Appenzell. Chúng thường là của hồi môn và được cất giữ qua nhiều thế hệ.',
  d => { d.bg('P'); d.e(8, 8, 6, 6, 'a'); d.e(8, 8, 4.6, 4.6, 'P'); for (let i = 0; i < 8; i++) { const a = i * 0.785; d.p(i % 2 ? 'l' : 'a', 8 + Math.cos(a) * 5.4, 8 + Math.sin(a) * 5.4); } d.e(8, 13, 1.6, 1.6, 'y'); d.p('Y', 8, 13); d.p('l', 6, 6, 5, 8, 7, 4); }, H);
add(G, B, 'ch-treichel', 'Chuông bò (Treicheln) làm kỷ vật', 'Cowbell (Treicheln) as a keepsake', 'Chiếc chuông đồng thật hoặc mô hình nhỏ làm quà lưu niệm, cũng có thể đeo trong lễ hội. Chuông lớn có hoa văn chạm được xem như tác phẩm thủ công.',
  d => { d.bg('e'); d.r(7, 1, 2, 2, 'N'); d.tri(3, 3, 10, 9, 'Y'); d.r(3, 11, 10, 2, 'y'); d.e(8, 14, 1.4, 1.4, 'N'); d.p('r', 8, 7); d.p('R', 6, 9, 10, 9); d.p('w', 5, 7); }, H);
add(G, B, 'ch-hat', 'Mũ rơm và mũ len của người chăn nuôi', 'Straw and wool hats of herders', 'Những chiếc mũ rộng vành bảo vệ khỏi nắng núi và mũ len giữ ấm khi sương lạnh. Chúng vẫn thấy ở các lễ hội và hội chợ.',
  d => { d.bg('e'); d.e(8, 6, 4, 3.6, 'n'); d.e(8, 11, 7, 2.2, 't'); d.r(4, 7, 8, 2, 'N'); d.p('r', 7, 8, 8, 8); d.p('Y', 6, 12, 10, 12, 8, 13); }, { use: 'wear' });
add(G, B, 'ch-freitag', 'Túi Freitag', 'Freitag bag', 'Túi làm từ bạt xe tải tái chế, mỗi chiếc có hoa văn khác nhau, do hai anh em ở Zurich bắt đầu làm từ năm 1993. Chúng thể hiện tinh thần sáng tạo và tái chế của Thụy Sĩ.',
  d => { d.bg('e'); d.r(3, 5, 10, 9, 'b'); d.r(3, 5, 10, 2, 'B'); d.r(5, 7, 3, 3, 'w'); d.r(9, 9, 3, 3, 'r'); d.r(4, 11, 3, 2, 'y'); d.l(5, 5, 6, 1, 'k'); d.l(10, 5, 9, 1, 'k'); d.p('k', 6, 1, 9, 1); d.r(3, 13, 10, 1, 'k'); }, H);

// ----- Nhà ở -----
add(G, C, 'ch-chalet', 'Chalet gỗ', 'Wooden chalet', 'Ngôi nhà gỗ mái dốc, mái hiên rộng và ban công chạm khắc, hình ảnh quen thuộc ở vùng núi. Mái dốc giúp tuyết trượt xuống và hiên rộng che mưa cho tường gỗ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'w'); d.r(3, 7, 10, 6, 'n'); d.tri(0, 2, 16, 5, 'N'); d.r(3, 9, 10, 1, 'N'); d.r(7, 10, 2, 3, 'k'); d.r(4, 8, 2, 1, 'r'); d.r(10, 8, 2, 1, 'r'); d.p('r', 4, 10, 11, 10); d.p('w', 3, 2, 12, 3); }, SC);
add(G, C, 'ch-engadin', 'Nhà Engadin trang trí sgraffito', 'Engadin house with sgraffito', 'Nhà tường đá dày với cửa sổ nhỏ sâu và hoa văn khắc nổi trên lớp vữa, phổ biến ở vùng Graubünden. Tường dày giúp giữ ấm trong mùa đông khắc nghiệt.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 4, 12, 10, 'e'); d.tri(1, 1, 14, 4, 'a'); d.e(8, 11, 2, 3, 'k'); d.r(6, 11, 4, 3, 'k'); for (const x of [3, 11]) { d.r(x, 6, 2, 2, 'k'); d.p('W', x - 1, 5, x + 2, 5); } d.p('b', 3, 9, 5, 9, 11, 9, 13, 9); d.p('r', 8, 5); }, SC);
add(G, C, 'ch-mazot', 'Nhà kho mazot ở Valais', 'Mazot barn in Valais', 'Kho gỗ nhỏ dựng trên cột có đĩa đá phẳng ở đầu để chuột không trèo vào. Chúng được dùng để cất lương thực và nhiều cái có tuổi đời hàng trăm năm.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.r(3, 6, 10, 5, 'N'); d.tri(2, 2, 12, 4, 'a'); for (const x of [4, 11]) { d.r(x, 11, 1, 3, 'n'); d.r(x - 1, 11, 3, 1, 'a'); } d.p('n', 5, 7, 7, 7, 9, 7, 11, 7, 5, 9, 8, 9, 11, 9); d.p('k', 8, 8); }, SC);
add(G, C, 'ch-emmental', 'Nhà nông Emmental (Bauernhaus)', 'Emmental farmhouse (Bauernhaus)', 'Ngôi nhà lớn có mái rất rộng và thấp, che cả nhà ở, chuồng gia súc và kho cỏ dưới cùng một mái. Cách xây này tiện cho mùa đông khi tuyết dày.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); d.r(2, 9, 12, 5, 'n'); d.tri(0, 3, 16, 7, 'N'); d.tri(4, 5, 8, 4, 'n'); d.r(3, 10, 2, 2, 'y'); d.r(11, 10, 2, 2, 'y'); d.r(7, 11, 2, 3, 'k'); d.p('r', 3, 12, 4, 12, 11, 12, 12, 12); }, SC);
add(G, C, 'ch-rustico', 'Rustici ở Ticino', 'Rustici in Ticino', 'Nhà đá nhỏ có mái đá phiến, ban đầu dùng làm kho hoặc nơi ở mùa hè của nông dân, nay nhiều căn được sửa thành nhà nghỉ. Phong cách giống nhà vùng Lombardy của nước Ý hơn.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'G'); d.r(3, 7, 10, 6, 'a'); d.tri(2, 3, 12, 4, 'A'); for (const [x, y] of [[4, 8], [7, 9], [10, 8], [5, 11], [9, 11]]) d.p('K', x, y); d.r(7, 10, 2, 3, 'N'); d.p('r', 4, 5, 11, 5); d.p('w', 1, 2, 13, 3); }, SC);
add(G, C, 'ch-apartment', 'Căn hộ và quy tắc nhà chung', 'Apartments and house rules', 'Phần lớn người Thụy Sĩ thuê nhà thay vì mua, và chung cư thường có phòng giặt dùng chung với lịch sử dụng cố định. Quy định về giờ yên tĩnh được tôn trọng rất nghiêm túc.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(3, 2, 10, 12, 'x'); for (let y = 3; y < 13; y += 3) for (const x of [4, 7, 10]) d.r(x, y, 2, 2, 'b'); d.r(7, 12, 2, 2, 'N'); d.p('w', 2, 1, 14, 2); d.r(12, 8, 2, 2, 'y'); d.p('k', 13, 9); }, SC);
add(G, C, 'ch-bunker', 'Hầm trú ẩn', 'Fallout shelter', 'Luật yêu cầu mỗi người dân đều có một chỗ trong hầm trú ẩn, nên nhiều tòa nhà có hầm bê tông bên dưới. Nhiều hầm được dùng làm kho hoặc phòng chứa đồ trong thời bình.',
  d => { d.bg('u'); d.r(0, 0, 16, 5, 'a'); d.r(0, 12, 16, 4, 'A'); d.r(3, 5, 10, 7, 'K'); d.r(4, 6, 8, 5, 'a'); d.e(8, 8, 2.4, 2.4, 'A'); d.p('y', 8, 6, 8, 10, 6, 8, 10, 8); d.p('k', 8, 8); d.r(1, 5, 1, 7, 'k'); d.r(14, 5, 1, 7, 'k'); }, SC);
add(G, C, 'ch-minergie', 'Nhà tiết kiệm năng lượng (Minergie)', 'Energy-saving house (Minergie)', 'Tiêu chuẩn xây nhà cách nhiệt tốt, dùng ít năng lượng, được áp dụng cho nhiều công trình mới. Tấm pin mặt trời trên mái ngày càng phổ biến.',
  d => { d.bg('c'); d.e(13, 2, 1.8, 1.8, 'y'); d.r(0, 13, 16, 3, 'g'); d.r(3, 8, 9, 5, 'w'); d.tri(1, 4, 13, 4, 'a'); d.r(4, 5, 6, 2, 'B'); d.p('b', 5, 5, 7, 5, 9, 5); d.r(5, 9, 2, 2, 'c'); d.r(8, 9, 2, 4, 'n'); d.p('g', 12, 11, 13, 12); }, SC);

// ----- Đồ dùng -----
add(G, E, 'ch-caquelon', 'Nồi fondue (caquelon) và nĩa dài', 'Fondue pot (caquelon) and long forks', 'Nồi đất hoặc gang dùng để đun chảy phô mai, đặt lên bếp nhỏ ở giữa bàn. Mọi người dùng nĩa dài nhúng bánh mì, và có quy tắc vui nếu ai làm rơi bánh.',
  d => { d.bg('e'); d.e(8, 10, 6, 3.4, 'r'); d.r(2, 8, 12, 1, 'R'); d.r(3, 9, 10, 2, 'y'); d.r(4, 13, 8, 1, 'k'); d.p('r', 8, 14); d.l(11, 8, 14, 1, 'a'); d.l(5, 8, 3, 1, 'a'); d.p('t', 14, 1, 3, 1); d.p('Y', 6, 9, 10, 10); }, H);
add(G, E, 'ch-raclettegrill', 'Lò raclette', 'Raclette grill', 'Thiết bị nhỏ để nướng chảy phô mai rồi gạt lên khoai tây luộc. Gia đình thường dùng khi tụ tập vào mùa đông.',
  d => { d.bg('e'); d.r(2, 9, 12, 3, 'd'); d.r(3, 6, 10, 3, 'a'); d.r(4, 5, 8, 1, 'l'); d.r(2, 12, 12, 1, 'k'); d.r(4, 7, 2, 1, 'y'); d.r(8, 7, 3, 1, 'y'); d.p('r', 12, 10); d.e(5, 14, 1.6, 1, 't'); d.e(11, 14, 1.6, 1, 't'); }, H);
add(G, E, 'ch-bigbell', 'Chuông bò lớn', 'Large cowbell', 'Chuông đồng nặng treo cổ bò khi lên núi, mỗi chiếc có âm thanh riêng để người chăn nhận ra đàn của mình. Những chiếc lớn có thể nặng nhiều ký.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 1, 12, 2, 'r'); d.r(3, 3, 1, 3, 'r'); d.r(12, 3, 1, 3, 'r'); d.tri(3, 5, 10, 8, 'Y'); d.r(3, 12, 10, 1, 'y'); d.p('y', 6, 7, 9, 8); d.e(8, 14, 1.6, 1.4, 'N'); }, H);
add(G, E, 'ch-sigg', 'Bình nước Sigg', 'Sigg water bottle', 'Chai nhôm nhẹ có hoa văn sặc sỡ, do hãng Sigg ở Frauenfeld làm từ đầu thế kỷ 20. Nhiều người dùng đi leo núi và đi học.',
  d => { d.bg('e'); d.r(6, 1, 4, 2, 'k'); d.r(7, 3, 2, 1, 'a'); d.r(4, 4, 8, 11, 'r'); d.r(4, 4, 8, 1, 'R'); d.r(5, 7, 6, 2, 'w'); d.p('r', 8, 8); d.r(5, 10, 6, 1, 'y'); d.p('l', 5, 5, 5, 12); }, H);
add(G, E, 'ch-mondaine', 'Đồng hồ nhà ga (Mondaine)', 'Railway station clock (Mondaine)', 'Chiếc đồng hồ trắng tròn có kim giây đỏ hình đĩa, thiết kế cho đường sắt Thụy Sĩ từ thập niên 1940. Nó đã trở thành một biểu tượng thiết kế và được in trên nhiều sản phẩm.',
  d => { d.bg('c'); d.e(8, 8, 7, 7, 'k'); d.e(8, 8, 6, 6, 'w'); for (const [x, y] of [[8, 3], [8, 12], [3, 8], [12, 8]]) d.p('k', x, y); d.l(8, 8, 8, 4, 'k'); d.l(8, 8, 11, 8, 'k'); d.l(8, 8, 5, 11, 'r'); d.e(5, 11, 1, 1, 'r'); }, SC);
add(G, E, 'ch-aromat', 'Gia vị Aromat và bột nêm', 'Aromat seasoning', 'Lọ bột nêm màu vàng xanh có mặt trong rất nhiều bếp gia đình. Nó được dùng để nêm súp, salad và món chiên.',
  d => { d.bg('e'); d.r(5, 1, 6, 2, 'g'); d.r(6, 2, 1, 1, 'k'); d.r(9, 2, 1, 1, 'k'); d.r(4, 3, 8, 12, 'y'); d.r(4, 3, 8, 2, 'G'); d.r(5, 7, 6, 4, 'g'); d.p('y', 7, 8, 9, 9); d.p('Y', 4, 13, 11, 13); }, H);
add(G, E, 'ch-trashbag', 'Túi rác có trả phí', 'Pay-per-bag trash', 'Nhiều nơi bắt người dân mua túi rác chuyên dụng có giá, nên càng thải nhiều thì càng tốn. Cách làm này khuyến khích phân loại và tái chế.',
  d => { d.bg('e'); d.e(8, 10, 5, 5, 'a'); d.r(6, 3, 4, 3, 'A'); d.p('A', 5, 3, 10, 3, 7, 2); d.l(5, 9, 6, 14, 'l'); d.r(6, 9, 4, 3, 'w'); d.p('r', 8, 10); d.p('k', 7, 10, 9, 10); }, H);
add(G, E, 'ch-ga', 'Vé giao thông GA và Halbtax', 'GA and Half-Fare travelcards', 'Thẻ đi tàu xe không giới hạn hoặc nửa giá cho toàn mạng lưới đường sắt, tàu thủy và xe buýt. Giao thông công cộng đúng giờ khiến nhiều người không cần xe riêng.',
  d => { d.bg('r'); d.r(2, 4, 12, 8, 'w'); d.r(2, 4, 12, 2, 'R'); d.r(4, 8, 4, 1, 'k'); d.r(4, 10, 8, 1, 'a'); d.r(10, 7, 3, 3, 'r'); d.r(11, 7, 1, 3, 'w'); d.r(10, 8, 3, 1, 'w'); }, H);
