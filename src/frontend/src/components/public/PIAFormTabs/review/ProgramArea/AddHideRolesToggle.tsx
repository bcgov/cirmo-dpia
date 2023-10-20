import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddHideRolesToggleProps } from '../helpers/types';

export const AddHideRolesToggle = (props: AddHideRolesToggleProps) => {
  const { setShowAddRolesArea, showAddRolesArea } = props;
  return (
    <section className="d-flex justify-content-center">
      <button
        className="bcgovbtn bcgovbtn__tertiary bold"
        onClick={() => setShowAddRolesArea(!showAddRolesArea)}
      >
        {!showAddRolesArea ? 'Add a role' : 'Hide Roles'}
        <FontAwesomeIcon icon={faPlus} className="ml-2" />
      </button>
    </section>
  );
};
