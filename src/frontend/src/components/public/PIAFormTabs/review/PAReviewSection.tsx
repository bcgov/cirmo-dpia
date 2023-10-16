import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import messages from './messages';
import { IReview } from './interfaces';
import Dropdown from '../../../common/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { getUserPrivileges } from '../../../../utils/statusList/common';
import InputText from '../../../common/InputText/InputText';
import { ApprovalRoles } from '../../../../constant/constant';
import { ProgramAreaDisplay } from './PADisplay';

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

  const AddHideRolesToggle = () => {
    return (
      <section className="d-flex justify-content-center">
        <button
          className="bcgovbtn bcgovbtn__tertiary bold"
          onClick={() => setShowAddRolesArea(!showAddRolesArea)}
        >
          {!showAddRolesArea ? 'Add a role' : 'Hide Roles'}
          <FontAwesomeIcon icon={faPlus} className="ml-2" />
        </button>
      </section>
    );
  };

  const AddRoleButton = () => {
    return (
      <button
        className="bcgovbtn bcgovbtn__secondary mt-3"
        onClick={() => {
          addRole(ApprovalRoles[rolesSelect]);
          setRolesSelect('');
        }}
      >
        Add
      </button>
    );
  };

  const AddRoleInput = () => {
    return (
      <div className="p-2 col-md-5">
        <InputText
          id="programArea"
          label={
            messages.PiaReviewHeader.ProgramAreaSection.Input.EnterRoleTitle.en
          }
          value={rolesInput}
          onChange={(e) => setRolesInput(e.target.value)}
        />
        <AddRoleButton />
      </div>
    );
  };

  const AddRoleDropdown = () => {
    return (
      <div className="p-2 col-md-5">
        <Dropdown
          id="programArea"
          label="Select a role from the list"
          options={Object.keys(ApprovalRoles)
            .filter(
              (role) =>
                !reviewForm.programArea?.selectedRoles?.includes(
                  ApprovalRoles[role],
                ),
            )
            .map((role: string) => ({
              value: role,
              label: ApprovalRoles[role],
            }))}
          value={rolesSelect}
          changeHandler={(e) => setRolesSelect(e.target.value)}
        />
        <AddRoleButton />
      </div>
    );
  };

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
            <AddHideRolesToggle />

            {showAddRolesArea && (
              <div className="d-flex">
                <AddRoleDropdown />
                <div className="p-2 col-md-2 d-flex justify-content-center align-items-center">
                  Or
                </div>
                <AddRoleInput />
              </div>
            )}
          </div>
        )}
      </section>
    </>
  );
};
