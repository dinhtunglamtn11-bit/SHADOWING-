// Danh hiệu Passport: không bán, phải đạt điều kiện mới có; đạt xong nhận xu thưởng một lần (pay = 6 lần giá bán cũ).
// Phần này chỉ định nghĩa điều kiện và tính số liệu từ nhật ký học; passport.js lo trao thưởng, lưu và hiển thị.
import { addDays } from './util.js';

const t = (id, vi, en, pay, key, goal, needVi, needEn) => [id, { vi, en, pay, key, goal, need: [needVi, needEn] }];

export const TITLES = Object.fromEntries([
  t('sh-tt-astro', 'Nhà du hành', 'Astronaut', 900, 'hours', 30, 'Học tổng cộng 30 giờ', 'Study 30 hours in total'),
  t('sh-tt-hunter', 'Thợ săn thẻ', 'Card hunter', 900, 'cards', 100, 'Sưu tầm 100 thẻ Passport', 'Collect 100 Passport cards'),
  t('sh-tt-traveler', 'Người đi khắp nơi', 'Globetrotter', 900, 'ccs', 8, 'Có thẻ của 8 nước', 'Own cards from 8 countries'),
  t('sh-tt-gourmet', 'Sành ăn thế giới', 'World gourmet', 900, 'food', 30, 'Sưu tầm 30 thẻ mục Ẩm thực', 'Collect 30 food cards'),
  t('sh-tt-collector', 'Nhà sưu tầm', 'Collector', 900, 'cards', 300, 'Sưu tầm 300 thẻ Passport', 'Collect 300 Passport cards'),
  t('sh-tt-rich', 'Triệu phú xu', 'Coin tycoon', 1200, 'coins', 15000, 'Kiếm tổng cộng 15000 xu (không tính xu thưởng danh hiệu)', 'Earn 15000 coins in total (title rewards not counted)'),
  t('sh-tt-bookworm', 'Mọt sách', 'Bookworm', 720, 'reads', 50, 'Đọc xong 50 bài (tài liệu, ghi chú, bài ở Thế giới, chương Story)', 'Finish 50 readings (documents, notes, world articles, story chapters)'),
  t('sh-tt-warrior', 'Chiến binh học tập', 'Study warrior', 900, 'q', 1000, 'Làm 1000 câu bài tập', 'Answer 1000 exercise questions'),
  t('sh-tt-wizard', 'Phù thủy từ vựng', 'Vocabulary wizard', 960, 'c', 2000, 'Ôn 2000 lượt thẻ từ', 'Review flashcards 2000 times'),
  t('sh-tt-star', 'Siêu sao Passport', 'Passport superstar', 1080, 'streak', 30, 'Đạt mục tiêu ngày 30 ngày liên tiếp', 'Hit your daily goal 30 days in a row'),
  t('sh-tt-lame', 'Lame bản lĩnh', 'Lame the bold', 720, 'deco', 10, 'Có 10 món đồ mua ở Cửa hàng trang trí', 'Own 10 items from the Decor shop'),
  t('sh-tt-night', 'Cú đêm chăm học', 'Night owl', 720, 'night', 10, 'Có 10 ngày học ít nhất 10 phút sau 22 giờ', 'Study 10+ minutes after 22:00 on 10 days'),
  t('sh-tt-explorer', 'Nhà thám hiểm', 'Explorer', 900, 'ccs', 20, 'Có thẻ của 20 nước', 'Own cards from 20 countries'),
  t('sh-tt-navigator', 'Hoa tiêu', 'Navigator', 900, 'places', 80, 'Sưu tầm 80 thẻ mục Nơi chốn và thiên nhiên', 'Collect 80 places and nature cards'),
  t('sh-tt-chef', 'Đầu bếp quốc tế', 'International chef', 900, 'food', 100, 'Sưu tầm 100 thẻ mục Ẩm thực', 'Collect 100 food cards'),
  t('sh-tt-poet', 'Nhà thơ', 'Poet', 780, 'w', 30, 'Viết 30 ghi chú', 'Write 30 notes'),
  t('sh-tt-genius', 'Thần đồng', 'Prodigy', 1080, 'tp', 10, 'Có 10 bài kiểm tra từ 80 điểm', 'Score 80+ on 10 tests'),
  t('sh-tt-brave', 'Dũng sĩ', 'Brave one', 840, 't', 30, 'Nộp 30 bài kiểm tra', 'Submit 30 tests'),
  t('sh-tt-timetraveler', 'Lữ khách thời gian', 'Time traveler', 960, 'history', 40, 'Sưu tầm 40 thẻ Lịch sử', 'Collect 40 history cards'),
  t('sh-tt-friend', 'Bạn của mọi nước', 'Friend of all nations', 1020, 'bronze', 5, 'Đạt dấu Đồng ở 5 nước', 'Earn a Bronze stamp in 5 countries'),
  t('sh-tt-diplomat', 'Nhà ngoại giao', 'Diplomat', 960, 'silver', 5, 'Đạt dấu Bạc trở lên ở 5 nước', 'Earn Silver or better in 5 countries'),
  t('sh-tt-ambassador', 'Đại sứ văn hóa', 'Cultural ambassador', 1320, 'stories', 30, 'Mở khóa 30 câu chuyện Passport', 'Unlock 30 Passport stories'),
  t('sh-tt-sleepy', 'Vua ngủ nướng', 'Sleepyhead', 600, 'late', 7, 'Có 7 ngày đạt mục tiêu mà không học trước 10 giờ sáng', 'Hit your goal on 7 days without studying before 10:00'),
  t('sh-tt-rainbow', 'Cầu vồng sau mưa', 'Rainbow after rain', 840, 'comeback', 7, 'Nghỉ từ 3 ngày, quay lại học liền 7 ngày', 'After a 3+ day break, study 7 days in a row'),
  // đợt 3
  t('sh-tt-n-voice', 'Giọng vàng', 'Golden voice', 900, 's', 500, 'Shadow 500 câu', 'Shadow 500 sentences'),
  t('sh-tt-n-ears', 'Đôi tai thính', 'Sharp ears', 900, 'd', 300, 'Chép chính tả 300 câu', 'Take dictation of 300 sentences'),
  t('sh-tt-n-speaker', 'Diễn giả', 'Public speaker', 900, 'k', 300, 'Luyện nói 300 câu', 'Practise speaking 300 sentences'),
  t('sh-tt-n-calligraphy', 'Nét chữ nết người', 'Fine handwriting', 1080, 'x', 500, 'Viết 500 chữ', 'Handwrite 500 characters'),
  t('sh-tt-n-teaowner', 'Chủ quán trà', 'Tea shop owner', 900, 'tl', 30, 'Bán 30 buổi ở TeaLab', 'Complete 30 selling sessions in TeaLab'),
  t('sh-tt-n-mathmind', 'Thần tính toán', 'Number wizard', 720, 'cm', 200, 'Tính 200 phép bằng máy tính TeaLab', 'Do 200 calculations on the TeaLab calculator'),
  t('sh-tt-n-narrator', 'Người kể chuyện', 'Storyteller', 900, 'st', 30, 'Đọc hết 30 chương Story', 'Finish 30 story chapters'),
  t('sh-tt-n-steady', 'Người bền bỉ', 'The steady one', 1200, 'days', 100, 'Có 100 ngày học', 'Study on 100 days'),
  t('sh-tt-n-yearlong', 'Một năm trọn vẹn', 'A full year', 2400, 'days', 365, 'Có 365 ngày học', 'Study on 365 days'),
  t('sh-tt-n-marathon', 'Chân chạy marathon', 'Marathoner', 1200, 'longDays', 20, 'Có 20 ngày học từ 1 giờ trở lên', 'Study 1 hour or more on 20 days'),
  t('sh-tt-n-timelord', 'Chúa tể thời gian', 'Time lord', 1800, 'hours', 100, 'Học tổng cộng 100 giờ', 'Study 100 hours in total'),
  t('sh-tt-n-sniper', 'Bách phát bách trúng', 'Never miss', 1200, 'qc', 2000, 'Trả lời đúng 2000 câu', 'Answer 2000 questions correctly'),
  t('sh-tt-n-ace', 'Thủ khoa', 'Top of class', 1500, 'tp', 50, 'Có 50 bài kiểm tra từ 80 điểm', 'Score 80+ on 50 tests'),
  t('sh-tt-n-earlybird', 'Chim sớm', 'Early bird', 900, 'early', 10, 'Có 10 ngày học ít nhất 10 phút trước 7 giờ sáng', 'Study 10+ minutes before 07:00 on 10 days'),
  t('sh-tt-n-weekend', 'Chiến binh cuối tuần', 'Weekend warrior', 900, 'weekend', 20, 'Học vào 20 ngày thứ bảy, chủ nhật', 'Study on 20 weekend days'),
  t('sh-tt-n-spark', 'Tia lửa đầu tiên', 'First spark', 600, 'streak', 7, 'Đạt mục tiêu ngày 7 ngày liên tiếp', 'Hit your daily goal 7 days in a row'),
  t('sh-tt-n-legend', 'Huyền thoại chuỗi ngày', 'Streak legend', 2400, 'streak', 100, 'Đạt mục tiêu ngày 100 ngày liên tiếp', 'Hit your daily goal 100 days in a row'),
  t('sh-tt-n-museum', 'Chủ bảo tàng', 'Museum keeper', 1800, 'cards', 1000, 'Sưu tầm 1000 thẻ Passport', 'Collect 1000 Passport cards'),
  t('sh-tt-n-worldcitizen', 'Công dân toàn cầu', 'Global citizen', 1500, 'ccs', 25, 'Có thẻ của 25 nước', 'Own cards from 25 countries'),
  t('sh-tt-n-diamond', 'Hộ chiếu kim cương', 'Diamond passport', 1500, 'diamond', 1, 'Đạt dấu Kim cương ở 1 nước (đủ thẻ)', 'Earn a Diamond stamp (all cards of one country)'),
  t('sh-tt-n-stylist', 'Nhà tạo mẫu', 'Stylist', 1200, 'deco', 60, 'Có 60 món đồ mua ở Cửa hàng trang trí', 'Own 60 items from the Decor shop'),
  t('sh-tt-n-tycoon', 'Tỷ phú chăm học', 'Study billionaire', 2400, 'coins', 50000, 'Kiếm tổng cộng 50000 xu (không tính xu thưởng danh hiệu)', 'Earn 50000 coins in total (title rewards not counted)'),
  t('sh-tt-n-historian', 'Sử gia', 'Historian', 1500, 'history', 120, 'Sưu tầm 120 thẻ Lịch sử', 'Collect 120 history cards'),
  t('sh-tt-n-allround', 'Đa tài', 'All-rounder', 900, 'kinds', 10, 'Làm ít nhất 10 loại hoạt động học khác nhau', 'Try at least 10 different kinds of activity'),
]);

