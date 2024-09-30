import { queryField, list } from 'nexus'

export const AttributeAggregateQuery = queryField('aggregateAttribute', {
  type: 'AggregateAttribute',
  args: {
    where: 'AttributeWhereInput',
    orderBy: list('AttributeOrderByWithRelationInput'),
    cursor: 'AttributeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attribute.aggregate({ ...args, ...select }) as any
  },
})
