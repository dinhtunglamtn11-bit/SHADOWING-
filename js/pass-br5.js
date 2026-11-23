import { add, SC, setCC } from './pass-kit.js';
setCC('br');
// Brasil · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử, người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };

// ----- Con vật và linh vật -----
add(G, A, 'br-jaguar', 'Báo jaguar (onça-pintada)', 'Jaguar (onça-pintada)', 'Mèo lớn nhất châu Mỹ, sống ở Amazon và Pantanal; biểu tượng của sức mạnh hoang dã, xuất hiện trên nhiều logo đội bóng và nhãn hiệu.',
  d => { d.bg('G'); d.e(8, 9, 6, 4.4, 'o'); d.e(8, 6, 3.6, 3.2, 'o'); d.p('o', 4, 3, 5, 2, 11, 3, 10, 2); d.p('k', 6, 6, 10, 6, 7, 9, 9, 9, 8, 8); d.p('O', 4, 9, 7, 11, 11, 9, 5, 12, 12, 12, 8, 3); d.p('w', 7, 7, 9, 7); d.r(3, 13, 3, 2, 'o'); d.r(10, 13, 3, 2, 'o'); }, PET);
add(G, A, 'br-tucano', 'Chim tô-cán (tucano)', 'Toucan', 'Chim có mỏ to nhiều màu, sống ở rừng nhiệt đới; mỏ nhẹ giúp nó hái quả ở những cành mỏng.',
  d => { d.bg('g'); d.e(6, 9, 3.6, 4.4, 'k'); d.e(5, 6, 2.6, 2.6, 'k'); d.p('w', 4, 8, 5, 8, 4, 9); d.tri(6, 4, 9, 4, 'o'); d.r(7, 4, 8, 2, 'y'); d.r(7, 5, 6, 1, 'r'); d.p('k', 4, 5); d.l(6, 13, 6, 15, 'O'); d.l(8, 13, 8, 15, 'O'); }, PET);
add(G, A, 'br-arara', 'Vẹt đuôi dài xanh (arara-azul)', 'Hyacinth macaw (arara-azul)', 'Loài vẹt xanh lớn, được bảo tồn sau khi số lượng giảm mạnh; phim hoạt hình Rio đã làm loài này nổi tiếng với khán giả quốc tế.',
  d => { d.bg('c'); d.e(7, 6, 3, 3, 'B'); d.e(7, 10, 3.4, 4.4, 'b'); d.l(10, 12, 13, 15, 'B'); d.l(9, 13, 11, 15, 'b'); d.p('y', 8, 5, 9, 6); d.p('k', 5, 5, 6, 7, 6, 8); d.p('w', 6, 5); d.p('Y', 5, 7); d.l(7, 14, 7, 15, 'O'); }, PET);
add(G, A, 'br-boto', 'Boto hồng (cá heo sông Amazon)', 'Pink river dolphin (boto)', 'Cá heo nước ngọt thân hồng sống ở sông Amazon; trong truyền thuyết dân gian, boto biến thành chàng trai đẹp đến các buổi lễ hội vào ban đêm.',
  d => { d.bg('C'); d.r(0, 11, 16, 5, 'b'); d.e(8, 8, 6, 3.4, 'p'); d.e(4, 8, 2, 1.6, 'p'); d.l(1, 8, 0, 8, 'P'); d.p('k', 5, 7); d.tri(8, 3, 3, 3, 'P'); d.p('P', 10, 10, 6, 10, 8, 10); d.p('w', 2, 13, 12, 12); }, PET);
add(G, A, 'br-bicho-preguica', 'Lười ba ngón và thú ăn kiến khổng lồ', 'Three-toed sloth and giant anteater', 'Những loài động vật lạ mắt, di chuyển chậm hoặc có lối sống đặc biệt; gắn với rừng nhiệt đới và xaván.',
  d => { d.bg('G'); d.l(0, 4, 15, 4, 'N'); d.e(8, 8, 5, 3.6, 'n'); d.e(4, 7, 2.6, 2.4, 't'); d.p('k', 3, 7, 4, 7); d.p('N', 3, 6, 5, 6, 4, 8, 3, 8); d.l(6, 10, 6, 5, 'n'); d.l(10, 10, 10, 5, 'n'); d.p('u', 7, 7, 9, 7, 11, 8); d.p('N', 12, 8, 13, 9); }, PET);
