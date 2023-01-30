import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateByFieldsDefault1674516560214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // pia-intake table changes
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "updated_by_guid" = created_by_guid
        WHERE updated_by_guid is NULL`, // this check is just a protection; Since the last migration creating the updated_by_.. fields are created in previous migration and will be shipped together with this one. So no real table row will have any updated_by_... field values
    );

    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "updated_by_username" = created_by_username
        WHERE updated_by_username is NULL`, // same as updated_by_guid
    );

    // ppq table changes
    await queryRunner.query(
      `UPDATE "ppq"
        SET "updated_by_guid" = created_by_guid
        WHERE updated_by_guid is NULL`,
    );

    await queryRunner.query(
      `UPDATE "ppq"
        SET "updated_by_username" = created_by_username
        WHERE updated_by_username is NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // ppq table changes rollback
    await queryRunner.query(
      `UPDATE "ppq"
        SET "updated_by_username" = NULL
        WHERE updated_by_username is NOT NULL`,
    );

    await queryRunner.query(
      `UPDATE "ppq"
        SET "updated_by_guid" = NULL
        WHERE updated_by_guid is NOT NULL`,
    );

    // pia-intake table changes rollback
    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "updated_by_username" = NULL
        WHERE updated_by_username is NOT NULL`,
    );

    await queryRunner.query(
      `UPDATE "pia-intake"
        SET "updated_by_guid" = NULL
        WHERE updated_by_guid is NOT NULL`,
    );
  }
}
