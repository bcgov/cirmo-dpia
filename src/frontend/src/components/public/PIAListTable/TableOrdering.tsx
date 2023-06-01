import { useEffect, useState } from 'react';
import SortAscending from '../../../assets/Sort-ascending.png';
import SortDescending from '../../../assets/Sort-descending.png';
import SortInactive from '../../../assets/Sort-inactive.png';
import { PiaSorting } from '../../../constant/constant';

interface ITableOrderingProps {
  currentState: number;
  title: string;
  heading: string;
  sorting: (key: string) => void;
}

const TableOrdering = (props: ITableOrderingProps) => {
  const { currentState, title, heading, sorting } = props;
  const [sortingLabel, setSortingLabel] = useState<string>('none');

  useEffect(() => {
    setSortingLabel(
      currentState === PiaSorting.INACTIVE
        ? 'sort by'
        : currentState === PiaSorting.DESCENDING
        ? 'sort descending'
        : 'sort ascending',
    );
  }, [currentState]);
  function sortingState(sortOrder: number) {
    switch (sortOrder) {
      case PiaSorting.INACTIVE:
        return SortInactive;
      case PiaSorting.ASCENDING:
        return SortAscending;
      case PiaSorting.DESCENDING:
        return SortDescending;
    }
  }

  return (
    <img
      tabIndex={0}
      role="button"
      src={sortingState(currentState)}
      aria-label={title + ' ' + sortingLabel + ' ' + 'button'}
      onClick={() => sorting(heading)}
      onKeyDown={(event) => {
        if (event.code === 'Enter') {
          event.preventDefault();
          sorting(heading);
        }
      }}
    ></img>
  );
};

export default TableOrdering;
