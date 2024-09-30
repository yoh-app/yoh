import { mutationField, nonNull } from 'nexus'

export const AffiliateUpdateOneMutation = mutationField('updateOneAffiliate', {
  type: nonNull('Affiliate'),
  args: {
    data: nonNull('AffiliateUpdateInput'),
    where: nonNull('AffiliateWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.affiliate.update({
      where,
      data,
      ...select,
    })
  },
})
