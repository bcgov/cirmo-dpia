import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeEntity1669227797131 implements MigrationInterface {
  name = 'piaIntakeEntity1669227797131';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pia-intake" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "ministry" character varying NOT NULL, "branch" character varying NOT NULL, "drafter_info" character varying NOT NULL, "drafter_email" character varying NOT NULL, "lead_info" character varying NOT NULL, "lead_email" character varying NOT NULL, "mpo_info" character varying NOT NULL, "mpo_email" character varying NOT NULL, "initiative_description" character varying NOT NULL, "initiative_scope" character varying NOT NULL, "data_elements_involved" character varying NOT NULL, "has_added_pi_to_data_elements" boolean, "risk_mitigation" character varying, CONSTRAINT "PK_11a96bc6c11cdc346816707c095" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pia-intake"`);
  }
}
