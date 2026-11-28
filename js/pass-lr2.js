import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('lr');
// Liberia · Nhóm 2: Con người và đời sống
const base = { o: '#2b1d3a', S: '#8f5f3e', s: '#b58059', x: '#3a2416' };
OUTM.lr_lappa = { map: M_DRESS, pal: { ...base, t: '#1f7a5a', T: '#ffd84d', u: '#1f7a5a', b: '#ffd84d', y: '#ffd84d', r: '#e8452c', w: '#ffffff', x: '#12503a' }, patch: [[11, 6, 'y'], [11, 9, 'r'], [12, 7, 'w'], [13, 8, 'y'], [15, 5, 'y'], [15, 8, 'r'], [15, 10, 'y'], [16, 6, 'w'], [16, 9, 'w'], [17, 4, 'y'], [17, 7, 'r'], [17, 11, 'y']] };
OUTM.lr_country = { map: M_DRESS, pal: { ...base, t: '#e8dcc0', T: '#2f4a7a', u: '#e8dcc0', b: '#2f4a7a', i: '#2f4a7a', n: '#8a6a3a', x: '#5a4a2a' }, patch: [[11, 6, 'i'], [11, 9, 'i'], [12, 6, 'i'], [12, 9, 'i'], [13, 6, 'i'], [13, 9, 'i'], [15, 5, 'i'], [15, 8, 'n'], [16, 5, 'i'], [16, 8, 'n'], [17, 5, 'i'], [17, 8, 'n'], [17, 11, 'i']] };
OUTM.lr_gown = { map: M_DRESS, pal: { ...base, t: '#2f6fb0', T: '#ffffff', u: '#2f6fb0', b: '#2f6fb0', y: '#ffd84d', w: '#ffffff', x: '#1f4a7a' }, patch: [[10, 6, 'w'], [10, 9, 'w'], [11, 6, 'y'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'y'], [12, 7, 'y'], [12, 8, 'y'], [13, 7, 'w'], [13, 8, 'w'], [17, 5, 'y'], [17, 7, 'w'], [17, 9, 'y']] };
OUTM.lr_modern = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#8a1f3d', u: '#ffffff', b: '#1b1030', p: '#2b2f4a', l: '#1b1030', r: '#8a1f3d', x: '#2b2b3a' }, patch: [[11, 7, 'r'], [11, 8, 'r'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'r']] };
OUTM.lr_uniform = { map: M_TOP, pal: { ...base, t: '#e8f0ff', T: '#2f4a8a', u: '#e8f0ff', b: '#2f4a8a', p: '#2f4a8a', l: '#1b1030', r: '#c0272d', y: '#ffd84d', x: '#2b2b3a' }, patch: [[11, 7, 'r'], [11, 8, 'r'], [12, 7, 'r'], [12, 5, 'y'], [13, 7, 'r']] };
Object.assign(OUT_KEY, { 'lr-lappa': 'lr_lappa', 'lr-country-cloth': 'lr_country', 'lr-gown': 'lr_gown', 'lr-western-clothes': 'lr_modern', 'lr-school-uniform': 'lr_uniform' });
Object.assign(SLOT_OF, { 'lr-lappa': 'outfit', 'lr-country-cloth': 'outfit', 'lr-gown': 'outfit', 'lr-western-clothes': 'outfit', 'lr-school-uniform': 'outfit', 'lr-headtie': 'head', 'lr-beads-cowrie': 'face', 'lr-bronze-bangles': 'face', 'lr-straw-hat': 'head' });
O['lr-headtie'] = { y0: -2, pal: { v: '#7a3fc0', y: '#ffd84d' }, rows: ['.....vv..vv.....', '....vvvvvvvv....', '...vvyvvvvyvv...', '..vvvvvyvvvvvv..', '..vyvvvvvvvyvv..', '..yyyyyyyyyyyy..'] };
O['lr-beads-cowrie'] = { y0: 9, pal: { r: '#e8452c', y: '#ffd84d', b: '#4a7be0', e: '#fff3d6' }, rows: ['....r......r....', '.....yrbbry.....', '....b......b....', '.....yreery.....'] };
O['lr-bronze-bangles'] = { y0: 13, pal: { y: '#c9a227', n: '#a8662a' }, rows: ['..yy........yy..', '..nn........nn..', '..yy........yy..'] };
O['lr-straw-hat'] = { y0: -1, pal: { t: '#e6c892', Y: '#c9a227', r: '#c0272d' }, rows: ['.....tttttt.....', '....tttttttt....', '....rrrrrrrr....', '.tttttttttttttt.', '..YYtttttttYYY..'] };


