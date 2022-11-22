import { IModal } from './interfaces';

const Modal = ({
  confirmLabel,
  cancelLabel,
  titleText,
  handleClose,
  handleCancel,
  show,
  children,
}: IModal) => {
  const showHideClassName = show
    ? 'modal display-block '
    : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal-main  ">
        <span className="modal-title"> {titleText}</span>
        <div className="modal-horizontal-divider"></div>
        {children}
        <div className="d-flex align-items-center justify-content-center">
          <button className="bcgovbtn bcgovbtn--primary " type="button" onClick={handleClose}>
            {confirmLabel}
          </button>
        </div>
        <div className="d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="bcgovbtn btn-secondary-modal"
            onClick={handleCancel}
          >
            {cancelLabel}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Modal;
