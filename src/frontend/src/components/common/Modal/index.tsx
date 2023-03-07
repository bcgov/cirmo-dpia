import { IModal } from './interfaces';

const Modal = ({
  confirmLabel,
  cancelLabel,
  titleText,
  handleClose,
  handleCancel,
  show,
  reversed,
  value,
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
        <div className={`modalbtn__container ${reversed ? 'reversed' : ''}`}>
          <button
            className="bcgovbtn bcgovbtn__primary "
            type="button"
            value={value}
            onClick={handleClose}
          >
            {confirmLabel}
          </button>
          {cancelLabel && (
            <button
              type="button"
              className="bcgovbtn bcgovbtn__secondary"
              onClick={handleCancel}
            >
              {cancelLabel}
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Modal;
