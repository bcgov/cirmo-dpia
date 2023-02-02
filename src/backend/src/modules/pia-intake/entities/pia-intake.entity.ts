import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';

@Entity('pia-intake')
export class PiaIntakeEntity extends BaseEntity {
  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'ministry',
    type: 'character varying',
    nullable: true,
  })
  ministry: GovMinistriesEnum;

  @Column({
    name: 'branch',
    nullable: true,
  })
  branch: string;

  @Column({
    name: 'drafter_name',
    nullable: true,
  })
  drafterName: string;

  @Column({
    name: 'drafter_title',
    nullable: true,
  })
  drafterTitle: string;

  @Column({
    name: 'drafter_email',
    nullable: true,
  })
  drafterEmail: string;

  @Column({
    name: 'lead_name',
    nullable: true,
  })
  leadName: string;

  @Column({
    name: 'lead_title',
    nullable: true,
  })
  leadTitle: string;

  @Column({
    name: 'lead_email',
    nullable: true,
  })
  leadEmail: string;

  @Column({
    name: 'mpo_name',
    nullable: true,
  })
  mpoName: string;

  @Column({
    name: 'mpo_email',
    nullable: true,
  })
  mpoEmail: string;

  @Column({
    name: 'initiative_description',
    nullable: true,
  })
  initiativeDescription: string;

  @Column({
    name: 'initiative_scope',
    nullable: true,
  })
  initiativeScope: string;

  @Column({
    name: 'data_elements_involved',
    nullable: true,
  })
  dataElementsInvolved: string;

  @Column({
    name: 'has_added_pi_to_data_elements',
    nullable: true /* null signifies NOT SURE */,
  })
  hasAddedPiToDataElements: boolean;

  @Column({
    name: 'risk_mitigation',
    nullable: true /* null when user said NO to added_pi_to_data_elements */,
  })
  riskMitigation: string;

  @Column({
    name: 'status',
    nullable: true,
    type: 'character varying',
  })
  status: PiaIntakeStatusEnum;

  @Column({
    name: 'save_id',
    nullable: true,
    default: 1,
  })
  saveId: number;

  @Column({
    name: 'updated_by_display_name',
    nullable: true,
  })
  updatedByDisplayName: string;
  @CreateDateColumn({
    name: 'submitted_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  submittedAt: Date;
}
