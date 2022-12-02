import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

import { AuthService } from 'src/modules/auth/auth.service';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';

import { authServiceMock } from 'test/util/mocks/services/auth.service.mock';
import {
  accessTokenMock,
  keycloakUserMock,
} from 'test/util/mocks/data/auth.mock';
import {
  createPiaIntakeMock,
  piaIntakeEntityMock,
} from 'test/util/mocks/data/pia-intake.mock';
import { delay } from 'test/util/testUtils';
import { piaIntakeServiceMock } from 'test/util/mocks/services/pia-intake.service.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';

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
      await expect(
        controller.create(createPiaIntakeMock, null),
      ).rejects.toThrow(new UnauthorizedException());

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

  describe('`downloadResult` method', () => {
    /**
     * @Description
     * This test validates that the user is shown Unauthorized exception (401)
     * when the access token is not passed by the application.
     *
     * As an added check, it also validates that the following methods
     * piaIntakeService.downloadPiaIntakeResultPdf are not being called
     *
     * @Input
     *   - pia-intake id
     *   - No access token is provided
     *
     * @Output 401
     * Unauthorized exception is shown to the user
     *
     */
    it('fails when access token is not passed', async () => {
      expect(controller.downloadResult(1, null, null, null)).rejects.toThrow(
        new UnauthorizedException(),
      );

      expect(
        piaIntakeService.downloadPiaIntakeResultPdf,
      ).not.toHaveBeenCalled();
    });

    /**
     * @Description
     * This test validates the authenticated user getting 404 when
     * no pia-intake result for the provided id is available in the database
     *
     * @Input
     *  - pia-intake id
     *  - Request
     *  - Response
     *  - Access Token
     *
     * @Output 404
     * Not Found exception is shown to the user
     *
     */
    it('fails and throws 404 when the service did not return any buffer', async () => {
      const accessToken = accessTokenMock;
      const piaIntakeId = piaIntakeEntityMock.id;
      const mockRes: any = { set: jest.fn(), send: jest.fn() };

      await expect(
        controller.downloadResult(piaIntakeId, null, mockRes, accessToken),
      ).rejects.toThrow(new NotFoundException());

      expect(piaIntakeService.downloadPiaIntakeResultPdf).toHaveBeenCalledWith(
        piaIntakeId,
      );

      expect(mockRes.send).not.toHaveBeenCalled();
    });

    /**
     * @Description
     * This test demonstrates the happy flow. It validates that
     *  - the user is authenticated to download the pdf
     *  - the service did not errored out and returned a buffer
     *  - the user is send the received buffer
     *
     * @Input
     *  - pia-intake id
     *  - Request
     *  - Response
     *  - Access Token
     *
     * @Output
     *  - pdf buffer
     */
    it('succeeds with correct data : Happy flow', async () => {
      const accessToken = accessTokenMock;
      const piaIntakeId = piaIntakeEntityMock.id;
      const mockRes: any = { set: jest.fn(), send: jest.fn() };
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');

      piaIntakeService.downloadPiaIntakeResultPdf = jest.fn(async () => {
        delay(10);
        return mockPdfBuffer;
      });

      await controller.downloadResult(piaIntakeId, null, mockRes, accessToken);

      expect(piaIntakeService.downloadPiaIntakeResultPdf).toHaveBeenCalledWith(
        piaIntakeId,
      );

      expect(mockRes.send).toHaveBeenCalledWith(mockPdfBuffer);
    });
  });
});
