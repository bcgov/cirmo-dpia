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
  const { pia, piaStateChangeHandler, isReadOnly, accessControl } =
    useContext<IPiaFormContext>(PiaFormContext);

  // Check for any access control restrictions
  if (accessControl) accessControl();

  // Initialize default state for PPQ using useMemo for performance optimization
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
      relatedOperationalPias: '',
      relatedEnactmentPias: '',
    }),
    [],
  );

  // Get initial form state from pia.ppq or use default state
  const initialFormState = useMemo(
    () => pia.ppq || defaultState, // Use pia.ppq if it exists, otherwise use defaultState
    [defaultState, pia.ppq], // Re-calculate initialFormState whenever defaultState or pia.ppq changes
  );

  // Initialize ppqForm state
  const [ppqForm, setPpqForm] = useState<IPPQ>(initialFormState);

  /**
   * Update ppqForm state
   * @param value - The new value for the state
   * @param key - The key of the state to be updated
   */
  const stateChangeHandler = (value: any, key: keyof IPPQ) => {
    // Update the ppqForm state using the setNestedReactState function
    setNestedReactState(setPpqForm, key, value);
  };

  // State for character count
  const [charCount, setCharCount] = useState<number>(0);
  // Max character count for initiative summary
  const MAX_CHAR_COUNT = 500;

  /**
   * Handles the change event for the initiative summary.
   *
   * @param {string} value - The new value for the initiative summary.
   * @return {void}
   */
  const handleInitiativeSummaryChange = (value = '') => {
    stateChangeHandler(value, 'pidInitiativeSummary');
    setCharCount(value.length);
  };

  /**
   * Returns a message displaying the number of characters left or the maximum character count.
   *
   * @return {string} - The message displaying the number of characters left or the maximum character count.
   */
  const getCharDisplayMessage = () =>
    charCount === 0
      ? `${MAX_CHAR_COUNT} characters max`
      : `${MAX_CHAR_COUNT - charCount} characters left`;

  const ProposedDeadlineRadio = [
    // Option 1: Yes
    {
      index: 1,
      value: YesNoInput.YES, // Value of the radio button
      groupName: 'proposed-deadline-radio', // Name of the radio button group
      isDefault: ppqForm?.proposedDeadlineAvailable === YesNoInput.YES, // Check if this option is the default
      changeHandler: (
        e: any, // Event handler for when the radio button is changed
      ) => stateChangeHandler(e.target.value, 'proposedDeadlineAvailable'), // Call the stateChangeHandler function with the new value
    },
    // Option 2: No
    {
      index: 2,
      value: YesNoInput.NO, // Value of the radio button
      groupName: 'proposed-deadline-radio', // Name of the radio button group
      isDefault: ppqForm?.proposedDeadlineAvailable === YesNoInput.NO, // Check if this option is the default
      changeHandler: (
        e: any, // Event handler for when the radio button is changed
      ) => stateChangeHandler(e.target.value, 'proposedDeadlineAvailable'), // Call the stateChangeHandler function with the new value
    },
  ];

  // This useEffect hook is responsible for passing updated data to the parent component.
  // It triggers the piaStateChangeHandler function only if there are changes between the initialFormState and ppqForm.

  /**
   * useEffect hook to handle auto-saving of data changes.
   * @param {Function} piaStateChangeHandler - The function to handle state changes in the parent component.
   * @param {object} ppqForm - The current form state.
   * @param {object} initialFormState - The initial form state.
   */
  useEffect(() => {
    // Check if there are changes between the initialFormState and ppqForm using deepEqual.
    if (!deepEqual(initialFormState, ppqForm)) {
      // Trigger the piaStateChangeHandler function with the updated ppqForm and 'ppq' as the type.
      piaStateChangeHandler(ppqForm, 'ppq');
    }
  }, [piaStateChangeHandler, ppqForm, initialFormState]);

  return (
    <>
      {/* Render a level 2 heading for the results */}
      <h2 className="results-header">
        {/* Make the heading text bold */}
        <b>
          {/* Display the title from the Messages.Headings.Title object */}
          {Messages.Headings.Title.en}
        </b>
      </h2>
      <p className="pb-4"> {Messages.Headings.Description.en}</p>
      <section className="drop-shadow card p-4 p-md-5">
        {!isReadOnly ? (
          // Render a paragraph with bold text if not read-only
          <p>
            <strong>{Messages.InitiativeFactorsHeading.en} </strong>
          </p>
        ) : (
          // Render a level 4 heading if read-only
          <h4>{Messages.InitiativeFactorsHeading.en}</h4>
        )}
        <div className="row">
          {OtherFactor.map((factor, index) => {
            return (
              // Render a checkbox for each factor in OtherFactor array
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
            );
          })}
          {!isReadOnly ? (
            // Render a Markdown editor if hasInitiativeOther is true
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
            // Render a Markdown preview if hasInitiativeOther is true and initiativeOtherDetails is not empty
            ppqForm?.initiativeOtherDetails &&
            ppqForm?.initiativeOtherDetails !== '' ? (
              <div className="px-4">
                <MDEditor.Markdown
                  source={ppqForm.initiativeOtherDetails}
                  aria-label="Initiative Other Details Input Preview"
                />
              </div>
            ) : (
              // Render "Not answered" if initiativeOtherDetails is empty
              <p>
                <i>Not answered</i>
              </p>
            )
          ) : null}
        </div>
        {!printPreview && (
          <div className="form-group mt-4">
            {!isReadOnly ? (
              // Render a paragraph with bold text if not read-only
              <p>
                <strong> {Messages.DeadlineDateHeading.en}</strong>
              </p>
            ) : (
              // Render a level 4 heading if read-only
              <h4>{Messages.DeadlineDateHeading.en}</h4>
            )}
            {!isReadOnly ? (
              // Render radio buttons for each item in ProposedDeadlineRadio array
              ProposedDeadlineRadio.map((radio, index) => (
                <Radio key={index} {...radio} />
              ))
            ) : (
              // Render the first character of proposedDeadlineAvailable in lowercase if read-only
              <p>
                {ppqForm?.proposedDeadlineAvailable?.charAt(0)}
                {ppqForm?.proposedDeadlineAvailable?.slice(1).toLowerCase()}
              </p>
            )}
          </div>
        )}
        {/*
  This code block conditionally renders two form groups based on the value of `ppqForm?.proposedDeadlineAvailable`.
  If `ppqForm?.proposedDeadlineAvailable` is equal to `YesNoInput.YES`, the form groups are rendered, otherwise they are skipped.
*/}
        {ppqForm?.proposedDeadlineAvailable === YesNoInput.YES && (
          <>
            {/* Form group for the proposed deadline date */}
            <div className="form-group mt-4 mb-4 col-md-3">
              {!isReadOnly ? (
                /* Label for the deadline date input */
                <label id="deadline-date-label">
                  {Messages.ProposedDeadLineHeading.en}
                  <span className="error-text "> (required)</span>
                </label>
              ) : (
                /* Heading for the deadline date */
                <h4> {Messages.ProposedDeadLineHeading.en}</h4>
              )}
              {!isReadOnly ? (
                <>
                  {/* Custom input date component */}
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
                /* Display the proposed deadline date if available, otherwise display "Not answered" */
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
            {/* Form group for the deadline reason */}
            <div className="form-group mt-4 mb-4">
              {!isReadOnly ? (
                /* Label for the deadline reason input */
                <label id="start-date-label">
                  {Messages.DeadlineReasonHeading.en}
                  <span className="error-text "> (required)</span>
                </label>
              ) : (
                /* Heading for the deadline reason */
                <h4> {Messages.DeadlineReasonHeading.en}</h4>
              )}
              {!isReadOnly ? (
                <>
                  {/* Markdown editor component for editing the deadline reason */}
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
                /* Display the rendered markdown of the deadline reason if available, otherwise display "Not answered" */
                <MDEditor.Markdown source={ppqForm.proposedDeadlineReason} />
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </>
        )}

        {/* Render the form group for the initiative summary. */}
        <div className="form-group mt-4 mb-4">
          {!isReadOnly ? (
            // Render the label for the initiative summary with a link
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
              <span> ({getCharDisplayMessage()}) </span>
            </label>
          ) : (
            // Render the heading for the initiative summary
            <h4> {Messages.InitiativeSummaryHeading.en.fullText}</h4>
          )}
          {!isReadOnly ? (
            // Render the MDEditor for editing the initiative summary
            <MDEditor
              preview="edit"
              defaultTabEnable={true}
              value={ppqForm?.pidInitiativeSummary || ''}
              onChange={(value) => handleInitiativeSummaryChange(value || '')}
              aria-label="Initiative Summary Textarea Input"
              textareaProps={{ maxLength: MAX_CHAR_COUNT }}
            />
          ) : ppqForm.pidInitiativeSummary ? (
            // Render the markdown preview of the initiative summary
            <MDEditor.Markdown
              source={ppqForm.pidInitiativeSummary}
              aria-label="Initiative Summary Textarea Input Preview"
            />
          ) : (
            // Render "Not answered" message if the initiative summary is empty
            <p>
              <i>Not answered</i>
            </p>
          )}
        </div>

        <div className="form-group mt-4">
          {/* Conditional rendering of label or heading based on 'isReadOnly' */}
          {!isReadOnly ? (
            // Label for input field
            <label id="additionalInformation">
              {Messages.AdditionalInfoHeading.en}
            </label>
          ) : (
            // Heading for read-only mode
            <h4> {Messages.AdditionalInfoHeading.en}</h4>
          )}

          {/* Conditional rendering of MDEditor based on 'isReadOnly' */}
          {!isReadOnly ? (
            // MDEditor for editable mode
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
            // MDEditor preview for read-only mode
            <MDEditor.Markdown
              source={ppqForm.otherCpoConsideration}
              aria-label="Other CPO Consideration Textarea Input Preview"
            />
          ) : (
            // Placeholder for empty input in read-only mode
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
