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
  p {
    flex: 1 0 0;
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
/* ${({ fwbold }) =>
    fwbold &&
    css`
      font-weight: bold;
    `} */
// const DatePicker = ({ selectedDate, onDateChange }) => {
//   // component implementation goes here
// }

// DatePicker.propTypes = {
//   selectedDate: PropTypes.instanceOf(Date),
//   onDateChange: PropTypes.func.isRequired,
// };

// DatePicker.defaultProps = {
//   selectedDate: new Date(),
// };

// color: ${(props) => props.color2 || "palevioletred"}!important;
// color: ${(props) => props.colorInput || "palevioletred"};
