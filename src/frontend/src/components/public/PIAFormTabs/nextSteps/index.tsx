import messages from './helper/messages';
import { useContext } from 'react';
import NextStepsDelegatedFlow from './nextStepsDelegatedFlow';
import NextStepsPI from './nextStepsPI';

import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';

export const PIANextSteps = () => {
  const { pia } = useContext<IPiaFormContext>(PiaFormContext);

  return (
    <div className="nextSteps">
      <h2> {messages.PageTitle.en} </h2>
      {pia?.hasAddedPiToDataElements === true ||
      pia?.hasAddedPiToDataElements === null ? (
        <NextStepsPI />
      ) : (
        <NextStepsDelegatedFlow />
      )}
    </div>
  );
};
