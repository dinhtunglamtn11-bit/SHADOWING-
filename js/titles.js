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
  s.hours = Math.floor(sec / 3600);
  return s;
}
