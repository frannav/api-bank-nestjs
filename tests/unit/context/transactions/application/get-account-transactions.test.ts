import { createMock, Mock } from "@/tests/utils/mock";

import { GetAccountTransactions } from "@/src/contexts/transactions/application/get-account-transactions";
import { AccountNotFoundException } from "@/src/contexts/transactions/domain/account-not-found.exception";
import {
  Transaction,
  TransactionType,
} from "@/src/contexts/transactions/domain/transaction.entity";
import { TransactionRepository } from "@/src/contexts/transactions/domain/transaction.repository";

describe("GetAccountTransactions", () => {
  let getAccountTransactions: GetAccountTransactions;
  let transactionRepository: Mock<TransactionRepository>;

  beforeEach(() => {
    transactionRepository = createMock<TransactionRepository>();
    getAccountTransactions = new GetAccountTransactions(transactionRepository);
  });

  const mockTransactions = [
    new Transaction(
      "e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55",
      TransactionType.DEPOSIT,
      1000,
      "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      "Initial deposit",
      new Date(),
      "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    ),
    new Transaction(
      "f0eebc99-9c0b-4ef8-bb6d-6bb9bd380a66",
      TransactionType.WITHDRAWAL,
      200,
      "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
      "ATM withdrawal",
      new Date(),
      "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    ),
  ];

  describe("execute", () => {
    const accountId = "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11";

    it("should return transactions for an account", async () => {
      transactionRepository.findByAccountId.mockResolvedValue(mockTransactions);

      const result = await getAccountTransactions.execute({ accountId });

      expect(transactionRepository.findByAccountId).toHaveBeenCalledWith(
        accountId,
      );
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        id: mockTransactions[0].id,
        amount: mockTransactions[0].amount,
        timestamp: mockTransactions[0].timestamp,
        type: mockTransactions[0].type,
      });
    });

    it("should throw AccountNotFoundException when no transactions exist", async () => {
      transactionRepository.findByAccountId.mockResolvedValue([]);

      await expect(
        getAccountTransactions.execute({ accountId }),
      ).rejects.toThrow(AccountNotFoundException);
    });
  });
});
