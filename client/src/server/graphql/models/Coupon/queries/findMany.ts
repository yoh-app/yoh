import { queryField, nonNull, list } from 'nexus'

export const CouponFindManyQuery = queryField('findManyCoupon', {
  type: nonNull(list(nonNull('Coupon'))),
  args: {
    where: 'CouponWhereInput',
    orderBy: list('CouponOrderByWithRelationInput'),
    cursor: 'CouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'CouponScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.coupon.findMany({
      ...args,
      ...select,
    })
  },
})
