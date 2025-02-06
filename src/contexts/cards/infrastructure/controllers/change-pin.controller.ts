import {
  BadRequestException,
  Body,
  Controller,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
  Post,
  UnauthorizedException,
} from "@nestjs/common";

import { ChangePin } from "../../application/change-pin";
import { CardNotActivatedException } from "../../domain/card-not-activated.exception";
import { CardNotFoundException } from "../../domain/card-not-found.exception";
import { InvalidPinException } from "../../domain/invalid-pin.exception";

interface ChangePinRequest {
  currentPin: string;
  newPin: string;
}

@Controller("cards")
export class ChangePinController {
  constructor(
    private readonly changePin: ChangePin,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Post(":cardId/change-pin")
  async execute(
    @Param("cardId") cardId: string,
    @Body() request: ChangePinRequest,
  ): Promise<void> {
    this.logger.log("ChangePinController endpoint called!");

    try {
      await this.changePin.execute({
        cardId,
        currentPin: request.currentPin,
        newPin: request.newPin,
      });
    } catch (error) {
      if (error instanceof CardNotFoundException) {
        throw new NotFoundException(error.message);
      }
      if (error instanceof CardNotActivatedException) {
        throw new BadRequestException(error.message);
      }
      if (error instanceof InvalidPinException) {
        throw new UnauthorizedException(error.message);
      }
      if (error instanceof Error && error.message === "PIN must be 4 digits") {
        throw new BadRequestException(error.message);
      }

      this.logger.error("Error changing PIN", error);
      throw new InternalServerErrorException(
        "An error occurred while changing the PIN",
      );
    }
  }
}
