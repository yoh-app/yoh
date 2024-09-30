import { mutationField, nonNull } from 'nexus'

export const MarketingLocationUpdateManyMutation = mutationField(
  'updateManyMarketingLocation',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('MarketingLocationUpdateManyMutationInput'),
      where: 'MarketingLocationWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.marketingLocation.updateMany(args as any)
    },
  },
)
