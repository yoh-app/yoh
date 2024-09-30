import { queryField, nonNull, list } from 'nexus'

export const OrderedProductFindManyQuery = queryField(
  'findManyOrderedProduct',
  {
    type: nonNull(list(nonNull('OrderedProduct'))),
    args: {
      where: 'OrderedProductWhereInput',
      orderBy: list('OrderedProductOrderByWithRelationInput'),
      cursor: 'OrderedProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'OrderedProductScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.orderedProduct.findMany({
        ...args,
        ...select,
      })
    },
  },
)
