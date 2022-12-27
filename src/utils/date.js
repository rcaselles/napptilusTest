export const hasExpired = (date) => {
  // Transformamos a utc para hacer un calculo
  const utcDate = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const utcToday = Date.UTC(
    new Date().getFullYear(),
    new Date().getMonth(),
    new Date().getDate()
  );

  return Math.floor((utcToday - utcDate) / (1000 * 60 * 60 * 24)) >= 1;
};
