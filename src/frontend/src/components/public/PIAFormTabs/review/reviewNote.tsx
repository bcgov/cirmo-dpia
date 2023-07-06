import { IReviewSection } from './interfaces';
import Alert from '../../../../components/common/Alert';
import messages from './messages';

interface IReviewNoteProps {
  reviewSection?: IReviewSection;
  PI?: boolean | null | undefined;
}

const ReviewNote = ({ reviewSection, PI }: IReviewNoteProps) => {
  const evaluateDeclined = () => {
    /*
     * !TODO: change this evaluation when backend API is committed
     */
    if (reviewSection?.reviewNote?.includes('declined')) {
      return true;
    }
    return false;
  };
  return (
    <>
      !PI && reviewSection?.reviewNote && (
      <div className="row mt-4">
        <div className="col col-md-3">
          <b> Review note</b>
          <div className="mt-2"> {Object(reviewSection)?.reviewNote}</div>
        </div>
      </div>
      )
      {PI && evaluateDeclined() && (
        <div className="row mt-4">
          <div className="col col-md-3">
            <Alert
              type="warning"
              message={
                messages.PiaReviewHeader.MinistrySection.Input.DeclineNote.en
              }
              showCloseIcon={false}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewNote;
