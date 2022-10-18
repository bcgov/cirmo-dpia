import { MigrationInterface, QueryRunner } from 'typeorm';

export class PpqLinearSchema1666070281025 implements MigrationInterface {
  name = 'ppqLinearSchema1666070281025';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "other_factors"`);
    await queryRunner.query(`DROP TYPE "public"."ppq_other_factors_enum"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_sensitive_personal_information" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_sharing_of_personal_information" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_program_agreement" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_others_access_to_personal_information" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_cloud_technology" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_potential_public_interest" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_disclosure_outside_of_canada" boolean`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_high_volumes_personal_information" boolean`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" ADD "has_data_linking" boolean`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_bc_services_card_onboarding" boolean`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" ADD "has_ai_or_ml" boolean`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "has_partnership_non_ministry" boolean`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "ministry"`);
    await queryRunner.query(`DROP TYPE "public"."ppq_ministry_enum"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "ministry" character varying`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "pia_type"`);
    await queryRunner.query(`DROP TYPE "public"."ppq_pia_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "pia_type" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "contains_personal_information"`,
    );
    await queryRunner.query(
      `DROP TYPE "public"."ppq_contains_personal_information_enum"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "contains_personal_information" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "contains_personal_information"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_contains_personal_information_enum" AS ENUM('YES', 'NO', 'NOT_SURE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "contains_personal_information" "public"."ppq_contains_personal_information_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "pia_type"`);
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_pia_type_enum" AS ENUM('NEW_INITIATIVE', 'INITIATIVE_UPDATE', 'CORPORATE_CHECKLIST', 'NOT_SURE')`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "pia_type" "public"."ppq_pia_type_enum" NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "ministry"`);
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_ministry_enum" AS ENUM('HEALTH')`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "ministry" "public"."ppq_ministry_enum" NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_partnership_non_ministry"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "has_ai_or_ml"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_bc_services_card_onboarding"`,
    );
    await queryRunner.query(`ALTER TABLE "ppq" DROP COLUMN "has_data_linking"`);
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_high_volumes_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_disclosure_outside_of_canada"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_potential_public_interest"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_cloud_technology"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_others_access_to_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_program_agreement"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_sharing_of_personal_information"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" DROP COLUMN "has_sensitive_personal_information"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."ppq_other_factors_enum" AS ENUM('HAS_SENSITIVE_PERSONAL_INFORMATION', 'HAS_SHARING_OF_PERSONAL_INFORMATION', 'HAS_PROGRAM_AGREEMENT', 'HAS_OTHERS_ACCESS_TO_PERSONAL_INFORNATION', 'HAS_CLOUD_TECHNOLOGY', 'HAS_POTENTIAL_PUBLIC_INTEREST', 'HAS_DISCLOSURE_OUTSIDE_OF_CANADA', 'HAS_HIGH_VOLUMES_PERSONAL_INFORMATION', 'HAS_DATA_LINKING', 'HAS_BC_SERVICES_CARD_ONBOARDING', 'HAS_AI_OR_ML', 'HAS_PARTNERSHIP_NON_MINISTRY')`,
    );
    await queryRunner.query(
      `ALTER TABLE "ppq" ADD "other_factors" "public"."ppq_other_factors_enum" array NOT NULL DEFAULT '{}'`,
    );
  }
}
