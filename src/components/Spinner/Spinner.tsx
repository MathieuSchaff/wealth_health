import {
  SpinnerContainer,
  SpinnerStyled,
  FirstChild,
  SecChild,
  ThirdChild,
  FourChild,
} from "./Spinner.styled";

/**
 * Spinner component
 * @component
 */
export function Spinner() {
  return (
    <SpinnerContainer>
      <SpinnerStyled>
        <FirstChild></FirstChild>
        <SecChild></SecChild>
        <ThirdChild></ThirdChild>
        <FourChild></FourChild>
      </SpinnerStyled>
    </SpinnerContainer>
  );
}
