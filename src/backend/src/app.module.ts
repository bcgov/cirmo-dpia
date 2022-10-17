import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { HealthModule } from './health/health.module';
import { PpqModule } from './modules/ppq/ppq.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    HealthModule,
    PpqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
