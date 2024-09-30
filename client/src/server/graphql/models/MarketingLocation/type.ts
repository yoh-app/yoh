import { objectType } from 'nexus'

export const MarketingLocation = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'MarketingLocation',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.string('description')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.string('locationAddress')
    t.nullable.float('locationLat')
    t.nullable.float('locationLng')
    t.nullable.string('name')
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
      type: 'MarketingLocationCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
