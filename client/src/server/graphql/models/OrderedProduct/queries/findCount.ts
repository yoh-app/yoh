import { queryField, nonNull, list } from 'nexus'

export const OrderedProductFindCountQuery = queryField(
  'findManyOrderedProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'OrderedProductWhereInput',
      orderBy: list('OrderedProductOrderByWithRelationInput'),
      cursor: 'OrderedProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'OrderedProductScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.orderedProduct.count(args as any)
    },
  },
)
