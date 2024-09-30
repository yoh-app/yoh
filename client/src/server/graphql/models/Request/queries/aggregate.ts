import { queryField, list } from 'nexus'

export const RequestAggregateQuery = queryField('aggregateRequest', {
  type: 'AggregateRequest',
  args: {
    where: 'RequestWhereInput',
    orderBy: list('RequestOrderByWithRelationInput'),
    cursor: 'RequestWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.request.aggregate({ ...args, ...select }) as any
  },
})
