import { BaseEntity } from '../../../common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { GovMinistriesEnum } from 'src/common/enums/gov-ministries.enum';
import { PiaTypesEnum } from 'src/common/enums/pia-types.enum';

@Entity('ppq')
export class PpqEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'character varying',
    nullable: true,
  })
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
    type: 'character varying',
    nullable: true,
  })
  piaType: PiaTypesEnum;

  @Column({
    name: 'contains_personal_information',
    type: 'boolean',
    nullable: true,
  })
  containsPersonalInformation: boolean;

  @Column({
    name: 'has_sensitive_personal_information',
    type: 'boolean',
    nullable: true,
  })
  hasSensitivePersonalInformation: boolean;

  @Column({
    name: 'has_sharing_of_personal_information',
    type: 'boolean',
    nullable: true,
  })
  hasSharingOfPersonalInformation: boolean;

  @Column({
    name: 'has_program_agreement',
    type: 'boolean',
    nullable: true,
  })
  hasProgramAgreement: boolean;

  @Column({
    name: 'has_others_access_to_personal_information',
    type: 'boolean',
    nullable: true,
  })
  hasOthersAccessToPersonalInformation: boolean;

  @Column({
    name: 'has_cloud_technology',
    type: 'boolean',
    nullable: true,
  })
  hasCloudTechnology: boolean;

  @Column({
    name: 'has_potential_public_interest',
    type: 'boolean',
    nullable: true,
  })
  hasPotentialPublicInterest: boolean;

  @Column({
    name: 'has_disclosure_outside_of_canada',
    type: 'boolean',
    nullable: true,
  })
  hasDisclosureOutsideOfCanada: boolean;

  @Column({
    name: 'has_high_volumes_personal_information',
    type: 'boolean',
    nullable: true,
  })
  hasHighVolumesPersonalInformation: boolean;

  @Column({
    name: 'has_data_linking',
    type: 'boolean',
    nullable: true,
  })
  hasDataLinking: boolean;

  @Column({
    name: 'has_bc_services_card_onboarding',
    type: 'boolean',
    nullable: true,
  })
  hasBcServicesCardOnboarding: boolean;

  @Column({
    name: 'has_ai_or_ml',
    type: 'boolean',
    nullable: true,
  })
  hasAiOrMl: boolean;

  @Column({
    name: 'has_partnership_non_ministry',
    type: 'boolean',
    nullable: true,
  })
  hasPartnershipNonMinistry: boolean;

  @Column({
    name: 'proposed_start_date',
    type: 'timestamptz',
    nullable: true,
  })
  proposedStartDate: Date;
}
