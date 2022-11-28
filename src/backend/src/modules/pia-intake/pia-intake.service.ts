import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { KeycloakUser } from '../auth/keycloak-user.model';
import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import { UpdatePiaIntakeDto } from './dto/update-pia-intake.dto';
import { PiaIntakeEntity } from './entities/pia-intake.entity';
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';
import { GovMinistries } from 'src/common/constants/gov-ministries.constant';
import { shortDate } from 'src/common/helpers/date-helper';
import { marked } from 'marked';
import { pugToPdfBuffer } from '../../common/helpers/pdf-helper';

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
  findAll() {
    return `This action returns all piaIntake`;
  }

  findOne(id: number) {
    return `This action returns a #${id} piaIntake`;
  }

  update(id: number, updatePiaIntakeDto: UpdatePiaIntakeDto) {
    return `This action updates a #${id} piaIntake by ${updatePiaIntakeDto.drafterEmail}`;
  }

  remove(id: number) {
    return `This action removes a #${id} piaIntake`;
  }

  async getPiaIntakeById(id: number): Promise<PiaIntakeEntity> {
    const piaIntakeForm: PiaIntakeEntity =
      await this.piaIntakeRepository.findOneBy({ id });

    return piaIntakeForm;
  }

  async downloadPiaIntakeResultPdf(id: number) {
    const piaIntakeForm = await this.getPiaIntakeById(id);

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
          : 'N/A',
      },
    };

    return pugToPdfBuffer(
      'src/modules/pia-intake/templates/pia-intake-result.pug',
      pdfParsedData,
    );
  }
}
