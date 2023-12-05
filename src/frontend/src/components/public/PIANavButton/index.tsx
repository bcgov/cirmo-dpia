import { useLocation, useNavigate } from 'react-router-dom';
import { INavButton } from './interface';

const PIANavButton = ({ pages }: INavButton) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // Filter out dividers, leaving only pages
  const pagesFiltered = pages.filter((item) => !item.isDivider);

  const currentPageIndex = pagesFiltered.findIndex((page) =>
    pathname.includes(page.id),
  );
  const previousPage = pagesFiltered[currentPageIndex - 1];
  const nextPage = pagesFiltered[currentPageIndex + 1];

  // Position of current page in array
  const isFirstPage = currentPageIndex === 0;
  const isLastPage = pagesFiltered.length - 1 === currentPageIndex;

  const handleBack = () => {
    // No back button for intake page.
    if (isFirstPage) return;
    navigate(previousPage.link ?? '');
  };

  const handleNext = () => {
    // No next button if only 1 page.
    if (pagesFiltered.length === 1) return;

    // Return to intake when at end of pages.
    if (isLastPage) navigate(pagesFiltered[0].link ?? '');
    navigate(nextPage.link ?? '');
  };

  return (
    <>
      {pagesFiltered.length > 1 && <div className="horizontal-divider "></div>}
      <div className="form-buttons ">
        {!isFirstPage && (
          <button
            className="bcgovbtn bcgovbtn__secondary btn-back"
            onClick={handleBack}
            type="button"
            aria-label="Back Button"
          >
            Back
          </button>
        )}
        {pagesFiltered.length > 1 && (
          <button
            className="bcgovbtn bcgovbtn__secondary btn-next ms-auto"
            onClick={handleNext}
            type="button"
            aria-label="Next Button"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default PIANavButton;
