import { M_TOP, M_DRESS, M_KIM, M_HAK } from './pass-kit.js';
import { addOv, addOutfit, c, two } from './pass-sh1.js';
// Cửa hàng trang trí · đợt 3: thêm 14 món eo / đuôi, 14 đôi giày dép và 22 trang phục
const k = '#2b2b3a', w = '#ffffff', r = '#e8452c', R = '#a8281a', y = '#ffd84d', Y = '#c9a227', g = '#5fb85a', G = '#2f7d3a', b = '#4a7be0', B = '#23306b', p = '#ff8fc8', P = '#c94a8a', n = '#8a5a2a', N = '#5a3a1a', o = '#ff9f43', v = '#7a3fc0', a = '#9aa4c4', cy = '#8fd3ff', t = '#e6c892';
const W = (id, vi, en, note, y0, pal, rows, price) => addOv('Eo và đuôi', 'sh-n-' + id, vi, en, note, 'waist', y0, pal, rows, price);
const S = (id, vi, en, note, y0, pal, rows, price) => addOv('Giày dép', 'sh-n-' + id, vi, en, note, 'feet', y0, pal, rows, price);

// ----- Eo và đuôi (14) -----
W('foxtail', 'Đuôi cáo bông', 'Fox tail', 'Đuôi to chóp trắng.', 13, { o, w }, ['..............ww', '.............oww', '............ooo.', '............oo..', '...........oo...'], 130);
W('peacock', 'Đuôi công xòe', 'Peacock tail', 'Xòe hết cỡ khi được điểm cao.', 12, { g, b, y }, ['.g............g.', 'gbg..........gbg', 'gyg..........gyg', '.gg..........gg.', '..gg........gg..'], 200);
W('butterfly', 'Cánh bướm', 'Butterfly wings', 'Nhẹ tênh bay qua bài mới.', 11, { p, v, y }, ['pp............pp', 'pvp..........pvp', 'pyp..........pyp', '.pp..........pp.', '.vv..........vv.'], 180);
W('batwings', 'Cánh dơi đêm', 'Bat wings', 'Cho những tối học khuya.', 11, { v: '#4a2680' }, ['v..............v', 'vv............vv', 'vvv..........vvv', 'v.v..........v.v'], 150);
W('jetpack', 'Ba lô phản lực', 'Jetpack', 'Vút tới mục tiêu ngày.', 11, { a, r, o, y }, ['.aa..........aa.', '.ar..........ra.', '.aa..........aa.', '.aa..........aa.', '.oo..........oo.', '.y............y.'], 230);
W('backpack', 'Ba lô đi học', 'School backpack', 'Đầy sách vở bên trong.', 11, { r, R, y }, ['.rr..........rr.', 'rrr..........rrr', 'ryr..........ryr', 'RRR..........RRR'], 110);
W('cape', 'Áo choàng sau lưng', 'Flying cape', 'Phấp phới như người hùng.', 11, { r, R }, ['..r..........r..', '.rr..........rr.', '.rr..........rr.', 'rrr..........rrr', 'rrr..........rrr', 'RRR..........RRR'], 120);
W('hulahoop', 'Vòng lắc eo', 'Hula hoop', 'Vừa lắc vừa đọc từ mới.', 15, { p, y }, ['pypypypypypypypy', 'y..............p'], 60);
W('swordbelt', 'Đai đeo kiếm', 'Sword belt', 'Chuôi kiếm vàng bên hông.', 13, { y, a, n }, ['.y..............', 'yyy.............', '.a..............', '.annnnnnnnnnnn..', '.a..............', '.a..............'], 140);
W('lanternbelt', 'Đai treo đèn lồng', 'Lantern belt', 'Hai đèn đỏ đung đưa.', 15, { r, y, n }, ['..nnnnnnnnnnnn..', '..y........y....', '.rrr......rrr...', '.ryr......ryr...'], 90);
W('dragontail', 'Đuôi rồng', 'Dragon tail', 'Có gai nhỏ dọc sống đuôi.', 14, { g, G, y }, ['............y...', '...........gg.y.', '...........gggg.', '............gggg', '.............GGg'], 160);
W('bellcollar', 'Đai chuông vàng', 'Bell belt', 'Đi đâu cũng leng keng.', 15, { r, y, Y }, ['..rrrrrrrrrrrr..', '.......yy.......', '......yyyy......', '.......YY.......'], 60);
W('ribbonlong', 'Nơ lụa thả dài', 'Long ribbon', 'Hai dải lụa xanh buông xuống.', 15, { cy, b }, ['..cccccbbccccc..', '.....cc..cc.....', '.....c....c.....', '....cc....cc....'], 70);
W('cloudride', 'Cân đẩu vân', 'Cloud ride', 'Một đám mây đỡ ngang hông.', 16, { w, cy }, ['..www......www..', 'wwwwww....wwwwww', '.cccc......cccc.'], 210);

