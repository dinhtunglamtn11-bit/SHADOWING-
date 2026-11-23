import { add, SC, setCC, OUTM, M_DRESS, M_TOP, M_KIM } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('au');
// Úc · Nhóm 2: Con người và đời sống
const G = 2, A = 'Trang phục', B = 'Phụ kiện', C = 'Nhà ở', E = 'Đồ dùng';
const H = { use: 'hold' };
const red = d => { d.bg('c'); d.r(0, 11, 16, 5, 'O'); d.e(13, 3, 2, 2, 'y'); };
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#f5f5f5' };

// ----- Trang phục: mặc được lên Lame -----
OUTM.authongs = { map: M_TOP, pal: { ...base, t: '#f5f5f5', T: '#e8452c', u: '#f5f5f5', b: '#2a7ad0', p: '#2a7ad0', l: '#ffd5b5', x: '#e8a02c' }, patch: [[11, 5, 'T'], [11, 10, 'T'], [13, 6, 'T']] };
OUTM.audriza = { map: M_DRESS, pal: { ...base, t: '#7a5a32', T: '#5a3a1a', u: '#7a5a32', b: '#5a3a1a', x: '#3a2410' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [13, 7, 'T'], [13, 8, 'T'], [15, 7, 'T'], [15, 8, 'T']] };
OUTM.aulife = { map: M_TOP, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#e8452c', b: '#ffd84d', p: '#e8452c', l: '#ffd5b5', x: '#ffd84d' }, patch: [[10, 5, 'T'], [10, 6, 'T'], [10, 9, 'T'], [10, 10, 'T'], [12, 4, 'T'], [12, 11, 'T']] };
OUTM.aopaint = { map: M_KIM, pal: { ...base, t: '#8a3a1a', T: '#f5ecd0', u: '#8a3a1a', b: '#c9a227', x: '#8a5a2a' }, patch: [[11, 5, 'T'], [11, 7, 'T'], [11, 9, 'T'], [11, 10, 'T'], [13, 4, 'T'], [13, 6, 'T'], [13, 9, 'T'], [15, 5, 'T'], [15, 10, 'T'], [17, 4, 'T'], [17, 11, 'T']] };
OUTM.auanzac = { map: M_TOP, pal: { ...base, t: '#4a5a3a', T: '#ffd84d', u: '#4a5a3a', b: '#3a4a2a', p: '#3a4a2a', l: '#3a3a2a', x: '#3a2a1a' }, patch: [[11, 4, 'T'], [11, 5, 'r'], [11, 6, 'b'], [12, 5, 'T']] };
Object.assign(OUT_KEY, { 'au-thongs': 'authongs', 'au-driza': 'audriza', 'au-lifesaver': 'aulife', 'au-bodypaint': 'aopaint', 'au-anzacdress': 'auanzac' });
Object.assign(SLOT_OF, { 'au-thongs': 'outfit', 'au-driza': 'outfit', 'au-lifesaver': 'outfit', 'au-bodypaint': 'outfit', 'au-anzacdress': 'outfit', 'au-akubra': 'head', 'au-flynet': 'head' });
O['au-akubra'] = { y0: -1, pal: { n: '#a8784a', N: '#6a4a2a', k: '#2b1d3a' }, rows: ['......nnnn......', '.....nnnnnn.....', '....nnnnnnnn....', 'nnnnnnnnnnnnnnnn', '..NNNNNNNNNNNN..'] };
O['au-flynet'] = { y0: 0, pal: { w: '#e4dccb', k: '#5a5a5a', b: '#8a5a2a' }, rows: ['...bbbbbbbbbb...', '..wkwkwkwkwkwk..', '..kwkwkwkwkwkw..', '..wk........kw..'] };

add(G, A, 'au-thongs', 'Thongs, singlet và đồ đi biển', 'Thongs, singlet and beachwear', 'Dép xỏ ngón (gọi là thongs), áo ba lỗ và quần short là bộ đồ hằng ngày mùa hè. Nhiều người đi dép ra cửa hàng hoặc đi làm ở vùng biển.', null, { char: ['authongs'], use: 'wear' });
add(G, A, 'au-driza', 'Áo khoác Driza-Bone', 'Driza-Bone coat', 'Áo mưa dài bằng vải bạt tẩm dầu, ra đời ở Úc từ đầu thế kỷ 20 cho người chăn bò và người cưỡi ngựa. Nó xuất hiện nhiều trong phim ảnh và hội chợ nông nghiệp.', null, { char: ['audriza'], use: 'wear' });
add(G, A, 'au-akubra', 'Mũ Akubra', 'Akubra hat', 'Mũ dạ rộng vành làm từ lông thỏ, che nắng cho người làm việc ở nông trại và Outback. Nó gắn với hình ảnh người chăn nuôi (stockman) và được nhiều người đội khi đi hội chợ hoặc lễ hội quê.',
  d => { d.bg('e'); d.e(8, 6, 4, 3.4, 'n'); d.e(8, 11, 7.4, 2.4, 'n'); d.r(4, 7, 8, 2, 'N'); d.p('Y', 6, 8, 10, 8); d.p('N', 2, 12, 13, 12); }, { use: 'wear' });
add(G, A, 'au-ugg', 'Ugg boots', 'Ugg boots', 'Đôi bốt lông cừu ấm, phổ biến ở Úc và New Zealand, vốn được thợ cạo lông cừu và người lướt sóng mang vì giữ ấm. Ngày nay chúng thành thương hiệu toàn cầu dù "ugg" ở Úc là tên chung của loại giày này.',
  d => { d.bg('e'); d.r(4, 3, 4, 9, 't'); d.r(4, 11, 9, 3, 't'); d.r(4, 3, 4, 2, 'u'); d.r(4, 13, 9, 1, 'n'); d.p('T', 5, 6, 6, 8, 10, 12); d.p('w', 5, 3, 7, 3); d.r(4, 12, 9, 1, 'W'); }, H);
add(G, A, 'au-lifesaver', 'Đồ bơi Speedo và bộ đồ cứu hộ bãi biển', 'Speedo swimwear and lifesaver gear', 'Màu đỏ và vàng của những người cứu hộ (lifesaver) là hình ảnh quen thuộc trên bãi biển. Hiệp hội cứu hộ bãi biển đã hoạt động từ đầu thế kỷ 20.', null, { char: ['aulife'], use: 'wear' });
add(G, A, 'au-bodypaint', 'Trang phục nghệ thuật thổ dân', 'Aboriginal ceremonial dress', 'Trong các lễ hội, người biểu diễn sơn hình vẽ trên cơ thể bằng đất son và phấn, kèm trang trí lông chim. Mỗi hình vẽ có ý nghĩa riêng đối với từng cộng đồng.', null, { char: ['aopaint'], use: 'wear' });
add(G, A, 'au-anzacdress', 'Huy chương ngày Anzac', 'Anzac Day medals', 'Trong ngày Anzac, nhiều người đeo huy chương của ông bà hoặc người thân đã tham chiến. Người ta đeo huy chương của người thân bên phải áo để tưởng nhớ.', null, { char: ['auanzac'], use: 'wear' });

// ----- Phụ kiện -----
add(G, B, 'au-sunnies', 'Kính râm và kem chống nắng', 'Sunglasses and sunscreen', 'Ánh nắng ở Úc rất mạnh nên người dân thường đội mũ, đeo kính và bôi kem. Chiến dịch "Slip, Slop, Slap" từ thập niên 1980 nhắc mọi người mặc áo, bôi kem và đội mũ.',
  d => { d.bg('e'); d.r(2, 5, 5, 3, 'k'); d.r(9, 5, 5, 3, 'k'); d.r(7, 6, 2, 1, 'k'); d.p('b', 3, 6, 10, 6); d.r(5, 10, 6, 5, 'y'); d.r(6, 9, 4, 1, 'r'); d.p('w', 7, 12, 8, 13); }, H);
add(G, B, 'au-flynet', 'Lưới chống ruồi (fly net)', 'Fly net', 'Lưới nhỏ đội lên mũ để tránh ruồi ở Outback. Nó giúp người đi đường đỡ bực mình vì đàn ruồi bám mặt.',
  d => { d.bg('e'); d.e(8, 5, 4, 2.4, 'n'); d.r(2, 6, 12, 1, 'N'); for (let x = 3; x < 14; x += 2) d.l(x, 7, x, 13, 'a'); for (let y = 8; y < 14; y += 2) d.r(3, y, 10, 1, 'a'); d.p('k', 6, 3); }, { use: 'wear' });
add(G, B, 'au-opal', 'Trang sức ngọc opal', 'Opal jewelry', 'Úc sản xuất phần lớn opal trên thế giới, đặc biệt ở Coober Pedy và Lightning Ridge. Đây là viên đá có ánh sáng nhiều màu rất đẹp.',
  d => { d.bg('B'); d.e(8, 8, 5, 4.4, 'c'); d.p('g', 5, 7, 7, 6, 9, 9); d.p('p', 9, 6, 11, 8, 6, 10); d.p('y', 8, 8, 10, 10); d.p('w', 6, 6, 10, 7); d.p('a', 4, 12, 11, 12); }, H);
add(G, B, 'au-pearl', 'Ngọc trai Broome', 'Broome pearls', 'Ngọc trai nuôi ở Broome (Tây Úc) nổi tiếng với kích thước lớn và ánh vàng. Nghề này gắn với lịch sử nhiều cộng đồng nhập cư ở đó.',
  d => { d.bg('C'); d.e(8, 11, 5, 3.2, 'a'); d.e(8, 10, 4, 2, 'l'); d.e(8, 7, 2.6, 2.6, 'u'); d.p('w', 7, 6); d.p('y', 9, 8); d.r(3, 13, 10, 2, 'e'); }, H);
add(G, B, 'au-abjewel', 'Trang sức thổ dân', 'Aboriginal jewelry', 'Vòng cổ làm từ hạt, vỏ ốc và xương, thường do phụ nữ làm thủ công. Torres Strait Islander còn làm mũ đội đầu dựa trên lông chim.',
  d => { d.bg('e'); for (let i = 0; i < 12; i++) { const a = 0.4 + i * 0.2; d.e(8 + Math.cos(a * 2.2 + 1.6) * 5.4, 4 + Math.sin(a * 2.2 + 1.6) * 6, 1.1, 1.1, ['r', 'y', 'w', 'O', 'k'][i % 5]); } d.e(8, 12, 2, 1.4, 'w'); d.p('k', 8, 12); }, H);
add(G, B, 'au-medicare', 'Thẻ Medicare', 'Medicare card', 'Thẻ bảo hiểm y tế công của nhà nước cấp cho công dân và một số người cư trú. Đây là một đồ dùng cá nhân quan trọng trong cuộc sống.',
  d => { d.bg('e'); d.r(2, 4, 12, 9, 'g'); d.r(2, 4, 12, 2, 'G'); d.r(4, 8, 8, 1, 'w'); d.r(4, 10, 6, 1, 'h'); d.r(10, 7, 3, 3, 'y'); d.p('w', 3, 5); }, H);
add(G, B, 'au-camping', 'Bộ đồ cắm trại và dã ngoại', 'Camping and picnic gear', 'Nhiều gia đình đi cắm trại dịp nghỉ lễ. Lều, túi ngủ và bếp ga mini là thứ thường thấy trong gầm xe.',
  d => { d.bg('G'); d.r(0, 12, 16, 4, 'g'); d.tri(2, 4, 12, 8, 'o'); d.tri(5, 7, 6, 5, 'k'); d.l(8, 4, 8, 3, 'N'); d.r(0, 11, 16, 1, 'h'); d.e(14, 13, 1.4, 1.4, 'r'); d.p('y', 14, 11); }, SC);

// ----- Nhà ở -----
add(G, C, 'au-suburb', 'Nhà vườn (suburban house)', 'Suburban house', 'Ngôi nhà một tầng có sân vườn phía trước và sau, được xem là "giấc mơ Úc". Một số nhà có hồ bơi nhỏ trong sân.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(3, 6, 8, 6, 'x'); d.tri(2, 2, 10, 4, 'r'); d.r(4, 8, 2, 2, 'B'); d.r(8, 8, 2, 4, 'N'); d.r(12, 11, 4, 3, 'C'); d.p('w', 13, 12); d.p('y', 1, 11); }, SC);
add(G, C, 'au-queensl', 'Nhà gỗ Queenslander', 'Queenslander house', 'Nhà dựng trên cột cao, có hiên rộng và mái tôn. Thiết kế này giúp mát, tránh lũ và mối mọt.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'g'); for (const x of [3, 6, 9, 12]) d.r(x, 11, 1, 4, 'N'); d.r(2, 6, 12, 5, 'w'); d.tri(1, 2, 14, 4, 'a'); d.r(2, 9, 12, 1, 'n'); for (const x of [3, 6, 9, 12]) d.r(x, 7, 2, 2, 'b'); d.l(2, 10, 13, 10, 'N'); }, SC);
add(G, C, 'au-terrace', 'Nhà dãy kiểu Victoria (terrace house)', 'Victorian terrace house', 'Nhà nối liền nhau có ban công sắt ren, phổ biến ở Sydney và Melbourne. Nhiều căn được giữ gìn như di sản.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); for (const [x, c] of [[0, 'R'], [5, 'x'], [10, 'y']]) { d.r(x, 4, 5, 10, c); d.r(x + 1, 6, 1, 2, 'B'); d.r(x + 3, 6, 1, 2, 'B'); d.r(x, 9, 5, 1, 'k'); d.r(x + 2, 11, 1, 3, 'N'); } d.r(0, 3, 16, 1, 'a'); }, SC);
add(G, C, 'au-coober', 'Nhà hầm ở Coober Pedy', 'Underground homes in Coober Pedy', 'Thị trấn mỏ opal có nhiều người sống dưới đất để tránh nắng nóng. Nhiều nhà, cả nhà thờ và khách sạn, được đục vào sườn đồi.',
  d => { d.bg('c'); d.r(0, 6, 16, 10, 'O'); d.e(8, 6, 8, 3, 'o'); d.r(4, 9, 5, 5, 'k'); d.r(10, 10, 3, 4, 'k'); d.r(5, 7, 3, 1, 'N'); d.p('y', 6, 11, 11, 12); d.l(2, 5, 2, 3, 'a'); d.p('R', 1, 14, 14, 15); }, SC);
add(G, C, 'au-homestead', 'Nhà trại (homestead) ở Outback', 'Outback homestead', 'Ngôi nhà gỗ hiên rộng giữa trại chăn nuôi lớn, thường cách thị trấn hàng trăm km. Một số trại dùng máy bay nhỏ để kiểm tra đàn gia súc.',
  d => { red(d); d.r(3, 7, 10, 5, 'w'); d.tri(1, 3, 14, 4, 'a'); d.r(2, 10, 12, 1, 'N'); d.r(7, 9, 2, 3, 'N'); d.r(4, 8, 2, 2, 'b'); d.r(10, 8, 2, 2, 'b'); d.l(14, 12, 14, 8, 'a'); d.r(13, 7, 3, 1, 'a'); }, SC);
add(G, C, 'au-flat', 'Nhà phố kiểu Âu và chung cư cao tầng', 'European-style townhouses and high-rise flats', 'Ở trung tâm Sydney và Melbourne, nhiều người trẻ thuê căn hộ. Giá nhà cao khiến việc mua nhà ngày càng khó.',
  d => { d.bg('c'); d.r(0, 14, 16, 2, 'a'); d.r(1, 3, 6, 11, 'A'); d.r(8, 1, 7, 13, 'a'); for (let y = 4; y < 13; y += 2) for (const x of [2, 4, 9, 11, 13]) d.p('y', x, y); d.r(5, 14, 3, 1, 'C'); }, SC);
add(G, C, 'au-gunyah', 'Nhà gỗ truyền thống của thổ dân', 'Traditional Aboriginal shelter', 'Nhà tạm bằng cành cây và vỏ cây (gunyah hay humpy) từng được dựng tạm thời theo mùa. Ngày nay chúng chủ yếu được giới thiệu trong các trung tâm văn hóa.',
  d => { red(d); d.tri(2, 5, 12, 8, 'n'); d.tri(4, 7, 8, 6, 'N'); d.r(6, 10, 4, 3, 'k'); d.l(3, 8, 2, 12, 'N'); d.l(12, 8, 14, 12, 'N'); d.p('t', 5, 8, 10, 8, 8, 6); }, SC);

// ----- Đồ dùng -----
add(G, E, 'au-barbie', 'Bếp nướng barbecue (barbie)', 'Barbecue (barbie)', 'Hầu như nhà nào cũng có bếp nướng ngoài trời, và công viên công cộng có bếp nướng miễn phí. Đây là nơi bạn bè và hàng xóm tụ họp cuối tuần.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 7, 12, 3, 'k'); d.r(2, 7, 12, 1, 'a'); d.p('r', 4, 9, 8, 9, 11, 9); for (const x of [3, 7, 11]) d.r(x, 5, 2, 2, x % 2 ? 'R' : 'n'); d.l(4, 10, 3, 14, 'a'); d.l(12, 10, 13, 14, 'a'); d.p('w', 5, 2, 9, 3); }, SC);
add(G, E, 'au-esky', 'Esky', 'Esky cooler', 'Thùng giữ lạnh để đựng đồ ăn và đồ uống khi đi biển hay đi cắm trại. Tên này xuất hiện từ thập niên 1950.',
  d => { d.bg('e'); d.r(2, 6, 12, 8, 'b'); d.r(2, 5, 12, 2, 'w'); d.r(6, 3, 4, 2, 'a'); d.p('B', 4, 9, 11, 9, 4, 12, 11, 12); d.p('w', 3, 7); }, H);
add(G, E, 'au-billy', 'Billy (ấm nấu nước ngoài trời)', 'Billy can', 'Chiếc ấm kim loại có quai, dùng đun nước pha trà trên ngọn lửa khi đi đường. Nó xuất hiện trong bài hát dân gian nổi tiếng "Waltzing Matilda".',
  d => { d.bg('e'); d.r(4, 6, 8, 7, 'a'); d.r(3, 5, 10, 2, 'A'); d.l(4, 5, 8, 1, 'k'); d.l(12, 5, 8, 1, 'k'); d.r(12, 8, 2, 1, 'a'); d.tri(4, 12, 8, 3, 'o'); d.p('y', 7, 14, 8, 13); d.p('k', 5, 9, 10, 10); }, H);
add(G, E, 'au-boomerang', 'Bumerang (boomerang)', 'Boomerang', 'Vật hình chữ V của người thổ dân, có loại dùng để săn và có loại bay quay lại tay người ném. Nhiều cái được trang trí để bán làm quà lưu niệm.',
  d => { d.bg('e'); d.l(2, 4, 8, 13, 'n'); d.l(3, 4, 9, 13, 'n'); d.l(9, 13, 14, 5, 'n'); d.l(10, 13, 15, 5, 'n'); d.p('y', 4, 7, 6, 10, 11, 10, 13, 7); d.p('r', 8, 12); d.p('w', 5, 5, 7, 9, 12, 8); }, H);
add(G, E, 'au-didge', 'Didgeridoo', 'Didgeridoo', 'Ống kèn dài làm từ thân cây bạch đàn bị mối ăn rỗng, chủ yếu ở vùng Bắc. Người thổi dùng kỹ thuật thở liên tục để tạo tiếng vọng trầm.',
  d => { d.bg('e'); d.l(2, 3, 13, 14, 'n'); d.l(3, 3, 14, 14, 'N'); d.l(1, 2, 3, 2, 'N'); d.p('r', 5, 6, 8, 8, 11, 11); d.p('y', 6, 6, 9, 9, 12, 12); d.p('w', 4, 5, 7, 7, 10, 10); d.e(14, 14, 1.6, 1.6, 'N'); }, H);
add(G, E, 'au-dilly', 'Dillybag', 'Dillybag', 'Túi đan bằng sợi cây của phụ nữ thổ dân, dùng để đựng thức ăn. Nhiều người làm nghề vẫn giữ cách đan truyền thống.',
  d => { d.bg('e'); d.e(8, 10, 5, 4.6, 't'); d.l(5, 6, 8, 2, 'n'); d.l(11, 6, 8, 2, 'n'); for (let y = 7; y < 14; y += 2) d.r(4, y, 8, 1, 'n'); for (let x = 5; x < 12; x += 2) d.l(x, 7, x, 13, 'T'); d.p('r', 8, 10); }, H);
add(G, E, 'au-ute', 'Xe bán tải (ute) và xe 4WD', 'Ute and 4WD', 'Ute là loại xe bán tải được phát minh ở Úc những năm 1930, phổ biến ở nông thôn. Xe 4WD dẫn động cả bốn bánh để đi đường đất đỏ.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'O'); d.r(1, 8, 6, 4, 'r'); d.r(2, 6, 4, 2, 'r'); d.r(3, 7, 2, 1, 'c'); d.r(7, 9, 7, 3, 'R'); d.e(4, 13, 1.8, 1.8, 'k'); d.e(11, 13, 1.8, 1.8, 'k'); d.p('a', 4, 13, 11, 13); d.p('o', 14, 12); }, SC);
