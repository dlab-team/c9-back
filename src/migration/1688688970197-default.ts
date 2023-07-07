import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688688970197 implements MigrationInterface {
    name = 'Default1688688970197'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "description" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    }

}
