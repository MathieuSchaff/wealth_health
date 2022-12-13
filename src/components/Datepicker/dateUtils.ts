import { SlowBuffer } from "buffer";
const NUMBER_OF_CELLS: number = 42;
export const monthsNnames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const abbrMonthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const weekdayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
export const abbrWeekdayNames = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
]; // dayNames
// export const getSortedDays = (year: number, month: number) => {
//   let dayOne = new Date(year, month, 1);
//   let dayIndex = dayOne.getDay();

//   console.log(dayIndex);
//   const firstHalf = abbrWeekdayNames.slice(dayIndex);

//   return [...firstHalf, ...abbrWeekdayNames.slice(0, dayIndex)];
// };
// With this func I got the number of days in a month
/**
 *  With this func I got the number of days in a month
 * @param {number} year (from 1970 to ....)
 * @param {number} month  ( from 0 to 11)
 * @returns number
 */
export const getNumberofDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

/**
 * It will return the number of the day ( between 0- 6) corresponding to the day
 * beginning with sunday
 * @param year
 * @param month
 * @returns
 */
export const getFirstDayOfTheMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

// je veux creer une array qui aura le nombre de jour en chiffre a l'intérieur.
export const createArrayFromLengthMonth = (
  year: number,
  month: number
): Array<number> => {
  // les jours futurs comment toujours par 1 et le nombre total de chiffre doit etre égal à 42

  // const futureDays = range(1, 42 - )
  const numberofDaysInMonth = getNumberofDaysInMonth(year, month);
  const rangeOfMyMonth = range(1, numberofDaysInMonth + 1);

  return rangeOfMyMonth;
};
export const createArrayAfterFromLengthMonth = (
  year: number,
  month: number,
  length: number
): Array<{ day: number; month: number; year: number }> => {
  if (month < 11) {
    month += 1;
  } else {
    month = 0;
    year += 1;
  }

  // const numberofDaysInNextMonth = getNumberofDaysInMonth(year, month);
  const nextDays = range(1, NUMBER_OF_CELLS - length + 1);
  // console.log("nextDays", nextDays);
  const nextDaysFormated = nextDays.map((day) => {
    return { day: day, month: month, year: year };
  });
  console.log("nextDaysFormated", nextDaysFormated);
  return nextDaysFormated;
};
export const createArrayBeforeFromLengthMonth = (
  year: number,
  month: number,
  firstDayOfMonth: number
): Array<{ day: number; month: number; year: number }> => {
  if (month > 0) {
    month -= 1;
  } else {
    year = 1;
    month = 11;
  }
  // console.log("year month before", year, month);
  // par exemple 30
  // creer une array qui aura les dates manquantes en partant de 30
  // et en enlevant- firstDayOfMonth ( l'index du premier jour du mois)
  // donc allant de 26 a 30
  // a partir de ça, je veux creer une array qui aura ces trois chiffres.

  // console.log("enter firstDayOfMonth");
  const numberofDaysInPrevMonth = getNumberofDaysInMonth(year, month);
  // console.log("numberofDaysInPrevMonth", numberofDaysInPrevMonth);
  const pastDays = range(
    numberofDaysInPrevMonth + 1 - firstDayOfMonth,
    numberofDaysInPrevMonth + 1
  );
  // quel format a renvoyé pour que je puisse avoir les valeurs des jours ( 28 /29 etc)
  // et avoir aussi le mois et l'année si nécessaire pour pouvoir avoir un onClick dynamique
  // ce sera une array renvoyé obligatoirement
  // cette array aura un objet pour chaque jour
  // ex
  // [
  //   {day: day, month: month, year: year}
  // ]
  const pastDaysFormated = pastDays.map((day) => {
    return { day: day, month: month, year: year };
  });
  // console.log("pastDaysFormated", pastDaysFormated);
  return pastDaysFormated;
};
/**
 * Take a start and an end and return an array of number ( equivalent to date)
 * @param start
 * @param end
 * @returns
 */
export const range = (start: number, end: number): Array<number> => {
  const result = Array.from(Array(end - start).keys()).map(
    (x: number) => x + start
  );
  return result;
};
