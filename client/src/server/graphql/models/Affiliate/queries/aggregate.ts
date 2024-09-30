import { queryField, list } from 'nexus'

export const AffiliateAggregateQuery = queryField('aggregateAffiliate', {
  type: 'AggregateAffiliate',
  args: {
    where: 'AffiliateWhereInput',
    orderBy: list('AffiliateOrderByWithRelationInput'),
    cursor: 'AffiliateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.affiliate.aggregate({ ...args, ...select }) as any
  },
})
