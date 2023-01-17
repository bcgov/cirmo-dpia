import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'is_active',
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    name: 'created_by_guid',
  })
  createdByGuid: string;

  @Column({
    name: 'created_by_username',
  })
  createdByUsername: string;

  @Column({
    name: 'updated_by_guid',
  })
  updatedByGuid: string;

  @Column({
    name: 'updated_by_username',
  })
  updatedByUsername: string;

  @Column({
    name: 'save_id',
  })
  saveId: string;
}
