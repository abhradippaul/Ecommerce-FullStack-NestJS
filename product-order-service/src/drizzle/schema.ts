import { integer, pgTable, uuid } from 'drizzle-orm/pg-core';
import { varchar } from 'drizzle-orm/pg-core';
import { decimal } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';
import { uniqueIndex } from 'drizzle-orm/pg-core';

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    description: varchar('description', { length: 255 }),
    price: decimal('price').notNull(),
    stock: integer('stock').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),
    updated_at: timestamp('updated_at').defaultNow().notNull(),
  },
  (t) => [uniqueIndex('product_name').on(t.name)],
);

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  product_id: uuid('product_id').references(() => products.id, {
    onDelete: 'set null',
  }),
  user_id: uuid('user_id').notNull(),
  quantity: integer('quantity').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
