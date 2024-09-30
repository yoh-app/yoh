import { mutationField, nonNull } from 'nexus'

export const CustomerDeleteOneMutation = mutationField('deleteOneCustomer', {
  type: 'Customer',
  args: {
    where: nonNull('CustomerWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.customer.delete({
      where,
      ...select,
    })
  },
})