// ----- Trang phục -----
add(2, 'Trang phục', 'lr-lappa', 'Lappa (vải quấn)', 'Lappa wrap and suit', 'mảnh vải in hoa dài quấn quanh hông, là trang phục phụ nữ quen thuộc nhất. Người ta có thể may thành áo và váy cùng một loại vải để thành bộ "lappa suit" mặc khi đi nhà thờ hoặc dự tiệc.', null, { char: ['lr_lappa'], use: 'wear' });
add(2, 'Trang phục', 'lr-country-cloth', 'Vải bông dệt tay (country cloth)', 'Hand-woven country cloth', 'vải bông dệt tay thành từng dải hẹp rồi khâu lại. Loại vải này thường dành cho nghi lễ, trưởng lão và những dịp quan trọng.', null, { char: ['lr_country'], use: 'wear' });
add(2, 'Trang phục', 'lr-tie-dye', 'Vải nhuộm buộc (tie-dye) và "Kampala"', 'Tie-dye and Kampala cloth', 'vải bị buộc rồi nhuộm nhiều lần để ra hình và màu tự nhiên, gọi là "Kampala" ở Liberia. Nghề này thường do phụ nữ làm, bán ở chợ và cửa hàng nhỏ.',
  d => { d.r(2,2,12,12,'b'); d.e(5,5,2.4,2.4,'c'); d.e(5,5,1,1,'B'); d.e(11,11,2.4,2.4,'c'); d.e(11,11,1,1,'B'); d.e(11,4,1.8,1.8,'v'); d.p('w',11,4); d.e(4,11,1.8,1.8,'v'); d.p('w',4,11,8,8,7,8,8,7,9,8,8,9); d.r(2,14,12,1,'B'); for(let x=2;x<14;x+=2) d.p('b',x,15); }, { use: 'hold' });
add(2, 'Trang phục', 'lr-gown', 'Áo dài rộng (gown, buba)', 'Embroidered gown', 'áo rộng cổ và ngực thêu tay, dành cho cả nam và nữ. Mặc vào ngày lễ và đi nhà thờ, rất thoáng trong khí hậu ẩm.', null, { char: ['lr_gown'], use: 'wear' });
add(2, 'Trang phục', 'lr-western-clothes', 'Đồ âu phục kiểu phương Tây', 'Western-style clothes', 'váy, váy liền và áo sơ mi được nhiều người mặc đi làm hoặc đi học. Trang phục này phổ biến ở Monrovia, nhất là trong văn phòng và trường học.', null, { char: ['lr_modern'], use: 'wear' });
add(2, 'Trang phục', 'lr-school-uniform', 'Đồng phục học sinh', 'School uniform', 'học sinh ở nhiều trường mặc đồng phục đủ màu, khác nhau theo từng trường. Bộ đồ gọn, sạch là niềm tự hào của nhiều gia đình.', null, { char: ['lr_uniform'], use: 'wear' });
add(2, 'Trang phục', 'lr-society-regalia', 'Trang phục nghi lễ của các hội kín (Poro và Sande)', 'Poro and Sande regalia', 'gồm váy cỏ, mặt nạ và áo choàng riêng dùng trong lễ. Người ngoài thường không được xem chi tiết.',
  d => { d.e(8,5,3.4,4,'k'); d.r(6,5,5,1,'a'); d.p('a',8,7,7,8,9,8); d.p('y',5,1,6,0,10,0,11,1); d.tri(1,8,14,7,'Y'); for(let x=3;x<14;x+=2) d.l(8,9,x,15,'t'); d.r(4,9,9,1,'r'); d.p('N',4,12,12,13); }, { use: 'hold' });

// ----- Phụ kiện -----
add(2, 'Phụ kiện', 'lr-headtie', 'Khăn quấn đầu (headtie)', 'Headtie', 'khăn vải quấn gọn tóc, thường cùng màu với lappa. Phụ nữ quấn khác nhau tùy dịp và địa phương.',
  d => { d.e(8,11,3.2,4,'N'); d.p('k',6,10,10,10); d.p('m',7,13,8,13,9,13); d.r(3,4,11,4,'v'); d.e(8,4,5,2.4,'v'); d.e(5,2,2.4,1.8,'v'); d.e(11,2.5,2,1.8,'v'); d.p('y',4,5,7,3,10,5,12,6,6,7,9,6); d.r(3,8,11,1,'y'); }, { use: 'wear' });
