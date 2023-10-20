import PPQConnect from '../../components/public/PPQConnect';
import { useLocation } from 'react-router-dom';
import { IPagePropState } from './interfaces';

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
