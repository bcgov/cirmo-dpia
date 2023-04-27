import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDrafterTitle1682462763450 implements MigrationInterface {
  name = 'RemoveDrafterTitle1682462763450';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" DROP COLUMN "drafter_title"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pia-intake" ADD "drafter_title" character varying`,
    );
  }
}
