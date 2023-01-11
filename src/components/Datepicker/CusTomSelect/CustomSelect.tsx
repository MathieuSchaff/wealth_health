import React, { useMemo } from "react";
import {
  StyledCustomSelectContainer,
  StyledCustomSelect,
  SOptionCustomSelect,
} from "./styleCustomSelect";
import uuid from "react-uuid";
import { format, isAfter, isBefore, setMonth, setYear } from "date-fns";
import { getMonthsNames } from "../datepickerUtils";
import { IArrowHeaderAria } from "../../../App";
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
const CustomSelect2 = ({
  value,
  type,
  height,
  minDate,
  maxDate,
  onChange,
  primarycolor,
  secondarycolor,
  formatMonth,
  formatYear,
  ariaArrow,
}: {
  value: Date;
  maxDate?: Date;
  minDate?: Date;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  height: number;
  type: "year" | "month";
  primarycolor?: string;
  secondarycolor?: string;
  formatMonth?: string;
  formatYear?: string;

  ariaArrow?: IArrowHeaderAria;
}) => {
  let monthOrYear = useMemo(() => {
    if (type === "month") {
      return format(value, formatMonth ?? "LLLL");
    } else {
      return format(value, formatYear ?? "yyy");
    }
  }, [formatMonth, formatYear, type, value]);
  console.log(monthOrYear);

  let testId = useMemo(() => {
    if (type === "month") {
      return "monthSelect";
    } else {
      return "yearSelect";
    }
  }, [type]);
  let accessibility = useMemo(() => {
    if (type === "month") {
      return ariaArrow?.customSelectMonth ?? "select another month";
    } else {
      return ariaArrow?.customSelectYear ?? "select another year";
    }
  }, [ariaArrow?.customSelectMonth, ariaArrow?.customSelectYear, type]);
  const monthsNames = getMonthsNames(formatMonth);

  const handleSetCurrent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    console.log(e.currentTarget.value);
    if (type === "month") {
      let indexMonth = monthsNames.findIndex(({ name }) => {
        return name.includes(e.currentTarget.value);
      });
      console.log(indexMonth);
      onChange(setMonth(value, indexMonth));
    }
    if (type === "year") {
      onChange(setYear(value, Number(e.target.value)));
    }
  };

  let content;
  let selectValue;
  if (type === "month") {
    content = monthsNames.map((month, i) => {
      const isBeforeMinDate =
        minDate !== undefined
          ? isBefore(setMonth(value, Number(month.numberIndexMonth)), minDate)
          : false;
      const isAfterDate =
        maxDate !== undefined
          ? isAfter(setMonth(value, Number(month.numberIndexMonth)), maxDate)
          : false;
      if (month.name === monthOrYear) {
        selectValue = month.name;
      }
      // Number(month.numberIndexMonth) - 1
      return (
        <SOptionCustomSelect
          key={uuid()}
          disabled={isBeforeMinDate || isAfterDate}
          primarycolor={primarycolor}
          secondarycolor={secondarycolor}
          data-testid={"month-button"}
          tabIndex={0}
          value={month.name}
        >
          {month.name}
        </SOptionCustomSelect>
      );
    });
  } else {
    let end = maxDate ? Number(format(maxDate, "yyyy")) : 2045;
    let start = minDate ? Number(format(minDate, "yyyy")) : 1900;
    let array = Array.from(Array(end - start).keys()).map(
      (x: number) => x + start
    );

    content = array.map((year) => {
      if (year === Number(monthOrYear)) {
        selectValue = year;
      }
      return (
        <SOptionCustomSelect
          key={uuid()}
          primarycolor={primarycolor}
          secondarycolor={secondarycolor}
          data-testid={"year-button"}
          tabIndex={0}
          value={year}
        >
          {year}
        </SOptionCustomSelect>
      );
    });
  }
  return (
    <StyledCustomSelectContainer>
      <StyledCustomSelect
        heightContainer={height}
        id={`${type}_dropdown`}
        onChange={(e) => handleSetCurrent(e)}
        aria-label={accessibility}
        data-testid={testId}
        value={monthOrYear}
      >
        {content}
      </StyledCustomSelect>
    </StyledCustomSelectContainer>
  );
};

export default CustomSelect2;
