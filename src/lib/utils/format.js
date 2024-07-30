export function dateToYearString(date) {
  if (!(date instanceof Date)) {
    throw new Error("Invalid date object");
  }

  const year = date.getFullYear();
  return year.toString();
}
