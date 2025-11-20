import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { ProducerModule } from 'src/producer/producer.module';

@Module({
  controllers: [OrdersController],
  imports: [DrizzleModule, ProducerModule],
  providers: [OrdersService],
})
export class OrdersModule {}
