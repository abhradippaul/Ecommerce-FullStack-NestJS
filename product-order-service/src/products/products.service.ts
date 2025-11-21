import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { desc } from 'drizzle-orm';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getProducts() {
    const products = await this.db
      .select()
      .from(schema.products)
      .orderBy(desc(schema.products.name));
    return { msg: 'Product fetched successfully', products };
  }
}
