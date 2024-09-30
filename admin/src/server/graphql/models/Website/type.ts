import { objectType } from 'nexus'

export const Website = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Website',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.json('address')
    t.nullable.json('adminFilters')
    t.nullable.json('chain')
    t.nullable.field('currencyCode', { type: 'CurrencyCode' })
    t.nullable.string('description')
    t.nullable.boolean('gasless')
    t.nullable.boolean('hasLocation')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.boolean('isTemplate')
    t.nullable.field('languageCode', { type: 'LanguageCode' })
    t.nullable.string('locationAddress')
    t.nullable.float('locationLat')
    t.nullable.float('locationLng')
    t.nullable.json('logoObj')
    t.nullable.json('menu')
    t.nullable.string('name')
    t.nullable.string('phone')
    t.nullable.string('slug')
    t.nullable.string('stripeAccountId')
    t.nullable.field('themeColor', { type: 'Color' })
    t.nullable.string('userId')
    t.nullable.string('walletAddress')
    t.list.field('affiliates', {
      type: 'Affiliate',
      args: {
        where: 'AffiliateWhereInput',
        orderBy: 'AffiliateOrderByWithRelationInput',
        cursor: 'AffiliateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AffiliateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.affiliates
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
    t.list.field('attributes', {
      type: 'Attribute',
      args: {
        where: 'AttributeWhereInput',
        orderBy: 'AttributeOrderByWithRelationInput',
        cursor: 'AttributeWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AttributeScalarFieldEnum',
      },
      resolve(root: any) {
        return root.attributes
      },
    })
    t.list.field('audioCollections', {
      type: 'AudioCollection',
      args: {
        where: 'AudioCollectionWhereInput',
        orderBy: 'AudioCollectionOrderByWithRelationInput',
        cursor: 'AudioCollectionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AudioCollectionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.audioCollections
      },
    })
    t.list.field('audios', {
      type: 'Audio',
      args: {
        where: 'AudioWhereInput',
        orderBy: 'AudioOrderByWithRelationInput',
        cursor: 'AudioWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AudioScalarFieldEnum',
      },
      resolve(root: any) {
        return root.audios
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
    t.list.field('customers', {
      type: 'Customer',
      args: {
        where: 'CustomerWhereInput',
        orderBy: 'CustomerOrderByWithRelationInput',
        cursor: 'CustomerWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CustomerScalarFieldEnum',
      },
      resolve(root: any) {
        return root.customers
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
    t.list.field('events', {
      type: 'Event',
      args: {
        where: 'EventWhereInput',
        orderBy: 'EventOrderByWithRelationInput',
        cursor: 'EventWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'EventScalarFieldEnum',
      },
      resolve(root: any) {
        return root.events
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
    t.list.field('notifications', {
      type: 'Notification',
      args: {
        where: 'NotificationWhereInput',
        orderBy: 'NotificationOrderByWithRelationInput',
        cursor: 'NotificationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'NotificationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.notifications
      },
    })
    t.list.field('orders', {
      type: 'Order',
      args: {
        where: 'OrderWhereInput',
        orderBy: 'OrderOrderByWithRelationInput',
        cursor: 'OrderWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'OrderScalarFieldEnum',
      },
      resolve(root: any) {
        return root.orders
      },
    })
    t.list.field('pageCollections', {
      type: 'PageCollection',
      args: {
        where: 'PageCollectionWhereInput',
        orderBy: 'PageCollectionOrderByWithRelationInput',
        cursor: 'PageCollectionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PageCollectionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.pageCollections
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
    t.list.field('products', {
      type: 'Product',
      args: {
        where: 'ProductWhereInput',
        orderBy: 'ProductOrderByWithRelationInput',
        cursor: 'ProductWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ProductScalarFieldEnum',
      },
      resolve(root: any) {
        return root.products
      },
    })
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.list.field('videoCollections', {
      type: 'VideoCollection',
      args: {
        where: 'VideoCollectionWhereInput',
        orderBy: 'VideoCollectionOrderByWithRelationInput',
        cursor: 'VideoCollectionWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VideoCollectionScalarFieldEnum',
      },
      resolve(root: any) {
        return root.videoCollections
      },
    })
    t.list.field('videos', {
      type: 'Video',
      args: {
        where: 'VideoWhereInput',
        orderBy: 'VideoOrderByWithRelationInput',
        cursor: 'VideoWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VideoScalarFieldEnum',
      },
      resolve(root: any) {
        return root.videos
      },
    })
    t.list.field('websiteGroups', {
      type: 'WebsiteGroup',
      args: {
        where: 'WebsiteGroupWhereInput',
        orderBy: 'WebsiteGroupOrderByWithRelationInput',
        cursor: 'WebsiteGroupWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'WebsiteGroupScalarFieldEnum',
      },
      resolve(root: any) {
        return root.websiteGroups
      },
    })
    t.field('_count', {
      type: 'WebsiteCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
