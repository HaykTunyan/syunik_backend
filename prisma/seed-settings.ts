import type { PrismaClient } from '@prisma/client';

// Contact details shown on the Contact page and in the footer.
// Social links are not seeded because the URLs are not in the screenshots.
// Add them as keys social.facebook, social.instagram, social.pinterest and
// social.twitter (in Prisma Studio or here) and the frontend can show the icons.
const settings = [
    { key: 'contact.address', valueEn: 'Syunik Region, Armenia' },
    { key: 'contact.email', valueEn: 'syunikdreams@gmail.com' },
    { key: 'contact.phone', valueEn: '+374 99 990797' },
];

export async function seedSettings(prisma: PrismaClient) {
    for (const s of settings) {
        await prisma.siteSetting.upsert({
            where: { key: s.key },
            // `update` is empty on purpose, so re-running the seed does not
            // overwrite values you edited later.
            update: {},
            create: s,
        });
    }
}