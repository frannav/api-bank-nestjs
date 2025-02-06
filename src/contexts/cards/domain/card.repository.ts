import { Card } from "./card.entity";

export const CARD_REPOSITORY = "CARD_REPOSITORY";

export interface CardRepository {
  findById(id: string): Promise<Card | null>;
  findByCardNumber(cardNumber: string): Promise<Card | null>;
  save(card: Card): Promise<void>;
  update(card: Card): Promise<void>;
}
