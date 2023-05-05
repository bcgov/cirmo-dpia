import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateStatusPctReviewToCpoReview1683307849986
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // change all existing PCT_REVIEW statuses to CPO_REVIEW
    await queryRunner.query(
      `UPDATE "pia-intake"
          SET "status" = 'CPO_REVIEW'
          WHERE "status" = 'PCT_REVIEW'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // revert back all existing CPO_REVIEW statuses to PCT_REVIEW
    await queryRunner.query(
      `UPDATE "pia-intake"
            SET "status" = 'PCT_REVIEW'
            WHERE "status" = 'CPO_REVIEW'`,
    );
  }
}
