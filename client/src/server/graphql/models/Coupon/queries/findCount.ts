import { queryField, nonNull, list } from 'nexus'

export const CouponFindCountQuery = queryField('findManyCouponCount', {
  type: nonNull('Int'),
  args: {
    where: 'CouponWhereInput',
    orderBy: list('CouponOrderByWithRelationInput'),
    cursor: 'CouponWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'CouponScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.coupon.count(args as any)
  },
})
