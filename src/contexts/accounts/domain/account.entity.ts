export class Account {
  constructor(
    public id: string,
    public accountNumber: string,
    public iban: string,
    public balance: number,
    public ownerName: string,
    public bankId: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}

  deposit(amount: number): void {
    if (amount <= 0) {
      throw new Error("Deposit amount must be positive");
    }
    this.balance += amount;
  }
}
