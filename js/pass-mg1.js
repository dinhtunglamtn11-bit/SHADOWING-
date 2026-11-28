import { add, SC, setCC } from './pass-kit.js';
setCC('mg');
// Madagascar · Nhóm 1: Nơi chốn và thiên nhiên

// ----- Địa danh -----
add(1, 'Địa danh', 'mg-tana', 'Antananarivo (Tana)', 'Antananarivo', 'thủ đô xây trên nhiều ngọn đồi ở cao nguyên miền Trung, với những bậc thang dốc và nhà gạch đỏ. Tên gọi có nghĩa là "thành phố của nghìn người", thường được giải thích liên quan đến lính canh của nhà vua.',
  d => { d.bg('c'); d.tri(0,3,10,13,'g'); d.tri(7,5,9,11,'G'); for(const [x,y] of [[3,8],[6,10],[1,11],[9,9],[12,11],[5,13]]){ d.r(x,y,3,3,'O'); d.r(x,y-1,3,1,'N'); d.p('e',x+1,y+1); } d.r(4,5,3,3,'r'); d.tri(3,3,5,2,'k'); d.r(0,15,16,1,'n'); }, SC);
add(1, 'Địa danh', 'mg-rova', 'Rova của Antananarivo (cung điện hoàng gia)', 'Rova palace of Antananarivo', 'quần thể cung điện trên đỉnh đồi cao nhất thành phố. Một đám cháy năm 1995 đã phá hủy nhiều phần và đến nay công việc phục dựng vẫn tiếp tục.',
  d => { d.bg('c'); d.tri(0,9,16,7,'g'); d.r(2,6,12,5,'t'); for(const x of [2,12]){ d.r(x,3,2,8,'e'); d.tri(x-1,1,4,2,'N'); } d.tri(4,2,8,4,'R'); d.p('y',8,1); for(let x=4;x<12;x+=2) d.p('N',x,8,x,9); d.p('k',13,5,3,6,5,10,10,7); d.p('a',9,10,11,9); }, SC);
add(1, 'Địa danh', 'mg-ambohimanga', 'Đồi hoàng gia Ambohimanga', 'Royal Hill of Ambohimanga', 'đồi thiêng gắn với các vua cung đình Merina, cách Antananarivo khoảng hai mươi cây số. UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc) công nhận năm 2001, và nhiều người dân vẫn đến đây cầu nguyện.',
  d => { d.bg('c'); d.tri(0,4,16,12,'G'); d.r(5,3,6,4,'n'); d.tri(4,0,8,3,'N'); d.r(7,5,2,2,'k'); d.r(2,9,12,2,'a'); d.e(8,11,2.4,2.4,'a'); d.e(8,11,1.4,1.4,'k'); d.p('g',3,13,12,14,6,14); d.p('y',8,0); }, SC);
add(1, 'Địa danh', 'mg-baobab-alley', 'Đại lộ Baobab (Allee des Baobabs)', 'Avenue of the Baobabs', 'hàng baobab khổng lồ hai bên con đường đất gần Morondava, được chụp ảnh nhiều nhất ở đảo. Những cây cao trên 30 m, nhiều cây đã sống hàng trăm năm.',
  d => { d.bg('o'); d.r(0,0,16,4,'r'); d.e(8,9,3,3,'y'); d.r(0,12,16,4,'O'); for(const [x,h] of [[1,9],[4,6],[11,6],[13,9]]){ d.r(x,12-h,2,h,'N'); d.p('G',x-1,12-h,x,11-h,x+1,11-h,x+2,12-h); } d.dtri(5,12,6,4,'n'); }, SC);
add(1, 'Địa danh', 'mg-tsingy', 'Tsingy de Bemaraha', 'Tsingy de Bemaraha', 'rừng đá vôi nhọn như cây kim khổng lồ ở miền tây, UNESCO công nhận năm 1990. Từ "tsingy" thường được giải thích là "nơi không thể đi bằng chân trần".',
  d => { d.bg('c'); d.r(0,13,16,3,'G'); for(const [x,y] of [[0,5],[2,2],[4,6],[6,1],[8,4],[10,2],[12,6],[14,3]]) d.tri(x,y,3,13-y,'a'); for(const [x,y] of [[3,5],[7,6],[11,7]]) d.l(x,y,x,12,'A'); d.p('g',1,12,5,13,9,12,13,13); d.p('n',4,9,6,9,5,9); }, SC);