export const isTitle = id => id in TITLES;

// số liệu từ nhật ký học (tracker.byDate()); goal = mục tiêu mỗi ngày tính bằng giây
export function studyStats(m, goal) {
  const s = { hours: 0, reads: 0, q: 0, c: 0, w: 0, t: 0, tp: 0, streak: 0, night: 0, late: 0, comeback: 0 };
  let sec = 0, run = 0, prevGoal = '', prev = '', back = 0, afterBreak = false;
  const hrs = (x, list) => list.reduce((n, h) => n + (x.h?.[h] || 0), 0);
  for (const d of [...m.keys()].sort()) {
    const x = m.get(d);
    sec += x.sec || 0; s.reads += (x.r || 0) + (x.n || 0) + (x.st || 0);
    for (const k of ['q', 'c', 'w', 't', 'tp']) s[k] += x[k] || 0;
    if ((x.sec || 0) >= goal) {
      run = prevGoal === addDays(d, -1) ? run + 1 : 1; prevGoal = d; s.streak = Math.max(s.streak, run);
      if (!hrs(x, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9])) s.late++;
    }
    if (hrs(x, [22, 23]) >= 600) s.night++;
    if ((x.sec || 0) >= 60) { // ngày có học
      if (prev && prev === addDays(d, -1)) back++;
      else { afterBreak = !!prev && prev <= addDays(d, -4); back = 1; } // trống ít nhất 3 ngày ở giữa
      prev = d;
      if (afterBreak) s.comeback = Math.max(s.comeback, back);
    }
  }
  // số liệu cho các danh hiệu đợt 3
  Object.assign(s, { s: 0, d: 0, k: 0, x: 0, tl: 0, cm: 0, st: 0, qc: 0, days: 0, longDays: 0, early: 0, weekend: 0, kinds: 0 });
  const used = new Set();
  for (const [date, x] of m) {
    for (const key of ['s', 'd', 'k', 'x', 'tl', 'cm', 'st', 'qc']) s[key] += x[key] || 0;
    for (const key of ['s', 'r', 'w', 'd', 'k', 'c', 'q', 'x', 'n', 't', 'tl', 'cm', 'st']) if (x[key] > 0) used.add(key);
    if ((x.sec || 0) >= 3600) s.longDays++;
    if (hrs(x, [4, 5, 6]) >= 600) s.early++;
    if ((x.sec || 0) >= 60) { s.days++; const dow = new Date(date + 'T00:00:00Z').getUTCDay(); if (dow === 0 || dow === 6) s.weekend++; }
  }
  s.kinds = used.size;
  s.hours = Math.floor(sec / 3600);
  return s;
}
