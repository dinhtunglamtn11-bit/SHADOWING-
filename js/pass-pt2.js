import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('pt');
// Bồ Đào Nha · Nhóm 2: Con người và đời sống
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#5a3a1a' };
OUTM.pt_viana = { map: M_DRESS, pal: { ...base, t: '#c0272d', T: '#2f7d3a', u: '#ffffff', b: '#1b1030', w: '#ffffff', y: '#ffd84d', x: '#1b1030' }, patch: [[11, 5, 'w'], [11, 6, 'w'], [11, 9, 'w'], [11, 10, 'w'], [11, 7, 'y'], [11, 8, 'y'], [12, 7, 'y'], [12, 8, 'y'], [13, 7, 'y'], [15, 6, 'w'], [15, 7, 'w'], [15, 8, 'w'], [15, 9, 'w'], [16, 7, 'y'], [17, 4, 'y'], [17, 7, 'T'], [17, 11, 'y']] };
OUTM.pt_varina = { map: M_DRESS, pal: { ...base, t: '#2f6fb0', T: '#ffd84d', u: '#f7f3e8', b: '#c0272d', w: '#ffffff', r: '#c0272d', x: '#7a5230' }, patch: [[11, 5, 'r'], [11, 6, 'r'], [12, 7, 'r'], [13, 8, 'r'], [15, 4, 'w'], [15, 6, 'w'], [15, 8, 'w'], [15, 10, 'w'], [16, 5, 'T'], [16, 7, 'r'], [16, 9, 'T'], [17, 4, 'w'], [17, 7, 'T'], [17, 10, 'w']] };
OUTM.pt_campino = { map: M_TOP, pal: { ...base, t: '#f7f3e8', T: '#c0272d', u: '#f7f3e8', b: '#c0272d', p: '#2b3a6a', l: '#f7f3e8', r: '#c0272d', y: '#ffd84d', x: '#1b1030' }, patch: [[11, 5, 'r'], [11, 6, 'r'], [11, 9, 'r'], [11, 10, 'r'], [12, 5, 'r'], [12, 10, 'r'], [13, 5, 'r'], [13, 10, 'r'], [12, 7, 'y'], [13, 7, 'y'], [15, 7, 'y']] };
OUTM.pt_capote = { map: M_DRESS, pal: { ...base, t: '#7a5230', T: '#c9a06a', u: '#7a5230', b: '#5a3a1a', x: '#2b2b3a' }, patch: [[11, 5, 'T'], [11, 6, 'T'], [11, 7, 'T'], [11, 8, 'T'], [11, 9, 'T'], [11, 10, 'T'], [12, 6, 'T'], [12, 9, 'T'], [13, 7, 'b'], [14, 7, 'b'], [15, 7, 'b'], [17, 4, 'T'], [17, 11, 'T']] };
OUTM.pt_capa = { map: M_DRESS, pal: { ...base, t: '#1b1b28', T: '#3a3a50', u: '#1b1b28', b: '#1b1b28', w: '#ffffff', r: '#c0272d', y: '#ffd84d', x: '#101018' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'w'], [12, 8, 'r'], [13, 7, 'r'], [15, 5, 'T'], [15, 10, 'T'], [17, 4, 'y'], [17, 6, 'r'], [17, 9, 'y'], [17, 11, 'r']] };
Object.assign(OUT_KEY, { 'pt-viana': 'pt_viana', 'pt-varina': 'pt_varina', 'pt-campino': 'pt_campino', 'pt-capote': 'pt_capote', 'pt-capa': 'pt_capa' });
Object.assign(SLOT_OF, { 'pt-viana': 'outfit', 'pt-varina': 'outfit', 'pt-campino': 'outfit', 'pt-capote': 'outfit', 'pt-capa': 'outfit', 'pt-barrete': 'head', 'pt-tamancos': 'feet', 'pt-filigrana': 'face', 'pt-coracao': 'face', 'pt-avental': 'waist' });
O['pt-barrete'] = { y0: -1, pal: { g: '#2f7d3a', G: '#1f5a2a', r: '#c0272d' }, rows: ['......gggg......', '....gggggggg....', '...ggggggggggg..', '..rrrrrrrrrrrgg.', '............gg..', '............gg..', '............rr..'] };
O['pt-tamancos'] = { y0: 18, pal: { n: '#7a5230', t: '#c9a06a', k: '#1b1030' }, rows: ['..kkkk....kkkk..', '.nnnnnn..nnnnnn.', '.tttttt..tttttt.'] };
O['pt-filigrana'] = { y0: 9, pal: { y: '#ffd84d', Y: '#c9a227' }, rows: ['....y......y....', '.....yy..yy.....', '......yYYy......', '.....yYyyYy.....', '......yYYy......'] };
O['pt-coracao'] = { y0: 9, pal: { y: '#ffd84d', Y: '#c9a227' }, rows: ['.....y....y.....', '......y..y......', '.....yy..yy.....', '....yyyyyyyy....', '.....yYYYYy.....', '......yyyy......', '.......yy.......'] };
O['pt-avental'] = { y0: 14, pal: { k: '#1b1030', r: '#e8452c', y: '#ffd84d', g: '#5fb85a' }, rows: ['....yyyyyyyy....', '....kkkkkkkk....', '....krkykrkk....', '...kkgkrkgkkk...', '...kkkkkkkkkk...', '...yyyyyyyyyy...'] };


