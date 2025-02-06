import {
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Logger,
  Param,
  Post,
} from "@nestjs/common";
import { isUUID } from "class-validator";

import { ActivateCard } from "../../application/activate-card";
import { CardNotFoundException } from "../../domain/card-not-found.exception";

@Controller("cards")
export class ActivateCardController {
  constructor(
    private readonly activateCard: ActivateCard,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Post(":cardId/activate")
  async execute(
    @Param("cardId") cardId: string,
  ): Promise<{ status: HttpStatus }> {
    this.logger.log("ActivateCardController endpoint called!");

    if (!isUUID(cardId)) {
      throw new HttpException("Invalid card ID format", HttpStatus.BAD_REQUEST);
    }

    try {
      await this.activateCard.execute({ cardId });
      return { status: HttpStatus.CREATED };
    } catch (error) {
      if (error instanceof CardNotFoundException) {
        throw new HttpException("Card not found", HttpStatus.NOT_FOUND);
      }
      throw error;
    }
  }
}
