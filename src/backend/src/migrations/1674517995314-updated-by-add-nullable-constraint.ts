import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdatedByAddNullableConstraint1674517995314
  implements MigrationInterface
{
  name = 'updatedByAddNullableConstraint1674517995314';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ppq" ALTER COLUMN "updated_by_guid" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ALTER COLUMN "updated_by_username" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "updated_by_guid" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "updated_by_username" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "updated_by_username" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "updated_by_guid" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ALTER COLUMN "updated_by_username" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ALTER COLUMN "updated_by_guid" DROP NOT NULL`,
    );
  }
}
