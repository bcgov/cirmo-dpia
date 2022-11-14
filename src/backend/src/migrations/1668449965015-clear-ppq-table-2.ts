import { MigrationInterface, QueryRunner } from 'typeorm';

export class ClearPpqTable21667890002398 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from ppq`);
  }

  public async down(): Promise<void> {
    // no going back
  }
}
