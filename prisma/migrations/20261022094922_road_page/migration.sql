-- CreateTable
CREATE TABLE "RoadSection" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "tagEn" TEXT,
    "tagHy" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleHy" TEXT,
    "bodyEn" TEXT NOT NULL,
    "bodyHy" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "RoadSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteStop" (
    "id" SERIAL NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHy" TEXT,
    "distanceKm" INTEGER NOT NULL,
    "citySlug" TEXT,
    "placeSlug" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RouteStop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoadTip" (
    "id" SERIAL NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHy" TEXT,
    "bodyEn" TEXT NOT NULL,
    "bodyHy" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "RoadTip_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoadSection_slug_key" ON "RoadSection"("slug");
