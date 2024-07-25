import { Column, MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnIsDeleted1721879826364 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('user', new TableColumn({
            name:'isDeleted',
            type:'boolean',
            default: false
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('user', 'isDeleted')
    }

}