// ----- Trang phục -----
add(2, 'Trang phục', 'pt-viana', 'Trang phục Viana (traje à vianesa)', 'Viana festival costume', 'bộ đồ lễ hội của phụ nữ vùng Viana do Castelo, gồm váy sậm màu, tạp dề thêu và khăn phủ đầu. Bộ này thường đi kèm rất nhiều trang sức vàng.', null, { char: ['pt_viana'], use: 'wear' });
add(2, 'Trang phục', 'pt-varina', 'Trang phục của người bán cá Nazaré (varina)', 'Nazare fishwife costume', 'váy ngắn nhiều lớp, khăn trùm đầu và khăn choàng vai. Phụ nữ trong làng chài thường mặc nhiều lớp váy để giữ ấm khi đứng bên bờ biển.', null, { char: ['pt_varina'], use: 'wear' });
add(2, 'Trang phục', 'pt-campino', 'Campino (người chăn bò Ribatejo)', 'Campino herdsman outfit', 'mũ len xanh có bao tua, áo giáp đỏ và quần đài. Họ tham gia những cuộc lùa bò và cưỡi ngựa trong lễ hội.', null, { char: ['pt_campino'], use: 'wear' });
add(2, 'Trang phục', 'pt-capote', 'Áo choàng Alentejo (capote alentejano)', 'Alentejo hooded cape', 'áo choàng len dày có mũ trùm, người chăn cừu chống lạnh và mưa. Nay áo đôi khi còn được mặc ở nông thôn.', null, { char: ['pt_capote'], use: 'wear' });
add(2, 'Trang phục', 'pt-capa', 'Áo choàng sinh viên Coimbra (capa e batina)', 'Coimbra student cape', 'bộ đồ đen gồm áo choàng dài và áo khoác, sinh viên đại học mặc khi tham gia các nghi thức của trường. Trên áo thường có dấu vết như những mảnh vá để kỷ niệm.', null, { char: ['pt_capa'], use: 'wear' });
add(2, 'Trang phục', 'pt-barrete', 'Mũ len người chài (barrete)', 'Fisherman\'s cap', 'mũ len mềm dài, đội khi ra biển. Những chiếc mũ này gắn với hình ảnh dân đánh cá.',
  d => { d.r(4,5,9,4,'G'); d.r(5,3,6,2,'G'); d.r(9,4,4,2,'G'); d.r(12,6,2,5,'G'); d.e(13,12,1.6,1.6,'r'); d.r(4,9,9,2,'r'); d.p('g',6,4,7,6); }, { use: 'wear' });
