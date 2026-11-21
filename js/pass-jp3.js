import { add, SC } from './pass-kit.js';
// Nhật Bản · Nhóm 3: Ẩm thực
const G3 = 3, F1 = 'Món ăn', F2 = 'Đồ uống và trà đạo', F3 = 'Món theo mùa và dịp lễ', F4 = 'Quy tắc bàn ăn';
const bowl = (d, cx, y, w, h, c, rim = 'w') => { d.e(cx, y, w / 2, h, c); d.r(cx - w / 2, y - 4, w, 4, '_'); d.r(Math.round(cx - w / 2), y, w, 1, rim); };
const FOOD = { use: 'hold' };

// ----- Món ăn -----
add(G3, F1, 'sushi', 'Sushi', 'Sushi', 'Cơm trộn giấm ăn cùng cá sống, tôm, trứng cá hay rau. Kiểu nigiri vuốt tay được cho là ra đời ở Edo (Tokyo xưa).',
  d => { d.r(2, 11, 12, 2, 'W'); d.r(3, 8, 10, 4, 'w'); d.r(3, 11, 10, 1, 'W'); d.r(2, 4, 12, 4, 'o'); d.r(2, 4, 12, 1, 'x'); d.p('x', 4, 5, 6, 6, 9, 5, 11, 6); d.r(7, 4, 2, 8, 'd'); }, FOOD);
add(G3, F1, 'ramen', 'Ramen', 'Ramen', 'Mì nước với sợi mì kiềm, nước dùng hầm xương và nêm bằng miso hay nước tương. Mỗi vùng có phiên bản riêng, nổi tiếng nhất là tonkotsu ở Kyushu và miso ở Hokkaido.',
  d => { d.r(2, 7, 12, 1, 'w'); d.e(8, 7, 6, 7, 'r'); d.r(0, 0, 16, 7, '_'); d.r(2, 7, 12, 1, 'w'); d.r(3, 5, 10, 2, 'y'); for (let x = 3; x < 13; x += 2) d.p('o', x, 6); d.e(6, 5, 2, 1.4, 'e'); d.p('o', 6, 5); d.e(10.5, 5, 2.2, 1.4, 'p'); d.p('x', 10, 5); d.p('G', 8, 4, 12, 4); d.l(11, 0, 8, 5, 'n'); d.l(13, 1, 10, 5, 'n'); d.p('w', 4, 2, 5, 1, 6, 2); }, FOOD);
add(G3, F1, 'takoyaki', 'Takoyaki', 'Takoyaki', 'Viên bột nướng có nhân bạch tuộc, phủ sốt, rong biển và cá bào. Món ăn đường phố đặc trưng của Osaka, xuất hiện khoảng năm 1935.',
  d => { d.r(1, 11, 14, 3, 'W'); d.r(1, 13, 14, 1, 'a'); d.e(4.5, 8, 3, 3, 'O'); d.e(11.5, 8, 3, 3, 'O'); d.e(8, 6, 3, 3, 'o'); d.p('N', 3, 7, 5, 8, 10, 7, 12, 9, 7, 5, 9, 6); d.p('w', 8, 5, 4, 7, 11, 8); d.p('G', 3, 9, 12, 7, 8, 7); d.p('e', 5, 6, 10, 9, 7, 4); }, FOOD);
add(G3, F1, 'tempura', 'Tempura', 'Tempura', 'Hải sản và rau chiên giòn, từng được đưa vào Nhật bởi những thương nhân phương Tây vào thế kỷ 16. Người Nhật đã biến nó thành một món riêng với lớp vỏ mỏng nhẹ.',
  d => { d.e(7, 8, 5.5, 3.6, 'o'); d.e(6.5, 7.5, 4.5, 2.6, 'y'); d.p('O', 3, 9, 6, 10, 9, 9, 10, 7, 4, 6); d.p('w', 5, 6, 8, 7, 7, 9); d.tri(11, 8, 4, 5, 'r'); d.p('R', 12, 10, 13, 11); d.r(1, 13, 8, 1, 'G'); d.r(2, 14, 6, 1, 'g'); }, FOOD);
