import { format, isSameDay, setDate } from "date-fns";
import React from "react";
import styled from "styled-components";
export interface TypedButtonDay {
  onClick: () => void;
  className: string;
  primarycolor?: string;
  secondarycolor?: string;
}
const ButtonDayStyled = styled.p<TypedButtonDay>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  aspect-ratio: 1/1;
  margin: 5px;
  z-index: 10;
  cursor: pointer;
  border-radius: 50%;
  color: "teal";
  &:hover {
    color: white;
    background-color: teal;
  }
  &&.active {
    background-color: teal;
    color: white;
    &:hover {
      opacity: 0.7;
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
}) => {
  const myDay = setDate(value, dayNumber);
  const sameDay = mainArray && isSameDay(myDay, value);
  const activeClass = sameDay ? "active" : "";
  const handleClick = () => {
    onChange(myDay);
    setInputText(format(myDay, isoFormat));
    setIsOpen(false);
  };
  return (
    <ButtonDayStyled
      onClick={() => handleClick()}
      className={activeClass}
      primarycolor={primarycolor}
      secondarycolor={secondarycolor}
    >
      {children}
    </ButtonDayStyled>
  );
};

export default ButtonDay;
