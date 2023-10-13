import { IPiaForm } from '../../../../../types/interfaces/pia-form.interface';
import { IPiaFormIntake } from './pia-form-intake.interface';

export const exportIntakeFromPia = (pia: IPiaForm): IPiaFormIntake => {
  if (!pia) return {};

  const piaFormIntake: IPiaFormIntake = {
    title: pia.title,
    ministry: pia.ministry,
    branch: pia.branch,
    drafterName: pia.drafterName,
    drafterEmail: pia.drafterEmail,
    leadName: pia.leadName,
    leadTitle: pia.leadTitle,
    leadEmail: pia.leadEmail,
    mpoName: pia.mpoName,
    mpoEmail: pia.mpoEmail,
    initiativeDescription: pia.initiativeDescription,
    initiativeScope: pia.initiativeScope,
    dataElementsInvolved: pia.dataElementsInvolved,
    hasAddedPiToDataElements: pia.hasAddedPiToDataElements,
    riskMitigation: pia.riskMitigation,
  };

  return piaFormIntake;
};
