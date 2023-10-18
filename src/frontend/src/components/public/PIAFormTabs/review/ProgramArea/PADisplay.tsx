import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ApprovalRoles } from '../../../../../constant/constant';

import messages from '../messages';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { IReview } from '../interfaces';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../../contexts/PiaFormContext';
import { useCallback, useContext } from 'react';
import { getUserPrivilegesByStatus } from '../../../../../utils/statusList/common';
import { ProgramAreaReviewCard } from './PAReviewCard';

export interface IDisplayProgramAreaProps {
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
  pia: IPiaForm;
  reviewForm: IReview;
  mandatoryADM: boolean;
  printPreview: boolean;
}

export const ProgramAreaDisplay = (props: IDisplayProgramAreaProps) => {
  const { stateChangeHandler, pia, reviewForm, mandatoryADM, printPreview } =
    props;

  const { piaStateChangeHandler } = useContext<IPiaFormContext>(PiaFormContext);

  const selectedRoles = props.reviewForm?.programArea?.selectedRoles;

  // Review page privileges:
  const reviewPagePrivilegeParams = getUserPrivilegesByStatus(pia.status)?.Pages
    ?.review?.params;
  const canEditProgramAreaReviewers =
    reviewPagePrivilegeParams?.editProgramAreaReviewers ?? false;

  const deleteRole = useCallback(
    (roleIndex: number) => {
      const updatedRoles = [...reviewForm.programArea.selectedRoles];
      updatedRoles.splice(roleIndex, 1);

      piaStateChangeHandler(
        {
          ...reviewForm,
          programArea: {
            ...reviewForm.programArea,
            selectedRoles: updatedRoles,
          },
        },
        'review',
        true,
      );

      stateChangeHandler(updatedRoles, 'programArea.selectedRoles', true);
    },
    [piaStateChangeHandler, reviewForm, stateChangeHandler],
  );

  return (
    <div>
      {canEditProgramAreaReviewers && <h4 className="mb-3">Selected Roles</h4>}
      {selectedRoles.length > 0 ? (
        selectedRoles.map((role: string, index: number) => {
          return canEditProgramAreaReviewers ? (
            <div
              key={index}
              className="d-flex gap-1 justify-content-start align-items-center"
            >
              <p className="m-0 pt-2">{role}</p>
              {mandatoryADM && role === ApprovalRoles.ADM ? (
                <p className="m-0 pt-2 error-text">(required for this PIA)</p>
              ) : null}
              {!reviewForm.programArea?.reviews?.[role] &&
                !(mandatoryADM && role === ApprovalRoles.ADM) && (
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
              <ProgramAreaReviewCard
                pia={pia}
                printPreview={printPreview}
                role={role}
                stateChangeHandler={stateChangeHandler}
              />
            </div>
          );
        })
      ) : (
        <p>{messages.PiaReviewHeader.NoRolesSelected.en}</p>
      )}
    </div>
  );
};
