import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AuthService } from 'src/modules/auth/auth.service';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';

import { authServiceMock } from 'test/util/mocks/services/auth.service.mock';
import {
  accessTokenMock,
  keycloakUserMock,
} from 'test/util/mocks/data/auth.mock';
import { createPiaIntakeMock } from 'test/util/mocks/data/pia-intake.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';
import { piaIntakeServiceMock } from 'test/util/mocks/services/pia-intake.service.mock';
import { UnauthorizedException } from '@nestjs/common';

describe('PiaIntakeController', () => {
  let controller: PiaIntakeController;
  let authService: AuthService;
  let piaIntakeService: PiaIntakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiaIntakeController],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
        {
          provide: PiaIntakeService,
          useValue: piaIntakeServiceMock,
        },
        {
          provide: getRepositoryToken(PiaIntakeEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    controller = module.get<PiaIntakeController>(PiaIntakeController);
    authService = module.get<AuthService>(AuthService);
    piaIntakeService = module.get<PiaIntakeService>(PiaIntakeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('`create` method', () => {
    it('fails when access token is not passed', async () => {
      expect(controller.create(createPiaIntakeMock, null)).rejects.toThrow(
        new UnauthorizedException(),
      );

      expect(authService.getUserInfo).not.toHaveBeenCalled();
      expect(piaIntakeService.create).not.toHaveBeenCalled();
    });

    it('succeeds with correct data : Happy flow', async () => {
      const accessToken = accessTokenMock;
      const createPiaIntakeDto: CreatePiaIntakeDto = { ...createPiaIntakeMock };
      const user: KeycloakUser = { ...keycloakUserMock };

      await controller.create(createPiaIntakeDto, accessToken);

      expect(authService.getUserInfo).toHaveBeenCalledWith(accessToken);
      expect(authService.getUserInfo).toReturnWith(user);

      expect(piaIntakeService.create).toHaveBeenCalledWith(
        createPiaIntakeDto,
        user,
      );
    });
  });
});
