import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeAlterColumnPIB1677784458028
  implements MigrationInterface
{
  name = 'piaIntakeAlterColumnPIB1677784458028';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // update column structure to include information_sharing_agreement
    await queryRunner.query(
      `WITH personal_information_banks AS (
            SELECT id as pib_id, jsonb_build_object(
                'willResultInPIB', personal_information_banks::jsonb->'resultingPIB'->>'willResultInPIB', 
                'description', personal_information_banks::jsonb->'resultingPIB'->>'descriptionInformationType',
                'mainMinistryOrAgencyInvolved', personal_information_banks::jsonb->'resultingPIB'->>'mainMinistryInvolved',
                'otherGroupsInvolved', null,
                'contactTitle', personal_information_banks::jsonb->'resultingPIB'->>'managingPersonName',
                'contactPhone', personal_information_banks::jsonb->'resultingPIB'->>'managingPersonPhone',
                'startDate', null,
                'endDate', null
            ) as pib
            FROM "pia-intake"
            WHERE personal_information_banks::jsonb->'resultingPIB' IS NOT NULL
        ), information_sharing_agreement AS (
            SELECT id as isa_id, '{"doesInvolveISA": null, "description": null, "mainMinistryOrAgencyInvolved": null, "otherGroupsInvolved": null, "contactTitle": null, "contactPhone": null, "startDate": null, "endDate": null}'::jsonb as isa
            FROM "pia-intake"
            WHERE personal_information_banks::jsonb->'resultingPIB' IS NOT NULL
        )
        UPDATE "pia-intake"
        SET personal_information_banks = jsonb_build_object('informationSharingAgreement', information_sharing_agreement.isa, 'personalInformationBanks', personal_information_banks.pib)
        FROM personal_information_banks, information_sharing_agreement
        WHERE id = pib_id AND id = isa_id;`,
    );

    // rename column to agreements_and_information_banks
    await queryRunner.query(
      `ALTER TABLE "pia-intake" RENAME COLUMN "personal_information_banks" TO "agreements_and_information_banks"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // rename column to personal_information_banks
    await queryRunner.query(
      `ALTER TABLE "pia-intake" RENAME COLUMN "agreements_and_information_banks" TO "personal_information_banks"`,
    );

    // revert the updated structure
    await queryRunner.query(
      `WITH personal_information_banks AS (
            SELECT id as pib_id, jsonb_build_object(
                'willResultInPIB', personal_information_banks::jsonb->'personalInformationBanks'->>'willResultInPIB', 
                'descriptionInformationType', personal_information_banks::jsonb->'personalInformationBanks'->>'description',
                'mainMinistryInvolved', personal_information_banks::jsonb->'personalInformationBanks'->>'mainMinistryOrAgencyInvolved',
                'managingPersonName', personal_information_banks::jsonb->'personalInformationBanks'->>'contactTitle',
                'managingPersonPhone', personal_information_banks::jsonb->'personalInformationBanks'->>'contactPhone'
            ) as resultingPIB
            FROM "pia-intake"
            WHERE personal_information_banks::jsonb->'personalInformationBanks' IS NOT NULL
        )
        UPDATE "pia-intake"
        SET personal_information_banks = jsonb_build_object('resultingPIB', personal_information_banks.resultingPIB)
        FROM personal_information_banks
        WHERE id = pib_id`,
    );
  }
}
