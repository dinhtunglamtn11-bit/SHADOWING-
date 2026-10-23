// Cài đặt học (đồng bộ giữa các máy). Ngôn ngữ đang chọn lưu riêng từng máy.
import * as store from './store.js';
import { simp } from './util.js';

// hideSub: 0 = hiện phiên âm + nghĩa, 1 = ẩn nghĩa, 2 = ẩn cả hai
export const prefs = { rate: 1, loop: false, autopause: false, hideSub: 0, goalMin: 15, newPerDay: 10, cardListen: false, ttsRate: 0.9, simpOnly: true, wordLead: 30, hwLevel: 'mid', srs: 'fsrs', retention: 0.9, sfx: 1, sfxVol: 0.6, sfxKind: 'soft' };

// Chữ Trung luôn là giản thể (chỉ áp dụng cho tiếng Trung, không đụng tới kanji tiếng Nhật)
export const zhText = (s, lang) => (lang === 'zh' && prefs.simpOnly && s ? simp(s) : s);

export function loadPrefs() {
  const { u, deleted, ...p } = store.get('prefs', 'main') || {};
  Object.assign(prefs, p);
  prefs.hideSub = prefs.hideSub === true ? 2 : (+prefs.hideSub || 0); // bản cũ lưu true/false
}
export function savePrefs() { store.put('prefs', 'main', { ...prefs }); }
