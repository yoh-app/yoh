import { objectType } from 'nexus'

export const VideoCollection = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'VideoCollection',
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
    t.list.field('videos', {
      type: 'Video',
      args: {
        where: 'VideoWhereInput',
        orderBy: 'VideoOrderByWithRelationInput',
        cursor: 'VideoWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'VideoScalarFieldEnum',
      },
      resolve(root: any) {
        return root.videos
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'VideoCollectionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
