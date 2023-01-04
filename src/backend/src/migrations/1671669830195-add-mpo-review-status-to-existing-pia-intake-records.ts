import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMpoReviewStatusToExistingPiaIntakeRecords1671669830195
  implements MigrationInterface
{
  name = 'addMpoReviewStatusToExistingPiaIntakeRecords1671669830195';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "status" character varying NOT NULL DEFAULT 'MPO_REVIEW'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "status"`);
  }
}
