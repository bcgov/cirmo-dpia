import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeAllowNullAll1674601836799 implements MigrationInterface {
  name = 'piaIntakeAllowNullAll1674601836799';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "ministry" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "branch" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "drafter_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "drafter_title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "drafter_email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "lead_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "lead_title" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "lead_email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "mpo_name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "mpo_email" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "initiative_description" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "initiative_scope" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "data_elements_involved" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "status" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "status" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "data_elements_involved" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "initiative_scope" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "initiative_description" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "mpo_email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "mpo_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "lead_email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "lead_title" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "lead_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "drafter_email" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "drafter_title" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "drafter_name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "branch" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "ministry" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ALTER COLUMN "title" SET NOT NULL`,
    );
  }
}
