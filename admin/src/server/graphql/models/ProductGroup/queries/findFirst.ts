import { queryField, list } from 'nexus'

export const ProductGroupFindFirstQuery = queryField('findFirstProductGroup', {
  type: 'ProductGroup',
  args: {
    where: 'ProductGroupWhereInput',
    orderBy: list('ProductGroupOrderByWithRelationInput'),
    cursor: 'ProductGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'ProductGroupScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.productGroup.findFirst({
      ...args,
      ...select,
    })
  },
})
