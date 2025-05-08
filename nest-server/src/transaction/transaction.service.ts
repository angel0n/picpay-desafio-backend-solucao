import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { NotFoundException } from 'src/exceptions/NotFoundException';
import { InvalidSomethingException } from 'src/exceptions/InvalidSomethingException';
import { ClasseUser } from 'src/users/entities/user.entity';
import { ApiService } from 'src/api/api.service';
import { MultStatusException } from 'src/exceptions/MultStatusException';

@Injectable()
export class TransactionService {

  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepo: Repository<Transaction>,
    private readonly userService: UsersService,
    private readonly apiService: ApiService
  ){}

  async create(createTransactionDto: CreateTransactionDto) {    
    if(createTransactionDto.sendID === createTransactionDto.receiveID) throw new InvalidSomethingException("O usuario de destino não pode ser igual ao de origem!");
    if(createTransactionDto.value <= 0) throw new InvalidSomethingException("O valor da transação não pode ser 0 e nem inferior!")

    const send = await this.userService.findOne(createTransactionDto.sendID);
    const receive = await this.userService.findOne(createTransactionDto.receiveID); 

    if(send == null) throw new NotFoundException("Não encontrado o usuario de origem")
    if(receive == null) throw new NotFoundException("Não encontrado o usuario de destino")
    if(send.classe == ClasseUser.LOJISTA && !createTransactionDto.reimbursement) throw new InvalidSomethingException("Operação não disponível para conta lojista!")
    
    if(createTransactionDto.value > send.saldo) throw new InvalidSomethingException("Saldo insuficiente!")
    
    const authorization = await this.apiService.autorizarTransacao()

    if(!authorization) throw new UnauthorizedException("Transação não autorizada!")

    let transaction = this.transactionRepo.create({
      ...createTransactionDto,
      send,
      receive
    })

    send.saldo = send.saldo - createTransactionDto.value
    receive.saldo = receive.saldo + createTransactionDto.value

    
    await this.userService.update(send.id,send)
    await this.userService.update(receive.id,receive)
    transaction = await this.transactionRepo.save(transaction);
    
    const enviadoEmail = await this.apiService.notificarEmail(receive.email)
    if(!enviadoEmail){
      throw new MultStatusException({
        status: [
          {
            operacao: "transacao",
            status: 200,
            response: transaction
          },
          {
            operacao: "notificacao",
            status: 504,
            response: "Notificação não enviada!"
          }
        ]
      })
    }

    return transaction
  }

  findOne(id: number) {
    return this.transactionRepo.findOneByOrFail({ id });
  }

  async reverter(id: number){
    const transaction = await this.transactionRepo.findOne({ 
      select: {
        id: true,
        value: true,
        reimbursement: true,
        send: { id: true },
        receive: { id: true }
      },
      where: { id }, 
      relations: ['send', 'receive'] 
    })
    if(transaction == null) throw new NotFoundException("Transação não encontrada!")
    if(transaction.reimbursement) throw new InvalidSomethingException("A transação já é um reembolso!")
    
    const reembolso = await this.create({
      receiveID: transaction.send.id,
      sendID: transaction.receive.id,
      value: transaction.value,
      reimbursement: true
    })
    reembolso.reimbursement = true
    
    return this.transactionRepo.update(reembolso.id, reembolso)
  }
}
