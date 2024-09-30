import { queryField, nonNull, list } from 'nexus'

export const AffiliateFindCountQuery = queryField('findManyAffiliateCount', {
  type: nonNull('Int'),
  args: {
    where: 'AffiliateWhereInput',
    orderBy: list('AffiliateOrderByWithRelationInput'),
    cursor: 'AffiliateWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AffiliateScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.affiliate.count(args as any)
  },
})
