import { useState } from 'react';
import PopulateModal from '../../../components/public/StatusChangeDropDown/populateModal';
import { getShortTime } from '../../../utils/date';
import { buildDynamicPath } from '../../../utils/path';
import { useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../constant/routes';
import { PiaStatuses, PIOptions } from '../../../constant/constant';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';

type HandleModalProps = {
  pia: IPiaForm;
  upsertAndUpdatePia: (changes?: Partial<IPiaForm>) => Promise<IPiaForm>;
};

const useHandleModal = ({ pia, upsertAndUpdatePia }: HandleModalProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [message, setMessage] = useState('');
  const [showPiaModal, setShowPiaModal] = useState(false);
  const [piaModalConfirmLabel, setPiaModalConfirmLabel] = useState('');
  const [piaModalCancelLabel, setPiaModalCancelLabel] = useState('');
  const [piaModalTitleText, setPiaModalTitleText] = useState('');
  const [piaModalParagraph, setPiaModalParagraph] = useState('');
  const [piaModalButtonValue, setPiaModalButtonValue] = useState('');

  const populateModalFn = (modal: object) => {
    setPiaModalTitleText(Object(modal).title);
    setPiaModalParagraph(Object(modal).description);
    setPiaModalConfirmLabel(Object(modal).confirmLabel);
    setPiaModalCancelLabel(Object(modal).cancelLabel);
  };

  const handleShowModal = (modalType: string, conflictUser = '') => {
    switch (modalType) {
      case 'edit': {
        /* Using the state table, we can determine which modal to show based on the status of the PIA
          This will keep the modal text in one place and allow for easy updates in the future
          and will make the whole app consistent.
        */
        PopulateModal(
          pia,
          PiaStatuses.EDIT_IN_PROGRESS,
          populateModalFn,
          false,
        );
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'submitPiaIntake': {
        PopulateModal(
          pia,
          pia?.hasAddedPiToDataElements === false
            ? PiaStatuses.MPO_REVIEW
            : PiaStatuses.INCOMPLETE,
          populateModalFn,
          true,
        );
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'submitPiaForm': {
        PopulateModal(pia, PiaStatuses.MPO_REVIEW, populateModalFn, true);
        setPiaModalButtonValue('submitPiaForm');
        break;
      }
      case 'SubmitForCPOReview': {
        PopulateModal(pia, PiaStatuses.CPO_REVIEW, populateModalFn, true);
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'SubmitForFinalReview': {
        PopulateModal(pia, PiaStatuses.FINAL_REVIEW, populateModalFn, true);
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'SubmitForPendingCompletion': {
        PopulateModal(
          pia,
          PiaStatuses.PENDING_COMPLETION,
          populateModalFn,
          true,
        );
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'completePIA': {
        PopulateModal(pia, PiaStatuses.COMPLETE, populateModalFn, true);
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'conflict': {
        PopulateModal(
          pia,
          '_conflict',
          populateModalFn,
          false,
          '',
          conflictUser,
        );
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'autoSaveFailed': {
        const autoSaveFailedTime = getShortTime(pia?.updatedAt);
        PopulateModal(
          pia,
          '_autoSaveFailed',
          populateModalFn,
          false,
          autoSaveFailedTime,
        );
        setPiaModalButtonValue(modalType);
        break;
      }
      default: {
        break;
      }
    }
    setShowPiaModal(true);
  };

  const handleModalClose = async (event: any) => {
    setShowPiaModal(false);
    // call backend patch endpoint to save the change
    event.preventDefault();

    const buttonValue = event.target.value;
    try {
      if (buttonValue === 'submitPiaIntake') {
        const updatedPia = await upsertAndUpdatePia({
          status:
            pia?.hasAddedPiToDataElements === false
              ? PiaStatuses.MPO_REVIEW
              : PiaStatuses.INCOMPLETE,
        });
        if (
          (updatedPia?.id &&
            updatedPia?.isNextStepsSeenForNonDelegatedFlow === true &&
            (updatedPia?.hasAddedPiToDataElements === PIOptions[0].value || //  key: "yes", value: true
              updatedPia?.hasAddedPiToDataElements === PIOptions[2].value)) || //  key: "I'm not sure", value: null
          (updatedPia?.id &&
            updatedPia?.isNextStepsSeenForDelegatedFlow === true &&
            updatedPia?.hasAddedPiToDataElements === PIOptions[1].value)
        ) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: updatedPia.id,
            }),
          );
        } else {
          navigate(
            buildDynamicPath(routes.PIA_NEXT_STEPS_EDIT, {
              id: updatedPia.id,
              title: updatedPia.title,
            }),
          );
        }
      } else if (buttonValue === 'submitPiaForm') {
        const updatedPia = await upsertAndUpdatePia({
          status: PiaStatuses.MPO_REVIEW,
        });

        if (updatedPia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: updatedPia.id,
            }),
          );
        }
      } else if (buttonValue === 'edit') {
        await upsertAndUpdatePia({
          status:
            pia?.status === PiaStatuses.MPO_REVIEW
              ? PiaStatuses.EDIT_IN_PROGRESS
              : pia?.status,
        });
        navigate(pathname.replace('/view', '/edit'));
      } else if (buttonValue === 'save') {
        const newPia = await upsertAndUpdatePia();
        if (newPia?.id) {
          navigate(
            buildDynamicPath(pathname.replace('/edit', '/view'), {
              id: pia.id,
            }),
          );
        }
      } else if (buttonValue === 'SubmitForCPOReview') {
        const updatedPia = await upsertAndUpdatePia({
          status: PiaStatuses.CPO_REVIEW,
        });

        if (updatedPia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: updatedPia.id,
            }),
          );
        }
      } else if (buttonValue === 'SubmitForFinalReview') {
        const updatedPia = await upsertAndUpdatePia({
          // here not sure what status for this one, need to discuss

          status: PiaStatuses.FINAL_REVIEW,
        });

        if (updatedPia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: updatedPia.id,
            }),
          );
        }
      } else if (buttonValue === 'completePIA') {
        const updatedPia = await upsertAndUpdatePia({
          status: PiaStatuses.COMPLETE,
        });
        // need to revisit this part, current route to pia_intake tab
        // when complete PIA story done, will go to Complete PIA list page
        if (updatedPia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: updatedPia.id,
            }),
          );
        }
      } else if (buttonValue === 'SubmitForPendingCompletion') {
        const updatedPia = await upsertAndUpdatePia({
          status: PiaStatuses.PENDING_COMPLETION,
        });
        if (updatedPia?.id) {
          navigate(
            buildDynamicPath(routes.PIA_VIEW, {
              id: updatedPia.id,
            }),
          );
        }
      } else {
        // edit
        const updatedPia = await upsertAndUpdatePia();

        if (!updatedPia.id) {
          console.error('Invalid PIA id');
          throw new Error();
        }

        navigate(
          buildDynamicPath(pathname.replace('/view', '/edit'), {
            id: updatedPia.id,
          }),
        );
      }
    } catch (err: any) {
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  const handleModalCancel = () => {
    setShowPiaModal(false);
  };

  return {
    populateModalFn,
    handleShowModal,
    handleModalClose,
    handleModalCancel,
    message,
    setMessage,
    piaModalConfirmLabel,
    setPiaModalConfirmLabel,
    showPiaModal,
    setShowPiaModal,
    piaModalCancelLabel,
    setPiaModalCancelLabel,
    piaModalTitleText,
    setPiaModalTitleText,
    piaModalParagraph,
    setPiaModalParagraph,
    piaModalButtonValue,
    setPiaModalButtonValue,
  };
};

export default useHandleModal;