// ----- Giày dép (14) -----
S('sneakerred', 'Giày thể thao đỏ', 'Red sneakers', 'Đế trắng, chạy deadline.', 18, { r, w }, [two('rr', 4), '..rrrrr..rrrrr..', '..wwwww..wwwww..'], 70);
S('boots', 'Bốt da cao cổ', 'Leather boots', 'Đi muôn dặm đường.', 17, { n, N, y }, [two('nn', 5), two('ny', 5), '..nnnnn..nnnnn..', '..NNNNN..NNNNN..'], 100);
S('wingshoes', 'Giày có cánh', 'Winged shoes', 'Bay như thần đưa thư.', 18, { y, w, Y }, ['.ww.........ww..', '.wwyyyy..yyyyww.', '..YYYYY..YYYYY..'], 190);
S('slippercat', 'Dép mèo bông', 'Cat slippers', 'Hai chú mèo ôm chân.', 18, { o, k }, ['..o.o......o.o..', '.ooooo....ooooo.', '.okoko....okoko.'], 80);
S('flipflop', 'Dép tông biển', 'Flip-flops', 'Nghỉ hè vẫn học.', 19, { cy, y }, ['...y........y...', '..ccccc..ccccc..'], 40);
S('footsock', 'Tất vớ ngôi sao', 'Star socks', 'Tất xanh điểm sao.', 17, { B, y }, [two('BB', 5), two('yB', 5), '..BBByB..ByBBB..'], 50);
S('ironboots', 'Giày giáp sắt', 'Armoured boots', 'Nặng nhưng vững.', 17, { a, w, k }, [two('aa', 5), two('wa', 5), '..aaaaa..aaaaa..', '..kkkkk..kkkkk..'], 130);
S('fireshoes', 'Giày bốc lửa', 'Blazing shoes', 'Nóng hừng hực.', 18, { k, r, o, y }, ['..kkkkk..kkkkk..', '.ryorro..orroyr.', '..r.o......o.r..'], 160);
S('iceshoes', 'Giày pha lê băng', 'Crystal shoes', 'Trong veo như truyện cổ.', 18, { cy, w, b }, [two('cw', 4), '..cwccc..cccwc..', '...b.........b..'], 180);
S('springs', 'Giày lò xo', 'Spring shoes', 'Nhảy cóc qua mọi bài.', 18, { r, a }, ['..rrrrr..rrrrr..', '...aaa....aaa...', '....aaa....aaa..'], 120);
S('skis', 'Ván trượt tuyết', 'Skis', 'Lướt qua núi từ vựng.', 19, { b, w }, ['bbbbbbbw.wbbbbbb'], 110);
S('skateboard', 'Ván trượt', 'Skateboard', 'Đứng trên ván ngầu ngời ngời.', 19, { n, k, y }, ['.nnnnnnnnnnnnnn.', '..kk........kk..'], 100);
S('lotusfeet', 'Đài sen dưới chân', 'Lotus pedestal', 'Đứng trên đóa sen nở.', 18, { p, P, g }, ['...p..p..p..p...', '.PppPppPppPppPp.', '...gggggggggg...'], 220);
S('clogs', 'Guốc mộc Hà Lan', 'Wooden clogs', 'Cộp cộp trên đường gạch.', 18, { y, Y, r }, [two('yy', 4), '.yyyrrr..rrryyy.', '.YYYYYY..YYYYYY.'], 80);

