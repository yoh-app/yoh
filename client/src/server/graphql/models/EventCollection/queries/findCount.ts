import { queryField, nonNull, list } from 'nexus'

export const EventCollectionFindCountQuery = queryField(
  'findManyEventCollectionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'EventCollectionWhereInput',
      orderBy: list('EventCollectionOrderByWithRelationInput'),
      cursor: 'EventCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'EventCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.eventCollection.count(args as any)
    },
  },
)
