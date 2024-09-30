import { mutationField, nonNull } from 'nexus'

export const CouponUpsertOneMutation = mutationField('upsertOneCoupon', {
  type: nonNull('Coupon'),
  args: {
    where: nonNull('CouponWhereUniqueInput'),
    create: nonNull('CouponCreateInput'),
    update: nonNull('CouponUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.coupon.upsert({
      ...args,
      ...select,
    })
  },
})
