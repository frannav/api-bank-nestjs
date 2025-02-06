import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ActivateCard } from "./application/activate-card";
import { ChangePin } from "./application/change-pin";
import { CreateCard } from "./application/create-card";
import { CARD_REPOSITORY } from "./domain/card.repository";
import { ActivateCardController } from "./infrastructure/controllers/activate-card.controller";
import { ChangePinController } from "./infrastructure/controllers/change-pin.controller";
import { CreateCardController } from "./infrastructure/controllers/create-card.controller";
import { CardEntity } from "./infrastructure/persistence/card.entity";
import { TypeOrmCardRepository } from "./infrastructure/persistence/typeorm-card.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CardEntity])],
  providers: [
    ActivateCard,
    ChangePin,
    CreateCard,
    {
      provide: CARD_REPOSITORY,
      useClass: TypeOrmCardRepository,
    },
  ],
  controllers: [
    ActivateCardController,
    ChangePinController,
    CreateCardController,
  ],
})
export class CardsModule {}
