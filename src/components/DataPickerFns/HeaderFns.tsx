import React from "react";
import {
  Header,
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
import CustomSelect from "./CustomSelectFns";
const HeaderFns = ({
  value,
  onChange,
  minDate,
  maxDate,
  height,
  primarycolor,
  secondarycolor,
}: {
  value: any;
  onChange: React.Dispatch<React.SetStateAction<Date>>;
  minDate?: Date;
  maxDate?: Date;
  height: number;
  primarycolor?: string;
  secondarycolor?: string;
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
    <Header>
      <NavButton
        onClick={prevYear}
        disabled={
          minDate !== undefined ? isBefore(subYears(value, 1), minDate) : false
        }
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
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
      />

      <NavButton
        onClick={nextMonth}
        disabled={maxDate !== undefined && isAfter(value, maxDate)}
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
      >
        <SvgButtonRightMonth />
      </NavButton>
      <NavButton
        onClick={nextYear}
        disabled={maxDate !== undefined && isAfter(addYears(value, 1), maxDate)}
        primarycolor={primarycolor}
        secondarycolor={secondarycolor}
      >
        <SvgButtonRightYear />
      </NavButton>
    </Header>
  );
};

export default HeaderFns;