add(1, 'Địa danh', 'mg-ankarana', 'Tsingy của Ankarana', 'Tsingy of Ankarana', 'khu đá vôi tương tự ở phía bắc với hang động và dòng sông ngầm. Đây là nơi sống của nhiều loài vượn cáo.',
  d => { d.bg('c'); for(const [x,y] of [[0,4],[3,3],[11,3],[13,5]]) d.tri(x,y,3,9,'A'); d.r(2,8,12,6,'a'); d.fan(8,13,4,'k'); d.r(4,13,8,1,'k'); d.r(0,14,16,2,'C'); d.p('w',5,14,10,15); d.p('G',1,12,14,12,2,13); d.p('n',7,6,8,5,9,6); }, SC);
add(1, 'Địa danh', 'mg-isalo', 'Vườn quốc gia Isalo', 'Isalo National Park', 'vùng đá cát ở miền nam với những khối đá đỏ, hang và suối nước trong. Du khách đến đây để đi bộ và tắm ở những hồ nhỏ giữa vách đá.',
  d => { d.bg('c'); d.r(1,4,4,9,'o'); d.r(2,2,2,2,'O'); d.r(10,3,5,10,'O'); d.r(11,2,3,1,'o'); d.p('R',2,6,4,9,11,5,13,8,12,11); d.r(0,13,16,3,'t'); d.e(7.5,13,2.6,1.4,'C'); d.r(7,7,1,6,'c'); d.p('G',6,11,9,12); }, SC);
add(1, 'Địa danh', 'mg-nosy-be', 'Nosy Be', 'Nosy Be island', 'hòn đảo du lịch ở phía bắc, nổi tiếng với cây ylang-ylang làm nước hoa và những bãi biển trắng. Tên gọi có nghĩa là "đảo lớn".',
  d => { d.bg('c'); d.r(0,10,16,6,'C'); d.e(8,11,6,2,'w'); d.e(8,9,5,2,'g'); d.r(11,4,1,6,'n'); d.p('G',9,3,10,4,12,3,13,3,14,4,11,2); for(const [x,y] of [[4,7],[6,6]]) d.p('y',x,y,x-1,y+1,x+1,y+1); d.p('w',2,14,12,15,6,13); }, SC);
add(1, 'Địa danh', 'mg-sainte-marie', 'Nosy Boraha (đảo Sainte-Marie)', 'Sainte-Marie island', 'đảo nhỏ phía đông, từng là nơi người cướp biển trú ẩn vào thế kỷ 17–18. Hiện vẫn còn một nghĩa trang cổ ở đảo gắn với thời đó.',
  d => { d.bg('c'); d.r(0,9,16,7,'C'); d.e(10,11,6,3,'g'); d.r(0,13,5,1,'w'); for(const x of [8,11]){ d.r(x,6,1,4,'a'); d.r(x-1,7,3,1,'a'); } d.p('w',13,8,13,9); d.r(1,8,5,2,'N'); d.r(3,3,1,5,'n'); d.r(1,4,2,3,'k'); d.p('w',1,5); }, SC);
add(1, 'Địa danh', 'mg-diego-suarez', 'Antsiranana (Diego Suarez) và vịnh Ngọc Lục Bảo', 'Diego Suarez and the Emerald Bay', 'thành phố cảng phía bắc có vịnh biển rất đẹp. Nước biển ở đây xanh như ngọc lục bảo khi trời nắng.',
  d => { d.bg('c'); d.tri(0,2,9,6,'G'); d.r(0,7,16,9,'t'); d.e(11,12,4,2,'T'); d.p('w',2,13,6,10,13,14); d.r(10,5,5,3,'w'); d.tri(9,3,7,2,'r'); d.r(3,10,5,1,'n'); d.r(5,6,1,4,'N'); d.tri(6,6,4,4,'w'); d.r(0,15,16,1,'u'); }, SC);
