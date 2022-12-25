import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { marked } from 'marked';

import * as typeormIn from 'typeorm/find-options/operator/In';

import * as pdfHelper from 'src/common/helpers/pdf-helper';
import * as dateHelper from 'src/common/helpers/date-helper';
import * as baseHelper from 'src/common/helpers/base-helper';

import { AuthModule } from 'src/modules/auth/auth.module';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';
import { Roles } from 'src/common/constants/roles.constants';
import { RolesEnum } from 'src/common/enums/roles.enum';

import {
  createPiaIntakeMock,
  getPiaIntakeROMock,
  piaIntakeEntityMock,
} from 'test/util/mocks/data/pia-intake.mock';
import { delay } from 'test/util/testUtils';
import { keycloakUserMock } from 'test/util/mocks/data/auth.mock';
import { repositoryMock } from 'test/util/mocks/repository/repository.mock';
import {
  ForbiddenException,
  GoneException,
  NotFoundException,
} from '@nestjs/common';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';

/**
 * @Description
 * This file tests the contents of pia-intake.service.ts
 */
describe('PiaIntakeService', () => {
  let service: PiaIntakeService;
  let piaIntakeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [PiaIntakeController],
      providers: [
        PiaIntakeService,
        {
          provide: getRepositoryToken(PiaIntakeEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    service = module.get<PiaIntakeService>(PiaIntakeService);
    piaIntakeRepository = module.get(getRepositoryToken(PiaIntakeEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  /**
   * @Description
   * Dummy test to check if the service is defined
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /**
   * @Description
   * These set of tests validates that the method passes the correct values to the repository,
   * mocking the database save operation.
   *
   * @method create
   */
  describe('`create` method', () => {
    /**
     * This test validates that the it passes the correct data to the repository, saving the pia-intake form.
     * It also validates that the result received is actually coming from the repository.
     *
     * @Input
     *   - API data mock for pia-intake create form submission
     *   - User info mock
     *
     * @Output
     *   - an object containing id of the newly created database row
     */
    it('succeeds calling the database repository with correct data', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = { ...createPiaIntakeMock };
      const piaIntakeEntity = { ...piaIntakeEntityMock };

      const user: KeycloakUser = { ...keycloakUserMock };

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return { id: piaIntakeEntity.id };
      });

      const result = await service.create(createPiaIntakeDto, user);

      expect(piaIntakeRepository.save).toHaveBeenCalledWith({
        ...createPiaIntakeDto,
        createdByGuid: user.idir_user_guid,
        createdByUsername: user.idir_username,
        drafterEmail: user.email,
      });

      expect(result).toEqual({ id: piaIntakeEntity.id });
    });
  });

  /**
   * @Description
   * These set of tests validates that findAll method returns the restricted data based on user's permissions.
   *
   * @method findAll
   */
  describe('`findAll` method', () => {
    const typeormInSpy = jest.spyOn(typeormIn, 'In').mockReturnValue(null);

    const omitBaseKeysSpy = jest
      .spyOn(baseHelper, 'omitBaseKeys')
      .mockImplementation(() => null);

    beforeEach(() => {
      typeormInSpy.mockClear();
      omitBaseKeysSpy.mockClear();
    });

    // Scenario 1: when the user is an MPO
    it('succeeds calling the database repository with correct data for MPO role', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };

      piaIntakeRepository.find = jest.fn(async () => {
        delay(10);
        return [piaIntakeEntity];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(piaIntakeRepository.find).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
          },
          {
            isActive: true,
            ministry: null,
          },
        ],
        order: {
          createdAt: -1,
        },
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([getPiaIntakeROMock]);
    });

    // Scenario 2: when the user is a just a drafter (not MPO)
    it('succeeds calling the database repository with correct data for a drafter (non-MPO) role', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };

      piaIntakeRepository.find = jest.fn(async () => {
        delay(10);
        return [piaIntakeEntity];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles);

      expect(typeormInSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.find).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
          },
        ],
        order: {
          createdAt: -1,
        },
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([getPiaIntakeROMock]);
    });
  });

  /**
   * @Description
   * These set of tests validates that findOneById method returns the data pertaining to user's permissions.
   *
   * @method findOneById
   */
  describe('`findOneById` method', () => {
    const omitBaseKeysSpy = jest
      .spyOn(baseHelper, 'omitBaseKeys')
      .mockImplementation(() => null);

    beforeEach(() => {
      omitBaseKeysSpy.mockClear();
    });

    // Scenario 1: Test fails when the service.findOneBy throws Not Found exception
    it('fails when the service.findOneBy throws Not Found exception', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 0; // non-existent id

      service.findOneBy = jest.fn(async () => {
        delay(10);
        throw new NotFoundException();
      });

      service.validateUserAccess = jest.fn(() => null);

      await expect(service.findOneById(id, user, userRoles)).rejects.toThrow(
        new NotFoundException(),
      );

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).not.toHaveBeenCalled();
      expect(omitBaseKeysSpy).not.toHaveBeenCalled();
    });

    // Scenario 2: Test fails when service.validateUserAccess throws any exception
    it('fails when service.validateUserAccess throws any exception', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      service.validateUserAccess = jest.fn(() => {
        throw new ForbiddenException(); // any exception
      });

      await expect(service.findOneById(id, user, userRoles)).rejects.toThrow(
        new ForbiddenException(),
      );

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
      );
      expect(omitBaseKeysSpy).not.toHaveBeenCalled();
    });

    // Scenario 3: Test succeeds when the record is found and the user has relevant access
    it('succeeds when the record is found and the user has relevant access', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      service.validateUserAccess = jest.fn(() => true);

      omitBaseKeysSpy.mockImplementation(() => getPiaIntakeROMock);

      const result = await service.findOneById(id, user, userRoles);

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
      );

      expect(omitBaseKeysSpy).toHaveBeenCalledWith(piaIntakeEntityMock);
      expect(result).toEqual(getPiaIntakeROMock);
    });
  });

  /**
   * @Description
   * These set of tests validates that update method updates the data (part or complete) pertaining to user's permissions.
   *
   * @method update
   */
  describe('`update` method', () => {
    // Scenario 1: Test fails when there's an exception
    it('fails when the function throws an exception', async () => {
      const piaIntakeMock = { ...piaIntakeEntityMock };
      const updatePiaIntakeDto = { status: PiaIntakeStatusEnum.INCOMPLETE };
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 0; // non-existent id

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      service.validateUserAccess = jest.fn(() => true);

      piaIntakeRepository.update = jest.fn(async () => {
        delay(10);
        throw new ForbiddenException();
      });

      await expect(
        service.update(id, updatePiaIntakeDto, user, userRoles),
      ).rejects.toThrow(new ForbiddenException());

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
      );
      expect(piaIntakeRepository.update).toHaveBeenCalledWith(
        { id },
        updatePiaIntakeDto,
      );
    });

    // Scenario 2: Test succeeds when repository.update does not throw error
    it('succeeds when repository.update does not throw error', async () => {
      const piaIntakeMock = { ...piaIntakeEntityMock };
      const updatePiaIntakeDto = { status: PiaIntakeStatusEnum.INCOMPLETE };
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 0; // non-existent id

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      service.validateUserAccess = jest.fn(() => true);

      piaIntakeRepository.update = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeMock, ...updatePiaIntakeDto };
      });

      await service.update(id, updatePiaIntakeDto, user, userRoles);

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
      );
      expect(piaIntakeRepository.update).toHaveBeenCalledWith(
        { id },
        updatePiaIntakeDto,
      );
    });
  });

  /**
   * @Description
   * These set of tests validates that the pugToPdf method is only when the pia-intake id is valid
   * and the method returns the correct pdf buffer value back.
   *
   * @method downloadPiaIntakeResultPdf
   */
  describe('`downloadPiaIntakeResultPdf` method', () => {
    const pugToPdfBufferSpy = jest
      .spyOn(pdfHelper, 'pugToPdfBuffer')
      .mockImplementation(() => null);

    const markedParseSpy = jest
      .spyOn(marked, 'parse')
      .mockImplementation(() => null);

    const shortDateSpy = jest
      .spyOn(dateHelper, 'shortDate')
      .mockImplementation(() => null);

    beforeEach(() => {
      pugToPdfBufferSpy.mockClear();
      markedParseSpy.mockClear();
      shortDateSpy.mockClear();
    });

    /**
     * This test validates that the method returns the pdf buffer of the provided pia-intake id
     *
     * @Input
     *   - pia-intake id
     *
     * @Output
     *   - pdf buffer content
     */
    it('returns pdf buffer when provided correct data', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const getPiaIntakeRO = { ...getPiaIntakeROMock };
      const mockPdfBuffer: Buffer = Buffer.from('Test Buffer');

      pugToPdfBufferSpy.mockImplementation(async () => mockPdfBuffer);

      service.findOneById = jest.fn(async () => {
        delay(10);
        return getPiaIntakeRO;
      });

      const result = await service.downloadPiaIntakeResultPdf(
        getPiaIntakeRO.id,
        user,
        userRoles,
      );

      const pdfParsedData = {
        ...getPiaIntakeRO,
        ...{
          updatedAt: null,
          ministry: 'Tourism, Arts, Culture and Sport',
          initiativeDescription: null,
          initiativeScope: null,
          dataElementsInvolved: null,
          riskMitigation: null,
        },
      };

      expect(shortDateSpy).toHaveBeenCalledTimes(1);
      expect(shortDateSpy).toHaveBeenCalledWith(getPiaIntakeRO.createdAt);

      expect(markedParseSpy).toHaveBeenCalledTimes(4);

      expect(pugToPdfBufferSpy).toHaveBeenCalledTimes(1);
      expect(pugToPdfBufferSpy).toHaveBeenCalledWith(
        'src/modules/pia-intake/templates/pia-intake-result.pug',
        pdfParsedData,
      );

      expect(result).toBe(mockPdfBuffer);
    });
  });

  /**
   * @method validateUserAccess
   *
   * @description
   * These set of tests validates that pia-intake form is only shown to the user if they have the required permissions
   * - if the form is self-submitted by the user
   * - if the form is submitted to the ministry the user is an MPO of
   *
   * Everyone else should be forbidden
   */
  describe('`validateUserAccess` method', () => {
    // Scenario 1: Test fails when the record is not active in database
    it('fails when the record is not active in database', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        isActive: false,
      };

      try {
        service.validateUserAccess(user, userRoles, piaIntake);
      } catch (e) {
        expect(e).toEqual(new GoneException());
      }
    });

    // Scenario 2: Test succeeds when the record is self submitted irrespective of user role or ministry they belong
    it('succeeds when the record is self submitted irrespective of user role or ministry they belong', () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'TEST_USER',
      };
      const userRoles = [];
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'TEST_USER',
      };

      const result = service.validateUserAccess(user, userRoles, piaIntake);

      expect(result).toBe(true);
    });

    // Scenario 3: Test succeeds when PIA is not self-submitted, but submitted to the ministry I belong and MPO of
    it('succeeds when PIA is not self-submitted, but submitted to the ministry I belong and MPO of', () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2',
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      const result = service.validateUserAccess(user, userRoles, piaIntake);

      expect(result).toBe(true);
    });

    // Scenario 4: Test fails when the record is not self-submitted, but submitted to the ministry I belong and NOT MPO of
    it('fails when the record is not self-submitted, but submitted to the ministry I belong and NOT MPO of', () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = [];
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2',
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      try {
        service.validateUserAccess(user, userRoles, piaIntake);
      } catch (e) {
        expect(e).toEqual(new ForbiddenException());
      }
    });

    // Scenario 5: Test fails when the record is neither self-submitted not submitted to the ministry I am MPO of
    it('fails when the record is neither self-submitted not submitted to the ministry I am MPO of', () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = [RolesEnum.MPO_AGRI];
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2',
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      try {
        service.validateUserAccess(user, userRoles, piaIntake);
      } catch (e) {
        expect(e).toEqual(new ForbiddenException());
      }
    });
  });

  /**
   * @method findOneBy
   *
   * @description
   * These set of tests validates that pia-intake form is only returned to the user when available
   */
  describe('`findOneBy` method', () => {
    // Scenario 1: Test fails when the record is not found in database
    it('fails when the record is not found in database', async () => {
      const id = 0; // assuming id does NOT exist in database

      piaIntakeRepository.findOneBy = jest.fn(async () => {
        delay(10);
        return null;
      });

      await expect(service.findOneBy({ id })).rejects.toThrow(
        new NotFoundException(),
      );

      expect(piaIntakeRepository.findOneBy).toHaveBeenCalledWith({ id });
    });

    // Scenario 2: Test succeeds when the record is found in database
    it('succeeds when the record is found in database', async () => {
      const id = 1; // assuming id exists in database

      piaIntakeRepository.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      const result = await service.findOneBy({ id });

      expect(piaIntakeRepository.findOneBy).toHaveBeenCalledWith({ id });
      expect(result).toEqual(piaIntakeEntityMock);
    });
  });
});
