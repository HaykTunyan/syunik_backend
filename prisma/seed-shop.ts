import { PrismaClient } from '@prisma/client';

export async function seedShop(prisma: PrismaClient) {
  console.log('Seeding shop products...');

  const products = [
    {
      slug: 'spirit-of-mount-khustup',
      nameEn: 'Spirit of Mount Khustup',
      nameHy: 'Խուստուփի ոգին',
      collectionEn: 'Syunik Peaks',
      collectionHy: 'Սյունյաց գագաթներ',
      badgeEn: 'Popular',
      badgeHy: 'Հանրաճանաչ',
      descriptionEn:
        'Premium organic cotton T-shirt featuring the majestic Mount Khustup artwork.',
      descriptionHy:
        'Պրեմիում օրգանական բամբակից շապիկ՝ Խուստուփ լեռան գեղեցիկ պատկերով։',
      detailsEn: [
        '100% organic combed cotton',
        'Silk-screen printed in Syunik',
        'Unisex relaxed fit',
      ],
      detailsHy: [
        '100% օրգանական բամբակ',
        'Մետաքսատպություն Սյունիքում',
        'Ունիսեքս հարմարավետ ձևվածք',
      ],
      priceMinor: 1999,
      currency: 'USD',
      sizes: ['S', 'M', 'L', 'XL'],
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80',
      ],
      sortOrder: 0,
      published: true,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: product,
      create: product,
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

