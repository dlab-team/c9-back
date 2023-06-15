import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1686802936393 implements MigrationInterface {
    name = 'Default1686802936393'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" RENAME COLUMN "category" TO "category_id"`);
        await queryRunner.query(`ALTER TYPE "public"."publications_category_enum" RENAME TO "publications_category_id_enum"`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "name2"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "category_id" integer`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_c20d4e71122e8a19eb5a1870b03" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_c20d4e71122e8a19eb5a1870b03"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "category_id"`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "category_id" "public"."publications_category_id_enum" NOT NULL DEFAULT 'General'`);
        await queryRunner.query(`ALTER TABLE "region" ADD "name2" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`ALTER TYPE "public"."publications_category_id_enum" RENAME TO "publications_category_enum"`);
        await queryRunner.query(`ALTER TABLE "publications" RENAME COLUMN "category_id" TO "category"`);
    }

}
