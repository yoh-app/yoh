import { queryField, nonNull, list } from 'nexus'

export const ProductCollectionFindCountQuery = queryField(
  'findManyProductCollectionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ProductCollectionWhereInput',
      orderBy: list('ProductCollectionOrderByWithRelationInput'),
      cursor: 'ProductCollectionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'ProductCollectionScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.productCollection.count(args as any)
    },
  },
)
