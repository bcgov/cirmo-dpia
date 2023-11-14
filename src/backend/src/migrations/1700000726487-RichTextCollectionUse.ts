import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextCollectionUse1700000726487 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_collectionUse_drafterInput" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_collectionUse_mpoInput" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_collectionUse_drafterInput" = "collection_use_and_disclosure"->'collectionNotice'->>'drafterInput'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_collectionUse_mpoInput" = "collection_use_and_disclosure"->'collectionNotice'->>'mpoInput'`,
    );

    // Change jsonb properties from type string to object
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, drafterInput}',
        '{"content": ""}'::jsonb
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, mpoInput}',
        '{"content": ""}'::jsonb
      )`,
    );

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, drafterInput, content}',
        to_jsonb("temp_collectionUse_drafterInput")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, mpoInput, content}',
        to_jsonb("temp_collectionUse_mpoInput")
      )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_collectionUse_drafterInput"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_collectionUse_mpoInput"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_collectionUse_drafterInput" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_collectionUse_mpoInput" text`,
    );

    // Extract the content from JSONB and store in temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_collectionUse_drafterInput" = "collection_use_and_disclosure"->'collectionNotice'->'drafterInput'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_collectionUse_mpoInput" = "collection_use_and_disclosure"->'collectionNotice'->'mpoInput'->>'content'`,
    );

    // Revert the JSONB properties to type string using the temporary column values
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, drafterInput}',
        to_jsonb("temp_collectionUse_drafterInput")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, mpoInput}',
        to_jsonb("temp_collectionUse_mpoInput")
      )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_collectionUse_drafterInput"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_collectionUse_mpoInput"`,
    );
  }
}
