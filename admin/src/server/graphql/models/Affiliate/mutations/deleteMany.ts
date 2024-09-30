import { mutationField, nonNull } from 'nexus'

export const AffiliateDeleteManyMutation = mutationField(
  'deleteManyAffiliate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AffiliateWhereInput',
    },
    resolve: async (_parent, { where }, { prisma }) => {
      return prisma.affiliate.deleteMany({ where } as any)
    },
  },
)