add(G, A, 'br-saci', 'Saci Pererê (truyền thuyết dân gian)', 'Saci Pererê (folk legend)', 'Nhân vật trong truyền thuyết là cậu bé da đen một chân, đội mũ đỏ và hay nghịch ngợm; đây là nhân vật hư cấu trong văn hóa dân gian, kể cho trẻ em.',
  d => { d.bg('G'); d.tri(4, 1, 8, 5, 'r'); d.e(8, 6, 3, 2.6, 'N'); d.p('w', 7, 6, 9, 6); d.p('k', 7, 7, 9, 7); d.r(6, 8, 4, 4, 'w'); d.l(8, 12, 8, 15, 'N'); d.l(6, 9, 3, 11, 'N'); d.l(10, 9, 13, 8, 'N'); d.l(14, 8, 14, 11, 'a'); d.p('k', 13, 4, 11, 4); d.r(13, 3, 2, 1, 'a'); }, SC);
add(G, A, 'br-curupira', 'Curupira (truyền thuyết dân gian)', 'Curupira (folk legend)', 'Thần bảo vệ rừng có bàn chân quay ngược, làm thợ săn bị lạc đường; nhân vật này là truyền thuyết bản địa, không phải sự thật.',
  d => { d.bg('G'); d.e(8, 5, 3, 3, 'r'); d.e(8, 6, 2, 2, 's'); d.p('k', 7, 6, 9, 6); d.p('r', 5, 2, 11, 2, 8, 1); d.r(6, 8, 4, 4, 'o'); d.l(7, 12, 5, 14, 'N'); d.l(9, 12, 11, 14, 'N'); d.p('N', 4, 15, 5, 15, 11, 15, 12, 15); d.p('g', 2, 9, 13, 10, 1, 13, 14, 4); }, SC);

// ----- Tín ngưỡng -----
add(G, B, 'br-catolica', 'Công giáo La Mã', 'Roman Catholicism', 'Brasil thường được xem là nước có số tín đồ Công giáo đông nhất thế giới; tỷ lệ này đã giảm dần trong những thập niên gần đây.',
  d => { d.bg('k'); d.r(7, 2, 2, 11, 'y'); d.r(4, 5, 8, 2, 'y'); d.r(7, 2, 2, 11, 'u'); d.p('w', 8, 1, 3, 3, 13, 3, 2, 9, 14, 10); d.r(0, 13, 16, 3, 'K'); }, SC);
add(G, B, 'br-evangelico', 'Tin Lành (Evangélico)', 'Evangelical Protestantism', 'Các giáo phái Phục Lâm và Ngũ Tuần phát triển nhanh từ thập niên 1980, có ảnh hưởng lớn ở các khu đô thị và trong âm nhạc.',
  d => { d.bg('c'); d.r(4, 4, 8, 3, 'w'); d.r(3, 7, 10, 6, 'W'); d.l(8, 1, 8, 3, 'a'); d.p('a', 7, 2, 9, 2); d.r(7, 9, 2, 4, 'N'); d.p('b', 5, 9, 10, 9, 5, 11, 10, 11); d.r(0, 13, 16, 3, 'g'); }, SC);
add(G, B, 'br-candomble', 'Candomblé', 'Candomblé', 'Tín ngưỡng gốc Phi có nhiều vị thần gọi là orixá, phát triển mạnh ở Bahia; nghi lễ có trống, vũ và áo trắng, thần biển Yemanjá được nhiều người biết nhất.',
  d => { d.bg('v'); d.e(8, 4, 2, 2, 's'); d.r(5, 4, 6, 1, 'w'); d.tri(4, 6, 8, 8, 'w'); d.p('b', 6, 8, 9, 8, 7, 10); d.p('y', 3, 3, 13, 4, 2, 10, 14, 10); d.p('c', 1, 13, 14, 13); d.r(2, 14, 12, 2, 'V'); }, SC);
