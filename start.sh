#!/bin/bash

npm run db:gen-migrate:all

cd containers && docker-compose up -d && cd ..

( cd customer-service && npm run start:dev > /dev/null 2>&1 ) &
( cd product-order-service && npm run start:dev > /dev/null 2>&1 ) &
( cd frontend && npm run dev > /dev/null 2>&1 ) &