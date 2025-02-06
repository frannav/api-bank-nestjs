import { Inject, Injectable } from "@nestjs/common";

import { AccountNotFoundException } from "../domain/account-not-found.exception";
import {
  TRANSACTION_REPOSITORY,
  type TransactionRepository,
} from "../domain/transaction.repository";

export interface GetAccountTransactionsCommand {
  accountId: string;
}

export interface TransactionResponse {
  id: string;
  amount: number;
  timestamp: Date;
  type: string;
}

@Injectable()
export class GetAccountTransactions {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async execute(
    command: GetAccountTransactionsCommand,
  ): Promise<TransactionResponse[]> {
    const transactions = await this.transactionRepository.findByAccountId(
      command.accountId,
    );

    if (transactions.length === 0) {
      throw new AccountNotFoundException(command.accountId);
    }

    return transactions.map(transaction => ({
      id: transaction.id,
      amount: transaction.amount,
      timestamp: transaction.timestamp,
      type: transaction.type,
    }));
  }
}
