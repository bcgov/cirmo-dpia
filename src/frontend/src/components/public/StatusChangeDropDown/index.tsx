import { roleCheck } from '../../../utils/helper.util';
import { ChangeStatus, statusList } from '../../../utils/status';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { PiaStatuses } from '../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStatusChangeDropDownProps } from './interface';
import populateModal from './populateModal';

/* create a function to push unique status object into an array */
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

function StatusChangeDropDown(props: IStatusChangeDropDownProps) {
  /* This function checks if the user has the privilege to change the status
   * of the PIA. It checks the user's role against the statusList and the
   * Privileges object. If the user's role is in the Privileges object, it
   * checks if the changeStatus is not empty. If it is not empty, it returns
   * true. Otherwise, it returns false.
   */
  const checkPrivileges = () => {
    const roles = roleCheck();
    const statuses: ChangeStatus[] = [];

    let hasStatusDropdown = false;
    if (roles !== undefined && roles.roles !== undefined) {
      roles.roles.forEach((role: string) => {
        /* check if the role is in the statusList */
        if (
          role in statusList(null)[props.pia.status || 'Completed'].Privileges
        ) {
          /* check if the role has changeStatus */
          if (
            'changeStatus' in
            Object(
              statusList(null)[props.pia.status || 'Completed'].Privileges,
            )[role]
          ) {
            /* check if the changeStatus is not empty */
            if (
              Object(
                statusList(null)[props.pia.status || 'Completed'].Privileges,
              )[role].changeStatus.length !== 0
            ) {
              hasStatusDropdown = true;
              const statusObj = Object(
                statusList(null)[props.pia.status || 'Completed'].Privileges,
              )[role].changeStatus;

              /* This function will push unique status object into the statuses array */
              statusObj.forEach((status: ChangeStatus) => {
                pushUniqueStatus(statuses, status);
              });
            }
          }
        }
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
                  props.pia.status && statusList(null)[props.pia.status].class
                }`}
              >
                {props.pia.status
                  ? statusList(null)[props.pia.status].title
                  : statusList(null)[PiaStatuses.INCOMPLETE].title}
              </div>
              <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
            </button>
            {props.pia.status ? (
              props.pia.status in statusList(null) ? (
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {statuses.map((statuskey, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        populateModal(
                          props.pia,
                          statuskey.status,
                          props.changeStatusFn,
                        );
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
        ) : props.pia.status ? (
          props.pia.status in statusList(null) ? (
            <div
              className={`statusBlock ${
                statusList(null)[props.pia.status].class
              }`}
            >
              {props.pia.status
                ? statusList(null)[props.pia.status].title
                : 'Completed'}
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
