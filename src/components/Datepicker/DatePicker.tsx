import React, { useCallback, useMemo, useState } from "react";
import { PickerWrapper } from "./styled";
import { Header } from "./styled";
import { SevenColGrid } from "./styled";
// BsChevronLeft;
// BsChevronRight;
// BsChevronDoubleLeft;
// BsChevronDoubleRight;
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { abbrMonthsNames } from "./dateUtils";
import { abbrWeekdayNames } from "./dateUtils";
import uuid from "react-uuid";
import ButtonDay from "./ButtonDay";
import {
  createArrayFromLengthMonth,
  getFirstDayOfTheMonth,
  createArrayAfterFromLengthMonth,
  getNumberofDaysInMonth,
  createArrayBeforeFromLengthMonth,
} from "./dateUtils";
const DatePicker = ({
  minDate,
  maxDate,
  color,
  color2,
}: {
  color?: string;
  color2?: string;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYaer] = useState<number>(
    new Date().getFullYear()
  );

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const nextMonth = useCallback(() => {
    if (currentMonth < 11) {
      setCurrentMonth((old) => old + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYaer((old) => old + 1);
    }
  }, [currentMonth]);
  const prevMonth = useCallback(() => {
    if (currentMonth > 0) {
      setCurrentMonth((old) => old - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYaer((old) => old - 1);
    }
  }, [currentMonth]);

  const nextYear = useCallback(() => {
    setCurrentYaer((old) => old + 1);
  }, []);
  const prevYear = useCallback(() => {
    setCurrentYaer((old) => old - 1);
  }, []);
  const handleSelection = (year: number, month: number, day: number): void => {
    setSelectedDate(new Date(year, month, day));
    console.log("handleSelection", year, month, day);
  };
  /**
   *  For this function we want:
   * to get the time of the state in milliseconds to compare
   * it with the minDate or maxDate argument passed to the component
   * @param day
   * @returns
   */
  const getTimeFromState = (_day: number) => {
    console.log(
      "getTimeFromState",
      new Date(currentYear, currentMonth, _day).getTime()
    );
    return new Date(currentYear, currentMonth, _day).getTime();
  };
  const firstDayOfMonth = useMemo(
    () => getFirstDayOfTheMonth(currentYear, currentMonth),
    [currentMonth, currentYear]
  );
  const days = createArrayFromLengthMonth(currentYear, currentMonth);
  const previousDays = createArrayBeforeFromLengthMonth(
    currentYear,
    currentMonth,
    firstDayOfMonth
  );
  const nextDays = createArrayAfterFromLengthMonth(
    currentYear,
    currentMonth,
    previousDays.length + days.length
  );
  console.log("LENGTH", previousDays.length + days.length);
  return (
    <div>
      <input type="text" />
      <PickerWrapper>
        <Header>
          <button
            onClick={prevYear}
            disabled={
              minDate !== undefined
                ? minDate?.getTime() > getTimeFromState(1)
                : false
            }
          >
            <BsChevronDoubleLeft />
          </button>
          <button
            onClick={prevMonth}
            disabled={
              minDate !== undefined
                ? minDate?.getTime() > getTimeFromState(1)
                : false
            }
          >
            <BsChevronLeft />
          </button>
          <p>{abbrMonthsNames[currentMonth]}</p>
          <p>{currentYear}</p>
          <button
            onClick={nextMonth}
            disabled={
              maxDate !== undefined
                ? maxDate?.getTime() < getTimeFromState(1)
                : false
            }
          >
            <BsChevronRight />
          </button>
          <button
            onClick={nextYear}
            disabled={
              maxDate !== undefined
                ? maxDate?.getTime() < getTimeFromState(1)
                : false
            }
          >
            <BsChevronDoubleRight />
          </button>
        </Header>
        <div>
          <SevenColGrid>
            {abbrWeekdayNames.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </SevenColGrid>
          <SevenColGrid>
            {firstDayOfMonth !== 0
              ? previousDays.map((dayObj) => {
                  return (
                    <ButtonDay
                      key={uuid()}
                      handleSelection={() =>
                        handleSelection(dayObj.year, dayObj.month, dayObj.day)
                      }
                      className={
                        selectedDate.getTime() ===
                        new Date(
                          currentYear,
                          currentMonth,
                          dayObj.day
                        ).getTime()
                          ? "active"
                          : ""
                      }
                    >
                      {dayObj.day}
                    </ButtonDay>
                  );
                })
              : null}
            {days.map((day) => {
              return (
                <ButtonDay
                  key={uuid()}
                  handleSelection={() =>
                    handleSelection(currentYear, currentMonth, day)
                  }
                  className={
                    selectedDate.getTime() ===
                    new Date(currentYear, currentMonth, day).getTime()
                      ? "active"
                      : ""
                  }
                >
                  {day}
                </ButtonDay>
              );
            })}
            {previousDays.length + days.length < 42
              ? nextDays.map((dayObj) => {
                  return (
                    <ButtonDay
                      key={uuid()}
                      handleSelection={() =>
                        handleSelection(dayObj.year, dayObj.month, dayObj.day)
                      }
                      className={
                        selectedDate.getTime() ===
                        new Date(
                          currentYear,
                          currentMonth,
                          dayObj.day
                        ).getTime()
                          ? "active"
                          : ""
                      }
                    >
                      {dayObj.day}
                    </ButtonDay>
                  );
                })
              : null}
          </SevenColGrid>
        </div>
      </PickerWrapper>
    </div>
  );
};

export default DatePicker;
{
  /* {range(
              1,
              getNumberofDaysInMonth(currentYear, currentMonth) + 1
            ).map((day: number) => {
              return (
                <button
                  key={day}
                  style={{ color: color }}
                  data-day={day}
                  onClick={() => handleSelection(day)}
                  
                >
                  {day}
                </button>
              );
            })} */
}

{
  /* {getSortedDays(currentYear, currentMonth).map((day, i) => (
              <span key={i}>{day}</span>
            ))} */
}
