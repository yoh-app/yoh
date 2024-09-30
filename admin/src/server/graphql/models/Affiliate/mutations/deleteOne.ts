import { mutationField, nonNull } from 'nexus'

export const AffiliateDeleteOneMutation = mutationField('deleteOneAffiliate', {
  type: 'Affiliate',
  args: {
    where: nonNull('AffiliateWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.affiliate.delete({
      where,
      ...select,
    })
  },
})
