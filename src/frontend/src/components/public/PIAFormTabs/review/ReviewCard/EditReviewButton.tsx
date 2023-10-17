import { faFileEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, SetStateAction } from 'react';

type EditReviewButtonProps = {
  setEditMode: Dispatch<SetStateAction<boolean>>;
};

export const EditReviewButton = (props: EditReviewButtonProps) => {
  const { setEditMode } = props;
  return (
    <div className=" col d-flex justify-content-end">
      <button
        className="bcgovbtn bcgovbtn__tertiary p-3"
        onClick={() => {
          setEditMode(true);
        }}
      >
        <FontAwesomeIcon className="ms-1" icon={faFileEdit} size="lg" />
        Edit review
      </button>
    </div>
  );
};
