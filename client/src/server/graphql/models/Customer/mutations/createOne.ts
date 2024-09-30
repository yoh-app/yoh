import { mutationField, nonNull } from 'nexus'

export const CustomerCreateOneMutation = mutationField('createOneCustomer', {
  type: nonNull('Customer'),
  args: {
    data: 'CustomerCreateInput',
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.customer.create({
      data,
      ...select,
    })
  },
})
