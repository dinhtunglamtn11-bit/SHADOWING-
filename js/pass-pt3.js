import { add, SC, setCC } from './pass-kit.js';
setCC('pt');
// Bồ Đào Nha · Nhóm 3: Ẩm thực

// ----- Hải sản và cá -----
add(3, 'Hải sản và cá', 'pt-bacalhau', 'Bacalhau (cá tuyết muối phơi khô)', 'Salted dried cod', 'nguyên liệu nổi tiếng nhất của bếp Bồ Đào Nha, ngâm nước cho bớt mặn rồi nấu theo nhiều cách. Câu chuyện chi tiết ở cuối nhóm.',
  d => { d.dtri(3,3,10,11,'e'); d.r(4,3,8,2,'e'); d.p('W',5,5,6,7,8,6,9,9,7,10,10,6,8,12); d.p('a',8,3,8,4,8,5,8,7,8,8,8,10); d.p('t',3,3,12,3,7,13,8,13); d.p('n',8,0,8,1,8,2); d.p('w',4,4,11,5); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-bacalhau-bras', 'Bacalhau à Brás', 'Bacalhau a Bras', 'cá tuyết xé nhỏ xào cùng khoai tây sợi chiên, hành và trứng, rắc ô liu đen và ngò tây. Món này mềm, béo và rất phổ biến ở Lisboa.',
  d => { d.e(8,11,7,3.4,'w'); d.e(8,10,5,2.6,'y'); d.p('o',4,10,6,9,9,10,11,9,7,11); d.p('u',5,9,8,8,10,11,12,10); d.p('k',6,10,10,9,8,11); d.p('g',7,8,9,8,11,10,5,11); d.p('w',7,10); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-bacalhau-natas', 'Bacalhau com natas', 'Bacalhau with cream', 'cá tuyết nướng cùng khoai và sốt kem. Món thường có trên bàn ăn gia đình dịp cuối tuần.',
  d => { d.r(2,7,12,6,'N'); d.r(3,7,10,2,'u'); d.p('o',4,7,6,8,9,7,11,8); d.p('y',5,8,8,8,10,7); d.p('Y',7,7,12,7); d.p('n',1,8,1,9,14,8,14,9); d.p('w',6,4,5,3,6,2,10,4,11,3,10,2); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-sardinhas', 'Sardinhas assadas (cá mòi nướng)', 'Grilled sardines', 'cá mòi nướng than muối hạt to, ăn trên miếng bánh mì. Món này là đặc trưng của mùa hè, nhất là tháng sáu.',
  d => { d.r(1,11,14,2,'k'); for(let x=3;x<14;x+=3) d.p('a',x,13,x,14); for(const y of [4,8]){ d.e(7,y+.5,5,1.7,'a'); d.p('A',4,y+1,6,y+1,8,y+1,10,y+1); d.p('k',3,y); d.p('a',12,y,13,y-1,13,y+1); d.p('w',6,y-1,8,y-1); } d.p('o',3,15,7,15,11,15); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-polvo', 'Polvo à lagareiro (bạch tuộc nướng dầu ô liu)', 'Octopus a lagareiro', 'bạch tuộc luộc mềm rồi nướng với khoai tây và nhiều dầu ô liu, tỏi. Món này có mùi thơm đậm đà.',
  d => { d.e(8,11,7,3.6,'w'); d.e(8,8,3,2.6,'P'); d.l(6,10,3,12,'P'); d.l(7,10,6,13,'P'); d.l(9,10,10,13,'P'); d.l(10,10,13,12,'P'); d.p('w',7,7,9,7); d.p('k',7,8,9,8); d.p('y',3,10,4,10,12,10,13,10); d.p('g',2,11,11,13); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-arroz-marisco', 'Arroz de marisco', 'Seafood rice', 'cơm nấu với hải sản, nước hơi sệt và cà chua, ăn kèm rau mùi. Món này phổ biến ở vùng ven biển.',
  d => { d.fan(8,9,0,'k'); d.e(8,11,7,3.6,'N'); d.e(8,9,6,2.4,'o'); d.p('w',5,9,8,8,10,10); d.p('r',4,8,5,7,6,7,11,8,12,9); d.p('k',7,9,8,10,9,9); d.p('g',6,10,10,8,12,8); d.p('y',3,9,9,11); d.p('n',0,10,15,10); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-cataplana-marisco', 'Cataplana de marisco', 'Seafood cataplana', 'hải sản hầm trong nồi đồng cataplana với hành, cà chua và xúc xích. Đây là món đặc trưng của Algarve.',
  d => { d.fan(8,9,6,'O'); d.fan(8,7,4,'o'); d.e(8,11,6.5,3,'O'); d.e(8,10,5,2,'r'); d.p('k',5,10,6,9,9,10,10,9); d.p('w',7,10,11,10); d.p('p',4,10,8,11,12,10); d.p('g',6,11,10,11); d.r(7,2,2,1,'N'); }, { use: 'hold' });
add(3, 'Hải sản và cá', 'pt-caldeirada', 'Caldeirada', 'Fish stew', 'món hầm cá và hải sản nhiều lớp với khoai tây và cà chua. Người chài thường nấu bằng cá trong chuyến đánh bắt.',
  d => { d.r(3,7,10,7,'a'); d.e(8,7,5,2,'o'); d.p('w',5,6,6,7,10,6); d.p('a',6,6,7,5,8,6,11,7); d.p('y',4,7,9,7,12,6); d.p('r',7,7,10,8); d.p('A',2,8,1,9,2,10,13,8,14,9,13,10); d.p('l',6,3,7,2,6,1,10,3,9,2); }, { use: 'hold' });

// ----- Thịt và món hằng ngày -----
add(3, 'Thịt và món hằng ngày', 'pt-caldo-verde', 'Caldo verde', 'Caldo verde soup', 'súp khoai tây xay nhỏ nấu với cải xoong thái sợi và xúc xích chouriço. Món súp quen thuộc của miền bắc, được ăn cả trong đám cưới.',
  d => { d.e(8,11,6.5,4,'n'); d.e(8,8,6,2.4,'u'); d.p('G',4,8,5,7,7,9,8,7,9,8,11,7,12,8); d.p('g',6,8,10,9,7,7); d.e(10,8,1.4,1,'r'); d.p('w',10,8); d.p('N',4,13,11,13); d.p('w',6,4,5,3,6,2,10,3); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-cozido', 'Cozido à portuguesa', 'Portuguese boiled dinner', 'nồi thịt hầm, xúc xích, cải và củ ngày lễ. Món này là bữa ăn ấm áp trong gia đình.',
  d => { d.e(8,11,7,3.6,'w'); d.e(5,9,2.4,2,'g'); d.p('h',4,8,5,9); d.r(8,8,4,3,'m'); d.p('x',9,9,10,9); d.r(10,10,4,2,'r'); d.p('w',11,10,13,11); d.p('o',7,11,6,11,6,12); d.e(8,12,2,1,'y'); d.p('e',3,11,12,8); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-francesinha', 'Francesinha', 'Francesinha sandwich', 'bánh mì kẹp thịt, xúc xích, phủ phô mai nướng và chan sốt cà chua bia, thường có trứng ốp la. Người ta kể món này xuất hiện ở Porto vào giữa thế kỷ 20, lấy cảm hứng từ món bánh mì kẹp của Pháp.',
  d => { d.e(8,12,7,2.8,'w'); d.e(8,11,6,2,'o'); d.r(4,6,8,5,'n'); d.r(4,7,8,1,'r'); d.r(4,9,8,1,'m'); d.r(4,4,8,2,'y'); d.p('y',4,6,6,6,11,6,11,7); d.e(8,3.5,2.4,1.2,'w'); d.p('y',8,3); d.p('r',3,11,12,12); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-bifana', 'Bifana và prego', 'Bifana and prego rolls', 'bánh mì kẹp thịt heo hoặc thịt bò ướp tỏi, phổ biến ở quán ăn nhanh. Món này thường đi kèm bia.',
  d => { d.fan(8,8,6,'o'); d.r(2,8,12,2,'N'); d.p('r',3,8,6,9,9,8,12,9); d.r(2,10,12,1,'m'); d.r(2,11,12,3,'o'); d.p('y',5,3,8,4,10,3,4,6); d.p('O',2,13,13,13); d.p('u',6,12,10,12); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-leitao', 'Leitão assado (heo sữa quay)', 'Roast suckling pig', 'món heo con quay da giòn, nổi tiếng ở vùng Bairrada. Thịt được quay trên lò củi rất lâu.',
  d => { d.e(8,12,7,2.6,'w'); d.e(8,9,5.5,2.6,'O'); d.e(3.5,8,2,1.8,'O'); d.p('N',2,6,4,6); d.p('k',3,8); d.p('o',6,8,8,7,10,8); d.p('x',1,9,2,9); d.p('O',13,8,14,7,5,12,11,12); d.p('g',3,13,12,13,14,12); d.p('r',1,10); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-alheira', 'Alheira', 'Alheira sausage', 'xúc xích làm từ bánh mì và thịt gia cầm, xuất xứ từ Mirandela. Theo câu chuyện thường kể, những người Do Thái bị ép cuống đổi đạo đã làm ra nó để tránh bị nghi ngờ vì không ăn thịt heo; đây chỉ là giả thuyết phổ biến, chưa chắc đã chính xác.',
  d => { d.e(8,12,7,2.6,'w'); d.fan(8,11,5.5,'O'); d.fan(8,11,3,'_'); d.r(2,10,3,2,'O'); d.r(11,10,3,2,'O'); d.p('N',2,12,13,12,4,7,11,7); d.p('o',5,6,7,5,9,5,12,8); d.p('y',7,10,8,10,9,10); d.p('w',8,9); d.p('g',6,12,10,12); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-presunto', 'Presunto (giăm bông muối)', 'Cured ham', 'thịt heo ép muối phơi khô, thái mỏng ăn nguội. Alentejo nổi tiếng với loại heo đen.',
  d => { d.e(7,8,5,4,'m'); d.e(7,8,3,2.4,'r'); d.p('w',5,7,6,9,8,8,9,10,7,6); d.r(11,4,2,3,'e'); d.p('w',13,2,14,3,13,3,12,2); d.p('N',2,6,3,5,4,4,6,4); d.p('R',3,12,5,13,7,13,9,12); d.r(1,14,14,1,'n'); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-tripas', 'Tripas à moda do Porto', 'Porto-style tripe stew', 'món dạ dày bò hầm với đậu trắng, món gắn với biệt danh "tripeiros" của người Porto. Câu chuyện biệt danh được kể ở Nhóm 5.',
  d => { d.e(8,11,6.5,3.8,'N'); d.e(8,8,6,2.4,'o'); for(const [x,y] of [[4,8],[7,7],[10,8],[8,9],[12,7]]) d.p('w',x,y,x+1,y); d.p('e',5,7,6,9,11,9); d.p('r',9,7,3,9); d.p('g',6,8,10,6); d.p('n',1,9,15,9); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-migas', 'Migas và açorda', 'Migas and acorda', 'hai món từ bánh mì cũ ở Alentejo, nấu với tỏi, dầu ô liu và rau mùi. Chúng cho thấy cách người nghèo không phí thức ăn.',
  d => { d.e(8,11,7,3.6,'a'); d.e(8,9,5.5,2.6,'t'); d.p('n',4,9,6,8,9,10,11,9,8,8); d.p('u',5,10,7,9,10,8,12,10); d.p('g',6,10,9,9,11,8); d.p('w',5,8,10,10); d.p('y',8,6,7,7,9,7); d.p('w',8,5); }, { use: 'hold' });
add(3, 'Thịt và món hằng ngày', 'pt-pasteis-bacalhau', 'Pastel de bacalhau và risóis', 'Cod cakes and risois', 'bánh nhỏ chiên nhân cá tuyết hoặc tôm. Những món này thường được ăn nhẹ với bia.',
  d => { d.e(8,12,7,2.6,'w'); for(const [x,y] of [[4,9],[9,8]]){ d.e(x+.5,y+.5,2.6,2,'o'); d.p('O',x-1,y,x+1,y+1,x,y-1); } d.fan(11,13,3.4,'y'); d.p('o',8,12,10,10,12,10,14,12); d.p('g',2,11,6,12); }, { use: 'hold' });

// ----- Bánh ngọt và tráng miệng -----
add(3, 'Bánh ngọt và tráng miệng', 'pt-pastel-nata', 'Pastel de nata', 'Pastel de nata', 'bánh trứng nướng vỏ giòn nhiều lớp, nhân kem trứng, thường rắc thêm bột quế. Bánh này nổi tiếng với tiệm Pastéis de Belém ở Lisboa.',
  d => { d.e(8,11,6.5,3,'O'); d.r(2,8,12,3,'o'); d.e(8,8,6,2.6,'t'); d.e(8,8,4.6,1.8,'y'); d.p('N',6,7,7,8,9,8,10,7,8,9,5,8,11,8); for(let x=3;x<14;x+=2) d.p('O',x,10,x,11); d.p('w',7,3,8,2,7,1); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-ovos-moles', 'Ovos moles de Aveiro', 'Ovos moles de Aveiro', 'nhân lòng đỏ trứng ngọt được cho vào vỏ bánh mỏng hình vỏ sò hay hải sản. Bánh được bảo hộ chỉ dẫn địa lý của châu Âu.',
  d => { d.e(8,11,7,3.4,'b'); d.e(5,8,2.6,2,'w'); d.p('y',4,8,5,9,6,8); d.e(10.5,7,3,2,'w'); d.p('a',9,6,11,7,12,6); d.dtri(6,10,5,4,'w'); d.p('y',8,11,8,12); d.p('c',2,12,13,12,12,13); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-arroz-doce', 'Arroz doce', 'Sweet rice', 'cơm ngọt nấu sữa, rắc bột quế theo hình dạng những đường kẻ. Đây là món tráng miệng gia đình trong dịp lễ.',
  d => { d.e(8,11,7,3.6,'b'); d.e(8,8,6.4,3,'u'); d.p('n',4,7,5,8,6,7,7,8,8,7,9,8,10,7,11,8,12,7); d.p('n',5,10,7,9,9,10,11,9); d.p('w',3,9,13,9); d.p('c',3,12,7,13,11,12); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-pao-de-lo', 'Pão de ló', 'Sponge cake', 'bánh bông lan mềm và ẩm ướt, nhiều trứng. Mỗi vùng có một phiên bản riêng.',
  d => { d.e(8,10,6.5,4,'o'); d.r(2,7,12,4,'o'); d.e(8,7,6,2.6,'y'); d.p('O',5,6,8,7,11,6,7,8,9,5); d.p('O',3,11,13,11); d.r(1,13,14,2,'e'); d.p('W',2,12,13,12); d.p('u',6,6,10,8); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-queijadas', 'Queijadas de Sintra và travesseiros', 'Queijadas and travesseiros', 'queijadas là bánh nhỏ nhân phô mai tươi, còn travesseiros là bánh hình gối nhân hạnh nhân ở Sintra. Hai món này là quà gắn với chuyến đi Sintra.',
  d => { d.e(5,9,3.6,3,'O'); d.e(5,8,2.6,1.8,'y'); d.p('N',4,8,6,7); d.r(9,6,6,6,'o'); d.p('w',10,7,12,8,13,6,11,10,14,10); d.p('O',9,6,14,6,9,11,14,11); d.r(1,13,14,2,'w'); d.p('b',3,14,8,14,13,14); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-toucinho-ceu', 'Toucinho do céu', 'Toucinho do ceu', 'bánh hạnh nhân và trứng rất ngọt, được cho là có gốc từ tu viện. Tên gọi nghĩa là "mỡ heo của thiên đường".',
  d => { d.tri(3,5,11,8,'y'); d.r(3,10,11,3,'Y'); d.p('w',8,5,7,6,9,6,6,8,10,8,8,7); d.p('t',5,9,7,11,10,10,12,12); d.r(1,13,14,2,'w'); d.p('c',3,1,4,2,12,1,13,2,8,2); d.p('o',4,12,9,12); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-bola-berlim', 'Bolo de arroz và bola de Berlim', 'Bolo de arroz and bola de Berlim', 'bánh bông lan bột gạo và bánh rán nhân kem trứng ăn ở bãi biển. Người bán dạo thường rao bán ngoài bãi cát.',
  d => { d.e(10,9,4.6,4,'o'); d.r(6,8,9,2,'y'); d.p('w',8,6,10,5,12,6,11,7); d.r(2,8,4,5,'w'); d.e(4,7,2.4,2,'u'); d.p('b',3,9,3,11,5,10,5,12); d.p('w',3,6); d.r(1,14,14,1,'a'); }, { use: 'hold' });
add(3, 'Bánh ngọt và tráng miệng', 'pt-pastel-tentugal', 'Pastel de Tentúgal', 'Pastel de Tentugal', 'bánh cuốn vỏ mỏng như giấy, nhân kem trứng đặc ở thị trấn Tentúgal. Nghề làm vỏ rất tỉ mỉ.',
  d => { d.r(2,7,12,5,'y'); d.p('o',2,7,3,8,4,9,5,10,13,7,12,8,11,9); d.l(3,11,13,7,'u'); d.l(2,9,10,7,'w'); d.p('w',2,6,5,6,9,6,13,6,4,5,11,5); d.p('Y',8,10,12,10,7,11); d.r(1,13,14,2,'e'); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'pt-porto-wine', 'Rượu vang Porto (Vinho do Porto)', 'Port wine', 'rượu vang ngọt được thêm cồn nho để dừng lên men, ủ trong hầm ở Vila Nova de Gaia bên bờ sông Douro. Có nhiều loại như ruby, tawny và white.',
  d => { d.r(3,6,5,9,'m'); d.r(4,2,3,4,'m'); d.r(4,1,3,1,'N'); d.r(3,8,5,3,'e'); d.p('r',4,9,6,9); d.r(10,8,4,3,'l'); d.r(10,9,4,2,'R'); d.r(11,11,2,3,'l'); d.r(10,14,4,1,'l'); d.p('w',4,7,10,8); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-vinho-verde', 'Vinho verde', 'Vinho verde', 'rượu vang trẻ, nhẹ và hơi sủi bọt, đặc trưng của miền bắc. Tên "verde" chỉ độ trẻ của rượu chứ không phải màu xanh.',
  d => { d.r(3,6,5,9,'g'); d.r(4,1,3,5,'g'); d.r(4,0,3,1,'y'); d.r(3,9,5,3,'w'); d.p('G',4,10,6,10); d.r(10,6,4,4,'l'); d.r(10,8,4,2,'u'); d.r(11,10,2,4,'l'); d.r(10,14,4,1,'l'); d.p('w',11,7,13,5,12,3,4,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-madeira-wine', 'Rượu vang Madeira', 'Madeira wine', 'rượu vang được làm chín trong điều kiện ấm, chịu được lâu và có vị hạnh nhân, caramen. Người ta kể những chuyến tàu dài ngày đã làm loại rượu này ngon hơn.',
  d => { d.e(5,11,3.5,3.6,'N'); d.r(4,3,3,5,'N'); d.r(4,2,3,1,'y'); d.r(3,10,5,2,'e'); d.p('R',4,10,6,11); d.fan(12,9,2.6,'_'); d.dtri(9,6,6,5,'o'); d.r(11,10,2,4,'l'); d.r(10,14,4,1,'l'); d.p('y',10,7,13,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-regional-wines', 'Rượu vang Alentejo, Dão và Douro', 'Alentejo, Dao and Douro wines', 'nhiều vùng sản xuất rượu vang đỏ đậm đà, vang trắng thơm. Vang Bồ Đào Nha ngày càng được biết đến nhiều hơn.',
  d => { for(const [x,c] of [[1,'m'],[6,'e'],[11,'R']]){ d.r(x,6,4,9,c); d.r(x+1,2,2,4,c); d.p('y',x+1,1,x+2,1); d.r(x,9,4,3,'w'); d.p('v',x+1,10,x+2,10); } d.p('w',2,7,7,7,12,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-ginjinha', 'Ginjinha (ginja)', 'Ginjinha cherry liqueur', 'rượu ngọt anh đào chua ngâm cồn, uống ly nhỏ ở quán bé xinh ở Lisboa và Óbidos. Một số nơi bán trong ly sô-cô-la ăn được.',
  d => { d.dtri(3,6,10,8,'N'); d.r(5,6,6,4,'N'); d.r(4,6,8,2,'n'); d.r(5,6,6,1,'m'); d.e(11,3,1.8,1.8,'r'); d.e(7,6,1.6,1.4,'R'); d.p('g',11,1,12,0,13,0); d.p('w',10,2); d.r(5,14,6,1,'k'); d.p('t',6,9,9,10); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-medronho', 'Aguardente và medronho', 'Aguardente and medronho', 'rượu mạnh chưng từ nho hoặc quả dâu rừng, thường uống vào mùa lạnh. Medronho đặc trưng cho nông thôn Algarve.',
  d => { d.r(3,6,6,9,'l'); d.r(5,3,2,3,'l'); d.r(5,2,2,1,'n'); d.r(4,10,4,4,'w'); d.r(4,9,4,2,'c'); d.e(11,10,2,2,'r'); d.e(13,13,1.8,1.8,'o'); d.p('g',11,7,12,7,13,8,10,7,14,11); d.p('y',10,9,13,12); d.p('w',4,7); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-coffee', 'Bica, galão và meia de leite', 'Bica, galao and meia de leite', 'cà phê espresso nhỏ (bica ở Lisboa), cà phê sữa ly cao (galão) và cà phê nửa sữa. Người Bồ Đào Nha có thói quen uống cà phê nhiều lần trong ngày.',
  d => { d.r(2,9,5,5,'w'); d.r(2,9,5,1,'N'); d.p('w',7,10,8,11,7,12); d.r(10,4,4,10,'l'); d.r(10,7,4,6,'n'); d.r(10,6,4,1,'e'); d.p('a',3,6,4,5,3,4,11,2,12,1); d.r(1,14,7,1,'a'); d.r(9,14,6,1,'a'); }, { use: 'hold' });
add(3, 'Đồ uống', 'pt-beer', 'Bia Sagres và Super Bock', 'Sagres and Super Bock beer', 'hai thương hiệu bia phổ biến nhất, uống lạnh vào mùa hè. Người dân thường gọi một ly nhỏ là "imperial" ở Lisboa.',
  d => { for(const [x,c] of [[2,'G'],[9,'N']]){ d.r(x,6,4,9,c); d.r(x+1,2,2,4,c); d.p('y',x+1,1,x+2,1); d.r(x,8,4,4,'w'); d.p('r',x+1,9,x+2,9,x+1,10,x+2,10); } d.p('w',3,7,10,7); d.p('u',7,13,8,12); }, { use: 'hold' });

// ----- Món lễ và theo mùa -----
add(3, 'Món lễ và theo mùa', 'pt-consoada', 'Đêm Giáng sinh (Consoada)', 'Christmas Eve supper', 'bữa tối đêm 24 tháng 12 với cá tuyết luộc, bắp cải và khoai tây. Sau đó là các món ngọt như rabanadas và filhós.',
  d => { d.e(8,12,7,3,'w'); d.r(3,9,5,3,'e'); d.p('a',4,9,5,10,6,11); d.e(10,10,2.4,1.8,'g'); d.e(12,12,1.8,1.4,'y'); d.r(13,3,1,5,'r'); d.p('y',13,2); d.p('o',13,1); d.p('G',2,4,3,3,4,4,3,5,2,6,4,6,3,2); d.p('r',3,4,4,5); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-bolo-rei', 'Bolo-rei (bánh Vua)', 'Bolo-rei king cake', 'bánh vòng điểm nho khô và trái cây kết tinh, ăn từ Giáng sinh đến đầu tháng Một. Bên trong thường có một hạt đậu nhỏ gọi là fava.',
  d => { d.e(8,10,7,4.6,'o'); d.e(8,9,2.6,1.6,'_'); for(const [x,y,c] of [[3,9,'r'],[5,7,'g'],[8,6,'y'],[11,7,'r'],[13,9,'g'],[11,12,'y'],[7,13,'r'],[4,11,'v']]) d.p(c,x,y,x+1,y); d.p('w',4,8,10,6,12,10,9,13,6,12); d.p('O',2,11,14,11); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-santos-food', 'Santos Populares (tháng Sáu)', 'Santos Populares June food', 'lễ hội phố phường với cá mòi nướng, súp caldo verde và rượu vang. Phố xá được trang trí ruy băng và chậu manjerico.',
  d => { d.r(1,11,14,2,'o'); d.e(7,10,5,1.6,'a'); d.p('k',3,9); d.p('a',12,9,13,8,13,10); d.r(2,3,1,6,'G'); d.e(2.5,3,2,1.8,'g'); d.p('r',8,2,9,3,10,2,11,3,12,2); d.p('y',13,3,14,2); d.p('N',5,12,9,12); d.r(1,13,14,1,'N'); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-folar', 'Folar (Lễ Phục Sinh)', 'Easter folar bread', 'bánh mì ngọt hoặc mặn có trứng luộc nguyên vỏ, tặng bạn bè vào dịp lễ. Mỗi vùng có một công thức khác nhau.',
  d => { d.e(8,10,7,4.6,'O'); d.e(8,9,5.5,3.2,'o'); d.e(8,8,2.2,2.6,'e'); d.p('O',5,7,6,8,10,8,11,7,8,11,7,5,9,5); d.p('N',3,12,13,12); d.p('w',7,7); d.p('n',8,6,8,10,6,8,10,8); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-magusto', 'Mùa lễ São Martinho (11 tháng 11)', 'Saint Martin chestnuts', 'nhà nhà nướng hạt dẻ và uống água-pé, một thức uống nhẹ làm từ bã nho, cùng rượu mới. Người dân mở những thùng rượu mới ủ.',
  d => { for(const [x,y] of [[3,9],[8,10],[6,6]]){ d.e(x+.5,y+.5,2.6,2.4,'N'); d.p('t',x-1,y+2,x,y+2,x+1,y+2); d.p('n',x-1,y-1); } d.r(11,6,4,6,'l'); d.r(11,8,4,4,'R'); d.p('o',3,15,5,14,7,15,9,14); d.p('y',4,14,8,15); d.p('r',6,15); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-espetada', 'Espetada ở Madeira', 'Madeira beef skewer', 'thịt bò xiên que được nướng trên than, ăn kèm bánh mì bolo do caco. Món này xuất hiện nhiều trong các dịp lễ ở đảo.',
  d => { d.l(2,14,13,2,'n'); for(const [x,y] of [[5,10],[7,8],[9,6]]){ d.e(x+.5,y+.5,1.8,1.8,'m'); d.p('N',x,y+1); } d.p('G',11,4,12,5,4,11); d.e(12,12,2.6,2,'o'); d.p('w',11,11,13,12); d.p('o',2,6,3,4); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-malasadas', 'Malasadas và Carnaval', 'Malasadas for Carnival', 'bánh rán rắc đường, phổ biến nhất ở Madeira và Azores vào dịp Carnaval. Những chiếc bánh nóng được ăn ngay khi mới chiên.',
  d => { d.e(8,12,7,2.6,'a'); for(const [x,y] of [[4,9],[10,9],[7,6]]){ d.e(x+.5,y+.5,2.8,2.4,'o'); d.p('w',x-1,y-1,x+1,y,x,y+1); } d.p('r',1,2,2,3,13,1,14,3); d.p('y',3,1,12,4); d.p('b',5,2,10,2); d.p('p',2,5,14,6); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'pt-cozido-furnas', 'Cozido das Furnas (Azores)', 'Furnas volcanic stew', 'thịt và rau nấu bằng hơi nóng từ núi lửa trong nồi chôn dưới đất. Món này phải đợi khoảng nhiều giờ mới chín.',
  d => { d.bg('a'); d.r(0,8,16,8,'n'); d.e(8,12,4.5,3,'N'); d.r(5,9,6,3,'a'); d.r(4,8,8,1,'A'); d.p('k',7,7,8,7); for(const [x,y] of [[2,7],[3,5],[2,3],[13,7],[12,5],[13,3],[8,4],[7,2]]) d.p('w',x,y); d.p('o',2,14,13,13); d.p('g',0,8,1,7,15,8); }, SC);
