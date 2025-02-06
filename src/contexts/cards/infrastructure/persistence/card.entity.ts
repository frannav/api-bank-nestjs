import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { AccountEntity } from "../../../accounts/infrastructure/persistence/account.entity";
import { Card, CardType } from "../../domain/card.entity";

@Entity("cards")
export class CardEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 16, name: "card_number" })
  cardNumber!: string;

  @Column({ length: 60 })
  pin!: string;

  @Column({ type: "enum", enum: CardType, name: "card_type" })
  cardType!: CardType;

  @Column("uuid", { name: "account_id" })
  accountId!: string;

  @Column({ default: false, name: "is_active" })
  isActive!: boolean;

  @Column("decimal", { precision: 10, scale: 2, name: "daily_limit" })
  dailyLimit!: number;

  @Column("decimal", {
    precision: 10,
    scale: 2,
    nullable: true,
    name: "credit_limit",
  })
  creditLimit?: number;

  @Column("timestamp", { name: "expiration_date" })
  expirationDate!: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({ name: "account_id" })
  account!: AccountEntity;

  static fromDomain(card: Card): CardEntity {
    const entity = new CardEntity();
    const primitives = card.toPrimitives();
    Object.assign(entity, primitives);
    return entity;
  }

  toDomain(): Card {
    return new Card(
      this.id,
      this.cardNumber,
      this.pin,
      this.cardType,
      this.accountId,
      this.dailyLimit,
      this.expirationDate,
      this.isActive,
      this.creditLimit,
      this.createdAt,
      this.updatedAt,
    );
  }
}
