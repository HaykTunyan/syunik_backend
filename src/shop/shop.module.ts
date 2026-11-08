import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from '../prisma/prisma.module.js';
import { ShopService } from './shop.service.js';
import { ProductsController } from './products.controller.js';
import { OrdersController } from './orders.controller.js';
import { OrdersAdminController } from './orders-admin.controller.js';
import { AdminGuard } from '../auth/admin.guard.js';

@Module({
  imports: [
    PrismaModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
  ],
  controllers: [
    ProductsController,
    OrdersController,
    OrdersAdminController,
  ],
  providers: [ShopService, AdminGuard],
  exports: [ShopService],
})
export class ShopModule {}

