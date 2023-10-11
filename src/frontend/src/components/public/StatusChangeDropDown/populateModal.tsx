import { getUserRole } from '../../../utils/user';
import { ChangeStatus } from '../../../utils/statusList/types';
import { statusList } from '../../../utils/statusList/statusList';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { ImodalCB } from './interface';
import {
  autoSaveFailedModal,
  conflictModal,
} from '../../../utils/statusList/modals';
/*
 * This function populates the modal with the appropriate modal strings based on
 * the current status, the next status, and the user's role.
 * If the user's role is in the currentStatus Privileges object,
 * it checks if the changeStatus is not empty. If it is not empty, it checks if the
 * status is in the changeStatus array matches the nextStatus.
 * If it matches, it checks if the modal is not empty. If it is not empty, it sets the modal to the
 * modal in the changeStatus object.
 *
 * If there is no modal defined, it will use the default modal of the nextStatus.
 *
 */

const PopulateModal = (
  pia: IPiaForm,
  nextStatus: string,
  changeStatusFn: ImodalCB,
  time?: string, // Added optional time parameter passed for the auto-save failed modal
  conflictUser?: string, // Added optional conflict user for the conflict modal
) => {
  const role = getUserRole();
  let useDefault = true;
  const currentStatus = pia.status || 'Completed';

  // Handle autoSaveFailed modal with time
  if (nextStatus === '_autoSaveFailed' && time) {
    const autoSaveFailedModalWithTime = {
      ...autoSaveFailedModal,
      description: autoSaveFailedModal.description.replace('${time}', time),
    };
    changeStatusFn(autoSaveFailedModalWithTime, nextStatus);
    return;
  }

  // Handle conflict modal with conflictUser
  if (nextStatus === '_conflict' && conflictUser) {
    const conflictModalWithUser = {
      ...conflictModal, // Define a conflict modal
      title: conflictModal.title.replace('${user}', conflictUser),
      description: conflictModal.description.replace('${user}', conflictUser),
    };
    changeStatusFn(conflictModalWithUser, nextStatus);
    return;
  }

  if (
    'changeStatus' in Object(statusList(pia)[currentStatus].Privileges)[role]
  ) {
    if (
      Object(statusList(pia)[currentStatus].Privileges)[role].changeStatus
        .length !== 0
    ) {
      Object(statusList(pia)[currentStatus].Privileges)[
        role
      ].changeStatus.forEach((status: ChangeStatus) => {
        if (status.status === nextStatus) {
          if (status.modal) {
            changeStatusFn(Object(status).modal, nextStatus);
            useDefault = false;
          }
        }
      });
    }
  }
  if (useDefault) {
    changeStatusFn(Object(statusList(null)[nextStatus]).modal, nextStatus);
  }
};

export default PopulateModal;
