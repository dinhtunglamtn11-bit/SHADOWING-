import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('ao');
// Angola · Nhóm 2: Con người và đời sống
const base = { o: '#2b1d3a', S: '#9a6844', s: '#bd8a62', x: '#3a2416' };
OUTM.ao_pano = { map: M_DRESS, pal: { ...base, t: '#e86a1f', T: '#1f5f8a', u: '#e86a1f', b: '#1f5f8a', y: '#ffd84d', g: '#2f9a4a', w: '#ffffff', x: '#7a3a12' }, patch: [[11, 6, 'y'], [12, 9, 'y'], [13, 7, 'g'], [15, 5, 'y'], [15, 8, 'g'], [15, 10, 'y'], [16, 6, 'w'], [16, 9, 'w'], [17, 4, 'y'], [17, 7, 'g'], [17, 11, 'y']] };
OUTM.ao_bubu = { map: M_DRESS, pal: { ...base, t: '#5a2a8a', T: '#ffd84d', u: '#5a2a8a', b: '#5a2a8a', y: '#ffd84d', p: '#ff7ab0', w: '#ffffff', x: '#3a1a5a' }, patch: [[11, 7, 'y'], [11, 8, 'y'], [12, 6, 'y'], [12, 9, 'y'], [13, 7, 'p'], [13, 8, 'p'], [15, 4, 'y'], [15, 7, 'w'], [15, 11, 'y'], [16, 6, 'p'], [16, 9, 'p'], [17, 4, 'y'], [17, 8, 'w'], [17, 10, 'y']] };
OUTM.ao_suit = { map: M_TOP, pal: { ...base, t: '#2b2f4a', T: '#ffffff', u: '#2b2f4a', b: '#1b1030', p: '#2b2f4a', l: '#1b1030', w: '#ffffff', r: '#c0272d', x: '#3a2416' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'r'], [13, 8, 'r'], [14, 7, 'r']] };
OUTM.ao_himba = { map: M_DRESS, pal: { ...base, S: '#a8421f', s: '#c85a2e', t: '#8a4a22', T: '#c9863a', u: '#c85a2e', b: '#ffd84d', y: '#ffd84d', w: '#f7f3e8', x: '#5a2a12' }, patch: [[11, 5, 'w'], [11, 6, 'y'], [11, 7, 'w'], [11, 8, 'y'], [11, 9, 'w'], [11, 10, 'y'], [12, 6, 'y'], [12, 9, 'y'], [16, 5, 'w'], [16, 10, 'w']] };
OUTM.ao_mwila = { map: M_DRESS, pal: { ...base, t: '#1f4a7a', T: '#c0272d', u: '#1f4a7a', b: '#c0272d', y: '#ffd84d', r: '#e8452c', w: '#ffffff', g: '#2f9a4a', x: '#122a4a' }, patch: [[10, 5, 'r'], [10, 6, 'y'], [10, 7, 'w'], [10, 8, 'y'], [10, 9, 'r'], [11, 5, 'y'], [11, 6, 'r'], [11, 7, 'g'], [11, 8, 'r'], [11, 9, 'y'], [12, 6, 'w'], [12, 7, 'y'], [12, 8, 'w'], [16, 6, 'y'], [16, 9, 'y']] };
OUTM.ao_jersey = { map: M_TOP, pal: { ...base, t: '#c0272d', T: '#1b1030', u: '#c0272d', b: '#1b1030', p: '#1b1030', l: '#ffd84d', y: '#ffd84d', w: '#ffffff', x: '#2b2b3a' }, patch: [[11, 7, 'y'], [11, 8, 'y'], [12, 6, 'y'], [13, 7, 'w'], [13, 8, 'w'], [14, 7, 'w']] };
Object.assign(OUT_KEY, { 'ao-pano': 'ao_pano', 'ao-bubu': 'ao_bubu', 'ao-suit': 'ao_suit', 'ao-mucubal': 'ao_himba', 'ao-mwila': 'ao_mwila', 'ao-football-shirt': 'ao_jersey' });
Object.assign(SLOT_OF, { 'ao-pano': 'outfit', 'ao-bubu': 'outfit', 'ao-suit': 'outfit', 'ao-mucubal': 'outfit', 'ao-mwila': 'outfit', 'ao-football-shirt': 'outfit', 'ao-lenco': 'head', 'ao-bead-necklaces': 'face', 'ao-metal-bangles': 'face', 'ao-braids-wigs': 'head' });
O['ao-lenco'] = { y0: -2, pal: { o: '#e86a1f', y: '#ffd84d', b: '#1f5f8a' }, rows: ['........ooo.....', '.....oooooyo....', '....ooyoooooo...', '...oooooyooooo..', '..oyooooooooyo..', '..bbbbbbbbbbbb..'] };
O['ao-bead-necklaces'] = { y0: 9, pal: { r: '#e8452c', y: '#ffd84d', b: '#4a7be0', w: '#ffffff' }, rows: ['....r......r....', '.....yrbwyr.....', '....y......y....', '.....bwrybw.....'] };
O['ao-metal-bangles'] = { y0: 13, pal: { y: '#c9a227', a: '#c8ccdd' }, rows: ['..yy........yy..', '..aa........aa..', '..yy........yy..'] };
O['ao-braids-wigs'] = { y0: 0, pal: { k: '#1b1030', o: '#e86a1f' }, rows: ['....kkkkkkkk....', '...kkkkkkkkkk...', '..kkkkkkkkkkkk..', '..k..........k..', '..k..........k..', '..k..........k..', '..k..........k..', '..k..........k..', '..o..........o..'] };


