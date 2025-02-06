import * as bcrypt from "bcrypt";

import { CardAlreadyActivatedException } from "./card-already-activated.exception";

export enum CardType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT",
}

export class Card {
  constructor(
    public readonly id: string,
    public readonly cardNumber: string,
    private pin: string,
    public readonly cardType: CardType,
    public readonly accountId: string,
    public readonly dailyLimit: number,
    public readonly expirationDate: Date,
    private isActive = false,
    public readonly creditLimit?: number,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date(),
  ) {}

  activate(): void {
    if (this.isActive) {
      throw new CardAlreadyActivatedException(this.id);
    }
    this.isActive = true;
  }

  deactivate(): Card {
    return new Card(
      this.id,
      this.cardNumber,
      this.pin,
      this.cardType,
      this.accountId,
      this.dailyLimit,
      this.expirationDate,
      false,
      this.creditLimit,
      this.createdAt,
      new Date(),
    );
  }

  canWithdraw(amount: number): boolean {
    if (!this.isActive) return false;
    if (amount > this.dailyLimit) return false;
    if (this.cardType === CardType.DEBIT) {
      // TODO: Implement the logic to verify the balance
      return true;
    }
    // TODO: Implement the logic to verify the credit limit
    return amount <= (this.creditLimit ?? 0);
  }

  async isValidPin(pin: string): Promise<boolean> {
    return bcrypt.compare(pin, this.pin);
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  async changePin(newPin: string): Promise<Card> {
    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      throw new Error("PIN must be 4 digits");
    }

    const hashedPin = await bcrypt.hash(newPin, 12);

    return new Card(
      this.id,
      this.cardNumber,
      hashedPin,
      this.cardType,
      this.accountId,
      this.dailyLimit,
      this.expirationDate,
      this.isActive,
      this.creditLimit,
      this.createdAt,
      new Date(),
    );
  }

  toPrimitives() {
    return {
      id: this.id,
      cardNumber: this.cardNumber,
      pin: this.pin,
      cardType: this.cardType,
      accountId: this.accountId,
      isActive: this.isActive,
      dailyLimit: this.dailyLimit,
      creditLimit: this.creditLimit,
      expirationDate: this.expirationDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
