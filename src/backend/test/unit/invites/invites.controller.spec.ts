import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GenerateInviteDto } from 'src/modules/invites/dto/generate-invite.dto';
import { InviteEntity } from 'src/modules/invites/entities/invite.entity';
import { InvitesController } from 'src/modules/invites/invites.controller';
import { InvitesService } from 'src/modules/invites/invites.service';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import {
  generateInviteDtoMock,
  generateInviteROMock,
} from 'test/util/mocks/data/invites.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import { invitesServiceMock } from 'test/util/mocks/services/invites.service.mock';
import { delay } from 'test/util/testUtils';

describe('InvitesController', () => {
  let controller: InvitesController;
  let service: InvitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvitesController],
      providers: [
        {
          provide: InvitesService,
          useValue: invitesServiceMock,
        },
        {
          provide: getRepositoryToken(InviteEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    controller = module.get<InvitesController>(InvitesController);
    service = module.get<InvitesService>(InvitesService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  /**
   * @method generate
   */
  describe('`generate` method', () => {
    /**
     * @Description
     * This test suite validates that the generate method is called with correct parameters
     */
    it('succeeds calling generate service method with correct params', async () => {
      const generateInviteDto: GenerateInviteDto = { ...generateInviteDtoMock };
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [],
      };

      service.generate = jest.fn(async () => {
        delay(10);
        return generateInviteROMock;
      });

      const result = await controller.generate(generateInviteDto, mockReq);

      expect(service.generate).toHaveBeenCalledWith(
        generateInviteDto,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toBe(generateInviteROMock);
    });
  });
});