add(G3, F1, 'okonomiyaki', 'Okonomiyaki', 'Okonomiyaki', 'Bánh xèo bột và bắp cải, ăn kèm thịt hoặc hải sản; tên gọi có nghĩa "ăn theo ý thích". Món quen thuộc ở Osaka và Hiroshima, nhưng mỗi nơi nướng một kiểu.',
  d => { d.e(8, 10, 7, 3.4, 't'); d.e(8, 8.8, 7, 3.2, 'O'); d.e(8, 8.5, 6.2, 2.7, 'N'); d.l(3, 7, 12, 7, 'w'); d.l(3, 9, 12, 9, 'w'); d.l(4, 8, 11, 8, 'e'); d.p('G', 5, 7, 8, 9, 11, 8, 6, 9, 10, 7); d.p('x', 4, 8, 9, 8, 12, 9); d.l(4, 6, 6, 5, 'e'); d.l(9, 5, 11, 6, 'e'); }, FOOD);
add(G3, F1, 'tonkatsu', 'Tonkatsu', 'Tonkatsu', 'Cốt lết thịt heo chiên xù với bột chiên xù panko, ăn kèm bắp cải thái sợi và sốt đặc trưng.',
  d => { d.r(1, 10, 14, 4, 'W'); d.r(2, 5, 4, 5, 'o'); d.r(6, 5, 4, 5, 'o'); d.r(10, 5, 4, 5, 'o'); d.r(2, 5, 12, 1, 'y'); d.p('x', 3, 8, 7, 8, 11, 8); d.p('y', 4, 6, 8, 7, 12, 6, 3, 9, 7, 9, 11, 9); d.r(2, 10, 12, 1, 'e'); d.e(5, 12, 3, 1.5, 'h'); d.p('g', 4, 12, 6, 13); d.r(12, 10, 2, 2, 'N'); }, FOOD);
add(G3, F1, 'udon', 'Udon và soba', 'Udon and soba', 'Udon là sợi mì trắng dày, soba là sợi mì làm từ bột kiều mạch. Ăn nóng hay ăn lạnh đều phổ biến.',
  d => { d.r(2, 8, 12, 1, 'w'); d.e(8, 8, 6, 6.4, 'W'); d.r(0, 0, 16, 8, '_'); d.r(2, 8, 12, 1, 'w'); d.r(3, 6, 10, 2, 'w'); for (let x = 3; x < 13; x += 2) d.p('e', x, 6); d.e(8, 6, 2.2, 1.4, 'w'); d.p('p', 7, 6, 9, 6); d.p('G', 4, 5, 11, 5, 6, 4); d.l(11, 1, 9, 5, 'n'); d.l(13, 2, 11, 5, 'n'); d.r(3, 14, 10, 1, 'a'); }, FOOD);
add(G3, F1, 'onigiri', 'Onigiri và bento', 'Onigiri and bento', 'Onigiri là nắm cơm nén có nhân, bọc rong biển; bento là hộp cơm đầy đủ món, thường được sắp xếp rất đẹp mắt.',
  d => { d.tri(2, 2, 12, 11, 'w'); d.r(5, 9, 6, 5, 'd'); d.r(5, 9, 6, 1, 'G'); d.p('r', 8, 6); d.p('x', 7, 6, 9, 6); d.p('W', 4, 8, 11, 8, 6, 4); }, FOOD);
add(G3, F1, 'yakitori', 'Yakitori', 'Yakitori', 'Xâu gà nướng than, thường ăn vào buổi tối ở quán izakaya (quán nhậu) cùng bạn bè.',
  d => { d.l(1, 14, 14, 2, 't'); d.l(2, 14, 15, 2, 'n'); for (const [x, y] of [[4, 11], [7, 8], [10, 5]]) { d.e(x + 0.5, y + 0.5, 2.2, 2, 'n'); d.e(x, y, 2, 1.8, 'o'); d.p('O', x - 1, y); d.p('y', x, y - 1); } d.p('N', 3, 10, 6, 7, 9, 4); d.p('G', 5, 12, 8, 9, 11, 6); }, FOOD);
