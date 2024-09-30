import { mutationField, nonNull } from 'nexus'

export const MarketingLocationDeleteOneMutation = mutationField(
  'deleteOneMarketingLocation',
  {
    type: 'MarketingLocation',
    args: {
      where: nonNull('MarketingLocationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.marketingLocation.delete({
        where,
        ...select,
      })
    },
  },
)
