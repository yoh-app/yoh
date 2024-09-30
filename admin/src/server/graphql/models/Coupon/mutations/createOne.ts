import { mutationField, nonNull } from 'nexus'

export const CouponCreateOneMutation = mutationField('createOneCoupon', {
  type: nonNull('Coupon'),
  args: {
    data: 'CouponCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.coupon.create({
      data,
      ...select,
    })
  },
})
