import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class UserTable1721671966980 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uiid_generate_v4()',
          },

          {
            name: 'userName',
            type: 'varchar(100)',
          },
          {
            name: 'passWord',
            type: 'varchar(100)',
          },
          {
            name: 'parentUserId',
            type: 'varchar(100)',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user')
  }
}
