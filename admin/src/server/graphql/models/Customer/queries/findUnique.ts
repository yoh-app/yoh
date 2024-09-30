import { queryField, nonNull } from 'nexus'

export const CustomerFindUniqueQuery = queryField('findUniqueCustomer', {
  type: 'Customer',
  args: {
    where: nonNull('CustomerWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.customer.findUnique({
      where,
      ...select,
    })
  },
})
