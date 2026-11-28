import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('mg');
// Madagascar · Nhóm 2: Con người và đời sống
const base = { o: '#2b1d3a', S: '#b9835c', s: '#d9a57c', x: '#5a3a1a' };
OUTM.mg_lamba = { map: M_DRESS, pal: { ...base, t: '#f7f3e8', T: '#c0272d', u: '#f7f3e8', b: '#c0272d', w: '#ffffff', r: '#c0272d', x: '#7a5230' }, patch: [[11, 5, 'r'], [11, 6, 'w'], [12, 6, 'r'], [12, 7, 'w'], [13, 7, 'r'], [13, 8, 'w'], [14, 8, 'r'], [14, 9, 'w'], [15, 9, 'r'], [16, 10, 'r'], [17, 4, 'r'], [17, 6, 'r'], [17, 8, 'r'], [17, 10, 'r']] };
OUTM.mg_akoto = { map: M_DRESS, pal: { ...base, t: '#8a1f3d', T: '#ffd84d', u: '#8a1f3d', b: '#2f7d3a', y: '#ffd84d', g: '#5fb85a', w: '#ffffff', x: '#5a1a2a' }, patch: [[11, 7, 'y'], [11, 8, 'y'], [12, 5, 'g'], [12, 10, 'g'], [13, 7, 'w'], [13, 8, 'w'], [15, 4, 'y'], [15, 6, 'w'], [15, 8, 'y'], [15, 10, 'w'], [16, 5, 'g'], [16, 7, 'y'], [16, 9, 'g'], [17, 4, 'y'], [17, 7, 'w'], [17, 11, 'y']] };
OUTM.mg_landy = { map: M_DRESS, pal: { ...base, t: '#e8d8b0', T: '#a88a5a', u: '#e8d8b0', b: '#a88a5a', n: '#8a6a3a', w: '#fff7e0', x: '#8a6a3a' }, patch: [[11, 5, 'w'], [12, 6, 'n'], [13, 7, 'w'], [14, 8, 'n'], [15, 5, 'n'], [15, 9, 'w'], [16, 7, 'n'], [17, 4, 'n'], [17, 6, 'w'], [17, 9, 'n'], [17, 11, 'w']] };
OUTM.mg_hoany = { map: M_DRESS, pal: { ...base, t: '#2f6fb0', T: '#ffd84d', u: '#2f6fb0', b: '#ffd84d', y: '#ffd84d', w: '#ffffff', r: '#e8452c', x: '#1f4a7a' }, patch: [[12, 6, 'r'], [12, 9, 'y'], [13, 7, 'w'], [15, 4, 'w'], [15, 5, 'w'], [15, 7, 'r'], [15, 10, 'w'], [16, 6, 'y'], [16, 9, 'r'], [17, 4, 'w'], [17, 6, 'w'], [17, 8, 'w'], [17, 10, 'w']] };
OUTM.mg_salovana = { map: M_DRESS, pal: { ...base, t: '#e8452c', T: '#ffd84d', u: '#f7f3e8', b: '#1b1030', w: '#ffffff', y: '#ffd84d', g: '#5fb85a', x: '#7a1a2a' }, patch: [[11, 5, 'w'], [11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [11, 10, 'w'], [12, 6, 'w'], [12, 9, 'w'], [15, 6, 'y'], [16, 8, 'g'], [16, 5, 'y'], [17, 9, 'y']] };
OUTM.mg_modern = { map: M_TOP, pal: { ...base, t: '#ffffff', T: '#2f6fb0', u: '#ffffff', b: '#1b1030', p: '#2f4a8a', l: '#ffffff', r: '#c0272d', g: '#2f7d3a', x: '#2b2b3a' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'g'], [13, 8, 'g']] };
Object.assign(OUT_KEY, { 'mg-lamba': 'mg_lamba', 'mg-akotofahana': 'mg_akoto', 'mg-landy': 'mg_landy', 'mg-lamba-hoany': 'mg_hoany', 'mg-salovana': 'mg_salovana', 'mg-modern-clothes': 'mg_modern' });
Object.assign(SLOT_OF, { 'mg-lamba': 'outfit', 'mg-akotofahana': 'outfit', 'mg-landy': 'outfit', 'mg-lamba-hoany': 'outfit', 'mg-salovana': 'outfit', 'mg-modern-clothes': 'outfit', 'mg-satroka': 'head', 'mg-masonjoany': 'face', 'mg-silver-jewelry': 'face', 'mg-beads': 'face', 'mg-braids': 'head', 'mg-headscarf': 'head', 'mg-flip-flops': 'feet' });
O['mg-satroka'] = { y0: -1, pal: { t: '#e6c892', Y: '#c9a227', n: '#8a5a2a' }, rows: ['.....tttttt.....', '....tttttttt....', '....nnnnnnnn....', '.tttttttttttttt.', '..YYtttttttYYY..'] };
O['mg-masonjoany'] = { y0: 6, pal: { y: '#f2d36b', u: '#ffe9a8' }, rows: ['.......y........', '....y..u..y.....', '................', '...yy......yy...'] };
O['mg-silver-jewelry'] = { y0: 9, pal: { a: '#9aa4c4', l: '#dfe6ff' }, rows: ['.....a....a.....', '......al.la.....', '.......ala......', '.......lll......'] };
O['mg-beads'] = { y0: 9, pal: { r: '#e8452c', y: '#ffd84d', b: '#4a7be0', g: '#5fb85a', w: '#ffffff' }, rows: ['....r......g....', '.....y....b.....', '......brwgy.....', '....w......r....', '.....gybrw......'] };
O['mg-braids'] = { y0: 0, pal: { k: '#1b1030', y: '#ffd84d' }, rows: ['....kkkkkkkk....', '...kkkkkkkkkk...', '..k.k.k..k.k.k..', '..k..........k..', '..k..........k..', '..k..........k..', '..k..........k..', '..y..........y..'] };
O['mg-headscarf'] = { y0: -1, pal: { r: '#c0272d', y: '#ffd84d', R: '#8a1f1a' }, rows: ['.....rrrrrr.....', '...rrryrrryrr...', '..rrrrrrrrrrrr..', '..RyyyyyyyyyyR..', '............rr..', '............r...'] };
O['mg-flip-flops'] = { y0: 19, pal: { b: '#4a7be0', w: '#ffffff', B: '#23306b' }, rows: ['..bwwb....bwwb..', '.bbbbbb..bbbbbb.', '.BBBBBB..BBBBBB.'] };


