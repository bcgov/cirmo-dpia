import { GovMinistriesEnum } from '../../../../types/enums/gov-ministries.enum';

export interface IPiaFormIntake {
  title?: string;
  ministry?: GovMinistriesEnum | string;
  branch?: string;
  drafterName?: string;
  drafterTitle?: string;
  drafterEmail?: string;
  leadName?: string;
  leadTitle?: string;
  leadEmail?: string;
  mpoName?: string;
  mpoEmail?: string;
  initiativeDescription?: string;
  initiativeScope?: string;
  dataElementsInvolved?: string;
  hasAddedPiToDataElements?: boolean | null;
  riskMitigation?: string | undefined;
}