// ----- Trang phục -----
add(2, 'Trang phục', 'ao-pano', 'Pano (vải quấn)', 'Pano wrap cloth', 'tấm vải in hàng màu sắc mà phụ nữ quấn quanh hông, dùng mặc hằng ngày. Tấm vải còn để địu con sau lưng, che bụi hoặc gấp làm tấm đệm.', null, { char: ['ao_pano'], use: 'wear' });
add(2, 'Trang phục', 'ao-lenco', 'Lenco (khăn trùm đầu)', 'Lenco head scarf', 'khăn vải quấn đầu của phụ nữ, thường cùng màu hay hợp hoa văn với pano. Kiểu quấn khác nhau theo dịp và từng vùng.',
  d => { d.e(8,11,3.4,4,'N'); d.p('k',6,10,10,10); d.p('m',7,13,8,13,9,13); d.e(8,6,5.6,3.6,'o'); d.r(3,7,11,2,'o'); d.r(3,9,11,1,'b'); d.e(10,2.5,3,2,'o'); d.e(5.5,2.5,2,1.6,'o'); d.p('y',5,5,8,4,11,6,7,7,11,2,4,7,13,7); d.p('b',6,3,10,5,4,5); }, { use: 'wear' });
add(2, 'Trang phục', 'ao-bubu', 'Áo bubu và bộ đồ in hoa', 'Bubu gown and prints', 'nhiều phụ nữ mặc áo dài rộng hoặc bộ đồ may từ vải in hoa trong những dịp lễ và đi nhà thờ. Màu vải thường tươi và đậm.', null, { char: ['ao_bubu'], use: 'wear' });
add(2, 'Trang phục', 'ao-suit', 'Đồ vest và áo sơ mi', 'Suit and shirt', 'đàn ông ở thành thị mặc vest, áo sơ mi khi đi làm hoặc đi nhà thờ. Ở Luanda, cách ăn mặc chỉn chu là điều nhiều người coi trọng.', null, { char: ['ao_suit'], use: 'wear' });
add(2, 'Trang phục', 'ao-mucubal', 'Trang phục người Himba (Mucubal)', 'Mucubal and Himba dress', 'phụ nữ ở miền nam bôi hỗn hợp đất son và mỡ bơ lên da và tóc, mặc váy da. Lớp bôi giúp chống nắng và mang màu đỏ đặc trưng.', null, { char: ['ao_himba'], use: 'wear' });
add(2, 'Trang phục', 'ao-mwila', 'Trang phục người Mwila', 'Mwila dress', 'phụ nữ ở vùng Huíla để kiểu tóc công phu và đeo nhiều vòng cổ hạt. Cách trang điểm phản ánh tuổi tác và địa vị trong cộng đồng.', null, { char: ['ao_mwila'], use: 'wear' });
add(2, 'Trang phục', 'ao-football-shirt', 'Áo bóng đá và đồ thể thao', 'Palancas football shirt', 'áo đội tuyển Palancas Negras và các câu lạc bộ quốc tế được nhiều người mặc hàng ngày. Trẻ em thường chơi bóng ở khắp nơi.', null, { char: ['ao_jersey'], use: 'wear' });

