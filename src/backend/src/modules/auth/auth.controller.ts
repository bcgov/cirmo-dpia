import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Redirect,
  Req,
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
  @Redirect('', HttpStatus.MOVED_PERMANENTLY)
  @Unprotected()
  @ApiOkResponse({
    description: 'redirect to keycloak sso server for user login',
  })
  login() {
    return this.authService.getUrlLogin();
  }

  @Post('callback')
  @Unprotected()
  @ApiOkResponse({ description: 'Get access token payload with credentials' })
  async getAccessToken(@Body('code') code: string) {
    if (code === '') return;
    const keycloakToken: KeycloakToken = await this.authService.getAccessToken(
      code,
    );
    return keycloakToken;
  }

  @Get('user')
  async getUserInfo(@Req() req) {
    if (req.headers.authorization === 'Bearer') return;
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const kcUserInfo = await this.authService.getUserInfo(accessToken);
    return kcUserInfo;
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
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Logout from keycloak sso server' })
  async logout(@Body() token: KeycloakToken) {
    try {
      await this.authService.logout(token.refresh_token);
    } catch {
      // TODO define a correct status code
      throw new HttpException('Logout failed', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
