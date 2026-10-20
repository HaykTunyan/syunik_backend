-- AlterTable
ALTER TABLE "Place" ADD COLUMN     "altitudeM" INTEGER,
ADD COLUMN     "descriptionEn" TEXT,
ADD COLUMN     "descriptionHy" TEXT,
ADD COLUMN     "historical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "locationEn" TEXT,
ADD COLUMN     "locationHy" TEXT,
ADD COLUMN     "mostVisited" BOOLEAN NOT NULL DEFAULT false;
