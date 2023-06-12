import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeycloakUser } from '../auth/keycloak-user.model';
import { InviteEntity } from '../invites/entities/invite.entity';
import { PiaIntakeEntity } from '../pia-intake/entities/pia-intake.entity';
import { InviteeEntity } from './entities/invitee.entity';

@Injectable()
export class InviteesService {
  @InjectRepository(InviteeEntity)
  private readonly inviteeRepository: Repository<InviteeEntity>;

  async create(pia: PiaIntakeEntity, invite: InviteEntity, user: KeycloakUser) {
    const invitee = await this.inviteeRepository.save({
      pia,
      invite,
      createdByGuid: user.idir_user_guid,
      createdByUsername: user.idir_username,
      updatedByGuid: user.idir_user_guid,
      updatedByUsername: user.idir_username,
      createdByDisplayName: user.display_name,
    });

    return invitee;
  }

  async findOneByUserAndPia(user: KeycloakUser, piaId: number) {
    const invitee = await this.inviteeRepository.findOne({
      where: {
        pia: {
          id: piaId,
        },
        createdByGuid: user.idir_user_guid,
      },
    });

    return invitee;
  }
}
