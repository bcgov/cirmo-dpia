import MDEditor from '@uiw/react-md-editor';
import { ChangeEvent, useContext, useState } from 'react';
import { MinistryList, PIOptions } from '../../../../constant/constant';
import Dropdown from '../../../common/Dropdown';
import InputText from '../../../common/InputText/InputText';
import { exportIntakeFromPia } from './helper/extract-intake-from-pia.helper';
import Messages from './helper/messages';
import { IPiaFormIntake } from './pia-form-intake.interface';
import PIAIntakeGeneralInformation from './viewGeneralInformation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import ViewComments from '../../../common/ViewComment';
import { PiaSections } from '../../../../types/enums/pia-sections.enum';

export const PIAFormIntake = () => {
  const {
    pia,
    piaStateChangeHandler,
    isReadOnly,
    accessControl,
    validationMessage,
    commentCount,
  } = useContext<IPiaFormContext>(PiaFormContext);

  if (accessControl) accessControl();

  const [sectionClickState, setSectionClickState] = useState({
    generalInformation: false,
    description: false,
    scope: false,
    dataElementsInvolved: false,
    personalInformation: false,
  });
  const handleCommentClick = (
    section:
      | 'generalInformation'
      | 'description'
      | 'scope'
      | 'dataElementsInvolved'
      | 'personalInformation',
  ) => {
    setSectionClickState((prevState) => ({
      ...prevState,
      generalInformation: section === 'generalInformation',
      description: section === 'description',
      scope: section === 'scope',
      dataElementsInvolved: section === 'dataElementsInvolved',
      personalInformation: section === 'personalInformation',
    }));
  };
  const [intakeForm, setIntakeForm] = useState<IPiaFormIntake>(
    exportIntakeFromPia(pia),
  );

  const stateChangeHandler = (value: any, key: keyof IPiaFormIntake) => {
    setIntakeForm((state) => ({
      ...state,
      [key]: value,
    }));
    piaStateChangeHandler(value, key);
  };

  const handlePIOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    event.target.value === 'Yes'
      ? stateChangeHandler(true, 'hasAddedPiToDataElements')
      : event.target.value === "I'm not sure"
      ? stateChangeHandler(null, 'hasAddedPiToDataElements')
      : stateChangeHandler(false, 'hasAddedPiToDataElements');

    // ensuring we see the NextSteps page every time user switches from a delegated to a non-delegated flow AND vice-versa
    if (
      ((pia?.hasAddedPiToDataElements === true ||
        pia?.hasAddedPiToDataElements === null) &&
        event.target.value === 'No') ||
      (pia?.hasAddedPiToDataElements === false &&
        (event.target.value === 'Yes' || event.target.value === "I'm not sure"))
    ) {
      piaStateChangeHandler(false, 'isNextStepsSeenForNonDelegatedFlow');
      piaStateChangeHandler(false, 'isNextStepsSeenForDelegatedFlow');
    }
  };

  return (
    <>
      <section>
        <h2>{Messages.PiaIntakeHeader.H1Text.en} </h2>
        {!isReadOnly && (
          <>
            <h3>{Messages.PiaIntakeHeader.H2Text.en} </h3>
            <ul>
              {Messages.PiaIntakeHeader.ListText.map((item, index) => (
                <li key={index}>{item.en}</li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="section__padding-block">
        <h3>{Messages.GeneralInfoSection.H2Text.en}</h3>
        {isReadOnly ? (
          <PIAIntakeGeneralInformation
            commentCount={commentCount}
            pia={pia}
            handleCommentClick={handleCommentClick}
            sectionClickState={sectionClickState}
          />
        ) : (
          <div
            className={`drop-shadow card p-4 p-md-5 ${
              sectionClickState.generalInformation ? 'section-focus' : ''
            }`}
          >
            <div className="row">
              <InputText
                label="Title"
                value={intakeForm?.title}
                onChange={(e) => stateChangeHandler(e.target.value, 'title')}
                required={true}
              />
              {validationMessage.piaTitle && (
                <p className="error-text "> {validationMessage.piaTitle}</p>
              )}
            </div>
            <div className="row">
              <div className="col col-md-6">
                {/* Backend accept either null or valid ministry names. Empty string is not an accepted value. Hence conversions below */}
                <Dropdown
                  id="ministry-select"
                  value={intakeForm?.ministry || ''} // null to empty string conversion
                  label="Ministry"
                  options={MinistryList}
                  changeHandler={
                    (e) =>
                      stateChangeHandler(e?.target?.value || null, 'ministry') // empty string to null conversion
                  }
                  required={true}
                />
                {validationMessage.piaMinistry && (
                  <p className="error-text ">{validationMessage.piaMinistry}</p>
                )}
              </div>
              <div className="col">
                <InputText
                  label="Branch"
                  value={intakeForm?.branch}
                  required={true}
                  onChange={(e) => stateChangeHandler(e.target.value, 'branch')}
                />
                {validationMessage.piaBranch && (
                  <p className="error-text "> {validationMessage.piaBranch}</p>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <InputText
                  label="Initiative lead name"
                  id="leadName"
                  value={intakeForm?.leadName}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadName')
                  }
                  required={false}
                />
              </div>
              <div className="col">
                <InputText
                  label="Initiative lead email"
                  id="leadEmail"
                  value={intakeForm?.leadEmail}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadEmail')
                  }
                  required={false}
                  type="email"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <InputText
                  label="Initiative lead title"
                  id="leadTitle"
                  value={intakeForm?.leadTitle}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'leadTitle')
                  }
                  required={false}
                />
              </div>
            </div>
            <div className="row form__row--flex-end">
              <div className="col">
                <InputText
                  label="Ministry Privacy Officer"
                  helperText={Messages.GeneralInfoSection.MPOHelperText.en}
                  linkText={Messages.GeneralInfoSection.MPOLinkText.en}
                  linkHref={Messages.GeneralInfoSection.MPOLinkHref}
                  hasIcon={false}
                  id="mpoName"
                  value={intakeForm?.mpoName}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'mpoName')
                  }
                  required={false}
                />
              </div>
              <div className="col">
                <InputText
                  label="MPO email"
                  id="mpoEmail"
                  value={intakeForm?.mpoEmail}
                  onChange={(e) =>
                    stateChangeHandler(e.target.value, 'mpoEmail')
                  }
                  required={false}
                  type="email"
                />
              </div>
            </div>

            <ViewComments
              count={commentCount?.[PiaSections.INTAKE_GENERAL_INFORMATION]}
              path={PiaSections.INTAKE_GENERAL_INFORMATION}
              onCommentClick={() => handleCommentClick('generalInformation')}
            />
          </div>
        )}
      </section>

      <section className="section__padding-block">
        <h3>{Messages.InitiativeDescriptionSection.SectionHeading.en}</h3>
        <div
          className={`drop-shadow card p-4 p-md-5 ${
            sectionClickState.description ? 'section-focus' : ''
          }`}
        >
          {!isReadOnly ? (
            <p>
              <strong>
                {Messages.InitiativeDescriptionSection.Question.en}
                <span className="error-text "> (required)</span>
              </strong>
            </p>
          ) : (
            <h4> {Messages.InitiativeDescriptionSection.Question.en}</h4>
          )}
          {!isReadOnly && (
            <p className="form__helper-text">
              {Messages.InitiativeDescriptionSection.HelperText.en}
            </p>
          )}
          <div className="richText" id="initiativeDescription">
            {(isReadOnly && !intakeForm.initiativeDescription) ||
            (isReadOnly && intakeForm.initiativeDescription === '') ? (
              <p>
                <i>Not answered</i>
              </p>
            ) : isReadOnly ? (
              <MDEditor.Markdown source={intakeForm.initiativeDescription} />
            ) : (
              <MDEditor
                preview="edit"
                defaultTabEnable={true}
                value={intakeForm?.initiativeDescription}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeDescription')
                }
              />
            )}
            {!isReadOnly && validationMessage.piaInitialDescription && (
              <p className="error-text ">
                {validationMessage.piaInitialDescription}
              </p>
            )}
          </div>

          <ViewComments
            count={
              commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION]
            }
            path={PiaSections.INTAKE_INITIATIVE_DETAILS_DESCRIPTION}
            onCommentClick={() => handleCommentClick('description')}
          />
        </div>
      </section>

      <section className="section__padding-block">
        <div
          className={`drop-shadow card p-4 p-md-5  ${
            sectionClickState.scope ? 'section-focus' : ''
          }`}
        >
          {!isReadOnly ? (
            <p className="form__h2">
              <strong>{Messages.InitiativeScopeSection.H2Text.en}</strong>
            </p>
          ) : (
            <h4>{Messages.InitiativeScopeSection.H2Text.en} </h4>
          )}
          {!isReadOnly && (
            <p className="form__helper-text">
              {Messages.InitiativeScopeSection.HelperText.en}
            </p>
          )}
          <div className="richText" id="initiativeScope">
            {(isReadOnly && !intakeForm.initiativeScope) ||
            (isReadOnly && intakeForm.initiativeScope === '') ? (
              <p>
                <i>Not answered</i>
              </p>
            ) : isReadOnly ? (
              <MDEditor.Markdown source={intakeForm.initiativeScope} />
            ) : (
              <MDEditor
                preview="edit"
                value={intakeForm?.initiativeScope}
                defaultTabEnable={true}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeScope')
                }
              />
            )}
          </div>

          <ViewComments
            count={commentCount?.[PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE]}
            path={PiaSections.INTAKE_INITIATIVE_DETAILS_SCOPE}
            onCommentClick={() => handleCommentClick('scope')}
          />
        </div>
      </section>

      <section className="section__padding-block">
        <div
          className={`drop-shadow card p-4 p-md-5  ${
            sectionClickState.dataElementsInvolved ? 'section-focus' : ''
          }`}
        >
          {!isReadOnly ? (
            <p className="form__h2">
              <strong>
                {Messages.InitiativeDataElementsSection.H2Text.en}
              </strong>
            </p>
          ) : (
            <h4>{Messages.InitiativeDataElementsSection.H2Text.en} </h4>
          )}
          {!isReadOnly && (
            <p className="form__helper-text">
              {Messages.InitiativeDataElementsSection.HelperText.en}
            </p>
          )}
          <div className="richText" id="dataElementsInvolved">
            {(isReadOnly && !intakeForm.dataElementsInvolved) ||
            (isReadOnly && intakeForm.dataElementsInvolved === '') ? (
              <p>
                <i>Not answered</i>
              </p>
            ) : isReadOnly ? (
              <MDEditor.Markdown source={intakeForm.dataElementsInvolved} />
            ) : (
              <MDEditor
                preview="edit"
                value={intakeForm?.dataElementsInvolved}
                defaultTabEnable={true}
                onChange={(value) =>
                  stateChangeHandler(value, 'dataElementsInvolved')
                }
              />
            )}
          </div>

          <ViewComments
            count={
              commentCount?.[
                PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED
              ]
            }
            path={PiaSections.INTAKE_INITIATIVE_DETAILS_DATA_ELEMENTS_INVOLVED}
            onCommentClick={() => handleCommentClick('dataElementsInvolved')}
          />
        </div>
      </section>

      <section className="section__padding-block">
        <h3>{Messages.InitiativePISection.SectionHeading.en}</h3>
        <div
          className={`drop-shadow card p-4 p-md-5  ${
            sectionClickState.personalInformation ? 'section-focus' : ''
          }`}
        >
          {!isReadOnly ? (
            <p>
              <strong>{Messages.InitiativePISection.Question.en}</strong>
            </p>
          ) : (
            <h4> {Messages.InitiativePISection.Question.en}</h4>
          )}
          {!isReadOnly && (
            <p className="form__helper-text">
              <a
                href="https://www2.gov.bc.ca/gov/content/governments/services-for-government/information-management-technology/privacy/personal-information?keyword=personal&keyword=information"
                rel="noreferrer external"
                target="_blank"
              >
                {Messages.InitiativePISection.LinkText.en}
                &nbsp;
                <FontAwesomeIcon icon={faUpRightFromSquare} />
              </a>
              &nbsp;
              {Messages.InitiativePISection.HelperText.en}
            </p>
          )}

          {!isReadOnly ? (
            PIOptions.map((option, index) => (
              <label key={index} className="form__input-label input-label-row">
                <input
                  disabled={isReadOnly}
                  type="radio"
                  name="pi-options-radio"
                  value={option.key}
                  onChange={handlePIOptionChange}
                  checked={option.value === pia?.hasAddedPiToDataElements}
                />
                {option.key}
              </label>
            ))
          ) : (
            <p>
              {PIOptions.find(
                (item) => item.value === pia?.hasAddedPiToDataElements,
              )?.key || ''}
            </p>
          )}
          {intakeForm?.hasAddedPiToDataElements === false && (
            <div className="section__padding-block">
              {!isReadOnly ? (
                <p>
                  <strong>
                    {Messages.InitiativeRiskReductionSection.H2Text.en}
                  </strong>
                </p>
              ) : (
                <h4> {Messages.InitiativeRiskReductionSection.H2Text.en} </h4>
              )}
              {!isReadOnly && (
                <p className="form__helper-text">
                  {Messages.InitiativeRiskReductionSection.HelperText.en}
                </p>
              )}
              <div className="richText" id="riskMitigation">
                {(isReadOnly && !intakeForm.riskMitigation) ||
                (isReadOnly && intakeForm.riskMitigation === '') ? (
                  <p>
                    <i>Not answered</i>
                  </p>
                ) : isReadOnly ? (
                  <MDEditor.Markdown source={intakeForm.riskMitigation} />
                ) : (
                  <MDEditor
                    preview="edit"
                    value={intakeForm?.riskMitigation}
                    defaultTabEnable={true}
                    onChange={(value) =>
                      stateChangeHandler(value, 'riskMitigation')
                    }
                  />
                )}
              </div>
            </div>
          )}

          <ViewComments
            count={commentCount?.[PiaSections.INTAKE_PERSONAL_INFORMATION]}
            path={PiaSections.INTAKE_PERSONAL_INFORMATION}
            onCommentClick={() => handleCommentClick('personalInformation')}
          />
        </div>
      </section>
    </>
  );
};
