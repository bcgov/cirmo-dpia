import { useLocation, useNavigate } from 'react-router-dom';
import { INavButton } from './interface';

const PIANavButton = ({ pages, isIntakeSubmitted, isDelegate }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavBtn = (direction: string) => {
    let currentIndex = pages.findIndex((page) => page.link === pathname);
    if (currentIndex === undefined) currentIndex = 0;
    if (direction === 'next') {
      if (currentIndex < pages.length - 1) {
        // TODO refactor this part of code, this is a very hacky way to nav from intake page to disclosure page
        // as we need to by pass next steps, faq(temporally), the divider line
        // if it is in the intake page, the index will be 0, so the disclosure tab index will be 4
        if (pages[currentIndex + 1].link.includes('nextSteps'))
          return pages[currentIndex + 4].link;
        else return pages[currentIndex + 1].link;
      } else return pages[currentIndex].link;
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
      {!isDelegate && isIntakeSubmitted && (
        <div>
          <div className="horizontal-divider"></div>
          <div className="form-buttons ">
            {!pathname.includes(pages[0].link) && (
              <button
                className="bcgovbtn bcgovbtn__secondary btn-back"
                onClick={handleBack}
              >
                Back
              </button>
            )}
            {!pathname.includes(pages[pages.length - 1].link) && (
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
