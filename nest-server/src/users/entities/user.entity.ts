import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum ClasseUser{
    USUARIO = "usuario",
    LOJISTA = "lojista"
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    documento: string;

    @Column()
    email: string;

    @Column()
    senha: string;

    @Column()
    saldo: number;

    @Column({
        type: "enum",
        enum: ClasseUser,
        default: ClasseUser.USUARIO
    })
    classe: ClasseUser
}

