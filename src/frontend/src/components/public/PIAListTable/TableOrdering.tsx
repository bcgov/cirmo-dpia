import SortAscending from '../../../assets/Sort-ascending.png';
import SortDescending from '../../../assets/Sort-descending.png';
import SortInactive from '../../../assets/Sort-inactive.png';

interface ITableOrderingProps {
  currentState: number;
}

const TableOrdering = (props: ITableOrderingProps) => {
  const { currentState } = props;
  const sortingState = [SortInactive, SortAscending, SortDescending];
  return <img src={sortingState[currentState]}></img>;
};

export default TableOrdering;
