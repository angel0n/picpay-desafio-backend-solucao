import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.gto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly authService: AuthService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user: User = this.userRepo.create(createUserDto)
    user.senha = await this.authService.hashPassword(user.senha)

    const userDocumento = await this.userRepo.findOneBy({documento: user.documento})
    const userEmail = await this.userRepo.findOneBy({email: user.email})

    if(userDocumento != null) throw new ConflictException("CPF/CNPJ já cadastrado!")
    if(userEmail != null) throw new ConflictException("e-mail já cadastrado!")

    return this.userRepo.save(user);
  }

  findAll() {
    return this.userRepo.find({ order: { id: "ASC" } });
  }

  async findOneOrFail(id: number) {
    const user = await this.userRepo.findOneBy({ id });
    if(user == null) throw new EntityNotFoundError(User,id);
    return user;
  }

  findOne(id: number){
    return this.userRepo.findOneBy({ id })
  }

  async update(id: number,updateUserDto: UpdateUserDto){
    await this.userRepo.update(id, updateUserDto);
  }
}
