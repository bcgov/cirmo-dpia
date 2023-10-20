import InputText from '../../../../../components/common/InputText/InputText';
import messages from '../helpers/messages';
import { AddRoleInputProps } from '../helpers/types';

export const AddRoleInput = (props: AddRoleInputProps) => {
  const { rolesInput, setRolesInput, addRole } = props;
  return (
    <div className="p-2 col-md-5">
      <InputText
        id="programArea"
        label={
          messages.PiaReviewHeader.ProgramAreaSection.Input.EnterRoleTitle.en
        }
        value={rolesInput}
        onChange={(e) => setRolesInput(e.target.value)}
      />
      <button
        className="bcgovbtn bcgovbtn__secondary mt-3"
        onClick={() => {
          addRole(rolesInput);
          setRolesInput('');
        }}
      >
        Add
      </button>
    </div>
  );
};
