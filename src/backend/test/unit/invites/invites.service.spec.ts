import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthModule } from 'src/modules/auth/auth.module';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { GenerateInviteDto } from 'src/modules/invites/dto/generate-invite.dto';
import { InviteEntity } from 'src/modules/invites/entities/invite.entity';
import { InvitesController } from 'src/modules/invites/invites.controller';
import { InvitesService } from 'src/modules/invites/invites.service';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import {
  generateInviteDtoMock,
  generateInviteROMock,
  inviteEntityMock,
} from 'test/util/mocks/data/invites.mock';
import { piaIntakeEntityMock } from 'test/util/mocks/data/pia-intake.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import { piaIntakeServiceMock } from 'test/util/mocks/services/pia-intake.service.mock';

describe('InvitesService', () => {
  let invitesService: InvitesService;
  let piaService: PiaIntakeService;
  let inviteRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [InvitesController],
      providers: [
        InvitesService,
        {
          provide: PiaIntakeService,
          useValue: piaIntakeServiceMock,
        },
        {
          provide: getRepositoryToken(InviteEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    invitesService = module.get<InvitesService>(InvitesService);
    piaService = module.get<PiaIntakeService>(PiaIntakeService);
    inviteRepository = module.get(getRepositoryToken(InviteEntity));
  });

  it('should be defined', () => {
    expect(invitesService).toBeDefined();
    expect(piaService).toBeDefined();
  });

  /**
   * @Description
   * This test suite validates that the invite code is not generated again, if already present for the PIA
   */
  it('succeeds returning the already generated invite code', async () => {
    const generateInviteDto: GenerateInviteDto = { ...generateInviteDtoMock };
    const mockReq: any = {
      user: { ...keycloakUserMock },
      userRoles: [],
    };

    const expectedResult = { ...generateInviteROMock };

    inviteRepository.findOne = jest.fn(async () => inviteEntityMock);

    const result = await invitesService.generate(
      generateInviteDto,
      mockReq.user,
      mockReq.userRoles,
    );

    expect(piaService.validatePiaAccess).toHaveBeenCalledWith(
      generateInviteDto.piaId,
      mockReq.user,
      mockReq.userRoles,
    );

    expect(inviteRepository.findOne).toHaveBeenCalledWith({
      relations: [],
      where: {
        pia: {
          id: generateInviteDto.piaId,
        },
      },
    });

    expect(piaService.findOneBy).not.toHaveBeenCalled();
    expect(inviteRepository.save).not.toHaveBeenCalled();
    expect(result).toEqual(expectedResult);
  });

  /**
   * @Description
   * This test suite validates that the invite code is generated and returned to the user, if not already generated
   */
  it('succeeds generating a new invite code if not available', async () => {
    const generateInviteDto: GenerateInviteDto = { ...generateInviteDtoMock };
    const user: KeycloakUser = { ...keycloakUserMock };
    const userRoles = [];

    const mockReq: any = {
      user,
      userRoles,
    };

    const expectedResult = { ...generateInviteROMock };

    // repo returns null - no invite code available for the piaId provided
    inviteRepository.findOne = jest.fn(async () => null);

    piaService.findOneBy = jest.fn(async () => ({ ...piaIntakeEntityMock }));

    inviteRepository.save = jest.fn(async () => ({ ...inviteEntityMock }));

    const result = await invitesService.generate(
      generateInviteDto,
      mockReq.user,
      mockReq.userRoles,
    );

    expect(piaService.validatePiaAccess).toHaveBeenCalledWith(
      generateInviteDto.piaId,
      mockReq.user,
      mockReq.userRoles,
    );

    expect(inviteRepository.findOne).toHaveBeenCalledWith({
      relations: [],
      where: {
        pia: {
          id: generateInviteDto.piaId,
        },
      },
    });

    expect(piaService.findOneBy).toHaveBeenCalledWith({
      id: generateInviteDto.piaId,
    });
    expect(inviteRepository.save).toHaveBeenCalledWith({
      pia: { ...piaIntakeEntityMock },
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      createdByDisplayName: user.display_name,
    });

    expect(result).toEqual(expectedResult);
  });
});
