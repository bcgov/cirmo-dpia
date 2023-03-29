import { useEffect, useState } from 'react';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import NavBar from '../../common/Navbar';
import { PiaFormSideNavPages } from './pia-form-sideNav-pages';

const PiaSideNav = ({
  pia,
  isNewForm,
  isReadOnly,
}: {
  pia: IPiaForm;
  isNewForm: boolean;
  isReadOnly: boolean;
}) => {
  // check if in edit mode, redirect to navigate related links
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsEditMode(!isReadOnly || isNewForm);
  }, [isReadOnly, isNewForm]);

  return (
    <NavBar
      pages={PiaFormSideNavPages(pia, isEditMode, isNewForm)}
      CSSclass="sidenav"
    />
  );
};

export default PiaSideNav;
