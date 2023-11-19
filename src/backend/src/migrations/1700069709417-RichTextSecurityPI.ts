import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextSecurityPI1700069709417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_securityPI_whereDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_securityPI_additionalStrategies" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_securityPI_whereDetails" = "security_personal_information"->'digitalToolsAndSystems'->'storage'->>'whereDetails'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_securityPI_additionalStrategies" = "security_personal_information"->'accessToPersonalInformation'->>'additionalStrategies'`,
    );

    // Change jsonb properties from type string to object
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "security_personal_information" = jsonb_set(
        "security_personal_information",
        '{digitalToolsAndSystems, storage, whereDetails}',
        '{"content": ""}'::jsonb
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "security_personal_information" = jsonb_set(
        "security_personal_information",
        '{accessToPersonalInformation, additionalStrategies}',
        '{"content": ""}'::jsonb
      )`,
    );

    // Populate the jsonb with the data from the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "security_personal_information" = jsonb_set(
        "security_personal_information",
        '{digitalToolsAndSystems, storage, whereDetails, content}',
        to_jsonb("temp_securityPI_whereDetails")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "security_personal_information" = jsonb_set(
        "security_personal_information",
        '{accessToPersonalInformation, additionalStrategies, content}',
        to_jsonb("temp_securityPI_additionalStrategies")
      )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_securityPI_whereDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_securityPI_additionalStrategies"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Re-add temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_securityPI_whereDetails" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_securityPI_additionalStrategies" text`,
    );

    // Extract the content from JSONB and store in temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_securityPI_whereDetails" = "security_personal_information"->'digitalToolsAndSystems'->'storage'->'whereDetails'->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_securityPI_additionalStrategies" = "security_personal_information"->'accessToPersonalInformation'->'additionalStrategies'->>'content'`,
    );

    // Revert the JSONB properties to type string using the temporary column values
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "security_personal_information" = jsonb_set(
        "security_personal_information",
        '{digitalToolsAndSystems, storage, whereDetails}',
        to_jsonb("temp_securityPI_whereDetails")
      )`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake"
      SET "security_personal_information" = jsonb_set(
        "security_personal_information",
        '{accessToPersonalInformation, additionalStrategies}',
        to_jsonb("temp_securityPI_additionalStrategies")
      )`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_securityPI_whereDetails"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_securityPI_additionalStrategies"`,
    );
  }
}
