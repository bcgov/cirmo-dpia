import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { IRequest } from 'src/common/interfaces/request.interface';
import { GcNotifyEmailDto } from './dto/gcnotify-pia.dto';
import { GcNotifyService } from './gcnotify.service';

@Controller('gcnotify')
@ApiTags('gcnotify')
@ApiBearerAuth()
export class GcNotifyController {
  constructor(private readonly gcnotifyService: GcNotifyService) {}

  @Post()
  @ApiOperation({
    description: 'Send an email notification request to GCNotify.',
  })
  @ApiOkResponse({
    description: 'Successfully sent email notification.',
  })
  @ApiBadRequestResponse({
    description: 'There is something wrong with the request body.',
  })
  @HttpCode(HttpStatus.OK)
  async sendEmail(
    @Req() req: IRequest,
    @Body('emailDto') gcNotifyEmailDto: GcNotifyEmailDto,
    @Body('mpoEmail') mpoEmail: string,
  ): Promise<any> {
    return this.gcnotifyService.sendEmail(req.user, mpoEmail, gcNotifyEmailDto);
  }
}