// ----- Phụ kiện -----
add(2, 'Phụ kiện', 'ao-bead-necklaces', 'Vòng cổ hạt cườm', 'Bead necklaces', 'nhiều lớp vòng nhiều màu đeo quanh cổ, đặc biệt ở phụ nữ miền nam. Số lượng vòng có thể cho biết người đeo đã lập gia đình hay chưa.',
  d => { for(const [r,c] of [[6.5,'r'],[5,'y'],[3.5,'b'],[2,'w']]){ for(let i=0;i<=16;i++){ const a=Math.PI*i/16; d.p(i%2?c:'N',Math.round(7.5+Math.cos(a)*r),Math.round(4+Math.sin(a)*r*1.4)); } } d.p('r',1,3,14,3); }, { use: 'wear' });
add(2, 'Phụ kiện', 'ao-metal-bangles', 'Vòng tay và vòng chân kim loại', 'Metal bangles and anklets', 'làm từ đồng hoặc sắt, thường được đeo cùng một lúc nhiều chiếc. Nhiều cộng đồng coi đây là dấu hiệu của sự giàu có.',
  d => { d.e(6,6,4.4,4.4,'Y'); d.e(6,6,3,3,'_'); d.e(10,10,4.4,4.4,'o'); d.e(10,10,3,3,'_'); d.p('y',4,3,3,4,12,8,13,9); d.p('N',9,5,10,6); d.e(12,3,2,2,'a'); d.e(12,3,.9,.9,'_'); }, { use: 'wear' });
add(2, 'Phụ kiện', 'ao-braids-wigs', 'Kiểu tóc tết và tóc giả', 'Braids and wigs', 'phụ nữ Luanda thường tết tóc hoặc đội tóc giả theo thời trang. Tiệm làm tóc là nơi bạn bè tụ họp.',
  d => { d.e(8,6,5.4,4.8,'k'); d.r(5,5,6,6,'N'); d.p('k',6,7,10,7); d.p('m',7,9,8,9); for(const x of [2,4,12,14]) for(let y=6;y<15;y++) d.p(y%2?'k':'n',x,y); d.p('o',2,14,4,14,12,14,14,14); d.p('r',11,3,12,2); }, { use: 'wear' });
add(2, 'Phụ kiện', 'ao-chokwe-staff', 'Trượng quyền lực của người Chokwe', 'Chokwe chief\'s staff', 'trượng gỗ chạm của thủ lĩnh, thường chạm hình người và thú. Đây là vật biểu tượng cho uy quyền và truyền thống.',
  d => { d.r(7,6,2,10,'n'); d.p('N',7,8,8,10,7,12,8,14); d.e(8,4,2.4,2.4,'N'); d.p('N',4,1,5,2,6,2,11,1,10,2,9,2); d.r(5,0,6,1,'N'); d.p('t',7,4,9,4); d.p('t',8,6); d.r(6,7,4,1,'y'); d.r(6,15,4,1,'N'); }, { use: 'hold' });
