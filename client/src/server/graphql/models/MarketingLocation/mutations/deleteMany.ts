import { mutationField, nonNull } from 'nexus'

export const MarketingLocationDeleteManyMutation = mutationField(
  'deleteManyMarketingLocation',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MarketingLocationWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.marketingLocation.deleteMany({ where } as any)
    },
  },
)
