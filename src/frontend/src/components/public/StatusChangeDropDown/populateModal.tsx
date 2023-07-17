import { roleCheck } from '../../../utils/helper.util';
import { ChangeStatus, statusList } from '../../../utils/status';
import { deepEqual } from '../../../utils/object-comparison.util';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { ImodalCB } from './interface';

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
) => {
  const userRoles = roleCheck();
  // a drafter does not have a role, but we also allow the drafter can change a status from
  // MPO to edit_in_progress. so if no roles then this user is a drafter and assign role as DRAFTER
  let role;
  if (!deepEqual(userRoles, {})) role = userRoles.roles[0];
  else role = 'DRAFTER';
  let useDefault = true;
  const currentStatus = pia.status || 'Completed';
  if (role in statusList(null)[currentStatus].Privileges) {
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
  }
  if (useDefault) {
    changeStatusFn(Object(statusList(null)[nextStatus]).modal, nextStatus);
  }
};

export default PopulateModal;
