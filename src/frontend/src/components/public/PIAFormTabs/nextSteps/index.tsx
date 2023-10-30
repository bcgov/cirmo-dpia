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
  const hasAddedPiToDataElement = pia?.hasAddedPiToDataElements || false; // Provide a default value if it's null or undefined
  return (
    <div className="nextSteps">
      <h2> {messages.PageTitle.en} </h2>
      {pia?.hasAddedPiToDataElements === true ||
      pia?.hasAddedPiToDataElements === null ? (
        <NextStepsPI hasAddedPiToDataElements={hasAddedPiToDataElement} />
      ) : (
        <NextStepsDelegatedFlow
          hasAddedPiToDataElements={hasAddedPiToDataElement}
        />
      )}
    </div>
  );
};
