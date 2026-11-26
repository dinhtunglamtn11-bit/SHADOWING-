import { add, SC, setCC, OUTM, M_DRESS } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('sa');
// Ả Rập Xê Út · Nhóm 2: Con người và đời sống
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#8a5a2a' };
OUTM.sa_thobe = { map: M_DRESS, pal: { ...base, t: '#f7f7fb', T: '#d8dbe8', u: '#f7f7fb', b: '#f7f7fb' }, patch: [[11, 7, 'T'], [12, 7, 'T'], [13, 7, 'T'], [14, 7, 'T']] };
OUTM.sa_bisht = { map: M_DRESS, pal: { ...base, t: '#4a3220', T: '#d6a93a', u: '#4a3220', b: '#f7f7fb', w: '#f7f7fb' }, patch: [[11, 6, 'T'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'T'], [12, 6, 'T'], [12, 7, 'w'], [12, 8, 'w'], [12, 9, 'T'], [13, 6, 'T'], [13, 7, 'w'], [13, 8, 'w'], [13, 9, 'T'], [14, 6, 'T'], [14, 7, 'w'], [14, 8, 'w'], [14, 9, 'T'], [16, 6, 'T'], [16, 9, 'T'], [17, 6, 'T'], [17, 9, 'T']] };
OUTM.sa_abaya = { map: M_DRESS, pal: { ...base, t: '#1e1e2a', T: '#4a4a62', u: '#1e1e2a', b: '#1e1e2a', y: '#c9a227', x: '#1e1e2a' }, patch: [[11, 7, 'y'], [11, 8, 'y'], [13, 7, 'T'], [15, 7, 'T'], [17, 4, 'y'], [17, 11, 'y']] };
OUTM.sa_theu = { map: M_DRESS, pal: { ...base, t: '#7a1a3a', T: '#ffd84d', u: '#7a1a3a', b: '#2f7d3a', w: '#ffffff', c: '#4a9ae0' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [12, 6, 'w'], [12, 9, 'w'], [13, 7, 'c'], [13, 8, 'c'], [16, 5, 'T'], [16, 7, 'w'], [16, 9, 'T'], [17, 4, 'c'], [17, 6, 'T'], [17, 8, 'c'], [17, 10, 'T']] };
OUTM.sa_bedouin = { map: M_DRESS, pal: { ...base, t: '#3a2c5a', T: '#b4bed6', u: '#3a2c5a', b: '#a8281a', r: '#e8452c' }, patch: [[11, 6, 'T'], [11, 7, 'T'], [11, 8, 'T'], [11, 9, 'T'], [12, 7, 'T'], [12, 8, 'T'], [13, 7, 'r'], [16, 5, 'r'], [16, 10, 'r'], [17, 6, 'T'], [17, 9, 'T']] };
Object.assign(OUT_KEY, { 'sa-thobe': 'sa_thobe', 'sa-bisht': 'sa_bisht', 'sa-abaya': 'sa_abaya', 'sa-thobe-theu': 'sa_theu', 'sa-bedouin': 'sa_bedouin' });
Object.assign(SLOT_OF, { 'sa-thobe': 'outfit', 'sa-bisht': 'outfit', 'sa-abaya': 'outfit', 'sa-thobe-theu': 'outfit', 'sa-bedouin': 'outfit', 'sa-hijab': 'head', 'sa-ghutra': 'head', 'sa-agal': 'head', 'sa-jambiya': 'waist' });
O['sa-hijab'] = { y0: 0, pal: { k: '#2e2e44', a: '#4a4a66' }, rows: ['...kkkkkkkkkk...', '..kkkkkkkkkkkk..', '..kkaaaaaaaakk..', '..kk........kk..', '..kk........kk..', '..kk........kk..', '..kk........kk..', '..kk........kk..', '...kk......kk...', '....kkkkkkkk....'] };
O['sa-ghutra'] = { y0: 0, pal: { w: '#ffffff', r: '#c0392b', k: '#1b1030' }, rows: ['...wrwrwrwrww...', '..rwrwrwrwrwrw..', '..kkkkkkkkkkkk..', '..wr........rw..', '..rw........wr..', '..wr........rw..', '..rw........wr..', '..w..........w..'] };
O['sa-agal'] = { y0: 1, pal: { k: '#1b1030' }, rows: ['..kkkkkkkkkkkk..', '................', '..kkkkkkkkkkkk..'] };
O['sa-jambiya'] = { y0: 14, pal: { n: '#8a5a2a', y: '#ffd84d', Y: '#c9a227' }, rows: ['....nnnnnnnn....', '.......yy.......', '.......YY.......', '........YY......'] };


