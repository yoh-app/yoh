import { mutationField, nonNull } from 'nexus'

export const CustomerDeleteManyMutation = mutationField('deleteManyCustomer', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CustomerWhereInput',
  },
  resolve: async (_parent, { where }, { prisma }) => {
    return prisma.customer.deleteMany({ where } as any)
  },
})
