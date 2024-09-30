/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Attachment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "CouponType" AS ENUM ('amountOff', 'percentOff');

-- CreateTable
CREATE TABLE "Affiliate" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "accepted" BOOLEAN,
    "customerId" TEXT,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "name" TEXT,
    "walletAddress" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "Affiliate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "couponType" "CouponType",
    "description" TEXT,
    "expiredAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "startAt" TIMESTAMP(3),
    "websiteId" TEXT,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CouponToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Affiliate_customerId_key" ON "Affiliate"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_slug_key" ON "Coupon"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CouponToProduct_AB_unique" ON "_CouponToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CouponToProduct_B_index" ON "_CouponToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Attachment_url_key" ON "Attachment"("url");

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Affiliate" ADD CONSTRAINT "Affiliate_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coupon" ADD CONSTRAINT "Coupon_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CouponToProduct" ADD CONSTRAINT "_CouponToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
