import { mutationField, nonNull } from 'nexus'

export const MarketingLocationUpdateOneMutation = mutationField(
  'updateOneMarketingLocation',
  {
    type: nonNull('MarketingLocation'),
    args: {
      data: nonNull('MarketingLocationUpdateInput'),
      where: nonNull('MarketingLocationWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.marketingLocation.update({
        where,
        data,
        ...select,
      })
    },
  },
)
