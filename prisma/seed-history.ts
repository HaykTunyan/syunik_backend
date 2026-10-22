import { PrismaClient } from '@prisma/client';

export async function seedHistory(prisma: PrismaClient) {
  console.log('Seeding history sections and heritage cards...');

  const sections = [
    {
      slug: 'kingdom-of-syunik',
      tagEn: 'Origins',
      tagHy: 'Ծագումը',
      titleEn: 'Kingdom of Syunik',
      titleHy: 'Սյունյաց Թագավորություն',
      subtitleEn: 'A history of statehood, faith, and resistance',
      subtitleHy: 'Պետականության, հավատքի և դիմադրության պատմություն',
      bodyEn: 'The land of Syunik has been one of the strong pillars of Armenian statehood for centuries. Due to its strategic position and spiritual-cultural potential, Syunik played an important role in the formation of Armenian identity and state thinking.\n\nIn the second half of the 10th century, the Kingdom of Syunik (also known as the Kingdom of Kapan) was formed here as an independent and sovereign Armenian state. The kingdom existed until 1170, becoming a significant political, administrative, and cultural center of the region.',
      bodyHy: 'Սյունյաց աշխարհը դարեր շարունակ եղել է հայոց պետականության ամուր հենասյուներից մեկը։ Իր ռազմավարական դիրքի և հոգևոր-մշակութային ներուժի շնորհիվ Սյունիքը կարևոր դեր է կատարել հայկական ինքնության և պետական մտածողության ձևավորման գործընթացում։\n\n10-րդ դարի երկրորդ կեսին այստեղ ձևավորվեց Սյունիքի Թագավորությունը (հայտնի նաև որպես Կապանի Թագավորություն)՝ որպես անկախ և ինքնիշխան հայկական պետություն։ Թագավորությունը գոյություն է ունեցել մինչև 1170 թվականը՝ դառնալով տարածաշրջանի քաղաքական, վարչական և մշակութային նշանակալի կենտրոն։',
      sectionOneEn: "The world of Syunik has been one of the strong pillars of Armenian statehood for centuries. Due to its strategic position and spiritual-cultural potential, Syunik played an important role in the formation of Armenian identity and state thinking.",
      sectionTwoEn: "In the second half of the 10th century, the Kingdom of Syunik (also known as the Kingdom of Kapan) was formed here as an independent and sovereign Armenian state. The kingdom existed until 1170, becoming a significant political, administrative, and cultural center of the region.",
      sectionThreeEn: "The capital of the kingdom, Kapan fortress city, served not only as a powerful defensive fortress but also as a center of state administration and cultural life. With its historical mission, the Kingdom of Syunik played an important role in preserving Armenian statehood and ensuring regional stability.",

      sectionOneHy: "Սյունյաց աշխարհը դարեր շարունակ եղել է հայոց պետականության ամուր հենասյուներից մեկը։ Իր ռազմավարական դիրքի և հոգևոր-մշակութային ներուժի շնորհիվ Սյունիքը կարևոր դեր է կատարել հայկական ինքնության և պետական մտածողության ձևավորման գործընթացում։",
      sectionTwoHy: "10-րդ դարի երկրորդ կեսին այստեղ ձևավորվեց Սյունիքի Թագավորությունը (հայտնի նաև որպես Կապանի Թագավորություն)՝ որպես անկախ և ինքնիշխան հայկական պետություն։ Թագավորությունը գոյություն է ունեցել մինչև 1170 թվականը՝ դառնալով տարածաշրջանի քաղաքական, վարչական և մշակութային նշանակալի կենտրոն։",
      sectionThreeHy: "Թագավորության մայրաքաղաքը՝ Կապան ամրոց-քաղաքը, ծառայել է ոչ միայն որպես հզոր պաշտպանական կառույց, այլև որպես պետական կառավարման և մշակութային կյանքի կենտրոն։ Իր պատմական առաքելությամբ Սյունիքի Թագավորությունը կարևոր դեր է կատարել հայոց պետականության պահպանման և տարածաշրջանային կայունության ապահովման գործում։",

      quoteEn: null,
      quoteHy: null,
      image: 'https://images.unsplash.com/photo-1548625361-195fe21b6d19?auto=format&fit=crop&w=1200&q=80',
      sortOrder: 0,
      published: true,
    },
    {
      slug: 'liberation-struggle',
      tagEn: 'Liberation Struggle',
      tagHy: 'Ազատագրական Պայքար',
      titleEn: 'Liberation Struggle',
      titleHy: 'Ազատագրական Պայքարը',
      subtitleEn: null,
      subtitleHy: null,
      bodyEn:
        'The history of Syunik is full of heroic episodes. The liberation struggle, which began in the early 18th century under the leadership of Davit Bek, proved that in the face of unity, it is possible to resist even the most powerful enemy.\n\nThe Battle of Halidzor and the heroic battles of Mountainous Armenia led by Garegin Nzhdeh not only defended Syunik but also ensured it remained Armenian, becoming bright examples of patriotism and military talent.',
      bodyHy:
        'Սյունիքի պատմությունը լի է հերոսական դրվագներով։ 18-րդ դարի սկզբին Դավիթ Բեկի գլխավորությամբ սկսված ազատագրական պայքարը ապացուցեց, որ միասնականության դեպքում հնարավոր է դիմակայել անգամ ամենահզոր թշնամուն։\n\nՀալիձորի ճակատամարտը և Գարեգին Նժդեհի ղեկավարած Լեռնահայաստանի հերոսամարտերը ոչ միայն պաշտպանեցին Սյունիքը, այլև ապահովեցին նրա հայկական մնալը՝ դառնալով հայրենասիրության և ռազմական տաղանդի վառ օրինակներ։',

      sectionOneEn: "The history of Syunik is full of heroic episodes. The liberation struggle started in the early 18th century under the leadership of Davit Bek proved that in case of unity, it is possible to resist even the most powerful enemy.",
      sectionTwoEn: "The Battle of Halidzor and the heroic battles of Mountainous Armenia led by Garegin Nzhdeh not only defended Syunik but also ensured its remaining Armenian, becoming bright examples of patriotism and military talent.",

      sectionOneHy: "Սյունիքի պատմությունը լի է հերոսական դրվագներով։ 18-րդ դարի սկզբին Դավիթ Բեկի գլխավորությամբ սկսված ազատագրական պայքարը ապացուցեց, որ միասնականության դեպքում հնարավոր է դիմակայել անգամ ամենահզոր թշնամուն։",
      sectionTwoHy: "Հալիձորի ճակատամարտը և Գարեգին Նժդեհի ղեկավարած Լեռնահայաստանի հերոսամարտերը ոչ միայն պաշտպանեցին Սյունիքը, այլև ապահովեցին նրա հայկական մնալը՝ դառնալով հայրենասիրության և ռազմական տաղանդի վառ օրինակներ։",

      quoteEn: null,
      quoteHy: null,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      sortOrder: 1,
      published: true,
    },
    {
      slug: 'syuniks-heroic-battle',
      tagEn: "Syunik's Heroic Battle",
      tagHy: 'Սյունիքի Հերոսամարտը',
      titleEn: "Syunik's Heroic Battle",
      titleHy: 'Սյունիքի Հերոսամարտը',
      subtitleEn: 'Garegin Nzhdeh and the Immortal Spirit',
      subtitleHy: 'Գարեգին Նժդեհ և Անմահ Ոգի',
      bodyEn:
        'In 1919–1921, when the existence of Armenia was in danger, Garegin Nzhdeh organized the self-defense of Mountainous Armenia in the mountains of Syunik. His iron will and strategic genius united the people of Syunik to wage a life-and-death struggle against the invaders.\n\nUnder Nzhdeh’s leadership, Syunik became an impregnable citadel. The Republic of Mountainous Armenia was proclaimed at Tatev Monastery, which played a decisive role in preserving Syunik within Armenia.',
      bodyHy:
        '1919-1921 թվականներին, երբ Հայաստանի գոյությունը վտանգված էր, Գարեգին Նժդեհը Սյունիքի լեռներում կազմակերպեց Լեռնահայաստանի ինքնապաշտպանությունը։ Նրա երկաթյա կամքն ու ռազմավարական հանճարը համախմբեցին սյունեցիներին՝ մղելու կենաց-մահու պայքար ընդդեմ զավթիչների։\n\nՆժդեհի առաջնորդությամբ Սյունիքը դարձավ անառիկ միջնաբերդ։ Տաթևի վանքում հռչակվեց Լեռնահայաստանի Հանրապետությունը, որը վճռորոշ դեր խաղաց Սյունիքը Հայաստանի կազմում պահպանելու գործում։',

      sectionOneEn: "In 1919-1921, when the existence of Armenia was in danger, Garegin Nzhdeh organized the self-defense of Mountainous Armenia in the mountains of Syunik. His iron will and strategic genius united the people of Syunik to wage a life-and-death struggle against the invaders.",
      sectionTwoEn: "Under Nzhdeh's leadership, Syunik became an impregnable citadel. The Republic of Mountainous Armenia was proclaimed in Tatev Monastery, which played a decisive role in preserving Syunik within Armenia.",
      sectionThreeEn: "“A people whose sons are not equal before the law and death will not have a victorious homeland.” With this ideology, Nzhdeh created one of the most glorious pages of Armenian history.",

      sectionOneHy: "1919-1921 թվականներին, երբ Հայաստանի գոյությունը վտանգված էր, Գարեգին Նժդեհը Սյունիքի լեռներում կազմակերպեց Լեռնահայաստանի ինքնապաշտպանությունը։ Նրա երկաթյա կամքն ու ռազմավարական հանճարը համախմբեցին սյունեցիներին՝ մղելու կենաց-մահու պայքար ընդդեմ զավթիչների։",
      sectionTwoHy: "Նժդեհի առաջնորդությամբ Սյունիքը դարձավ անառիկ միջնաբերդ։ Տաթևի վանքում հռչակվեց Լեռնահայաստանի Հանրապետությունը, որը վճռորոշ դեր խաղաց Սյունիքը Հայաստանի կազմում պահպանելու գործում։",
      sectionThreeHy: "«Ազգ, որի զավակները հավասար չեն օրենքի և մահվան առաջ, հաղթական հայրենիք չի ունենա։» Այս գաղափարախոսությամբ Նժդեհը ստեղծեց հայ ժողովրդի պատմության ամենափառահեղ էջերից մեկը։",

      quoteEn: '"Syunik is our backbone, without which Armenia cannot exist."',
      quoteHy: '«Սյունիքը մեր ողնաշարն է, առանց որի Հայաստանը չի կարող գոյություն ունենալ։»',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      sortOrder: 2,
      published: true,
    },
  ];

  // for (const s of sections) {
  //   await prisma.historySection.upsert({
  //     where: { slug: s.slug },
  //     update: s,
  //     create: s,
  //   });
  // }

  for (const raw of sections as any[]) {
    // Drop the old sectionOne/Two/Three fields (they are not database columns)
    // and fold the third paragraph into the body, which the API splits by blank lines.
    const {
      sectionOneEn, sectionTwoEn, sectionThreeEn,
      sectionOneHy, sectionTwoHy, sectionThreeHy,
      ...data
    } = raw;

    if (sectionThreeEn && !data.bodyEn.includes(sectionThreeEn)) {
      data.bodyEn += `\n\n${sectionThreeEn}`;
    }
    if (sectionThreeHy && !data.bodyHy?.includes(sectionThreeHy)) {
      data.bodyHy = `${data.bodyHy ?? ''}\n\n${sectionThreeHy}`.trim();
    }

    await prisma.historySection.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });
  }

  // Ensure icons on places
  await prisma.place.updateMany({
    where: { slug: 'tatev-monastery' },
    data: { icon: '⛪' },
  });

  await prisma.place.updateMany({
    where: { slug: 'vahanavank' },
    data: { icon: '🏛' },
  });

  // Ensure karahunj place exists with icon
  const zorats = await prisma.place.findUnique({ where: { slug: 'zorats-karer' } });
  await prisma.place.upsert({
    where: { slug: 'karahunj' },
    update: { icon: '🌉' },
    create: {
      slug: 'karahunj',
      nameEn: zorats?.nameEn ?? 'Zorats Karer (Karahunj)',
      nameHy: zorats?.nameHy ?? 'Զորաց Քարեր (Քարահունջ)',
      shortEn: zorats?.shortEn ?? 'Ancient observatory and unique cultural monument.',
      shortHy: zorats?.shortHy ?? 'Հնագույն աստղադիտարան և եզակի մշակութային հուշարձան:',
      category: 'OBSERVATORY',
      icon: '🌉',
      image:
        zorats?.image ??
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
      latitude: zorats?.latitude ?? 39.5517,
      longitude: zorats?.longitude ?? 46.0286,
      cityId: zorats?.cityId ?? null,
      published: true,
    },
  });

  // Make heritage cards re-runnable
  await prisma.heritageCard.deleteMany({});

  const heritageSlugs = ['tatev-monastery', 'vahanavank', 'karahunj'];
  for (const [order, slug] of heritageSlugs.entries()) {
    const place = await prisma.place.findUnique({ where: { slug } });
    if (place) {
      await prisma.heritageCard.create({
        data: {
          placeId: place.id,
          sortOrder: order,
        },
      });
    }
  }

  console.log('Seeded history sections and heritage cards.');
}
