import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { marked } from 'marked';

import * as pdfHelper from 'src/common/helpers/pdf-helper';
import * as dateHelper from 'src/common/helpers/date-helper';
import * as baseHelper from 'src/common/helpers/base-helper';

import { AuthModule } from 'src/modules/auth/auth.module';
import { CreatePiaIntakeDto } from 'src/modules/pia-intake/dto/create-pia-intake.dto';
import { KeycloakUser } from 'src/modules/auth/keycloak-user.model';
import { PiaIntakeController } from 'src/modules/pia-intake/pia-intake.controller';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { PiaIntakeService } from 'src/modules/pia-intake/pia-intake.service';
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
  BadRequestException,
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
import { In } from 'typeorm/find-options/operator/In';
import { ILike } from 'typeorm/find-options/operator/ILike';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { UpdatePiaIntakeDto } from 'src/modules/pia-intake/dto/update-pia-intake.dto';
import { emptyJsonbValues } from 'test/util/mocks/data/pia-empty-jsonb-values.mock';
import { YesNoInput } from 'src/common/enums/yes-no-input.enum';
import { InvitesService } from 'src/modules/invites/invites.service';
import { invitesServiceMock } from 'test/util/mocks/services/invites.service.mock';
import { InviteesService } from 'src/modules/invitees/invitees.service';
import { inviteesServiceMock } from 'test/util/mocks/services/invitees.service.mock';
import {
  inviteCodeMock,
  inviteEntityMock,
} from 'test/util/mocks/data/invites.mock';
import { inviteeEntityMock } from 'test/util/mocks/data/invitee.mock';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import * as updateReviewSubmissionFields from 'src/modules/pia-intake/helper/update-review-submission-fields';

/**
 * @Description
 * This file tests the contents of pia-intake.service.ts
 */
