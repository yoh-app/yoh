import { queryField, list } from 'nexus'

export const CouponFindFirstQuery = queryField('findFirstCoupon', {
  type: 'Coupon',
  args: {
    where: 'CouponWhereInput',
    orderBy: list('CouponOrderByWithRelationInput'),
    cursor: 'CouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'CouponScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.coupon.findFirst({
      ...args,
      ...select,
    })
  },
})
