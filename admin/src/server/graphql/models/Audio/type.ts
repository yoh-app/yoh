import { objectType } from 'nexus'

export const Audio = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Audio',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.json('audioObj')
    t.nullable.json('audioPreviewObj')
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
    t.list.field('audioViews', {
      type: 'AudioView',
      args: {
        where: 'AudioViewWhereInput',
        orderBy: 'AudioViewOrderByWithRelationInput',
        cursor: 'AudioViewWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AudioViewScalarFieldEnum',
      },
      resolve(root: any) {
        return root.audioViews
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
      type: 'AudioCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
