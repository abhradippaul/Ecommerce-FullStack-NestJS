import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [OrdersController],
  imports: [DrizzleModule],
  providers: [OrdersService],
})
export class OrdersModule {}
