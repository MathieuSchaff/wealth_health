import { format, isAfter, isBefore, isSameDay, setDate } from "date-fns";
import React from "react";
import styled from "styled-components";
export interface TypedButtonDay {
  onClick: () => void;
  className: string;
  primarycolor?: string;
  secondarycolor?: string;
}
const ButtonDayStyled = styled.button<TypedButtonDay>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  aspect-ratio: 1/1;
  margin: 5px;
  z-index: 10;
  cursor: pointer;
  border-radius: 50%;
  color: ${(props) => props.primarycolor || "teal"};
  &:hover {
    color: ${(props) => props.secondarycolor || "teal"};
    background-color: ${(props) => props.primarycolor || "teal"};
  }
  &:disabled {
    opacity: 0.5;
  }
  &&.active {
    background-color: ${(props) => props.primarycolor || "teal"};
    color: ${(props) => props.secondarycolor || "teal"};

    &:hover {
      opacity: 0.5;
    }
  }
`;

const ButtonDay = ({
  children,
  onChange,
  value,
  primarycolor,
  secondarycolor,
  dayNumber,
  mainArray,
  setIsOpen,
  setInputText,
  isoFormat,
  minDate,
  maxDate,
}: {
  children: number;
  onChange: (date: Date) => void;
  value: Date;
  mainArray?: boolean;
  primarycolor?: string;
  secondarycolor?: string;
  dayNumber: number;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  isoFormat: string;
  minDate?: Date;
  maxDate?: Date;
}) => {
  const myDay = setDate(value, dayNumber);
  const sameDay = mainArray && isSameDay(myDay, value);
  const activeClass = sameDay ? "active" : "";
  const handleClick = () => {
    onChange(myDay);
    setInputText(format(myDay, isoFormat));
    setIsOpen(false);
  };
  // so if myDay is before minDate => will return true
  // every button day that is greater than minDate is not disabled ( so false)
  const isMyDayAfterMinimumDate =
    minDate !== undefined && isBefore(myDay, minDate);
  // if the dateis after the maxDate, will return true
  const isMyDayBeforeMinimumDate =
    maxDate !== undefined && isAfter(myDay, maxDate);
  //if the date is between the minimum date and the maximum date
  const isBetWeen = isMyDayAfterMinimumDate || isMyDayBeforeMinimumDate;

  return (
    <ButtonDayStyled
      onClick={() => handleClick()}
      className={activeClass}
      primarycolor={primarycolor}
      secondarycolor={secondarycolor}
      disabled={isBetWeen}
    >
      {children}
    </ButtonDayStyled>
  );
};

export default ButtonDay;
