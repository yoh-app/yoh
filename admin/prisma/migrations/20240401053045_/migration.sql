-- CreateEnum
CREATE TYPE "AttachmentType" AS ENUM ('audio', 'document', 'image', 'video');

-- CreateEnum
CREATE TYPE "Chain" AS ENUM ('arbitrum', 'avalanche', 'ethereum', 'polygon');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('amber', 'blue', 'bluegrey', 'brown', 'cyan', 'deeporange', 'deeppurple', 'green', 'indigo', 'lightblue', 'lightbrown', 'lightgreen', 'orange', 'pink', 'purple', 'red', 'rose', 'teal');

-- CreateEnum
CREATE TYPE "CurrencyCode" AS ENUM ('usd');

-- CreateEnum
CREATE TYPE "LanguageCode" AS ENUM ('en', 'zh');

-- CreateEnum
CREATE TYPE "NavColor" AS ENUM ('black', 'white');

-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('event', 'membership', 'product');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('active', 'completed', 'expired', 'pending', 'processing', 'rejected');

-- CreateTable
CREATE TABLE "SlugCounter" (
    "counter" INTEGER,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN DEFAULT false,
    "deletedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "model" TEXT,
    "slug" TEXT,
    "title" TEXT,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "SlugCounter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attachment" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "attachmentObj" JSONB,
    "attachmentType" "AttachmentType",
    "description" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "name" TEXT,
    "previewObj" JSONB,
    "productId" TEXT,
    "upload" JSONB,
    "url" TEXT,
    "userId" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "Attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attribute" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "name" TEXT,
    "slug" TEXT,
    "values" JSONB,
    "websiteId" TEXT,

    CONSTRAINT "Attribute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "email" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "name" TEXT,
    "note" TEXT,
    "userId" TEXT,
    "walletAddress" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoginToken" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "approved" BOOLEAN,
    "domain" TEXT,
    "email" TEXT,
    "expires" TIMESTAMP(3),
    "geo" TEXT,
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "secret" TEXT,
    "userAgent" TEXT,
    "userAgentRaw" TEXT,
    "userId" TEXT,

    CONSTRAINT "LoginToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "action" TEXT,
    "description" TEXT,
    "id" TEXT NOT NULL,
    "isUnRead" BOOLEAN,
    "message" TEXT,
    "model" TEXT,
    "modelId" TEXT,
    "title" TEXT,
    "url" TEXT,
    "userId" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "affiliateFee" DOUBLE PRECISION,
    "affiliateWalletAddress" TEXT,
    "affiliateWebsiteSlug" TEXT,
    "amount" DOUBLE PRECISION,
    "applicationFee" DOUBLE PRECISION,
    "completed" BOOLEAN,
    "currencyCode" "CurrencyCode",
    "customerId" TEXT,
    "id" TEXT NOT NULL,
    "isAffiliate" BOOLEAN,
    "paid" BOOLEAN,
    "total" DOUBLE PRECISION,
    "transactionHash" TEXT,
    "walletAddress" TEXT,
    "websiteId" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderedProduct" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "description" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "minted" BOOLEAN,
    "name" TEXT,
    "orderId" TEXT,
    "price" DOUBLE PRECISION,
    "productId" TEXT,
    "productSlug" TEXT,
    "productType" "ProductType",
    "productUrl" TEXT,
    "quantity" INTEGER,
    "redeemedQuantity" INTEGER,
    "slug" TEXT,
    "total" DOUBLE PRECISION,
    "transactionHash" TEXT,
    "variationId" TEXT,
    "variationOption" JSONB,
    "walletAddress" TEXT,

    CONSTRAINT "OrderedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
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
    "websiteId" TEXT,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageCollection" (
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

    CONSTRAINT "PageCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageView" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "pageId" TEXT,

    CONSTRAINT "PageView_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
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
    "externalNftContractAddress" TEXT,
    "externalUrl" TEXT,
    "gallery" JSONB,
    "hasLocation" BOOLEAN,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "isExternalNft" BOOLEAN,
    "isNft" BOOLEAN,
    "locationAddress" TEXT,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "maxQuantity" INTEGER,
    "name" TEXT,
    "price" DOUBLE PRECISION,
    "productType" "ProductType",
    "prodyctType" "ProductType",
    "quantity" INTEGER,
    "quantitySold" INTEGER,
    "royaltyFee" INTEGER,
    "salePrice" DOUBLE PRECISION,
    "slug" TEXT,
    "startDate" TIMESTAMP(3),
    "transactionHash" TEXT,
    "useCommission" BOOLEAN,
    "useQuantity" BOOLEAN,
    "useRoyalty" BOOLEAN,
    "useUsd" BOOLEAN,
    "useVariations" BOOLEAN,
    "variationOptions" JSONB,
    "variations" JSONB,
    "websiteId" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCollection" (
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

    CONSTRAINT "ProductCollection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "expires" TIMESTAMP(3),
    "geo" TEXT,
    "ip" TEXT,
    "lastActive" TIMESTAMP(3),
    "loginTokenId" TEXT NOT NULL,
    "userAgent" TEXT,
    "userAgentRaw" TEXT,
    "userId" TEXT,
    "value" TEXT,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("loginTokenId")
);

