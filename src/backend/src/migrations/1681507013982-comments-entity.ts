import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentsEntity1681507013982 implements MigrationInterface {
  name = 'CommentsEntity1681507013982';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_guid" character varying NOT NULL, "created_by_username" character varying NOT NULL, "updated_by_guid" character varying NOT NULL, "updated_by_username" character varying NOT NULL, "path" character varying NOT NULL, "text" character varying, "is_resolved" boolean NOT NULL DEFAULT false, "created_by_display_name" character varying NOT NULL, "pia_id" integer NOT NULL, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_5ae2eaa65792753788d0dbca4ce" FOREIGN KEY ("pia_id") REFERENCES "pia-intake"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_5ae2eaa65792753788d0dbca4ce"`,
    );
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
