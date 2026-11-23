import { M_TOP, M_DRESS, M_KIM } from './pass-kit.js';
import { addOv, addOutfit, c, two } from './pass-sh1.js';
// Cửa hàng trang trí · đợt 2: thêm mũ, mặt, eo, giày, trang phục
const H = 'Mũ và tóc', F = 'Mặt', W = 'Eo và đuôi', S = 'Giày dép';

// ----- Mũ và tóc (14) -----
addOv(H, 'sh-cowboy', 'Nón cao bồi', 'Cowboy hat', 'Viền rộng, hợp với đồng cỏ.', 'head', -2, { n: '#8a5a2a', N: '#5a3a1a' }, [c('nnnn'), c('nnnnnn'), c('NNNNNNNN'), c('nnnnnnnnnnnnnn')], 100);
addOv(H, 'sh-beret', 'Mũ nồi họa sĩ', 'Painter beret', 'Nghiêng một chút cho nghệ sĩ.', 'head', -2, { r: '#c9302a', R: '#8a1a1a' }, [c('r'), c('rrrrrr'), c('rrrrrrrrrr'), c('RRRRRRRR')], 90);
addOv(H, 'sh-tophat', 'Mũ chóp cao', 'Top hat', 'Lịch lãm như ảo thuật gia.', 'head', -4, { k: '#2b2b3a', r: '#e8452c' }, [c('kkkkkk'), c('kkkkkk'), c('kkkkkk'), c('rrrrrr'), c('kkkkkkkkkkkk')], 130);
addOv(H, 'sh-bearears', 'Tai gấu', 'Bear ears', 'Hai tai tròn nâu mềm.', 'head', -2, { n: '#8a5a2a', p: '#ffb3b3' }, [two('nn', 8), two('np', 8), c('nnnnnnnnnn')], 90);
addOv(H, 'sh-antlers', 'Sừng nai', 'Deer antlers', 'Hai nhánh sừng trong rừng sâu.', 'head', -4, { n: '#8a5a2a' }, ['..n..n....n..n..', '...nnn....nnn...', '....n......n....', '....nn....nn....'], 110);
addOv(H, 'sh-unihorn', 'Sừng kỳ lân', 'Unicorn horn', 'Chiếc sừng thần kỳ lấp lánh.', 'head', -4, { y: '#ffd84d', w: '#ffffff', p: '#ff8fc8' }, [c('y'), c('yy'), c('ywy'), c('yyyy'), c('pppppppp')], 130);
addOv(H, 'sh-pineapple', 'Mũ quả dứa', 'Pineapple hat', 'Lá xanh và vỏ vàng gai gai.', 'head', -4, { g: '#5fb85a', G: '#2f7d3a', y: '#ffd84d', Y: '#c9a227' }, [c('g.g.g'), c('GgGgG'), c('yyyyyy'), c('yYyYyy'), c('YyYyYy')], 100);
addOv(H, 'sh-mushroom', 'Mũ nấm', 'Mushroom cap', 'Đỏ chấm trắng như trong truyện cổ.', 'head', -3, { r: '#e8452c', w: '#ffffff' }, [c('rrrrrr'), c('rwrrwr'), c('rrrrrrrr'), c('rrwrrwrr'), c('rrrrrrrrrr')], 100);
addOv(H, 'sh-bigbow', 'Nơ to', 'Big bow', 'Chiếc nơ hồng bự trên đầu.', 'head', -2, { p: '#ff8fc8', P: '#c94a8a' }, [c('pp..pp'), c('ppPPpp'), c('pp..pp')], 70);
addOv(H, 'sh-sailor', 'Mũ thủy thủ', 'Sailor cap', 'Trắng tinh với dải xanh.', 'head', -3, { w: '#ffffff', b: '#2f4fb8' }, [c('wwwwww'), c('wwwwwwww'), c('bbbbbbbb'), c('wwwwwwwwww')], 90);
addOv(H, 'sh-propeller', 'Mũ chong chóng', 'Propeller beanie', 'Xoay xoay khi vui.', 'head', -4, { r: '#e8452c', b: '#4a7be0', y: '#ffd84d' }, [c('rr.yy.bb'), c('...yy...'), c('rrrrrrrr'), c('bbbbbbbbbb')], 90);
addOv(H, 'sh-daisy', 'Vòng hoa cúc', 'Daisy crown', 'Nhẹ nhàng như đồng nội.', 'head', -2, { w: '#ffffff', y: '#ffd84d', g: '#5fb85a' }, [c('w.y.w.y.w'), c('gggggggggg')], 70);
addOv(H, 'sh-bandana', 'Khăn rằn', 'Bandana', 'Buộc một vòng quanh đầu.', 'head', 1, { r: '#d6241e', w: '#ffffff' }, [c('rrrrrrrrrrrr'), c('rwrwrwrwrwrw')], 60);
addOv(H, 'sh-pumpkin', 'Mũ bí ngô', 'Pumpkin hat', 'Cho đêm Halloween vui vẻ.', 'head', -4, { g: '#5fb85a', o: '#ff9f43', O: '#c9701a' }, [c('g'), c('oOoo'), c('oooooooo'), c('oooooooooo')], 90);

