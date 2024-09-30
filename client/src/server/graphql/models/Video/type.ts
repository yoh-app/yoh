import { objectType } from 'nexus'

export const Video = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Video',
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
    t.nullable.boolean('isYoutube')
    t.nullable.boolean('menu')
    t.nullable.string('name')
    t.nullable.field('navColor', { type: 'NavColor' })
    t.nullable.string('password')
    t.nullable.string('slug')
    t.nullable.json('videoObj')
    t.nullable.json('videoPreviewObj')
    t.nullable.string('websiteId')
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
    t.list.field('videoViews', {
      type: 'VideoView',
      args: {
        where: 'VideoViewWhereInput',
        orderBy: 'VideoViewOrderByWithRelationInput',
        cursor: 'VideoViewWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VideoViewScalarFieldEnum',
      },
      resolve(root: any) {
        return root.videoViews
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'VideoCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
