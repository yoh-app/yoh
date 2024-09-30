import { queryField, nonNull } from 'nexus'

export const CouponFindUniqueQuery = queryField('findUniqueCoupon', {
  type: 'Coupon',
  args: {
    where: nonNull('CouponWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.coupon.findUnique({
      where,
      ...select,
    })
  },
})
