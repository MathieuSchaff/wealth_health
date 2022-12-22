import { format, eachDayOfInterval, startOfWeek, endOfWeek } from "date-fns";
/**
 *
 * @param locale .specifies the language and region to use for the formatting
 * @returns
 */
export const getWeekDays = (): string[] => {
  const now = new Date();
  const weekDays: string[] = [];
  const start = startOfWeek(now);
  const end = endOfWeek(now);
  eachDayOfInterval({ start, end }).forEach((day) => {
    weekDays.push(format(day, "EEE"));
  });
  return weekDays;
};

// export const getWeekDays = ({ locale }: { locale: Locale}): string[] => {
//     const now = new Date();
//     const weekDays: string[] = [];
//     const start = startOfWeek(now, { locale });
//     const end = endOfWeek(now, { locale });
//     eachDayOfInterval({ start, end }).forEach(day => {
//         weekDays.push(format(day, "EEEEEE", { locale }));
//     });
//     return weekDays;
//   };
export const previousDaysArray = (start: number, end: number) => {
  const arr: number[] = [];
  for (let i = 1; i < end; i++) {
    if (i >= start) {
      arr.push(i);
    }
  }
  return arr;
};
export const isSameTime = (firstDate: Date, secondDate: Date): boolean => {
  return new Date(firstDate).getTime() === new Date(secondDate).getTime();
};
