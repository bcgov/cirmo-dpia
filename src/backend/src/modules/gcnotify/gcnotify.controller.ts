import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GcNotifyEmailDto } from './dto/gcnotify-pia.dto';
import { GcNotifyService } from './gcnotify.service';

@Controller('mail')
@ApiTags('GCNotify')
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
  async sendEmail(@Body() gcNotifyEmailDto: GcNotifyEmailDto): Promise<string> {
    return this.gcnotifyService.sendEmail(gcNotifyEmailDto);
  }
}
