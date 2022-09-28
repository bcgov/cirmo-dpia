import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
} from '@nestjs/terminus';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
@Controller('health')
export class HealthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get()
  @HealthCheck()
  @ApiExcludeEndpoint()
  async check() {
    return HttpStatus.OK;
  }
}
