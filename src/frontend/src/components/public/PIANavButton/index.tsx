import { useLocation, useNavigate } from 'react-router-dom';
import { piaFormSideNavPages } from '../PIASideNav/pia-form-sideNav-pages';
import { INavButton } from './interface';

const PIANavButton = ({ pia }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleNext = () => {
    const editMode = pathname.split('/')[4];
    const pages = piaFormSideNavPages(
      pia,
      editMode === 'edit' ? true : false,
      false,
    );
    const currentTabObj = pages.filter((page) => page.link === pathname);
    const nextTabObj = pages.filter(
      (page) => page.id === currentTabObj[0].id + 1,
    );
    navigate(nextTabObj[0].link);
  };
  return (
    <>
      {!pathname.includes('intake') && (
        <div>
          <div className="horizontal-divider"></div>
          <div className="form-buttons">
            <button
              className="bcgovbtn bcgovbtn__secondary btn-back"
              onClick={handleBack}
            >
              Back
            </button>
            {!pathname.includes('additionalRisks') && (
              <button
                type="submit"
                className="bcgovbtn  bcgovbtn__secondary btn-next"
                onClick={handleNext}
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PIANavButton;
