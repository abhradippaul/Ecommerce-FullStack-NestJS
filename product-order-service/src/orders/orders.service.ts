import {
  Body,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { OrderDto } from './dto/OrderDto.dto';
import { and, desc, eq, gte } from 'drizzle-orm';
import { ProducerService } from '../producer/producer.service';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    private readonly producerService: ProducerService,
  ) {}

  async createOrder(@Body() orderDto: OrderDto) {
    const { product_id, quantity, user_id } = orderDto;

    if (!product_id || !quantity || !user_id) {
      throw new NotFoundException('Required all fields');
    }

    const isProductAvailable = await this.db
      .select()
      .from(schema.products)
      .where(
        and(
          eq(schema.products.id, product_id),
          gte(schema.products.stock, Number(quantity)),
        ),
      );

    if (!isProductAvailable.length) {
      throw new HttpException(
        'Product is out of stock or not available',
        HttpStatus.BAD_REQUEST,
      );
    }

    const insertData = {
      quantity: Number(quantity),
      product_id,
      user_id,
      total_price: Number(quantity) * Number(isProductAvailable[0].price),
    };
    const order = await this.db
      .insert(schema.orders)
      .values(insertData)
      .returning();

    if (!order.length) {
      throw new NotFoundException('Order creation failed');
    }

    await this.producerService.sendOrderCreateNotification({
      quantity: insertData.quantity,
      user_id: insertData.user_id,
      order_id: order[0].id,
      total_price: insertData.total_price,
      product_id: insertData.product_id,
    });

    return { msg: 'Order created successfully' };
  }

  async orderHistory(userId: string) {
    try {
      const historyList = await this.db
        .select({
          order_id: schema.orders.id,
          status: schema.orders.status,
          quantity: schema.orders.quantity,
          product_id: schema.orders.product_id,
          order_creation_at: schema.orders.created_at,
          product_name: schema.products.name,
          product_description: schema.products.description,
          product_price: schema.products.price,
        })
        .from(schema.orders)
        .where(eq(schema.orders.user_id, userId))
        .innerJoin(
          schema.products,
          eq(schema.products.id, schema.orders.product_id),
        )
        .orderBy(desc(schema.orders.created_at));

      return {
        message: 'Order fetched successfully',
        status: 200,
        historyList,
      };
    } catch (err) {
      console.log(err);
      return { message: 'Failed to fetch order history', status: 500 };
    }
  }
}
