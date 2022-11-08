import { MigrationInterface, QueryRunner } from 'typeorm';

export class PpqIterationTwo1667891146340 implements MigrationInterface {
  name = 'ppqIterationTwo1667891146340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "email"`);
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "branch"`);
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "initiative_name"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "initiative_description"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "data_elements"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_sharing_of_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "contains_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "title" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "delegated_review_type" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" ADD "has_data_linking" boolean`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ALTER COLUMN "pia_type" SET NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ppq" ALTER COLUMN "pia_type" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "has_data_linking"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "delegated_review_type"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "title"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "contains_personal_information" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_sharing_of_personal_information" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "data_elements" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "initiative_description" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "initiative_name" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "branch" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "email" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "name" character varying NOT NULL`,
    );
  }
}
