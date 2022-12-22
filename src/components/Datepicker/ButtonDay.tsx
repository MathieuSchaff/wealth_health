import React from "react";
import { ButtonDayStyled } from "./styled";
import { isSameTime } from "./dateUtils";

const ButtonDay = ({
  children,
  handleSelection,
  date,
  selectedDate,
  primarycolor,
  secondarycolor,
}: {
  date: { year: number; month: number; day: number };
  children: number;
  handleSelection: (year: number, month: number, day: number) => void;
  selectedDate: string;
  primarycolor?: string;
  secondarycolor?: string;
}) => {
  const activeClass = isSameTime(
    new Date(date.year, date.month, date.day),
    new Date(selectedDate)
  )
    ? "active"
    : "";
  return (
    <ButtonDayStyled
      onClick={() => handleSelection(date.year, date.month, date.day)}
      className={activeClass}
      primarycolor={primarycolor}
      secondarycolor={secondarycolor}
    >
      {children}
    </ButtonDayStyled>
  );
};

export default ButtonDay;
