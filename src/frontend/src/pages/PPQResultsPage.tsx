import PPQResults from '../components/public/PPQResults';
import {
  faFileLines,
  faFileCircleCheck,
  faHandshake,
} from '@fortawesome/free-solid-svg-icons';
import { StageProps } from '../components/public/ProgressBar/interfaces';
import StagesArray from '../components/public/ProgressBar/StagesArray';

const PPQResultsPage = () => {
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
      <PPQResults />
    </>
  );
};

export default PPQResultsPage;
