import messages from './helper/messages';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { buildDynamicPath } from '../../../../utils/path';
import { routes } from '../../../../constant/routes';
import NextStepsDelegatedFlow from './nextStepsDelegatedFlow';
import NextStepsPI from './nextStepsPI';

import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../contexts/PiaFormContext';

export const PIANextSteps = () => {
  const navigate = useNavigate();
  const { pia, piaStateChangeHandler } =
    useContext<IPiaFormContext>(PiaFormContext);

  const navigateFn = async (url: string) => {
    navigate(
      buildDynamicPath(url, {
        id: pia.id,
        title: pia.title,
      }),
    );
  };

  useEffect(() => {
    if (pia.hasAddedPiToDataElements === false) {
      if (pia.isNextStepsSeenForDelegatedFlow) {
        // redirect to view page
        navigateFn(routes.PIA_VIEW);
      } else {
        piaStateChangeHandler(true, 'isNextStepsSeenForDelegatedFlow');
        piaStateChangeHandler(false, 'isNextStepsSeenForNonDelegatedFlow');
      }
    } else {
      // if true or null
      if (pia.isNextStepsSeenForNonDelegatedFlow) {
        // redirect to next tab
        navigateFn(routes.PIA_DISCLOSURE_EDIT);
      } else {
        piaStateChangeHandler(true, 'isNextStepsSeenForNonDelegatedFlow');
        piaStateChangeHandler(false, 'isNextStepsSeenForDelegatedFlow');
      }
    }

    /* This is to prevent this function being called for every update as
    this is only required to be called once when the component is mounted */
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="nextSteps">
      <h2> {messages.PageTitle.en} </h2>
      {pia?.hasAddedPiToDataElements === true ||
      pia?.hasAddedPiToDataElements === null ? (
        <NextStepsPI navigateFn={navigateFn} />
      ) : (
        <NextStepsDelegatedFlow />
      )}
    </div>
  );
};
