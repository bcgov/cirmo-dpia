import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IPiaForm } from '../../../types/interfaces/pia-form.interface';
import NavBar from '../../common/Navbar';
import { piaFormSideNavPages } from './pia-form-sideNav-pages';

const PiaSideNav = ({ pia }: { pia: IPiaForm }) => {
  const { pathname } = useLocation();

  // check if in edit mode, redirect to navigate related links
  const [isEditMode, setIsEditMode] = useState(false);

  const mode = pathname?.split('/').pop(); // edit or view
  useEffect(() => {
    setIsEditMode(mode === 'edit');
  }, [pathname, mode]);

  return (
    <NavBar pages={piaFormSideNavPages(pia, isEditMode)} CSSclass="sidenav" />
  );
};

export default PiaSideNav;
