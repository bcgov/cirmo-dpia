import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { marked } from 'marked';
import * as pug from 'pug';
import * as Puppeteer from 'puppeteer';

import { GovMinistries } from '../../common/constants/gov-ministries.constant';
import { PiaTypes } from '../../common/constants/pia-types.constant';
import { PpqEntity } from './entities/ppq.entity';
import { PpqOtherFactors } from './constants/ppq-other-factors.constant';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqResultRO } from './ro/ppq-result.ro';
import { shortDate } from '../../common/helpers/date-helper';

@Injectable()
export class PpqService {
  constructor(
    @InjectRepository(PpqEntity) private ppqRepository: Repository<PpqEntity>,
  ) {}

  async getPpqById(id: number): Promise<PpqEntity> {
    const ppqForm: PpqEntity = await this.ppqRepository.findOneBy({ id });

    return ppqForm;
  }

  async createPpq(body: PpqPostDTO): Promise<PpqResultRO> {
    const ppqForm: PpqEntity = await this.ppqRepository.save({ ...body });

    return { id: ppqForm.id };
  }

  async downloadPpqResultPdf(id: number) {
    const ppqForm = await this.getPpqById(id);

    if (!ppqForm) {
      return null;
    }

    // Get base result pug template
    const compiledResultTemplateFunction = pug.compileFile(
      'src/modules/ppq/templates/ppq-result.pug',
    );

    // Format values to feed into the pdf
    const ministry = GovMinistries.find(
      (m) => m.value === ppqForm.ministry,
    )?.label;

    const piaType = PiaTypes.find(
      (type) => type.value === ppqForm.piaType,
    )?.label;

    const otherFactors = PpqOtherFactors.filter(
      (factor) => ppqForm[factor.value] === true,
    ).map((factor) => factor.label);

    // Compile the pug template with the custom values
    const html = compiledResultTemplateFunction({
      ...ppqForm,
      ...{
        updatedAt: shortDate(ppqForm.updatedAt),
        ministry: ministry || 'NA',
        piaType: piaType || 'N/A',
        proposedStartDate: ppqForm.proposedStartDate
          ? shortDate(ppqForm.proposedStartDate)
          : 'N/A',
        initiativeDescription: marked.parse(ppqForm.description),
        otherFactors,
      },
    });

    // open headless browser and create page
    const browser = await Puppeteer.launch({
      headless: true,
      args: ['--disable-dev-shm-usage', '--no-sandbox'],
    });
    const page = await browser.newPage();

    // Update content to custom content
    await page.setContent(html);

    // convert page to pdf buffer
    const pdfBuffer: Buffer = await page.pdf();

    // cleanups
    await page.close();
    await browser.close();

    // return the pdf buffer
    return pdfBuffer;
  }
}
