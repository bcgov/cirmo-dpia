import { useLocation, useNavigate } from 'react-router-dom';
import { INavButton } from './interface';
import HandleState from './handleState';
import { roleCheck } from '../../../utils/helper.util';

const PIANavButton = ({ pages, isDelegate }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    const backLink = HandleState(pages, pathname, 'prev');
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
    const nextLink = HandleState(pages, pathname, 'next');
    if (nextLink !== undefined && typeof nextLink !== 'object')
      navigate(nextLink);
    else {
      if (nextLink !== undefined && typeof nextLink === 'object') {
        if (Object(nextLink).link !== undefined)
          navigate(Object(nextLink).link);
      }
    }
  };

  const userRole = roleCheck().roles;

  return (
    <>
      {(HandleState(pages, pathname, 'prev') ||
        HandleState(pages, pathname, 'next')) && (
        <div className="horizontal-divider "></div>
      )}
      <div className="form-buttons ">
        {HandleState(pages, pathname, 'prev') && (
          <button
            className="bcgovbtn bcgovbtn__secondary btn-back"
            onClick={handleBack}
            type="button"
            aria-label="Back Button"
          >
            {typeof HandleState(pages, pathname, 'prev') === 'object'
              ? Object(HandleState(pages, pathname, 'next'))?.title
              : 'Back'}
          </button>
        )}
        {HandleState(pages, pathname, 'next') &&
          (!isDelegate || userRole !== undefined) && (
            <button
              className="bcgovbtn bcgovbtn__secondary btn-next ms-auto"
              onClick={handleNext}
              type="button"
              aria-label="Next Button"
            >
              {typeof HandleState(pages, pathname, 'next') === 'object'
                ? Object(HandleState(pages, pathname, 'next'))?.title
                : 'Next'}
            </button>
          )}
      </div>
    </>
  );
};

export default PIANavButton;
