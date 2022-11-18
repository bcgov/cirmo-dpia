import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ConfigurationService } from './configuration.service';

@Controller('configuration')
@ApiTags('configuration')
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @Get('/')
  @ApiOkResponse({
    description: 'Get feature flag configuration json file',
  })
  getConfig() {
    return this.configurationService.getConfig();
  }
}
