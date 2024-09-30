import { mutationField, nonNull } from 'nexus'

export const CouponDeleteManyMutation = mutationField('deleteManyCoupon', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CouponWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.coupon.deleteMany({ where } as any)
  },
})
