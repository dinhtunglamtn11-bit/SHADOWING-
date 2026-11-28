import { add, SC, setCC } from './pass-kit.js';
setCC('ca');
// Canada · Nhóm 1: Nơi chốn và thiên nhiên

// ----- Địa danh -----
add(1, 'Địa danh', 'ca-niagara', 'Thác Niagara (Niagara Falls)', 'Niagara Falls', 'hệ thống thác nước trên biên giới Ontario và bang New York, nổi tiếng nhất là Horseshoe Falls phía Canada. Khi trời tối, thác được chiếu đèn nhiều màu.',
  d => { d.bg('B'); d.r(0,3,16,2,'G'); d.r(1,5,14,7,'c'); for(let x=2;x<15;x+=2) d.r(x,5,1,7,'w'); d.p('p',2,7,4,9); d.p('v',12,8,14,6); d.p('y',7,6,9,10); d.r(0,12,16,4,'C'); d.e(6,12,4,1.6,'w'); d.e(11,12,3,1.4,'w'); d.p('y',2,1,13,1,8,0); }, SC);
add(1, 'Địa danh', 'ca-banff', 'Banff và hồ Louise', 'Banff and Lake Louise', 'vườn quốc gia lâu đời nhất Canada, nằm trên dãy Rocky ở Alberta. Hồ Louise có màu xanh ngọc nhờ bột đá do băng hà mang xuống.',
  d => { d.bg('c'); d.tri(0,2,9,8,'A'); d.tri(6,1,10,9,'a'); d.tri(3,2,3,3,'w'); d.tri(9,1,4,3,'w'); d.r(0,9,16,7,'C'); d.r(2,10,12,4,'c'); for(const x of [0,2,13,15]) d.tri(x-1,7,3,5,'G'); d.p('w',5,11,6,11,10,13); d.r(6,13,4,1,'r'); d.r(0,15,16,1,'G'); }, SC);
add(1, 'Địa danh', 'ca-jasper', 'Jasper và Icefields Parkway', 'Jasper and Icefields Parkway', 'con đường núi dài nối Banff với Jasper, chạy qua nhiều băng hà và đỉnh núi. Nhiều du khách gặp hươu, dê núi và gấu trên đường.',
  d => { d.bg('c'); d.tri(0,2,10,9,'A'); d.tri(7,3,9,8,'A'); d.tri(3,2,4,3,'w'); d.r(9,6,4,5,'l'); d.r(0,10,16,6,'g'); d.tri(3,10,10,6,'K'); d.p('y',8,11,8,13,8,15); d.e(13,13,1.6,1.2,'n'); d.p('n',14,11,15,10); d.p('G',1,12,2,11,2,13); }, SC);