// ----- Mặt (8) -----
addOv(F, 'sh-sunnies', 'Kính râm tròn', 'Round sunglasses', 'Mát lạnh dưới nắng.', 'face', 5, { k: '#2b2b3a' }, ['...kkkk..kkkk...', '...kkkk..kkkk...', '....kk....kk....'], 60);
addOv(F, 'sh-nerd', 'Kính mọt sách', 'Nerd glasses', 'Gọng dày, mắt sáng.', 'face', 5, { k: '#2b2b3a', w: '#ffffff' }, ['...kkkk..kkkk...', '...kwwk..kwwk...', '...kkkk..kkkk...'], 50);
addOv(F, 'sh-bandaid', 'Băng cá nhân', 'Band-aid', 'Vết xước nhỏ cũng đáng yêu.', 'face', 7, { p: '#f4c9a0', k: '#c9a070' }, ['..........pkp...'], 30);
addOv(F, 'sh-whiskers', 'Ria mèo', 'Cat whiskers', 'Ba sợi mỗi bên.', 'face', 7, { k: '#2b2b3a' }, ['..k..........k..', '.kk..........kk.'], 40);
addOv(F, 'sh-fangs', 'Răng nanh ma cà rồng', 'Vampire fangs', 'Hai chiếc răng nhọn.', 'face', 8, { w: '#ffffff' }, ['.......ww.ww....'], 40);
addOv(F, 'sh-snorkel', 'Kính lặn', 'Diving mask', 'Ngắm san hô dưới biển.', 'face', 5, { b: '#2f6bd6', c: '#8fd3ff' }, ['...bbbbbbbbbb...', '...bcccbbcccb...', '...bbbbbbbbbb...'], 90);
addOv(F, 'sh-sparkles', 'Mắt lấp lánh', 'Sparkly eyes', 'Mắt sáng như sao.', 'face', 4, { y: '#ffd84d' }, ['....y......y....', '...yyy....yyy...', '....y......y....'], 60);
addOv(F, 'sh-freckles', 'Tàn nhang', 'Freckles', 'Những chấm nâu nhỏ xíu.', 'face', 7, { n: '#b87a4a' }, ['....n.n..n.n....', '.....n....n.....'], 30);

