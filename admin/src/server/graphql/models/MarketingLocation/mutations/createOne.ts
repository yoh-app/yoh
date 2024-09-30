import { mutationField, nonNull } from 'nexus'

export const MarketingLocationCreateOneMutation = mutationField(
  'createOneMarketingLocation',
  {
    type: nonNull('MarketingLocation'),
    args: {
      data: 'MarketingLocationCreateInput',
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.marketingLocation.create({
        data,
        ...select,
      })
    },
  },
)
