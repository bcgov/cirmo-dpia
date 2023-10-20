import Checkbox from '../../../../../components/common/Checkbox';
import { IsAcknowledgedCheckboxProps } from '../helpers/types';

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
