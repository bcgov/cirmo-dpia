import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, In, Repository } from 'typeorm';
import { marked } from 'marked';

import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';
import { GovMinistries } from '../../common/constants/gov-ministries.constant';
import { KeycloakUser } from '../auth/keycloak-user.model';
import { PiaIntakeEntity } from './entities/pia-intake.entity';
import { pugToPdfBuffer } from '../../common/helpers/pdf-helper';
import { shortDate } from '../../common/helpers/date-helper';
import { UpdatePiaIntakeDto } from './dto/update-pia-intake.dto';
import { RolesEnum } from 'src/common/enums/roles.enum';
import { filterMpoRoles } from 'src/common/helpers/roles.helper';
import { IRoleInfo } from 'src/common/constants/roles.constants';

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

  /**
   * Boilerplate methods: Update appropriately when needed
   */
  update(id: number, updatePiaIntakeDto: UpdatePiaIntakeDto) {
    return `This action updates a #${id} piaIntake by ${updatePiaIntakeDto.drafterEmail}`;
  }

  remove(id: number) {
    return `This action removes a #${id} piaIntake`;
  }

  async findOne(id: number): Promise<PiaIntakeEntity> {
    const piaIntakeForm: PiaIntakeEntity =
      await this.piaIntakeRepository.findOneBy({ id });

    return piaIntakeForm;
  }

  /**
   *@method findAll
   *
   * @param
   * - user KeycloakUser
   * - userRoles Keycloak user roles
   *
   * @returns
   * As a user, retrieve all PIA-intakes I submitted
   * As an MPO, retrieve all pia-intakes submitted to my ministry for review
   */
  async findAll(
    user: KeycloakUser,
    userRoles: RolesEnum[],
  ): Promise<PiaIntakeEntity[]> {
    // filter MPO related roles and corresponding ministries from existing role set
    const userMpoRoles: IRoleInfo[] = filterMpoRoles(userRoles);
    const userMpoRolesMinistries = userMpoRoles.map(
      (userMpoRole) => userMpoRole.ministry,
    );

    // common ministry clause for all possible OR conditions
    const commonWhereClause: FindOptionsWhere<PiaIntakeEntity> = {
      isActive: true,
    };

    // where-clause query
    const whereClause: FindOptionsWhere<PiaIntakeEntity>[] = [];

    // Scenario 1: As a user, retrieve all PIA-intakes I submitted
    whereClause.push({
      ...commonWhereClause,
      createdByGuid: user.idir_user_guid,
    });

    // Scenario 2: As an MPO, retrieve all pia-intakes submitted to my ministry for review
    if (userMpoRoles?.length) {
      whereClause.push({
        ...commonWhereClause,
        ministry: In(userMpoRolesMinistries),
      });
    }

    const data: PiaIntakeEntity[] = await this.piaIntakeRepository.find({
      where: whereClause,
      order: {
        createdAt: -1, // default order set to latest submission time
      },
    });

    return data;
  }

  async downloadPiaIntakeResultPdf(id: number) {
    const piaIntakeForm = await this.findOne(id);

    if (!piaIntakeForm) {
      return null;
    }

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
}
