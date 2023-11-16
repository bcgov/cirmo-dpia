import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextAccuracyCorrectionRetention1700162931296
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_accuracy_accuracyDescription" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_accuracy_retentionDescription" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_accuracy_accuracyDescription" = "accuracy_correction_and_retention"->'accuracy'->>'description'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_accuracy_retentionDescription" = "accuracy_correction_and_retention"->'retention'->>'describeRetention'`,
    );

    // Change jsonb properties from type string to object
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "accuracy_correction_and_retention" = jsonb_set(
        "accuracy_correction_and_retention",
        '{accuracy, description}',
        '{"content": ""}'::jsonb
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "accuracy_correction_and_retention" = jsonb_set(
        "accuracy_correction_and_retention",
        '{retention, describeRetention}',
        '{"content": ""}'::jsonb
      )`,
    );

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "accuracy_correction_and_retention" = jsonb_set(
        "accuracy_correction_and_retention",
        '{accuracy, description, content}',
        to_jsonb("temp_accuracy_accuracyDescription")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "accuracy_correction_and_retention" = jsonb_set(
        "accuracy_correction_and_retention",
        '{retention, describeRetention, content}',
        to_jsonb("temp_accuracy_retentionDescription")
      )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_accuracy_accuracyDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_accuracy_retentionDescription"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_accuracy_accuracyDescription" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_accuracy_retentionDescription" text`,
    );

    // Extract the content from JSONB and store in temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_accuracy_accuracyDescription" = "accuracy_correction_and_retention"->'accuracy'->'description'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_accuracy_retentionDescription" = "accuracy_correction_and_retention"->'retention'->'describeRetention'->>'content'`,
    );

    // Revert the JSONB properties to type string using the temporary column values
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "accuracy_correction_and_retention" = jsonb_set(
        "accuracy_correction_and_retention",
        '{accuracy, description}',
        to_jsonb("temp_accuracy_accuracyDescription")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "accuracy_correction_and_retention" = jsonb_set(
        "accuracy_correction_and_retention",
        '{retention, describeRetention}',
        to_jsonb("temp_accuracy_retentionDescription")
      )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_accuracy_accuracyDescription"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_accuracy_retentionDescription"`,
    );
  }
}
