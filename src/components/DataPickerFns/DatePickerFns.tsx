import React, { useLayoutEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import {
  format,
  startOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  setDefaultOptions,
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
import { fr } from "date-fns/locale";
setDefaultOptions({ locale: fr });
const DatePickerFns = ({
  id,
  minDate,
  maxDate,
  primarycolor,
  secondarycolor,
  onChange,
  value,
  placeholder,
  isoFormat,
}: {
  id?: string;
  primarycolor?: string;
  secondarycolor?: string;
  minDate?: Date;
  maxDate?: Date;
  value: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  placeholder?: string;
  isoFormat: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(
    format(new Date(), isoFormat)
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
  // used when click outside of the or when enter is pressed inside the input
  const handleSetValueDate = () => {
    // if the calendar is not displayed , then no need to set any date => return
    if (!isOpen) {
      return;
    }
    // create an new Date with the text of the input
    const newDate = new Date(inputText);
    // check new Date is a valid datez
    if (newDate instanceof Date && !isNaN(newDate.getTime())) {
      // will set the input text manually to be to the good format ( if format is desired)
      setInputText(format(newDate, isoFormat));
      // will change the state declared outside of the component
      onChange(newDate);
    } else {
      // if invalid set text input to the date of the day
      setInputText(format(new Date(), isoFormat));
      //date to an empty string ????
      // setInputText("");
      //set the higher state to be the date of the day
      onChange(new Date());
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
          <HeaderFns
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            height={height}
            primarycolor={primarycolor}
            secondarycolor={secondarycolor}
          />
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
                    isoFormat={isoFormat}
                    minDate={minDate}
                    maxDate={maxDate}
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
                    isoFormat={isoFormat}
                    minDate={minDate}
                    maxDate={maxDate}
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
                        isoFormat={isoFormat}
                        minDate={minDate}
                        maxDate={maxDate}
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
