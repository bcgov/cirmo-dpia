import { MigrationInterface, QueryRunner } from 'typeorm';

export class PpqAddUserInfo1668456855823 implements MigrationInterface {
  name = 'ppqAddUserInfo1668456855823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "created_by_guid" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "created_by_username" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "created_by_display_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "created_by_email" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "created_by_email"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "created_by_display_name"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "created_by_username"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "created_by_guid"`);
  }
}
