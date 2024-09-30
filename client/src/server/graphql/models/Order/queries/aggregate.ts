import { queryField, list } from 'nexus'

export const OrderAggregateQuery = queryField('aggregateOrder', {
  type: 'AggregateOrder',
  args: {
    where: 'OrderWhereInput',
    orderBy: list('OrderOrderByWithRelationInput'),
    cursor: 'OrderWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.order.aggregate({ ...args, ...select }) as any
  },
})
