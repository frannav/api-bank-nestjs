import { createMock, Mock } from "@/tests/utils/mock";

import { ChangePin } from "@/src/contexts/cards/application/change-pin";
import { Card, CardType } from "@/src/contexts/cards/domain/card.entity";
import { CardRepository } from "@/src/contexts/cards/domain/card.repository";
import { CardNotActivatedException } from "@/src/contexts/cards/domain/card-not-activated.exception";
import { CardNotFoundException } from "@/src/contexts/cards/domain/card-not-found.exception";
import { InvalidPinException } from "@/src/contexts/cards/domain/invalid-pin.exception";

describe("ChangePin", () => {
  let changePin: ChangePin;
  let cardRepository: Mock<CardRepository>;

  beforeEach(() => {
    cardRepository = createMock<CardRepository>();
    changePin = new ChangePin(cardRepository);
  });

  const mockCard = new Card(
    "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    "4532015112830366",
    "hashedPin",
    CardType.DEBIT,
    "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    1000,
    new Date("2025-12-31"),
    true,
  );

  describe("execute", () => {
    const command = {
      cardId: mockCard.id,
      currentPin: "1234",
      newPin: "5678",
    };

    it("should change pin successfully", async () => {
      cardRepository.findById.mockResolvedValue(mockCard);
      vi.spyOn(mockCard, "isValidPin").mockResolvedValue(true);
      vi.spyOn(mockCard, "changePin").mockResolvedValue(mockCard);

      await changePin.execute(command);

      expect(cardRepository.findById).toHaveBeenCalledWith(command.cardId);
      expect(cardRepository.update).toHaveBeenCalled();
    });

    it("should throw CardNotFoundException when card does not exist", async () => {
      cardRepository.findById.mockResolvedValue(null);

      await expect(changePin.execute(command)).rejects.toThrow(
        CardNotFoundException,
      );
    });

    it("should throw CardNotActivatedException when card is not active", async () => {
      const inactiveCard = new Card(
        mockCard.id,
        mockCard.cardNumber,
        "hashedPin",
        mockCard.cardType,
        mockCard.accountId,
        mockCard.dailyLimit,
        mockCard.expirationDate,
        false,
      );

      cardRepository.findById.mockResolvedValue(inactiveCard);

      await expect(changePin.execute(command)).rejects.toThrow(
        CardNotActivatedException,
      );
    });

    it("should throw InvalidPinException when current pin is invalid", async () => {
      cardRepository.findById.mockResolvedValue(mockCard);
      vi.spyOn(mockCard, "isValidPin").mockResolvedValue(false);

      await expect(changePin.execute(command)).rejects.toThrow(
        InvalidPinException,
      );
    });
  });
});
