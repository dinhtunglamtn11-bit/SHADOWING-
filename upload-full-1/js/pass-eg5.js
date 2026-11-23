import { add, SC, setCC } from './pass-kit.js';
setCC('eg');
// Ai Cập · Nhóm 5: Con vật, linh vật, tín ngưỡng, lịch sử và người nổi tiếng
const G = 5, A = 'Con vật và linh vật', B = 'Tín ngưỡng', C = 'Lịch sử', E = 'Người nổi tiếng';
const PET = { use: 'pet' }, H = { use: 'hold' };
const king = (d, bg, band, body, face = 's') => { d.bg(bg); d.e(8, 7, 3, 3.6, face); d.r(4, 2, 8, 3, band); d.r(3, 3, 2, 8, band); d.r(11, 3, 2, 8, band); d.r(4, 10, 8, 6, body); d.p('k', 7, 7, 9, 7); d.p('r', 8, 9); d.r(7, 11, 2, 1, 'y'); };
const person = (d, bg, hair, body) => { d.bg(bg); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 2, hair); d.r(4, 9, 8, 7, body); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); };

// ----- Con vật và linh vật -----
add(G, A, 'eg-cat', 'Mèo (nữ thần Bastet)', 'Cat (goddess Bastet)', 'Người Ai Cập cổ quý mèo vì chúng diệt chuột bảo vệ kho lúa, nữ thần Bastet mang đầu mèo; giết mèo từng bị coi là trọng tội.',
  d => { d.bg('u'); d.e(8, 11, 4, 4.4, 'k'); d.e(8, 5, 3, 3, 'k'); d.tri(5, 1, 2, 3, 'k'); d.tri(9, 1, 2, 3, 'k'); d.p('y', 7, 5, 9, 5); d.p('y', 8, 6); d.r(6, 9, 4, 1, 'y'); d.r(5, 14, 2, 2, 'k'); d.r(9, 14, 2, 2, 'k'); d.l(12, 13, 14, 9, 'k'); d.p('K', 7, 11, 9, 12); }, PET);
add(G, A, 'eg-crocodile', 'Cá sấu (thần Sobek)', 'Crocodile (god Sobek)', 'Loài vật đáng sợ của sông Nile, được thờ như vị thần của nước và sức mạnh, đặc biệt ở vùng Kom Ombo và Fayum.',
  d => { d.bg('C'); d.r(1, 8, 12, 3, 'G'); d.r(10, 7, 5, 2, 'G'); d.r(11, 9, 4, 1, 'G'); d.p('w', 12, 9, 14, 9); d.p('y', 11, 6); d.p('k', 11, 7); d.r(2, 11, 1, 2, 'g'); d.r(8, 11, 1, 2, 'g'); d.l(1, 9, 0, 11, 'G'); d.p('g', 3, 7, 5, 7, 7, 7, 9, 7); }, PET);
add(G, A, 'eg-falcon', 'Chim ưng (thần Horus)', 'Falcon (god Horus)', 'Thần bầu trời, biểu tượng của vương quyền; mỗi pharaoh được coi là hóa thân của Horus.',
  d => { d.bg('B'); d.e(8, 5, 3, 3, 'N'); d.p('y', 8, 6, 9, 7, 8, 7); d.p('k', 7, 4, 7, 5); d.l(8, 8, 8, 14, 'N'); d.e(8, 10, 3.4, 4, 'n'); d.l(5, 9, 2, 12, 'N'); d.l(11, 9, 14, 12, 'N'); d.r(7, 14, 2, 2, 'y'); d.p('y', 6, 3, 10, 3); d.p('r', 8, 2); }, PET);
add(G, A, 'eg-jackal', 'Chó rừng (thần Anubis)', 'Jackal (god Anubis)', 'Thần canh giữ nghĩa địa và ướp xác, đầu chó rừng thân người.',
  d => { d.bg('B'); d.e(8, 6, 3, 3, 'k'); d.tri(4, 0, 3, 5, 'k'); d.tri(9, 0, 3, 5, 'k'); d.r(7, 8, 2, 1, 'K'); d.p('y', 7, 6, 9, 6); d.r(4, 9, 8, 7, 'w'); d.r(4, 9, 8, 1, 'y'); d.p('y', 8, 11, 7, 12, 9, 12); d.r(7, 8, 2, 1, 'k'); }, PET);
