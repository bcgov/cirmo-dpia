import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqService } from './ppq.service';
import { PpqResultRO } from './ro/ppq-result.ro';

@Controller('ppq')
@ApiTags('PPQ')
export class PpqController {
  constructor(private readonly ppqService: PpqService) {}

  @Post()
  @ApiOperation({ description: 'Submit the ppq form' })
  @ApiOkResponse({
    description: 'Successfully submitted the PPQ form',
  })
  async postForm(@Body() body: PpqPostDTO): Promise<PpqResultRO> {
    return this.ppqService.createPpq(body);
  }

  @Get('/download/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ description: 'download PPQ result by id' })
  @ApiOkResponse({ description: 'Successfully downloaded the PPQ result form' })
  @ApiNotFoundResponse({ description: 'PPQ Id not found' })
  @HttpCode(HttpStatus.OK)
  async downloadResult(@Param('id') id, @Res() res: Response) {
    const pdfBuffer = await this.ppqService.downloadPpqResultPdf(id);
    if (!pdfBuffer) {
      throw new NotFoundException();
    }

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=result.pdf');

    res.send(pdfBuffer);
  }
}
