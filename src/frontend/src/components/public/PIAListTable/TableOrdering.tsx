import { useEffect, useState } from 'react';
import SortAscending from '../../../assets/Sort-ascending.png';
import SortDescending from '../../../assets/Sort-descending.png';
import SortInactive from '../../../assets/Sort-inactive.png';
import { PiaSorting } from '../../../constant/constant';

interface ITableOrderingProps {
  currentState: number;
  title: string;
}
type SortOrder = 'none' | 'ascending' | 'descending' | 'other' | undefined;

const TableOrdering = (props: ITableOrderingProps) => {
  const { currentState, title } = props;
  const [sortingLabel, setSortingLabel] = useState<SortOrder>('none');

  useEffect(() => {
    setSortingLabel(
      currentState === PiaSorting.INACTIVE
        ? 'none'
        : currentState === PiaSorting.DESCENDING
        ? 'descending'
        : 'ascending',
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
      aria-label={title + ' ' + sortingLabel}
      aria-sort={sortingLabel}
    ></img>
  );
};

export default TableOrdering;
