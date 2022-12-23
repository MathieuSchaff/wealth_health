import styled from "styled-components";
import type { IButtonSelect } from "./CustomSelectFns";
export const StyledCustomSelectContainer = styled.div`
  flex: 1 0 0;
  position: relative;
  background-color: white;
`;

interface TitleProps {
  readonly heightContainer: number;
}
export const StyledCustomSelect = styled.div<TitleProps>`
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1000;
  max-height: calc(${(props) => props.heightContainer}px - 0.5rem);
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;
export const ButtonCustomSelectFns = styled.button<IButtonSelect>`
  background-color: ${(props) => props.secondarycolor || "white"};
  border: 1px solid ${(props) => props.primarycolor || "teal"};
  color: ${(props) => props.primarycolor || "teal"};
  &:hover {
    color: white;
    background-color: ${(props) => props.primarycolor || "teal"};
    color: ${(props) => props.secondarycolor || "white"};
  }
`;

// /* width */
// ::-webkit-scrollbar {
//   width: 10px;
// }

// /* Track */
// ::-webkit-scrollbar-track {
//   background: #f1f1f1;
// }

// /* Handle */
// ::-webkit-scrollbar-thumb {
//   background: #888;
// }

// /* Handle on hover */
// ::-webkit-scrollbar-thumb:hover {
//   background: #555;
// }
