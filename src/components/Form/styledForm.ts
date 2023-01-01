import styled, { css } from "styled-components";
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecf0f1;
  border-radius: 2rem;
  font-family: "Lato", sans-serif;
  max-width: 450px;
`;
export const TitleForm = styled.h2`
  color: #3498db;
  font-weight: bold;
  font-size: 1.4rem;
  font-family: "Oswald", sans-serif;
`;

export const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 35px;
`;

export const InputForm = styled.input`
  max-width: 225px;
  padding: 6px;
  font-size: 15px;
  border-width: 1px;
  border-color: #cccccc;
  background-color: #ffffff;
  color: #000000;
  border-style: solid;
  border-radius: 8px;
  box-shadow: 0px 0px 5px rgba(66, 66, 66, 0.75);
  outline: none;

  &:hover {
    outline: none;
  }
`;
export const LabelForm = styled.label`
  font-size: 15px;
  font-weight: bold;
  line-height: 1.9rem;
`;
export const FieldSetForm = styled.fieldset`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
  padding: 1rem 1.4rem 2rem 1.4rem;
  border-radius: 25px;
  background-color: #bdc3c7;
`;
export const LegendFormAdress = styled.h3`
  font-size: 1rem;
  font-weight: bold;
  color: #3498db;
  margin-bottom: 10px;
`;
export const ButtonSubmit = styled.button`
  background: white;
  color: #3498db;
  min-width: 130px;
  height: 40px;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  margin-top: 2rem;
  border: 2px solid #3498db;
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
    background: #3498db;
  }
`;
