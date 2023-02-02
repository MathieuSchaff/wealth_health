import styled from "styled-components";

export const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);

  .modal-content {
    display: flex;
    flex-direction: column;
    width: auto;
    padding: 1rem 1.5rem 2rem 1.5rem;
    pointer-events: auto;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    outline: 0;
  }

  .modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;
    border-top-left-radius: calc(0.3rem - 1px);
    border-top-right-radius: calc(0.3rem - 1px);
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }
`;
export const StyledButtonmodal = styled.button`
  background-color: #fff;
  padding: 0.3rem;
  border-radius: 0.25rem;
  color: #54a0ff;
  cursor: pointer;
  display: inline-block;
  font-size: 4rem;
  outline: none;
`;
