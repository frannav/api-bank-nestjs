import { Inject, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";

import { Card, CardType } from "../domain/card.entity";
import {
  CARD_REPOSITORY,
  type CardRepository,
} from "../domain/card.repository";

export interface CreateCardCommand {
  cardNumber: string;
  pin: string;
  cardType: CardType;
  accountId: string;
  dailyLimit: number;
  creditLimit?: number;
}

@Injectable()
export class CreateCard {
  constructor(
    @Inject(CARD_REPOSITORY)
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(command: CreateCardCommand): Promise<void> {
    const hashedPin = await bcrypt.hash(command.pin, 12);

    const card = new Card(
      crypto.randomUUID(),
      command.cardNumber,
      hashedPin,
      command.cardType,
      command.accountId,
      command.dailyLimit,
      new Date("2025-12-31"),
      false,
      command.creditLimit,
    );

    await this.cardRepository.save(card);
  }
}
