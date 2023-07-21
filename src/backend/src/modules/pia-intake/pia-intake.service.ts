import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  forwardRef,
  GoneException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, ILike, Repository, Not } from 'typeorm';
import { marked } from 'marked';

import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import { GovMinistries } from '../../common/constants/gov-ministries.constant';
import { KeycloakUser } from '../auth/keycloak-user.model';
import { PiaIntakeEntity } from './entities/pia-intake.entity';
import { pugToPdfBuffer } from '../../common/helpers/pdf-helper';
import { shortDate } from '../../common/helpers/date-helper';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { filterMpoRoles } from 'src/common/helpers/roles.helper';
import { IRoleInfo } from 'src/common/constants/roles.constants';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { getFormattedRecords, GetPiaIntakeRO } from './ro/get-pia-intake.ro';
import { UpdatePiaIntakeDto } from './dto/update-pia-intake.dto';
import { PiaIntakeFindQuery } from './dto/pia-intake-find-query.dto';
import { PaginatedRO } from 'src/common/paginated.ro';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { PiaFilterDrafterByCurrentUserEnum } from './enums/pia-filter-drafter-by-current-user.enum';
import { PiaIntakeStatusEnum } from './enums/pia-intake-status.enum';
import { PiaIntakeAllowedSortFieldsType } from './constants/pia-intake-allowed-sort-fields';
import { validateRoleForCollectionUseAndDisclosure } from './jsonb-classes/collection-use-and-disclosure';
import { UserTypesEnum } from 'src/common/enums/users.enum';
import { validateRoleForPPq } from './jsonb-classes/ppq';
import { InvitesService } from '../invites/invites.service';
import { InviteesService } from '../invitees/invitees.service';
import { Review, validateRoleForReview } from './jsonb-classes/review';
import { handlePiaStatusChange } from './helper/handle-pia-status-change';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';
import { handlePiaUpdates } from './helper/handle-pia-updates';
import { ProgramAreaSelectedRolesReview } from './jsonb-classes/review/programArea/programAreaSelectedRoleReviews';

@Injectable()
export class PiaIntakeService {
  @InjectRepository(PiaIntakeEntity)
  private piaIntakeRepository: Repository<PiaIntakeEntity>;

  @Inject(forwardRef(() => InvitesService))
  private readonly invitesService: InvitesService;

  @Inject(InviteesService)
  private readonly inviteesService: InviteesService;