add(G, A, 'eg-scarabbeetle', 'Bọ hung (scarab)', 'Scarab beetle', 'Loài bọ lăn viên phân được xem là hình ảnh mặt trời mọc lại mỗi sáng, nên trở thành bùa hộ mệnh.',
  d => { d.bg('u'); d.e(8, 9, 4, 3.6, 'k'); d.e(8, 9, 3, 2.8, 'B'); d.e(8, 5.6, 2, 1.6, 'k'); d.l(8, 6, 8, 13, 'k'); d.l(4, 8, 1, 6, 'k'); d.l(12, 8, 15, 6, 'k'); d.l(4, 11, 1, 13, 'k'); d.l(12, 11, 15, 13, 'k'); d.e(8, 2, 1.6, 1.6, 'o'); d.p('y', 7, 1, 9, 1); }, PET);
add(G, A, 'eg-ibis', 'Chim ibis (thần Thoth)', 'Ibis (god Thoth)', 'Thần trí tuệ và chữ viết, nhiều xác ướp chim ibis được tìm thấy trong các hầm mộ.',
  d => { d.bg('c'); d.e(7, 9, 4, 3, 'w'); d.e(11, 5, 2, 2, 'w'); d.l(13, 4, 15, 8, 'k'); d.l(14, 4, 15, 7, 'k'); d.p('k', 12, 4); d.r(3, 9, 3, 2, 'k'); d.l(6, 12, 6, 15, 'k'); d.l(8, 12, 8, 15, 'k'); d.p('k', 3, 7, 4, 8); d.l(10, 7, 9, 9, 'w'); }, PET);
add(G, A, 'eg-apis', 'Bò thiêng Apis', 'Sacred bull Apis', 'Con bò đực được chọn làm hóa thân của thần Ptah, khi chết được ướp xác long trọng.',
  d => { d.bg('u'); d.e(8, 9, 5.6, 4, 'k'); d.e(12, 6, 2.6, 2.4, 'k'); d.l(10, 3, 9, 1, 'w'); d.l(14, 3, 15, 1, 'w'); d.e(8, 4, 2.4, 1.2, 'y'); d.e(8, 4, 1.4, 1, 'o'); d.p('w', 12, 7, 5, 8); d.r(4, 12, 1, 3, 'k'); d.r(10, 12, 1, 3, 'k'); d.p('y', 11, 5); d.p('K', 6, 8, 9, 10); }, PET);
add(G, A, 'eg-hippo', 'Hà mã và nữ thần Taweret', 'Hippo and goddess Taweret', 'Nữ thần hà mã bảo vệ phụ nữ sinh nở, dù ngoài đời hà mã là loài nguy hiểm.',
  d => { d.bg('C'); d.e(8, 10, 6, 4, 'v'); d.e(12, 7, 3, 2.6, 'V'); d.e(4, 7, 1.6, 1.6, 'V'); d.p('w', 13, 9, 14, 9); d.p('k', 11, 6, 12, 8); d.r(3, 13, 2, 2, 'v'); d.r(11, 13, 2, 2, 'v'); d.p('P', 7, 9, 9, 10); d.p('c', 1, 13, 14, 14); }, PET);
add(G, A, 'eg-camel', 'Lạc đà', 'Camel', 'Phương tiện của người Bedouin và của các chuyến đi dạo quanh khu kim tự tháp.',
  d => { d.bg('u'); d.r(3, 7, 9, 3, 'n'); d.e(5, 6, 1.6, 1.6, 'N'); d.e(9, 6, 1.6, 1.6, 'N'); d.l(11, 7, 13, 3, 'n'); d.l(12, 7, 14, 3, 'n'); d.e(14, 3, 1.8, 1.2, 'n'); d.p('k', 14, 2); for (const x of [3, 5, 9, 11]) d.r(x, 10, 1, 4, 'N'); d.p('r', 6, 5, 7, 5); d.r(0, 14, 16, 2, 'o'); }, PET);
add(G, A, 'eg-arabhorse', 'Ngựa Ả Rập', 'Arabian horse', 'Giống ngựa thanh mảnh nổi tiếng, nuôi nhiều ở các trại ngựa gần Cairo.',
  d => { d.bg('u'); d.e(7, 9, 5, 3, 'w'); d.e(12, 6, 2.2, 2.6, 'w'); d.p('a', 13, 4, 14, 5, 12, 3); d.l(12, 3, 9, 6, 'e'); d.p('k', 12, 6); d.l(2, 8, 0, 12, 'e'); d.r(4, 11, 1, 4, 'e'); d.r(10, 11, 1, 4, 'e'); d.r(0, 14, 16, 2, 'o'); d.p('r', 9, 7); }, PET);
