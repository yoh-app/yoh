import { queryField, list } from 'nexus'

export const ProductCollectionFindFirstQuery = queryField(
  'findFirstProductCollection',
  {
    type: 'ProductCollection',
    args: {
      where: 'ProductCollectionWhereInput',
      orderBy: list('ProductCollectionOrderByWithRelationInput'),
      cursor: 'ProductCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'ProductCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.productCollection.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
