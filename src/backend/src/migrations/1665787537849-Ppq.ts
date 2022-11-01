import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ppq1665787537849 implements MigrationInterface {
  name = 'Ppq1665787537849';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_ministry_enum" AS ENUM('HEALTH')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_pia_type_enum" AS ENUM('NEW_INITIATIVE', 'INITIATIVE_UPDATE', 'CORPORATE_CHECKLIST', 'NOT_SURE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_contains_personal_information_enum" AS ENUM('YES', 'NO', 'NOT_SURE')`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_other_factors_enum" AS ENUM('HAS_SENSITIVE_PERSONAL_INFORMATION', 'HAS_SHARING_OF_PERSONAL_INFORMATION', 'HAS_PROGRAM_AGREEMENT', 'HAS_OTHERS_ACCESS_TO_PERSONAL_INFORNATION', 'HAS_CLOUD_TECHNOLOGY', 'HAS_POTENTIAL_PUBLIC_INTEREST', 'HAS_DISCLOSURE_OUTSIDE_OF_CANADA', 'HAS_HIGH_VOLUMES_PERSONAL_INFORMATION', 'HAS_DATA_LINKING', 'HAS_BC_SERVICES_CARD_ONBOARDING', 'HAS_AI_OR_ML', 'HAS_PARTNERSHIP_NON_MINISTRY')`,
    );
    await queryRunner.query(
      `CREATE TABLE "ppq" ("id" SERIAL NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "ministry" "public"."ppq_ministry_enum" NOT NULL, "branch" character varying NOT NULL, "initiative_name" character varying NOT NULL, "initiative_description" character varying NOT NULL, "data_elements" character varying NOT NULL, "pia_type" "public"."ppq_pia_type_enum" NOT NULL, "contains_personal_information" "public"."ppq_contains_personal_information_enum" NOT NULL, "other_factors" "public"."ppq_other_factors_enum" array NOT NULL DEFAULT '{}', "proposed_start_date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_b2c6d3a76aa66ba91bd01dd9d29" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ppq"`);
    await queryRunner.query(`DROP TYPE "public"."ppq_other_factors_enum"`);
    await queryRunner.query(
      `DROP TYPE "public"."ppq_contains_personal_information_enum"`,
    );
    await queryRunner.query(`DROP TYPE "public"."ppq_pia_type_enum"`);
    await queryRunner.query(`DROP TYPE "public"."ppq_ministry_enum"`);
  }
}
