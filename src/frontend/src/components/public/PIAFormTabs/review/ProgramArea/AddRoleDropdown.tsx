import Dropdown from '../../../../../components/common/Dropdown';
import { ApprovalRoles } from '../../../../../constant/constant';
import { AddRoleDropdownProps } from '../helpers/types';

export const AddRoleDropdown = (props: AddRoleDropdownProps) => {
  const { reviewForm, rolesSelect, setRolesSelect, addRole } = props;
  return (
    <div className="p-2 col-md-5">
      <Dropdown
        id="programArea"
        label="Select a role from the list"
        options={Object.keys(ApprovalRoles)
          .filter(
            (role) =>
              !reviewForm.programArea?.selectedRoles?.includes(
                ApprovalRoles[role],
              ),
          )
          .map((role: string) => ({
            value: role,
            label: ApprovalRoles[role],
          }))}
        value={rolesSelect}
        changeHandler={(e) => setRolesSelect(e.target.value)}
      />
      <button
        className="bcgovbtn bcgovbtn__secondary mt-3"
        onClick={() => {
          addRole(ApprovalRoles[rolesSelect]);
          setRolesSelect('');
        }}
      >
        Add
      </button>
    </div>
  );
};
