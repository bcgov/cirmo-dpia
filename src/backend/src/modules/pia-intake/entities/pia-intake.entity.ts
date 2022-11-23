import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
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
    name: 'drafter_info',
    nullable: false,
  })
  drafterInfo: string;

  @Column({
    name: 'drafter_email',
    nullable: false,
  })
  drafterEmail: string;

  @Column({
    name: 'lead_info',
    nullable: false,
  })
  leadInfo: string;

  @Column({
    name: 'lead_email',
    nullable: false,
  })
  leadEmail: string;

  @Column({
    name: 'mpo_info',
    nullable: false,
  })
  mpoInfo: string;

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
    nullable: true /* null when user said YES to added_pi_to_data_elements */,
  })
  riskMitigation: string;
}
