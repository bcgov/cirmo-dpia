import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaNewIntakeProperty1701384855054 implements MigrationInterface {
  name = 'PiaNewIntakeProperty1701384855054';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "new_intake" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "new_intake"`,
    );
  }
}
