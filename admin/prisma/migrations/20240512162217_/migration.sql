/*
  Warnings:

  - You are about to drop the column `accepted` on the `Affiliate` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('crypto', 'stripe');

-- AlterTable
ALTER TABLE "Affiliate" DROP COLUMN "accepted",
ADD COLUMN     "active" BOOLEAN DEFAULT true,
ADD COLUMN     "igId" TEXT,
ADD COLUMN     "lineId" TEXT,
ADD COLUMN     "tgId" TEXT,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "eventId" TEXT;

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "amountOff" DOUBLE PRECISION,
ADD COLUMN     "percentOff" DOUBLE PRECISION,
ADD COLUMN     "quantity" INTEGER;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "couponId" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION,
ADD COLUMN     "paymentType" "PaymentType",
ADD COLUMN     "stripeFee" BOOLEAN;

-- AlterTable
ALTER TABLE "OrderedProduct" ADD COLUMN     "eventId" TEXT;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "paymentType" "PaymentType",
ADD COLUMN     "stripeFee" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Video" ADD COLUMN     "isYoutube" BOOLEAN;

-- CreateTable
CREATE TABLE "Agenda" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "description" TEXT,
    "endTime" TIMESTAMP(3),
    "eventId" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "name" TEXT,
    "startTime" TIMESTAMP(3),

    CONSTRAINT "Agenda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "chain" "Chain",
    "commissionFee" DOUBLE PRECISION,
    "content" JSONB,
    "contractAddress" TEXT,
    "description" TEXT,
    "endDate" TIMESTAMP(3),
    "endTime" TIMESTAMP(3),
    "eventEndTime" TIMESTAMP(3),
    "eventStartTime" TIMESTAMP(3),
    "externalNftChain" "Chain",
    "externalNftContractAddress" TEXT,
    "externalUrl" TEXT,
    "gallery" JSONB,
    "hasLocation" BOOLEAN,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "isExternalNft" BOOLEAN,
    "locationAddress" TEXT,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "maxOrderPerUser" INTEGER,
    "maxQuantity" INTEGER,
    "name" TEXT,
    "payWithUSD" BOOLEAN,
    "price" DOUBLE PRECISION,
    "productType" "ProductType",
    "quantity" INTEGER,
    "quantitySold" INTEGER,
    "royaltyBps" DOUBLE PRECISION,
    "royaltyFee" INTEGER,
    "saleEnabled" BOOLEAN,
    "salePrice" DOUBLE PRECISION,
    "slug" TEXT,
    "startDate" TIMESTAMP(3),
    "startTime" TIMESTAMP(3),
    "telegramApiToken" TEXT,
    "telegramBotId" TEXT,
    "transactionHash" TEXT,
    "useCommission" BOOLEAN,
    "useExternalNft" BOOLEAN,
    "useMultipleDays" BOOLEAN,
    "useNft" BOOLEAN,
    "usePrice" BOOLEAN,
    "useQuantity" BOOLEAN,
    "useRoyalty" BOOLEAN,
    "useStartTime" BOOLEAN,
    "useUsd" BOOLEAN,
    "useVariations" BOOLEAN,
    "variationOptions" JSONB,
    "variations" JSONB,
    "websiteId" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventCollection" (
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

    CONSTRAINT "EventCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventGroup" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "organizationId" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "EventGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingLocation" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "description" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "locationAddress" TEXT,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "name" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "MarketingLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organization" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "description" TEXT,
    "id" TEXT NOT NULL,
    "logoObj" JSONB,
    "name" TEXT,
    "slug" TEXT,
    "telegramApiToken" TEXT,
    "telegramBotId" TEXT,
    "userId" TEXT,
    "walletAddress" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductGroup" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "name" TEXT,
    "organizationId" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "ProductGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speaker" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "agendaId" TEXT,
    "description" TEXT,
    "eventId" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "name" TEXT,

    CONSTRAINT "Speaker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebsiteGroup" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "name" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "WebsiteGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CouponToEvent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToEventGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToMarketingLocation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_MarketingLocationToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToProductGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_WebsiteToWebsiteGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToEvent_AB_unique" ON "_CouponToEvent"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToEvent_B_index" ON "_CouponToEvent"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventCollection_AB_unique" ON "_EventToEventCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventCollection_B_index" ON "_EventToEventCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToEventGroup_AB_unique" ON "_EventToEventGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToEventGroup_B_index" ON "_EventToEventGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToMarketingLocation_AB_unique" ON "_EventToMarketingLocation"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToMarketingLocation_B_index" ON "_EventToMarketingLocation"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MarketingLocationToProduct_AB_unique" ON "_MarketingLocationToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_MarketingLocationToProduct_B_index" ON "_MarketingLocationToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductGroup_AB_unique" ON "_ProductToProductGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductGroup_B_index" ON "_ProductToProductGroup"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_WebsiteToWebsiteGroup_AB_unique" ON "_WebsiteToWebsiteGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_WebsiteToWebsiteGroup_B_index" ON "_WebsiteToWebsiteGroup"("B");

-- AddForeignKey
ALTER TABLE "Agenda" ADD CONSTRAINT "Agenda_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventCollection" ADD CONSTRAINT "EventCollection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "EventGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventGroup" ADD CONSTRAINT "EventGroup_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingLocation" ADD CONSTRAINT "MarketingLocation_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGroup" ADD CONSTRAINT "ProductGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductGroup" ADD CONSTRAINT "ProductGroup_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_agendaId_fkey" FOREIGN KEY ("agendaId") REFERENCES "Agenda"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Speaker" ADD CONSTRAINT "Speaker_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebsiteGroup" ADD CONSTRAINT "WebsiteGroup_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToEvent" ADD CONSTRAINT "_CouponToEvent_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToEvent" ADD CONSTRAINT "_CouponToEvent_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCollection" ADD CONSTRAINT "_EventToEventCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventCollection" ADD CONSTRAINT "_EventToEventCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "EventCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventGroup" ADD CONSTRAINT "_EventToEventGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToEventGroup" ADD CONSTRAINT "_EventToEventGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "EventGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMarketingLocation" ADD CONSTRAINT "_EventToMarketingLocation_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToMarketingLocation" ADD CONSTRAINT "_EventToMarketingLocation_B_fkey" FOREIGN KEY ("B") REFERENCES "MarketingLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarketingLocationToProduct" ADD CONSTRAINT "_MarketingLocationToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "MarketingLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MarketingLocationToProduct" ADD CONSTRAINT "_MarketingLocationToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductGroup" ADD CONSTRAINT "_ProductToProductGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductGroup" ADD CONSTRAINT "_ProductToProductGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WebsiteToWebsiteGroup" ADD CONSTRAINT "_WebsiteToWebsiteGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_WebsiteToWebsiteGroup" ADD CONSTRAINT "_WebsiteToWebsiteGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "WebsiteGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
