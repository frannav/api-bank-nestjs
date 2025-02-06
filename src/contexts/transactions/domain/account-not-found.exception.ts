export class AccountNotFoundException extends Error {
  constructor(accountId: string) {
    super(`Account with id ${accountId} was not found`);
    this.name = "AccountNotFoundException";
  }
}
