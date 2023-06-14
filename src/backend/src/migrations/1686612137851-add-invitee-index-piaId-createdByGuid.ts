import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddInviteeIndexPiaIdCreatedByGuid1686612137851
  implements MigrationInterface
{
  name = 'AddInviteeIndexPiaIdCreatedByGuid1686612137851';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_eb8fbbf45a7489f041ba138889" ON "invitees" ("pia_id", "created_by_guid") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_eb8fbbf45a7489f041ba138889"`,
    );
  }
}
