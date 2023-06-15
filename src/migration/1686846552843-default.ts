import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686846552843 implements MigrationInterface {
    name = 'Default1686846552843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "region" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5f48ffc3af96bc486f5f3f3a6da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "region_id" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "category"`);
        await queryRunner.query(`DROP TYPE "public"."publications_category_enum"`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "location" json`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_c20d4e71122e8a19eb5a1870b03" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_0b663dca66456beb75ec93de9fc" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_0b663dca66456beb75ec93de9fc"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_c20d4e71122e8a19eb5a1870b03"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "location"`);
        await queryRunner.query(`CREATE TYPE "public"."publications_category_enum" AS ENUM('Tecnología', 'Ciencia', 'Entretenimiento', 'Espacio', 'General')`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "category" "public"."publications_category_enum" NOT NULL DEFAULT 'General'`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "region"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}