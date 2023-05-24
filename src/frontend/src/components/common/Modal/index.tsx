import { useEffect, useRef } from 'react';
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
  const confirmButtonRef = useRef(null);
  const cancelButtonRef = useRef(null);

  const modalRef = useRef(null);
  const modalRefCurrent = modalRef.current;
  const currentFocusIndex = useRef(0);

  const setFocusOnElement = (el: Element | HTMLElement | null) => {
    if (!el) return;

    (el as HTMLElement).focus();
  };

  useEffect(() => {
    if (!modalRefCurrent) return;

    const dialogElement = modalRefCurrent as HTMLElement;
    const modalButtons = [confirmButtonRef, cancelButtonRef];

    if (show) {
      setFocusOnElement(modalButtons[0].current);
    }

    const dialogKeydownHandler = (e: any) => {
      const keyboardEvent = e as KeyboardEvent;

      if (keyboardEvent.key === 'Escape') {
        handleCancel(e);
      }

      if (keyboardEvent.key === 'Tab') {
        if (keyboardEvent.shiftKey) {
          currentFocusIndex.current--;
          if (currentFocusIndex.current < 0) {
            currentFocusIndex.current = modalButtons.length - 1;
          }
        } else {
          currentFocusIndex.current++;
          if (currentFocusIndex.current > modalButtons.length - 1) {
            currentFocusIndex.current = 0;
          }
        }
        if (modalButtons[currentFocusIndex.current]?.current) {
          setFocusOnElement(modalButtons[currentFocusIndex.current].current);
          e.preventDefault();
        }
      }
    };

    dialogElement.addEventListener('keydown', dialogKeydownHandler);

    return () => {
      dialogElement.removeEventListener('keydown', dialogKeydownHandler);
    };
  }, [handleCancel, modalRefCurrent, show]);

  const showHideClassName = show
    ? 'modal display-block '
    : 'modal display-none';

  return (
    <div className={showHideClassName} tabIndex={0} ref={modalRef}>
      <section className="modal-main">
        <span className="modal-title"> {titleText}</span>
        <div className="modal-horizontal-divider"></div>
        {children}
        <div
          className={`modalbtn__container ${reversed ? 'reversed' : ''} mt-4`}
        >
          <button
            ref={confirmButtonRef}
            className="bcgovbtn bcgovbtn__primary "
            type="button"
            value={value}
            onClick={handleClose}
            aria-label={confirmLabel}
          >
            {confirmLabel}
          </button>
          {cancelLabel && (
            <button
              ref={cancelButtonRef}
              type="button"
              className="bcgovbtn bcgovbtn__secondary"
              onClick={handleCancel}
              aria-label={cancelLabel}
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
