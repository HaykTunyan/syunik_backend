import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ShopService } from './shop.service.js';
import { CreateOrderDto } from './dto/shop.dto.js';

@ApiTags('orders')
@Controller('orders')
@UseGuards(ThrottlerGuard)
export class OrdersController {
  constructor(private readonly shopService: ShopService) {}

  @Post()
  @Throttle({ default: { limit: 10, ttl: 60000 } })
  createOrder(@Body() dto: CreateOrderDto) {
    return this.shopService.createOrder(dto);
  }
}

