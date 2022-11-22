import PPQConnect from '../components/public/PPQConnect';
import { IPPQResult } from '../ts/interfaces/ppq-result.interface';
import { useLocation } from 'react-router-dom';

interface IPagePropState {
  result: IPPQResult;
}

const PPQConnectPage = () => {
  const location = useLocation();
  const { result } = location.state as IPagePropState;

  return (
    <div className="background-connect results-wrapper">
      <PPQConnect result={result} />
    </div>
  );
};

export default PPQConnectPage;
