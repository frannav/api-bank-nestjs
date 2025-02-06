import { Inject, Injectable } from "@nestjs/common";

import {
  CARD_REPOSITORY,
  type CardRepository,
} from "../domain/card.repository";
import { CardAlreadyActivatedException } from "../domain/card-already-activated.exception";
import { CardNotFoundException } from "../domain/card-not-found.exception";

export interface ActivateCardCommand {
  cardId: string;
}

@Injectable()
export class ActivateCard {
  constructor(
    @Inject(CARD_REPOSITORY)
    private readonly cardRepository: CardRepository,
  ) {}

  async execute(command: ActivateCardCommand): Promise<void> {
    const card = await this.cardRepository.findById(command.cardId);
    if (!card) {
      throw new CardNotFoundException(command.cardId);
    }

    if (card.getIsActive()) {
      throw new CardAlreadyActivatedException(command.cardId);
    }

    card.activate();
    await this.cardRepository.update(card);
  }
}
