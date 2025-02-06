import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import { LoggerModule } from "@/shared/logger/logger.module";

import { AccountEntity } from "./contexts/accounts/infrastructure/persistence/account.entity";
import { CardsModule } from "./contexts/cards/cards.module";
import { CardEntity } from "./contexts/cards/infrastructure/persistence/card.entity";
import { HealthController } from "./contexts/health/infrastructure/health.controller";
import { TransactionEntity } from "./contexts/transactions/infrastructure/persistence/transaction.entity";
import { TransactionsModule } from "./contexts/transactions/transactions.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST"),
        port: configService.get("DB_PORT"),
        username: configService.get("DB_USER"),
        password: configService.get("DB_PASSWORD"),
        database: configService.get("DB_NAME"),
        entities: [CardEntity, AccountEntity, TransactionEntity],
        synchronize: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TransactionsModule,
    CardsModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
