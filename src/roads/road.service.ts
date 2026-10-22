import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lang, pick, pickOpt } from '../common/lang.js';

const inOrder = [{ sortOrder: 'asc' as const }, { id: 'asc' as const }];

@Injectable()
export class RoadService {
    constructor(private readonly prisma: PrismaService) { }

    async getPage(lang: Lang) {
        const [sections, stops, tips] = await Promise.all([
            this.prisma.roadSection.findMany({
                where: { published: true },
                orderBy: inOrder,
            }),
            this.prisma.routeStop.findMany({ orderBy: inOrder }),
            this.prisma.roadTip.findMany({ orderBy: inOrder }),
        ]);

        return {
            sections: sections.map((s) => ({
                slug: s.slug,
                tag: pickOpt(lang, s.tagEn, s.tagHy),
                title: pick(lang, s.titleEn, s.titleHy),
                body: pick(lang, s.bodyEn, s.bodyHy),
                image: s.image,
            })),
            route: stops.map((s, i) => ({
                order: i + 1,
                name: pick(lang, s.nameEn, s.nameHy),
                distanceKm: s.distanceKm,
                citySlug: s.citySlug,
                placeSlug: s.placeSlug,
            })),
            tips: tips.map((t, i) => ({
                order: i + 1,
                title: pick(lang, t.titleEn, t.titleHy),
                body: pick(lang, t.bodyEn, t.bodyHy),
            })),
        };
    }
}