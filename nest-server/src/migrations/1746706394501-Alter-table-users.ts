import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTableUsers1746706394501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users",
            new TableColumn({
                name: "saldo",
                type: "decimal",
                precision: 10,
                scale: 2,
                default: 0
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users","saldo")
    }

}