add(G, A, 'eg-eagle', 'Đại bàng Saladin (Eagle of Saladin)', 'Eagle of Saladin', 'Hình đại bàng vàng trên quốc huy Ai Cập, gắn với vị lãnh tụ thế kỷ mười hai.',
  d => { d.bg('r'); d.e(8, 4, 2.4, 2.4, 'y'); d.p('o', 10, 5, 11, 5); d.p('k', 7, 3); d.r(5, 7, 6, 6, 'Y'); d.l(5, 7, 1, 4, 'y'); d.l(11, 7, 15, 4, 'y'); d.l(5, 9, 1, 8, 'y'); d.l(11, 9, 15, 8, 'y'); d.p('w', 7, 9, 9, 9); d.p('b', 7, 11, 9, 11); d.p('k', 8, 13); }, PET);
add(G, A, 'eg-papyrusplant', 'Sen xanh và cói papyrus', 'Blue lotus and papyrus plant', 'Hai loài cây biểu tượng của Thượng và Hạ Ai Cập, xuất hiện trong nghệ thuật cổ đại.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'C'); d.l(4, 14, 4, 5, 'G'); d.p('g', 2, 3, 3, 2, 4, 1, 5, 2, 6, 3, 4, 3); d.l(11, 14, 11, 8, 'G'); d.e(11, 7, 2.6, 2.4, 'b'); d.e(11, 7, 1.2, 1.8, 'l'); d.p('y', 11, 8); d.p('B', 9, 7, 13, 7); }, SC);

// ----- Tín ngưỡng -----
add(G, B, 'eg-islam', 'Hồi giáo dòng Sunni', 'Sunni Islam', 'Tôn giáo của đa số người dân, tiếng cầu nguyện gọi từ các tháp nhà thờ vang lên năm lần mỗi ngày.',
  d => { d.bg('G'); d.e(8, 6, 4.6, 4.6, 'y'); d.e(10, 6, 3.6, 3.6, 'G'); d.p('y', 12, 6, 6, 3); d.r(2, 11, 3, 5, 'W'); d.r(11, 11, 3, 5, 'W'); d.p('y', 3, 10, 12, 10); d.r(5, 12, 6, 4, 'e'); d.p('k', 7, 13, 8, 13); }, SC);
add(G, B, 'eg-copt', 'Kitô giáo Copt', 'Coptic Christianity', 'Cộng đồng Kitô hữu Chính thống lâu đời nhất Trung Đông, tin rằng thánh Mark đã đến Alexandria truyền đạo từ thế kỷ thứ nhất.',
  d => { d.bg('A'); d.r(7, 2, 2, 12, 'y'); d.r(4, 5, 8, 2, 'y'); d.p('u', 8, 4, 5, 2, 11, 2, 5, 13, 11, 13); d.p('r', 8, 8); d.r(5, 14, 6, 1, 'Y'); d.p('w', 2, 3, 13, 4); }, SC);
add(G, B, 'eg-alazharuniv', 'Al-Azhar', 'Al-Azhar', 'Trung tâm học thuật Hồi giáo Sunni nổi tiếng, có tiếng nói lớn về giáo lý đối với nhiều nước.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'g'); d.r(3, 8, 10, 5, 'e'); d.e(8, 7, 3, 2.4, 'a'); d.r(1, 3, 2, 10, 'W'); d.r(13, 3, 2, 10, 'W'); d.p('y', 2, 2, 14, 2); d.r(6, 10, 4, 3, 'k'); d.p('y', 8, 4); d.r(7, 1, 2, 3, 'y'); }, SC);
add(G, B, 'eg-sufism', 'Các dòng Sufi', 'Sufi orders', 'Nhánh thần bí của Hồi giáo, có các buổi hát ca ngợi và múa xoay (dhikr).',
  d => { d.bg('B'); d.e(8, 3, 1.8, 1.8, 's'); d.r(6, 1, 4, 1, 'r'); d.r(7, 4, 2, 3, 'w'); d.e(8, 10, 6.4, 3, 'w'); d.e(8, 9, 5, 2.2, 'l'); d.l(7, 5, 3, 3, 's'); d.l(9, 5, 13, 3, 's'); d.p('y', 3, 12, 12, 12); }, SC);
add(G, B, 'eg-ra', 'Thần Ra và đạo Mặt Trời', 'Ra and the sun cult', 'Vị thần mặt trời của Ai Cập cổ, đi thuyền qua bầu trời ban ngày và qua thế giới bên kia ban đêm.',
  d => { d.bg('o'); d.e(8, 5, 4.4, 4.4, 'r'); d.e(8, 5, 3.4, 3.4, 'y'); d.r(0, 11, 16, 5, 'C'); d.e(8, 12, 6, 2, 'N'); d.r(2, 11, 12, 1, 'y'); d.l(5, 11, 5, 8, 'N'); d.p('y', 5, 7); d.p('k', 8, 5); }, SC);
add(G, B, 'eg-osiris', 'Osiris, Isis và Horus', 'Osiris, Isis and Horus', 'Bộ ba thần chính của truyền thuyết chết đi sống lại, giải thích vì sao pharaoh được coi là bất tử.',
  d => { d.bg('B'); d.e(4, 4, 1.4, 1.6, 's'); d.r(3, 6, 3, 8, 'w'); d.r(3, 2, 3, 2, 'G'); d.e(8, 4, 1.4, 1.6, 's'); d.r(7, 6, 3, 8, 'b'); d.p('y', 8, 2, 8, 1); d.e(12, 5, 1.4, 1.6, 'N'); d.r(11, 7, 3, 7, 'y'); d.p('y', 11, 3, 13, 3); d.p('k', 4, 4, 8, 4, 12, 5); }, SC);
add(G, B, 'eg-maat', 'Nữ thần Ma\'at', 'Goddess Ma\'at', 'Nữ thần của chân lý và trật tự; trong phiên xử ở thế giới bên kia, trái tim người chết được đặt cân với chiếc lông của bà.',
  d => { d.bg('e'); d.l(8, 2, 8, 14, 'y'); d.l(2, 4, 14, 4, 'y'); d.r(1, 5, 4, 1, 'Y'); d.r(11, 5, 4, 1, 'Y'); d.e(3, 7, 1.8, 1.8, 'r'); d.p('R', 3, 7); d.r(11, 6, 3, 1, 'w'); d.p('w', 12, 4, 13, 5); d.l(12, 5, 12, 8, 'w'); d.r(6, 14, 4, 1, 'Y'); }, SC);
add(G, B, 'eg-mummy', 'Ướp xác và Sách Người Chết', 'Mummification and the Book of the Dead', 'Nghi thức giữ thân thể nguyên vẹn cùng những bài chú giúp linh hồn qua được các thử thách ở cõi âm.',
  d => { d.bg('N'); d.e(8, 4, 2.6, 2.8, 'e'); d.r(5, 1, 6, 2, 'b'); d.r(5, 7, 6, 8, 'e'); for (let y = 7; y < 15; y += 2) d.r(5, y, 6, 1, 'W'); d.p('k', 7, 4, 9, 4); d.r(5, 5, 6, 1, 'W'); d.p('y', 8, 6); d.p('o', 2, 9, 13, 10); }, SC);
add(G, B, 'eg-sinaipilgrim', 'Hành hương Sinai và núi Sinai', 'Pilgrimage to Mount Sinai', 'Nơi truyền thống Kitô giáo và Hồi giáo cùng kính trọng vì gắn với ngôn sứ Moses.',
  d => { d.bg('c'); d.tri(0, 4, 16, 12, 'N'); d.tri(4, 2, 8, 8, 'n'); d.tri(6, 2, 4, 3, 'o'); d.r(0, 13, 16, 3, 'u'); d.p('w', 3, 4, 13, 3); d.p('y', 8, 1); d.l(8, 6, 8, 12, 'y'); d.p('o', 6, 9, 10, 9); }, SC);
add(G, B, 'eg-otherfaiths', 'Các cộng đồng tôn giáo khác', 'Other religious communities', 'Có thêm các nhóm Tin Lành, Công giáo và một cộng đồng Do Thái rất nhỏ so với trước đây.',
  d => { d.bg('e'); d.r(1, 6, 4, 9, 'R'); d.r(2, 3, 2, 3, 'R'); d.tri(1, 1, 4, 2, 'r'); d.r(6, 7, 4, 8, 'W'); d.tri(5, 3, 6, 4, 'a'); d.r(11, 8, 4, 7, 'u'); d.e(13, 7, 2, 2, 'y'); d.p('k', 2, 9, 7, 10, 12, 11); d.r(2, 12, 2, 3, 'N'); }, SC);

// ----- Lịch sử -----
add(G, C, 'eg-narmer', 'Thống nhất Ai Cập (khoảng 3100 trước Công nguyên)', 'Unification of Egypt (c. 3100 BCE)', 'Truyền thống ghi vua Narmer hợp nhất Thượng và Hạ Ai Cập thành một vương quốc.',
  d => { d.bg('u'); d.r(5, 3, 6, 3, 'w'); d.r(6, 0, 4, 3, 'w'); d.p('r', 8, 1); d.r(3, 9, 10, 2, 'r'); d.r(5, 5, 6, 4, 'w'); d.e(8, 6, 1.6, 1.6, 's'); d.r(4, 11, 8, 4, 'y'); d.p('k', 7, 6, 9, 6); d.p('G', 1, 4, 14, 4, 1, 12, 14, 12); }, SC);
add(G, C, 'eg-oldkingdom', 'Cổ Vương quốc và thời xây kim tự tháp', 'Old Kingdom and the pyramid builders', 'Các vua đời thứ tư xây nhóm kim tự tháp Giza, thời kỳ quyền lực trung ương rất mạnh.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'u'); d.tri(1, 4, 14, 9, 't'); d.tri(1, 4, 7, 9, 'u'); d.tri(10, 8, 6, 5, 'Y'); d.r(0, 13, 16, 3, 'o'); d.p('y', 8, 3); d.e(14, 2, 1.4, 1.4, 'y'); d.p('k', 7, 10, 8, 10); }, SC);
add(G, C, 'eg-middlekingdom', 'Trung Vương quốc', 'Middle Kingdom', 'Thời kỳ ổn định và phát triển văn học, sau những năm rối ren.',
  d => { d.bg('u'); d.r(2, 2, 12, 12, 'e'); d.r(2, 2, 12, 1, 'o'); d.l(4, 5, 11, 5, 'k'); d.l(4, 7, 9, 7, 'k'); d.l(4, 9, 11, 9, 'k'); d.l(4, 11, 7, 11, 'k'); d.p('r', 12, 5, 11, 12); d.r(2, 13, 12, 1, 'o'); }, SC);
add(G, C, 'eg-newkingdom', 'Tân Vương quốc', 'New Kingdom', 'Thời của Hatshepsut, Akhenaten, Tutankhamun và Ramesses II, đế quốc Ai Cập mở rộng rất xa.',
  d => { d.bg('B'); d.e(8, 6, 3, 3.4, 'y'); d.r(5, 2, 6, 2, 'b'); d.r(4, 9, 8, 7, 'y'); d.p('k', 7, 6, 9, 6); d.p('r', 8, 8); d.p('b', 4, 3, 11, 3); d.p('w', 2, 2, 13, 3); d.r(6, 10, 4, 1, 'b'); }, SC);
add(G, C, 'eg-ptolemy', 'Alexander Đại đế và triều Ptolemy', 'Alexander the Great and the Ptolemies', 'Năm 332 trước Công nguyên Alexander chinh phục Ai Cập, tướng Ptolemy sau đó lập triều đại cai trị gần ba thế kỷ.',
  d => { d.bg('A'); d.e(8, 7, 3, 3.4, 's'); d.r(5, 3, 6, 3, 'u'); d.p('u', 4, 5, 4, 7, 12, 5, 12, 7); d.r(4, 10, 8, 6, 'r'); d.r(5, 2, 6, 1, 'y'); d.p('k', 7, 7, 9, 7); d.p('y', 8, 10, 7, 12, 9, 12); }, SC);
add(G, C, 'eg-roman', 'Cleopatra VII và La Mã', 'Cleopatra VII and Rome', 'Nữ vương cuối cùng của triều Ptolemy, sau khi bà mất năm 30 trước Công nguyên Ai Cập trở thành tỉnh của La Mã.',
  d => { d.bg('v'); d.e(8, 7, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'k'); d.p('k', 4, 4, 4, 8, 12, 4, 12, 8); d.r(5, 1, 6, 1, 'y'); d.r(4, 10, 8, 6, 'w'); d.r(4, 10, 8, 1, 'y'); d.p('y', 8, 0); d.p('k', 7, 7, 9, 7); d.p('r', 8, 9); }, SC);
add(G, C, 'eg-islamization', 'Hồi giáo hóa (năm 641)', 'The Arab conquest (641)', 'Quân Ả Rập do Amr ibn al-As chỉ huy chiếm Ai Cập, ngôn ngữ và tôn giáo thay đổi dần theo thời gian.',
  d => { d.bg('G'); d.r(0, 13, 16, 3, 'u'); d.l(3, 14, 3, 3, 'N'); d.r(3, 3, 5, 3, 'w'); d.p('G', 5, 4); d.l(12, 14, 12, 4, 'N'); d.r(12, 4, 3, 3, 'y'); d.e(8, 11, 3, 2, 'n'); d.p('w', 8, 9); d.l(5, 13, 11, 13, 'a'); }, SC);
add(G, C, 'eg-fatimid', 'Cairo ra đời (năm 969)', 'Founding of Cairo (969)', 'Triều Fatimid lập thành phố mới và đặt tên Al-Qahira, từ đó Cairo thành thủ đô.',
  d => { d.bg('c'); d.r(0, 13, 16, 3, 'u'); d.r(2, 6, 12, 7, 'e'); d.r(2, 5, 12, 1, 'W'); d.r(6, 8, 4, 5, 'k'); d.e(8, 8, 2, 2, 'k'); d.r(1, 2, 2, 11, 'W'); d.r(13, 2, 2, 11, 'W'); d.p('y', 2, 1, 14, 1); d.p('g', 4, 7, 11, 7); }, SC);
add(G, C, 'eg-saladin', 'Saladin và triều Ayyubid', 'Saladin and the Ayyubid dynasty', 'Saladin lên nắm quyền ở Ai Cập năm 1171 rồi chống quân Thập tự chinh.',
  d => { d.bg('G'); d.e(8, 6, 3, 3.4, 's'); d.r(4, 1, 8, 4, 'w'); d.r(4, 4, 8, 1, 'y'); d.r(4, 9, 8, 7, 'g'); d.p('k', 7, 6, 9, 6); d.r(7, 8, 2, 2, 'k'); d.l(14, 14, 14, 2, 'a'); d.l(13, 2, 15, 2, 'a'); d.p('y', 8, 11); }, SC);
add(G, C, 'eg-mamluk', 'Triều Mamluk và Ottoman', 'Mamluks and Ottomans', 'Quân nhân gốc nô lệ cai trị nhiều thế kỷ, rồi Ai Cập bị Đế quốc Ottoman sáp nhập năm 1517.',
  d => { d.bg('r'); d.e(8, 6, 3, 3.4, 's'); d.r(4, 1, 8, 4, 'w'); d.e(8, 2, 3, 1.6, 'w'); d.r(4, 9, 8, 7, 'k'); d.r(4, 9, 8, 1, 'y'); d.p('k', 7, 6, 9, 6); d.e(8, 6, 3, 3.4, 's'); d.r(4, 1, 8, 3, 'w'); d.p('y', 8, 0); d.p('w', 5, 11, 10, 11); }, SC);
add(G, C, 'eg-napoleon', 'Napoleon và Muhammad Ali', 'Napoleon and Muhammad Ali', 'Pháp đưa quân đến năm 1798, ít lâu sau Muhammad Ali lên cầm quyền và hiện đại hóa đất nước.',
  d => { d.bg('b'); d.e(5, 6, 2.4, 2.6, 's'); d.r(3, 2, 5, 2, 'k'); d.r(2, 9, 6, 7, 'B'); d.e(11, 6, 2.4, 2.6, 's'); d.r(9, 2, 5, 3, 'r'); d.r(9, 9, 6, 7, 'g'); d.p('k', 4, 6, 6, 6, 10, 6, 12, 6); d.p('y', 4, 10, 11, 10); d.p('w', 3, 12, 12, 12); }, SC);
add(G, C, 'eg-suezcrisis', 'Kênh đào Suez và thời thuộc Anh', 'The Suez Canal and British rule', 'Kênh mở năm 1869, năm 1882 Anh chiếm đóng và duy trì ảnh hưởng lớn đến giữa thế kỷ hai mươi.',
  d => { d.bg('u'); d.r(0, 8, 16, 3, 'C'); d.r(5, 4, 6, 4, 'a'); d.r(7, 2, 2, 2, 'r'); d.r(4, 7, 8, 2, 'k'); d.l(14, 5, 14, 1, 'N'); d.r(11, 1, 3, 2, 'b'); d.p('r', 12, 1); d.p('w', 12, 2); d.p('Y', 1, 13, 14, 13); }, SC);
add(G, C, 'eg-1952', 'Độc lập và Cách mạng 1952', 'Independence and the 1952 Revolution', 'Ai Cập được Anh công nhận độc lập năm 1922, rồi nhóm Sĩ quan Tự do lật đổ nhà vua năm 1952.',
  d => { d.bg('r'); d.r(0, 5, 16, 5, 'w'); d.r(0, 10, 16, 6, 'k'); d.e(8, 7.5, 1.8, 1.8, 'y'); d.p('G', 8, 7); d.p('Y', 7, 8, 9, 8); d.p('w', 3, 12, 12, 13); }, SC);
add(G, C, 'eg-nasser1956', 'Nasser và quốc hữu hóa kênh Suez (1956)', 'Nasser and the Suez nationalisation (1956)', 'Sự kiện gây ra cuộc khủng hoảng Suez và nâng cao uy tín của Nasser ở thế giới Ả Rập.',
  d => { d.bg('G'); d.r(0, 9, 16, 3, 'C'); d.r(0, 12, 16, 4, 'u'); d.e(8, 5, 2.4, 2.6, 's'); d.r(6, 2, 4, 2, 'k'); d.r(5, 7, 6, 3, 'g'); d.p('k', 7, 5, 9, 5); d.l(2, 4, 2, 9, 'a'); d.p('r', 2, 3); d.p('w', 3, 14, 12, 14); }, SC);
add(G, C, 'eg-campdavid', 'Hiệp định Camp David', 'Camp David Accords', 'Năm 1979 Ai Cập ký hiệp ước hòa bình với Israel, nước Ả Rập đầu tiên làm vậy.',
  d => { d.bg('c'); d.r(0, 12, 16, 4, 'g'); d.r(2, 8, 12, 4, 'W'); d.r(2, 7, 12, 1, 'a'); d.r(4, 5, 8, 2, 'w'); d.p('y', 8, 4); d.e(5, 10, 1.4, 1.4, 's'); d.e(11, 10, 1.4, 1.4, 's'); d.r(5, 11, 1, 1, 'k'); d.p('b', 2, 14, 13, 14); d.l(5, 13, 11, 13, 'e'); }, SC);
add(G, C, 'eg-2011', 'Cách mạng 2011', 'The 2011 Revolution', 'Biểu tình lớn ở quảng trường Tahrir dẫn đến việc Tổng thống Mubarak từ chức.',
  d => { d.bg('r'); d.r(0, 5, 16, 5, 'w'); d.r(0, 10, 16, 6, 'k'); for (let x = 1; x < 15; x += 3) { d.e(x + 1, 11, 1, 1, 's'); d.r(x, 12, 2, 3, 'w'); } d.l(13, 8, 13, 2, 'N'); d.r(10, 2, 3, 2, 'r'); d.p('k', 11, 3); }, SC);

// ----- Người nổi tiếng -----
add(G, E, 'eg-khufu', 'Khufu (Cheops)', 'Khufu (Cheops)', 'Vua cho xây Đại Kim tự tháp ở Giza.', d => king(d, 'c', 'w', 'y'), SC);
add(G, E, 'eg-imhotep', 'Imhotep', 'Imhotep', 'Kiến trúc sư và quan đại thần của vua Djoser, người gắn với kim tự tháp bậc thang đầu tiên.', d => { person(d, 'u', 'k', 'w'); d.r(5, 2, 6, 2, 'k'); d.r(11, 10, 3, 5, 'e'); d.r(11, 10, 3, 1, 'o'); }, SC);
add(G, E, 'eg-hatshepsutq', 'Hatshepsut', 'Hatshepsut', 'Nữ pharaoh cai trị hòa bình và cho xây ngôi đền nổi tiếng bên bờ tây Luxor.', d => { king(d, 'p', 'b', 'w'); d.p('Y', 7, 9, 9, 9); d.r(7, 13, 2, 3, 'k'); }, SC);
add(G, E, 'eg-nefertiti', 'Akhenaten và Nefertiti', 'Akhenaten and Nefertiti', 'Cặp vua và hoàng hậu cố đẩy mạnh việc thờ thần mặt trời Aten, tượng bán thân Nefertiti là một trong những tác phẩm nổi tiếng nhất.', d => { d.bg('B'); d.e(8, 8, 3, 4, 's'); d.r(5, 1, 6, 5, 'b'); d.r(4, 3, 8, 1, 'y'); d.p('y', 5, 4, 10, 4); d.p('k', 7, 8, 9, 8); d.p('r', 8, 10); d.r(6, 12, 4, 4, 'y'); d.p('y', 3, 14, 13, 14); }, SC);
add(G, E, 'eg-tutankhamun', 'Tutankhamun', 'Tutankhamun', 'Vị vua trẻ mà lăng mộ gần như còn nguyên vẹn được Howard Carter tìm thấy năm 1922.', d => king(d, 'B', 'b', 'y', 'Y'), SC);
add(G, E, 'eg-ramesses', 'Ramesses II', 'Ramesses II', 'Pharaoh trị vì khoảng sáu mươi bảy năm, nổi tiếng với Abu Simbel và trận Kadesh.', d => { king(d, 'u', 'b', 'w'); d.p('r', 8, 1, 7, 2, 9, 2); d.l(14, 15, 14, 8, 'y'); }, SC);
add(G, E, 'eg-cleopatra', 'Cleopatra VII', 'Cleopatra VII', 'Nữ vương cuối cùng của Ai Cập thời Hy Lạp, thông minh và nói được nhiều ngôn ngữ.', d => { d.bg('v'); d.e(8, 7, 3, 3.6, 's'); d.r(5, 2, 6, 3, 'k'); d.p('k', 4, 4, 4, 9, 12, 4, 12, 9); d.r(5, 1, 6, 1, 'y'); d.p('y', 8, 0, 6, 0, 10, 0); d.r(4, 10, 8, 6, 'w'); d.r(4, 10, 8, 1, 'y'); d.p('k', 7, 7, 9, 7); d.p('b', 6, 6, 10, 6); d.p('r', 8, 9); }, SC);
add(G, E, 'eg-saladinp', 'Saladin', 'Saladin', 'Lãnh tụ gốc Kurd lập triều Ayyubid ở Ai Cập, được kính trọng ở cả phương Đông lẫn phương Tây.', d => person(d, 'G', 'w', 'g'), SC);
add(G, E, 'eg-muhammadali', 'Muhammad Ali Pasha', 'Muhammad Ali Pasha', 'Người được coi là cha đẻ của Ai Cập hiện đại, cải cách quân đội, nông nghiệp và giáo dục.', d => { person(d, 'r', 'w', 'k'); d.r(4, 1, 8, 3, 'r'); d.r(5, 0, 6, 1, 'r'); d.p('w', 5, 7, 6, 8, 10, 7, 9, 8); }, SC);
add(G, E, 'eg-nasserp', 'Gamal Abdel Nasser', 'Gamal Abdel Nasser', 'Tổng thống nổi bật của thế kỷ hai mươi, nhà lãnh đạo phong trào dân tộc Ả Rập.', d => person(d, 'g', 'k', 'G'), SC);
add(G, E, 'eg-sadat', 'Anwar Sadat', 'Anwar Sadat', 'Tổng thống ký hòa ước với Israel và nhận giải Nobel Hòa bình năm 1978 cùng Menachem Begin.', d => { person(d, 'c', 'k', 'N'); d.r(5, 8, 6, 1, 'k'); d.r(7, 12, 2, 4, 'w'); d.p('r', 8, 12); }, SC);
add(G, E, 'eg-mahfouzp', 'Naguib Mahfouz', 'Naguib Mahfouz', 'Nhà văn đoạt giải Nobel Văn học năm 1988.', d => { person(d, 'u', 'w', 'n'); d.r(5, 5, 2, 1, 'a'); d.r(9, 5, 2, 1, 'a'); d.r(11, 10, 3, 4, 'e'); }, SC);
add(G, E, 'eg-zewail', 'Ahmed Zewail', 'Ahmed Zewail', 'Nhà hóa học đoạt giải Nobel Hóa học năm 1999 nhờ nghiên cứu phản ứng hóa học trong những khoảnh khắc cực ngắn.', d => { person(d, 'l', 'k', 'w'); d.r(11, 10, 3, 5, 'c'); d.r(11, 10, 3, 1, 'w'); d.p('g', 12, 12); }, SC);
add(G, E, 'eg-baradei', 'Mohamed ElBaradei', 'Mohamed ElBaradei', 'Người đứng đầu Cơ quan Năng lượng Nguyên tử Quốc tế (IAEA, International Atomic Energy Agency), nhận giải Nobel Hòa bình năm 2005.', d => { person(d, 'b', 'w', 'd'); d.r(7, 12, 2, 4, 'w'); d.p('r', 8, 12); d.e(13, 3, 1.8, 1.8, 'c'); d.p('w', 13, 3); }, SC);
add(G, E, 'eg-ummk', 'Umm Kulthum', 'Umm Kulthum', 'Nữ ca sĩ huyền thoại của thế giới Ả Rập.', d => { d.bg('k'); d.e(8, 6, 3, 3.4, 's'); d.r(5, 2, 6, 3, 'N'); d.r(4, 5, 8, 1, 'k'); d.r(4, 9, 8, 7, 'p'); d.p('k', 6, 6, 9, 6); d.r(11, 10, 3, 4, 'w'); d.p('y', 8, 1, 4, 11); d.p('r', 8, 8); }, SC);
add(G, E, 'eg-sharif', 'Omar Sharif', 'Omar Sharif', 'Diễn viên Ai Cập nổi tiếng thế giới với vai trong phim Lawrence xứ Ả Rập và Bác sĩ Zhivago.', d => { person(d, 'o', 'k', 'd'); d.r(5, 8, 6, 1, 'k'); d.r(7, 9, 2, 3, 'w'); d.p('r', 8, 10); d.r(3, 14, 10, 1, 'y'); }, SC);
add(G, E, 'eg-salah', 'Mohamed Salah', 'Mohamed Salah', 'Cầu thủ bóng đá nổi tiếng quốc tế, được ngưỡng mộ như người hùng ở Ai Cập.', d => { person(d, 'g', 'k', 'r'); d.r(5, 8, 6, 1, 'k'); d.e(8, 14, 2, 2, 'w'); d.p('k', 8, 14); d.p('w', 6, 11, 9, 11); }, SC);
