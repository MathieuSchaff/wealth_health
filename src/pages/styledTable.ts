import styled, { css } from "styled-components";
export const lightTheme = {
  white: "rgb(255, 255, 255)",
  bg: "rgb(245, 245, 245)",
  bg2: "rgb(237, 237, 237)",
  bg3: "rgb(214, 214, 214)",
  text: "rgb(33, 33, 33)",
  primary: "rgb(224, 132, 209)",
};
export const v = {
  borderRadius: "8px",

  mdSpacing: "16px",
  smSpacing: "8px",
  lgSpacing: "32px",

  sm: "37.5em",
  md: "48em",
  lg: "64em",

  boxShadow:
    "0 1px 1px rgba(0, 0, 0, 0.11), 0 2px 2px rgba(0, 0, 0, 0.11),0 4px 4px rgba(0, 0, 0, 0.11), 0 6px 8px rgba(0, 0, 0, 0.11), 0 8px 16px rgba(0, 0, 0, 0.11)",
};
export const DivContainerTable = styled.div`
  overflow: auto;
  ::-webkit-scrollbar {
    width: 7px;
  }

  ::-webkit-scrollbar-track {
    background: red;
    border-radius: 0.5rem;
    box-shadow: inset 0 0 5px grey;
  }

  ::-webkit-scrollbar-thumb {
    background: blue;
    border-radius: 0.5rem;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: green;
  }
`;
export const STable = styled.table<{ stripe: boolean }>`
  width: 100%;
  border-collapse: collapse;
  border-radius: 10px;

  text-align: center;
  overflow: hidden;
  ${(props) =>
    props.stripe &&
    css`
      tbody tr:nth-of-type(odd) {
        background-color: lightgrey;
      }
    `}
`;

export const STHead = styled.thead`
  position: sticky;
  z-index: 100;
`;

export const STHeadTR = styled.tr``;

export const STH = styled.th`
  font-weight: normal;
  padding: ${v.smSpacing};
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  /* :not(:last-of-type) {
    border-right: 1px solid ${({ theme }) => theme.bg2};
  } */
  :first-of-type {
    width: 1%;
    white-space: nowrap;
  }
  background-color: teal;

  /* Style the odd-numbered rows with a different background color */
  &:nth-of-type(odd) {
    background-color: lightgrey;
  }
`;

export const STBody = styled.tbody``;

export const STBodyTR = styled.tr`
  background: ${({ theme }) => theme.white};
`;

export const STD = styled.td`
  padding: ${v.smSpacing};
  font-size: 14px;
`;
export const SButtonHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
export const SHeaderButton = styled.button.attrs((props) => ({
  tabIndex: 0,
}))<{ disabled: boolean }>`
  background: transparent;
  cursor: pointer;
  border: none;
  outline: none;
  &:disabled {
    background-color: grey;
    color: lightgrey;
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
