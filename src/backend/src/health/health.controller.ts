import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';

@ApiTags('health')
@Controller('health')
export class HealthController {
  @Get()
  @Unprotected()
  @ApiOperation({ summary: 'Health Check Endpoint for DPIA API' })
  @HttpCode(200)
  @ApiResponse({
    status: 200,
    description: 'DPIA API Basic Health Check',
    type: 'Health Check',
  })
  check() {
    return HttpStatus.OK;
  }
}
