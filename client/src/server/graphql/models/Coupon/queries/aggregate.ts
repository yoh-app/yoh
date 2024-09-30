import { queryField, list } from 'nexus'

export const CouponAggregateQuery = queryField('aggregateCoupon', {
  type: 'AggregateCoupon',
  args: {
    where: 'CouponWhereInput',
    orderBy: list('CouponOrderByWithRelationInput'),
    cursor: 'CouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.coupon.aggregate({ ...args, ...select }) as any
  },
})
