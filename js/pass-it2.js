import { add, SC, setCC, OUTM, M_DRESS, M_TOP } from './pass-kit.js';
import { SLOT_OF, OUT_KEY, O } from './pass-lame.js';
setCC('it');
// Ý · Nhóm 2: Con người và đời sống
const base = { o: '#2b1d3a', S: '#eab08f', s: '#ffd5b5', x: '#2b2b3a' };
OUTM.it_moda = { map: M_DRESS, pal: { ...base, t: '#1b1030', T: '#c9a227', u: '#1b1030', b: '#c9a227', x: '#c9a227' }, patch: [[11, 7, 'T'], [11, 8, 'T'], [15, 6, 'T'], [15, 9, 'T'], [17, 4, 'T'], [17, 11, 'T']] };
OUTM.it_sartoria = { map: M_TOP, pal: { ...base, t: '#3a4a6a', T: '#26324a', u: '#3a4a6a', b: '#2b2b3a', p: '#2b2b3a', l: '#3a4a6a', r: '#e8452c', w: '#ffffff', x: '#5a3a1a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'r'], [12, 8, 'r'], [13, 7, 'r'], [13, 8, 'r'], [12, 6, 'T'], [12, 9, 'T'], [13, 5, 'T'], [13, 10, 'T']] };
OUTM.it_toga = { map: M_DRESS, pal: { ...base, t: '#f5f0e6', T: '#d6cbb5', u: '#f5f0e6', b: '#f5f0e6', r: '#7a1a2a', x: '#8a5a2a' }, patch: [[11, 5, 'r'], [12, 6, 'r'], [13, 7, 'r'], [14, 8, 'r'], [15, 9, 'r'], [16, 10, 'r'], [17, 11, 'r']] };
OUTM.it_sardo = { map: M_DRESS, pal: { ...base, t: '#a8281a', T: '#1b1030', u: '#ffffff', b: '#ffd84d', w: '#ffffff', y: '#ffd84d', x: '#1b1030' }, patch: [[11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [12, 7, 'y'], [13, 8, 'y'], [16, 4, 'y'], [16, 7, 'y'], [16, 10, 'y'], [17, 5, 'w'], [17, 9, 'w']] };
OUTM.it_azzurra = { map: M_TOP, pal: { ...base, t: '#2f6fe0', T: '#1f4aa0', u: '#2f6fe0', b: '#ffffff', p: '#ffffff', l: '#2f6fe0', w: '#ffffff', y: '#ffd84d', x: '#2b2b3a' }, patch: [[11, 7, 'w'], [11, 8, 'w'], [12, 6, 'y'], [14, 7, 'w'], [14, 8, 'w'], [15, 7, 'w'], [15, 8, 'w']] };
OUTM.it_carnevale = { map: M_DRESS, pal: { ...base, t: '#7a3fc0', T: '#ffd84d', u: '#7a3fc0', b: '#ffd84d', w: '#ffffff', p: '#ff8fc8', x: '#1b1030' }, patch: [[11, 5, 'w'], [11, 6, 'w'], [11, 7, 'w'], [11, 8, 'w'], [11, 9, 'w'], [11, 10, 'w'], [13, 7, 'T'], [13, 8, 'T'], [16, 5, 'p'], [16, 8, 'T'], [16, 11, 'p'], [17, 4, 'T'], [17, 7, 'p'], [17, 10, 'T']] };
Object.assign(OUT_KEY, { 'it-moda': 'it_moda', 'it-sartoria': 'it_sartoria', 'it-toga': 'it_toga', 'it-sardo': 'it_sardo', 'it-azzurra': 'it_azzurra', 'it-carnevale-abito': 'it_carnevale' });
Object.assign(SLOT_OF, { 'it-moda': 'outfit', 'it-sartoria': 'outfit', 'it-toga': 'outfit', 'it-sardo': 'outfit', 'it-azzurra': 'outfit', 'it-carnevale-abito': 'outfit', 'it-maschera': 'face', 'it-pelle': 'feet', 'it-seta': 'face', 'it-coppola': 'head', 'it-occhiali': 'face' });
O['it-maschera'] = { y0: 4, pal: { w: '#ffffff', k: '#1b1030', y: '#ffd84d' }, rows: ['....yyyyyyyy....', '....wwwwwwww....', '....wkkwwkkw....', '.....wwwwww.....'] };
O['it-pelle'] = { y0: 18, pal: { n: '#8a5a2a', N: '#5a3a1a', y: '#ffd84d' }, rows: ['..nnnn....nnnn..', '.nnynnn..nnynnn.', '.NNNNNN..NNNNNN.'] };
O['it-seta'] = { y0: 9, pal: { v: '#7a3fc0', V: '#4a2680', y: '#ffd84d' }, rows: ['...vvvvvvvvvv...', '....vvVyyVvv....', '.......vv.......'] };
O['it-coppola'] = { y0: 0, pal: { a: '#8a93b4', A: '#5a6490' }, rows: ['....aaaaaaaa....', '..aaaaaaaaaaaa..', '..AAAAAAAAAAAAAA'] };
O['it-occhiali'] = { y0: 5, pal: { k: '#1b1030', c: '#8fd3ff' }, rows: ['...kkkk..kkkk...', '...kcckkkkcck...', '...kkkk..kkkk...'] };


// ----- Trang phục -----
add(2, 'Trang phục', 'it-moda', 'Thời trang Milano (Made in Italy)', 'Milan fashion (Made in Italy)', 'Milano là một trong những thủ đô thời trang lớn của thế giới, với các tuần lễ thời trang hằng năm. Nhãn “Made in Italy” gắn liền với chất liệu tốt, người thợ giỏi và sự tỉ mỉ trong may đo.', null, { char: ['it_moda'], use: 'wear' });
add(2, 'Trang phục', 'it-sartoria', 'Bộ vest may đo (sartoria)', 'The tailored suit', 'nghề may vest thủ công ở các thành phố như Napoli, nổi tiếng với đường vai mềm và dáng ôm nhẹ. Một bộ vest tốt được may qua nhiều lần thử và chỉnh sửa.', null, { char: ['it_sartoria'], use: 'wear' });
add(2, 'Trang phục', 'it-toga', 'Toga cổ đại La Mã', 'The Roman toga', 'áo choàng dài bằng len mà công dân La Mã mặc trong dịp trang trọng, quấn quanh cơ thể theo cách riêng. Người ta thường phân biệt địa vị xã hội qua màu sắc và dải viền.', null, { char: ['it_toga'], use: 'wear' });
add(2, 'Trang phục', 'it-sardo', 'Trang phục dân gian Sardegna', 'Sardinian folk dress', 'váy len thêu màu rực, khăn trùm đầu và áo gài thêu, thường mặc trong lễ hội tôn giáo. Mỗi làng có kiểu dáng và họa tiết riêng.', null, { char: ['it_sardo'], use: 'wear' });
add(2, 'Trang phục', 'it-azzurra', 'Áo thi đấu màu xanh (maglia azzurra)', 'The blue national shirt', 'sắc xanh dương là màu áo đội tuyển bóng đá quốc gia, nên đội được gọi thân mật là Azzurri. Màu này lấy từ màu của hoàng gia Savoia thời thống nhất đất nước.', null, { char: ['it_azzurra'], use: 'wear' });
add(2, 'Trang phục', 'it-carnevale-abito', 'Trang phục hóa trang lễ hội Carnevale', 'Carnival costume', 'áo choàng dài, mũ ba góc và áo phông thêu cầu kỳ ở Venezia. Các bộ đồ này thường đi kèm mặt nạ.', null, { char: ['it_carnevale'], use: 'wear' });

// ----- Phụ kiện -----
add(2, 'Phụ kiện', 'it-maschera', 'Mặt nạ Venezia (maschera)', 'The Venetian mask', 'mặt nạ làm bằng giấy bồi, gốm hoặc da, gắn liền với lễ hội Carnevale. Các mẫu quen thuộc gồm mặt Bauta trắng và mặt Volto, phần lớn do thợ thủ công làm ra.',
  d => { d.e(8,8,5.5,6,'w'); d.r(4,6,3,2,'k'); d.r(9,6,3,2,'k'); d.p('y',8,2,7,3,9,3,8,4,3,9,13,9); d.p('r',6,11,7,12,8,12,9,12,10,11); d.p('v',2,3,1,2,14,3,15,2,2,4,14,4); }, { use: 'wear' });
add(2, 'Phụ kiện', 'it-pelle', 'Giày da và túi da Firenze', 'Florentine leather shoes and bags', 'nghề làm đồ da lâu đời ở Toscana, nổi tiếng với chợ da San Lorenzo. Nhiều cửa hàng nhỏ vẫn làm giày và túi theo cách thủ công.',
  d => { d.r(2,6,9,7,'n'); d.r(2,6,9,2,'N'); d.p('y',6,8); d.l(4,5,4,3,'N'); d.l(8,5,8,3,'N'); d.l(4,3,8,3,'N'); d.r(9,11,6,3,'O'); d.r(13,10,2,2,'O'); d.r(9,14,6,1,'N'); }, { use: 'wear' });
add(2, 'Phụ kiện', 'it-seta', 'Khăn lụa và cà vạt vùng Como', 'Como silk ties and scarves', 'thành phố Como từng là trung tâm dệt lụa lớn của châu Âu. Các sản phẩm ở đây thường có họa tiết in tinh xảo.',
  d => { d.p('v',6,2,7,2,8,2,9,2); d.r(7,3,2,2,'V'); d.tri(5,4,6,4,'v'); d.dtri(5,8,6,6,'v'); d.p('y',7,6,8,9,7,11); d.r(1,7,3,7,'p'); d.p('w',2,9,2,12); d.p('c',13,4,14,6,12,5); }, { use: 'wear' });
add(2, 'Phụ kiện', 'it-coppola', 'Mũ lưỡi trai (coppola) ở Sicilia', 'The Sicilian coppola cap', 'chiếc mũ vải phẳng, hơi cứng ở phần vành, quen thuộc với người đàn ông lớn tuổi ở đảo. Trong nhiều năm, đây là trang phục của nông dân, nay được nhiều người trẻ đội lại như một dấu ấn địa phương.',
  d => { d.e(8,8,6.5,3.5,'a'); d.r(2,8,12,2,'a'); d.r(3,10,11,1,'A'); d.r(10,10,6,2,'A'); d.p('A',5,6,8,5,11,6); d.p('W',6,7,9,7); }, { use: 'wear' });
add(2, 'Phụ kiện', 'it-occhiali', 'Kính mắt Ý', 'Italian eyewear', 'những thương hiệu kính lớn đặt trụ sở ở vùng Veneto, gần các dãy núi Dolomiti. Ngành này xuất khẩu ra nhiều nước trên thế giới.',
  d => { d.r(1,6,6,5,'k'); d.r(9,6,6,5,'k'); d.r(2,7,4,3,'c'); d.r(10,7,4,3,'c'); d.l(7,7,8,7,'k'); d.p('w',3,7,11,7); d.p('k',0,5,15,5); }, { use: 'wear' });

// ----- Nhà ở -----
add(2, 'Nhà ở', 'it-trullo', 'Nhà trullo ở Alberobello', 'The trulli of Alberobello', 'nhà đá trắng mái hình nón xếp bằng đá không dùng vữa, đặc trưng của vùng Puglia. Khu trullo ở đây là di sản thế giới, và có nhiều giả thuyết về lý do người ta xây kiểu nhà này.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); for(const [x,h] of [[1,0],[9,1]]){ d.tri(x,3+h,6,6,'A'); d.r(x,9,6,4,'w'); d.r(x+2,10,2,3,'N'); d.p('w',x+3,2+h); d.p('w',x+2,6,x+3,7); } }, SC);
add(2, 'Nhà ở', 'it-palazzo', 'Cung điện palazzo', 'The palazzo', 'kiểu nhà lớn nhiều tầng của gia đình quý tộc và thương nhân ở các thành phố như Firenze, Venezia và Roma. Nhiều palazzo ngày nay được dùng làm bảo tàng, khách sạn hoặc căn hộ.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.r(2,3,12,11,'t'); d.r(1,2,14,1,'n'); for(const y of [4,7]) for(let x=3;x<14;x+=3){ d.r(x,y,2,2,'B'); d.p('e',x,y-1,x+1,y-1); } d.r(6,10,4,4,'N'); d.p('N',7,9,8,9); d.p('B',3,11,12,11); }, SC);
add(2, 'Nhà ở', 'it-burano', 'Nhà nhiều màu ở Burano', 'The colourful houses of Burano', 'các ngôi nhà sơn màu sáng rực dọc kênh đào trên đảo gần Venezia. Mỗi màu thường do chủ nhà chọn, và việc đổi màu phải xin phép chính quyền.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); [['r',0],['y',4],['b',8],['p',12]].forEach(([c,x],i)=>{ d.r(x,4+(i%2),4,8-(i%2),c); d.r(x+1,6+(i%2),2,2,'w'); d.r(x+1,10,2,2,'G'); d.r(x,3+(i%2),4,1,'N'); }); d.p('w',3,14,10,13); }, SC);
add(2, 'Nhà ở', 'it-sangimignano', 'Tháp nhà San Gimignano', 'The towers of San Gimignano', 'những tháp đá cao do các gia đình giàu dựng ở thị trấn Toscana thời Trung cổ để thể hiện quyền lực. Hiện còn lại một số tháp của thời đó.',
  d => { d.bg('u'); d.r(0,13,16,3,'g'); d.r(2,3,3,10,'t'); d.r(7,5,2,8,'n'); d.r(11,1,3,12,'t'); d.p('N',3,5,3,8,12,3,12,7,12,10,7,7); d.r(1,10,14,3,'e'); d.tri(4,7,5,3,'r'); d.p('N',3,11,6,11,10,11,13,11); }, SC);
add(2, 'Nhà ở', 'it-masseria', 'Masseria', 'The masseria farmhouse', 'trang trại lớn có tường đá kiên cố ở vùng Puglia, trước đây là nơi canh tác và phòng thủ trước cướp biển. Nhiều nơi ngày nay được cải tạo thành nhà nghỉ nông trại.',
  d => { d.bg('c'); d.r(0,12,16,4,'h'); d.r(1,6,14,6,'w'); for(let x=1;x<15;x+=2) d.p('w',x,5); d.r(5,3,5,3,'w'); d.r(7,9,2,3,'N'); d.p('B',3,8,12,8,7,4); d.r(0,10,1,4,'N'); d.e(14,4,2,2,'G'); d.r(14,5,1,6,'n'); }, SC);
add(2, 'Nhà ở', 'it-chalet', 'Nhà gỗ chalet ở vùng núi Alps', 'The Alpine chalet', 'nhà gỗ mái dốc để tuyết trượt xuống, ban công đầy hoa vào mùa hè. Kiểu nhà này thường thấy ở vùng Trentino-Alto Adige.',
  d => { d.bg('c'); d.tri(0,1,16,7,'N'); d.r(2,7,12,7,'n'); d.r(2,10,12,1,'N'); d.p('r',3,9,5,9,7,9,9,9,11,9); d.p('g',4,9,6,9,8,9,10,9,12,9); d.r(4,12,2,2,'y'); d.r(10,12,2,2,'y'); d.r(7,11,2,3,'N'); d.p('y',7,5,8,5); d.r(0,14,16,2,'g'); }, SC);

// ----- Đồ dùng và đời sống -----
add(2, 'Đồ dùng và đời sống', 'it-moka', 'Ấm moka (moka pot)', 'The moka pot', 'ấm pha cà phê ba phần bằng nhôm, dùng hơi nước để đẩy nước nóng qua bột cà phê. Gần như nhà nào ở Ý cũng có một chiếc trên bếp.',
  d => { d.dtri(4,8,8,1,'a'); d.r(5,9,6,5,'a'); d.r(6,7,4,1,'A'); d.tri(4,2,8,5,'a'); d.p('k',7,1,8,1); d.l(12,3,14,5,'k'); d.l(14,5,13,8,'k'); d.p('a',3,3); d.p('w',6,4,6,11); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'it-murano', 'Thủy tinh Murano', 'Murano glass', 'nghề thổi thủy tinh lâu đời trên đảo Murano gần Venezia, tạo ra bình, đèn chùm và chuỗi hạt nhiều màu. Nhiều lò thủy tinh vẫn hoạt động và cho du khách xem trực tiếp.',
  d => { d.e(8,10,4.5,4.5,'t'); d.e(8,10,4.5,4.5,'C'); d.r(7,3,2,3,'c'); d.e(8,3,2.4,1,'c'); d.p('r',5,10,9,12,11,9); d.p('y',7,8,10,11,6,12); d.p('w',6,7,6,8,5,9); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'it-ceramica', 'Gốm sứ Deruta và Faenza', 'Deruta and Faenza ceramics', 'gốm tráng men màu vẽ tay ở Umbria và Emilia-Romagna, thường dùng làm chén, đĩa và gạch trang trí. Các họa tiết hoa và ánh men bóng là dấu hiệu dễ nhận.',
  d => { d.e(8,8,7,7,'w'); d.e(8,8,5,5,'b'); d.e(8,8,3.8,3.8,'w'); d.e(8,8,1.6,1.6,'y'); d.p('r',8,5,8,11,5,8,11,8); d.p('g',6,6,10,6,6,10,10,10); d.p('y',8,1,8,14,1,8,14,8); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'it-mattarello', 'Máy cán mỳ và bảng cán bột (máy pasta, mattarello)', 'Pasta machine and rolling pin', 'dụng cụ cán bột làm mì tươi trong bếp gia đình. Ở miền bắc, nhiều người vẫn dùng cây cán dài để làm tờ mì mỏng.',
  d => { d.l(2,13,13,2,'t'); d.l(3,13,13,3,'t'); d.l(2,12,12,2,'t'); d.p('n',1,14,2,14,14,1,14,2); d.r(8,10,7,4,'a'); d.r(8,10,7,1,'l'); d.p('y',9,14,11,14,13,14,10,15); d.p('k',15,11); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'it-vespa', 'Xe Vespa và Fiat 500', 'The Vespa and the Fiat 500', 'hai phương tiện biểu tượng của Ý sau chiến tranh, nhỏ gọn, rẻ và dễ đi trong phố cổ hẹp. Hai loại xe này vẫn được yêu thích như biểu tượng phong cách sống.',
  d => { d.e(5,8,4.5,3,'t'); d.r(2,7,6,4,'t'); d.e(5,7,4,2,'c'); d.r(2,4,3,1,'N'); d.l(11,3,12,10,'t'); d.l(12,3,13,10,'t'); d.p('k',10,2,12,2,13,2); d.p('y',13,4); d.r(7,9,6,2,'t'); d.e(3.5,12,2.2,2.2,'k'); d.e(12.5,12,2.2,2.2,'k'); d.p('a',3,12,12,12); }, { use: 'hold' });
add(2, 'Đồ dùng và đời sống', 'it-passeggiata', 'Cuộc dạo chơi buổi chiều (passeggiata)', 'The evening passeggiata', 'thói quen đi dạo chậm rãi quanh quảng trường vào cuối chiều, để gặp hàng xóm và trò chuyện. Đây là nghi thức xã hội quan trọng, nhất là ở các thị trấn nhỏ.',
  d => { d.bg('o'); d.r(0,12,16,4,'t'); d.r(1,4,1,8,'k'); d.p('y',0,3,1,3,2,3,1,2); for(const [x,c] of [[5,'b'],[9,'r'],[12,'G']]){ d.e(x+.5,6,1.4,1.4,'s'); d.r(x,8,2,3,c); d.p('k',x,11,x+1,12); d.p('N',x,4,x+1,4); } d.p('w',14,2); }, SC);
add(2, 'Đồ dùng và đời sống', 'it-riposo', 'Giờ nghỉ trưa (riposo)', 'The afternoon riposo', 'ở nhiều thị trấn miền trung và nam, cửa hàng thường đóng cửa vài tiếng sau trưa. Ở các thành phố lớn ở miền bắc, thói quen này ít phổ biến hơn.',
  d => { d.bg('e'); d.e(13,2,2,2,'y'); d.r(2,4,9,10,'t'); d.r(3,6,7,8,'n'); for(let y=7;y<13;y+=2) d.r(3,y,7,1,'N'); d.tri(1,3,11,2,'r'); d.r(5,9,3,2,'w'); d.p('k',13,7,14,7,13,8,13,9,14,9); d.r(0,14,16,2,'a'); }, SC);
add(2, 'Đồ dùng và đời sống', 'it-gesti', 'Cử chỉ tay', 'Italian hand gestures', 'người Ý dùng rất nhiều động tác tay để diễn đạt ý, chẳng hạn gôm các ngón tay lại và lắc nhẹ để hỏi “bạn muốn gì thế”. Nhiều cử chỉ có nghĩa khác nhau tùy vùng.',
  d => { d.r(5,9,6,4,'s'); d.tri(4,3,8,6,'s'); d.p('s',7,2,8,2); d.l(6,5,7,9,'S'); d.l(10,5,9,9,'S'); d.l(8,3,8,8,'S'); d.r(5,13,6,2,'b'); d.p('y',2,5,13,5,1,8,14,8,3,2,12,2); }, { use: 'hold' });
