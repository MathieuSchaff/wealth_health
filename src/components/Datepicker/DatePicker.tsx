import React, { useState } from "react";
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
import {
  createArrayFromLengthMonth,
  getFirstDayOfTheMonth,
  // range,
  getNumberofDaysInMonth,
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
  const nextMonth = () => {
    if (currentMonth < 11) {
      setCurrentMonth((old) => old + 1);
    } else {
      setCurrentMonth(0);
      setCurrentYaer((old) => old + 1);
    }
  };
  const prevMonth = () => {
    if (currentMonth > 0) {
      setCurrentMonth((old) => old - 1);
    } else {
      setCurrentMonth(11);
      setCurrentYaer((old) => old - 1);
    }
  };
  const nextYear = () => {
    setCurrentYaer((old) => old + 1);
  };
  const prevYear = () => {
    setCurrentYaer((old) => old - 1);
  };
  const handleSelection = (day: number) => {
    console.log(
      "toLocaleDateString()",
      new Date(currentYear, currentMonth, day)
    );
    setSelectedDate(new Date(currentYear, currentMonth, day));
  };
  // fwbold={true as boolean}
  /**
   *  For this function we want:
   * to get the time of the state in milliseconds to compare
   * it with the minDate or maxDate argument passed to the component
   * @param day
   * @returns
   */
  // const getTimeFromState = (day: number) => {
  //   console.log(
  //     "getTimeFromState",
  //     new Date(currentYear, currentMonth, day).getTime()
  //   );
  //   return new Date(currentYear, currentMonth, day);
  // };
  // getFirstDayOfTheMonth(currentYear, currentMonth);
  createArrayFromLengthMonth(currentYear, currentMonth);
  return (
    <div>
      <input type="text" />
      <PickerWrapper>
        <Header>
          <button
            onClick={prevYear}
            // disabled={minDate?.getTime() > getTimeFromState(0).getTime()}
          >
            <BsChevronDoubleLeft />
          </button>
          {/* disabled={minDate?.getTime() > getTimeFromState(0).getTime()} */}
          <button onClick={prevMonth}>
            <BsChevronLeft />
          </button>
          <p>{abbrMonthsNames[currentMonth]}</p>
          <p>{currentYear}</p>
          {/* disabled={minDate?.getTime() > getTimeFromState(0).getTime()} */}
          <button onClick={nextMonth}>
            <BsChevronRight />
          </button>
          {/* disabled={minDate?.getTime() < getTimeFromState(0).getTime()} */}
          <button onClick={nextYear}>
            <BsChevronDoubleRight />
          </button>
        </Header>
        <div>
          <SevenColGrid>
            {/* {getSortedDays(currentYear, currentMonth).map((day, i) => (
              <span key={i}>{day}</span>
            ))} */}
            {abbrWeekdayNames.map((day, i) => (
              <span key={i}>{day}</span>
            ))}
          </SevenColGrid>
          <SevenColGrid>
            {/* {range(
              1,
              getNumberofDaysInMonth(currentYear, currentMonth) + 1
            ).map((day: number) => {
              return (
                <button
                  key={day}
                  style={{ color: color }}
                  data-day={day}
                  onClick={() => handleSelection(day)}
                  className={
                    selectedDate.getTime() ===
                    new Date(currentYear, currentMonth, day).getTime()
                      ? "active"
                      : ""
                  }
                >
                  {day}
                </button>
              );
            })} */}
            {createArrayFromLengthMonth(currentYear, currentMonth).map(
              (day, index) => {
                return <button>{day}</button>;
              }
            )}
          </SevenColGrid>
        </div>
      </PickerWrapper>
    </div>
  );
};

export default DatePicker;
