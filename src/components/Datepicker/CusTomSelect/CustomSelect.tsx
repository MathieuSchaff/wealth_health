import React, { useCallback, useState, useRef } from "react";
import { StyledCustomSelectContainer, StyledCustomSelect } from "./styled";
import { monthsNnames } from "../dateUtils";
import uuid from "react-uuid";
import { useOnClickOutside } from "usehooks-ts";
import { abbrMonthsNames } from "../dateUtils";

/**
 * This function is the month or the yaer.
 * And you can select also which month or year you want
 * @param {Object} props - The props passed to the CustomSelect
 * @param {number} props.currentMonths - The month selected above ( will be the month now by default)
 * @param {number} props.currentYaer -  The year selected above ( will be the year now by default)
 * @param {number} props.type -  The type of the CustomSelect. ( can be "month" or "year")
 * @param {number} props.heightContainer -  The height of the container
 * @param {React.Dispatch<React.SetStateAction<number>>} props.setCurrent -  The function to handle the selected date( this func may vary depending on the type of the CustomSelect)
 * @param {Date} props.minDate -  The min date
 * @param {Date} props.maxDate - The max date
 * @returns
 */
const CustomSelect = ({
  currentMonths,
  currentYaer,
  type,
  heightContainer,
  setCurrent,
  minDate,
  maxDate,
}: {
  currentMonths: number;
  currentYaer: number;
  maxDate?: Date;
  minDate?: Date;
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  heightContainer: number;
  type: "year" | "month";
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleClickOutside = () => {
    console.log("clicked outside");
    toggleOpen();
  };

  const handleSetCurrent = (monthOrYaer: number) => {
    setCurrent(monthOrYaer);
    console.log(monthOrYaer);
    toggleOpen();
  };

  let content;
  if (type === "month") {
    content = monthsNnames.map((month, monthIndex) => {
      // It depends on the year selected it's why I used new Date and not just month and minDate.getMonth()
      // if the time in milliseconds of the month we will be able to select is inferior to the  to the minimum time ( milliseconds) passed
      // the button will be disabled

      if (
        minDate &&
        new Date(currentYaer, monthIndex + 1).getTime() < minDate?.getTime()
      ) {
        return (
          <button key={uuid()} disabled={true}>
            {month}
          </button>
        );
      }
      // if the time in milliseconds of the month we will be able to select is superior to the  to the maximum time ( milliseconds) passed
      // the button will be disabled
      if (
        maxDate &&
        new Date(currentYaer, monthIndex + 1, 0).getTime() > maxDate?.getTime()
      ) {
        return (
          <button key={uuid()} disabled={true}>
            {month}
          </button>
        );
      }
      // it will render the button inside and this button will allow to select a month
      // only if the time of the month  ( in milliseconds, so depending on the year)
      return (
        <button key={uuid()} onClick={() => handleSetCurrent(monthIndex)}>
          {month}
        </button>
      );
    });
  } else {
    let end = 2045;
    let start = 1900;
    let array = Array.from(Array(end - start).keys()).map(
      (x: number) => x + start
    );

    content = array.map((year) => {
      // if the year of the future button is superior to the max date the button will be disable
      if (maxDate && year > maxDate?.getFullYear()) {
        return (
          <button key={uuid()} disabled>
            {year}
          </button>
        );
      }
      // if the year of the future button is inferior to the min date the button will be disable

      if (minDate && year < minDate?.getFullYear()) {
        return (
          <button key={uuid()} disabled>
            {year}
          </button>
        );
      }
      // it will render the button inside and this button will allow to select a year
      return (
        <button key={uuid()} onClick={() => handleSetCurrent(year)}>
          {year}
        </button>
      );
    });
  }
  console.log(heightContainer);
  useOnClickOutside(ref, handleClickOutside);
  return (
    <StyledCustomSelectContainer>
      <p onClick={() => toggleOpen()}>
        {type === "month" ? abbrMonthsNames[currentMonths] : currentYaer}
      </p>
      {isOpen && (
        <StyledCustomSelect heightContainer={heightContainer} ref={ref}>
          {content}
        </StyledCustomSelect>
      )}
    </StyledCustomSelectContainer>
  );
};

export default CustomSelect;
