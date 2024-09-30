import { queryField, list } from 'nexus'

export const MarketingLocationFindFirstQuery = queryField(
  'findFirstMarketingLocation',
  {
    type: 'MarketingLocation',
    args: {
      where: 'MarketingLocationWhereInput',
      orderBy: list('MarketingLocationOrderByWithRelationInput'),
      cursor: 'MarketingLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'MarketingLocationScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
