import { PlaceCategory, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface PlaceSeedData {
  slug: string;
  nameEn: string;
  nameHy: string;
  shortEn: string;
  shortHy: string;
  category: PlaceCategory;
  image?: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  citySlug: string;
}

const placesData: PlaceSeedData[] = [
  {
    slug: 'tatev-monastery',
    nameEn: 'Tatev Monastery',
    nameHy: 'Տաթևի վանք',
    shortEn: '9th-century Armenian apostolic monastery perched dramatically on the edge of the Vorotan River canyon.',
    shortHy: '9-րդ դարի հայ առաքելական վանական համալիր՝ Որոտանի կիրճի եզրին:',
    category: PlaceCategory.MONASTERY,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.3842,
    longitude: 46.2503,
    featured: true,
    citySlug: 'goris',
  },
  {
    slug: 'wings-of-tatev',
    nameEn: 'Wings of Tatev Aerial Tramway',
    nameHy: '«ՏաԹևեր» ճոպանուղի',
    shortEn: "The world's longest reversible aerial tramway (5,752 m) flying over the dramatic Vorotan Gorge.",
    shortHy: 'Աշխարհի ամենաերկար հետադարձելի ճոպանուղին (5,752 մ)՝ Որոտանի կիրճի վրայով:',
    category: PlaceCategory.VIEWPOINT,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.4172,
    longitude: 46.2978,
    featured: true,
    citySlug: 'goris',
  },
  {
    slug: 'satani-kamurj',
    nameEn: "Devil's Bridge (Satani Kamurj)",
    nameHy: 'Սատանի կամուրջ',
    shortEn: 'Natural travertine bridge formed over thousands of years across the Vorotan River with thermal mineral springs.',
    shortHy: 'Բնական տրավերտինե կամուրջ Որոտան գետի վրա՝ հանքային տաք աղբյուրներով և լողավազաններով:',
    category: PlaceCategory.BRIDGE,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.3942,
    longitude: 46.2589,
    featured: true,
    citySlug: 'goris',
  },
  {
    slug: 'old-khndzoresk',
    nameEn: 'Old Khndzoresk Cave Town & Suspension Bridge',
    nameHy: 'Հին Խնձորեսկ և Ճոճվող կամուրջ',
    shortEn: 'Historic cliffside cave city inhabited until the 20th century, joined by a 160m swaying suspension bridge.',
    shortHy: 'Պատմական ժայռափոր քարանձավային քաղաք և 160 մետրանոց ճոճվող կամուրջ խորը ձորի վրա:',
    category: PlaceCategory.CAVE,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.5008,
    longitude: 46.3683,
    featured: true,
    citySlug: 'goris',
  },
  {
    slug: 'zorats-karer',
    nameEn: 'Zorats Karer (Karahunj)',
    nameHy: 'Զորաց Քարեր (Քարահունջ)',
    shortEn: 'Prehistoric megalithic archaeological complex with perforated basalt stones, dating back over 7,500 years.',
    shortHy: 'Նախապատմական մեգալիթյան համալիր անցքավոր բազալտե քարերով՝ ավելի քան 7,500 տարեկան:',
    category: PlaceCategory.OBSERVATORY,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.5517,
    longitude: 46.0286,
    featured: true,
    citySlug: 'sisian',
  },
  {
    slug: 'shaki-waterfall',
    nameEn: 'Shaki Waterfall',
    nameHy: 'Շաքիի ջրվեժ',
    shortEn: 'Spectacular 18-meter natural cascade cascading down basalt columns into a lush volcanic gorge.',
    shortHy: 'Հիասքանչ 18 մետրանոց բնական ջրվեժ՝ բազալտե սյուների միջով հոսող ջրառատ կասկադով:',
    category: PlaceCategory.WATERFALL,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.5525,
    longitude: 45.9992,
    featured: true,
    citySlug: 'sisian',
  },
  {
    slug: 'mount-khustup',
    nameEn: 'Mount Khustup',
    nameHy: 'Խուստուփ լեռ',
    shortEn: 'Iconic alpine peak towering 3,201 meters above Kapan; burial site and symbol of hero Garegin Nzhdeh.',
    shortHy: 'Վեհաշուք լեռնագագաթ (3,201 մ) Կապանի վրա, Գարեգին Նժդեհի հավերժական հանգրվանը:',
    category: PlaceCategory.NATURE,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.135,
    longitude: 46.3314,
    featured: true,
    citySlug: 'kapan',
  },
  {
    slug: 'vahanavank',
    nameEn: 'Vahanavank Monastery',
    nameHy: 'Վահանավանք',
    shortEn: '10th-century medieval monastic sanctuary and royal pantheon of the Kings of Syunik.',
    shortHy: '10-րդ դարի վանական համալիր և Սյունյաց արքաների ու իշխանների արքայական դամբարան:',
    category: PlaceCategory.MONASTERY,
    image: 'https://images.unsplash.com/photo-1548625361-195fe21b6d19?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.2158,
    longitude: 46.3308,
    featured: true,
    citySlug: 'kapan',
  },
  {
    slug: 'baghaberd-fortress',
    nameEn: 'Baghaberd Fortress',
    nameHy: 'Բաղաբերդ ամրոց',
    shortEn: 'Ancient 4th-century mountain citadel that served as the last capital and defensive shield of Syunik.',
    shortHy: '4-րդ դարի անառիկ ամրոց՝ Սյունյաց թագավորության վերջին մայրաքաղաքն ու պաշտպանը:',
    category: PlaceCategory.FORTRESS,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.2014,
    longitude: 46.2736,
    featured: true,
    citySlug: 'kapan',
  },
  {
    slug: 'halidzor-fortress',
    nameEn: 'Halidzor Fortress',
    nameHy: 'Հալիձորի բերդ',
    shortEn: '17th-century fortified complex that served as Davit Bek’s headquarters during the Armenian liberation battles.',
    shortHy: '17-րդ դարի ամրոց, Դավիթ Բեկի գլխավոր հենակետը ազատագրական պայքարի տարիներին:',
    category: PlaceCategory.FORTRESS,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.2197,
    longitude: 46.3578,
    featured: false,
    citySlug: 'kapan',
  },
  {
    slug: 'shikahogh-reserve',
    nameEn: 'Shikahogh State Reserve',
    nameHy: 'Շիկահողի պետական արգելոց',
    shortEn: "Armenia's pristine virgin forest reserve, home to leopards, brown bears, and rich botanical biodiversity.",
    shortHy: 'Հայաստանի կուսական անտառային արգելոցը՝ հովազների, արջերի և հազվագյուտ բուսականությամբ:',
    category: PlaceCategory.NATURE,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.0667,
    longitude: 46.4833,
    featured: true,
    citySlug: 'kapan',
  },
  {
    slug: 'meghri-fortress',
    nameEn: 'Meghri Fortress',
    nameHy: 'Մեղրու բերդ',
    shortEn: '18th-century citadel crowning the mountain ridge above Meghri, safeguarding the southern gateway.',
    shortHy: '18-րդ դարի միջնաբերդ Մեղրու լեռնագագաթին՝ հարավային դարպասի հսկողության համար:',
    category: PlaceCategory.FORTRESS,
    image: 'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1200&q=80',
    latitude: 38.9042,
    longitude: 46.2417,
    featured: true,
    citySlug: 'meghri',
  },
  {
    slug: 'st-hovhannes-meghri',
    nameEn: 'St. Hovhannes Church of Meghri',
    nameHy: 'Մեղրու Սուրբ Հովհաննես եկեղեցի',
    shortEn: '17th-century church celebrated for its exceptionally preserved Persian-influenced colorful biblical murals.',
    shortHy: '17-րդ դարի եկեղեցի՝ պարսկական ազդեցությամբ հազվագյուտ գեղեցկության որմնանկարներով:',
    category: PlaceCategory.MONASTERY,
    image: 'https://images.unsplash.com/photo-1548625361-195fe21b6d19?auto=format&fit=crop&w=1200&q=80',
    latitude: 38.9075,
    longitude: 46.2394,
    featured: false,
    citySlug: 'meghri',
  },
  {
    slug: 'vorotnavank',
    nameEn: 'Vorotnavank Monastery',
    nameHy: 'Որոտնավանք',
    shortEn: 'Fortified 10th-century monastic complex built by Queen Shahandukht over the scenic Vorotan gorge.',
    shortHy: '10-րդ դարի ամրացված վանական համալիր՝ կառուցված Շահանդուխտ թագուհու կողմից Որոտանի ձորի վրա:',
    category: PlaceCategory.MONASTERY,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.4975,
    longitude: 46.1242,
    featured: false,
    citySlug: 'sisian',
  },
  {
    slug: 'vorotnaberd',
    nameEn: 'Vorotnaberd Fortress',
    nameHy: 'Որոտնաբերդ',
    shortEn: 'Medieval clifftop stronghold with secret underground tunnels commanding the Vorotan trade corridor.',
    shortHy: 'Միջնադարյան ժայռոտ բերդաքաղաք՝ գաղտնի ստորգետնյա ուղիներով և պատմական մեծ նշանակությամբ:',
    category: PlaceCategory.FORTRESS,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.4967,
    longitude: 46.1361,
    featured: false,
    citySlug: 'sisian',
  },
  {
    slug: 'goris-stone-forest',
    nameEn: 'Goris Stone Forest (Pyramids of Goris)',
    nameHy: 'Գորիսի քարե անտառ (բուրգեր)',
    shortEn: 'Breathtaking landscape of volcanic tuff spires, hoodoos, and natural stone pillars surrounding Goris.',
    shortHy: 'Հրաբխային տուֆե սյուների, բնական բուրգերի և ժայռային աշտարակների հիասքանչ տեսարան Գորիսի շուրջ:',
    category: PlaceCategory.NATURE,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.5122,
    longitude: 46.3411,
    featured: true,
    citySlug: 'goris',
  },
  {
    slug: 'garegin-nzhdeh-memorial',
    nameEn: 'Garegin Nzhdeh Memorial Complex',
    nameHy: 'Գարեգին Նժդեհի հուշահամալիր',
    shortEn: 'Monumental hilltop memorial honoring the national hero and statesman who safeguarded Syunik.',
    shortHy: 'Հուշահամալիր՝ նվիրված Սպարապետ Գարեգին Նժդեհին, ով պաշտպանեց Սյունիքի հայկականությունը:',
    category: PlaceCategory.MONUMENT,
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.2033,
    longitude: 46.4111,
    featured: false,
    citySlug: 'kapan',
  },
  {
    slug: 'ughtasar-petroglyphs',
    nameEn: 'Ughtasar Petroglyphs',
    nameHy: 'Ուխտասարի ժայռապատկերներ',
    shortEn: 'High mountain crater lake surrounded by thousands of ancient carved petroglyphs (5th-2nd millennia BC).',
    shortHy: 'Բարձրլեռնային խառնարանային լիճ՝ հազարավոր նախապատմական ժայռապատկերներով (մ.թ.ա. 5-2-րդ հազարամյակներ):',
    category: PlaceCategory.OBSERVATORY,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.6833,
    longitude: 46.05,
    featured: true,
    citySlug: 'sisian',
  },
  {
    slug: 'agarak-viewpoint',
    nameEn: 'Agarak Valley Viewpoint',
    nameHy: 'Ագարակի հովտի դիտակետ',
    shortEn: 'Panoramic viewpoint overlooking the border river Araks and the rugged southern peaks of Syunik.',
    shortHy: 'Տեսարժան դիտակետ՝ Արաքս սահմանային գետի և Սյունիքի հարավային լեռների համայնապատկերով:',
    category: PlaceCategory.VIEWPOINT,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    latitude: 38.8689,
    longitude: 46.1878,
    featured: false,
    citySlug: 'agarak',
  },
  {
    slug: 'qajaran-mineral-springs',
    nameEn: 'Qajaran Alpine Mineral Springs',
    nameHy: 'Քաջարանի ալպիական հանքային աղբյուրներ',
    shortEn: 'Pristine cold and thermal mineral springs in the high elevation Zangezur mountain range.',
    shortHy: 'Զանգեզուրի բարձրլեռնային հանքային աղբյուրներ՝ հարուստ բուժիչ հատկություններով:',
    category: PlaceCategory.NATURE,
    image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    latitude: 39.1556,
    longitude: 46.1489,
    featured: false,
    citySlug: 'qajaran',
  },
];

export async function seedPlaces(client: PrismaClient = prisma) {
  console.log('Seeding places...');

  // Fetch all cities to map slug -> id
  const cities = await client.city.findMany({
    select: { id: true, slug: true },
  });
  const cityMap = new Map(cities.map((c) => [c.slug, c.id]));

  let count = 0;
  for (const [index, place] of placesData.entries()) {
    const cityId = cityMap.get(place.citySlug) ?? null;

    const data = {
      slug: place.slug,
      nameEn: place.nameEn,
      nameHy: place.nameHy,
      shortEn: place.shortEn,
      shortHy: place.shortHy,
      category: place.category,
      image: place.image ?? null,
      latitude: place.latitude,
      longitude: place.longitude,
      featured: place.featured,
      sortOrder: index,
      published: true,
      cityId,
    };

    await client.place.upsert({
      where: { slug: place.slug },
      update: data,
      create: data,
    });
    count++;
  }

  console.log(`Successfully seeded ${count} places.`);
}

if (process.argv[1]?.endsWith('seed-places.ts')) {
  seedPlaces()
    .catch((e) => {
      console.error('Failed to seed places:', e);
      process.exit(1);
    })
    .finally(() => prisma.$disconnect());
}
