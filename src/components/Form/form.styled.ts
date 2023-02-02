import styled from "styled-components";
import Select from "react-select";

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 450px;
  width: 100%;
  border-radius: 88% 12% 91% 9% / 19% 92% 8% 81%;
  border: solid 10px ${({ theme }) => theme.colors.primary};
  background: linear-gradient(
    90deg,
    rgba(46, 134, 222, 1) 0%,
    rgba(46, 134, 222, 1) 22%,
    rgba(84, 160, 255, 1) 100%
  );
  :focus-within {
    background: ${({ theme }) => theme.colors.white};
    label {
      color: ${({ theme }) => theme.colors.primary};
    }
    fieldset {
      background-color: ${({ theme }) => theme.colors.primary};

      label {
        color: ${({ theme }) => theme.colors.white};
      }
      h3 {
        color: ${({ theme }) => theme.colors.white};
      }
    }
  }
`;
export const TitleForm = styled.h2`
  font-weight: bold;
  font-size: 3rem;
  margin-top: 3rem;
  font-family: "Oswald", sans-serif;
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 2rem;
`;

const BasicLabel = styled.label`
  display: flex;
  flex-direction: column;
  font-weight: bold;
  margin-bottom: 0.4rem;
`;
export const StyledDivTest = styled.div`
  display: flex;
  flex-direction: column;
`;
export const LabelTop = styled(BasicLabel)`
  justify-self: flex-start;
  color: ${({ theme }) => theme.colors.white};
`;
export const LabelFieldSet = styled(BasicLabel)`
  color: ${({ theme }) => theme.colors.primary};
`;
export const FieldSetForm = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.2rem 0;
  padding: 1rem 1.4rem 2rem 1.4rem;
  border-radius: 25px;
  background-color: ${({ theme }) => theme.colors.white};
`;
export const LegendFormAdress = styled.h3`
  align-self: center;
  font-size: 2.3rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.colors.primary};
`;
export const ButtonSubmit = styled.button`
  background: white;
  color: ${({ theme }) => theme.colors.primary};
  min-width: 130px;
  height: 40px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 6px;
  border: none;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  z-index: 0;
  &:hover {
    background: white;
    color: white;
  }
  &:hover::after {
    height: 100%;
  }
  &:after {
    content: "";
    position: absolute;
    z-index: -1;
    transition: all 0.3s ease;
    left: 0;
    bottom: 0;
    height: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.primary};
  }
`;
export const StyledSelect = styled(Select)`
  color: ${({ theme }) => theme.colors.primary};
  .react-select__control {
    max-width: 250px;
    border-style: solid;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: #ffffff;
    font-size: ${({ theme }) => theme.fontSize.input};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 500;
    border-radius: 6px;
    box-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
    outline: none;
    cursor: pointer;
  }
  .react-select__single-value {
    color: ${({ theme }) => theme.colors.primary};
  }
  .react-select__indicator-separator {
    display: none;
  }
`;
export const StyledErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.errorColor};
`;
export const InputForm = styled.input`
  max-width: 300px;
  min-width: 250px;
  padding: 8px;
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
  &:focus {
  }

  &::placeholder {
    font-size: ${({ theme }) => theme.fontSize.input};
    font-weight: 500;
    opacity: 0.7;
  }
`;
