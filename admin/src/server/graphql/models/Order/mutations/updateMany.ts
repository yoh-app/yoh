import { mutationField, nonNull } from 'nexus'

export const OrderUpdateManyMutation = mutationField('updateManyOrder', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('OrderUpdateManyMutationInput'),
    where: 'OrderWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.order.updateMany(args as any)
  },
})
