import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveMpoRelatedFields1682464239283 implements MigrationInterface {
  name = 'RemoveMpoRelatedFields1682464239283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "mpo_name"`);
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "mpo_email"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "mpo_email" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "mpo_name" character varying`,
    );
  }
}
