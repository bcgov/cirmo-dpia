import { Body, Controller, Get, HttpCode, Post, Query, Redirect } from '@nestjs/common';
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiBearerAuth,
  } from '@nestjs/swagger';
import { Unprotected } from 'nest-keycloak-connect';
import { AuthService } from './auth.service';
import { KeycloakToken } from './keycloack-token.model';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Get('login')
    @Redirect('' , 301)
    @Unprotected()
    login() {
        return this.authService.getUrlLogin();
    }

    @Get('callback')
    @Unprotected()
    getAccessToken(@Query('code') code: string) {
        return this.authService.getAccessToken(code);
    }

    @Post('refreshToken')
    @Unprotected()
    refreshAccessToken(@Body() token: KeycloakToken) {
        return this.authService.refreshAccessToken(token.refresh_token)
    }

    @Post('logout')
    @HttpCode(204)
    logout(@Body() token: KeycloakToken){
        return this.authService.logout(token.refresh_token);
    }
}