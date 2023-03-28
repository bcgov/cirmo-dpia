import { ListPageNumberProps } from './interfaces';

const ShowingText = (props: ListPageNumberProps) => {
  return (
    <>
      <span>
        Showing {(props.currentPage - 1) * props.pageSize + 1} to{' '}
        {props.totalEntries < props.pageSize * props.currentPage
          ? props.totalEntries
          : props.currentPage * props.pageSize}&nbsp;
        of {props.totalEntries} entries
      </span>
    </>
  );
};

export default ShowingText;