add(G3, F1, 'curry', 'Karē (cà ri Nhật)', 'Japanese curry (karē)', 'Ngọt và đậm hơn cà ri Ấn Độ, du nhập qua hải quân Anh rồi trở thành món ăn gia đình thân thuộc nhất.',
  d => { d.e(8, 10, 7, 4, 'w'); d.e(8, 9.5, 6, 3, 'W'); d.e(5.5, 9, 3.5, 2.5, 'w'); d.e(10.5, 9.5, 4, 2.6, 'N'); d.e(10, 9, 3.2, 2, 'O'); d.p('y', 10, 8, 12, 9); d.p('o', 9, 10, 11, 10); d.l(11, 3, 14, 8, 'a'); d.p('a', 11, 2, 12, 2); d.p('k', 4, 9); }, FOOD);
add(G3, F1, 'wagyu', 'Wagyu', 'Wagyu beef', 'Thịt bò Nhật có vân mỡ phân bố đều, tan ngay trong miệng, nổi tiếng nhất là bò Kobe.',
  d => { d.e(8, 11, 7, 3.4, 'w'); d.e(8, 8.5, 5.8, 3.6, 'm'); d.e(8, 8, 5, 3, 'R'); for (const [x, y] of [[4, 8], [6, 6], [9, 7], [11, 9], [7, 10], [5, 10], [12, 7], [9, 5]]) d.p('x', x, y); d.p('w', 6, 8, 10, 8, 8, 6, 7, 9); d.l(5, 5, 11, 11, 'N'); d.p('N', 11, 5, 5, 11); }, FOOD);
add(G3, F1, 'kaiseki', 'Kaiseki', 'Kaiseki', 'Bữa ăn nhiều món nhỏ theo mùa, được trình bày như một tác phẩm nghệ thuật, gắn liền với trà đạo và Kyoto.',
  d => { d.r(1, 2, 14, 12, 'N'); d.r(1, 2, 14, 1, 'n'); d.e(4.5, 6, 2.6, 2.6, 'w'); d.e(4.5, 6, 1.6, 1.6, 'r'); d.e(11.5, 5.5, 2.6, 2.4, 'w'); d.e(11.5, 5.5, 1.6, 1.4, 'g'); d.r(3, 10, 5, 3, 'W'); d.r(4, 11, 3, 1, 'p'); d.r(9, 10, 5, 3, 'c'); d.p('w', 10, 11, 12, 11); d.p('y', 5, 6, 12, 5); }, FOOD);
add(G3, F1, 'natto', 'Natto và canh miso', 'Natto and miso soup', 'Natto là đậu tương lên men dính nhớt, mùi nồng; canh miso là món không thể thiếu trong bữa sáng của nhiều gia đình.',
  d => { d.e(5, 10, 4, 3.4, 'R'); d.r(0, 0, 16, 7, '_'); d.r(1, 7, 8, 1, 'r'); d.r(2, 8, 6, 5, 'R'); d.e(5, 7.5, 3.4, 1, 'n'); d.r(3, 6, 2, 2, 'e'); d.p('G', 6, 7, 3, 7); d.r(10, 7, 5, 6, 'w'); d.r(10, 7, 5, 1, 'W'); d.r(11, 8, 3, 2, 'n'); d.p('e', 12, 8, 11, 9); d.l(11, 6, 10, 3, 'e'); d.l(13, 6, 14, 2, 'e'); d.l(12, 6, 12, 3, 'e'); }, FOOD);

// ----- Đồ uống và trà đạo -----
add(G3, F2, 'matcha', 'Matcha', 'Matcha', 'Bột trà xanh xay mịn từ lá trà che nắng, đánh bọt với nước nóng. Màu xanh tươi và vị đắng nhẹ, dùng trong trà đạo và cả bánh kẹo hiện đại.',
  d => { d.e(7, 9.5, 5.5, 4.2, 'N'); d.r(0, 0, 16, 7, '_'); d.r(1, 7, 12, 1, 'n'); d.r(2, 8, 10, 4, 'N'); d.r(2, 7, 10, 1, 'h'); d.e(7, 7.5, 5, 1, 'g'); d.p('e', 5, 7, 8, 7, 10, 7); d.r(5, 12, 4, 2, 'n'); d.r(13, 5, 2, 7, 't'); d.l(13, 5, 12, 2, 'w'); d.l(14, 5, 15, 2, 'w'); d.l(13, 5, 13, 2, 'w'); }, FOOD);
