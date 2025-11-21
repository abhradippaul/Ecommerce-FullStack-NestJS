# Customer Management Microservice

A scalable microservice built with NestJS, PostgreSQL, Drizzle ORM, RabbitMQ, and TypeScript for managing customer authentication and handling order events via message queues.

This service is a core component in a distributed e-commerce system—responsible for authentication, customer data management, and order event communication between services.

## Tech Stack

Component Purpose

- NestJS Backend framework for building modular and scalable APIs
- PostgreSQL Primary database to store customer information
- Drizzle ORM Type-safe SQL ORM used for schema + migrations
- RabbitMQ Message broker for inter-service communication
- TypeScript Strongly-typed language for reliability

## Features

- Customer Authentication
- Login / Logout
- JWT Token verification
- Backend Health Check
- Database Seeding
- Populate customers using a seed script
- RabbitMQ Integration
- Consumer: listen to order.created messages
- Producer: publish order.completed or order.failed events

## Microservice-Ready Architecture

- Decoupled
- Scalable
- Event-driven

## Project Structure

```
src/
 ├── auth/
 │   ├── auth.controller.ts
 │   ├── auth.service.ts
 │   ├── auth.module.ts
 │   └── dto/
 │
 ├── producer/
 │   ├── producer.module.ts
 │   └── producer.service.ts
 |
 ├── consumer/
 │   ├── consumer.module.ts
 │   └── consumer.service.ts
 │
 ├── drizzle/
 │   ├── schema.ts
 │   ├── migrate.ts
 │   ├── migrations/
 │   └── drizzle.config.ts
 |
 ├── seed/
 │   ├── seed.module.ts
 │   └── seed.service.ts
 │
 ├── main.ts
 ├── app.controller.ts
 ├── app.service.ts
 └── app.module.ts

```

## Setup Instructions

### Clone the Repository

```bash
git clone https://github.com/abhradippaul/Ecommerce-FullStack-NestJS.git
cd customer-service
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a .env file:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/customer
JWT_SECRET=your_jwt_secret
RABBITMQ_URL=amqp://localhost
PORT=
```

### Generate & Run Drizzle Migrations

```bash
npm run db:generate
npm run db:migrate
```

## RabbitMQ Integration

### Consumer

- Listens for order.created events:
- Validates customer existence
- Performs business logic
- Triggers producer response

### Producer

- Sends events back to RabbitMQ:
- order.completed
- order.failed

This enables loose coupling and horizontal scalability across microservices.

## API Endpoints

- GET /api/v1 -> Confirms that backend service is running
- POST /api/v1/auth/verify -> Checks if the customer is logged in by verifying JWT.
- POST /api/v1/auth/login -> Authenticates customer credentials and returns JWT.
- POST /api/v1/auth/logout -> Clears session token and logs out user.
- POST /api/v1/auth/logout -> Clears session token and logs out user.

```bash
# Running customer-service
cd customer-service
npm run start:dev
```
