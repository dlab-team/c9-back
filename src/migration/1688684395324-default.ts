import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688684395324 implements MigrationInterface {
    name = 'Default1688684395324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" ADD "visits" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "visits"`);
    }

}