  async create(
    createPiaIntakeDto: CreatePiaIntakeDto,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<GetPiaIntakeRO> {
    // update submittedAt column if it is first time submit
    this.updateSubmittedAt(createPiaIntakeDto);

    // Get User role access type
    const accessType = this.getRoleAccess(userRoles);

    this.validateJsonbFields(createPiaIntakeDto, null, accessType);

    // fetch PIA TYPE
    const piaType = this.getPiaType(createPiaIntakeDto, null);

    // validate status changes and validations
    handlePiaStatusChange(createPiaIntakeDto, null, accessType, piaType);

    // once validated, updated the review fields
    this.updateReviewSubmissionFields(
      createPiaIntakeDto?.review,
      null,
      user,
      'mpo',
    );

    this.updateProgramAreaReviews(createPiaIntakeDto, null, user);

    // TODO: add status restrictions: User can't create/edit PIA in *_REVIEW status [should be incomplete / Edits in progress only]

    const piaInfoForm: PiaIntakeEntity = await this.piaIntakeRepository.save({
      ...createPiaIntakeDto,
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      updatedByDisplayName: user.display_name,
      drafterEmail: user.email,
      drafterName: user.display_name,
    });

    const formattedPiaInfoForm: GetPiaIntakeRO =
      getFormattedRecords(piaInfoForm);

    return formattedPiaInfoForm;
  }

  async update(
    id: number,
    updatePiaIntakeDto: UpdatePiaIntakeDto,
    user: KeycloakUser,
    userRoles: RolesEnum[],
  ): Promise<GetPiaIntakeRO> {
    if (!updatePiaIntakeDto.saveId) {
      throw new BadRequestException('missing save id');
    }

    // Fetch the existing record by ID
    const existingRecord = await this.findOneBy({ id });

    // Validate if the user has access to the pia-intake form. Throw appropriate exceptions if not
    await this.validateUserAccess(user, userRoles, existingRecord);

    // If the user has access, get the role access type of the user
    const accessType = this.getRoleAccess(userRoles);

    // check if the user is not acting on / updating a stale version
    if (existingRecord.saveId !== updatePiaIntakeDto.saveId) {
      throw new ConflictException({
        updatedByDisplayName: existingRecord.updatedByDisplayName,
        message: 'You may not have an updated version of the document',
      });
    }

    // validate jsonb fields for role access
    this.validateJsonbFields(updatePiaIntakeDto, existingRecord, accessType);

    // fetch PIA TYPE
    const piaType = this.getPiaType(updatePiaIntakeDto, existingRecord);

    // validate status changes and validations
    handlePiaStatusChange(
      updatePiaIntakeDto,
      existingRecord,
      accessType,
      piaType,
    );

    // handle field updates
    handlePiaUpdates(updatePiaIntakeDto, existingRecord, accessType, piaType);

    // remove the provided saveId
    delete updatePiaIntakeDto.saveId;

    // update submittedAt column if it is first time submit
    this.updateSubmittedAt(updatePiaIntakeDto);

    this.updateReviewField(updatePiaIntakeDto, existingRecord);

    // once validated, updated the review submission fields
    this.updateReviewSubmissionFields(
      updatePiaIntakeDto?.review,
      existingRecord?.review,
      user,
      'mpo',
    );

    this.updateProgramAreaReviews(updatePiaIntakeDto, existingRecord, user);

    // update the record with the provided keys [using save instead of update updates the @UpdateDateColumn]
    await this.piaIntakeRepository.save({
      id,
      ...updatePiaIntakeDto,
      saveId: existingRecord.saveId + 1,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      updatedByDisplayName: user.display_name,
    });

    // fetch and return the updated record
    const updatedRecord = await this.findOneById(id, user, userRoles);

    return updatedRecord;
  }

  /**
   * @method findOneById
   *
   * @description
   * This method retrieves PIA Intake form record by id
   *
   * @param
   * - pia-intake id
   * - user KeycloakUser
   * - userRoles Keycloak user roles
   *
   * @returns a formatted return object with keys suitable for user
   */
  async findOneById(
    id: number,
    user: KeycloakUser,
    userRoles: RolesEnum[],
    inviteCode?: string,
  ): Promise<GetPiaIntakeRO> {
    // Fetch the record by ID
    const piaIntakeForm = await this.findOneBy({ id });

    // Validate if the user has access to the pia-intake form
    await this.validateUserAccess(user, userRoles, piaIntakeForm, inviteCode);

    // Remove keys from the user's view that are not required
    const formattedRecords: GetPiaIntakeRO = getFormattedRecords(piaIntakeForm);

    // Return the formatted PIA intake record
    return formattedRecords;
  }

  /**
   *@method findAll
   *
   * @param
   * - user KeycloakUser
   * - userRoles Keycloak user roles
   * - find query
   *
   * Supported filters:
   *   - searchText: string [on drafterName and title]
   *
   * @returns
   * As a user, retrieve all (filtered) PIA-intakes I submitted
   * As an MPO, retrieve all (filtered) pia-intakes submitted to my ministry for review
   */
  async findAll(
    user: KeycloakUser,
    userRoles: RolesEnum[],
    query: PiaIntakeFindQuery,
  ): Promise<PaginatedRO<GetPiaIntakeRO>> {
    // Get the ministries for which the user is an MPO based on their roles
    const { mpoMinistries } = this.getMpoMinistriesByRoles(userRoles);
    const isCPO = this.isCPO(userRoles);

    /* ********** CONDITIONAL WHERE CLAUSE BEGINS ********** */
    // common clause for all possible OR conditions
    const commonWhereClause: FindOptionsWhere<PiaIntakeEntity> = {
      isActive: true,
    };

    // where-clause query
    let whereClause: FindOptionsWhere<PiaIntakeEntity>[] = [];

    // Scenario 1: As a user, retrieve all PIA-intakes I submitted
    whereClause.push({
      ...commonWhereClause,
      createdByGuid: user.idir_user_guid,
      status: Not(PiaIntakeStatusEnum.COMPLETE),
    });

    // Scenario 2: As an MPO, retrieve all pia-intakes submitted to my ministry for review
    // MPO only can see all the non-incomplete PIAs per requirement
    if (mpoMinistries?.length) {
      if (
        (query.filterByStatus &&
          query.filterByStatus === PiaIntakeStatusEnum.INCOMPLETE) ||
        (query.filterByMinistry &&
          !mpoMinistries.includes(query.filterByMinistry))
      ) {
        // skip this where clause
      } else {
        const allStatuses = Object.values(PiaIntakeStatusEnum);
        const exceptions = [
          PiaIntakeStatusEnum.INCOMPLETE, // can never see PIAs of other users in Incomplete status
          PiaIntakeStatusEnum.COMPLETE, // can only see complete if explicitly requested
        ];
        const statusIn = allStatuses.filter((s) => !exceptions.includes(s));
        whereClause.push({
          ...commonWhereClause,
          ministry: In(mpoMinistries),
          status: In(statusIn),
        });
      }
    }

    // Scenario 3: As a CPO, retrieve all pia-intakes in CPO_Review
    if (isCPO) {
      if (
        query.filterByStatus &&
        query.filterByStatus !== PiaIntakeStatusEnum.CPO_REVIEW
      ) {
        // skip this where clause
      } else {
        whereClause.push({
          ...commonWhereClause,
          status: PiaIntakeStatusEnum.CPO_REVIEW,
        });
      }
    }

    // Scenario 4: Return PIAs where user have gained access via the invite_code
    whereClause.push({
      ...commonWhereClause,
      invitee: {
        createdByGuid: user.idir_user_guid,
      },
      status: Not(PiaIntakeStatusEnum.COMPLETE),
    });

    // searchText logic - if there is a search text, find the matching titles OR drafter names
    if (query.searchText) {
      const searchOperator = ILike(`%${query.searchText}%`);
      const additionalWhereClauses: FindOptionsWhere<PiaIntakeEntity>[] = [];

      // for each where clause, replicate them for each of the search fields, considering all whereClause items goes to an OR find operation
      // In this case, each where clause to be replicated with two fields - one for titles search and other for drafterName search
      // updating existing whereClauses with title; and additionalWhereClauses with drafterName. Then, add all additionalWhereClauses to
      // ex: if whereClause is [{ status: MPO_REVIEW }] then after this loop, whereClause should be [{ status: MPO_REVIEW, title: ... }, { status: MPO_REVIEW, drafterName: ... }]
      // refer test case for additional understanding
      whereClause.forEach((clause) => {
        additionalWhereClauses.push({
          ...clause,
          drafterName: searchOperator,
        });

        clause.title = searchOperator;
      });

      whereClause.push(...additionalWhereClauses);
    }

    /** filter logic here */
    if (query.filterByStatus) {
      // by default, add status filter to all applicable where clauses
      // exception added in scenarios 2 and 3 above
      whereClause.forEach((clause) => {
        clause.status = query.filterByStatus;
      });
    }

    if (query.filterByMinistry) {
      // by default, add filter to all applicable where clauses
      // exception added in scenario 2 above
      whereClause.forEach((clause) => {
        clause.ministry = query.filterByMinistry;
      });
    }

    // filter by drafter sub scenario 1 check the filter to exclude my Pia
    if (
      query.filterPiaDrafterByCurrentUser &&
      query.filterPiaDrafterByCurrentUser ===
        PiaFilterDrafterByCurrentUserEnum.EXCLUDEMYPIAS
    ) {
      // include where clauses that does NOT include self submitted PIAs
      whereClause = whereClause.filter(
        (clause) => clause.createdByGuid !== user.idir_user_guid,
      );

      whereClause.forEach((clause) => {
        clause.createdByGuid = Not(user.idir_user_guid);
      });
    }
    // filter by drafter sub scenario 2 check the filter to get only my Pia
    if (
      query.filterPiaDrafterByCurrentUser &&
      query.filterPiaDrafterByCurrentUser ===
        PiaFilterDrafterByCurrentUserEnum.ONLYMYPIAS
    ) {
      // include where clauses that only includes self submitted PIAs
      whereClause = whereClause.filter(
        (clause) => clause.createdByGuid === user.idir_user_guid,
      );
    }

    // if whereClauses are empty after all the filtering, that means NO records can be shown
    // all records should at-least be filtered by role based
    // possibly some weird combinations of filters and roles selected;
    // one user can't access everything. NO super user yet.
    if (whereClause.length === 0) {
      return new PaginatedRO([], query.page, query.pageSize, 0);
    }

    /* ********** CONDITIONAL WHERE CLAUSE ENDS ********** */

    /* ********** SORT LOGIC BEGINS ********** */
    const orderBy: Partial<
      Record<PiaIntakeAllowedSortFieldsType, SortOrderEnum>
    > = {};

    // if sortBy is provided, sort the filtered records by the provided field
    // sortOrder can be as provided or by default descending
    // if no sortBy is provided, default sort applies - by latest createdAt
    if (query.sortBy) {
      // pia-intake-allowed-sort-fields contains the permitted sortBy fields
      orderBy[query.sortBy] = query.sortOrder;
    } else {
      orderBy.createdAt = SortOrderEnum.DESC;
    }
    /* ********** SORT LOGIC ENDS ********** */

    // Retrieve PIA Intake Entity Records
    const [entityRecords, total] = await this.piaIntakeRepository.findAndCount({
      where: whereClause,
      order: orderBy,
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });

    // Remove keys from the user's view that are not required
    const formattedRecords = entityRecords.map((record) =>
      getFormattedRecords(record),
    );

    const paginatedResult = new PaginatedRO(
      formattedRecords,
      query.page,
      query.pageSize,
      total,
    );

    // Return the formatted PIA intake records
    return paginatedResult;
  }

  async downloadPiaIntakeResultPdf(
    id: number,
    user: KeycloakUser,
    userRoles: RolesEnum[],
  ) {
    const piaIntakeForm = await this.findOneById(id, user, userRoles);

    const ministry = GovMinistries?.[piaIntakeForm.ministry]?.label;

    const pdfParsedData = {
      ...piaIntakeForm,
      ...{
        updatedAt: shortDate(piaIntakeForm.updatedAt),
        ministry: ministry || '',
        initiativeDescription: piaIntakeForm.initiativeDescription
          ? marked.parse(piaIntakeForm.initiativeDescription)
          : '',
        initiativeScope: piaIntakeForm.initiativeScope
          ? marked.parse(piaIntakeForm.initiativeScope)
          : '',
        dataElementsInvolved: piaIntakeForm.dataElementsInvolved
          ? marked.parse(piaIntakeForm.dataElementsInvolved)
          : '',
        riskMitigation: piaIntakeForm.riskMitigation
          ? marked.parse(piaIntakeForm.riskMitigation)
          : '',
      },
    };

    return pugToPdfBuffer(
      'src/modules/pia-intake/templates/pia-intake-result.pug',
      pdfParsedData,
    );
  }

  /**
   * ==== HELPER METHODS ====
   */
  async findOneBy(
    where: FindOptionsWhere<PiaIntakeEntity>,
  ): Promise<PiaIntakeEntity> {
    const piaIntakeForm: PiaIntakeEntity =
      await this.piaIntakeRepository.findOneBy(where);

    // If the record is not found, throw an exception
    if (!piaIntakeForm) {
      throw new NotFoundException();
    }

    return piaIntakeForm;
  }

  isCPO(userRoles: RolesEnum[]): boolean {
    if (userRoles.includes(RolesEnum.CPO)) return true;
    return false;
  }

  getMpoMinistriesByRoles(roles: RolesEnum[]) {
    let hasAnyMpoRole = false;

    // filter MPO related roles
    const mpoRoles: IRoleInfo[] = filterMpoRoles(roles);

    // if any one of the provided roles has MPO privileges
    if (mpoRoles.length > 0) {
      hasAnyMpoRole = true;
    }

    // create set of unique ministry names
    const mpoMinistries = new Set<GovMinistriesEnum>();

    // extract ministry names of the filtered MPO roles
    mpoRoles.forEach((mpoRole) => mpoMinistries.add(mpoRole.ministry));

    return {
      hasAnyMpoRole,
      mpoMinistries: Array.from(mpoMinistries),
    };
  }

  async validateUserAccess(
    user: KeycloakUser,
    userRoles: RolesEnum[],
    piaIntake: PiaIntakeEntity,
    inviteCode?: string,
  ) {
    if (!piaIntake.isActive) {
      throw new GoneException();
    }

    // Scenario 1: A self-submitted PIA
    if (user.idir_user_guid === piaIntake.createdByGuid) {
      return true;
    }

    // Scenario 2: PIA is submitted to the ministry I'm an MPO of
    const { mpoMinistries } = this.getMpoMinistriesByRoles(userRoles);
    if (mpoMinistries.includes(piaIntake.ministry)) {
      return true;
    }

    // Scenario 3: PIA is in CPO_REVIEW status
    // CPO can change a pia from CPO_REVIEW to MPO_Review
    const isCPO = this.isCPO(userRoles);
    if (
      isCPO &&
      (piaIntake.status === PiaIntakeStatusEnum.CPO_REVIEW ||
        piaIntake.status === PiaIntakeStatusEnum.MPO_REVIEW) // [UTOPIA-1112] fix cpo update pia status throw 403 error #1187;; WRONG FIX. If the status is changed other than CPO_Review.. user should be taken to a different page
      // currently user sees CPO_Review in their list; but can access MPO_Review also, if given direct link
      // TODO to be fixed
    ) {
      return true;
    }

    // Scenario 4: PIA is accessed by an invitee [once added by an invite code]
    const inviteeToPia = await this.inviteesService.findOneByUserAndPia(
      user,
      piaIntake.id,
    );

    // if invitee exists for the pia, allow access
    if (inviteeToPia) {
      return true;
    }

    // Scenario 5: PIA is accessed by a valid invite code
    if (inviteCode) {
      // validate the invite code
      const invite = await this.invitesService.findOne(
        piaIntake.id,
        inviteCode,
      );

      // if valid, add the user to the invitee list of the PIA
      if (invite) {
        await this.inviteesService.create(piaIntake, invite, user);

        // provide access
        return true;
      }
    }

    // Throw Forbidden user access if none of the above scenarios are met
    throw new ForbiddenException();
  }

  /** PREREQUISITE - Always validate if the user has access to the PIA record */
  getRoleAccess(userRoles: RolesEnum[]): UserTypesEnum[] {
    /**
     * WHo are Drafters and MPOs? And what roles can each access
     *
     * -- initial logic -- Dec '2022
     * You're a DRAFTER Role - if you are creating the PIA [doesn't matter if you're an MPO of ANY ministry]
     * Else you're an MPO Role - if the created PIA is submitted to the ministry you're an MPO of
     * Else throw Forbidden Exception
     *
     * -- Updated logic -- March 13 '2023 -- https://apps.itsm.gov.bc.ca/jira/browse/UTOPIA-908
     * You're an MPO Role - if you are MPO of ANY ministry
     * Else You're a DRAFTER Role
     * Note: Reversing to check MPO first and then Drafter also enables MPOs who are drafting a PIA for a different ministry to edit MPO specific fields
     *
     * -- May 5 '23 -- included CPO role check
     *
     * -- Jun 14 '23 -- user can have multiple accesses [like MPO and CPO]
     */

    const accessTypes: UserTypesEnum[] = [];
    const { mpoMinistries } = this.getMpoMinistriesByRoles(userRoles);

    if (mpoMinistries.length > 0) {
      accessTypes.push(UserTypesEnum.MPO);
    }

    if (this.isCPO(userRoles)) {
      accessTypes.push(UserTypesEnum.CPO);
    }

    if (accessTypes.length === 0) {
      accessTypes.push(UserTypesEnum.DRAFTER);
    }

    return accessTypes;
  }

  /**
   * @method updateSubmittedAt
   *
   * @description
   * This method will update submittedAt column in pia-intake table for the first time the drafter submit their pia
   */
  updateSubmittedAt = (dto: CreatePiaIntakeDto | UpdatePiaIntakeDto) => {
    if (!dto.submittedAt && dto.status === PiaIntakeStatusEnum.MPO_REVIEW)
      dto.submittedAt = new Date();
  };

  updateReviewField = (
    updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
    storedValue: PiaIntakeEntity,
  ) => {
    const updatedReview: Review = updatedValue?.review;

    if (!updatedReview) return;

    updatedValue.review = { ...storedValue?.review, ...updatedValue?.review };
  };

  updateProgramAreaReviews = (
    updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
    storedValue: PiaIntakeEntity,
    user: KeycloakUser,
  ) => {
    const updatedReview: Review = updatedValue?.review;
    const storedReview: Review = storedValue?.review;

    const updatedProgramAreaReviews = updatedReview?.programArea?.reviews || {};
    const storedProgramAreaReviews = storedReview?.programArea?.reviews || null;

    if (Object.keys(updatedProgramAreaReviews).length === 0) {
      return;
    }

    Object.keys(updatedProgramAreaReviews).forEach((key) => {
      if (!updatedReview?.programArea?.selectedRoles.includes(key)) {
        throw new BadRequestException({
          message:
            'Invalid request: Reviewer not available in selectedRoles list',
        });
      }

      this.updateReviewSubmissionFields(
        updatedProgramAreaReviews,
        storedProgramAreaReviews,
        user,
        key,
        [PiaIntakeStatusEnum.FINAL_REVIEW],
        { ...storedValue, ...updatedValue }.status,
      );
    });
  };

  /**
   * @method updateReviewSubmissionFields
   * @description
   * This method updates the dto with the submission related fields, which needs to be filled in by the server based on the user logged in
   */
  updateReviewSubmissionFields = (
    updatedValue: Review | Record<string, ProgramAreaSelectedRolesReview>, // add more types here
    storedValue: Review | Record<string, ProgramAreaSelectedRolesReview>,
    user: KeycloakUser,
    key: 'mpo' | string,
    allowedInSpecificStatus?: PiaIntakeStatusEnum[] | null,
    updatedStatus?: PiaIntakeStatusEnum,
  ) => {
    if (!updatedValue?.[key]) return;

    // overwrite the updated values to include the stored fields that may not be passed by the client
    if (updatedValue?.[key]) {
      updatedValue[key] = {
        ...(storedValue?.[key] || {}),
        ...updatedValue?.[key],
      };
    }

    // Scenario 1: User is saving review information for the first time [First time save]
    // Scenario 2: User is saving review information for the subsequent times [Editing]

    // Either ways, if the value is changed from the stored one, update the submission fields
    if (
      storedValue?.[key]?.isAcknowledged !==
        updatedValue?.[key]?.isAcknowledged ||
      storedValue?.[key]?.reviewNote !== updatedValue?.[key]?.reviewNote
    ) {
      // if it is not the same person updating the fields, throw forbidden error
      if (
        storedValue?.[key]?.reviewedByGuid &&
        storedValue?.[key]?.reviewedByGuid !== user.idir_user_guid
      ) {
        throw new ForbiddenException({
          message: `You do not have permissions to edit this review.`,
        });
      }

      if (
        allowedInSpecificStatus &&
        updatedStatus &&
        !allowedInSpecificStatus.includes(updatedStatus)
      ) {
        throw new ForbiddenException({
          message: 'You do not permissions to update review in this status',
        });
      }

      // if first time reviewed
      if (!storedValue?.[key]?.reviewedByGuid) {
        updatedValue[key].reviewedAt = new Date();
        updatedValue[key].reviewedByGuid = user.idir_user_guid;
        updatedValue[key].reviewedByUsername = user.idir_username;
        updatedValue[key].reviewedByDisplayName = user.display_name;
      }

      // update last review updated at
      updatedValue[key].reviewLastUpdatedAt = new Date();
    }
  };

  getPiaType(
    updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
    storedValue: PiaIntakeEntity,
  ) {
    const updatedEntity: PiaIntakeEntity = { ...storedValue, ...updatedValue };

    if (updatedEntity?.hasAddedPiToDataElements === false) {
      return PiaTypesEnum.DELEGATE_REVIEW;
    } else {
      return PiaTypesEnum.STANDARD;
    }
  }

  /**
   * @method validateJsonbFields
   *
   * @param userType - type of the logged in user
   * It can be DRAFTER when initially creating the PIA or while editing it
   * It shall also be DRAFTER when an MPO is drafting a PIA
   * It can be MPO when MPO is reviewing someone else's PIA
   *
   * @description
   * This method validates role access to the following fields, if needed:
   * 1. collectionUseAndDisclosure
   * 2. storingPersonalInformation
   * 3. securityPersonalInformation
   * 4. accuracyCorrectionAndRetention
   * 5. personalInformationBanks
   * 6. additionalRisks
   * 7. ppq
   * 8. review
   */
  validateJsonbFields(
    updatedValue: CreatePiaIntakeDto | UpdatePiaIntakeDto,
    storedValue: PiaIntakeEntity,
    userType: UserTypesEnum[],
  ) {
    validateRoleForCollectionUseAndDisclosure(
      updatedValue?.collectionUseAndDisclosure,
      storedValue?.collectionUseAndDisclosure,
      userType,
    );

    validateRoleForReview(updatedValue?.review, storedValue?.review, userType);

    validateRoleForPPq(updatedValue?.ppq, storedValue?.ppq, userType);

    // ... space for future validators, as needed
  }

  // wrapper | convenient method that validates access and returns PIA
  async validatePiaAccess(
    piaId: number,
    user: KeycloakUser,
    userRoles: Array<RolesEnum>,
  ): Promise<PiaIntakeEntity> {
    // Fetch the record by ID
    const pia = await this.findOneBy({ id: piaId });

    // Validate if the user has access to the pia-intake form
    await this.validateUserAccess(user, userRoles, pia);

    // return pia once validated
    return pia;
  }
}
