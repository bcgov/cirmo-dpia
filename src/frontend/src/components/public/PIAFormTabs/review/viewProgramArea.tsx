import { Dispatch, SetStateAction, useState } from 'react';

import { IPiaForm } from '../../../../types/interfaces/pia-form.interface';
import ViewReviewSection from './viewReviewSection';
import { IReview } from './interfaces';
import messages from './messages';
import { getGUID } from '../../../../utils/user';
import { getUserPrivileges } from '../../../../utils/statusList/common';

interface IViewProgramAreaReviewProps {
  pia: IPiaForm;
  stateChangeHandler: (value: any, path: string, callApi?: boolean) => void;
  editReviewNote?: Dispatch<SetStateAction<boolean>>;
  printPreview?: boolean;
  role: string;
}

const ViewProgramAreaReview = (props: IViewProgramAreaReviewProps) => {
  const { pia, printPreview, stateChangeHandler, role } = props;

  const reviewedByDisplayName = Object(
    props.pia?.review?.mpo,
  )?.reviewedByDisplayName;

  const reviewedAt = Object(props.pia?.review?.mpo)?.reviewedAt;
  const reviewGuid = Object(props.pia?.review?.mpo)?.reviewedByGuid;

  /**
   * Local state for the checkbox and review note
   */
  const [acknowledged, setAcknowledged] = useState(
    pia.review?.programArea?.reviews?.[
      role as keyof IReview['programArea']['reviews']
    ]?.isAcknowledged || false,
  );
  const [reviewNote, setReviewNote] = useState(
    pia.review?.programArea?.reviews?.[
      role as keyof IReview['programArea']['reviews']
    ]?.reviewNote || '',
  );
  const [editReviewNote, setEditReviewNote] = useState(false);
  const handleSubmit = () => {
    const review = { isAcknowledged: acknowledged, reviewNote };
    stateChangeHandler(review, `programArea.reviews.${role}`, true);
  };
  const handleClear = () => {
    stateChangeHandler(null, `programArea.reviews.${role}`, true);
  };

  const canEditReview =
    reviewGuid === getGUID() &&
    !printPreview &&
    (getUserPrivileges(pia)?.Pages?.review?.params?.editProgramAreaReview ??
      false);

  return (
    <div className="d-grid gap-3">
      {printPreview ? (
        <div>
          <div className="mt-2 pb-2">
            <h3>
              <b>{role}</b>
            </h3>
          </div>
          {!pia?.review?.programArea?.reviews?.[role as keyof IReview]
            ?.isAcknowledged ? (
            <div className="row mb-5 p-3 pb-5 border border-2 rounded">
              <div>Reviewed by</div>
              <div>Review incomplete</div>
            </div>
          ) : (
            <div>
              <ViewReviewSection
                pia={pia}
                printPreview
                editReviewNote={editReviewNote}
                setEditReviewNote={setEditReviewNote}
                isAcknowledged={acknowledged}
                setAcknowledged={setAcknowledged}
                setReviewNote={setReviewNote}
                reviewedByDisplayName={reviewedByDisplayName}
                reviewNote={reviewNote}
                reviewedAtTime={reviewedAt}
                checkBoxLabel={
                  messages.PiaReviewHeader.MinistrySection.MPO.Input
                    .AcceptAccountability.en
                }
                canEditReview={canEditReview}
                onClearClick={handleClear}
                onConfirmClick={handleSubmit}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-2 pb-2">
          <ViewReviewSection
            pia={pia}
            editReviewNote={editReviewNote}
            setEditReviewNote={setEditReviewNote}
            isAcknowledged={acknowledged}
            setAcknowledged={setAcknowledged}
            setReviewNote={setReviewNote}
            reviewedByDisplayName={reviewedByDisplayName}
            reviewNote={reviewNote}
            reviewedAtTime={reviewedAt}
            checkBoxLabel={
              messages.PiaReviewHeader.ProgramAreaSection.Input
                .AcceptAccountability.en
            }
            canEditReview={canEditReview}
            onClearClick={handleClear}
            onConfirmClick={handleSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default ViewProgramAreaReview;
