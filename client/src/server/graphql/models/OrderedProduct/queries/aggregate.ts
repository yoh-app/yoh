import { queryField, list } from 'nexus'

export const OrderedProductAggregateQuery = queryField(
  'aggregateOrderedProduct',
  {
    type: 'AggregateOrderedProduct',
    args: {
      where: 'OrderedProductWhereInput',
      orderBy: list('OrderedProductOrderByWithRelationInput'),
      cursor: 'OrderedProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.orderedProduct.aggregate({ ...args, ...select }) as any
    },
  },
)
