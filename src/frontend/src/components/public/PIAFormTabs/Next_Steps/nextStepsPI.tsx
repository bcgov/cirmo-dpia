import messages from './helper/messages';
import Modal from '../../../common/Modal';
import { IModalObject } from './interfaces';
import { PiaStatuses } from '../../../../constant/constant';
import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import { routes } from '../../../../constant/routes';

interface PIFlow {
  navigateFn: (url: string) => void;
}

const NextStepsPI = (navigateFn: PIFlow) => {
  const navigate = useNavigate();
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const nextStepmodalObject: IModalObject = {
    modalShow: false,
    modalTitle: '',
    modalDescription: '',
    value: '',
    modalButtonCancel: {
      label: '',
      className: '',
    },
    modalButtonConfirm: {
      label: '',
      className: '',
    },
    action: {
      statusChange: pia.status as PiaStatuses,
    },
  };

  const [nextStepAction, setNextStepAction] =
    useState<IModalObject>(nextStepmodalObject);

  const stateChangeHandler = (key: string, value: any) => {
    setNextStepAction({ ...nextStepAction, [key]: value });
  };

  const handleNextStepAction = (action: string) => {
    stateChangeHandler('modalShow', true);
    switch (action) {
      case 'share':
        /* This sets the modal information for the next step action */
        setNextStepAction({
          modalShow: true,
          modalTitle: messages.FullPIA.Modal.share.title.en,
          modalDescription: messages.FullPIA.Modal.share.description.en,
          value: 'complete',
          modalButtonCancel: {
            label: 'Cancel',
            className: 'bcgovbtn bcgovbtn__secondary',
          },
          modalButtonConfirm: {
            label: 'Yes, share',
            className: 'bcgovbtn bcgovbtn__primary',
          },
          action: {
            statusChange: PiaStatuses.EDIT_IN_PROGRESS,
          },
        });
        break;
      case 'incomplete':
        setNextStepAction({
          modalShow: true,
          modalDescription: messages.FullPIA.Modal.incomplete.description.en,
          modalTitle: messages.FullPIA.Modal.incomplete.title.en,
          value: 'save',
          modalButtonCancel: {
            label: 'Cancel',
            className: 'bcgovbtn bcgovbtn__secondary',
          },
          modalButtonConfirm: {
            label: 'Yes, stay in incomplete',
            className: 'bcgovbtn bcgovbtn__primary',
          },
          action: {
            statusChange: PiaStatuses.INCOMPLETE,
          },
        });
        break;
    }
  };

  const updateStatus = (e: any) => {
    /* set status based on what button is clicked */
    stateChangeHandler('modalShow', false);
    if (nextStepAction.value === 'complete') {
      /* set status to edit in progress */
      piaStateChangeHandler(PiaStatuses.EDIT_IN_PROGRESS, 'status');
    } else {
      piaStateChangeHandler(PiaStatuses.INCOMPLETE, 'status');
    }
    navigateFn.navigateFn(routes.PIA_DISCLOSURE_EDIT);
  };

  const handleModalCancel = () => {
    /* reset default */
    stateChangeHandler('modalShow', false);
  };

  return (
    <section className="">
      <div className="section__padding-block">
        <h4>{messages.FullPIA.FillOutPIA.heading.en}</h4>
        <div className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow  section-border-radius">
          <p>{messages.FullPIA.FillOutPIA.description.en}</p>
        </div>
      </div>
      <div className="section__padding-block">
        <h4>{messages.FullPIA.ChooseFollowing.heading.en}</h4>
        <div className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow  section-border-radius">
          <p>{messages.FullPIA.ChooseFollowing.paragraph1.en}</p>
          <p>{messages.FullPIA.ChooseFollowing.paragraph2.en}</p>
          <div className="d-flex button-container">
            <button
              className="bcgovbtn bcgovbtn__secondary"
              onClick={() => handleNextStepAction('incomplete')}
            >
              {messages.FullPIA.ChooseFollowing.Primary.en}
            </button>
            <button
              className="bcgovbtn bcgovbtn__primary"
              onClick={() => handleNextStepAction('share')}
            >
              {messages.FullPIA.ChooseFollowing.Secondary.en}
            </button>
          </div>
        </div>
      </div>

      <Modal
        confirmLabel={nextStepAction.modalButtonConfirm.label}
        cancelLabel={nextStepAction.modalButtonCancel.label}
        titleText={nextStepAction.modalTitle}
        show={nextStepAction.modalShow}
        value={nextStepAction.value}
        handleClose={(e) => updateStatus(e)}
        handleCancel={handleModalCancel}
      >
        <p className="modal-text">{nextStepAction.modalDescription}</p>
        <p className="modal-text">{nextStepAction.modalShow}</p>
      </Modal>
    </section>
  );
};

export default NextStepsPI;
