import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { OrderStatus, Prisma, Product } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lang, pick, pickList, pickOpt } from '../common/lang.js';
import { CreateOrderDto, QueryProductsDto } from './dto/shop.dto.js';
import { QueryOrdersAdminDto } from './dto/shop-admin.dto.js';

@Injectable()
export class ShopService {
  constructor(private readonly prisma: PrismaService) {}

  private formatProduct(p: Product, lang?: Lang) {
    const l: Lang = lang === 'hy' ? 'hy' : 'en';
    return {
      id: p.id,
      slug: p.slug,
      name: pick(l, p.nameEn, p.nameHy),
      nameEn: p.nameEn,
      nameHy: p.nameHy,
      collection: pickOpt(l, p.collectionEn, p.collectionHy),
      collectionEn: p.collectionEn,
      collectionHy: p.collectionHy,
      badge: pickOpt(l, p.badgeEn, p.badgeHy),
      badgeEn: p.badgeEn,
      badgeHy: p.badgeHy,
      description: pick(l, p.descriptionEn, p.descriptionHy),
      descriptionEn: p.descriptionEn,
      descriptionHy: p.descriptionHy,
      details: pickList(l, p.detailsEn, p.detailsHy),
      detailsEn: p.detailsEn,
      detailsHy: p.detailsHy,
      price: Number((p.priceMinor / 100).toFixed(2)),
      priceMinor: p.priceMinor,
      currency: p.currency,
      sizes: p.sizes,
      images: p.images,
      sortOrder: p.sortOrder,
      published: p.published,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt,
    };
  }

  async findProducts(query: QueryProductsDto) {
    const where: Prisma.ProductWhereInput = {
      published: true,
      ...(query.collection && {
        OR: [
          { collectionEn: query.collection },
          { collectionHy: query.collection },
        ],
      }),
    };

    const products = await this.prisma.product.findMany({
      where,
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });

    return products.map((p) => this.formatProduct(p, query.lang));
  }

  async findProductBySlug(slug: string, lang?: Lang) {
    const product = await this.prisma.product.findFirst({
      where: { slug, published: true },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return this.formatProduct(product, lang);
  }

  async createOrder(dto: CreateOrderDto) {
    const slugs = [...new Set(dto.items.map((i) => i.productSlug))];
    const products = await this.prisma.product.findMany({
      where: { slug: { in: slugs }, published: true },
    });

    const productMap = new Map(products.map((p) => [p.slug, p]));

    const validatedItems = dto.items.map((item) => {
      const product = productMap.get(item.productSlug);
      if (!product) {
        throw new BadRequestException(`Product not found: ${item.productSlug}`);
      }

      const matchedSize = product.sizes.find(
        (s) => s.toLowerCase() === item.size.trim().toLowerCase(),
      );

      if (!matchedSize) {
        throw new BadRequestException(
          `Invalid size "${item.size}" for product "${product.slug}". Available sizes: ${product.sizes.join(', ')}`,
        );
      }

      return {
        product,
        size: matchedSize,
        quantity: item.quantity,
        unitPriceMinor: product.priceMinor,
      };
    });

    const totalMinor = validatedItems.reduce(
      (sum, item) => sum + item.quantity * item.unitPriceMinor,
      0,
    );

    const currency = validatedItems[0]?.product.currency ?? 'USD';
    const orderNumber = `SD-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const order = await this.prisma.order.create({
      data: {
        number: orderNumber,
        customerName: dto.customerName,
        phone: dto.phone,
        email: dto.email ?? null,
        city: dto.city,
        address: dto.address,
        note: dto.note ?? null,
        status: 'NEW',
        totalMinor,
        currency,
        items: {
          create: validatedItems.map((item) => ({
            productId: item.product.id,
            productName: item.product.nameEn,
            size: item.size,
            quantity: item.quantity,
            unitPriceMinor: item.unitPriceMinor,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return {
      ok: true,
      number: order.number,
      total: Number((order.totalMinor / 100).toFixed(2)),
      totalMinor: order.totalMinor,
      currency: order.currency,
      status: order.status,
    };
  }

  async findAllOrders(query: QueryOrdersAdminDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 50;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {
      ...(query.status && { status: query.status }),
    };

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              product: {
                select: {
                  id: true,
                  slug: true,
                  nameEn: true,
                  nameHy: true,
                  images: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.order.count({ where }),
    ]);

    return {
      orders: orders.map((o) => ({
        ...o,
        total: Number((o.totalMinor / 100).toFixed(2)),
      })),
      total,
      page,
      limit,
    };
  }

  async findOrderById(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      ...order,
      total: Number((order.totalMinor / 100).toFixed(2)),
    };
  }

  async updateOrderStatus(id: number, status: OrderStatus) {
    const existing = await this.prisma.order.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Order not found');
    }

    const updated = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        items: true,
      },
    });

    return {
      ...updated,
      total: Number((updated.totalMinor / 100).toFixed(2)),
    };
  }
}

