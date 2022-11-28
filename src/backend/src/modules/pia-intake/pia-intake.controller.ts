import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  Get,
  HttpCode,
  Param,
  Req,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { PiaIntakeService } from './pia-intake.service';
import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
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
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';
import { AuthService } from '../auth/auth.service';

@Controller('pia-intake')
@ApiTags('pia-intake')
@ApiBearerAuth()
export class PiaIntakeController {
  constructor(
    private readonly piaIntakeService: PiaIntakeService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  @ApiOperation({ description: 'Submit a PIA-intake form' })
  @ApiCreatedResponse({
    description: 'Successfully submitted a PIA-intake form',
  })
  async create(
    @Body() createPiaIntakeDto: CreatePiaIntakeDto,
    @TokenDecorator() accessToken: string,
  ): Promise<CreatePiaIntakeRO> {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserInfo(accessToken);
    return this.piaIntakeService.create(createPiaIntakeDto, user);
  }

  @Get('/download/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ description: 'Download PIA intake result pdf by id' })
  @ApiOkResponse({
    description: 'Successfully downloaded the PIA intake result form',
  })
  @ApiNotFoundResponse({ description: 'PIA intake form Id not found' })
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

    const pdfBuffer = await this.piaIntakeService.downloadPiaIntakeResultPdf(
      id,
    );

    if (!pdfBuffer) {
      throw new NotFoundException();
    }

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=result.pdf');

    res.send(pdfBuffer);
  }
}