// ----- Trang phục -----
add(2, 'Trang phục', 'sa-thobe', 'Thobe (thụb)', 'The thobe', 'áo dài đến mắt cá chân, thường màu trắng và may bằng vải nhẹ để chịu nóng. Đây là trang phục thường ngày của nam giới, từ công sở đến lễ hội. Giờ đây nhiều người trẻ cũng mặc thobe nhiều màu và kiểu cổ khác nhau.', null, { char: ['sa_thobe'], use: 'wear' });
add(2, 'Trang phục', 'sa-bisht', 'Bisht', 'The bisht cloak', 'áo choàng ngoài dài, dệt mỏng và thêu chỉ vàng ở viền, thường mặc trong dịp trang trọng như lễ cưới hoặc nghi thức. Đây là trang phục thể hiện sự tôn trọng.', null, { char: ['sa_bisht'], use: 'wear' });
add(2, 'Trang phục', 'sa-abaya', 'Abaya', 'The abaya', 'áo choàng ngoài dài của phụ nữ, thường màu đen, mặc bên ngoài quần áo thường. Kiểu dáng và chi tiết thêu ngày càng đa dạng, nhưng quy định bắt buộc đã nới lỏng dần.', null, { char: ['sa_abaya'], use: 'wear' });
add(2, 'Trang phục', 'sa-hijab', 'Khăn trùm đầu hijab và niqab', 'Hijab and niqab', 'hijab là khăn trùm tóc, còn niqab che thêm phần mặt. Một số phụ nữ chọn mặc, một số khác không, và thói quen khác nhau theo vùng và gia đình.',
  d => { d.e(8,8,6,7,'K'); d.e(8,8,3.2,3.8,'s'); d.p('k',6,7,10,7); d.r(5,9,7,4,'K'); d.r(3,12,11,3,'K'); d.p('a',5,3,4,5,4,12,6,13); }, { use: 'wear' });
add(2, 'Trang phục', 'sa-thobe-theu', 'Thobe thêu màu ở Hejaz và Asir', 'Embroidered dress of Hejaz and Asir', 'áo dài của phụ nữ ở những vùng này thường thêu nhiều màu, họa tiết hình học, và đôi khi có chuỗi hạt, đồng xu. Mỗi vùng có mẫu riêng, dùng cho lễ cưới và dịp đặc biệt.', null, { char: ['sa_theu'], use: 'wear' });
add(2, 'Trang phục', 'sa-bedouin', 'Trang phục Bedouin', 'Bedouin dress', 'người du mục dùng vải dày hơn để chống nắng và cát, có khi cuộn khăn quanh đầu. Phụ nữ Bedouin thường đeo trang sức bạc nặng, có giá trị như của hồi môn.', null, { char: ['sa_bedouin'], use: 'wear' });

// ----- Phụ kiện -----
add(2, 'Phụ kiện', 'sa-ghutra', 'Ghutra và shemagh', 'Ghutra and shemagh', 'khăn trùm đầu vuông, trắng hoặc đỏ ca rô, che nắng và cát cho nam giới. Mỗi kiểu khăn thường được gắn với một vùng hoặc một dịp.',
  d => { d.dtri(1,3,14,11,'w'); d.r(2,3,12,3,'w'); for(let y=4;y<11;y+=2) for(let x=3+(y%4?1:0);x<13;x+=2) d.p('r',x,y); d.r(3,2,10,1,'k'); d.r(3,4,10,1,'k'); }, { use: 'wear' });
add(2, 'Phụ kiện', 'sa-agal', 'Agal (khoanh đen)', 'The agal', 'vòng dây đen giữ khăn không trượt khỏi đầu. Ngày xưa người ta dùng dây này để buộc chân lạc đà, nhưng đây là giả thuyết phổ biến chứ chưa chắc đúng.',
  d => { d.e(8,6,6.5,3,'k'); d.e(8,6,4.5,1.6,'_'); d.e(8,10,6.5,3,'k'); d.e(8,10,4.5,1.6,'_'); d.l(5,12,4,15,'k'); d.l(11,12,12,15,'k'); }, { use: 'wear' });
