import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { GetAccountTransactions } from "./application/get-account-transactions";
import { TRANSACTION_REPOSITORY } from "./domain/transaction.repository";
import { GetAccountTransactionsController } from "./infrastructure/controllers/get-account-transactions.controller";
import { TransactionEntity } from "./infrastructure/persistence/transaction.entity";
import { TypeOrmTransactionRepository } from "./infrastructure/persistence/typeorm-transaction.repository";

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    GetAccountTransactions,
    {
      provide: TRANSACTION_REPOSITORY,
      useClass: TypeOrmTransactionRepository,
    },
  ],
  controllers: [GetAccountTransactionsController],
})
export class TransactionsModule {}
