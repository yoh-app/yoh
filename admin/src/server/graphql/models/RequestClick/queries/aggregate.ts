import { queryField, list } from 'nexus'

export const RequestClickAggregateQuery = queryField('aggregateRequestClick', {
  type: 'AggregateRequestClick',
  args: {
    where: 'RequestClickWhereInput',
    orderBy: list('RequestClickOrderByWithRelationInput'),
    cursor: 'RequestClickWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.requestClick.aggregate({ ...args, ...select }) as any
  },
})
