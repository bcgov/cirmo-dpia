import { DelegatedReviewTypesEnum } from 'src/common/enums/delegated-review-types.enum';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { PpqPostDTO } from 'src/modules/ppq/dto/ppq-post.dto';
import { PpqEntity } from 'src/modules/ppq/entities/ppq.entity';
import { PpqResultRO } from 'src/modules/ppq/ro/ppq-result.ro';
import { baseEntityMock } from './base.mock';

const PpqDataMock = {
  title: 'Add Figma to my BC Gov Project',
  ministry: GovMinistriesEnum.TOURISM_ARTS_CULTURE_AND_SPORT,
  description: 'string',
  piaType: PiaTypesEnum.STANDARD,
  delegatedReviewType: DelegatedReviewTypesEnum.CHECKLIST,
  proposedStartDate: '2022/06/20',
  hasSensitivePersonalInformation: false,
  hasProgramAgreement: false,
  hasOthersAccessToPersonalInformation: false,
  hasCloudTechnology: false,
  hasPotentialPublicInterest: false,
  hasDisclosureOutsideOfCanada: false,
  hasDataLinking: false,
  hasBcServicesCardOnboarding: false,
  hasAiOrMl: false,
  hasPartnershipNonMinistry: false,
};
export const createPpqRoMock: PpqResultRO = {
  id: 1,
};

export const createPpqMock: PpqPostDTO = {
  ...PpqDataMock,
};
export const ppqEntityMock: PpqEntity = {
  ...baseEntityMock,
  ...PpqDataMock,
  ...{ createdByDisplayName: 'Richard, King CITZ:EX' },
  ...{ createdByEmail: 'joe@bc.gov.ca' },
};
