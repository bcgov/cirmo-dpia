import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateExistingPiaSubmittedAtForNonIncomplete1675719264596
  implements MigrationInterface
{
  name = 'UpdateExistingPiaSubmittedAtForNonIncomplete1675719264596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // only update the existing pias that status is not incomplete and submitted_at column is null
    await queryRunner.query(`Update "pia-intake"  SET "submitted_at" = COALESCE(updated_at, created_at)
        WHERE status != 'INCOMPLETE' AND submitted_at is NULL`);
  }

  public async down(): Promise<void> {
    // no going back
  }
}
