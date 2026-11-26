import { add, SC, setCC } from './pass-kit.js';
setCC('sa');
// Ả Rập Xê Út · Nhóm 1: Nơi chốn và thiên nhiên

// ----- Địa danh -----
add(1, 'Địa danh', 'sa-mecca', 'Mecca (Makkah) và đền Masjid al-Haram', 'Mecca and Masjid al-Haram', 'thành phố thiêng liêng nhất của Đạo Hồi, nơi có Kaaba, công trình hình khối màu đen mà tín đồ hướng về khi cầu nguyện. Chỉ người theo Đạo Hồi mới được vào khu vực trung tâm thành phố.',
  d => { d.bg('B'); d.r(0,12,16,4,'W'); d.r(1,4,1,9,'e'); d.r(14,4,1,9,'e'); d.p('y',1,3,14,3); d.r(5,6,6,7,'i'); d.r(5,8,6,1,'y'); d.p('y',9,10,9,11); d.r(3,12,10,1,'l'); for(let x=2;x<15;x+=2) d.p('a',x,14); d.p('w',4,2,11,1,8,3); }, SC);
add(1, 'Địa danh', 'sa-medina', 'Medina (Madinah) và đền Al-Masjid an-Nabawi', 'Medina and Al-Masjid an-Nabawi', 'thành phố thánh thứ hai của Đạo Hồi, nơi có đền thờ gắn với người sáng lập đạo. Nhiều tín đồ đến đây sau hoặc trước chuyến hành hương đến Mecca.',
  d => { d.bg('c'); d.r(0,13,16,3,'W'); d.r(3,8,10,5,'e'); d.fan(8,8,3.5,'g'); d.p('y',8,3,8,4); d.r(1,3,1,10,'w'); d.r(14,3,1,10,'w'); d.p('g',1,2,14,2); for(const x of [4,7,10]) d.r(x,10,2,3,'N'); }, SC);
add(1, 'Địa danh', 'sa-riyadh', 'Riyadh', 'Riyadh', 'thủ đô nằm giữa cao nguyên Najd, ngày nay là một đô thị hiện đại đông dân. Thành phố có những tòa tháp cao và khu phố cổ cùng tồn tại.',
  d => { d.bg('u'); d.r(0,13,16,3,'t'); d.r(1,6,3,7,'a'); d.r(5,3,2,10,'A'); d.p('A',5,2); d.r(8,7,3,6,'t'); d.r(12,2,3,11,'a'); d.p('u',13,3,13,4); for(const [x,y] of [[2,8],[2,10],[9,9],[12,7],[14,9],[6,6]]) d.p('y',x,y); }, SC);
