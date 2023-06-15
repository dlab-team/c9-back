import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686700336125 implements MigrationInterface {
    name = 'Default1686700336125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region_id" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "city_id" integer`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_0b663dca66456beb75ec93de9fc" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_8597e7b1e59803cfcc78010c959" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_8597e7b1e59803cfcc78010c959"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_0b663dca66456beb75ec93de9fc"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "city_id"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "region"`);
    }

}
