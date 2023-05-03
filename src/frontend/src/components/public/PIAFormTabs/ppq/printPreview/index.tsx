import MDEditor from '@uiw/react-md-editor';
import Checkbox from '../../../../../components/common/Checkbox';
import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { IPPQ, OtherFactor } from '../interfaces';
import Messages from '../messages';
import { YesNoInput } from '../../../../../types/enums/yes-no.enum';
const PPQPrintPreview = (pia: IPiaForm) => {
  return (
    <>
      <h2 className="results-header">
        <b>{Messages.Headings.Title.en}</b>
      </h2>
      <p className="pb-4"> {Messages.Headings.Description.en}</p>
      <section className="drop-shadow card p-4 p-md-5">
        <h4>{Messages.InitiativeFactorsHeading.en}</h4>
        <div className="row">
          {OtherFactor.map((factor, index) => {
            return (
              <Checkbox
                key={index}
                checked={!!pia?.ppq?.[factor.value as keyof IPPQ]}
                isLink={false}
                value={factor.value}
                label={factor.label}
                tooltip={factor.tooltip}
                tooltipText={factor.tooltipText}
                readOnly={true}
              />
            );
          })}
          {pia?.ppq?.initiativeOtherDetails ? (
            <div className="px-4">
              <MDEditor.Markdown source={pia?.ppq?.initiativeOtherDetails} />
            </div>
          ) : pia?.ppq?.hasInitiativeOther ? (
            <p>
              <i>Not answered</i>
            </p>
          ) : null}
        </div>
        {pia?.ppq?.proposedDeadlineAvailable === YesNoInput.YES && (
          <>
            <div className="form-group mt-4">
              <h4>{Messages.DeadlineDateHeading.en}</h4>

              <p>
                {pia?.ppq?.proposedDeadlineAvailable?.charAt(0)}
                {pia?.ppq?.proposedDeadlineAvailable?.slice(1).toLowerCase()}
              </p>
            </div>

            <div className="form-group mt-4 mb-4 col-md-3">
              <h4> {Messages.ProposedDeadLineHeading.en}</h4>

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
            </div>
            <div className="form-group mt-4 mb-4">
              <h4> {Messages.DeadlineReasonHeading.en}</h4>
              {pia?.ppq?.proposedDeadlineReason ? (
                <MDEditor.Markdown source={pia?.ppq?.proposedDeadlineReason} />
              ) : (
                <p>
                  <i>Not answered</i>
                </p>
              )}
            </div>
          </>
        )}

        <div className="form-group mt-4">
          <h4> {Messages.AdditionalInfoHeading.en}</h4>
          {pia?.ppq?.otherCpoConsideration ? (
            <MDEditor.Markdown source={pia?.ppq?.otherCpoConsideration} />
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

export default PPQPrintPreview;
