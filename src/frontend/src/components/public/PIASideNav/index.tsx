import { useEffect, useState } from 'react';
import NavBar from '../../common/Navbar';
import { PiaFormSideNavPages } from './pia-form-sideNav-pages';
import { SideNavProps } from './interfaces';

const PiaSideNav = ({ pia, isNewForm, isReadOnly }: SideNavProps) => {
  // check if in edit mode, redirect to navigate related links
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setIsEditMode(!isReadOnly || isNewForm);
  }, [isReadOnly, isNewForm]);

  return (
    <NavBar
      pages={PiaFormSideNavPages(pia, isEditMode, isNewForm)}
      CSSclass="sidenav"
      rovingTabIndex={true}
    />
  );
};

export default PiaSideNav;
