import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { PpqOtherFactorsEnum } from '../enums/ppq-other-factors.enum';
import { PpqPiaTypesEnum } from '../enums/ppq-pia-types.enum';
import { YesNoNotSureEnum } from 'src/common/enums/yes-no-not-sure.enum';

@Entity('ppq')
export class PpqEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: GovMinistriesEnum })
  ministry: GovMinistriesEnum;

  @Column()
  branch: string;

  @Column({ name: 'initiative_name' })
  initiativeName: string;

  @Column({ name: 'initiative_description' })
  initiativeDescription: string;

  @Column({ name: 'data_elements' })
  dataElements: string;

  @Column({
    name: 'pia_type',
    type: 'enum',
    enum: PpqPiaTypesEnum,
  })
  piaType: string;

  @Column({
    name: 'contains_personal_information',
    type: 'enum',
    enum: YesNoNotSureEnum,
  })
  containsPersonalInformation: string;

  @Column({
    name: 'other_factors',
    type: 'enum',
    enum: PpqOtherFactorsEnum,
    array: true,
    default: [],
  })
  otherFactors: PpqOtherFactorsEnum[];

  @Column({ name: 'proposed_start_date', type: 'timestamptz', nullable: true })
  proposedStartDate: Date;
}