// ----- Trang phục -----
add(2, 'Trang phục', 'mg-lamba', 'Lamba (tấm vải quấn)', 'Lamba wrap', 'tấm vải hình chữ nhật quấn quanh vai hoặc eo, cả nam lẫn nữ đều dùng. Người ta khoác khi trời lạnh, địu con, che nắng, và còn là món quà quan trọng trong các dịp lễ.', null, { char: ['mg_lamba'], use: 'wear' });
add(2, 'Trang phục', 'mg-akotofahana', 'Lamba akotofahana', 'Lamba akotofahana', 'loại lamba dệt tay cầu kỳ của vùng cao nguyên Merina, có hoa văn nổi nhiều màu. Một tấm có thể mất rất nhiều ngày làm, nên thường được coi là vật quý.', null, { char: ['mg_akoto'], use: 'wear' });
add(2, 'Trang phục', 'mg-landy', 'Lamba landy', 'Silk lamba', 'lamba dệt từ sợi tơ, tiếng Malagasy "landy" nghĩa là tơ. Nghề dệt tơ gắn với cao nguyên và vùng Betsileo.', null, { char: ['mg_landy'], use: 'wear' });
add(2, 'Trang phục', 'mg-lamba-mena', 'Lamba mena (vải liệm đỏ)', 'Lamba mena', 'tấm vải màu đỏ dùng để bọc thi hài trong lễ famadihana (lễ trở xương, sẽ nói ở Nhóm 4). Màu đỏ ở đây gắn với sự bền vững và tổ tiên.',
  d => { d.r(2,4,12,9,'R'); d.r(2,4,12,1,'m'); d.p('m',5,5,5,6,5,7,5,8,5,9,10,7,10,8,10,9,10,10,10,11); d.p('y',3,6,7,10,12,6,7,5,12,11); d.r(2,13,12,1,'m'); for(let x=2;x<14;x+=2) d.p('R',x,14); }, { use: 'hold' });
