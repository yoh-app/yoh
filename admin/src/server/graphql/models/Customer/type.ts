import { objectType } from 'nexus'

export const Customer = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Customer',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('email')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('name')
    t.nullable.string('note')
    t.nullable.string('userId')
    t.nullable.string('walletAddress')
    t.nullable.string('websiteId')
    t.nullable.field('affiliate', {
      type: 'Affiliate',
      resolve(root: any) {
        return root.affiliate
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
    t.list.field('requests', {
      type: 'Request',
      args: {
        where: 'RequestWhereInput',
        orderBy: 'RequestOrderByWithRelationInput',
        cursor: 'RequestWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RequestScalarFieldEnum',
      },
      resolve(root: any) {
        return root.requests
      },
    })
    t.nullable.field('user', {
      type: 'User',
      resolve(root: any) {
        return root.user
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'CustomerCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
