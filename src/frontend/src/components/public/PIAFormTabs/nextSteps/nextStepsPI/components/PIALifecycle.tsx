import React from 'react';
import messages from '../../helper/messages';
import InfographicDelegatedPIAImg from '../../../../../../assets/InfographicDelegatedPIA.svg';
import InfographicStandardPIAImg from '../../../../../../assets/InfographicStandardPIA.svg';
import { PIALifecycleProps } from '../../../nextSteps/helper/interfaces';

// PIA lifecycle Component
export const PIALifecycle: React.FC<PIALifecycleProps> = ({
  hasAddedPiToDataElements,
}) => {
  return (
    <div className="section__padding-block">
      <h3>{messages.FullPIA.PIALifecycle.heading.en}</h3>
      <p>{messages.FullPIA.PIALifecycle.subheading.en}</p>
      <div className="bg-white drop-shadow section__padding-block section__padding-inline drop-stadow  section-border-radius">
        {hasAddedPiToDataElements ? (
          <img // Display the Infographic Standard PIA image
            className="rounded mx-auto d-block infographic-diagram"
            src={InfographicStandardPIAImg}
            alt="Infographic for Standard PIA"
          />
        ) : (
          <img // Display the Infographic Delegated PIA image
            className="rounded mx-auto d-block infographic-diagram"
            src={InfographicDelegatedPIAImg}
            alt="Infographic for Delegated PIA"
          />
        )}
      </div>
    </div>
  );
};
