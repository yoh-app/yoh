import { queryField, list } from 'nexus'

export const AffiliateFindFirstQuery = queryField('findFirstAffiliate', {
  type: 'Affiliate',
  args: {
    where: 'AffiliateWhereInput',
    orderBy: list('AffiliateOrderByWithRelationInput'),
    cursor: 'AffiliateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AffiliateScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.affiliate.findFirst({
      ...args,
      ...select,
    })
  },
})
