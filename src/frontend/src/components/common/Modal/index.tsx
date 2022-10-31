import { IModal } from './interfaces';

const Modal = ({ buttonLabel, handleClose, show, children }: IModal) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button type="button" onClick={handleClose}>
          {buttonLabel}
        </button>
      </section>
    </div>
  );
};

export default Modal;
