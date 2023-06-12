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
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { PiaIntakeFindQuery } from 'src/modules/pia-intake/dto/pia-intake-find-query.dto';
import { PaginatedRO } from 'src/common/paginated.ro';
import { GetPiaIntakeRO } from 'src/modules/pia-intake/ro/get-pia-intake.ro';

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
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };

      await controller.create(createPiaIntakeDto, mockReq);

      expect(piaIntakeService.create).toHaveBeenCalledWith(
        createPiaIntakeDto,
        mockReq.user,
        mockReq.userRoles,
      );
    });
  });

  /**
   * @Description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct (filtered) result to the user
   *
   * Supported filters:
   *   - searchText: string [on drafterName and title]
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
     *   - query
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */
    it('succeeds with correct data : Happy flow', async () => {
      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };
      const query: PiaIntakeFindQuery = {};

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 10,
        total: 100,
      };

      piaIntakeService.findAll = jest.fn(async () => {
        delay(10);
        return expectedResult;
      });

      const result = await controller.findAll(mockReq, query);

      expect(piaIntakeService.findAll).toHaveBeenCalledWith(
        mockReq.user,
        mockReq.userRoles,
        query,
      );

      expect(result).toStrictEqual(expectedResult);
    });
  });

  /**
   * @method findOneById
   *
   * @description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   */
  describe('`findOneById` method', () => {
    /**
     * @Description
     * This test validates if the method `piaIntakeService.findOneById` is called with correct mock data
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
      const inviteCode = 'ABCD_TEST_CODE'; // optional invite code

      piaIntakeService.findOneById = jest.fn(async () => {
        delay(10);
        return getPiaIntakeRO;
      });

      const result = await controller.findOneById(
        getPiaIntakeRO.id,
        mockReq,
        inviteCode,
      );

      expect(piaIntakeService.findOneById).toHaveBeenCalledWith(
        getPiaIntakeRO.id,
        mockReq.user,
        mockReq.userRoles,
        inviteCode,
      );

      expect(result).toStrictEqual({
        data: getPiaIntakeRO,
      });
    });
  });

  /**
   * @method update
   *
   * @description
   * This test suite validates that the method passes the correct values to the service,
   * mock the service result and return correct result to the user
   */
  describe('`update` method', () => {
    /**
     * @Description
     * This test validates if the method `piaIntakeService.update` is called with correct mock data
     *
     * @Input
     *  - pia-intake id
     *  - pia-intake updatePiaIntakeDto : fields to be updated
     *  - mock user req
     *
     * @Output 200
     * Test pass and all methods called with correct data
     */

    it('succeeds with correct data', async () => {
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const updatedStatus = PiaIntakeStatusEnum.EDIT_IN_PROGRESS;

      const getPiaIntakeRO = {
        ...getPiaIntakeROMock,
        status: updatedStatus,
      };
      const updatePiaIntakeDtoMock = {
        status: updatedStatus,
        saveId: 1,
      };

      const mockReq: any = {
        user: { ...keycloakUserMock },
        userRoles: [RolesEnum.MPO_CITZ],
      };

      piaIntakeService.update = jest.fn(async () => {
        delay(10);
        return getPiaIntakeRO;
      });

      const result = await controller.update(
        piaIntakeEntity.id,
        updatePiaIntakeDtoMock,
        mockReq,
      );

      expect(piaIntakeService.update).toHaveBeenCalledWith(
        piaIntakeEntity.id,
        updatePiaIntakeDtoMock,
        mockReq.user,
        mockReq.userRoles,
      );

      expect(result).toBe(getPiaIntakeRO);
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
