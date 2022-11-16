import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigController } from './configuration.controller';
import { AuthService } from './configuration.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class ConfigModule {}
