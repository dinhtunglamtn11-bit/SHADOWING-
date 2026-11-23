import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM, M_HAK } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('ly');
// Libya · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const sand = d => { d.bg('c'); d.r(0, 11, 16, 5, 'u'); d.e(13, 3, 2, 2, 'y'); };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.lyjard = { map: M_DRESS, pal: { ...base, t: '#f0e6d0', T: '#c9a227', u: '#f0e6d0', b: '#d8c8a8', x: '#d8c8a8' }, patch: [[11, 4, 'T'], [11, 11, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.lyfarmla = { map: M_TOP, pal: { ...base, t: '#8a1f2a', T: '#ffd84d', u: '#f5ecd0', b: '#f5ecd0', p: '#f5ecd0', l: '#f5ecd0', x: '#5a3a1a' }, patch: [[10, 5, 'T'], [10, 10, 'T'], [11, 6, 'T'], [11, 9, 'T'], [12, 7, 'T'], [12, 8, 'T']] };
OUTM.lyjalabiya = { map: M_DRESS, pal: { ...base, t: '#f5f0e6', T: '#bfae8a', u: '#f5f0e6', b: '#e0d6bc', x: '#e0d6bc' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [13, 7, 'T'], [13, 8, 'T']] };
OUTM.lytuareg = { map: M_KIM, pal: { ...base, t: '#2a3f8a', T: '#5a7ad0', u: '#2a3f8a', b: '#1a2a6a', x: '#5a3a1a' }, patch: [[11, 4, 'T'], [11, 11, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 4, 'T'], [15, 11, 'T'], [17, 3, 'T'], [17, 12, 'T']] };
OUTM.lyberber = { map: M_DRESS, pal: { ...base, t: '#d6302a', T: '#2a8ad0', u: '#d6302a', b: '#2a8ad0', x: '#ffd84d' }, patch: [[11, 4, 'y'], [11, 6, 'T'], [11, 9, 'T'], [11, 11, 'y'], [13, 5, 'y'], [13, 10, 'y'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.lyabaya = { map: M_DRESS, pal: { ...base, t: '#1f1f2e', T: '#c9a227', u: '#1f1f2e', b: '#2a2a3a', x: '#2a2a3a' }, patch: [[11, 5, 'T'], [11, 10, 'T'], [13, 7, 'T'], [13, 8, 'T']] };
OUTM.lywedding = { map: M_HAK, pal: { ...base, t: '#f2f2f2', T: '#ffd84d', u: '#f2f2f2', b: '#e8c0d8', p: '#e8c0d8', x: '#ffd84d' }, patch: [[11, 4, 'T'], [11, 11, 'T'], [13, 5, 'T'], [13, 8, 'T'], [13, 10, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
Object.assign(OUT_KEY, { 'ly-jard': 'lyjard', 'ly-farmla': 'lyfarmla', 'ly-jalabiya': 'lyjalabiya', 'ly-tuareg': 'lytuareg', 'ly-berber': 'lyberber', 'ly-abaya': 'lyabaya', 'ly-wedding': 'lywedding' });
Object.assign(SLOT_OF, { 'ly-jard': 'outfit', 'ly-farmla': 'outfit', 'ly-jalabiya': 'outfit', 'ly-tuareg': 'outfit', 'ly-berber': 'outfit', 'ly-abaya': 'outfit', 'ly-wedding': 'outfit', 'ly-tagelmust': 'head', 'ly-chechia': 'head' });
O['ly-tagelmust'] = { y0: -1, pal: { b: '#2a3f8a', B: '#1a2a6a', c: '#5a7ad0' }, rows: ['....bbbbbbbb....', '...bbcbbbbcbb...', '..bbbbbbbbbbbb..', '..BBBBBBBBBBBB..'] };
O['ly-chechia'] = { y0: -1, pal: { r: '#c9302a', R: '#8a1f2a', k: '#1b1b2a' }, rows: ['......kkkk......', '....rrrrrrrr....', '...rrrrrrrrrr...', '...RRRRRRRRRR...'] };

add(G, A, 'ly-jard', 'Jard (jard Libya)', 'Jard (Libyan wrap)', 'Tấm vải len hoặc bông dài được quấn quanh người, vừa là áo choàng vừa là khăn trùm. Phụ nữ lớn tuổi ở Tripoli và Cyrenaica thường mặc khi ra ngoài, còn nhiều người trẻ chỉ dùng trong dịp đặc biệt.', null, { char: ['lyjard'], use: 'wear' });
add(G, A, 'ly-farmla', 'Farmla và áo dài truyền thống của nam giới', 'Farmla and men\'s traditional robes', 'Áo choàng ngắn không tay thêu chỉ vàng, thường mặc bên ngoài áo dài. Đây là trang phục dịp lễ và đám cưới, đặc biệt ở Tripolitania.', null, { char: ['lyfarmla'], use: 'wear' });
add(G, A, 'ly-jalabiya', 'Jalabiya và thób', 'Jalabiya and thobe', 'Áo dài rộng của nam giới, dễ chịu khi trời nóng. Nhiều người mặc khi đi làm hoặc đến nhà thờ Hồi giáo vào thứ Sáu.', null, { char: ['lyjalabiya'], use: 'wear' });
add(G, A, 'ly-tuareg', 'Bộ đồ chàm của người Tuareg', 'Tuareg indigo clothing', 'Áo chàm rộng màu xanh cùng khăn đội đầu dài (tagelmust) quấn quanh đầu và mặt. Khăn bảo vệ khỏi nắng và cát, và màu chàm có thể để lại vệt xanh trên da, dẫn đến tên gọi "người xanh".', null, { char: ['lytuareg'], use: 'wear' });
add(G, A, 'ly-berber', 'Trang phục Berber ở Nafusa và Ghadames', 'Berber costumes of Nafusa and Ghadames', 'Phụ nữ mặc áo dài sặc sỡ, thường màu đỏ và xanh, kết hợp với khăn trùm đầu có thêu và trang sức bạc. Phụ nữ Ghadames nổi tiếng với những chiếc mũ và áo chân nhiều màu rực rỡ.', null, { char: ['lyberber'], use: 'wear' });
add(G, A, 'ly-abaya', 'Hijab và abaya hiện đại', 'Modern hijab and abaya', 'Phụ nữ đô thị phổ biến mặc abaya hoặc áo dài kết hợp khăn trùm đầu. Kiểu dáng và màu sắc ngày càng đa dạng theo thời trang.', null, { char: ['lyabaya'], use: 'wear' });
add(G, A, 'ly-wedding', 'Trang phục đám cưới', 'Wedding dress', 'Cô dâu được trang điểm cầu kỳ, mặc áo dài thêu chỉ vàng và đeo nhiều trang sức. Nhiều gia đình giữ bộ áo cưới truyền thống như bảo vật.', null, { char: ['lywedding'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'ly-tagelmust', 'Khăn tagelmust và chiffon quấn đầu', 'Tagelmust and chiffon head wraps', 'Vải dài có thể tới vài mét, quấn nhiều vòng quanh đầu. Cách quấn và màu sắc có thể cho biết nhóm người của người đội.',
  d => { d.bg('e'); d.e(8, 8, 5.4, 6, 'b'); d.e(8, 8, 3.6, 4.4, 'B'); d.p('c', 4, 5, 12, 6, 5, 10, 11, 11); d.r(6, 7, 4, 2, 's'); d.p('k', 7, 7, 9, 7); d.l(2, 12, 14, 12, 'b'); }, { use: 'wear' });
add(G, B, 'ly-chechia', 'Mũ chechia (tarbush)', 'Chechia (tarbush) hat', 'Chiếc mũ đỏ không vành, giống mũ fez, trước đây phổ biến ở đô thị. Ngày nay ít thấy hơn nhưng vẫn xuất hiện trong lễ hội.',
  d => { d.bg('e'); d.tri(3, 3, 10, 10, 'r'); d.r(3, 11, 10, 2, 'R'); d.l(8, 3, 8, 1, 'k'); d.p('k', 7, 1, 9, 1, 9, 2); d.p('R', 5, 8, 10, 7); }, { use: 'wear' });
add(G, B, 'ly-khamsa', 'Trang sức bạc Berber (khamsa, fibula)', 'Berber silver jewelry (khamsa, fibula)', 'Vòng cổ, vòng tay và kim cài bằng bạc, thường có hình bàn tay Khamsa (bàn tay năm ngón) để cầu may mắn. Phụ nữ Berber coi trang sức là tài sản của riêng mình.',
  d => { d.bg('e'); d.r(5, 7, 6, 7, 'a'); for (const x of [5, 7, 9, 11]) d.r(x - (x === 11 ? 1 : 0), 3 + (x === 7 || x === 9 ? 0 : 1), 1, 4, 'a'); d.r(3, 9, 2, 3, 'a'); d.e(8, 10, 1.4, 1.4, 'b'); d.p('c', 8, 10); d.p('l', 6, 8, 10, 8); d.p('A', 5, 13, 10, 13); }, H);
add(G, B, 'ly-beads', 'Vòng cổ và bùa địa phương', 'Necklaces and local amulets', 'Hạt đá, hổ phách và san hô được xâu thành chuỗi. Nhiều món có nguồn gốc từ các tuyến thương mại xuyên Sahara.',
  d => { d.bg('e'); for (let i = 0; i < 12; i++) { const a = 0.4 + i * 0.2; d.e(8 + Math.cos(a * 2.2 + 1.6) * 5.4, 4 + Math.sin(a * 2.2 + 1.6) * 6, 1.1, 1.1, ['r', 'o', 'b', 'y', 'g', 'R'][i % 6]); } d.e(8, 12, 1.6, 1.6, 'o'); d.e(8, 12, 0.8, 0.8, 'O'); }, H);
add(G, B, 'ly-babouche', 'Giày da babouche', 'Babouche leather slippers', 'Giày da mềm không gót, thường có đầu nhọn, làm thủ công ở các chợ Medina. Chúng dễ xỏ và tháo khi vào nhà hay nhà thờ.',
  d => { d.bg('e'); d.e(8, 9, 6, 3.4, 'o'); d.r(2, 9, 12, 3, 'O'); d.tri(11, 6, 5, 5, 'o'); d.r(4, 6, 6, 3, 'o'); d.p('y', 5, 7, 9, 7, 13, 9); d.r(2, 12, 12, 1, 'N'); }, H);
add(G, B, 'ly-henna', 'Henna trên tay và chân', 'Henna on hands and feet', 'Phụ nữ vẽ henna trước đám cưới và các ngày lễ. Hình vẽ thường là hoa và hình học, được tin mang lại may mắn.',
  d => { d.bg('e'); d.e(8, 9, 5, 5.4, 's'); for (const x of [4, 6, 8, 10]) d.r(x, 2, 1, 4, 's'); d.r(11, 6, 2, 2, 's'); d.p('N', 8, 8, 8, 10, 6, 9, 10, 9, 8, 12, 5, 7, 11, 7); d.p('O', 7, 8, 9, 8, 7, 10, 9, 10); }, H);
add(G, B, 'ly-takoba', 'Dao và kiếm Tuareg (takoba)', 'Tuareg daggers and swords (takoba)', 'Kiếm thẳng hai lưỡi và dao nhỏ để săn bắn và nghi lễ. Ngày nay chủ yếu là biểu tượng văn hóa.',
  d => { d.bg('e'); d.l(3, 13, 12, 2, 'a'); d.l(4, 13, 13, 2, 'l'); d.r(2, 12, 4, 1, 'Y'); d.l(2, 14, 4, 12, 'n'); d.p('r', 2, 15, 3, 14); d.p('y', 3, 12); }, H);

// ----- Nhà ở -----
add(G, C, 'ly-medinahouse', 'Nhà sân trong kiểu Medina', 'Medina courtyard house', 'Nhà xây quanh một sân giữa, có tường cao chắn người ngoài nhìn vào. Sân trong giúp lấy ánh sáng và thông gió tự nhiên.',
  d => { d.bg('c'); d.r(1, 2, 14, 13, 'w'); d.r(4, 5, 8, 7, 'u'); d.r(5, 6, 6, 5, 'y'); d.r(1, 2, 14, 1, 'W'); d.r(1, 14, 14, 1, 'W'); d.p('k', 2, 5, 13, 5, 2, 10, 13, 10); d.e(8, 8, 1.4, 1.4, 'C'); d.p('G', 6, 7); d.p('w', 7, 8, 9, 8); d.r(7, 12, 2, 2, 'N'); }, SC);
add(G, C, 'ly-ghadameshouse', 'Nhà bùn Ghadames', 'Ghadames mud house', 'Ngôi nhà nhiều tầng xây bằng bùn, đá vôi và thân cọ, mái bằng dùng làm nơi sinh hoạt của phụ nữ. Tầng dưới mát, còn mái là lối đi riêng giúp phụ nữ đi lại giữa các nhà.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(3, 3, 10, 10, 'w'); d.r(3, 3, 10, 1, 'W'); d.r(3, 7, 10, 1, 'W'); d.r(4, 9, 2, 4, 'k'); d.p('k', 9, 5, 11, 5, 9, 10, 11, 10); d.p('r', 4, 2, 8, 2, 12, 2); d.p('R', 6, 2, 10, 2); d.p('W', 3, 2, 13, 2); d.l(0, 14, 15, 14, 'y'); }, SC);
add(G, C, 'ly-gharyan', 'Nhà hang động ở Gharyan', 'Gharyan cave houses', 'Nhà đào sâu dưới đất, quanh một hố tròn ở miền núi Nafusa. Kiểu nhà này giữ mát mùa hè và ấm mùa đông.',
  d => { d.bg('u'); d.r(0, 0, 16, 16, 'u'); d.e(8, 8, 6.4, 6.4, 'O'); d.e(8, 8, 5, 5, 'y'); d.e(8, 8, 3.6, 3.6, 'u'); d.r(1, 7, 3, 3, 'k'); d.r(12, 7, 3, 3, 'k'); d.r(6, 12, 4, 3, 'k'); d.p('N', 7, 7, 9, 9); d.p('G', 8, 8); }, SC);
add(G, C, 'ly-tent', 'Lều lông dê của người du mục', 'Nomad goat-hair tent', 'Lều dệt từ lông dê hoặc lông cừu màu tối, có thể tháo dỡ nhanh khi di chuyển. Lều có phần dành riêng cho khách.',
  d => { sand(d); d.tri(1, 5, 14, 7, 'N'); d.tri(4, 6, 8, 6, 'K'); d.r(6, 9, 4, 3, 'k'); d.l(1, 11, 0, 13, 'n'); d.l(14, 11, 15, 13, 'n'); d.p('r', 3, 12, 12, 12); d.p('w', 8, 4); }, SC);
add(G, C, 'ly-italian', 'Nhà ngói đỏ kiểu Ý', 'Italian red-tile houses', 'Những khu nhà thời thống trị của Ý (1911–1943) ở Tripoli và Benghazi có ban công và mái ngói. Ngày nay chúng là một phần di sản đô thị.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 6, 12, 8, 'x'); d.tri(1, 2, 14, 4, 'r'); d.r(4, 8, 2, 3, 'B'); d.r(10, 8, 2, 3, 'B'); d.r(3, 11, 4, 1, 'k'); d.r(9, 11, 4, 1, 'k'); d.r(7, 10, 2, 4, 'N'); }, SC);
add(G, C, 'ly-extended', 'Nhà gia đình mở rộng', 'Extended-family home', 'Nhiều gia đình cùng sống quanh một sân chung, có thêm phòng cho khách. Phòng tiếp khách thường được giữ sạch đẹp nhất.',
  d => { d.bg('u'); d.r(1, 3, 14, 11, 'e'); d.r(2, 4, 12, 9, 'y'); d.r(3, 5, 4, 3, 'r'); d.r(9, 5, 4, 3, 'b'); d.e(5, 11, 1.2, 1.2, 's'); d.e(8, 11, 1.2, 1.2, 's'); d.e(11, 11, 1.2, 1.2, 's'); d.r(4, 12, 2, 1, 'g'); d.r(7, 12, 2, 1, 'o'); d.r(10, 12, 2, 1, 'p'); }, SC);
add(G, C, 'ly-apartment', 'Nhà chung cư hiện đại', 'Modern apartment blocks', 'Ở thành phố, nhiều người sống trong nhà bê tông nhiều tầng. Nhiều nhà dùng bồn chứa nước trên mái.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(2, 3, 12, 11, 'W'); for (let y = 5; y < 13; y += 3) for (const x of [3, 6, 9, 12]) d.r(x, y, 2, 2, 'b'); d.r(10, 1, 3, 2, 'k'); d.r(11, 0, 1, 1, 'k'); d.r(7, 12, 2, 2, 'N'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'ly-teaset', 'Bộ ấm trà (barrad và ly nhỏ)', 'Tea set (barrad and small glasses)', 'Ấm đồng hoặc inox để pha trà, cùng những chiếc ly nhỏ. Việc pha trà lâu và chia ly là một phần của việc tiếp khách.',
  d => { d.bg('e'); d.e(6, 9, 4, 3.4, 'a'); d.r(4, 5, 4, 2, 'l'); d.l(9, 8, 14, 5, 'a'); d.l(2, 7, 2, 11, 'A'); d.r(10, 11, 2, 3, 'c'); d.r(13, 11, 2, 3, 'c'); d.r(10, 11, 2, 1, 'o'); d.r(13, 11, 2, 1, 'o'); d.p('A', 5, 4); }, H);
add(G, E, 'ly-ewer', 'Bộ đồ đồng rửa tay', 'Copper hand-washing set', 'Ấm và chậu đồng để rửa tay trước và sau bữa ăn. Nhiều gia đình dùng khi có khách.',
  d => { d.bg('e'); d.e(5, 7, 3, 3.6, 'O'); d.r(4, 2, 2, 2, 'o'); d.l(8, 6, 11, 5, 'O'); d.l(2, 6, 1, 9, 'O'); d.e(11, 12, 5, 2, 'o'); d.e(11, 11, 4, 1, 'c'); d.p('y', 4, 6, 10, 13); }, H);
add(G, E, 'ly-rugs', 'Thảm và chiếu dệt tay', 'Hand-woven rugs and mats', 'Thảm len có hoa văn hình học và chiếu từ lá cọ. Thảm ở miền núi và bộ lạc thường do phụ nữ dệt.',
  d => { d.bg('e'); d.r(2, 2, 12, 12, 'r'); d.r(3, 3, 10, 10, 'R'); d.r(5, 5, 6, 6, 'y'); d.r(6, 6, 4, 4, 'b'); d.p('w', 8, 8, 3, 3, 12, 3, 3, 12, 12, 12); d.p('k', 2, 14, 13, 14); }, SC);
add(G, E, 'ly-basket', 'Giỏ cọ và gốm', 'Palm baskets and pottery', 'Giỏ đan từ lá cọ và đồ gốm dùng để đựng thức ăn. Nhiều cái có hoa văn sặc sỡ.',
  d => { d.bg('e'); d.e(5, 10, 4, 3.4, 'n'); d.r(2, 6, 6, 2, 'N'); d.p('r', 3, 9, 6, 11); d.p('y', 4, 8, 7, 10); d.e(12, 9, 3, 4, 'O'); d.r(10, 4, 4, 2, 'O'); d.p('k', 10, 8, 14, 8, 12, 11); d.p('y', 11, 10, 13, 10); }, SC);
add(G, E, 'ly-qirba', 'Bình da dê đựng nước (qirba)', 'Goatskin water bag (qirba)', 'Túi da để giữ nước mát khi đi đường dài trong sa mạc. Da thấm hơi nước nên nước bên trong luôn mát hơn.',
  d => { d.bg('e'); d.e(8, 9, 4.4, 5, 'n'); d.r(7, 2, 2, 3, 'N'); d.p('N', 6, 4, 9, 4); d.l(4, 5, 2, 9, 'N'); d.l(12, 5, 14, 9, 'N'); d.p('O', 6, 8, 10, 9, 8, 12); d.p('c', 8, 14, 8, 15); }, H);
add(G, E, 'ly-claypot', 'Lò nướng và đồ nấu bằng đất', 'Clay oven and cooking pots', 'Nồi đất nấu món hầm và lò đất nướng bánh mì. Một số nhà ở vùng nông thôn vẫn dùng.',
  d => { d.bg('e'); d.e(5, 11, 4, 3.6, 'O'); d.r(3, 6, 4, 2, 'o'); d.tri(9, 5, 6, 8, 'n'); d.r(9, 12, 6, 2, 'N'); d.e(12, 10, 1.4, 1.4, 'k'); d.p('r', 12, 11); d.p('y', 4, 10, 6, 12); d.p('w', 5, 3, 12, 3); }, SC);
add(G, E, 'ly-door', 'Khóa gỗ và cửa chạm khắc', 'Wooden locks and carved doors', 'Cửa gỗ nặng có chạm khắc hoa văn Ả Rập và Berber. Cửa là nơi gia chủ thể hiện sự hiếu khách.',
  d => { d.bg('w'); d.r(3, 2, 10, 13, 'n'); d.e(8, 3, 5, 3, 'n'); d.r(4, 4, 8, 10, 'N'); d.l(8, 3, 8, 14, 'n'); d.e(6, 8, 1.4, 1.4, 'Y'); d.e(10, 8, 1.4, 1.4, 'Y'); d.p('y', 5, 5, 11, 5, 5, 12, 11, 12); d.p('k', 6, 8, 10, 8); }, SC);
