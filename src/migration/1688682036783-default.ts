import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1688682036783 implements MigrationInterface {
    name = 'Default1688682036783'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" ADD "fecha_publicacion" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "publications" DROP COLUMN "fecha_publicacion"`);
    }

}
