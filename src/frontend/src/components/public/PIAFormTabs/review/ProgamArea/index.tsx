import { PiaStatuses } from '../../../../../constant/constant';
import { ApprovalRoles, PiaStatusList } from '../../../../../constant/constant';
import { useContext, useState } from 'react';
import Dropdown from '../../../../../components/common/Dropdown';
import InputText from '../../../../../components/common/InputText/InputText';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { IReview } from '../interfaces';
import messages from './../messages';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../../contexts/PiaFormContext';
import DisplayProgramArea from './displayProgramArea';

interface IProgramAreaProps {
  reviewForm: IReview;
  pia: IPiaForm;
  addRole: (role: string) => void;
  stateChangeHandler: (value: any, key: string) => void;
  mandatoryADM: boolean;
}

const ProgramArea = (props: IProgramAreaProps) => {


  const [rolesSelect, setRolesSelect] = useState<string>('');
  const [rolesInput, setRolesInput] = useState<string>('');
  return (
    <section className="drop-shadow card p-4 p-md-5">
      <div className="data-table__container">
        <div
          className={`${
            (props.pia.status === PiaStatuses.MPO_REVIEW ||
              props.pia.status === PiaStatuses.CPO_REVIEW) &&
            'data-row'
          }`}
        >
          {/**
           * UI for adding roles to the program area section starts here
           */}
          {(props.pia.status === PiaStatuses.MPO_REVIEW ||
            props.pia.status === PiaStatuses.CPO_REVIEW) && (
            <>
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
              <div className="horizontal-divider mt-5 mb-5"></div>
            </>
          )}
          {/**
           * UI for adding roles to the program area section ends here
           */}

          {/**
           * UI for displaying selected roles in the program area section starts here
           */}
           <DisplayProgramArea
            reviewForm={props.reviewForm}
            pia={props.pia}
            stateChangeHandler={props.stateChangeHandler}
            mandatoryADM={props.mandatoryADM}
            />
        </div>
      </div>
    </section>
  );
};

export default ProgramArea;
