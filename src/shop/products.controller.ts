import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ShopService } from './shop.service.js';
import { QueryProductsDto } from './dto/shop.dto.js';
import type { Lang } from '../common/lang.js';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly shopService: ShopService) {}

  @Get()
  findAll(@Query() query: QueryProductsDto) {
    return this.shopService.findProducts(query);
  }

  @Get(':slug')
  findBySlug(@Param('slug') slug: string, @Query('lang') lang?: Lang) {
    return this.shopService.findProductBySlug(slug, lang);
  }
}

