import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PpqPostDTO } from './dto/ppq-post.dto';
import { PpqService } from './ppq.service';

@Controller('ppq')
@ApiTags('PPQ')
export class PpqController {
  constructor(private readonly ppqService: PpqService) {}

  @Post()
  @ApiOperation({ description: 'Submit the ppq form' })
  @ApiOkResponse({
    description: 'Successfully submitted the PPQ form',
  })
  async postForm(@Body() body: PpqPostDTO) {
    await this.ppqService.createPpq(body);
  }
}
