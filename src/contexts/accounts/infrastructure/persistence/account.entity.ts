import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("accounts")
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true, length: 20 })
  accountNumber!: string;

  @Column({ unique: true, length: 34 })
  iban!: string;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  balance!: number;

  @Column({ length: 100 })
  ownerName!: string;

  @Column({ length: 4 })
  bankId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
