import SortAscending from '../../../assets/Sort-ascending.png';
import SortDescending from '../../../assets/Sort-descending.png';
import SortInactive from '../../../assets/Sort-inactive.png';
import { PiaSorting } from '../../../constant/constant';

interface ITableOrderingProps {
  currentState: number;
}

const TableOrdering = (props: ITableOrderingProps) => {
  const { currentState } = props;

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

  return <img src={sortingState(currentState)}></img>;
};

export default TableOrdering;
