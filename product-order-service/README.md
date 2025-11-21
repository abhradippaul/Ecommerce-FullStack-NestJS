# Product Order Service

The Product Order Service is a core microservice in a distributed e-commerce system.
It is responsible for creating orders, validating product stock, and communicating with other microservices using RabbitMQ.

Built with NestJS, PostgreSQL, Drizzle ORM, RabbitMQ, and TypeScript.

## Tech Stack

Component Purpose

- NestJS Backend framework for scalable API development
- PostgreSQL Stores all product + order data
- Drizzle ORM Schema-safe ORM + migrations
- RabbitMQ Message queue for order events
- TypeScript Fully typed business logic

## Features

- Order Creation, Validate product availability, Reduce product stock, Persist order details
- Producer: publish order.created
- Consumer: listen to order.completed / order.failed
- Backend Health Check
- Database Seeding
- Event-Driven Workflow Supports scalable asynchronous order processing
- RabbitMQ Integration
- Supports scalable asynchronous order processing
- Drizzle ORM Support Schema, migrations, and type-safe queries

### Folder Example

```
src/
 ├── orders/
 │   ├── orders.controller.ts
 │   ├── orders.service.ts
 │   ├── orders.module.ts
 │   └── dto/
 |
 ├── products/
 │   ├── products.controller.ts
 │   ├── products.service.ts
 │   ├── products.module.ts
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
cd product-order-service
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a .env file:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/customer
RABBITMQ_URL=amqp://userLpassword@localhost:5672
PORT=
```

### Generate & Run Drizzle Migrations

```bash
npm run db:generate
npm run db:migrate
```

## RabbitMQ Integration

### Consumer

- Listens for order.completed/failed events:
- Validates customer existence
- Performs business logic
- Triggers producer response

### Producer

- Sends events back to RabbitMQ:
- order.created

This enables loose coupling and horizontal scalability across microservices.

## API Endpoints

- GET /api/v1 -> Verifies the Product Order backend is running.
- POST /api/v1/orders -> Creates a new order and triggers RabbitMQ workflow.
- GET /api/v1/orders/history?userId= -> Return order histroy list.
- GET /api/v1/products -> Return all products list.

### Run in Development

```bash
# Running product-order-service
cd product-order-service
npm run start:dev
```
