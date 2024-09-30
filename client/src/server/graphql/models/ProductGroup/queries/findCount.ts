import { queryField, nonNull, list } from 'nexus'

export const ProductGroupFindCountQuery = queryField(
  'findManyProductGroupCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ProductGroupWhereInput',
      orderBy: list('ProductGroupOrderByWithRelationInput'),
      cursor: 'ProductGroupWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: 'ProductGroupScalarFieldEnum',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.productGroup.count(args as any)
    },
  },
)
