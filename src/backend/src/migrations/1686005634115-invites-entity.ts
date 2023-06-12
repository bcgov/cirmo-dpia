import { MigrationInterface, QueryRunner } from 'typeorm';

export class InvitesEntity1686005634115 implements MigrationInterface {
  name = 'InvitesEntity1686005634115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    
    await queryRunner.query(
      `CREATE TABLE "invites" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_guid" character varying NOT NULL, "created_by_username" character varying NOT NULL, "updated_by_guid" character varying NOT NULL, "updated_by_username" character varying NOT NULL, "code" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_by_display_name" character varying NOT NULL, "pia_id" integer NOT NULL, CONSTRAINT "REL_e9fbb70df855a8f96b9ab658c3" UNIQUE ("pia_id"), CONSTRAINT "PK_aa52e96b44a714372f4dd31a0af" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e9fbb70df855a8f96b9ab658c3" ON "invites" ("pia_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "invites" ADD CONSTRAINT "FK_e9fbb70df855a8f96b9ab658c30" FOREIGN KEY ("pia_id") REFERENCES "pia-intake"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "invites" DROP CONSTRAINT "FK_e9fbb70df855a8f96b9ab658c30"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e9fbb70df855a8f96b9ab658c3"`,
    );
    await queryRunner.query(`DROP TABLE "invites"`);
  }
}
