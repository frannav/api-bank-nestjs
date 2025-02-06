import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Transaction } from "../../domain/transaction.entity";
import { TransactionRepository } from "../../domain/transaction.repository";
import { TransactionEntity } from "./transaction.entity";

@Injectable()
export class TypeOrmTransactionRepository implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly repository: Repository<TransactionEntity>,
  ) {}

  async findById(id: string): Promise<Transaction | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByAccountId(accountId: string): Promise<Transaction[]> {
    const entities = await this.repository.find({
      where: { accountId },
      order: { timestamp: "DESC" },
    });

    return entities.map((entity: TransactionEntity) => entity.toDomain());
  }

  async save(transaction: Transaction): Promise<void> {
    const entity = TransactionEntity.fromDomain(transaction);
    await this.repository.save(entity);
  }
}
