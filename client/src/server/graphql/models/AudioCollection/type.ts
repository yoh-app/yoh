import { objectType } from 'nexus'

export const AudioCollection = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'AudioCollection',
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
    t.list.field('audios', {
      type: 'Audio',
      args: {
        where: 'AudioWhereInput',
        orderBy: 'AudioOrderByWithRelationInput',
        cursor: 'AudioWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'AudioScalarFieldEnum',
      },
      resolve(root: any) {
        return root.audios
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'AudioCollectionCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
