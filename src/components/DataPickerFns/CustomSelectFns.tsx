import React, { useCallback, useState, useRef } from "react";
import {
  StyledCustomSelectContainer,
  StyledCustomSelect,
} from "./styledCustomSelect";
import uuid from "react-uuid";
import { useOnClickOutside } from "usehooks-ts";
import { format, isAfter, isBefore, setMonth, setYear } from "date-fns";
import { getMonthsNames } from "./datepickerfnsUtils";
import { ButtonCustomSelectFns } from "./styledCustomSelect";
export interface IButtonSelect {
  key: string;
  onClick: (monthOrYaer: number) => void;
  disabled?: boolean;
  primarycolor?: string;
  secondarycolor?: string;
}

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
  value,
  type,
  height,
  minDate,
  maxDate,
  onChange,
  primarycolor,
  secondarycolor,
}: {
  value: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  height: number;
  type: "year" | "month";
  primarycolor?: string;
  secondarycolor?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  // quand je clique a coté mais dans le calendar, je veux fermer dropdown
  const handleClickOutside = () => {
    toggleOpen();
  };
  // I want to set the value of the higher state to be the month click or the year clicked
  const handleSetCurrent = (monthOrYaer: number) => {
    if (type === "month") {
      onChange(setMonth(value, monthOrYaer));
    }
    if (type === "year") {
      onChange(setYear(value, monthOrYaer));
    }
    toggleOpen();
  };
  const monthsNames = getMonthsNames();

  let content;
  if (type === "month") {
    content = monthsNames.map((month) => {
      const isBeforeMinDate =
        minDate !== undefined
          ? isBefore(setMonth(value, Number(month.numberIndexMonth)), minDate)
          : false;
      const isAfterDate =
        maxDate !== undefined
          ? isAfter(setMonth(value, Number(month.numberIndexMonth)), maxDate)
          : false;
      return (
        <ButtonCustomSelectFns
          key={uuid()}
          onClick={() => handleSetCurrent(Number(month.numberIndexMonth) - 1)}
          disabled={isBeforeMinDate || isAfterDate}
          primarycolor={primarycolor}
          secondarycolor={secondarycolor}
        >
          {month.name}
        </ButtonCustomSelectFns>
      );
    });
  } else {
    let end = maxDate ? Number(format(maxDate, "yyyy")) : 2045;
    let start = minDate ? Number(format(minDate, "yyyy")) : 1900;
    let array = Array.from(Array(end - start).keys()).map(
      (x: number) => x + start
    );

    content = array.map((year) => {
      // if the year of the future button is superior to the max date the button will be disable
      // it will render the button inside and this button will allow to select a year
      return (
        <ButtonCustomSelectFns
          key={uuid()}
          onClick={() => handleSetCurrent(year)}
          primarycolor={primarycolor}
          secondarycolor={secondarycolor}
        >
          {year}
        </ButtonCustomSelectFns>
      );
    });
  }
  useOnClickOutside(ref, handleClickOutside);
  let monthOrYear;
  if (type === "month") {
    monthOrYear = format(value, "MMM");
  } else {
    monthOrYear = format(value, "yyy");
  }
  return (
    <StyledCustomSelectContainer>
      <p onClick={() => toggleOpen()}>{monthOrYear}</p>
      {isOpen && (
        <StyledCustomSelect heightContainer={height} ref={ref}>
          {content}
        </StyledCustomSelect>
      )}
    </StyledCustomSelectContainer>
  );
};

export default CustomSelect;
