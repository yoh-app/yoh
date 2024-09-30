import { queryField, nonNull, list } from 'nexus'

export const AttributeFindManyQuery = queryField('findManyAttribute', {
  type: nonNull(list(nonNull('Attribute'))),
  args: {
    where: 'AttributeWhereInput',
    orderBy: list('AttributeOrderByWithRelationInput'),
    cursor: 'AttributeWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: 'AttributeScalarFieldEnum',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.attribute.findMany({
      ...args,
      ...select,
    })
  },
})