add(2, 'Phụ kiện', 'lr-beads-cowrie', 'Vòng hạt cườm và vỏ ốc (beads và cowrie)', 'Beads and cowrie shells', 'chuỗi hạt thủy tinh, hạt gỗ và vỏ ốc được đeo làm trang sức và vật may mắn. Vỏ ốc từng là tiền tệ ở nhiều vùng Tây Phi.',
  d => { for(let i=0;i<=14;i++){ const a=Math.PI*i/14; d.p(['r','y','b','g'][i%4],Math.round(7.5+Math.cos(a)*6.5),Math.round(2+Math.sin(a)*8)); } for(const [x,y] of [[3,11],[8,13],[12,11]]){ d.e(x,y,1.4,2,'e'); d.p('n',x,y-1,x,y,x,y+1); } }, { use: 'wear' });
add(2, 'Phụ kiện', 'lr-bronze-bangles', 'Vòng tay và vòng chân bằng đồng', 'Bronze bangles and anklets', 'đồ trang sức kim loại đúc thủ công, thể hiện địa vị và sự giàu có trong một số cộng đồng. Người ta còn đeo trong các điệu múa.',
  d => { d.e(6,6,4.4,4.4,'O'); d.e(6,6,3,3,'_'); d.e(10,10,4.4,4.4,'Y'); d.e(10,10,3,3,'_'); d.p('y',4,3,3,4,12,8,13,9); d.p('N',9,5,10,6,6,12); d.e(12,3,2,2,'O'); d.e(12,3,.9,.9,'_'); }, { use: 'wear' });
add(2, 'Phụ kiện', 'lr-straw-hat', 'Mũ rơm và mũ cói', 'Straw and raffia hats', 'mũ đan bằng sợi cây, che nắng cho người làm ruộng. Một số trưởng lão đội mũ riêng khi họp làng.',
  d => { d.e(8,11,7.4,2.6,'t'); d.e(8,8,4,3.6,'t'); d.r(4,9,8,1,'r'); d.p('Y',6,6,8,5,10,7,3,11,6,12,10,12,13,11); d.p('n',5,7,11,8,2,10); }, { use: 'wear' });
add(2, 'Phụ kiện', 'lr-elder-staff', 'Trượng và gậy của trưởng lão', 'Elder\'s staff', 'gậy gỗ chạm khắc là biểu tượng của quyền uy và sự tôn trọng. Khi người già đến, mọi người thường nhường chỗ.',
  d => { d.r(7,5,2,11,'n'); d.p('N',7,7,8,9,7,11,8,13); d.e(8,3,2.6,2.6,'N'); d.p('t',7,3,9,3); d.p('t',8,4); d.r(6,6,4,1,'y'); d.r(6,10,4,1,'y'); d.r(6,15,4,1,'N'); }, { use: 'hold' });
add(2, 'Phụ kiện', 'lr-gold-watch', 'Đồ vàng, đồ bạc và đồng hồ', 'Gold, silver and watches', 'những món trang sức được nhiều người ở thành phố đeo trong ngày quan trọng. Những món đồ đắt tiền thường được giữ gìn.',
  d => { d.r(6,1,4,14,'N'); d.e(8,8,4.4,4.4,'y'); d.e(8,8,3.2,3.2,'w'); d.p('k',8,8,8,7,8,6,9,8,10,8); d.p('y',13,8); d.e(2.5,4,2,2,'a'); d.e(2.5,4,.9,.9,'_'); d.e(13,13,2,2,'y'); d.e(13,13,.9,.9,'_'); d.p('w',13,2,2,13); }, { use: 'hold' });

// ----- Nhà ở -----
add(2, 'Nhà ở', 'lr-round-mud-house', 'Nhà đất tròn mái lá (round mud house)', 'Round mud house', 'tường đắp bằng đất sét, mái lợp bằng cọ hoặc rơm, thường thấy ở làng quê. Mái dốc giúp nước mưa chảy nhanh trong mùa mưa.',
  d => { d.bg('c'); d.r(0,13,16,3,'O'); d.r(3,8,10,6,'n'); d.tri(1,1,14,7,'Y'); d.p('O',4,6,6,5,8,3,10,5,12,6,7,7,9,7); d.r(7,10,3,4,'N'); d.p('t',4,10,11,10,4,12); d.p('G',1,12,14,12); }, SC);