add(2, 'Trang phục', 'pt-tamancos', 'Giày gỗ (tamancos)', 'Wooden-soled clogs', 'đế gỗ được nông dân miền bắc mang khi đi trên đất ướt. Chúng bền và giữ ấm chân.',
  d => { d.r(1,7,6,4,'N'); d.r(1,6,4,1,'k'); d.r(1,11,7,2,'n'); d.r(9,8,6,4,'N'); d.r(9,7,4,1,'k'); d.r(9,12,7,2,'n'); d.p('y',2,8,10,9); d.p('t',1,12,3,12,5,12,10,13,12,13,14,13); }, { use: 'wear' });

// ----- Phụ kiện -----
add(2, 'Phụ kiện', 'pt-filigrana', 'Kim hoàn vàng (filigrana)', 'Gold filigree', 'nghề uốn sợi vàng, bạc mảnh thành hoa văn mành như ren, nổi tiếng ở Gondomar và Viana do Castelo. Nhiều phụ nữ đeo dây chuyền nhiều tầng trong lễ hội.',
  d => { d.p('y',3,1,3,2,4,3,5,4,12,1,12,2,11,3,10,4); d.e(8,9,5,5,'y'); d.e(8,9,3.4,3.4,'_'); d.p('y',8,6,8,7,8,11,8,12,5,9,6,9,10,9,11,9,7,8,9,8,7,10,9,10); d.p('Y',8,9,8,14,6,13,10,13); }, { use: 'wear' });
add(2, 'Phụ kiện', 'pt-coracao', 'Trái tim Viana (Coração de Viana)', 'Heart of Viana', 'mặt trái tim bằng vàng chạm kim hoàn, thường treo ở dây chuyền. Đây là món trang sức biểu tượng của vùng bắc.',
  d => { d.p('y',4,0,4,1,5,2,6,3,12,0,12,1,11,2,10,3); d.p('y',7,3,8,3,9,3); d.e(5.6,7,3,2.8,'y'); d.e(10.4,7,3,2.8,'y'); d.dtri(3,8,10,6,'y'); d.p('Y',6,7,10,7,8,9,6,10,10,10,8,11); d.p('_',8,5); d.p('w',5,6); }, { use: 'wear' });
add(2, 'Phụ kiện', 'pt-lenco', 'Khăn tay của người yêu nhau (lenços dos namorados)', 'Sweethearts\' handkerchief', 'khăn tay thêu hình trái tim và những câu thơ ngắn, cô gái ở Minho từng tặng cho người mình thương. Ngày nay chúng là món lưu niệm được yêu thích.',
  d => { d.r(2,2,12,12,'w'); for(let x=2;x<14;x+=2) d.p('r',x,2,x+1,13); d.p('r',6,5,7,6,8,6,9,5,10,6,5,6,5,7,10,7,6,8,9,8,7,9,8,9); d.p('b',4,11,5,11,7,11,8,11,10,11,11,11); d.p('g',4,4,11,4); }, { use: 'hold' });
add(2, 'Phụ kiện', 'pt-cortica', 'Phụ kiện bằng vỏ sồi (cortiça)', 'Cork accessories', 'ví, túi xách, mũ và đồ trang sức làm từ vỏ cây sồi, nhẹ và chống nước. Bồ Đào Nha được biết đến như nơi dẫn đầu trong lĩnh vực này.',
  d => { d.r(3,6,10,8,'t'); d.p('N',5,5,5,4,6,3,7,3,8,3,9,3,10,4,10,5); d.p('n',4,8,7,10,10,7,11,11,5,12,9,13,8,8); d.r(3,6,10,1,'O'); d.p('y',7,7,8,7); d.p('W',6,9,12,9); }, { use: 'hold' });
add(2, 'Phụ kiện', 'pt-avental', 'Khăn choàng và tạp dề thêu', 'Embroidered scarf and apron', 'phụ nữ nông thôn cài khăn trên đầu và thêu hoa trên tạp dề. Mỗi vùng có mẫu hoa khác nhau.',
  d => { d.r(4,3,8,2,'k'); d.r(2,5,12,10,'k'); d.r(3,13,10,1,'y'); d.p('r',4,7,6,9,8,7,10,9,12,7,8,11); d.p('y',4,8,8,8,12,8,8,12); d.p('g',5,7,7,9,9,7,11,9); d.p('p',5,11,11,11); }, { use: 'wear' });

