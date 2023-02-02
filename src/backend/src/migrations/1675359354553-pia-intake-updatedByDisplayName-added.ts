import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeUpdatedByDisplayNameAdded1675359354553
  implements MigrationInterface
{
  name = 'piaIntakeUpdatedByDisplayNameAdded1675359354553';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "updated_by_display_name" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "updated_by_display_name"`,
    );
  }
}
