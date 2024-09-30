import { queryField, nonNull, list } from 'nexus'

export const AttributeFindCountQuery = queryField('findManyAttributeCount', {
  type: nonNull('Int'),
  args: {
    where: 'AttributeWhereInput',
    orderBy: list('AttributeOrderByWithRelationInput'),
    cursor: 'AttributeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AttributeScalarFieldEnum',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.attribute.count(args as any)
  },
})
