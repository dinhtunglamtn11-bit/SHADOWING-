import { add, SC, setCC } from './pass-kit.js';
setCC('ru');
// Nga · Nhóm 3: Ẩm thực

// ----- Súp và món nóng -----
add(3, 'Súp và món nóng', 'ru-borscht', 'Borscht', 'Borscht', 'súp củ cải đường đỏ nấu cùng bắp cải, cà rốt, khoai tây và thịt, ăn kèm kem chua (smetana). Món này cũng có ở Ukraine và Ba Lan, nhưng với người Nga nó là món ăn gia đình quen thuộc.',
  d => { d.e(8,11,7,3.5,'w'); d.e(8,9,5.8,3,'R'); d.e(8,9,2,1.2,'w'); d.p('G',8,8,9,9); d.p('r',5,9,11,10,6,10,10,8); d.p('o',4,10,12,9); d.p('a',5,5,6,3,10,4,11,2); d.p('b',3,12,13,12); }, { use: 'hold' });
add(3, 'Súp và món nóng', 'ru-shchi', 'Shchi', 'Shchi cabbage soup', 'súp bắp cải, món cổ nhất và giản dị nhất của bàn ăn Nga. Có thể nấu với bắp cải tươi hoặc dưa bắp cải chua.',
  d => { d.e(8,11,7,3.5,'n'); d.e(8,9,5.8,3,'u'); d.p('h',5,8,6,9,10,8,11,9,8,10,7,8); d.p('g',9,9,5,10); d.p('o',7,10,11,10); d.p('w',8,8); d.p('a',5,5,6,3,10,4,11,2); }, { use: 'hold' });
add(3, 'Súp và món nóng', 'ru-solyanka', 'Solyanka', 'Solyanka', 'súp đậm vị chua mặn, nấu với nhiều loại thịt nguội, dưa chuột muối, ô liu và chanh. Đây là món hay gặp trong nhà hàng.',
  d => { d.e(8,11,7,3.5,'a'); d.e(8,9,5.8,3,'o'); d.e(6,8,1.6,1.2,'y'); d.p('k',9,8,11,9,8,10); d.p('r',5,10,10,10,7,9); d.p('g',9,10,12,10); d.p('w',6,8,8,8); d.p('a',5,5,6,3,10,4,11,2); }, { use: 'hold' });
add(3, 'Súp và món nóng', 'ru-ukha', 'Ukha', 'Ukha fish soup', 'súp cá trong, nấu với cá nước ngọt như cá tầm, cá chó và hành, đôi khi thêm một chút vodka. Món này gắn với những chuyến câu cá bên sông.',
  d => { d.e(8,11,7,3.5,'K'); d.e(8,9,5.8,3,'u'); d.e(7,9,2.5,1.2,'a'); d.p('a',10,8,11,9,10,10); d.p('k',5,9); d.p('o',11,10,5,10); d.p('g',9,8,4,9,8,11); d.p('a',5,5,6,3,10,4,11,2); }, { use: 'hold' });
add(3, 'Súp và món nóng', 'ru-okroshka', 'Okroshka', 'Okroshka cold soup', 'súp lạnh mùa hè với rau củ thái nhỏ, trứng, dưa chuột và thịt, chan kvass hoặc sữa chua. Món này giải nhiệt rất hợp với mùa nóng ngắn của Nga.',
  d => { d.e(8,11,7,3.5,'c'); d.e(8,9,5.8,3,'w'); for(const [x,y,c] of [[5,9,'g'],[7,8,'y'],[9,10,'r'],[11,9,'G'],[6,10,'p'],[10,8,'g'],[8,9,'y']]) d.p(c,x,y); d.l(12,2,10,7,'a'); d.p('c',3,4,4,5,13,5); }, { use: 'hold' });
