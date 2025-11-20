import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import amqp, { ChannelWrapper } from 'amqp-connection-manager';
import { Channel } from 'amqplib';
import { OrderCreatedDto } from './dto/order-created.dto';

@Injectable()
export class ProducerService {
  private channelWrapper: ChannelWrapper;
  private rabbitUrl: string;

  constructor(private configService: ConfigService) {
    this.rabbitUrl = this.configService.get<string>('RABBITMQ_URL') || '';
    const connection = amqp.connect([this.rabbitUrl]);
    this.channelWrapper = connection.createChannel({
      setup: (channel: Channel) => {
        return channel.assertQueue('order.created', { durable: true });
      },
    });
  }
  async sendOrderCreateNotification(data: OrderCreatedDto) {
    try {
      await this.channelWrapper.sendToQueue(
        'order.created',
        Buffer.from(JSON.stringify(data)),
        {
          persistent: true,
        },
      );
      return { msg: 'Order created successfully' };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error adding order to queue',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
