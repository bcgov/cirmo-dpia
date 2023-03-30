import { useLocation, useNavigate } from 'react-router-dom';
import { INavbarItem } from '../../common/Navbar/interfaces';
import { INavButton } from './interface';

const PIANavButton = ({ pages }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavBtn = (direction: string) => {
    const currentTabObj = pages.filter((page) => page.link === pathname);
    let resultTab: INavbarItem[] = [];
    if (direction === 'next') {
      resultTab = pages.filter((page) => page.id === currentTabObj[0].id + 1);
    } else if (direction === 'back') {
      resultTab = pages.filter((page) => page.id === currentTabObj[0].id - 1);
    }
    return resultTab;
  };

  const handleBack = () => {
    const prevTab = handleNavBtn('back');
    navigate(prevTab[0].link);
  };
  const handleNext = () => {
    const nextTab = handleNavBtn('next');
    navigate(nextTab[0].link);
  };
  return (
    <>
      {!pathname.includes('intake') && (
        <div>
          <div className="horizontal-divider"></div>
          <div className="form-buttons ">
            {!pathname.includes('collectionUseAndDisclosure') && (
              <button
                className="bcgovbtn bcgovbtn__secondary btn-back"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {!pathname.includes('additionalRisks') && (
              <button
                type="submit"
                className="bcgovbtn  bcgovbtn__secondary btn-next ms-auto"
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
