import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaReviewJsonbColumn1686769976593 implements MigrationInterface {
  name = 'PiaReviewJsonbColumn1686769976593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" ADD "review" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "review"`);
  }
}
