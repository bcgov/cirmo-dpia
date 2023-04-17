import { Module } from '@nestjs/common';
import { PiaIntakeService } from './pia-intake.service';
import { PiaIntakeController } from './pia-intake.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiaIntakeEntity } from './entities/pia-intake.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PiaIntakeEntity])],
  controllers: [PiaIntakeController],
  providers: [PiaIntakeService],
  exports: [PiaIntakeService],
})
export class PiaIntakeModule {}
