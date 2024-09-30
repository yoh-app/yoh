import { queryField, nonNull, list } from 'nexus'

export const CustomerFindManyQuery = queryField('findManyCustomer', {
  type: nonNull(list(nonNull('Customer'))),
  args: {
    where: 'CustomerWhereInput',
    orderBy: list('CustomerOrderByWithRelationInput'),
    cursor: 'CustomerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'CustomerScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.customer.findMany({
      ...args,
      ...select,
    })
  },
})
