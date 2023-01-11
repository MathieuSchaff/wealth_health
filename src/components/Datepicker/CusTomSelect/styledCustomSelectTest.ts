// import styled from "styled-components";
// import { boolean } from "zod";
// import type { IButtonSelect } from "./CustomSelectTest";
// export const StyledCustomSelectContainer = styled.div`
//   flex: 1 0 0;
//   position: relative;
//   background-color: white;
// `;

// interface TitleProps {
//   readonly heightContainer: number;
//   role: string;
//   id: string;
//   "aria-multiselectable": boolean;
// }
// export const StyledCustomSelect = styled.ul<TitleProps>`
//   position: absolute;
//   top: 0;
//   width: 100%;
//   z-index: 1000;
//   max-height: calc(${(props) => props.heightContainer}px);
//   overflow-x: hidden;
//   display: flex;
//   flex-direction: column;
// `;
// export const LiCustomSelectFns = styled.button<IButtonSelect>`
//   background-color: ${(props) => props.secondarycolor || "white"};
//   border: 1px solid ${(props) => props.primarycolor || "teal"};
//   color: ${(props) => props.primarycolor || "teal"};
//   &:hover {
//     color: white;
//     background-color: ${(props) => props.primarycolor || "teal"};
//     color: ${(props) => props.secondarycolor || "white"};
//   }
// `;
