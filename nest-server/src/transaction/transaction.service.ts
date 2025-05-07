import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly userService: UsersService
  ){}

  async create(createTransactionDto: CreateTransactionDto) {
    const send = await this.userService.findOne(createTransactionDto.sendID);
    const receive = await this.userService.findOne(createTransactionDto.receiveID); 

    if(send == null) throw new NotFoundException("Não encontrado o usuario de origem")
    if(receive == null) throw new NotFoundException("Não encontrado o usuario de destino")
    
    const transaction = this.transactionRepo.create({
      ...createTransactionDto,
      send,
      receive
    })

    return this.transactionRepo.save(transaction);
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }
}
