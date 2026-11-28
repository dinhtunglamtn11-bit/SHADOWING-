import { add, SC, setCC } from './pass-kit.js';
setCC('lr');
// Liberia · Nhóm 1: Nơi chốn và thiên nhiên

// ----- Địa danh -----
add(1, 'Địa danh', 'lr-monrovia', 'Monrovia', 'Monrovia', 'thủ đô nằm trên mũi đất Mesurado ven Đại Tây Dương, đặt tên theo tổng thống Mỹ James Monroe. Thành phố được lập từ những năm 1820 bởi những người da đen tự do từ Mỹ đến định cư.',
  d => { d.bg('c'); d.r(0,11,16,5,'C'); d.tri(1,7,14,5,'g'); for(const [x,y,c] of [[3,7,'w'],[6,5,'u'],[9,6,'a'],[12,8,'p']]){ d.r(x,y,3,11-y,c); d.r(x,y-1,3,1,'r'); d.p('B',x+1,y+1,x+1,y+3); } d.p('w',2,13,7,14,13,12); }, SC);
add(1, 'Địa danh', 'lr-providence-island', 'Đảo Providence (Providence Island)', 'Providence Island', 'hòn đảo nhỏ ở cửa sông Mesurado, nơi nhóm định cư đầu tiên cập bến năm 1822. Đảo là điểm tưởng niệm quan trọng của lịch sử lập quốc.',
  d => { d.bg('c'); d.r(0,9,16,7,'C'); d.e(8,11,6,2.6,'u'); d.e(8,10,5,2,'g'); for(const x of [5,11]){ d.r(x,5,1,5,'n'); d.p('G',x-2,4,x-1,4,x,3,x+1,4,x+2,5,x,4); } d.r(7,7,3,3,'a'); d.r(8,6,1,1,'a'); d.p('w',2,13,13,14,8,15); }, SC);
add(1, 'Địa danh', 'lr-waterside', 'Chợ Waterside', 'Waterside Market', 'khu chợ đông đúc ở Monrovia bán rau củ, vải, đồ gia dụng và cá khô. Đây là nơi cảm nhận nhịp sống buôn bán hằng ngày của thủ đô.',
  d => { d.bg('c'); d.r(0,12,16,4,'t'); for(const [x,c] of [[0,'r'],[6,'y'],[11,'b']]){ d.dtri(x,2,6,3,c); d.r(x,5,5,1,c); d.r(x,6,1,6,'N'); d.r(x+4,6,1,6,'N'); } for(const [x,c] of [[1,'o'],[2,'g'],[3,'r'],[7,'g'],[8,'o'],[9,'m'],[12,'y'],[13,'a'],[14,'o']]){ d.p(c,x,9); } d.r(1,10,3,2,'n'); d.r(7,10,3,2,'n'); d.r(12,10,3,2,'n'); d.p('N',5,12,5,11); d.p('p',5,10,5,9); }, SC);
add(1, 'Địa danh', 'lr-robertsport', 'Robertsport', 'Robertsport surf', 'thị trấn ven biển ở hạt Grand Cape Mount, nổi tiếng với những con sóng lướt ván tốt. Tên thị trấn lấy từ Joseph Jenkins Roberts, tổng thống đầu tiên của nước này.',
  d => { d.bg('c'); d.r(0,7,16,9,'C'); d.r(0,13,16,3,'u'); d.tri(10,2,6,6,'G'); d.p('w',1,9,2,8,3,8,4,9,5,10,6,10,9,11,10,10,11,10,12,11); d.e(7,9,1.2,1.2,'N'); d.r(7,10,1,1,'r'); d.r(5,11,5,1,'y'); d.p('w',2,12,8,12,14,12); }, SC);
add(1, 'Địa danh', 'lr-lake-piso', 'Hồ Piso (Lake Piso)', 'Lake Piso', 'đầm nước lợ lớn gần Robertsport, có nhiều chim nước và rừng ngập mặn quanh bờ. Cư dân quanh đây sống nhờ đánh cá và trồng trọt.',
  d => { d.bg('c'); d.r(0,5,16,3,'G'); d.r(0,8,16,8,'C'); for(const x of [1,4,13]){ d.e(x+.5,6,2,1.6,'g'); d.l(x,8,x-1,11,'N'); d.l(x+1,8,x+2,11,'N'); } d.r(6,11,6,1,'n'); d.p('n',5,10,12,10); d.e(8.5,9,.9,1,'N'); d.p('w',8,3,9,4,10,3,3,13,10,14,13,13); }, SC);
