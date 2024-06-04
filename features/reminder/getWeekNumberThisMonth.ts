import { getDateInJst } from './getDateInJst';

export const getWeekNumberThisMonth = () => {
  const today = getDateInJst();
  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1,
  );
  const daysDiff = today.getDate() - firstDayOfMonth.getDate();
  return Math.ceil((firstDayOfMonth.getDay() + daysDiff) / 7);
};
