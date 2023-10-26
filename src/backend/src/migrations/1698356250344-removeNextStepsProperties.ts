import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNextStepsProperties1698356250344
  implements MigrationInterface
{
  name = 'RemoveNextStepsProperties1698356250344';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "is_next_steps_seen_for_delegated_flow"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "is_next_steps_seen_for_non_delegated_flow"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "is_next_steps_seen_for_non_delegated_flow" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "is_next_steps_seen_for_delegated_flow" boolean NOT NULL DEFAULT false`,
    );
  }
}