add(3, 'Súp và món nóng', 'ru-golubtsy', 'Golubtsy', 'Golubtsy cabbage rolls', 'bắp cải cuốn thịt và gạo, nấu trong nước sốt cà chua. Món này cũng thường thấy trong bữa tiệc gia đình.',
  d => { d.e(8,11,7.5,3.5,'w'); d.e(8,10,6,2.5,'r'); for(const [x,y] of [[5,8],[11,8],[8,10]]){ d.e(x+.5,y+.5,3,2,'h'); d.l(x-1,y,x+2,y,'g'); d.p('G',x,y+1); } d.p('w',7,11); }, { use: 'hold' });
add(3, 'Súp và món nóng', 'ru-stroganoff', 'Beef Stroganoff', 'Beef Stroganoff', 'thịt bò thái mỏng nấu trong sốt kem chua và nấm, ăn với khoai tây hoặc mì. Tên món gắn với họ Stroganov, một dòng họ quý tộc Nga, dù nguồn gốc chính xác còn tranh cãi.',
  d => { d.e(8,11,7.5,3.5,'b'); d.e(8,10,6,2.8,'w'); d.e(9,9,4,2.5,'t'); d.p('n',7,8,8,9,10,8,11,9,9,10); d.p('O',8,8,10,10); d.p('y',4,9,5,10,3,10,5,8); d.p('G',9,7); d.p('a',5,4,6,2,11,4); }, { use: 'hold' });

