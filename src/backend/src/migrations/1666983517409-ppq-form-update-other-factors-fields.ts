import { MigrationInterface, QueryRunner } from 'typeorm';

export class PpqFormUpdateOtherFactorsFields1666983517409
  implements MigrationInterface
{
  name = 'ppqFormUpdateOtherFactorsFields1666983517409';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_high_volumes_personal_information"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "has_data_linking"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ppq" ADD "has_data_linking" boolean`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_high_volumes_personal_information" boolean`,
    );
  }
}
