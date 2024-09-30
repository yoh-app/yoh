import { queryField, nonNull, list } from 'nexus'

export const EventCollectionFindManyQuery = queryField(
  'findManyEventCollection',
  {
    type: nonNull(list(nonNull('EventCollection'))),
    args: {
      where: 'EventCollectionWhereInput',
      orderBy: list('EventCollectionOrderByWithRelationInput'),
      cursor: 'EventCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'EventCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.eventCollection.findMany({
        ...args,
        ...select,
      })
    },
  },
)
