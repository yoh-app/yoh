import { objectType } from 'nexus'

export const Request = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Request',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('accept')
    t.nullable.field('acceptBefore', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.float('applicationFee')
    t.nullable.string('audioId')
    t.nullable.field('chain', { type: 'Chain' })
    t.nullable.field('currencyCode', { type: 'CurrencyCode' })
    t.nullable.string('customerId')
    t.nullable.int('days')
    t.nullable.string('description')
    t.nullable.field('expiredAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('message')
    t.nullable.string('name')
    t.nullable.string('pageId')
    t.nullable.boolean('paid')
    t.nullable.field('paidAt', { type: 'DateTime' })
    t.nullable.string('paymentId')
    t.nullable.field('paymentType', { type: 'PaymentType' })
    t.nullable.float('price')
    t.nullable.field('requestStatus', { type: 'RequestStatus' })
    t.nullable.float('stripeFee')
    t.nullable.string('subject')
    t.nullable.float('total')
    t.nullable.string('transactionHash')
    t.nullable.string('url')
    t.nullable.boolean('useUsd')
    t.nullable.string('videoId')
    t.nullable.string('walletAddress')
    t.nullable.field('audio', {
      type: 'Audio',
      resolve(root: any) {
        return root.audio
      },
    })
    t.nullable.field('customer', {
      type: 'Customer',
      resolve(root: any) {
        return root.customer
      },
    })
    t.nullable.field('page', {
      type: 'Page',
      resolve(root: any) {
        return root.page
      },
    })
    t.list.field('requestClicks', {
      type: 'RequestClick',
      args: {
        where: 'RequestClickWhereInput',
        orderBy: 'RequestClickOrderByWithRelationInput',
        cursor: 'RequestClickWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RequestClickScalarFieldEnum',
      },
      resolve(root: any) {
        return root.requestClicks
      },
    })
    t.nullable.field('video', {
      type: 'Video',
      resolve(root: any) {
        return root.video
      },
    })
    t.field('_count', {
      type: 'RequestCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
