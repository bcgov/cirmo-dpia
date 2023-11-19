import { MigrationInterface, QueryRunner } from 'typeorm';

export class RichTextIntake1699492200161 implements MigrationInterface {
  name = 'RichTextIntake1699492200161';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the existing text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_initiative_description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_initiative_scope" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_data_elements_involved" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_risk_mitigation" text`,
    );

    // Copy the data from the old columns to the temporary columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_initiative_description" = "initiative_description"`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_initiative_scope" = "initiative_scope"`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_data_elements_involved" = "data_elements_involved"`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_risk_mitigation" = "risk_mitigation"`,
    );

    // Drop the old columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "initiative_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "initiative_scope"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "data_elements_involved"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "risk_mitigation"`,
    );

    // Add new jsonb columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "initiative_description" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "initiative_scope" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "data_elements_involved" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "risk_mitigation" jsonb`,
    );

    // Populate the new jsonb columns with the data from the temporary columns, wrapped in JSON
    await queryRunner.query(
      `UPDATE "pia-intake" SET "initiative_description" = jsonb_build_object('content', "temp_initiative_description")`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "initiative_scope" = jsonb_build_object('content', "temp_initiative_scope")`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "data_elements_involved" = jsonb_build_object('content', "temp_data_elements_involved")`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "risk_mitigation" = jsonb_build_object('content', "temp_risk_mitigation")`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_initiative_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_initiative_scope"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_data_elements_involved"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_risk_mitigation"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Add temporary columns to store the JSON content as text
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_initiative_description" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_initiative_scope" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_data_elements_involved" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "temp_risk_mitigation" text`,
    );

    // Copy the 'content' from the JSONB columns to the temporary text columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_initiative_description" = "initiative_description"->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_initiative_scope" = "initiative_scope"->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_data_elements_involved" = "data_elements_involved"->>'content'`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "temp_risk_mitigation" = "risk_mitigation"->>'content'`,
    );

    // Drop the JSONB columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "initiative_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "initiative_scope"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "data_elements_involved"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "risk_mitigation"`,
    );

    // Add back the original string columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "initiative_description" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "initiative_scope" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "data_elements_involved" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "risk_mitigation" character varying`,
    );

    // Copy the content from the temporary columns back to the original columns
    await queryRunner.query(
      `UPDATE "pia-intake" SET "initiative_description" = "temp_initiative_description"`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "initiative_scope" = "temp_initiative_scope"`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "data_elements_involved" = "temp_data_elements_involved"`,
    );
    await queryRunner.query(
      `UPDATE "pia-intake" SET "risk_mitigation" = "temp_risk_mitigation"`,
    );

    // Drop the temporary columns
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_initiative_description"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_initiative_scope"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_data_elements_involved"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "temp_risk_mitigation"`,
    );
  }
}
