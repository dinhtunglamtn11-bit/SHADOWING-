import { add, SC, setCC } from './pass-kit.js';
setCC('it');
// Ý · Nhóm 1: Nơi chốn và thiên nhiên

// ----- Địa danh -----
add(1, 'Địa danh', 'it-colosseo', 'Đấu trường Colosseo (Colosseum)', 'The Colosseum', 'đấu trường hình bầu dục khởi công khoảng năm 70 và khánh thành năm 80 dưới thời hoàng đế Titus, có sức chứa ước tính hàng chục nghìn khán giả. Đây là biểu tượng quen thuộc nhất của thành Rome cổ đại, nơi từng diễn ra các trận đấu võ sĩ giác đấu.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.e(8,7,7.5,3,'t'); d.r(1,6,14,7,'t'); d.r(11,4,4,3,'c'); for(const y of [7,10]) for(let x=2;x<15;x+=2){ d.r(x,y,1,2,'N'); } d.r(1,9,14,1,'n'); d.r(1,12,14,1,'n'); }, SC);
add(1, 'Địa danh', 'it-foro', 'Đấu trường và Forum La Mã (Foro Romano)', 'The Roman Forum', 'khu quảng trường trung tâm của Rome cổ, nơi có đền thờ, nhà họp và đại lộ khải hoàn. Đi bộ qua đây là cách dễ nhất để hình dung đời sống chính trị và tôn giáo của người La Mã.',
  d => { d.bg('c'); d.r(0,12,16,4,'h'); for(const x of [2,5,8]){ d.r(x,4,2,8,'W'); d.r(x-1,3,4,1,'w'); } d.r(1,2,10,1,'t'); d.r(12,8,3,4,'t'); d.e(13.5,8,1.5,1.5,'N'); d.p('W',11,13,3,14,14,14); }, SC);
add(1, 'Địa danh', 'it-pantheon', 'Đền Pantheon', 'The Pantheon', 'công trình La Mã có mái vòm bê tông lớn với lỗ tròn ở đỉnh để ánh sáng chiếu xuống. Đền được xây lại dưới thời hoàng đế Hadrian vào khoảng thế kỷ 2 và vẫn đứng vững đến nay.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.fan(8,7,6,'t'); d.p('N',7,2,8,2); d.r(2,7,12,2,'W'); d.tri(2,5,12,3,'w'); for(let x=3;x<14;x+=2) d.r(x,9,1,5,'w'); d.r(2,9,1,5,'t'); d.r(7,11,2,3,'N'); }, SC);
add(1, 'Địa danh', 'it-venezia', 'Thành phố Venezia (Venice)', 'Venice and its canals', 'thành phố xây trên khoảng 118 hòn đảo nhỏ trong đầm phá, với hệ thống kênh đào thay cho đường phố. Người dân và du khách di chuyển bằng thuyền buýt nước (vaporetto), thuyền gondola và đi bộ qua hàng trăm cây cầu.',
  d => { d.bg('c'); d.r(0,10,16,6,'C'); d.r(0,3,4,7,'o'); d.r(4,5,4,5,'e'); d.r(11,2,5,8,'r'); for(const [x,y] of [[1,5],[5,7],[12,4],[14,4],[12,7]]) d.r(x,y,1,2,'N'); d.l(2,13,12,13,'k'); d.l(3,14,11,14,'k'); d.p('k',1,12,13,12); d.r(10,10,1,3,'N'); d.e(10.5,9.5,1,1,'s'); d.p('w',2,11,8,11,13,15); }, SC);
add(1, 'Địa danh', 'it-duomo-fi', 'Nhà thờ chính tòa Duomo ở Firenze (Florence)', 'The Florence Cathedral dome', 'nổi tiếng với mái vòm gạch lớn do kiến trúc sư Filippo Brunelleschi thiết kế vào đầu thế kỷ 15. Thành phố Firenze được xem là cái nôi của thời Phục hưng.',
  d => { d.bg('c'); d.r(0,14,16,2,'a'); d.fan(8,9,5.5,'r'); d.l(8,3,8,8,'w'); d.l(5,5,4,8,'w'); d.l(11,5,12,8,'w'); d.r(7,1,2,3,'w'); d.p('y',7,0); d.r(2,9,12,5,'e'); d.r(3,10,2,3,'G'); d.r(7,10,2,4,'N'); d.r(11,10,2,3,'G'); d.r(2,9,12,1,'G'); }, SC);
add(1, 'Địa danh', 'it-pisa', 'Tháp nghiêng Pisa', 'The Leaning Tower of Pisa', 'tháp chuông của nhà thờ chính tòa ở thành phố Pisa, bắt đầu nghiêng ngay khi xây vì nền đất mềm. Các đợt gia cố trong thế kỷ 20 đã giữ cho tháp không đổ.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); for(let i=0;i<6;i++){ const y=11-i*2, x=5+Math.floor(i*0.8); d.r(x,y,5,2,'W'); d.p('N',x+1,y+1,x+3,y+1); d.r(x,y,5,1,'w'); } d.p('r',11,0); }, SC);
add(1, 'Địa danh', 'it-pompeii', 'Di chỉ Pompeii và Herculaneum', 'Pompeii and Herculaneum', 'hai thành phố La Mã bị tro núi lửa vùi lấp năm 79. Nhờ thế, nhà cửa, tranh tường và đồ dùng hằng ngày được giữ lại khá nguyên vẹn.',
  d => { d.bg('c'); d.tri(7,1,9,8,'a'); d.p('r',11,1,12,1); d.e(12,1,2,1,'W'); d.r(0,9,16,7,'t'); d.r(1,6,2,6,'W'); d.r(5,7,2,5,'W'); d.r(0,5,4,1,'w'); d.r(9,10,6,3,'n'); d.p('N',10,11,13,11,3,14,8,14,12,15); }, SC);
add(1, 'Địa danh', 'it-vatican', 'Vatican và Quảng trường Thánh Phêrô (Piazza San Pietro)', 'The Vatican and St Peter\'s Square', 'quốc gia nhỏ nhất thế giới nằm gọn trong thành Rome, trung tâm của Giáo hội Công giáo. Ở đây có Vương cung thánh đường Thánh Phêrô và Bảo tàng Vatican.',
  d => { d.bg('c'); d.r(0,12,16,4,'t'); d.fan(8,6,3.5,'a'); d.p('y',8,1,8,2); d.r(3,6,10,6,'e'); for(let x=4;x<13;x+=2) d.r(x,8,1,4,'t'); d.l(0,10,3,9,'W'); d.l(13,9,15,10,'W'); for(const x of [0,2,13,15]) d.r(x,10,1,3,'W'); d.r(8,12,1,3,'N'); }, SC);
add(1, 'Địa danh', 'it-trevi', 'Đài phun nước Trevi (Fontana di Trevi)', 'The Trevi Fountain', 'đài phun nước kiểu Baroque nổi tiếng ở Rome, nơi du khách thường ném đồng xu qua vai để cầu mong quay lại. Đây là một thói quen dân gian, không phải nghi lễ chính thức.',
  d => { d.bg('e'); d.r(2,1,12,9,'W'); d.r(6,2,4,6,'t'); d.e(8,4,1,1,'w'); d.r(7,5,2,3,'w'); for(const x of [3,12]) d.r(x,2,1,8,'w'); d.r(0,10,16,6,'c'); d.r(0,13,16,3,'C'); d.e(5,10,2,1.4,'a'); d.e(11,10,2,1.4,'a'); d.p('w',4,12,8,11,11,13,7,14); d.p('y',13,12,3,14); }, SC);

// ----- Biển, hồ và cảnh quan -----
add(1, 'Biển, hồ và cảnh quan', 'it-amalfi', 'Bờ biển Amalfi (Costiera Amalfitana)', 'The Amalfi Coast', 'dải bờ biển dốc đứng ở miền nam với những ngôi làng màu sắc bám vào vách đá, như Positano và Amalfi. Vùng này nổi tiếng với vườn chanh và con đường ven vách núi nhiều khúc cua.',
  d => { d.bg('c'); d.tri(0,1,12,10,'G'); d.r(0,11,16,5,'C'); for(const [x,y,c] of [[1,8,'w'],[3,7,'o'],[5,8,'p'],[3,9,'y'],[7,9,'e'],[5,6,'w'],[1,10,'r']]){ d.r(x,y,2,2,c); d.p('N',x,y+1); } d.p('y',2,4,7,5); d.p('w',11,13,13,12,8,14); }, SC);
add(1, 'Biển, hồ và cảnh quan', 'it-cinqueterre', 'Cinque Terre', 'Cinque Terre', 'năm ngôi làng ven biển ở vùng Liguria, nối nhau bằng đường mòn đi bộ và tàu hỏa. Nhà cửa nhiều màu xếp tầng trên sườn đồi dốc, phía dưới là biển.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.e(5,12,8,8,'G'); d.r(0,12,16,4,'C'); [['r',2,7],['y',4,6],['p',6,7],['o',8,8],['e',3,9],['r',5,9],['y',7,10],['o',1,10]].forEach(([c,x,y])=>{ d.r(x,y,2,3,c); d.p('B',x,y+1); }); d.p('w',12,14,3,14); d.l(11,12,14,12,'w'); d.p('r',12,11); }, SC);
add(1, 'Biển, hồ và cảnh quan', 'it-laghi', 'Hồ Como và hồ Garda', 'Lake Como and Lake Garda', 'hai trong số các hồ lớn ở miền bắc, nằm dưới chân núi Alps. Quanh hồ có biệt thự, vườn cây và những thị trấn nhỏ, rất hợp để nghỉ dưỡng.',
  d => { d.bg('c'); d.tri(0,2,9,8,'a'); d.tri(6,3,10,7,'A'); d.p('w',4,2,11,3); d.r(0,10,16,6,'C'); d.r(2,8,5,2,'e'); d.tri(2,6,5,2,'r'); d.l(8,9,8,7,'G'); d.l(9,9,9,6,'G'); d.p('w',10,12,13,13,4,14); d.l(9,12,12,12,'w'); d.tri(10,9,2,3,'w'); }, SC);
add(1, 'Biển, hồ và cảnh quan', 'it-capri', 'Đảo Capri', 'The island of Capri', 'đảo nhỏ trong vịnh Napoli, nổi tiếng với vách đá, cảnh biển và hang động ven bờ. Từ thời La Mã, nơi đây đã là chốn nghỉ ngơi của giới quyền quý.',
  d => { d.bg('c'); d.r(0,11,16,5,'C'); d.tri(1,4,9,7,'a'); d.tri(7,6,7,5,'W'); d.e(4,7,2,1.5,'g'); d.e(11,8,2,1,'g'); d.r(13,8,2,3,'a'); d.p('i',5,10,6,10,5,9); d.e(14,2,1.5,1.5,'y'); d.p('w',2,13,9,12,12,14); }, SC);
add(1, 'Biển, hồ và cảnh quan', 'it-dolomiti', 'Dãy Dolomiti (Dolomites)', 'The Dolomites', 'dãy núi đá vôi ở đông bắc, với những đỉnh nhọn màu sáng và đồng cỏ xanh bên dưới. Mùa đông là nơi trượt tuyết, mùa hè là nơi đi bộ đường dài.',
  d => { d.bg('c'); d.tri(0,2,7,10,'l'); d.tri(4,0,7,12,'W'); d.tri(9,3,7,9,'a'); d.p('w',3,3,7,1,12,4); d.l(7,3,6,9,'a'); d.r(0,11,16,5,'g'); for(const x of [2,5,12]) { d.tri(x,9,3,4,'G'); } }, SC);
add(1, 'Biển, hồ và cảnh quan', 'it-matera', 'Thành phố đá Matera (I Sassi di Matera)', 'The Sassi of Matera', 'khu nhà hang đục vào vách đá vôi ở miền nam. Từng bị coi là nơi sống khổ cực, nay khu này là di sản thế giới và là một địa điểm du lịch được yêu thích.',
  d => { d.bg('u'); d.r(0,8,16,8,'t'); [[1,6],[5,5],[9,7],[12,5],[3,9],[7,10],[11,10],[0,12],[5,13],[10,13]].forEach(([x,y])=>{ d.r(x,y,4,3,'t'); d.r(x,y,4,1,'e'); d.p('N',x+1,y+2); }); d.r(7,2,2,4,'t'); d.p('r',7,1); }, SC);
add(1, 'Biển, hồ và cảnh quan', 'it-agrigento', 'Thung lũng đền Agrigento (Valle dei Templi)', 'The Valley of the Temples', 'nhóm đền Hy Lạp cổ trên đảo Sicilia, dựng từ thời người Hy Lạp lập thuộc địa ở đây. Nhiều đền vẫn còn các hàng cột đá nguyên vẹn.',
  d => { d.bg('c'); d.r(0,12,16,4,'h'); d.r(1,5,14,2,'t'); d.tri(1,2,14,3,'u'); for(let x=2;x<15;x+=3) d.r(x,7,1,5,'t'); d.r(1,11,14,1,'n'); d.e(1.5,13,1.5,1.5,'G'); d.e(14,14,1.5,1.5,'G'); }, SC);

// ----- Mùa và thiên nhiên -----
add(1, 'Mùa và thiên nhiên', 'it-spring', 'Mùa xuân', 'Spring', 'hoa nở ở Toscana và các vườn Roma, nhiệt độ dễ chịu nên là mùa lý tưởng để tham quan thành phố. Đồng thời đây là mùa của nhiều lễ Phục sinh (Pasqua) trên khắp cả nước.',
  d => { d.bg('c'); d.r(0,10,16,6,'g'); d.r(7,5,2,6,'n'); d.e(8,4,5,3.5,'p'); d.p('w',6,3,10,4,8,2); for(const [x,y,c] of [[2,12,'r'],[5,14,'y'],[11,12,'w'],[13,14,'v']]) d.p(c,x,y,x+1,y); }, SC);
add(1, 'Mùa và thiên nhiên', 'it-summer', 'Mùa hè', 'Summer', 'nóng và khô ở miền trung, miền nam; người Ý thường ra biển, đặc biệt vào kỳ nghỉ giữa tháng 8 gọi là Ferragosto. Nhiều cửa hàng nhỏ ở thành phố đóng cửa nghỉ trong giai đoạn này.',
  d => { d.bg('c'); d.e(12,3,2.5,2.5,'y'); d.r(0,8,16,4,'C'); d.r(0,12,16,4,'t'); d.tri(1,7,7,3,'r'); d.p('w',3,8,5,9); d.r(4,10,1,4,'N'); d.r(9,13,5,2,'b'); d.p('w',2,10,13,9); }, SC);
add(1, 'Mùa và thiên nhiên', 'it-autumn', 'Mùa thu', 'Autumn', 'mùa thu hoạch nho, ô liu và nấm. Màu lá vàng đỏ phủ khắp đồi Toscana và vùng Piemonte.',
  d => { d.bg('u'); d.r(0,12,16,4,'O'); for(const x of [3,11]){ d.r(x,6,1,6,'N'); d.e(x+.5,5,3,2.6,'o'); d.p('r',x-1,4,x+2,5); } d.e(7,11,1.4,1.4,'v'); d.p('v',8,12,6,12); d.l(7,9,8,8,'G'); d.p('r',2,13,13,14); d.p('y',9,14,5,13); }, SC);
add(1, 'Mùa và thiên nhiên', 'it-winter', 'Mùa đông', 'Winter', 'lạnh và có tuyết ở dãy Alps, Dolomiti; vùng ven biển phía nam ôn hòa hơn. Đây là mùa trượt tuyết và các chợ Giáng sinh ở miền bắc.',
  d => { d.bg('A'); d.tri(0,3,10,9,'a'); d.tri(7,5,9,7,'W'); d.p('w',4,3,5,4,3,4,11,5); d.r(0,12,16,4,'w'); d.l(3,13,7,15,'k'); d.l(5,12,9,14,'k'); d.p('w',2,1,13,2,8,2,14,7); }, SC);
add(1, 'Mùa và thiên nhiên', 'it-apennini', 'Dãy Apennini (Apennines)', 'The Apennines', 'dãy núi chạy dọc “sống lưng” của bán đảo từ bắc xuống nam, chia đất nước thành hai bên sườn có khí hậu khác nhau. Dãy này cũng quyết định cách các vùng tách biệt nhau trong lịch sử.',
  d => { d.bg('c'); d.e(2,10,6,5,'g'); d.e(9,9,5,6,'G'); d.e(15,11,5,5,'g'); d.r(0,13,16,3,'h'); d.l(9,4,7,9,'t'); d.l(7,9,10,15,'t'); d.p('w',13,2,3,3); }, SC);
add(1, 'Mùa và thiên nhiên', 'it-colline', 'Các cánh đồng hoa và đồi ô liu', 'Flower fields and olive hills', 'khung cảnh quen thuộc của miền Toscana và Umbria, với hàng cây bách (cypress) xếp dọc đường. Đây cũng là hình ảnh thường thấy trên bưu thiếp du lịch của Ý.',
  d => { d.bg('c'); d.e(4,13,8,5,'y'); d.e(13,14,8,6,'g'); for(const x of [9,11,13]){ d.tri(x,5,2,2,'G'); d.r(x,6,2,5,'G'); } d.r(3,7,1,3,'N'); d.e(3.5,6,2.4,2,'h'); d.p('r',2,13,6,14,10,13); }, SC);

// ----- Vùng miền -----
add(1, 'Vùng miền', 'it-nord', 'Miền Bắc (Lombardia, Piemonte, Veneto)', 'The North', 'vùng công nghiệp và tài chính phát triển, có thành phố Milano (Milan) và Torino. Khí hậu có bốn mùa rõ rệt và đồng bằng sông Po rộng lớn.',
  d => { d.bg('c'); d.tri(0,1,8,6,'a'); d.tri(6,2,10,5,'a'); d.p('w',3,1,11,2); d.r(0,13,16,3,'g'); d.r(2,7,3,6,'A'); d.r(6,5,3,8,'a'); d.r(10,8,5,5,'r'); d.p('y',3,9,7,7,7,10,11,10,13,10); d.r(11,6,1,2,'N'); }, SC);
add(1, 'Vùng miền', 'it-centro', 'Miền Trung (Toscana, Lazio, Umbria)', 'The Centre', 'nơi có Rome, Firenze và vùng đồi thơ mộng. Đây là trung tâm lịch sử, nghệ thuật và tôn giáo của nước Ý.',
  d => { d.bg('u'); d.e(3,12,6,4,'g'); d.e(13,13,7,4,'G'); d.r(0,13,16,3,'h'); d.r(5,6,6,5,'t'); d.tri(5,3,6,3,'r'); d.r(12,3,2,9,'t'); d.p('r',12,2,13,2); d.p('N',7,8,9,8,12,5); }, SC);
add(1, 'Vùng miền', 'it-sud', 'Miền Nam (Campania, Puglia, Calabria)', 'The South', 'khí hậu ấm hơn, nhịp sống chậm hơn, với bờ biển dài và ẩm thực dùng nhiều cà chua, dầu ô liu. Napoli là thành phố lớn nhất vùng này.',
  d => { d.bg('c'); d.r(0,9,16,4,'C'); d.r(0,13,16,3,'t'); d.r(1,5,5,5,'w'); d.r(1,4,5,1,'a'); d.p('b',2,7,4,7); d.e(11,6,1.8,1.8,'r'); d.e(13,8,1.8,1.8,'r'); d.p('g',11,4,13,6); d.p('y',14,2,15,2,14,3); d.r(9,10,1,5,'N'); d.e(9.5,9,2.5,1.5,'G'); }, SC);
add(1, 'Vùng miền', 'it-isole', 'Đảo Sicilia và Sardegna (Sardinia)', 'Sicily and Sardinia', 'hai hòn đảo lớn có bản sắc riêng, ngôn ngữ địa phương và truyền thống riêng. Sicilia có núi lửa Etna, còn Sardegna nổi tiếng với bãi biển nước trong.',
  d => { d.bg('C'); d.tri(1,4,9,6,'t'); d.r(2,9,7,2,'g'); d.tri(3,2,4,4,'a'); d.p('r',4,1,5,1); d.e(12,11,2.5,4,'t'); d.e(12,11,1.4,2.5,'g'); d.p('c',1,13,5,14,9,3,14,4); }, SC);

// ----- Hiện tượng đặc biệt -----
add(1, 'Hiện tượng đặc biệt', 'it-vesuvio', 'Núi lửa Vesuvio (Vesuvius)', 'Mount Vesuvius', 'núi lửa gần Napoli, nổi tiếng nhất vì vụ phun trào năm 79 vùi lấp Pompeii. Ngày nay núi vẫn được theo dõi chặt chẽ vì có nhiều người sống quanh chân núi.',
  d => { d.bg('u'); d.tri(0,5,16,8,'n'); d.r(6,5,4,1,'N'); d.e(8,3,3,2,'a'); d.e(11,2,2.5,1.8,'W'); d.p('o',7,5,8,5); d.r(0,13,16,3,'C'); d.p('w',2,11,13,11,11,12,4,12); d.p('r',3,12,12,12); }, SC);
add(1, 'Hiện tượng đặc biệt', 'it-etna', 'Núi lửa Etna', 'Mount Etna', 'một trong những núi lửa hoạt động mạnh và cao nhất châu Âu, nằm ở đảo Sicilia. Núi thường phun khói và dung nham ở mức nhỏ, và tro đôi khi làm gián đoạn chuyến bay.',
  d => { d.bg('i'); d.tri(0,4,16,10,'K'); d.r(6,4,4,2,'r'); d.p('y',7,3,8,2,9,3,7,1); d.p('o',6,2,10,1,8,0); d.l(8,6,6,12,'r'); d.l(9,7,11,13,'o'); d.r(0,14,16,2,'G'); d.p('w',2,2,13,3); }, SC);
add(1, 'Hiện tượng đặc biệt', 'it-stromboli', 'Núi lửa Stromboli', 'Stromboli', 'núi lửa trên đảo cùng tên, thường phun lửa đều đặn nên được gọi là “ngọn hải đăng của Địa Trung Hải”. Du khách có thể leo núi có hướng dẫn để ngắm cảnh này.',
  d => { d.bg('B'); d.r(0,12,16,4,'C'); d.tri(3,5,10,7,'k'); d.p('y',7,3,8,2,9,1,6,1,10,3); d.p('o',8,4,7,5,6,3); d.p('r',8,5,10,2); d.p('w',2,2,14,3,4,6); d.p('o',7,13,8,14,9,13); }, SC);
add(1, 'Hiện tượng đặc biệt', 'it-acqualta', 'Nước dâng ở Venice (acqua alta)', 'Acqua alta in Venice', 'hiện tượng thủy triều cao khiến quảng trường San Marco ngập vào mùa thu và mùa đông. Hệ thống rào chắn di động tên MOSE đã được xây để giảm tình trạng này.',
  d => { d.bg('a'); d.r(1,2,3,8,'r'); d.p('w',2,0,2,1); d.r(5,4,10,6,'e'); for(let x=6;x<14;x+=2){ d.r(x,6,1,4,'N'); d.p('N',x,5); } d.r(0,10,16,6,'t'); d.r(0,10,16,6,'C'); d.p('w',3,11,10,12,6,14); d.r(11,11,2,3,'y'); d.r(11,10,2,1,'k'); d.p('t',2,13,5,13); }, SC);
add(1, 'Hiện tượng đặc biệt', 'it-enrosadira', 'Ánh “hồng núi” trên dãy Dolomiti (enrosadira)', 'The pink glow of the Dolomites', 'lúc bình minh hoặc hoàng hôn, đá vôi ở đây chuyển sang sắc hồng và đỏ cam. Tên gọi này có nghĩa tương đương “nhuộm hồng” trong tiếng địa phương.',
  d => { d.bg('V'); d.tri(0,3,7,10,'p'); d.tri(4,1,7,12,'o'); d.tri(9,4,7,9,'x'); d.p('y',7,2,3,4); d.r(0,12,16,4,'K'); for(const x of [1,4,12]) d.tri(x,10,3,4,'i'); d.p('w',13,1,2,1); }, SC);
add(1, 'Hiện tượng đặc biệt', 'it-grotta', 'Hang Xanh ở đảo Capri (Grotta Azzurra)', 'The Blue Grotto', 'hang biển nơi ánh sáng chiếu qua nước làm mặt nước có màu xanh lam sáng. Du khách thường phải vào bằng thuyền nhỏ khi sóng yên.',
  d => { d.bg('i'); d.e(8,9,6,5,'B'); d.e(8,11,5,3.5,'b'); d.r(0,12,16,4,'C'); d.r(3,13,10,2,'c'); d.l(5,11,11,11,'N'); d.p('N',6,12,10,12); d.p('k',8,9,8,10); d.p('w',4,14,11,13,9,15); }, SC);
