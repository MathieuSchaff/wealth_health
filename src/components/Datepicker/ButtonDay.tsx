import React from "react";
import { ButtonDayStyled } from "./styled";
import { isSameTime } from "./dateUtils";
import { string } from "yup";

const ButtonDay = ({
  children,
  handleSelection,
  date,
  selected,
  primarycolor,
  secondarycolor,
}: {
  date: { year: number; month: number; day: number };
  children: number;
  handleSelection: (year: number, month: number, day: number) => void;
  selected: Date;
  primarycolor?: string;
  secondarycolor?: string;
}) => {
  const activeClass = isSameTime(
    new Date(date.year, date.month, date.day),
    selected
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
