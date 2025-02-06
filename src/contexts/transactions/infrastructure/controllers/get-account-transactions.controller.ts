import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Param,
} from "@nestjs/common";

import {
  GetAccountTransactions,
  TransactionResponse,
} from "../../application/get-account-transactions";
import { AccountNotFoundException } from "../../domain/account-not-found.exception";

@Controller("accounts")
export class GetAccountTransactionsController {
  constructor(
    private readonly getAccountTransactions: GetAccountTransactions,
    @Inject(Logger) private readonly logger: Logger,
  ) {}

  @Get(":accountId/transactions")
  async execute(
    @Param("accountId") accountId: string,
  ): Promise<TransactionResponse[]> {
    this.logger.log("GetAccountTransactionsController endpoint called!");

    if (!this.isValidUUID(accountId)) {
      throw new BadRequestException("Invalid account ID format");
    }

    try {
      return await this.getAccountTransactions.execute({ accountId });
    } catch (error) {
      if (error instanceof AccountNotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new InternalServerErrorException(
        "An error occurred while getting the transactions",
      );
    }
  }

  private isValidUUID(uuid: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }
}
