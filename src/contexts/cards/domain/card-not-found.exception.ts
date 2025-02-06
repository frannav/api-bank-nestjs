export class CardNotFoundException extends Error {
  constructor(cardId: string) {
    super(`Card with id ${cardId} was not found`);
    this.name = "CardNotFoundException";
  }
}
