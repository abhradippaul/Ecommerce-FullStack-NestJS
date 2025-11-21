# Next.js Frontend – E-Commerce Client

A modern Next.js frontend built for a scalable microservices-based e-commerce system.
This application interacts with the Customer Management Service and Product Order Service, handling:

- Customer authentication
- Product browsing
- Order creation
- UI for a fully decoupled microservice backend

Built using Next.js, TypeScript, TailwindCSS, and React Query (or your chosen data-fetching layer).

## Tech Stack

Component Purpose

- Next.js (App Router) Frontend framework
- TypeScript Type safety
- TailwindCSS Styling
- Tanstack Query Data fetching & caching
- Next.js Route Handlers API proxies to microservices
- Cookies / JWT Session management
- ShadCN Components library

## Features

- Customer Authentication Login / Logout
- Cookie-based JWT handling
- Auto user verification
- Display product list from Product Order Service
- Create orders (via API routes → backend)
- Secure Cookie Management using Next.js Route Handlers
- Microservice Communication via backend APIs
- Responsive UI built with TailwindCSS

## Folder Structure

```
app/
│
├── page.tsx
│
├── login/
│   └── page.tsx
│
├── products/
│   ├── page.tsx
│
├── orders/
│   ├── page.tsx
│   └── create/
│       └── page.tsx
│
├── account/
│   └── page.tsx
│

```

## Setup & Installation

Clone the Repo

```
git clone https://github.com/abhradippaul/Ecommerce-FullStack-NestJS.git
cd frontend
```

Install Dependencies

```
npm install
```

Running the App Development

```
npm run dev
```

Add Environment Variables

```
NEXT_PUBLIC_CUSTOMER_BACKEND_URL=""
NEXT_PUBLIC_PRODUCT_ORDER_BACKEND_URL=""
NEXT_PUBLIC_API_VERSION=""
```
