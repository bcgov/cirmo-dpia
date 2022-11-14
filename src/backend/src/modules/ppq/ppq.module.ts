import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PpqEntity } from './entities/ppq.entity';
import { PpqController } from './ppq.controller';
import { PpqService } from './ppq.service';

@Module({
  imports: [TypeOrmModule.forFeature([PpqEntity]), AuthModule],
  controllers: [PpqController],
  providers: [PpqService],
})
export class PpqModule {}
