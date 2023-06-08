import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InviteeEntity } from './entities/invitee.entity';
import { InviteesService } from './invitees.service';

@Module({
  imports: [TypeOrmModule.forFeature([InviteeEntity])],
  providers: [InviteesService],
  exports: [InviteesService],
})
export class InviteesModule {}
