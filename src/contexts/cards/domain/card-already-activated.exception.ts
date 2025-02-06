export class CardAlreadyActivatedException extends Error {
  constructor(cardId: string) {
    super(`Card ${cardId} is already activated`);
    this.name = "CardAlreadyActivatedException";
  }
}
