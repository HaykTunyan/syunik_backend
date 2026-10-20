import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lang, pick, pickList, pickOpt } from './comman/lang.js';
import { CreateCityDto, UpdateCityDto } from './dto/create-city.dto.js';

type CityRow = NonNullable<
  Awaited<ReturnType<PrismaService['city']['findFirst']>>
>;

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) { }

  private toPublic(c: CityRow, lang: Lang) {
    return {
      slug: c.slug,
      name: pick(lang, c.nameEn, c.nameHy),
      tagline: pick(lang, c.taglineEn, c.taglineHy),
      areaKm2: c.areaKm2,
      founded: pick(lang, c.foundedEn, c.foundedHy),
      population: c.population,
      latitude: c.latitude,
      longitude: c.longitude,
    };
  }

  // Cities list page
  async findAll(lang: Lang) {
    const cities = await this.prisma.city.findMany({
      where: { published: true },
      orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
    });
    return cities.map((c) => this.toPublic(c, lang));
  }

  // City detail page (full payload)
  async findDetail(slug: string, lang: Lang) {
    const city = await this.prisma.city.findFirst({
      where: { slug, published: true },
      include: {
        places: {
          where: { published: true, featured: true },
          orderBy: { sortOrder: 'asc' },
        },
        hotels: {
          where: { published: true },
          orderBy: [{ score: 'desc' }, { sortOrder: 'asc' }],
          take: 5,
        },
        attractions: { orderBy: { sortOrder: 'asc' } },
        links: { orderBy: { sortOrder: 'asc' } },
      },
    });
    if (!city) throw new NotFoundException('City not found');

    return {
      ...this.toPublic(city, lang),
      heroImage: city.heroImage,
      climate: pickOpt(lang, city.climateEn, city.climateHy),
      bestVisit: pickOpt(lang, city.bestVisitEn, city.bestVisitHy),
      history: pickOpt(lang, city.historyEn, city.historyHy),
      places: city.places.map((p) => ({
        slug: p.slug,
        name: pick(lang, p.nameEn, p.nameHy),
        short: pick(lang, p.shortEn, p.shortHy),
        category: p.category,
        image: p.image,
      })),
      hotels: city.hotels.map((h, i) => ({
        rank: i + 1,
        name: h.name,
        stars: h.stars,
        address: h.address,
        phone: h.phone,
        priceFrom: h.priceFrom,
        priceTo: h.priceTo,
        currency: h.currency,
        score: h.score,
        reviewCount: h.reviewCount,
        amenities: pickList(lang, h.amenitiesEn, h.amenitiesHy),
        bookingUrl: h.bookingUrl,
      })),
      attractions: city.attractions.map((a) => pick(lang, a.textEn, a.textHy)),
      links: city.links.map((l) => ({ label: l.label, url: l.url })),
    };
  }

  // Admin methods (will be protected by JWT later)
  create(dto: CreateCityDto) {
    return this.prisma.city.create({ data: dto });
  }

  async update(id: number, dto: UpdateCityDto) {
    await this.ensureExists(id);
    return this.prisma.city.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.ensureExists(id);
    return this.prisma.city.delete({ where: { id } });
  }

  private async ensureExists(id: number) {
    const found = await this.prisma.city.findUnique({ where: { id } });
    if (!found) throw new NotFoundException('City not found');
  }
}