import { mutationField, nonNull } from 'nexus'

export const CustomerUpdateOneMutation = mutationField('updateOneCustomer', {
  type: nonNull('Customer'),
  args: {
    data: nonNull('CustomerUpdateInput'),
    where: nonNull('CustomerWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.customer.update({
      where,
      data,
      ...select,
    })
  },
})
