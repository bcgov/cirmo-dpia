import {
  ForbiddenException,
  GoneException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, ILike, Repository } from 'typeorm';
import { marked } from 'marked';

import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';
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

@Injectable()
export class PiaIntakeService {
  constructor(
    @InjectRepository(PiaIntakeEntity)
    private piaIntakeRepository: Repository<PiaIntakeEntity>,
  ) {}

  async create(
    createPiaIntakeDto: CreatePiaIntakeDto,
    user: KeycloakUser,
  ): Promise<CreatePiaIntakeRO> {
    const piaInfoForm: PiaIntakeEntity = await this.piaIntakeRepository.save({
      ...createPiaIntakeDto,
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      drafterEmail: user.email, // although the email will come filled in to the form, this is an added check to ensure user did not modify it
    });

    return { id: piaInfoForm.id };
  }

  async update(
    id: number,
    updatePiaIntakeDto: UpdatePiaIntakeDto,
    user: KeycloakUser,
    userRoles: RolesEnum[],
  ) {
    // Fetch the existing record by ID
    const existingRecord = await this.findOneBy({ id });

    // Validate if the user has access to the pia-intake form. Throw appropriate exceptions if not
    this.validateUserAccess(user, userRoles, existingRecord);

    // update the record with the provided keys
    await this.piaIntakeRepository.update({ id }, { ...updatePiaIntakeDto });
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
  ): Promise<GetPiaIntakeRO[]> {
    // Get the ministries for which the user is an MPO based on their roles
    const { mpoMinistries } = this.getMpoMinistriesByRoles(userRoles);

    /* ********** CONDITIONAL WHERE CLAUSE BEGINS ********** */
    // common clause for all possible OR conditions
    const commonWhereClause: FindOptionsWhere<PiaIntakeEntity> = {
      isActive: true,
    };

    // where-clause query
    const whereClause: FindOptionsWhere<PiaIntakeEntity>[] = [];

    // Scenario 1: myPiaClause: As a user, retrieve all PIA-intakes I submitted
    const myPiaClause = {
      ...commonWhereClause,
      createdByGuid: user.idir_user_guid,
    };

    // if there is a search text, find the matching titles OR drafter names
    if (query.searchText) {
      whereClause.push({
        ...myPiaClause,
        title: ILike(`%${query.searchText}%`),
      });

      whereClause.push({
        ...myPiaClause,
        drafterName: ILike(`%${query.searchText}%`),
      });
    } else {
      whereClause.push(myPiaClause);
    }

    // Scenario 2: mpoClause: As an MPO, retrieve all pia-intakes submitted to my ministry for review
    if (mpoMinistries?.length) {
      const mpoClause = {
        ...commonWhereClause,
        ministry: In(mpoMinistries),
      };

      // if there is a search text, find the matching titles OR drafter names
      if (query.searchText) {
        whereClause.push({
          ...mpoClause,
          title: ILike(`%${query.searchText}%`),
        });

        whereClause.push({
          ...mpoClause,
          drafterName: ILike(`%${query.searchText}%`),
        });
      } else {
        whereClause.push(mpoClause);
      }
    }
    /* ********** CONDITIONAL WHERE CLAUSE ENDS ********** */

    // Retrieve PIA Intake Entity Records
    const entityRecords: PiaIntakeEntity[] =
      await this.piaIntakeRepository.find({
        where: whereClause,
        order: {
          createdAt: -1, // default order set to latest submission time
        },
      });

    // Remove keys from the user's view that are not required
    const formattedRecords: GetPiaIntakeRO[] = entityRecords.map((record) =>
      omitBaseKeys<PiaIntakeEntity>(record),
    );

    // Return the formatted PIA intake records
    return formattedRecords;
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
