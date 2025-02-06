import { Card, CardType } from "@/src/contexts/cards/domain/card.entity";
import { CardAlreadyActivatedException } from "@/src/contexts/cards/domain/card-already-activated.exception";

const createCard = (isActive = false) =>
  new Card(
    "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    "4532015112830366",
    "hashedPin",
    CardType.DEBIT,
    "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    1000,
    new Date("2025-12-31"),
    isActive,
  );

describe("Card", () => {
  describe("activate", () => {
    it("should activate an inactive card", () => {
      const card = createCard(false);

      card.activate();

      expect(card.getIsActive()).toBe(true);
    });

    it("should throw when activating an already active card", () => {
      const card = createCard(true);

      expect(() => {
        card.activate();
      }).toThrow(CardAlreadyActivatedException);
    });
  });

  describe("changePin", () => {
    it("should change pin when format is valid", async () => {
      const card = createCard(true);
      const newPin = "1234";

      const updatedCard = await card.changePin(newPin);

      expect(updatedCard.id).toBe(card.id);
      expect(await updatedCard.isValidPin(newPin)).toBe(true);
    });

    it("should throw when pin format is invalid", async () => {
      const card = createCard(true);

      await expect(card.changePin("123")).rejects.toThrow(
        "PIN must be 4 digits",
      );
      await expect(card.changePin("12345")).rejects.toThrow(
        "PIN must be 4 digits",
      );
      await expect(card.changePin("abcd")).rejects.toThrow(
        "PIN must be 4 digits",
      );
    });
  });

  describe("canWithdraw", () => {
    it("should allow withdrawal within daily limit for active debit card", () => {
      const card = createCard(true);

      expect(card.canWithdraw(500)).toBe(true);
      expect(card.canWithdraw(1500)).toBe(false);
    });

    it("should not allow withdrawal for inactive card", () => {
      const card = createCard(false);

      expect(card.canWithdraw(500)).toBe(false);
    });

    it("should check credit limit for credit cards", () => {
      const creditCard = new Card(
        "id",
        "number",
        "pin",
        CardType.CREDIT,
        "accountId",
        2000, // daily limit
        new Date(),
        true,
        2000, // credit limit
      );

      expect(creditCard.canWithdraw(1500)).toBe(true);
      expect(creditCard.canWithdraw(2500)).toBe(false);
    });
  });

  describe("isValidPin", () => {
    it("should validate pin correctly", async () => {
      const card = createCard();
      const validPin = "1234";

      const cardWithKnownPin = await card.changePin(validPin);

      expect(await cardWithKnownPin.isValidPin(validPin)).toBe(true);
      expect(await cardWithKnownPin.isValidPin("wrong")).toBe(false);
    });
  });
});