// ----- Eo và đuôi (6) -----
addOv(W, 'sh-wings', 'Đôi cánh nhỏ', 'Little wings', 'Vỗ nhẹ như thiên thần.', 'waist', 14, { w: '#ffffff', l: '#dfe6f8' }, ['.ww..........ww.', 'wwww........wwww', '.lww........wwl.'], 120);
addOv(W, 'sh-apron', 'Tạp dề nấu ăn', 'Cooking apron', 'Có túi nhỏ phía trước.', 'waist', 15, { w: '#ffffff', p: '#ff8fc8' }, ['....wwwwwwww....', '....wppppppw....', '....wwwwwwww....'], 70);
addOv(W, 'sh-lifevest', 'Áo phao', 'Life vest', 'An toàn khi đi thuyền.', 'waist', 15, { o: '#ff9f43', y: '#ffd84d' }, ['..oooooooooooo..', '..ooyoooooyooo..'], 70);
addOv(W, 'sh-flowerskirt', 'Váy hoa', 'Flower skirt', 'Những bông hoa nhỏ xinh.', 'waist', 15, { p: '#ff8fc8', y: '#ffd84d' }, ['.ppyppyppyppypp.', '..ppyppyppyppp..'], 90);
addOv(W, 'sh-mermaid', 'Đuôi nàng tiên cá', 'Mermaid tail', 'Lấp lánh vảy xanh.', 'waist', 15, { g: '#2fa58f', c: '#8fd3ff' }, ['..gggggggggggg..', '..gcgcgcgcgcgc..', '...gcgcgcgcgc...'], 130);
addOv(W, 'sh-sashscarf', 'Dải lụa buộc eo', 'Silk sash', 'Một đầu rủ xuống.', 'waist', 15, { r: '#e8452c' }, ['..rrrrrrrrrrrr..', '.......rr.......', '.......rr.......', '.......rr.......'], 60);

// ----- Giày dép (6) -----
addOv(S, 'sh-clownshoes', 'Giày chú hề', 'Clown shoes', 'To và buồn cười.', 'feet', 18, { r: '#e8452c', w: '#ffffff' }, ['.rrrrrr..rrrrrr.', 'rrrrrrr..rrrrrrr', 'wwwwwww..wwwwwww'], 60);
addOv(S, 'sh-moonboots', 'Ủng mặt trăng', 'Moon boots', 'Dày và êm như bước trên mây.', 'feet', 18, { w: '#ffffff', k: '#2b2b3a' }, ['..wwww....wwww..', '.wwwwww..wwwwww.', '.kkkkkk..kkkkkk.'], 110);
addOv(S, 'sh-heels', 'Giày cao gót đỏ', 'Red heels', 'Cộp cộp trên sàn.', 'feet', 18, { r: '#e8452c' }, ['....r......r....', '...rrr....rrr...', '...r.r....r.r...'], 100);
addOv(S, 'sh-sandals', 'Xăng đan', 'Sandals', 'Mát chân ngày hè.', 'feet', 18, { b: '#2f6bd6', n: '#c9a36a' }, ['...bb......bb...', '..nnnn....nnnn..', '..nnnn....nnnn..'], 60);
addOv(S, 'sh-duckslip', 'Dép vịt vàng', 'Duck slippers', 'Mỏ cam, thân vàng.', 'feet', 18, { y: '#ffd84d', o: '#ff9f43' }, ['..yy......yy....', '..yyyyy..yyyyy..', '..ooooo..ooooo..'], 80);
addOv(S, 'sh-glowshoes', 'Giày phát sáng', 'Glow sneakers', 'Neon xanh trong đêm.', 'feet', 18, { g: '#5fff8a', c: '#2ee6ff' }, ['...gg......gg...', '..gggg....gggg..', '..cccc....cccc..'], 110);

