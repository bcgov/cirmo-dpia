import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { marked } from 'marked';

import * as typeormIn from 'typeorm/find-options/operator/In';
import * as typeormILike from 'typeorm/find-options/operator/ILike';

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
  ConflictException,
  ForbiddenException,
  GoneException,
  NotFoundException,
} from '@nestjs/common';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { PiaIntakeStatusEnum } from 'src/modules/pia-intake/enums/pia-intake-status.enum';
import { PiaIntakeFindQuery } from 'src/modules/pia-intake/dto/pia-intake-find-query.dto';
import { PaginatedRO } from 'src/common/paginated.ro';
import { GetPiaIntakeRO } from 'src/modules/pia-intake/ro/get-pia-intake.ro';
import { PiaFilterDrafterByCurrentUserEnum } from 'src/modules/pia-intake/enums/pia-filter-drafter-by-current-user.enum';
import { Not } from 'typeorm/find-options/operator/Not';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { UpdatePiaIntakeDto } from 'src/modules/pia-intake/dto/update-pia-intake.dto';
import { emptyJsonbValues } from 'test/util/mocks/data/pia-empty-jsonb-values.mock';

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

    const omitBaseKeysSpy = jest
      .spyOn(baseHelper, 'omitBaseKeys')
      .mockImplementation(() => null);

    beforeEach(() => {
      omitBaseKeysSpy.mockClear();
    });

    // Scenario 1
    it('succeeds calling the database when a drafter creates PIA with the correct data ', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = { ...createPiaIntakeMock };
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const getPiaIntakeRO = { ...getPiaIntakeROMock };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return piaIntakeEntity;
      });

      omitBaseKeysSpy.mockReturnValue(getPiaIntakeRO);

      const result = await service.create(createPiaIntakeDto, user, userRoles);

      expect(piaIntakeRepository.save).toHaveBeenCalledWith({
        ...createPiaIntakeDto,
        createdByGuid: user.idir_user_guid,
        createdByUsername: user.idir_username,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.idir_username,
        updatedByDisplayName: user.display_name,
        drafterEmail: user.email,
        drafterName: user.display_name,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledWith(piaIntakeEntity, [
        'updatedByDisplayName',
      ]);

      expect(result).toEqual(getPiaIntakeRO);
    });

    // Scenario 2
    it('succeeds and update submittedAt with current value if status is changed to MPO_REVIEW', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        submittedAt: null,
        status: PiaIntakeStatusEnum.MPO_REVIEW,
      };

      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const getPiaIntakeRO = { ...getPiaIntakeROMock };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return piaIntakeEntity;
      });

      omitBaseKeysSpy.mockReturnValue(getPiaIntakeRO);

      await service.create(createPiaIntakeDto, user, userRoles);

      expect(createPiaIntakeDto.submittedAt).toBeDefined();
      expect(createPiaIntakeDto.submittedAt).toBeInstanceOf(Date);
    });

    // Scenario 3
    it('succeeds for jsonb columns with empty values', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        ...emptyJsonbValues,
      };

      const piaIntakeEntity = {
        ...piaIntakeEntityMock,
        ...emptyJsonbValues,
      };

      const getPiaIntakeRO = {
        ...getPiaIntakeROMock,
        ...emptyJsonbValues,
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return piaIntakeEntity;
      });

      omitBaseKeysSpy.mockReturnValue(getPiaIntakeRO);

      const result = await service.create(createPiaIntakeDto, user, userRoles);

      expect(piaIntakeRepository.save).toHaveBeenCalledWith({
        ...createPiaIntakeDto,
        createdByGuid: user.idir_user_guid,
        createdByUsername: user.idir_username,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.idir_username,
        updatedByDisplayName: user.display_name,
        drafterEmail: user.email,
        drafterName: user.display_name,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledWith(piaIntakeEntity, [
        'updatedByDisplayName',
      ]);

      expect(result).toEqual(getPiaIntakeRO);
    });

    // Scenario 4
    it('fails when a drafter tries to create fields they do not have permissions to ', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        collectionUseAndDisclosure: {
          steps: [
            {
              drafterInput: 'Make a Checklist.',
              mpoInput: 'I do not have privilege to edit this',
              foippaInput: 'I do not have privilege to edit this',
              OtherInput: 'I do not have privilege to edit this',
            },
          ],
          collectionNotice: {
            drafterInput: 'Test Input',
            mpoInput: 'I do not have privilege to edit this',
          },
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      await expect(
        service.create(createPiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ForbiddenException({
          path: 'steps.mpoInput',
          message: `You do not have permissions to edit certain section of this document. Please reach out to your MPO to proceed.`,
        }),
      );
    });

    // Scenario 5
    it('passes when an MPO of any ministry tries to update the same fields [mentioned in the above scenario]', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        collectionUseAndDisclosure: {
          steps: [
            {
              drafterInput: 'Make a Checklist.',
              mpoInput: 'I do not have privilege to edit this',
              foippaInput: 'I do not have privilege to edit this',
              OtherInput: 'I do not have privilege to edit this',
            },
          ],
          collectionNotice: {
            drafterInput: 'Test Input',
            mpoInput: 'I do not have privilege to edit this',
          },
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [RolesEnum.MPO_HLTH];

      await expect(
        service.create(createPiaIntakeDto, user, userRoles),
      ).resolves.not.toThrow(
        new ForbiddenException({
          path: 'steps.mpoInput',
          message: `You do not have permissions to edit certain section of this document. Please reach out to your MPO to proceed.`,
        }),
      );
    });
  });

  /**
   * @Description
   * These set of tests validates that findAll method returns the restricted and filtered data based on user's permissions.
   *
   * Supported filters:
   *   - searchText: string [on drafterName and title]
   *
   * @method findAll
   */
  describe('`findAll` method', () => {
    const typeormInSpy = jest.spyOn(typeormIn, 'In').mockReturnValue(null);

    const typeormILikeSpy = jest
      .spyOn(typeormILike, 'ILike')
      .mockReturnValue(null);

    const omitBaseKeysSpy = jest
      .spyOn(baseHelper, 'omitBaseKeys')
      .mockImplementation(() => null);

    beforeEach(() => {
      typeormInSpy.mockClear();
      typeormILikeSpy.mockClear();
      omitBaseKeysSpy.mockClear();
    });

    // Scenario 1: when the user is an MPO [no searchText provided]
    it('succeeds calling the database repository with correct data for MPO role [no searchText provided]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
          },
          {
            isActive: true,
            ministry: null,
            status: Not(PiaIntakeStatusEnum.INCOMPLETE),
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // Scenario 2: when the user is a just a drafter (not MPO) [no searchText provided]
    it('succeeds calling the database repository with correct data for a drafter (non-MPO) role [no searchText provided]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).not.toHaveBeenCalled();
      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 0,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 3: user is MPO; searchText is provided
    it('succeeds when user is an MPO and [searchText is provided]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        searchText: 'King Richard',
        page: 1,
        pageSize: 12,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).toHaveBeenCalledTimes(1);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: null,
          },
          {
            isActive: true,
            ministry: null,
            title: null,
            status: Not(PiaIntakeStatusEnum.INCOMPLETE),
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: null,
          },
          {
            isActive: true,
            ministry: null,
            drafterName: null,
            status: Not(PiaIntakeStatusEnum.INCOMPLETE),
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 0,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 4: user is not MPO; searchText is provided
    it('succeeds when user is only a drafter (not MPO) [searchText provided]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        searchText: 'Will Smith',
        page: 1,
        pageSize: 12,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).not.toHaveBeenCalled();
      expect(typeormILikeSpy).toHaveBeenCalledTimes(1);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: null,
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: null,
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 0,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 5-1 : user is MPO; filter by PIA status(incomplete) with Sort
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status(incomplete)]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
        sortBy: 'updatedAt',
        sortOrder: SortOrderEnum.ASC,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'INCOMPLETE',
          },
        ],
        order: {
          updatedAt: 1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 5-2 : user is MPO; filter by PIA status(non-incomplete) with Sort
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status(non-incomplete)]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.MPO_REVIEW,
        sortBy: 'updatedAt',
        sortOrder: SortOrderEnum.ASC,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            ministry: null,
            status: 'MPO_REVIEW',
          },
        ],
        order: {
          updatedAt: 1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 6: user is not MPO; filter by PIA status, drafter only can filter by status
    it('succeeds calling the database repository with correct data for non MPO role [filter by pia status]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'INCOMPLETE',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 7-1: user is MPO ; filter by PIA status (incomplete) and ministry

    it('succeeds calling the database repository with correct data for MPO role [filter by pia status(incomplete) and ministry]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
        filterByMinistry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'INCOMPLETE',
            ministry: 'CITIZENS_SERVICES',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 7-2: user is MPO ; filter by PIA status (incomplete) and ministry
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status(except incomplete) and ministry]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.MPO_REVIEW,
        filterByMinistry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'MPO_REVIEW',
            ministry: 'CITIZENS_SERVICES',
          },
          {
            isActive: true,
            ministry: 'CITIZENS_SERVICES',
            status: 'MPO_REVIEW',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 8: user is MPO; filter by PIA status and ministry and only current user's pia
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status and ministry and only current user pia]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
        filterByMinistry: GovMinistriesEnum.CITIZENS_SERVICES,
        filterPiaDrafterByCurrentUser:
          PiaFilterDrafterByCurrentUserEnum.ONLYMYPIAS,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'INCOMPLETE',
            ministry: 'CITIZENS_SERVICES',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 9: user is MPO; filter by PIA status and ministry and not current user's pia
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status and ministry and exclude current user pia]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
        filterByMinistry: GovMinistriesEnum.CITIZENS_SERVICES,
        filterPiaDrafterByCurrentUser:
          PiaFilterDrafterByCurrentUserEnum.EXCLUDEMYPIAS,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).not.toHaveBeenCalled();

      expect(omitBaseKeysSpy).not.toHaveBeenCalled();

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [],
        page: 5,
        pageSize: 12,
        total: 0,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 9-1: user is MPO; filter by PIA status - MPO_REVIEW and ministry and not current user's pia
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status - MPO_REVIEW and ministry and exclude current user pia]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.MPO_REVIEW,
        filterByMinistry: GovMinistriesEnum.CITIZENS_SERVICES,
        filterPiaDrafterByCurrentUser:
          PiaFilterDrafterByCurrentUserEnum.EXCLUDEMYPIAS,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: Not(user.idir_user_guid),
            status: PiaIntakeStatusEnum.MPO_REVIEW,
            ministry: GovMinistriesEnum.CITIZENS_SERVICES,
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 10 non MPO searchText and filter by status
    it('succeeds when user is only a drafter (not MPO) [searchText provided and filter by status]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        searchText: 'Will Smith',
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).not.toHaveBeenCalled();
      expect(typeormILikeSpy).toHaveBeenCalledTimes(1);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: null,
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: null,
            status: 'INCOMPLETE',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 0,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });

    // scenario 11-1 MPO user searchText and filter by status (incomplete)
    it('succeeds when user is an MPO and [searchText is provided and filter by status(incomplete)]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        searchText: 'King Richard',
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).toHaveBeenCalledTimes(1);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: null,
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: null,
            status: 'INCOMPLETE',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 0,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 11-2 MPO user searchText and filter by status (except incomplete)
    it('succeeds when user is an MPO and [searchText is provided and filter by status(Non-incomplete)]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        searchText: 'King Richard',
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.MPO_REVIEW,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).toHaveBeenCalledTimes(1);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: null,
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            ministry: null,
            title: null,
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: null,
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            ministry: null,
            drafterName: null,
            status: 'MPO_REVIEW',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 0,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(1);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [getPiaIntakeROMock],
        page: 1,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 12-1  MPO user can not filter other ministry pia
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status and not their ministry]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.INCOMPLETE,
        filterByMinistry: GovMinistriesEnum.FORESTS,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: 'INCOMPLETE',
            ministry: 'FORESTS',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });
      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(0);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
    });
    // scenario 12 -2 MPO user can not filter other ministry pia but can see their PIA submit to this ministry
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status(non-incomplete) and not their ministry]', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const query: PiaIntakeFindQuery = {
        page: 5,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.MPO_REVIEW,
        filterByMinistry: GovMinistriesEnum.FORESTS,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(typeormInSpy).toHaveBeenCalledWith([
        Roles[RolesEnum.MPO_CITZ].ministry,
      ]);

      expect(typeormILikeSpy).not.toHaveBeenCalled();

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            ministry: 'FORESTS',
            status: 'MPO_REVIEW',
            createdByGuid: 'AAA00001B22C333DD4EEEEE55F6666G77',
          },
        ],
        order: {
          createdAt: -1,
        },
        skip: 48,
        take: 12,
      });

      expect(omitBaseKeysSpy).toHaveBeenCalledTimes(0);

      const expectedResult: PaginatedRO<GetPiaIntakeRO> = {
        data: [],
        page: 5,
        pageSize: 12,
        total: 100,
      };
      expect(result).toEqual(expectedResult);
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

      expect(omitBaseKeysSpy).toHaveBeenCalledWith(piaIntakeEntityMock, [
        'updatedByDisplayName',
      ]);
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
      const updatePiaIntakeDto = {
        status: PiaIntakeStatusEnum.INCOMPLETE,
        saveId: 1,
      };
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 0; // non-existent id

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      service.validateUserAccess = jest.fn(() => true);

      piaIntakeRepository.save = jest.fn(async () => {
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
      expect(piaIntakeRepository.save).toHaveBeenCalledWith({
        id,
        ...updatePiaIntakeDto,
        saveId: 2,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.idir_username,
        updatedByDisplayName: user.display_name,
      });
    });

    // Scenario 2: Test succeeds when repository.update does not throw error
    it('succeeds when repository.update does not throw error', async () => {
      const piaIntakeMock = { ...piaIntakeEntityMock };
      const piaIntakeROMock = { ...getPiaIntakeROMock };

      const updatePiaIntakeDto = {
        status: PiaIntakeStatusEnum.INCOMPLETE,
        saveId: 1,
      };
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      service.findOneById = jest.fn(async () => {
        delay(10);
        return piaIntakeROMock;
      });

      service.validateUserAccess = jest.fn(() => true);

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeMock, ...updatePiaIntakeDto };
      });

      const result = await service.update(
        id,
        updatePiaIntakeDto,
        user,
        userRoles,
      );

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
      );
      expect(piaIntakeRepository.save).toHaveBeenCalledWith({
        id,
        ...updatePiaIntakeDto,
        saveId: 2,
        updatedByGuid: user.idir_user_guid,
        updatedByUsername: user.idir_username,
        updatedByDisplayName: user.display_name,
      });
      expect(service.findOneById).toHaveBeenCalledWith(id, user, userRoles);

      expect(result).toBe(piaIntakeROMock);
    });

    // Scenario 3: Conflict exception: Fails if the user tries to update a stale version
    it('Fails if the user tries to update a stale version', async () => {
      const piaIntakeMock = { ...piaIntakeEntityMock, saveId: 10 };

      const updatePiaIntakeDto = {
        status: PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
        saveId: 5, // older than current in db, 10
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      service.validateUserAccess = jest.fn(() => true);

      await expect(
        service.update(id, updatePiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ConflictException({
          updatedByDisplayName: piaIntakeMock.updatedByDisplayName,
          message: 'You may not have an updated version of the document',
        }),
      );

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeMock,
      );
    });

    // Scenario 4: succeeds and update submittedAt with current value if status is changed to MPO_REVIEW
    it('succeeds and update submittedAt with current value if status is changed to MPO_REVIEW', async () => {
      const piaIntakeMock = { ...piaIntakeEntityMock };
      const piaIntakeROMock = { ...getPiaIntakeROMock };

      const updatePiaIntakeDto: UpdatePiaIntakeDto = {
        status: PiaIntakeStatusEnum.MPO_REVIEW,
        saveId: 1,
        submittedAt: null,
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      service.findOneById = jest.fn(async () => {
        delay(10);
        return piaIntakeROMock;
      });

      service.validateUserAccess = jest.fn(() => true);

      piaIntakeRepository.save = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeMock, ...updatePiaIntakeDto };
      });

      await service.update(id, updatePiaIntakeDto, user, userRoles);

      expect(updatePiaIntakeDto.submittedAt).toBeDefined();
      expect(updatePiaIntakeDto.submittedAt).toBeInstanceOf(Date);
    });

    // Scenario 5: fails with Forbidden if DRAFTER tries to update fields they don't have permissions to
    it("fails with Forbidden if DRAFTER tries to update fields they don't have permissions to", async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = []; // Drafter Role
      const id = 1;

      const piaIntakeMock: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        saveId: 10,
        createdByGuid: user.idir_user_guid,
      };

      const updatePiaIntakeDto = {
        collectionUseAndDisclosure: {
          steps: [
            {
              drafterInput: 'Make a Checklist.',
              mpoInput: null,
              foippaInput: null,
              OtherInput: null,
            },
          ],
          collectionNotice: {
            drafterInput: 'Test Input',
            mpoInput: 'I do not have access to update this field',
          },
        },
        saveId: 10,
      };

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      // mock validated user access
      service.validateUserAccess = jest.fn(() => null);

      await expect(
        service.update(id, updatePiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ForbiddenException({
          path: 'collectionNotice.mpoInput',
          message:
            'You do not have permissions to edit certain section of this document. Please reach out to your MPO to proceed.',
        }),
      );
    });

    // Scenario 6: succeeds if scenario 5 updates are requested by an MPO
    it('succeeds if scenario 5 updates are requested by an MPO', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [RolesEnum.MPO_HLTH]; // MPO
      const id = 1;

      const piaIntakeMock: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        saveId: 10,
      };

      const updatePiaIntakeDto = {
        collectionUseAndDisclosure: {
          steps: [
            {
              drafterInput: 'Make a Checklist.',
              mpoInput: null,
              foippaInput: null,
              OtherInput: null,
            },
          ],
          collectionNotice: {
            drafterInput: 'Test Input',
            mpoInput: 'I now DO have access to update this field',
          },
        },
        saveId: 10,
      };

      // mock validated user access
      service.validateUserAccess = jest.fn(() => null);

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      await expect(
        service.update(id, updatePiaIntakeDto, user, userRoles),
      ).resolves.not.toThrow();
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

    // Scenario 2: Test succeeds when the record is self submitted
    it('succeeds and returns userType - drafter when the record is self submitted', () => {
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

    // Scenario 3: succeeds when PIA is not self-submitted, but submitted to the ministry I belong and MPO of
    it('succeeds and returns userType - MPO when PIA is not self-submitted, but submitted to the ministry I belong and MPO of', () => {
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
