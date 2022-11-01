import { ReactElement, useState } from 'react';

export const useProgressBar = (stages: ReactElement[]) => {
  const [currentStageIndex, setCurrentStage] = useState(0);

  const next = () => {
    setCurrentStage((i) => {
      if (i >= stages.length - 1) return i;
      return i + 1;
    });
  };

  const back = () => {
    setCurrentStage((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  return {
    currentStageIndex,
    stage: stages[currentStageIndex],
    stages,
    next,
    back,
  };
};
