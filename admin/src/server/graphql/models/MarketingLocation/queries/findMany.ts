import { queryField, nonNull, list } from 'nexus'

export const MarketingLocationFindManyQuery = queryField(
  'findManyMarketingLocation',
  {
    type: nonNull(list(nonNull('MarketingLocation'))),
    args: {
      where: 'MarketingLocationWhereInput',
      orderBy: list('MarketingLocationOrderByWithRelationInput'),
      cursor: 'MarketingLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'MarketingLocationScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
