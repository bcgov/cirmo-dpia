import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateReplyTable1701818277807 implements MigrationInterface {
  name = 'CreateReplyTable1701818277807';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "replies" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_guid" character varying NOT NULL, "created_by_username" character varying NOT NULL, "updated_by_guid" character varying NOT NULL, "updated_by_username" character varying NOT NULL, "text" character varying, "is_resolved" boolean NOT NULL DEFAULT false, "created_by_display_name" character varying NOT NULL, "comment_id" integer NOT NULL, CONSTRAINT "PK_08f619ebe431e27e9d206bea132" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "new_intake"`,
    );
    await queryRunner.query(
      `ALTER TABLE "replies" ADD CONSTRAINT "FK_6a0cb640778c01be0d360c8f00d" FOREIGN KEY ("comment_id") REFERENCES "comments"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "replies" DROP CONSTRAINT "FK_6a0cb640778c01be0d360c8f00d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "new_intake" boolean`,
    );
    await queryRunner.query(`DROP TABLE "replies"`);
  }
}
