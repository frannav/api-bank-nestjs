import { Transaction } from "./transaction.entity";

export const TRANSACTION_REPOSITORY = "TRANSACTION_REPOSITORY";

export interface TransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  findByAccountId(accountId: string): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<void>;
}
