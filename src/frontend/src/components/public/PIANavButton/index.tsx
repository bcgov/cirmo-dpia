import { useLocation, useNavigate } from 'react-router-dom';
import { INavbarItem } from '../../common/Navbar/interfaces';
import { INavButton } from './interface';

const PIANavButton = ({ pages }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  console.log('page details', pages);
  const handleNavBtn = (direction: string) => {
    let currentIndex = pages.findIndex((page) => page.link === pathname);
    if (currentIndex === undefined) currentIndex = 0;
    if (direction === 'next') {
      if (currentIndex < pages.length - 1) return pages[currentIndex + 1].link;
      else return pages[currentIndex].link;
    } else if (direction === 'back') {
      if (currentIndex > 0) return pages[currentIndex - 1].link;
      else return pages[currentIndex].link;
    } else {
      return pages[currentIndex].link;
    }
  };

  const handleBack = () => {
    const backLink = handleNavBtn('back');
    navigate(backLink);
  };
  const handleNext = () => {
    const nextLink = handleNavBtn('next');
    navigate(nextLink);
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
