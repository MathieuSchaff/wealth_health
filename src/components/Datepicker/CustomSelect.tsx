import React, { useCallback, useState } from "react";
import { StyledCustomSelectContainer, StyledCustomSelect } from "./styled";
import { monthsNnames } from "./dateUtils";
import uuid from "react-uuid";
const CustomSelect = ({
  current,
  type,
  heightContainer,
}: {
  heightContainer: number;
  current: string | number;
  type: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const selectNewDate = useCallback(() => {
    setIsOpen(false);
  }, []);
  let content;
  if (type === "month") {
    content = monthsNnames.map((month) => (
      <option key={uuid()} value={month}>
        {month}
      </option>
    ));
  } else {
    let end = 2045;
    let start = 1900;
    let array = Array.from(Array(end - start).keys()).map(
      (x: number) => x + start
    );
    content = array.map((year) => (
      <option key={uuid()} value={year}>
        {year}
      </option>
    ));
  }
  return (
    <StyledCustomSelectContainer>
      <p onClick={() => toggleOpen()}>{current}</p>
      {isOpen && (
        <StyledCustomSelect heightContainer={heightContainer}>
          <div>{content}</div>
        </StyledCustomSelect>
      )}
    </StyledCustomSelectContainer>
  );
};

export default CustomSelect;
