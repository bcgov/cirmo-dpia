import PPQResults from '../../components/public/PPQResults';
import { useLocation } from 'react-router-dom';
import { IPagePropState } from './interfaces';

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
