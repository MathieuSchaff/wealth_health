import styled, { css } from "styled-components";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
interface IContainerColors {
  readonly primarycolor?: string;
}
interface INavButtonProps {
  onClick: () => void;
  disabled: boolean;
  primarycolor?: string;
  secondarycolor?: string;
  type: string;
  ["data-testid"]: string;
  ["aria-label"]: string;
}
export const DatePickerWrapper = styled.div`
  position: relative;
`;
// creer un nav button? qui extende d'un button générique ?
// the big wrapper of all thing
export const PickerWrapper = styled.div<IContainerColors>`
  position: absolute;
  /* top: 0;
  left: 0;
  right: 0; */
  z-index: 10;
  background-color: white;
  margin-top: 10px;
  border: 1px solid red;
  border-color: ${({ primarycolor }) => primarycolor || "black"};
  color: ${({ primarycolor }) => primarycolor || "black"};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const svgStyles = ({
  primarycolor,
  secondarycolor,
}: {
  primarycolor?: string;
  secondarycolor?: string;
}) => {
  return css`
    width: 100%;
    height: 70%;
  `;
};
export const SvgButtonLeftYear = styled(BsChevronDoubleLeft)<any>`
  ${(props) => svgStyles(props)}
`;
export const SvgButtonLeftMonth = styled(BsChevronLeft)<any>`
  ${(props) => svgStyles(props)}
`;
export const SvgButtonRightYear = styled(BsChevronDoubleRight)<any>`
  ${(props) => svgStyles(props)}
`;
export const SvgButtonRightMonth = styled(BsChevronRight)<any>`
  ${(props) => svgStyles(props)}
`;
// THE BUTTON TO NAGIVATE BACK AND NEXT OF MONTHS / YEARS
export const NavButton = styled.button<INavButtonProps>`
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  color: ${(props) => props.primarycolor || "teal"};
  border: 1px solid ${(props) => props.primarycolor || "teal"};
  border-radius: 50%;
  background-color: white;
  border-radius: 50%;
  margin: 0 0.4rem;
  &:hover {
    color: white;
    background-color: ${(props) => props.primarycolor || "teal"};
  }
  &:disabled {
    opacity: 0.5;
  }
`;

export const SHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
`;
export const SevenColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  align-items: center;
`;
export const DayName = styled.p`
  font-weight: bold;
`;
export interface TypedButtonDay {
  onClick: () => void;
  className: string;
  primarycolor?: string;
  secondarycolor?: string;
}
export const ButtonDayStyled = styled.p<TypedButtonDay>`
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
    color: white;
    background-color: ${(props) => props.secondarycolor || "teal"};
  }
  &&.active {
    background-color: ${(props) => props.secondarycolor || "teal"};
    color: white;
    &:hover {
      opacity: 0.7;
    }
  }
`;
