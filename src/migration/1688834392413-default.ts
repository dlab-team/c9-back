// import { MigrationInterface, QueryRunner } from "typeorm";

// export class Default1688834392413 implements MigrationInterface {
//     name = 'Default1688834392413'

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
//         await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_0f55ee08da4d49c8af37738d17d" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//         await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_0f55ee08da4d49c8af37738d17d"`);
//         await queryRunner.query(`DROP TABLE "author"`);
//     }

// }

import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688834392413 implements MigrationInterface {
    name = 'Default1688834392413'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "description" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "publications" ADD COLUMN "author_id" integer`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_0f55ee08da4d49c8af37738d17d" FOREIGN KEY ("author_id") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_0f55ee08da4d49c8af37738d17d"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "author_id"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }
}