add(2, 'Trang phục', 'mg-lamba-hoany', 'Lamba hoany', 'Printed lamba hoany', 'vải cotton in hoa văn nhiều màu, thường có dòng chữ ngắn như câu tục ngữ hay lời nhắn. Loại vải này phổ biến ở vùng ven biển phía tây và bắc.', null, { char: ['mg_hoany'], use: 'wear' });
add(2, 'Trang phục', 'mg-salovana', 'Salovana', 'Salovana wrap skirt', 'váy quấn dài của phụ nữ vùng ven biển, mặc hằng ngày. Dễ mặc, nhẹ và hợp khí hậu nóng.', null, { char: ['mg_salovana'], use: 'wear' });
add(2, 'Trang phục', 'mg-satroka', 'Satroka (mũ rơm)', 'Straw hat', 'mũ đan từ rơm hoặc sợi cọ, nhiều người ở cao nguyên đội khi làm ruộng và đi chợ. Mũ có vành rộng để chắn nắng.',
  d => { d.e(8,10,7.5,2.4,'t'); d.e(8,7,4,3.4,'t'); d.r(4,8,8,1,'N'); d.p('Y',6,5,8,4,10,6,3,10,6,11,10,11,13,10); d.p('r',11,8,12,9); }, { use: 'wear' });
add(2, 'Trang phục', 'mg-modern-clothes', 'Quần áo hiện đại', 'Modern clothes', 'ở các thành phố, người dân mặc áo sơ mi, váy, quần jeans như nhiều nơi khác. Lamba vẫn được khoác thêm khi đi lễ hoặc về quê.', null, { char: ['mg_modern'], use: 'wear' });

// ----- Phụ kiện -----
add(2, 'Phụ kiện', 'mg-masonjoany', 'Masonjoany (bột gỗ bôi mặt)', 'Masonjoany face paint', 'phụ nữ vùng Sakalava và Nosy Be bôi bột gỗ nghiền nhuyễn lên mặt. Lớp bột vừa để làm đẹp, vừa giúp chống nắng và làm dịu da.',
  d => { d.e(8,8,5,6,'N'); d.p('y',5,7,6,6,7,7,9,7,10,6,11,7,8,4,8,5,6,10,10,10,5,9,11,9); d.p('u',4,10,12,10,8,3); d.p('k',6,8,10,8); d.p('m',7,12,8,12,9,12); }, { use: 'wear' });
add(2, 'Phụ kiện', 'mg-silver-jewelry', 'Trang sức bạc', 'Silver jewellery', 'nhẫn, vòng tay và khuyên tai bạc là món quen thuộc ở nhiều vùng. Bạc thường được truyền lại trong gia đình.',
  d => { d.e(8,8,6,6,'a'); d.e(8,8,4.4,4.4,'_'); d.p('w',4,4,3,6,5,3,12,12); d.e(8,13,2,2,'l'); d.e(8,13,0.8,0.8,'a'); d.p('A',13,8,12,5); d.p('l',2,2,3,2,13,2,14,2); }, { use: 'wear' });
add(2, 'Phụ kiện', 'mg-beads', 'Vòng hạt cườm', 'Bead necklaces', 'chuỗi hạt nhiều màu đeo ở cổ và cổ tay, phổ biến ở vùng nam và tây. Màu sắc của hạt có thể khác nhau theo nhóm dân tộc.',
  d => { for(let i=0;i<14;i++){ const a=Math.PI*(i/13); const c=['r','y','b','g','w','o','v'][i%7]; d.p(c,Math.round(7.5+Math.cos(a)*6),Math.round(3+Math.sin(a)*9)); d.p(c,Math.round(7.5+Math.cos(a)*4),Math.round(2+Math.sin(a)*6)); } d.p('y',7,13,8,13,7,14,8,14); }, { use: 'wear' });
add(2, 'Phụ kiện', 'mg-braids', 'Kiểu tóc tết nhỏ', 'Small braids', 'nhiều phụ nữ vùng ven biển tết tóc thành nhiều bím nhỏ sát da đầu. Kiểu tóc này vừa mát, vừa gọn khi làm việc.',
  d => { d.e(8,6,5,4.5,'k'); d.r(5,5,6,6,'N'); d.p('k',6,7,10,7); d.p('m',7,9,8,9); for(let x=3;x<14;x+=2){ for(let y=x<5||x>11?6:2;y<(x<5||x>11?15:5);y+=2) d.p('k',x,y,x,y+1); d.p('y',x,x<5||x>11?14:2); } }, { use: 'wear' });
