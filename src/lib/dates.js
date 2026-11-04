const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 'YYYY-MM' -> month index counted from year 0, so spans can be compared and measured.
export const monthIndex = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
};

export const monthLabel = (ym) => {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
};

export const rangeLabel = (start, end) => `${monthLabel(start)} to ${end ? monthLabel(end) : 'present'}`;

export const currentMonth = () => new Date().toISOString().slice(0, 7);
