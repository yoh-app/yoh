import { objectType } from 'nexus'

export const EventGroup = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'EventGroup',
  definition(t) {
    t.nullable.field('createdAt', { type: 'DateTime' })
    t.nullable.field('deletedAt', { type: 'DateTime' })
    t.nullable.boolean('deleted')
    t.nullable.field('updatedAt', { type: 'DateTime' })
    t.nullable.boolean('active')
    t.nullable.string('description')
    t.string('id')
    t.nullable.string('name')
    t.nullable.string('organizationId')
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
    t.nullable.field('organization', {
      type: 'Organization',
      resolve(root: any) {
        return root.organization
      },
    })
    t.nullable.field('website', {
      type: 'Website',
      resolve(root: any) {
        return root.website
      },
    })
    t.field('_count', {
      type: 'EventGroupCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
