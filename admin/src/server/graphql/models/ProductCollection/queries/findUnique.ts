import { queryField, nonNull } from 'nexus'

export const ProductCollectionFindUniqueQuery = queryField(
  'findUniqueProductCollection',
  {
    type: 'ProductCollection',
    args: {
      where: nonNull('ProductCollectionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.productCollection.findUnique({
        where,
        ...select,
      })
    },
  },
)
