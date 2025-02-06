export class CardNotActivatedException extends Error {
  constructor(cardId: string) {
    super(`Card ${cardId} is not activated`);
    this.name = "CardNotActivatedException";
  }
}
