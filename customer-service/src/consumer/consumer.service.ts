import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { ProducerService } from 'src/producer/producer.service';
import * as schema from '../drizzle/schema';
import { eq } from 'drizzle-orm';

interface OrderCreatedMessage {
  quantity: number;
  user_id: string;
  order_id: string;
  total_price: number;
}

@Injectable()
export class ConsumerService implements OnModuleInit {
  private channelWrapper: ChannelWrapper;
  private rabbitUrl: string;
  constructor(
    private configService: ConfigService,
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
    private readonly orderStatus: ProducerService,
  ) {
    this.rabbitUrl = this.configService.get<string>('RABBITMQ_URL') || '';
    const connection = amqp.connect([this.rabbitUrl]);
    this.channelWrapper = connection.createChannel();
  }

  public async onModuleInit() {
    try {
      await this.channelWrapper.addSetup(async (channel: ConfirmChannel) => {
        channel.consume('order.created', async (msg) => {
          if (msg) {
            const content = JSON.parse(
              msg.content.toString(),
            ) as OrderCreatedMessage;
            const isCustomerExist = await this.db
              .select()
              .from(schema.customers)
              .where(eq(schema.customers.id, content.user_id));
            if (isCustomerExist.length) {
              this.db
                .update(schema.customers)
                .set({
                  total_orders: Number(isCustomerExist[0].total_orders) + 1,
                  total_spent:
                    Number(isCustomerExist[0].total_spent) +
                    content.total_price,
                })
                .where(eq(schema.customers.id, content.user_id))
                .then(() => {
                  channel.ack(msg);
                  this.orderStatus.sendOrderCompleted({
                    order_status: 'complete',
                    user_id: content.user_id,
                    order_id: content.order_id,
                  });
                })
                .catch(() => {
                  channel.ack(msg);
                  this.orderStatus.sendOrderFailed({
                    order_id: content.order_id,
                  });
                });
            }
          }
        });
      });
      console.log('Consumer service started and listening for messages.');
    } catch (err) {
      console.error('Error starting the consumer:', err);
    }
  }
}
