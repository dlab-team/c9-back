import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1689483423876 implements MigrationInterface {
    name = 'Default1689483423876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" ADD "keywords" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "publications"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
