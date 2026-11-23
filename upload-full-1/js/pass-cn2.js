import { add, SC, setCC, OUTM, M_DRESS, M_KIM, M_TOP, M_HAK } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('cn');
// Trung Quốc · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const rng = (r0, r1, c0, c1, ch) => { const a = []; for (let r = r0; r <= r1; r++) for (let c = c0; c <= c1; c++) a.push([r, c, ch]); return a; };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.hanfu = { map: M_KIM, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#fff3d6', b: '#ffd84d', w: '#ffffff', x: '#8a5a2a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'w'], [12, 8, 'w'], [14, 4, 'T'], [14, 11, 'T'], [16, 4, 'T'], [16, 11, 'T']] };
OUTM.qipao = { map: M_DRESS, pal: { ...base, t: '#c4153a', T: '#ffd84d', u: '#c4153a', b: '#ffd84d', x: '#ffd84d' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [12, 7, 'T'], [12, 8, 'T'], [14, 5, 'T'], [14, 10, 'T'], [16, 4, 'T'], [16, 11, 'T'], [18, 7, 'T'], [18, 8, 'T']] };
OUTM.tangzhuang = { map: M_TOP, pal: { ...base, t: '#d94a2a', T: '#ffd84d', u: '#d94a2a', b: '#ffd84d', p: '#2b2b3a', l: '#2b2b3a', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [12, 7, 'T'], [12, 8, 'T'], [13, 7, 'T'], [13, 8, 'T'], [14, 7, 'T'], [14, 8, 'T']] };
OUTM.zhongshan = { map: M_TOP, pal: { ...base, t: '#5b6b4a', T: '#3d4a30', u: '#5b6b4a', b: '#3d4a30', p: '#5b6b4a', l: '#5b6b4a', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [12, 7, 'T'], [12, 8, 'T'], [13, 4, 'T'], [13, 11, 'T'], [15, 4, 'T'], [15, 11, 'T']] };
OUTM.longpao = { map: M_KIM, pal: { ...base, t: '#ffd84d', T: '#e8452c', u: '#ffd84d', b: '#e8452c', x: '#e8452c' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [12, 6, 'T'], [12, 9, 'T'], [13, 7, 'T'], [13, 8, 'T'], [14, 5, 'T'], [14, 10, 'T'], [16, 5, 'T'], [16, 10, 'T'], [18, 3, 'b'], [18, 12, 'b']] };
OUTM.qungua = { map: M_DRESS, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#e8452c', b: '#ffd84d', x: '#ffd84d' }, patch: [[11, 5, 'T'], [11, 10, 'T'], [12, 7, 'T'], [12, 8, 'T'], [13, 6, 'T'], [13, 9, 'T'], [15, 4, 'T'], [15, 11, 'T'], [16, 7, 'T'], [16, 8, 'T'], [18, 3, 'T'], [18, 12, 'T']] };
OUTM.miao = { map: M_HAK, pal: { ...base, t: '#2a3a6a', T: '#e8452c', u: '#2a3a6a', b: '#e8452c', P: '#c94a8a', p: '#3a4a8a', x: '#e8452c' }, patch: [[11, 6, 'T'], [11, 9, 'T'], [12, 7, 'a'], [12, 8, 'a'], [13, 5, 'a'], [13, 10, 'a'], [11, 7, 'a'], [11, 8, 'a']] };
OUTM.chuba = { map: M_KIM, pal: { ...base, t: '#8a2a2a', T: '#e6c892', u: '#8a2a2a', b: '#ffd84d', x: '#5a3a1a' }, patch: [...rng(11, 12, 7, 8, 'T'), [14, 3, 'T'], [14, 12, 'T']] };
Object.assign(OUT_KEY, { 'cn-hanfu': 'hanfu', 'cn-qipao': 'qipao', 'cn-tangzhuang': 'tangzhuang', 'cn-zhongshan': 'zhongshan', 'cn-longpao': 'longpao', 'cn-qungua': 'qungua', 'cn-miao': 'miao', 'cn-chuba': 'chuba' });
Object.assign(SLOT_OF, { 'cn-hanfu': 'outfit', 'cn-qipao': 'outfit', 'cn-tangzhuang': 'outfit', 'cn-zhongshan': 'outfit', 'cn-longpao': 'outfit', 'cn-qungua': 'outfit', 'cn-miao': 'outfit', 'cn-chuba': 'outfit', 'cn-zan': 'head', 'cn-jade': 'waist', 'cn-pouch': 'waist' });
O['cn-zan'] = { y0: -1, pal: { y: '#ffd84d', r: '#e8452c', h: '#2b1d3a', g: '#2fb5b0' }, rows: ['......hhhh......', '.....hhhhhh.....', '..yyyyyyyyyyyyy.', '...hh....g..hh..', '..........g.....'] };
O['cn-jade'] = { y0: 15, pal: { g: '#5fb85a', G: '#2f7d3a', r: '#e8452c', y: '#ffd84d' }, rows: ['..........ry....', '.........gggg...', '.........gGGg...', '.........gggg...', '..........rr....'] };
O['cn-pouch'] = { y0: 15, pal: { r: '#e8452c', y: '#ffd84d', g: '#5fb85a' }, rows: ['..........g.....', '.........rrr....', '........rrryr...', '........rrrrr...', '.........rrr....'] };

add(G, A, 'cn-hanfu', 'Hán phục', 'Hanfu', 'Tên gọi chung cho y phục truyền thống của người Hán, cổ áo vắt chéo sang phải, tay rộng, thắt đai ngang eo. Vài năm gần đây giới trẻ mặc lại rất nhiều trong lễ hội và khi chụp ảnh ở di tích.', null, { char: ['hanfu'], use: 'wear' });
add(G, A, 'cn-qipao', 'Sườn xám (Qipao)', 'Qipao (cheongsam)', 'Váy ôm dáng, cổ đứng, xẻ tà, bắt nguồn từ áo choàng dài của phụ nữ Mãn và được cách tân ở Thượng Hải vào những năm 1920–1930.', null, { char: ['qipao'], use: 'wear' });
add(G, A, 'cn-tangzhuang', 'Đường trang (Tangzhuang)', 'Tangzhuang', 'Áo cổ đứng cài khuy vải thắt nút, trở nên nổi tiếng khi lãnh đạo các nền kinh tế mặc nó tại hội nghị APEC (Diễn đàn Hợp tác Kinh tế châu Á – Thái Bình Dương) ở Thượng Hải năm 2001.', null, { char: ['tangzhuang'], use: 'wear' });
add(G, A, 'cn-zhongshan', 'Áo Trung Sơn', 'Zhongshan suit', 'Bộ đồ bốn túi, cổ đứng, gắn với tên Tôn Trung Sơn, phổ biến ở Trung Quốc trong nửa đầu thế kỷ 20.', null, { char: ['zhongshan'], use: 'wear' });
add(G, A, 'cn-mamian', 'Mã diện quần', 'Mamian skirt', 'Váy xếp nếp truyền thống của phụ nữ thời Minh, nay được nhiều người mặc lại cùng Hán phục.',
  d => { d.bg('t'); d.r(3, 2, 10, 2, 'b'); d.r(2, 4, 12, 10, 'v'); for (let x = 3; x < 14; x += 2) d.r(x, 4, 1, 10, 'V'); d.r(2, 12, 12, 2, 'y'); for (let x = 3; x < 14; x += 2) d.p('p', x, 13); d.r(6, 3, 4, 1, 'y'); }, SC);
add(G, A, 'cn-longpao', 'Long bào', 'Dragon robe (longpao)', 'Áo của hoàng đế thêu rồng; màu vàng sáng thời Thanh được dành riêng cho hoàng đế.', null, { char: ['longpao'], use: 'wear' });
add(G, A, 'cn-qungua', 'Quần quái (áo cưới)', 'Qungua (wedding set)', 'Bộ áo cưới đỏ thêu rồng phượng của vùng Quảng Đông, màu đỏ tượng trưng cho may mắn và hạnh phúc.', null, { char: ['qungua'], use: 'wear' });
add(G, A, 'cn-miao', 'Trang phục dân tộc Miêu', 'Miao (Hmong) costume', 'Bộ đồ thêu kết hợp trang sức bạc, có khi nặng nhiều ký, mặc trong ngày hội và lễ cưới.', null, { char: ['miao'], use: 'wear' });
add(G, A, 'cn-chuba', 'Chuba (Tạng) và deel (Mông Cổ)', 'Chuba (Tibetan) and deel (Mongolian)', 'Những chiếc áo choàng dài, dày, hợp với khí hậu cao nguyên và thảo nguyên lạnh.', null, { char: ['chuba'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'cn-fan', 'Quạt tròn và quạt xếp', 'Round and folding fans', 'Quạt tròn bằng lụa thường gắn với phụ nữ, còn quạt xếp thường gắn với văn nhân; trên mặt quạt hay có tranh và thơ.',
  d => { d.e(8, 7, 6, 6, 'e'); d.e(8, 7, 5, 5, 'w'); d.p('g', 6, 5, 7, 4, 8, 5, 9, 6, 10, 5); d.l(5, 9, 10, 8, 'G'); d.p('p', 11, 4, 6, 10); d.l(8, 13, 8, 15, 'N'); d.r(7, 13, 2, 1, 'r'); }, { use: 'hold' });
add(G, B, 'cn-jade', 'Ngọc bội', 'Jade pendant', 'Món ngọc đeo bên người, người xưa tin ngọc xua tà và tượng trưng cho đức độ. Có câu "vàng có giá, ngọc vô giá".',
  d => { d.l(8, 0, 8, 3, 'r'); d.e(8, 9, 5.5, 5.5, 'G'); d.e(8, 9, 5, 5, 'g'); d.e(8, 9, 1.8, 1.8, '_'); d.p('h', 5, 7, 6, 6, 10, 11); d.p('G', 8, 14, 3, 9); d.l(8, 14, 8, 15, 'r'); }, { use: 'wear' });
add(G, B, 'cn-zan', 'Trâm cài tóc', 'Hairpin (zan)', 'Trang sức của phụ nữ xưa, làm bằng bạc, ngọc hoặc phỉ thúy, kiểu dáng thể hiện tuổi tác và địa vị.',
  d => { d.l(1, 14, 12, 3, 'Y'); d.l(2, 14, 13, 3, 'y'); d.e(13, 2.5, 2.4, 2.4, 'g'); d.e(13, 2.5, 1, 1, 'G'); d.p('r', 11, 5, 14, 5); d.l(12, 4, 12, 6, 'r'); d.l(1, 13, 0, 15, 'Y'); }, { use: 'wear' });
add(G, B, 'cn-pouch', 'Hà bao (túi thơm)', 'Sachet pouch (hebao)', 'Túi nhỏ thêu hoa văn, đựng thảo mộc thơm, đeo vào Tết Đoan Ngọ để tránh sâu bọ và bệnh tật.',
  d => { d.l(8, 0, 6, 4, 'g'); d.l(8, 0, 10, 4, 'g'); d.e(8, 9, 5, 5, 'r'); d.r(5, 5, 6, 2, 'R'); d.p('y', 8, 8, 6, 10, 10, 10, 8, 12); d.l(6, 14, 5, 16, 'y'); d.l(8, 14, 8, 16, 'y'); d.l(10, 14, 11, 16, 'y'); }, { use: 'wear' });
add(G, B, 'cn-knot', 'Nút thắt Trung Hoa', 'Chinese knot', 'Nút kết bằng dây đỏ, thường treo trong nhà hoặc đeo làm bùa may mắn, mỗi kiểu thắt mang một ý nghĩa tốt lành riêng.',
  d => { d.r(7, 0, 2, 3, 'y'); d.e(8, 7, 4, 4, '_'); for (const [x, y] of [[8, 4], [5, 7], [11, 7], [8, 10]]) d.e(x, y, 2.2, 2.2, 'r'); d.e(8, 7, 1.6, 1.6, 'R'); d.p('R', 8, 4, 5, 7, 11, 7, 8, 10); d.l(6, 11, 5, 15, 'r'); d.l(8, 12, 8, 15, 'r'); d.l(10, 11, 11, 15, 'r'); }, { use: 'hold' });
add(G, B, 'cn-redstring', 'Dây đỏ', 'Red string', 'Dây đỏ đeo ở cổ tay hoặc cổ chân, nhất là vào năm sinh của con giáp bản mệnh, để cầu bình an.',
  d => { d.e(8, 8, 5.5, 5.5, 'r'); d.e(8, 8, 4, 4, '_'); d.e(8, 8, 5.5, 5.5, 'r'); d.e(8, 8, 3.6, 3.6, '_'); d.p('R', 4, 5, 12, 11, 5, 12); d.r(7, 1, 2, 2, 'y'); d.p('y', 8, 14); }, { use: 'hold' });
add(G, B, 'cn-lock', 'Khóa trường mệnh', 'Longevity lock', 'Chiếc khóa nhỏ bằng bạc đeo cho trẻ sơ sinh, gửi gắm mong ước khóa chặt tuổi thọ cho em bé.',
  d => { d.e(8, 5, 3.4, 3.4, '_'); d.l(5, 6, 5, 1, 'a'); d.l(11, 6, 11, 1, 'a'); d.r(5, 0, 7, 1, 'a'); d.r(3, 7, 10, 7, 'l'); d.r(3, 7, 10, 1, 'w'); d.r(3, 13, 10, 1, 'a'); d.p('A', 8, 9, 7, 10, 9, 10, 8, 11, 5, 11, 11, 11); d.p('r', 8, 14, 6, 15, 10, 15); }, { use: 'hold' });
add(G, B, 'cn-umbrella', 'Dù giấy dầu', 'Oil-paper umbrella', 'Ô tre phết dầu, vẽ hoa, gắn với hình ảnh cô gái ven sông nước Giang Nam.',
  d => { d.fan(8, 9, 8, 'r'); d.fan(8, 9, 5, 'y'); d.fan(8, 9, 2.4, 'r'); d.l(8, 3, 8, 14, 'N'); d.l(8, 14, 6, 15, 'N'); d.p('p', 3, 7, 13, 7, 8, 5); d.p('w', 5, 5, 11, 5); }, { use: 'hold' });

// ----- Nhà ở -----
add(G, C, 'cn-siheyuan', 'Tứ hợp viện', 'Siheyuan courtyard house', 'Ngôi nhà bốn phía bao quanh một sân vuông ở giữa, kiểu nhà phổ biến của người dân Bắc Kinh, nằm dọc các con hẻm hutong.',
  d => { d.bg('c'); d.r(0, 0, 16, 16, 'a'); d.r(2, 2, 12, 2, 'k'); d.r(2, 12, 12, 2, 'k'); d.r(2, 2, 2, 12, 'k'); d.r(12, 2, 2, 12, 'k'); d.r(4, 4, 8, 8, 't'); d.r(5, 5, 6, 6, 'W'); d.p('r', 7, 3, 8, 3, 7, 12, 8, 12, 3, 7, 3, 8, 12, 7, 12, 8); d.e(8, 8, 1.4, 1.4, 'g'); d.r(7, 10, 2, 1, 'N'); }, SC);
add(G, C, 'cn-tulou', 'Thổ lâu (Phúc Kiến)', 'Tulou (Fujian)', 'Những tòa nhà tròn hoặc vuông bằng đất nện của người Khách Gia (Hakka) ở Phúc Kiến, có thể chứa cả một dòng họ, đã được UNESCO công nhận năm 2008.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.e(8, 10, 7, 4, 'n'); d.r(1, 7, 14, 6, 'n'); d.e(8, 7, 7, 3, 'O'); d.e(8, 7, 5, 2, 'N'); d.e(8, 7, 3.4, 1.4, 'n'); d.r(7, 10, 2, 3, 'k'); for (let x = 2; x < 14; x += 2) d.p('k', x, 9); d.p('y', 4, 11, 12, 11); }, SC);
add(G, C, 'cn-yaodong', 'Diêu động (Yaodong)', 'Yaodong cave dwelling', 'Nhà đào vào vách đất vàng trên cao nguyên Hoàng Thổ, mùa đông ấm, mùa hè mát.',
  d => { d.bg('c'); d.r(0, 3, 16, 13, 'O'); d.r(0, 3, 16, 1, 'g'); for (const x of [1, 6, 11]) { d.r(x, 8, 4, 8, 'k'); d.e(x + 2, 8, 2, 2, 'k'); d.r(x + 1, 9, 2, 3, 'u'); } d.p('Y', 2, 5, 9, 6, 14, 4); }, SC);
add(G, C, 'cn-huizhou', 'Nhà cổ Huy Châu', 'Huizhou ancient houses', 'Tường trắng, ngói đen, đầu hồi cao như đầu ngựa, trải trên những ngôi làng cổ ở An Huy.',
  d => { d.bg('c'); d.r(1, 5, 6, 8, 'w'); d.r(5, 3, 1, 3, 'w'); d.r(1, 4, 5, 1, 'k'); d.r(9, 6, 6, 7, 'w'); d.r(9, 4, 1, 3, 'w'); d.r(9, 5, 6, 1, 'k'); d.r(3, 9, 2, 4, 'k'); d.r(11, 9, 2, 4, 'k'); d.r(0, 13, 16, 3, 'C'); d.p('a', 2, 7, 12, 8); d.p('w', 4, 14, 10, 15); }, SC);
add(G, C, 'cn-kang', 'Giường đất (Kang)', 'Kang (heated brick bed)', 'Bệ gạch xây liền với bếp, khói nóng chạy bên dưới để sưởi ấm cả nhà, phổ biến ở miền Bắc lạnh.',
  d => { d.r(0, 8, 16, 6, 'A'); d.r(0, 8, 16, 1, 'a'); d.r(1, 5, 14, 3, 'r'); d.r(1, 5, 14, 1, 'R'); d.r(2, 4, 4, 2, 'e'); d.r(0, 14, 5, 2, 'k'); d.e(2, 14, 1.4, 1, 'o'); d.l(11, 11, 13, 11, 'o'); d.p('x', 4, 2, 5, 0, 12, 2, 11, 0); d.r(6, 11, 4, 3, 'N'); }, SC);
add(G, C, 'cn-yurt', 'Lều yurt', 'Yurt (ger)', 'Lều dạ tròn của người Mông Cổ, dễ tháo dựng và dời đi theo đàn gia súc.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 8, 12, 5, 'w'); d.tri(1, 3, 14, 5, 'e'); d.p('b', 1, 8, 14, 8); d.r(2, 8, 12, 1, 'b'); d.r(7, 9, 3, 4, 'r'); d.p('y', 8, 10); d.p('a', 8, 2); d.r(8, 0, 1, 3, 'a'); }, SC);

// ----- Đồ dùng -----
add(G, E, 'cn-chopsticks', 'Đũa (Kuaizi)', 'Chopsticks (kuaizi)', 'Dụng cụ ăn uống chính của người Trung Quốc từ hơn 3.000 năm trước, được sử dụng cả trong nấu ăn lẫn bày biện món ăn.',
  d => { d.l(2, 15, 12, 1, 'N'); d.l(3, 15, 13, 1, 'n'); d.l(5, 15, 15, 2, 'N'); d.l(6, 15, 16, 2, 'n'); d.p('r', 12, 2, 13, 1, 14, 3, 15, 2); d.r(7, 11, 5, 1, 'w'); }, { use: 'hold' });
add(G, E, 'cn-fourtreasures', 'Văn phòng tứ bảo', 'Four Treasures of the Study', 'Bốn món của người đọc sách là bút lông, mực, giấy và nghiên mực, gắn với nghệ thuật thư pháp.',
  d => { d.r(1, 8, 8, 6, 'd'); d.r(1, 8, 8, 1, 'K'); d.e(4, 11, 2.4, 1.6, 'k'); d.r(10, 9, 5, 5, 'e'); d.r(10, 9, 5, 1, 'u'); d.p('k', 11, 11, 13, 12); d.l(5, 7, 12, 1, 'N'); d.l(12, 1, 13, 0, 'k'); d.r(3, 14, 6, 2, 'r'); }, { use: 'hold' });
add(G, E, 'cn-yixing', 'Ấm tử sa Nghi Hưng', 'Yixing clay teapot', 'Ấm nặn từ đất sét tím vùng Nghi Hưng, được dân sành trà chuộng vì giữ hương trà và ngày càng lên nước bóng khi dùng lâu.',
  d => { d.e(7, 10, 5, 4, 'V'); d.e(7, 9.5, 4, 3, 'v'); d.r(5, 5, 4, 2, 'V'); d.p('v', 7, 4); d.l(12, 8, 15, 6, 'V'); d.l(12, 9, 15, 7, 'V'); d.l(2, 8, 0, 10, 'V'); d.l(0, 10, 3, 12, 'V'); d.r(4, 14, 6, 1, 'V'); d.p('P', 6, 8); }, { use: 'hold' });
add(G, E, 'cn-porcelain', 'Đồ sứ Cảnh Đức Trấn', 'Jingdezhen porcelain', 'Thị trấn ở Giang Tây được gọi là "cố đô của sứ", sản xuất gốm sứ đã hơn một nghìn năm; tiếng Anh gọi sứ là "china" cũng từ đây mà ra.',
  d => { d.e(8, 9, 5.6, 5.6, 'w'); d.r(5, 2, 6, 3, 'w'); d.r(4, 14, 8, 1, 'w'); d.r(5, 2, 6, 1, 'b'); d.r(4, 14, 8, 1, 'b'); d.p('b', 6, 7, 7, 6, 8, 8, 9, 6, 10, 7, 6, 10, 8, 11, 10, 10, 7, 12, 9, 12); d.r(5, 5, 6, 1, 'l'); }, { use: 'hold' });
add(G, E, 'cn-abacus', 'Bàn tính (Suanpan)', 'Abacus (suanpan)', 'Khung gỗ gắn hạt trượt trên thanh, dùng để tính toán nhanh trong buôn bán hàng nghìn năm.',
  d => { d.r(1, 2, 14, 12, 'N'); d.r(2, 3, 12, 10, 'e'); d.r(2, 7, 12, 1, 'N'); for (let x = 3; x < 14; x += 2) { d.l(x, 3, x, 12, 'n'); d.p('r', x, 5, x, 6); d.p('r', x, 9 + (x % 3), x, 10 + (x % 3)); } }, { use: 'hold' });
add(G, E, 'cn-lantern', 'Đèn lồng đỏ', 'Red lantern', 'Treo trước cửa nhà và trên phố vào dịp Tết và lễ hội để cầu may mắn.',
  d => { d.r(7, 0, 2, 2, 'y'); d.e(8, 8, 6, 5, 'r'); d.e(8, 8, 3, 5, 'R'); d.e(8, 8, 1, 5, 'r'); d.r(5, 3, 6, 1, 'y'); d.r(5, 13, 6, 1, 'y'); d.l(6, 14, 5, 16, 'y'); d.l(8, 14, 8, 16, 'y'); d.l(10, 14, 11, 16, 'y'); d.p('o', 3, 6); }, { use: 'hold' });
add(G, E, 'cn-fu', 'Chữ Phúc dán ngược', 'Upside-down Fu character', 'Người ta dán chữ Phúc (福) ngược trên cửa vì "ngược" (dao) đọc gần giống "đến" (dao), nghĩa là phúc đến.',
  d => { d.r(8, 0, 1, 1, '_'); d.tri(2, 1, 12, 14, 'r'); d.dtri(2, 1, 12, 14, 'r'); d.r(2, 1, 12, 14, 'r'); d.r(2, 1, 12, 1, 'R'); d.l(4, 12, 11, 12, 'y'); d.l(4, 4, 11, 4, 'y'); d.l(5, 4, 5, 12, 'y'); d.l(10, 4, 10, 12, 'y'); d.l(5, 8, 10, 8, 'y'); }, { use: 'hold' });
