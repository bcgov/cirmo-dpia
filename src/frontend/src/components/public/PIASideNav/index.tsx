import NavBar from '../../common/Navbar';
import { piaFormSideNavPages as pages } from './pia-form-sideNav-pages';

/* TODO: This logic is not complete. Will need to be worked on
    when implementing next steps */
const enableSideNavList = (pi: boolean | null) => {
  pages.map((page) => {
    if (pi) {
      /* All features are enabled if the 
                initiative has personal information */
      if (page.label === 'Next Steps') {
        page.enable = false;
      } else {
        page.enable = true;
      }
    } else {
      /* Only the delegated features are enabled if the 
                initiative has no personal information */
      if (page.label === 'PIA Intake' || page.label === 'Next Steps') {
        page.enable = true;
      } else {
        page.enable = false;
      }
    }
  });
  return pages;
};

interface PI {
  personal_information: boolean;
}

const PiaSideNav = (personal_information: PI) => {
  const sideElement = enableSideNavList(
    personal_information.personal_information,
  );
  return <NavBar pages={sideElement} CSSclass="sidenav" />;
};

export default PiaSideNav;
