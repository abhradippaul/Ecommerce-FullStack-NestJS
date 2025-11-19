import { integer, text, pgTable, uuid } from 'drizzle-orm/pg-core';
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
    image: varchar('image', { length: 255 }).notNull(),
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
  delivery_address: varchar('delivery_address', { length: 255 }).notNull(),
  ph_number: varchar('ph_number', { length: 10 }),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});
