import { mutationField, nonNull } from 'nexus'

export const AffiliateUpdateManyMutation = mutationField(
  'updateManyAffiliate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AffiliateUpdateManyMutationInput'),
      where: 'AffiliateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.affiliate.updateMany(args as any)
    },
  },
)
