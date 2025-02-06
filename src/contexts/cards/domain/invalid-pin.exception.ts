export class InvalidPinException extends Error {
  constructor() {
    super("The provided PIN is invalid");
    this.name = "InvalidPinException";
  }
}
