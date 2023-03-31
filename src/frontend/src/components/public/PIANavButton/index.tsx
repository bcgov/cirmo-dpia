import { Link, useLocation, useNavigate } from 'react-router-dom';
import { INavButton } from './interface';

const PIANavButton = ({ pages, isIntakeSubmitted, isDelegate }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

const handleNavAction = (direction: string) => {

}

  const handleNavBtn = (direction: string) => {
    const current = pages.find((page) => page.link === pathname);
    const currentIndex = pages.findIndex((page) => page.link === pathname);
    if (current === undefined) return;
    let actionType = 'action';
    if (!current.state?.[direction]?.condition) {
      if ('actionFalse' in Object(current.state?.[direction])) {
       actionType = 'actionFalse';
      } else {
        /* if there is no action for false, return null */
          return;
       } 
    }
    if (current.state?.[direction]?.condition) {
      if (typeof Object(current.state?.[direction])?.[actionType] === 'number') {
        let pageIndex =
          currentIndex + Number(current.state?.[direction]?.action);
        return pages[pageIndex].link;
      } else if (typeof Object(current.state?.[direction])?.[actionType] === 'string') {
        return pages.find(
          (page) => page.label === Object(current.state?.[direction])?.[actionType],
        )?.link;
      } else { // object
        let returnObj = {
          link: '',
          title: '',
        };
        if ('link' in (Object)(Object(current.state?.[direction])?.[actionType])) {
          returnObj.link = Object(current.state?.[direction]?.action)?.link;
        }
        if ('title' in (Object)(Object(current.state?.[direction])?.[actionType])) {
          returnObj.title = Object(current.state?.[direction]?.action)?.title;
        }
        return returnObj;
      }

    }
  };

  const handleBack = () => {
    const backLink = handleNavBtn('prev');
    if (backLink !== undefined && typeof backLink !== 'object') navigate(backLink);
    else {
      if (backLink !== undefined && typeof backLink === 'object') {
        if (backLink.link !== undefined) navigate(backLink.link);
      }
    }
  };
  
  const handleNext = () => {
    const nextLink = handleNavBtn('next');
    if (nextLink !== undefined && typeof nextLink !== 'object') navigate(nextLink);
    else {
      if (nextLink !== undefined && typeof nextLink === 'object') {
        if (nextLink.link !== undefined) navigate(nextLink.link);
      }
    }
  };

  return (
    <>
      <div>
        <div className="horizontal-divider"></div>
        <div className="form-buttons ">
          {handleNavBtn('prev') && (
            <button
              className="bcgovbtn bcgovbtn__secondary btn-back"
              onClick={handleBack}
            >
              Back
            </button>
          )}
          {handleNavBtn('next') && (
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
    </>
  );
};

export default PIANavButton;
function handleNavBtn(arg0: string) {
  throw new Error('Function not implemented.');
}
