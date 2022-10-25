import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Redirect,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { KeycloakToken } from './keycloack-token.model';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('keycloakLogin')
  @Redirect('', 301)
  @Unprotected()
  @ApiOkResponse({
    description: 'redirect to keycloak sso server for user login',
  })
  login() {
    return this.authService.getUrlLogin();
  }

  @Get('callback')
  @Unprotected()
  @ApiOkResponse({ description: 'Get access token payload with credentials' })
  getAccessToken(@Query('code') code: string) {
    return this.authService.getAccessToken(code);
  }

  @Post('refreshToken')
  @ApiOkResponse({
    description: 'Refresh access token with keycloak sso server ',
  })
  @Unprotected()
  refreshAccessToken(@Body() token: KeycloakToken) {
    return this.authService.refreshAccessToken(token.refresh_token);
  }

  @Post('logout')
  @HttpCode(204)
  @ApiOkResponse({ description: 'Logout from keycloak sso server' })
  logout(@Body() token: KeycloakToken) {
    return this.authService.logout(token.refresh_token);
  }
}