add(2, 'Phụ kiện', 'ao-lunda-diamond', 'Trang sức kim cương Lunda', 'Lunda diamonds', 'Angola là nước sản xuất kim cương lớn, chủ yếu ở vùng Lunda phía đông bắc. Nhiều đá được xuất khẩu thô, ít được chế tác trong nước.',
  d => { d.tri(3,3,11,4,'c'); d.dtri(2,7,13,7,'C'); d.r(5,3,6,1,'w'); d.p('w',5,5,6,5,6,6,5,8,6,9); d.p('b',10,8,9,9,11,7,8,11); d.p('y',2,2,13,2,14,12,1,12); d.p('w',13,3,2,3); }, { use: 'hold' });
add(2, 'Phụ kiện', 'ao-sunglasses-phone', 'Kính râm và điện thoại', 'Sunglasses and phone', 'người trẻ ở thành phố chuộng thời trang, điện thoại thông minh và giày thể thao. Những món này thể hiện sự sành điệu.',
  d => { d.e(4,5,3,2.4,'k'); d.e(11,5,3,2.4,'k'); d.r(6,4,4,1,'k'); d.p('c',3,4,10,4); d.r(0,3,1,2,'k'); d.r(15,3,1,2,'k'); d.r(5,9,6,7,'K'); d.r(6,10,4,4,'p'); d.p('w',7,15,8,15); d.p('y',7,11,8,12); }, { use: 'hold' });

