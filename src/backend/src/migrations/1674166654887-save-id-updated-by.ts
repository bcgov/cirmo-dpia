import { MigrationInterface, QueryRunner } from 'typeorm';

export class SaveIdUpdatedBy1674166654887 implements MigrationInterface {
  name = 'SaveIdUpdatedBy1674166654887';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "updated_by_guid" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "updated_by_username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "save_id" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "updated_by_guid" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "updated_by_username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "save_id" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "save_id"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "updated_by_username"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "updated_by_guid"`);
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "save_id"`);
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "updated_by_username"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "updated_by_guid"`,
    );
  }
}
