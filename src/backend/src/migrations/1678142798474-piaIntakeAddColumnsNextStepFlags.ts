import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeAddColumnsNextStepFlags1678142798474
  implements MigrationInterface
{
  name = 'piaIntakeAddColumnsNextStepFlags1678142798474';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "pia-intake" DROP COLUMN "test"`);
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "is_next_steps_seen_for_delegated_flow" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "is_next_steps_seen_for_non_delegated_flow" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "is_next_steps_seen_for_non_delegated_flow"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "is_next_steps_seen_for_delegated_flow"`,
    );
    await queryRunner.query(`ALTER TABLE "pia-intake" ADD "test" jsonb`);
  }
}
