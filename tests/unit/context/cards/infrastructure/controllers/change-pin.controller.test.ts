import { Logger } from "@nestjs/common";

import { createMock, Mock } from "@/tests/utils/mock";

import { ChangePin } from "@/src/contexts/cards/application/change-pin";
import { ChangePinController } from "@/src/contexts/cards/infrastructure/controllers/change-pin.controller";

describe("ChangePinController", () => {
  let changePinController: ChangePinController;
  let changePin: Mock<ChangePin>;
  let logger: Mock<Logger>;

  beforeEach(() => {
    changePin = createMock<ChangePin>();
    logger = createMock<Logger>();
    changePinController = new ChangePinController(changePin, logger);
  });

  describe("execute", () => {
    const cardId = "c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a33";
    const request = {
      currentPin: "1234",
      newPin: "5678",
    };

    it("should change pin", async () => {
      await changePinController.execute(cardId, request);

      expect(logger.log).toHaveBeenCalledWith(
        "ChangePinController endpoint called!",
      );
      expect(changePin.execute).toHaveBeenCalledWith({
        cardId,
        currentPin: request.currentPin,
        newPin: request.newPin,
      });
    });
  });
});
