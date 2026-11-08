import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard.js';
import { ShopService } from './shop.service.js';
import {
  QueryOrdersAdminDto,
  UpdateOrderStatusDto,
} from './dto/shop-admin.dto.js';

@ApiTags('admin/orders')
@ApiBearerAuth()
@UseGuards(AdminGuard)
@Controller('admin/orders')
export class OrdersAdminController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll(@Query() query: QueryOrdersAdminDto) {
    return this.shopService.findAllOrders(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shopService.findOrderById(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.shopService.updateOrderStatus(id, dto.status);
  }
}

