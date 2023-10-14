import React, { useState } from 'react';
import ViewComments from '../../../../common/ViewComment';
import { MinistryList } from '../../../../../constant/constant';
import { dateToString } from '../../../../../utils/date';
import { PiaSections } from '../../../../../types/enums/pia-sections.enum';
import Messages from '../helper/messages';
import { IntakeGeneralInformationProps } from '../helper/pia-form-intake.interface';
import Dropdown from '../../../../common/Dropdown';
import InputText from '../../../../common/InputText/InputText';

const IntakeGeneralInformation: React.FC<IntakeGeneralInformationProps> = ({
  isReadOnly,
  selectedSection,
  intakeForm,
  stateChangeHandler,
  commentCount,
  validationMessage,
  pia,
  path,
}) => {
  // State to hold the full name of the selected ministry
  const [piaMinistryFullName, setPiaMinistryFullName] = useState(
    MinistryList.find((item) => item.value === pia.ministry)?.label || '',
  );

  // Function to render the read-only view
  const renderReadOnly = () => (
    <div
      className={`card p-4 p-md-5 ${
        path && path === PiaSections.INTAKE_GENERAL_INFORMATION
          ? 'section-focus'
          : ''
      }`}
    >
      <div className="d-grid gap-3">
        <div className="row">
          <div className="col col-md-3">
            <b>Drafter</b>
            <div>{pia.drafterName}</div>
            <div>{pia.drafterEmail}</div>
          </div>
          <div className="col col-md-3">
            <b>Ministry</b>
            <div>{piaMinistryFullName}</div>
          </div>
          <div className="col col-md-3">
            <b>Branch</b>
            <div>{pia.branch}</div>
          </div>
          <div className="col col-md-3">
            <b>Initiative Lead</b>
            <div>{pia.leadName}</div>
            <div>{pia.leadTitle}</div>
            <div>{pia.leadEmail}</div>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col col-md-3">
            <strong>Submitted on</strong>
            <div>{pia.submittedAt ? dateToString(pia.submittedAt) : ''}</div>
          </div>
          <div className="col col-md-3">
            <strong>Last modified</strong>
            <div>{dateToString(pia.updatedAt)}</div>
          </div>
        </div>
      </div>

      {/* Component to display comments */}
      <ViewComments
        count={commentCount?.[PiaSections.INTAKE_GENERAL_INFORMATION]}
        path={PiaSections.INTAKE_GENERAL_INFORMATION}
      />
    </div>
  );

  // Function to render the editable view
  const renderEditable = () => (
    <div
      className={`drop-shadow card p-4 p-md-5 ${
        selectedSection &&
        selectedSection === PiaSections.INTAKE_GENERAL_INFORMATION
          ? 'section-focus'
          : ''
      }`}
    >
      <div className="row">
        {/* Input field for initiative title */}
        <InputText
          label="Initiative title"
          value={intakeForm?.title}
          onChange={(e) => stateChangeHandler(e.target.value, 'title')}
          required={true}
        />
        {/* Error message for initiative title */}
        {validationMessage.piaTitle && (
          <p className="error-text "> {validationMessage.piaTitle}</p>
        )}
      </div>
      <div className="row">
        <div className="col col-md-6">
          {/* Dropdown to select ministry */}
          {/* Backend accepts either null or valid ministry names. Empty string is not an accepted value. Hence conversions below */}
          <Dropdown
            id="ministry-select"
            value={intakeForm?.ministry || ''} // null to empty string conversion
            label="Ministry"
            options={MinistryList}
            changeHandler={
              (e) => stateChangeHandler(e?.target?.value || null, 'ministry') // empty string to null conversion
            }
            required={true}
          />
          {/* Error message for ministry */}
          {validationMessage.piaMinistry && (
            <p className="error-text ">{validationMessage.piaMinistry}</p>
          )}
        </div>
        <div className="col">
          {/* Input field for branch */}
          <InputText
            label="Branch"
            value={intakeForm?.branch}
            required={true}
            onChange={(e) => stateChangeHandler(e.target.value, 'branch')}
          />
          {/* Error message for branch */}
          {validationMessage.piaBranch && (
            <p className="error-text "> {validationMessage.piaBranch}</p>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          {/* Input field for initiative lead name */}
          <InputText
            label="Initiative lead name"
            id="leadName"
            value={intakeForm?.leadName}
            onChange={(e) => stateChangeHandler(e.target.value, 'leadName')}
            required={false}
          />
        </div>
        <div className="col">
          {/* Input field for initiative lead email */}
          <InputText
            label="Initiative lead email"
            id="leadEmail"
            value={intakeForm?.leadEmail}
            onChange={(e) => stateChangeHandler(e.target.value, 'leadEmail')}
            required={false}
            type="email"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          {/* Input field for initiative lead title */}
          <InputText
            label="Initiative lead title"
            id="leadTitle"
            value={intakeForm?.leadTitle}
            onChange={(e) => stateChangeHandler(e.target.value, 'leadTitle')}
            required={false}
          />
        </div>
      </div>
      {/* Component to display comments */}
      <ViewComments
        count={commentCount?.[PiaSections.INTAKE_GENERAL_INFORMATION]}
        path={PiaSections.INTAKE_GENERAL_INFORMATION}
      />
    </div>
  );

  // Main component render function
  return (
    <section className="section__padding-block">
      <h3>{Messages.GeneralInfoSection.H2Text.en}</h3>
      {/* Render the appropriate view based on the isReadOnly flag */}
      {isReadOnly ? renderReadOnly() : renderEditable()}
    </section>
  );
};

export default IntakeGeneralInformation;
