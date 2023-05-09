import { isCPORole, isMPORole } from '../../../utils/helper.util';
import { statusList } from '../../../utils/status';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import { PiaStatuses } from '../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface StatusChangeDropDownProps {
  pia: IPiaForm;
  changeStatusFn: (status: string) => void;
  mode?: 'view' | 'edit';
}

function StatusChangeDropDown(props: StatusChangeDropDownProps) {
  const isMPO = () => {
    return isMPORole();
  };

  const isCPO = () => {
    return isCPORole();
  };

  return (
    <>
      <div>Status</div>
      <div className="dropdownSatusContainer">
        {(isMPO() &&
          props.mode === 'view' &&
          statusList[props.pia.status || 'Completed'].Privileges.MPO
            .changeStatus.length !== 0) ||
        (isCPO() &&
          props.mode === 'view' &&
          statusList[props.pia.status || 'Completed'].Privileges.CPO
            ?.changeStatus) ? (
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
                  props.pia.status ? statusList[props.pia.status].class : ''
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
                  {statusList[props.pia.status].Privileges.CPO?.changeStatus
                    .length !== 0 &&
                    statusList[
                      props.pia.status
                    ].Privileges.CPO?.changeStatus.map((statuskey, index) => (
                      <li key={index} className="dropdown-item-container">
                        <div
                          className={`dropdown-item statusBlock ${statusList[statuskey].class}`}
                          onClick={() => {
                            props.changeStatusFn(statuskey);
                          }}
                        >
                          {statusList[statuskey].title}
                        </div>
                      </li>
                    ))}
                  {statusList[props.pia.status].Privileges.MPO.changeStatus
                    .length !== 0 &&
                    statusList[
                      props.pia.status
                    ].Privileges.MPO.changeStatus.map((statuskey, index) =>
                      props.pia.status !== statuskey &&
                      statuskey !== PiaStatuses.COMPLETED ? (
                        <li
                          key={index}
                          onClick={() => {
                            props.changeStatusFn(statuskey);
                          }}
                          className="dropdown-item-container"
                        >
                          <div
                            className={`dropdown-item statusBlock ${statusList[statuskey].class}`}
                          >
                            {statusList[statuskey].title}
                          </div>
                        </li>
                      ) : (
                        ''
                      ),
                    )}
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
