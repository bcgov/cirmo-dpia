import { PiaStatuses } from '../../../../../constant/constant';
import React, { useContext } from 'react';
import {
  IPiaFormContext,
  PiaFormContext,
} from '../../../../../contexts/PiaFormContext';
import { FillOutFullPIA } from './components/FillOutFullPIA';
import { NotifyMPO } from './components/NotifyMPO';
import { PIALifecycle } from './components/PIALifecycle';
import { SubmitForMPO } from './components/SubmitForMPO';
import { NextStepsPIProps } from '../helper/interfaces';

const NextStepsPI: React.FC<NextStepsPIProps> = ({
  hasAddedPiToDataElements,
}) => {
  const { pia } = useContext<IPiaFormContext>(PiaFormContext);
  // Show different text based on status.
  return (
    <section className="">
      {pia?.status === PiaStatuses.INCOMPLETE && (
        <>
          <FillOutFullPIA />
          <SubmitForMPO />
        </>
      )}
      {pia?.status === PiaStatuses.MPO_REVIEW && <NotifyMPO />}
      <PIALifecycle hasAddedPiToDataElements={hasAddedPiToDataElements} />
    </section>
  );
};

export default NextStepsPI;
