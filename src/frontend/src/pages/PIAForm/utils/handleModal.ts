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

  // Function to populate the modal with data
  const populateModalFn = (modal: object) => {
    const { title, description, confirmLabel, cancelLabel } = Object(modal);
    setPiaModalTitleText(title);
    setPiaModalParagraph(description);
    setPiaModalConfirmLabel(confirmLabel);
    setPiaModalCancelLabel(cancelLabel);
  };

  // Function to handle showing the modal
  const handleShowModal = (modalType: string, conflictUser = '') => {
    const statusMap: Record<string, string> = {
      edit: PiaStatuses.EDIT_IN_PROGRESS,
      submitPiaForm: PiaStatuses.MPO_REVIEW,
      SubmitForCPOReview: PiaStatuses.CPO_REVIEW,
      SubmitForFinalReview: PiaStatuses.FINAL_REVIEW,
      SubmitForPendingCompletion: PiaStatuses.PENDING_COMPLETION,
      completePIA: PiaStatuses.COMPLETE,
    };

    const shouldUseFalseFlag = ['edit', 'conflict', 'autoSaveFailed'].includes(
      modalType,
    );

    switch (modalType) {
      // For these modal types, call the PopulateModal function with the appropriate parameters
      case 'edit':
      case 'submitPiaForm':
      case 'SubmitForCPOReview':
      case 'SubmitForFinalReview':
      case 'SubmitForPendingCompletion':
      case 'completePIA': {
        PopulateModal(
          pia,
          statusMap[modalType],
          populateModalFn,
          !shouldUseFalseFlag,
        );
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'submitPiaIntake': {
        // For this modal type, determine the status based on whether PI has been added to data elements
        const status =
          pia?.hasAddedPiToDataElements === false
            ? PiaStatuses.MPO_REVIEW
            : PiaStatuses.INCOMPLETE;
        PopulateModal(pia, status, populateModalFn, true);
        setPiaModalButtonValue(modalType);
        break;
      }
      case 'conflict': {
        // For this modal type, call the PopulateModal function with the appropriate parameters
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
        // For this modal type, call the PopulateModal function with the appropriate parameters
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
        return;
      }
    }
    setShowPiaModal(true);
  };

  // Function to handle closing the modal
  const handleModalClose = async (event: any) => {
    setShowPiaModal(false);
    // call backend patch endpoint to save the change
    event.preventDefault();

    const buttonValue = event.target.value;
    try {
      // Handle each button value separately
      if (buttonValue === 'submitPiaIntake') {
        const updatedPia = await upsertAndUpdatePia({
          status:
            pia?.hasAddedPiToDataElements === false
              ? PiaStatuses.MPO_REVIEW
              : PiaStatuses.INCOMPLETE,
        });
        // Navigate to the appropriate page based on the updated PIA status
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

  // Function to handle cancelling the modal
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
