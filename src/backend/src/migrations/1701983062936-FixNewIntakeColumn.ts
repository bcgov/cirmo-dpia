import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixNewIntakeColumn1701983062936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add column that was mistakenly removed in last migration
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "new_intake" boolean`,
    );

    // Setting new_intake to true where status is 'DRAFTING_IN_PROGRESS'
    await queryRunner.query(
      `UPDATE "pia-intake" SET "new_intake" = true WHERE "status" = 'DRAFTING_IN_PROGRESS'`,
    );

    // Setting new_intake to false where status is not 'DRAFTING_IN_PROGRESS'
    await queryRunner.query(
      `UPDATE "pia-intake" SET "new_intake" = false WHERE "status" <> 'DRAFTING_IN_PROGRESS'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "new_intake"`,
    );
  }
}
