import { queryField, list } from 'nexus'

export const PageAggregateQuery = queryField('aggregatePage', {
  type: 'AggregatePage',
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByWithRelationInput'),
    cursor: 'PageWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.aggregate({ ...args, ...select }) as any
  },
})
