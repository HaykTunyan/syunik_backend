import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Day 1: the six cities for the "Syunik Cities" page
// NOTE: coordinates are approximate; verify them on the map.
// ---------------------------------------------------------------------------
const cities = [
    {
        slug: 'kapan',
        nameEn: 'Kapan',
        nameHy: 'Կապան',
        taglineEn: 'The regional center of Syunik, located at the foot of Mount Khustup.',
        areaKm2: 36,
        foundedEn: '10th century',
        population: 42000,
        latitude: 39.2075,
        longitude: 46.4058,
    },
    {
        slug: 'goris',
        nameEn: 'Goris',
        nameHy: 'Գորիս',
        taglineEn: 'A city with unique architectural style, famous for its caves.',
        areaKm2: 5.03,
        foundedEn: '1870',
        population: 20000,
        latitude: 39.5081,
        longitude: 46.3358,
    },
    {
        slug: 'sisian',
        nameEn: 'Sisian',
        nameHy: 'Սիսիան',
        taglineEn: 'Located on the banks of the Vorotan River, with a rich history.',
        areaKm2: 9,
        foundedEn: '8th century BC',
        population: 15000,
        latitude: 39.5136,
        longitude: 46.0314,
    },
    {
        slug: 'agarak',
        nameEn: 'Agarak',
        nameHy: 'Ագարակ',
        taglineEn: 'Mining city of Syunik, famous for molybdenum and copper mines.',
        areaKm2: 2.5,
        foundedEn: '1950',
        population: 7500,
        latitude: 38.8667,
        longitude: 46.1833,
    },
    {
        slug: 'meghri',
        nameEn: 'Meghri',
        nameHy: 'Մեղրի',
        taglineEn: "Armenia's southernmost city with a mild climate.",
        areaKm2: 3,
        foundedEn: '906',
        population: 4500,
        latitude: 38.9,
        longitude: 46.24,
    },
    {
        slug: 'qajaran',
        nameEn: 'Qajaran',
        nameHy: 'Քաջարան',
        taglineEn: 'Industrial city in Eastern Syunik, known for mining.',
        areaKm2: 4.1,
        foundedEn: '1958',
        population: 8000,
        latitude: 39.1536,
        longitude: 46.1556,
    },
].map((c, i) => ({ ...c, sortOrder: i }));

async function seedCities() {
    for (const c of cities) {
        await prisma.city.upsert({
            where: { slug: c.slug },
            update: c,
            create: c,
        });
    }
}

