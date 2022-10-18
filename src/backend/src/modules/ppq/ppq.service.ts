import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PiaComplexity } from '../../common/enums/pia-complexity.enum';
import { Repository } from 'typeorm';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqEntity } from './entities/ppq.entity';
import { PpqResultRO } from './ro/ppq-result.ro';

@Injectable()
export class PpqService {
  constructor(
    @InjectRepository(PpqEntity) private ppqRepository: Repository<PpqEntity>,
  ) {}

  async createPpq(body: PpqPostDTO): Promise<PpqResultRO> {
    const ppqForm: PpqEntity = await this.ppqRepository.save({ ...body });

    const result: PpqResultRO = await this.getPpqResult(ppqForm);

    return result;
  }

  async getPpqResult(ppqForm): Promise<PpqResultRO> {
    let complexity = PiaComplexity.LOW;

    // if user is sure of having personal information, it is at-least Standard
    if (ppqForm.containsPersonalInformation === true) {
      complexity = PiaComplexity.STANDARD;
    }

    // if user is unsure, PIA is high complexity
    if (ppqForm.containsPersonalInformation === null) {
      complexity = PiaComplexity.HIGH;
    }

    // if any of the below factors is true, PIA is high complexity
    const otherFactors = [
      ppqForm.hasSensitivePersonalInformation,
      ppqForm.hasSharingOfPersonalInformation,
      ppqForm.hasProgramAgreement,
      ppqForm.hasOthersAccessToPersonalInformation,
      ppqForm.hasCloudTechnology,
      ppqForm.hasPotentialPublicInterest,
      ppqForm.hasDisclosureOutsideOfCanada,
      ppqForm.hasHighVolumesPersonalInformation,
      ppqForm.hasDataLinking,
      ppqForm.hasBcServicesCardOnboarding,
      ppqForm.hasAiOrMl,
      ppqForm.hasPartnershipNonMinistry,
    ];

    if (otherFactors.some((factor) => factor === true)) {
      complexity = PiaComplexity.HIGH;
    }

    const resultRO: PpqResultRO = {
      id: ppqForm.id,
      complexity,
    };

    return resultRO;
  }
}
