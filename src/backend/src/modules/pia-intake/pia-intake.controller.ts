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

import { AuthService } from '../auth/auth.service';
import { PiaIntakeService } from './pia-intake.service';
import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';
import { TokenDecorator } from '../../common/decorators/token.decorator';

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

  /**
   * @method findAll
   *
   * @description
   * This method will return all the pia-intakes matching the following criteria by default
   * - user's self submitted pia-intakes
   * - [#TODO UTOPIA-482] if mpo, all pia-intakes submitted in the user's ministry
   */
  @Get()
  @ApiOperation({ description: 'Fetches the list of PIA intakes' })
  @ApiOkResponse({
    description: 'Successfully fetched the PIA intake records',
  })
  async findAll(@TokenDecorator() accessToken: string) {
    if (!accessToken) {
      throw new UnauthorizedException();
    }

    const user = await this.authService.getUserInfo(accessToken);
    const data = await this.piaIntakeService.findAll(user);

    return { data };
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
