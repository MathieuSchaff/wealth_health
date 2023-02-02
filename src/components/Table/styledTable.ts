import styled, { css } from "styled-components";
import Select from "react-select";
import { BsFileArrowDownFill, BsFileArrowUpFill } from "react-icons/bs";

export const StyledArrowHeaderDown = styled(BsFileArrowDownFill)<{
  disabled: boolean;
}>`
  font-size: 2.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
`;
export const StyledArrowHeaderUp = styled(BsFileArrowUpFill)<{
  disabled: boolean;
}>`
  font-size: 2.5rem;
  margin-top: 1rem;
`;
export const SContainerPageTable = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DivContainerTable = styled.div`
  overflow: auto;
  margin: 0 0;
  /* @media (min-width: 1378px) {
    margin: 0 auto;
  } */
  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.primary};
    border-radius: 0.5rem;
    box-shadow: inset 0 0 5px grey;
  }

  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.indianRed};
    border-radius: 0.5rem;
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.indianRed};
    cursor: pointer;
  }
`;
export const SInputGlobalFilter = styled.input`
  padding: 6px;
  border-style: solid;
  margin: 2rem 0;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.input};
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
  outline: none;
  width: 100%;
  &:hover {
    outline: none;
  }
  @media (min-width: 600px) {
    max-width: 300px;
    min-width: 250px;
  }

  @media (min-width: 1378px) {
    margin: 2rem auto;
    width: 100%;
  }
`;
export const STable = styled.table<{ stripe: boolean }>`
  border-collapse: collapse;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  overflow: hidden;
  @media (min-width: 1200px) {
    width: 100% !important;
  }
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
  color: ${({ theme }) => theme.colors.white};
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
  border-left: 1px solid ${({ theme }) => theme.colors.white};

  :first-of-type {
    white-space: nowrap;
    border-left: none;
  }
  background-color: ${({ theme }) => theme.colors.primary};

  /* Style the odd-numbered rows with a different background color */
`;

export const STBody = styled.tbody``;

export const STBodyTR = styled.tr`
  background: ${({ theme }) => theme.colors.white};
`;

export const STD = styled.td`
  padding: ${({ theme }) => theme.table.mdSpacing};
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
  height: 4rem;
  width: 4rem;
  &:disabled {
    background-color: grey;
    color: lightgrey;
    cursor: not-allowed;
    opacity: 0.3;
  }
`;
export const SButtonTableContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 600px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const SContainerButtonArrow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;
export const SContainerRest = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  margin-left: 1rem;
`;
export const SButtonArrow = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 2rem;
  margin: 1rem;
  cursor: pointer;
  height: 4rem;
  width: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
  }
`;
export const STableSpan = styled.span``;
export const STableNumberInputPage = styled.input`
  max-width: 100px;
  padding: 6px;
  margin-left: 1rem;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSize.input};
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
  outline: none;
  &:hover {
    outline: none;
  }
`;
export const STableSelect = styled.select`
  color: ${({ theme }) => theme.colors.primary};
  max-width: 250px;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.primary};
  background-color: #ffffff;
  font-size: ${({ theme }) => theme.fontSize.input};
  font-weight: 500;
  border-radius: 6px;
  box-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
  outline: none;
  cursor: pointer;
`;
