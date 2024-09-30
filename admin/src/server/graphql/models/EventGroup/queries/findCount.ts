import { queryField, nonNull, list } from 'nexus'

export const EventGroupFindCountQuery = queryField('findManyEventGroupCount', {
  type: nonNull('Int'),
  args: {
    where: 'EventGroupWhereInput',
    orderBy: list('EventGroupOrderByWithRelationInput'),
    cursor: 'EventGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'EventGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.eventGroup.count(args as any)
  },
})
