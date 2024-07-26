import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUserTableAllowNullParentUserId1721856144168
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'parendUserId',
      new TableColumn({
        name: 'parentUserId',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'parentUserId',
      new TableColumn({
        name: 'parentUserId',
        type: 'varchar',
        isNullable: false,
      }),
    )
  }
}
