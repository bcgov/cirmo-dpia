import { forwardRef, Module } from '@nestjs/common';
import { PiaIntakeService } from './pia-intake.service';
import { PiaIntakeController } from './pia-intake.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PiaIntakeEntity } from './entities/pia-intake.entity';
import { InvitesModule } from '../invites/invites.module';
import { InviteesModule } from '../invitees/invitees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PiaIntakeEntity]),
    forwardRef(() => InvitesModule), // forwardRef as a workaround to circular dep
    InviteesModule,
  ],
  controllers: [PiaIntakeController],
  providers: [PiaIntakeService],
  exports: [PiaIntakeService],
})
export class PiaIntakeModule {}
