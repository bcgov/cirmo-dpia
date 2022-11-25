import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { KeycloakConnectModule } from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { HealthModule } from './health/health.module';
import { PpqModule } from './modules/ppq/ppq.module';
import { HttpModule } from '@nestjs/axios';
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
  providers: [AppService],
})
export class AppModule {}
