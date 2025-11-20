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
 │   └── dto/
 │
 ├── rabbitmq/
 │   ├── consumer.service.ts
 │   └── producer.service.ts
 │
 ├── drizzle/
 │   ├── schema.ts
 │   ├── migrations/
 │   └── drizzle.config.ts
 │
 ├── customer/
 │   └── customer.service.ts
 │
 ├── main.ts
 └── app.module.ts

scripts/
 └── seed.ts
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
