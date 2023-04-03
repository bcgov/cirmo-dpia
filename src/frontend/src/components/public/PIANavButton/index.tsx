import { useLocation, useNavigate } from 'react-router-dom';
import { INavButton } from './interface';

const PIANavButton = ({ pages, isIntakeSubmitted, isDelegate }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleNavBtn = (direction: string) => {
    const current = pages.find((page) => page.link === pathname);
    const currentIndex = pages.findIndex((page) => page.link === pathname);
    /* The firs part of this function is to check if the current page
        has a state object with the direction property. 
        If it does not, return null.
        If it does, check if the state object has a condition property. If it does not,
        check if the state object has an actionFalse property. If it does not, return null.
    */
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

    /* Now that this page has a state it is time to check the condition.
       If the condition has an action type either (true action or false action),
      check if the action is a number, string, or object.
      If it is a number, return the link of the page at the index of the current page + the action.
      If it is a string, return the link of the page with the label of the action.
      If it is an object, return the link and title of the object.
    */
    let ret = null;
    if ('condition' in Object(current.state?.[direction])) {
      if (
        typeof Object(current.state?.[direction])?.[actionType] === 'number'
      ) {
        const pageIndex =
          currentIndex + Number(current.state?.[direction]?.action);
        ret = pages[pageIndex].link;
      } else if (
        typeof Object(current.state?.[direction])?.[actionType] === 'string'
      ) {
        ret = pages.find(
          (page) =>
            page.label === Object(current.state?.[direction])?.[actionType],
        )?.link;
      } else if (
        typeof Object(current.state?.[direction])?.[actionType] === 'object'
      ) {
        // object
        const returnObj = {
          link: '',
          title: '',
        };
        if (
          'link' in Object(Object(current.state?.[direction])?.[actionType])
        ) {
          returnObj.link = Object(current.state?.[direction])?.[
            actionType
          ]?.link;
        }
        if (
          'title' in Object(Object(current.state?.[direction])?.[actionType])
        ) {
          returnObj.title = Object(current.state?.[direction])?.[
            actionType
          ]?.title;
        }
        ret = returnObj;
      }
    }
    return ret;
  };

  const handleBack = () => {
    const backLink = handleNavBtn('prev');
    if (backLink !== undefined && typeof backLink !== 'object')
      navigate(backLink);
    else {
      if (backLink !== undefined && typeof backLink === 'object') {
        if (Object(backLink).link !== undefined)
          navigate(Object(backLink).link);
      }
    }
  };

  const handleNext = () => {
    const nextLink = handleNavBtn('next');
    if (nextLink !== undefined && typeof nextLink !== 'object')
      navigate(nextLink);
    else {
      if (nextLink !== undefined && typeof nextLink === 'object') {
        if (Object(nextLink).link !== undefined)
          navigate(Object(nextLink).link);
      }
    }
  };

  return (
    <>
      {(handleNavBtn('prev') || handleNavBtn('next')) && (
        <div className="horizontal-divider "></div>
      )}
      <div className="form-buttons ">
        {handleNavBtn('prev') && (
          <button
            className="bcgovbtn bcgovbtn__secondary btn-back"
            onClick={handleBack}
          >
            {typeof handleNavBtn('prev') === 'object'
              ? Object(handleNavBtn('next'))?.title
              : 'Back'}
          </button>
        )}
        {handleNavBtn('next') && (
          <button
            type="submit"
            className="bcgovbtn  bcgovbtn__secondary btn-next ms-auto"
            onClick={handleNext}
          >
            {typeof handleNavBtn('next') === 'object'
              ? Object(handleNavBtn('next'))?.title
              : 'Next'}
          </button>
        )}
      </div>
    </>
  );
};

export default PIANavButton;
