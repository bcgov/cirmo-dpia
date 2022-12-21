import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InternalServerErrorException } from '@nestjs/common';

import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';
import { RolesEnum } from 'src/common/enums/roles.enum';

import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import {
  createPiaIntakeMock,
  getPiaIntakeROMock,
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
  let piaIntakeService: PiaIntakeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiaIntakeController],
      providers: [
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
    piaIntakeService = module.get<PiaIntakeService>(PiaIntakeService);
  });

  afterEach(() => {
    jest.clearAllMocks();
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
     * This test validates the happy flow if the method `piaIntakeService.create` is called with correct mock data
     *
     * @Input
     *   - API data mock for pia-intake create form submission
     *   - Mock user req
     *
     * @Output 201
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = { ...createPiaIntakeMock };
      const mockReq: any = { user: { ...keycloakUserMock } };

      await controller.create(createPiaIntakeDto, mockReq);

      expect(piaIntakeService.create).toHaveBeenCalledWith(
        createPiaIntakeDto,
        mockReq.user,
      );
    });
  });

  /**
   * @Description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   *
   * @method findAll
   */
  describe('`findAll` method', () => {
    /**
     * @Description
     * This test validates the happy flow if the method `piaIntakeService.findAll` is called with correct mock data
     *
     * @Input
     *   - Mock user req
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };

      piaIntakeService.findAll = jest.fn(async () => {
        delay(10);
        return [piaIntakeEntity];
      });

      const result = await controller.findAll(mockReq);

      expect(piaIntakeService.findAll).toHaveBeenCalledWith(
        mockReq.user,
        mockReq.userRoles,
      );
      expect(result).toStrictEqual({
        data: [piaIntakeEntity],
      });
    });
  });

  /**
   * @method findOne
   *
   * @description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   */
  describe('`findOne` method', () => {
    /**
     * @Description
     * This test validates if the method `piaIntakeService.findOne` is called with correct mock data
     *
     * @Input
     *  - pia-intake id
     *  - mock user req
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const getPiaIntakeRO = { ...getPiaIntakeROMock };
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };

      piaIntakeService.findOne = jest.fn(async () => {
        delay(10);
        return getPiaIntakeRO;
      });

      const result = await controller.findOne(getPiaIntakeRO.id, mockReq);

      expect(piaIntakeService.findOne).toHaveBeenCalledWith(
        getPiaIntakeRO.id,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toStrictEqual({
        data: getPiaIntakeRO,
      });
    });
  });

  describe('`downloadResult` method', () => {
    /**
     * @Description
     * This test validates the authenticated user getting 404 when
     * no pia-intake result for the provided id is available in the database
     * and returns 500 when unable to create buffer for that record
     *
     * @Input
     *  - pia-intake id
     *  - Request
     *  - Response
     *
     * @Output 500
     * Internal Server exception is shown to the user
     *
     */
    it('fails and throws 500 when the service did not return any buffer', async () => {
      const piaIntakeId = piaIntakeEntityMock.id;
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const mockRes: any = { set: jest.fn(), send: jest.fn() };

      await expect(
        controller.downloadResult(piaIntakeId, mockReq, mockRes),
      ).rejects.toThrow(new InternalServerErrorException());

      expect(piaIntakeService.downloadPiaIntakeResultPdf).toHaveBeenCalledWith(
        piaIntakeId,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(mockRes.send).not.toHaveBeenCalled();
    });

    /**
     * @Description
     * This test demonstrates the happy flow. It validates that
     *  - the service did not errored out, and returned the correct buffer
     *  - the user is sent the received buffer
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
      const piaIntakeId = piaIntakeEntityMock.id;
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const mockRes: any = { set: jest.fn(), send: jest.fn() };
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');

      piaIntakeService.downloadPiaIntakeResultPdf = jest.fn(async () => {
        delay(10);
        return mockPdfBuffer;
      });

      await controller.downloadResult(piaIntakeId, mockReq, mockRes);

      expect(piaIntakeService.downloadPiaIntakeResultPdf).toHaveBeenCalledWith(
        piaIntakeId,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(mockRes.send).toHaveBeenCalledWith(mockPdfBuffer);
    });
  });
});
