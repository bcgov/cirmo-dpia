import { MigrationInterface, QueryRunner } from 'typeorm';

export class PpqTabForPia1682963468806 implements MigrationInterface {
  name = 'PpqTabForPia1682963468806';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" ADD "ppq" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "ppq"`);
  }
}
