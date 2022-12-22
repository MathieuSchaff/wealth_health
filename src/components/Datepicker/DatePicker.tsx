import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DayName, PickerWrapper } from "./styled";
import { Header } from "./styled";
import { SevenColGrid, DatePickerWrapper } from "./styled";
import { abbrWeekdayNames } from "./dateUtils";
import uuid from "react-uuid";
import ButtonDay from "./ButtonDay";
import CustomSelect from "./CusTomSelect/CustomSelect";
import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  startOfMonth,
  sub,
} from "date-fns";
import {
  createArrayFromLengthMonth,
  getFirstDayOfTheMonth,
  createArrayAfterFromLengthMonth,
  createArrayBeforeFromLengthMonth,
} from "./dateUtils";
import {
  NavButton,
  SvgButtonRightYear,
  SvgButtonRightMonth,
  SvgButtonLeftYear,
  SvgButtonLeftMonth,
} from "./styled";

export interface IButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  primarycolor?: string;
  secondarycolor?: string;
}

const DatePicker = ({
  id,
  minDate,
  maxDate,
  primarycolor,
  secondarycolor,
  tertiarycolor,
  onChange,
  selectedDate,
  placeholder,
}: {
  id: string;
  primarycolor?: string;
  secondarycolor?: string;
  tertiarycolor?: string;
  minDate?: Date;
  maxDate?: Date;
  selectedDate: string;
  onChange: (date: string) => void;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  // allow to set the height of the container ( useful to render a children height un the CustomSelect component)
  useLayoutEffect(() => {
    if (containerRef) {
      setHeight(containerRef?.current?.clientHeight as number);
    }
  }, [isOpen]);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth()
  );
  const [currentYear, setCurrentYaer] = useState<number>(
    new Date().getFullYear()
  );

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

  // set the selected date
  const handleCalendarSelection = (
    year: number,
    month: number,
    day: number
  ): void => {
    console.log("ENTER HANDLE selection");

    onChange(new Date(year, month, day).toDateString());
    setIsOpen(false);
  };
  /**
   *  For this function we want:
   * to get the time of the state in milliseconds to compare
   * it with the minDate or maxDate argument passed to the component
   * @param day
   * @returns
   */
  const getTimeFromState = (_day: number) => {
    return new Date(currentYear, currentMonth, _day).getTime();
  };
  const firstDayOfMonth = useMemo(
    () => getFirstDayOfTheMonth(currentYear, currentMonth),
    [currentMonth, currentYear]
  );

  // get the days of the current month
  const days = createArrayFromLengthMonth(currentYear, currentMonth);

  // get the days of the previous month
  const previousDays = createArrayBeforeFromLengthMonth(
    currentYear,
    currentMonth,
    firstDayOfMonth
  );

  // get the days of the next month
  const nextDays = createArrayAfterFromLengthMonth(
    currentYear,
    currentMonth,
    previousDays.length + days.length
  );
  const handleInputChange = (e: { target: { value: any } }) => {
    console.log("ENTER HANDLE INPUT CHANGE");
    onChange(e.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log("enter keydown");
    if (event.code === "Enter") {
      const newDate = new Date(selectedDate);
      // check if the corresponding value that is typed in the input can be converted to a valid Date object
      if (newDate instanceof Date && !isNaN(newDate.getTime())) {
        // if valid , set the selected to be the date entered
        onChange(newDate.toDateString());
      } else {
        // if invalid set the current date to an empty string
        onChange("");
        console.log("not a date");
      }
    }
  };

  return (
    <DatePickerWrapper>
      <>
        <p>
          <strong>Selected Date: </strong>
          {format(new Date(), "dd LLLL yyyy")}
        </p>
        <input
          type="text"
          id={id}
          value={selectedDate}
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </>
      {isOpen && (
        <PickerWrapper ref={containerRef} primarycolor={primarycolor}>
          <Header>
            <NavButton
              onClick={prevYear}
              disabled={
                minDate !== undefined
                  ? minDate?.getTime() > getTimeFromState(1)
                  : false
              }
              primarycolor={primarycolor}
              secondarycolor={secondarycolor}
            >
              <SvgButtonLeftYear
                primarycolor={primarycolor}
                secondarycolor={secondarycolor}
              />
            </NavButton>
            <NavButton
              onClick={prevMonth}
              disabled={
                minDate !== undefined
                  ? minDate?.getTime() > getTimeFromState(1)
                  : false
              }
              primarycolor={primarycolor}
              secondarycolor={secondarycolor}
            >
              <SvgButtonLeftMonth
                primarycolor={primarycolor}
                secondarycolor={secondarycolor}
              />
            </NavButton>
            <CustomSelect
              currentMonths={currentMonth}
              currentYaer={currentYear}
              type="month"
              setCurrent={setCurrentMonth}
              heightContainer={height}
              minDate={minDate}
              maxDate={maxDate}
            />
            <CustomSelect
              currentMonths={currentMonth}
              currentYaer={currentYear}
              type="year"
              setCurrent={setCurrentYaer}
              heightContainer={height}
              minDate={minDate}
              maxDate={maxDate}
            />

            <NavButton
              onClick={nextMonth}
              disabled={
                maxDate !== undefined
                  ? maxDate?.getTime() < getTimeFromState(1)
                  : false
              }
              primarycolor={primarycolor}
              secondarycolor={secondarycolor}
            >
              <SvgButtonRightMonth
                primarycolor={primarycolor}
                secondarycolor={secondarycolor}
              />
            </NavButton>
            <NavButton
              onClick={nextYear}
              disabled={
                maxDate !== undefined
                  ? maxDate?.getTime() < getTimeFromState(1)
                  : false
              }
              primarycolor={primarycolor}
              secondarycolor={secondarycolor}
            >
              <SvgButtonRightYear
                primarycolor={primarycolor}
                secondarycolor={secondarycolor}
              />
            </NavButton>
          </Header>
          <div>
            <SevenColGrid>
              {abbrWeekdayNames.map((day, i) => (
                <DayName key={i}>{day}</DayName>
              ))}
            </SevenColGrid>
            <SevenColGrid>
              {firstDayOfMonth !== 0
                ? previousDays.map((dayObj) => {
                    return (
                      <ButtonDay
                        key={uuid()}
                        handleSelection={handleCalendarSelection}
                        date={{
                          year: dayObj.year,
                          month: dayObj.month,
                          day: dayObj.day,
                        }}
                        selectedDate={selectedDate}
                        primarycolor={primarycolor}
                        secondarycolor={secondarycolor}
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
                    handleSelection={handleCalendarSelection}
                    date={{ year: currentYear, month: currentMonth, day: day }}
                    selectedDate={selectedDate}
                    primarycolor={primarycolor}
                    secondarycolor={secondarycolor}
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
                        handleSelection={handleCalendarSelection}
                        date={{
                          year: dayObj.year,
                          month: dayObj.month,
                          day: dayObj.day,
                        }}
                        selectedDate={selectedDate}
                        primarycolor={primarycolor}
                        secondarycolor={secondarycolor}
                      >
                        {dayObj.day}
                      </ButtonDay>
                    );
                  })
                : null}
            </SevenColGrid>
          </div>
        </PickerWrapper>
      )}
    </DatePickerWrapper>
  );
};

export default DatePicker;
