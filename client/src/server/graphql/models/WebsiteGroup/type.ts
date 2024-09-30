import { objectType } from 'nexus'

export const WebsiteGroup = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'WebsiteGroup',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.string('id')
    t.nullable.string('name')
    t.nullable.string('organizationId')
    t.nullable.field('organization', {
      type: 'Organization',
      resolve(root: any) {
        return root.organization
      },
    })
    t.list.field('websites', {
      type: 'Website',
      args: {
        where: 'WebsiteWhereInput',
        orderBy: 'WebsiteOrderByWithRelationInput',
        cursor: 'WebsiteWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'WebsiteScalarFieldEnum',
      },
      resolve(root: any) {
        return root.websites
      },
    })
    t.field('_count', {
      type: 'WebsiteGroupCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
