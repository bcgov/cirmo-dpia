import ViewProgramAreaReview from '../viewProgramArea';
import EditProgramAreaReview from '../editProgramArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApprovalRoles } from '../../../../../constant/constant';

import { getGUID } from '../../../../../utils/user';
import messages from './../messages';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { IReview } from '../interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../../contexts/PiaFormContext';
import { useCallback, useContext } from 'react';
import { getUserPrivilegesByStatus } from '../../../../../utils/statusList/common';

export interface IDisplayProgramAreaProps {
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
  pia: IPiaForm;
  reviewForm: IReview;
  mandatoryADM: boolean;
}

const DisplayProgramArea = (props: IDisplayProgramAreaProps) => {
  const { pia, piaStateChangeHandler } =
    useContext<IPiaFormContext>(PiaFormContext);

  // From statusList.
  const reviewPagePrivilegeParams = getUserPrivilegesByStatus(
    Object(props.pia).status,
  )?.Pages?.review?.params;

  const canEditProgramAreaReviewers =
    reviewPagePrivilegeParams?.editProgramAreaReviewers ?? false;

  const canEditProgramAreaReview =
    reviewPagePrivilegeParams?.editProgramAreaReview ?? false;

  // Logic Explanation:
  // - When this function returns true, it allows a drafter and reviewer to view their own review in view mode.
  // - When this function returns false, it allows a drafter and reviewer to edit their own review.
  const viewMode = (reviewerRole: string) => {
    const reviewerRoleAcknowledged = Object(props.pia?.review?.programArea)
      ?.reviews?.[reviewerRole]?.isAcknowledged;
    if (canEditProgramAreaReview || !reviewerRoleAcknowledged) return false;

    // if selectedRoles is null means none of selectedRole got reviewed so return true
    // otherwise loop all the role in reviews part to see if the current user already did review

    const userGuid = getGUID();
    const selectedRoles = props.reviewForm?.programArea?.selectedRoles;
    if (selectedRoles === null) return true;
    for (const role of selectedRoles) {
      if (
        props.reviewForm?.programArea?.reviews?.[role]?.reviewedByGuid ===
        userGuid
      ) {
        return false;
      }
    }

    return true;
  };

  const getSelectedRoles = () => {
    return props.reviewForm.programArea?.selectedRoles;
  };

  const deleteRole = useCallback(
    (roleIndex: number) => {
      const updatedRoles = [...props.reviewForm.programArea.selectedRoles];
      updatedRoles.splice(roleIndex, 1);

      piaStateChangeHandler(
        {
          ...props.reviewForm,
          programArea: {
            ...props.reviewForm.programArea,
            selectedRoles: updatedRoles,
          },
        },
        'review',
        true,
      );

      props.stateChangeHandler(updatedRoles, 'programArea.selectedRoles', true);
    },
    [props, piaStateChangeHandler],
  );

  return (
    <div>
      {canEditProgramAreaReviewers && <h4 className="mb-3">Selected Roles</h4>}
      {getSelectedRoles().length > 0 ? (
        getSelectedRoles().map((role: string, index: number) => {
          return getSelectedRoles() && canEditProgramAreaReviewers ? (
            <div
              key={index}
              className="d-flex gap-1 justify-content-start align-items-center"
            >
              <p className="m-0 pt-2">{role}</p>
              {props.mandatoryADM && role === ApprovalRoles.ADM ? (
                <p className="m-0 pt-2 error-text">(required for this PIA)</p>
              ) : null}
              {!props.reviewForm.programArea?.reviews?.[role] &&
                !(props.mandatoryADM && role === ApprovalRoles.ADM) && (
                  <button
                    className="bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--negative ps-3"
                    onClick={() => deleteRole(index)}
                  >
                    <FontAwesomeIcon className="" icon={faTrash} size="xl" />
                  </button>
                )}
            </div>
          ) : (
            <div className="d-flex align-items-center" key={index}>
              {viewMode(role) ||
              Object(props.pia?.review?.programArea)?.reviews?.[role]
                ?.isAcknowledged ? (
                <ViewProgramAreaReview
                  pia={props.pia}
                  role={role}
                  stateChangeHandler={props.stateChangeHandler}
                />
              ) : (
                <EditProgramAreaReview
                  pia={props.pia}
                  role={role}
                  stateChangeHandler={props.stateChangeHandler}
                />
              )}
            </div>
          );
        })
      ) : (
        <p>{messages.PiaReviewHeader.NoRolesSelected.en}</p>
      )}
    </div>
  );
};

export default DisplayProgramArea;
