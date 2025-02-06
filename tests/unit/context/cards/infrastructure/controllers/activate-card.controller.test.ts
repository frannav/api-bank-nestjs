import { Logger } from "@nestjs/common";

import { createMock, Mock } from "@/tests/utils/mock";

import { ActivateCard } from "@/src/contexts/cards/application/activate-card";
import { ActivateCardController } from "@/src/contexts/cards/infrastructure/controllers/activate-card.controller";

describe("ActivateCardController", () => {
  let activateCardController: ActivateCardController;
  let activateCard: Mock<ActivateCard>;
  let logger: Mock<Logger>;

  beforeEach(() => {
    activateCard = createMock<ActivateCard>();
    logger = createMock<Logger>();
    activateCardController = new ActivateCardController(activateCard, logger);
  });

  describe("execute", () => {
    const cardId = "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33";

    it("should activate a card", async () => {
      await activateCardController.execute(cardId);

      expect(logger.log).toHaveBeenCalledWith(
        "ActivateCardController endpoint called!",
      );
      expect(activateCard.execute).toHaveBeenCalledWith({ cardId });
    });
  });
});