add(1, 'Địa danh', 'lr-sapo', 'Vườn quốc gia Sapo (Sapo National Park)', 'Sapo National Park', 'công viên quốc gia duy nhất của Liberia, bảo vệ một khu rừng mưa lớn ở đông nam. Nơi này có voi rừng, tinh tinh và hà mã lùn.',
  d => { d.bg('G'); for(const [x,y,c] of [[2,3,'g'],[7,2,'h'],[13,3,'g'],[4,6,'g'],[11,6,'h']]) d.e(x,y,3,2.4,c); d.r(1,7,1,9,'N'); d.r(14,7,1,9,'N'); d.e(8,11,4,2.6,'a'); d.e(5,10,2,2,'a'); d.l(4,11,3,14,'a'); d.p('w',4,12); d.p('k',5,10); d.r(6,13,1,2,'A'); d.r(10,13,1,2,'A'); d.r(0,15,16,1,'g'); }, SC);
add(1, 'Địa danh', 'lr-mount-nimba', 'Dãy Nimba (Mount Nimba)', 'Mount Nimba range', 'dãy núi giáp Guinea và Côte d\'Ivoire, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa của Liên Hợp Quốc) công nhận là di sản thiên nhiên chung của ba nước. Rừng và đồng cỏ trên núi chứa nhiều loài đặc hữu.',
  d => { d.bg('c'); d.tri(0,3,10,10,'A'); d.tri(6,5,10,8,'a'); d.tri(0,8,7,5,'G'); d.tri(9,9,7,4,'g'); d.r(0,13,16,3,'g'); d.p('w',2,2,3,2,12,2,13,3,14,2); d.p('y',3,14,8,15,12,14); d.p('r',5,14); }, SC);
add(1, 'Địa danh', 'lr-wuteve', 'Núi Wuteve (Mount Wuteve)', 'Mount Wuteve', 'đỉnh núi cao nhất Liberia, thuộc hạt Lofa ở phía tây bắc. Vùng núi này ít người lui tới và còn nhiều rừng nguyên sinh.',
  d => { d.bg('a'); d.tri(2,2,12,12,'G'); d.tri(6,2,4,4,'g'); d.r(0,9,6,1,'w'); d.r(9,11,7,1,'w'); d.r(0,13,16,3,'g'); d.p('r',8,1,9,1); d.p('N',8,2); for(const x of [2,5,11,14]) d.p('G',x,13,x,12); }, SC);
add(1, 'Địa danh', 'lr-kpatawee', 'Thác Kpatawee (Kpatawee Falls)', 'Kpatawee Falls', 'dòng thác ở hạt Bong gần Gbarnga, nơi người dân địa phương đến tắm và dã ngoại. Mùa mưa nước chảy mạnh và nhiều bọt trắng.',
  d => { d.bg('G'); d.r(0,4,16,8,'N'); d.r(4,3,8,9,'c'); d.p('w',5,4,5,5,7,6,7,7,9,4,9,5,10,8,10,9,6,10); d.r(0,12,16,4,'C'); d.e(8,12,5,1.4,'w'); d.e(2,3,3,2,'g'); d.e(13,3,3,2,'g'); d.p('n',3,14,4,14); d.p('N',13,14); }, SC);
add(1, 'Địa danh', 'lr-buchanan', 'Buchanan', 'Port of Buchanan', 'thành phố cảng ở hạt Grand Bassa, xuất khẩu quặng sắt và gỗ. Thành phố nằm ven biển với nhiều bãi cát dài.',
  d => { d.bg('c'); d.r(0,9,16,7,'C'); d.r(2,8,12,3,'k'); d.r(3,11,10,1,'r'); d.r(11,4,2,4,'w'); d.p('B',11,5); d.tri(2,5,5,3,'R'); d.tri(7,6,4,2,'N'); d.l(1,2,6,2,'y'); d.l(1,2,1,8,'y'); d.p('k',6,3,6,4); d.r(0,14,16,2,'u'); }, SC);
