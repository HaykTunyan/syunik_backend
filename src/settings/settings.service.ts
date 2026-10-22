import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { Lang, pick } from '../common/lang.js';

@Injectable()
export class SettingsService {
    constructor(private readonly prisma: PrismaService) { }

    // Flat map, e.g. { "contact.email": "...", "contact.phone": "..." }.
    // Keys that were never added are simply missing, so the frontend
    // should hide anything it does not receive (for example a social icon).
    async getPublic(lang: Lang) {
        const rows = await this.prisma.siteSetting.findMany({
            where: { isPublic: true },
            orderBy: { key: 'asc' },
        });
        return Object.fromEntries(
            rows.map((r) => [r.key, pick(lang, r.valueEn, r.valueHy)]),
        );
    }

    // Counts for the About page
    async getStats() {
        const [cities, attractions] = await Promise.all([
            this.prisma.city.count({ where: { published: true } }),
            this.prisma.place.count({ where: { published: true } }),
        ]);
        return { cities, attractions };
    }
}