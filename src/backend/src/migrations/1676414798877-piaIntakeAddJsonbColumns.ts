import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeAddJsonbColumns1676414798877
  implements MigrationInterface
{
  name = 'piaIntakeAddJsonbColumns1676414798877';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "collection_use_and_disclosure" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "storing_personal_information" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "security_personal_information" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "accuracy_correction_and_retention" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "personal_information_banks" jsonb`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "additional_risks" jsonb`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "additional_risks"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "personal_information_banks"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "accuracy_correction_and_retention"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "security_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "storing_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "collection_use_and_disclosure"`,
    );
  }
}
