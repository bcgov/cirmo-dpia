import messages from './helper/messages';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { PiaStateChangeHandlerType } from '../../../../pages/PIAIntakeForm';
import Modal from '../../../common/Modal';
import { useEffect, useState } from 'react';
import { IModalObject } from './interfaces';
import { PiaStatuses } from '../../../../constant/constant';
import { buildDynamicPath } from '../../../../utils/path';
import { routes } from '../../../../constant/routes';
import { HttpRequest } from '../../../../utils/http-request.util';
import {
  IPiaForm,
  IPiaFormResponse,
} from '../../../../types/interfaces/pia-form.interface';
import { API_ROUTES } from '../../../../constant/apiRoutes';

export const PIANextSteps = () => {
  const navigate = useNavigate();
  const [pia, piaStateChangeHandler] =
    useOutletContext<[IPiaForm, PiaStateChangeHandlerType]>();

  const navigateFn = async (url: string) => {
    navigate(
      buildDynamicPath(url, {
        id: pia.id,
        title: pia.title,
      }),
    );
  };

  useEffect(() => {
    if (pia.hasAddedPiToDataElements === false) {
      if (pia.isNextStepsSeenForDelegatedFlow) {
        console.log(
          'Is next steps delegated ' + pia.isNextStepsSeenForDelegatedFlow,
        );
        // redirect to view page
        navigateFn(routes.PIA_VIEW);
      } else {
        piaStateChangeHandler(true, 'isNextStepsSeenForDelegatedFlow');
        piaStateChangeHandler(false, 'isNextStepsSeenForNonDelegatedFlow');
      }
    } else {
      if (pia.isNextStepsSeenForNonDelegatedFlow) {
        console.log(
          'Is next steps Non delegated ' +
            pia.isNextStepsSeenForNonDelegatedFlow,
        );
        // redirect to next tab
        navigateFn(routes.PIA_DISCLOSURE_EDIT);
      } else {
        piaStateChangeHandler(true, 'isNextStepsSeenForNonDelegatedFlow');
        piaStateChangeHandler(false, 'isNextStepsSeenForDelegatedFlow');
      }
    }
  });

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
      statusChange: pia.status ? pia.status : PiaStatuses.INCOMPLETE,
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
          modalTitle: 'Complete PIA',
          modalDescription:
            'Your Ministry Privacy Officer (MPO) will be able to review and edit in order to help you with the PIA process.',
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
        console.log(nextStepAction.modalShow);
        break;
      case 'incomplete':
        setNextStepAction({
          modalShow: true,
          modalDescription: 'Only you will be able to view or edit the PIA.',
          modalTitle: 'Stay in Incomplete status?',
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
        console.log(nextStepAction.modalShow);
        break;
    }
  };

  const handleModalClose = (e: any) => {
    /* set status based on what button is clicked */
    stateChangeHandler('modalShow', true);
    if (nextStepAction.value === 'complete') {
      /* set status to edit in progress */
      piaStateChangeHandler(PiaStatuses.EDIT_IN_PROGRESS, 'status');
    } else {
      piaStateChangeHandler(PiaStatuses.INCOMPLETE, 'status');
    }
    navigateFn(routes.PIA_DISCLOSURE_EDIT);
  };

  const handleModalCancel = () => {
    /* reset default */
    stateChangeHandler('modalShow', false);
  };

  const triggerModal = () => {};

  return (
    <>
      <div className="nextSteps">
        <h2> {messages.PageTitle.en} </h2>
        {pia?.hasAddedPiToDataElements === true ||
        pia?.hasAddedPiToDataElements === null ? (
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
                    {messages.FullPIA.ChooseFollowing.CTA1.en}
                  </button>
                  <button
                    className="bcgovbtn bcgovbtn__primary"
                    onClick={() => handleNextStepAction('share')}
                  >
                    {messages.FullPIA.ChooseFollowing.CTA2.en}
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
              handleClose={(e) => handleModalClose(e)}
              handleCancel={handleModalCancel}
            >
              <p className="modal-text">{nextStepAction.modalDescription}</p>
              <p className="modal-text">{nextStepAction.modalShow}</p>
            </Modal>
          </section>
        ) : (
          <section className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow section__margin-block  section-border-radius">
            <h3>{messages.Delegated.heading.en}</h3>
            <p>{messages.Delegated.description.en}</p>
            <p>
              <div>{messages.Delegated.helpline.title.en}</div>
              <div>
                <a href={`tel:${messages.Delegated.helpline.telephone.en} `}>
                  {messages.Delegated.helpline.telephone.en}
                </a>
              </div>
              <div>
                <a href={`mailto:${messages.Delegated.helpline.email.en} `}>
                  {messages.Delegated.helpline.email.en}
                </a>
              </div>
            </p>
          </section>
        )}
      </div>
    </>
  );
};
