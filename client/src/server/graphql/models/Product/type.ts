import { objectType } from 'nexus'

export const Product = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Product',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.field('chain', { type: 'Chain' })
    t.nullable.float('commissionFee')
    t.nullable.json('content')
    t.nullable.string('contractAddress')
    t.nullable.string('description')
    t.nullable.field('endTime', { type: 'DateTime' })
    t.nullable.field('eventEndTime', { type: 'DateTime' })
    t.nullable.field('eventStartTime', { type: 'DateTime' })
    t.nullable.field('externalNftChain', { type: 'Chain' })
    t.nullable.string('externalNftContractAddress')
    t.nullable.string('externalUrl')
    t.nullable.json('gallery')
    t.nullable.boolean('hasLocation')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('locationAddress')
    t.nullable.float('locationLat')
    t.nullable.float('locationLng')
    t.nullable.int('maxQuantity')
    t.nullable.string('name')
    t.nullable.float('price')
    t.nullable.field('productType', { type: 'ProductType' })
    t.nullable.field('prodyctType', { type: 'ProductType' })
    t.nullable.int('quantity')
    t.nullable.int('quantitySold')
    t.nullable.int('royaltyFee')
    t.nullable.float('salePrice')
    t.nullable.string('slug')
    t.nullable.field('startTime', { type: 'DateTime' })
    t.nullable.string('transactionHash')
    t.nullable.boolean('useCommission')
    t.nullable.boolean('useExternalNft')
    t.nullable.boolean('useNft')
    t.nullable.boolean('useQuantity')
    t.nullable.boolean('useRoyalty')
    t.nullable.boolean('useStartTime')
    t.nullable.boolean('useUsd')
    t.nullable.boolean('useVariations')
    t.nullable.json('variationOptions')
    t.nullable.json('variations')
    t.nullable.string('websiteId')
    t.list.field('attachments', {
      type: 'Attachment',
      args: {
        where: 'AttachmentWhereInput',
        orderBy: 'AttachmentOrderByWithRelationInput',
        cursor: 'AttachmentWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AttachmentScalarFieldEnum',
      },
      resolve(root: any) {
        return root.attachments
      },
    })
    t.list.field('coupons', {
      type: 'Coupon',
      args: {
        where: 'CouponWhereInput',
        orderBy: 'CouponOrderByWithRelationInput',
        cursor: 'CouponWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CouponScalarFieldEnum',
      },
      resolve(root: any) {
        return root.coupons
      },
    })
    t.list.field('marketingLocations', {
      type: 'MarketingLocation',
      args: {
        where: 'MarketingLocationWhereInput',
        orderBy: 'MarketingLocationOrderByWithRelationInput',
        cursor: 'MarketingLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'MarketingLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.marketingLocations
      },
    })
    t.list.field('orderedProducts', {
      type: 'OrderedProduct',
      args: {
        where: 'OrderedProductWhereInput',
        orderBy: 'OrderedProductOrderByWithRelationInput',
        cursor: 'OrderedProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'OrderedProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.orderedProducts
      },
    })
    t.list.field('pages', {
      type: 'Page',
      args: {
        where: 'PageWhereInput',
        orderBy: 'PageOrderByWithRelationInput',
        cursor: 'PageWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PageScalarFieldEnum',
      },
      resolve(root: any) {
        return root.pages
      },
    })
    t.list.field('productCollections', {
      type: 'ProductCollection',
      args: {
        where: 'ProductCollectionWhereInput',
        orderBy: 'ProductCollectionOrderByWithRelationInput',
        cursor: 'ProductCollectionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ProductCollectionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.productCollections
      },
    })
    t.list.field('productGroups', {
      type: 'ProductGroup',
      args: {
        where: 'ProductGroupWhereInput',
        orderBy: 'ProductGroupOrderByWithRelationInput',
        cursor: 'ProductGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ProductGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.productGroups
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'ProductCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
