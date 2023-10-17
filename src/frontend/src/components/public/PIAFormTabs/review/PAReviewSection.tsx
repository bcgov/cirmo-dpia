import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import messages from './messages';
import { IReview } from './interfaces';
import { useState } from 'react';
import { getUserPrivileges } from '../../../../utils/statusList/common';
import { ProgramAreaDisplay } from './ProgramArea/PADisplay';
import { AddRoleInput } from './ProgramArea/AddRoleInput';
import { AddRoleDropdown } from './ProgramArea/AddRoleDropdown';
import { AddHideRolesToggle } from './ProgramArea/AddHideRolesToggle';

interface IPAReviewProps {
  pia: IPiaForm;
  printPreview?: boolean;
  addRole: (role: string) => void;
  reviewForm: IReview;
  mandatoryADM: boolean;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
}

export const ProgramAreaReviewSection = (props: IPAReviewProps) => {
  const {
    pia,
    printPreview,
    addRole,
    reviewForm,
    mandatoryADM,
    stateChangeHandler,
  } = props;

  // Review page privileges:
  const reviewPageParams = getUserPrivileges(pia)?.Pages?.review?.params;
  const canEditProgramAreaReviewers =
    reviewPageParams?.editProgramAreaReviewers ?? false;

  const [rolesSelect, setRolesSelect] = useState<string>('');
  const [rolesInput, setRolesInput] = useState<string>('');
  const [showAddRolesArea, setShowAddRolesArea] = useState<boolean>(false);

  return (
    <>
      <h3>{messages.PiaReviewHeader.ProgramAreaSection.Title.en}</h3>
      <p className="pb-4">
        {messages.PiaReviewHeader.ProgramAreaSection.Description.en}
      </p>

      <section className="drop-shadow card p-4 p-md-5">
        {/* Program Area reviews */}
        <ProgramAreaDisplay
          reviewForm={reviewForm}
          pia={pia}
          stateChangeHandler={stateChangeHandler}
          mandatoryADM={mandatoryADM}
          printPreview={printPreview ?? false}
        />

        <div className="horizontal-divider mt-5 mb-5"></div>

        {/* Add roles section */}
        {canEditProgramAreaReviewers && (
          <div className="data-table__container">
            <AddHideRolesToggle
              setShowAddRolesArea={setShowAddRolesArea}
              showAddRolesArea={showAddRolesArea}
            />

            {showAddRolesArea && (
              <div className="d-flex">
                <AddRoleDropdown
                  reviewForm={reviewForm}
                  rolesSelect={rolesSelect}
                  setRolesSelect={setRolesSelect}
                  addRole={addRole}
                />
                <div className="p-2 col-md-2 d-flex justify-content-center align-items-center">
                  Or
                </div>
                <AddRoleInput
                  rolesInput={rolesInput}
                  setRolesInput={setRolesInput}
                  addRole={addRole}
                />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
