import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1685482300960 implements MigrationInterface {
    name = 'Default1685482300960'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "enabled" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "enabled"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
    }

}
