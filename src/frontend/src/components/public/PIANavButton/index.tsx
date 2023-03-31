import { Link, useLocation, useNavigate } from 'react-router-dom';
import { INavButton } from './interface';

const PIANavButton = ({ pages, isIntakeSubmitted, isDelegate }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavBtn = (direction: string) => {
    const current = pages.find((page) => page.link === pathname);
    const currentIndex = pages.findIndex((page) => page.link === pathname);
    if (current === undefined) return;
    if (direction === 'next') {
      if (current.state?.next?.condition) {
        if (current.state?.next?.action === +1) {
          return pages[currentIndex + 1].link;
        } else if (typeof current.state?.next?.action === 'string') {
          return pages.find(
            (page) => page.label === current.state?.next?.action,
          )?.link;
        }
      }
    } else if (direction === 'back') {
      if (current.state?.prev?.condition) {
        if (current.state?.prev?.action === -1) {
          return pages[currentIndex - 1].link;
        } else if (typeof current.state?.prev?.action === 'string') {
          return pages.find(
            (page) => page.label === current.state?.prev?.action,
          )?.link;
        }
      }
    }
  };

  const handleBack = () => {
    const backLink = handleNavBtn('back');
    if (backLink !== undefined) navigate(backLink);
  };
  const handleNext = () => {
    const nextLink = handleNavBtn('next');
    if (nextLink !== undefined) navigate(nextLink);
  };

  return (
    <>
      {!isDelegate
        ? isIntakeSubmitted && (
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
          )
        : !pathname.includes(pages[0].link) && (
            <div>
              <div className="horizontal-divider"></div>
              <div className="form-buttons ">
                <button
                  className="bcgovbtn bcgovbtn__secondary btn-back"
                  onClick={handleBack}
                >
                  Back
                </button>
                <Link
                  to="/pia/list"
                  className="bcgovbtn bcgovbtn__primary btn-next ms-auto"
                >
                  View PIA list
                </Link>
              </div>
            </div>
          )}
    </>
  );
};

export default PIANavButton;
