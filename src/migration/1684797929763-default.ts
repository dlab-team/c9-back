import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1684797929763 implements MigrationInterface {
    name = 'Default1684797929763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "regions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_1eb9a8899a7db89f6ba473fd847" UNIQUE ("name"), CONSTRAINT "PK_4fcd12ed6a046276e2deb08801c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "publications" ADD "region_id" integer`);
        await queryRunner.query(`ALTER TABLE "publications" ADD CONSTRAINT "FK_7532126fed4b389584ab805776f" FOREIGN KEY ("region_id") REFERENCES "regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP CONSTRAINT "FK_7532126fed4b389584ab805776f"`);
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "region_id"`);
        await queryRunner.query(`DROP TABLE "regions"`);
    }

}
