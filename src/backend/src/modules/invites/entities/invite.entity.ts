import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';

@Entity('invites')
export class InviteEntity extends BaseEntity {
  @OneToOne(() => PiaIntakeEntity, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pia_id' })
  @Index()
  pia: PiaIntakeEntity;

  @RelationId((invite: InviteEntity) => invite.pia)
  piaId: number;

  // invite code
  @Column({
    name: 'code',
    nullable: false,
  })
  code: string;

  @Column({
    name: 'created_by_display_name',
    nullable: false,
  })
  createdByDisplayName: string;
}
