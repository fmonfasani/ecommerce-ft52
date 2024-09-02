/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './order.dto';
import { AuthGuard } from 'src/auth/guards/auth-guard.guard';
import { ApiTags} from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
@UseGuards(AuthGuard)
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    console.log('User ID:', order.userId); // Debería imprimir el userId
    console.log('Products:', order.products); // Debería imprimir el array de productos
    return this.orderService.addOrder(userId, products);
  }

  @Get(':id')
  getOrder(@Query('id') id: string) {
    return this.orderService.getOrder(id);
  }
}

