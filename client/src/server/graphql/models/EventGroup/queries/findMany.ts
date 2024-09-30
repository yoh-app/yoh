import { queryField, nonNull, list } from 'nexus'

export const EventGroupFindManyQuery = queryField('findManyEventGroup', {
  type: nonNull(list(nonNull('EventGroup'))),
  args: {
    where: 'EventGroupWhereInput',
    orderBy: list('EventGroupOrderByWithRelationInput'),
    cursor: 'EventGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'EventGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.eventGroup.findMany({
      ...args,
      ...select,
    })
  },
})
