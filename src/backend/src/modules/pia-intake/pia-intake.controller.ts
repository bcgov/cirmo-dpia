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
  InternalServerErrorException,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiGoneResponse,
  ApiInternalServerErrorResponse,
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
import { GetPiaIntakeRO } from './ro/get-pia-intake.ro';
import { UpdatePiaIntakeDto } from './dto/update-pia-intake.dto';
import { PiaIntakeFindQuery } from './dto/pia-intake-find-query.dto';

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
  ): Promise<GetPiaIntakeRO> {
    return this.piaIntakeService.create(createPiaIntakeDto, req.user);
  }

  /**
   * @method findAll
   *
   * @description
   * This method will return all the pia-intakes matching the following criteria by default
   * - user's self submitted pia-intakes
   * - if mpo, all pia-intakes submitted in the user's ministry
   * - filters:
   *   - searchText: string [on drafterName and title]
   */
  @Get()
  @ApiOperation({
    description: 'Fetches the list of PIA intakes I am authorized',
  })
  @ApiOkResponse({
    description: 'Successfully fetched authorized PIA intake records',
  })
  async findAll(@Req() req: IRequest, @Query() query: PiaIntakeFindQuery) {
    const paginatedData = await this.piaIntakeService.findAll(
      req.user,
      req.userRoles,
      query,
    );

    return paginatedData;
  }

  /**
   * @method findOneById
   *
   * @description
   * This method will return the requested pia-intake by id, pertaining the role access
   *
   * @param pia_intake_id
   *
   * @returns pia-intake object
   */
  @Get(':id')
  @ApiOperation({
    description: 'Fetches the PIA Intake entity based on the provided ID',
  })
  @ApiOkResponse({
    description: 'Successfully fetched the PIA intake',
  })
  @ApiNotFoundResponse({
    description: 'Failed to fetch the PIA: The record not found',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to fetch the PIA: User does not have sufficient role access to view this record',
  })
  @ApiGoneResponse({
    description:
      'Failed to fetch the PIA: The record is marked inactive in our system',
  })
  async findOneById(
    @Param('id') id: number,
    @Req() req: IRequest,
  ): Promise<{ data: GetPiaIntakeRO }> {
    const data = await this.piaIntakeService.findOneById(
      id,
      req.user,
      req.userRoles,
    );

    return { data };
  }

  @Get('/download/:id')
  @ApiParam({ name: 'id', type: Number, required: true })
  @ApiOperation({ description: 'Download PIA intake result pdf by id' })
  @ApiOkResponse({
    description: 'Successfully downloaded the PIA intake result form',
  })
  @ApiNotFoundResponse({
    description: 'Failed to download the PIA: Form Id not found',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to download the PIA: User does not have sufficient role access',
  })
  @ApiGoneResponse({
    description:
      'Failed to download the PIA: The record is marked inactive in our system',
  })
  @ApiInternalServerErrorResponse({
    description:
      'Failed to download the PIA: The record was found, however the server could not create a pdf buffer',
  })
  @HttpCode(HttpStatus.OK)
  async downloadResult(
    @Param('id') id,
    @Req() req: IRequest,
    @Res() res: IResponse,
  ) {
    const pdfBuffer = await this.piaIntakeService.downloadPiaIntakeResultPdf(
      id,
      req.user,
      req.userRoles,
    );

    if (!pdfBuffer) {
      throw new InternalServerErrorException();
    }

    res.set('Content-Type', 'application/pdf');
    res.set('Content-Disposition', 'attachment; filename=result.pdf');

    res.send(pdfBuffer);
  }

  /**
   * @method update
   *
   * @description
   * This method will update the portions of requested pia-intake by id, pertaining the role access
   *
   * @param pia_intake_id
   *
   * @returns 200
   */
  @Patch(':id')
  @ApiOperation({
    description: 'Updates the PIA Intake entity based on the provided ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated the PIA intake',
  })
  @ApiBadRequestResponse({
    description: 'Bad request. Possibly missing/invalid user input',
  })
  @ApiNotFoundResponse({
    description: 'Failed to update the PIA: The record not found',
  })
  @ApiForbiddenResponse({
    description:
      'Failed to update the PIA: User does not have sufficient role access to view this record',
  })
  @ApiConflictResponse({
    description:
      'Failed to update the PIA: User may not have an updated version of the document',
  })
  @ApiGoneResponse({
    description:
      'Failed to update the PIA: The record is marked inactive in our system',
  })
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: number,
    @Body() updatePiaIntakeDto: UpdatePiaIntakeDto,
    @Req() req: IRequest,
  ): Promise<GetPiaIntakeRO> {
    return this.piaIntakeService.update(
      id,
      updatePiaIntakeDto,
      req.user,
      req.userRoles,
    );
  }
}
