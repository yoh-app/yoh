import { queryField, list } from 'nexus'

export const EventCollectionAggregateQuery = queryField(
  'aggregateEventCollection',
  {
    type: 'AggregateEventCollection',
    args: {
      where: 'EventCollectionWhereInput',
      orderBy: list('EventCollectionOrderByWithRelationInput'),
      cursor: 'EventCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.eventCollection.aggregate({ ...args, ...select }) as any
    },
  },
)
