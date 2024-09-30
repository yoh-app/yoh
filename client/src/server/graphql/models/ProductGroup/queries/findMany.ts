import { queryField, nonNull, list } from 'nexus'

export const ProductGroupFindManyQuery = queryField('findManyProductGroup', {
  type: nonNull(list(nonNull('ProductGroup'))),
  args: {
    where: 'ProductGroupWhereInput',
    orderBy: list('ProductGroupOrderByWithRelationInput'),
    cursor: 'ProductGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'ProductGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.productGroup.findMany({
      ...args,
      ...select,
    })
  },
})
