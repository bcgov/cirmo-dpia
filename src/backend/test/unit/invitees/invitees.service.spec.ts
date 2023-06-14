import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { InviteeEntity } from 'src/modules/invitees/entities/invitee.entity';
import { InviteesService } from 'src/modules/invitees/invitees.service';
import { InviteEntity } from 'src/modules/invites/entities/invite.entity';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { inviteeEntityMock } from 'test/util/mocks/data/invitee.mock';
import { inviteEntityMock } from 'test/util/mocks/data/invites.mock';
import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import { delay } from 'test/util/testUtils';

describe('InviteesService', () => {
  let service: InviteesService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InviteesService,
        {
          provide: getRepositoryToken(InviteeEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    service = module.get<InviteesService>(InviteesService);
    repository = module.get(getRepositoryToken(InviteeEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('`create` method', () => {
    /**
     * @Description
     * Succeeds in saving the database record for the invitee entity
     */
    it('succeeds saving database record with the provided data', async () => {
      const pia: PiaIntakeEntity = { ...piaIntakeEntityMock };
      const invite: InviteEntity = { ...inviteEntityMock };
      const user: KeycloakUser = { ...keycloakUserMock };

      repository.save = jest.fn(async () => {
        delay(10);
        return { ...inviteeEntityMock };
      });

      const result = await service.create(pia, invite, user);

      expect(repository.save).toHaveBeenCalledWith({
        pia,
        invite,
        createdByGuid: user.idir_user_guid,
        createdByUsername: user.idir_username,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.idir_username,
        createdByDisplayName: user.display_name,
      });

      expect(result).toEqual({ ...inviteeEntityMock });
    });
  });

  describe('`findOneByUserAndPia` method', () => {
    /**
     * @Description
     * Succeeds in getting the database record by user and pia id
     */
    it('succeeds getting the database record by user and pia id', async () => {
      const piaId = piaIntakeEntityMock.id;
      const user: KeycloakUser = { ...keycloakUserMock };

      repository.findOne = jest.fn(async () => {
        delay(10);
        return { ...inviteeEntityMock };
      });

      const result = await service.findOneByUserAndPia(user, piaId);

      expect(repository.findOne).toHaveBeenCalledWith({
        where: {
          pia: {
            id: piaId,
          },
          createdByGuid: user.idir_user_guid,
        },
      });

      expect(result).toEqual({ ...inviteeEntityMock });
    });
  });
});
