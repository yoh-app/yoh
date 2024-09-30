import { queryField, nonNull, list } from 'nexus'

export const MarketingLocationFindCountQuery = queryField(
  'findManyMarketingLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MarketingLocationWhereInput',
      orderBy: list('MarketingLocationOrderByWithRelationInput'),
      cursor: 'MarketingLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'MarketingLocationScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.marketingLocation.count(args as any)
    },
  },
)
