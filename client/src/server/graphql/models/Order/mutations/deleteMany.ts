import { mutationField, nonNull } from 'nexus'

export const OrderDeleteManyMutation = mutationField('deleteManyOrder', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'OrderWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.order.deleteMany({ where } as any)
  },
})
