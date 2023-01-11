import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import {
  format,
  startOfMonth,
  getDaysInMonth,
  subMonths,
  addMonths,
  getISODay,
  getDay,
  setDefaultOptions,
} from "date-fns";
import HeaderFns from "./Header";
import {
  SevenColGrid,
  DatePickerWrapper,
  DayName,
  PickerWrapper,
} from "./styled";
import { getWeekDays, previousDaysArray } from "./datepickerUtils";
import ButtonDay from "./ButtonDayStyled";
import { InputForm } from "../Form/form.styled";
import uuid from "react-uuid";
import { fr, enUS } from "date-fns/locale";
import { AriaLabels } from "../../App";
setDefaultOptions({ locale: enUS });
export const DatePickerFns = ({
  id,
  minDate,
  maxDate,
  primarycolor,
  secondarycolor,
  onChange,
  value,
  placeholder,
  formatDate,
  name,
  ariaRequired,
  iso = false,
  formatDay,
  formatMonth,
  formatYear,
  arialabels,
}: {
  id: string;
  value: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  primarycolor?: string;
  secondarycolor?: string;
  minDate?: Date;
  maxDate?: Date;
  placeholder?: string;
  formatDate: string;
  name: string;
  ariaRequired?: boolean;
  iso?: boolean;
  formatDay?: string;
  formatMonth?: string;
  formatYear?: string;
  arialabels?: AriaLabels;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRefModal = useRef<HTMLDivElement>(null);
  const container = useRef(null);

  // the value of the input
  const [inputText, setInputText] = useState<string>("");
  // will get the name of the days ( depending on the locale)
  const weekDays = getWeekDays(formatDay);
  // will get the the first date of the month ( type: Date)
  const startDateOfMonth = startOfMonth(value);

  const numberOfDaysInMonth = getDaysInMonth(value);
  // console.log("numberOfDaysInMonth", numberOfDaysInMonth);
  // SAME VALUES
  const indexOfFirstDayInWeek = useMemo(() => {
    if (iso) {
      // GET ISO DAY from 1 -7

      return getISODay(startDateOfMonth) - 1;
    } else {
      // GETDAY from 0-6

      return getDay(startDateOfMonth);
    }
  }, [iso, startDateOfMonth]);

  /////////////////////
  const suffixDays = 42 - numberOfDaysInMonth - indexOfFirstDayInWeek;

  const rangePrefix = previousDaysArray(
    getDaysInMonth(subMonths(value, 1)) - indexOfFirstDayInWeek,
    getDaysInMonth(subMonths(value, 1))
  );

  const [height, setHeight] = useState<number>(0);
  useLayoutEffect(() => {
    if (containerRefModal) {
      setHeight(containerRefModal?.current?.clientHeight as number);
    }
  }, [isOpen]);

  const handleInputChange = (e: { target: { value: any } }) => {
    setInputText(e.target.value);
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      event.code === "Enter" ||
      event.code === "NumpadEnter" ||
      event.code === "Escape"
    ) {
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
      setInputText(format(newDate, formatDate));
      // will change the state declared outside of the component
      onChange(newDate);
    } else {
      // if invalid set text input to the date of the day
      setInputText(format(new Date(), formatDate));
      //date to an empty string ????
      // setInputText("");
      //set the higher state to be the date of the day
      onChange(new Date());
    }
    setIsOpen(false);
  };
  const handleClick = () => {
    if (!isOpen) {
      setIsOpen(true);
    }
  };
  useOnClickOutside(container, handleSetValueDate);
  return (
    <DatePickerWrapper ref={container}>
      <InputForm
        type="text"
        id={id}
        value={inputText}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        onClick={handleClick}
        name={name}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label={arialabels?.input ?? "date of birth of the user"}
        aria-required={ariaRequired}
        aria-autocomplete="none"
      />
      {isOpen && (
        <PickerWrapper
          ref={containerRefModal}
          aria-modal="true"
          aria-label="Choose Date"
          role="dialog"
        >
          <HeaderFns
            value={value}
            onChange={onChange}
            minDate={minDate}
            maxDate={maxDate}
            height={height}
            primarycolor={primarycolor}
            secondarycolor={secondarycolor}
            formatMonth={formatMonth}
            ariaArrow={arialabels?.ariaArrow}
            formatYear={formatYear}
          />
          <div>
            <SevenColGrid role="grid">
              {weekDays.map((day) => (
                <DayName key={day}>{day}</DayName>
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
                    formatDate={formatDate}
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
                    formatDate={formatDate}
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
                        formatDate={formatDate}
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
