import { Module } from '@nestjs/common';
import { PiaIntakeService } from './pia-intake.service';
import { PiaIntakeController } from './pia-intake.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiaIntakeEntity } from './entities/pia-intake.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([PiaIntakeEntity]), AuthModule],
  controllers: [PiaIntakeController],
  providers: [PiaIntakeService],
})
export class PiaIntakeModule {}