describe('PiaIntakeService', () => {
  let service: PiaIntakeService;
  let piaIntakeRepository;
  let invitesService: InvitesService;
  let inviteesService: InviteesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [PiaIntakeController],
      providers: [
        PiaIntakeService,
        {
          provide: InvitesService,
          useValue: invitesServiceMock,
        },
        {
          provide: InviteesService,
          useValue: inviteesServiceMock,
        },
        {
          provide: getRepositoryToken(PiaIntakeEntity),
          useValue: { ...repositoryMock },
        },
      ],
    }).compile();

    service = module.get<PiaIntakeService>(PiaIntakeService);
    piaIntakeRepository = module.get(getRepositoryToken(PiaIntakeEntity));
    invitesService = module.get<InvitesService>(InvitesService);
    inviteesService = module.get<InviteesService>(InviteesService);
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
    it('fails when a drafter tries to create fields [collectionUseAndDisclosure] they do not have permissions to', async () => {
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
    it('passes and does not throw error when an MPO of any ministry tries to update the restricted fields [collectionUseAndDisclosure]', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        collectionUseAndDisclosure: {
          steps: [
            {
              drafterInput: 'Make a Checklist.',
              mpoInput: 'I now have privilege to edit this',
              foippaInput: 'I now have have privilege to edit this',
              OtherInput: 'I now have privilege to edit this',
            },
          ],
          collectionNotice: {
            drafterInput: 'Test Input',
            mpoInput: 'I now have privilege to edit this',
          },
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [RolesEnum.MPO_HLTH];

      await expect(service.create(createPiaIntakeDto, user, userRoles))
        .resolves;
    });

    // Scenario 6
    it('fails when a drafter tries to create fields [ppq] they do not have permissions to', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        ppq: {
          hasCommonProgram: false,
          hasCloudTechnology: false,
          hasPotentialPublicInterest: false,
          hasDataLinking: false,
          hasBcServicesCardOnboarding: true,
          hasAiOrMl: true,
          hasContactOrLicenseReview: false,
          hasInitiativeOther: true,
          initiativeOtherDetails: 'Extra details goes here...',
          proposedDeadlineAvailable: YesNoInput.YES,
          proposedDeadline: '2022/06/20',
          proposedDeadlineReason: 'Reasons for proposed deadline goes here...',
          otherCpoConsideration:
            'Any related PIAs or CPO considerations goes here...',
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      await expect(
        service.create(createPiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ForbiddenException({
          path: 'steps.ppq',
          message: `You do not have permissions to edit certain section of this document. Please reach out to your MPO to proceed.`,
        }),
      );
    });

    // Scenario 7
    it('passes and does not throw error when an MPO of any ministry tries to update the restricted fields [ppq]', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        ppq: {
          hasCommonProgram: false,
          hasCloudTechnology: false,
          hasPotentialPublicInterest: false,
          hasDataLinking: false,
          hasBcServicesCardOnboarding: true,
          hasAiOrMl: true,
          hasContactOrLicenseReview: false,
          hasInitiativeOther: true,
          initiativeOtherDetails: 'Extra details goes here...',
          proposedDeadlineAvailable: YesNoInput.YES,
          proposedDeadline: '2022/06/20',
          proposedDeadlineReason: 'Reasons for proposed deadline goes here...',
          otherCpoConsideration:
            'Any related PIAs or CPO considerations goes here...',
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [RolesEnum.MPO_AG];

      await expect(service.create(createPiaIntakeDto, user, userRoles))
        .resolves;
    });

    // Scenario 8
    it("fails when drafter tries to create review section with fields they don't have access to", async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
          },
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      await expect(
        service.create(createPiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ForbiddenException({
          path: 'review.programArea.selectedRoles',
          message: `You do not have permissions to edit certain section of this document. Please reach out to your MPO to proceed.`,
        }),
      );
    });

    // Scenario 9
    it('succeeds when an MPO tries to create review section', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
          },
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [RolesEnum.MPO_AG];

      await expect(service.create(createPiaIntakeDto, user, userRoles))
        .resolves;
    });

    // Scenario 10
    it('fails when CPO tries to create review section with CPO details', async () => {
      const createPiaIntakeDto: CreatePiaIntakeDto = {
        ...createPiaIntakeMock,
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
          },
          mpo: {
            isAcknowledged: true,
            reviewNote: 'Test notes',
          },
        },
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [RolesEnum.CPO];

      await expect(
        service.create(createPiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ForbiddenException({
          path: 'review.mpo.isAcknowledged',
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
    const omitBaseKeysSpy = jest
      .spyOn(baseHelper, 'omitBaseKeys')
      .mockImplementation(() => null);

    beforeEach(() => {
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
            status: In([
              PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
              PiaIntakeStatusEnum.MPO_REVIEW,
              PiaIntakeStatusEnum.CPO_REVIEW,
              PiaIntakeStatusEnum.FINAL_REVIEW,
              PiaIntakeStatusEnum.PENDING_COMPLETION,
            ]),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: ILike('%King Richard%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
            title: ILike('%King Richard%'),
            status: In([
              PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
              PiaIntakeStatusEnum.MPO_REVIEW,
              PiaIntakeStatusEnum.CPO_REVIEW,
              PiaIntakeStatusEnum.FINAL_REVIEW,
              PiaIntakeStatusEnum.PENDING_COMPLETION,
            ]),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            title: ILike('%King Richard%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: ILike('%King Richard%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
            drafterName: ILike('%King Richard%'),
            status: In([
              PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
              PiaIntakeStatusEnum.MPO_REVIEW,
              PiaIntakeStatusEnum.CPO_REVIEW,
              PiaIntakeStatusEnum.FINAL_REVIEW,
              PiaIntakeStatusEnum.PENDING_COMPLETION,
            ]),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            drafterName: ILike('%King Richard%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: ILike('%Will Smith%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            title: ILike('%Will Smith%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: ILike('%Will Smith%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            drafterName: ILike('%Will Smith%'),
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.INCOMPLETE,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.INCOMPLETE,
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.MPO_REVIEW,
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
            status: PiaIntakeStatusEnum.MPO_REVIEW,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.MPO_REVIEW,
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.INCOMPLETE,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.INCOMPLETE,
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.INCOMPLETE,
            ministry: GovMinistriesEnum.CITIZENS_SERVICES,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.INCOMPLETE,
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
    // scenario 7-2: user is MPO ; filter by PIA status (non-incomplete) and ministry
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.MPO_REVIEW,
            ministry: GovMinistriesEnum.CITIZENS_SERVICES,
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.MPO_REVIEW,
            ministry: GovMinistriesEnum.CITIZENS_SERVICES,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.INCOMPLETE,
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

    // scenario 9: user is MPO; filter by PIA status[incomplete] and ministry[own] and not current user's pia -- only invited PIAs
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: 'INCOMPLETE',
            ministry: 'CITIZENS_SERVICES',
            createdByGuid: Not(user.idir_user_guid),
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

    // scenario 9-1: user is MPO; filter by PIA status - MPO_REVIEW and own ministry and not current user's pia
    it('succeeds calling the database repository with correct data for MPO role [filter by pia status - MPO_REVIEW, own ministry and exclude current user pia]', async () => {
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: Not(user.idir_user_guid),
            status: PiaIntakeStatusEnum.MPO_REVIEW,
            ministry: GovMinistriesEnum.CITIZENS_SERVICES,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: ILike('%Will Smith%'),
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            title: ILike('%Will Smith%'),
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: ILike('%Will Smith%'),
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            drafterName: ILike('%Will Smith%'),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: ILike('%King Richard%'),
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            title: ILike('%King Richard%'),
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: ILike('%King Richard%'),
            status: 'INCOMPLETE',
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            drafterName: ILike('%King Richard%'),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            title: ILike('%King Richard%'),
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
            title: ILike('%King Richard%'),
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            title: ILike('%King Richard%'),
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            drafterName: ILike('%King Richard%'),
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
            drafterName: ILike('%King Richard%'),
            status: 'MPO_REVIEW',
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            drafterName: ILike('%King Richard%'),
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.INCOMPLETE,
            ministry: GovMinistriesEnum.FORESTS,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.INCOMPLETE,
            ministry: GovMinistriesEnum.FORESTS,
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            ministry: GovMinistriesEnum.FORESTS,
            status: PiaIntakeStatusEnum.MPO_REVIEW,
            createdByGuid: user.idir_user_guid,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            ministry: GovMinistriesEnum.FORESTS,
            status: PiaIntakeStatusEnum.MPO_REVIEW,
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

    // scenario 13 User is a CPO
    it('succeeds when the user is a CPO', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.CPO];
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.CPO_REVIEW,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

    // scenario 14 User is a CPO and an MPO of a ministry
    it('succeeds when the user is a CPO', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.CPO, RolesEnum.MPO_AG];
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            ministry: In([GovMinistriesEnum.ATTORNEY_GENERAL]),
            status: In([
              PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
              PiaIntakeStatusEnum.MPO_REVIEW,
              PiaIntakeStatusEnum.CPO_REVIEW,
              PiaIntakeStatusEnum.FINAL_REVIEW,
              PiaIntakeStatusEnum.PENDING_COMPLETION,
            ]),
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.CPO_REVIEW,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

    // scenario 15: User is a CPO with filter status=INCOMPLETE
    it('succeeds when the user is a CPO with filter status=INCOMPLETE', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.CPO];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.INCOMPLETE,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.INCOMPLETE,
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

    // scenario 16: User is a CPO with filter status=CPO_REVIEW
    it('succeeds when the user is a CPO with filter status=CPO_REVIEW', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.CPO];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.CPO_REVIEW,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.CPO_REVIEW,
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.CPO_REVIEW,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.CPO_REVIEW,
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

    // scenario 17: User is a CPO with filter ministry=AG
    it('succeeds when the user is a CPO with filter ministry=AG', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.CPO];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
        filterByMinistry: GovMinistriesEnum.ATTORNEY_GENERAL,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            ministry: GovMinistriesEnum.ATTORNEY_GENERAL,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.CPO_REVIEW,
            ministry: GovMinistriesEnum.ATTORNEY_GENERAL,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            ministry: GovMinistriesEnum.ATTORNEY_GENERAL,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

    // Scenario 18: User is invited to PIAs;
    // All other scenarios also cover invited user use cases
    it('succeeds when the user is invited to PIAs', async () => {
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

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: Not(PiaIntakeStatusEnum.COMPLETE),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: Not(PiaIntakeStatusEnum.COMPLETE),
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

    // Scenario 19: User is invited to PIAs with filters;
    it('succeeds when the user is invited to PIAs with filters', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.CPO_REVIEW,
        filterByMinistry: GovMinistriesEnum.AGRICULTURE_AND_FOOD,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.CPO_REVIEW,
            ministry: GovMinistriesEnum.AGRICULTURE_AND_FOOD,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.CPO_REVIEW,
            ministry: GovMinistriesEnum.AGRICULTURE_AND_FOOD,
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

    // Scenario 20: User is a drafter, has no roles, and is filtering for COMPLETE PIAs
    it('succeeds when the user is only a drafter and is filtering for COMPLETE PIAs', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.COMPLETE,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.COMPLETE,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.COMPLETE,
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

    // Scenario 21: User is an MPO and is filtering for COMPLETE PIAs
    it('succeeds when the user is an MPO and is filtering for COMPLETE PIAs', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.COMPLETE,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.COMPLETE,
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.COMPLETE,
            ministry: In([GovMinistriesEnum.CITIZENS_SERVICES]),
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.COMPLETE,
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

    // Scenario 22: User is a CPO and is filtering for COMPLETE PIAs
    it('succeeds when the user is a CPO and is filtering for COMPLETE PIAs', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.CPO];
      const piaIntakeEntity = { ...piaIntakeEntityMock };
      const query: PiaIntakeFindQuery = {
        page: 1,
        pageSize: 12,
        filterByStatus: PiaIntakeStatusEnum.COMPLETE,
      };

      piaIntakeRepository.findAndCount = jest.fn(async () => {
        delay(10);
        return [[piaIntakeEntity], 100];
      });

      omitBaseKeysSpy.mockReturnValue({ ...getPiaIntakeROMock });

      const result = await service.findAll(user, userRoles, query);

      expect(piaIntakeRepository.findAndCount).toHaveBeenCalledWith({
        where: [
          {
            isActive: true,
            createdByGuid: user.idir_user_guid,
            status: PiaIntakeStatusEnum.COMPLETE,
          },
          {
            isActive: true,
            status: PiaIntakeStatusEnum.COMPLETE,
          },
          {
            isActive: true,
            invitee: {
              createdByGuid: user.idir_user_guid,
            },
            status: PiaIntakeStatusEnum.COMPLETE,
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
      const inviteCode = null;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      service.validateUserAccess = jest.fn(async () => {
        throw new ForbiddenException(); // any exception
      });

      await expect(
        service.findOneById(id, user, userRoles, inviteCode),
      ).rejects.toThrow(new ForbiddenException());

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
        inviteCode,
      );
      expect(omitBaseKeysSpy).not.toHaveBeenCalled();
    });

    // Scenario 3: Test succeeds when the record is found and the user has relevant access
    it('succeeds when the record is found and the user has relevant access', async () => {
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;
      const inviteCode = null;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      service.validateUserAccess = jest.fn(async () => true);

      omitBaseKeysSpy.mockImplementation(() => getPiaIntakeROMock);

      const result = await service.findOneById(id, user, userRoles, inviteCode);

      expect(service.findOneBy).toHaveBeenCalledWith({ id });
      expect(service.validateUserAccess).toHaveBeenCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
        inviteCode,
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

      service.validateUserAccess = jest.fn(async () => true);

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

      service.validateUserAccess = jest.fn(async () => true);

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

      service.validateUserAccess = jest.fn(async () => true);

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
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles = [RolesEnum.MPO_CITZ];
      const id = 1;

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeMock, submittedAt: null };
      });

      service.findOneById = jest.fn(async () => {
        delay(10);
        return piaIntakeROMock;
      });

      service.validateUserAccess = jest.fn(async () => true);

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
        status: PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
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
      service.validateUserAccess = jest.fn(async () => null);

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
        status: PiaIntakeStatusEnum.EDIT_IN_PROGRESS,
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
      service.validateUserAccess = jest.fn(async () => null);

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return piaIntakeMock;
      });

      await expect(
        service.update(id, updatePiaIntakeDto, user, userRoles),
      ).resolves.not.toThrow();
    });

    it('succeeds and updates PIA with no error if a user updates the program area reviews IN FINAL_REVIEW status', async () => {
      const existingPia: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
          },
          mpo: {
            isAcknowledged: true,
            reviewNote: 'Review note by an MPO',
          },
        },
        saveId: 1,
        status: PiaIntakeStatusEnum.FINAL_REVIEW,
      };

      const updatePiaIntakeDto: UpdatePiaIntakeDto = {
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
            reviews: {
              'Area Director': {
                isAcknowledged: true,
                reviewNote: 'Acknowledged',
              },
            },
          },
          mpo: {
            isAcknowledged: true,
            reviewNote: 'Review note by an MPO',
          },
        },
        saveId: 1,
        hasAddedPiToDataElements: false,
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = []; // drafter only

      // mock validated user access
      service.validateUserAccess = jest.fn(async () => null);

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...existingPia };
      });

      piaIntakeRepository.save = jest.fn(async () => null);

      service.findOneById = jest.fn(async () => {
        delay(10);
        return { ...existingPia, ...updatePiaIntakeDto };
      });

      const response = await service.update(
        123,
        updatePiaIntakeDto,
        user,
        userRoles,
      );

      expect(
        response.review.programArea.reviews['Area Director'].reviewNote,
      ).toBeDefined();
    });

    it('fails and throw error if a user updates the program area reviews in a status other than FINAL_REVIEW ', async () => {
      const existingPia: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
          },
          mpo: {
            isAcknowledged: true,
            reviewNote: 'Review note by an MPO',
          },
        },
        saveId: 1,
      };

      const updatePiaIntakeDto: UpdatePiaIntakeDto = {
        review: {
          programArea: {
            selectedRoles: ['Area Director'],
            reviews: {
              'Area Director': {
                isAcknowledged: true,
                reviewNote: 'Acknowledged',
              },
            },
          },
          mpo: {
            isAcknowledged: true,
            reviewNote: 'Review note by an MPO',
          },
        },
        saveId: 1,
        hasAddedPiToDataElements: false,
      };

      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = []; // drafter only

      // mock validated user access
      service.validateUserAccess = jest.fn(async () => null);

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...existingPia };
      });

      piaIntakeRepository.save = jest.fn(async () => null);

      service.findOneById = jest.fn(async () => {
        delay(10);
        return { ...existingPia, ...updatePiaIntakeDto };
      });

      await expect(
        service.update(123, updatePiaIntakeDto, user, userRoles),
      ).rejects.toThrow(
        new ForbiddenException({
          message: 'You do not permissions to update review in this status',
        }),
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
      expect(shortDateSpy).toHaveBeenCalledWith(getPiaIntakeRO.updatedAt);

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
        await service.validateUserAccess(user, userRoles, piaIntake);
      } catch (e) {
        expect(e).toEqual(new GoneException());
      }
    });

    // Scenario 2: Test succeeds when the record is self submitted
    it('succeeds and returns userType - drafter when the record is self submitted', async () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'TEST_USER',
      };
      const userRoles = [];
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'TEST_USER',
      };

      const result = await service.validateUserAccess(
        user,
        userRoles,
        piaIntake,
      );

      expect(result).toBe(true);
    });

    // Scenario 3: succeeds when PIA is not self-submitted, but submitted to the ministry I belong and MPO of
    it('succeeds and returns userType - MPO when PIA is not self-submitted, but submitted to the ministry I belong and MPO of', async () => {
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

      const result = await service.validateUserAccess(
        user,
        userRoles,
        piaIntake,
      );

      expect(result).toBe(true);
    });

    // Scenario 4: Test fails when the record is not self-submitted, but submitted to the ministry I belong and NOT MPO of
    it('fails when the record is not self-submitted, but submitted to the ministry I belong and NOT MPO of', async () => {
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
        await service.validateUserAccess(user, userRoles, piaIntake);
      } catch (e) {
        expect(e).toEqual(new ForbiddenException());
      }
    });

    // Scenario 5: Test fails when the record is neither self-submitted not submitted to the ministry I am MPO of
    it('fails when the record is neither self-submitted not submitted to the ministry I am MPO of', async () => {
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
        await service.validateUserAccess(user, userRoles, piaIntake);
      } catch (e) {
        expect(e).toEqual(new ForbiddenException());
      }
    });

    // Scenario 6: Test succeeds when the user is an invitee to a PIA
    it('succeeds when the user is an invitee to a PIA', async () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = []; // no MPO, neither a CPO
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2', // not self-drafted
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      inviteesService.findOneByUserAndPia = jest.fn(async () => {
        delay(10);
        return { ...inviteeEntityMock };
      });

      const result = await service.validateUserAccess(
        user,
        userRoles,
        piaIntake,
      );

      expect(inviteesService.findOneByUserAndPia).toHaveBeenCalledWith(
        user,
        piaIntake.id,
      );
      expect(invitesService.findOne).not.toHaveBeenCalled();
      expect(inviteesService.create).not.toHaveBeenCalled();

      expect(result).toBe(true);
    });

    // Scenario 7: Test succeeds when the user is not an invitee yet; but has a valid invite code
    it('succeeds when the user is not an invitee yet; but has a valid invite code', async () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = []; // no MPO, neither a CPO
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2', // not self-drafted
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      inviteesService.findOneByUserAndPia = jest.fn(async () => {
        delay(10);
        return null;
      });

      invitesService.findOne = jest.fn(async () => {
        delay(10);
        return { ...inviteEntityMock };
      });

      const result = await service.validateUserAccess(
        user,
        userRoles,
        piaIntake,
        inviteCodeMock,
      );

      expect(inviteesService.findOneByUserAndPia).toHaveBeenCalledWith(
        user,
        piaIntake.id,
      );
      expect(invitesService.findOne).toHaveBeenCalledWith(
        piaIntake.id,
        inviteCodeMock,
      );
      expect(inviteesService.create).toHaveBeenCalledWith(
        piaIntake,
        { ...inviteEntityMock },
        user,
      );

      expect(result).toBe(true);
    });

    // Scenario 8: Test fails when the user is not an invitee yet; and has an INVALID invite code
    it('fails when the user is not an invitee yet; and has an INVALID invite code', async () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = []; // no MPO, neither a CPO
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2', // not self-drafted
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      inviteesService.findOneByUserAndPia = jest.fn(async () => {
        delay(10);
        return null;
      });

      invitesService.findOne = jest.fn(async () => {
        delay(10);
        return null;
      });

      try {
        await service.validateUserAccess(
          user,
          userRoles,
          piaIntake,
          inviteCodeMock,
        );
      } catch (e) {
        expect(e).toEqual(new ForbiddenException());
      }
    });

    // Scenario 9: Test fails when the user is neither of an invitee,drafter,mpo, or a cpo to the PIA and does not even have an invite code
    it('fails when the user is neither of an invitee, drafter, mpo, or a cpo to the PIA and does not even have an invite code', async () => {
      const user: KeycloakUser = {
        ...keycloakUserMock,
        idir_user_guid: 'USER_1',
      };
      const userRoles = []; // no MPO, neither a CPO
      const piaIntake: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        createdByGuid: 'USER_2', // not self-drafted
        ministry: GovMinistriesEnum.CITIZENS_SERVICES,
      };

      inviteesService.findOneByUserAndPia = jest.fn(async () => {
        delay(10);
        return null;
      });

      try {
        await service.validateUserAccess(user, userRoles, piaIntake);
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

  /**
   * @method validatePiaAccess
   */
  describe('`validatePiaAccess` method', () => {
    /**
     * This test validates that the method calls the findOneById method to validate access
     *
     * @Input
     *   - piaId: number
     *   - user info mock
     *
     * @Output
     *   - void
     */
    it('succeeds calling findOneById method', async () => {
      const piaId = 101;
      const user: KeycloakUser = { ...keycloakUserMock };
      const userRoles: Array<RolesEnum> = [];

      service.findOneBy = jest.fn(async () => {
        delay(10);
        return { ...piaIntakeEntityMock };
      });

      service.validateUserAccess = jest.fn(() => null);

      await service.validatePiaAccess(piaId, user, userRoles);

      expect(service.findOneBy).toBeCalledWith({ id: piaId });
      expect(service.validateUserAccess).toBeCalledWith(
        user,
        userRoles,
        piaIntakeEntityMock,
      );
    });
  });

  /**
   * @method getPiaType
   * @input updatedValue, storedValue
   *
   * CURRENTLY IN THE System, we only have STANDARD and DELEGATE PIAs
   */
  describe('`getPiaType` method', () => {
    it('returns Delegate Review type when Personal Information is not provided', () => {
      const updatedValue: UpdatePiaIntakeDto = {
        hasAddedPiToDataElements: false,
        saveId: 1,
      };
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

      expect(service.getPiaType(updatedValue, storedValue)).toBe(
        PiaTypesEnum.DELEGATE_REVIEW,
      );
    });

    it('returns STANDARD Review type when Personal Information is provided', () => {
      const updatedValue: UpdatePiaIntakeDto = {
        hasAddedPiToDataElements: true,
        saveId: 1,
      };
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

      expect(service.getPiaType(updatedValue, storedValue)).toBe(
        PiaTypesEnum.STANDARD,
      );
    });

    it('returns STANDARD Review type when Personal Information provided is unsure', () => {
      const updatedValue: UpdatePiaIntakeDto = {
        hasAddedPiToDataElements: null,
        saveId: 1,
      };
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

      expect(service.getPiaType(updatedValue, storedValue)).toBe(
        PiaTypesEnum.STANDARD,
      );
    });

    it('returns STANDARD Review type by default when PIA info is not available', () => {
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };

      expect(service.getPiaType(null, storedValue)).toBe(
        PiaTypesEnum.DELEGATE_REVIEW,
      );
    });
  });

  /**
   * @method updateProgramAreaReviews
   * @input fields
   *  updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
   *  storedValue: PiaIntakeEntity,
   *  user: KeycloakUser,
   *
   */
  describe('`updateProgramAreaReviews` method', () => {
    let updateReviewSubmissionFieldsSpy = null;
    beforeEach(() => {
      updateReviewSubmissionFieldsSpy = jest
        .spyOn(updateReviewSubmissionFields, 'updateReviewSubmissionFields')
        .mockImplementation(() => null);
    });

    it('does not process the method when there is no updated reviews', () => {
      const updatedValue: UpdatePiaIntakeDto = { saveId: 1 };
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };
      const user = { ...keycloakUserMock };

      service.updateProgramAreaReviews(updatedValue, storedValue, user);
      expect(updateReviewSubmissionFieldsSpy).not.toHaveBeenCalled();
    });

    it('fails and throws error when review is updated for fields not in selectedRoles', () => {
      const updatedValue: UpdatePiaIntakeDto = {
        saveId: 1,
        review: {
          programArea: {
            selectedRoles: ['Assistant Director'],
            reviews: {
              RANDOM_ROLE: {
                isAcknowledged: true,
                reviewNote: 'TEST NOTE',
              },
            },
          },
        },
      };
      const storedValue: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        review: { programArea: { selectedRoles: ['Assistant Director'] } },
      };
      const user = { ...keycloakUserMock };

      try {
        service.updateProgramAreaReviews(updatedValue, storedValue, user);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
        expect(updateReviewSubmissionFieldsSpy).not.toHaveBeenCalled();
      }
    });

    it('successfully calls the subsequent method when review is updated for fields in selectedRoles', () => {
      const updatedValue: UpdatePiaIntakeDto = {
        saveId: 1,
        review: {
          programArea: {
            selectedRoles: ['Assistant Director', 'Boss', 'Boss 2'],
            reviews: {
              'Assistant Director': {
                isAcknowledged: true,
                reviewNote: 'TEST NOTE by AD',
              },
              'Boss 2': {
                isAcknowledged: true,
                reviewNote: 'TEST NOTE by Boss 2',
              },
            },
          },
        },
        status: PiaIntakeStatusEnum.FINAL_REVIEW,
      };
      const storedValue: PiaIntakeEntity = {
        ...piaIntakeEntityMock,
        review: {
          programArea: {
            selectedRoles: ['Assistant Director', 'Boss', 'Boss 2'],
          },
        },
      };
      const user = { ...keycloakUserMock };

      service.updateProgramAreaReviews(updatedValue, storedValue, user);

      expect(updateReviewSubmissionFieldsSpy).toHaveBeenCalledTimes(2);
    });
  });

  /**
   * @method updateCpoReviews
   * @input fields
   *  updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
   *  storedValue: PiaIntakeEntity,
   *  user: KeycloakUser,
   */
  describe('`updateCpoReviews` method', () => {
    let updateReviewSubmissionFieldsSpy = null;
    beforeEach(() => {
      updateReviewSubmissionFieldsSpy = jest
        .spyOn(updateReviewSubmissionFields, 'updateReviewSubmissionFields')
        .mockImplementation(() => null);
    });

    it('does not process the method when there is no updated reviews', () => {
      const updatedValue: UpdatePiaIntakeDto = { saveId: 1 };
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };
      const user = { ...keycloakUserMock };

      service.updateCpoReviews(updatedValue, storedValue, user);
      expect(updateReviewSubmissionFieldsSpy).not.toHaveBeenCalled();
    });

    it('successfully calls the subsequent method when updatedCpoReviews have reviews', () => {
      const updatedValue: UpdatePiaIntakeDto = {
        saveId: 1,
        review: {
          cpo: {
            GUID_1: {
              isAcknowledged: true,
              reviewNote: 'Test Note 1',
            },
            GUID_2: {
              isAcknowledged: true,
              reviewNote: 'Test Note 2',
            },
            GUID_3: {
              isAcknowledged: true,
              reviewNote: 'Test Note 3',
            },
          },
        },
      };
      const storedValue: PiaIntakeEntity = { ...piaIntakeEntityMock };
      const user = { ...keycloakUserMock };

      service.updateCpoReviews(updatedValue, storedValue, user);

      expect(updateReviewSubmissionFieldsSpy).toHaveBeenCalledTimes(3);
    });
  });
});
