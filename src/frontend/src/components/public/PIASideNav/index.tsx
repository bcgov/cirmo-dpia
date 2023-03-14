import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import NavBar from '../../common/Navbar';
import { piaFormSideNavPages } from './pia-form-sideNav-pages';

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
      pages={piaFormSideNavPages(pia, isEditMode, isNewForm)}
      CSSclass="sidenav"
    />
  );
};

export default PiaSideNav;
