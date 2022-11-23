import { useLocation } from 'react-router-dom';
import PIAIntakeResults from '../components/public/PIAIntakeResults';
import { IPPQResult } from '../types/interfaces/ppq-result.interface';

interface IPagePropState {
  result: IPPQResult;
}

const PIAIntakeResultsPage = () => {
  const location = useLocation();
  const { result } = location.state as IPagePropState;

  return (
    <>
      <PIAIntakeResults result={result} />
    </>
  );
};

export default PIAIntakeResultsPage;
