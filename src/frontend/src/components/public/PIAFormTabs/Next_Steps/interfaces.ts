import { PiaStatuses } from "../../../../constant/constant";

export interface IModalObject {
    modalShow: boolean;
    modalDescription: string;
    modalTitle: string;
    value: string;
    modalButtonCancel: {
        label: string;
        className: string;
    }
    modalButtonConfirm: {
        label: string;
        className: string;
    }
    action: {
        statusChange: PiaStatuses | string;
    }

}