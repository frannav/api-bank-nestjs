import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";

import { CreateCard } from "../../application/create-card";
import { CardType } from "../../domain/card.entity";

interface CreateCardRequest {
  cardNumber: string;
  pin: string;
  cardType: CardType;
  accountId: string;
  dailyLimit: number;
  creditLimit?: number;
}

@Controller("cards")
export class CreateCardController {
  constructor(
    private readonly createCard: CreateCard,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Post()
  async execute(@Body() request: CreateCardRequest): Promise<void> {
    this.logger.log("CreateCardController endpoint called!");

    await this.createCard.execute(request);
  }
}
