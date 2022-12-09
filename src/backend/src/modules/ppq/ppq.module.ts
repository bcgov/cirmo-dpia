import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PpqEntity } from './entities/ppq.entity';
import { PpqController } from './ppq.controller';
import { PpqService } from './ppq.service';

@Module({
  imports: [TypeOrmModule.forFeature([PpqEntity])],
  controllers: [PpqController],
  providers: [PpqService],
})
export class PpqModule {}