add(2, 'Phụ kiện', 'sa-misbaha', 'Misbaha', 'The misbaha prayer beads', 'chuỗi tràng hạt dùng khi đọc lời cầu nguyện, nhiều người cầm theo cả ngoài giờ cầu. Chuỗi thường có 33 hoặc 99 hạt.',
  d => { for(let i=0;i<20;i++){ const a=i/20*Math.PI*2; d.p(i%2?'t':'n',8+Math.cos(a)*5,6+Math.sin(a)*4.5); } d.r(7,11,2,2,'Y'); d.r(7,13,2,2,'g'); d.p('g',6,15,9,15); }, { use: 'hold' });
add(2, 'Phụ kiện', 'sa-bakhoor', 'Hương bakhoor và nước hoa oud', 'Bakhoor incense and oud perfume', 'những chiếc lư đốt gỗ thơm và chai tinh dầu trầm hương (oud) là thói quen tiếp khách. Nhiều người xông hương cho nhà và áo quần.',
  d => { d.r(3,9,6,2,'Y'); d.tri(3,11,6,4,'Y'); d.r(2,15,8,1,'n'); d.r(4,8,4,1,'k'); d.p('r',5,8,6,8); d.p('a',5,6,6,4,5,2,6,1,7,5); d.r(11,7,4,7,'n'); d.r(12,5,2,2,'y'); d.p('e',12,9,13,10); }, { use: 'hold' });
add(2, 'Phụ kiện', 'sa-jambiya', 'Dao jambiya', 'The jambiya dagger', 'dao cong đeo bên hông, thường thấy ở vùng núi phía tây nam gần Yemen, như một dấu hiệu của đàn ông trong dịp lễ. Nay đây chủ yếu là vật trang trí.',
  d => { d.r(2,7,12,2,'n'); d.p('y',3,7,6,7,9,7,12,7); d.r(7,2,3,5,'Y'); d.r(6,1,5,1,'y'); d.l(8,9,8,11,'a'); d.l(9,9,10,12,'Y'); d.l(10,12,13,14,'Y'); d.l(9,11,11,14,'Y'); d.p('y',13,13,14,12); }, { use: 'wear' });
add(2, 'Phụ kiện', 'sa-henna', 'Henna và kohl', 'Henna and kohl', 'phụ nữ vẽ henna lên tay và kẻ mắt bằng kohl trong dịp cưới hỏi và lễ hội. Hai thói quen này có lịch sử rất lâu đời ở vùng.',
  d => { d.r(5,7,6,8,'s'); for(const x of [4,6,8,10]) d.r(x,2,1,5,'s'); d.r(11,8,2,2,'s'); d.p('N',7,10,8,9,9,10,8,11,6,12,10,12,8,13,4,3,6,3,8,3,10,3,6,5,8,5); d.e(8,10.5,1,1,'n'); d.r(13,3,2,6,'k'); d.p('y',13,2,14,2); }, { use: 'hold' });

// ----- Nhà ở -----
add(2, 'Nhà ở', 'sa-tent', 'Lều lông dê (bayt al-sha’ar)', 'The goat-hair tent', 'lều dệt từ lông dê và lông cừu màu đen, bên trong chia khu cho nam và nữ. Lều giúp chống nắng và mát vào ban ngày, và dễ tháo dỡ khi di chuyển.',
  d => { d.bg('u'); d.r(0,12,16,4,'t'); d.tri(0,4,16,4,'k'); d.r(1,8,14,4,'d'); d.r(6,9,4,3,'n'); d.r(8,8,1,4,'t'); for(const y of [7,10]) d.r(1,y,5,1,'K'); d.p('r',2,11,4,11,11,11,13,11); d.l(0,12,1,9,'N'); d.l(15,12,14,9,'N'); }, SC);