add(1, 'Địa danh', 'lr-harper', 'Harper (Cape Palmas)', 'Harper and Cape Palmas', 'thị trấn ở đông nam, thuộc hạt Maryland, từng là khu định cư riêng trước khi nhập vào Liberia. Mũi đất này có ngọn hải đăng và nhiều nhà gỗ cũ.',
  d => { d.bg('c'); d.r(0,11,16,5,'C'); d.tri(1,7,10,5,'n'); d.r(0,12,10,1,'n'); d.r(4,2,3,7,'w'); d.p('r',4,4,5,4,6,4,4,7,5,7,6,7); d.r(4,1,3,1,'k'); d.p('y',5,0,3,1,2,1,7,1,8,1); d.r(9,8,4,3,'e'); d.tri(8,6,6,2,'r'); d.p('w',12,13,14,14); }, SC);

// ----- Mùa và thiên nhiên -----
add(1, 'Mùa và thiên nhiên', 'lr-rainy-season', 'Mùa mưa (khoảng tháng 5 đến tháng 10)', 'Rainy season', 'mưa như trút nước, đặc biệt vào tháng 6 và tháng 7, khiến Monrovia thuộc nhóm thủ đô mưa nhiều nhất thế giới. Đường đất ngoài thành phố có thể lầy lội, khó đi.',
  d => { d.bg('K'); d.e(5,3,4,2.4,'a'); d.e(11,3.5,4,2.4,'A'); for(const [x,y] of [[2,7],[5,8],[8,7],[11,9],[14,7],[3,11],[9,11],[13,12],[6,12]]) d.p('c',x,y,x-1,y+1,x-1,y+2); d.r(0,14,16,2,'O'); d.e(7,15,3,.8,'c'); }, SC);
add(1, 'Mùa và thiên nhiên', 'lr-dry-season', 'Mùa khô (khoảng tháng 11 đến tháng 4)', 'Dry season', 'trời nắng nhiều và ít mưa, thích hợp cho việc đi lại và thu hoạch. Đây cũng là mùa đẹp nhất để ra biển.',
  d => { d.bg('c'); d.e(12,3,2.6,2.6,'y'); d.r(0,9,16,3,'C'); d.r(0,12,16,4,'u'); d.r(3,6,1,7,'n'); d.p('G',1,5,2,4,3,5,4,4,5,5,3,3); d.dtri(8,9,6,3,'r'); d.r(11,9,1,5,'N'); d.p('w',2,10,13,10); }, SC);
add(1, 'Mùa và thiên nhiên', 'lr-harmattan', 'Gió Harmattan (tháng 12 đến tháng 2)', 'Harmattan wind', 'gió khô thổi từ Sahara, mang theo bụi mịn làm bầu trời mờ đục. Buổi tối trời mát hơn và da dễ khô nứt.',
  d => { d.bg('t'); d.e(11,4,2.4,2.4,'u'); for(const [x,y,w] of [[0,3,7],[3,6,10],[0,9,8],[7,11,9]]) d.r(x,y,w,1,'e'); d.r(0,13,16,3,'O'); d.r(2,10,1,4,'n'); d.p('n',3,9,4,9,5,10,3,10); d.p('Y',9,8,14,7,6,4,12,13); }, SC);
add(1, 'Mùa và thiên nhiên', 'lr-upper-guinean', 'Rừng mưa Thượng Guinea (Upper Guinean Forest)', 'Upper Guinean forest', 'dải rừng nhiệt đới kéo dài ở Tây Phi, Liberia giữ phần lớn diện tích còn lại. Rừng là nhà của voi rừng, tinh tinh, khỉ Diana và nhiều loài chim mỏ sừng.',
  d => { d.bg('l'); for(const [x,y,c] of [[2,6,'G'],[6,4,'g'],[11,6,'G'],[14,5,'g'],[4,10,'g'],[9,9,'G'],[13,11,'g'],[1,12,'G']]) d.e(x,y,3,2.6,c); d.r(0,12,16,4,'G'); d.p('k',7,6,8,5,9,6); d.p('y',10,5,3,11); d.p('r',6,9,12,9); d.p('b',1,2,3,3,12,1,14,2); }, SC);
