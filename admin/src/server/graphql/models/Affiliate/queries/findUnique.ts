import { queryField, nonNull } from 'nexus'

export const AffiliateFindUniqueQuery = queryField('findUniqueAffiliate', {
  type: 'Affiliate',
  args: {
    where: nonNull('AffiliateWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.affiliate.findUnique({
      where,
      ...select,
    })
  },
})
