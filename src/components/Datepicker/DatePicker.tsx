import { useCallback, useLayoutEffect, useMemo, useRef, useState } from "react";
import { DayName, PickerWrapper } from "./styled";
import { Header } from "./styled";
import { SevenColGrid, DatePickerWrapper } from "./styled";

import { abbrWeekdayNames } from "./dateUtils";
import uuid from "react-uuid";
import ButtonDay from "./ButtonDay";
import CustomSelect from "./CusTomSelect/CustomSelect";
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
  selected,
}: {
  id: string;
  primarycolor?: string;
  secondarycolor?: string;
  tertiarycolor?: string;
  minDate?: Date;
  maxDate?: Date;
  selected: Date;
  onChange: (date: Date) => void;
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
  const handleSelection = (year: number, month: number, day: number): void => {
    console.log("ENTER HANDLE selection");

    onChange(new Date(year, month, day));
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
    // console.log(
    //   "getTimeFromState",
    //   new Date(currentYear, currentMonth, _day).getTime()
    // );
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
      if (!(selected instanceof Date) && new Date(selected).getTime())
        console.log("enter keydown ENTER problem");
    }
  };
  return (
    <DatePickerWrapper>
      <>
        {/* <label htmlFor={id}>Start date</label> */}

        <input
          type="text"
          // id={id}
          // value={

          defaultValue={selected.toLocaleDateString() || selected}
          onFocus={() => setIsOpen(true)}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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
                        handleSelection={handleSelection}
                        date={{
                          year: dayObj.year,
                          month: dayObj.month,
                          day: dayObj.day,
                        }}
                        selected={selected}
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
                    handleSelection={handleSelection}
                    date={{ year: currentYear, month: currentMonth, day: day }}
                    selected={selected}
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
                        handleSelection={handleSelection}
                        date={{
                          year: dayObj.year,
                          month: dayObj.month,
                          day: dayObj.day,
                        }}
                        selected={selected}
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
