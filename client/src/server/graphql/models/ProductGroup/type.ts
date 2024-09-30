import { objectType } from 'nexus'

export const ProductGroup = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'ProductGroup',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('name')
    t.nullable.string('organizationId')
    t.nullable.string('websiteId')
    t.nullable.field('organization', {
      type: 'Organization',
      resolve(root: any) {
        return root.organization
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
      type: 'ProductGroupCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
