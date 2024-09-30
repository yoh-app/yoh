import { queryField, nonNull } from 'nexus'

export const OrderedProductFindUniqueQuery = queryField(
  'findUniqueOrderedProduct',
  {
    type: 'OrderedProduct',
    args: {
      where: nonNull('OrderedProductWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.orderedProduct.findUnique({
        where,
        ...select,
      })
    },
  },
)
