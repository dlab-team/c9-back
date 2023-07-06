import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688682824464 implements MigrationInterface {
    name = 'Default1688682824464'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" ADD "featured" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "featured"`);
    }

}