// ----- Nhà ở -----
add(2, 'Nhà ở', 'pt-granite-house', 'Nhà đá hoa cương miền bắc', 'Granite house of the north', 'nhà xây từ đá granite dày, chịu được mưa và gió. Tầng dưới thường nuôi gia súc, tầng trên ở.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(2,5,12,8,'a'); d.tri(1,1,14,4,'R'); d.p('A',3,6,6,7,9,6,12,8,4,9,11,11,8,10,13,6); d.r(3,10,3,3,'N'); d.r(9,10,3,3,'N'); d.p('B',4,7,5,7,10,7,11,7); d.p('w',6,14,14,13); }, SC);
add(2, 'Nhà ở', 'pt-espigueiro', 'Kho lúa đá trên cọc (espigueiros)', 'Stone granary on stilts', 'những kho trữ bắp ngô bằng đá nâng khỏi mặt đất để tránh chuột và ẩm, nổi tiếng ở Soajo và Lindoso. Chúng có dáng như những ngôi nhà nhỏ trên chân.',
  d => { d.bg('c'); d.r(0,14,16,2,'g'); for(const x of [3,8,12]){ d.r(x,10,1,4,'a'); d.r(x-1,9,3,1,'A'); } d.r(2,5,12,4,'a'); for(let x=3;x<14;x+=2) d.r(x,6,1,3,'k'); d.tri(1,2,14,3,'A'); d.p('a',8,0,8,1,7,1,9,1); }, SC);
add(2, 'Nhà ở', 'pt-xisto', 'Nhà đá phiến (Aldeias do Xisto)', 'Schist village', 'những ngôi làng ở miền trung như Piódão, xây bằng đá phiến màu xám nâu trên sườn núi. Phố xá đá nhỏ hẹp và dốc.',
  d => { d.bg('c'); d.tri(0,1,16,15,'G'); for(const [x,y] of [[2,8],[7,5],[10,9],[5,11]]){ d.r(x,y,5,4,'N'); d.r(x,y-1,5,1,'A'); d.p('y',x+1,y+1); d.p('b',x+3,y+1); d.p('n',x+2,y+2,x+4,y+3,x,y+3); } d.p('a',1,14,3,15,13,14); }, SC);
add(2, 'Nhà ở', 'pt-alentejo-house', 'Nhà trắng Alentejo', 'Whitewashed Alentejo house', 'tường vôi trắng kẻ viền xanh dương hoặc vàng quanh cửa sổ và cửa ra vào. Màu trắng giúp phản xạ nắng mùa hè.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(1,6,14,7,'w'); d.tri(0,3,16,3,'o'); d.r(1,12,14,1,'b'); d.r(3,8,3,3,'b'); d.p('w',4,9); d.r(10,8,3,5,'b'); d.r(11,9,1,4,'N'); d.r(12,1,2,3,'w'); d.p('y',13,0); d.p('G',7,12,8,12); }, SC);
add(2, 'Nhà ở', 'pt-palheiros', 'Nhà sọc sặc sỡ Costa Nova (palheiros)', 'Striped houses of Costa Nova', 'nhà gỗ kẻ sọc đỏ, xanh, vàng ở bãi biển gần Aveiro. Ban đầu chúng là kho để đồ ngư dân.',
  d => { d.bg('c'); d.r(0,13,16,3,'u'); for(const [x0,c] of [[0,'r'],[5,'b'],[10,'g']]){ for(let x=x0;x<x0+5;x++) d.r(x,6,1,7,(x-x0)%2?'w':c); d.tri(x0,2,5,4,c); d.r(x0+2,10,1,3,'N'); } d.p('w',2,5,7,5,12,5); }, SC);
add(2, 'Nhà ở', 'pt-santana', 'Nhà mái rơm tam giác ở Santana (Madeira)', 'Santana thatched house', 'nhà gỗ mái dốc phủ rơm, sơn đỏ và trắng. Hiện nay chỉ còn một số ít giữ lại cho du khách.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.tri(1,1,14,12,'t'); d.p('n',5,7,4,9,11,7,12,9,3,11,13,11,8,3); d.dtri(5,5,6,2,'w'); d.r(5,7,6,6,'w'); d.r(7,9,2,4,'r'); d.p('b',6,8,9,8); d.l(5,6,3,12,'r'); d.l(11,6,13,12,'r'); d.p('P',1,13,14,13); }, SC);
add(2, 'Nhà ở', 'pt-azulejo-house', 'Nhà phố phủ gạch men azulejo', 'Tiled town house', 'mặt tiền nhà ở Lisboa và Porto dán gạch xanh trắng hoặc nhiều màu, vừa trang trí vừa chống ẩm. Những tòa nhà này là nét dễ nhận biết của phố cổ.',
  d => { d.bg('c'); d.r(2,1,12,15,'w'); for(let y=2;y<12;y+=2) for(let x=3;x<14;x+=2) d.p('b',x+(y%4?1:0),y); for(const x of [4,9]){ d.r(x,3,3,3,'e'); d.p('k',x+1,4,x+1,5); d.r(x,8,3,3,'e'); d.p('k',x+1,9); d.r(x,11,3,1,'k'); } d.r(2,0,12,1,'r'); d.r(6,13,4,3,'G'); }, SC);

// ----- Đồ dùng và thủ công -----
add(2, 'Đồ dùng và thủ công', 'pt-azulejo', 'Gạch men azulejo', 'Azulejo tiles', 'gạch sứ tráng men vẽ tay, nhiều nhất là màu xanh trên nền trắng, phủ tường nhà thờ, ga tàu và nhà dân. Từ "azulejo" thường được cho là gốc từ tiếng Ả Rập, chỉ viên đá nhỏ đánh bóng.',
  d => { d.r(2,2,12,12,'w'); d.r(7,2,1,12,'a'); d.r(2,7,12,1,'a'); for(const [x,y] of [[4,4],[10,4],[4,10],[10,10]]){ d.p('b',x,y-1,x-1,y,x+1,y,x,y+1,x-2,y-2,x+2,y-2,x-2,y+2,x+2,y+2); d.p('B',x,y); } }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-calcada', 'Đường lát đá Bồ Đào Nha (calçada portuguesa)', 'Portuguese pavement', 'mặt phố lát bằng đá vôi trắng và đá bazan đen xếp thành hình sóng, hoạ tiết. Quảng trường Rossio ở Lisboa có mẫu sóng nổi tiếng.',
  d => { d.bg('w'); for(let x=0;x<16;x++){ const o=Math.round(Math.sin(x*0.8)*1.6); for(const y of [3,8,13]) d.r(x,y+o-1,1,2,'k'); } d.p('a',2,0,9,1,14,6,5,10,11,15); }, SC);
add(2, 'Đồ dùng và thủ công', 'pt-vista-alegre', 'Sứ Vista Alegre', 'Vista Alegre porcelain', 'hãng sứ do đất nước thành lập năm 1824, làm chén đĩa cho nhà hàng, khách sạn và gia đình. Nhiều bộ được sưu tầm.',
  d => { d.e(8,9,6.5,4.5,'w'); d.e(8,9,4.2,2.8,'l'); d.p('b',2,8,3,7,5,6,8,5,11,6,13,7,14,8,3,11,13,11,8,13); d.p('y',4,8,8,7,12,8,8,11); d.p('b',7,9,8,9,9,9,8,8,8,10); d.p('w',8,2,7,3,9,3); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-bordallo', 'Gốm Bordallo Pinheiro', 'Bordallo Pinheiro pottery', 'đồ gốm ở Caldas da Rainha hình lá cải bắp và động vật vui mắt, do nghệ sĩ Rafael Bordallo Pinheiro khởi đầu từ thế kỷ 19. Những chiếc đĩa lá cải màu xanh rất quen thuộc.',
  d => { d.e(8,9,7,5,'G'); d.e(8,9,5,3.6,'g'); d.l(8,6,8,12,'h'); d.l(8,9,4,7,'h'); d.l(8,9,12,7,'h'); d.l(8,11,5,11,'h'); d.l(8,11,11,11,'h'); d.p('g',2,6,5,4,11,4,14,6,8,3); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-black-pottery', 'Gốm đen Bisalhães (barro negro)', 'Bisalhaes black pottery', 'đồ gốm đen bóng làm thủ công ở Vila Real, được UNESCO ghi nhận là di sản phi vật thể năm 2016. Màu đen có được nhờ cách nung đặc biệt.',
  d => { d.e(8,10,5.5,4.5,'k'); d.r(6,3,4,4,'k'); d.r(5,2,6,1,'k'); d.p('k',3,6,2,7,2,8,3,9,13,6,14,7,14,8,13,9); d.p('K',5,8,5,9,6,7); d.p('a',6,8); d.l(5,12,10,12,'K'); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-arraiolos', 'Thảm Arraiolos', 'Arraiolos rug', 'thảm thêu tay trên vải, họa tiết hoa lá nhiều màu, có từ thế kỷ 17 ở thị trấn Arraiolos. Mỗi tấm cần rất nhiều thời gian.',
  d => { d.r(1,3,14,10,'r'); d.r(3,5,10,6,'u'); for(let x=1;x<15;x+=2) d.p('y',x,2,x,13); d.p('b',2,4,13,4,2,11,13,11,5,6,10,6,5,9,10,9); d.p('g',6,7,9,7,6,8,9,8); d.p('R',7,7,8,7,7,8,8,8); d.p('y',7,4,8,4,7,11,8,11); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-cataplana', 'Nồi đồng cataplana', 'Copper cataplana pan', 'nồi đồng gập hai mảnh như vỏ sò, dùng hầm hải sản ở Algarve. Nắp đậy kín giữ nguyên hương vị.',
  d => { d.e(8,11,6.5,3,'O'); d.fan(8,8,6,'o'); d.r(2,9,12,1,'N'); d.p('k',1,9,14,9); d.r(7,1,2,2,'N'); d.p('y',4,6,5,5,6,4); d.p('u',4,11,5,12); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-conservas', 'Hộp cá đóng hộp (conservas)', 'Canned fish', 'những hộp cá mòi, cá ngừ đóng hộp có bìa in màu sắc, trở thành món quà lưu niệm. Nhiều cửa hàng ở Lisboa chuyên bán loại này.',
  d => { d.r(2,5,12,8,'y'); d.r(2,3,12,2,'a'); d.r(2,13,12,1,'a'); d.e(8,9,4,2,'b'); d.p('k',6,8); d.p('w',7,9,8,9,9,9); d.p('b',12,8,13,7,13,9,13,10); d.p('r',3,6,4,6,11,12,12,12); d.p('w',3,3,5,3,7,3); }, { use: 'hold' });
add(2, 'Đồ dùng và thủ công', 'pt-galo', 'Gà trống Barcelos (Galo de Barcelos)', 'Barcelos rooster', 'tượng gà trống đen vẽ hoa đỏ, biểu tượng của đất nước và là quà lưu niệm phổ biến. Câu chuyện chi tiết ở cuối nhóm.',
  d => { d.e(8,9,4,3.4,'k'); d.r(9,4,3,4,'k'); d.p('r',9,2,10,1,10,2,11,3,12,2,12,6,12,7); d.p('y',12,5,13,5); d.p('w',11,4); d.p('r',6,8,8,10,10,9); d.p('y',7,9,8,8,9,10); d.p('b',4,5,3,6,2,8,3,10); d.p('g',3,4,2,5,1,7); d.p('y',7,12,7,13,9,12,9,13); d.r(4,14,9,2,'n'); }, { use: 'hold' });
