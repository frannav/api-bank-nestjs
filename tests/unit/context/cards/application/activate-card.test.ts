import { createMock, Mock } from "@/tests/utils/mock";

import { ActivateCard } from "@/src/contexts/cards/application/activate-card";
import { Card, CardType } from "@/src/contexts/cards/domain/card.entity";
import { CardRepository } from "@/src/contexts/cards/domain/card.repository";
import { CardAlreadyActivatedException } from "@/src/contexts/cards/domain/card-already-activated.exception";
import { CardNotFoundException } from "@/src/contexts/cards/domain/card-not-found.exception";

describe("ActivateCard", () => {
  let activateCard: ActivateCard;
  let cardRepository: Mock<CardRepository>;

  beforeEach(() => {
    cardRepository = createMock<CardRepository>();
    activateCard = new ActivateCard(cardRepository);
  });

  const mockCard = new Card(
    "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33",
    "4532015112830366",
    "hashedPin",
    CardType.DEBIT,
    "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    1000,
    new Date("2025-12-31"),
    false,
  );

  describe("execute", () => {
    it("should activate a card successfully", async () => {
      cardRepository.findById.mockResolvedValue(mockCard);

      await activateCard.execute({ cardId: mockCard.id });

      expect(cardRepository.findById).toHaveBeenCalledWith(mockCard.id);
      expect(cardRepository.update).toHaveBeenCalled();
    });

    it("should throw CardNotFoundException when card does not exist", async () => {
      cardRepository.findById.mockResolvedValue(null);

      await expect(
        activateCard.execute({ cardId: "non-existent-id" }),
      ).rejects.toThrow(CardNotFoundException);
    });

    it("should throw CardAlreadyActivatedException when card is already active", async () => {
      const activeCard = new Card(
        mockCard.id,
        mockCard.cardNumber,
        "hashedPin",
        mockCard.cardType,
        mockCard.accountId,
        mockCard.dailyLimit,
        mockCard.expirationDate,
        true,
      );

      cardRepository.findById.mockResolvedValue(activeCard);

      await expect(
        activateCard.execute({ cardId: mockCard.id }),
      ).rejects.toThrow(CardAlreadyActivatedException);
    });
  });
});
