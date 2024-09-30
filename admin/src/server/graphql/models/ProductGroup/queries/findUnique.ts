import { queryField, nonNull } from 'nexus'

export const ProductGroupFindUniqueQuery = queryField(
  'findUniqueProductGroup',
  {
    type: 'ProductGroup',
    args: {
      where: nonNull('ProductGroupWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.productGroup.findUnique({
        where,
        ...select,
      })
    },
  },
)
