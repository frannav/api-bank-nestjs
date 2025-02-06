import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Card } from "../../domain/card.entity";
import { CardRepository } from "../../domain/card.repository";
import { CardEntity } from "./card.entity";

@Injectable()
export class TypeOrmCardRepository implements CardRepository {
  constructor(
    @InjectRepository(CardEntity)
    private readonly repository: Repository<CardEntity>,
  ) {}

  async findById(id: string): Promise<Card | null> {
    const entity = await this.repository.findOne({ where: { id } });
    return entity ? entity.toDomain() : null;
  }

  async findByCardNumber(cardNumber: string): Promise<Card | null> {
    const entity = await this.repository.findOne({ where: { cardNumber } });
    return entity ? entity.toDomain() : null;
  }

  async save(card: Card): Promise<void> {
    const entity = CardEntity.fromDomain(card);
    await this.repository.save(entity);
  }

  async update(card: Card): Promise<void> {
    const entity = CardEntity.fromDomain(card);
    await this.repository.save(entity);
  }
}
