import { useLocation } from 'react-router-dom';
import PIAIntakeResults from '../../components/public/PIAIntakeResults';
import { IPiaForm } from '../../types/interfaces/pia-form.interface';

interface IPagePropState {
  result: IPiaForm;
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
