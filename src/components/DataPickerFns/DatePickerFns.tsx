import React, { useLayoutEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import {
  format,
  startOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
} from "date-fns";
import HeaderFns from "./HeaderFns";
import {
  SevenColGrid,
  DatePickerWrapper,
  DayName,
  PickerWrapper,
} from "../Datepicker/styled";
import { getWeekDays, previousDaysArray } from "./datepickerfnsUtils";
import ButtonDay from "./ButtonDayStyledFns";

import uuid from "react-uuid";
// setDefaultOptions({ locale: fr });
const DatePickerFns = ({
  id,
  minDate,
  maxDate,
  primarycolor,
  secondarycolor,
  tertiarycolor,
  onChange,
  value,
  placeholder,
}: {
  id?: string;
  primarycolor?: string;
  secondarycolor?: string;
  tertiarycolor?: string;
  minDate?: Date;
  maxDate?: Date;
  value: Date;
  onChange: (date: Date) => void;
  placeholder?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(
    format(new Date(), "dd-MM-yyyy")
  );

  const weekDays = getWeekDays();
  const startDateOfMonth = startOfMonth(value);
  const containerRefModal = useRef<HTMLDivElement>(null);
  const container = useRef(null);
  const [height, setHeight] = useState<number>(0);
  useLayoutEffect(() => {
    if (containerRefModal) {
      setHeight(containerRefModal?.current?.clientHeight as number);
    }
  }, [isOpen]);
  const numberOfDaysInMonth = getDaysInMonth(value);
  const prefixDays = startDateOfMonth.getDay();
  const suffixDays = 42 - numberOfDaysInMonth - prefixDays;
  const rangePrefix = previousDaysArray(
    getDaysInMonth(subMonths(value, 1)) - prefixDays,
    getDaysInMonth(subMonths(value, 1))
  );
  const handleInputChange = (e: { target: { value: any } }) => {
    setInputText(e.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "Enter") {
      handleSetValueDate();
    }
  };
  const handleSetValueDate = () => {
    const newDate = new Date(inputText);
    // check if the corresponding value that is typed in the input can be converted to a valid Date object
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      console.log("its a date");
      // if valid , set the selected to be the date entered
      setInputText(format(new Date(), "dd-MM-yyyy"));
      onChange(newDate);
    } else {
      // if invalid set the current date to an empty string
      setInputText("");

      onChange(new Date());
      console.log("not a date");
    }
    setIsOpen(false);
  };
  useOnClickOutside(container, handleSetValueDate);
  return (
    <DatePickerWrapper ref={container}>
      <>
        <input
          type="text"
          id={id}
          value={inputText}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
        />
      </>
      {isOpen && (
        <PickerWrapper ref={containerRefModal}>
          <HeaderFns value={value} onChange={onChange} />
          <div>
            <SevenColGrid>
              {weekDays.map((day, i) => (
                <DayName key={i}>{day}</DayName>
              ))}
            </SevenColGrid>
            <SevenColGrid>
              {rangePrefix.map((day) => {
                return (
                  <ButtonDay
                    key={uuid()}
                    onChange={onChange}
                    value={subMonths(value, 1)}
                    primarycolor={primarycolor}
                    secondarycolor={secondarycolor}
                    dayNumber={day}
                    mainArray={false}
                    setIsOpen={setIsOpen}
                    setInputText={setInputText}
                  >
                    {day}
                  </ButtonDay>
                );
              })}
              {Array.from({ length: numberOfDaysInMonth }).map((_, index) => {
                const date = index + 1;
                return (
                  <ButtonDay
                    key={uuid()}
                    onChange={onChange}
                    value={value}
                    primarycolor={primarycolor}
                    secondarycolor={secondarycolor}
                    dayNumber={date}
                    mainArray={true}
                    setIsOpen={setIsOpen}
                    setInputText={setInputText}
                  >
                    {date}
                  </ButtonDay>
                );
              })}
              {suffixDays > 0
                ? Array.from({ length: suffixDays }).map((_, index) => {
                    const date = index + 1;
                    return (
                      <ButtonDay
                        key={uuid()}
                        onChange={onChange}
                        value={addMonths(value, 1)}
                        primarycolor={primarycolor}
                        secondarycolor={secondarycolor}
                        dayNumber={date}
                        mainArray={false}
                        setIsOpen={setIsOpen}
                        setInputText={setInputText}
                      >
                        {date}
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

export default DatePickerFns;
