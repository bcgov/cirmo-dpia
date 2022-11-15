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
  UnauthorizedException,
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
import { Request, Response } from 'express';
import { TokenDecorator } from '../../common/decorators/token.decorator';
import { AuthService } from '../auth/auth.service';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqService } from './ppq.service';
import { PpqResultRO } from './ro/ppq-result.ro';

@Controller('ppq')
@ApiTags('PPQ')
@ApiBearerAuth()
export class PpqController {
  constructor(
    private readonly ppqService: PpqService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Submit the ppq form' })
  @ApiCreatedResponse({
    description: 'Successfully submitted the PPQ form',
  })
  async postForm(
    @Body() body: PpqPostDTO,
    @Req() req: Request,
    @TokenDecorator() accessToken: string,
  ): Promise<PpqResultRO> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserInfo(accessToken);
    return this.ppqService.createPpq(body, user);
  }

  @Get('/download/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ description: 'download PPQ result by id' })
  @ApiOkResponse({ description: 'Successfully downloaded the PPQ result form' })
  @ApiNotFoundResponse({ description: 'PPQ Id not found' })
  @HttpCode(HttpStatus.OK)
  async downloadResult(
    @Param('id') id,
    @Req() req: Request,
    @Res() res: Response,
    @TokenDecorator() accessToken: string,
  ) {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const pdfBuffer = await this.ppqService.downloadPpqResultPdf(id);
    if (!pdfBuffer) {
      throw new NotFoundException();
    }

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=result.pdf');

    res.send(pdfBuffer);
  }
}