add(G3, F2, 'sencha', 'Trà xanh (sencha, gyokuro, hojicha)', 'Green teas (sencha, gyokuro, hojicha)', 'Sencha là trà xanh hằng ngày, gyokuro là loại cao cấp che nắng dài ngày, hojicha là trà rang có mùi thơm khói.',
  d => { d.e(6, 9, 5, 4.2, 'G'); d.e(6, 7, 3, 1.4, 'g'); d.r(4, 5, 4, 1, 'N'); d.p('N', 5, 4, 6, 4); d.l(11, 7, 13, 10, 'G'); d.l(13, 10, 11, 12, 'G'); d.r(3, 13, 6, 1, 'a'); d.l(6, 2, 6, 0, 'w'); d.p('w', 9, 4, 4, 3); }, FOOD);
add(G3, F2, 'chanoyu', 'Trà đạo (chanoyu)', 'Tea ceremony (chanoyu)', 'Nghi lễ pha và mời trà, nhấn mạnh sự yên tĩnh, tôn trọng và từng động tác nhỏ nhặt. Trà thất (chashitsu) thường nhỏ và giản dị để ai cũng phải cúi người khi bước vào.',
  d => { d.bg('h'); d.r(0, 11, 16, 5, 'N'); d.r(0, 12, 16, 4, 'h'); d.r(0, 11, 16, 1, 'e'); d.e(5.5, 8, 4, 3, 'd'); d.r(2, 5, 7, 1, 'a'); d.l(5, 4, 5, 3, 'a'); d.p('w', 7, 4, 4, 2, 5, 1); d.e(12, 10, 2.4, 1.8, 'N'); d.e(12, 9.2, 2.2, 1, 'g'); d.r(1, 14, 14, 1, 'g'); }, { scene: true });
add(G3, F2, 'sake', 'Sake', 'Sake', 'Rượu gạo lên men, uống ấm hoặc lạnh tùy loại. Theo lễ nghĩa, người ta rót cho nhau trước rồi mới tự rót cho mình, và cùng nâng ly nói "kanpai".',
  d => { d.e(5.5, 10, 3.6, 4.5, 'w'); d.r(4, 3, 3, 3, 'w'); d.r(4, 3, 3, 1, 'W'); d.r(3, 9, 5, 3, 'r'); d.p('k', 5, 10); d.r(10, 9, 5, 5, 'w'); d.r(10, 9, 5, 1, 'W'); d.r(11, 10, 3, 3, 'l'); d.p('c', 11, 10, 13, 10); }, FOOD);
add(G3, F2, 'umeshu', 'Umeshu và shochu', 'Umeshu and shochu', 'Umeshu là rượu mận ngọt chua, còn shochu là rượu chưng cất từ khoai lang, lúa mạch hay gạo, đặc sản của Kyushu.',
  d => { d.r(3, 3, 10, 2, 'a'); d.r(2, 5, 12, 9, 'l'); d.r(3, 6, 10, 7, 'y'); d.r(3, 6, 10, 1, 'u'); for (const [x, y] of [[5, 9], [9, 8], [7, 11], [11, 11], [6, 7]]) { d.e(x + 0.5, y + 0.5, 1.5, 1.5, 'P'); } d.p('R', 5, 10, 9, 9, 7, 12); d.p('w', 4, 7, 4, 8); }, FOOD);
add(G3, F2, 'ramune', 'Ramune', 'Ramune', 'Nước ngọt có ga đóng chai thủy tinh có viên bi ở cổ, thường uống ở lễ hội mùa hè. Người ta phải ấn viên bi xuống mới mở được nắp.',
  d => { d.r(6, 1, 4, 2, 'r'); d.r(6, 3, 4, 3, 'c'); d.e(8, 5, 1.2, 1.2, 'w'); d.r(5, 6, 6, 1, 'C'); d.r(4, 7, 8, 8, 'c'); d.r(4, 7, 1, 8, 'l'); d.r(5, 9, 6, 3, 'w'); d.p('b', 6, 10, 8, 10); d.p('l', 6, 8, 9, 13); d.p('C', 11, 8, 11, 12); }, FOOD);
