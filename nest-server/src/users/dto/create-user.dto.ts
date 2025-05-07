import { IsEnum, IsNotEmpty, IsString, isString } from "class-validator";
import { ClasseUser } from "../entities/user.entity";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    nome: string;

    @IsString()
    @IsNotEmpty()
    documento: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    senha: string;
    
    @IsEnum(ClasseUser)
    classe: ClasseUser
}
