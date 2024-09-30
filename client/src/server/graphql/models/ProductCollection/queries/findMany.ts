import { queryField, nonNull, list } from 'nexus'

export const ProductCollectionFindManyQuery = queryField(
  'findManyProductCollection',
  {
    type: nonNull(list(nonNull('ProductCollection'))),
    args: {
      where: 'ProductCollectionWhereInput',
      orderBy: list('ProductCollectionOrderByWithRelationInput'),
      cursor: 'ProductCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'ProductCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.productCollection.findMany({
        ...args,
        ...select,
      })
    },
  },
)
