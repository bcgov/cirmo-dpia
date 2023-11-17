import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextPPQ1700244977702 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_initiativeOtherDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_proposedDeadlineReason" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_otherCpoConsideration" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_pidInitiativeSummary" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_initiativeOtherDetails" = "ppq" ->>'initiativeOtherDetails'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_proposedDeadlineReason"= "ppq" ->>'proposedDeadlineReason'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_otherCpoConsideration" = "ppq" ->>'otherCpoConsideration'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_pidInitiativeSummary" = "ppq" ->>'pidInitiativeSummary'`,
    );

    // Change jsonb properties from type string to object
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{initiativeOtherDetails}',
          '{"content": ""}'::jsonb
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{proposedDeadlineReason}',
          '{"content": ""}'::jsonb
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{otherCpoConsideration}',
          '{"content": ""}'::jsonb
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{pidInitiativeSummary}',
          '{"content": ""}'::jsonb
        )`,
    );

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{initiativeOtherDetails, content}',
          to_jsonb("temp_ppq_initiativeOtherDetails")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{proposedDeadlineReason, content}',
          to_jsonb("temp_ppq_proposedDeadlineReason")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{otherCpoConsideration, content}',
          to_jsonb("temp_ppq_otherCpoConsideration")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{pidInitiativeSummary, content}',
          to_jsonb("temp_ppq_pidInitiativeSummary")
        )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_initiativeOtherDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_proposedDeadlineReason"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_otherCpoConsideration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_pidInitiativeSummary"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_initiativeOtherDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_proposedDeadlineReason" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_otherCpoConsideration" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_ppq_pidInitiativeSummary" text`,
    );

    // Extract the content from JSONB and store in temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_initiativeOtherDetails" = "ppq"->'initiativeOtherDetails'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_proposedDeadlineReason" = "ppq"->'proposedDeadlineReason'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_otherCpoConsideration" = "ppq"->'otherCpoConsideration'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_ppq_pidInitiativeSummary" = "ppq"->'pidInitiativeSummary'->>'content'`,
    );

    // Revert the JSONB properties to type string using the temporary column values
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{initiativeOtherDetails}',
          to_jsonb("temp_ppq_initiativeOtherDetails")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{proposedDeadlineReason}',
          to_jsonb("temp_ppq_proposedDeadlineReason")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{otherCpoConsideration}',
          to_jsonb("temp_ppq_otherCpoConsideration")
        )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "ppq" = jsonb_set(
          "ppq",
          '{pidInitiativeSummary}',
          to_jsonb("temp_ppq_pidInitiativeSummary")
        )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_initiativeOtherDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_proposedDeadlineReason"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_otherCpoConsideration"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_ppq_pidInitiativeSummary"`,
    );
  }
}
