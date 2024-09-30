import { queryField, list } from 'nexus'

export const ProductGroupAggregateQuery = queryField('aggregateProductGroup', {
  type: 'AggregateProductGroup',
  args: {
    where: 'ProductGroupWhereInput',
    orderBy: list('ProductGroupOrderByWithRelationInput'),
    cursor: 'ProductGroupWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.productGroup.aggregate({ ...args, ...select }) as any
  },
})