add(2, 'Nhà ở', 'lr-zinc-roof-house', 'Nhà gạch mái tôn (zinc roof house)', 'Zinc roof house', 'loại nhà phổ biến nhất ở thị trấn và ngoại ô. Mái tôn bền nhưng phát tiếng ồn rất lớn khi mưa đổ.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(2,7,12,7,'e'); d.tri(1,2,14,5,'a'); for(let x=3;x<14;x+=2) d.r(x,4,1,3,'A'); d.r(4,9,2,2,'B'); d.r(10,9,2,2,'B'); d.r(7,10,2,4,'N'); d.p('c',3,1,4,2,12,1,13,2); }, SC);
add(2, 'Nhà ở', 'lr-americo-house', 'Nhà gỗ kiểu cổ của người Americo-Liberian', 'Old Americo-Liberian wooden house', 'những ngôi nhà gỗ hai tầng có hiên rộng, dựa theo kiểu nhà miền Nam nước Mỹ thế kỷ 19. Nhiều ngôi còn sót lại ở Monrovia và Harper.',
  d => { d.bg('c'); d.r(0,14,16,2,'g'); d.r(2,4,12,10,'w'); d.tri(1,1,14,3,'k'); d.r(1,8,14,1,'a'); for(let x=2;x<15;x+=3){ d.r(x,4,1,10,'a'); } for(const x of [3,6,9,12]){ d.r(x,5,2,3,'B'); d.r(x,10,2,3,'B'); } d.r(7,10,2,4,'N'); d.p('k',2,7,4,7,7,7,10,7,13,7); }, SC);
add(2, 'Nhà ở', 'lr-palaver-hut', 'Nhà họp làng (palaver hut)', 'Palaver hut', 'nhà mái lớn không tường ở giữa làng, nơi trưởng lão bàn việc và xử tranh chấp. Từ "palaver" nghĩa là cuộc bàn bạc dài.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.tri(0,1,16,7,'Y'); d.p('O',4,6,7,4,9,3,12,6); for(const x of [2,8,13]) d.r(x,8,1,5,'n'); for(const [x,c] of [[4,'r'],[6,'b'],[10,'w'],[11,'g']]){ d.p('N',x,10); d.p(c,x,11,x,12); } }, SC);
add(2, 'Nhà ở', 'lr-outdoor-kitchen', 'Bếp ngoài trời', 'Outdoor kitchen', 'nhiều gia đình nấu ăn ở sân sau, tránh khói và nóng trong nhà. Mùa mưa họ dựng tạm mái che.',
  d => { d.bg('c'); d.r(0,13,16,3,'O'); d.r(1,3,14,2,'a'); d.r(2,5,1,8,'N'); d.r(13,5,1,8,'N'); d.r(6,9,5,3,'k'); d.r(5,8,7,1,'A'); d.p('o',7,13,8,12,9,13); d.p('y',8,13); d.e(4,8,1.2,1.2,'N'); d.r(3,9,3,4,'p'); d.p('l',8,7,9,6,8,5); }, SC);
add(2, 'Nhà ở', 'lr-plantation-quarters', 'Khu nhà người làm ở đồn điền cao su', 'Rubber plantation quarters', 'những dãy nhà nhỏ cho công nhân ở gần đồn điền. Một số đồn điền lớn có trường học và trạm y tế riêng.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(1,8,14,5,'u'); d.tri(0,5,8,3,'r'); d.tri(8,5,8,3,'r'); for(let x=2;x<15;x+=3){ d.r(x,10,1,3,'N'); d.p('B',x+1,9); } for(const x of [1,7,14]){ d.r(x,1,1,4,'a'); d.e(x+.5,1.5,1.8,1.6,'G'); } }, SC);

// ----- Đồ dùng -----
add(2, 'Đồ dùng', 'lr-mortar-pestle', 'Cối và chày gỗ (mortar and pestle)', 'Mortar and pestle', 'dụng cụ giã gạo, giã sắn làm bột cho các món ăn. Tiếng giã nhịp nhàng buổi sáng là âm thanh quen thuộc ở làng.',
  d => { d.r(4,8,7,2,'N'); d.r(5,10,5,4,'n'); d.r(4,14,7,2,'N'); d.p('t',6,11,8,12); d.r(5,7,5,1,'w'); d.l(10,1,7,8,'t'); d.l(11,1,8,8,'n'); d.p('N',10,1,11,0,12,1); }, { use: 'hold' });
add(2, 'Đồ dùng', 'lr-coal-pot', 'Nồi sắt và bếp than (coal pot)', 'Iron pot on a coal pot', 'nồi sắt đặt trên bếp than để hầm cá và canh. Nhiều gia đình dùng than vì rẻ và dễ mua.',
  d => { d.r(4,4,8,5,'k'); d.r(3,4,10,1,'K'); d.p('A',7,2,8,2,8,3); d.p('a',5,6,5,7); d.r(2,10,12,3,'A'); d.r(3,13,10,1,'K'); for(const x of [4,7,10]){ d.p('o',x,10,x+1,10); d.p('r',x,11); d.p('y',x+1,9); } d.p('K',3,14,3,15,12,14,12,15); }, { use: 'hold' });
add(2, 'Đồ dùng', 'lr-cutlass', 'Dao rựa (cutlass)', 'Cutlass', 'lưỡi dao dài dùng để đốn cây, phát cỏ và chẻ thức ăn. Mỗi người đàn ông làm nông đều có một con dao.',
  d => { d.l(2,12,11,3,'a'); d.l(3,12,13,2,'l'); d.l(3,13,13,3,'a'); d.l(4,13,12,5,'a'); d.p('a',13,1,14,2); d.l(1,14,3,12,'N'); d.l(2,15,4,13,'n'); d.p('y',3,11,5,13); }, { use: 'hold' });
add(2, 'Đồ dùng', 'lr-woven-baskets', 'Rổ và thúng đan', 'Woven baskets', 'đan từ mây, tre và cọ, dùng đựng gạo, cá và rau quả. Người phụ nữ mang trên đầu khi đi chợ.',
  d => { d.r(2,8,12,6,'t'); d.r(3,14,10,1,'n'); for(let y=9;y<14;y+=2) for(let x=2+(y%4?1:0);x<14;x+=2) d.p('n',x,y); d.r(1,7,14,1,'N'); for(const [x,c] of [[4,'g'],[7,'e'],[10,'o'],[12,'G']]) d.e(x,5.5,1.4,1.6,c); d.p('N',4,3,12,3); }, { use: 'hold' });
add(2, 'Đồ dùng', 'lr-pen-pen-keh-keh', 'Xe mô tô "pen-pen" và xe ba bánh "keh-keh"', 'Pen-pen and keh-keh taxis', 'hai phương tiện chở khách phổ biến ở thành phố và thị trấn. Xe ba bánh mái che giúp tránh nắng mưa.',
  d => { d.r(2,4,11,2,'y'); d.r(3,6,1,4,'k'); d.r(11,6,1,4,'k'); d.r(2,9,11,3,'r'); d.r(4,7,3,2,'c'); d.e(4,13,1.8,1.8,'k'); d.e(11,13,1.8,1.8,'k'); d.p('a',4,13,11,13); d.l(12,9,14,12,'a'); d.p('y',13,9); d.p('N',9,6,9,7); d.p('b',9,8); }, { use: 'hold' });
add(2, 'Đồ dùng', 'lr-liberian-dollar', 'Đồng đô la Liberia (Liberian dollar)', 'Liberian dollar', 'tiền bản địa dùng song song với đô la Mỹ trong đời sống. Người dân thường dùng cả hai loại khi trả tiền.',
  d => { d.r(1,4,12,7,'g'); d.r(2,5,10,5,'h'); d.e(5,7.5,1.8,2,'N'); d.p('G',9,5,9,6,9,7,9,8,9,9,10,9); d.p('G',8,6,11,6); d.e(11,11,3.4,3.4,'y'); d.e(11,11,2,2,'Y'); d.p('N',11,10,10,11,11,11,12,11,11,12); }, { use: 'hold' });
add(2, 'Đồ dùng', 'lr-lamp-generator', 'Đèn dầu và máy phát điện nhỏ', 'Lamp and small generator', 'nhiều nơi điện lưới còn thiếu, nên gia đình dùng đèn dầu, đèn pin mặt trời hoặc máy phát. Các quán nhỏ cho sạc điện thoại để kiếm thêm thu nhập.',
  d => { d.r(2,5,4,2,'A'); d.r(3,7,2,4,'y'); d.p('o',3,8,4,9); d.r(2,11,4,2,'A'); d.p('a',3,3,4,3,2,4,5,4); d.r(8,8,7,6,'r'); d.r(9,6,5,2,'k'); d.r(9,10,3,2,'a'); d.p('y',13,10); d.p('k',9,14,10,14,13,14,14,14); d.l(11,5,9,2,'k'); }, { use: 'hold' });
