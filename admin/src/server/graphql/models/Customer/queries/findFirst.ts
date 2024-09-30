import { queryField, list } from 'nexus'

export const CustomerFindFirstQuery = queryField('findFirstCustomer', {
  type: 'Customer',
  args: {
    where: 'CustomerWhereInput',
    orderBy: list('CustomerOrderByWithRelationInput'),
    cursor: 'CustomerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'CustomerScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.customer.findFirst({
      ...args,
      ...select,
    })
  },
})