add(G, B, 'br-umbanda', 'Umbanda', 'Umbanda', 'Tín ngưỡng ra đời ở Brasil đầu thế kỷ XX, pha trộn châu Phi, Công giáo và Thông linh; có nhiều tín đồ ở Rio và São Paulo.',
  d => { d.bg('A'); d.r(7, 6, 2, 8, 'w'); d.e(8, 5, 2.4, 3, 'o'); d.e(8, 4, 1.4, 2, 'y'); d.p('w', 4, 12, 12, 12, 5, 14, 11, 14); d.p('r', 3, 6, 13, 6); d.p('y', 5, 3, 11, 3, 8, 1); d.r(2, 14, 12, 1, 'a'); }, SC);
add(G, B, 'br-aparecida', 'Đức Mẹ Aparecida', 'Our Lady of Aparecida', 'Tượng Đức Mẹ nhỏ màu đen, vị thánh bảo trợ của Brasil; đền thờ ở Aparecida là một trong những điểm hành hương lớn nhất thế giới.',
  d => { d.bg('b'); d.tri(4, 5, 8, 10, 'B'); d.tri(5, 7, 6, 8, 'b'); d.e(8, 5, 2, 2.4, 'N'); d.r(6, 2, 4, 2, 'y'); d.p('y', 7, 1, 9, 1); d.p('y', 8, 9, 8, 12); d.p('w', 2, 2, 13, 3, 3, 12, 13, 13); }, SC);
add(G, B, 'br-indigenous-faith', 'Tín ngưỡng bản địa (Yanomami, Kayapó)', 'Indigenous beliefs (Yanomami, Kayapó)', 'Nhiều cộng đồng giữ tín ngưỡng gắn với rừng và sông; thầy cúng đóng vai trò quan trọng trong cộng đồng.',
  d => { d.bg('G'); d.e(8, 5, 2, 2.2, 's'); d.p('r', 7, 5, 9, 5); d.p('y', 5, 2, 8, 1, 11, 2, 6, 3, 10, 3); d.r(6, 7, 4, 4, 's'); d.p('r', 6, 9, 9, 9); d.l(7, 11, 6, 15, 'S'); d.l(9, 11, 10, 15, 'S'); d.p('o', 4, 8, 12, 8); d.p('c', 1, 13, 14, 12); }, SC);

