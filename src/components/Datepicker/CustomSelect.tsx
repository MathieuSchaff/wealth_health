import React, { useCallback, useState, useRef } from "react";
import { StyledCustomSelectContainer, StyledCustomSelect } from "./styled";
import { monthsNnames } from "./dateUtils";
import uuid from "react-uuid";
import { useOnClickOutside } from "usehooks-ts";
import { abbrMonthsNames } from "./dateUtils";

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
  type: string;
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
      if (
        maxDate &&
        new Date(currentYaer, monthIndex + 1).getTime() > maxDate?.getTime()
      ) {
        return (
          <button key={uuid()} disabled={true}>
            {month}
          </button>
        );
      }
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
      if (maxDate && year > maxDate?.getFullYear()) {
        return (
          <button key={uuid()} disabled>
            {year}
          </button>
        );
      }
      if (minDate && year < minDate?.getFullYear()) {
        return (
          <button key={uuid()} disabled>
            {year}
          </button>
        );
      }
      return (
        <button key={uuid()} onClick={() => handleSetCurrent(year)}>
          {year}
        </button>
      );
    });
  }

  useOnClickOutside(ref, handleClickOutside);
  return (
    <StyledCustomSelectContainer>
      <p onClick={() => toggleOpen()}>
        {type === "month" ? abbrMonthsNames[currentMonths] : currentYaer}
      </p>
      {isOpen && (
        <StyledCustomSelect heightContainer={heightContainer} ref={ref}>
          <div>{content}</div>
        </StyledCustomSelect>
      )}
    </StyledCustomSelectContainer>
  );
};

export default CustomSelect;
