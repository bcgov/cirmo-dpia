import { ListPageNumberProps } from './interfaces';
import { PaginationDirection } from './enums';
import PaginationButton from './button';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ListPageNumber = (props: ListPageNumberProps) => {
  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="page__enumeration__container">
        <PaginationButton
          currentPage={props.currentPage}
          totalEntries={props.totalEntries}
          pageSize={props.pageSize}
          changePage={props.changePage}
          icon={faAngleLeft}
          direction={PaginationDirection.left}
        />
        {props.totalEntries > props.pageSize ? (
          Array.from(
            Array(Math.ceil(props.totalEntries / props.pageSize)),
            (e, i) => {
              return (
                <li
                  tabIndex={0}
                  aria-label={'Go to Page ' + (i + 1)}
                  key={i}
                  onClick={() => {
                    props.changePage(i + 1);
                  }}
                  aria-current={i + 1 === props.currentPage}
                  className={`page__enumeration ${
                    i + 1 === props.currentPage ? 'pageActive' : ' '
                  }`}
                >
                  {i + 1}
                </li>
              );
            },
          )
        ) : (
          <li tabIndex={0} aria-current="true" aria-label={'Goto Page 1'}>
            {props.currentPage}
          </li>
        )}
        <PaginationButton
          currentPage={props.currentPage}
          totalEntries={props.totalEntries}
          pageSize={props.pageSize}
          changePage={props.changePage}
          icon={faAngleRight}
          direction={PaginationDirection.right}
        />
      </ul>
    </nav>
  );
};

export default ListPageNumber;
