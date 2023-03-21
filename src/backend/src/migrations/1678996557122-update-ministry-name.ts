import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateMinistryName1678996557122 implements MigrationInterface {
  name = 'UpdateMinistryName1678996557122';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='POST_SECONDARY_EDUCATION_AND_FUTURE_SKILLS'
        WHERE ministry='ADVANCED_EDUCATION_AND_SKILLS_TRAINING'`);

    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='JOBS_ECONOMIC_DEVELOPMENT_AND_INNOVATION'
        WHERE ministry='JOBS_ECONOMIC_RECOVERY_AND_INNOVATION'`);

    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='WATER_LAND_AND_RESOURCE_STEWARDSHIP'
        WHERE ministry='LAND_WATER_AND_RESOURCE_STEWARDSHIP'`);

    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='PUBLIC_SAFETY_AND_SOLICITOR_GENERAL'
        WHERE ministry='PUBLIC_SAFETY_AND_SOLICITOR_GENERAL_AND_EMERGENCY_BC'`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='PUBLIC_SAFETY_AND_SOLICITOR_GENERAL_AND_EMERGENCY_BC'
    WHERE ministry='PUBLIC_SAFETY_AND_SOLICITOR_GENERAL'`);

    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='LAND_WATER_AND_RESOURCE_STEWARDSHIP'
        WHERE ministry='WATER_LAND_AND_RESOURCE_STEWARDSHIP'`);

    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='JOBS_ECONOMIC_RECOVERY_AND_INNOVATION'
        WHERE ministry='JOBS_ECONOMIC_DEVELOPMENT_AND_INNOVATION'`);

    await queryRunner.query(`UPDATE "pia-intake"  SET "ministry" ='ADVANCED_EDUCATION_AND_SKILLS_TRAINING'
        WHERE ministry='POST_SECONDARY_EDUCATION_AND_FUTURE_SKILLS'`);
  }
}
