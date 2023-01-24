import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeSaveIdUpdatedBy1674516280473
  implements MigrationInterface
{
  name = 'piaIntakeSaveIdUpdatedBy1674516280473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "updated_by_guid" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "updated_by_username" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "save_id" integer DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "updated_by_guid" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "updated_by_username" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
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
