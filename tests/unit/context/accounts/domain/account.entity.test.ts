import { Account } from "@/src/contexts/accounts/domain/account.entity";

const createAccount = (balance = 1000) =>
  new Account(
    "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "11112222",
    "ES9121000418450200051332",
    balance,
    "Luke Skywalker",
    "BBVA",
    new Date(),
    new Date(),
  );

describe("Account", () => {
  it("should create account", () => {
    const account = createAccount();
    expect(account).toBeDefined();
  });
});
