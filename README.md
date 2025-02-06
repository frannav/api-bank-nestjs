# API Bank ATM

A REST API that simulates an ATM (Automated Teller Machine) system, allowing users to perform common banking operations through their cards.

## 🚀 Overview

This project implements a banking API that handles card operations and transactions in an ATM context. It follows Domain-Driven Design (DDD) principles and Clean Architecture patterns to maintain a clear separation of concerns and business rules.

## 🛠 Tech Stack

- **Framework**: NestJS with Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL with TypeORM
- **Testing**: 
  - Vitest for unit tests
  - Istanbul for code coverage
- **Security**: bcrypt for PIN encryption
- **Container**: Docker & Docker Compose
- **Package Manager**: pnpm
- **Linting & Formatting**: ESLint & Prettier
- **CI/CD**: GitHub Actions

## 🗄️ Database

The application uses PostgreSQL as its database, with the following main entities:
- Cards (debit/credit)
- Accounts
- Transactions

The database is automatically set up and seeded when running the application with **Docker Compose**.

## 📂 Project Structure

The project follows a Domain-Driven Design approach with the following bounded contexts:

### Bounded Contexts

```
src/contexts/
├── cards/               # Cards Bounded Context
│   ├── application/     # Use Cases/Application Services
│   ├── domain/         # Domain Entities, Value Objects, and Business Rules
│   └── infrastructure/ # Controllers, Repositories Implementation
│       ├── controllers/
│       └── persistence/
│
├── transactions/        # Transactions Bounded Context
│   ├── application/
│   ├── domain/
│   └── infrastructure/
│
└── health/             # Health Check Context
```

### Key Concepts per Context

#### Cards Context
- Manages card operations (activation, PIN changes)
- Handles card types (debit/credit)
- Enforces security rules (PIN validation)
- Controls withdrawal limits

#### Transactions Context
- Handles financial transactions
- Manages transaction history
- Supports different transaction types (deposits, withdrawals, transfers)

### Shared Kernel
```
src/shared/
├── logger/     # Shared Logging Module
└── types/      # Common TypeScript Types
```

Each bounded context follows Clean Architecture principles with clear separation between:
- **Domain Layer**: Core business rules and entities
- **Application Layer**: Use cases and application services
- **Infrastructure Layer**: External concerns (controllers, persistence)

This structure ensures:
- High cohesion within contexts
- Loose coupling between contexts
- Clear boundaries for business logic
- Scalability and maintainability

# 📝 Use Cases

The API implements the following use cases:

## Cards
- **Activate Card**: Allows activating an inactive card
- **Change PIN**: Allows changing the PIN of an active card (requires current PIN verification) 
- **Validate PIN**: Validates if a given PIN matches the card's PIN
## Transactions
- **Get Account Transactions**: Retrieves all transactions for a given account
  - Returns transaction details

## ❌ Use Cases Not implemented Yet

- **Withdraw money** only from the account associated with the card inserted into the ATM. If it's a debit card, withdrawals are only allowed if there are sufficient funds. If it's a credit card, withdrawals are also allowed as long as they don't exceed the available credit limit. Money cannot be withdrawn above the configured limit for the card, whether debit or credit. If using an ATM from another bank, their applicable fees must be taken into account.

- **Deposit money** but only into the account associated with the inserted card and only if the ATM belongs to the same bank. Money cannot be deposited at ATMs from other banks.

- **Make transfers** to other accounts within the same bank or different banks. The destination IBAN must be validated as a valid IBAN, and it should be taken into account that transfers to other banks may incur fees.

# 🧑‍💻 Developing

First, we will need to create our .env file, we can create a copy from the example one:

```bash
cp .env.example .env
```

Now, we will need to install `pnpm` globally, you can do it running:

```bash
npm install -g pnpm@9.14.2
```

The project is fully dockerized 🐳, if we want to start the app in **development mode**, we just need to run:

```bash
docker-compose up
```

This development mode will work with **hot-reload** and expose a **debug port**, port `9229`, so later we can connect to it from our editor.

If you want to stop developing, you can stop the service running:

```bash
docker-compose down
```

## ⚙️ Building

```bash
node --run build
```

## ✅ Testing

The service provide different scripts for running the tests, to run all of them you can run:

```bash
node --run test
```

If you are interested just in the unit tests, you can run:

```bash
node --run test:unit
```

## 💅 Linting

To run the linter you can execute:

```bash
node --run lint
```

And for trying to fix lint issues automatically, you can run:

```bash
node --run lint:fix
```
