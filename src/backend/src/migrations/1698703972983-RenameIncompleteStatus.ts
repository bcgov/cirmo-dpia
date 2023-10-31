import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameIncompleteStatus1698703972983 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "pia-intake" SET "status" = 'DRAFTING_IN_PROGRESS' WHERE "status" = 'INCOMPLETE'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE "pia-intake" SET "status" = 'INCOMPLETE' WHERE "status" = 'DRAFTING_IN_PROGRESS'`,
    );
  }
}
