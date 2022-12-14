import styled, { css } from "styled-components";

export const PickerWrapper = styled.div`
  border: 1px solid red;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    display: block;
    cursor: pointer;
  }
`;
export const SevenColGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 0.5rem;
  button {
    background-color: white;
    cursor: pointer;
    height: 100%;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }
  .active {
    background-color: teal;
  }
`;
export const StyledCustomSelectContainer = styled.div`
  flex: 1 0 0;
  position: relative;
`;
export const StyledCustomSelect = styled.div`
  position: absolute;
  top: 0;
  width: 50%;
  transform: translate(50%);
  height: ${(props) => props.heightContainer}px;
  overflow: scroll;
  overflow-x: hidden;
  z-index: 10;
  background-color: black;
  color: teal;
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
