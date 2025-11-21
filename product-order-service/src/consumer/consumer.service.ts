import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { ConfirmChannel } from 'amqplib';
import { eq, sql } from 'drizzle-orm';

interface OrderStatusMessage {
  order_id: string;
  product_id: string;
}

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private rabbitUrl: string;
  constructor(
    private configService: ConfigService,
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {
    this.rabbitUrl = this.configService.get<string>('RABBITMQ_URL') || '';
    const connection = amqp.connect([this.rabbitUrl]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        await channel.consume('order.completed', async (message) => {
          if (message) {
            const content = JSON.parse(
              message.content.toString(),
            ) as OrderStatusMessage;
            this.db
              .update(schema.orders)
              .set({
                status: 'completed',
              })
              .where(eq(schema.orders.id, content.order_id))
              .returning({ quantity: schema.orders.quantity })
              .then((data) => {
                this.db
                  .update(schema.products)
                  .set({
                    stock: sql`${schema.products.stock} - ${data[0].quantity}`,
                  })
                  .where(eq(schema.products.id, content.product_id))
                  .then(() => {
                    console.log('Stock updated');
                    channel.ack(message);
                  });
              });
          }
        });

        await channel.consume('order.failed', async (message) => {
          if (message) {
            const content = JSON.parse(
              message.content.toString(),
            ) as OrderStatusMessage;
            console.log(content);
            this.db
              .update(schema.orders)
              .set({
                status: 'failed',
              })
              .where(eq(schema.orders.id, content.order_id))
              .then(() => {
                channel.ack(message);
              });
          }
        });
      });
      console.log('Consumer service started and listening for messages.');
    } catch (err) {
      console.error('Error starting the consumer:', err);
    }
  }
}
