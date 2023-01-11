import React from "react";
import {
  SHeader,
  NavButton,
  SvgButtonRightMonth,
  SvgButtonLeftMonth,
  SvgButtonLeftYear,
  SvgButtonRightYear,
} from "./styled";
import {
  subMonths,
  addMonths,
  subYears,
  addYears,
  isBefore,
  isAfter,
} from "date-fns";
import CustomSelect from "./CustomSelect/CustomSelect";
import { IArrowHeaderAria } from "../../App";
const Header = ({
  value,
  onChange,
  minDate,
  maxDate,
  height,
  primarycolor,
  secondarycolor,
  formatMonth,
  formatYear,
  ariaArrow,
}: {
  value: any;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  minDate?: Date;
  maxDate?: Date;
  height: number;
  primarycolor?: string;
  secondarycolor?: string;
  formatMonth?: string;
  formatYear?: string;

  ariaArrow?: IArrowHeaderAria;
}) => {
  const prevMonth = () => {
    onChange(subMonths(value, 1));
  };
  const nextMonth = () => {
    onChange(addMonths(value, 1));
  };
  const prevYear = () => {
    onChange(subYears(value, 1));
  };
  const nextYear = () => {
    onChange(addYears(value, 1));
  };

  return (
    <SHeader>
      <NavButton
        onClick={prevYear}
        disabled={
          minDate !== undefined ? isBefore(subYears(value, 1), minDate) : false
        }
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
        type="button"
        data-testid="prev-year"
        aria-label={ariaArrow?.prevYear ?? "go to previous year"}
      >
        <SvgButtonLeftYear />
      </NavButton>
      <NavButton
        onClick={prevMonth}
        disabled={
          minDate !== undefined ? isBefore(subMonths(value, 1), minDate) : false
        }
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
        type="button"
        data-testid="prev-month"
        aria-label={ariaArrow?.prevMonth ?? "go to previous month"}
      >
        <SvgButtonLeftMonth />
      </NavButton>
      <CustomSelect
        value={value}
        onChange={onChange}
        height={height}
        type="month"
        minDate={minDate}
        maxDate={maxDate}
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
        formatMonth={formatMonth}
        ariaArrow={ariaArrow}
        formatYear={formatYear}
      />
      <CustomSelect
        value={value}
        onChange={onChange}
        height={height}
        type="year"
        minDate={minDate}
        maxDate={maxDate}
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
        ariaArrow={ariaArrow}
        formatYear={formatYear}
      />

      <NavButton
        onClick={nextMonth}
        disabled={maxDate !== undefined && isAfter(value, maxDate)}
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
        type="button"
        data-testid="next-month"
        aria-label={ariaArrow?.nextMonth ?? "go to next month"}
      >
        <SvgButtonRightMonth />
      </NavButton>
      <NavButton
        onClick={nextYear}
        disabled={maxDate !== undefined && isAfter(addYears(value, 1), maxDate)}
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
        type="button"
        data-testid="next-year"
        aria-label={ariaArrow?.nextYear ?? "go to next year"}
      >
        <SvgButtonRightYear />
      </NavButton>
    </SHeader>
  );
};

export default Header;
