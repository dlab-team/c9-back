import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689566737681 implements MigrationInterface {
    name = 'Default1689566737681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" ADD "finalContent_EN" text DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "finalContent_EN"`);
    }

}
