import { queryField, list } from 'nexus'

export const MarketingLocationAggregateQuery = queryField(
  'aggregateMarketingLocation',
  {
    type: 'AggregateMarketingLocation',
    args: {
      where: 'MarketingLocationWhereInput',
      orderBy: list('MarketingLocationOrderByWithRelationInput'),
      cursor: 'MarketingLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingLocation.aggregate({ ...args, ...select }) as any
    },
  },
)
