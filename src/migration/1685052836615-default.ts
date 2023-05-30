import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1685052836615 implements MigrationInterface {
    name = 'Default1685052836615'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question" text NOT NULL, "answer" text NOT NULL, "publication_id" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_1eb9a8899a7db89f6ba473fd847" UNIQUE ("name"), CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_f8c0858628830a35f19efdc0ecf" UNIQUE ("name"), CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."publications_category_enum" AS ENUM('Tecnología', 'Ciencia', 'Entretenimiento', 'Espacio', 'General')`);
        await queryRunner.query(`CREATE TABLE "publications" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "slug" character varying NOT NULL, "initialContent" text NOT NULL, "finalContent" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "category" "public"."publications_category_enum" NOT NULL DEFAULT 'General', "images" text, "user_id" integer, "region_id" integer, "city_id" integer, CONSTRAINT "UQ_52d5468b54d886ad193b9ade07c" UNIQUE ("name"), CONSTRAINT "PK_2c4e732b044e09139d2f1065fae" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_876216af0bd69de421ef2a6084a" FOREIGN KEY ("publication_id") REFERENCES "publications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_9ee3bc3631b2e8919c05d9a1a81" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_7532126fed4b389584ab805776f" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_8597e7b1e59803cfcc78010c959" FOREIGN KEY ("city_id") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_8597e7b1e59803cfcc78010c959"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_7532126fed4b389584ab805776f"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_9ee3bc3631b2e8919c05d9a1a81"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_876216af0bd69de421ef2a6084a"`);
        await queryRunner.query(`DROP TABLE "publications"`);
        await queryRunner.query(`DROP TYPE "public"."publications_category_enum"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "regions"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