// ----- Bánh bột và món cuốn nhân -----
add(3, 'Bánh bột và món cuốn nhân', 'ru-pelmeni', 'Pelmeni', 'Pelmeni', 'bánh bao nhỏ luộc nhân thịt, ăn với kem chua hoặc giấm. Món này đặc biệt gắn với vùng Ural và Siberia, nơi nhiều gia đình làm sẵn rồi để đông lạnh ngoài trời suốt mùa đông.',
  d => { d.e(8,12,7.5,3,'b'); for(const [x,y] of [[4,9],[8,8],[11,10],[7,11]]){ d.e(x+.5,y+.5,2.4,2,'e'); d.p('t',x,y,x-1,y+1,x+1,y+1); } d.e(12,6,1.8,1.4,'w'); d.p('G',12,5); d.p('a',3,5,4,3,8,4); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-vareniki', 'Vareniki', 'Vareniki', 'bánh luộc nhân khoai tây, phô mai tươi hoặc anh đào chua, phổ biến ở miền nam Nga và Ukraine. Có cả loại mặn và ngọt.',
  d => { d.e(8,12,7.5,3,'w'); for(const [x,y] of [[4,9],[9,8],[9,12]]){ d.fan(x+.5,y+1,3,'u'); d.p('Y',x-2,y+1,x,y-2,x+2,y+1,x-1,y-1,x+1,y-1); } d.e(13,7,1.8,1.8,'m'); d.p('r',3,12,4,13); d.p('G',14,4); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-blini', 'Blini', 'Blini', 'bánh kếp mỏng ăn với kem chua, bơ, mật ong hoặc trứng cá muối. Đây là món không thể thiếu trong tuần lễ Maslenitsa (xem Nhóm 4).',
  d => { d.e(8,13,7,2,'b'); for(const y of [11,9,7]) { d.e(8,y,5.5,1.6,'O'); d.e(8,y-.6,5,1.1,'y'); } d.e(8,5,2.4,1.4,'w'); d.p('r',7,5,9,4); d.p('R',5,6,11,6); d.p('k',13,12,14,11); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-syrniki', 'Syrniki', 'Syrniki cheese pancakes', 'bánh nhỏ chiên làm từ phô mai tươi (tvorog), ăn sáng với kem chua hoặc mứt. Vị hơi chua nhẹ và béo.',
  d => { d.e(8,12,7.5,3,'a'); for(const [x,y] of [[5,9],[11,9],[8,12]]){ d.e(x+.5,y+.5,3,2.2,'O'); d.e(x+.5,y,2.2,1.5,'y'); } d.e(8,7,2,1.5,'w'); d.p('r',8,6,4,12); d.p('R',12,12); d.p('G',9,5); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-pirozhki', 'Pirozhki', 'Pirozhki', 'bánh nướng hoặc chiên nhỏ nhân thịt, bắp cải, khoai tây hoặc táo. Món ăn nhanh quen thuộc ở nhà ga và quán bên đường.',
  d => { for(const [x,y] of [[5,6],[11,8],[6,11]]){ d.e(x+.5,y+.5,4,2.6,'O'); d.e(x+.5,y,3,1.6,'o'); d.p('y',x-1,y-1,x,y-1); d.p('N',x+1,y,x+2,y+1); } d.r(1,15,14,1,'a'); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-kulebyaka', 'Kulebyaka', 'Kulebyaka', 'bánh nướng lớn nhân cá hoặc thịt, nhiều lớp. Món này thường xuất hiện trong dịp lễ lớn.',
  d => { d.e(8,10,7.5,4.5,'O'); d.e(8,9,6.5,3.5,'o'); d.l(3,8,13,8,'y'); for(let x=4;x<13;x+=3){ d.l(x,6,x+2,11,'y'); } d.p('t',6,13,10,13); d.p('G',8,5,7,4,9,4); d.r(1,15,14,1,'n'); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-manty', 'Manty', 'Manty', 'bánh hấp lớn nhân thịt cừu, phổ biến ở vùng Trung Á và miền nam Nga. Một số vùng người Tatar và Bashkir cũng ăn món này.',
  d => { d.e(8,12,7.5,3,'t'); for(const [x,y] of [[5,9],[11,9],[8,11]]){ d.e(x+.5,y+.5,2.8,2.4,'e'); d.p('t',x,y-1,x-1,y,x+1,y); d.p('n',x,y-2); } d.p('a',3,5,4,3,8,6,9,4,13,5,12,3); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-buuz', 'Buuz của người Buryat', 'Buryat buuz dumplings', 'bánh bao hấp nhân thịt, có lỗ nhỏ ở đỉnh, thường ăn trong dịp Tết Âm lịch của người Mông Cổ. Nước thịt bên trong rất nóng và đậm vị.',
  d => { d.e(8,12,7.5,3,'n'); for(const [x,y] of [[5,9],[11,9],[8,12]]){ d.e(x+.5,y,2.8,2.4,'u'); d.p('n',x,y-1); d.p('Y',x-1,y,x+1,y,x,y-2); } d.p('a',5,5,6,3,5,2,11,5,10,3,11,2); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-chakchak', 'Chak-chak của người Tatar', 'Tatar chak-chak', 'món ngọt làm từ sợi bột chiên giòn trộn mật ong. Món này thường đãi khách trong ngày cưới.',
  d => { d.e(8,13,7.5,2.2,'w'); d.tri(2,2,12,11,'O'); for(const [x,y] of [[8,3],[7,5],[9,5],[6,7],[8,7],[10,7],[5,9],[7,9],[9,9],[11,9],[4,11],[6,11],[8,11],[10,11],[12,11]]) d.p('y',x,y); d.p('r',8,2,5,11,11,6); }, { use: 'hold' });
add(3, 'Bánh bột và món cuốn nhân', 'ru-echpochmak', 'Echpochmak', 'Echpochmak', 'bánh tam giác nhân thịt và khoai tây của người Tatar. Hình dạng ba góc là nét nhận biết đặc trưng.',
  d => { d.tri(1,2,14,12,'O'); d.tri(3,5,10,8,'o'); d.l(8,3,8,9,'y'); d.l(8,9,3,12,'y'); d.l(8,9,13,12,'y'); d.e(8,9,1.4,1.4,'n'); d.r(1,15,14,1,'a'); }, { use: 'hold' });

// ----- Salad và đồ muối -----
add(3, 'Salad và đồ muối', 'ru-olivier', 'Salad Olivier', 'Olivier salad', 'salad khoai tây, cà rốt, trứng, dưa chuột muối, đậu Hà Lan và xúc xích hoặc thịt, trộn mayonnaise. Đây là món bắt buộc trong tiệc đón năm mới và câu chuyện ở cuối nhóm.',
  d => { d.e(8,12,7,3.5,'b'); d.e(8,8,5.5,4,'e'); for(const [x,y,c] of [[5,8,'o'],[7,6,'g'],[10,7,'p'],[9,9,'g'],[6,10,'y'],[11,9,'o'],[8,8,'G']]) d.p(c,x,y); d.p('G',8,3,7,4,9,4); d.p('w',5,12,11,12); }, { use: 'hold' });
add(3, 'Salad và đồ muối', 'ru-shuba-salad', 'Selyodka pod shuboy', 'Herring under a fur coat', 'cá trích muối xếp lớp cùng khoai tây, cà rốt, trứng và củ cải đường đỏ rồi phủ mayonnaise. Tên gọi nghĩa đen là "cá trích dưới áo lông".',
  d => { d.r(2,6,12,2,'R'); d.r(2,8,12,2,'e'); d.r(2,10,12,2,'o'); d.r(2,12,12,1,'t'); d.r(2,13,12,1,'a'); d.e(8,6,6,1.6,'P'); d.p('w',5,5,9,6,12,5); d.p('G',8,4,9,3); d.r(1,14,14,1,'w'); }, { use: 'hold' });
add(3, 'Salad và đồ muối', 'ru-vinegret', 'Vinegret', 'Vinegret salad', 'salad củ cải đường, khoai tây, cà rốt và dưa bắp cải, trộn dầu thực vật. Món này không có mayonnaise và có màu đỏ tím nổi bật.',
  d => { d.e(8,12,7,3.5,'a'); d.e(8,9,5.5,3.5,'P'); for(const [x,y,c] of [[5,8,'R'],[7,7,'o'],[10,8,'m'],[9,10,'g'],[6,10,'e'],[11,9,'R'],[8,9,'o']]) d.p(c,x,y); d.p('G',8,5,9,4); }, { use: 'hold' });
add(3, 'Salad và đồ muối', 'ru-kholodets', 'Kholodets', 'Kholodets meat jelly', 'thịt đông, làm từ chân giò hầm kỹ rồi để nguội, ăn kèm mù tạt hoặc cải ngựa. Món này thường có trong bàn tiệc mùa đông.',
  d => { d.r(2,6,12,7,'t'); d.r(2,6,12,2,'u'); d.p('n',4,9,5,10,9,11,11,9); d.p('o',7,9,10,10); d.p('G',6,11,12,11); d.p('w',3,7,3,8,3,9,4,7); d.r(1,13,14,2,'a'); d.e(12,3,2,1.5,'w'); d.p('G',12,2); }, { use: 'hold' });
add(3, 'Salad và đồ muối', 'ru-pickles', 'Dưa chuột muối và dưa bắp cải', 'Pickled cucumbers and sauerkraut', 'những món muối chua giúp bảo quản rau qua mùa đông dài. Chúng thường đi cùng thịt và món khoai tây.',
  d => { d.r(3,3,9,11,'l'); d.r(3,1,9,2,'n'); for(const x of [5,8,10]){ d.r(x,5,1,8,'g'); d.p('G',x,6,x,9,x,12); } d.p('t',4,13,6,13,9,13); d.p('w',4,5,4,10); d.p('y',7,4,6,8); d.e(14,13,2,1.5,'h'); }, { use: 'hold' });
add(3, 'Salad và đồ muối', 'ru-caviar', 'Trứng cá muối (ikra)', 'Caviar (ikra)', 'trứng cá hồi đỏ hoặc trứng cá tầm đen, ăn trên bánh mì hoặc blini. Ở Viễn Đông, trứng cá đỏ rất phổ biến, còn trứng cá tầm đen là món cao cấp.',
  d => { d.e(8,11,7,3.5,'t'); d.e(8,9,5.5,3,'u'); for(const [x,y] of [[5,8],[7,8],[9,8],[6,9],[8,9],[10,9],[7,10],[9,10]]){ d.p('r',x,y); } d.p('o',8,7,6,7,10,7); d.e(12,4,2.5,2,'k'); d.p('a',11,3,13,4); d.p('G',4,6); }, { use: 'hold' });
add(3, 'Salad và đồ muối', 'ru-driedfish', 'Cá khô và cá hun khói (vobla, omul)', 'Dried and smoked fish (vobla, omul)', 'vobla là cá khô ăn kèm bia, còn omul là cá hồi trắng của hồ Baikal, thường hun khói. Hai món này gắn với bờ sông và hồ.',
  d => { for(const [y,c] of [[4,'O'],[9,'n'],[13,'t']]){ d.e(7,y+.5,5.5,1.8,c); d.tri(11,y-2,5,3,c); d.p(c,13,y+1,14,y+2); d.p('k',3,y); d.p('N',6,y,8,y+1,10,y); } }, { use: 'hold' });

// ----- Ngũ cốc và món theo vùng -----
add(3, 'Ngũ cốc và món theo vùng', 'ru-kasha', 'Kasha', 'Kasha porridge', 'cháo ngũ cốc nấu với sữa hoặc nước, làm từ kiều mạch, bột yến mạch hoặc bột báng. Đây là bữa sáng truyền thống và cũng là món ăn kèm.',
  d => { d.e(8,11,7,3.5,'O'); d.e(8,9,5.8,3,'t'); for(const [x,y] of [[5,8],[7,9],[9,8],[11,9],[8,10],[6,10]]) d.p('n',x,y); d.e(8,8,1.8,1.2,'y'); d.l(13,2,10,7,'n'); d.p('a',4,5,5,3); }, { use: 'hold' });
add(3, 'Ngũ cốc và món theo vùng', 'ru-grechka', 'Kiều mạch (grechka)', 'Buckwheat (grechka)', 'hạt kiều mạch nấu chín, ăn như cơm với thịt hoặc nấm. Người Nga ăn rất nhiều món này.',
  d => { d.e(8,12,7,3,'w'); d.e(8,9,5.5,3.5,'n'); for(const [x,y] of [[5,8],[7,7],[9,7],[11,8],[6,9],[8,9],[10,9],[8,6],[7,11],[9,10]]) d.p('N',x,y); d.p('t',6,8,10,8,8,8); d.p('G',12,5,13,4,12,4); }, { use: 'hold' });
add(3, 'Ngũ cốc và món theo vùng', 'ru-shashlik', 'Shashlik', 'Shashlik', 'thịt xiên nướng ướp hành và giấm, du nhập từ vùng Kavkaz. Hiện đây là món nướng chủ đạo trong chuyến đi picnic ở dacha.',
  d => { d.l(1,14,14,1,'a'); d.l(4,15,15,4,'a'); for(const [x,y] of [[4,10],[7,7],[10,4],[8,11],[11,8]]){ d.e(x+.5,y+.5,2,2,'n'); d.p('N',x,y+1); d.p('O',x-1,y); } d.p('r',6,9,10,6); d.p('w',9,5); d.p('G',12,3,3,12); }, { use: 'hold' });
add(3, 'Ngũ cốc và món theo vùng', 'ru-plov', 'Plov', 'Plov', 'cơm nấu với thịt và cà rốt, ảnh hưởng từ Trung Á. Món này phổ biến ở nhiều thành phố Nga.',
  d => { d.e(8,11,7.5,3.5,'k'); d.e(8,9,6,3.5,'o'); d.e(8,7,3.5,2,'y'); for(const [x,y] of [[5,9],[10,8],[8,10],[11,10]]) d.p('n',x,y,x+1,y); d.p('O',6,8,9,7,7,11); d.e(8,5,1.4,1.4,'e'); d.p('r',4,10); }, { use: 'hold' });
add(3, 'Ngũ cốc và món theo vùng', 'ru-stroganina', 'Stroganina', 'Stroganina frozen fish', 'cá sống đông lạnh bào thành lát mỏng, ăn với muối và tiêu, đặc sản của người dân bản địa ở vùng Bắc cực. Món này cho thấy cách người miền băng giá tận dụng khí hậu lạnh.',
  d => { d.e(8,12,7.5,3,'c'); for(const [x,y] of [[3,9],[6,7],[9,9],[11,6]]){ d.l(x,y+2,x+3,y-1,'w'); d.l(x+1,y+2,x+4,y-1,'x'); d.l(x+2,y+2,x+4,y,'w'); } d.p('k',5,12,10,13); d.p('w',2,3,3,2,14,2,8,2); }, { use: 'hold' });
add(3, 'Ngũ cốc và món theo vùng', 'ru-kingcrab', 'Cua hoàng đế Kamchatka', 'The Kamchatka king crab', 'cua lớn đánh bắt ở bờ Viễn Đông, thịt ngọt và dày. Đây là món hải sản nổi tiếng nhất của vùng này.',
  d => { d.e(8,9,4.5,3.5,'r'); d.l(4,8,1,5,'r'); d.l(12,8,15,5,'r'); d.e(2,4,1.8,1.8,'R'); d.e(14,4,1.8,1.8,'R'); for(const y of [10,12]){ d.l(4,y,1,y+2,'r'); d.l(12,y,15,y+2,'r'); } d.p('k',6,6,10,6); d.p('o',7,8,9,10); }, { use: 'hold' });
add(3, 'Ngũ cốc và món theo vùng', 'ru-reindeermeat', 'Thịt tuần lộc ở vùng Bắc', 'Reindeer meat of the North', 'thịt hầm, hun khói hoặc ăn sống đông lạnh theo cách của người Nenets. Đây là nguồn đạm quan trọng ở vùng tundra.',
  d => { d.e(8,11,7.5,3.5,'n'); d.e(8,9,5,3,'R'); d.p('x',6,8,9,10,11,8,7,10); d.p('e',4,9,5,9); d.p('G',12,10,13,9); d.p('t',3,3,5,3,4,4,4,5,11,3,13,3,12,4,12,5); }, { use: 'hold' });

// ----- Đồ uống -----
add(3, 'Đồ uống', 'ru-chai', 'Trà Nga (chai)', 'Russian tea (chai)', 'trà đen pha đặc trong samovar rồi pha loãng, uống kèm mứt hoặc bánh. Mời trà là cách tiếp khách thân thiện nhất.',
  d => { d.r(3,7,8,6,'w'); d.r(3,7,8,1,'O'); d.l(11,8,13,9,'w'); d.l(13,9,11,11,'w'); d.r(1,13,12,2,'b'); d.p('a',5,5,6,3,5,1,8,4,9,2); d.e(14,13,1.8,1.8,'m'); d.p('b',5,9,7,10,9,9); d.p('y',14,5,15,6); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-kvass', 'Kvass', 'Kvass', 'đồ uống lên men nhẹ từ bánh mì lúa mạch đen, vị chua ngọt, thường uống lạnh vào mùa hè. Ngoài ra còn được dùng làm nước chan cho món okroshka.',
  d => { d.r(3,4,8,10,'n'); d.r(3,2,8,3,'e'); d.p('w',4,1,7,1,9,1); d.l(11,6,14,7,'a'); d.l(14,7,14,10,'a'); d.l(14,10,11,11,'a'); d.p('t',5,7,5,11,8,9); d.r(3,14,8,1,'N'); d.p('y',1,13,2,12,2,14); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-kefir', 'Kefir và ryazhenka', 'Kefir and ryazhenka', 'sữa lên men uống như sữa chua, ryazhenka được nấu nhỏ lửa cho vị béo hơn. Hai thức uống này rất phổ biến trong bữa sáng.',
  d => { d.r(2,3,5,11,'w'); d.r(2,7,5,3,'b'); d.r(3,1,3,2,'g'); d.r(9,5,5,9,'t'); d.r(9,8,5,3,'e'); d.r(10,3,3,2,'r'); d.p('w',3,4,10,6); d.r(1,14,14,1,'a'); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-mors', 'Mors và kompot', 'Mors and kompot', 'nước ép quả mọng pha loãng hoặc nước trái cây nấu, uống khi đang ăn hoặc ăn tráng miệng. Mors thường làm từ nam việt quất hoặc việt quất đỏ.',
  d => { d.r(3,4,8,10,'l'); d.r(4,6,6,7,'r'); for(const [x,y] of [[5,8],[8,10],[7,7]]) d.p('R',x,y); d.p('p',5,6,6,6); d.l(9,0,7,6,'y'); for(const [x,y] of [[13,12],[14,10],[12,14]]){ d.e(x,y,1.4,1.4,'m'); d.p('x',x-1,y-1); } d.p('G',14,8,13,8); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-sbiten', 'Sbiten', 'Sbiten', 'đồ uống nóng cổ làm từ mật ong và gia vị, từng phổ biến vào mùa đông trước khi trà thông dụng. Ngày nay món này được bán lại ở các hội chợ.',
  d => { d.e(7,10,5,4.5,'n'); d.r(3,6,9,2,'N'); d.l(12,8,14,9,'n'); d.l(14,9,12,12,'n'); d.p('o',4,6,6,6,8,6,10,6); d.p('a',5,4,6,2,8,3,9,1); d.p('y',6,10,8,11); d.l(13,1,11,6,'O'); d.p('y',3,13); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-vodka', 'Vodka', 'Vodka', 'rượu mạnh chưng cất từ lúa mạch đen hoặc lúa mì, uống lạnh trong chén nhỏ cùng đồ nhắm, như dưa chuột muối hoặc cá trích. Bữa tiệc Nga thường có nhiều lời chúc trước mỗi lần cạn chén.',
  d => { d.r(4,1,3,3,'a'); d.r(3,4,5,10,'l'); d.r(3,7,5,4,'w'); d.p('r',4,8,5,8,6,9); d.r(10,9,4,5,'l'); d.r(10,11,4,3,'c'); d.e(13,6,1.4,2,'g'); d.p('G',13,4); d.r(2,14,13,1,'a'); d.p('w',4,5); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-medovukha', 'Medovukha', 'Medovukha honey drink', 'rượu mật ong lên men, độ cồn nhẹ, vị ngọt và có hương gia vị. Đây là thức uống cổ của người Slav.',
  d => { d.r(4,5,7,9,'y'); d.r(4,3,7,3,'e'); d.l(11,7,14,8,'n'); d.l(14,8,11,12,'n'); d.r(4,8,7,1,'n'); d.r(4,12,7,1,'n'); d.p('u',5,7,5,10); d.e(2,3,1.6,1.4,'y'); d.p('k',2,3); d.p('w',1,1,3,1); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-champagne', 'Rượu vang Sovetskoe Shampanskoe', 'Soviet champagne', 'rượu vang sủi giá phải chăng, nổi tiếng từ thời Liên Xô và vẫn được mở vào lúc giao thừa. Nhiều gia đình Nga vẫn mở một chai vào dịp này.',
  d => { d.r(4,1,3,3,'y'); d.r(3,4,5,10,'G'); d.r(3,8,5,3,'e'); d.p('r',5,9); d.r(10,3,4,6,'u'); d.r(10,3,4,1,'l'); d.l(12,9,12,13,'l'); d.r(10,14,5,1,'l'); d.p('w',11,5,12,6,13,0,10,1,9,0); d.p('y',14,1); }, { use: 'hold' });
add(3, 'Đồ uống', 'ru-suuteitsai', 'Suutei tsai của người Buryat', 'Buryat salted milk tea', 'trà sữa mặn nấu với muối và bơ, uống nóng. Thức uống này giúp làm ấm cơ thể ở vùng khí hậu khắc nghiệt.',
  d => { d.e(8,10,6,4,'a'); d.r(2,7,12,3,'a'); d.e(8,7,6,1.8,'t'); d.p('e',6,7,9,7); d.r(5,13,6,2,'A'); d.p('o',3,10,6,11,9,10,12,11); d.p('a',5,4,6,2,10,5,11,3); }, { use: 'hold' });

// ----- Món lễ và theo mùa -----
add(3, 'Món lễ và theo mùa', 'ru-maslenitsa-blini', 'Maslenitsa và blini', 'Maslenitsa and blini', 'tuần lễ trước Mùa Chay, nhà nhà ăn bánh blini tròn vàng tượng trưng cho mặt trời. Mỗi bánh thường ăn kèm kem chua, bơ, cá hồi hun khói hoặc trứng cá.',
  d => { d.e(8,8,7,7,'y'); d.e(8,8,5.5,5.5,'u'); for(const [x,y] of [[5,5],[10,6],[7,10],[11,10],[8,7]]) d.p('O',x,y); d.p('k',6,7,10,8); d.l(6,11,10,11,'n'); d.p('o',8,0,0,8,15,8,8,15); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ru-kulich', 'Kulich và paskha', 'Kulich and paskha', 'bánh ngọt cao và món tráng miệng phô mai tươi hình tháp, làm cho Lễ Phục Sinh Chính thống giáo. Hai món này thường được mang đến nhà thờ để làm phép.',
  d => { d.r(2,6,6,8,'O'); d.e(5,5,3.5,2.5,'w'); d.p('r',3,5,6,4); d.p('g',5,3,7,6); d.p('y',4,6,3,9,6,10); d.dtri(9,13,6,1,'w'); d.tri(8,6,8,8,'w'); d.p('r',12,8,11,11,13,11); d.p('y',12,5); d.r(1,14,14,1,'a'); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ru-kutya', 'Kutya', 'Kutya', 'cháo ngũ cốc nấu ngọt với mật ong, hạt thuốc phiện và nho khô, ăn vào đêm Giáng sinh. Đây là món tượng trưng cho hy vọng và ngày mới.',
  d => { d.e(8,11,7,3.5,'b'); d.e(8,9,5.5,3,'t'); for(const [x,y] of [[5,9],[8,8],[10,10],[7,10],[11,9]]) d.p('N',x,y); d.p('k',6,8,9,9); d.p('y',7,9,10,8); d.p('y',8,1,7,2,8,2,9,2,8,3); }, { use: 'hold' });
add(3, 'Món lễ và theo mùa', 'ru-newyeartable', 'Bàn tiệc năm mới', 'The New Year\'s table', 'salad Olivier, cá trích dưới áo lông, trứng cá muối, quýt và champagne là những món quen thuộc. Nhiều gia đình ngồi ăn tới tận nửa đêm.',
  d => { d.bg('B'); d.tri(1,0,7,8,'G'); d.p('y',4,0); d.p('r',3,4,5,6); d.p('c',5,3,2,6); d.r(0,10,16,6,'w'); d.r(0,10,16,1,'r'); d.e(4,12,2.5,1.4,'e'); d.p('o',9,12,10,13); d.e(9.5,12.5,1.4,1.4,'o'); d.r(13,6,2,6,'G'); d.p('y',13,5,13,8); d.p('w',10,2,13,3,15,1); }, SC);
add(3, 'Món lễ và theo mùa', 'ru-dachasummer', 'Mùa hè ở dacha', 'Summer at the dacha', 'ăn rau tươi, dưa chuột, dâu tây, nấm tự hái và thịt nướng. Món mứt quả mọng cũng được nấu vào lúc này để dùng cho mùa đông.',
  d => { d.bg('c'); d.r(0,10,16,6,'g'); d.e(13,3,2,2,'y'); d.r(1,10,14,4,'n'); for(const x of [3,6,9,12]){ d.p('G',x,9,x-1,10,x+1,10); d.p('r',x,11); } d.r(3,3,4,5,'l'); d.r(3,5,4,3,'R'); d.r(3,2,4,1,'y'); d.e(11,7,1.8,1.4,'r'); d.p('G',11,5); }, SC);
add(3, 'Món lễ và theo mùa', 'ru-mushrooms', 'Mùa thu hái nấm', 'Autumn mushroom picking', 'người Nga hay đi rừng hái nấm porcini, nấm mỡ và nấm mật rồi muối chua hoặc phơi khô. Món nấm muối ăn kèm khoai tây là món ăn mùa đông quen thuộc.',
  d => { d.e(5,6,4,3,'n'); d.r(4,7,3,6,'e'); d.e(11,9,3.5,2.5,'r'); d.p('w',10,8,12,9,9,10); d.r(10,10,2,4,'e'); d.p('t',4,4,6,5); d.p('G',2,14,3,13,8,14,13,14); d.r(1,15,14,1,'O'); }, { use: 'hold' });
