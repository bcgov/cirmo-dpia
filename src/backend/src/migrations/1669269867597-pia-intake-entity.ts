/**
 * *****************
 * Migration summary
 * *****************
 *
 * This migration adds a new table for 'pia-intake' forms
 * Refer pia-intake.entity.ts for the schema structure
 */

import { MigrationInterface, QueryRunner } from 'typeorm';

export class PiaIntakeEntity1669269867597 implements MigrationInterface {
  name = 'piaIntakeEntity1669269867597';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "pia-intake" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "created_by_guid" character varying NOT NULL, "created_by_username" character varying NOT NULL, "updated_by_guid" character varying NOT NULL, "updated_by_username" character varying NOT NULL, "save_id" character varying NOT NULL, "title" character varying NOT NULL, "ministry" character varying NOT NULL, "branch" character varying NOT NULL, "drafter_name" character varying NOT NULL, "drafter_title" character varying NOT NULL, "drafter_email" character varying NOT NULL, "lead_name" character varying NOT NULL, "lead_title" character varying NOT NULL, "lead_email" character varying NOT NULL, "mpo_name" character varying NOT NULL, "mpo_email" character varying NOT NULL, "initiative_description" character varying NOT NULL, "initiative_scope" character varying NOT NULL, "data_elements_involved" character varying NOT NULL, "has_added_pi_to_data_elements" boolean, "risk_mitigation" character varying, CONSTRAINT "PK_11a96bc6c11cdc346816707c095" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "pia-intake"`);
  }
}
