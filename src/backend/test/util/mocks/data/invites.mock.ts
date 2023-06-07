import { GenerateInviteDto } from 'src/modules/invites/dto/generate-invite.dto';
import { InviteEntity } from 'src/modules/invites/entities/invite.entity';
import { InviteRO } from 'src/modules/invites/ro/get-invite.ro';
import { piaIntakeEntityMock } from './pia-intake.mock';

export const generateInviteDtoMock: GenerateInviteDto = {
  piaId: 101,
};

export const generateInviteROMock: InviteRO = {
  piaId: 101,
  code: '39581485-6d75-4f31-a739-4919d6de0ec9',
};

export const inviteEntityMock: InviteEntity = {
  id: 1,
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  createdByGuid: 'DBB6707E34A641FC8ABEBF07B8145F60',
  createdByUsername: 'KARORA',
  updatedByGuid: 'DBB6707E34A641FC8ABEBF07B8145F60',
  updatedByUsername: 'KARORA',
  code: '39581485-6d75-4f31-a739-4919d6de0ec9',
  createdByDisplayName: 'Arora, Kushal CITZ:EX',
  piaId: 101,
  pia: { ...piaIntakeEntityMock },
};
