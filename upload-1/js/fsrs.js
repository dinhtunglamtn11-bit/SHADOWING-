// FSRS-5 (Free Spaced Repetition Scheduler) với tham số mặc định. Công thức: https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-Algorithm
// Mỗi thẻ có độ bền trí nhớ S (số ngày để xác suất nhớ còn 90%) và độ khó D (1..10).
// G: 1 = Quên, 2 = Khó, 3 = Được, 4 = Dễ.
const W = [0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925, 1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621];
const DECAY = -0.5, FACTOR = 19 / 81;
export const clampD = d => Math.min(10, Math.max(1, d));

// xác suất còn nhớ sau t ngày
export const retrievability = (t, S) => Math.pow(1 + FACTOR * t / S, DECAY);
// số ngày tới lần ôn kế để xác suất nhớ đúng bằng mức mong muốn r
export const interval = (S, r = 0.9) => Math.max(1, Math.min(36500, Math.round(S / FACTOR * (Math.pow(r, 1 / DECAY) - 1))));

export const init = G => ({ S: W[G - 1], D: clampD(W[4] - Math.exp(W[5] * (G - 1)) + 1) });

// trạng thái mới sau khi ôn với điểm G, t = số ngày kể từ lần ôn trước
export function next({ S, D }, G, t) {
  const R = retrievability(t, S);
  const D1 = D + (-W[6] * (G - 3)) * (10 - D) / 9;
  const D2 = clampD(W[7] * init(4).D + (1 - W[7]) * D1); // kéo nhẹ về độ khó mặc định
  let S2;
  if (t < 1) S2 = S * Math.exp(W[17] * (G - 3 + W[18])); // ôn lại trong cùng ngày
  else if (G === 1) S2 = Math.min(S, W[11] * Math.pow(D, -W[12]) * (Math.pow(S + 1, W[13]) - 1) * Math.exp(W[14] * (1 - R)));
  else S2 = S * (1 + Math.exp(W[8]) * (11 - D) * Math.pow(S, -W[9]) * (Math.exp(W[10] * (1 - R)) - 1) * (G === 2 ? W[15] : 1) * (G === 4 ? W[16] : 1));
  return { S: Math.max(0.01, S2), D: D2 };
}

// Thẻ cũ (thuật toán SM-2): suy ra S và D từ khoảng cách ôn và hệ số dễ
export const fromSM2 = c => ({ S: Math.max(1, c.interval || 1), D: clampD(5 + (2.5 - (c.ease || 2.5)) * 3.33) });
