import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDefaultFromPiaIntakeStatus1671669894145
  implements MigrationInterface
{
  name = 'removeDefaultFromPiaIntakeStatus1671669894145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "status" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "status" SET DEFAULT 'MPO review'`,
    );
  }
}
