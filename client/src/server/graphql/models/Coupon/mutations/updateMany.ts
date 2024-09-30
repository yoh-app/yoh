import { mutationField, nonNull } from 'nexus'

export const CouponUpdateManyMutation = mutationField('updateManyCoupon', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CouponUpdateManyMutationInput'),
    where: 'CouponWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.coupon.updateMany(args as any)
  },
})