// ---------------------------------------------------------------------------
// Day 2: Kapan detail page (hotels, attractions, links, featured places)
// ---------------------------------------------------------------------------
async function seedKapan() {
    const city = await prisma.city.update({
        where: { slug: 'kapan' },
        data: {
            climateEn: 'Moderate',
            bestVisitEn: 'May - October',
            historyEn:
                "Kapan is one of the oldest settlements in Armenia, with roots dating back to the 5th century. It served as the capital of the Syunik Kingdom in the 10th century. Throughout history, it has been a vital defensive hub and a center for mining. The name 'Kapan' comes from the Armenian word 'kapel', meaning 'to lock', referring to its strategic position in the mountains.",
        },
    });

    // Make the seed re-runnable: clear this city's child rows first
    await prisma.hotel.deleteMany({ where: { cityId: city.id } });
    await prisma.cityAttraction.deleteMany({ where: { cityId: city.id } });
    await prisma.cityLink.deleteMany({ where: { cityId: city.id } });

    await prisma.hotel.createMany({
        data: [
            {
                name: 'Syunik Hotel Kapan',
                address: '1A Aram Manukyan St, Kapan, Syunik Province, Armenia',
                phone: '+374 285 2-88-88',
                priceFrom: 60,
                priceTo: 95,
                score: 9.3,
                reviewCount: 284,
                amenitiesEn: [
                    'Modern fitness center',
                    'Hot tub & sauna',
                    'Exceptional breakfast',
                    'Spacious mountain-view suites',
                ],
            },
            {
                name: 'Imperial Hotel Kapan',
                address: '5 Z. Andranik St, Kapan, Armenia',
                phone: '+374 285 2-11-22',
                priceFrom: 55,
                priceTo: 85,
                score: 9.0,
                reviewCount: 142,
                amenitiesEn: [
                    'Indoor swimming pool',
                    'On-site restaurant & bar',
                    'Close to Zipline Kapan',
                    'Terrace with views',
                ],
            },
            {
                name: 'Grand House Hotel',
                address: 'Halidzor District, Kapan, Armenia',
                phone: '+374 285 2-33-44',
                priceFrom: 70,
                priceTo: 110,
                score: 9.2,
                reviewCount: 98,
                amenitiesEn: [
                    'Panoramic forest views',
                    'Sauna & massage therapies',
                    'Spacious luxury suites',
                    'Hiking trails access',
                ],
            },
            {
                name: 'Cascade Guesthouse',
                address: '18 Davit Bek St, Kapan, Armenia',
                phone: '+374 285 2-55-66',
                priceFrom: 40,
                priceTo: 65,
                score: 9.1,
                reviewCount: 134,
                amenitiesEn: [
                    'Quiet residential area',
                    'Cozy shared lounge',
                    'Home-cooked local meals',
                    'Free Wi-Fi & parking',
                ],
            },
            {
                name: 'Bekh Hilltop Camping & Cabins',
                address: 'Bekh Village Hilltop, Kapan, Armenia',
                phone: '+374 285 2-77-88',
                priceFrom: 45,
                priceTo: 80,
                score: 9.5,
                reviewCount: 86,
                amenitiesEn: [
                    'Epic mountain panorama',
                    'Cozy wooden A-frame cabins',
                    'Campfire & stargazing area',
                    'Eco-friendly retreat',
                ],
            },
        ].map((h) => ({ ...h, cityId: city.id })),
    });

    await prisma.cityAttraction.createMany({
        data: [
            'Khustup Mountain — the iconic peak towering over Kapan',
            'Vahanavank Monastery — ancient spiritual sanctuary in the gorge',
            'Baghaberd Fortress — medieval stronghold defending Syunik',
            "Garegin Nzhdeh Statue — monument to Armenia's legendary hero",
            'Kapan Main Square — vibrant heart of the city',
            'City Center — the lively downtown district of Kapan',
            'Nzhdeh Street — the iconic boulevard named after the national hero',
            'Kapan City Street — charming streets of the mountain capital',
        ].map((textEn, i) => ({ textEn, sortOrder: i, cityId: city.id })),
    });

    await prisma.cityLink.create({
        data: {
            label: 'Wikipedia - Kapan',
            url: 'https://en.wikipedia.org/wiki/Kapan',
            sortOrder: 0,
            cityId: city.id,
        },
    });

    // Featured "must-visit" places (carousel). Replace slides 2 and 3 with
    // your real ones, only slide 1 (Khustup) was visible in the screenshot.
    const places = [
        {
            slug: 'mount-khustup',
            nameEn: 'Khustup Mountain',
            shortEn: 'The iconic peak towering over Kapan',
            category: 'NATURE' as const,
        },
        {
            slug: 'vahanavank',
            nameEn: 'Vahanavank Monastery',
            shortEn: 'Ancient spiritual sanctuary in the gorge',
            category: 'MONASTERY' as const,
        },
        {
            slug: 'baghaberd-fortress',
            nameEn: 'Baghaberd Fortress',
            shortEn: 'Medieval stronghold defending Syunik',
            category: 'FORTRESS' as const,
        },
    ];

    for (const [i, p] of places.entries()) {
        const data = { ...p, featured: true, sortOrder: i, cityId: city.id };
        await prisma.place.upsert({
            where: { slug: p.slug },
            update: data,
            create: data,
        });
    }
}

async function main() {
    await seedCities();
    await seedKapan();
    console.log('Seed finished');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());