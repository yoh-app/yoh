import { queryField, nonNull, list } from 'nexus'

export const EventFindManyQuery = queryField('findManyEvent', {
  type: nonNull(list(nonNull('Event'))),
  args: {
    where: 'EventWhereInput',
    orderBy: list('EventOrderByWithRelationInput'),
    cursor: 'EventWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'EventScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.event.findMany({
      ...args,
      ...select,
    })
  },
})
