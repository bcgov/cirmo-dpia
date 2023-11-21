import React from 'react';
import messages from '../../helper/messages';
import InfographicDelegatedPIAImg from '../../../../../../assets/InfographicDelegatedPIA.svg';
import InfographicStandardPIAImg from '../../../../../../assets/InfographicStandardPIA.svg';
import { PIALifecycleProps } from '../../../nextSteps/helper/interfaces';
import ImageMagnifier from '../../../../../common/ImageMagnifier';

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
          // Display the Infographic Standard PIA image
          <ImageMagnifier
            src={InfographicStandardPIAImg}
            alt="Infographic for Standard PIA"
          />
        ) : (
          // Display the Infographic Delegated PIA image
          <ImageMagnifier
            src={InfographicDelegatedPIAImg}
            alt="Infographic for Standard PIA"
          />
        )}
      </div>
    </div>
  );
};
