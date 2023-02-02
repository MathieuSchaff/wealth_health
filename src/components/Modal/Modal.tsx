import { createPortal } from "react-dom";
import { StyledButtonmodal, StyledModal } from "./Modal.styled";
interface ModalProps {
  onClose: () => void;
}
function Modal({ onClose }: ModalProps) {
  return createPortal(
    <>
      <StyledModal className="modal fade show">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Success</h5>
            <StyledButtonmodal
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" onClick={onClose}>
                &times;
              </span>
            </StyledButtonmodal>
          </div>
          <div className="modal-body">
            <p>Users added successfully!</p>
          </div>
        </div>
      </StyledModal>
    </>,
    document.body
  );
}
export default Modal;
