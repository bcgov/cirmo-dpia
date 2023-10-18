import Checkbox from '../../../../../components/common/Checkbox';
import { Dispatch, SetStateAction } from 'react';

type IsAcknowledgedCheckboxProps = {
  isAcknowledged: boolean;
  checkBoxLabel: string;
  editMode: boolean;
  setAcknowledged: Dispatch<SetStateAction<boolean>>;
};

export const IsAcknowledgedCheckbox = (props: IsAcknowledgedCheckboxProps) => {
  const {
    isAcknowledged = false,
    checkBoxLabel = '',
    editMode = false,
    setAcknowledged,
  } = props;
  return (
    <div className="row mt-4">
      <Checkbox
        value=""
        checked={isAcknowledged}
        isLink={false}
        label={checkBoxLabel}
        readOnly={!editMode}
        onChange={(e) => {
          setAcknowledged(e.target.checked);
        }}
      />
    </div>
  );
};
