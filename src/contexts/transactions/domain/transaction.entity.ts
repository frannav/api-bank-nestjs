export enum TransactionType {
  WITHDRAWAL = "WITHDRAWAL",
  DEPOSIT = "DEPOSIT",
  TRANSFER_OUT = "TRANSFER_OUT",
  TRANSFER_IN = "TRANSFER_IN",
  COMMISSION = "COMMISSION",
}

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly accountId: string,
    public readonly description: string,
    public readonly timestamp: Date = new Date(),
    public readonly cardId?: string,
    public readonly destinationAccountId?: string,
    public readonly commission?: number,
  ) {}

  toPrimitives() {
    return {
      id: this.id,
      type: this.type,
      amount: this.amount,
      accountId: this.accountId,
      description: this.description,
      timestamp: this.timestamp,
      cardId: this.cardId,
      destinationAccountId: this.destinationAccountId,
      commission: this.commission,
    };
  }
}