// ----- Nhà ở -----
add(2, 'Nhà ở', 'ao-palhota', 'Palhota (nhà tranh)', 'Palhota thatched house', 'nhà tròn hoặc chữ nhật vách đất, mái lợp cỏ tranh, phổ biến ở vùng nông thôn. Mát mùa nóng, ấm mùa lạnh, vật liệu lấy từ địa phương.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(3,8,10,6,'O'); d.tri(1,2,14,6,'Y'); d.p('O',4,6,6,5,8,3,10,6,12,7); d.r(7,10,3,4,'N'); d.p('y',2,7,14,7); d.p('N',4,10,11,10); d.p('G',1,12,14,12,2,14); }, SC);
add(2, 'Nhà ở', 'ao-curral', 'Curral (rào gia súc)', 'Cattle kraal', 'vòng rào cành cây bao quanh khu nhà, dùng nhốt bò và dê. Đây là hình ảnh quen thuộc ở vùng chăn nuôi miền nam.',
  d => { d.bg('u'); d.r(0,11,16,5,'O'); for(let x=0;x<16;x+=2){ d.r(x,7+(x%4?1:0),1,6,'N'); d.p('n',x+1,10); } d.l(0,10,15,10,'n'); d.e(7,12,3,2,'e'); d.e(10,11,1.6,1.4,'e'); d.p('N',9,9,12,9,6,11,7,13); d.p('k',11,11); d.e(13,3,1.6,1.6,'o'); }, SC);
add(2, 'Nhà ở', 'ao-himba-house', 'Nhà Himba', 'Himba dome house', 'nhà hình vòm bằng gỗ trát đất và phân bò. Người dân có thể di chuyển theo mùa để tìm cỏ cho gia súc.',
  d => { d.bg('u'); d.r(0,13,16,3,'O'); d.fan(8,13,7,'r'); d.r(1,12,15,2,'r'); d.fan(8,14,2.4,'k'); d.p('O',4,9,6,7,10,8,12,11,3,12); d.l(8,6,4,12,'n'); d.l(8,6,12,12,'n'); d.p('N',7,5,9,5,8,4); }, SC);
add(2, 'Nhà ở', 'ao-colonial-house', 'Nhà thời thuộc địa Bồ Đào Nha', 'Colonial pastel house', 'nhà hai tầng màu pastel với ban công và cửa sổ cao, còn sót lại ở Luanda và Benguela. Một số được tu sửa, một số xuống cấp.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.r(2,3,12,11,'p'); d.r(1,2,14,1,'w'); d.r(2,1,12,1,'r'); for(const x of [3,7,11]){ d.r(x,4,2,3,'B'); d.fan(x+.5,10,1.2,'B'); d.r(x,10,2,3,'B'); } d.r(1,8,14,1,'w'); for(let x=2;x<15;x+=2) d.p('N',x,7); }, SC);
add(2, 'Nhà ở', 'ao-musseque', 'Musseque (khu dân cư ngoại thành)', 'Musseque neighbourhood', 'từ Kimbundu chỉ vùng đất cát, nay dùng cho những khu dân cư đông đúc quanh Luanda. Nhà thường xây dần bằng gạch và tôn.',
  d => { d.bg('c'); d.r(0,13,16,3,'O'); for(const [x,y,w,c] of [[0,8,5,'a'],[5,6,5,'t'],[10,9,6,'n'],[2,11,4,'r'],[9,11,4,'u']]){ d.r(x,y,w,5,c); d.r(x,y-1,w,1,'A'); d.p('k',x+1,y+2,x+1,y+3); d.p('B',x+3,y+1); } d.p('w',3,3,4,3,12,2); }, SC);
add(2, 'Nhà ở', 'ao-kilamba', 'Cidade do Kilamba (thành phố vệ tinh Kilamba)', 'Kilamba new town', 'khu đô thị mới ngoại ô Luanda với hàng nghìn căn hộ chung cư, xây từ đầu thập niên 2010. Khu có trường học, công viên và nhà cao tầng.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); for(const [x,y,c] of [[0,3,'o'],[5,5,'y'],[10,2,'c']]){ d.r(x,y,4,13-y,c); d.r(x,y,4,1,'w'); for(let yy=y+2;yy<12;yy+=2) d.p('B',x+1,yy,x+2,yy); } d.r(0,14,16,1,'A'); d.p('G',4,12,9,12,15,12); }, SC);
add(2, 'Nhà ở', 'ao-skyscrapers', 'Nhà cao tầng ở Luanda', 'Luanda skyline', 'thủ đô có nhiều tòa văn phòng và khách sạn mới, đặc biệt dọc vịnh. Chi phí sống ở khu trung tâm nổi tiếng là cao.',
  d => { d.bg('o'); d.r(0,12,16,4,'C'); for(const [x,h,c] of [[1,7,'B'],[4,11,'k'],[8,8,'b'],[11,10,'K'],[14,6,'B']]){ d.r(x,12-h,2,h,c); for(let y=13-h;y<11;y+=2) d.p('y',x+(y%4?1:0),y); } d.e(7,3,1.6,1.6,'y'); d.p('y',4,13,5,14,11,13,12,15); }, SC);

// ----- Đồ dùng -----
add(2, 'Đồ dùng', 'ao-pilao', 'Pilão (cối giã)', 'Mortar and pestle', 'cối gỗ và chiếc chày dài dùng giã sắn và ngô thành bột. Tiếng giã nhịp nhàng là âm thanh quen thuộc buổi sáng ở làng.',
  d => { d.r(4,8,7,2,'N'); d.r(5,10,5,4,'n'); d.r(4,14,7,2,'N'); d.p('t',6,11,8,12); d.r(5,7,5,1,'w'); d.l(10,1,7,8,'t'); d.l(11,1,8,8,'n'); d.p('N',10,1,11,0,12,1); d.p('w',2,7,13,7,12,9); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-woven-baskets', 'Giỏ và thúng đan', 'Woven baskets', 'đan từ sợi cọ hoặc mây, dùng đựng ngô, sắn và cá. Nhiều giỏ còn là món hàng thủ công được bán ở chợ.',
  d => { d.r(2,8,12,6,'t'); d.r(3,14,10,1,'n'); for(let y=9;y<14;y+=2) for(let x=2+(y%4?1:0);x<14;x+=2) d.p('n',x,y); d.r(1,7,14,1,'N'); for(const [x,c] of [[4,'y'],[7,'o'],[10,'y'],[12,'g']]) d.e(x,5.5,1.4,1.6,c); d.p('N',4,3,12,3); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-panela', 'Panela (nồi)', 'Cooking pot on the fire', 'nồi nhôm hoặc sắt đặt trên bếp than hoặc bếp ga để nấu funge và đồ hầm. Nồi lớn dùng khi cả nhà ăn chung.',
  d => { d.r(3,6,10,6,'A'); d.r(2,5,12,1,'a'); d.e(8,4,5,1.2,'A'); d.p('k',7,2,8,2,8,3); d.r(1,7,2,1,'k'); d.r(13,7,2,1,'k'); d.p('a',4,7,4,8,4,9); for(const x of [4,7,10]) d.tri(x,12,3,3,'o'); d.p('y',5,13,8,14,11,13); d.r(2,15,12,1,'N'); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-water-jerrycan', 'Bidão (can nhựa đựng nước)', 'Water jerrycan', 'thùng nhựa nhiều lít, rất cần thiết khi không có nước máy. Phụ nữ và trẻ em thường phải xách nước từ xa.',
  d => { d.r(3,4,10,11,'y'); d.r(4,2,3,2,'y'); d.r(4,1,3,1,'r'); d.r(9,2,3,2,'Y'); d.fan(10.5,5,1.4,'_'); d.r(5,7,6,6,'Y'); d.p('c',8,8,7,9,8,9,9,9,7,10,8,10,9,10,8,11); d.p('w',4,5,4,6); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-candongueiro', 'Candongueiro (xe buýt nhỏ)', 'Candongueiro minibus', 'xe tải nhỏ hoặc xe van sơn xanh trắng chở khách ở Luanda. Tài xế và người thu tiền thường hô to điểm đến.',
  d => { d.r(1,4,14,9,'b'); d.r(1,4,14,4,'w'); for(let x=2;x<12;x+=3) d.r(x,5,2,2,'C'); d.r(12,5,3,3,'c'); d.r(1,9,14,1,'w'); d.e(4,13,1.8,1.8,'k'); d.e(12,13,1.8,1.8,'k'); d.p('a',4,13,12,13); d.p('y',14,11); d.p('r',1,11); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-kupapata', 'Kupapata (xe mô tô chở khách)', 'Kupapata motorbike taxi', 'xe mô tô hai bánh chở khách, phổ biến ở các thị trấn và ngoại ô. Tên gọi gợi hình ảnh hành khách bám chặt người lái.',
  d => { d.e(3.5,12,2.6,2.6,'k'); d.e(3.5,12,1,1,'a'); d.e(12.5,12,2.6,2.6,'k'); d.e(12.5,12,1,1,'a'); d.r(4,9,8,2,'r'); d.l(11,9,13,12,'a'); d.l(11,8,12,5,'a'); d.r(10,5,3,1,'k'); d.r(5,8,4,1,'k'); d.e(6,2.5,1.8,1.8,'y'); d.r(5,4,3,4,'g'); d.l(8,5,10,6,'N'); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-ngoma-drum', 'Trống ngoma', 'Ngoma drum', 'trống da dài dùng trong lễ hội, nghi thức và biểu diễn. Nhiều trống được làm thủ công từ gỗ khoét rỗng.',
  d => { d.e(8,3,4,1.6,'e'); d.r(4,3,9,3,'n'); d.r(5,6,7,5,'N'); d.r(6,11,5,4,'n'); d.e(8,15,3,1,'N'); d.e(8,3,3,1,'e'); d.p('t',4,4,6,6,8,4,10,6,12,4,5,5,7,5,9,5,11,5); d.p('y',6,8,8,9,10,8); }, { use: 'hold' });
add(2, 'Đồ dùng', 'ao-kwanza', 'Đồng kwanza', 'Kwanza currency', 'đơn vị tiền tệ của Angola, tên lấy từ sông Cuanza. Người dân thường nhắc đến đồng đô la khi bàn giá lớn.',
  d => { d.r(1,4,12,7,'g'); d.r(2,5,10,5,'h'); d.e(5,7.5,1.8,2,'N'); d.p('G',9,6,10,6,9,8,10,8,11,8); d.p('G',8,5,8,6,8,7,8,8,8,9,9,7,10,6,10,9); d.e(11,11,3.4,3.4,'y'); d.e(11,11,2,2,'Y'); d.p('N',11,10,11,11,11,12,12,10,12,12); }, { use: 'hold' });
