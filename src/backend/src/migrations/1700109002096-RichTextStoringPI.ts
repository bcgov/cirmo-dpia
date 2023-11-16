import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextStoringPI1700109002096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_whereDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_disclosureDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_contractualTerms" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_enterpriseServiceAccessDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_unauthorizedAccessMeasures" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_trackAccessDetails" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_whereDetails" = "storing_personal_information"->'personalInformation'->>'whereDetails'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_disclosureDetails" = "storing_personal_information"->'disclosuresOutsideCanada'->'storage'->>'disclosureDetails'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_contractualTerms" = "storing_personal_information"->'disclosuresOutsideCanada'->'storage'->>'contractualTerms'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_enterpriseServiceAccessDetails" = "storing_personal_information"->'disclosuresOutsideCanada'->'contract'->>'enterpriseServiceAccessDetails'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_unauthorizedAccessMeasures" = "storing_personal_information"->'disclosuresOutsideCanada'->'controls'->>'unauthorizedAccessMeasures'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_trackAccessDetails" = "storing_personal_information"->'disclosuresOutsideCanada'->'trackAccess'->>'trackAccessDetails'`,
    );

    // Change jsonb properties from type string to object
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{personalInformation, whereDetails}',
                '{"content": ""}'::jsonb
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
            SET "storing_personal_information" = jsonb_set(
              "storing_personal_information",
              '{disclosuresOutsideCanada, storage, disclosureDetails}',
              '{"content": ""}'::jsonb
            )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, storage, contractualTerms}',
                '{"content": ""}'::jsonb
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, contract, enterpriseServiceAccessDetails}',
                '{"content": ""}'::jsonb
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, controls, unauthorizedAccessMeasures}',
                '{"content": ""}'::jsonb
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, trackAccess, trackAccessDetails}',
                '{"content": ""}'::jsonb
              )`,
    );

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{personalInformation, whereDetails, content}',
                to_jsonb("temp_storingPI_whereDetails")
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
            SET "storing_personal_information" = jsonb_set(
              "storing_personal_information",
              '{disclosuresOutsideCanada, storage, disclosureDetails, content}',
              to_jsonb("temp_storingPI_disclosureDetails")
            )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, storage, contractualTerms, content}',
                to_jsonb("temp_storingPI_contractualTerms")
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, contract, enterpriseServiceAccessDetails, content}',
                to_jsonb("temp_storingPI_enterpriseServiceAccessDetails")
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, controls, unauthorizedAccessMeasures, content}',
                to_jsonb("temp_storingPI_unauthorizedAccessMeasures")
              )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
              SET "storing_personal_information" = jsonb_set(
                "storing_personal_information",
                '{disclosuresOutsideCanada, trackAccess, trackAccessDetails, content}',
                to_jsonb("temp_storingPI_trackAccessDetails")
              )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_whereDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_disclosureDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_contractualTerms"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_enterpriseServiceAccessDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_unauthorizedAccessMeasures"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_trackAccessDetails"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_whereDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_disclosureDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_contractualTerms" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_enterpriseServiceAccessDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_unauthorizedAccessMeasures" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_storingPI_trackAccessDetails" text`,
    );

    // Extract the content from JSONB and store in temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_whereDetails" = "storing_personal_information"->'personalInformation'->'whereDetails'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_disclosureDetails" = "storing_personal_information"->'disclosuresOutsideCanada'->'storage'->'disclosureDetails'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_contractualTerms" = "storing_personal_information"->'disclosuresOutsideCanada'->'storage'->'contractualTerms'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_enterpriseServiceAccessDetails" = "storing_personal_information"->'disclosuresOutsideCanada'->'contract'->'enterpriseServiceAccessDetails'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_unauthorizedAccessMeasures" = "storing_personal_information"->'disclosuresOutsideCanada'->'controls'->'unauthorizedAccessMeasures'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_storingPI_trackAccessDetails" = "storing_personal_information"->'disclosuresOutsideCanada'->'trackAccess'->'trackAccessDetails'->>'content'`,
    );

    // Revert the JSONB properties to type string using the temporary column values
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "storing_personal_information" = jsonb_set(
          "storing_personal_information",
          '{personalInformation, whereDetails}',
          to_jsonb("temp_storingPI_whereDetails")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "storing_personal_information" = jsonb_set(
          "storing_personal_information",
          '{disclosuresOutsideCanada, storage, disclosureDetails}',
          to_jsonb("temp_storingPI_disclosureDetails")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "storing_personal_information" = jsonb_set(
          "storing_personal_information",
          '{disclosuresOutsideCanada, storage, contractualTerms}',
          to_jsonb("temp_storingPI_contractualTerms")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "storing_personal_information" = jsonb_set(
          "storing_personal_information",
          '{disclosuresOutsideCanada, contract, enterpriseServiceAccessDetails}',
          to_jsonb("temp_storingPI_enterpriseServiceAccessDetails")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "storing_personal_information" = jsonb_set(
          "storing_personal_information",
          '{disclosuresOutsideCanada, controls, unauthorizedAccessMeasures}',
          to_jsonb("temp_storingPI_unauthorizedAccessMeasures")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "storing_personal_information" = jsonb_set(
          "storing_personal_information",
          '{disclosuresOutsideCanada, trackAccess, trackAccessDetails}',
          to_jsonb("temp_storingPI_trackAccessDetails")
        )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_whereDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_disclosureDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_contractualTerms"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_enterpriseServiceAccessDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_unauthorizedAccessMeasures"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_storingPI_trackAccessDetails"`,
    );
  }
}