add(G3, F2, 'mugicha', 'Trà lúa mạch (mugicha)', 'Barley tea (mugicha)', 'Uống lạnh mỗi mùa hè, không chứa caffeine nên trẻ em cũng uống được.',
  d => { d.r(2, 3, 7, 11, 'l'); d.r(3, 6, 5, 8, 'n'); d.r(3, 6, 5, 1, 't'); d.r(2, 2, 7, 1, 'a'); d.l(9, 5, 12, 6, 'l'); d.l(12, 6, 12, 10, 'l'); d.l(12, 10, 9, 11, 'l'); d.r(10, 8, 5, 6, 'l'); d.r(11, 9, 3, 5, 'n'); d.r(11, 10, 1, 1, 'c'); d.r(12, 12, 2, 1, 'c'); d.p('w', 4, 8, 6, 11); }, FOOD);

// ----- Món theo mùa và dịp lễ -----
add(G3, F3, 'zoni', 'Mochi và zoni (Tết)', 'Mochi and zoni (New Year)', 'Bánh dẻo làm từ gạo nếp giã nhuyễn; dịp Tết người ta giã bánh tại nhà và nấu canh zoni có mochi, hương vị khác nhau mỗi vùng.',
  d => { d.e(8, 8.5, 6.5, 6, 'r'); d.r(0, 0, 16, 7, '_'); d.r(2, 7, 12, 1, 'y'); d.r(3, 8, 10, 5, 'r'); d.e(8, 7.5, 5.5, 1.4, 'x'); d.e(8, 6, 3.2, 2.4, 'w'); d.p('W', 7, 7, 9, 5); d.e(4.5, 7, 1.4, 1, 'o'); d.p('g', 11, 7, 12, 6); d.r(7, 13, 2, 1, 'R'); }, FOOD);
add(G3, F3, 'osechi', 'Osechi', 'Osechi', 'Hộp đồ ăn Tết nhiều tầng; mỗi món mang một ý nghĩa, như đậu đen cho sức khỏe, tôm cho sống lâu.',
  d => { d.r(1, 11, 14, 4, 'd'); d.r(1, 11, 14, 1, 'r'); d.r(1, 7, 14, 4, 'd'); d.r(1, 7, 14, 1, 'r'); d.r(1, 3, 14, 4, 'd'); d.r(1, 3, 14, 1, 'y'); d.r(2, 4, 12, 3, 'e'); d.p('r', 3, 5, 4, 5, 9, 5, 12, 6); d.p('g', 6, 5, 7, 6, 11, 5); d.p('y', 8, 4, 10, 6); d.p('o', 5, 6, 13, 5); d.p('x', 3, 9, 7, 9, 11, 9); d.p('y', 2, 13, 5, 13, 8, 13, 11, 13); }, FOOD);
add(G3, F3, 'toshikoshi', 'Toshikoshi soba', 'Toshikoshi soba', 'Mì soba ăn vào đêm giao thừa, sợi mì dài tượng trưng cho cuộc sống dài lâu và việc "cắt" đi những điều cũ.',
  d => { d.e(8, 9, 6.5, 5.6, 'B'); d.r(0, 0, 16, 7, '_'); d.r(2, 7, 12, 1, 'w'); d.r(3, 8, 10, 4, 'B'); for (const x of [3, 5, 7, 9, 11]) d.l(x, 3, x + 1, 7, 'N'); d.e(8, 6, 4.8, 1.6, 'n'); d.e(11, 5.5, 2.2, 1.2, 'o'); d.p('y', 11, 5); d.p('G', 4, 5, 7, 5); d.r(5, 12, 6, 1, 'b'); }, FOOD);
