import type { PrismaClient } from '@prisma/client';

// Text copied from the Syunik Road page. The hero text, intro card and
// section headings ("The Route Breakdown", "Traveler's Guide & Safety")
// stay in the frontend translation files.
const sections = [
    {
        slug: 'syuniks-gate',
        tagEn: 'Landmark Monument',
        titleEn: "Syunik's Gate",
        bodyEn:
            "Standing at the border of Vayots Dzor and Syunik, the monumental 'Gates of Syunik' welcome travelers. Comprising two massive stone arches that mimic historical fortress gates, this landmark marks your transition into the land of eternal mountains.",
        sortOrder: 0,
    },
    {
        slug: 'tatev-serpentine',
        tagEn: 'Engineering Masterpiece',
        titleEn: 'The Tatev Serpentine',
        bodyEn:
            'Descending deep into the Vorotan River canyon, the road transforms into a sequence of hair-raising hairpin loops. The Tatev Serpentine is a masterpiece of engineering, offering stunning, sheer panoramic drops and views of the ancient hermitage below.',
        sortOrder: 1,
    },
    {
        slug: 'mountain-passes',
        tagEn: 'Sisian, Tashtun & Meghri Passes',
        titleEn: 'The Mountain Passes',
        bodyEn:
            'Reaching altitudes of over 2,300 meters, the high passes of Syunik present dramatic landscapes. Driving through these passes feels like traveling through the clouds, where fog sweeps across green meadows in summer and snow blankets the volcanic peaks in winter.',
        sortOrder: 2,
    },
];

// Distances are copied from the site. Check them against a maps app.
const stops = [
    { nameEn: 'Yerevan', distanceKm: 0, sortOrder: 0 },
    { nameEn: 'Sisian', distanceKm: 210, citySlug: 'sisian', sortOrder: 1 },
    { nameEn: 'Tatev', distanceKm: 260, placeSlug: 'tatev-monastery', sortOrder: 2 },
    { nameEn: 'Kapan', distanceKm: 290, citySlug: 'kapan', sortOrder: 3 },
    { nameEn: 'Meghri', distanceKm: 360, citySlug: 'meghri', sortOrder: 4 },
];

const tips = [
    {
        titleEn: 'Check Weather Forecast',
        bodyEn:
            'Mountain passes can experience sudden fog or snow, even in spring or autumn.',
        sortOrder: 0,
    },
    {
        titleEn: 'Fuel Stations',
        bodyEn:
            'Fill up your tank in major cities like Sisian or Goris, as distances between stations can be long in remote regions.',
        sortOrder: 1,
    },
    {
        titleEn: 'Best Viewing Points',
        bodyEn:
            "Make sure to stop at the Syunik's Gate monument and the Tatev viewpoint for spectacular photography.",
        sortOrder: 2,
    },
];

export async function seedRoad(prisma: PrismaClient) {
    for (const s of sections) {
        await prisma.roadSection.upsert({
            where: { slug: s.slug },
            update: s,
            create: s,
        });
    }

    // Stops and tips have no natural key, so clear and recreate (re-runnable).
    await prisma.routeStop.deleteMany();
    await prisma.routeStop.createMany({ data: stops });

    await prisma.roadTip.deleteMany();
    await prisma.roadTip.createMany({ data: tips });
}