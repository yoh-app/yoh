import { objectType } from 'nexus'

export const Order = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Order',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.float('affiliateFee')
    t.nullable.string('affiliateWalletAddress')
    t.nullable.string('affiliateWebsiteSlug')
    t.nullable.float('amount')
    t.nullable.float('applicationFee')
    t.nullable.boolean('completed')
    t.nullable.string('couponId')
    t.nullable.field('currencyCode', { type: 'CurrencyCode' })
    t.nullable.string('customerId')
    t.nullable.float('discount')
    t.string('id')
    t.nullable.boolean('isAirdrop')
    t.nullable.boolean('paid')
    t.nullable.field('paymentType', { type: 'PaymentType' })
    t.nullable.boolean('stripeFee')
    t.nullable.float('total')
    t.nullable.string('transactionHash')
    t.nullable.string('walletAddress')
    t.nullable.string('websiteId')
    t.nullable.field('coupon', {
      type: 'Coupon',
      resolve(root: any) {
        return root.coupon
      },
    })
    t.nullable.field('customer', {
      type: 'Customer',
      resolve(root: any) {
        return root.customer
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
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'OrderCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