add(1, 'Mùa và thiên nhiên', 'lr-mangrove-lagoon', 'Rừng ngập mặn và đầm phá ven biển', 'Mangroves and lagoons', 'rễ cây đan xen bảo vệ bờ khỏi sóng và là nơi sinh sản của cá và tôm. Người dân thu hoạch hàu và cua ở đây.',
  d => { d.bg('c'); d.r(0,10,16,6,'C'); for(const x of [3,11]){ d.e(x+.5,5,3.6,3,'G'); d.p('g',x,3,x+2,4); d.l(x,7,x-2,12,'N'); d.l(x,7,x,12,'N'); d.l(x+1,7,x+3,12,'N'); } d.p('o',7,13,8,13,9,12,7,14); d.p('w',7,3,8,2,9,3); }, SC);
add(1, 'Mùa và thiên nhiên', 'lr-rubber-palm-cacao', 'Cây cao su, cọ dầu và cacao', 'Rubber, oil palm and cacao', 'ba loại cây trồng chính ở nhiều vùng nông nghiệp. Cao su gắn với những đồn điền rộng lớn, còn cọ dầu cung cấp dầu ăn cho gia đình.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(2,3,1,11,'a'); d.e(2.5,3,2.6,2,'G'); d.p('w',2,8,2,9); d.p('k',2,10); d.r(8,5,1,9,'N'); for(const [x,y] of [[5,4],[6,2],[8,1],[10,2],[11,4]]) d.l(8,5,x,y,'g'); d.p('r',7,6,9,6,8,6); d.r(13,6,1,8,'n'); d.e(13.5,5,2.4,2,'G'); d.e(12,9,.9,1.6,'o'); d.e(14,11,.9,1.6,'r'); }, SC);

// ----- Vùng miền -----
add(1, 'Vùng miền', 'lr-coastal-strip', 'Dải bờ biển', 'Coastal strip', 'vùng cát thấp và đầm phá chạy dọc Đại Tây Dương, tập trung dân cư và các thành phố cảng. Nghề đánh cá và buôn bán phát triển ở đây.',
  d => { d.bg('c'); d.r(0,8,16,3,'g'); d.r(0,11,16,2,'u'); d.r(0,13,16,3,'C'); for(const [x,c] of [[2,'w'],[7,'e'],[12,'a']]){ d.r(x,6,3,3,c); d.tri(x-1,4,5,2,'r'); } d.r(3,12,5,1,'n'); d.p('w',2,14,9,15,13,14); }, SC);
add(1, 'Vùng miền', 'lr-interior-hills', 'Đồi và cao nguyên trong nội địa', 'Interior hills', 'vùng đồi thấp phủ rừng và nương rẫy trồng lúa, sắn. Nhiều làng ở đây vẫn giữ cách sống truyền thống.',
  d => { d.bg('c'); d.tri(0,5,10,8,'G'); d.tri(6,4,10,9,'g'); d.r(0,12,16,4,'h'); for(let x=1;x<16;x+=2) d.p('Y',x,13,x,15); d.r(7,9,3,3,'n'); d.tri(6,7,5,2,'Y'); d.p('N',8,11); }, SC);
add(1, 'Vùng miền', 'lr-northern-highlands', 'Vùng cao phía bắc', 'Northern highlands', 'có các dãy núi như Nimba, Wologizi và Wuteve, khí hậu mát hơn. Đây là nơi có nhiều rừng nguyên sinh và mỏ khoáng sản.',
  d => { d.bg('l'); d.tri(0,2,11,12,'A'); d.tri(7,4,9,10,'a'); d.tri(0,9,9,6,'G'); d.tri(8,10,8,5,'g'); d.r(0,14,16,2,'g'); d.p('y',10,11,11,12,12,11); d.p('r',11,11); d.p('w',3,5,4,4,5,5); }, SC);
add(1, 'Vùng miền', 'lr-bong-nimba', 'Hạt Bong và Nimba', 'Bong and Nimba counties', 'trung tâm nông nghiệp và khai thác mỏ, có các thị trấn lớn như Gbarnga và Ganta. Đường buôn bán nối biển với nội địa đi qua đây.',
  d => { d.bg('c'); d.tri(8,3,8,8,'O'); d.p('R',11,6,12,7,10,8,13,9); d.r(0,10,16,6,'g'); d.l(0,15,9,10,'t'); d.l(1,15,10,10,'t'); d.r(2,7,4,4,'e'); d.tri(1,5,6,2,'a'); d.r(11,12,4,2,'y'); d.p('k',11,14,14,14); d.p('r',13,11); }, SC);
add(1, 'Vùng miền', 'lr-southeast', 'Đông nam Liberia (Maryland, Grand Kru, Sinoe)', 'Southeastern Liberia', 'vùng xa Monrovia với rừng và bờ biển còn hoang sơ. Giao thông chủ yếu bằng đường biển và đường đất.',
  d => { d.bg('o'); d.r(0,8,16,2,'G'); d.tri(0,3,7,6,'G'); d.r(0,10,16,6,'C'); d.r(0,13,16,3,'u'); d.r(6,10,7,2,'N'); d.p('N',5,9,13,9); d.r(9,6,1,4,'n'); d.tri(10,6,4,4,'w'); d.e(13,3,1.8,1.8,'y'); }, SC);

// ----- Hiện tượng đặc biệt -----
add(1, 'Hiện tượng đặc biệt', 'lr-pygmy-hippo', 'Hà mã lùn (pygmy hippopotamus)', 'Pygmy hippopotamus', 'loài thú bán thủy sinh nhỏ chỉ sống ở Tây Phi và nhiều nhất ở Liberia, tên khoa học có chữ "liberiensis". Con trưởng thành chỉ bằng khoảng một phần mười thể trọng hà mã thường.',
  d => { d.bg('G'); d.r(0,11,16,5,'C'); d.e(9,9,5,3.4,'K'); d.e(4,8,3,2.8,'K'); d.p('K',3,5,5,5); d.p('w',3,7); d.p('k',2,9,4,9); d.p('p',5,10,6,10); d.r(7,11,2,2,'k'); d.r(11,11,2,2,'k'); d.e(2,3,2.4,2,'g'); d.e(13,3,2.6,2,'g'); d.p('c',2,13,9,14,14,12); }, SC);
add(1, 'Hiện tượng đặc biệt', 'lr-nimba-toad', 'Cóc Nimba (Nimba viviparous toad)', 'Nimba viviparous toad', 'loài cóc nhỏ chỉ có ở vùng núi Nimba, đẻ ra con non thay vì đẻ trứng. Đây là hiện tượng hiếm ở loài lưỡng cư.',
  d => { d.bg('h'); d.r(0,12,16,4,'N'); d.e(8,9,4.4,3,'n'); d.e(5,6,1.6,1.6,'n'); d.e(11,6,1.6,1.6,'n'); d.p('y',5,6,11,6); d.p('k',5,5,11,5,6,10,7,10,8,10,9,10,10,10); d.p('t',7,8,9,9,8,7); d.r(2,11,3,2,'n'); d.r(11,11,3,2,'n'); d.e(3,13.5,1,.8,'t'); d.e(13,14,1,.8,'t'); d.p('r',2,2,13,2); }, SC);
add(1, 'Hiện tượng đặc biệt', 'lr-erosion', 'Xói mòn bờ biển ở Monrovia', 'Coastal erosion in Monrovia', 'sóng đánh mạnh khiến một số khu phố ven biển như West Point bị mất đất mỗi năm. Hiện tượng này gắn với nước biển dâng và mưa lớn.',
  d => { d.bg('a'); d.r(0,10,16,6,'C'); d.r(8,8,8,8,'t'); d.p('C',8,8,8,9,9,11,8,12,9,14); d.p('t',7,13,6,14,5,15); d.r(10,5,4,3,'n'); d.tri(9,3,6,2,'A'); d.r(7,7,3,2,'N'); d.p('w',1,11,2,10,3,10,4,11,5,12,6,11,7,10,1,14,3,13); }, SC);
add(1, 'Hiện tượng đặc biệt', 'lr-thunderstorm', 'Bão sấm sét mùa mưa', 'Rainy season thunderstorm', 'những cơn dông kéo dài, sấm chớp dữ dội ở vùng ven biển và núi. Người dân thường mang ô và áo mưa mỗi khi ra ngoài.',
  d => { d.bg('i'); d.e(5,3,4.4,2.4,'K'); d.e(11,3,4.4,2.4,'A'); d.p('y',9,5,8,6,7,7,8,7,9,7,8,8,7,9,6,10,7,10); for(const [x,y] of [[2,7],[3,11],[12,8],[13,11],[10,12]]) d.p('c',x,y,x-1,y+1); d.r(0,13,16,3,'k'); d.p('r',3,13,4,12,5,13,6,13,2,13); d.p('a',4,14,4,15); }, SC);