add(2, 'Phụ kiện', 'mg-headscarf', 'Khăn quấn đầu', 'Head scarf', 'một tấm lamba nhỏ được quấn quanh đầu khi làm việc ngoài nắng hoặc khi trời gió. Cách quấn khác nhau tùy từng vùng.',
  d => { d.e(8,7,6,5,'r'); d.r(2,7,12,3,'r'); d.r(3,9,10,2,'y'); d.p('y',5,4,8,3,11,5,7,6,10,7); d.p('r',13,10,14,11,14,12,13,13); d.p('R',4,6,9,5); }, { use: 'wear' });
add(2, 'Phụ kiện', 'mg-sapphire', 'Đá quý Ilakaka', 'Ilakaka sapphire', 'vùng Ilakaka ở miền nam nổi tiếng từ cuối những năm 1990 vì có sapphire (ngọc bích xanh). Trang sức đá quý hiện được bán ở các thành phố lớn.',
  d => { d.tri(3,3,11,5,'b'); d.dtri(2,8,13,6,'B'); d.r(4,6,9,2,'b'); d.p('c',6,5,7,4,8,4,6,6,7,9); d.p('w',6,4,5,7); d.p('B',10,6,11,7,9,10); d.p('w',2,2,1,3,3,3,2,4,13,12,14,13); }, { use: 'hold' });
add(2, 'Phụ kiện', 'mg-flip-flops', 'Dép xỏ ngón', 'Flip-flops', 'loại dép nhựa hoặc cao su rẻ, đi được cả trong mưa và trên đường đất. Nhiều người dùng hằng ngày.',
  d => { d.e(4.5,9,2.8,5.5,'b'); d.e(11.5,9,2.8,5.5,'b'); d.p('w',4,5,3,7,5,7,11,5,10,7,12,7,4,6,11,6); d.p('c',4,11,11,11,4,12,11,12); }, { use: 'wear' });

// ----- Nhà ở -----
add(2, 'Nhà ở', 'mg-brick-house', 'Nhà gạch đỏ ở cao nguyên', 'Red brick highland house', 'nhà hai, ba tầng xây bằng gạch nung từ đất đỏ, có hiên gỗ và mái ngói hay mái tôn. Đây là hình ảnh quen thuộc quanh Antananarivo và Antsirabe.',
  d => { d.bg('c'); d.r(0,14,16,2,'g'); d.r(2,5,12,9,'O'); d.tri(1,1,14,4,'N'); for(let y=6;y<14;y+=2) for(let x=2+(y%4?1:0);x<14;x+=3) d.p('R',x,y); d.r(4,6,2,2,'e'); d.r(10,6,2,2,'e'); d.r(1,9,14,1,'n'); for(let x=2;x<15;x+=3) d.r(x,10,1,4,'n'); d.r(7,11,2,3,'k'); }, SC);
add(2, 'Nhà ở', 'mg-merina-house', 'Nhà truyền thống Merina', 'Traditional Merina house', 'nhà gỗ mái nhọn, có một cột chính ở giữa gọi là andry. Cột này gắn với sự vững chãi của gia đình và nơi thờ cúng.',
  d => { d.bg('c'); d.r(0,14,16,2,'O'); d.r(3,8,10,6,'n'); d.tri(2,2,12,6,'N'); d.l(6,0,10,4,'N'); d.l(10,0,6,4,'N'); d.r(7,10,2,4,'k'); d.p('N',4,9,4,10,4,11,4,12,11,9,11,10,11,11,11,12); d.p('y',5,10); d.p('t',2,13,13,13); }, SC);
add(2, 'Nhà ở', 'mg-zafimaniry-house', 'Nhà Zafimaniry', 'Zafimaniry house', 'ngôi nhà gỗ trong rừng cao nguyên miền đông nam, các mối nối bằng chốt gỗ, trang trí hoa văn hình học chạm tay. UNESCO ghi nhận tri thức chạm gỗ của người Zafimaniry năm 2008 (đã được tôn vinh từ 2003).',
  d => { d.bg('G'); d.r(0,14,16,2,'n'); d.r(2,6,12,8,'N'); d.tri(0,1,16,5,'k'); d.p('t',4,8,5,9,6,8,5,7,10,8,11,9,12,8,11,7); d.r(7,9,3,5,'n'); d.p('t',8,10,7,11,9,11,8,12); for(let x=2;x<14;x+=2) d.p('t',x,13); d.p('g',1,3,14,4); }, SC);
