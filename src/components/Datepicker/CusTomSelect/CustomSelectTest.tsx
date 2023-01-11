// import React, { useCallback, useState, useRef, useMemo } from "react";
// import {
//   StyledCustomSelectContainer,
//   StyledCustomSelect,
// } from "./styledCustomSelect";
// import uuid from "react-uuid";
// import { useOnClickOutside } from "usehooks-ts";
// import { format, isAfter, isBefore, setMonth, setYear } from "date-fns";
// import { getMonthsNames } from "../datepickerUtils";
// import { LiCustomSelectFns } from "./styledCustomSelect";
// import { IArrowHeaderAria } from "../../../App";
// export interface IButtonSelect {
//   key: string;
//   onClick: (monthOrYaer: number) => void;
//   disabled?: boolean;
//   primarycolor?: string;
//   secondarycolor?: string;
// }

// /**
//  * This function is the month or the yaer.
//  * And you can select also which month or year you want
//  * @param {Object} props - The props passed to the CustomSelect
//  * @param {number} props.currentMonths - The month selected above ( will be the month now by default)
//  * @param {number} props.currentYaer -  The year selected above ( will be the year now by default)
//  * @param {number} props.type -  The type of the CustomSelect. ( can be "month" or "year")
//  * @param {number} props.heightContainer -  The height of the container
//  * @param {React.Dispatch<React.SetStateAction<number>>} props.setCurrent -  The function to handle the selected date( this func may vary depending on the type of the CustomSelect)
//  * @param {Date} props.minDate -  The min date
//  * @param {Date} props.maxDate - The max date
//  * @returns
//  */
// const CustomSelect = ({
//   value,
//   type,
//   height,
//   minDate,
//   maxDate,
//   onChange,
//   primarycolor,
//   secondarycolor,
//   formatMonth,
//   formatYear,
//   ariaArrow,
// }: {
//   value: Date;
//   maxDate?: Date;
//   minDate?: Date;
//   onChange: React.Dispatch<React.SetStateAction<Date>>;
//   height: number;
//   type: "year" | "month";
//   primarycolor?: string;
//   secondarycolor?: string;
//   formatMonth?: string;
//   formatYear?: string;

//   ariaArrow?: IArrowHeaderAria;
// }) => {
//   const ref = useRef<HTMLDivElement>(null);
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [selectedValue, setSelectedValue] = useState("Option 1");

//   const toggleOpen = useCallback(() => {
//     setIsOpen((prev) => !prev);
//   }, []);
//   // quand je clique a coté mais dans le calendar, je veux fermer dropdown
//   const handleClickOutside = () => {
//     toggleOpen();
//   };
//   // I want to set the value of the higher state to be the month click or the year clicked
//   const handleSetCurrent = (monthOrYaer: number) => {
//     if (type === "month") {
//       onChange(setMonth(value, monthOrYaer));
//     }
//     if (type === "year") {
//       onChange(setYear(value, monthOrYaer));
//     }
//     toggleOpen();
//   };
//   const monthsNames = getMonthsNames(formatMonth);
//   const handleKeyDown = (
//     event: React.KeyboardEvent<HTMLButtonElement>,
//     monthOrYaer: number
//   ) => {
//     if (event.code === "Enter" || event.code === "NumpadEnter") {
//       handleSetCurrent(monthOrYaer);
//     }
//     if (event.code === "Escape") {
//       setIsOpen(false);
//     }
//   };
//   let content;
//   if (type === "month") {
//     content = monthsNames.map((month) => {
//       const isBeforeMinDate =
//         minDate !== undefined
//           ? isBefore(setMonth(value, Number(month.numberIndexMonth)), minDate)
//           : false;
//       const isAfterDate =
//         maxDate !== undefined
//           ? isAfter(setMonth(value, Number(month.numberIndexMonth)), maxDate)
//           : false;
//       return (
//         <LiCustomSelectFns
//           key={uuid()}
//           onClick={() => handleSetCurrent(Number(month.numberIndexMonth) - 1)}
//           onKeyDown={(e) =>
//             handleKeyDown(e, Number(month.numberIndexMonth) - 1)
//           }
//           disabled={isBeforeMinDate || isAfterDate}
//           primarycolor={primarycolor}
//           secondarycolor={secondarycolor}
//           data-testid={"month-button"}
//           // id={`${namespace}_element_${optionValue}`}
//           // aria-selected={optionValue === value}
//           role="option"
//           tabIndex={0}
//         >
//           {month.name}
//         </LiCustomSelectFns>
//       );
//     });
//   } else {
//     let end = maxDate ? Number(format(maxDate, "yyyy")) : 2045;
//     let start = minDate ? Number(format(minDate, "yyyy")) : 1900;
//     let array = Array.from(Array(end - start).keys()).map(
//       (x: number) => x + start
//     );

//     content = array.map((year) => {
//       // if the year of the future button is superior to the max date the button will be disable
//       // it will render the button inside and this button will allow to select a year
//       return (
//         <LiCustomSelectFns
//           key={uuid()}
//           onClick={() => handleSetCurrent(year)}
//           primarycolor={primarycolor}
//           secondarycolor={secondarycolor}
//           data-testid={"year-button"}
//           role="option"
//           tabIndex={0}
//           onKeyDown={(e) => handleKeyDown(e, Number(year))}
//         >
//           {year}
//         </LiCustomSelectFns>
//       );
//     });
//   }

//   useOnClickOutside(ref, handleClickOutside);
//   let accessibility;
//   let monthOrYear;
//   let testId;
//   if (type === "month") {
//     monthOrYear = format(value, formatMonth ?? "LLL");
//     accessibility = ariaArrow?.customSelectMonth ?? "select another month";
//     testId = "monthSelect";
//   } else {
//     monthOrYear = format(value, formatYear ?? "yyy");
//     accessibility = ariaArrow?.customSelectYear ?? "select another year";
//     testId = "yearSelect";
//   }
//   console.log(value);
//   return (
//     <StyledCustomSelectContainer>
//       <button
//         onClick={() => toggleOpen()}
//         data-testid={testId}
//         aria-haspopup="true"
//         aria-label={accessibility}
//         aria-controls={`${type}_dropdown`}
//         aria-labelledby={`${type}_label`}
//         aria-expanded={isOpen}
//         type="button"
//       >
//         {monthOrYear}
//       </button>
//       {isOpen && (
//         <StyledCustomSelect
//           heightContainer={height}
//           role="listbox"
//           id={`${type}_dropdown`}
//           aria-multiselectable={false}
//         >
//           {content}
//         </StyledCustomSelect>
//       )}
//     </StyledCustomSelectContainer>
//   );
// };

// export default CustomSelect;
