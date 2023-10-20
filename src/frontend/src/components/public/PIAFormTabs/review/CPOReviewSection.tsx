import { ReviewCard } from './ReviewCard/ReviewCard';
import { getGUID, isCPORole } from '../../../../utils/user';
import messages from './helpers/messages';
import { CPOSelfReviewCard } from './CPO/CPOSelfReviewCard';
import { ICPOReviewProps } from './helpers/interfaces';

export const CPOReviewSection = (props: ICPOReviewProps) => {
  const { pia, printPreview, stateChangeHandler } = props;

  const userGUID = getGUID();
  return (
    <section className="mt-5 ">
      <h3>{messages.PiaReviewHeader.MinistrySection.CPO.Title.en}</h3>
      <p className="pb-4">
        {messages.PiaReviewHeader.MinistrySection.CPO.Description.en}
      </p>
      <div className="drop-shadow card p-4 p-md-5">
        <div className="data-table__container">
          {/* Display the other CPO user reviews */}
          {pia?.review?.cpo &&
            Object.entries(pia?.review?.cpo).map(
              ([cpoId, reviewSection]) =>
                reviewSection?.isAcknowledged &&
                cpoId !== userGUID && (
                  <ReviewCard
                    key={cpoId}
                    editMode={false}
                    reviewedAtTime={pia?.review?.cpo?.[cpoId].reviewedAt}
                    reviewedByDisplayName={
                      pia?.review?.cpo?.[cpoId].reviewedByDisplayName
                    }
                    canEditReview={false}
                    isAcknowledged={
                      pia?.review?.cpo?.[cpoId].isAcknowledged ?? false
                    }
                    reviewNote={pia?.review?.cpo?.[cpoId].reviewNote ?? ''}
                    checkBoxLabel={
                      messages.PiaReviewHeader.MinistrySection.CPO.Input
                        .AcceptAccountability.en
                    }
                  />
                ),
            )}

          {/* Show edittable review for logged in CPO user */}
          {isCPORole() && (
            <CPOSelfReviewCard
              pia={pia}
              stateChangeHandler={stateChangeHandler}
              printPreview={printPreview}
            />
          )}
        </div>
      </div>
    </section>
  );
};
