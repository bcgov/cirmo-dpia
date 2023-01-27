import { useLocation } from 'react-router-dom';
import PIAIntakeResults from '../components/public/PIAIntakeResults';
import { IPIAIntake } from '../types/interfaces/pia-intake.interface';

interface IPagePropState {
  result: IPIAIntake;
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
