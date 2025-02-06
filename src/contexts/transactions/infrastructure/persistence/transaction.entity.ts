import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { AccountEntity } from "../../../accounts/infrastructure/persistence/account.entity";
import { CardEntity } from "../../../cards/infrastructure/persistence/card.entity";
import { Transaction, TransactionType } from "../../domain/transaction.entity";

@Entity("transactions")
export class TransactionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: TransactionType })
  type!: TransactionType;

  @Column("decimal", { precision: 10, scale: 2 })
  amount!: number;

  @Column("uuid", { name: "account_id" })
  accountId!: string;

  @Column("uuid", { name: "card_id", nullable: true })
  cardId?: string;

  @Column("uuid", { name: "destination_account_id", nullable: true })
  destinationAccountId?: string;

  @Column("decimal", { precision: 10, scale: 2, nullable: true })
  commission?: number;

  @Column("text")
  description!: string;

  @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
  timestamp!: Date;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: "account_id" })
  account!: AccountEntity;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: "destination_account_id" })
  destinationAccount?: AccountEntity;

  @ManyToOne(() => CardEntity)
  @JoinColumn({ name: "card_id" })
  card?: CardEntity;

  static fromDomain(transaction: Transaction): TransactionEntity {
    const entity = new TransactionEntity();
    const primitives = transaction.toPrimitives();
    Object.assign(entity, primitives);
    return entity;
  }

  toDomain(): Transaction {
    return new Transaction(
      this.id,
      this.type,
      this.amount,
      this.accountId,
      this.description,
      this.timestamp,
      this.cardId,
      this.destinationAccountId,
      this.commission,
    );
  }
}
