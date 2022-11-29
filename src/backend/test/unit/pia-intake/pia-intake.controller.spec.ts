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

/**
 * @Description
 * This file tests the contents of pia-intake.controller.ts
 */
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

  /**
   * @Description
   * Dummy test to check if the controller is defined
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /**
   * @Description
   * This test suite validates that the method passes the correct passed values to the service,
   * mock the service result and return correct result to the user
   *
   * @method create
   */
  describe('`create` method', () => {
    /**
     * @Description
     * This test validates that the user is shown Unauthorized exception (401)
     * when the access token is not passed by the application.
     *
     * As an added check, it also validates that the following methods
     * authService.getUserInfo, piaIntakeService.create are not being called
     *
     * @Input
     *   - API data mock for pia-intake create form submission
     *   - No access token is provided
     *
     * @Output 401
     * Unauthorized exception is shown to the user
     *
     */
    it('fails when access token is not passed', async () => {
      expect(controller.create(createPiaIntakeMock, null)).rejects.toThrow(
        new UnauthorizedException(),
      );

      expect(authService.getUserInfo).not.toHaveBeenCalled();
      expect(piaIntakeService.create).not.toHaveBeenCalled();
    });

    /**
     * @Description
     * This test validates the happy flow
     *  - The test calls the following methods if the access token is provided
     *  - authService.getUserInfo returns the correct user info [mocked]
     *  - piaIntakeService.create is called with correct mock data
     *
     * @Input
     *   - API data mock for pia-intake create form submission
     *   - User access token
     *
     * @Output 201
     * Test pass and all methods called with correct data
     */
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