add(2, 'Nhà ở', 'sa-mudhouse', 'Nhà gạch bùn ở Najd', 'Najdi mud-brick houses', 'nhà dựng bằng gạch bùn phơi nắng, tường dày giúp giữ mát. Thành phố cổ Diriyah là ví dụ tiêu biểu.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(2,5,12,8,'n'); for(let x=2;x<14;x+=2) d.p('n',x,4); d.r(2,7,12,1,'e'); d.p('N',4,9,5,9,10,9,11,9); d.r(7,10,3,3,'N'); d.p('y',8,11); d.p('O',3,6,5,6,7,6,9,6,11,6); }, SC);
add(2, 'Nhà ở', 'sa-rowshan', 'Cửa sổ gỗ rowshan ở Jeddah', 'The rowshan windows of Jeddah', 'cửa sổ gỗ chạm lưới nhô ra khỏi tường, giúp đón gió biển và che tầm nhìn từ ngoài vào. Đây là đặc trưng của những ngôi nhà nhiều tầng ở khu Al-Balad.',
  d => { d.bg('e'); d.r(3,2,10,12,'n'); d.r(2,1,12,2,'N'); d.r(2,13,12,2,'N'); for(let y=4;y<12;y++) for(let x=4;x<12;x++) if((x+y)%2) d.p('t',x,y); d.l(8,3,8,12,'N'); d.l(4,8,11,8,'N'); }, SC);
add(2, 'Nhà ở', 'sa-stonehouse', 'Nhà đá ở Asir', 'Stone tower houses of Asir', 'những ngôi nhà tháp nhiều tầng xây bằng đá và bùn trên sườn núi, ví dụ ở làng Rijal Almaa. Tường trong nhà thường được vẽ trang trí rực rỡ.',
  d => { d.bg('c'); d.tri(0,6,16,6,'G'); d.r(0,11,16,5,'g'); for(const [x,y,w] of [[2,4,4],[7,2,4],[11,6,4]]){ d.r(x,y,w,12-y,'a'); d.r(x,y,w,1,'w'); for(let k=y+2;k<11;k+=2){ d.p('r',x+1,k); d.p('y',x+2,k); } d.r(x,y+3,w,1,'W'); } }, SC);
add(2, 'Nhà ở', 'sa-majlis', 'Majlis', 'The majlis', 'phòng tiếp khách có ghế đệm sát tường, nơi chủ nhà mời cà phê và trà cho khách. Nhiều nhà hiện đại vẫn giữ một majlis riêng.',
  d => { d.bg('e'); d.r(0,2,16,1,'n'); for(const x of [2,6,10]) d.r(x,4,3,3,'c'); d.r(0,8,3,6,'R'); d.r(13,8,3,6,'R'); d.r(0,7,16,3,'r'); for(let x=1;x<16;x+=3) d.p('y',x,8); d.r(3,11,10,5,'m'); d.e(8,12,2,1.5,'y'); d.p('y',10,11); }, SC);
add(2, 'Nhà ở', 'sa-villa', 'Biệt thự hiện đại có hàng rào cao', 'Modern villas with high walls', 'kiểu nhà phổ biến ở ngoại ô, có sân và gara. Phần lớn gia đình dùng máy lạnh quanh năm.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.r(3,2,10,7,'e'); d.r(2,1,12,1,'t'); for(const x of [4,7,10]) d.r(x,4,2,2,'B'); d.r(0,8,16,6,'t'); d.r(0,8,16,1,'n'); d.r(3,10,4,4,'N'); d.r(10,11,2,3,'N'); d.e(14,6,1.6,1.6,'G'); }, SC);

// ----- Đồ dùng và đời sống -----
add(2, 'Đồ dùng và đời sống', 'sa-dallah', 'Dallah', 'The dallah coffee pot', 'bình đồng hoặc nhôm mỏ dài dùng pha cà phê Ả Rập, có hình dáng đặc trưng. Đây là biểu tượng của lòng hiếu khách và xuất hiện trên nhiều biểu trưng.',
  d => { d.e(7,10,4.5,4,'Y'); d.dtri(3,13,8,2,'Y'); d.r(5,4,4,3,'Y'); d.tri(4,1,6,3,'y'); d.p('y',6,0,7,0); d.l(10,9,13,5,'Y'); d.l(13,5,15,4,'y'); d.l(3,8,1,7,'n'); d.l(1,7,1,11,'n'); d.l(1,11,3,12,'n'); d.p('u',5,9,5,10); d.l(3,10,11,10,'n'); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'sa-finjan', 'Chén finjan', 'The finjan cup', 'chén nhỏ không quai dùng uống cà phê, chỉ rót vài ngụm mỗi lần. Chủ nhà rót thêm cho đến khi khách lắc chén báo dừng.',
  d => { d.r(4,6,8,3,'w'); d.dtri(4,9,8,5,'w'); d.r(6,13,4,1,'W'); d.r(4,6,8,1,'y'); d.p('Y',6,10,8,10,10,10); d.p('g',5,9,7,9,9,9); d.p('a',6,4,7,2,9,3,10,1); d.r(3,15,10,1,'a'); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'sa-mabkhara', 'Lư đốt hương mabkhara', 'The mabkhara incense burner', 'lư nhỏ đốt than và gỗ thơm, truyền quanh phòng khi tiếp khách. Đây cũng là dấu hiệu buổi gặp mặt sắp kết thúc.',
  d => { d.r(3,5,10,3,'n'); d.p('y',4,6,6,6,8,6,10,6); d.tri(5,8,6,3,'n'); d.r(6,8,4,5,'n'); d.r(3,13,10,2,'N'); for(const x of [3,12]) d.p('y',x,4); d.p('r',6,4,9,4); d.p('o',7,4,8,4); d.p('a',7,2,8,0,6,1); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'sa-rugs', 'Thảm và gối đệm trải sàn', 'Rugs and floor cushions', 'người ta ngồi trên thảm và gối sát đất trong nhà và lều, ăn trên khăn trải sàn (sofra). Thảm dệt tay là món đồ có giá trị trong gia đình.',
  d => { d.bg('e'); d.r(1,9,14,6,'R'); d.r(2,10,12,4,'r'); d.p('y',4,11,8,11,12,11,6,13,10,13); for(let x=1;x<15;x+=2) d.p('w',x,15); d.r(1,4,4,4,'b'); d.r(6,5,4,3,'g'); d.r(11,4,4,4,'v'); d.p('y',2,5,12,5,7,6); }, SC);
add(2, 'Đồ dùng và đời sống', 'sa-sadu', 'Vải dệt sadu', 'Sadu weaving', 'nghề dệt từ lông cừu, lông dê và lông lạc đà của phụ nữ Bedouin, tạo ra thảm, túi và vải lều với họa tiết sọc màu. UNESCO đã ghi nhận nghề dệt này là di sản văn hóa phi vật thể của một số nước trong vùng.',
  d => { d.bg('R'); const cs=['k','w','r','y','k','o','w','k']; cs.forEach((c,i)=>d.r(0,i*2,16,2,c==='R'?'r':c)); for(let x=1;x<16;x+=3){ d.p('r',x,2,x+1,3); d.p('k',x,6,x+1,7); d.p('w',x,8,x+1,9); d.p('y',x,12,x+1,13); } }, SC);
add(2, 'Đồ dùng và đời sống', 'sa-prayer', 'Giờ cầu nguyện và nhịp ngày', 'Prayer times and the rhythm of the day', 'mỗi ngày có năm lần cầu nguyện, và nhiều cửa hàng thường tạm đóng cửa vài phút đến một lúc. Cuối tuần rơi vào thứ Sáu và thứ Bảy.',
  d => { d.bg('o'); d.e(8,11,4,4,'y'); d.r(0,11,16,5,'N'); d.r(3,6,5,5,'i'); d.fan(5.5,6,2.5,'i'); d.r(11,3,1,8,'i'); d.p('i',10,5,12,5,11,2); d.p('w',2,2,14,1); d.r(5,13,6,2,'g'); }, SC);
add(2, 'Đồ dùng và đời sống', 'sa-driving', 'Phụ nữ lái xe', 'Women driving', 'từ tháng 6 năm 2018, phụ nữ Ả Rập Xê Út được phép lái xe, một thay đổi lớn trong đời sống hằng ngày. Trước đó nhiều gia đình phải thuê tài xế riêng.',
  d => { d.bg('c'); d.r(0,13,16,3,'A'); for(let x=1;x<16;x+=4) d.r(x,14,2,1,'w'); d.r(1,8,14,4,'r'); d.tri(3,4,10,4,'r'); d.r(5,5,7,4,'c'); d.e(8,6.5,1.6,1.8,'s'); d.r(6,5,1,4,'k'); d.r(7,4,3,1,'k'); d.r(9,5,1,2,'k'); d.e(4,12,2,2,'k'); d.e(12,12,2,2,'k'); }, SC);
