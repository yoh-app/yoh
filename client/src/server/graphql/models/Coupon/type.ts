import { objectType } from 'nexus'

export const Coupon = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Coupon',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.float('amountOff')
    t.nullable.field('couponType', { type: 'CouponType' })
    t.nullable.string('description')
    t.nullable.field('expiredAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('name')
    t.nullable.float('percentOff')
    t.nullable.int('quantity')
    t.nullable.string('slug')
    t.nullable.field('startAt', { type: 'DateTime' })
    t.nullable.string('websiteId')
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
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'CouponCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
