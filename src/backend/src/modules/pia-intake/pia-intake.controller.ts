import {
  Controller,
  Post,
  Body,
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

import { IRequest } from '../../common/interfaces/request.interface';
import { IResponse } from '../../common/interfaces/response.interface';

import { PiaIntakeService } from './pia-intake.service';
import { CreatePiaIntakeDto } from './dto/create-pia-intake.dto';
import { CreatePiaIntakeRO } from './ro/create-pia-intake.ro';

@Controller('pia-intake')
@ApiTags('pia-intake')
@ApiBearerAuth()
export class PiaIntakeController {
  constructor(private readonly piaIntakeService: PiaIntakeService) {}

  @Post()
  @ApiOperation({ description: 'Submit a PIA-intake form' })
  @ApiCreatedResponse({
    description: 'Successfully submitted a PIA-intake form',
  })
  async create(
    @Body() createPiaIntakeDto: CreatePiaIntakeDto,
    @Req() req: IRequest,
  ): Promise<CreatePiaIntakeRO> {
    return this.piaIntakeService.create(createPiaIntakeDto, req.user);
  }

  /**
   * @method findAll
   *
   * @description
   * This method will return all the pia-intakes matching the following criteria by default
   * - user's self submitted pia-intakes
   * - if mpo, all pia-intakes submitted in the user's ministry
   */
  @Get()
  @ApiOperation({
    description: 'Fetches the list of PIA intakes I am authorized',
  })
  @ApiOkResponse({
    description: 'Successfully fetched authorized PIA intake records',
  })
  async findAll(@Req() req: IRequest) {
    const data = await this.piaIntakeService.findAll(req.user, req.userRoles);

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
    @Req() req: IRequest,
    @Res() res: IResponse,
  ) {
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
