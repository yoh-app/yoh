import { mutationField, nonNull } from 'nexus'

export const CouponDeleteOneMutation = mutationField('deleteOneCoupon', {
  type: 'Coupon',
  args: {
    where: nonNull('CouponWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.coupon.delete({
      where,
      ...select,
    })
  },
})
