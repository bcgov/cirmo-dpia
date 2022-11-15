import PPQResults from '../components/public/PPQResults';
import { useLocation } from 'react-router-dom';
import { IPPQResult } from '../ts/interfaces/ppq-result.interface';

interface IPagePropState {
  result: IPPQResult;
}

const PPQResultsPage = () => {
  const location = useLocation();
  const { result } = location.state as IPagePropState;

  return (
    <>
      <PPQResults result={result} />
    </>
  );
};

export default PPQResultsPage;
