import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1685394465354 implements MigrationInterface {
    name = 'Default1685394465354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_7532126fed4b389584ab805776f"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_8597e7b1e59803cfcc78010c959"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "region_id"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "city_id"`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "region" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "city" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "city_id" integer`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "region_id" integer`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_8597e7b1e59803cfcc78010c959" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_7532126fed4b389584ab805776f" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
