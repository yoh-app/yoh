import { queryField, nonNull, list } from 'nexus'

export const CustomerFindCountQuery = queryField('findManyCustomerCount', {
  type: nonNull('Int'),
  args: {
    where: 'CustomerWhereInput',
    orderBy: list('CustomerOrderByWithRelationInput'),
    cursor: 'CustomerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'CustomerScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.customer.count(args as any)
  },
})
