import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubmittedAtColToPiaIntake1675357905496
  implements MigrationInterface
{
  name = 'addSubmittedAtColToPiaIntake1675357905496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "submitted_at" TIMESTAMP WITH TIME ZONE DEFAULT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "submitted_at"`,
    );
  }
}
