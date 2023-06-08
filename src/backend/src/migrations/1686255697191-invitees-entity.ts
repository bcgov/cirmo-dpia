import { MigrationInterface, QueryRunner } from 'typeorm';

export class InviteesEntity1686255697191 implements MigrationInterface {
  name = 'InviteesEntity1686255697191';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "invitees" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_guid" character varying NOT NULL, "created_by_username" character varying NOT NULL, "updated_by_guid" character varying NOT NULL, "updated_by_username" character varying NOT NULL, "created_by_display_name" character varying NOT NULL, "invite_id" integer NOT NULL, "pia_id" integer NOT NULL, CONSTRAINT "PK_49807fe943a4c77bff2e1dea72d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitees" ADD CONSTRAINT "FK_fd308cc23b98d95fdfcf2f7e456" FOREIGN KEY ("invite_id") REFERENCES "invites"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitees" ADD CONSTRAINT "FK_00d8778872e195b9cb25eb2aef6" FOREIGN KEY ("pia_id") REFERENCES "pia-intake"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invitees" DROP CONSTRAINT "FK_00d8778872e195b9cb25eb2aef6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "invitees" DROP CONSTRAINT "FK_fd308cc23b98d95fdfcf2f7e456"`,
    );
    await queryRunner.query(`DROP TABLE "invitees"`);
  }
}
