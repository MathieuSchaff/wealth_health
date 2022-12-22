import React from "react";
import {
  Header,
  NavButton,
  SvgButtonRightMonth,
  SvgButtonLeftMonth,
  SvgButtonLeftYear,
  SvgButtonRightYear,
} from "../Datepicker/styled";
import { subMonths, addMonths, subYears, addYears, format } from "date-fns";
const HeaderFns = ({ value, onChange }: { value: any; onChange: any }) => {
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
          minDate !== undefined
            ? minDate?.getTime() > getTimeFromState(1)
            : false
        }
      >
        <SvgButtonLeftYear />
      </NavButton>
      <NavButton
        onClick={prevMonth}
        disabled={
          minDate !== undefined
            ? minDate?.getTime() > getTimeFromState(1)
            : false
        }
      >
        <SvgButtonLeftMonth />
      </NavButton>

      <div> {month}</div>
      <div> {year}</div>
      <NavButton
        onClick={nextMonth}
        disabled={
          maxDate !== undefined
            ? maxDate?.getTime() < getTimeFromState(1)
            : false
        }
      >
        <SvgButtonRightMonth />
      </NavButton>
      <NavButton
        onClick={nextYear}
        disabled={
          maxDate !== undefined
            ? maxDate?.getTime() < getTimeFromState(1)
            : false
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
