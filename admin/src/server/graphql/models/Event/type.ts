import { objectType } from 'nexus'

export const Event = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Event',
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
    t.nullable.field('endDate', { type: 'DateTime' })
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
    t.nullable.boolean('isExternalNft')
    t.nullable.string('locationAddress')
    t.nullable.float('locationLat')
    t.nullable.float('locationLng')
    t.nullable.int('maxOrderPerUser')
    t.nullable.int('maxQuantity')
    t.nullable.string('name')
    t.nullable.boolean('payWithUSD')
    t.nullable.float('price')
    t.nullable.field('productType', { type: 'ProductType' })
    t.nullable.int('quantity')
    t.nullable.int('quantitySold')
    t.nullable.float('royaltyBps')
    t.nullable.int('royaltyFee')
    t.nullable.boolean('saleEnabled')
    t.nullable.float('salePrice')
    t.nullable.string('slug')
    t.nullable.field('startDate', { type: 'DateTime' })
    t.nullable.field('startTime', { type: 'DateTime' })
    t.nullable.string('telegramApiToken')
    t.nullable.string('telegramBotId')
    t.nullable.string('transactionHash')
    t.nullable.boolean('useCommission')
    t.nullable.boolean('useExternalNft')
    t.nullable.boolean('useMultipleDays')
    t.nullable.boolean('useNft')
    t.nullable.boolean('usePrice')
    t.nullable.boolean('useQuantity')
    t.nullable.boolean('useRoyalty')
    t.nullable.boolean('useStartTime')
    t.nullable.boolean('useUsd')
    t.nullable.boolean('useVariations')
    t.nullable.json('variationOptions')
    t.nullable.json('variations')
    t.nullable.string('websiteId')
    t.list.field('agenda', {
      type: 'Agenda',
      args: {
        where: 'AgendaWhereInput',
        orderBy: 'AgendaOrderByWithRelationInput',
        cursor: 'AgendaWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AgendaScalarFieldEnum',
      },
      resolve(root: any) {
        return root.agenda
      },
    })
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
    t.list.field('eventCollections', {
      type: 'EventCollection',
      args: {
        where: 'EventCollectionWhereInput',
        orderBy: 'EventCollectionOrderByWithRelationInput',
        cursor: 'EventCollectionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'EventCollectionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.eventCollections
      },
    })
    t.list.field('eventGroups', {
      type: 'EventGroup',
      args: {
        where: 'EventGroupWhereInput',
        orderBy: 'EventGroupOrderByWithRelationInput',
        cursor: 'EventGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'EventGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.eventGroups
      },
    })
    t.list.field('marketingLocation', {
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
        return root.marketingLocation
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
    t.list.field('speakers', {
      type: 'Speaker',
      args: {
        where: 'SpeakerWhereInput',
        orderBy: 'SpeakerOrderByWithRelationInput',
        cursor: 'SpeakerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'SpeakerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.speakers
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'EventCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
