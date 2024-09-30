import { mutationField, nonNull } from 'nexus'

export const CustomerUpdateManyMutation = mutationField('updateManyCustomer', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CustomerUpdateManyMutationInput'),
    where: 'CustomerWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.customer.updateMany(args as any)
  },
})
