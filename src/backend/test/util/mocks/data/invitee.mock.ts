import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { InviteeEntity } from 'src/modules/invitees/entities/invitee.entity';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { inviteEntityMock } from './invites.mock';

// defining new PIA to avoid circular dependency
const pia = {
  id: 1,
  title: 'Test PIA',
  ministry: GovMinistriesEnum.ATTORNEY_GENERAL,
  branch: 'Test',
  leadName: 'Test',
  leadTitle: 'Test',
  leadEmail: 'test@test.com',
  initiativeDescription: 'Test',
  initiativeScope: 'Test',
  dataElementsInvolved: 'Test',
  hasAddedPiToDataElements: false,
  riskMitigation: 'Test',
  status: PiaIntakeStatusEnum.CPO_REVIEW,
  saveId: 1,
  submittedAt: new Date(),
  isActive: true,
  isNextStepsSeenForDelegatedFlow: false,
  isNextStepsSeenForNonDelegatedFlow: false,
} as PiaIntakeEntity;

export const inviteeEntityMock: InviteeEntity = {
  id: 1,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdByGuid: 'DBB6707E34A641FC8ABEBF07B8145F60',
  createdByUsername: 'KARORA',
  updatedByGuid: 'DBB6707E34A641FC8ABEBF07B8145F60',
  updatedByUsername: 'KARORA',
  createdByDisplayName: 'Arora, Kushal CITZ:EX',
  piaId: 101,
  inviteId: 1001,
  invite: { ...inviteEntityMock },
  pia,
};