add(2, 'Nhà ở', 'mg-ravinala-house', 'Nhà lá ravinala ở bờ đông', 'Ravinala leaf house', 'nhà nâng cao khỏi mặt đất, vách và mái làm từ lá và thân cây ravinala hoặc tre. Dễ xây từ vật liệu có sẵn ở rừng.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); for(const x of [3,7,12]) d.r(x,11,1,4,'N'); d.r(2,6,12,5,'t'); for(let x=3;x<14;x+=2) d.r(x,6,1,5,'n'); d.tri(0,1,16,5,'Y'); d.p('O',4,4,7,3,10,5,12,4); d.r(7,8,2,3,'k'); d.l(7,11,6,14,'n'); }, SC);
add(2, 'Nhà ở', 'mg-mud-house', 'Nhà đất và rào xương rồng ở miền nam', 'Mud house with cactus fence', 'nhà thấp, vách đất hoặc cành khô, bao quanh bằng hàng rào xương rồng để giữ gia súc. Vùng này khô, ít cây gỗ lớn.',
  d => { d.bg('u'); d.r(0,13,16,3,'O'); d.r(4,7,8,6,'n'); d.tri(3,3,10,4,'t'); d.r(7,9,2,4,'k'); for(const x of [0,2,13,15]){ d.r(x,9,1,5,'G'); d.p('g',x,8); } d.p('r',0,8,15,8); d.p('N',5,8,10,11); }, SC);
add(2, 'Nhà ở', 'mg-vezo-house', 'Nhà ven biển của người Vezo', 'Vezo seaside house', 'nhà đơn giản làm từ lá cọ, gần bờ và gần thuyền. Gia đình sống chủ yếu nhờ biển.',
  d => { d.bg('c'); d.r(0,9,16,3,'C'); d.r(0,12,16,4,'u'); d.r(2,7,7,6,'t'); d.tri(1,3,9,4,'n'); d.r(4,9,2,4,'N'); d.r(9,12,7,2,'N'); d.r(12,6,1,6,'n'); d.tri(10,6,5,5,'w'); d.p('r',3,14,4,14); d.p('w',12,10); }, SC);
add(2, 'Nhà ở', 'mg-family-tomb', 'Lăng mộ gia đình', 'Family tomb', 'ở nhiều vùng, mộ tổ tiên xây bằng đá hoặc bê tông, to và bền hơn nhà của người sống. Đây là nơi gia đình tụ họp trong các nghi lễ.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(2,7,12,7,'a'); d.r(1,6,14,1,'A'); d.r(4,4,8,2,'w'); d.r(6,9,4,5,'k'); d.r(7,10,2,4,'A'); for(const x of [3,12]){ d.r(x,1,1,5,'N'); d.p('N',x-1,2,x+1,2); d.p('w',x-1,1,x+1,1); } d.p('y',8,5); }, SC);

// ----- Đồ dùng và thủ công -----
add(2, 'Đồ dùng và thủ công', 'mg-antaimoro', 'Giấy Antaimoro', 'Antaimoro paper', 'giấy thủ công làm từ vỏ cây avoha, ép thêm hoa lá khô để trang trí. Nghề này gắn với miền đông nam, và nay có xưởng làm giấy ở Ambalavao để du khách tham quan.',
  d => { d.r(2,2,12,12,'e'); d.r(2,2,12,1,'W'); for(const [x,y,c] of [[5,5,'r'],[11,6,'v'],[6,11,'o'],[10,11,'p']]){ d.p(c,x,y-1,x-1,y,x+1,y,x,y+1); d.p('y',x,y); d.p('g',x+1,y+1); } d.p('n',3,8,8,3,12,9,8,8,13,13,4,13); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-raffia', 'Đồ đan raffia', 'Raffia basketry', 'cọ raffia được đan thành giỏ, túi, mũ và thảm. Madagascar là một trong những nơi xuất khẩu raffia lớn.',
  d => { d.r(2,7,12,8,'t'); for(let y=8;y<15;y+=2) for(let x=2+(y%4?1:0);x<14;x+=2) d.p('Y',x,y); d.r(2,9,12,2,'r'); for(let x=3;x<13;x+=3) d.p('y',x,9,x+1,10); d.fan(8,7,5,'N'); d.fan(8,7,4,'_'); d.r(2,7,12,1,'n'); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-pousse-pousse', 'Xe kéo pousse-pousse', 'Pousse-pousse rickshaw', 'xe kéo tay hai bánh, phổ biến ở Antsirabe. Một số nơi còn dùng như phương tiện chở khách.',
  d => { d.r(3,6,7,4,'r'); d.r(2,3,8,2,'b'); d.r(3,5,1,1,'k'); d.r(9,5,1,1,'k'); d.e(6.5,11.5,3.2,3.2,'k'); d.e(6.5,11.5,2,2,'a'); d.p('k',6,11); d.l(10,9,15,8,'N'); d.e(12.5,5,1.2,1.2,'N'); d.r(12,6,2,5,'y'); d.p('k',11,12,14,12,12,11,13,11); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-taxi-brousse', 'Taxi-brousse', 'Taxi-brousse minibus', 'xe buýt nhỏ liên tỉnh, thường chở rất đông người và hàng hóa. Đây là phương tiện đi lại chính của nhiều người.',
  d => { d.r(1,6,14,7,'w'); d.r(1,9,14,2,'b'); for(let x=3;x<13;x+=3) d.r(x,7,2,2,'c'); d.r(12,7,3,2,'C'); d.e(4,13,1.8,1.8,'k'); d.e(12,13,1.8,1.8,'k'); d.p('a',4,13,12,13); for(const [x,c] of [[2,'r'],[5,'g'],[8,'n'],[11,'y']]) d.r(x,3,3,3,c); d.r(1,5,14,1,'k'); d.p('y',15,11); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-ox-cart', 'Xe bò zebu', 'Zebu cart', 'xe do bò zebu kéo chở lúa, củi và người ở nông thôn. Bò zebu còn là tài sản quan trọng của nhiều gia đình.',
  d => { d.r(1,7,7,3,'n'); d.r(2,5,5,2,'y'); d.p('Y',3,4,4,4,5,4); d.e(4,12,2.6,2.6,'N'); d.p('t',4,12); d.l(8,9,10,9,'N'); d.e(12,9,2.4,1.8,'N'); d.r(13,6,2,3,'N'); d.p('w',12,4,13,5,15,4,15,5); d.p('N',12,6); d.p('k',11,11,11,12,13,11,13,12,14,7); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-pirogue', 'Thuyền độc mộc có phao phụ (pirogue)', 'Outrigger pirogue', 'thuyền khoét từ thân gỗ, có thanh phao giữ thăng bằng. Ngư dân Vezo dùng loại thuyền này để đi biển và đánh cá.',
  d => { d.r(1,10,14,2,'n'); d.p('n',0,9,15,9); d.r(3,12,10,1,'N'); d.r(2,14,11,1,'N'); d.l(5,11,4,14,'t'); d.l(11,11,10,14,'t'); d.r(7,1,1,9,'N'); d.tri(4,1,10,8,'w'); d.p('r',9,5,10,6,9,6); d.p('b',1,13,14,13); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-zebu-horn', 'Đồ thủ công từ sừng zebu', 'Zebu horn crafts', 'sừng bò được mài, đánh bóng thành thìa, lược và đồ trang trí. Nhiều món được bán cho du khách.',
  d => { d.p('N',2,13,2,12,2,11); d.l(2,10,5,4,'N'); d.l(3,11,7,4,'n'); d.l(5,4,9,2,'k'); d.l(4,8,8,3,'n'); d.e(12,5,2.4,3,'n'); d.e(12,5,1.2,1.8,'t'); d.l(12,8,12,14,'n'); d.r(5,11,5,1,'N'); for(let x=5;x<10;x+=2) d.p('N',x,12,x,13,x,14); d.p('w',3,10,11,3); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'mg-wood-carving', 'Đồ gỗ chạm tay', 'Carved wooden crafts', 'tượng, hộp, bàn ghế chạm từ gỗ, tiêu biểu là sản phẩm của vùng Zafimaniry và Ambositra. Hoa văn thường là các hình học đều đặn.',
  d => { d.r(3,4,10,10,'n'); d.r(3,3,10,1,'N'); d.r(3,14,10,1,'N'); d.p('t',8,5,7,6,9,6,6,7,10,7,7,8,9,8,8,9); d.p('N',8,7,4,5,5,6,4,7,12,5,11,6,12,7); for(let x=4;x<13;x+=2) d.p('t',x,11,x+1,12); d.r(5,1,6,2,'N'); }, { use: 'hold' });
