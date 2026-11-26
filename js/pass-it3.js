import { add, SC, setCC } from './pass-kit.js';
setCC('it');
// Ý · Nhóm 3: Ẩm thực

// ----- Bánh và mì ống -----
add(3, 'Bánh và mì ống', 'it-pizza-napoli', 'Pizza Napoletana', 'Neapolitan pizza', 'bánh mỏng, mép phồng, nướng rất nhanh trong lò củi nóng. Nghề làm pizza kiểu Napoli đã được UNESCO ghi nhận là di sản văn hóa phi vật thể năm 2017.',
  d => { d.e(8,8,7,6,'t'); d.e(8,8,5.2,4.2,'r'); d.p('w',6,6,7,6,10,8,6,10,9,10); d.p('G',8,7,5,8,10,6); d.p('N',2,6,13,10,8,2,4,12); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-margherita', 'Pizza Margherita', 'Pizza Margherita', 'cà chua, phô mai mozzarella và lá húng quế, ba màu tương ứng với cờ Ý. Ít món nào thể hiện rõ sự đơn giản mà tinh tế của ẩm thực Ý đến vậy.',
  d => { d.e(8,8,7,7,'O'); d.e(8,8,5.5,5.5,'r'); d.e(5.5,6,1.5,1.5,'w'); d.e(10.5,7,1.5,1.5,'w'); d.e(7.5,11,1.5,1.5,'w'); d.p('G',8,5,9,5,6,9,5,9,11,10,10,10); d.p('g',8,4,11,11); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-focaccia', 'Focaccia', 'Focaccia', 'bánh mì dẹt nhiều dầu ô liu, thường rắc muối biển và húng. Kiểu làm ở vùng Liguria rất nổi tiếng.',
  d => { d.r(2,5,12,8,'t'); d.r(3,4,10,1,'t'); d.r(2,12,12,2,'O'); for(const [x,y] of [[4,6],[8,7],[11,6],[5,10],[10,10]]) d.p('Y',x,y,x+1,y); d.p('G',6,8,12,9,3,9,9,5); d.p('w',4,8,7,11,12,11); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-carbonara', 'Spaghetti alla carbonara', 'Spaghetti carbonara', 'mì ống trộn trứng, phô mai pecorino Romano, thịt mặt heo áp chảo (guanciale) và tiêu đen, có nguồn gốc ở Roma. Người Ý thường không cho kem tươi vào món này.',
  d => { d.e(8,11,7,3.5,'w'); d.e(8,9,5.5,3.5,'y'); d.l(4,9,11,7,'u'); d.l(5,10,12,9,'u'); d.l(6,7,10,11,'Y'); d.p('r',6,8,9,9,11,10,7,10); d.p('k',8,6,5,10,10,7); d.p('a',3,12,12,12); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-cacio', 'Cacio e pepe', 'Cacio e pepe', 'mì sốt chỉ gồm phô mai pecorino và tiêu đen, có vẻ đơn giản nhưng khó làm cho mịn sánh. Đây là món quen thuộc ở Roma.',
  d => { d.e(8,11,7,3.5,'b'); d.e(8,10,5.5,2.8,'w'); d.e(8,8,4,3,'u'); d.l(5,8,10,6,'y'); d.l(6,10,11,8,'y'); d.p('k',6,7,9,8,8,10,10,9,7,6); d.l(12,2,10,6,'a'); d.l(13,3,11,6,'a'); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-tagliatelle', 'Tagliatelle al ragù (ragù alla bolognese)', 'Tagliatelle al ragù', 'sợi mì trứng dẹt để sốt thịt hầm lâu của vùng Bologna. Người Bologna thường dùng mì này thay cho spaghetti.',
  d => { d.e(8,11,7,3.5,'w'); d.e(8,9,5.5,3,'y'); d.l(3,9,8,6,'Y'); d.l(7,11,13,8,'Y'); d.e(8,8,3,2,'R'); d.p('r',7,7,9,9); d.p('n',8,8,6,9,10,7); d.p('G',8,5); d.p('a',3,12,13,12); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-lasagna', 'Lasagna', 'Lasagna', 'các lớp mì tấm xếp xen sốt thịt, sốt béchamel và phô mai rồi nướng. Kiểu làm ở Emilia-Romagna dùng mì tươi màu xanh lá.',
  d => { d.r(2,6,12,8,'y'); d.r(2,5,12,2,'o'); d.p('w',4,5,8,5,11,6); for(const y of [8,11]){ d.r(2,y,12,1,'r'); d.r(2,y+1,12,1,'g'); } d.r(1,14,14,1,'a'); d.p('G',7,4,8,3,9,4); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-risotto', 'Risotto alla milanese', 'Risotto alla milanese', 'cơm nấu kiểu Ý với nhụy hoa nghệ tây (saffron) cho màu vàng, đặc trưng của Milano. Gạo dùng nấu món này thường trồng ở đồng bằng phía bắc.',
  d => { d.e(8,10,7,4,'w'); d.e(8,9,5.5,3,'y'); d.e(8,8,3,1.8,'u'); d.p('w',6,8,8,7,10,9,7,10,9,8); d.p('r',9,6,7,6); d.p('G',8,5); d.p('a',3,13,12,13); }, { use: 'hold' });
add(3, 'Bánh và mì ống', 'it-gnocchi', 'Gnocchi', 'Gnocchi', 'viên bột khoai tây mềm, nấu chín trong nước rồi trộn sốt. Mỗi vùng có cách phối sốt khác nhau.',
  d => { d.e(8,11,7,3.5,'r'); d.e(8,10,5.5,2.5,'R'); for(const [x,y] of [[4,9],[7,7],[10,9],[6,11],[9,11],[11,7]]){ d.e(x+.5,y+.5,1.6,1.4,'u'); d.p('Y',x,y); } d.p('G',8,9,5,7); }, { use: 'hold' });

// ----- Món mặn, hải sản và phô mai -----
add(3, 'Món mặn, hải sản và phô mai', 'it-fiorentina', 'Bistecca alla fiorentina', 'Florentine T-bone steak', 'miếng thịt bò dày có xương chữ T, nướng tái trên than hồng. Đây là món biểu tượng của Firenze.',
  d => { d.e(8,8,7,5.5,'R'); d.e(8,8,5.5,4.2,'r'); d.r(2,5,12,2,'e'); d.r(7,6,2,7,'e'); d.p('x',5,9,11,10,4,10); d.p('k',3,8,6,11,10,12,13,9); d.p('G',13,2,14,1,12,2); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-ossobuco', 'Osso buco', 'Osso buco', 'chân bê hầm có xương tủy, thường ăn kèm risotto ở Milano. Tên món có nghĩa là “xương có lỗ”.',
  d => { d.e(8,12,7,3,'w'); d.e(8,9,5,3.5,'n'); d.e(8,8,4,2.5,'N'); d.e(8,8,2.4,1.8,'e'); d.p('y',8,8,7,8); d.p('r',4,10,12,10); d.p('G',5,6,11,6,12,11); d.p('o',3,11,13,11); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-saltimbocca', 'Saltimbocca alla romana', 'Saltimbocca alla romana', 'thịt bê mỏng cuốn lá xô thơm và thịt muối, áp chảo với rượu vang trắng. Tên món có nghĩa là “nhảy vào miệng”.',
  d => { d.e(8,12,7,3,'w'); d.e(6,8,4,3,'t'); d.e(11,10,3.5,2.5,'n'); d.e(6,8,2.5,1.8,'x'); d.p('G',5,6,6,7,7,8,11,9,12,10); d.p('g',6,6,12,9); d.l(3,5,9,11,'a'); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-melanzane', 'Parmigiana di melanzane', 'Parmigiana di melanzane', 'cà tím chiên xếp lớp với sốt cà chua và phô mai rồi nướng. Một số vùng ở Nam Ý nhận món này là của mình.',
  d => { d.r(2,8,12,6,'r'); d.r(2,7,12,2,'u'); d.e(5,7,2,1.5,'o'); d.e(10,7,2.5,1.5,'y'); d.r(2,10,12,1,'V'); d.r(2,12,12,1,'V'); d.r(1,14,14,1,'n'); d.e(12,3,2,2.5,'V'); d.p('G',11,0,12,1,13,0); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-parmigiano', 'Phô mai Parmigiano Reggiano', 'Parmigiano Reggiano', 'phô mai cứng ủ ít nhất vài tháng đến nhiều năm, sản xuất ở vùng quanh Parma và Reggio Emilia. Phô mai này thường được bào mỏng rắc lên mì ống.',
  d => { d.r(2,7,11,7,'y'); d.r(2,5,11,2,'u'); d.tri(2,3,11,2,'u'); d.r(13,6,2,8,'O'); d.r(2,13,11,1,'O'); d.p('Y',4,9,7,11,10,8,5,12,11,11); d.p('w',6,6,9,5); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-mozzarella', 'Mozzarella di bufala', 'Buffalo mozzarella', 'phô mai tươi làm từ sữa trâu nước ở vùng Campania, mềm và ngọt. Nó thường được ăn tươi với cà chua và húng.',
  d => { d.e(8,12,7,3,'b'); d.e(6,8,3.5,3.5,'w'); d.e(11,9,3,3,'w'); d.p('l',5,10,6,10,12,11,11,11); d.p('w',6,4); d.e(3,12,2,1.5,'r'); d.p('G',12,5,13,4,13,5,14,5); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-prosciutto', 'Prosciutto di Parma', 'Parma ham', 'giò heo muối ủ lâu, thái mỏng ăn sống, vị mặn dịu. Thường được ăn cùng dưa lưới hoặc bánh mì.',
  d => { d.e(8,9,4,5,'R'); d.e(7,8,2.8,3.5,'r'); d.r(7,1,2,4,'x'); d.p('w',7,1,8,1); d.p('e',9,7,10,9,9,11,8,13); d.p('x',6,8,7,10,8,7); d.e(12,12,3,2,'p'); d.p('w',12,12,11,13,14,11); }, { use: 'hold' });
add(3, 'Món mặn, hải sản và phô mai', 'it-fritto', 'Fritto misto', 'Fritto misto', 'hải sản chiên giòn nhiều loại ở vùng ven biển. Đây là món thường gặp ở các nhà hàng gần cảng.',
  d => { d.r(3,9,10,5,'t'); d.dtri(3,13,10,2,'t'); for(const [x,y] of [[4,6],[7,4],[10,6],[6,8],[9,8]]) d.e(x+.5,y+.5,2,1.6,'O'); d.p('y',5,6,8,4,11,6); d.p('r',7,7,8,7); d.e(13,3,1.8,1.8,'y'); d.p('w',13,3); }, { use: 'hold' });

// ----- Đồ uống, rượu và trà -----
add(3, 'Đồ uống, rượu và trà', 'it-espresso', 'Espresso và cappuccino', 'Espresso and cappuccino', 'cà phê espresso nhỏ, đậm, uống đứng ngay tại quầy. Người Ý thường chỉ uống cappuccino vào buổi sáng, và ít khi gọi sau bữa ăn.',
  d => { d.r(2,8,5,4,'w'); d.r(2,8,5,1,'N'); d.p('w',7,9,8,10,7,11); d.r(1,13,7,1,'a'); d.r(9,6,5,7,'w'); d.r(9,5,5,2,'e'); d.p('n',11,6,10,5); d.p('w',14,8,15,9,14,10); d.r(8,14,7,1,'a'); d.p('a',3,5,4,3,11,2,12,3); }, { use: 'hold' });
add(3, 'Đồ uống, rượu và trà', 'it-vino', 'Rượu vang Chianti và Barolo', 'Chianti and Barolo wine', 'Chianti đến từ Toscana, Barolo đến từ Piemonte, đều là rượu vang đỏ nổi tiếng. Ý là một trong những nước sản xuất rượu vang lớn nhất thế giới.',
  d => { d.r(3,1,2,4,'G'); d.r(2,5,4,9,'G'); d.r(2,8,4,3,'e'); d.p('R',3,9,4,9); d.p('R',3,1,4,1); d.e(11,6,3,3,'m'); d.r(8,3,6,2,'l'); d.l(11,9,11,13,'l'); d.r(9,13,5,1,'l'); d.p('w',9,5); }, { use: 'hold' });
add(3, 'Đồ uống, rượu và trà', 'it-prosecco', 'Prosecco', 'Prosecco', 'rượu vang trắng sủi bọt từ vùng Veneto, nhẹ và thanh. Rượu thường dùng trong tiệc khai vị hoặc chúc mừng.',
  d => { d.r(3,1,2,3,'y'); d.r(2,4,4,10,'G'); d.r(2,8,4,3,'w'); d.r(9,2,4,7,'u'); d.r(9,2,4,1,'l'); d.l(10,9,10,13,'l'); d.l(11,9,11,13,'l'); d.r(9,14,4,1,'l'); d.p('w',10,4,11,6,10,7,12,0,9,0,14,1); }, { use: 'hold' });
add(3, 'Đồ uống, rượu và trà', 'it-spritz', 'Aperol Spritz', 'Aperol Spritz', 'cốc tê cam đắng nhẹ pha từ Aperol, Prosecco và nước có ga, thường uống lúc aperitivo cuối chiều. Đây là thói quen vừa uống vừa ăn nhẹ trước bữa tối.',
  d => { d.e(8,6,5.5,4.5,'o'); d.r(3,2,10,2,'l'); d.l(8,10,8,13,'l'); d.r(5,14,7,1,'l'); d.e(12,3,2.2,2.2,'O'); d.e(12,3,1.2,1.2,'u'); d.p('w',6,5,9,7,7,8); d.l(5,6,3,0,'k'); }, { use: 'hold' });
add(3, 'Đồ uống, rượu và trà', 'it-limoncello', 'Limoncello', 'Limoncello', 'rượu ngâm vỏ chanh ngọt đặc trưng của bờ biển Amalfi và Sorrento. Thường uống lạnh sau bữa ăn.',
  d => { d.r(6,1,2,3,'a'); d.r(4,4,6,10,'y'); d.r(4,7,6,3,'w'); d.p('Y',6,8,7,8); d.p('w',5,5,5,11); d.e(13,11,2.2,2.8,'y'); d.p('G',13,8,14,7); d.r(11,13,1,1,'l'); }, { use: 'hold' });
add(3, 'Đồ uống, rượu và trà', 'it-grappa', 'Grappa và amaro', 'Grappa and amaro', 'grappa chưng cất từ bã nho còn lại sau khi ép rượu, còn amaro là rượu thảo mộc vị đắng. Cả hai thường được uống sau bữa ăn để dễ tiêu.',
  d => { d.r(3,1,2,5,'l'); d.dtri(1,12,6,2,'l'); d.r(2,6,4,8,'l'); d.r(2,10,4,4,'u'); d.r(9,3,3,2,'N'); d.r(8,5,5,9,'n'); d.r(8,8,5,3,'e'); d.p('G',10,9,11,9); d.p('V',14,12,15,13,14,14,13,13); }, { use: 'hold' });
add(3, 'Đồ uống, rượu và trà', 'it-te', 'Trà', 'Tea and tisana', 'Ý không có văn hóa trà mạnh như đồ uống cà phê, nhưng trà thảo mộc (tisana) và trà chanh vẫn được uống khi ốm hoặc cuối bữa. Trong nhà hàng, trà thường được phục vụ sau bữa ăn chính.',
  d => { d.r(3,8,8,6,'w'); d.r(3,8,8,1,'O'); d.p('w',11,9,12,10,12,11,11,12); d.r(1,14,12,1,'a'); d.p('a',5,5,6,3,5,2,8,6,9,4); d.e(13,3,2,1.5,'y'); d.p('G',14,1); d.p('r',6,11,7,11); }, { use: 'hold' });

// ----- Tráng miệng và món lễ -----
add(3, 'Tráng miệng và món lễ', 'it-gelato', 'Gelato', 'Gelato', 'kem Ý đặc hơn, ít khí và ít béo hơn kem thông thường. Người Ý có thể ăn gelato quanh năm, nhưng đông đúc nhất vào mùa hè.',
  d => { d.dtri(4,9,8,7,'t'); d.l(6,10,9,13,'O'); d.l(10,10,7,13,'O'); d.e(5.5,7,3,3,'p'); d.e(10.5,7,3,3,'h'); d.e(8,4,3,3,'e'); d.p('N',7,3,9,4); d.p('w',4,6,9,6); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-tiramisu', 'Tiramisù', 'Tiramisù', 'bánh lạnh xếp lớp bánh ngón tay thấm cà phê với kem mascarpone, rắc bột ca cao. Tên món có nghĩa là “vực tôi dậy”.',
  d => { d.r(2,6,12,8,'e'); d.r(2,5,12,2,'n'); d.p('N',4,5,7,5,10,5,12,6); for(const y of [9,12]) d.r(2,y,12,1,'n'); d.r(1,14,14,1,'w'); d.p('N',3,3,8,2,12,3); d.p('G',9,4,10,3); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-pannacotta', 'Panna cotta', 'Panna cotta', 'kem sữa đông mềm, thường ăn với sốt quả mọng. Xuất xứ từ vùng Piemonte.',
  d => { d.e(8,13,7,2,'w'); d.dtri(4,5,8,1,'e'); d.r(5,5,6,2,'e'); d.r(4,7,8,6,'e'); d.r(5,4,6,2,'r'); d.p('r',4,7,11,7,11,8,5,6); d.e(8,3,1.4,1.4,'m'); d.p('G',9,1); d.p('w',6,9,6,10); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-cannoli', 'Cannoli', 'Cannoli', 'vỏ bánh giòn cuộn tròn, nhồi ricotta ngọt, đặc sản của Sicilia. Thường nhồi ngay trước khi bán để vỏ không bị ẩm.',
  d => { d.l(3,12,12,3,'O'); d.l(4,13,13,4,'O'); d.l(2,11,11,2,'t'); d.l(3,11,11,3,'t'); d.l(3,13,12,4,'O'); d.e(3,12,2,2,'w'); d.e(12.5,3.5,2,2,'w'); d.p('n',2,12,13,3); d.p('r',4,14,14,5); d.p('G',1,11); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-panettone', 'Panettone', 'Panettone', 'bánh ngọt cao, mềm, có nho khô và vỏ cam đường, gắn với Giáng sinh ở Milano. Pandoro là kiểu bánh tương tự hình ngôi sao của Verona.',
  d => { d.r(3,8,10,6,'y'); d.e(8,7,6,4,'O'); d.r(3,10,10,4,'t'); d.p('N',5,6,9,5,11,7,7,8); d.p('r',6,11,10,12); d.p('G',8,12,4,12); d.p('w',8,2,7,3,9,3); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-colomba', 'Colomba', 'The Easter colomba', 'bánh ngọt hình chim bồ câu dùng cho dịp lễ Phục sinh (Pasqua). Bánh có lớp phủ hạnh nhân ở trên.',
  d => { d.e(8,9,6,3,'O'); d.tri(1,3,8,5,'t'); d.tri(7,3,8,5,'t'); d.e(8,5,2,2,'O'); d.p('O',8,13,7,14,9,14); d.p('w',6,8,9,9,11,8,4,6,12,6); d.p('N',7,10,10,11,5,10); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-zeppole', 'Zeppole di San Giuseppe', 'St Joseph\'s zeppole', 'bánh rán nhồi kem, ăn vào ngày lễ Thánh Giuse (19 tháng 3). Đây cũng là ngày Lễ của Cha ở Ý.',
  d => { d.e(8,10,6.5,4.5,'O'); d.e(8,9,5,3,'t'); d.e(8,8,3,2,'u'); d.p('w',6,7,10,8,8,6); d.e(8,6,1.4,1.4,'m'); d.p('G',9,4); d.r(1,14,14,1,'a'); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-chiacchiere', 'Chiacchiere', 'Carnival chiacchiere', 'bánh chiên giòn mỏng, rắc đường bột, ăn trong mùa Carnevale. Tên gọi thay đổi theo từng vùng.',
  d => { d.l(2,5,12,2,'t'); d.l(2,6,12,3,'t'); d.l(2,7,12,4,'t'); d.l(3,10,14,8,'y'); d.l(3,11,14,9,'y'); d.l(3,12,14,10,'y'); d.l(5,14,12,13,'t'); d.l(5,15,12,14,'t'); d.p('w',4,5,8,4,11,3,6,11,10,10,8,14); }, { use: 'hold' });
add(3, 'Tráng miệng và món lễ', 'it-cotechino', 'Cotechino và đậu lentil đêm giao thừa', 'Cotechino with lentils', 'xúc xích heo hầm ăn với đậu lentil vào ngày cuối năm. Người ta tin rằng hạt đậu như những đồng xu mang lại may mắn, đây là tin dân gian.',
  d => { d.e(8,12,7,3,'w'); d.e(8,11,5.5,2,'n'); for(const [x,y] of [[4,11],[7,12],[10,11],[12,12],[6,10]]) d.p('N',x,y); d.e(6,8,2.4,2.4,'R'); d.e(10,8,2.4,2.4,'R'); d.p('e',5,7,7,9,9,8,11,7); d.p('y',2,3,13,2,14,4); }, { use: 'hold' });
