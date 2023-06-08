import { BaseEntity } from 'src/common/entities/base.entity';
import { InviteEntity } from 'src/modules/invites/entities/invite.entity';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('invitees')
export class InviteeEntity extends BaseEntity {
  @ManyToOne(() => InviteEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'invite_id' })
  invite: InviteEntity;

  @RelationId((invitee: InviteeEntity) => invitee.invite)
  inviteId: number;

  @ManyToOne(() => PiaIntakeEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pia_id' })
  pia: PiaIntakeEntity;

  @RelationId((invitee: InviteeEntity) => invitee.pia)
  piaId: number;

  @Column({
    name: 'created_by_display_name',
    nullable: false,
  })
  createdByDisplayName: string;
}
