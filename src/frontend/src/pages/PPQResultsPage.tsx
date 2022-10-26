import PPQResults from '../components/public/PPQResults';
import {
  faFileLines,
  faFileCircleCheck,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
<<<<<<< HEAD
import { StageProps } from '../components/public/ProgressBar/interfaces';
import StagesArray from '../components/public/ProgressBar/StagesArray';
import { useLocation } from 'react-router-dom';
import { IPPQResult } from '../ts/interfaces/ppq-result.interface';

interface IPagePropState {
  result: IPPQResult;
}
=======
import { StageProps } from '../components/common/ProgressBar/interfaces';
import StagesArray from '../components/common/ProgressBar/StagesArray';
>>>>>>> 7c48468 (Beginning of frontend refactor.)

const PPQResultsPage = () => {
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
      active: false,
    },
  ];

  return (
    <>
      <StagesArray stages={stages} />
      <PPQResults result={result} />
    </>
  );
};

export default PPQResultsPage;
