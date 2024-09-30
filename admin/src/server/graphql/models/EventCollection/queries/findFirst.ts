import { queryField, list } from 'nexus'

export const EventCollectionFindFirstQuery = queryField(
  'findFirstEventCollection',
  {
    type: 'EventCollection',
    args: {
      where: 'EventCollectionWhereInput',
      orderBy: list('EventCollectionOrderByWithRelationInput'),
      cursor: 'EventCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'EventCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.eventCollection.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