add(G3, F3, 'hanami-dango', 'Sakura mochi và hanami dango', 'Sakura mochi and hanami dango', 'Bánh gạo nếp bọc lá anh đào muối, và xiên dango ba màu, cùng xuất hiện khi người ta ngồi ngắm hoa mùa xuân.',
  d => { d.l(2, 14, 11, 1, 't'); d.e(9.5, 3.2, 2, 2, 'p'); d.e(7.7, 6.4, 2, 2, 'w'); d.e(5.9, 9.6, 2, 2, 'g'); d.p('x', 9, 2); d.e(12, 11.5, 3, 2.4, 'G'); d.e(12, 11, 2.2, 1.7, 'p'); d.p('x', 11, 10); d.p('G', 10, 13, 14, 13); }, FOOD);
add(G3, F3, 'kashiwa', 'Kashiwa mochi', 'Kashiwa mochi', 'Bánh gạo nếp bọc lá sồi, ăn vào ngày 5 tháng 5 (Ngày Thiếu nhi) để cầu mong trẻ khỏe mạnh.',
  d => { d.e(8, 9, 7, 4.5, 'G'); d.e(8, 8, 6, 3.6, 'g'); d.e(8, 7.2, 4.6, 2.4, 'w'); d.l(2, 9, 14, 9, 'G'); d.l(8, 4, 8, 13, 'G'); d.p('W', 6, 6, 10, 6); d.p('G', 4, 7, 12, 7, 3, 11, 13, 11); }, FOOD);
add(G3, F3, 'unagi', 'Lươn nướng (unagi)', 'Grilled eel (unagi)', 'Người Nhật ăn vào ngày nóng nhất để lấy sức. Theo tương truyền, thói quen này bắt nguồn từ một mách nước của học giả Hiraga Gennai thời Edo.',
  d => { d.r(1, 6, 14, 8, 'd'); d.r(1, 6, 14, 1, 'r'); d.r(2, 7, 12, 6, 'w'); d.r(2, 7, 12, 1, 'W'); d.r(1, 8, 14, 4, 'N'); d.r(2, 8, 12, 3, 'O'); for (const x of [3, 5, 7, 9, 11, 13]) d.p('N', x, 9); d.p('y', 4, 9, 8, 10, 12, 9); d.r(2, 12, 12, 1, 'W'); d.p('G', 5, 14, 10, 14); }, FOOD);
add(G3, F3, 'kakigori', 'Đá bào (kakigori)', 'Shaved ice (kakigori)', 'Đá bào mịn phủ si-rô trái cây, matcha hoặc sữa đặc, món giải nhiệt quen thuộc mùa hè.',
  d => { d.tri(2, 2, 12, 8, 'w'); d.e(8, 5.5, 6.2, 4, 'w'); d.e(6, 5, 3, 2.6, 'p'); d.e(10.5, 5.5, 3, 2.6, 'c'); d.p('l', 5, 8, 10, 8, 8, 3); d.r(4, 9, 8, 5, 'l'); d.r(5, 10, 6, 3, 'c'); d.r(4, 13, 8, 1, 'a'); d.l(12, 0, 9, 7, 'r'); d.p('R', 12, 1); }, FOOD);
add(G3, F3, 'tsukimi', 'Tsukimi dango', 'Tsukimi dango', 'Viên bánh gạo trắng dâng lên trăng trong đêm rằm tháng tám âm lịch, cùng cỏ pampas.',
  d => { d.bg('B'); d.e(8, 5.5, 4.4, 4.4, 'y'); d.e(8, 5.5, 3.6, 3.6, 'u'); d.p('Y', 6, 4, 9, 6, 7, 7); d.r(3, 12, 10, 2, 'N'); for (const [x, y] of [[5, 11], [7, 11], [9, 11], [11, 11], [6, 9], [8, 9], [10, 9], [7, 7], [9, 7]]) d.e(x + 0.5, y + 0.5, 1.1, 1.1, 'w'); d.l(1, 14, 2, 6, 'h'); d.l(2, 6, 4, 4, 'h'); d.l(14, 14, 13, 6, 'h'); d.l(13, 6, 11, 4, 'h'); d.p('y', 1, 1, 14, 2); }, { scene: true });
