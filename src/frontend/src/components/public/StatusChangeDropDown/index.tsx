import { getUserRole } from '../../../utils/user';
import { ChangeStatus } from '../../../utils/statusList/types';
import { statusList } from '../../../utils/statusList/statusList';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { PiaStatuses } from '../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStatusChangeDropDownProps } from './interface';
import populateModal from './populateModal';
import {
  getUserPrivileges,
  getUserPrivilegesByStatus,
} from '../../../utils/statusList/common';

/* create a function to push unique status object into an array */
// TODO: Remove this function in favour of using a Set with reduce
function pushUniqueStatus(statuses: ChangeStatus[], status: ChangeStatus) {
  let isUnique = true;
  statuses.forEach((statusObj) => {
    if (statusObj.status === status.status) {
      isUnique = false;
    }
  });
  if (isUnique) {
    statuses.push(status);
  }
}

function StatusChangeDropDown({
  pia,
  changeStatusFn,
  mode,
}: IStatusChangeDropDownProps) {
  /* This function checks if the user has the privilege to change the status
   * of the PIA. It checks the user's role against the statusList and the
   * Privileges object. If the user's role is in the Privileges object, it
   * checks if the changeStatus is not empty. If it is not empty, it returns
   * true. Otherwise, it returns false.
   */
  const checkPrivileges = () => {
    const role = getUserRole();
    const statuses: ChangeStatus[] = [];

    let hasStatusDropdown = false;
    /* check if the changeStatus is not empty */
    if (
      (getUserPrivilegesByStatus(pia.status)?.changeStatus ?? [])?.length > 0
    ) {
      hasStatusDropdown = true;
      const statusArr = getUserPrivileges(pia)?.changeStatus ?? [];

      /* This function will push unique status object into the statuses array */
      // TODO: See above todo for pushUniqueStatus ⬆️  🤮
      statusArr.forEach((status: ChangeStatus) => {
        pushUniqueStatus(statuses, status);
      });
    }
    return {
      hasStatusDropdown,
      statuses,
    };
  };

  const { hasStatusDropdown, statuses } = checkPrivileges();

  return (
    <>
      <label htmlFor="status-dropdown">Status</label>
      <div id="status-dropdown" className="dropdownSatusContainer">
        {hasStatusDropdown ? (
          <div className="dropdown">
            <button
              className="dropdown-toggles form-control"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div
                className={`statusBlock statusBlock--active ${
                  pia.status && statusList(null)[pia.status].class
                }`}
              >
                {pia.status
                  ? statusList(null)[pia.status].title
                  : statusList(null)[PiaStatuses.INCOMPLETE].title}
              </div>
              <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
            </button>
            {pia.status ? (
              pia.status in statusList(null) ? (
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {statuses.map((statuskey, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        populateModal(pia, statuskey.status, changeStatusFn);
                      }}
                      className="dropdown-item-container"
                    >
                      <div
                        className={`dropdown-item statusBlock ${
                          statusList(null)[statuskey.status].class
                        }`}
                      >
                        {statusList(null)[statuskey.status].title}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )
            ) : (
              ''
            )}
          </div>
        ) : pia.status ? (
          pia.status in statusList(null) ? (
            <div
              className={`statusBlock ${statusList(null)[pia.status].class}`}
            >
              {pia.status ? statusList(null)[pia.status].title : 'Completed'}
            </div>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default StatusChangeDropDown;
