import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { OrderCompletedDto } from './dto/OrderCompleted.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  private rabbitUrl: string;

  constructor(private configService: ConfigService) {
    this.rabbitUrl = this.configService.get<string>('RABBITMQ_URL') || '';
    const connection = amqp.connect([this.rabbitUrl]);
    this.channelWrapper = connection.createChannel({
      setup: async (channel: Channel) => {
        await channel.assertQueue('order.completed', { durable: true });
        await channel.assertQueue('order.failed', { durable: true });
      },
    });
  }

  async sendOrderCompleted(data: OrderCompletedDto) {
    try {
      await this.channelWrapper.sendToQueue(
        'order.completed',
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
      console.log('Sent To Queue');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error adding order to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async sendOrderFailed(data: { order_id: string }) {
    try {
      await this.channelWrapper.sendToQueue(
        'order.failed',
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
      console.log('Sent To failed Queue');
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error adding order to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
