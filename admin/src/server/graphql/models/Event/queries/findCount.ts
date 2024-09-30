import { queryField, nonNull, list } from 'nexus'

export const EventFindCountQuery = queryField('findManyEventCount', {
  type: nonNull('Int'),
  args: {
    where: 'EventWhereInput',
    orderBy: list('EventOrderByWithRelationInput'),
    cursor: 'EventWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'EventScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.event.count(args as any)
  },
})
