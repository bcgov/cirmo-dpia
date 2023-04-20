import { BaseEntity } from 'src/common/entities/base.entity';
import { PiaIntakeEntity } from 'src/modules/pia-intake/entities/pia-intake.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('comments')
export class CommentEntity extends BaseEntity {
  @ManyToOne(() => PiaIntakeEntity, (pia) => pia.id, {
    createForeignKeyConstraints: true,
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pia_id' })
  pia: PiaIntakeEntity;

  // Loads id of PIA relation into a new property
  @RelationId((comment: CommentEntity) => comment.pia)
  piaId: number;

  // Section Paths
  @Column({
    name: 'path',
    nullable: false,
  })
  path: string;

  @Column({
    name: 'text',
    nullable: true, // for deleted comments, text is required to be deleted as it could be sensitive personal info
  })
  text: string;

  @Column({
    name: 'is_resolved',
    nullable: false,
    default: false,
  })
  isResolved: boolean;

  @Column({
    name: 'created_by_display_name',
    nullable: false,
  })
  createdByDisplayName: string;
}
