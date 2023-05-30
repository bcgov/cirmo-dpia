import { useEffect, useState } from 'react';
import SortAscending from '../../../assets/Sort-ascending.png';
import SortDescending from '../../../assets/Sort-descending.png';
import SortInactive from '../../../assets/Sort-inactive.png';
import { PiaSorting } from '../../../constant/constant';

interface ITableOrderingProps {
  currentState: number;
  title: string;
}

const TableOrdering = (props: ITableOrderingProps) => {
  const { currentState, title } = props;
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
      src={sortingState(currentState)}
      aria-label={title + ' ' + sortingLabel + ' ' + 'button'}
    ></img>
  );
};

export default TableOrdering;
