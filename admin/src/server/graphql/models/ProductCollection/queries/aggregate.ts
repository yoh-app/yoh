import { queryField, list } from 'nexus'

export const ProductCollectionAggregateQuery = queryField(
  'aggregateProductCollection',
  {
    type: 'AggregateProductCollection',
    args: {
      where: 'ProductCollectionWhereInput',
      orderBy: list('ProductCollectionOrderByWithRelationInput'),
      cursor: 'ProductCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.productCollection.aggregate({ ...args, ...select }) as any
    },
  },
)