add(1, 'Địa danh', 'ca-toronto-cn', 'Toronto và tháp CN Tower', 'Toronto and the CN Tower', 'thành phố đông dân nhất Canada, bên bờ hồ Ontario. Tháp CN cao 553 m từng là công trình tự đứng cao nhất thế giới.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); for(const [x,h,c] of [[0,4,'A'],[2,6,'a'],[11,5,'B'],[13,7,'a']]){ d.r(x,12-h,2,h,c); d.p('y',x,13-h+1,x+1,10); } d.r(7,2,1,10,'a'); d.r(6,6,3,2,'A'); d.r(6,4,3,1,'K'); d.p('r',7,0,7,1); d.r(6,10,3,2,'a'); d.p('w',3,14,9,13,13,14); }, SC);
add(1, 'Địa danh', 'ca-ottawa', 'Ottawa', 'Ottawa Parliament and Rideau Canal', 'thủ đô nằm bên sông Ottawa, nơi có Tòa nhà Quốc hội mái xanh trên đồi Parliament. Kinh đào Rideau đóng băng mùa đông thành đường trượt băng dài.',
  d => { d.bg('a'); d.r(0,8,16,3,'N'); d.r(1,6,14,4,'t'); d.r(7,2,2,8,'t'); d.tri(6,0,4,3,'g'); d.r(1,5,4,1,'g'); d.r(11,5,4,1,'g'); for(let x=2;x<15;x+=2) d.p('B',x,8); d.p('w',7,3,8,3); d.r(0,11,16,5,'c'); d.l(2,12,7,15,'w'); d.p('r',10,12); d.p('k',10,13,10,14); }, SC);
add(1, 'Địa danh', 'ca-montreal', 'Montréal', 'Montreal old town', 'thành phố nói tiếng Pháp trên một hòn đảo giữa sông Saint-Laurent. Khu phố cổ Vieux-Montréal có đường lát đá và nhà thờ lớn.',
  d => { d.bg('c'); d.tri(3,3,13,6,'G'); d.r(0,13,16,3,'a'); for(const x of [1,4]){ d.r(x,7,3,6,'t'); d.tri(x,5,3,2,'N'); d.p('B',x+1,9,x+1,11); } d.r(9,6,2,7,'W'); d.r(13,6,2,7,'W'); d.r(11,8,2,5,'e'); d.p('A',9,5,10,5,13,5,14,5,9,4,14,4); d.p('B',12,10,12,11); for(let x=0;x<16;x+=2) d.p('A',x,14,x+1,15); }, SC);
add(1, 'Địa danh', 'ca-quebec-city', 'Québec City', 'Quebec City walls and Chateau', 'thành phố cổ có tường thành bao quanh, di sản UNESCO. Khách sạn Château Frontenac là biểu tượng của bờ sông.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.r(0,9,16,3,'a'); for(let x=0;x<16;x+=2) d.p('a',x,8); d.r(5,4,6,5,'t'); d.r(7,2,2,3,'t'); d.tri(6,0,4,3,'g'); d.tri(3,3,4,2,'g'); d.tri(9,3,4,2,'g'); d.p('B',6,6,8,6,10,6); d.fan(8,12,1.6,'N'); d.p('w',3,14,12,14); }, SC);
add(1, 'Địa danh', 'ca-vancouver', 'Vancouver và công viên Stanley', 'Vancouver and Stanley Park', 'thành phố cảng ở Tây Nam giữa biển và núi. Stanley Park là khu rừng và đường đi bộ ven biển rất được yêu thích.',
  d => { d.bg('c'); d.tri(0,2,10,7,'A'); d.tri(7,3,9,6,'a'); d.p('w',4,2,5,2,11,3); for(const [x,h] of [[7,4],[9,6],[11,5],[13,3]]){ d.r(x,10-h,2,h,x%4===1?'B':'b'); d.p('w',x,11-h); } d.r(0,10,16,6,'C'); for(const x of [0,2,4]) d.tri(x-1,6,4,6,'G'); d.e(2,12,4,1.4,'g'); d.p('w',9,13,10,13,13,14); }, SC);
add(1, 'Địa danh', 'ca-victoria', 'Victoria và đảo Vancouver', 'Victoria and Vancouver Island', 'thành phố thủ phủ British Columbia với khí hậu ôn hòa, nổi tiếng với vườn hoa và khách sạn kiểu cổ. Đảo còn có rừng mưa ven biển.',
  d => { d.bg('c'); d.r(0,11,16,5,'g'); d.r(3,5,10,6,'R'); d.r(2,4,12,1,'g'); d.tri(6,1,4,3,'g'); for(const x of [4,6,9,11]) d.p('y',x,7,x,9); d.r(7,8,2,3,'N'); for(let x=1;x<16;x+=2){ d.p(['p','y','r','v'][(x>>1)%4],x,12,x,14); d.p('G',x,13,x,15); } }, SC);
add(1, 'Địa danh', 'ca-peggys-cove', 'Halifax và Peggy\'s Cove', 'Peggy\'s Cove lighthouse', 'thành phố cảng ở bờ đông và ngọn hải đăng trên đá hoa cương gần đó. Đây là bức ảnh quen thuộc của vùng Maritimes.',
  d => { d.bg('c'); d.r(0,9,16,7,'B'); d.e(7,14,9,3.4,'a'); d.e(5,13,4,2,'A'); d.r(7,4,4,7,'w'); d.r(7,2,4,2,'r'); d.r(8,1,2,1,'r'); d.p('y',8,3,9,3); d.p('k',9,6,9,9); d.p('w',13,11,14,12,15,11,1,10); d.p('W',3,14,10,13); }, SC);
add(1, 'Địa danh', 'ca-montmorency', 'Thác Montmorency', 'Montmorency Falls', 'thác cao hơn Niagara, nằm gần Québec City. Du khách có thể đi cáp treo xem thác.',
  d => { d.bg('c'); d.r(0,2,16,2,'G'); d.r(0,4,5,10,'N'); d.r(11,4,5,10,'N'); d.r(5,4,6,10,'w'); d.p('c',6,5,6,9,8,6,8,11,9,4,10,8,10,12); d.r(0,13,16,3,'C'); d.e(8,13,4,1.6,'w'); d.l(0,5,15,8,'k'); d.r(2,7,3,2,'r'); d.p('y',3,7); }, SC);

// ----- Núi, rừng, sông và biển -----
add(1, 'Núi, rừng, sông và biển', 'ca-rockies', 'Dãy núi Rocky (Rockies)', 'Rocky Mountains', 'dãy núi lớn ở tây Canada với nhiều đỉnh phủ tuyết quanh năm. Khách đến đây để đi bộ và trượt tuyết.',
  d => { d.bg('c'); d.tri(0,4,9,10,'A'); d.tri(4,1,10,13,'K'); d.tri(10,5,8,9,'A'); d.tri(7,1,4,4,'w'); d.tri(2,4,4,3,'w'); d.tri(12,5,4,3,'w'); d.r(0,13,16,3,'G'); for(let x=1;x<16;x+=3) d.tri(x-1,11,3,4,'g'); d.e(14,2,1.4,1.4,'y'); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-great-lakes', 'Hồ Lớn (Great Lakes)', 'Great Lakes', 'hệ thống hồ nước ngọt lớn chung biên giới với Hoa Kỳ, gồm Superior, Huron, Erie và Ontario. Hồ lớn đến mức nhìn như biển.',
  d => { d.bg('g'); d.e(4,4,4.4,2.4,'b'); d.e(5,5.5,3,1.4,'b'); d.e(7,9,1.6,4,'b'); d.e(10,7,2.6,3,'b'); d.e(12,10,1.2,1.2,'b'); d.e(12,12.5,3,1,'b'); d.e(14,10,1.8,.8,'b'); d.l(8,5,10,7,'b'); d.p('c',3,3,6,4,10,6,7,8,12,12); d.p('G',2,10,3,12,13,2,14,4,2,14,9,14); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-saint-laurent', 'Sông Saint-Laurent', 'Saint Lawrence River', 'con sông dài nối Hồ Lớn với Đại Tây Dương, là tuyến đường quan trọng trong lịch sử. Nhiều thành phố lớn nằm dọc hai bờ sông.',
  d => { d.bg('g'); d.l(0,13,6,10,'b'); d.l(0,14,7,11,'b'); d.l(6,10,10,6,'b'); d.l(7,11,11,7,'b'); d.l(10,6,15,2,'b'); d.l(11,7,15,5,'b'); d.r(13,2,3,3,'b'); d.p('C',12,5,13,4,14,4); for(const [x,y] of [[2,10],[5,13],[12,9]]){ d.r(x,y,2,2,'e'); d.p('r',x,y-1,x+1,y-1); } d.p('G',2,3,3,4,5,2,13,13,9,14); d.p('w',8,9,9,8); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-mackenzie', 'Sông Mackenzie', 'Mackenzie River', 'sông lớn nhất Canada chảy về phía bắc, đổ ra biển Bắc Cực. Dọc theo sông dân cư rất thưa.',
  d => { d.bg('l'); d.r(0,7,16,9,'a'); d.r(0,6,16,2,'G'); for(let x=0;x<16;x+=2) d.p('G',x,5); d.l(8,15,6,12,'C'); d.l(9,15,7,12,'C'); d.l(6,12,10,10,'C'); d.l(7,12,11,10,'C'); d.l(10,10,8,8,'C'); d.l(8,8,9,7,'C'); d.p('w',1,10,2,10,13,13,14,13,3,13); d.p('k',11,3,12,2,13,3); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-boreal', 'Rừng boréal (rừng tùng bắc)', 'Boreal forest', 'dải rừng lá kim rộng lớn trải dài phía bắc dân cư. Đây là một trong những khu rừng lớn nhất thế giới.',
  d => { d.bg('c'); d.r(0,12,16,4,'G'); for(const [x,y] of [[2,4],[7,2],[12,3]]){ d.tri(x-2,y,6,4,'G'); d.tri(x-3,y+3,8,4,'G'); d.tri(x-3,y+6,8,5,'g'); d.r(x,y+11,1,2,'N'); } d.p('w',2,4,7,2,12,3); d.p('N',5,14,10,14); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-great-bear', 'Rừng mưa ven biển Great Bear', 'Great Bear Rainforest spirit bear', 'rừng mưa ôn đới ở biển British Columbia, nơi có gấu Kermode (gấu trắng). Đây là lãnh thổ truyền thống của nhiều cộng đồng bản địa.',
  d => { d.bg('G'); d.r(1,0,2,13,'N'); d.r(13,0,2,13,'N'); d.p('g',3,2,4,3,5,2,11,4,12,3,9,1,0,6,15,7); d.r(0,12,16,4,'h'); d.r(0,14,16,2,'C'); d.e(8,10,4,2.8,'w'); d.e(8,7,2.6,2.4,'w'); d.p('w',6,5,10,5,6,12,6,13,10,12,10,13); d.p('k',7,7,9,7,8,8); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-fundy', 'Vịnh Fundy', 'Bay of Fundy', 'vịnh biển ở đông nam, nổi tiếng với biên độ thủy triều thuộc hàng lớn nhất thế giới. Nước lên xuống hàng chục mét mỗi ngày.',
  d => { d.bg('c'); d.r(0,11,16,5,'u'); d.r(0,9,16,3,'C'); for(const [x,w] of [[2,4],[10,3]]){ d.r(x,4,w,8,'R'); d.r(x+1,10,w-2,2,'N'); d.e(x+w/2,4,w/2+1,1.6,'G'); } d.p('w',1,9,8,10,14,9); d.p('t',3,14,8,13,12,15); d.p('c',6,13,7,13); }, SC);
add(1, 'Núi, rừng, sông và biển', 'ca-arctic-islands', 'Quần đảo Bắc Cực', 'Arctic Archipelago', 'vùng đảo lạnh giá ở phía bắc, ít người ở, có nhiều động vật như gấu trắng và tê giác biển. Phần lớn đất đóng băng quanh năm.',
  d => { d.bg('B'); d.r(0,6,16,10,'C'); d.e(4,8,4,2,'w'); d.e(12,12,4.4,2.4,'w'); d.e(11,6,2,.9,'l'); d.e(3,13,2,1,'l'); d.p('k',3,6,4,6); d.e(4,7,1.6,1,'e'); d.l(7,11,9,10,'a'); d.p('w',6,11,2,2,13,3,8,1); d.p('a',8,12,9,12); }, SC);

// ----- Mùa và thiên nhiên -----
add(1, 'Mùa và thiên nhiên', 'ca-fall-maple', 'Mùa thu lá phong đỏ (tháng 9–10)', 'Red maple autumn', 'lá phong chuyển đỏ, cam, vàng phủ khắp phía đông. Đây là mùa du lịch đông khách nhất ở Ontario và Québec.',
  d => { d.bg('c'); d.r(0,13,16,3,'O'); d.r(7,8,2,6,'N'); d.e(8,6,6,4.6,'r'); d.e(4,8,3,2.4,'o'); d.e(12,8,3,2.4,'y'); d.e(8,3,3,2,'o'); d.p('R',6,5,9,7,11,5,7,9); d.p('y',5,4,10,3); d.p('r',2,13,4,14,12,14,14,13); d.p('y',9,15,13,15); }, SC);
add(1, 'Mùa và thiên nhiên', 'ca-winter', 'Mùa đông (tháng 12–3)', 'Canadian winter', 'lạnh, nhiều tuyết, nhiều nơi xuống dưới 0°C trong nhiều tháng. Người dân trượt băng, trượt tuyết và chơi khúc côn cầu ngoài trời.',
  d => { d.bg('B'); d.r(0,11,16,5,'w'); d.r(2,7,5,5,'n'); d.tri(1,4,7,3,'w'); d.p('y',3,9,4,9); d.p('w',1,1,5,2,9,0,13,3,10,5,14,7,8,8); d.e(11,9,1.8,1.8,'w'); d.e(11,12,2.4,2.4,'w'); d.p('k',10,8,12,8); d.p('o',11,9); d.r(10,10,3,1,'r'); }, SC);
add(1, 'Mùa và thiên nhiên', 'ca-sugaring-spring', 'Mùa xuân và ngày đường phong (tháng 3–4)', 'Spring sugaring season', 'tuyết tan, cây phong chảy nhựa, và nhiều làng mở "cabane à sucre" (nhà nấu si-rô phong). Đây là thời điểm cây bắt đầu tỉnh dậy.',
  d => { d.bg('c'); d.r(0,12,16,4,'w'); d.r(0,14,16,2,'n'); d.r(2,0,4,14,'N'); d.p('n',3,2,3,5,4,9,3,12); d.r(6,7,2,1,'a'); d.p('o',8,8); d.r(7,9,4,4,'a'); d.r(7,9,4,1,'A'); d.r(10,4,6,5,'n'); d.tri(10,2,6,2,'R'); d.p('w',12,0,13,1,12,1); d.p('y',12,6); }, SC);
add(1, 'Mùa và thiên nhiên', 'ca-summer', 'Mùa hè (tháng 6–8)', 'Canadian summer by the lake', 'ấm áp, ngày dài, nhiều lễ hội ngoài trời và dã ngoại bên hồ. Miền bắc có ánh sáng ban đêm kéo dài.',
  d => { d.bg('c'); d.e(12,3,2.4,2.4,'y'); d.r(0,7,16,2,'G'); d.r(0,9,16,5,'C'); d.r(0,14,16,2,'u'); d.l(4,11,10,11,'r'); d.l(5,12,9,12,'R'); d.p('s',7,9); d.p('b',7,10); d.l(8,9,10,12,'n'); d.p('w',2,10,13,13); d.tri(1,12,5,3,'o'); }, SC);
add(1, 'Mùa và thiên nhiên', 'ca-cherry-blossom', 'Hoa anh đào ở Vancouver (tháng 3–4)', 'Vancouver cherry blossoms', 'các con phố phủ sắc hồng khi anh đào nở sớm hơn phía đông. Nhiều người đến chụp ảnh và dã ngoại.',
  d => { d.bg('c'); d.r(0,13,16,3,'a'); for(const x of [2,13]){ d.r(x,7,1,7,'N'); d.e(x+.5,5,3.6,3.6,'p'); } d.e(8,3,3,2,'p'); d.p('w',2,4,4,6,12,3,14,6,8,2,7,4); d.p('P',1,6,13,5,9,3); d.p('p',5,10,8,8,10,12,6,14,11,15); }, SC);
add(1, 'Mùa và thiên nhiên', 'ca-salmon-run', 'Cá hồi di cư (mùa thu)', 'Salmon run', 'cá hồi bơi ngược sông ở British Columbia để đẻ trứng. Đây là cảnh tượng lớn đối với cả gấu và người dân bản địa.',
  d => { d.bg('C'); d.r(0,0,16,3,'G'); d.p('c',2,5,3,5,9,12,10,12,12,4); for(const [x,y] of [[2,8],[7,5],[8,11]]){ d.e(x+2,y+1,2.8,1.4,'r'); d.p('G',x,y); d.p('R',x+5,y,x+5,y+2,x+4,y+1); d.p('k',x+1,y); } d.p('w',1,13,2,13,13,9,14,9); }, SC);
add(1, 'Mùa và thiên nhiên', 'ca-geese-caribou', 'Di cư của tuần lộc và ngỗng trời', 'Caribou and geese migration', 'hàng nghìn con ngỗng trời bay theo đàn vào mùa thu và mùa xuân. Tiếng kêu của chúng vang trên các cánh đồng.',
  d => { d.bg('o'); d.r(0,11,16,5,'t'); d.e(3,3,1.6,1.6,'y'); for(const [x,y] of [[8,2],[6,4],[10,4],[4,6],[12,6]]) d.p('k',x-1,y-1,x,y,x+1,y-1); for(const x of [2,10]){ d.r(x,11,4,2,'N'); d.r(x+3,9,1,2,'N'); d.p('N',x,13,x+3,13,x,14,x+3,14); d.p('k',x+3,8,x+4,7,x+2,7); } }, SC);

// ----- Vùng miền -----
add(1, 'Vùng miền', 'ca-atlantic', 'Atlantic Canada (Canada Đại Tây Dương)', 'Atlantic Canada', 'gồm Nova Scotia, New Brunswick, Đảo Prince Edward và Newfoundland và Labrador. Đây là vùng có bờ biển đá và làng chài.',
  d => { d.bg('c'); d.r(0,9,16,7,'B'); d.e(3,11,5,3,'a'); for(const [x,c] of [[1,'r'],[6,'y'],[11,'b']]){ d.r(x,7,4,3,c); d.tri(x,5,4,2,'K'); d.p('w',x+1,8,x+2,8); d.p('N',x,10,x+3,10,x,11,x+3,11); } d.p('w',2,13,9,14,13,12); }, SC);
add(1, 'Vùng miền', 'ca-quebec-prov', 'Québec', 'Quebec province', 'tỉnh nói tiếng Pháp, có văn hóa, luật và ẩm thực riêng. Phần lớn dân số sống dọc sông Saint-Laurent.',
  d => { d.bg('b'); d.r(7,0,2,16,'w'); d.r(0,7,16,2,'w'); for(const [x,y] of [[2,1],[11,1],[2,10],[11,10]]){ d.p('w',x+1,y,x+1,y+1,x+1,y+2,x,y+1,x+2,y+1,x,y+3,x+1,y+3,x+2,y+3,x+1,y+4); } }, SC);
add(1, 'Vùng miền', 'ca-ontario', 'Ontario', 'Ontario lakes and farms', 'tỉnh đông dân nhất, nơi có Toronto và Ottawa. Vùng có nhiều hồ và đất nông nghiệp.',
  d => { d.bg('c'); d.r(0,6,16,10,'g'); d.e(5,9,4.4,2,'C'); d.r(9,11,7,5,'y'); for(let x=10;x<16;x+=2) d.l(x,11,x,15,'Y'); d.r(11,4,4,4,'R'); d.tri(10,2,6,2,'a'); d.p('w',12,6,13,6); for(const x of [1,3]) d.tri(x-1,12,3,4,'G'); d.p('w',3,8,6,9); }, SC);
add(1, 'Vùng miền', 'ca-prairies', 'Các tỉnh thảo nguyên (Prairies)', 'Prairie provinces', 'Alberta, Saskatchewan và Manitoba với đồng bằng rộng, trồng lúa mì và canola. Bầu trời rộng và gió mạnh là đặc trưng.',
  d => { d.bg('b'); d.r(0,0,16,4,'c'); d.e(4,3,3,1.2,'w'); d.e(11,5,3.4,1.2,'w'); d.r(0,9,8,7,'y'); d.r(8,9,8,7,'Y'); for(let x=1;x<8;x+=2) d.l(x,10,x,15,'Y'); for(let x=9;x<16;x+=2) d.p('y',x,10,x,12,x,14); d.r(11,6,2,4,'R'); d.tri(10,4,4,2,'a'); }, SC);
add(1, 'Vùng miền', 'ca-british-columbia', 'British Columbia', 'British Columbia', 'tỉnh miền tây, có núi, biển và khí hậu ôn hòa ven bờ. Vancouver và Victoria nằm ở đây.',
  d => { d.bg('c'); d.tri(0,2,10,9,'A'); d.tri(7,4,9,7,'a'); d.tri(3,2,4,3,'w'); d.r(0,10,16,6,'C'); for(const x of [1,3,13,15]) d.tri(x-2,7,4,5,'G'); d.e(8,13,3,1.4,'k'); d.p('k',8,11,9,12); d.p('w',7,13,12,15,3,14); }, SC);
add(1, 'Vùng miền', 'ca-northern-territories', 'Ba lãnh thổ phía bắc', 'Northern territories', 'Yukon, Northwest Territories và Nunavut, dân số rất thưa và nhiều cộng đồng bản địa. Nunavut là lãnh thổ Inuit lớn.',
  d => { d.bg('i'); d.l(1,5,6,2,'g'); d.l(6,2,11,5,'g'); d.l(11,5,15,2,'h'); d.l(1,6,6,3,'h'); d.p('w',2,1,9,1,13,7); d.r(0,11,16,5,'w'); d.fan(5,12,3.4,'l'); d.fan(5,12,1.2,'k'); d.p('a',3,10,6,9,7,11); d.r(11,7,1,5,'a'); d.r(10,8,3,1,'a'); d.r(10,11,3,1,'a'); }, SC);

// ----- Hiện tượng đặc biệt -----
add(1, 'Hiện tượng đặc biệt', 'ca-aurora', 'Cực quang (aurora borealis)', 'Aurora borealis', 'ánh sáng xanh lục nhảy múa trên bầu trời đêm, dễ thấy ở Yukon, Northwest Territories và nhiều vùng phía bắc. Yellowknife thường được nhắc đến là điểm ngắm cực quang.',
  d => { d.bg('i'); for(let x=0;x<16;x++){ const y=Math.round(4+Math.sin(x/2.4)*2.4); d.p('G',x,y+3); d.p('g',x,y+1,x,y+2); d.p('h',x,y); if(x%3===0) d.p('g',x,y-1,x,y-2); } d.p('w',2,1,13,2,9,11); for(let x=1;x<16;x+=3) d.tri(x-1,11,3,4,'k'); d.r(0,14,16,2,'w'); }, SC);
add(1, 'Hiện tượng đặc biệt', 'ca-fundy-tides', 'Thủy triều vịnh Fundy', 'Fundy tides', 'nước lên xuống với biên độ lớn đến mức có nơi bãi biển biến mất rồi hiện ra trong một ngày. Người đi bộ phải xem giờ thủy triều.',
  d => { d.bg('c'); d.r(0,12,16,4,'u'); d.r(0,7,8,9,'C'); d.r(2,2,4,6,'R'); d.e(4,2.5,3,1.4,'G'); d.r(10,6,4,10,'R'); d.r(11,9,2,7,'N'); d.e(12,6,3,1.4,'G'); d.p('w',1,7,6,8,3,10); d.l(8,6,8,14,'k'); d.p('k',7,7,9,7,7,13,9,13); }, SC);
add(1, 'Hiện tượng đặc biệt', 'ca-midnight-sun', 'Đêm trắng và mặt trời nửa đêm', 'Midnight sun', 'phía bắc có những ngày mùa hè mà mặt trời hầu như không lặn. Ngược lại mùa đông rất ngắn ngày.',
  d => { d.bg('o'); d.r(0,0,16,3,'p'); d.e(8,9,3.4,3.4,'y'); d.p('y',8,3,3,5,13,5,2,9,14,9); d.r(0,11,16,5,'B'); d.p('y',7,12,8,12,9,12,8,13,7,14,9,14); d.tri(0,8,5,4,'K'); d.tri(11,9,5,3,'K'); }, SC);
add(1, 'Hiện tượng đặc biệt', 'ca-iceberg-alley', 'Băng trôi ở Newfoundland (iceberg alley)', 'Iceberg Alley', 'những tảng băng trôi từ Greenland trôi xuống ngoài khơi bờ biển vào mùa xuân và đầu hè. Du khách đi thuyền để ngắm.',
  d => { d.bg('c'); d.r(0,9,16,7,'B'); d.tri(2,2,9,8,'w'); d.tri(7,5,6,5,'l'); d.dtri(2,10,10,5,'c'); d.p('a',5,6,6,7,7,8); d.r(11,11,4,2,'r'); d.r(12,9,1,2,'w'); d.p('w',10,13,15,13,1,12); }, SC);
