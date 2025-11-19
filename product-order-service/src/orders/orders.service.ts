import { Body, Inject, Injectable, Req } from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { OrderDto } from './dto/OrderDto.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async createOrder(@Body() LoginDto: OrderDto) {
    // const products = await this.db.select().from(schema.products);
    return { msg: 'Order created successfully' };
  }
}
