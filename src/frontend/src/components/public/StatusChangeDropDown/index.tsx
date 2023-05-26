import { roleCheck } from '../../../utils/helper.util';
import { ChangeStatus, statusList } from '../../../utils/status';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { PiaStatuses } from '../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StatusChangeDropDownProps {
  pia: IPiaForm;
  changeStatusFn: (modal: object, status: string) => void;
  mode?: 'view' | 'edit';
}

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

function StatusChangeDropDown(props: StatusChangeDropDownProps) {
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
        if (role in statusList[props.pia.status || 'Completed'].Privileges) {
          /* check if the role has changeStatus */
          if (
            'changeStatus' in
            Object(statusList[props.pia.status || 'Completed'].Privileges)[role]
          ) {
            /* check if the changeStatus is not empty */
            if (
              Object(statusList[props.pia.status || 'Completed'].Privileges)[
                role
              ].changeStatus.length !== 0
            ) {
              hasStatusDropdown = true;
              const statusObj = Object(
                statusList[props.pia.status || 'Completed'].Privileges,
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
  const populateModal = (nextStatus: string) => {
    const userRoles = roleCheck();
    const role = userRoles.roles[0];
    let useDefault = true;
    const currentStatus = props.pia.status || 'Completed';
    if (role in statusList[currentStatus].Privileges) {
      if (
        'changeStatus' in Object(statusList[currentStatus].Privileges)[role]
      ) {
        if (
          Object(statusList[currentStatus].Privileges)[role].changeStatus
            .length !== 0
        ) {
          Object(statusList[currentStatus].Privileges)[
            role
          ].changeStatus.forEach((status: ChangeStatus) => {
            if (status.status === nextStatus) {
              if (status.modal) {
                props.changeStatusFn(Object(status).modal, nextStatus);
                useDefault = false;
              }
            }
          });
        }
      }
    }
    if (useDefault) {
      props.changeStatusFn(Object(statusList[nextStatus]).modal, nextStatus);
    }
  };

  const { hasStatusDropdown, statuses } = checkPrivileges();

  return (
    <>
      <div>Status</div>
      <div className="dropdownSatusContainer">
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
                  props.pia.status && statusList[props.pia.status].class
                }`}
              >
                {props.pia.status
                  ? statusList[props.pia.status].title
                  : statusList[PiaStatuses.INCOMPLETE].title}
              </div>
              <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
            </button>
            {props.pia.status ? (
              props.pia.status in statusList ? (
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  {statuses.map((statuskey, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        populateModal(statuskey.status);
                      }}
                      className="dropdown-item-container"
                    >
                      <div
                        className={`dropdown-item statusBlock ${
                          statusList[statuskey.status].class
                        }`}
                      >
                        {statusList[statuskey.status].title}
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
          props.pia.status in statusList ? (
            <div
              className={`statusBlock ${statusList[props.pia.status].class}`}
            >
              {props.pia.status
                ? statusList[props.pia.status].title
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
