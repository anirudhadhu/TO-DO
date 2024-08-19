import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720694161444 implements MigrationInterface {
  name = "Migration1720694161444";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "todo" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
    await queryRunner.query(`
            CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "todo"
        `);
  }
}
