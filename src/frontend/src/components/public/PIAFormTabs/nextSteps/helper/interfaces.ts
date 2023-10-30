import { PiaStatuses } from '../../../../../constant/constant';

export interface IModalObject {
  modalShow: boolean;
  modalDescription: string;
  modalTitle: string;
  value: string;
  modalButtonCancel: {
    label: string;
    className: string;
  };
  modalButtonConfirm: {
    label: string;
    className: string;
  };
  action: {
    statusChange: PiaStatuses;
  };
}

// Define an interface for the props expected by the NextStepsDelegatedFlow component
export interface NextStepsDelegatedFlowProps {
  hasAddedPiToDataElements: boolean;
}

// Define an interface for the props expected by the NextStepsPI component
export interface NextStepsPIProps {
  hasAddedPiToDataElements: boolean;
}

// Define an interface for the props expected by the PIALifecycle component
export interface PIALifecycleProps {
  hasAddedPiToDataElements: boolean;
}
