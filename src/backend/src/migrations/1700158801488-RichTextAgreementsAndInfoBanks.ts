import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextAgreementsAndInfoBanks1700158801488
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_infoSharingAgmnt_description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_personalInfoBanks_description" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_infoSharingAgmnt_description" = "agreements_and_information_banks"->'informationSharingAgreement'->>'description'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_personalInfoBanks_description" = "agreements_and_information_banks"->'personalInformationBanks'->>'description'`,
    );

    // Change jsonb properties from type string to object
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "agreements_and_information_banks" = jsonb_set(
          "agreements_and_information_banks",
          '{informationSharingAgreement, description}',
          '{"content": ""}'::jsonb
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "agreements_and_information_banks" = jsonb_set(
          "agreements_and_information_banks",
          '{personalInformationBanks, description}',
          '{"content": ""}'::jsonb
        )`,
    );

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "agreements_and_information_banks" = jsonb_set(
          "agreements_and_information_banks",
          '{informationSharingAgreement, description, content}',
          to_jsonb("temp_infoSharingAgmnt_description")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "agreements_and_information_banks" = jsonb_set(
          "agreements_and_information_banks",
          '{personalInformationBanks, description, content}',
          to_jsonb("temp_personalInfoBanks_description")
        )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_infoSharingAgmnt_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_personalInfoBanks_description"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_infoSharingAgmnt_description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_personalInfoBanks_description" text`,
    );

    // Extract the content from JSONB and store in temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_infoSharingAgmnt_description" = "agreements_and_information_banks"->'informationSharingAgreement'->'description'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_personalInfoBanks_description" = "agreements_and_information_banks"->'personalInformationBanks'->'description'->>'content'`,
    );

    // Revert the JSONB properties to type string using the temporary column values
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "agreements_and_information_banks" = jsonb_set(
          "agreements_and_information_banks",
          '{informationSharingAgreement, description}',
          to_jsonb("temp_infoSharingAgmnt_description")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "agreements_and_information_banks" = jsonb_set(
          "agreements_and_information_banks",
          '{personalInformationBanks, description}',
          to_jsonb("temp_personalInfoBanks_description")
        )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_infoSharingAgmnt_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_personalInfoBanks_description"`,
    );
  }
}
