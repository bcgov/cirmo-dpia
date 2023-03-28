import { ListPageNumberProps, Direction } from './interfaces';
import PaginationButton from './button';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ListPageNumber = (props: ListPageNumberProps) => {
  return (
    <ul className="page__enumeration__container">
      <PaginationButton
        currentPage={props.currentPage}
        totalEntries={props.totalEntries}
        pageSize={props.pageSize}
        changePage={props.changePage}
        icon={faAngleLeft}
        direction={Direction.left}
      />
      {props.totalEntries > props.pageSize ? (
        Array.from(
          Array(Math.ceil(props.totalEntries / props.pageSize)),
          (e, i) => {
            return (
              <li
                key={i}
                onClick={() => {
                  props.changePage(i + 1);
                }}
                className={`page__enumeration ${
                  i + 1 == props.currentPage ? 'pageActive' : ' '
                }`}
              >
                {i + 1}
              </li>
            );
          },
        )
      ) : (
        <li>{props.currentPage}</li>
      )}
      <PaginationButton
        currentPage={props.currentPage}
        totalEntries={props.totalEntries}
        pageSize={props.pageSize}
        changePage={props.changePage}
        icon={faAngleRight}
        direction={Direction.right}
      />
    </ul>
  );
};

export default ListPageNumber;
