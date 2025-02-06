import {
  Transaction,
  TransactionType,
} from "@/src/contexts/transactions/domain/transaction.entity";

const createTransaction = () =>
  new Transaction(
    "e0eebc99-9c0b-4ef8-bb6d-6bb9bd380a55",
    TransactionType.DEPOSIT,
    1000,
    "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    "Initial deposit",
    new Date(),
    "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
  );

describe("Transaction", () => {
  describe("toPrimitives", () => {
    it("should convert transaction to primitives", () => {
      const transaction = createTransaction();
      const primitives = transaction.toPrimitives();

      expect(primitives).toEqual({
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount,
        accountId: transaction.accountId,
        description: transaction.description,
        timestamp: transaction.timestamp,
        cardId: transaction.cardId,
        destinationAccountId: undefined,
        commission: undefined,
      });
    });

    it("should include optional fields when present", () => {
      const transaction = new Transaction(
        "id",
        TransactionType.TRANSFER_OUT,
        100,
        "sourceAccountId",
        "Transfer to Bob",
        new Date(),
        "cardId",
        "destinationAccountId",
        2.5,
      );

      const primitives = transaction.toPrimitives();

      expect(primitives.destinationAccountId).toBe("destinationAccountId");
      expect(primitives.commission).toBe(2.5);
    });
  });
});
