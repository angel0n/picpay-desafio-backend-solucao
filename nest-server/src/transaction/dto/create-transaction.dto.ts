import { IsNumber } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    sendID: number;
    @IsNumber()
    receiveID: number;
    @IsNumber()
    value: number
    reimbursement?: boolean
}
