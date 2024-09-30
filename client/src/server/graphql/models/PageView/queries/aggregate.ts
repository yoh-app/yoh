import { queryField, list } from 'nexus'

export const PageViewAggregateQuery = queryField('aggregatePageView', {
  type: 'AggregatePageView',
  args: {
    where: 'PageViewWhereInput',
    orderBy: list('PageViewOrderByWithRelationInput'),
    cursor: 'PageViewWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.pageView.aggregate({ ...args, ...select }) as any
  },
})
