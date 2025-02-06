export class InsufficientFundsException extends Error {
  constructor(accountId: string) {
    super(
      `Account ${accountId} has insufficient funds to perform this operation`,
    );
    this.name = "InsufficientFundsException";
  }
}
