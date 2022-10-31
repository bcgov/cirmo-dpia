import { IModal } from './interfaces';

const Modal = ({
  confirmLabel,
  cancelLabel,
  handleClose,
  handleCancel,
  show,
  children,
}: IModal) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button className="btn-primary" type="button" onClick={handleClose}>
          {confirmLabel}
        </button>
        <button type="button" className="btn-secondary" onClick={handleCancel}>
          {cancelLabel}
        </button>
      </section>
    </div>
  );
};

export default Modal;
