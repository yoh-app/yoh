import { mutationField, nonNull } from 'nexus'

export const CouponUpdateOneMutation = mutationField('updateOneCoupon', {
  type: nonNull('Coupon'),
  args: {
    data: nonNull('CouponUpdateInput'),
    where: nonNull('CouponWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.coupon.update({
      where,
      data,
      ...select,
    })
  },
})
