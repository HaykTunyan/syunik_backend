/*
  Warnings:

  - You are about to drop the column `description` on the `City` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `City` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `areaKm2` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foundedEn` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameEn` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `population` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taglineEn` to the `City` table without a default value. This is not possible if the table is not empty.
  - Made the column `latitude` on table `City` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `City` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "PlaceCategory" AS ENUM ('MONASTERY', 'FORTRESS', 'NATURE', 'BRIDGE', 'CAVE', 'VIEWPOINT', 'OBSERVATORY', 'MONUMENT', 'WATERFALL', 'TOWN', 'OTHER');

-- AlterTable
ALTER TABLE "City" DROP COLUMN "description",
DROP COLUMN "name",
ADD COLUMN     "areaKm2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "bestVisitEn" TEXT,
ADD COLUMN     "bestVisitHy" TEXT,
ADD COLUMN     "climateEn" TEXT,
ADD COLUMN     "climateHy" TEXT,
ADD COLUMN     "foundedEn" TEXT NOT NULL,
ADD COLUMN     "foundedHy" TEXT,
ADD COLUMN     "heroImage" TEXT,
ADD COLUMN     "historyEn" TEXT,
ADD COLUMN     "historyHy" TEXT,
ADD COLUMN     "nameEn" TEXT NOT NULL,
ADD COLUMN     "nameHy" TEXT,
ADD COLUMN     "population" INTEGER NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "sortOrder" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "taglineEn" TEXT NOT NULL,
ADD COLUMN     "taglineHy" TEXT,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHy" TEXT,
    "shortEn" TEXT NOT NULL,
    "shortHy" TEXT,
    "category" "PlaceCategory" NOT NULL DEFAULT 'OTHER',
    "image" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "cityId" INTEGER,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hotel" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stars" INTEGER NOT NULL DEFAULT 4,
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "priceFrom" INTEGER NOT NULL,
    "priceTo" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "score" DOUBLE PRECISION NOT NULL,
    "reviewCount" INTEGER NOT NULL DEFAULT 0,
    "amenitiesEn" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "amenitiesHy" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bookingUrl" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "Hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityAttraction" (
    "id" SERIAL NOT NULL,
    "textEn" TEXT NOT NULL,
    "textHy" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "CityAttraction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CityLink" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "cityId" INTEGER NOT NULL,

    CONSTRAINT "CityLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Place_slug_key" ON "Place"("slug");

-- CreateIndex
CREATE INDEX "Place_cityId_idx" ON "Place"("cityId");

-- CreateIndex
CREATE INDEX "Hotel_cityId_idx" ON "Hotel"("cityId");

-- CreateIndex
CREATE UNIQUE INDEX "City_slug_key" ON "City"("slug");

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hotel" ADD CONSTRAINT "Hotel_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityAttraction" ADD CONSTRAINT "CityAttraction_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CityLink" ADD CONSTRAINT "CityLink_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE CASCADE ON UPDATE CASCADE;
