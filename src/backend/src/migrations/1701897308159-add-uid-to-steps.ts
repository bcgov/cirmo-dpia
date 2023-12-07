import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUidToSteps1701897308159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add 'uid' property to each step in the existing steps array
    await queryRunner.query(`
            UPDATE "pia-intake"
            SET "collection_use_and_disclosure" = jsonb_set(
                "collection_use_and_disclosure",
                '{steps}',
                COALESCE(
                    (
                        SELECT jsonb_agg(
                            jsonb_set(
                                elem,
                                '{uid}',
                                to_jsonb((CAST(EXTRACT(EPOCH FROM NOW()) * 1000 AS BIGINT) + FLOOR(RANDOM() * 10000))::TEXT || '-' || SUBSTR(MD5(RANDOM()::TEXT), 0, 10))
                            )
                        )
                        FROM jsonb_array_elements("collection_use_and_disclosure"->'steps') WITH ORDINALITY arr(elem, index)
                    ),
                    '[]'
                )
            )
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback logic to remove 'uid' property from each step in the existing steps array
    await queryRunner.query(`
    UPDATE "pia-intake"
    SET "collection_use_and_disclosure" = jsonb_set(
        "collection_use_and_disclosure",
        '{steps}',
        COALESCE(
            (
                SELECT jsonb_agg(
                    jsonb_set(
                        elem,
                        '{uid}',
                        'null'::jsonb -- or the default value you want to set for 'uid' here
                    )
                )
                FROM jsonb_array_elements("collection_use_and_disclosure"->'steps') WITH ORDINALITY arr(elem, index)
            ),
            '[]'
        )
    )
`);
  }
}
