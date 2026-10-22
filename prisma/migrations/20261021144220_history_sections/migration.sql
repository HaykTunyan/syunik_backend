-- CreateTable
CREATE TABLE "HistorySection" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "tagEn" TEXT,
    "tagHy" TEXT,
    "titleEn" TEXT NOT NULL,
    "titleHy" TEXT,
    "subtitleEn" TEXT,
    "subtitleHy" TEXT,
    "bodyEn" TEXT NOT NULL,
    "bodyHy" TEXT,
    "quoteEn" TEXT,
    "quoteHy" TEXT,
    "image" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HistorySection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeritageCard" (
    "id" SERIAL NOT NULL,
    "placeId" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HeritageCard_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HistorySection_slug_key" ON "HistorySection"("slug");

-- CreateIndex
CREATE INDEX "HeritageCard_placeId_idx" ON "HeritageCard"("placeId");

-- AddForeignKey
ALTER TABLE "HeritageCard" ADD CONSTRAINT "HeritageCard_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
