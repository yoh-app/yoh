import { queryField, nonNull } from 'nexus'

export const MarketingLocationFindUniqueQuery = queryField(
  'findUniqueMarketingLocation',
  {
    type: 'MarketingLocation',
    args: {
      where: nonNull('MarketingLocationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.marketingLocation.findUnique({
        where,
        ...select,
      })
    },
  },
)
