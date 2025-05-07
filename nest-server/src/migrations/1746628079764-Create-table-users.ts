import { MigrationInterface, QueryRunner, Table, TableUnique } from "typeorm";

export class CreateTableUsers1746628079764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        generationStrategy: "increment",
                        isGenerated: true,                    
                    },
                    {
                        name: "nome",
                        type: "varchar"
                    },
                    {
                        name: "documento",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "senha",
                        type: "varchar"
                    },
                    {
                        name: "classe",
                        type: "enum",
                        enum: ["usuario", "lojista"],
                        default: "'usuario'"
                    }
                ]
            })
        )
        await queryRunner.createPrimaryKey("users", ["id"], "PK_USERS")
        await queryRunner.createUniqueConstraint("users", new TableUnique({
            name: "UQ_USERS_EMAIL",
            columnNames: ["email"],
        }));
        await queryRunner.createUniqueConstraint("users", new TableUnique({
            name: "UQ_USERS_DOCUMENTO",
            columnNames: ["documento"],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint("users","UQ_USERS_DOCUMENTO");
        await queryRunner.dropUniqueConstraint("users","UQ_USERS_EMAIL");
        await queryRunner.dropPrimaryKey("users","PK_USERS")
        await queryRunner.dropTable("users");
    }

}
