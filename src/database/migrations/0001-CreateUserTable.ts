import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable0001 implements MigrationInterface {
  name = 'CreateUserTable0001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR(255) NOT NULL UNIQUE,
        "password" VARCHAR(255) NOT NULL,
        "email" VARCHAR(255),
        "roles" JSONB
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}