import PPQConnect from '../components/public/PPQConnect';
import { IPPQResult } from '../types/interfaces/ppq-result.interface';
import { useLocation } from 'react-router-dom';

interface IPagePropState {
  result: IPPQResult;
}

const PPQConnectPage = () => {
  const location = useLocation();
  const { result } = location.state as IPagePropState;

  return (
    <div className="bcgovPageContainer background-connect">
      <PPQConnect result={result} />
    </div>
  );
};

export default PPQConnectPage;