add(1, 'Địa danh', 'mg-antsirabe', 'Antsirabe', 'Antsirabe', 'thành phố ở cao nguyên nổi tiếng với suối khoáng nóng và xe kéo tay pousse-pousse. Thành phố có khí hậu mát, phố xá có dấu ấn kiến trúc Pháp.',
  d => { d.bg('c'); d.r(0,12,16,4,'a'); d.r(1,4,5,7,'u'); d.tri(0,2,7,2,'r'); d.p('B',2,6,4,6,2,8,4,8); d.r(8,7,5,3,'r'); d.tri(7,5,7,2,'k'); d.e(10.5,11,1.8,1.8,'k'); d.p('a',10,11); d.l(13,8,15,10,'N'); d.e(14.5,6,0.8,0.8,'s'); d.r(14,7,2,3,'b'); d.p('w',2,13,3,14); }, SC);
add(1, 'Địa danh', 'mg-fianarantsoa', 'Fianarantsoa', 'Fianarantsoa', 'thành phố cổ ở nam cao nguyên, có khu phố trên đồi và đồi chè. Tên gọi nghĩa là "nơi học được điều tốt".',
  d => { d.bg('c'); d.tri(0,4,16,12,'g'); for(let y=11;y<16;y+=2) d.r(0,y,16,1,'G'); d.r(6,3,4,5,'O'); d.tri(5,1,6,2,'N'); d.p('y',8,0); for(const [x,y] of [[3,7],[11,7],[2,10],[12,10]]){ d.r(x,y,3,2,'r'); d.r(x,y-1,3,1,'k'); } }, SC);

