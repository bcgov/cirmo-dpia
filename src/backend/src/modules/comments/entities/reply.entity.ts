import { BaseEntity } from 'src/common/entities/base.entity';
import { CommentEntity } from './comment.entity';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity('replies')
export class ReplyEntity extends BaseEntity {
  @ManyToOne(() => CommentEntity, (comment) => comment.id, {
    createForeignKeyConstraints: true,
    nullable: false,
    onDelete: 'CASCADE', // If a comment is deleted, all its replies are also deleted
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' }) // The ID of the comment to which the reply belongs
  comment: CommentEntity;

  // Load id of Comment relation into a new property
  @RelationId((reply: ReplyEntity) => reply.comment)
  commentId: number;

  // Reply text
  @Column({
    name: 'text',
    nullable: true, // similar to comments, for deleted replies, text is required to be deleted as it could be sensitive personal info
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
