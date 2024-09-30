/*
  Warnings:

  - You are about to drop the column `isAffiliate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isExternalNft` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isNft` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Product` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ProductType" ADD VALUE 'deal';

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isAffiliate",
ADD COLUMN     "isAirdrop" BOOLEAN;

-- AlterTable
ALTER TABLE "OrderedProduct" ADD COLUMN     "tokenId" TEXT,
ADD COLUMN     "variationName" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "endDate",
DROP COLUMN "isExternalNft",
DROP COLUMN "isNft",
DROP COLUMN "startDate",
ADD COLUMN     "endTime" TIMESTAMP(3),
ADD COLUMN     "eventEndTime" TIMESTAMP(3),
ADD COLUMN     "eventStartTime" TIMESTAMP(3),
ADD COLUMN     "externalNftChain" "Chain",
ADD COLUMN     "startTime" TIMESTAMP(3),
ADD COLUMN     "useExternalNft" BOOLEAN,
ADD COLUMN     "useNft" BOOLEAN,
ADD COLUMN     "useStartTime" BOOLEAN;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "audioId" TEXT,
ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "RequestClick" ADD COLUMN     "audioId" TEXT,
ADD COLUMN     "videoId" TEXT;

-- AlterTable
ALTER TABLE "Website" ADD COLUMN     "gasless" BOOLEAN,
ADD COLUMN     "stripeAccountId" TEXT;

-- CreateTable
CREATE TABLE "Audio" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "audioObj" JSONB,
    "audioPreviewObj" JSONB,
    "content" JSONB,
    "description" TEXT,
    "externalUrl" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "isExternalLink" BOOLEAN,
    "isIndex" BOOLEAN,
    "menu" BOOLEAN,
    "name" TEXT,
    "navColor" "NavColor",
    "password" TEXT,
    "slug" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "Audio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioCollection" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "description" TEXT,
    "displayTitle" BOOLEAN,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "AudioCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AudioView" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "audioId" TEXT,
    "id" TEXT NOT NULL,
    "ip" TEXT,

    CONSTRAINT "AudioView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "content" JSONB,
    "description" TEXT,
    "externalUrl" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "isExternalLink" BOOLEAN,
    "isIndex" BOOLEAN,
    "menu" BOOLEAN,
    "name" TEXT,
    "navColor" "NavColor",
    "password" TEXT,
    "slug" TEXT,
    "videoObj" JSONB,
    "videoPreviewObj" JSONB,
    "websiteId" TEXT,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoCollection" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "description" TEXT,
    "displayTitle" BOOLEAN,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "VideoCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VideoView" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "videoId" TEXT,

    CONSTRAINT "VideoView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AudioToAudioCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VideoToVideoCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Audio_slug_key" ON "Audio"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Video_slug_key" ON "Video"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_AudioToAudioCollection_AB_unique" ON "_AudioToAudioCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_AudioToAudioCollection_B_index" ON "_AudioToAudioCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VideoToVideoCollection_AB_unique" ON "_VideoToVideoCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_VideoToVideoCollection_B_index" ON "_VideoToVideoCollection"("B");

-- AddForeignKey
ALTER TABLE "Audio" ADD CONSTRAINT "Audio_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioCollection" ADD CONSTRAINT "AudioCollection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AudioView" ADD CONSTRAINT "AudioView_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestClick" ADD CONSTRAINT "RequestClick_audioId_fkey" FOREIGN KEY ("audioId") REFERENCES "Audio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestClick" ADD CONSTRAINT "RequestClick_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoCollection" ADD CONSTRAINT "VideoCollection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VideoView" ADD CONSTRAINT "VideoView_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToAudioCollection" ADD CONSTRAINT "_AudioToAudioCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Audio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AudioToAudioCollection" ADD CONSTRAINT "_AudioToAudioCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "AudioCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToVideoCollection" ADD CONSTRAINT "_VideoToVideoCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VideoToVideoCollection" ADD CONSTRAINT "_VideoToVideoCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "VideoCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
