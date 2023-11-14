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

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, drafterInput}',
        jsonb_build_object('content', "temp_collectionUse_drafterInput")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{collectionNotice, mpoInput}',
        jsonb_build_object('content', "temp_collectionUse_mpoInput")
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
    // Add temporary columns to store the JSON content as text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_collectionUse_drafterInput" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_collectionUse_mpoInput" text`,
    );

    // Copy the 'content' from the JSONB columns to the temporary text columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_collectionUse_drafterInput" = "collection_use_and_disclosure"->'collectionNotice'->'drafterInput'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_collectionUse_mpoInput" = "collection_use_and_disclosure"->'collectionNotice'->'mpoInput'->>'content'`,
    );

    // Revert the types to text
    await queryRunner.query(
      `UPDATE "pia-intake"
       SET "collection_use_and_disclosure" = jsonb_set(
         "collection_use_and_disclosure",
         '{collectionNotice, drafterInput}',
         to_jsonb("temp_collectionUse_drafterInput"::text)
       )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
       SET "collection_use_and_disclosure" = jsonb_set(
         "collection_use_and_disclosure",
         '{collectionNotice, mpoInput}',
         to_jsonb("temp_collectionUse_mpoInput"::text)
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