// ----- Lịch sử -----
add(G, C, 'br-tupi', 'Người bản địa trước năm 1500', 'Indigenous peoples before 1500', 'Khoảng một đến vài triệu người sống trên đất này với hàng trăm dân tộc khác nhau; người Tupi sống dọc bờ biển khi người châu Âu đến.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'C'); d.r(0, 11, 16, 1, 'u'); d.tri(2, 5, 6, 6, 'O'); d.tri(3, 7, 4, 4, 'N'); d.r(4, 9, 2, 2, 'k'); d.tri(9, 6, 6, 5, 'o'); d.p('g', 8, 10, 14, 10, 1, 11); d.p('N', 13, 3, 13, 5); }, SC);
add(G, C, 'br-cabral', 'Năm 1500: Pedro Álvares Cabral cập bờ', '1500: Pedro Álvares Cabral lands', 'Nhà đi biển Bồ Đào Nha cập bờ ngày 22 tháng Tư năm 1500 và tuyên bố vùng đất thuộc Bồ Đào Nha; mốc thường được xem là khởi đầu thuộc địa.',
  d => { d.bg('c'); d.r(0, 11, 16, 5, 'b'); d.r(3, 9, 9, 3, 'N'); d.l(7, 9, 7, 2, 'N'); d.tri(4, 2, 7, 6, 'w'); d.p('r', 7, 4, 7, 5, 6, 5, 8, 5); d.p('r', 3, 8, 12, 9); d.p('l', 2, 13, 10, 14); d.r(13, 6, 3, 5, 'g'); }, SC);
add(G, C, 'br-slavery', 'Chế độ nô lệ và chu kỳ đường, vàng', 'Slavery and the sugar and gold cycles', 'Hàng triệu người châu Phi bị đưa tới Brasil, nhiều hơn bất kỳ nước nào ở châu Mỹ; họ làm việc ở đồn điền đường, mỏ vàng Minas Gerais và đồn điền cà phê.',
  d => { d.bg('u'); d.r(0, 12, 16, 4, 'n'); d.r(2, 5, 12, 2, 'y'); d.tri(3, 7, 4, 5, 'Y'); d.tri(9, 7, 4, 5, 'y'); d.l(14, 2, 14, 10, 'G'); d.l(1, 3, 1, 10, 'G'); d.p('k', 5, 10, 11, 11); d.p('a', 8, 3, 13, 12); }, SC);
add(G, C, 'br-1822', 'Năm 1822: Độc lập', '1822: Independence', 'Thái tử Pedro tuyên bố độc lập khỏi Bồ Đào Nha ngày 7 tháng 9 năm 1822 và trở thành Hoàng đế Pedro I; Brasil trở thành một đế quốc.',
  d => { d.bg('G'); d.e(8, 8, 6, 5, 'y'); d.e(8, 8, 3, 3, 'b'); d.p('w', 7, 7, 9, 8, 8, 9); d.r(0, 0, 16, 1, 'g'); d.r(0, 15, 16, 1, 'g'); d.p('y', 2, 2, 13, 2, 2, 13, 13, 13); }, SC);
add(G, C, 'br-1888', 'Năm 1888: Xóa bỏ nô lệ (Lei Áurea)', '1888: Abolition of slavery (Lei Áurea)', 'Đạo luật Vàng được ký ngày 13 tháng 5 năm 1888; Brasil là nước cuối cùng ở châu Mỹ xóa bỏ nô lệ, và di sản bất bình đẳng vẫn còn đến nay.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 3, 10, 9, 'e'); d.r(3, 3, 10, 1, 'W'); d.p('k', 5, 5, 6, 5, 7, 5, 9, 5, 10, 5, 5, 7, 8, 7, 10, 7); d.r(5, 9, 6, 1, 'k'); d.e(8, 11, 2, 1.6, 'y'); d.p('Y', 8, 11); }, SC);
add(G, C, 'br-1889', 'Năm 1889: Cộng hòa', '1889: The Republic', 'Quân đội lật đổ hoàng đế Pedro II và tuyên bố cộng hòa; đây là sự chuyển đổi tương đối êm ái.',
  d => { d.bg('G'); d.r(0, 0, 16, 16, 'G'); d.e(8, 8, 7, 7, 'y'); d.e(8, 8, 5, 5, 'b'); d.r(1, 7, 14, 2, 'w'); d.p('g', 7, 7, 9, 8); d.p('w', 4, 5, 11, 11, 6, 11, 10, 5); }, SC);
add(G, C, 'br-xx', 'Thế kỷ XX: Vargas, chế độ quân sự, hiến pháp 1988', '20th century: Vargas, military rule, the 1988 constitution', 'Đất nước trải qua thời kỳ của Vargas, chế độ quân sự từ 1964 đến 1985 và hiến pháp dân chủ năm 1988; thời kỳ này còn được nhắc đến trong văn hóa và âm nhạc.',
  d => { d.bg('A'); d.r(2, 3, 12, 11, 'e'); d.r(2, 3, 12, 2, 'r'); d.p('k', 4, 7, 11, 7, 4, 9, 11, 9, 4, 11, 9, 11); d.r(11, 11, 3, 3, 'y'); d.p('Y', 12, 12); d.p('w', 3, 1, 12, 1); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'br-pele', 'Pelé', 'Pelé', 'Huyền thoại bóng đá giành ba chiếc World Cup vào các năm 1958, 1962 và 1970; biểu tượng thể thao của Brasil trên thế giới.',
  d => { d.bg('y'); d.e(8, 5, 3, 3, 'N'); d.p('w', 7, 5, 9, 5); d.p('k', 7, 6, 9, 6); d.r(5, 8, 6, 5, 'y'); d.r(5, 8, 6, 1, 'g'); d.r(5, 10, 6, 1, 'g'); d.e(12, 12, 2, 2, 'w'); d.p('k', 12, 11); d.r(6, 13, 4, 2, 'b'); d.p('G', 3, 3, 13, 2); }, SC);
add(G, E, 'br-santos-dumont', 'Alberto Santos-Dumont', 'Alberto Santos-Dumont', 'Nhà tiên phong hàng không, bay chiếc 14-bis ở Paris năm 1906; nhiều người Brasil xem ông là cha đẻ của ngành hàng không.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(2, 7, 12, 1, 'N'); d.r(3, 5, 10, 1, 'e'); d.r(3, 9, 10, 1, 'e'); d.l(4, 5, 4, 9, 'N'); d.l(11, 5, 11, 9, 'N'); d.l(8, 5, 8, 9, 'N'); d.l(2, 7, 0, 7, 'N'); d.p('k', 6, 12, 10, 12); d.r(5, 11, 6, 1, 'a'); d.p('N', 13, 7, 14, 6); }, SC);
add(G, E, 'br-niemeyer-man', 'Oscar Niemeyer', 'Oscar Niemeyer', 'Kiến trúc sư của những công trình cong mềm ở Brasília; ông sống đến gần 105 tuổi và làm việc gần như suốt đời.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'w'); d.e(8, 14, 8, 6, 'w'); d.e(4, 11, 3, 3, 'W'); d.e(12, 11, 3, 3, 'W'); d.l(2, 6, 14, 6, 'a'); d.l(2, 7, 14, 5, 'a'); d.p('k', 3, 9, 13, 9); d.p('y', 13, 2); }, SC);
add(G, E, 'br-carmen', 'Carmen Miranda', 'Carmen Miranda', 'Ca sĩ và diễn viên nổi tiếng ở Hollywood thập niên 1940 với chiếc mũ trái cây; hình ảnh của bà phần nào định hình cách thế giới nhìn Brasil.',
  d => { d.bg('p'); d.e(8, 3, 5, 2.4, 'y'); d.p('r', 5, 2, 9, 1, 11, 3); d.p('g', 7, 2, 12, 2); d.p('o', 6, 4, 10, 4); d.e(8, 8, 2.4, 2.6, 's'); d.p('k', 7, 8, 9, 8); d.p('r', 7, 10, 8, 10); d.r(5, 11, 6, 3, 'b'); d.r(4, 13, 8, 2, 'y'); }, SC);
add(G, E, 'br-machado', 'Machado de Assis', 'Machado de Assis', 'Nhà văn được xem là lớn nhất của văn học Brasil, tác giả "Memórias Póstumas de Brás Cubas"; ông xuất thân gia đình nghèo và là người sáng lập Học viện Văn chương Brasil.',
  d => { d.bg('n'); d.r(2, 3, 12, 10, 'e'); d.r(2, 3, 2, 10, 'N'); d.p('k', 6, 5, 11, 5, 6, 7, 12, 7, 6, 9, 10, 9); d.l(10, 12, 14, 8, 'w'); d.p('W', 13, 7, 14, 7); d.p('y', 5, 1, 10, 1); }, H);
add(G, E, 'br-senna', 'Ayrton Senna', 'Ayrton Senna', 'Tay đua F1 ba lần vô địch thế giới, mất năm 1994 trong một tai nạn ở Imola; nhiều người Brasil nhớ đến ông như một điểm tựa tinh thần.',
  d => { d.bg('y'); d.e(8, 8, 5, 4, 'y'); d.e(8, 8, 5, 4, 'g'); d.r(4, 7, 8, 3, 'k'); d.r(5, 8, 6, 1, 'c'); d.r(4, 5, 8, 1, 'b'); d.p('w', 6, 5, 9, 5); d.r(3, 13, 10, 2, 'r'); d.p('w', 1, 2, 14, 2); }, H);
add(G, E, 'br-chico', 'Chico Mendes', 'Chico Mendes', 'Người khai thác mủ cao su và nhà hoạt động bảo vệ rừng Amazon, bị sát hại năm 1988; cái chết của ông khiến cuộc đấu tranh bảo vệ rừng được thế giới chú ý.',
  d => { d.bg('G'); d.e(8, 8, 3.6, 3.4, 'g'); d.l(8, 10, 8, 4, 'N'); d.r(6, 9, 4, 6, 'N'); d.p('w', 7, 11, 9, 12); d.e(8, 3, 1.6, 1.6, 'h'); d.p('w', 3, 3, 12, 2); d.r(2, 14, 12, 2, 'G'); d.p('r', 8, 12); }, SC);
