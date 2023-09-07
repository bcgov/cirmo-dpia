import { ApprovalRoles } from '../../../../../constant/constant';
import { useEffect, useState } from 'react';
import Dropdown from '../../../../../components/common/Dropdown';
import InputText from '../../../../../components/common/InputText/InputText';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { IReview } from '../interfaces';
import messages from './../messages';
import DisplayProgramArea from './displayProgramArea';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getUserPrivileges } from '../../../../../utils/statusList/common';

interface IProgramAreaProps {
  reviewForm: IReview;
  pia: IPiaForm;
  addRole: (role: string) => void;
  stateChangeHandler: (value: any, key: string, callApi?: boolean) => void;
  mandatoryADM: boolean;
}

const ProgramArea = (props: IProgramAreaProps) => {
  const [rolesSelect, setRolesSelect] = useState<string>('');
  const [rolesInput, setRolesInput] = useState<string>('');
  const [editProgramAreaReviewers, setEditProgramAreaReviewers] =
    useState<boolean>(false);
  const [showProgramArea, setShowProgramArea] = useState<boolean>(false);

  useEffect(() => {
    /* One can only edit Progam Area section if you are in a particular status
     * The information related to editing this section is retrieved from the statusList
     */
    const editProgramAreaReviewersCheck =
      getUserPrivileges(props.pia)?.Pages?.review?.params
        ?.editProgramAreaReviewers ?? false;
    setEditProgramAreaReviewers(editProgramAreaReviewersCheck);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pia?.status]);

  return (
    <section className="drop-shadow card p-4 p-md-5">
      {/**
       * UI for displaying selected roles in the program area section starts here
       */}
      <DisplayProgramArea
        reviewForm={props.reviewForm}
        pia={props.pia}
        stateChangeHandler={props.stateChangeHandler}
        mandatoryADM={props.mandatoryADM}
      />
      <div className="horizontal-divider mt-5 mb-5"></div>
      <div className="data-table__container">
        {/**
         * UI for triggering 'Add Program area' section starts here
         */}
        {editProgramAreaReviewers && (
          <section className="d-flex justify-content-center">
            <button
              className="bcgovbtn bcgovbtn__tertiary bold"
              onClick={() => setShowProgramArea(!showProgramArea)}
            >
              {!showProgramArea ? 'Add a role' : 'Hide Roles'}
              <FontAwesomeIcon icon={faPlus} className="ml-2" />
            </button>
          </section>
        )}
        {/**
         * UI for adding roles to the program area section starts here
         */}
        {editProgramAreaReviewers && showProgramArea && (
          <div className={`${editProgramAreaReviewers && 'data-row'}`}>
            <div className="d-flex">
              <div className="p-2 col-md-5">
                <Dropdown
                  id="programArea"
                  label="Select a role from the list"
                  options={Object.keys(ApprovalRoles)
                    .filter(
                      (role) =>
                        !props.reviewForm.programArea?.selectedRoles?.includes(
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
                <button
                  className="bcgovbtn bcgovbtn__secondary mt-3"
                  onClick={() => {
                    props.addRole(ApprovalRoles[rolesSelect]);
                    setRolesSelect('');
                  }}
                >
                  Add
                </button>
              </div>
              <div className="p-2 col-md-2 d-flex justify-content-center align-items-center">
                Or
              </div>
              <div className="p-2 col-md-5">
                <InputText
                  id="programArea"
                  label={
                    messages.PiaReviewHeader.ProgramAreaSection.Input
                      .EnterRoleTitle.en
                  }
                  value={rolesInput}
                  onChange={(e) => setRolesInput(e.target.value)}
                />
                <button
                  className="bcgovbtn bcgovbtn__secondary mt-3"
                  onClick={() => {
                    props.addRole(rolesInput);
                    setRolesInput('');
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
        {/**
         * UI for adding roles to the program area section ends here
         */}
      </div>
    </section>
  );
};

export default ProgramArea;