// ----- Trang phục vui (22) -----
const O = (id, vi, en, note, map, pal, patch, price) => addOutfit('sh-n-' + id, 'shn' + id, vi, en, note, map, pal, patch, price);
const col = (c0, c1, rows, ch = 'T') => rows.flatMap(rr => [[rr, c0, ch], [rr, c1, ch]]);
const row = (rr, from, to, ch = 'T') => Array.from({ length: to - from + 1 }, (_, i) => [rr, from + i, ch]);
O('aodai', 'Áo dài đỏ', 'Red ao dai', 'Tà áo dài thướt tha ngày Tết.', M_DRESS, { t: r, T: y, u: r, b: r, x: w }, [[11, 7, 'T'], [12, 8, 'T'], [13, 7, 'T'], [15, 8, 'T'], [16, 7, 'T'], [17, 8, 'T']], 240);
O('panda', 'Bộ đồ gấu trúc', 'Panda suit', 'Trắng đen tròn trịa.', M_TOP, { t: w, T: k, u: k, b: k, p: k, l: k }, [[13, 7, 'T'], [13, 8, 'T']], 200);
O('bumble', 'Bộ đồ hổ con', 'Tiger cub suit', 'Cam vằn đen.', M_DRESS, { t: o, T: k, u: o, b: o, x: o }, [...col(4, 11, [11, 13]), ...col(5, 10, [14]), [16, 7, 'T'], [16, 8, 'T']], 210);
O('tux', 'Lễ phục đuôi tôm', 'Tuxedo', 'Đen trắng nơ đỏ cho dịp trọng đại.', M_TOP, { t: k, T: w, u: k, b: k, p: k, l: k, r }, [[11, 7, 'r'], [11, 8, 'r'], ...col(7, 8, [12, 13, 14])], 260);
O('gown', 'Váy dạ hội xanh', 'Blue ball gown', 'Xòe rộng lấp lánh.', M_HAK, { t: b, T: w, u: b, b: B, p: b, P: B }, [[11, 7, 'T'], [11, 8, 'T'], [17, 5, 'T'], [17, 9, 'T'], [18, 7, 'T']], 300);
O('chefred', 'Áo đầu bếp Á', 'Wok chef jacket', 'Đỏ cổ tàu, khuy vàng.', M_TOP, { t: R, T: y, u: R, b: k, p: k, l: k }, [[11, 7, 'T'], [12, 7, 'T'], [13, 7, 'T'], [14, 7, 'T']], 170);
O('farmer', 'Áo bà ba', 'Ao ba ba', 'Mộc mạc miền sông nước.', M_TOP, { t: '#6a4a8a', T: '#d9c8f0', u: '#6a4a8a', b: '#4a2a6a', p: k, l: k }, [[11, 7, 'T'], [12, 7, 'T'], [13, 7, 'T'], [14, 7, 'T'], [14, 5, 'b'], [14, 10, 'b']], 150);
O('hanbok', 'Váy xòe ngực cao', 'High-waist dress', 'Dải nơ buông trước ngực.', M_HAK, { t: y, T: r, u: y, b: r, p: p, P: P }, [[11, 7, 'T'], [11, 8, 'T'], [12, 8, 'T'], [13, 8, 'T'], [14, 8, 'T']], 250);
O('qipao', 'Sườn xám ngọc', 'Jade qipao', 'Xanh ngọc khuy xéo.', M_DRESS, { t: '#2fa58f', T: y, u: '#2fa58f', b: '#2fa58f', x: R }, [[11, 7, 'T'], [11, 8, 'T'], [12, 9, 'T'], [13, 10, 'T'], [16, 6, 'T'], [17, 9, 'T']], 240);
O('raincoat', 'Áo mưa vàng', 'Yellow raincoat', 'Mưa mấy cũng đến lớp.', M_KIM, { t: y, T: Y, u: y, b: y }, [...col(7, 8, [12, 14, 16])], 130);
O('doctor', 'Đồ bác sĩ', 'Doctor scrubs', 'Xanh lơ có ống nghe.', M_TOP, { t: '#7fc8d8', T: k, u: '#7fc8d8', b: '#5aa8b8', p: '#7fc8d8', l: '#5aa8b8', a }, [[11, 5, 'T'], [12, 6, 'T'], [13, 7, 'T'], [11, 10, 'T'], [12, 9, 'T'], [13, 8, 'T'], [14, 7, 'a']], 180);
O('pilot', 'Đồng phục phi công', 'Pilot uniform', 'Cánh vàng trên ngực.', M_TOP, { t: B, T: y, u: B, b: k, p: B, l: B }, [[12, 5, 'T'], [12, 6, 'T'], [12, 7, 'T'], [14, 2, 'T'], [14, 13, 'T'], [11, 8, 'w']], 220);
O('santa', 'Bộ đồ Noel', 'Santa suit', 'Đỏ viền trắng.', M_TOP, { t: r, T: w, u: r, b: k, p: r, l: k }, [...col(7, 8, [11, 12, 13, 14]), ...row(15, 7, 8, 'y'), ...col(2, 13, [14])], 200);
O('pumpkinsuit', 'Bộ đồ bí ngô', 'Pumpkin costume', 'Tròn cam đêm hội.', M_DRESS, { t: o, T: k, u: G, b: G, x: k }, [[12, 5, 'T'], [12, 10, 'T'], [14, 6, 'T'], [15, 7, 'T'], [15, 8, 'T'], [14, 9, 'T']], 170);
O('skeleton', 'Đồ bộ xương', 'Skeleton suit', 'Dọa ma bài khó.', M_TOP, { t: k, T: w, u: k, b: k, p: k, l: k }, [...row(11, 7, 8), ...row(12, 5, 10), ...row(14, 6, 9), [13, 7, 'T'], [13, 8, 'T'], [15, 7, 'T'], [15, 8, 'T']], 160);
O('samue', 'Giáp samurai đỏ', 'Red armour', 'Từng lớp giáp buộc dây vàng.', M_HAK, { t: R, T: y, u: k, b: y, p: R, P: k }, [...row(12, 5, 10), ...row(14, 5, 10), [11, 7, 'T'], [11, 8, 'T']], 300);
O('mage', 'Pháp sư sao băng', 'Star mage robe', 'Tím đêm thêu sao.', M_KIM, { t: '#3a2c6e', T: y, u: '#3a2c6e', b: y, w }, [[11, 5, 'T'], [12, 10, 'w'], [13, 6, 'T'], [16, 9, 'T'], [17, 5, 'w'], [14, 11, 'T']], 270);
O('angel', 'Áo thiên thần', 'Angel robe', 'Trắng tinh đai vàng.', M_KIM, { t: w, T: y, u: w, b: y }, [[11, 7, 'T'], [11, 8, 'T'], ...row(18, 4, 11)], 280);
O('robotsuit', 'Bộ giáp rô-bốt', 'Robot suit', 'Đèn báo nhấp nháy trên ngực.', M_TOP, { t: a, T: cy, u: '#5a6490', b: '#5a6490', p: a, l: '#5a6490', r, g }, [...row(12, 6, 9), [13, 6, 'r'], [13, 8, 'g'], [13, 9, 'y']], 290);
O('sporty', 'Áo đấu số 10', 'Number 10 jersey', 'Tiền đạo của lớp.', M_TOP, { t: r, T: w, u: r, b: w, p: w, l: r }, [[12, 5, 'T'], [13, 5, 'T'], [14, 5, 'T'], ...col(7, 9, [12, 13, 14]), [12, 8, 'T'], [14, 8, 'T']], 150);
O('winter', 'Áo len tuần lộc', 'Reindeer sweater', 'Ấm áp đêm đông.', M_TOP, { t: G, T: w, u: G, b: r, p: B, l: B, n }, [...row(11, 5, 10), [13, 6, 'n'], [13, 9, 'n'], [14, 7, 'n'], [14, 8, 'n'], [15, 7, 'r'], ...row(16, 5, 10)], 160);
O('hawaii', 'Áo hoa nghỉ mát', 'Aloha shirt', 'Hoa nhiều màu rực rỡ.', M_TOP, { t: '#2fa58f', T: p, u: '#2fa58f', b: t, p: t, l: '#ffd5b5', y }, [[11, 5, 'T'], [12, 9, 'y'], [13, 6, 'y'], [13, 10, 'T'], [14, 8, 'T'], [11, 10, 'y']], 130);
