import { mutationField, nonNull } from 'nexus'

export const MarketingLocationUpsertOneMutation = mutationField(
  'upsertOneMarketingLocation',
  {
    type: nonNull('MarketingLocation'),
    args: {
      where: nonNull('MarketingLocationWhereUniqueInput'),
      create: nonNull('MarketingLocationCreateInput'),
      update: nonNull('MarketingLocationUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.marketingLocation.upsert({
        ...args,
        ...select,
      })
    },
  },
)
