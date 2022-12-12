import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeycloakConnectModule, AuthGuard } from 'nest-keycloak-connect';
import { RolesGuard } from './modules/auth/guards/roles.guard';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { HealthModule } from './health/health.module';
import { PpqModule } from './modules/ppq/ppq.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { PiaIntakeModule } from './modules/pia-intake/pia-intake.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    ConfigurationModule,
    HealthModule,
    AuthModule,
    PpqModule,
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    KeycloakConnectModule.register(configService.getKeycloakConfig()),
    PiaIntakeModule,
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
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
