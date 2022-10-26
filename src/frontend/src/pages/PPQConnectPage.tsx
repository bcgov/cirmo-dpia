import PPQConnect from '../components/public/PPQConnect';
import {
  faFileLines,
  faFileCircleCheck,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import { StageProps } from '../components/public/ProgressBar/interfaces';
import StagesArray from '../components/public/ProgressBar/StagesArray';
import { IPPQResult } from '../ts/interfaces/ppq-result.interface';
import { useLocation } from 'react-router-dom';

interface IPagePropState {
  result: IPPQResult;
}

const PPQConnectPage = () => {
  const location = useLocation();
  const { result } = location.state as IPagePropState;

  const stages: StageProps[] = [
    {
      id: 1,
      label: 'Fill out the PPQ',
      icon: faFileLines,
      active: true,
    },
    {
      id: 2,
      label: 'Review results',
      icon: faFileCircleCheck,
      active: true,
    },
    {
      id: 3,
      label: 'Connect with your MPO',
      icon: faHandshake,
      active: true,
    },
  ];

  return (
    <>
      <StagesArray stages={stages} />
      <PPQConnect result={result} />
    </>
  );
};

export default PPQConnectPage;
