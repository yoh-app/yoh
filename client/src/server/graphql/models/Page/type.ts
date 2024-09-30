import { objectType } from 'nexus'

export const Page = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Page',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.json('content')
    t.nullable.string('description')
    t.nullable.string('externalUrl')
    t.string('id')
    t.nullable.json('imageObj')
    t.nullable.boolean('isExternalLink')
    t.nullable.boolean('isIndex')
    t.nullable.boolean('menu')
    t.nullable.string('name')
    t.nullable.field('navColor', { type: 'NavColor' })
    t.nullable.string('password')
    t.nullable.string('slug')
    t.nullable.string('websiteId')
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
    t.list.field('pageViews', {
      type: 'PageView',
      args: {
        where: 'PageViewWhereInput',
        orderBy: 'PageViewOrderByWithRelationInput',
        cursor: 'PageViewWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PageViewScalarFieldEnum',
      },
      resolve(root: any) {
        return root.pageViews
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
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'PageCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