-- CreateTable
CREATE TABLE "Request" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "accept" BOOLEAN,
    "acceptBefore" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "applicationFee" DOUBLE PRECISION,
    "chain" "Chain",
    "currencyCode" "CurrencyCode",
    "customerId" TEXT,
    "days" INTEGER,
    "description" TEXT,
    "expiredAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "message" TEXT,
    "name" TEXT,
    "pageId" TEXT,
    "paid" BOOLEAN,
    "paidAt" TIMESTAMP(3),
    "paymentId" TEXT,
    "price" DOUBLE PRECISION,
    "requestStatus" "RequestStatus",
    "subject" TEXT,
    "total" DOUBLE PRECISION,
    "transactionHash" TEXT,
    "url" TEXT,
    "useUsd" BOOLEAN,
    "walletAddress" TEXT,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestClick" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "id" TEXT NOT NULL,
    "ip" TEXT,
    "pageId" TEXT,
    "requestId" TEXT,

    CONSTRAINT "RequestClick_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "adminFilters" JSONB,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "email" TEXT,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "name" TEXT,
    "password" TEXT,
    "stripeAccountId" TEXT,
    "stripeCustomerId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Website" (
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    "deleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3),
    "active" BOOLEAN DEFAULT true,
    "address" JSONB,
    "adminFilters" JSONB,
    "chain" JSONB,
    "currencyCode" "CurrencyCode",
    "description" TEXT,
    "hasLocation" BOOLEAN,
    "id" TEXT NOT NULL,
    "imageObj" JSONB,
    "isTemplate" BOOLEAN,
    "languageCode" "LanguageCode",
    "locationAddress" TEXT,
    "locationLat" DOUBLE PRECISION,
    "locationLng" DOUBLE PRECISION,
    "logoObj" JSONB,
    "menu" JSONB,
    "name" TEXT,
    "phone" TEXT,
    "slug" TEXT,
    "themeColor" "Color",
    "userId" TEXT,
    "walletAddress" TEXT,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PageToPageCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_PageToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToProductCollection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Attribute_slug_key" ON "Attribute"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "OrderedProduct_slug_key" ON "OrderedProduct"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Website_slug_key" ON "Website"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_PageToPageCollection_AB_unique" ON "_PageToPageCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToPageCollection_B_index" ON "_PageToPageCollection"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_PageToProduct_AB_unique" ON "_PageToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_PageToProduct_B_index" ON "_PageToProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToProductCollection_AB_unique" ON "_ProductToProductCollection"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToProductCollection_B_index" ON "_ProductToProductCollection"("B");

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attachment" ADD CONSTRAINT "Attachment_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attribute" ADD CONSTRAINT "Attribute_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoginToken" ADD CONSTRAINT "LoginToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderedProduct" ADD CONSTRAINT "OrderedProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageCollection" ADD CONSTRAINT "PageCollection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageView" ADD CONSTRAINT "PageView_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCollection" ADD CONSTRAINT "ProductCollection_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestClick" ADD CONSTRAINT "RequestClick_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "Page"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestClick" ADD CONSTRAINT "RequestClick_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "Request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToPageCollection" ADD CONSTRAINT "_PageToPageCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToPageCollection" ADD CONSTRAINT "_PageToPageCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "PageCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToProduct" ADD CONSTRAINT "_PageToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PageToProduct" ADD CONSTRAINT "_PageToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductCollection" ADD CONSTRAINT "_ProductToProductCollection_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToProductCollection" ADD CONSTRAINT "_ProductToProductCollection_B_fkey" FOREIGN KEY ("B") REFERENCES "ProductCollection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
