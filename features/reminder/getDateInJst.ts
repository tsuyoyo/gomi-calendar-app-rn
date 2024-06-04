export const getDateInJst = () => {
  const utcDate = new Date();
  const jstOffset = 9 * 60;
  return new Date(utcDate.getTime() + jstOffset * 60 * 1000);
};
