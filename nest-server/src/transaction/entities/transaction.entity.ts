import { User } from "../../users/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("transactions")
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: "send" })
    send: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "receive" })
    receive: User;

    @Column()
    value: number;

    @Column({
        default: false,
    })
    reimbursement: boolean;
}
