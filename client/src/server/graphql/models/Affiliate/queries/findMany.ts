import { queryField, nonNull, list } from 'nexus'

export const AffiliateFindManyQuery = queryField('findManyAffiliate', {
  type: nonNull(list(nonNull('Affiliate'))),
  args: {
    where: 'AffiliateWhereInput',
    orderBy: list('AffiliateOrderByWithRelationInput'),
    cursor: 'AffiliateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AffiliateScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.affiliate.findMany({
      ...args,
      ...select,
    })
  },
})
