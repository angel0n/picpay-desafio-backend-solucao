import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTableTransactions1746647300192 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "transactions",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "send",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "receive",
                        type: "int",
                        isNullable: false,
                    },
                    {
                        name: "value",
                        type: "decimal",
                        precision: 10,
                        scale: 2,
                        isNullable: false,
                    },
                    {
                        name: "reimbursement",
                        type: "boolean",
                        default: false,
                    },
                ],
            })
        );
        await queryRunner.createForeignKey(
            "transactions",
            new TableForeignKey({
                columnNames: ["send"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
        await queryRunner.createForeignKey(
            "transactions",
            new TableForeignKey({
                columnNames: ["receive"],
                referencedTableName: "users",
                referencedColumnNames: ["id"],
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("transactions");
    }
}
