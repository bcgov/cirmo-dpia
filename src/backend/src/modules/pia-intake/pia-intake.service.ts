import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, ILike, Repository, Not, IsNull } from 'typeorm';
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
import { GetPiaIntakeRO } from './ro/get-pia-intake.ro';
import { omitBaseKeys } from '../../common/helpers/base-helper';
import { UpdatePiaIntakeDto } from './dto/update-pia-intake.dto';
import { PiaIntakeFindQuery } from './dto/pia-intake-find-query.dto';
import { PaginatedRO } from 'src/common/paginated.ro';
import { SortOrderEnum } from 'src/common/enums/sort-order.enum';
import { PiaFilterDrafterByCurrentUserEnum } from './enums/pia-filter-drafter-by-current-user.enum';

@Injectable()
export class PiaIntakeService {
  constructor(
    @InjectRepository(PiaIntakeEntity)
    private piaIntakeRepository: Repository<PiaIntakeEntity>,
  ) {}

  async create(
    createPiaIntakeDto: CreatePiaIntakeDto,
    user: KeycloakUser,
  ): Promise<GetPiaIntakeRO> {
    const piaInfoForm: PiaIntakeEntity = await this.piaIntakeRepository.save({
      ...createPiaIntakeDto,
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      drafterEmail: user.email, // although the email will come filled in to the form, this is an added check to ensure user did not modify it
    });

    const formattedPiaInfoForm: GetPiaIntakeRO =
      omitBaseKeys<PiaIntakeEntity>(piaInfoForm);

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
    this.validateUserAccess(user, userRoles, existingRecord);

    // check if the user is not acting on / updating a stale version
    if (existingRecord.saveId !== updatePiaIntakeDto.saveId) {
      throw new ConflictException(
        'You may not have an updated version of the document',
      );
    }

    // remove the provided saveId
    delete updatePiaIntakeDto.saveId;

    // update the record with the provided keys [using save instead of update updates the @UpdateDateColumn]
    await this.piaIntakeRepository.save({
      id,
      ...updatePiaIntakeDto,
      saveId: existingRecord.saveId + 1,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
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
  ): Promise<GetPiaIntakeRO> {
    // Fetch the record by ID
    const piaIntakeForm = await this.findOneBy({ id });

    // Validate if the user has access to the pia-intake form
    this.validateUserAccess(user, userRoles, piaIntakeForm);

    // Remove keys from the user's view that are not required
    const formattedRecords: GetPiaIntakeRO =
      omitBaseKeys<PiaIntakeEntity>(piaIntakeForm);

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
    });

    // Scenario 2: As an MPO, retrieve all pia-intakes submitted to my ministry for review
    if (mpoMinistries?.length) {
      whereClause.push({
        ...commonWhereClause,
        ministry: In(mpoMinistries),
      });
    }
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
      whereClause.forEach((clause) => {
        clause.status = query.filterByStatus;
      });
    }
    if (query.filterByMinistry) {
      whereClause.forEach((clause) => {
        if (mpoMinistries.includes(query.filterByMinistry))
          clause.ministry = query.filterByMinistry;
        else {
          // there are two ways a user can reach the else condition:
          // 1. if user is filtering if they are not an MPO for any ministry [simply a drafter]
          // 2. if user is filtering for ministry they are not MPO of

          // for scenario 2, this query clause will have issue
          // if you are drafter of pia submit to this ministry but you are not
          // the mpo of this ministry, you will not see your draft PIAs

          // adding ministry as null will override ministry set from line #172 [scenario 2] ministry: In(mpoMinistries)
          clause.ministry = IsNull();

          // However, adding ministry - null will also fetch pia which are partially saved and have actually ministry = null
          // hence adding a check to include self records [#known limitation - similar to scenario 1]
          // #TODO - come up with better solution
          clause.createdByGuid = user.idir_user_guid;
        }
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
    /* ********** CONDITIONAL WHERE CLAUSE ENDS ********** */

    /* ********** SORT LOGIC BEGINS ********** */
    const orderBy: Partial<Record<keyof PiaIntakeEntity, SortOrderEnum>> = {};

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
    const formattedRecords: GetPiaIntakeRO[] = entityRecords.map((record) =>
      omitBaseKeys<PiaIntakeEntity>(record),
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
        updatedAt: shortDate(piaIntakeForm.createdAt),
        ministry: ministry || 'N/A',
        initiativeDescription: marked.parse(
          piaIntakeForm.initiativeDescription,
        ),
        initiativeScope: marked.parse(piaIntakeForm.initiativeScope),
        dataElementsInvolved: marked.parse(piaIntakeForm.dataElementsInvolved),
        riskMitigation: piaIntakeForm.riskMitigation
          ? marked.parse(piaIntakeForm.riskMitigation)
          : null,
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

  validateUserAccess(
    user: KeycloakUser,
    userRoles: RolesEnum[],
    piaIntake: PiaIntakeEntity,
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

    // Throw Forbidden user access if none of the above scenarios are met
    throw new ForbiddenException();
  }
}
