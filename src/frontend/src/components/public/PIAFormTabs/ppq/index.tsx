import { useContext, useEffect, useMemo, useState } from 'react';
import Messages from './messages';
import { IPPQ, IPPQProps, OtherFactor } from './interfaces';
import { setNestedReactState } from '../../../../utils/object-modification.util';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';
import Checkbox from '../../../common/Checkbox';
import Radio from '../../../common/Radio';
import CustomInputDate from '../../../common/CustomInputDate';
import MDEditor from '@uiw/react-md-editor';
import { YesNoInput } from '../../../../types/enums/yes-no.enum';
import { dateToString, stringToDate } from '../../../../utils/date';
import { deepEqual } from '../../../../utils/object-comparison.util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import InputText from '../../../common/InputText/InputText';

const PPQ = ({ printPreview }: IPPQProps) => {
  // Import context and access control
  const { pia, piaStateChangeHandler, isReadOnly, accessControl } =
    useContext<IPiaFormContext>(PiaFormContext);

  // Enforce any access control restrictions
  if (accessControl) accessControl();

  // Initialize default state for PPQ, using useMemo for performance
  const defaultState: IPPQ = useMemo(
    () => ({
      hasCommonProgram: false,
      hasDataLinking: false,
      hasCloudTechnology: false,
      hasPotentialPublicInterest: false,
      hasContactOrLicenseReview: false,
      hasBcServicesCardOnboarding: false,
      hasAiOrMl: false,
      hasInitiativeOther: false,
      initiativeOtherDetails: '',
      proposedDeadlineAvailable: YesNoInput.YES,
      proposedDeadline: null,
      proposedDeadlineReason: '',
      otherCpoConsideration: '',
      pidInitiativeSummary: '',
      relatedOperationalPias: [],
      relatedEnactmentPias: [],
    }),
    [],
  );

  // Initialize the form with either default state or pre-existing state from pia.ppq
  const initialFormState = useMemo(
    () => pia.ppq || defaultState,
    [defaultState, pia.ppq],
  );

  // Manage form state using React's useState hook
  const [ppqForm, setPpqForm] = useState<IPPQ>(initialFormState);

  // Function to handle state changes for ppqForm
  const stateChangeHandler = (value: any, key: keyof IPPQ) => {
    setNestedReactState(setPpqForm, key, value);
  };

  // State for character count
  const [pidSummaryCharCount, setpidSummaryCharCount] = useState<number>(0);

  // Max character count for initiative summary
  const maxPidSummaryCharCount = 500;

  // Manage state for operational and enactment PIAs
  const [operationalPIA, setOperationalPIA] = useState<string>('');
  const [enactmentPIA, setEnactmentPIA] = useState<string>('');

  // Function to add a new operational PIA
  const addOperationalPIA = () => {
    if (operationalPIA.trim() === '') return;
    stateChangeHandler(
      [...(ppqForm.relatedOperationalPias ?? []), operationalPIA],
      'relatedOperationalPias',
    );
    setOperationalPIA('');
  };

  // Function to remove an operational PIA by its index
  const removeOperationalPIA = (index: number) => {
    const newList = ppqForm.relatedOperationalPias?.filter(
      (_, i) => i !== index,
    );
    stateChangeHandler(newList, 'relatedOperationalPias');
  };

  // Function to add a new enactment PIA
  const addEnactmentPIA = () => {
    if (enactmentPIA.trim() === '') return;
    stateChangeHandler(
      [...(ppqForm.relatedEnactmentPias ?? []), enactmentPIA],
      'relatedEnactmentPias',
    );
    setEnactmentPIA('');
  };

  // Function to remove an enactment PIA by its index
  const removeEnactmentPIA = (index: number) => {
    const newList = ppqForm.relatedEnactmentPias?.filter((_, i) => i !== index);
    stateChangeHandler(newList, 'relatedEnactmentPias');
  };

  // Handle character count in Initiative Summary
  const handleInitiativeSummaryChange = (value = '') => {
    stateChangeHandler(value, 'pidInitiativeSummary');
    setpidSummaryCharCount(value.length);
  };

  // Display remaining character count or maximum limit
  const getPidSummaryCharDisplayMessage = () =>
    pidSummaryCharCount === 0
      ? `${maxPidSummaryCharCount} characters max`
      : `${maxPidSummaryCharCount - pidSummaryCharCount} characters left`;

  // Proposed deadline radio button options
  const ProposedDeadlineRadio = [
    {
      index: 1,
      value: YesNoInput.YES,
      groupName: 'proposed-deadline-radio',
      isDefault: ppqForm?.proposedDeadlineAvailable === YesNoInput.YES,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'proposedDeadlineAvailable'),
    },
    {
      index: 2,
      value: YesNoInput.NO,
      groupName: 'proposed-deadline-radio',
      isDefault: ppqForm?.proposedDeadlineAvailable === YesNoInput.NO,
      changeHandler: (e: any) =>
        stateChangeHandler(e.target.value, 'proposedDeadlineAvailable'),
    },
  ];

  // This useEffect hook is responsible for passing updated data to the parent component. It triggers the piaStateChangeHandler function only if there are changes between the initialFormState and ppqForm.
  useEffect(() => {
    if (!deepEqual(initialFormState, ppqForm)) {
      piaStateChangeHandler(ppqForm, 'ppq');
    }
  }, [piaStateChangeHandler, ppqForm, initialFormState]);

  return (
    <>
      {/* Level 2 heading for the results section */}
      <h2 className="results-header">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      {/* Description text */}
      <p className="pb-4">{Messages.Headings.Description.en}</p>

      {/* Main card container */}
      <section className="drop-shadow card p-4 p-md-5">
        {/* Conditional header based on 'isReadOnly' */}
        {!isReadOnly ? (
          <p>
            <strong>{Messages.InitiativeFactorsHeading.en} </strong>
          </p>
        ) : (
          <h4>{Messages.InitiativeFactorsHeading.en}</h4>
        )}

        {/* Render checkboxes for various factors */}
        <div className="row">
          {OtherFactor.map((factor, index) => (
            // Create a checkbox for each factor
            <Checkbox
              key={index}
              checked={!!ppqForm?.[factor.value as keyof IPPQ] || false}
              isLink={false}
              value={factor.value}
              label={factor.label}
              tooltip={factor.tooltip}
              tooltipText={factor.tooltipText}
              onChange={(event) => {
                if (isReadOnly) return;
                stateChangeHandler(
                  event.target.checked,
                  factor.value as keyof IPPQ,
                );
              }}
              readOnly={isReadOnly}
            />
          ))}
          {/* Conditionally display Markdown editor or preview */}
          {!isReadOnly ? (
            ppqForm?.hasInitiativeOther && (
              <MDEditor
                preview="edit"
                defaultTabEnable={true}
                value={ppqForm?.initiativeOtherDetails || ''}
                onChange={(value) =>
                  stateChangeHandler(value, 'initiativeOtherDetails')
                }
                aria-label="Initiative Other Details Input"
              />
            )
          ) : ppqForm?.hasInitiativeOther ? (
            ppqForm?.initiativeOtherDetails &&
            ppqForm?.initiativeOtherDetails !== '' ? (
              <div className="px-4">
                <MDEditor.Markdown
                  source={ppqForm.initiativeOtherDetails}
                  aria-label="Initiative Other Details Input Preview"
                />
              </div>
            ) : (
              <p>
                <i>Not answered</i>
              </p>
            )
          ) : null}
        </div>
        {/* Render deadline info, conditional on printPreview and isReadOnly */}
        {!printPreview && (
          <div className="form-group mt-4">
            {isReadOnly ? (
              <h4>{Messages.DeadlineDateHeading.en}</h4>
            ) : (
              <p>
                <strong>{Messages.DeadlineDateHeading.en}</strong>
              </p>
            )}
            {isReadOnly ? (
              <p>
                {ppqForm?.proposedDeadlineAvailable?.charAt(0)}
                {ppqForm?.proposedDeadlineAvailable?.slice(1).toLowerCase()}
              </p>
            ) : (
              ProposedDeadlineRadio.map((radio, index) => (
                <Radio key={index} {...radio} />
              ))
            )}
          </div>
        )}

        {/* Show Proposed Deadline and Reason if 'proposedDeadlineAvailable' is YES */}
        {ppqForm?.proposedDeadlineAvailable === YesNoInput.YES && (
          <>
            {/* Form Group for Proposed Deadline */}
            <div className="form-group mt-4 mb-4 col-md-3">
              {!isReadOnly ? (
                // Label for the date input in editable mode
                <label id="deadline-date-label">
                  {Messages.ProposedDeadLineHeading.en}
                  <span className="error-text "> (required)</span>
                </label>
              ) : (
                // Heading for the date input in read-only mode
                <h4> {Messages.ProposedDeadLineHeading.en}</h4>
              )}
              {!isReadOnly ? (
                <>
                  {/* Custom Date Input Component */}
                  <CustomInputDate
                    key="proposedDeadlineDate"
                    selected={
                      ppqForm?.proposedDeadline
                        ? stringToDate(ppqForm.proposedDeadline)
                        : null
                    }
                    onChange={(date: any) => {
                      stateChangeHandler(
                        dateToString(date),
                        'proposedDeadline',
                      );
                    }}
                    required
                  />
                </>
              ) : (
                // Show date value if available, otherwise show "Not answered"
                <div>
                  {pia.ppq?.proposedDeadline &&
                  pia.ppq?.proposedDeadline !== '' ? (
                    pia.ppq?.proposedDeadline
                  ) : (
                    <p>
                      <i>Not answered</i>
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Form Group for Deadline Reason */}
            <div className="form-group mt-4 mb-4">
              {!isReadOnly ? (
                // Label for the reason input in editable mode
                <label id="start-date-label">
                  {Messages.DeadlineReasonHeading.en}
                  <span className="error-text "> (required)</span>
                </label>
              ) : (
                // Heading for the reason input in read-only mode
                <h4> {Messages.DeadlineReasonHeading.en}</h4>
              )}
              {!isReadOnly ? (
                <>
                  {/* Markdown Editor for Deadline Reason */}
                  <MDEditor
                    preview="edit"
                    defaultTabEnable={true}
                    value={ppqForm?.proposedDeadlineReason || ''}
                    onChange={(value) =>
                      stateChangeHandler(value, 'proposedDeadlineReason')
                    }
                  />
                </>
              ) : ppqForm.proposedDeadlineReason ? (
                // Show Markdown rendering of Deadline Reason if available
                <MDEditor.Markdown source={ppqForm.proposedDeadlineReason} />
              ) : (
                // Show "Not answered" if Deadline Reason is empty
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </>
        )}

        {/* Form group for Initiative Summary */}
        <div className="form-group mt-4 mb-4">
          {!isReadOnly ? (
            // Show label with link and character count for editable mode
            <label id="pidInitiativeSummary">
              {Messages.InitiativeSummaryHeading.en.firstText}
              <a
                href={Messages.InitiativeSummaryHeading.en.link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {Messages.InitiativeSummaryHeading.en.link.label}
                <FontAwesomeIcon className="ms-1" icon={faUpRightFromSquare} />
              </a>
              {Messages.InitiativeSummaryHeading.en.secondText}
              <span> ({getPidSummaryCharDisplayMessage()}) </span>
            </label>
          ) : (
            // Show heading for read-only mode
            <h4> {Messages.InitiativeSummaryHeading.en.fullText}</h4>
          )}
          {!isReadOnly ? (
            // Show Markdown editor for editable mode
            <MDEditor
              preview="edit"
              defaultTabEnable={true}
              value={ppqForm?.pidInitiativeSummary || ''}
              onChange={(value) => handleInitiativeSummaryChange(value || '')}
              aria-label="Initiative Summary Textarea Input"
              textareaProps={{ maxLength: maxPidSummaryCharCount }}
            />
          ) : ppqForm.pidInitiativeSummary ? (
            // Show Markdown preview for read-only mode if available
            <MDEditor.Markdown
              source={ppqForm.pidInitiativeSummary}
              aria-label="Initiative Summary Textarea Input Preview"
            />
          ) : (
            // Show 'Not answered' for read-only mode if no data available
            <p>
              <i>Not answered</i>
            </p>
          )}
        </div>
        {/* Form Group for Related Operational PIAs */}
        <div className="form-group mt-4">
          {/* Check if the form is in read-only mode */}
          {!isReadOnly ? (
            <>
              {/* Label for related operational PIA input */}
              <label>{Messages.RelatedOperationalPIAHeading.en.title}</label>

              {/* Container for the related operational PIA input field */}
              <div className="card p-3 pb-5 border border-2 mb-4">
                {/* Text Input for entering related operational PIA */}
                <InputText
                  label={Messages.RelatedOperationalPIAHeading.en.inputTitle}
                  id="relatedOperationalPia"
                  value={operationalPIA || ''}
                  onChange={(e) => setOperationalPIA(e.target.value || '')}
                  required={false}
                  placeholder={
                    Messages.RelatedOperationalPIAHeading.en.inputPlaceholder
                  }
                />

                {/* Button to add a new related operational PIA */}
                <div className="mt-3">
                  <button
                    className="bcgovbtn bcgovbtn__secondary"
                    onClick={addOperationalPIA}
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h4>{Messages.RelatedOperationalPIAHeading.en.title}</h4>
          )}
        </div>

        {/* Display the list of added operational PIAs */}
        {ppqForm?.relatedOperationalPias &&
        ppqForm?.relatedOperationalPias?.length > 0 ? (
          <div className="form-group mb-4">
            {/* Label for the list of operational PIAs */}
            <label className="px-4">
              {Messages.RelatedOperationalPIAHeading.en.inputTitle}
            </label>
            {/* Decorative horizontal divider */}
            <div className="horizontal-divider-yellow mt-1 mb-1"></div>

            {/* Map over the array of operational PIAs */}
            {ppqForm?.relatedOperationalPias?.map((operationalPia, index) => (
              <div key={index} className="mb-0">
                <div className="d-flex justify-content-between align-items-center align-content-center">
                  {/* Display each operational PIA */}
                  <div className="px-4">{operationalPia}</div>
                  {/* Button to remove an operational PIA (Only if not in read-only mode) */}
                  {!isReadOnly && (
                    <button
                      className="bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--negative"
                      onClick={() => removeOperationalPIA(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  )}
                </div>
                {/* Decorative horizontal divider */}
                <div className="horizontal-divider-grey mt-2 mb-2"></div>
              </div>
            ))}
          </div>
        ) : isReadOnly ? (
          <p>
            <i>Not answered</i>
          </p>
        ) : null}

        {/* Form Group for Related Enactment PIAs */}
        <div className="form-group mt-4">
          {/* Conditional label or heading based on read-only status */}
          {!isReadOnly ? (
            <>
              <label>{Messages.RelatedEnactmentPIAHeading.en.title}</label>

              {/* Input container for related enactment PIA */}
              <div className="card p-3 pb-5 border border-2 mb-4">
                {/* Text input for entering related enactment PIA */}
                <InputText
                  label={Messages.RelatedEnactmentPIAHeading.en.inputTitle}
                  id="relatedEnactmentPia"
                  value={enactmentPIA || ''}
                  onChange={(e) => setEnactmentPIA(e.target.value || '')}
                  required={false}
                  placeholder={
                    Messages.RelatedEnactmentPIAHeading.en.inputPlaceholder
                  }
                />

                {/* Button to add a new related enactment PIA */}
                <div className="mt-3">
                  <button
                    className="bcgovbtn bcgovbtn__secondary"
                    onClick={addEnactmentPIA}
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          ) : (
            <h4>{Messages.RelatedEnactmentPIAHeading.en.title}</h4>
          )}
        </div>
        {/* Display list of related enactment PIAs if any exist */}
        {ppqForm?.relatedEnactmentPias &&
        ppqForm?.relatedEnactmentPias?.length > 0 ? (
          <div className="form-group mb-4">
            {/* Label for the list of related enactment PIAs */}
            <label className="px-4">
              {Messages.RelatedEnactmentPIAHeading.en.inputTitle}
            </label>
            {/* Decorative horizontal divider */}
            <div className="horizontal-divider-yellow mt-1 mb-1"></div>
            {/* List each related enactment PIA */}
            {ppqForm?.relatedEnactmentPias?.map((enactmentPia, index) => (
              <div key={index} className="mb-0">
                <div className="d-flex justify-content-between align-items-center align-content-center">
                  {/* Display each related enactment PIA */}
                  <div className="px-4">{enactmentPia}</div>
                  {/* Delete button for each related enactment PIA (Only if not read-only) */}
                  {!isReadOnly && (
                    <button
                      className="bcgovbtn bcgovbtn__tertiary bcgovbtn__tertiary--negative"
                      onClick={() => removeEnactmentPIA(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} size="lg" />
                    </button>
                  )}
                </div>
                {/* Decorative horizontal divider */}
                <div className="horizontal-divider-grey mt-2 mb-2"></div>
              </div>
            ))}
          </div>
        ) : isReadOnly ? (
          <p>
            <i>Not answered</i>
          </p>
        ) : null}
        {/* Form Group for Additional Information */}
        <div className="form-group mt-4">
          {/* Choose label or heading depending on 'isReadOnly' status */}
          {!isReadOnly ? (
            <label id="additionalInformation">
              {Messages.AdditionalInfoHeading.en}
            </label>
          ) : (
            <h4>{Messages.AdditionalInfoHeading.en}</h4>
          )}

          {/* Markdown editor for additional information */}
          {!isReadOnly ? (
            <MDEditor
              preview="edit"
              defaultTabEnable={true}
              value={ppqForm?.otherCpoConsideration || ''}
              onChange={(value) =>
                stateChangeHandler(value, 'otherCpoConsideration')
              }
              aria-label="Other CPO Consideration Textarea Input"
            />
          ) : ppqForm.otherCpoConsideration ? (
            <MDEditor.Markdown
              source={ppqForm.otherCpoConsideration}
              aria-label="Other CPO Consideration Textarea Input Preview"
            />
          ) : (
            <p>
              <i>Not answered</i>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default PPQ;
