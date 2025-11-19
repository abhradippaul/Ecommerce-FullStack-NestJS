import { Body, Controller, Post, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './dto/OrderDto.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  uploadData(@Body() orderDto: OrderDto) {
    return this.orderService.createOrder(orderDto);
  }
}
