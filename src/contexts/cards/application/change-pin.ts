import { Inject, Injectable } from "@nestjs/common";

import {
  CARD_REPOSITORY,
  type CardRepository,
} from "../domain/card.repository";
import { CardNotActivatedException } from "../domain/card-not-activated.exception";
import { CardNotFoundException } from "../domain/card-not-found.exception";
import { InvalidPinException } from "../domain/invalid-pin.exception";

export interface ChangePinCommand {
  cardId: string;
  currentPin: string;
  newPin: string;
}

@Injectable()
export class ChangePin {
  constructor(
    @Inject(CARD_REPOSITORY)
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(command: ChangePinCommand): Promise<void> {
    const card = await this.cardRepository.findById(command.cardId);
    if (!card) {
      throw new CardNotFoundException(command.cardId);
    }

    if (!card.getIsActive()) {
      throw new CardNotActivatedException(command.cardId);
    }

    const isValidPin = await card.isValidPin(command.currentPin);
    if (!isValidPin) {
      throw new InvalidPinException();
    }

    const updatedCard = await card.changePin(command.newPin);
    await this.cardRepository.update(updatedCard);
  }
}