add(G3, F3, 'wagashi', 'Wagashi', 'Wagashi', 'Bánh ngọt truyền thống làm từ đậu và gạo nếp, hình dáng thay đổi theo từng mùa, thường ăn kèm trà matcha.',
  d => { d.e(8, 12, 7, 3, 'G'); d.e(8, 11.5, 6.2, 2.4, 'g'); for (const [x, y] of [[8, 5.5], [5.3, 7.5], [10.7, 7.5], [6.4, 10.5], [9.6, 10.5]]) d.e(x, y, 2, 2, 'p'); d.e(8, 8, 2, 2, 'x'); d.p('y', 7, 8, 8, 8); d.p('G', 4, 14, 12, 14); }, FOOD);
add(G3, F3, 'xmas-chicken', 'Gà rán dịp Giáng sinh', 'Fried chicken at Christmas', 'Nhờ chiến dịch quảng cáo từ năm 1974, nhiều gia đình Nhật đặt gà rán từ trước cả tháng để ăn đêm 24 tháng 12.',
  d => { for (let x = 3; x < 13; x += 2) { d.r(x, 7, 1, 8, 'r'); d.r(x + 1, 7, 1, 8, 'w'); } d.r(3, 6, 10, 1, 'w'); d.e(5.5, 4, 2, 1.8, 'o'); d.e(8, 3.4, 2, 1.8, 'O'); d.e(10.5, 4, 2, 1.8, 'o'); d.p('y', 5, 3, 9, 3, 10, 3); d.r(5, 0, 6, 1, 'r'); d.p('w', 4, 1, 11, 1, 8, 0); d.r(5, 1, 6, 1, 'r'); }, FOOD);

// ----- Quy tắc bàn ăn -----
add(G3, F4, 'itadakimasu', 'Itadakimasu và gochisousama', 'Itadakimasu and gochisousama', 'Nói trước khi ăn để biết ơn món ăn và người nấu, và nói sau khi ăn để cảm ơn bữa cơm.',
  d => { d.bg('t'); d.r(1, 12, 14, 3, 'N'); d.e(8, 12, 4.5, 2.6, 'w'); d.r(0, 0, 16, 11, '_'); d.r(3, 11, 10, 1, 'w'); d.r(4, 12, 8, 2, 'w'); d.r(5, 11, 6, 1, 'w'); d.l(6, 3, 8, 8, 's'); d.l(10, 3, 8, 8, 'S'); d.r(7, 8, 2, 2, 's'); d.p('s', 6, 4, 10, 4, 7, 5, 9, 5, 7, 6, 9, 6); d.p('S', 8, 7); d.p('o', 2, 2, 14, 3); }, { scene: true });
add(G3, F4, 'dua', 'Phép dùng đũa', 'Chopstick manners', 'Không được cắm đũa thẳng đứng vào bát cơm vì giống nén hương cúng người mất, và cũng không chuyền thức ăn từ đũa này sang đũa kia.',
  d => { d.e(8, 11.5, 6, 3.6, 'w'); d.r(0, 0, 16, 10, '_'); d.r(2, 10, 12, 1, 'W'); d.r(3, 11, 10, 3, 'w'); d.r(4, 13, 8, 1, 'a'); d.e(8, 9.5, 5.5, 1.6, 'e'); d.r(7, 0, 1, 10, 'n'); d.r(9, 0, 1, 10, 'N'); d.l(1, 1, 4, 4, 'r'); d.l(4, 1, 1, 4, 'r'); }, { use: 'hold' });
add(G3, F4, 'hupmi', 'Húp mì thành tiếng', 'Slurping noodles', 'Húp mì thành tiếng là lịch sự, vì người ta tin nó giúp mì nguội bớt và cho chủ quán biết món ngon.',
  d => { d.e(7, 12, 6, 3.4, 'r'); d.r(0, 0, 16, 11, '_'); d.r(1, 11, 12, 1, 'w'); d.r(2, 12, 10, 3, 'r'); d.e(7, 10.5, 5, 1.2, 'y'); d.l(11, 0, 8, 10, 'n'); d.l(13, 1, 10, 10, 'n'); d.l(6, 4, 6, 10, 'y'); d.l(8, 3, 8, 10, 'y'); d.l(7, 5, 7, 10, 'e'); d.p('a', 1, 3, 2, 5, 1, 7, 13, 6, 14, 4, 13, 2); d.p('k', 2, 4, 1, 6); }, { use: 'hold' });
