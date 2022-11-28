import { useLocation } from 'react-router-dom';
import PIAIntakeResults from '../components/public/PIAIntakeResults';
import { IPIAIntakeResult } from '../types/interfaces/pia-intake-result.interface';

interface IPagePropState {
  result: IPIAIntakeResult;
}

const PIAIntakeResultsPage = () => {
  const location = useLocation();
  const { result } = location.state as IPagePropState;

  return (
    <div className="bcgovPageContainer background-connect">
      <PIAIntakeResults result={result} />
    </div>
  );
};

export default PIAIntakeResultsPage;
