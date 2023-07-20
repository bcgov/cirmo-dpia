import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Redirect,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { AppTokensDto } from './dto/app-tokens.dto';
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
    if (!code) return;
    const keycloakToken: KeycloakToken = await this.authService.getAccessToken(
      code,
    );
    return keycloakToken;
  }

  @Get('user')
  async getUserInfo(@Req() req) {
    if (!req.headers.authorization.startsWith('Bearer')) return;
    const accessToken = req.headers.authorization.replace('Bearer ', '');
    const kcUserInfo = await this.authService.getUserInfo(accessToken);
    return kcUserInfo;
  }

  @Post('refreshToken')
  @ApiOkResponse({
    description: 'Refresh access token with keycloak sso server ',
  })
  @Unprotected()
  refreshAccessToken(@Body() token: AppTokensDto) {
    try {
      return this.authService.refreshAccessToken(token.refresh_token);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(' Token failed', e.getStatus());
      }
      throw new InternalServerErrorException('Refresh Token failed');
    }
  }

  @Post('logout')
  @Unprotected()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOkResponse({ description: 'Logout from keycloak sso server' })
  async logout(@Body() token: AppTokensDto) {
    try {
      await this.authService.logout(token.refresh_token);
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException('Logout failed', e.getStatus());
      }
      throw new InternalServerErrorException('Logout failed');
    }
    return;
  }
}
