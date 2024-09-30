import { queryField, list } from 'nexus'

export const EventAggregateQuery = queryField('aggregateEvent', {
  type: 'AggregateEvent',
  args: {
    where: 'EventWhereInput',
    orderBy: list('EventOrderByWithRelationInput'),
    cursor: 'EventWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.event.aggregate({ ...args, ...select }) as any
  },
})
