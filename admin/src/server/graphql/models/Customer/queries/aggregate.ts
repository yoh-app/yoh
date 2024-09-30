import { queryField, list } from 'nexus'

export const CustomerAggregateQuery = queryField('aggregateCustomer', {
  type: 'AggregateCustomer',
  args: {
    where: 'CustomerWhereInput',
    orderBy: list('CustomerOrderByWithRelationInput'),
    cursor: 'CustomerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.customer.aggregate({ ...args, ...select }) as any
  },
})
