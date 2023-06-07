import { Module } from '@nestjs/common';
import { InvitesService } from './invites.service';
import { InvitesController } from './invites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteEntity } from './entities/invite.entity';
import { PiaIntakeModule } from '../pia-intake/pia-intake.module';

@Module({
  imports: [TypeOrmModule.forFeature([InviteEntity]), PiaIntakeModule],
  controllers: [InvitesController],
  providers: [InvitesService],
})
export class InvitesModule {}
