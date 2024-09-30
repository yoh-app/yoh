import { queryField, list } from 'nexus'

export const PageCollectionAggregateQuery = queryField(
  'aggregatePageCollection',
  {
    type: 'AggregatePageCollection',
    args: {
      where: 'PageCollectionWhereInput',
      orderBy: list('PageCollectionOrderByWithRelationInput'),
      cursor: 'PageCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.pageCollection.aggregate({ ...args, ...select }) as any
    },
  },
)
