import styled, { keyframes } from "styled-components";

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const SpinnerStyled = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;
const rotate = keyframes`
0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const SpinnerChild = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #54a0ff;
  border-radius: 50%;
  animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #54a0ff transparent transparent transparent;
`;

export const FirstChild = styled(SpinnerChild)`
  animation-delay: -0.45s;
`;
export const SecChild = styled(SpinnerChild)`
  animation-delay: -0.3s;
`;
export const ThirdChild = styled(SpinnerChild)`
  animation-delay: -0.15s;
`;
export const FourChild = styled(SpinnerChild)`
  animation-delay: 0;
`;
