import { mutationField, nonNull } from 'nexus'

export const AffiliateCreateOneMutation = mutationField('createOneAffiliate', {
  type: nonNull('Affiliate'),
  args: {
    data: 'AffiliateCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.affiliate.create({
      data,
      ...select,
    })
  },
})
