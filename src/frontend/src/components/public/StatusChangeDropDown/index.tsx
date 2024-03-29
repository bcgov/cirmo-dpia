import { ChangeStatus } from '../../../utils/statusList/types';
import {
  getUserPrivileges,
  getUserPrivilegesByStatus,
} from '../../../utils/statusList/common';
import { statusList } from '../../../utils/statusList/statusList';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { PiaStatuses } from '../../../constant/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IStatusChangeDropDownProps } from './interface';
import populateModal from './populateModal';
import { useEffect, useRef, useState } from 'react';
import { Tooltip } from '../../common/Tooltip/index';

function StatusChangeDropDown({
  pia,
  changeStatusFn,
}: IStatusChangeDropDownProps) {
  // Check which statuses the user can change to.
  const checkPrivileges = () => {
    // Use a Map to ensure unique status values.
    // The key will be the status string, and the value will be the entire ChangeStatus object.
    const statusesMap: Map<string, ChangeStatus> = new Map();

    const canChangeStatus = (() => {
      const privileges = getUserPrivilegesByStatus(pia.status);
      return (
        privileges?.showDropdownMenu !== false &&
        (privileges?.changeStatus ?? [])?.length > 0
      );
    })();

    // Retrieve the array of possible status changes.
    const changeStatusArr = getUserPrivileges(pia)?.changeStatus ?? [];

    // For each status object in the changeStatus array...
    changeStatusArr.forEach((status: ChangeStatus) => {
      // If this specific status string hasn't been seen before...
      // And exclude the current status when generating the dropdown menu
      if (!statusesMap.has(status.status) && status.status != pia.status) {
        // Add it to the map. This ensures each status string is unique.
        statusesMap.set(status.status, status);
      }
    });

    return {
      hasStatusDropdown: canChangeStatus,
      statuses: Array.from(statusesMap.values()),
    };
  };
  const { hasStatusDropdown, statuses } = checkPrivileges();

  // Track selected status when using keyboard naviagation.
  const itemRefs = useRef<HTMLLIElement[] | null[]>([]);
  const [selectedStatusIndex, setSelectedStatusIndex] = useState<number>(0);

  const handleNavigation = (direction: string) => {
    if (direction === 'down') {
      // Key pressed down or right.
      setSelectedStatusIndex((prev) => {
        if (prev === statuses.length - 1) {
          return 0; // Wrap around to the start
        }
        return prev + 1; // Move to the next status
      });
    } else if (direction == 'up') {
      // Key pressed up or left.
      setSelectedStatusIndex((prev) => {
        if (prev - 1 < 0) {
          return statuses.length - 1; // Wrap around to the end
        }
        return prev - 1; // Move to the prev status
      });
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) {
      handleNavigation('down');
    } else if (['ArrowUp', 'ArrowLeft'].includes(event.key)) {
      handleNavigation('up');
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent,
    statuskey: ChangeStatus,
  ) => {
    event.preventDefault();
    // Check if "Enter" key is pressed
    if (event.key === 'Enter') {
      populateModal(pia, statuskey.status, changeStatusFn, false);
    }
  };

  // Focus on the first item in the dropdown list.
  const setInitialFocus = () => itemRefs.current[0]?.focus();

  useEffect(() => {
    itemRefs.current[selectedStatusIndex]?.focus();
  }, [selectedStatusIndex]);

  const showIcon = true; // Define a boolean variable here to control the icon'
  return (
    <>
      <label htmlFor="status-dropdown">Status</label>
      {pia.status && (
        <Tooltip
          label={pia.status}
          content={statusList(null)[pia.status].tooltip}
          direction={'right'}
          showIcon={showIcon}
        />
      )}
      <div id="status-dropdown" className="dropdownSatusContainer">
        {hasStatusDropdown ? (
          <div className="dropdown">
            <button
              className="dropdown-toggles form-control"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              onKeyUp={setInitialFocus}
            >
              <div
                className={`statusBlock statusBlock--active ${
                  pia.status && statusList(null)[pia.status].class
                }`}
              >
                {
                  statusList(null)[
                    pia?.status ?? PiaStatuses.DRAFTING_IN_PROGRESS
                  ].title
                }
              </div>
              <FontAwesomeIcon className="dropdown-icon" icon={faChevronDown} />
            </button>
            {pia.status && pia.status in statusList(null) ? (
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
              >
                {statuses.map((statuskey, index) => (
                  <li
                    key={index}
                    ref={(element) => (itemRefs.current[index] = element)}
                    tabIndex={index === selectedStatusIndex ? 0 : -1}
                    onKeyDown={(event) => handleKeyDown(event, statuskey)}
                    onKeyUp={(event) => handleKeyUp(event)}
                    onClick={() => {
                      populateModal(
                        pia,
                        statuskey.status,
                        changeStatusFn,
                        false,
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
            )}
          </div>
        ) : (
          pia.status &&
          pia.status in statusList(null) && (
            <div
              className={`statusBlock ${statusList(null)[pia.status].class}`}
            >
              {pia.status ? statusList(null)[pia.status].title : 'Completed'}
            </div>
          )
        )}
      </div>
    </>
  );
}

export default StatusChangeDropDown;
