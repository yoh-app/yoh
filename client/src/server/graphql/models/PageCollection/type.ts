import { objectType } from 'nexus'

export const PageCollection = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'PageCollection',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.string('description')
    t.nullable.boolean('displayTitle')
    t.string('id')
    t.nullable.string('name')
    t.nullable.string('websiteId')
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
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'PageCollectionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
