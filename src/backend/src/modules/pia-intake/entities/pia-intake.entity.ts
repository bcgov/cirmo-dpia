import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('pia-intake')
export class PiaIntakeEntity extends BaseEntity {
  @Column({
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    name: 'ministry',
    type: 'character varying',
    nullable: false,
  })
  ministry: GovMinistriesEnum;

  @Column({
    name: 'branch',
    nullable: false,
  })
  branch: string;

  @Column({
    name: 'drafter_name',
    nullable: false,
  })
  drafterName: string;

  @Column({
    name: 'drafter_title',
    nullable: false,
  })
  drafterTitle: string;

  @Column({
    name: 'drafter_email',
    nullable: false,
  })
  drafterEmail: string;

  @Column({
    name: 'lead_name',
    nullable: false,
  })
  leadName: string;

  @Column({
    name: 'lead_title',
    nullable: false,
  })
  leadTitle: string;

  @Column({
    name: 'lead_email',
    nullable: false,
  })
  leadEmail: string;

  @Column({
    name: 'mpo_name',
    nullable: false,
  })
  mpoName: string;

  @Column({
    name: 'mpo_email',
    nullable: false,
  })
  mpoEmail: string;

  @Column({
    name: 'initiative_description',
    nullable: false,
  })
  initiativeDescription: string;

  @Column({
    name: 'initiative_scope',
    nullable: false,
  })
  initiativeScope: string;

  @Column({
    name: 'data_elements_involved',
    nullable: false,
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
}