// ----- Núi, rừng, sông và biển -----
add(1, 'Núi, rừng, sông và biển', 'mg-andasibe', 'Vườn quốc gia Andasibe–Mantadia', 'Andasibe-Mantadia and the indri', 'rừng mưa nổi tiếng với vượn cáo indri, loài vượn cáo lớn nhất, hót vang cả khu rừng. Tiếng hót có thể nghe từ xa nhiều cây số.',
  d => { d.bg('G'); d.r(2,0,2,16,'N'); d.r(12,0,2,16,'n'); d.p('g',0,2,5,3,10,1,15,4,6,12,9,14); d.e(7,8,2.4,3,'k'); d.e(7,4.5,2,2,'k'); d.p('w',5,3,9,3,6,9,8,9,7,10); d.p('y',6,4,8,4); d.p('k',4,8,3,8,10,11,11,12); d.p('w',10,4,11,3,12,4); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-ranomafana', 'Vườn quốc gia Ranomafana', 'Ranomafana rainforest', 'rừng mưa miền đông nam, nơi phát hiện loài vượn cáo tre vàng vào năm 1986. Ranomafana còn có suối nước nóng.',
  d => { d.bg('G'); for(const x of [1,13]){ d.r(x,4,2,12,'N'); d.e(x+1,3,2.8,2.8,'g'); } d.r(6,3,4,9,'c'); d.p('w',7,4,8,7,7,10); d.e(8,13,5,2,'C'); d.p('w',5,11,11,10,9,9); d.p('y',4,6,3,5,5,5); d.p('h',6,1,9,2); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-atsinanana', 'Rừng mưa Atsinanana', 'Atsinanana rainforests', 'nhóm các khu rừng mưa ở sườn đông được UNESCO công nhận năm 2007. Nhiều loài ở đây chỉ có trên đảo.',
  d => { d.bg('l'); for(const [x,y,c] of [[2,6,'G'],[6,4,'g'],[11,6,'G'],[14,5,'g'],[4,10,'g'],[9,9,'G'],[13,11,'g'],[1,12,'G']]) d.e(x,y,3,2.6,c); d.r(0,12,16,4,'G'); d.p('r',6,8,12,9); d.p('y',3,11,10,13); d.p('b',1,1,3,3,9,2,13,1); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-spiny-forest', 'Rừng gai (spiny forest) ở miền nam', 'Spiny forest of the south', 'những cây mọng nước, có gai thuộc họ Didiereaceae, thích nghi với khí hậu khô. Phong cảnh giống như một hành tinh khác.',
  d => { d.bg('u'); d.r(0,13,16,3,'O'); for(const [x,h] of [[2,11],[6,8],[10,12],[13,7]]){ d.r(x,13-h,1,h,'G'); for(let y=14-h;y<13;y+=2) d.p('g',x-1,y,x+1,y+1); d.p('r',x,12-h); } d.e(8,12,1.6,1.2,'g'); d.e(13.5,2,2,2,'y'); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-tsiribihina', 'Sông Tsiribihina', 'Tsiribihina River', 'dòng sông ở miền tây, du khách đi thuyền nhiều ngày qua các vách đá và làng ven sông. Buổi chiều có rất nhiều chim nước.',
  d => { d.bg('o'); d.tri(0,2,7,10,'O'); d.tri(9,3,7,9,'N'); d.r(0,9,16,7,'b'); d.r(4,11,8,2,'N'); d.e(8,9,1,1,'s'); d.r(7,10,3,1,'r'); d.l(10,9,13,13,'n'); d.p('w',2,6,3,5,4,6,12,6,13,5,14,6); d.p('c',1,14,13,15,6,15); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-pangalanes', 'Kênh Pangalanes (Canal des Pangalanes)', 'Pangalanes Canal', 'hệ thống đầm phá và kênh đào dài dọc bờ biển đông. Người dân dùng để đi lại và vận chuyển hàng.',
  d => { d.bg('c'); d.r(0,6,16,10,'g'); d.r(10,6,6,10,'C'); d.r(11,6,1,10,'u'); d.r(3,6,5,10,'b'); d.r(4,9,3,5,'n'); d.p('s',5,10); d.l(5,11,8,8,'N'); for(const x of [1,9]){ d.r(x,4,1,5,'n'); d.p('G',x-1,3,x,2,x+1,3,x,3); } d.p('c',4,7,6,15); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-maromokotro', 'Đỉnh Maromokotro', 'Maromokotro summit', 'đỉnh núi cao nhất đảo, khoảng 2.876 m, thuộc dãy núi Tsaratanana ở phía bắc. Khu vực này rất ít người đến.',
  d => { d.bg('c'); d.tri(0,3,16,13,'A'); d.tri(5,3,6,4,'w'); d.tri(0,8,8,8,'G'); d.tri(9,9,7,7,'g'); d.l(8,8,9,15,'t'); d.p('w',2,2,3,2,4,2,12,4,13,4); d.p('r',8,1,9,1); d.p('k',8,2); }, SC);
add(1, 'Núi, rừng, sông và biển', 'mg-reef', 'Rạn san hô và biển Nosy Ve, Ifaty', 'Coral reef at Nosy Ve and Ifaty', 'vùng biển phía tây nam với rạn san hô và làng chài. Người Vezo đi thuyền độc mộc có phao phụ để đánh cá.',
  d => { d.bg('c'); d.r(0,5,16,11,'C'); d.r(2,3,10,2,'n'); d.r(7,0,1,3,'N'); d.tri(8,0,4,3,'w'); d.l(2,5,13,5,'N'); for(const [x,c] of [[2,'r'],[6,'p'],[10,'o'],[13,'v']]) d.p(c,x,15,x,14,x,13,x-1,12,x+1,12,x+1,14); d.p('y',4,9,5,9,5,8,11,10,12,10); d.p('w',3,9,10,10); }, SC);

// ----- Mùa và thiên nhiên -----
add(1, 'Mùa và thiên nhiên', 'mg-dry-season', 'Mùa khô (tháng 5–10)', 'Dry season', 'trời mát, ít mưa, thuận lợi nhất để đi xem thiên nhiên. Ở cao nguyên đêm có thể khá lạnh.',
  d => { d.bg('c'); d.e(12,3,2.6,2.6,'y'); d.r(0,11,16,5,'t'); d.r(3,7,2,5,'N'); d.l(4,7,1,4,'N'); d.l(4,7,7,4,'N'); d.l(4,6,4,3,'n'); d.p('Y',9,11,10,10,12,11,13,10,14,11); d.p('O',2,13,7,14,11,13,5,15); }, SC);
add(1, 'Mùa và thiên nhiên', 'mg-rainy-season', 'Mùa mưa (tháng 11–4)', 'Rainy season', 'nóng ẩm, mưa nhiều, nhất là ở bờ đông. Bão nhiệt đới thường đổ bộ vào khoảng tháng Ba–tháng Tư.',
  d => { d.bg('a'); d.e(5,3,4,2.4,'A'); d.e(11,4,4,2.4,'K'); for(const [x,y] of [[2,7],[5,9],[8,7],[11,9],[14,7],[3,11],[9,12],[13,11]]) d.p('c',x,y,x-1,y+1); d.r(0,13,16,3,'b'); d.p('y',9,5,8,6,9,7,8,8); d.p('w',2,14,12,15); }, SC);
add(1, 'Mùa và thiên nhiên', 'mg-jacaranda', 'Hoa phượng tím jacaranda ở Antananarivo', 'Jacaranda blossom', 'tháng Mười đến tháng Mười Một, các con phố và hồ trong thành phố phủ sắc tím. Loài cây này được trồng, không phải cây bản địa.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.r(0,11,16,1,'a'); for(const x of [3,11]){ d.r(x,7,1,5,'N'); d.e(x+.5,5.5,3.6,3,'v'); d.p('p',x-1,4,x+2,6,x,7); } d.p('v',2,13,5,14,10,13,13,14,7,12); d.p('w',8,14); }, SC);
add(1, 'Mùa và thiên nhiên', 'mg-flamboyant', 'Hoa phượng đỏ (flamboyant)', 'Flamboyant tree', 'nở rực vào đầu mùa mưa. Loài cây này có nguồn gốc từ đảo.',
  d => { d.bg('c'); d.r(0,13,16,3,'g'); d.r(7,7,2,7,'N'); d.l(7,9,4,6,'N'); d.l(8,9,12,6,'N'); d.e(8,5,7,3,'r'); d.p('o',4,4,9,3,12,6,6,6); d.p('G',3,6,13,4,8,7); d.p('r',3,12,11,14,13,12,5,14); }, SC);
add(1, 'Mùa và thiên nhiên', 'mg-ravinala', 'Cây ravinala (cây cọ du khách)', 'Ravinala traveller\'s palm', 'cây hình quạt khổng lồ, biểu tượng của đảo. Người dân dùng lá để lợp nhà và thân để làm vách.',
  d => { d.bg('c'); d.r(0,14,16,2,'g'); d.r(7,8,2,7,'n'); for(const [x,y] of [[0,6],[2,2],[5,0],[8,0],[11,0],[13,2],[15,6]]){ d.l(8,8,x,y,'G'); d.p('g',x,y,x,y+1); } d.p('y',7,9,8,9); d.p('N',7,11,8,13); }, SC);
add(1, 'Mùa và thiên nhiên', 'mg-baobab', 'Baobab', 'Baobab trees', 'đảo có sáu trong tám loài baobab của thế giới, hầu hết chỉ có ở đây. Thân cây dự trữ nước để sống qua mùa khô.',
  d => { d.bg('u'); d.r(0,13,16,3,'O'); d.r(5,6,6,8,'n'); d.r(6,5,4,1,'n'); d.p('N',6,8,6,9,6,10,9,10,9,11,9,12); for(const [x,y] of [[2,3],[5,2],[8,2],[11,2],[13,3]]){ d.l(8,6,x,y,'N'); d.e(x+.5,y,1.6,1.2,'G'); } d.p('y',1,14,13,15); }, SC);
add(1, 'Mùa và thiên nhiên', 'mg-mangrove', 'Rừng ngập mặn và đảo san hô', 'Mangroves and coral islands', 'những vùng ven biển quan trọng đối với cá và chim biển. Chúng bị đe dọa bởi việc chặt cây lấy củi.',
  d => { d.bg('c'); d.r(0,10,16,6,'C'); for(const x of [3,10]){ d.e(x+1,5,3.6,3,'G'); d.p('g',x,3,x+2,4); d.l(x+1,7,x-1,12,'N'); d.l(x+1,7,x+1,12,'N'); d.l(x+1,7,x+3,12,'N'); } d.e(14,13,2,1,'u'); d.p('w',7,3,8,2,9,3); d.p('o',7,14,8,14,9,13); }, SC);

// ----- Vùng miền -----
add(1, 'Vùng miền', 'mg-highlands', 'Cao nguyên miền Trung (Hauts Plateaux)', 'Central Highlands', 'vùng đông dân nhất, với Antananarivo, Antsirabe và những ruộng bậc thang trồng lúa. Đây là quê hương của người Merina và Betsileo.',
  d => { d.bg('c'); d.tri(0,2,11,10,'a'); d.tri(7,3,9,9,'g'); for(const [y,c] of [[9,'g'],[11,'h'],[13,'g'],[15,'h']]){ d.r(0,y,16,1,c); d.r(0,y+1,16,1,'c'); } d.r(0,14,16,2,'G'); d.r(2,7,3,3,'O'); d.tri(1,5,5,2,'N'); d.p('y',10,10,13,12); }, SC);
add(1, 'Vùng miền', 'mg-east-coast', 'Bờ đông', 'East coast', 'vùng ẩm ướt với rừng mưa, cảng Toamasina (Tamatave) và các đồn điền vani. Dân tộc Betsimisaraka sống chủ yếu ở đây.',
  d => { d.bg('a'); d.tri(0,3,10,8,'G'); d.r(0,9,16,2,'g'); d.r(8,10,8,6,'C'); d.r(0,11,8,5,'g'); d.l(2,11,2,15,'N'); d.l(5,11,5,15,'N'); for(const y of [12,14]) d.p('G',1,y,3,y,4,y,6,y); d.r(10,7,5,2,'r'); d.r(12,4,1,3,'k'); d.p('w',10,13,13,14); }, SC);
add(1, 'Vùng miền', 'mg-sava', 'Vùng Sambava – Antalaha – Vohemar – Andapa (phía đông bắc)', 'Vanilla region (SAVA)', 'vùng trồng vani lớn nhất đảo. Những cánh đồng vani được thụ phấn bằng tay.',
  d => { d.bg('l'); d.r(0,14,16,2,'n'); for(const x of [3,8,13]){ d.r(x,2,1,12,'N'); d.l(x-2,5,x+1,3,'G'); d.l(x-1,9,x+2,7,'g'); d.p('k',x-1,10,x-1,11,x-1,12); d.p('K',x+1,11,x+1,12); d.p('e',x+1,5,x+2,5,x+1,6); } }, SC);
add(1, 'Vùng miền', 'mg-west-coast', 'Bờ tây', 'West coast', 'vùng khô hơn với rừng lá rụng mùa khô, có Morondava và người Sakalava. Đây là quê hương của đại lộ baobab.',
  d => { d.bg('o'); d.r(0,10,16,6,'C'); d.r(0,12,6,4,'t'); d.e(12,8,3,3,'y'); d.r(12,10,4,6,'C'); d.r(2,5,2,8,'N'); d.p('G',1,4,2,3,3,4,4,4,3,3); d.p('k',7,11,8,11,9,11,10,11,8,10); d.l(12,12,13,12,'o'); }, SC);
add(1, 'Vùng miền', 'mg-south', 'Miền nam', 'The south', 'vùng khô cằn quanh Toliara và Fort-Dauphin (Taolagnaro), nơi người Antandroy chăn zebu. Nơi đây thường thiếu nước.',
  d => { d.bg('u'); d.e(3,3,2.4,2.4,'o'); d.r(0,10,16,6,'o'); for(let x=1;x<15;x+=2){ d.r(x,11,1,3,'G'); d.p('g',x,10); } d.e(10,8,3,2,'w'); d.r(12,5,3,3,'w'); d.p('N',12,4,11,3,15,4,15,3); d.p('k',9,10,9,11,12,10,12,11,13,6); }, SC);
add(1, 'Vùng miền', 'mg-north', 'Miền bắc', 'The north', 'vùng có Antsiranana, Nosy Be và núi Montagne d\'Ambre. Khí hậu nhiệt đới và nhiều rừng mưa.',
  d => { d.bg('c'); d.tri(1,2,10,9,'G'); d.p('a',5,2,6,2); d.tri(9,5,7,6,'g'); d.r(0,11,16,5,'C'); d.r(0,10,16,1,'u'); d.p('w',2,12,9,14,13,12); d.r(3,6,1,4,'c'); d.p('y',14,2,15,2,14,3,15,3); d.p('r',6,8,12,8); }, SC);

// ----- Hiện tượng đặc biệt -----
add(1, 'Hiện tượng đặc biệt', 'mg-lavaka', '"Đảo đỏ" và các khe xói lavaka', 'The red island and lavaka gullies', 'đất laterite đỏ khiến đảo nhìn từ trên cao như có màu gạch. Các lavaka là những vết xói sâu trên sườn đồi, một dấu hiệu của xói mòn đất.',
  d => { d.bg('c'); d.e(8,14,10,8,'O'); d.tri(4,7,8,6,'r'); d.dtri(5,8,6,7,'R'); d.p('o',7,9,8,11,9,10); d.p('g',2,9,3,8,13,8,14,10,1,11); d.r(0,15,16,1,'N'); d.p('e',6,12,10,13); }, SC);
add(1, 'Hiện tượng đặc biệt', 'mg-humpback', 'Cá voi lưng gù ở Sainte-Marie', 'Humpback whales', 'từ tháng Bảy đến tháng Tám, cá voi lưng gù đến sinh sản và nuôi con ven bờ đông. Người ta đi thuyền để ngắm chúng.',
  d => { d.bg('c'); d.r(0,9,16,7,'C'); d.e(8,8,5,3,'B'); d.r(0,10,16,6,'C'); d.p('B',12,10,13,11,14,10,15,9); d.p('w',4,8,5,9,6,9,7,9); d.p('k',4,7); d.p('w',6,4,5,3,6,2,7,3,4,2,8,2); d.p('c',2,13,10,12,13,14); }, SC);
add(1, 'Hiện tượng đặc biệt', 'mg-cyclone', 'Bão nhiệt đới', 'Tropical cyclone', 'mùa mưa thường có bão đổ bộ vào bờ đông, gây ngập lụt và hư hại nhà cửa. Một số cơn bão đã gây thiệt hại lớn cho mùa màng.',
  d => { d.bg('K'); d.spiral(8,8,2.2,'w'); d.e(8,8,1.6,1.6,'B'); d.r(0,13,16,3,'b'); d.p('c',2,12,3,13,12,12,13,13); d.l(14,14,11,10,'n'); d.p('G',10,9,9,10,11,8,10,8); }, SC);
add(1, 'Hiện tượng đặc biệt', 'mg-night-animals', 'Động vật hoạt động về đêm', 'Night animals', 'nhiều loài vượn cáo đêm hoạt động khi trời tối. Du khách có thể đi dạo đêm cùng hướng dẫn viên.',
  d => { d.bg('i'); d.e(13,3,2,2,'e'); d.r(0,9,16,2,'N'); d.p('N',3,8,12,12,13,13); d.e(6,6,2.8,2.6,'a'); d.e(5,5.5,1.2,1.2,'o'); d.e(7.5,5.5,1.2,1.2,'o'); d.p('k',5,5,7,5); d.p('a',3,3,9,3); d.p('a',8,8,9,9,9,10,9,11,10,12); d.p('w',2,2,10,6,14,8); }, SC);
