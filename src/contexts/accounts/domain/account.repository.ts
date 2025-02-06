import { Account } from "./account.entity";

export interface AccountRepository {
  findById(id: string): Promise<Account | null>;
  findByIban(iban: string): Promise<Account | null>;
  save(account: Account): Promise<void>;
  update(account: Account): Promise<void>;
}
