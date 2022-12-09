import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { IRequest } from 'src/common/interfaces/request.interface';
import { IResponse } from 'src/common/interfaces/response.interface';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqService } from './ppq.service';
import { PpqResultRO } from './ro/ppq-result.ro';

@Controller('ppq')
@ApiTags('PPQ')
@ApiBearerAuth()
export class PpqController {
  constructor(private readonly ppqService: PpqService) {}

  @Post()
  @ApiOperation({ description: 'Submit the ppq form' })
  @ApiCreatedResponse({
    description: 'Successfully submitted the PPQ form',
  })
  async postForm(
    @Body() body: PpqPostDTO,
    @Req() req: IRequest,
  ): Promise<PpqResultRO> {
    return this.ppqService.createPpq(body, req.user);
  }

  @Get('/download/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ description: 'Download PPQ result pdf by id' })
  @ApiOkResponse({ description: 'Successfully downloaded the PPQ result form' })
  @ApiNotFoundResponse({ description: 'PPQ Id not found' })
  @HttpCode(HttpStatus.OK)
  async downloadResult(
    @Param('id') id,
    @Req() req: IRequest,
    @Res() res: IResponse,
  ) {
    const pdfBuffer = await this.ppqService.downloadPpqResultPdf(id);
    if (!pdfBuffer) {
      throw new NotFoundException();
    }

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=result.pdf');

    res.send(pdfBuffer);
  }
}
