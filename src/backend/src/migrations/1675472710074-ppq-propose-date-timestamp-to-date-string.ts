import { MigrationInterface, QueryRunner } from 'typeorm';

export class PpqProposeDateTimestampToDateString1675472710074
  implements MigrationInterface
{
  name = 'ppqProposeDateTimestampToDateString1675472710074';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // create a temporary colum to store existing proposed_start_date data
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "proposed_start_date_temp" character varying`,
    );

    // move proposed_start_date date to proposed_start_date_temp
    await queryRunner.query(
      `UPDATE "ppq" SET "proposed_start_date_temp" = TO_CHAR(proposed_start_date, 'yyyy/mm/dd') where proposed_start_date_temp IS NULL`,
    );

    // delete proposed_start_date column to remove extra erroneous time information
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "proposed_start_date"`,
    );

    // rename proposed_start_date_temp to proposed_start_date
    await queryRunner.query(
      `ALTER TABLE "ppq" RENAME COLUMN "proposed_start_date_temp" TO "proposed_start_date"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // CAUTION: Running down won't bring the lost data back
    // if migration is reverted, data will still be lost

    // bring back the deleted proposed_start_date timestamp
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "proposed_start_date" TIMESTAMP WITH TIME ZONE`,
    );
  }
}
