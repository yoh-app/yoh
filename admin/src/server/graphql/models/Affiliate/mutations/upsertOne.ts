import { mutationField, nonNull } from 'nexus'

export const AffiliateUpsertOneMutation = mutationField('upsertOneAffiliate', {
  type: nonNull('Affiliate'),
  args: {
    where: nonNull('AffiliateWhereUniqueInput'),
    create: nonNull('AffiliateCreateInput'),
    update: nonNull('AffiliateUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.affiliate.upsert({
      ...args,
      ...select,
    })
  },
})
