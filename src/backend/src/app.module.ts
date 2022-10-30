import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  RoleGuard,
} from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { HealthModule } from './health/health.module';
import { PpqModule } from './modules/ppq/ppq.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    HealthModule,
    AuthModule,
    PpqModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    KeycloakConnectModule.register(configService.getKeycloakConfig()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
