import React from "react";
import {
  Header,
  NavButton,
  SvgButtonRightMonth,
  SvgButtonLeftMonth,
  SvgButtonLeftYear,
  SvgButtonRightYear,
} from "../Datepicker/styled";
import {
  subMonths,
  addMonths,
  subYears,
  addYears,
  format,
  isBefore,
  isAfter,
} from "date-fns";
const HeaderFns = ({
  value,
  onChange,
  minDate,
  maxDate,
}: {
  value: any;
  onChange: any;
  minDate?: Date;
  maxDate?: Date;
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
  const month = format(value, "MMM");
  const year = format(value, "yyy");

  return (
    <Header>
      <NavButton
        onClick={prevYear}
        disabled={
          minDate !== undefined ? isBefore(subYears(value, 1), minDate) : false
        }
      >
        <SvgButtonLeftYear />
      </NavButton>
      <NavButton
        onClick={prevMonth}
        disabled={
          minDate !== undefined ? isBefore(subMonths(value, 1), minDate) : false
        }
      >
        <SvgButtonLeftMonth />
      </NavButton>

      <div> {month}</div>
      <div> {year}</div>
      <NavButton
        onClick={nextMonth}
        disabled={
          maxDate !== undefined ? isAfter(addMonths(value, 1), maxDate) : false
        }
      >
        <SvgButtonRightMonth />
      </NavButton>
      <NavButton
        onClick={nextYear}
        disabled={
          maxDate !== undefined ? isAfter(addYears(value, 1), maxDate) : false
        }
      >
        <SvgButtonRightYear />
      </NavButton>
    </Header>
  );
};

export default HeaderFns;
{
  /* <NavButton
onClick={nextYear}
disabled={
  maxDate !== undefined
    ? maxDate?.getTime() < getTimeFromState(1)
    : false
}
primarycolor={primarycolor}
secondarycolor={secondarycolor}
>
<SvgButtonRightYear
  primarycolor={primarycolor}
  secondarycolor={secondarycolor}
/>
</NavButton> */
}