// ----- Trang phục vui (10) -----
addOutfit('sh-ghostsheet', 'shgs', 'Áo choàng ma trắng', 'Ghost sheet', 'Chỉ có hai lỗ cho mắt.', M_DRESS, { t: '#f4f4f8', T: '#dfe3f5', u: '#f4f4f8', b: '#dfe3f5', x: '#dfe3f5' }, [[11, 6, 'T'], [11, 9, 'T'], [14, 7, 'T'], [14, 8, 'T']], 180);
addOutfit('sh-catonesie', 'shco', 'Bộ đồ mèo cam', 'Orange cat onesie', 'Có sọc và cả chiếc đuôi.', M_DRESS, { t: '#ff9f43', T: '#c9701a', u: '#ff9f43', b: '#c9701a', x: '#c9701a' }, [[11, 5, 'T'], [11, 10, 'T'], [13, 5, 'T'], [13, 10, 'T'], [15, 5, 'T'], [15, 10, 'T']], 200);
addOutfit('sh-overalls', 'shov', 'Yếm làm vườn', 'Gardening overalls', 'Yếm xanh với áo thun trắng.', M_TOP, { t: '#ffffff', T: '#2f6bd6', u: '#ffffff', b: '#2f6bd6', p: '#2f6bd6', l: '#2f6bd6' }, [[11, 5, 'T'], [11, 10, 'T'], [12, 5, 'T'], [12, 10, 'T'], [14, 7, 'y'], [14, 8, 'y']], 160);
addOutfit('sh-magician', 'shmg', 'Bộ ảo thuật gia', 'Magician tuxedo', 'Đen lịch lãm, cà vạt đỏ.', M_TOP, { t: '#2b2b3a', T: '#e8452c', u: '#2b2b3a', b: '#2b2b3a', p: '#2b2b3a', l: '#2b2b3a' }, [[11, 7, 'w'], [11, 8, 'w'], [12, 7, 'T'], [12, 8, 'T'], [13, 7, 'T'], [13, 8, 'T']], 240);
addOutfit('sh-snowsuit', 'shsn', 'Áo phao tuyết', 'Snow suit', 'Dày ấm cho mùa lạnh.', M_TOP, { t: '#4a7be0', T: '#8fd3ff', u: '#4a7be0', b: '#2f4fb8', p: '#2f4fb8', l: '#2f4fb8' }, [[11, 4, 'T'], [11, 11, 'T'], [13, 4, 'T'], [13, 11, 'T'], [15, 4, 'T'], [15, 11, 'T']], 190);
addOutfit('sh-rainbowhoodie', 'shrh', 'Áo nỉ cầu vồng', 'Rainbow hoodie', 'Bảy sọc ngang trên ngực.', M_TOP, { t: '#7a3fc0', T: '#e8452c', u: '#7a3fc0', b: '#4a2680', p: '#3a3a4a', l: '#3a3a4a', r: '#e8452c', O: '#ff9f43', g: '#5fb85a', c: '#4a7be0' }, [[11, 5, 'r'], [11, 6, 'O'], [11, 7, 'y'], [11, 8, 'g'], [11, 9, 'c'], [11, 10, 'r'], [12, 5, 'O'], [12, 6, 'y'], [12, 7, 'g'], [12, 8, 'c'], [12, 9, 'r'], [12, 10, 'O']], 210);
addOutfit('sh-knight', 'shkn', 'Áo giáp hiệp sĩ', 'Knight armour', 'Sáng bóng và nặng trịch.', M_TOP, { t: '#c0c8d8', T: '#8a93a8', u: '#c0c8d8', b: '#8a93a8', p: '#9aa4c4', l: '#9aa4c4', o: '#2b1d3a', r: '#e8452c' }, [[11, 7, 'T'], [11, 8, 'T'], [12, 7, 'r'], [12, 8, 'r'], [13, 5, 'T'], [13, 10, 'T']], 280);
addOutfit('sh-explorer', 'shex', 'Đồ thám hiểm', 'Explorer outfit', 'Màu be với nhiều túi.', M_TOP, { t: '#d6b97a', T: '#8a6a3a', u: '#d6b97a', b: '#8a6a3a', p: '#b89a5a', l: '#b89a5a' }, [[11, 5, 'T'], [11, 10, 'T'], [13, 5, 'T'], [13, 10, 'T'], [14, 7, 'T'], [14, 8, 'T']], 200);
addOutfit('sh-mermaidsuit', 'shmm', 'Váy vảy cá', 'Scale dress', 'Vảy xanh ngọc lấp lánh.', M_DRESS, { t: '#2fa58f', T: '#8fd3ff', u: '#2fa58f', b: '#1f7a6a', x: '#1f7a6a' }, [[11, 6, 'T'], [11, 9, 'T'], [13, 5, 'T'], [13, 8, 'T'], [13, 11, 'T'], [15, 6, 'T'], [15, 9, 'T']], 230);
addOutfit('sh-prince', 'shpc', 'Áo hoàng tử', 'Prince coat', 'Xanh hoàng gia với nút vàng.', M_KIM, { t: '#2f4fb8', T: '#ffd84d', u: '#2f4fb8', b: '#ffd84d', x: '#ffd84d' }, [[11, 7, 'T'], [11, 8, 'T'], [13, 7, 'T'], [13, 8, 'T'], [15, 7, 'T'], [15, 8, 'T'], [12, 4, 'T'], [12, 11, 'T']], 280);

