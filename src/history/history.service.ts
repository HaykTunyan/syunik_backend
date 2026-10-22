import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lang, pick, pickOpt } from '../common/lang.js';
import { HistoryQueryDto } from './dto/history.dto.js';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getHistory({ lang = 'en' }: HistoryQueryDto) {
    const [sections, heritageCards] = await Promise.all([
      this.prisma.historySection.findMany({
        where: { published: true },
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      }),
      this.prisma.heritageCard.findMany({
        where: {
          place: { published: true },
        },
        include: {
          place: true,
        },
        orderBy: [{ sortOrder: 'asc' }, { id: 'asc' }],
      }),
    ]);

    return {
      sections: sections.map((s) => {
        const body = pick(lang, s.bodyEn, s.bodyHy);
        const paragraphs = body
          ? body
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .filter(Boolean)
          : [];

        return {
          slug: s.slug,
          tag: pickOpt(lang, s.tagEn, s.tagHy),
          title: pick(lang, s.titleEn, s.titleHy),
          subtitle: pickOpt(lang, s.subtitleEn, s.subtitleHy),
          paragraphs,
          quote: pickOpt(lang, s.quoteEn, s.quoteHy),
          image: s.image,
        };
      }),
      heritage: heritageCards.map((h) => ({
        slug: h.place.slug,
        name: pick(lang, h.place.nameEn, h.place.nameHy),
        short: pick(lang, h.place.shortEn, h.place.shortHy),
        icon: h.place.icon,
        image: h.place.image,
      })),
    };
  }
}