add(1, 'Địa danh', 'sa-masmak', 'Pháo đài Masmak (Masmak Fortress)', 'Masmak Fortress', 'pháo đài đất sét ở trung tâm Riyadh, gắn với cuộc chiếm lại thành phố năm 1902 của Abdulaziz Al Saud, người sau này lập ra vương quốc. Nay pháo đài là một bảo tàng nhỏ.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(2,6,12,7,'O'); d.r(1,4,4,9,'t'); d.r(11,4,4,9,'t'); for(const x of [1,3,11,13,6,8]) d.p('t',x,3); d.r(7,9,2,4,'N'); d.p('N',3,7,12,7,5,8,10,8); }, SC);
add(1, 'Địa danh', 'sa-albalad', 'Jeddah và khu Al-Balad', 'Jeddah and Al-Balad', 'thành phố cảng bên Biển Đỏ, cổng vào của nhiều người hành hương. Khu phố cổ Al-Balad có những ngôi nhà san hô và gỗ nhiều tầng, được UNESCO (Tổ chức Giáo dục, Khoa học và Văn hóa Liên Hợp Quốc) công nhận là di sản thế giới năm 2014.',
  d => { d.bg('c'); d.r(0,14,16,2,'C'); for(const [x,h] of [[1,11],[6,13],[11,10]]){ d.r(x,14-h,4,h,'e'); for(let y=15-h;y<13;y+=3){ d.r(x,y,4,2,'n'); d.p('N',x+1,y,x+2,y+1); } d.p('G',x+1,13,x+2,13); } }, SC);
add(1, 'Địa danh', 'sa-hegra', 'Mada’in Salih (Hegra)', 'Hegra (Mada\'in Salih)', 'khu mộ đá của người Nabataea ở AlUla, là di sản thế giới đầu tiên của Ả Rập Xê Út, được công nhận năm 2008. Chi tiết xem trong phần câu chuyện cuối nhóm này.',
  d => { d.bg('u'); d.r(0,13,16,3,'t'); d.e(8,8,6,6.5,'O'); d.r(2,8,12,6,'O'); d.r(5,7,6,7,'t'); d.p('t',5,6,7,6,9,6,6,5,8,5,10,6); d.r(7,10,2,4,'N'); d.r(5,9,6,1,'e'); d.p('n',6,11,9,11); }, SC);
add(1, 'Địa danh', 'sa-alula', 'AlUla', 'AlUla', 'thung lũng sa thạch ở tây bắc với những vách đá cao, hẻm núi và ốc đảo. Nơi đây có tảng đá hình voi (Jabal AlFil) nổi tiếng và những khu khảo cổ cổ xưa.',
  d => { d.bg('c'); d.r(0,12,16,4,'t'); d.e(7,6,5,3.5,'O'); d.r(3,7,3,6,'O'); d.r(10,6,2,7,'O'); d.r(12,8,2,2,'O'); d.p('n',5,5,8,4,4,9,11,10); d.e(14,13,1.5,1.5,'G'); d.p('y',14,2,13,2); }, SC);
add(1, 'Địa danh', 'sa-diriyah', 'Diriyah và khu At-Turaif', 'Diriyah and At-Turaif', 'thị trấn bùn đất ở ngoại ô Riyadh, cái nôi của nhà Saud vào thế kỷ 18. Khu At-Turaif được UNESCO công nhận năm 2010.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.r(1,7,5,6,'n'); d.r(6,4,4,9,'O'); d.r(10,8,5,5,'n'); for(const [x,y] of [[1,6],[3,6],[5,6],[6,3],[9,3],[10,7],[12,7],[14,7]]) d.p('n',x,y); d.p('N',3,9,8,6,8,9,12,10); d.tri(7,11,2,2,'N'); d.e(1,12,1.4,2,'G'); }, SC);
add(1, 'Địa danh', 'sa-alahsa', 'Ốc đảo Al-Ahsa', 'The Al-Ahsa oasis', 'một trong những ốc đảo cọ lớn nhất thế giới, với hàng triệu cây chà là và nhiều suối nước. UNESCO công nhận năm 2018.',
  d => { d.bg('c'); d.r(0,11,16,5,'t'); d.e(8,13,5,1.8,'C'); for(const [x,y] of [[2,4],[8,2],[13,5]]){ d.l(x,y+1,x,11,'n'); d.p('G',x-2,y+1,x-1,y,x,y,x+1,y,x+2,y+1,x-1,y+1,x+1,y+1,x,y-1); d.p('o',x,y+2); } d.p('w',6,13,10,13); }, SC);

// ----- Sa mạc, núi và biển -----
add(1, 'Sa mạc, núi và biển', 'sa-rubalkhali', 'Rub’ al-Khali (Empty Quarter, Khu Vực Trống)', 'The Empty Quarter', 'sa mạc cát liền khối lớn nhất thế giới, kéo dài sang cả Oman, Các Tiểu vương quốc Ả Rập Thống nhất và Yemen. Các cồn cát có thể cao hàng trăm mét và gần như không có dân ở.',
  d => { d.bg('o'); d.e(12,3,2,2,'y'); d.e(3,12,8,5,'t'); d.e(13,13,8,5,'O'); d.e(8,16,9,4,'u'); d.l(0,9,6,8,'e'); d.p('N',8,13,10,14,12,15); }, SC);
add(1, 'Sa mạc, núi và biển', 'sa-edge', 'Edge of the World (Jebel Fihrayn)', 'Edge of the World', 'mép vách đá dựng đứng ở cao nguyên Tuwaiq gần Riyadh, nhìn xuống một đồng bằng rộng. Du khách thường đến đây vào lúc hoàng hôn.',
  d => { d.bg('o'); d.e(12,4,2,2,'y'); d.r(0,12,16,4,'t'); d.r(0,5,7,11,'n'); d.r(7,8,2,8,'n'); d.r(0,5,7,1,'O'); d.p('O',7,8,8,8); d.p('N',2,8,5,11,3,13,8,12); d.p('k',5,3,5,4); d.p('w',10,13,13,14); }, SC);
add(1, 'Sa mạc, núi và biển', 'sa-asir', 'Dãy núi Asir', 'The Asir mountains', 'vùng núi cao ở tây nam, có những đỉnh trên 3.000 mét và khí hậu mát hơn hẳn phần còn lại. Đây là nơi có nhiều làng đá truyền thống trên sườn dốc.',
  d => { d.bg('c'); d.tri(0,2,11,10,'G'); d.tri(6,0,10,12,'g'); d.p('w',2,1,13,3); d.r(0,11,16,5,'h'); for(const y of [12,14]) d.r(0,y,16,1,'G'); d.r(3,8,2,4,'t'); d.p('r',3,7,4,7); d.r(11,9,2,3,'t'); }, SC);
add(1, 'Sa mạc, núi và biển', 'sa-taif', 'Taif', 'Taif and its roses', 'thành phố trên núi gần Mecca, nổi tiếng với vườn hoa hồng, nho và khí hậu mát. Nhiều gia đình ở Jeddah lên đây trốn nóng vào mùa hè.',
  d => { d.bg('c'); d.tri(0,1,12,8,'a'); d.r(0,9,16,7,'g'); for(const [x,y] of [[2,10],[6,12],[10,10],[13,13],[4,14],[9,14]]){ d.e(x+.5,y+.5,1.6,1.4,'p'); d.p('r',x,y); } d.p('w',12,3,13,3); }, SC);
add(1, 'Sa mạc, núi và biển', 'sa-redsea', 'Biển Đỏ và quần đảo Farasan', 'The Red Sea and Farasan islands', 'bờ biển dài với rạn san hô phong phú, phát triển du lịch lại trong những năm gần đây. Quần đảo Farasan là nơi sinh sống của nhiều loài chim biển và linh dương.',
  d => { d.bg('C'); d.r(0,0,16,4,'c'); d.e(11,4,4,1.2,'t'); d.l(11,1,11,3,'G'); d.p('G',10,1,12,1); d.e(4,9,2.4,1.5,'y'); d.p('y',7,8,7,10); d.p('k',3,9); d.e(11,10,1.6,1.1,'o'); d.p('o',13,10); for(const x of [2,3,8,13]){ d.l(x,15,x,12,'p'); d.p('r',x-1,13,x+1,12); } }, SC);
add(1, 'Sa mạc, núi và biển', 'sa-harrat', 'Đồng bằng đá núi lửa (harrat)', 'Lava fields (harrat)', 'các cánh đồng dung nham đen ở tây bán đảo như Harrat Khaybar. Có các miệng núi lửa đã tắt và hố sụt lớn như miệng Wahba.',
  d => { d.bg('c'); d.tri(1,4,8,6,'K'); d.tri(9,6,7,4,'k'); d.r(3,4,4,1,'i'); d.r(0,10,16,6,'d'); for(const [x,y] of [[2,11],[6,13],[11,12],[14,14],[9,15],[4,14]]) d.p('K',x,y,x+1,y); d.p('w',12,2,13,2); }, SC);

// ----- Mùa và thiên nhiên -----
add(1, 'Mùa và thiên nhiên', 'sa-summer', 'Mùa hè khắc nghiệt', 'The harsh summer', 'nhiệt độ ở nhiều nơi có thể vượt 45 độ C, nên người dân ít ra ngoài vào giữa trưa. Nhiều hoạt động được dời sang buổi tối.',
  d => { d.bg('o'); d.e(8,6,4,4,'y'); for(const [x,y] of [[8,0],[2,6],[14,6],[3,1],[13,1],[3,11],[13,11]]) d.p('r',x,y); d.r(0,12,16,4,'t'); d.r(2,13,1,2,'r'); d.e(2.5,15,1.4,1,'r'); d.p('w',2,10); d.l(5,12,11,12,'u'); }, SC);
add(1, 'Mùa và thiên nhiên', 'sa-winter', 'Mùa đông dễ chịu', 'The mild winter', 'từ tháng 11 đến tháng 2 trời mát hơn, là mùa cắm trại sa mạc và đi du lịch. Ban đêm sa mạc có thể lạnh đến mức phải mặc áo ấm.',
  d => { d.bg('B'); d.p('w',3,2,8,1,13,3,11,6,2,6); d.e(12,2,1.6,1.6,'u'); d.r(0,12,16,4,'n'); d.tri(1,5,9,7,'R'); d.p('N',5,10,5,11); d.p('o',11,11,13,11); d.p('y',12,10,12,9); d.p('r',12,11); d.l(10,13,14,13,'N'); }, SC);
add(1, 'Mùa và thiên nhiên', 'sa-rain', 'Ít mưa', 'Little rain', 'lượng mưa thấp, nhưng khi mưa đến có thể gây lũ quét ở các lòng sông khô (wadi). Vùng núi Asir nhận nhiều mưa hơn các nơi khác.',
  d => { d.bg('a'); d.e(8,3,5,2.5,'A'); d.e(5,4,3,2,'W'); for(const [x,y] of [[5,7],[9,8],[12,7],[7,10]]) d.p('b',x,y,x,y+1); d.r(0,12,16,4,'t'); d.p('n',3,13,4,14,5,13,10,14,11,13,12,15); }, SC);
add(1, 'Mùa và thiên nhiên', 'sa-snow', 'Tuyết hiếm gặp', 'Rare snow', 'tuyết đôi khi rơi trên dãy núi ở phía bắc, như Jabal al-Lawz gần Tabuk. Đây là hiện tượng hiếm, nhưng đã gây chú ý khi xuất hiện.',
  d => { d.bg('a'); d.tri(1,3,11,9,'W'); d.p('w',6,3,5,4,6,4,7,4,4,5,5,5,8,5); d.r(0,11,16,5,'t'); d.r(2,12,5,1,'w'); d.r(10,13,4,1,'w'); d.p('w',2,2,13,1,10,4,14,7,3,8); d.r(13,10,1,3,'N'); d.p('G',12,9,14,9,13,8); }, SC);
add(1, 'Mùa và thiên nhiên', 'sa-palm', 'Cây chà là', 'The date palm', 'cây biểu tượng của phần lớn bán đảo, cho trái ngọt thu hoạch vào giữa và cuối hè. Cây chịu được nóng và hạn nên phù hợp với các ốc đảo.',
  d => { d.bg('c'); d.r(0,13,16,3,'t'); d.l(8,5,7,13,'n'); d.l(9,5,8,13,'N'); for(const [x,y] of [[2,6],[3,2],[8,0],[13,2],[14,6]]) d.l(8,4,x,y,'G'); for(const [x,y] of [[4,3],[12,3],[3,6],[13,5]]) d.p('g',x,y); d.e(6.5,6,1.4,1.6,'o'); d.e(10.5,6,1.4,1.6,'o'); }, SC);

// ----- Vùng miền -----
add(1, 'Vùng miền', 'sa-hejaz', 'Hejaz (Hijaz)', 'Hejaz', 'dải phía tây dọc Biển Đỏ, gồm Mecca, Medina và Jeddah. Đây là nơi có nhiều người hành hương đi qua nên văn hóa có sự trộn lẫn nhiều nơi.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.r(0,9,16,3,'t'); d.r(2,3,4,8,'e'); d.r(2,5,4,2,'n'); d.r(9,6,5,5,'w'); d.fan(11.5,6,2,'g'); d.r(7,4,1,7,'w'); d.p('w',3,13,10,14); d.p('N',3,9,4,10); }, SC);
add(1, 'Vùng miền', 'sa-najd', 'Najd', 'Najd', 'cao nguyên trung tâm với Riyadh, truyền thống chăn nuôi du mục và nhà Saud xuất thân từ đây. Phong cách sống ở đây thường được xem là bảo thủ hơn.',
  d => { d.bg('u'); d.r(0,11,16,5,'O'); d.r(0,8,6,3,'n'); d.r(0,8,6,1,'t'); d.r(8,5,6,7,'t'); for(const x of [8,10,12]) d.p('t',x,4); d.tri(10,9,2,3,'N'); d.p('N',9,7,12,7); d.e(3,13,2,1.2,'k'); d.p('k',5,12); }, SC);
add(1, 'Vùng miền', 'sa-jizan', 'Asir và Jizan', 'Asir and Jizan', 'vùng núi và ven biển phía tây nam, gần Yemen, có khí hậu mát và ruộng bậc thang. Dân ở đây có trang phục và kiến trúc riêng.',
  d => { d.bg('c'); d.tri(0,1,10,9,'G'); d.r(0,8,10,4,'g'); for(const y of [9,11]) d.r(0,y,10,1,'G'); d.r(10,10,6,6,'C'); d.r(0,12,11,4,'t'); d.r(4,4,3,4,'t'); d.p('r',4,3,6,3); d.l(11,12,14,12,'w'); d.tri(12,8,3,3,'w'); }, SC);
add(1, 'Vùng miền', 'sa-eastern', 'Tỉnh Miền Đông (Eastern Province)', 'The Eastern Province', 'vùng ven Vịnh Ba Tư với các thành phố Dammam, Khobar và Dhahran, nơi bắt đầu ngành dầu mỏ từ năm 1938. Đây là vùng kinh tế quan trọng nhất.',
  d => { d.bg('c'); d.r(0,11,16,5,'C'); d.r(0,9,16,2,'t'); d.l(4,2,2,10,'k'); d.l(4,2,6,10,'k'); d.l(3,6,5,6,'k'); d.p('r',4,1); d.r(9,5,2,5,'a'); d.r(12,3,2,7,'A'); d.e(13,1,1.5,1.2,'W'); d.p('y',10,6,12,5); d.p('i',2,13,3,13,4,14); }, SC);
add(1, 'Vùng miền', 'sa-north', 'Miền Bắc (Tabuk, Hail, Jouf)', 'The North (Tabuk, Hail, Jouf)', 'vùng sa mạc và đồng bằng đá gần biên giới Jordan, có nhiều di tích cổ. Hail còn có các tranh khắc đá ở khu Jubbah được UNESCO công nhận năm 2015.',
  d => { d.bg('t'); d.r(0,12,16,4,'O'); d.e(5,7,5,5,'n'); d.r(0,7,10,5,'n'); d.l(3,6,3,9,'e'); d.p('e',2,7,4,7,2,10,4,10); d.l(6,8,8,8,'e'); d.p('e',6,9,8,9,8,7); d.e(13,10,2,2.5,'a'); d.p('y',13,2,12,2); }, SC);

// ----- Hiện tượng đặc biệt -----
add(1, 'Hiện tượng đặc biệt', 'sa-shamal', 'Bão cát (shamal)', 'The shamal sandstorm', 'gió mạnh cuốn cát bụi che kín bầu trời và có thể làm giảm tầm nhìn nghiêm trọng. Hiện tượng này thường xảy ra vào mùa hè và đầu mùa xuân.',
  d => { d.bg('t'); d.e(5,6,7,5,'O'); d.e(9,4,5,3.5,'o'); d.e(3,9,4,3,'n'); for(let y=2;y<14;y+=3) d.l(9,y,15,y-1,'u'); d.r(0,13,16,3,'n'); d.r(11,9,2,4,'k'); d.p('k',12,8,10,10); }, SC);
add(1, 'Hiện tượng đặc biệt', 'sa-wadi', 'Lũ quét từ wadi', 'Flash floods in a wadi', 'những lòng sông khô có thể đầy nước rất nhanh sau trận mưa lớn ở núi. Người đi cắm trại ở đáy wadi cần hết sức cẩn thận.',
  d => { d.bg('A'); d.e(4,2,4,2,'a'); d.e(12,2,4,2,'a'); d.p('c',3,4,6,5,11,4); d.tri(0,5,7,7,'n'); d.tri(9,4,7,8,'n'); d.r(0,11,16,5,'t'); d.l(8,7,6,10,'c'); d.r(3,11,10,4,'C'); d.p('w',4,12,8,13,11,11,7,14); }, SC);
add(1, 'Hiện tượng đặc biệt', 'sa-aquifer', 'Các hồ muối và nước ngầm cổ', 'Salt lakes and ancient groundwater', 'dưới sa mạc có những tầng nước ngầm được tích trữ từ thời khí hậu ẩm hơn hàng nghìn năm trước. Ngày nay người ta khai thác phần lớn nước này cho nông nghiệp và sinh hoạt, nên nguồn nước là một vấn đề lâu dài.',
  d => { d.bg('c'); d.r(0,5,16,11,'t'); d.e(4,6,3.5,1.2,'w'); d.r(0,8,16,2,'n'); d.r(0,11,16,3,'C'); d.p('w',2,12,7,11,12,13); d.r(10,2,1,10,'a'); d.p('a',9,2,11,2,12,2); d.p('b',13,3,13,4); }, SC);
add(1, 'Hiện tượng đặc biệt', 'sa-desal', 'Nhà máy khử mặn nước biển', 'Desalination plants', 'Ả Rập Xê Út là một trong những nước sản xuất nước ngọt từ biển nhiều nhất thế giới. Thành phố nằm sâu trong lục địa như Riyadh nhận nước qua các đường ống dài.',
  d => { d.bg('c'); d.r(0,12,16,4,'C'); d.r(1,6,4,6,'W'); d.fan(3,6,2,'a'); d.r(6,4,3,8,'a'); d.r(7,1,1,3,'A'); d.e(9,1,1.5,1,'w'); d.r(10,8,5,4,'W'); d.l(5,10,10,10,'b'); d.l(14,9,15,9,'b'); d.p('b',12,5,11,6,13,6,12,6); }, SC);
