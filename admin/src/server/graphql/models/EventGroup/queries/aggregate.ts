import { queryField, list } from 'nexus'

export const EventGroupAggregateQuery = queryField('aggregateEventGroup', {
  type: 'AggregateEventGroup',
  args: {
    where: 'EventGroupWhereInput',
    orderBy: list('EventGroupOrderByWithRelationInput'),
    cursor: 'EventGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.eventGroup.aggregate({ ...args, ...select }) as any
  },
})
