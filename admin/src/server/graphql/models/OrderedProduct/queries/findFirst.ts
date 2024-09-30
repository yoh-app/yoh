import { queryField, list } from 'nexus'

export const OrderedProductFindFirstQuery = queryField(
  'findFirstOrderedProduct',
  {
    type: 'OrderedProduct',
    args: {
      where: 'OrderedProductWhereInput',
      orderBy: list('OrderedProductOrderByWithRelationInput'),
      cursor: 'OrderedProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'OrderedProductScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.orderedProduct.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
