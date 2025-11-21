import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/OrderDto.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  createOrder(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Get('/history')
  orderHistory(@Query('userId') userId: string) {
    return this.orderService.orderHistory(userId);
  }
}
