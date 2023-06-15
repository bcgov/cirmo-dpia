import { GovMinistriesEnum } from '../../../common/enums/gov-ministries.enum';
import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { PiaIntakeStatusEnum } from '../enums/pia-intake-status.enum';
import { CollectionUseAndDisclosure } from '../jsonb-classes/collection-use-and-disclosure';
import { StoringPersonalInformation } from '../jsonb-classes/storing-personal-information';
import { SecurityPersonalInformation } from '../jsonb-classes/security-personal-information';
import { AccuracyCorrectionAndRetention } from '../jsonb-classes/accuracy-correction-and-retention';
import { AdditionalRisks } from '../jsonb-classes/additional-risks';
import { AgreementsAndInformationBanks } from '../jsonb-classes/agreements-and-information-banks';
import { Ppq } from '../jsonb-classes/ppq';
import { InviteeEntity } from 'src/modules/invitees/entities/invitee.entity';
import { Review } from '../jsonb-classes/review';

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

  @Column({
    name: 'submitted_at',
    type: 'timestamptz',
    nullable: true,
    default: null,
  })
  submittedAt: Date;

  @Column({
    name: 'is_next_steps_seen_for_delegated_flow',
    nullable: false,
    default: false,
  })
  isNextStepsSeenForDelegatedFlow: boolean;

  @Column({
    name: 'is_next_steps_seen_for_non_delegated_flow',
    nullable: false,
    default: false,
  })
  isNextStepsSeenForNonDelegatedFlow: boolean;

  @Column({
    name: 'collection_use_and_disclosure',
    type: 'jsonb',
    nullable: true,
  })
  collectionUseAndDisclosure: CollectionUseAndDisclosure;

  @Column({
    name: 'storing_personal_information',
    type: 'jsonb',
    nullable: true,
  })
  storingPersonalInformation: StoringPersonalInformation;

  @Column({
    name: 'security_personal_information',
    type: 'jsonb',
    nullable: true,
  })
  securityPersonalInformation: SecurityPersonalInformation;

  @Column({
    name: 'accuracy_correction_and_retention',
    type: 'jsonb',
    nullable: true,
  })
  accuracyCorrectionAndRetention: AccuracyCorrectionAndRetention;

  @Column({
    name: 'agreements_and_information_banks',
    type: 'jsonb',
    nullable: true,
  })
  agreementsAndInformationBanks: AgreementsAndInformationBanks;

  @Column({
    name: 'additional_risks',
    type: 'jsonb',
    nullable: true,
  })
  additionalRisks: AdditionalRisks;

  @Column({
    name: 'review',
    type: 'jsonb',
    nullable: true,
  })
  review: Review;

  @Column({
    name: 'ppq',
    type: 'jsonb',
    nullable: true,
  })
  ppq: Ppq;

  @OneToMany(() => InviteeEntity, (invitee) => invitee.pia)
  invitee: InviteeEntity;
}
