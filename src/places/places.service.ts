import { Injectable, NotFoundException } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lang, pick, pickOpt } from '../common/lang.js';
import { QueryPlacesDto } from './dto/place.dto.js';

const withCity = {
  city: { select: { slug: true, nameEn: true, nameHy: true } },
} satisfies Prisma.PlaceInclude;

type PlaceWithCity = Prisma.PlaceGetPayload<{ include: typeof withCity }>;

const inOrder: Prisma.PlaceOrderByWithRelationInput[] = [
  { sortOrder: 'asc' },
  { id: 'asc' },
];

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) { }

  private toListItem(p: PlaceWithCity, lang: Lang) {
    return {
      slug: p.slug,
      name: pick(lang, p.nameEn, p.nameHy),
      short: pick(lang, p.shortEn, p.shortHy),
      category: p.category,
      icon: p.icon,
      image: p.image,
      city: p.city
        ? { slug: p.city.slug, name: pick(lang, p.city.nameEn, p.city.nameHy) }
        : null,
    };
  }

  // Tourism page: "Most visited attractions" and "Historical trip places"
  async findAll(q: QueryPlacesDto) {
    const where: Prisma.PlaceWhereInput = {
      published: true,
      ...(q.city && { city: { slug: q.city } }),
      ...(q.category && { category: q.category }),
      ...(q.mostVisited !== undefined && { mostVisited: q.mostVisited }),
      ...(q.historical !== undefined && { historical: q.historical }),
      ...(q.featured !== undefined && { featured: q.featured }),
    };
    const places = await this.prisma.place.findMany({
      where,
      include: withCity,
      orderBy: inOrder,
    });
    return places.map((p) => this.toListItem(p, q.lang));
  }

  // Attraction detail page (e.g. Tatev Monastery)
  async findBySlug(slug: string, lang: Lang) {
    const place = await this.prisma.place.findFirst({
      where: { slug, published: true },
      include: withCity,
    });
    if (!place) throw new NotFoundException('Place not found');

    // "More from Syunik" gallery: other places, in site order
    const more = await this.prisma.place.findMany({
      where: { published: true, id: { not: place.id } },
      include: withCity,
      orderBy: inOrder,
      take: 17,
    });

    return {
      ...this.toListItem(place, lang),
      location: pickOpt(lang, place.locationEn, place.locationHy),
      description: pickOpt(lang, place.descriptionEn, place.descriptionHy),
      altitudeM: place.altitudeM,
      latitude: place.latitude,
      longitude: place.longitude,
      mostVisited: place.mostVisited,
      historical: place.historical,
      more: more.map((m) => this.toListItem(m, lang)),
    };
  }

  // Home and Tourism maps: cities plus places that have coordinates
  async markers(lang: Lang) {
    const [cities, places] = await Promise.all([
      this.prisma.city.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      }),
      this.prisma.place.findMany({
        where: {
          published: true,
          latitude: { not: null },
          longitude: { not: null },
        },
        orderBy: inOrder,
      }),
    ]);

    return [
      ...cities.map((c) => ({
        type: 'city' as const,
        slug: c.slug,
        name: pick(lang, c.nameEn, c.nameHy),
        category: null,
        latitude: c.latitude,
        longitude: c.longitude,
      })),
      ...places.map((p) => ({
        type: 'place' as const,
        slug: p.slug,
        name: pick(lang, p.nameEn, p.nameHy),
        category: p.category,
        latitude: p.latitude,
        longitude: p.longitude,
      })),
    ];
  }
}