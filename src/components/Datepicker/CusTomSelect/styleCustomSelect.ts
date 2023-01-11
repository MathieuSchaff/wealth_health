import styled from "styled-components";
import { boolean, number } from "zod";
export const StyledCustomSelectContainer = styled.div`
  flex: 1 0 0;
  position: relative;
  background-color: white;
`;

interface TitleProps {
  readonly heightContainer: number;
  id: string;
}
export interface IOptionProps {
  key: string;
  primarycolor: string;
  secondarycolor: string;
  ["data-testid"]: string;
  tabIndex: number;
  selected: boolean;
}
export const StyledCustomSelect = styled.select<TitleProps>`
  width: 100%;
  z-index: 1000;
  max-height: calc(${(props) => props.heightContainer}px - 0.5rem);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  font-size: 2rem;
`;
export const SOptionCustomSelect = styled.option<any>`
  background-color: ${(props) => props.secondarycolor || "white"};
  border: 1px solid ${(props) => props.primarycolor || "teal"};
  color: ${(props) => props.primarycolor || "teal"};
  &:hover {
    color: white;
    background-color: ${(props) => props.primarycolor || "teal"};
    color: ${(props) => props.secondarycolor || "white"};
  }
`;
