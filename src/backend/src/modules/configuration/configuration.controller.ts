import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    NotFoundException,
    Post,
    Redirect,
    Req,
  } from '@nestjs/common';
  import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
  
  import { Unprotected } from 'nest-keycloak-connect';
  import { AuthService } from './auth.service';

  
  @Controller('configuration')
  @ApiTags('configuration')
  export class ConfigurationController {
    constructor(private authService: AuthService) {}
  
    @Get('keycloakLogin')
    @Redirect('', HttpStatus.MOVED_PERMANENTLY)
    @Unprotected()
    @ApiOkResponse({
      description: 'redirect to keycloak sso server for user login',
    })
    login() {
      return this.authService.getUrlLogin();
    }
  
 
  

  
 
  }
  